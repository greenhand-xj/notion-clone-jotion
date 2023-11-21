"use client"

import { cn } from "@/lib/utils"
import { ChevronsLeft, MenuIcon } from "lucide-react"
import { usePathname } from "next/navigation"
import { ElementRef, useRef, useState, useEffect } from "react"
import { useMediaQuery } from "usehooks-ts"
import { UserItem } from "./user-item"

export const Navigation = () => {
  const pathname = usePathname()
  const isMobile = useMediaQuery("(max-width: 768px)")
  const isResizingRef = useRef(false)
  const sidebarRef = useRef<ElementRef<"aside">>(null)
  const navbarRef = useRef<ElementRef<"div">>(null)
  const [isResetting, setIsResetting] = useState(false)
  const [isCollapsed, setIsCollapsed] = useState(isMobile)

  useEffect(() => {
    if (isMobile) {
      collapse()
    } else {
      resetWidth()
    }
  }, [isMobile])

  useEffect(() => {
    if (isMobile) {
      collapse()
    }
  }, [isMobile, pathname])

  const handleMouseDown = (event: React.MouseEvent<HTMLDivElement>) => {
    event.preventDefault()
    event.stopPropagation()
    isResizingRef.current = true
    document.addEventListener('mousemove', handleMouseMove)
    document.addEventListener('mouseup', handleMouseUp)
  }
  const handleMouseMove = (event: MouseEvent) => {
    if (!isResizingRef.current) return
    let newWidth = event.clientX
    if (newWidth < 240) newWidth = 240
    if (newWidth > 480) newWidth = 480
    if (sidebarRef.current && navbarRef.current) {
      sidebarRef.current.style.width = `${newWidth}px`
      navbarRef.current.style.left = `${newWidth}px`
      navbarRef.current.style.setProperty("width", `calc(100% - ${newWidth}px)`)
    }
  }
  const handleMouseUp = () => {
    isResizingRef.current = false
    document.removeEventListener('mousemove', handleMouseMove)
    document.removeEventListener('mouseup', handleMouseUp)
  }

  const resetWidth = () => {
    if (sidebarRef.current && navbarRef.current) {
      setIsCollapsed(false)
      setIsResetting(true)
      sidebarRef.current.style.width = isMobile ? "100%" : "240px"
      navbarRef.current.style.setProperty("width", "calc(100% - 240px)")
      navbarRef.current.style.left = isMobile ? "100%" : "240px"
      setTimeout(() => {
        setIsResetting(false)
      }, 300);
    }
  }

  const collapse = () => {
    if (sidebarRef.current && navbarRef.current) {
      setIsCollapsed(true)
      setIsResetting(true)
      sidebarRef.current.style.width = "0"
      navbarRef.current.style.setProperty("width", "100%")
      navbarRef.current.style.left = "0"
      setTimeout(() => {
        setIsResetting(false)
      }, 300);
    }
  }

  return (
    <>
      <aside ref={sidebarRef}
        className={
          cn("group/sidebar h-full bg-secondary overflow-y-auto relative flex-col w-60 z-[99999] flex",
            isResetting && "transition-all duration-300 ease-in-out",
            isMobile && "w-0"
          )}>
        <div role="button"
          onClick={collapse}
          className={
            cn("text-muted-foreground rounded-sm hover:bg-neutral-300 dark:hover:bg-neutral-600 absolute top-3 right-2 opacity-0 group-hover/sidebar:opacity-100 transition",
              isMobile && "opacity-100"
            )}>
          <ChevronsLeft className="h-6 w-6" />
        </div>
        <div>
          <UserItem />
        </div>
        <div className="mt-4">
          <p>Documents</p>
        </div>
        <div
          className="opacity-0 group-hover/sidebar:opacity-100 transition cursor-ew-resize h-full absolute top-0 right-0 w-1 bg-primary/10"
          onMouseDown={handleMouseDown}
          onClick={resetWidth}
          onDoubleClick={resetWidth}
        ></div>
      </aside>
      <div ref={navbarRef} className={cn(
        "absolute top-0 z-[9999] left-60 w-[calc(100%-240px)]",
        isResetting && "transition-all duration-300 ease-in-out",
        isMobile && "w-full left-0"
      )}>
        <nav className="bg-transparent px-3 py-2 w-full">
          {isCollapsed && <MenuIcon onClick={resetWidth} role="button" className="h-6 w-6 text-muted-foreground" />}
        </nav>
      </div>
    </>
  )
}