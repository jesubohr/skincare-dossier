"use client"

import { useState } from "react"
import { Plus, CalendarCheck, CalendarClock, BriefcaseMedical } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Sheet, SheetClose, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { useTreatmentHistory } from "@/lib/hooks/use-treatment-history"
import type { Id } from "@/convex/_generated/dataModel"

interface AddNewCaseProps {
  clientId: Id<"clients">
  treatments: { id: string; name: string }[]
}

export default function AddNewCase({ clientId, treatments }: AddNewCaseProps) {
  const [open, setOpen] = useState(false)
  const { createEntry } = useTreatmentHistory(clientId)

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button>
          <Plus className="h-4 w-4" />
          Add New Case
        </Button>
      </SheetTrigger>
      <SheetContent className="sm:max-w-lg">
        <SheetHeader>
          <SheetTitle>Add New Case</SheetTitle>
          <SheetDescription>Record details about this treatment session.</SheetDescription>
        </SheetHeader>
        <NewCaseForm
          treatments={treatments}
          onSubmit={async (data) => {
            await createEntry({
              clientId,
              date: data.date,
              time: data.time,
              doctor: data.doctor,
              type: data.type,
              observations: data.observations,
              recommendations: data.recommendations ?? [],
              nextVisit: data.nextVisit,
            })
            setOpen(false)
          }}
        />
      </SheetContent>
    </Sheet>
  )
}

interface NewCaseFormProps {
  treatments: { id: string; name: string }[]
  onSubmit: (data: {
    date: string
    time: string
    doctor: string
    type: string
    observations: string
    recommendations?: string[]
    nextVisit?: string
  }) => void
}

function NewCaseForm({ treatments, onSubmit }: NewCaseFormProps) {
  const [isLoading, setIsLoading] = useState(false)

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setIsLoading(true)

    try {
      const formData = new FormData(e.currentTarget)
      const datetime = formData.get("datetime") as string
      const [date, time] = datetime ? datetime.split("T") : ["", ""]

      await onSubmit({
        date: formatDate(date),
        time: formatTime(time),
        doctor: (formData.get("doctor") as string) || "Dr. Miller",
        type: formData.get("treatment") as string,
        observations: formData.get("observations") as string,
        recommendations: (formData.get("recommendations") as string)?.split("\n").filter(Boolean),
        nextVisit: formData.get("nextVisit") ? formatDate(formData.get("nextVisit") as string) : undefined,
      })
    } finally {
      setIsLoading(false)
    }
  }

  function formatDate(dateStr: string): string {
    if (!dateStr) return ""
    const date = new Date(dateStr)
    return date.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })
  }

  function formatTime(timeStr: string): string {
    if (!timeStr) return ""
    const [hours, minutes] = timeStr.split(":")
    const hour = parseInt(hours, 10)
    const ampm = hour >= 12 ? "PM" : "AM"
    const hour12 = hour % 12 || 12
    return `${hour12}:${minutes} ${ampm}`
  }

  return (
    <>
      <form onSubmit={handleSubmit} className="space-y-8 px-6">
        <FormSection title="Treatment Details" icon={<CalendarCheck className="h-4 w-4" />}>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="datetime">Date & Time</Label>
              <Input id="datetime" name="datetime" type="datetime-local" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="doctor">Doctor</Label>
              <Input id="doctor" name="doctor" placeholder="Dr. Miller" defaultValue="Dr. Miller" required />
            </div>
          </div>
        </FormSection>

        <FormSection title="Clinical Details" icon={<BriefcaseMedical className="h-4 w-4" />}>
          <div className="space-y-2">
            <Label htmlFor="treatment">Treatment</Label>
            <Select name="treatment">
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Treatment Type" />
              </SelectTrigger>
              <SelectContent>
                {treatments.map((treatment) => (
                  <SelectItem key={treatment.id} value={treatment.name}>
                    {treatment.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="observations">Observations</Label>
            <Textarea id="observations" name="observations" placeholder="Notes about the client's condition, reactions, etc." required rows={3} />
          </div>

          <div className="space-y-2">
            <Label htmlFor="recommendations">Recommendations</Label>
            <Textarea id="recommendations" name="recommendations" placeholder="One recommendation per line" rows={3} />
          </div>
        </FormSection>

        <FormSection title="Follow-up" icon={<CalendarClock className="h-4 w-4" />}>
          <div className="space-y-2">
            <Label htmlFor="nextVisit">Suggested Next Visit (Optional)</Label>
            <Input id="nextVisit" name="nextVisit" type="date" />
          </div>
        </FormSection>
      </form>
      <SheetFooter>
        <Button
          type="submit"
          onClick={() => {
            const form = document.querySelector("form")
            if (form) form.requestSubmit()
          }}
          disabled={isLoading}
        >
          {isLoading ? "Saving..." : "Add Case"}
        </Button>
        <SheetClose asChild>
          <Button variant="outline" type="button">
            Cancel
          </Button>
        </SheetClose>
      </SheetFooter>
    </>
  )
}

interface FormSectionProps {
  title: string
  icon: React.ReactNode
  children: React.ReactNode
}

function FormSection({ title, icon, children }: FormSectionProps) {
  return (
    <section className="space-y-4">
      <div className="mb-4">
        <div className="flex items-center gap-2">
          {icon}
          <h2 className="text-lg font-bold tracking-tight text-foreground">{title}</h2>
        </div>
        <hr className="w-full mt-1" />
      </div>
      {children}
    </section>
  )
}
