"use client"

import { useEffect, useState } from "react"
import { useTranslations } from "next-intl"
import { Clock, Save } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { usePracticeSettings } from "@/lib/hooks/use-settings"

export default function DashboardSettingsPage() {
  const t = useTranslations("Settings")
  const common = useTranslations("Common")
  const { settings, updatePractice } = usePracticeSettings()
  const [timezone, setTimezone] = useState("America/Bogota")
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    if (settings?.timezone) {
      setTimezone(settings.timezone)
    }
  }, [settings?.timezone])

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setSaving(true)

    try {
      const formData = new FormData(event.currentTarget)
      await updatePractice({
        timezone,
        workdayStart: String(formData.get("workdayStart")),
        workdayEnd: String(formData.get("workdayEnd")),
        lunchStart: String(formData.get("lunchStart") ?? "") || undefined,
        lunchEnd: String(formData.get("lunchEnd") ?? "") || undefined,
        slotIntervalMinutes: Number(formData.get("slotIntervalMinutes")),
        dailyCapacityMinutes: Number(formData.get("dailyCapacityMinutes")),
      })
    } finally {
      setSaving(false)
    }
  }

  if (!settings) {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight text-foreground">{t("title")}</h1>
          <p className="mt-1 text-sm text-muted-foreground">{t("loading")}</p>
        </div>
        <div className="h-96 rounded-xl border bg-card" />
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight text-foreground">{t("title")}</h1>
        <p className="mt-1 text-sm text-muted-foreground">{t("subtitle")}</p>
      </div>

      <Card className="max-w-3xl gap-0 py-0 shadow-none">
        <CardContent className="p-5">
          <div className="mb-5 flex items-center gap-2">
            <Clock className="size-4 text-muted-foreground" />
            <h2 className="font-semibold text-foreground">{t("practiceHours")}</h2>
          </div>

          <form className="space-y-5" onSubmit={handleSubmit}>
            <div className="space-y-2">
              <Label htmlFor="timezone">{t("timezone")}</Label>
              <Select value={timezone} onValueChange={setTimezone}>
                <SelectTrigger id="timezone" className="w-full">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="America/Bogota">America/Bogota</SelectItem>
                  <SelectItem value="America/New_York">America/New_York</SelectItem>
                  <SelectItem value="America/Chicago">America/Chicago</SelectItem>
                  <SelectItem value="America/Los_Angeles">America/Los_Angeles</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="workdayStart">{t("workdayStart")}</Label>
                <Input id="workdayStart" name="workdayStart" type="time" defaultValue={settings.workdayStart} required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="workdayEnd">{t("workdayEnd")}</Label>
                <Input id="workdayEnd" name="workdayEnd" type="time" defaultValue={settings.workdayEnd} required />
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="lunchStart">{t("lunchStart")}</Label>
                <Input id="lunchStart" name="lunchStart" type="time" defaultValue={settings.lunchStart ?? ""} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="lunchEnd">{t("lunchEnd")}</Label>
                <Input id="lunchEnd" name="lunchEnd" type="time" defaultValue={settings.lunchEnd ?? ""} />
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="slotIntervalMinutes">{t("slotInterval")}</Label>
                <Input id="slotIntervalMinutes" name="slotIntervalMinutes" type="number" min={5} step={5} defaultValue={settings.slotIntervalMinutes} required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="dailyCapacityMinutes">{t("dailyCapacity")}</Label>
                <Input id="dailyCapacityMinutes" name="dailyCapacityMinutes" type="number" min={30} step={15} defaultValue={settings.dailyCapacityMinutes} required />
              </div>
            </div>

            <Button type="submit" disabled={saving}>
              {saving ? common("saving") : t("save")}
              {saving ? null : <Save className="size-4" />}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
