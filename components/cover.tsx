'use client'

import { cn } from '@/lib/utils'
import Image from 'next/image'
import { Button } from './ui/button'
import { ImageIcon, X } from 'lucide-react'
import { useCoverImageStore } from '@/hooks/use-cover-image'
import { useMutation } from 'convex/react'
import { api } from '@/convex/_generated/api'
import { useParams } from 'next/navigation'
import { Id } from '@/convex/_generated/dataModel'
import { useEdgeStore } from '@/lib/edgestore'
import { toast } from 'sonner'

interface CoverProps {
  url?: string
  preview?: boolean
}
export const Cover = ({ url, preview }: CoverProps) => {
  const coverImage = useCoverImageStore()
  const removeCoverImage = useMutation(api.documents.removeCoverImage)
  const params = useParams()
  const { edgestore } = useEdgeStore()
  const onRemove = async () => {
    if (url) {
      const promise1 = edgestore.publicFiles.delete({
        url: url,
      })
      toast.promise(promise1, {
        loading: 'Deleting cover image...',
        error: 'Failed to delete cover image',
        success() {
          const promise2 = removeCoverImage({ id: params.documentId as Id<'documents'> })
          toast.promise(promise2, {
            loading: 'Removing cover image...',
            success: 'Cover image removed!',
            error: 'Failed to remove cover image',
          })
          return null
        },
      })
    }

  }
  return (
    <div
      className={cn(
        'relative w-full h-[35vh] group',
        !url && 'h-[12vh]',
        url && 'bg-muted'
      )}
    >
      {!!url && (
        <Image priority src={url} fill alt="Cover" className="object-cover" />
      )}
      {url && !preview && (
        <div className="opacity-0 group-hover:opacity-100 absolute bottom-5 right-5 items-center gap-x-2">
          <Button
            variant={'outline'}
            className="text-muted-foreground text-xs"
            onClick={() => coverImage.onReplace(url)}
            size={'sm'}
          >
            <ImageIcon className="h-4 w-4 mr-2" />
            Change Cover
          </Button>
          <Button
            variant={'outline'}
            className="ml-2 text-muted-foreground text-xs"
            onClick={onRemove}
            size={'sm'}
          >
            <X className="h-4 w-4 mr-2" />
            Remove
          </Button>
        </div>
      )}
    </div>
  )
}
