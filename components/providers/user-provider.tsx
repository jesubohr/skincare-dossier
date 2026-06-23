"use client"

import { useEffect } from "react"
import { useMutation, useQuery } from "convex/react"
import { api } from "@/convex/_generated/api"
import { authClient } from "@/lib/auth-client"
import { useUserStore } from "@/lib/store/user-store"

export function UserProvider({ children }: { children: React.ReactNode }) {
  const initialize = useUserStore((state) => state.initialize)
  const setProfile = useUserStore((state) => state.setProfile)
  const profile = useQuery(api.users.getProfile)
  const ensureCurrentUser = useMutation(api.users.ensureCurrentUser)
  const session = authClient.useSession()

  useEffect(() => {
    initialize()
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (session.data) {
      ensureCurrentUser().catch(() => null)
    }
  }, [ensureCurrentUser, session.data])

  useEffect(() => {
    if (profile !== undefined) {
      setProfile(profile ? { ...profile, avatar_url: profile.avatarUrl } : null)
    }
  }, [profile, setProfile])

  return <>{children}</>
}
