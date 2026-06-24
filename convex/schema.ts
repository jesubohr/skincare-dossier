import { defineSchema, defineTable } from "convex/server"
import { v } from "convex/values"

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

const clientStatus = v.union(v.literal("active"), v.literal("needs-follow-up"), v.literal("payment-overdue"), v.literal("none"))

const appointmentStatus = v.union(
  v.literal("pending"),
  v.literal("confirmed"),
  v.literal("checked_in"),
  v.literal("completed"),
  v.literal("cancelled"),
  v.literal("no_show"),
)

export default defineSchema({
  users: defineTable({
    authSubject: v.optional(v.string()),
    fullName: v.string(),
    displayName: v.optional(v.string()),
    email: v.string(),
    avatarStorageId: v.optional(v.id("_storage")),
    avatarUrl: v.optional(v.string()),
    phone: v.optional(v.string()),
    professionalTitle: v.optional(v.string()),
    licenseNumber: v.optional(v.string()),
    specialties: v.array(v.string()),
    bio: v.optional(v.string()),
    createdAt: v.number(),
    updatedAt: v.number(),
  })
    .index("by_email", ["email"])
    .index("by_authSubject", ["authSubject"]),

  clients: defineTable({
    userId: v.id("users"),
    fullName: v.string(),
    email: v.optional(v.string()),
    phone: v.string(),
    birthDate: v.string(),
    skinType,
    status: clientStatus,
    createdAt: v.number(),
    updatedAt: v.number(),
  })
    .index("by_userId", ["userId"])
    .index("by_userId_status", ["userId", "status"]),

  treatments: defineTable({
    userId: v.id("users"),
    name: v.string(),
    description: v.optional(v.string()),
    priceCents: v.optional(v.number()),
    durationMinutes: v.number(),
    archivedAt: v.optional(v.number()),
    createdAt: v.number(),
    updatedAt: v.number(),
  })
    .index("by_userId", ["userId"])
    .index("by_userId_name", ["userId", "name"]),

  cases: defineTable({
    userId: v.id("users"),
    clientId: v.id("clients"),
    appointmentId: v.optional(v.id("appointments")),
    date: v.string(),
    time: v.string(),
    doctor: v.string(),
    type: v.string(),
    observations: v.string(),
    recommendations: v.array(v.string()),
    nextVisit: v.optional(v.string()),
    createdAt: v.number(),
    updatedAt: v.number(),
  })
    .index("by_userId", ["userId"])
    .index("by_clientId", ["clientId"])
    .index("by_appointmentId", ["appointmentId"]),

  appointments: defineTable({
    userId: v.id("users"),
    clientId: v.optional(v.id("clients")),
    treatmentId: v.optional(v.id("treatments")),
    caseId: v.optional(v.id("cases")),
    title: v.string(),
    treatmentName: v.string(),
    startsAt: v.string(),
    endsAt: v.string(),
    status: appointmentStatus,
    notes: v.optional(v.string()),
    createdAt: v.number(),
    updatedAt: v.number(),
  })
    .index("by_userId", ["userId"])
    .index("by_userId_startsAt", ["userId", "startsAt"])
    .index("by_userId_status_startsAt", ["userId", "status", "startsAt"])
    .index("by_clientId_startsAt", ["clientId", "startsAt"]),

  availabilityBlocks: defineTable({
    userId: v.id("users"),
    title: v.string(),
    kind: v.union(v.literal("time_off"), v.literal("admin"), v.literal("other")),
    startsAt: v.string(),
    endsAt: v.string(),
    notes: v.optional(v.string()),
    createdAt: v.number(),
    updatedAt: v.number(),
  })
    .index("by_userId", ["userId"])
    .index("by_userId_startsAt", ["userId", "startsAt"]),

  practiceSettings: defineTable({
    userId: v.id("users"),
    timezone: v.string(),
    workdayStart: v.string(),
    workdayEnd: v.string(),
    lunchStart: v.optional(v.string()),
    lunchEnd: v.optional(v.string()),
    slotIntervalMinutes: v.number(),
    dailyCapacityMinutes: v.number(),
    createdAt: v.number(),
    updatedAt: v.number(),
  }).index("by_userId", ["userId"]),
})
