import { DashboardHeader } from "@/components/dashboard/header"

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="py-4 px-5">
      <DashboardHeader />
      {children}
    </div>
  )
}
