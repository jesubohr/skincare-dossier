"use client"

import { Home, Users, Calendar, Settings } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"

const navItems = [
  { icon: Home, label: "Home", href: "/", active: false },
  { icon: Users, label: "Clients", href: "#", active: true },
  { icon: Calendar, label: "Calendar", href: "#", active: false },
  { icon: Settings, label: "Settings", href: "/settings", active: false },
]

export function Sidebar() {
  return (
    <aside className="flex h-screen w-56 flex-col border-r border-border bg-background">
      {/* Logo */}
      <div className="flex items-center gap-2 px-5 py-6">
        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-rose-400 to-rose-500">
          <span className="text-sm font-bold text-white">C</span>
        </div>
        <div>
          <span className="font-semibold text-zinc-900">CosmoApp</span>
          <p className="text-xs text-rose-500">Pro Dashboard</p>
        </div>
      </div>

      <Separator />

      {/* Navigation */}
      <nav className="flex-1 px-3 py-4">
        <ul className="space-y-1">
          {navItems.map((item) => (
            <li key={item.label}>
              <a
                href={item.href}
                className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
                  item.active ? "bg-rose-50 text-rose-600" : "text-zinc-600 hover:bg-zinc-100 hover:text-zinc-900"
                }`}
              >
                <item.icon className="h-5 w-5" />
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>

      {/* User Profile */}
      <div className="border-t border-zinc-200 p-4">
        <div className="flex items-center gap-3">
          <Avatar className="h-10 w-10">
            <AvatarImage src="/avatar.png" alt="Dr. Sarah M." />
            <AvatarFallback className="bg-zinc-200 text-zinc-600">SM</AvatarFallback>
          </Avatar>
          <div>
            <p className="text-sm font-medium text-zinc-900">Dr. Sarah M.</p>
            <p className="text-xs text-zinc-500">Lead Esthetician</p>
          </div>
        </div>
      </div>
    </aside>
  )
}
