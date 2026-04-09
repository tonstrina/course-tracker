'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

const SICAP_GROUPS = [
  'Unemployed / Long-term unemployed',
  'New Communities (incl. Ukrainians / IPAs)',
  'Traveller / Roma Community',
  'People with Disability',
  'Low Income Households',
  'General Community',
]

export default function NewCoursePage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [form, setForm] = useState({
    name: '',
    start_date: '',
    tutor: '',
    venue: '',
    participants: '',
    sicap_group: '',
  })

  function set(field: string, value: string) {
    setForm((f) => ({ ...f, [field]: value }))
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!form.name.trim()) return
    setLoading(true)
    const res = await fetch('/api/courses', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        ...form,
        participants: form.participants ? Number(form.participants) : null,
      }),
    })
    if (res.ok) {
      const course = await res.json()
      router.push(`/dashboard/${course.id}`)
    } else {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-blue-900 text-white px-6 py-4 flex items-center gap-3">
        <Link href="/dashboard" className="text-blue-200 hover:text-white text-sm transition-colors">
          ← Dashboard
        </Link>
        <span className="text-blue-600">|</span>
        <span className="font-medium">New course</span>
      </header>

      <main className="max-w-xl mx-auto px-4 py-8">
        <h1 className="text-xl font-semibold text-gray-900 mb-6">Create a new course</h1>

        <form onSubmit={handleSubmit} className="bg-white border border-gray-200 rounded-2xl p-6 space-y-5">
          <div>
            <label className="block text-sm text-gray-600 mb-1">
              Course name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={form.name}
              onChange={(e) => set('name', e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="e.g. Digital Skills Basics"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-gray-600 mb-1">Start date</label>
              <input
                type="date"
                value={form.start_date}
                onChange={(e) => set('start_date', e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-600 mb-1">Approx. participants</label>
              <input
                type="number"
                value={form.participants}
                onChange={(e) => set('participants', e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="e.g. 12"
                min="1"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm text-gray-600 mb-1">Tutor name</label>
            <input
              type="text"
              value={form.tutor}
              onChange={(e) => set('tutor', e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="e.g. Máire Ní Fhaoláin"
            />
          </div>

          <div>
            <label className="block text-sm text-gray-600 mb-1">Venue</label>
            <input
              type="text"
              value={form.venue}
              onChange={(e) => set('venue', e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="e.g. GTEIC Gaoth Dobhair"
            />
          </div>

          <div>
            <label className="block text-sm text-gray-600 mb-1">SICAP target group</label>
            <select
              value={form.sicap_group}
              onChange={(e) => set('sicap_group', e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
            >
              <option value="">Select...</option>
              {SICAP_GROUPS.map((g) => (
                <option key={g} value={g}>{g}</option>
              ))}
            </select>
          </div>

          <div className="flex gap-3 pt-2">
            <button
              type="submit"
              disabled={loading || !form.name.trim()}
              className="flex-1 bg-blue-900 hover:bg-blue-800 text-white text-sm font-medium py-2.5 rounded-lg disabled:opacity-50 transition-colors"
            >
              {loading ? 'Creating…' : 'Create course & open checklist'}
            </button>
            <Link
              href="/dashboard"
              className="px-4 py-2.5 border border-gray-300 rounded-lg text-sm text-gray-600 hover:bg-gray-50 transition-colors"
            >
              Cancel
            </Link>
          </div>
        </form>
      </main>
    </div>
  )
}
