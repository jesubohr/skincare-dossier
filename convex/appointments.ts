import { mutation, query } from "./_generated/server"
import type { Doc } from "./_generated/dataModel"
import type { QueryCtx } from "./_generated/server"
import { v } from "convex/values"
import { now, requireCurrentUser } from "./model"

const appointmentStatus = v.union(
  v.literal("pending"),
  v.literal("confirmed"),
  v.literal("checked_in"),
  v.literal("completed"),
  v.literal("cancelled"),
  v.literal("no_show"),
)

const blockKind = v.union(v.literal("time_off"), v.literal("admin"), v.literal("other"))

function assertValidTimeRange(startsAt: string, endsAt: string) {
  const start = new Date(startsAt).getTime()
  const end = new Date(endsAt).getTime()

  if (!Number.isFinite(start) || !Number.isFinite(end)) {
    throw new Error("Appointment times must be valid dates")
  }

  if (end <= start) {
    throw new Error("Appointment end time must be after start time")
  }
}

async function enrichAppointment(ctx: QueryCtx, appointment: Doc<"appointments">) {
  const client = appointment.clientId ? await ctx.db.get(appointment.clientId) : null
  const treatment = appointment.treatmentId ? await ctx.db.get(appointment.treatmentId) : null

  return {
    ...appointment,
    id: appointment._id,
    client,
    clientName: client?.fullName ?? "No client",
    treatment,
    treatmentName: treatment?.name ?? appointment.treatmentName,
    durationMinutes: Math.max(0, Math.round((new Date(appointment.endsAt).getTime() - new Date(appointment.startsAt).getTime()) / 60000)),
  }
}

export const getAppointments = query({
  args: {
    start: v.optional(v.string()),
    end: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const user = await requireCurrentUser(ctx)
    const start = args.start ?? "0000-01-01T00:00:00.000Z"
    const end = args.end ?? "9999-12-31T23:59:59.999Z"

    const appointments = await ctx.db
      .query("appointments")
      .withIndex("by_userId_startsAt", (q) => q.eq("userId", user._id).gte("startsAt", start).lte("startsAt", end))
      .collect()

    return await Promise.all(appointments.sort((a, b) => a.startsAt.localeCompare(b.startsAt)).map((appointment) => enrichAppointment(ctx, appointment)))
  },
})

export const createAppointment = mutation({
  args: {
    clientId: v.optional(v.id("clients")),
    treatmentId: v.optional(v.id("treatments")),
    title: v.optional(v.string()),
    treatmentName: v.optional(v.string()),
    startsAt: v.string(),
    endsAt: v.string(),
    status: v.optional(appointmentStatus),
    notes: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const user = await requireCurrentUser(ctx)
    const client = args.clientId ? await ctx.db.get(args.clientId) : null
    const treatment = args.treatmentId ? await ctx.db.get(args.treatmentId) : null

    assertValidTimeRange(args.startsAt, args.endsAt)
    if (client && client.userId !== user._id) throw new Error("Client not found")
    if (treatment && treatment.userId !== user._id) throw new Error("Treatment not found")

    const timestamp = now()
    return await ctx.db.insert("appointments", {
      userId: user._id,
      clientId: args.clientId,
      treatmentId: args.treatmentId,
      title: args.title ?? client?.fullName ?? "Appointment",
      treatmentName: treatment?.name ?? args.treatmentName ?? "Consultation",
      startsAt: args.startsAt,
      endsAt: args.endsAt,
      status: args.status ?? "pending",
      notes: args.notes,
      createdAt: timestamp,
      updatedAt: timestamp,
    })
  },
})

export const updateAppointment = mutation({
  args: {
    id: v.id("appointments"),
    clientId: v.optional(v.id("clients")),
    treatmentId: v.optional(v.id("treatments")),
    title: v.optional(v.string()),
    treatmentName: v.optional(v.string()),
    startsAt: v.string(),
    endsAt: v.string(),
    status: appointmentStatus,
    notes: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const user = await requireCurrentUser(ctx)
    const appointment = await ctx.db.get(args.id)
    if (!appointment || appointment.userId !== user._id) throw new Error("Appointment not found")

    const client = args.clientId ? await ctx.db.get(args.clientId) : null
    const treatment = args.treatmentId ? await ctx.db.get(args.treatmentId) : null
    assertValidTimeRange(args.startsAt, args.endsAt)
    if (client && client.userId !== user._id) throw new Error("Client not found")
    if (treatment && treatment.userId !== user._id) throw new Error("Treatment not found")

    await ctx.db.patch(appointment._id, {
      clientId: args.clientId,
      treatmentId: args.treatmentId,
      title: args.title ?? client?.fullName ?? appointment.title,
      treatmentName: treatment?.name ?? args.treatmentName ?? appointment.treatmentName,
      startsAt: args.startsAt,
      endsAt: args.endsAt,
      status: args.status,
      notes: args.notes,
      updatedAt: now(),
    })

    return await ctx.db.get(appointment._id)
  },
})

export const updateAppointmentStatus = mutation({
  args: {
    id: v.id("appointments"),
    status: appointmentStatus,
  },
  handler: async (ctx, args) => {
    const user = await requireCurrentUser(ctx)
    const appointment = await ctx.db.get(args.id)
    if (!appointment || appointment.userId !== user._id) throw new Error("Appointment not found")

    await ctx.db.patch(appointment._id, {
      status: args.status,
      updatedAt: now(),
    })
  },
})

export const deleteAppointment = mutation({
  args: {
    id: v.id("appointments"),
  },
  handler: async (ctx, args) => {
    const user = await requireCurrentUser(ctx)
    const appointment = await ctx.db.get(args.id)
    if (!appointment || appointment.userId !== user._id) throw new Error("Appointment not found")
    await ctx.db.delete(appointment._id)
  },
})

export const getAvailabilityBlocks = query({
  args: {
    start: v.optional(v.string()),
    end: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const user = await requireCurrentUser(ctx)
    const start = args.start ?? "0000-01-01T00:00:00.000Z"
    const end = args.end ?? "9999-12-31T23:59:59.999Z"

    const blocks = await ctx.db
      .query("availabilityBlocks")
      .withIndex("by_userId_startsAt", (q) => q.eq("userId", user._id).gte("startsAt", start).lte("startsAt", end))
      .collect()

    return blocks.sort((a, b) => a.startsAt.localeCompare(b.startsAt)).map((block) => ({ ...block, id: block._id }))
  },
})

export const createAvailabilityBlock = mutation({
  args: {
    title: v.string(),
    kind: v.optional(blockKind),
    startsAt: v.string(),
    endsAt: v.string(),
    notes: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const user = await requireCurrentUser(ctx)
    const timestamp = now()

    return await ctx.db.insert("availabilityBlocks", {
      userId: user._id,
      title: args.title,
      kind: args.kind ?? "admin",
      startsAt: args.startsAt,
      endsAt: args.endsAt,
      notes: args.notes,
      createdAt: timestamp,
      updatedAt: timestamp,
    })
  },
})

export const deleteAvailabilityBlock = mutation({
  args: {
    id: v.id("availabilityBlocks"),
  },
  handler: async (ctx, args) => {
    const user = await requireCurrentUser(ctx)
    const block = await ctx.db.get(args.id)
    if (!block || block.userId !== user._id) throw new Error("Availability block not found")
    await ctx.db.delete(block._id)
  },
})
