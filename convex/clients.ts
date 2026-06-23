import { mutation, query } from "./_generated/server"
import type { QueryCtx } from "./_generated/server"
import type { Id } from "./_generated/dataModel"
import { v } from "convex/values"
import { now, requireCurrentUser, requireOwnedClient } from "./model"

const skinType = v.union(
  v.literal("Normal"),
  v.literal("Dry"),
  v.literal("Oily"),
  v.literal("Combination"),
  v.literal("Sensitive"),
  v.literal("Aging"),
  v.literal("Acne"),
  v.string(),
)

const clientStatus = v.union(
  v.literal("active"),
  v.literal("needs-follow-up"),
  v.literal("payment-overdue"),
  v.literal("none"),
)

async function lastTreatmentForClient(ctx: QueryCtx, clientId: Id<"clients">) {
  const cases = await ctx.db
    .query("cases")
    .withIndex("by_clientId", (q) => q.eq("clientId", clientId))
    .collect()

  const latest = cases.sort((a, b) => b.createdAt - a.createdAt)[0]
  if (!latest) return undefined

  return {
    date: latest.date,
    type: latest.type,
  }
}

export const getClients = query({
  args: {},
  handler: async (ctx) => {
    const user = await requireCurrentUser(ctx)
    const clients = await ctx.db
      .query("clients")
      .withIndex("by_userId", (q) => q.eq("userId", user._id))
      .collect()

    return await Promise.all(
      clients.map(async (client) => ({
        ...client,
        id: client._id,
        lastTreatment: await lastTreatmentForClient(ctx, client._id),
      })),
    )
  },
})

export const getClient = query({
  args: {
    id: v.id("clients"),
  },
  handler: async (ctx, args) => {
    const user = await requireCurrentUser(ctx)
    const client = await requireOwnedClient(ctx, user._id, args.id)
    const treatmentHistory = await ctx.db
      .query("cases")
      .withIndex("by_clientId", (q) => q.eq("clientId", client._id))
      .collect()

    const sortedHistory = treatmentHistory
      .sort((a, b) => b.createdAt - a.createdAt)
      .map((entry) => ({
        ...entry,
        id: entry._id,
      }))

    return {
      ...client,
      id: client._id,
      name: client.fullName,
      lastTreatment: sortedHistory[0] ? { date: sortedHistory[0].date, type: sortedHistory[0].type } : undefined,
      treatmentHistory: sortedHistory,
    }
  },
})

export const createClient = mutation({
  args: {
    fullName: v.string(),
    email: v.optional(v.string()),
    phone: v.string(),
    birthDate: v.string(),
    skinType,
    status: v.optional(clientStatus),
  },
  handler: async (ctx, args) => {
    const user = await requireCurrentUser(ctx)
    const timestamp = now()

    return await ctx.db.insert("clients", {
      userId: user._id,
      fullName: args.fullName,
      email: args.email,
      phone: args.phone,
      birthDate: args.birthDate,
      skinType: args.skinType,
      status: args.status ?? "active",
      createdAt: timestamp,
      updatedAt: timestamp,
    })
  },
})

export const updateClient = mutation({
  args: {
    id: v.id("clients"),
    fullName: v.string(),
    email: v.optional(v.string()),
    phone: v.string(),
    birthDate: v.string(),
    skinType: v.optional(skinType),
    status: v.optional(clientStatus),
  },
  handler: async (ctx, args) => {
    const user = await requireCurrentUser(ctx)
    const client = await requireOwnedClient(ctx, user._id, args.id)

    await ctx.db.patch(client._id, {
      fullName: args.fullName,
      email: args.email,
      phone: args.phone,
      birthDate: args.birthDate,
      skinType: args.skinType ?? client.skinType,
      status: args.status ?? client.status,
      updatedAt: now(),
    })

    return await ctx.db.get(client._id)
  },
})
