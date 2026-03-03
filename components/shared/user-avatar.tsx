"use client"

import Image from "next/image"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { cn } from "@/lib/utils"

const avatarVariants = {
  default: "size-28 border-4",
  small: "size-8 border-none",
}

interface UserAvatarProps {
  initials: string
  avatarUrl?: string | null
  variant?: keyof typeof avatarVariants
  children?: React.ReactNode
}

export function UserAvatar({ initials, avatarUrl, variant = "default", children }: UserAvatarProps) {
  const choosedVariant = avatarVariants[variant as keyof typeof avatarVariants] || avatarVariants.default

  return (
    <Avatar className={cn("group border-card", choosedVariant)}>
      <AvatarImage src={avatarUrl ?? undefined} asChild>
        <Image width={100} height={100} src={avatarUrl!} alt={`Profile image of ${initials}`} />
      </AvatarImage>
      <AvatarFallback className="bg-primary/20 text-xl font-semibold text-primary">{initials}</AvatarFallback>
      {children}
    </Avatar>
  )
}
