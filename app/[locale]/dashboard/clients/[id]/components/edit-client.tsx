"use client"

import { useState } from "react"
import { useTranslations } from "next-intl"
import { Pencil } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Sheet, SheetClose, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { useClients } from "@/lib/hooks/use-clients"
import { formatPhoneDinamically } from "@/lib/utils"
import type { Id } from "@/convex/_generated/dataModel"

interface EditClientProps {
  client: {
    id: string
    fullName: string
    email?: string
    phone: string
    birthDate: string
    skinType?: string
  }
}

const SKIN_TYPES = ["Normal", "Dry", "Oily", "Combination", "Sensitive", "Aging", "Acne", "Other"] as const

export default function EditClient({ client }: EditClientProps) {
  const t = useTranslations("Clients")
  const common = useTranslations("Common")
  const [open, setOpen] = useState(false)
  const { updateClient } = useClients()

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="outline" className="gap-2">
          <Pencil className="h-4 w-4" />
          {t("editProfile")}
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>{t("editClient")}</SheetTitle>
          <SheetDescription>{t("editDescription")}</SheetDescription>
        </SheetHeader>
        <EditClientForm
          client={client}
          onSubmit={async (data) => {
            await updateClient({
              id: client.id as Id<"clients">,
              fullName: data.fullName,
              email: data.email,
              phone: data.phone,
              birthDate: data.birthDate,
              skinType: data.skinType,
            })
            setOpen(false)
          }}
        />
        <SheetFooter>
          <Button
            type="submit"
            onClick={() => {
              const form = document.querySelector("form")
              if (form) form.requestSubmit()
            }}
          >
            {t("saveChanges")}
          </Button>
          <SheetClose asChild>
            <Button variant="outline" type="button">
              {common("cancel")}
            </Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  )
}

interface EditClientFormProps {
  client: EditClientProps["client"]
  onSubmit: (data: { fullName: string; email?: string; phone: string; birthDate: string; skinType?: string }) => void
}

function EditClientForm({ client, onSubmit }: EditClientFormProps) {
  const t = useTranslations("Clients")
  const common = useTranslations("Common")
  const skinTypes = useTranslations("Common.skinTypes")
  const [skinType, setSkinType] = useState(client.skinType)
  const [phone, setPhone] = useState(formatPhoneDinamically(client.phone))

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    await onSubmit({
      fullName: formData.get("fullName") as string,
      email: (formData.get("email") as string) || undefined,
      phone: formData.get("phone") as string,
      birthDate: formData.get("birthDate") as string,
      skinType: (formData.get("skinType") as string) || undefined,
    })
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 py-2 px-6">
      <div className="flex flex-col gap-6">
        <div className="space-y-2">
          <Label htmlFor="fullName">{t("name")}</Label>
          <Input id="fullName" name="fullName" defaultValue={client.fullName} placeholder="Client Name" required />
        </div>
        <div className="space-y-2">
          <Label htmlFor="email">{common("email")}</Label>
          <Input id="email" name="email" type="email" defaultValue={client.email} placeholder="example@example.com" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="phone">{t("phone")}</Label>
          <Input id="phone" name="phone" type="text" value={phone} onChange={(e) => setPhone(formatPhoneDinamically(e.target.value))} placeholder="(300) 555 0123" required />
        </div>
        <div className="space-y-2">
          <Label htmlFor="birthDate">{t("birthDate")}</Label>
          <Input id="birthDate" name="birthDate" type="date" defaultValue={client.birthDate} placeholder={t("birthDate")} required />
        </div>
        <div className="space-y-2">
          <Label htmlFor="skinType">{t("skinType")}</Label>
          <Select name="skinType" defaultValue={client.skinType} value={skinType} onValueChange={setSkinType}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder={t("selectSkinType")} />
            </SelectTrigger>
            <SelectContent>
              {SKIN_TYPES.map((type) => (
                <SelectItem key={type} value={type}>
                  {skinTypes(type)}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
    </form>
  )
}
