export type Status = "active" | "needs-follow-up" | "payment-overdue" | "none"

export interface Profile {
  full_name: string
  email: string
  avatar_url: string
}

export interface User extends Profile {
  id: string
}

export interface Treatment {
  id: string
  name: string
  description: string
  price: number
  duration: number
}

export interface TreatmentHistoryEntry {
  date: string
  time: string
  doctor: string
  type: string
  observations: string
  recommendations: string[]
  nextVisit?: string
}

export interface Client {
  id: string
  fullName: string
  phone: string
  birthDate: string
  skinType?: string
  email?: string
  status: string
  lastTreatment?: { date: string; type: string }
  treatmentHistory?: TreatmentHistoryEntry[]
}
