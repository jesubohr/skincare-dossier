import { mutation, query } from "./_generated/server"
import { v } from "convex/values"
import { DEFAULT_SETTINGS, getPracticeSettings, now, requireCurrentUser } from "./model"

export const getPractice = query({
  args: {},
  handler: async (ctx) => {
    const user = await requireCurrentUser(ctx)
    const settings = await getPracticeSettings(ctx, user._id)

    return (
      settings ?? {
        _id: null,
        userId: user._id,
        ...DEFAULT_SETTINGS,
        createdAt: now(),
        updatedAt: now(),
      }
    )
  },
})

export const updatePractice = mutation({
  args: {
    timezone: v.string(),
    workdayStart: v.string(),
    workdayEnd: v.string(),
    lunchStart: v.optional(v.string()),
    lunchEnd: v.optional(v.string()),
    slotIntervalMinutes: v.number(),
    dailyCapacityMinutes: v.number(),
  },
  handler: async (ctx, args) => {
    const user = await requireCurrentUser(ctx)
    const existing = await getPracticeSettings(ctx, user._id)
    const timestamp = now()

    if (!existing) {
      const settingsId = await ctx.db.insert("practiceSettings", {
        userId: user._id,
        ...args,
        createdAt: timestamp,
        updatedAt: timestamp,
      })
      return await ctx.db.get(settingsId)
    }

    await ctx.db.patch(existing._id, {
      ...args,
      updatedAt: timestamp,
    })

    return await ctx.db.get(existing._id)
  },
})
