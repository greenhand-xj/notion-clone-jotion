'use client'

import { ConfirmModal } from '@/components/modals/confirm-modal'
import { Spinner } from '@/components/spinner'
import { Input } from '@/components/ui/input'
import { api } from '@/convex/_generated/api'
import { Id } from '@/convex/_generated/dataModel'
import { useMutation, useQuery } from 'convex/react'
import { Search, Trash, Undo } from 'lucide-react'
import { useParams, useRouter } from 'next/navigation'
import { useState } from 'react'
import { toast } from 'sonner'

export const TrashBox = () => {
  const router = useRouter()
  const params = useParams()
  const documents = useQuery(api.documents.getTrash, {})
  const restore = useMutation(api.documents.restore)
  const remove = useMutation(api.documents.remove)
  const [search, setSearch] = useState('')
  const filterDocuments = documents?.filter((document) => {
    return document.title.toLowerCase().includes(search.toLowerCase())
  })
  const onClick = (documentId: string) => {
    console.log('documentId', documentId)
    router.push(`/documents/${documentId}`)
  }
  const onRestore = (
    event: React.MouseEvent<HTMLDivElement>,
    documentId: Id<'documents'>
  ) => {
    event.stopPropagation()
    const promise = restore({ id: documentId })
    toast.promise(promise, {
      loading: 'Restoring note...',
      success: 'Note restored!',
      error: 'Failed to restore note.',
    })
  }
  const onRemove = (documentId: Id<'documents'>) => {
    const promise = remove({ id: documentId })
    toast.promise(promise, {
      loading: 'Removing note...',
      success: 'Note removed!',
      error: 'Failed to remove note.',
    })
    if (params.documentId === documentId) {
      router.push('/documents')
    }
  }
  if (documents === void 0) {
    return (
      <div className="h-full flex items-center justify-center p-4">
        <Spinner size={'lg'} />
      </div>
    )
  }
  return (
    <div className="text-sm">
      <div className="flex items-center gap-x-2 p-2">
        <Search className="w-4 h-4" />
        <Input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Filter by page title..."
          className="h-7 px-2 focus-visible:ring-transparent bg-secondary"
        />
      </div>
      <div className="mt-2 px-1 pb-1">
        <p className="hidden last:block text-xs text-center text-muted-foreground pb-2">
          No documents found.
        </p>
        {filterDocuments?.map((document) => (
          <div
            className="text-sm rounded-sm w-full hover:bg-primary/5 flex items-center text-primary justify-between"
            role="button"
            key={document._id}
            onClick={() => onClick(document._id)}
          >
            <span className="truncate pl-2">{document.title}</span>
            <div className="flex items-center">
              <div
                role="button"
                onClick={(event) => onRestore(event, document._id)}
                className="rounded-sm p-2 hover:bg-neutral-200"
              >
                <Undo className="h-4 w-4 text-muted-foreground" />
              </div>
              <ConfirmModal onConfirm={() => onRemove(document._id)}>
                <div
                  role="button"
                  className="rounded-sm p-2 hover:bg-neutral-200"
                >
                  <Trash className="h-4 w-4 text-muted-foreground" />
                </div>
              </ConfirmModal>
            </div>
          </div>
        ))}
      </div>
    </div >
  )
}
