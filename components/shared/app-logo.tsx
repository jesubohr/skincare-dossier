import { cn } from "@/lib/utils"

const iconSizes = {
  sm: "w-6 h-6",
  md: "w-8 h-8",
  lg: "w-12 h-12",
  xl: "w-16 h-16",
}

const titleSizes = {
  sm: "text-xl",
  md: "text-2xl",
  lg: "text-3xl",
  xl: "text-4xl",
}

export function AppLogo({ className, hideTitle, size = "md" }: { className?: string; hideTitle?: boolean; size?: "sm" | "md" | "lg" | "xl" }) {
  const titleSize = titleSizes[size]
  const iconSize = iconSizes[size]

  return (
    <div className={cn("flex items-center gap-1.5", className)}>
      <IconLeaf className={iconSize} />
      {!hideTitle && <span className={`font-serif leading-none ${titleSize}`}>Skincare Dossier</span>}
    </div>
  )
}

function IconLeaf({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 58 75.5" className={cn("shrink-0", className)}>
      <path
        d="M6.5 1.4C4.6 5.6 2.2 11.8 1.9 19.6c-.2 6.8 1.6 16.7 9.4 24.2 3.5 3.3 7.7 6.2 12.8 8.4 2.1.9 4.2 1.9 6.2 2.9-1.4-10.7-8.6-17.9-12.4-22.7-3.5-4.4-5.3-7.8-6.2-12.4 2.5 5 6 8.5 11.2 13.7 2.5 2.6 11 11 11 24.2.2 6.6-1.5 11.9-3 16.7 2.5-3.9 7.8-13.6 7.8-26.9 0-7-1.8-13.8-5.1-18.8-4.4-6.7-11.2-11.1-16.9-15.5-4.3-3.3-7.8-6.7-10.2-11.2z"
        fill="#9db199"
      />
      <path
        d="M54.8 12.9c-.9 0-3.1.7-5.4 1.8 0 2.5.2 5.7-.1 7.9H49c0-1.9-.1-3.7-.6-5.7-.9-3.6-2-8.2-5.4-10.7-3.2 1.2-8.9 4.5-12.6 12.9 2.6 2.4 6.3 6.6 8.7 12 2.5 5.9 3.8 13.6 3.1 18.6 2.2-1.3 4.4-2.8 6.2-4.8 3-3.1 8.1-9.5 8.2-20.5.1-4-.7-7.9-1.8-11.5"
        fill="#eec7be"
      />
    </svg>
  )
}
