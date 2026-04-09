import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { getCourses } from '@/lib/db'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import { TOTAL_TASKS } from '@/lib/tasks'
import SignOutButton from '@/components/SignOutButton'

export default async function DashboardPage() {
  const session = await getServerSession(authOptions)
  if (!session) redirect('/login')

  const courses = await getCourses()

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-blue-900 text-white px-6 py-4 flex items-center justify-between">
        <div>
          <span className="text-xs font-semibold bg-blue-700 px-2 py-0.5 rounded mr-2">DLDC</span>
          <span className="font-medium">Course Tracker</span>
        </div>
        <SignOutButton />
      </header>

      <main className="max-w-4xl mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-xl font-semibold text-gray-900">Your courses</h1>
            <p className="text-sm text-gray-500 mt-0.5">{courses.length} course{courses.length !== 1 ? 's' : ''} on record</p>
          </div>
          <Link
            href="/new"
            className="bg-blue-900 hover:bg-blue-800 text-white text-sm font-medium px-4 py-2 rounded-lg transition-colors"
          >
            + New course
          </Link>
        </div>

        {courses.length === 0 ? (
          <div className="bg-white border border-gray-200 rounded-2xl p-12 text-center">
            <p className="text-gray-400 text-sm">No courses yet. Create your first one above.</p>
          </div>
        ) : (
          <div className="space-y-3">
            {courses.map((course) => {
              const done = Number(course.done_count) || 0
              const pct = Math.round((done / TOTAL_TASKS) * 100)
              return (
                <Link
                  key={course.id}
                  href={`/dashboard/${course.id}`}
                  className="block bg-white border border-gray-200 rounded-2xl p-5 hover:border-blue-300 hover:shadow-sm transition-all"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1 min-w-0">
                      <h2 className="font-medium text-gray-900 truncate">{course.name}</h2>
                      <div className="flex flex-wrap gap-x-4 gap-y-1 mt-1">
                        {course.tutor && (
                          <span className="text-xs text-gray-500">Tutor: {course.tutor}</span>
                        )}
                        {course.start_date && (
                          <span className="text-xs text-gray-500">
                            Starts: {new Date(course.start_date).toLocaleDateString('en-IE', { day: 'numeric', month: 'short', year: 'numeric' })}
                          </span>
                        )}
                        {course.venue && (
                          <span className="text-xs text-gray-500">Venue: {course.venue}</span>
                        )}
                      </div>
                    </div>
                    <div className="text-right flex-shrink-0">
                      <span className="text-sm font-medium text-blue-900">{pct}%</span>
                      <p className="text-xs text-gray-400">{done}/{TOTAL_TASKS} tasks</p>
                    </div>
                  </div>
                  <div className="mt-3 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-blue-700 rounded-full transition-all"
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                  {course.sicap_group && (
                    <span className="inline-block mt-2 text-xs bg-blue-50 text-blue-700 px-2 py-0.5 rounded-full">
                      {course.sicap_group}
                    </span>
                  )}
                </Link>
              )
            })}
          </div>
        )}
      </main>
    </div>
  )
}
