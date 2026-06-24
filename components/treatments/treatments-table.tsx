"use client"

import { useState } from "react"
import { Search, Pencil, Trash2 } from "lucide-react"

import type { Id } from "@/convex/_generated/dataModel"
import { useTreatments } from "@/lib/hooks/use-treatments"

import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { TreatmentSheet } from "@/components/treatments/treatment-sheet"

interface TreatmentRow {
  id: string
  name: string
  description?: string
  durationMinutes: number
  price?: number
}

interface TreatmentsTableProps {
  treatments: TreatmentRow[]
}

const priceFormatter = new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" })

export function TreatmentsTable({ treatments }: TreatmentsTableProps) {
  const { archiveTreatment } = useTreatments()
  const [searchQuery, setSearchQuery] = useState("")
  const [pendingId, setPendingId] = useState<string | null>(null)

  const filtered = treatments.filter((treatment) => {
    const query = searchQuery.toLowerCase()
    return treatment.name.toLowerCase().includes(query) || treatment.description?.toLowerCase().includes(query)
  })

  const handleArchive = async (id: string) => {
    setPendingId(id)
    try {
      await archiveTreatment({ id: id as Id<"treatments"> })
    } finally {
      setPendingId(null)
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="relative max-w-sm">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Search treatments..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="w-[300px] pl-9" />
        </div>
        <div className="text-sm text-muted-foreground">
          {filtered.length} treatment{filtered.length !== 1 ? "s" : ""}
        </div>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[220px]">Treatment</TableHead>
              <TableHead>Description</TableHead>
              <TableHead className="w-[110px] text-right">Duration</TableHead>
              <TableHead className="w-[110px] text-right">Price</TableHead>
              <TableHead className="w-[100px]">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filtered.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className="h-24 text-center text-muted-foreground">
                  No treatments found
                </TableCell>
              </TableRow>
            ) : (
              filtered.map((treatment) => (
                <TableRow key={treatment.id}>
                  <TableCell className="font-medium">{treatment.name}</TableCell>
                  <TableCell className="max-w-[360px] truncate text-muted-foreground">{treatment.description || "—"}</TableCell>
                  <TableCell className="text-right font-mono text-sm tabular-nums">{treatment.durationMinutes} min</TableCell>
                  <TableCell className="text-right font-mono text-sm tabular-nums">
                    {treatment.price !== undefined ? priceFormatter.format(treatment.price) : "—"}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <TreatmentSheet
                        treatment={treatment}
                        trigger={
                          <Button variant="ghost" size="icon-sm">
                            <Pencil className="h-4 w-4" />
                          </Button>
                        }
                      />
                      <Button
                        variant="ghost"
                        size="icon-sm"
                        title="Remove from menu"
                        disabled={pendingId === treatment.id}
                        onClick={() => handleArchive(treatment.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
