"use client"

import { useScrollTop } from "@/hooks/use-scroll-top"
import { cn } from "@/lib/utils"
import { Logo } from "./logo"
import { ModeToggle } from "@/components/mode-toggle"

export const Navbar = () => {
  const scrolled = useScrollTop()
  return (
    <div className={cn(
      "z-50 fixed top-0 flex backdrop-blur-[6px] items-center w-full p-6",
      scrolled && "border-b shadow-sm"
    )}>
      <Logo />
      <div className="md:ml-auto md:justify-end justify-between flex w-full items-center gap-x-2">
        <ModeToggle />
      </div>
    </div>
  )
}
