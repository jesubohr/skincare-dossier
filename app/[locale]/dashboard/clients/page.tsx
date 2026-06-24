"use client"

import { useTranslations } from "next-intl"
import { useQuery } from "convex/react"
import { api } from "@/convex/_generated/api"
import type { Client } from "@/lib/types"
import { ClientsTable } from "@/components/clients/clients-table"
import { NewClientSheet } from "@/components/clients/new-client-sheet"

export default function ClientsPage() {
  const t = useTranslations("Clients")
  const clients = useQuery(api.clients.getClients)

  return (
    <div className="mx-auto max-w-7xl space-y-6">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight text-foreground">{t("title")}</h1>
          <p className="mt-1 text-sm text-muted-foreground">{t("subtitle")}</p>
        </div>
        <NewClientSheet />
      </div>

      <ClientsTable clients={(clients ?? []) as unknown as Client[]} />
    </div>
  )
}
