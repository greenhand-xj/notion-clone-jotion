'use client'

import { useCoverImageStore } from '@/hooks/use-cover-image'
import { Dialog, DialogContent, DialogHeader } from '../ui/dialog'
import { useState } from 'react'
import { useEdgeStore } from '@/lib/edgestore'
import { useMutation } from 'convex/react'
import { api } from '@/convex/_generated/api'
import { useParams } from 'next/navigation'
import { Id } from '@/convex/_generated/dataModel'
import { SingleImageDropzone } from '../single-image-dropzone'

export const CoverImageModal = () => {
  const coverImage = useCoverImageStore()
  const [file, setFile] = useState<File>()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { edgestore } = useEdgeStore()
  const update = useMutation(api.documents.update)
  const params = useParams()

  const onClose = () => {
    coverImage.onClose()
    setFile(undefined)
    setIsSubmitting(false)
  }

  const onChange = async (file?: File) => {
    if (file) {
      setFile(file)
      setIsSubmitting(true)

      const res = await edgestore.publicFiles.upload({
        file,
        options: {
          replaceTargetUrl: coverImage.url
        }
      })

      await update({
        id: params.documentId as Id<'documents'>,
        coverImage: res.url,
      })
      onClose()
    }
  }
  return (
    <Dialog open={coverImage.isOpen} onOpenChange={coverImage.onClose}>
      <DialogContent>
        <DialogHeader>
          <h2 className="text-center text-lg font-semibold">Cover Image</h2>
        </DialogHeader>
        <SingleImageDropzone
          value={file}
          onChange={onChange}
          className="w-full outline-none"
          disabled={isSubmitting}
        />
      </DialogContent>
    </Dialog>
  )
}
