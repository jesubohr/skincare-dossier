"use client"

import { useMutation, useQuery } from "convex/react"
import { api } from "@/convex/_generated/api"
import type { Id } from "@/convex/_generated/dataModel"
import type { Client } from "@/lib/types"

export function useClients() {
  const clients = useQuery(api.clients.getClients) as Client[] | undefined
  const createClientMutation = useMutation(api.clients.createClient)
  const updateClientMutation = useMutation(api.clients.updateClient)

  return {
    clients,
    isLoading: clients === undefined,
    createClient: createClientMutation,
    updateClient: (client: {
      id: Id<"clients">
      name?: string
      fullName?: string
      email?: string
      phone: string
      birthDate: string
      skinType?: string
      status?: Client["status"]
    }) =>
      updateClientMutation({
        id: client.id,
        fullName: client.fullName ?? client.name ?? "",
        email: client.email || undefined,
        phone: client.phone,
        birthDate: client.birthDate,
        skinType: client.skinType,
        status: client.status,
      }),
  }
}

export function useClient(id: Id<"clients">) {
  const client = useQuery(api.clients.getClient, { id }) as Client | null | undefined

  return {
    client,
    isLoading: client === undefined,
  }
}
