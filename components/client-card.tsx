import { MessageCircle, ChevronRight, Eye } from "lucide-react"
import Link from "next/link"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { ClientAvatar } from "@/components/client-avatar"
import { Separator } from "@/components/ui/separator"
import { Button } from "@/components/ui/button"
import type { Client } from "@/lib/types"

interface ClientCardProps {
  client: Client
}

export function ClientCard({ client }: ClientCardProps) {
  const statusTextColor = {
    active: "text-muted-foreground/80 italic",
    "needs-follow-up": "text-primary",
    "payment-overdue": "text-rose-500",
    none: "text-muted-foreground/80 italic",
  }

  return (
    <Card>
      <CardHeader className="flex gap-6">
        <ClientAvatar name={client.name} status={client.status} size="sm" />
        <div className="flex flex-col gap-2">
          <h3 className="text-lg font-semibold text-foreground">{client.name}</h3>
          <div>
            <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">Last Treatment</p>
            <p className="text-foreground/90 font-medium">{client.lastTreatment.date}</p>
            <p className={`text-sm ${statusTextColor[client.status]}`}>{client.lastTreatment.type}</p>
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
            <Link href={`/clients/${client.id}`}>
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
