import Link from "next/link"
import { MessageCircle, ChevronRight, Eye } from "lucide-react"
import type { Client, ClientStatus } from "@/lib/types"

import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { ClientAvatar } from "@/components/clients/client-avatar"
import { Card, CardContent, CardHeader } from "@/components/ui/card"

interface ClientCardProps {
  client: Client
}

export function ClientCard({ client }: ClientCardProps) {
  const statusTextColor: Record<ClientStatus, string> = {
    active: "text-muted-foreground/80 italic",
    "needs-follow-up": "text-primary",
    "payment-overdue": "text-rose-500",
    none: "text-muted-foreground/80 italic",
  }

  return (
    <Card>
      <CardHeader className="flex gap-6">
        <ClientAvatar name={client.fullName} status={client.status} size="sm" />
        <div className="flex flex-col gap-2">
          <h3 className="text-lg font-semibold text-foreground">{client.fullName}</h3>
          <div>
            <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">Last Treatment</p>
            <p className="text-foreground/90 font-medium">{client.lastTreatment?.date ?? "No visits yet"}</p>
            <p className={`text-sm ${statusTextColor[client.status]}`}>{client.lastTreatment?.type ?? "Treatment history pending"}</p>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <Separator />

        {/* Actions */}
        <div className="mt-4 flex items-center justify-between">
          <Button variant="ghost" size="sm" className="gap-1.5 text-muted-foreground" asChild>
            <Link href={`https://wa.me/${client.phone}`} target="_blank" rel="noopener noreferrer">
              <MessageCircle />
              Message
            </Link>
          </Button>
          <Button variant="ghost" size="sm" className="text-primary" asChild>
            <Link href={`/dashboard/clients/${client.id}`}>
              <Eye />
              View
              <ChevronRight />
            </Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
