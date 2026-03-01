"use client"

import { Activity, useState } from "react"
import { Pencil } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Sheet, SheetClose, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { type Client } from "@/lib/types"
import { formatPhoneDinamically } from "@/lib/utils"

interface EditClientProps {
  client: Client
}

export default function EditClient({ client }: EditClientProps) {
  return (
    <Sheet>
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
        <EditClientForm client={client} />
        <SheetFooter>
          <SheetClose asChild>
            <Button type="submit">Save Changes</Button>
          </SheetClose>
          <SheetClose asChild>
            <Button variant="outline" type="reset">
              Cancel
            </Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  )
}

function EditClientForm({ client }: EditClientProps) {
  const [skinType, setSkinType] = useState(client.skinType)
  const [phone, setPhone] = useState(formatPhoneDinamically(client.phone))

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    const name = formData.get("name") as string
    const email = formData.get("email") as string
    const phone = formData.get("phone") as string
    const birthDate = formData.get("birthDate") as string
    const skinType = formData.get("skinType") as string
    console.log(name, email, phone, birthDate, skinType)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 py-2 px-6">
      <div className="flex flex-col gap-6">
        <div className="space-y-2">
          <Label htmlFor="name">Name</Label>
          <Input id="name" defaultValue={client.name} placeholder="Client Name" required />
        </div>
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input id="email" type="email" defaultValue={client.email} placeholder="example@example.com" required />
        </div>
        <div className="space-y-2">
          <Label htmlFor="phone">Phone</Label>
          <Input
            id="phone"
            type="text"
            value={phone}
            onChange={(e) => setPhone(formatPhoneDinamically(e.target.value))}
            placeholder="(300) 555 0123"
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="birthDate">Birth Date</Label>
          <Input id="birthDate" type="date" defaultValue={client.birthDate} placeholder="Birth Date" required />
        </div>
        <div className="space-y-2">
          <Label htmlFor="skinType">Skin Type</Label>
          <Select defaultValue={client.skinType} value={skinType} onValueChange={setSkinType}>
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
          <Activity mode={skinType === "Other" ? "visible" : "hidden"}>
            <div className="space-y-2 mt-4">
              <Label htmlFor="skinTypeOther" className="text-muted-foreground">
                What is the skin type?
              </Label>
              <Input id="skinTypeOther" defaultValue={client.skinType} placeholder="Other Skin Type" required />
            </div>
          </Activity>
        </div>
      </div>
    </form>
  )
}
