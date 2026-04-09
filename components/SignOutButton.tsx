'use client'

import { signOut } from 'next-auth/react'

export default function SignOutButton() {
  return (
    <button
      onClick={() => signOut({ callbackUrl: '/login' })}
      className="text-sm text-blue-200 hover:text-white transition-colors"
    >
      Sign out
    </button>
  )
}
