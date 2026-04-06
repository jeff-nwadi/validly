import React from 'react'
import { VercelV0Chat } from '@/components/ui/v0-ai-chat'

export default function ValidatePage() {
  return (
    <div className='flex-1 flex flex-col items-center justify-center bg-black overflow-y-auto px-4 py-12'>
      <VercelV0Chat />
    </div>
  )
}
