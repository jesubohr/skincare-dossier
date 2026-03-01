import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import type { Status } from "./types"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Calculates the age of a person based on their birth date.
 * @param birthDate The birth date of the person in YYYY-MM-DD format.
 * @returns The age of the person in years.
 */
export function calculateAge(birthDate: string): number {
  const today = new Date()
  const birthDateObj = new Date(birthDate)
  let age = today.getFullYear() - birthDateObj.getFullYear()
  const monthDiff = today.getMonth() - birthDateObj.getMonth()

  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDateObj.getDate())) {
    age--
  }

  return age
}

/**
 * Gets the initials of a name.
 * @param name The name of the client.
 * @returns The initials of the name.
 */
export function getAvatarInitials(name: string): string {
  const words = name.split(" ")
  let initials = ""

  for (const word of words) {
    initials += word.charAt(0).toUpperCase()
  }

  return initials
}

/**
 * Gets the color of the avatar based on the name.
 * @param name The name of the client.
 * @returns The color of the avatar.
 */
export function getAvatarColor(name: string): string {
  // Calculate color based on name, not random
  const colors = ["#D4A574", "#9CA3AF", "#D4A574", "#9CA3AF", "#D4A574", "#9CA3AF"]

  const index = name.length % colors.length
  return colors[index]
}

/**
 * Gets the color of the status.
 * @param status The status of the client.
 * @returns The color of the status.
 */
export function getStatusColor(status: Status): string {
  const colors = {
    active: "bg-emerald-500",
    "needs-follow-up": "bg-amber-500",
    "payment-overdue": "bg-rose-500",
    none: "bg-gray-500",
  }

  return colors[status]
}

/**
 * Gets the text of the status.
 * @param status The status of the client.
 * @returns The text of the status.
 */
export function getStatusText(status: Status): string {
  const texts = {
    active: "Active",
    "needs-follow-up": "Needs Follow-up",
    "payment-overdue": "Payment Overdue",
    none: "None",
  }

  return texts[status]
}

export function formatPhoneDinamically(phone: string): string {
  // Allow only numbers and +
  const cleaned = phone.replace(/[^\d+]/g, "")

  // Format as (XXX) XXX XXXX
  return cleaned.replace(/(\d{3})(\d{3})(\d{4})/, "($1) $2 $3")
}
