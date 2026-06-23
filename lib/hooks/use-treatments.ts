"use client"

import { useMutation, useQuery } from "convex/react"
import { api } from "@/convex/_generated/api"
import type { Treatment } from "@/lib/types"

export function useTreatments() {
  const treatments = useQuery(api.treatments.getTreatments) as Treatment[] | undefined
  const createTreatment = useMutation(api.treatments.createTreatment)
  const updateTreatment = useMutation(api.treatments.updateTreatment)

  return {
    treatments: treatments?.map((treatment) => ({
      ...treatment,
      duration: treatment.durationMinutes,
      price: treatment.priceCents ? treatment.priceCents / 100 : undefined,
    })),
    isLoading: treatments === undefined,
    createTreatment,
    updateTreatment,
  }
}
