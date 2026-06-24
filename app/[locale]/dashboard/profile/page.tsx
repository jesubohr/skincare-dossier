"use client"

import { useEffect, useState } from "react"
import { useTranslations } from "next-intl"
import { BriefcaseMedical, Save } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { UserAvatar } from "@/components/shared/user-avatar"
import { useProfile } from "@/lib/hooks/use-profile"
import { getAvatarInitials } from "@/lib/utils"
import type { Id } from "@/convex/_generated/dataModel"

export default function ProfilePage() {
  const t = useTranslations("Profile")
  const common = useTranslations("Common")
  const { profile, updateProfile, generateAvatarUploadUrl, updateAvatar } = useProfile()
  const [saving, setSaving] = useState(false)
  const [uploading, setUploading] = useState(false)
  const [specialties, setSpecialties] = useState("")

  useEffect(() => {
    setSpecialties(profile?.specialties?.join(", ") ?? "")
  }, [profile?.specialties])

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (!profile) return

    setSaving(true)
    try {
      const formData = new FormData(event.currentTarget)
      await updateProfile({
        fullName: String(formData.get("fullName")),
        displayName: String(formData.get("displayName") ?? "") || undefined,
        phone: String(formData.get("phone") ?? "") || undefined,
        professionalTitle: String(formData.get("professionalTitle") ?? "") || undefined,
        licenseNumber: String(formData.get("licenseNumber") ?? "") || undefined,
        specialties: specialties
          .split(",")
          .map((item) => item.trim())
          .filter(Boolean),
        bio: String(formData.get("bio") ?? "") || undefined,
      })
    } finally {
      setSaving(false)
    }
  }

  async function handleAvatarChange(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0]
    if (!file) return

    setUploading(true)
    try {
      const uploadUrl = await generateAvatarUploadUrl()
      const result = await fetch(uploadUrl, {
        method: "POST",
        headers: { "Content-Type": file.type },
        body: file,
      })
      const { storageId } = (await result.json()) as { storageId: Id<"_storage"> }
      await updateAvatar({ storageId })
    } finally {
      setUploading(false)
      event.target.value = ""
    }
  }

  if (!profile) {
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

  const displayName = profile.displayName ?? profile.fullName

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight text-foreground">{t("title")}</h1>
        <p className="mt-1 text-sm text-muted-foreground">{t("subtitle")}</p>
      </div>

      <section className="grid gap-4 xl:grid-cols-[340px_minmax(0,1fr)]">
        <Card className="gap-0 py-0 shadow-none">
          <CardContent className="p-5">
            <div className="flex flex-col items-center text-center">
              <UserAvatar initials={getAvatarInitials(displayName)} avatarUrl={profile.avatarUrl} />
              <h2 className="mt-4 text-lg font-semibold text-foreground">{displayName}</h2>
              <p className="mt-1 text-sm text-muted-foreground">{profile.professionalTitle ?? t("fallbackTitle")}</p>
              <p className="mt-1 font-mono text-xs text-muted-foreground">{profile.email}</p>
            </div>

            <div className="mt-6 space-y-2">
              <Label htmlFor="avatar">{t("image")}</Label>
              <Input id="avatar" type="file" accept="image/*" onChange={handleAvatarChange} disabled={uploading} />
              <p className="text-xs text-muted-foreground">{uploading ? t("uploading") : t("uploadHint")}</p>
            </div>
          </CardContent>
        </Card>

        <Card className="gap-0 py-0 shadow-none">
          <CardContent className="p-5">
            <div className="mb-5 flex items-center gap-2">
              <BriefcaseMedical className="size-4 text-muted-foreground" />
              <h2 className="font-semibold text-foreground">{t("clinicalProfile")}</h2>
            </div>

            <form className="space-y-5" onSubmit={handleSubmit}>
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="fullName">{t("fullName")}</Label>
                  <Input id="fullName" name="fullName" defaultValue={profile.fullName} required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="displayName">{t("displayName")}</Label>
                  <Input id="displayName" name="displayName" defaultValue={profile.displayName ?? ""} />
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="email">{common("email")}</Label>
                  <Input id="email" value={profile.email} readOnly />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">{t("phone")}</Label>
                  <Input id="phone" name="phone" defaultValue={profile.phone ?? ""} />
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="professionalTitle">{t("professionalTitle")}</Label>
                  <Input id="professionalTitle" name="professionalTitle" defaultValue={profile.professionalTitle ?? ""} placeholder={t("professionalPlaceholder")} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="licenseNumber">{t("license")}</Label>
                  <Input id="licenseNumber" name="licenseNumber" defaultValue={profile.licenseNumber ?? ""} />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="specialties">{t("specialties")}</Label>
                <Input id="specialties" value={specialties} onChange={(event) => setSpecialties(event.target.value)} placeholder={t("specialtiesPlaceholder")} />
              </div>

              <div className="space-y-2">
                <Label htmlFor="bio">{t("bio")}</Label>
                <Textarea id="bio" name="bio" rows={5} defaultValue={profile.bio ?? ""} placeholder={t("bioPlaceholder")} />
              </div>

              <Button type="submit" disabled={saving}>
                {saving ? common("saving") : t("save")}
                {saving ? null : <Save className="size-4" />}
              </Button>
            </form>
          </CardContent>
        </Card>
      </section>
    </div>
  )
}
