"use client"

import { useEffect } from "react"
import { useUserStore } from "@/lib/store/user-store"

export function UserProvider({ children }: { children: React.ReactNode }) {
  const initialize = useUserStore((state) => state.initialize)

  useEffect(() => {
    initialize()
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  return <>{children}</>
}
