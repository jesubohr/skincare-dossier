import { mutation, query } from "./_generated/server"
import { v } from "convex/values"
import { now, requireCurrentUser } from "./model"

export const getTreatments = query({
  args: {},
  handler: async (ctx) => {
    const user = await requireCurrentUser(ctx)
    const treatments = await ctx.db
      .query("treatments")
      .withIndex("by_userId", (q) => q.eq("userId", user._id))
      .collect()

    return treatments.map((treatment) => ({
      ...treatment,
      id: treatment._id,
    }))
  },
})

export const createTreatment = mutation({
  args: {
    name: v.string(),
    description: v.optional(v.string()),
    priceCents: v.optional(v.number()),
    durationMinutes: v.number(),
  },
  handler: async (ctx, args) => {
    const user = await requireCurrentUser(ctx)
    const timestamp = now()

    return await ctx.db.insert("treatments", {
      userId: user._id,
      ...args,
      createdAt: timestamp,
      updatedAt: timestamp,
    })
  },
})

export const updateTreatment = mutation({
  args: {
    id: v.id("treatments"),
    name: v.string(),
    description: v.optional(v.string()),
    priceCents: v.optional(v.number()),
    durationMinutes: v.number(),
  },
  handler: async (ctx, args) => {
    const user = await requireCurrentUser(ctx)
    const treatment = await ctx.db.get(args.id)
    if (!treatment || treatment.userId !== user._id) {
      throw new Error("Treatment not found")
    }

    await ctx.db.patch(treatment._id, {
      name: args.name,
      description: args.description,
      priceCents: args.priceCents,
      durationMinutes: args.durationMinutes,
      updatedAt: now(),
    })

    return await ctx.db.get(treatment._id)
  },
})
