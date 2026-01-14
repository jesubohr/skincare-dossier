import { TrendingUp, BellRing } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"

interface StatCardProps {
  label: string
  value: string
  trend?: string
  subtext?: string
  icon?: "trending-up" | "bell"
}

export function StatCard({ label, value, trend, subtext, icon }: StatCardProps) {
  return (
    <Card>
      <CardContent>
        <p className="text-sm text-muted-foreground">{label}</p>
        <div className="mt-1 flex items-center justify-between gap-2">
          <span className="text-3xl font-semibold text-foreground">{value}</span>
          {trend && <Badge>{trend}</Badge>}
          {subtext && <span className="text-sm text-muted-foreground">{subtext}</span>}
          {icon === "trending-up" && <TrendingUp className="text-muted-foreground/60" />}
          {icon === "bell" && <BellRing className="text-rose-500" />}
        </div>
      </CardContent>
    </Card>
  )
}
