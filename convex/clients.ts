import { query } from "backend/server"

export const getClients = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query("clients").collect()
  },
})

export const getClientsForCurrentUser = query({
  args: {},
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity()
    if (identity === null) {
      throw new Error("Not authenticated")
    }

    const user = await ctx.db
      .query("users")
      .withIndex("by_email", (q) => q.eq("email", identity.email!))
      .first()

    if (user === null) {
      throw new Error("User not found")
    }

    return await ctx.db
      .query("clients")
      .withIndex("by_userId", (q) => q.eq("userId", user._id))
      .collect()
  },
})
