import { AppSidebar } from "@/components/app-sidebar"
import { SidebarProvider } from "@/components/ui/sidebar"
import { DashboardHeader } from "@/components/dashboard/header"

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <div className="flex flex-col gap-6 w-full py-4 px-5">
        <DashboardHeader />
        <main className="flex-1 mx-auto max-w-7xl w-full">{children}</main>
      </div>
    </SidebarProvider>
  )
}
