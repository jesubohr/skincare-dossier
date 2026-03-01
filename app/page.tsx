"use client"

import { Search, Plus, ArrowDownAZ } from "lucide-react"
import { clients, stats } from "@/lib/mock-data"

import { Button } from "@/components/ui/button"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { InputGroup, InputGroupAddon, InputGroupInput } from "@/components/ui/input-group"

import { StatCard } from "@/components/stat-card"
import { ClientCard } from "@/components/client-card"

export default function ClientsPage() {
  return (
    <div className="py-6 px-20">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-semibold text-foreground">Clients</h1>
          <p className="text-muted-foreground">Manage your client directory and history.</p>
        </div>
        <div className="flex items-center gap-4">
          <InputGroup className="w-72 bg-white dark:bg-background">
            <InputGroupInput placeholder="Search clients by name or phone number" />
            <InputGroupAddon>
              <Search />
            </InputGroupAddon>
          </InputGroup>
          <Button className="gap-2">
            <Plus className="h-4 w-4" />
            Add New Client
          </Button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="mt-8 grid grid-cols-4 gap-4">
        {stats.map((stat) => (
          <StatCard
            key={stat.label}
            label={stat.label}
            value={stat.value}
            trend={stat.trend}
            subtext={stat.subtext}
            icon={stat.icon as "trending-up" | "bell" | undefined}
          />
        ))}
      </div>

      {/* Tabs & Sort */}
      <div className="mt-8 flex items-center justify-between">
        <Tabs defaultValue="all">
          <TabsList>
            <TabsTrigger value="all">All Clients</TabsTrigger>
            <TabsTrigger value="recent">Recently Visited</TabsTrigger>
            <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
          </TabsList>
        </Tabs>
        <Button variant="ghost" className="gap-2">
          <ArrowDownAZ />
          Sort: A-Z
        </Button>
      </div>

      {/* Clients Grid */}
      <div className="mt-6 grid grid-cols-4 gap-4">
        {clients.map((client) => (
          <ClientCard key={client.id} client={client} />
        ))}
      </div>
    </div>
  )
}
