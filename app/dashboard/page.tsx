"use client"

import Link from "next/link"
import { ArrowRight, CalendarDays, Clock, Plus } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { clients } from "@/lib/mock-data"

type DashboardClient = {
  id: string
  name?: string
  fullName?: string
  status: string
  lastTreatment?: {
    type: string
  }
}

const todaysAppointments = [
  {
    id: "appt-1",
    time: "10:00",
    duration: "60 min",
    client: "Sarah Jenkins",
    treatment: "Anti-Aging Facial",
    status: "Confirmed",
  },
  {
    id: "appt-2",
    time: "14:30",
    duration: "45 min",
    client: "Monica Ross",
    treatment: "HydraFacial",
    status: "Pending",
  },
  {
    id: "appt-3",
    time: "16:00",
    duration: "60 min",
    client: "James Wilson",
    treatment: "Botox Touch-up",
    status: "Confirmed",
  },
]

const dashboardClients = clients as unknown as DashboardClient[]
const pendingFollowUps = dashboardClients.filter((client) => client.status === "needs-follow-up")
const confirmedAppointments = todaysAppointments.filter((appointment) => appointment.status === "Confirmed").length
const totalBookedMinutes = todaysAppointments.reduce((total, appointment) => total + Number.parseInt(appointment.duration, 10), 0)
const dailyCapacityMinutes = 480
const utilization = Math.round((totalBookedMinutes / dailyCapacityMinutes) * 100)

export default function DashboardPage() {
  const nextAppointment = todaysAppointments[0]

  return (
    <div className="space-y-8">
      <section className="space-y-7">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight text-foreground">Dashboard</h1>
          <p className="mt-1 text-sm text-muted-foreground">Overview of your business</p>
        </div>

        <div className="space-y-2">
          <p className="font-mono text-xs uppercase tracking-[0.14em] text-muted-foreground">Tuesday, June 23</p>
          <div className="space-y-1">
            <h2 className="font-serif text-4xl leading-none tracking-tight text-foreground md:text-5xl">
              Good morning, <span className="italic text-accent-foreground">Jesus.</span>
            </h2>
            <p className="text-sm text-muted-foreground">
              You have {todaysAppointments.length} appointments today. Next: {nextAppointment.time} with {nextAppointment.client}.
            </p>
          </div>
        </div>
      </section>

      <section className="grid gap-4 xl:grid-cols-[minmax(0,1.55fr)_minmax(360px,0.9fr)]">
        <TodaySchedule appointments={todaysAppointments} />

        <div className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <MetricTile
              label="Appointments Today"
              value={String(todaysAppointments.length)}
              detail={`${confirmedAppointments} confirmed - ${todaysAppointments.length - confirmedAppointments} pending`}
              tone="soft"
            />
            <MetricTile label="Pending Follow-ups" value={String(pendingFollowUps.length)} detail="Clients waiting for outreach" />
          </div>

          <UtilizationCard utilization={utilization} bookedMinutes={totalBookedMinutes} capacityMinutes={dailyCapacityMinutes} />
          <FollowUpQueue />
        </div>
      </section>
    </div>
  )
}

function TodaySchedule({ appointments }: { appointments: typeof todaysAppointments }) {
  return (
    <Card className="min-h-[540px] gap-0 py-0 shadow-none">
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
          {appointments.map((appointment) => (
            <div key={appointment.id} className="grid gap-3 sm:grid-cols-[64px_minmax(0,1fr)]">
              <div className="font-mono tabular-nums text-sm text-muted-foreground">
                <p className="text-foreground">{appointment.time}</p>
                <p className="mt-1 text-xs">{appointment.duration}</p>
              </div>

              <div className="flex flex-wrap items-center justify-between gap-3 rounded-lg border bg-secondary/45 p-4">
                <div className="border-l border-primary pl-4">
                  <p className="font-medium text-foreground">{appointment.client}</p>
                  <p className="mt-1 text-sm text-muted-foreground">{appointment.treatment}</p>
                </div>
                <Badge variant={appointment.status === "Confirmed" ? "secondary" : "outline"} className="gap-1.5">
                  <span className="size-1.5 rounded-full bg-primary" />
                  {appointment.status}
                </Badge>
              </div>
            </div>
          ))}
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
            style={{ background: `conic-gradient(var(--foreground) ${utilization * 3.6}deg, var(--muted) 0deg)` }}
            aria-hidden="true"
          >
            <div className="size-14 rounded-full bg-card" />
          </div>

          <div>
            <p className="font-serif text-5xl leading-none tabular-nums tracking-tight text-foreground">{utilization}%</p>
            <p className="mt-2 text-sm text-muted-foreground">
              {bookedMinutes} min of {capacityMinutes / 60}h
            </p>
          </div>
        </div>

        <div className="mt-5 flex flex-wrap gap-2">
          <span className="rounded-full bg-secondary px-3 py-1 font-mono text-xs text-muted-foreground">09:00-13:00</span>
          <span className="rounded-full bg-secondary px-3 py-1 font-mono text-xs text-muted-foreground">14:00-18:00</span>
        </div>
      </CardContent>
    </Card>
  )
}

function FollowUpQueue() {
  return (
    <Card className="gap-0 py-0 shadow-none">
      <CardContent className="p-5">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.14em] text-muted-foreground">Follow-up Queue</p>
            <h3 className="mt-2 text-base font-semibold text-foreground">{pendingFollowUps.length} clients pending</h3>
          </div>
          <Clock className="size-4 text-muted-foreground" aria-hidden="true" />
        </div>

        <div className="mt-5 space-y-3">
          {pendingFollowUps.map((client) => (
            <div key={client.id} className="flex items-center justify-between gap-3 rounded-lg border bg-card p-3">
              <div className="min-w-0">
                <p className="truncate font-medium text-foreground">{client.name ?? client.fullName}</p>
                <p className="mt-1 truncate text-sm text-muted-foreground">{client.lastTreatment?.type ?? "Follow-up needed"}</p>
              </div>
              <Button variant="ghost" size="sm" className="shrink-0 text-primary" asChild>
                <Link href={`/dashboard/clients/${client.id}`}>
                  View
                  <ArrowRight className="size-3.5" />
                </Link>
              </Button>
            </div>
          ))}
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
