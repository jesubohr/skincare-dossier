import { query } from "./_generated/server"
import type { Doc, Id } from "./_generated/dataModel"
import type { QueryCtx } from "./_generated/server"
import { v } from "convex/values"
import { getPracticeSettings, minutesBetween, requireCurrentUser, sameDayRange } from "./model"

async function enrichAppointment(ctx: QueryCtx, appointment: Doc<"appointments">) {
  const client = appointment.clientId ? await ctx.db.get(appointment.clientId) : null
  const treatment = appointment.treatmentId ? await ctx.db.get(appointment.treatmentId) : null

  return {
    ...appointment,
    id: appointment._id,
    clientName: client?.fullName ?? "No client",
    treatmentName: treatment?.name ?? appointment.treatmentName,
    durationMinutes: minutesBetween(appointment.startsAt, appointment.endsAt),
  }
}

async function lastTreatmentForClient(ctx: QueryCtx, clientId: Id<"clients">) {
  const cases = await ctx.db
    .query("cases")
    .withIndex("by_clientId", (q) => q.eq("clientId", clientId))
    .collect()
  const latest = cases.sort((a, b) => b.createdAt - a.createdAt)[0]
  return latest ? { date: latest.date, type: latest.type } : undefined
}

export const getSummary = query({
  args: {
    day: v.string(),
  },
  handler: async (ctx, args) => {
    const user = await requireCurrentUser(ctx)
    const range = sameDayRange(args.day)
    const settings = await getPracticeSettings(ctx, user._id)

    const [appointments, clients] = await Promise.all([
      ctx.db
        .query("appointments")
        .withIndex("by_userId_startsAt", (q) => q.eq("userId", user._id).gte("startsAt", range.start).lte("startsAt", range.end))
        .collect(),
      ctx.db
        .query("clients")
        .withIndex("by_userId", (q) => q.eq("userId", user._id))
        .collect(),
    ])

    const todaysAppointments = await Promise.all(appointments.sort((a, b) => a.startsAt.localeCompare(b.startsAt)).map((appointment) => enrichAppointment(ctx, appointment)))
    const activeAppointments = todaysAppointments.filter((appointment) => appointment.status !== "cancelled" && appointment.status !== "no_show")
    const bookedMinutes = activeAppointments.reduce((total, appointment) => total + appointment.durationMinutes, 0)
    const capacityMinutes = settings?.dailyCapacityMinutes ?? 480
    const pendingFollowUps = await Promise.all(
      clients
        .filter((client) => client.status === "needs-follow-up")
        .map(async (client) => ({
          ...client,
          id: client._id,
          lastTreatment: await lastTreatmentForClient(ctx, client._id),
        })),
    )

    return {
      user,
      todaysAppointments,
      pendingFollowUps,
      confirmedAppointments: todaysAppointments.filter((appointment) => appointment.status === "confirmed").length,
      bookedMinutes,
      capacityMinutes,
      utilization: capacityMinutes > 0 ? Math.round((bookedMinutes / capacityMinutes) * 100) : 0,
      nextAppointment: activeAppointments.find((appointment) => appointment.startsAt >= new Date().toISOString()) ?? activeAppointments[0],
      clientCount: clients.length,
    }
  },
})
