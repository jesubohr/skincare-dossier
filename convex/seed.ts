import { mutation } from "./_generated/server"
import { now, requireCurrentUser } from "./model"

const demoTreatments = [
  ["Anti-Aging Facial", "Rejuvenating facial treatment to reduce fine lines and wrinkles.", 15000, 60],
  ["Chemical Peel", "Exfoliating treatment to improve skin texture and tone.", 20000, 45],
  ["HydraFacial", "Deep cleansing and hydration treatment.", 25000, 60],
  ["Micro-needling", "Collagen-stimulating treatment for texture and acne scars.", 30000, 60],
] as const

const demoClients = [
  ["Sarah Jenkins", "sarah.jenkins@example.com", "3025559123", "1990-01-01", "Combination", "active"],
  ["Monica Ross", "monica.ross@example.com", "(555) 123-4567", "1990-01-01", "Normal", "none"],
  ["Emily Lewis", "emily.lewis@example.com", "(555) 567-8901", "1995-05-18", "Sensitive", "needs-follow-up"],
  ["Amanda Brown", "amanda.brown@example.com", "(555) 123-4567", "1990-01-01", "Normal", "payment-overdue"],
] as const

function todayAt(hour: number, minute = 0) {
  const date = new Date()
  date.setHours(hour, minute, 0, 0)
  return date.toISOString()
}

export const seedDemoData = mutation({
  args: {},
  handler: async (ctx) => {
    const user = await requireCurrentUser(ctx)
    const existingClients = await ctx.db
      .query("clients")
      .withIndex("by_userId", (q) => q.eq("userId", user._id))
      .first()

    if (existingClients) {
      return { seeded: false, reason: "Demo data already exists." }
    }

    const timestamp = now()
    const treatmentIds = []
    for (const [name, description, priceCents, durationMinutes] of demoTreatments) {
      treatmentIds.push(
        await ctx.db.insert("treatments", {
          userId: user._id,
          name,
          description,
          priceCents,
          durationMinutes,
          createdAt: timestamp,
          updatedAt: timestamp,
        }),
      )
    }

    const clientIds = []
    for (const [fullName, email, phone, birthDate, skinType, status] of demoClients) {
      clientIds.push(
        await ctx.db.insert("clients", {
          userId: user._id,
          fullName,
          email,
          phone,
          birthDate,
          skinType,
          status,
          createdAt: timestamp,
          updatedAt: timestamp,
        }),
      )
    }

    await ctx.db.insert("cases", {
      userId: user._id,
      clientId: clientIds[0],
      date: "Oct 24, 2023",
      time: "10:00 AM",
      doctor: user.displayName ?? user.fullName,
      type: "Anti-Aging Facial",
      observations: "Client reported increased dryness on forehead. Slight redness observed around the nose area.",
      recommendations: ["Hydrating serum twice daily", "SPF 50 mineral sunscreen", "Avoid hot water during cleansing"],
      nextVisit: "Nov 15, 2023",
      createdAt: timestamp,
      updatedAt: timestamp,
    })

    await ctx.db.insert("cases", {
      userId: user._id,
      clientId: clientIds[2],
      date: "Nov 01, 2023",
      time: "02:30 PM",
      doctor: user.displayName ?? user.fullName,
      type: "Micro-needling",
      observations: "Texture improving. Follow-up recommended to review sensitivity.",
      recommendations: ["Continue gentle cleanser", "Avoid active exfoliants for 72 hours"],
      nextVisit: "Nov 22, 2023",
      createdAt: timestamp + 1,
      updatedAt: timestamp + 1,
    })

    await ctx.db.insert("appointments", {
      userId: user._id,
      clientId: clientIds[0],
      treatmentId: treatmentIds[0],
      title: "Sarah Jenkins",
      treatmentName: "Anti-Aging Facial",
      startsAt: todayAt(10),
      endsAt: todayAt(11),
      status: "confirmed",
      createdAt: timestamp,
      updatedAt: timestamp,
    })

    await ctx.db.insert("appointments", {
      userId: user._id,
      clientId: clientIds[1],
      treatmentId: treatmentIds[2],
      title: "Monica Ross",
      treatmentName: "HydraFacial",
      startsAt: todayAt(14, 30),
      endsAt: todayAt(15, 15),
      status: "pending",
      createdAt: timestamp,
      updatedAt: timestamp,
    })

    await ctx.db.insert("availabilityBlocks", {
      userId: user._id,
      title: "Administrative block",
      kind: "admin",
      startsAt: todayAt(13),
      endsAt: todayAt(14),
      notes: "Chart review and room reset.",
      createdAt: timestamp,
      updatedAt: timestamp,
    })

    return { seeded: true }
  },
})
