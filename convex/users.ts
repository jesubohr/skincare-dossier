import { mutation, query } from "./_generated/server"
import { v } from "convex/values"
import { DEFAULT_SETTINGS, getCurrentUser, getPracticeSettings, now, requireCurrentUser } from "./model"

export const ensureCurrentUser = mutation({
  args: {},
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity()
    const email = identity?.email

    if (!identity || !email) {
      throw new Error("Not authenticated")
    }

    const existingBySubject = identity.subject
      ? await ctx.db
          .query("users")
          .withIndex("by_authSubject", (q) => q.eq("authSubject", identity.subject))
          .first()
      : null

    const existing =
      existingBySubject ??
      (await ctx.db
        .query("users")
        .withIndex("by_email", (q) => q.eq("email", email))
        .first())

    const timestamp = now()

    if (!existing) {
      const userId = await ctx.db.insert("users", {
        authSubject: identity.subject,
        fullName: identity.name ?? email.split("@")[0],
        displayName: identity.name ?? email.split("@")[0],
        email,
        specialties: [],
        createdAt: timestamp,
        updatedAt: timestamp,
      })

      await ctx.db.insert("practiceSettings", {
        userId,
        ...DEFAULT_SETTINGS,
        createdAt: timestamp,
        updatedAt: timestamp,
      })

      return await ctx.db.get(userId)
    }

    const patch: Partial<typeof existing> = { updatedAt: timestamp }
    if (!existing.authSubject && identity.subject) patch.authSubject = identity.subject
    if (existing.email !== email) patch.email = email
    await ctx.db.patch(existing._id, patch)

    const settings = await getPracticeSettings(ctx, existing._id)
    if (!settings) {
      await ctx.db.insert("practiceSettings", {
        userId: existing._id,
        ...DEFAULT_SETTINGS,
        createdAt: timestamp,
        updatedAt: timestamp,
      })
    }

    return await ctx.db.get(existing._id)
  },
})

export const getProfile = query({
  args: {},
  handler: async (ctx) => {
    return await getCurrentUser(ctx)
  },
})

export const updateProfile = mutation({
  args: {
    fullName: v.string(),
    displayName: v.optional(v.string()),
    phone: v.optional(v.string()),
    professionalTitle: v.optional(v.string()),
    licenseNumber: v.optional(v.string()),
    specialties: v.array(v.string()),
    bio: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const user = await requireCurrentUser(ctx)

    await ctx.db.patch(user._id, {
      ...args,
      updatedAt: now(),
    })

    return await ctx.db.get(user._id)
  },
})

export const generateAvatarUploadUrl = mutation({
  args: {},
  handler: async (ctx) => {
    await requireCurrentUser(ctx)
    return await ctx.storage.generateUploadUrl()
  },
})

export const updateAvatar = mutation({
  args: {
    storageId: v.id("_storage"),
  },
  handler: async (ctx, args) => {
    const user = await requireCurrentUser(ctx)
    const avatarUrl = await ctx.storage.getUrl(args.storageId)

    await ctx.db.patch(user._id, {
      avatarStorageId: args.storageId,
      avatarUrl: avatarUrl ?? undefined,
      updatedAt: now(),
    })

    return await ctx.db.get(user._id)
  },
})
