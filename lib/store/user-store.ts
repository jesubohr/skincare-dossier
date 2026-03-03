import { create } from "zustand"
import type { Profile } from "@/lib/types"
import { profile } from "@/lib/mock-data"

interface UserState {
  profile: Profile | null
  isLoading: boolean
  isAuthenticated: boolean
  initialize: () => Promise<void>
  fetchProfile: () => Promise<void>
  signOut: () => Promise<void>
}

export const useUserStore = create<UserState>((set, get) => ({
  profile: null,
  isLoading: false,
  isAuthenticated: false,

  initialize: async () => {
    set({ isLoading: true })
    await get().fetchProfile()
    set({ isLoading: false })
  },

  fetchProfile: async () => {
    const userProfile = profile
    set({ profile: userProfile, isAuthenticated: !!userProfile })
  },

  signOut: async () => {
    set({ profile: null, isAuthenticated: false })
  },
}))
