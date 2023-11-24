"use client"
import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "@/components/ui/command"
import { api } from "@/convex/_generated/api"
import { useSearchStore } from "@/hooks/use-search"
import { useUser } from "@clerk/clerk-react"
import { useQuery } from "convex/react"
import { File } from "lucide-react"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"

export function SearchCommand() {
  const { user } = useUser()
  const router = useRouter()
  const documents = useQuery(api.documents.getSearch, {})
  const [isMounted, setIsMounted] = useState(false)

  const toggle = useSearchStore((state) => state.toggle)
  const isOpen = useSearchStore((state) => state.isOpen)
  const onClose = useSearchStore((state) => state.onClose)

  useEffect(() => {
    setIsMounted(true)
  }, [])
  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        toggle()
      }
    }
    document.addEventListener("keydown", down)
    return () => document.removeEventListener("keydown", down)
  }, [toggle])
  if (!isMounted) return null
  const onSelect = (id: string) => {
    router.push(`/documents/${id}`)
    onClose()
  }


  return (
    <CommandDialog open={isOpen} onOpenChange={onClose}>
      <CommandInput placeholder={`Search ${user?.fullName ?? user?.username}'s Jotion`} />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        <CommandGroup heading="Documents">
          {documents?.map((doc) => (
            <CommandItem
              key={doc._id}
              value={`${doc._id}-${doc.title}`}
              onSelect={() => onSelect(doc._id)}
            >
              {doc.icon ? (
                <p className="mr-2 text-[18px]">{doc.icon}</p>
              ) : (
                <File className="mr-2 h-4 w-4" />
              )}
              <span>{doc.title}</span>
            </CommandItem>
          ))}
        </CommandGroup>
        <CommandSeparator />
      </CommandList>
    </CommandDialog>
  )
}
