"use client"

import { useSettingsStore } from "@/hooks/use-settings"
import { Dialog, DialogContent, DialogHeader } from "../ui/dialog"
import { Label } from "../ui/label"
import { ModeToggle } from "../mode-toggle"

export const SettingsModal = () => {
  const settings = useSettingsStore()

  return (
    <Dialog open={settings.isOpen} onOpenChange={settings.onClose}>
      <DialogContent>
        <DialogHeader className="border-b pb-3">
          <h2 className="text-lg font-medium">
            My Settings
          </h2>
        </DialogHeader>
        <div className="flex items-center justify-between">
          <div className="flex flex-col gap-x-1">
            <Label>Appearance</Label>
            <span className="text-[0.8rem] text-muted-foreground">
              Customize how Jotion looks on your device.
            </span>
          </div>
          <ModeToggle />
        </div>
      </DialogContent>
    </Dialog>
  )
}