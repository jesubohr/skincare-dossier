"use client"

import { useMemo, useState } from "react"
import { useLocale, useTranslations } from "next-intl"
import { CalendarClock, Clock, Plus } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { useAppointments } from "@/lib/hooks/use-appointments"
import { useClients } from "@/lib/hooks/use-clients"
import { useTreatments } from "@/lib/hooks/use-treatments"
import type { Appointment, AppointmentStatus } from "@/lib/types"
import type { Id } from "@/convex/_generated/dataModel"

const statuses: AppointmentStatus[] = ["pending", "confirmed", "checked_in", "completed", "cancelled", "no_show"]

function formatDateTime(value: string, locale: string) {
  return new Date(value).toLocaleString(locale, {
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  })
}

function rangeFromToday() {
  const start = new Date()
  start.setHours(0, 0, 0, 0)
  const end = new Date(start)
  end.setDate(end.getDate() + 14)
  end.setHours(23, 59, 59, 999)
  return { start: start.toISOString(), end: end.toISOString() }
}

export default function AppointmentsPage() {
  const t = useTranslations("Appointments")
  const statusText = useTranslations("Common.appointmentStatus")
  const common = useTranslations("Common")
  const locale = useLocale()
  const range = useMemo(() => rangeFromToday(), [])
  const { appointments, createAppointment, updateAppointmentStatus } = useAppointments(range)
  const { clients } = useClients()
  const { treatments } = useTreatments()
  const [saving, setSaving] = useState(false)
  const [formError, setFormError] = useState<string | null>(null)

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setSaving(true)
    setFormError(null)

    try {
      const formData = new FormData(event.currentTarget)
      const startsAt = new Date(String(formData.get("startsAt"))).toISOString()
      const endsAt = new Date(String(formData.get("endsAt"))).toISOString()
      const clientId = String(formData.get("clientId")) as Id<"clients">
      const treatmentId = String(formData.get("treatmentId")) as Id<"treatments">

      if (new Date(endsAt).getTime() <= new Date(startsAt).getTime()) {
        setFormError(t("invalidRange"))
        return
      }

      await createAppointment({
        clientId,
        treatmentId,
        startsAt,
        endsAt,
        status: String(formData.get("status")) as AppointmentStatus,
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
        <h1 className="text-2xl font-semibold tracking-tight text-foreground">{t("title")}</h1>
        <p className="mt-1 text-sm text-muted-foreground">{t("subtitle")}</p>
      </div>

      <section className="grid gap-4 xl:grid-cols-[380px_minmax(0,1fr)]">
        <Card className="gap-0 py-0 shadow-none">
          <CardContent className="p-5">
            <div className="mb-5 flex items-center gap-2">
              <Plus className="size-4 text-muted-foreground" />
              <h2 className="font-semibold text-foreground">{t("newTitle")}</h2>
            </div>

            <form className="space-y-4" onSubmit={handleSubmit}>
              <div className="space-y-2">
                <Label htmlFor="clientId">{t("client")}</Label>
                <Select name="clientId" required>
                  <SelectTrigger id="clientId" className="w-full">
                    <SelectValue placeholder={t("selectClient")} />
                  </SelectTrigger>
                  <SelectContent>
                    {(clients ?? []).map((client) => (
                      <SelectItem key={client.id} value={client.id}>
                        {client.fullName}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="treatmentId">{t("treatment")}</Label>
                <Select name="treatmentId" required>
                  <SelectTrigger id="treatmentId" className="w-full">
                    <SelectValue placeholder={t("selectTreatment")} />
                  </SelectTrigger>
                  <SelectContent>
                    {(treatments ?? []).map((treatment) => (
                      <SelectItem key={treatment.id} value={treatment.id}>
                        {treatment.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="grid gap-3 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="startsAt">{t("starts")}</Label>
                  <Input id="startsAt" name="startsAt" type="datetime-local" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="endsAt">{t("ends")}</Label>
                  <Input id="endsAt" name="endsAt" type="datetime-local" required />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="status">{t("status")}</Label>
                <Select name="status" defaultValue="pending">
                  <SelectTrigger id="status" className="w-full">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {statuses.map((status) => (
                      <SelectItem key={status} value={status}>
                        {statusText(status)}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="notes">{t("notes")}</Label>
                <Textarea id="notes" name="notes" rows={3} placeholder={t("notesPlaceholder")} />
              </div>

              <Button type="submit" disabled={saving || !clients?.length || !treatments?.length} className="w-full">
                {saving ? common("saving") : t("create")}
              </Button>
              {formError && <p className="text-sm text-destructive">{formError}</p>}
            </form>
          </CardContent>
        </Card>

        <Card className="gap-0 py-0 shadow-none">
          <CardContent className="p-5">
            <div className="mb-5 flex flex-wrap items-start justify-between gap-3">
              <div>
                <h2 className="font-semibold text-foreground">{t("upcoming")}</h2>
                <p className="mt-1 text-sm text-muted-foreground">{t("next14")}</p>
              </div>
              <CalendarClock className="size-4 text-muted-foreground" />
            </div>

            <div className="space-y-3">
              {appointments === undefined ? (
                <p className="rounded-lg border border-dashed bg-secondary/35 p-4 text-sm text-muted-foreground">{t("loading")}</p>
              ) : appointments.length === 0 ? (
                <p className="rounded-lg border border-dashed bg-secondary/35 p-4 text-sm text-muted-foreground">{t("empty")}</p>
              ) : (
                appointments.map((appointment) => (
                  <AppointmentRow
                    key={appointment.id}
                    appointment={appointment}
                    locale={locale}
                    statusText={statusText}
                    onStatusChange={(status) => updateAppointmentStatus({ id: appointment.id as Id<"appointments">, status })}
                  />
                ))
              )}
            </div>
          </CardContent>
        </Card>
      </section>
    </div>
  )
}

function AppointmentRow({
  appointment,
  locale,
  statusText,
  onStatusChange,
}: {
  appointment: Appointment
  locale: string
  statusText: ReturnType<typeof useTranslations>
  onStatusChange: (status: AppointmentStatus) => void
}) {
  return (
    <div className="grid gap-3 rounded-lg border bg-card p-4 lg:grid-cols-[minmax(0,1fr)_180px]">
      <div className="min-w-0">
        <div className="flex flex-wrap items-center gap-2">
          <p className="font-medium text-foreground">{appointment.clientName}</p>
          <span className="font-mono text-xs uppercase tracking-[0.10em] text-muted-foreground">{statusText(appointment.status)}</span>
        </div>
        <p className="mt-1 text-sm text-muted-foreground">{appointment.treatmentName}</p>
        <div className="mt-3 flex items-center gap-2 font-mono text-xs text-muted-foreground">
          <Clock className="size-3.5" />
          {formatDateTime(appointment.startsAt, locale)} - {appointment.durationMinutes} min
        </div>
      </div>

      <Select value={appointment.status} onValueChange={(value) => onStatusChange(value as AppointmentStatus)}>
        <SelectTrigger className="w-full">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {statuses.map((status) => (
            <SelectItem key={status} value={status}>
              {statusText(status)}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  )
}
