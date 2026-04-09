import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { getTaskChecks, setTaskCheck } from '@/lib/db'

export async function GET(_: Request, { params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions)
  if (!session) return NextResponse.json({ error: 'Unauthorised' }, { status: 401 })
  const checks = await getTaskChecks(Number(params.id))
  return NextResponse.json(checks)
}

export async function POST(req: Request, { params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions)
  if (!session) return NextResponse.json({ error: 'Unauthorised' }, { status: 401 })
  const { taskId, checked } = await req.json()
  await setTaskCheck(Number(params.id), taskId, checked)
  return NextResponse.json({ ok: true })
}
