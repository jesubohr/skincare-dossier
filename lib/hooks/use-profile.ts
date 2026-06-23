"use client"

import { useMutation, useQuery } from "convex/react"
import { api } from "@/convex/_generated/api"
import type { Profile } from "@/lib/types"

export function useProfile() {
  const profile = useQuery(api.users.getProfile) as Profile | null | undefined
  const updateProfile = useMutation(api.users.updateProfile)
  const generateAvatarUploadUrl = useMutation(api.users.generateAvatarUploadUrl)
  const updateAvatar = useMutation(api.users.updateAvatar)

  return {
    profile: profile ? { ...profile, avatar_url: profile.avatarUrl } : profile,
    isLoading: profile === undefined,
    updateProfile,
    generateAvatarUploadUrl,
    updateAvatar,
  }
}
