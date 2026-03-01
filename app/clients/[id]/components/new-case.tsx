"use client"

import { Plus, CalendarCheck, CalendarClock, BriefcaseMedical } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Sheet, SheetClose, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { treatments } from "@/lib/mock-data"

export default function AddNewCase() {
  return (
    <Sheet>
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
        <NewCaseForm />
      </SheetContent>
    </Sheet>
  )
}

function NewCaseForm() {
  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    console.log(formData)
  }

  return (
    <>
      <form onSubmit={handleSubmit} className="space-y-8 px-6">
        <FormSection title="Treatment Details" icon={<CalendarCheck className="h-4 w-4" />}>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="datetime">Date & Time</Label>
              <Input id="datetime" type="datetime-local" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="location">Location</Label>
              <Input id="location" placeholder="Main Salon" required />
            </div>
          </div>
        </FormSection>

        <FormSection title="Clinical Details" icon={<BriefcaseMedical className="h-4 w-4" />}>
          <div className="space-y-2">
            <Label htmlFor="treatment">Treatment</Label>
            <Select>
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
            <Label htmlFor="description">Description</Label>
            <Textarea id="description" placeholder="Description of the treatment performed" required rows={3} />
          </div>

          <div className="space-y-2">
            <Label htmlFor="observations">Observations</Label>
            <Textarea id="observations" placeholder="Notes about the client's condition, reactions, etc." required rows={3} />
          </div>

          <div className="space-y-2">
            <Label htmlFor="recommendations">Recommendations</Label>
            <Textarea id="recommendations" placeholder="Aftercare instructions, product recommendations, etc." required rows={3} />
          </div>
        </FormSection>

        <FormSection title="Follow-up" icon={<CalendarClock className="h-4 w-4" />}>
          <div className="space-y-2">
            <Label htmlFor="nextVisit">Suggested Next Visit (Optional)</Label>
            <Input id="nextVisit" type="date" />
          </div>
        </FormSection>
      </form>
      <SheetFooter>
        <SheetClose asChild>
          <Button type="submit">Add Case</Button>
        </SheetClose>
        <SheetClose asChild>
          <Button variant="outline" type="reset">
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
