import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { getCourse, getTaskChecks } from '@/lib/db'
import { redirect, notFound } from 'next/navigation'
import Link from 'next/link'
import CourseChecklist from '@/components/CourseChecklist'
import DeleteCourseButton from '@/components/DeleteCourseButton'

export default async function CourseDetailPage({ params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions)
  if (!session) redirect('/login')

  const course = await getCourse(Number(params.id))
  if (!course) notFound()

  const checks = await getTaskChecks(Number(params.id))

  const startDate = course.start_date
    ? new Date(course.start_date).toLocaleDateString('en-IE', {
        day: 'numeric', month: 'short', year: 'numeric',
      })
    : null

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-blue-900 text-white px-6 py-4 flex items-center gap-3">
        <Link href="/dashboard" className="text-blue-200 hover:text-white text-sm transition-colors">
          ← Dashboard
        </Link>
        <span className="text-blue-600">|</span>
        <span className="font-medium truncate">{course.name}</span>
      </header>

      <main className="max-w-2xl mx-auto px-4 py-8">
        <div className="flex items-start justify-between gap-4 mb-6">
          <div>
            <h1 className="text-xl font-semibold text-gray-900">{course.name}</h1>
            <div className="flex flex-wrap gap-x-4 gap-y-1 mt-1">
              {course.tutor && <span className="text-sm text-gray-500">Tutor: {course.tutor}</span>}
              {startDate && <span className="text-sm text-gray-500">Starts: {startDate}</span>}
              {course.venue && <span className="text-sm text-gray-500">Venue: {course.venue}</span>}
              {course.participants && <span className="text-sm text-gray-500">~{course.participants} participants</span>}
            </div>
            {course.sicap_group && (
              <span className="inline-block mt-2 text-xs bg-blue-50 text-blue-700 px-2 py-0.5 rounded-full">
                {course.sicap_group}
              </span>
            )}
          </div>
          <DeleteCourseButton courseId={course.id} />
        </div>

        <CourseChecklist courseId={course.id} initialChecks={checks} />
      </main>
    </div>
  )
}
