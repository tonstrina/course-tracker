'use client'

import { useRouter } from 'next/navigation'
import { useState } from 'react'

export default function DeleteCourseButton({ courseId }: { courseId: number }) {
  const router = useRouter()
  const [confirming, setConfirming] = useState(false)
  const [loading, setLoading] = useState(false)

  async function handleDelete() {
    setLoading(true)
    await fetch(`/api/courses/${courseId}`, { method: 'DELETE' })
    router.push('/dashboard')
    router.refresh()
  }

  if (confirming) {
    return (
      <div className="flex items-center gap-2 flex-shrink-0">
        <span className="text-xs text-gray-500">Delete this course?</span>
        <button
          onClick={handleDelete}
          disabled={loading}
          className="text-xs bg-red-600 hover:bg-red-700 text-white px-3 py-1.5 rounded-lg disabled:opacity-50 transition-colors"
        >
          {loading ? 'Deleting…' : 'Yes, delete'}
        </button>
        <button
          onClick={() => setConfirming(false)}
          className="text-xs text-gray-500 hover:text-gray-700 px-2 py-1.5"
        >
          Cancel
        </button>
      </div>
    )
  }

  return (
    <button
      onClick={() => setConfirming(true)}
      className="text-xs text-gray-400 hover:text-red-500 flex-shrink-0 transition-colors border border-gray-200 px-3 py-1.5 rounded-lg hover:border-red-200"
    >
      Delete course
    </button>
  )
}
