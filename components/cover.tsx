'use client'

import { cn } from '@/lib/utils'
import Image from 'next/image'
import { Button } from './ui/button'
import { ImageIcon, UnfoldVertical, X } from 'lucide-react'
import { useCoverImageStore } from '@/hooks/use-cover-image'
import { useMutation } from 'convex/react'
import { api } from '@/convex/_generated/api'
import { useParams } from 'next/navigation'
import { Id } from '@/convex/_generated/dataModel'
import { useEdgeStore } from '@/lib/edgestore'
import { toast } from 'sonner'
import { Skeleton } from './ui/skeleton'
import { ElementRef, ElementType, useMemo, useRef, useState } from 'react'

interface CoverProps {
  url?: string
  preview?: boolean
}
export const Cover = ({ url, preview }: CoverProps) => {
  const coverImage = useCoverImageStore()
  const removeCoverImage = useMutation(api.documents.removeCoverImage)
  const params = useParams()
  const { edgestore } = useEdgeStore()
  const [isDragging, setIsDragging] = useState(false)
  const dragRef = useRef<HTMLDivElement>(null)
  const coverRef = useRef<HTMLImageElement>(null)
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
  const handleMouseMove = (e: MouseEvent) => {
    e.stopPropagation()
    e.preventDefault()
    // if (!isDragging) return
    if (!dragRef.current) return
    if (!coverRef.current) return
    const rect = dragRef.current.getBoundingClientRect()
    const y = e.clientY - rect.top
    const posY = (1 - (y / rect.height)) * 100
    coverRef.current.style.objectPosition = `center ${posY}%`
  }
  const handleMouseUp = (e: MouseEvent) => {
    e.stopPropagation()
    setIsDragging(false)
    dragRef.current?.removeEventListener('mousemove', handleMouseMove)
    dragRef.current?.removeEventListener('mousedown', handleMouseDown)
    document.removeEventListener('mouseup', handleMouseUp)
  }
  const handleMouseDown = () => {
    dragRef.current?.addEventListener('mousemove', handleMouseMove)
    document.addEventListener('mouseup', handleMouseUp)
  }


  const handleReposition = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation()
    if (!dragRef.current) return
    setIsDragging(true)
    dragRef.current?.addEventListener('mousedown', handleMouseDown)
  }

  return (
    <div
      ref={dragRef}
      className={cn(
        'relative w-full h-[35vh] group mt-12',
        !url && 'h-[12vh]',
        url && 'bg-muted',
        isDragging && 'cursor-move'
      )}
    >
      {!!url && (
        // placeholder='blur'
        <Image ref={coverRef} onDrag={e => e.preventDefault()} onDragStart={e => e.preventDefault()} onDragEnd={e => e.preventDefault()} objectPosition={`center center`} priority src={url} fill alt="Cover" className="object-cover" />
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
            className="text-muted-foreground text-xs ml-2"
            onClick={handleReposition}
            size={'sm'}
          >
            <UnfoldVertical className="h-4 w-4 mr-2" />
            Reposition
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

Cover.SKeleton = function CoverSkeleton() {
}