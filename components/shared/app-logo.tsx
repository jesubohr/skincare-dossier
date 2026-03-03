import { Flower } from "lucide-react"
import { cn } from "@/lib/utils"

const logoSizes = {
  sm: "size-6",
  md: "size-8",
  lg: "size-11",
}

export function AppLogo({ className, size = "sm", hideTitle }: { className?: string; size?: keyof typeof logoSizes; hideTitle?: boolean }) {
  return (
    <div className={cn("flex items-center gap-2", className)}>
      <div className="relative p-1 bg-primary rounded-full group-data-[collapsible=icon]:p-1 transition-all">
        <Flower className={`group-data-[collapsible=icon]:size-5 ${logoSizes[size]} shrink-0 text-primary-foreground transition-all`} />
      </div>
      {!hideTitle && (
        <span className="truncate text-foreground/80 text-lg font-semibold tracking-tight leading-none">
          Skincare
          <br />
          Dossier
        </span>
      )}
    </div>
  )
}
