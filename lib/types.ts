export type Status = "active" | "needs-follow-up" | "payment-overdue" | "none"

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
  name: string
  initials: string
  avatarColor: string
  status: "active" | "needs-follow-up" | "payment-overdue" | "none"
  phone: string
  birthDate: string
  skinType?: string
  email?: string
  lastTreatment: {
    date: string
    type: string
  }
  treatmentHistory?: TreatmentHistoryEntry[]
}