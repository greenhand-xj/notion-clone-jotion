"use client"

import { Toolbar } from "@/components/toolbar"
import { api } from "@/convex/_generated/api"
import { Id } from "@/convex/_generated/dataModel"
import { useQuery } from "convex/react"


interface DocumentIdProps {
  params: {
    documentId: Id<"documents">
  }
}

export default function DocumentPage({ params }: DocumentIdProps) {
  const document = useQuery(api.documents.getById, {
    documentId: params.documentId
  })
  if (document === void 0) {
    return (
      <div>Loading...</div>
    )
  }
  if (document === null) {
    return (
      <div>Document not found</div>
    )
  }
  return (
    <div className="pb-40">
      <div className="h-[35vh]"></div>
      <div className="md:max-w-3xl lg:max-w-4xl mx-auto">
        <Toolbar initialData={document} />
      </div>
    </div>
  )
}
