"use client"

import { useMutation, useQuery } from "convex/react"
import { api } from "@/convex/_generated/api"
import type { Id } from "@/convex/_generated/dataModel"

export function useTreatmentHistory(clientId: Id<"clients">) {
  const entries = useQuery(api.cases.getCasesForClient, { clientId })
  const createEntry = useMutation(api.cases.createCase)

  return {
    entries,
    isLoading: entries === undefined,
    createEntry,
  }
}
