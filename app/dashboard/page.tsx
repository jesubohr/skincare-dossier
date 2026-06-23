"use client"

import Link from "next/link"
import { useMemo } from "react"
import { useQuery } from "convex/react"
import { ArrowRight, CalendarDays, Clock, Plus } from "lucide-react"

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
  return new Date().toISOString().slice(0, 10)
}

function formatDayLabel(day: string) {
  return new Date(`${day}T12:00:00`).toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
  })
}

function formatTime(value: string) {
  return new Date(value).toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" })
}

function statusLabel(status: Appointment["status"]) {
  return status
    .split("_")
    .map((part) => part[0].toUpperCase() + part.slice(1))
    .join(" ")
}

export default function DashboardPage() {
  const day = useMemo(() => todayKey(), [])
  const summary = useQuery(api.dashboard.getSummary, { day }) as DashboardSummary | undefined

  if (!summary) {
    return <DashboardSkeleton />
  }

  const practitionerName = summary.user.displayName ?? summary.user.fullName
  const firstName = practitionerName.split(" ")[0] ?? "there"

  return (
    <div className="space-y-8">
      <section className="space-y-7">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight text-foreground">Dashboard</h1>
          <p className="mt-1 text-sm text-muted-foreground">Your day at a glance</p>
        </div>

        <div className="space-y-2">
          <p className="font-mono text-xs uppercase tracking-[0.14em] text-muted-foreground">{formatDayLabel(day)}</p>
          <div className="space-y-1">
            <h2 className="font-serif text-4xl leading-none tracking-tight text-foreground md:text-5xl">
              Good morning, <span className="italic text-accent-foreground">{firstName}.</span>
            </h2>
            <p className="text-sm text-muted-foreground">
              {summary.todaysAppointments.length === 0
                ? "No appointments are scheduled today."
                : `You have ${summary.todaysAppointments.length} appointments today. Next: ${
                    summary.nextAppointment ? `${formatTime(summary.nextAppointment.startsAt)} with ${summary.nextAppointment.clientName}` : "none remaining"
                  }.`}
            </p>
          </div>
        </div>
      </section>

      <section className="grid gap-4 xl:grid-cols-[minmax(0,1.55fr)_minmax(360px,0.9fr)]">
        <TodaySchedule appointments={summary.todaysAppointments} confirmedAppointments={summary.confirmedAppointments} />

        <div className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <MetricTile
              label="Appointments Today"
              value={String(summary.todaysAppointments.length)}
              detail={`${summary.confirmedAppointments} confirmed - ${summary.todaysAppointments.length - summary.confirmedAppointments} pending`}
              tone="soft"
            />
            <MetricTile label="Pending Follow-ups" value={String(summary.pendingFollowUps.length)} detail="Clients waiting for outreach" />
          </div>

          <UtilizationCard utilization={summary.utilization} bookedMinutes={summary.bookedMinutes} capacityMinutes={summary.capacityMinutes} />
          <FollowUpQueue clients={summary.pendingFollowUps} />
        </div>
      </section>
    </div>
  )
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

function TodaySchedule({ appointments, confirmedAppointments }: { appointments: Appointment[]; confirmedAppointments: number }) {
  return (
    <Card className="min-h-135 gap-0 py-0 shadow-none">
      <CardContent className="flex h-full flex-col px-5 py-5 md:px-6">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <h3 className="text-base font-semibold text-foreground">Today&apos;s Schedule</h3>
            <p className="mt-1 text-sm text-muted-foreground">
              {appointments.length} appointments - {appointments.length - confirmedAppointments} pending
            </p>
          </div>
          <Button variant="ghost" size="sm" className="gap-1 text-muted-foreground" asChild>
            <Link href="/dashboard/appointments">
              View schedule
              <ArrowRight className="size-3.5" />
            </Link>
          </Button>
        </div>

        <div className="mt-8 space-y-4">
          {appointments.length === 0 ? (
            <div className="rounded-lg border border-dashed bg-secondary/35 p-6 text-sm text-muted-foreground">No appointments booked for today.</div>
          ) : (
            appointments.map((appointment) => (
              <div key={appointment.id} className="grid gap-3 sm:grid-cols-[64px_minmax(0,1fr)]">
                <div className="font-mono tabular-nums text-sm text-muted-foreground">
                  <p className="text-foreground">{formatTime(appointment.startsAt)}</p>
                  <p className="mt-1 text-xs">{appointment.durationMinutes} min</p>
                </div>

                <div className="flex flex-wrap items-center justify-between gap-3 rounded-lg border bg-secondary/45 p-4">
                  <div className="border-l border-primary pl-4">
                    <p className="font-medium text-foreground">{appointment.clientName}</p>
                    <p className="mt-1 text-sm text-muted-foreground">{appointment.treatmentName}</p>
                  </div>
                  <Badge variant={appointment.status === "confirmed" ? "secondary" : "outline"} className="gap-1.5">
                    <span className="size-1.5 rounded-full bg-primary" />
                    {statusLabel(appointment.status)}
                  </Badge>
                </div>
              </div>
            ))
          )}
        </div>

        <Button variant="secondary" className="mt-auto h-12 justify-start border border-dashed border-border bg-accent text-accent-foreground hover:bg-accent/80" asChild>
          <Link href="/dashboard/appointments">
            <Plus className="size-4" />
            Add an appointment for today
          </Link>
        </Button>
      </CardContent>
    </Card>
  )
}

function MetricTile({ label, value, detail, tone = "dark" }: { label: string; value: string; detail: string; tone?: "soft" | "dark" }) {
  const isSoft = tone === "soft"

  return (
    <Card className={isSoft ? "gap-0 border-transparent bg-accent py-0 shadow-none" : "gap-0 border-primary bg-primary py-0 text-primary-foreground shadow-none"}>
      <CardContent className="p-5">
        <p className={isSoft ? "font-mono text-xs uppercase tracking-[0.14em] text-accent-foreground" : "font-mono text-xs uppercase tracking-[0.14em] text-primary-foreground/70"}>
          {label}
        </p>
        <p className="mt-3 font-serif text-5xl leading-none tabular-nums tracking-tight">{value}</p>
        <p className={isSoft ? "mt-3 text-sm text-muted-foreground" : "mt-3 text-sm text-primary-foreground/70"}>{detail}</p>
      </CardContent>
    </Card>
  )
}

function UtilizationCard({ utilization, bookedMinutes, capacityMinutes }: { utilization: number; bookedMinutes: number; capacityMinutes: number }) {
  return (
    <Card className="gap-0 py-0 shadow-none">
      <CardContent className="p-5">
        <p className="font-mono text-xs uppercase tracking-[0.14em] text-muted-foreground">Daily Utilization</p>

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
              {bookedMinutes} min of {Math.round(capacityMinutes / 60)}h
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
            <p className="font-mono text-xs uppercase tracking-[0.14em] text-muted-foreground">Follow-up Queue</p>
            <h3 className="mt-2 text-base font-semibold text-foreground">{clients.length} clients pending</h3>
          </div>
          <Clock className="size-4 text-muted-foreground" aria-hidden="true" />
        </div>

        <div className="mt-5 space-y-3">
          {clients.length === 0 ? (
            <p className="rounded-lg border border-dashed bg-secondary/35 p-4 text-sm text-muted-foreground">No follow-ups waiting.</p>
          ) : (
            clients.map((client) => (
              <div key={client.id} className="flex items-center justify-between gap-3 rounded-lg border bg-card p-3">
                <div className="min-w-0">
                  <p className="truncate font-medium text-foreground">{client.fullName}</p>
                  <p className="mt-1 truncate text-sm text-muted-foreground">{client.lastTreatment?.type ?? "Follow-up needed"}</p>
                </div>
                <Button variant="ghost" size="sm" className="shrink-0 text-primary" asChild>
                  <Link href={`/dashboard/clients/${client.id}`}>
                    View
                    <ArrowRight className="size-3.5" />
                  </Link>
                </Button>
              </div>
            ))
          )}
        </div>

        <Button variant="outline" className="mt-5 w-full" asChild>
          <Link href="/dashboard/clients">
            Review all clients
            <CalendarDays className="size-4" />
          </Link>
        </Button>
      </CardContent>
    </Card>
  )
}
