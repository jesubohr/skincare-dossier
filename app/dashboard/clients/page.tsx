import { clients } from "@/lib/mock-data"
import { ClientsTable } from "@/components/clients-table"

export default function ClientsPage() {
  return (
    <div className="mx-auto max-w-7xl space-y-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight text-foreground">Clients</h1>
        <p className="mt-1 text-sm text-muted-foreground">Manage your client records</p>
      </div>

      <ClientsTable clients={clients} />
    </div>
  )
}
