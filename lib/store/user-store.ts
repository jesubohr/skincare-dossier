import { create } from "zustand"
import type { Profile } from "@/lib/types"

interface UserState {
  profile: Profile | null
  isLoading: boolean
  isAuthenticated: boolean
  setProfile: (profile: Profile | null) => void
  initialize: () => Promise<void>
  fetchProfile: () => Promise<void>
  signOut: () => Promise<void>
}

export const useUserStore = create<UserState>((set, get) => ({
  profile: null,
  isLoading: false,
  isAuthenticated: false,

  setProfile: (profile) => {
    set({ profile, isAuthenticated: !!profile })
  },

  initialize: async () => {
    set({ isLoading: true })
    await get().fetchProfile()
    set({ isLoading: false })
  },

  fetchProfile: async () => {
    set({ isAuthenticated: !!get().profile })
  },

  signOut: async () => {
    set({ profile: null, isAuthenticated: false })
  },
}))
