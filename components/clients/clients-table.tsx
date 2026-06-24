"use client"

import { useState } from "react"
import { useTranslations } from "next-intl"
import { Search, ChevronLeft, ChevronRight, MessageCircle, Eye, ChevronsLeft, ChevronsRight } from "lucide-react"

import type { Client, ClientStatus } from "@/lib/types"
import { Link } from "@/i18n/navigation"
import { cn, getStatusColor } from "@/lib/utils"

import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ClientAvatar } from "@/components/clients/client-avatar"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface ClientsTableProps {
  clients: Client[]
}

function statusKey(status: ClientStatus) {
  if (status === "needs-follow-up") return "needsFollowUp"
  if (status === "payment-overdue") return "paymentOverdue"
  return status
}

export function ClientsTable({ clients }: ClientsTableProps) {
  const t = useTranslations("Clients")
  const statusText = useTranslations("Common.status")
  const skinTypes = useTranslations("Common.skinTypes")
  const common = useTranslations("Common")
  const [searchQuery, setSearchQuery] = useState("")
  const [currentPage, setCurrentPage] = useState(1)
  const [pageSize, setPageSize] = useState(10)

  const filteredClients = clients.filter((client) => {
    const query = searchQuery.toLowerCase()
    return (
      client.fullName.toLowerCase().includes(query) ||
      client.email?.toLowerCase().includes(query) ||
      client.phone.includes(query) ||
      client.skinType?.toLowerCase().includes(query) ||
      client.lastTreatment?.type.toLowerCase().includes(query)
    )
  })

  const totalItems = filteredClients.length
  const totalPages = Math.ceil(totalItems / pageSize)
  const startIndex = (currentPage - 1) * pageSize
  const endIndex = Math.min(startIndex + pageSize, totalItems)
  const paginatedClients = filteredClients.slice(startIndex, endIndex)

  const handleSearchChange = (value: string) => {
    setSearchQuery(value)
    setCurrentPage(1)
  }

  const handlePageSizeChange = (value: string) => {
    setPageSize(Number(value))
    setCurrentPage(1)
  }

  const getStatusVariant = (status: string) => {
    switch (status) {
      case "active":
        return "default"
      case "needs-follow-up":
        return "secondary"
      case "payment-overdue":
        return "destructive"
      default:
        return "outline"
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="relative max-w-sm">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input placeholder={t("search")} value={searchQuery} onChange={(e) => handleSearchChange(e.target.value)} className="pl-9 w-75" />
        </div>
        <div className="text-sm text-muted-foreground">{t("found", { count: totalItems })}</div>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[250px]">{t("client")}</TableHead>
              <TableHead>{t("status")}</TableHead>
              <TableHead>{t("skinType")}</TableHead>
              <TableHead>{t("phone")}</TableHead>
              <TableHead>{common("email")}</TableHead>
              <TableHead>{t("lastTreatment")}</TableHead>
              <TableHead className="w-[120px]">{common("actions")}</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginatedClients.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} className="h-24 text-center text-muted-foreground">
                  {t("noClients")}
                </TableCell>
              </TableRow>
            ) : (
              paginatedClients.map((client) => (
                <TableRow key={client.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <ClientAvatar name={client.fullName} status={client.status} size="sm" />
                      <div>
                        <div className="font-medium">{client.fullName}</div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant={getStatusVariant(client.status)} className="gap-1.5">
                      <span className={cn("h-2 w-2 rounded-full", getStatusColor(client.status))} />
                      {statusText(statusKey(client.status))}
                    </Badge>
                  </TableCell>
                  <TableCell>{client.skinType ? skinTypes(client.skinType) : common("dash")}</TableCell>
                  <TableCell className="font-mono text-sm">{client.phone}</TableCell>
                  <TableCell className="max-w-[200px] truncate">{client.email || common("dash")}</TableCell>
                  <TableCell>
                    <div>
                      <div className="font-medium">{client.lastTreatment?.date}</div>
                      <div className="text-sm text-muted-foreground">{client.lastTreatment?.type}</div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <Button variant="ghost" size="icon-sm" asChild>
                        <Link href={`https://wa.me/${client.phone}`} target="_blank" rel="noopener noreferrer">
                          <MessageCircle className="h-4 w-4" />
                        </Link>
                      </Button>
                      <Button variant="ghost" size="icon-sm" asChild>
                        <Link href={`/dashboard/clients/${client.id}`}>
                          <Eye className="h-4 w-4" />
                        </Link>
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-sm text-muted-foreground">{t("rowsPerPage")}</span>
          <Select value={String(pageSize)} onValueChange={handlePageSizeChange}>
            <SelectTrigger className="h-8 w-[70px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="5">5</SelectItem>
              <SelectItem value="10">10</SelectItem>
              <SelectItem value="20">20</SelectItem>
              <SelectItem value="50">50</SelectItem>
            </SelectContent>
          </Select>
          <span className="text-sm text-muted-foreground">{t("showing", { start: totalItems === 0 ? 0 : startIndex + 1, end: endIndex, total: totalItems })}</span>
        </div>

        <div className="flex items-center gap-2">
          <Button variant="outline" size="icon-sm" onClick={() => setCurrentPage(1)} disabled={currentPage === 1}>
            <ChevronsLeft className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="icon-sm" onClick={() => setCurrentPage((p) => Math.max(1, p - 1))} disabled={currentPage === 1}>
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <span className="text-sm text-muted-foreground min-w-[100px] text-center">{t("page", { current: currentPage, total: totalPages || 1 })}</span>
          <Button
            variant="outline"
            size="icon-sm"
            onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
            disabled={currentPage >= totalPages}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="icon-sm" onClick={() => setCurrentPage(totalPages)} disabled={currentPage >= totalPages}>
            <ChevronsRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  )
}
