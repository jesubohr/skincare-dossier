"use client"

import { clients, stats } from "@/lib/mock-data"
import { StatCard } from "@/components/stat-card"
import { ClientCard } from "@/components/client-card"

export default function DashboardPage() {
  return (
    <>
      <div>
        <h1 className="text-2xl font-semibold tracking-tight text-foreground">Dashboard</h1>
        <p className="mt-1 text-sm text-muted-foreground">Overview of your business</p>
      </div>

      {/* <StatCards activeCascades={stats.activeCascades} depCount={stats.depCount} /> */}

      {/* <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">
        <FlowChart data={paymentFlowStats} className="xl:col-span-2" />
        <CascadePreview dependencies={deps} username={profile?.username ?? profile?.display_name ?? "you"} />
      </div> */}

      {/* <RecentTransactions transactions={txResult.data} currentUsername={profile?.username ?? null} /> */}

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

      {/* Clients Grid */}
      <div className="mt-6 grid grid-cols-4 gap-4">
        {clients.map((client) => (
          <ClientCard key={client.id} client={client} />
        ))}
      </div>
    </>
  )
}
