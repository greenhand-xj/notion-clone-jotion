"use client"

import { Spinner } from "@/components/spinner"
import { useConvexAuth } from "convex/react"
import { redirect } from "next/navigation"
import { Navigation } from "./_components/navigation"

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated, isLoading } = useConvexAuth()
  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-full">
        <Spinner size={"lg"} />
      </div>
    )
  }
  if (!isAuthenticated) {
    return redirect("/")
  }
  return (
    <div className="h-full flex dark:bg-[#1f1f1f]">
      <Navigation />
      <main className="h-full flex-1 overflow-y-auto">
        {children}
      </main>
    </div>
  )
}

export default MainLayout