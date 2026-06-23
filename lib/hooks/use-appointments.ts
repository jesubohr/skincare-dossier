"use client"

import { useMutation, useQuery } from "convex/react"
import { api } from "@/convex/_generated/api"
import type { Appointment, AvailabilityBlock } from "@/lib/types"

export function useAppointments(range?: { start?: string; end?: string }) {
  const appointments = useQuery(api.appointments.getAppointments, range ?? {}) as Appointment[] | undefined
  const createAppointment = useMutation(api.appointments.createAppointment)
  const updateAppointment = useMutation(api.appointments.updateAppointment)
  const updateAppointmentStatus = useMutation(api.appointments.updateAppointmentStatus)
  const deleteAppointment = useMutation(api.appointments.deleteAppointment)

  return {
    appointments,
    isLoading: appointments === undefined,
    createAppointment,
    updateAppointment,
    updateAppointmentStatus,
    deleteAppointment,
  }
}

export function useAvailabilityBlocks(range?: { start?: string; end?: string }) {
  const blocks = useQuery(api.appointments.getAvailabilityBlocks, range ?? {}) as AvailabilityBlock[] | undefined
  const createAvailabilityBlock = useMutation(api.appointments.createAvailabilityBlock)
  const deleteAvailabilityBlock = useMutation(api.appointments.deleteAvailabilityBlock)

  return {
    blocks,
    isLoading: blocks === undefined,
    createAvailabilityBlock,
    deleteAvailabilityBlock,
  }
}
