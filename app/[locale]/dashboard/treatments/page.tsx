"use client"

import { useState } from "react"
import { useTranslations } from "next-intl"
import { ListPlus } from "lucide-react"

import { useTreatments } from "@/lib/hooks/use-treatments"

import { Button } from "@/components/ui/button"
import { TreatmentSheet } from "@/components/treatments/treatment-sheet"
import { TreatmentsTable } from "@/components/treatments/treatments-table"

export default function TreatmentsPage() {
  const t = useTranslations("Treatments")
  const { treatments, isLoading, seedTreatmentCatalog } = useTreatments()
  const [seeding, setSeeding] = useState(false)

  const handleSeed = async () => {
    setSeeding(true)
    try {
      await seedTreatmentCatalog()
    } finally {
      setSeeding(false)
    }
  }

  return (
    <div className="mx-auto max-w-7xl space-y-6">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight text-foreground">{t("title")}</h1>
          <p className="mt-1 text-sm text-muted-foreground">{t("subtitle")}</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" onClick={handleSeed} disabled={seeding}>
            <ListPlus className="h-4 w-4" />
            {seeding ? t("adding") : t("addCommon")}
          </Button>
          <TreatmentSheet />
        </div>
      </div>

      {isLoading ? <p className="text-sm text-muted-foreground">{t("loading")}</p> : <TreatmentsTable treatments={treatments ?? []} />}
    </div>
  )
}
