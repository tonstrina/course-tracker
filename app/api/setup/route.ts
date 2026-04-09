import { NextResponse } from 'next/server'
import { initDB } from '@/lib/db'

export async function GET() {
  try {
    await initDB()
    return NextResponse.json({ message: 'Database tables created successfully.' })
  } catch (err) {
    console.error(err)
    return NextResponse.json({ error: 'Failed to initialise database.' }, { status: 500 })
  }
}
