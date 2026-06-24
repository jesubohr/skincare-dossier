"use client"

import { useMemo } from "react"
import { useLocale, useTranslations } from "next-intl"
import { useQuery } from "convex/react"
import { ArrowRight, CalendarDays, Clock, Plus } from "lucide-react"

import { Link } from "@/i18n/navigation"
import { api } from "@/convex/_generated/api"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import type { Appointment, Client } from "@/lib/types"

type DashboardSummary = {
  user: { fullName: string; displayName?: string }
  todaysAppointments: Appointment[]
  pendingFollowUps: Client[]
  confirmedAppointments: number
  bookedMinutes: number
  capacityMinutes: number
  utilization: number
  nextAppointment?: Appointment
  clientCount: number
}

function todayKey() {
  const today = new Date()
  const year = today.getFullYear()
  const month = String(today.getMonth() + 1).padStart(2, "0")
  const day = String(today.getDate()).padStart(2, "0")
  return `${year}-${month}-${day}`
}

function formatDayLabel(day: string, locale: string) {
  return new Date(`${day}T12:00:00`).toLocaleDateString(locale, {
    weekday: "long",
    month: "long",
    day: "numeric",
  })
}

function formatTime(value: string, locale: string) {
  return new Date(value).toLocaleTimeString(locale, { hour: "2-digit", minute: "2-digit" })
}

export default function DashboardPage() {
  const locale = useLocale()
  const t = useTranslations("Dashboard")
  const common = useTranslations("Common")
  const status = useTranslations("Common.appointmentStatus")
  const day = useMemo(() => todayKey(), [])
  const summary = useQuery(api.dashboard.getSummary, { day }) as DashboardSummary | undefined

  if (!summary) {
    return <DashboardSkeleton />
  }

  const practitionerName = summary.user.displayName ?? summary.user.fullName
  const firstName = practitionerName.split(" ")[0] ?? t("fallbackName")

  return (
    <div className="space-y-8">
      <section className="space-y-7">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight text-foreground">{t("title")}</h1>
          <p className="mt-1 text-sm text-muted-foreground">{t("subtitle")}</p>
        </div>

        <div className="space-y-2">
          <p className="font-mono text-xs uppercase tracking-[0.14em] text-muted-foreground">{formatDayLabel(day, locale)}</p>
          <div className="space-y-1">
            <h2 className="font-serif text-4xl leading-none tracking-tight text-foreground md:text-5xl">
              {t("greeting")}
              <span className="italic text-accent-foreground">{firstName}</span>
            </h2>
            <p className="text-sm text-muted-foreground">
              {summary.todaysAppointments.length === 0
                ? t("noAppointmentsToday")
                : summary.nextAppointment
                  ? t("appointmentsTodayWithNext", {
                      count: summary.todaysAppointments.length,
                      time: formatTime(summary.nextAppointment.startsAt, locale),
                      client: summary.nextAppointment.clientName,
                    })
                  : t("appointmentsTodayNoNext", { count: summary.todaysAppointments.length })}
            </p>
          </div>
        </div>
      </section>

      <section className="grid gap-4 xl:grid-cols-[minmax(0,1.55fr)_minmax(360px,0.9fr)]">
        <TodaySchedule appointments={summary.todaysAppointments} confirmedAppointments={summary.confirmedAppointments} locale={locale} />

        <div className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <MetricTile
              label={t("appointmentsToday")}
              value={String(summary.todaysAppointments.length)}
              detail={t("appointmentsDetail", {
                confirmed: summary.confirmedAppointments,
                pending: summary.todaysAppointments.length - summary.confirmedAppointments,
              })}
              tone="soft"
            />
            <MetricTile label={t("pendingFollowUps")} value={String(summary.pendingFollowUps.length)} detail={t("pendingDetail")} />
          </div>

          <UtilizationCard utilization={summary.utilization} bookedMinutes={summary.bookedMinutes} capacityMinutes={summary.capacityMinutes} />
          <FollowUpQueue clients={summary.pendingFollowUps} />
        </div>
      </section>
    </div>
  )

  function TodaySchedule({
    appointments,
    confirmedAppointments,
    locale,
  }: {
    appointments: Appointment[]
    confirmedAppointments: number
    locale: string
  }) {
    return (
      <Card className="min-h-135 gap-0 py-0 shadow-none">
        <CardContent className="flex h-full flex-col px-5 py-5 md:px-6">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <h3 className="text-base font-semibold text-foreground">{t("scheduleTitle")}</h3>
              <p className="mt-1 text-sm text-muted-foreground">
                {t("scheduleDetail", { count: appointments.length, pending: appointments.length - confirmedAppointments })}
              </p>
            </div>
            <Button variant="ghost" size="sm" className="gap-1 text-muted-foreground" asChild>
              <Link href="/dashboard/appointments">
                {t("viewSchedule")}
                <ArrowRight className="size-3.5" />
              </Link>
            </Button>
          </div>

          <div className="mt-8 space-y-4">
            {appointments.length === 0 ? (
              <div className="rounded-lg border border-dashed bg-secondary/35 p-6 text-sm text-muted-foreground">{t("noAppointmentsBooked")}</div>
            ) : (
              appointments.map((appointment) => (
                <div key={appointment.id} className="grid gap-3 sm:grid-cols-[64px_minmax(0,1fr)]">
                  <div className="font-mono tabular-nums text-sm text-muted-foreground">
                    <p className="text-foreground">{formatTime(appointment.startsAt, locale)}</p>
                    <p className="mt-1 text-xs">{appointment.durationMinutes} min</p>
                  </div>

                  <div className="flex flex-wrap items-center justify-between gap-3 rounded-lg border bg-secondary/45 p-4">
                    <div className="border-l border-primary pl-4">
                      <p className="font-medium text-foreground">{appointment.clientName}</p>
                      <p className="mt-1 text-sm text-muted-foreground">{appointment.treatmentName}</p>
                    </div>
                    <Badge variant={appointment.status === "confirmed" ? "secondary" : "outline"} className="gap-1.5">
                      <span className="size-1.5 rounded-full bg-primary" />
                      {status(appointment.status)}
                    </Badge>
                  </div>
                </div>
              ))
            )}
          </div>

          <Button
            variant="secondary"
            className="mt-auto h-12 justify-start border border-dashed border-border bg-accent text-accent-foreground hover:bg-accent/80"
            asChild
          >
            <Link href="/dashboard/appointments">
              <Plus className="size-4" />
              {t("addAppointment")}
            </Link>
          </Button>
        </CardContent>
      </Card>
    )
  }

  function UtilizationCard({ utilization, bookedMinutes, capacityMinutes }: { utilization: number; bookedMinutes: number; capacityMinutes: number }) {
    return (
      <Card className="gap-0 py-0 shadow-none">
        <CardContent className="p-5">
          <p className="font-mono text-xs uppercase tracking-[0.14em] text-muted-foreground">{t("dailyUtilization")}</p>

          <div className="mt-5 flex items-center gap-6">
            <div
              className="grid size-20 place-items-center rounded-full"
              style={{ background: `conic-gradient(var(--foreground) ${Math.min(utilization, 100) * 3.6}deg, var(--muted) 0deg)` }}
              aria-hidden="true"
            >
              <div className="size-14 rounded-full bg-card" />
            </div>

            <div>
              <p className="font-serif text-5xl leading-none tabular-nums tracking-tight text-foreground">{utilization}%</p>
              <p className="mt-2 text-sm text-muted-foreground">
                {t("capacityDetail", { booked: bookedMinutes, hours: Math.round(capacityMinutes / 60) })}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    )
  }

  function FollowUpQueue({ clients }: { clients: Client[] }) {
    return (
      <Card className="gap-0 py-0 shadow-none">
        <CardContent className="p-5">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="font-mono text-xs uppercase tracking-[0.14em] text-muted-foreground">{t("followUpQueue")}</p>
              <h3 className="mt-2 text-base font-semibold text-foreground">{t("clientsPending", { count: clients.length })}</h3>
            </div>
            <Clock className="size-4 text-muted-foreground" aria-hidden="true" />
          </div>

          <div className="mt-5 space-y-3">
            {clients.length === 0 ? (
              <p className="rounded-lg border border-dashed bg-secondary/35 p-4 text-sm text-muted-foreground">{t("noFollowUps")}</p>
            ) : (
              clients.map((client) => (
                <div key={client.id} className="flex items-center justify-between gap-3 rounded-lg border bg-card p-3">
                  <div className="min-w-0">
                    <p className="truncate font-medium text-foreground">{client.fullName}</p>
                    <p className="mt-1 truncate text-sm text-muted-foreground">{client.lastTreatment?.type ?? t("followUpNeeded")}</p>
                  </div>
                  <Button variant="ghost" size="sm" className="shrink-0 text-primary" asChild>
                    <Link href={`/dashboard/clients/${client.id}`}>
                      {common("view")}
                      <ArrowRight className="size-3.5" />
                    </Link>
                  </Button>
                </div>
              ))
            )}
          </div>

          <Button variant="outline" className="mt-5 w-full" asChild>
            <Link href="/dashboard/clients">
              {t("reviewClients")}
              <CalendarDays className="size-4" />
            </Link>
          </Button>
        </CardContent>
      </Card>
    )
  }
}

function DashboardSkeleton() {
  return (
    <div className="space-y-8">
      <div className="h-28 rounded-xl border bg-card" />
      <div className="grid gap-4 xl:grid-cols-[minmax(0,1.55fr)_minmax(360px,0.9fr)]">
        <div className="h-135 rounded-xl border bg-card" />
        <div className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="h-36 rounded-xl border bg-card" />
            <div className="h-36 rounded-xl border bg-card" />
          </div>
          <div className="h-48 rounded-xl border bg-card" />
        </div>
      </div>
    </div>
  )
}

function MetricTile({ label, value, detail, tone = "dark" }: { label: string; value: string; detail: string; tone?: "soft" | "dark" }) {
  const isSoft = tone === "soft"

  return (
    <Card
      className={
        isSoft ? "gap-0 border-transparent bg-accent py-0 shadow-none" : "gap-0 border-primary bg-primary py-0 text-primary-foreground shadow-none"
      }
    >
      <CardContent className="p-5">
        <p
          className={
            isSoft
              ? "font-mono text-xs uppercase tracking-[0.14em] text-accent-foreground"
              : "font-mono text-xs uppercase tracking-[0.14em] text-primary-foreground/70"
          }
        >
          {label}
        </p>
        <p className="mt-3 font-serif text-5xl leading-none tabular-nums tracking-tight">{value}</p>
        <p className={isSoft ? "mt-3 text-sm text-muted-foreground" : "mt-3 text-sm text-primary-foreground/70"}>{detail}</p>
      </CardContent>
    </Card>
  )
}
