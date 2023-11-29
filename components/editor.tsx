"use client"
import { useBlockNote, BlockNoteView } from '@blocknote/react'
import { BlockNoteEditor, PartialBlock } from "@blocknote/core"
import "@blocknote/core/style.css"
import { useTheme } from 'next-themes'
import { useEdgeStore } from '@/lib/edgestore'

interface EditorProps {
  onChange: (value: string) => void
  initialContent?: string
  editable?: boolean
}

const Editor = ({ onChange, initialContent, editable }: EditorProps) => {
  const { resolvedTheme } = useTheme()
  const { edgestore } = useEdgeStore()
  const handleUpload = async (file: File) => {
    const response = await edgestore.publicFiles.upload({
      file
    })
    return response.url
  }
  const editor: BlockNoteEditor = useBlockNote({
    editable,
    initialContent: initialContent ? JSON.parse(initialContent) as PartialBlock[] : undefined,
    onEditorContentChange(editor) {
      onChange(JSON.stringify(editor.topLevelBlocks));
    },
    uploadFile: handleUpload
  })
  return (
    <div className='mt-2'>
      <BlockNoteView editor={editor} theme={resolvedTheme === 'dark' ? 'dark' : 'light'} />
    </div>
  )
}
export default Editor