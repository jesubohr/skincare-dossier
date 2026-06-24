import type { GenericQueryCtx, GenericMutationCtx } from "convex/server"
import type { DataModel, Doc, Id } from "./_generated/dataModel"

type Ctx = GenericQueryCtx<DataModel> | GenericMutationCtx<DataModel>

export const DEFAULT_SETTINGS = {
  timezone: "America/Bogota",
  workdayStart: "09:00",
  workdayEnd: "18:00",
  lunchStart: "13:00",
  lunchEnd: "14:00",
  slotIntervalMinutes: 30,
  dailyCapacityMinutes: 480,
}

export function now() {
  return Date.now()
}

export async function getCurrentUser(ctx: Ctx): Promise<Doc<"users"> | null> {
  const identity = await ctx.auth.getUserIdentity()
  const email = identity?.email

  if (!identity || !email) {
    return null
  }

  const bySubject = identity.subject
    ? await ctx.db
        .query("users")
        .withIndex("by_authSubject", (q) => q.eq("authSubject", identity.subject))
        .first()
    : null

  if (bySubject) return bySubject

  return await ctx.db
    .query("users")
    .withIndex("by_email", (q) => q.eq("email", email))
    .first()
}

export async function requireCurrentUser(ctx: Ctx): Promise<Doc<"users">> {
  const user = await getCurrentUser(ctx)
  if (!user) {
    throw new Error("Not authenticated")
  }
  return user
}

export async function requireOwnedClient(ctx: Ctx, userId: Id<"users">, clientId: Id<"clients">) {
  const client = await ctx.db.get(clientId)
  if (!client || client.userId !== userId) {
    throw new Error("Client not found")
  }
  return client
}

export async function getPracticeSettings(ctx: Ctx, userId: Id<"users">) {
  return await ctx.db
    .query("practiceSettings")
    .withIndex("by_userId", (q) => q.eq("userId", userId))
    .first()
}

export function dateOnly(iso: string) {
  return iso.slice(0, 10)
}

export function timeOnly(iso: string) {
  return iso.slice(11, 16)
}

export function minutesBetween(startsAt: string, endsAt: string) {
  const start = new Date(startsAt).getTime()
  const end = new Date(endsAt).getTime()
  if (!Number.isFinite(start) || !Number.isFinite(end) || end <= start) return 0
  return Math.round((end - start) / 60000)
}

function getTimeZoneOffsetMs(date: Date, timeZone: string) {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone,
    hourCycle: "h23",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  }).formatToParts(date)

  const values = Object.fromEntries(parts.filter((part) => part.type !== "literal").map((part) => [part.type, Number(part.value)]))
  const zonedAsUtc = Date.UTC(values.year, values.month - 1, values.day, values.hour, values.minute, values.second)
  return zonedAsUtc - date.getTime()
}

function zonedDateTimeToUtc(year: number, month: number, day: number, timeZone: string) {
  const localAsUtc = Date.UTC(year, month - 1, day, 0, 0, 0, 0)
  const firstPass = localAsUtc - getTimeZoneOffsetMs(new Date(localAsUtc), timeZone)
  const secondPass = localAsUtc - getTimeZoneOffsetMs(new Date(firstPass), timeZone)
  return new Date(secondPass)
}

export function sameDayRange(day: string, timeZone = DEFAULT_SETTINGS.timezone) {
  const [year, month, date] = day.split("-").map(Number)

  if (!year || !month || !date) {
    return {
      start: `${day}T00:00:00.000Z`,
      end: `${day}T23:59:59.999Z`,
    }
  }

  const nextDay = new Date(Date.UTC(year, month - 1, date + 1))
  const start = zonedDateTimeToUtc(year, month, date, timeZone)
  const end = new Date(
    zonedDateTimeToUtc(nextDay.getUTCFullYear(), nextDay.getUTCMonth() + 1, nextDay.getUTCDate(), timeZone).getTime() - 1,
  )

  return {
    start: start.toISOString(),
    end: end.toISOString(),
  }
}
