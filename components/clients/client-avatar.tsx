import { cn, getStatusColor, getAvatarInitials, getAvatarColor } from "@/lib/utils"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import type { Status } from "@/lib/types"

interface ClientAvatarProps {
  name: string
  status: Status
  size?: "sm" | "md" | "lg"
}

export function ClientAvatar({ name, status, size = "md" }: ClientAvatarProps) {
  return (
    <div className="relative w-fit">
      <Avatar className={cn("h-24 w-24 border-4 border-border shadow-sm", size === "sm" && "h-16 w-16", size === "lg" && "h-32 w-32")}>
        <AvatarImage src="/placeholder-user.jpg" alt={name} />
        <AvatarFallback
          className={cn("text-3xl font-semibold text-white", size === "sm" && "text-xl", size === "lg" && "text-5xl")}
          style={{ backgroundColor: getAvatarColor(name) }}
        >
          {getAvatarInitials(name)}
        </AvatarFallback>
      </Avatar>
      {/* Active Status Indicator */}
      <span
        className={cn(
          "absolute bottom-3 right-1 h-5 w-5 rounded-full border-2 border-border",
          getStatusColor(status),
          size === "sm" && "bottom-1 right-1 h-3 w-3",
          size === "lg" && "bottom-2 right-1 h-6 w-6",
        )}
      />
    </div>
  )
}
