import { defineSchema, defineTable } from "convex/server"
import { v } from "convex/values"

export default defineSchema({
  users: defineTable({
    name: v.string(),
    email: v.string(),
  }).index("by_email", ["email"]),

  clients: defineTable({
    userId: v.id("users"),
    fullName: v.string(),
    email: v.string(),
    phone: v.string(),
    birthDate: v.string(),
    skinType: v.union(
      v.literal("Normal"),
      v.literal("Dry"),
      v.literal("Oily"),
      v.literal("Combination"),
      v.literal("Sensitive"),
      v.literal("Aging"),
      v.literal("Acne"),
      v.string(),
    ),
  }).index("by_userId", ["userId"]),

  cases: defineTable({
    clientId: v.id("clients"),
    type: v.string(),
    observations: v.string(),
    recommendations: v.array(v.string()),
    nextVisit: v.union(v.string(), v.null()),
  }),
})
