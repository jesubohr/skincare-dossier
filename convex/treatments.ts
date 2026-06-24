import { mutation, query } from "./_generated/server"
import { v } from "convex/values"
import { now, requireCurrentUser } from "./model"

// Common cosmetologist / esthetician treatments. Used to bootstrap a new
// practice so the appointment treatment picker is never empty. Tuple shape:
// [name, description, priceCents, durationMinutes].
const TREATMENT_CATALOG = [
  ["Classic Facial", "Cleanse, exfoliate, extract, and hydrate for everyday skin maintenance.", 9000, 60],
  ["Deep Cleansing Facial", "Targeted treatment for congested, oily skin with thorough extractions.", 11000, 60],
  ["Anti-Aging Facial", "Rejuvenating facial to reduce the appearance of fine lines and wrinkles.", 15000, 60],
  ["HydraFacial", "Deep cleansing, exfoliation, and intense hydration in one session.", 25000, 60],
  ["Chemical Peel", "Exfoliating acid treatment to improve skin texture, tone, and clarity.", 20000, 45],
  ["Microdermabrasion", "Mechanical resurfacing to smooth texture and refine pores.", 13000, 45],
  ["Micro-needling", "Collagen-stimulating treatment for texture, scars, and firmness.", 30000, 60],
  ["Dermaplaning", "Manual exfoliation removing dead skin and fine vellus hair.", 9000, 30],
  ["LED Light Therapy", "Wavelength-specific light to calm inflammation or boost collagen.", 6000, 30],
  ["Acne Treatment", "Clinical protocol for active breakouts and congestion.", 12000, 45],
  ["Brightening Treatment", "Targets hyperpigmentation and uneven tone for a luminous finish.", 16000, 60],
  ["Oxygen Facial", "Pressurized oxygen and serums to plump and revitalize the skin.", 14000, 45],
  ["Back Facial", "Deep cleansing and extractions for hard-to-reach back skin.", 13000, 60],
  ["Dermaplane + Peel", "Combined exfoliation and chemical peel for maximum renewal.", 22000, 60],
  ["Lash Lift & Tint", "Semi-permanent curl and tint to define the natural lash line.", 8000, 45],
  ["Eyebrow Shaping & Tint", "Shaping and tinting to frame and define the brows.", 4000, 30],
] as const

export const getTreatments = query({
  args: {},
  handler: async (ctx) => {
    const user = await requireCurrentUser(ctx)
    const treatments = await ctx.db
      .query("treatments")
      .withIndex("by_userId", (q) => q.eq("userId", user._id))
      .collect()

    return treatments
      .filter((treatment) => treatment.archivedAt === undefined)
      .map((treatment) => ({
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

// Soft delete — flags the treatment as archived so it drops out of the service
// menu while existing appointments keep their denormalized treatmentName.
export const archiveTreatment = mutation({
  args: {
    id: v.id("treatments"),
  },
  handler: async (ctx, args) => {
    const user = await requireCurrentUser(ctx)
    const treatment = await ctx.db.get(args.id)
    if (!treatment || treatment.userId !== user._id) {
      throw new Error("Treatment not found")
    }

    await ctx.db.patch(treatment._id, {
      archivedAt: now(),
      updatedAt: now(),
    })
  },
})

// Inserts any catalog treatments the practice does not already have, matched by
// name. Idempotent — safe to call repeatedly; existing treatments are untouched.
export const seedTreatmentCatalog = mutation({
  args: {},
  handler: async (ctx) => {
    const user = await requireCurrentUser(ctx)
    const existing = await ctx.db
      .query("treatments")
      .withIndex("by_userId", (q) => q.eq("userId", user._id))
      .collect()

    // Only dedup against active treatments — an archived catalog item should be
    // re-creatable as a fresh active record.
    const existingNames = new Set(existing.filter((treatment) => treatment.archivedAt === undefined).map((treatment) => treatment.name.toLowerCase()))
    const timestamp = now()
    let added = 0

    for (const [name, description, priceCents, durationMinutes] of TREATMENT_CATALOG) {
      if (existingNames.has(name.toLowerCase())) continue
      await ctx.db.insert("treatments", {
        userId: user._id,
        name,
        description,
        priceCents,
        durationMinutes,
        createdAt: timestamp,
        updatedAt: timestamp,
      })
      added += 1
    }

    return { added }
  },
})
