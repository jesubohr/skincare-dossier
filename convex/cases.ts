import { mutation, query } from "./_generated/server"
import { v } from "convex/values"
import { now, requireCurrentUser, requireOwnedClient } from "./model"

export const getCasesForClient = query({
  args: {
    clientId: v.id("clients"),
  },
  handler: async (ctx, args) => {
    const user = await requireCurrentUser(ctx)
    await requireOwnedClient(ctx, user._id, args.clientId)

    const cases = await ctx.db
      .query("cases")
      .withIndex("by_clientId", (q) => q.eq("clientId", args.clientId))
      .collect()

    return cases.sort((a, b) => b.createdAt - a.createdAt).map((entry) => ({ ...entry, id: entry._id }))
  },
})

export const createCase = mutation({
  args: {
    clientId: v.id("clients"),
    appointmentId: v.optional(v.id("appointments")),
    date: v.string(),
    time: v.string(),
    doctor: v.string(),
    type: v.string(),
    observations: v.string(),
    recommendations: v.array(v.string()),
    nextVisit: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const user = await requireCurrentUser(ctx)
    await requireOwnedClient(ctx, user._id, args.clientId)
    const timestamp = now()

    const caseId = await ctx.db.insert("cases", {
      userId: user._id,
      ...args,
      createdAt: timestamp,
      updatedAt: timestamp,
    })

    if (args.appointmentId) {
      const appointment = await ctx.db.get(args.appointmentId)
      if (appointment && appointment.userId === user._id) {
        await ctx.db.patch(appointment._id, {
          caseId,
          updatedAt: timestamp,
        })
      }
    }

    return caseId
  },
})
