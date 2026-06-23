"use client"

import { useMutation, useQuery } from "convex/react"
import { api } from "@/convex/_generated/api"
import type { PracticeSettings } from "@/lib/types"

export function usePracticeSettings() {
  const settings = useQuery(api.settings.getPractice) as PracticeSettings | undefined
  const updatePractice = useMutation(api.settings.updatePractice)

  return {
    settings,
    isLoading: settings === undefined,
    updatePractice,
  }
}
