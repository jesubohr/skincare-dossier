"use client"

import { useMemo, useState } from "react"
import { Ban, CalendarDays, Clock, Plus } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { useAppointments, useAvailabilityBlocks } from "@/lib/hooks/use-appointments"
import type { Appointment, AvailabilityBlock, AvailabilityBlockKind } from "@/lib/types"
import type { Id } from "@/convex/_generated/dataModel"

function weekRange() {
  const start = new Date()
  start.setHours(0, 0, 0, 0)
  const day = start.getDay()
  start.setDate(start.getDate() - day)
  const end = new Date(start)
  end.setDate(start.getDate() + 6)
  end.setHours(23, 59, 59, 999)

  return { start: start.toISOString(), end: end.toISOString() }
}

function daysForRange(startIso: string) {
  const start = new Date(startIso)
  return Array.from({ length: 7 }, (_, index) => {
    const date = new Date(start)
    date.setDate(start.getDate() + index)
    return date
  })
}

function dayKey(date: Date) {
  return date.toISOString().slice(0, 10)
}

function itemDay(value: string) {
  return value.slice(0, 10)
}

function formatTime(value: string) {
  return new Date(value).toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" })
}

export default function CalendarPage() {
  const range = useMemo(() => weekRange(), [])
  const days = useMemo(() => daysForRange(range.start), [range.start])
  const { appointments } = useAppointments(range)
  const { blocks, createAvailabilityBlock, deleteAvailabilityBlock } = useAvailabilityBlocks(range)
  const [saving, setSaving] = useState(false)

  async function handleBlockSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setSaving(true)

    try {
      const formData = new FormData(event.currentTarget)
      await createAvailabilityBlock({
        title: String(formData.get("title")),
        kind: String(formData.get("kind")) as AvailabilityBlockKind,
        startsAt: new Date(String(formData.get("startsAt"))).toISOString(),
        endsAt: new Date(String(formData.get("endsAt"))).toISOString(),
        notes: String(formData.get("notes") ?? "") || undefined,
      })
      event.currentTarget.reset()
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight text-foreground">Calendar</h1>
        <p className="mt-1 text-sm text-muted-foreground">Weekly view of appointments and availability blocks</p>
      </div>

      <section className="grid gap-4 xl:grid-cols-[minmax(0,1fr)_360px]">
        <Card className="gap-0 py-0 shadow-none">
          <CardContent className="p-5">
            <div className="mb-5 flex items-center gap-2">
              <CalendarDays className="size-4 text-muted-foreground" />
              <h2 className="font-semibold text-foreground">This Week</h2>
            </div>

            <div className="grid gap-3 md:grid-cols-7">
              {days.map((day) => {
                const key = dayKey(day)
                const dayAppointments = (appointments ?? []).filter((appointment) => itemDay(appointment.startsAt) === key)
                const dayBlocks = (blocks ?? []).filter((block) => itemDay(block.startsAt) === key)

                return (
                  <div key={key} className="min-h-72 rounded-lg border bg-secondary/30 p-3">
                    <div className="mb-3">
                      <p className="font-mono text-xs uppercase tracking-[0.12em] text-muted-foreground">
                        {day.toLocaleDateString("en-US", { weekday: "short" })}
                      </p>
                      <p className="mt-1 text-xl font-semibold tabular-nums text-foreground">{day.getDate()}</p>
                    </div>

                    <div className="space-y-2">
                      {dayAppointments.map((appointment) => (
                        <CalendarAppointment key={appointment.id} appointment={appointment} />
                      ))}
                      {dayBlocks.map((block) => (
                        <CalendarBlock key={block.id} block={block} onDelete={() => deleteAvailabilityBlock({ id: block.id as Id<"availabilityBlocks"> })} />
                      ))}
                      {dayAppointments.length === 0 && dayBlocks.length === 0 && <p className="text-xs text-muted-foreground">Open</p>}
                    </div>
                  </div>
                )
              })}
            </div>
          </CardContent>
        </Card>

        <Card className="gap-0 py-0 shadow-none">
          <CardContent className="p-5">
            <div className="mb-5 flex items-center gap-2">
              <Plus className="size-4 text-muted-foreground" />
              <h2 className="font-semibold text-foreground">Availability Block</h2>
            </div>

            <form className="space-y-4" onSubmit={handleBlockSubmit}>
              <div className="space-y-2">
                <Label htmlFor="title">Title</Label>
                <Input id="title" name="title" placeholder="Room reset" required />
              </div>

              <div className="space-y-2">
                <Label htmlFor="kind">Kind</Label>
                <Select name="kind" defaultValue="admin">
                  <SelectTrigger id="kind" className="w-full">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="admin">Admin</SelectItem>
                    <SelectItem value="time_off">Time off</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="startsAt">Starts</Label>
                <Input id="startsAt" name="startsAt" type="datetime-local" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="endsAt">Ends</Label>
                <Input id="endsAt" name="endsAt" type="datetime-local" required />
              </div>

              <div className="space-y-2">
                <Label htmlFor="notes">Notes</Label>
                <Textarea id="notes" name="notes" rows={3} placeholder="Internal reason or room context" />
              </div>

              <Button type="submit" disabled={saving} className="w-full">
                {saving ? "Saving..." : "Create block"}
              </Button>
            </form>
          </CardContent>
        </Card>
      </section>
    </div>
  )
}

function CalendarAppointment({ appointment }: { appointment: Appointment }) {
  return (
    <div className="rounded-md border bg-card p-2">
      <p className="truncate text-sm font-medium text-foreground">{appointment.clientName}</p>
      <p className="mt-1 truncate text-xs text-muted-foreground">{appointment.treatmentName}</p>
      <p className="mt-2 flex items-center gap-1 font-mono text-[11px] text-muted-foreground">
        <Clock className="size-3" />
        {formatTime(appointment.startsAt)}
      </p>
    </div>
  )
}

function CalendarBlock({ block, onDelete }: { block: AvailabilityBlock; onDelete: () => void }) {
  return (
    <div className="rounded-md border border-dashed bg-card p-2">
      <div className="flex items-start justify-between gap-2">
        <div className="min-w-0">
          <p className="truncate text-sm font-medium text-foreground">{block.title}</p>
          <p className="mt-1 font-mono text-[11px] uppercase tracking-[0.10em] text-muted-foreground">{block.kind.replace("_", " ")}</p>
        </div>
        <Button type="button" variant="ghost" size="icon-sm" onClick={onDelete} aria-label="Delete availability block">
          <Ban className="size-3.5" />
        </Button>
      </div>
    </div>
  )
}
