"use client"

import { useState } from "react"
import { Pencil } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Sheet, SheetClose, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { useClients } from "@/lib/hooks/use-clients"
import { formatPhoneDinamically } from "@/lib/utils"

interface EditClientProps {
  client: {
    id: string
    name: string
    email?: string
    phone: string
    birthDate: string
    skinType?: string
  }
}

export default function EditClient({ client }: EditClientProps) {
  const [open, setOpen] = useState(false)
  const { updateClient } = useClients()

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="outline" className="gap-2">
          <Pencil className="h-4 w-4" />
          Edit Profile
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Edit Client</SheetTitle>
          <SheetDescription>Update client information.</SheetDescription>
        </SheetHeader>
        <EditClientForm
          client={client}
          onSubmit={async (data) => {
            await updateClient({
              id: client.id as any,
              name: data.name,
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
            Save Changes
          </Button>
          <SheetClose asChild>
            <Button variant="outline" type="button">
              Cancel
            </Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  )
}

interface EditClientFormProps {
  client: EditClientProps["client"]
  onSubmit: (data: { name: string; email?: string; phone: string; birthDate: string; skinType?: string }) => void
}

function EditClientForm({ client, onSubmit }: EditClientFormProps) {
  const [skinType, setSkinType] = useState(client.skinType)
  const [phone, setPhone] = useState(formatPhoneDinamically(client.phone))
  const [isLoading, setIsLoading] = useState(false)

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setIsLoading(true)

    try {
      const formData = new FormData(e.currentTarget)
      await onSubmit({
        name: formData.get("name") as string,
        email: (formData.get("email") as string) || undefined,
        phone: formData.get("phone") as string,
        birthDate: formData.get("birthDate") as string,
        skinType: (formData.get("skinType") as string) || undefined,
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 py-2 px-6">
      <div className="flex flex-col gap-6">
        <div className="space-y-2">
          <Label htmlFor="name">Name</Label>
          <Input id="name" name="name" defaultValue={client.name} placeholder="Client Name" required />
        </div>
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input id="email" name="email" type="email" defaultValue={client.email} placeholder="example@example.com" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="phone">Phone</Label>
          <Input
            id="phone"
            name="phone"
            type="text"
            value={phone}
            onChange={(e) => setPhone(formatPhoneDinamically(e.target.value))}
            placeholder="(300) 555 0123"
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="birthDate">Birth Date</Label>
          <Input id="birthDate" name="birthDate" type="date" defaultValue={client.birthDate} placeholder="Birth Date" required />
        </div>
        <div className="space-y-2">
          <Label htmlFor="skinType">Skin Type</Label>
          <Select name="skinType" defaultValue={client.skinType} value={skinType} onValueChange={setSkinType}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select skin type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Normal">Normal</SelectItem>
              <SelectItem value="Dry">Dry</SelectItem>
              <SelectItem value="Oily">Oily</SelectItem>
              <SelectItem value="Combination">Combination</SelectItem>
              <SelectItem value="Sensitive">Sensitive</SelectItem>
              <SelectItem value="Aging">Aging</SelectItem>
              <SelectItem value="Acne">Acne</SelectItem>
              <SelectItem value="Other">Other</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </form>
  )
}
