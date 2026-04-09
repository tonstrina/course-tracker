'use client'

import { useState, useTransition } from 'react'
import { STAGES, TOTAL_TASKS } from '@/lib/tasks'

interface Props {
  courseId: number
  initialChecks: Record<string, boolean>
}

export default function CourseChecklist({ courseId, initialChecks }: Props) {
  const [checks, setChecks] = useState<Record<string, boolean>>(initialChecks)
  const [openStages, setOpenStages] = useState<Record<string, boolean>>({ plan: true })
  const [pending, startTransition] = useTransition()

  const totalDone = Object.values(checks).filter(Boolean).length
  const pct = Math.round((totalDone / TOTAL_TASKS) * 100)

  function toggleStage(id: string) {
    setOpenStages((s) => ({ ...s, [id]: !s[id] }))
  }

  function toggleTask(taskId: string) {
    const newVal = !checks[taskId]
    setChecks((c) => ({ ...c, [taskId]: newVal }))
    startTransition(async () => {
      await fetch(`/api/courses/${courseId}/tasks`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ taskId, checked: newVal }),
      })
    })
  }

  return (
    <div>
      {/* Summary bar */}
      <div className="bg-white border border-gray-200 rounded-2xl p-4 mb-4 flex items-center gap-4">
        <div className="flex-1">
          <div className="flex justify-between text-sm mb-1.5">
            <span className="text-gray-600">{totalDone} of {TOTAL_TASKS} tasks complete</span>
            <span className="font-medium text-blue-900">{pct}%</span>
          </div>
          <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
            <div
              className="h-full bg-blue-700 rounded-full transition-all duration-300"
              style={{ width: `${pct}%` }}
            />
          </div>
        </div>
        {pending && (
          <span className="text-xs text-gray-400 flex-shrink-0">Saving…</span>
        )}
      </div>

      {/* Stages */}
      <div className="space-y-2">
        {STAGES.map((stage) => {
          const stageDone = stage.tasks.filter((t) => checks[t.id]).length
          const stageTotal = stage.tasks.length
          const stagePct = Math.round((stageDone / stageTotal) * 100)
          const isOpen = openStages[stage.id] ?? false

          return (
            <div key={stage.id} className="bg-white border border-gray-200 rounded-2xl overflow-hidden">
              {/* Stage header */}
              <button
                onClick={() => toggleStage(stage.id)}
                className="w-full flex items-center gap-3 px-4 py-3 hover:bg-gray-50 transition-colors text-left"
              >
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-sm font-medium text-gray-900">{stage.label}</span>
                    <span className="text-xs text-gray-400 flex-shrink-0">{stageDone}/{stageTotal}</span>
                  </div>
                  <div className="mt-1.5 h-1 bg-gray-100 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-blue-600 rounded-full transition-all"
                      style={{ width: `${stagePct}%` }}
                    />
                  </div>
                </div>
                <svg
                  className={`w-4 h-4 text-gray-400 flex-shrink-0 transition-transform ${isOpen ? 'rotate-180' : ''}`}
                  fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {/* Tasks */}
              {isOpen && (
                <div className="border-t border-gray-100 divide-y divide-gray-50">
                  {stage.tasks.map((task) => (
                    <label
                      key={task.id}
                      className="flex items-start gap-3 px-4 py-3 cursor-pointer hover:bg-gray-50 transition-colors"
                    >
                      <input
                        type="checkbox"
                        checked={!!checks[task.id]}
                        onChange={() => toggleTask(task.id)}
                        className="mt-0.5 h-4 w-4 rounded border-gray-300 text-blue-700 focus:ring-blue-500 cursor-pointer flex-shrink-0"
                      />
                      <div className="flex-1 min-w-0">
                        <span className={`text-sm ${checks[task.id] ? 'line-through text-gray-400' : 'text-gray-800'}`}>
                          {task.text}
                        </span>
                        <div className="flex items-center gap-2 mt-0.5 flex-wrap">
                          {task.note && (
                            <span className="text-xs text-gray-400">{task.note}</span>
                          )}
                          {task.asap && (
                            <span className="text-xs bg-orange-50 text-orange-700 px-1.5 py-0.5 rounded-full font-medium">
                              ASAP
                            </span>
                          )}
                          {task.key && (
                            <span className="text-xs bg-blue-50 text-blue-700 px-1.5 py-0.5 rounded-full font-medium">
                              key
                            </span>
                          )}
                        </div>
                      </div>
                    </label>
                  ))}
                </div>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}
