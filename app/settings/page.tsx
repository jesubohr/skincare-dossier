"use client"

import { useTheme } from "next-themes"
import { Button } from "@/components/ui/button"

export default function Settings() {
  const { theme, setTheme } = useTheme()

  function handleSetTheme(theme: string) {
    setTheme(theme)
  }

  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-2xl font-bold">Settings</h1>
      <div className="flex gap-2">
        <Button onClick={() => handleSetTheme("light")}>Light</Button>
        <Button onClick={() => handleSetTheme("dark")}>Dark</Button>
      </div>
    </div>
  )
}
