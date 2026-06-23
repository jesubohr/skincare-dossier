import type { Id } from "@/convex/_generated/dataModel"

export type ClientStatus = "active" | "needs-follow-up" | "payment-overdue" | "none"
export type Status = ClientStatus
export type AppointmentStatus = "pending" | "confirmed" | "checked_in" | "completed" | "cancelled" | "no_show"
export type AvailabilityBlockKind = "time_off" | "admin" | "other"

export interface Profile {
  _id?: Id<"users">
  fullName: string
  displayName?: string
  email: string
  avatarUrl?: string
  avatar_url?: string
  phone?: string
  professionalTitle?: string
  licenseNumber?: string
  specialties: string[]
  bio?: string
}

export interface User extends Profile {
  id: string
}

export interface Treatment {
  _id?: Id<"treatments">
  id: string
  name: string
  description?: string
  priceCents?: number
  price?: number
  durationMinutes: number
  duration?: number
}

export interface TreatmentHistoryEntry {
  id?: string
  date: string
  time: string
  doctor: string
  type: string
  observations: string
  recommendations: string[]
  nextVisit?: string
}

export interface Client {
  _id?: Id<"clients">
  id: string
  fullName: string
  name?: string
  phone: string
  birthDate: string
  skinType?: string
  email?: string
  status: ClientStatus
  lastTreatment?: { date: string; type: string }
  treatmentHistory?: TreatmentHistoryEntry[]
}

export interface Appointment {
  _id?: Id<"appointments">
  id: string
  clientId?: Id<"clients">
  treatmentId?: Id<"treatments">
  title: string
  clientName: string
  treatmentName: string
  startsAt: string
  endsAt: string
  status: AppointmentStatus
  notes?: string
  durationMinutes: number
}

export interface AvailabilityBlock {
  _id?: Id<"availabilityBlocks">
  id: string
  title: string
  kind: AvailabilityBlockKind
  startsAt: string
  endsAt: string
  notes?: string
}

export interface PracticeSettings {
  timezone: string
  workdayStart: string
  workdayEnd: string
  lunchStart?: string
  lunchEnd?: string
  slotIntervalMinutes: number
  dailyCapacityMinutes: number
}
