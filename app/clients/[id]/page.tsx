import { notFound } from "next/navigation"
import { ArrowRight, Calendar, Eye, Flower2, Mail, Phone, BriefcaseMedical } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ClientAvatar } from "@/components/client-avatar"

import AddNewCase from "./components/new-case"
import EditClient from "./components/edit-client"
import { type Client } from "@/lib/types"
import { clients, treatments } from "@/lib/mock-data"
import { cn, calculateAge } from "@/lib/utils"

interface ClientProfilePageProps {
  params: Promise<{
    id: string
  }>
}

export default async function ClientProfilePage({ params }: ClientProfilePageProps) {
  const { id } = await params
  const client = clients.find((c) => c.id === id)

  if (!client) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-muted/20 p-8">
      <div className="mx-auto max-w-5xl space-y-8">
        <ClientProfileCard client={client} />

        {/* Treatment History Section */}
        <div className="space-y-6 mt-20">
          <div className="flex items-center justify-between ml-17">
            <div className="space-y-1">
              <h2 className="text-2xl font-bold tracking-tight text-foreground">Treatment History</h2>
              <p className="text-muted-foreground">Timeline of visits and procedures</p>
            </div>
            <AddNewCase />
          </div>

          <div className="relative space-y-8 pl-4">
            {/* Timeline Vertical Line */}
            <div className="absolute left-[27px] top-8 h-full w-px bg-primary/40" />

            {client.treatmentHistory?.map((entry, index) => (
              <div key={index} className="relative flex gap-8">
                {/* Timeline Dot */}
                <div className="relative z-10 flex h-[22px] w-[22px] shrink-0 items-center justify-center rounded-full bg-card mt-6">
                  <div className={cn("h-2.5 w-2.5 rounded-full", index === 0 ? "bg-primary" : "bg-muted")} />
                </div>

                {/* Card */}
                <Card className="flex-1 border-none shadow-sm transition-shadow hover:shadow-md">
                  <CardContent className="p-0">
                    {/* Card Header */}
                    <div className="flex items-start justify-between border-b bg-card px-6 pb-6">
                      <div className="flex gap-4">
                        <div className="flex h-12 w-12 items-center justify-center bg-primary/10 text-primary rounded-full">
                          {entry.type?.includes("Facial") ? <Flower2 className="h-6 w-6" /> : <BriefcaseMedical className="h-6 w-6" />}
                        </div>
                        <div>
                          <h3 className="text-lg font-bold text-foreground">{entry.date}</h3>
                          <div className="text-sm text-muted-foreground">
                            {entry.time} • {entry.doctor}
                          </div>
                        </div>
                      </div>
                      <Badge variant="secondary" className="bg-secondary/60 text-primary">
                        {entry.type}
                      </Badge>
                    </div>

                    {/* Card Body */}
                    <div className="grid gap-8 border-b border-dashed p-6 md:grid-cols-2">
                      <div className="space-y-3">
                        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-primary">
                          <Eye className="h-4 w-4" />
                          Observations
                        </div>
                        <div className="rounded-lg bg-muted p-4 text-sm leading-relaxed text-muted-foreground">{entry.observations}</div>
                      </div>

                      <div className="space-y-3">
                        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-primary">
                          <BriefcaseMedical className="h-4 w-4" />
                          Recommendations
                        </div>
                        <ul className="space-y-2 text-sm text-muted-foreground">
                          {entry.recommendations.map((rec, i) => (
                            <li key={i} className="flex items-start gap-2">
                              <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-foreground" />
                              {rec}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    {/* Card Footer */}
                    <div className="flex items-center justify-between bg-card p-4 px-6">
                      {entry.nextVisit && (
                        <div className="flex items-center gap-2 rounded-md bg-muted px-3 py-1.5 text-sm font-medium text-primary">
                          <Calendar className="h-4 w-4" />
                          Next Visit: {entry.nextVisit}
                        </div>
                      )}
                      <Button variant="link" className="ml-auto">
                        View Full Report
                        <ArrowRight className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

function ClientProfileCard({ client }: { client: Client }) {
  return (
    <Card className="overflow-hidden border-none shadow-sm">
      <CardContent className="flex items-start justify-between py-4 px-8">
        <div className="flex gap-6">
          <ClientAvatar name={client.name} status={client.status} size="lg" />

          <div className="space-y-2 pt-1">
            <div className="flex items-center gap-3">
              <h1 className="text-3xl font-bold tracking-tight text-foreground">{client.name}</h1>
            </div>

            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <span className="font-medium text-foreground/70">{calculateAge(client.birthDate)} Years Old</span>
              <span>•</span>
              <span>Skin Type: {client.skinType}</span>
            </div>

            <div className="flex items-center gap-6 pt-1">
              {client.phone && (
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Phone className="h-4 w-4 text-pink-500" />
                  <span>{client.phone}</span>
                </div>
              )}
              {client.email && (
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Mail className="h-4 w-4 text-pink-500" />
                  <span>{client.email}</span>
                </div>
              )}
            </div>
          </div>
        </div>

        <EditClient client={client} />
      </CardContent>
    </Card>
  )
}
