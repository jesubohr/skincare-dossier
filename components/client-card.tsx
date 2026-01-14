import { Phone, ChevronRight } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import { Button } from "@/components/ui/button"
import type { Client } from "@/lib/mock-data"

interface ClientCardProps {
  client: Client
}

export function ClientCard({ client }: ClientCardProps) {
  const statusDotColor = {
    active: "bg-emerald-500",
    "needs-follow-up": "bg-amber-500",
    "payment-overdue": "bg-rose-500",
    none: "",
  }

  const statusTextColor = {
    active: "text-muted-foreground/80 italic",
    "needs-follow-up": "text-primary",
    "payment-overdue": "text-rose-500",
    none: "text-muted-foreground/80 italic",
  }

  return (
    <Card>
      <CardContent>
        {/* Header */}
        <div className="relative">
          <Avatar className="h-12 w-12">
            <AvatarFallback className="text-lg font-medium" style={{ backgroundColor: client.avatarColor }}>
              {client.initials}
            </AvatarFallback>
          </Avatar>
          {client.status !== "none" && (
            <span className={`absolute bottom-0 left-9 h-3 w-3 rounded-full border-2 border-border ${statusDotColor[client.status]}`} />
          )}
        </div>

        {/* Client Info */}
        <div className="mt-3 flex flex-col gap-2">
          <h3 className="text-lg font-semibold text-foreground">{client.name}</h3>
          <div>
            <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">Last Treatment</p>
            <p className="text-foreground/90 font-medium">{client.lastTreatment.date}</p>
            <p className={`text-sm ${statusTextColor[client.status]}`}>{client.lastTreatment.type}</p>
          </div>
        </div>

        <Separator className="my-4" />

        {/* Actions */}
        <div className="mt-4 flex items-center justify-between">
          <Button variant="ghost" size="sm" className="gap-1.5 text-muted-foreground">
            <Phone />
            Call
          </Button>
          <Button variant="ghost" size="sm" className="text-primary">
            View
            <ChevronRight />
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
