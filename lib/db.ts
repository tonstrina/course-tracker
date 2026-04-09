import { sql } from '@vercel/postgres'

export async function initDB() {
  await sql`
    CREATE TABLE IF NOT EXISTS courses (
      id SERIAL PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      start_date DATE,
      tutor VARCHAR(255),
      venue VARCHAR(255),
      participants INTEGER,
      sicap_group VARCHAR(255),
      created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
    )
  `
  await sql`
    CREATE TABLE IF NOT EXISTS task_checks (
      id SERIAL PRIMARY KEY,
      course_id INTEGER REFERENCES courses(id) ON DELETE CASCADE,
      task_id VARCHAR(50) NOT NULL,
      checked BOOLEAN DEFAULT FALSE,
      updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
      UNIQUE(course_id, task_id)
    )
  `
  return { success: true }
}

export async function getCourses() {
  const result = await sql`
    SELECT
      c.*,
      COUNT(tc.id) FILTER (WHERE tc.checked = true) AS done_count
    FROM courses c
    LEFT JOIN task_checks tc ON c.id = tc.course_id
    GROUP BY c.id
    ORDER BY c.created_at DESC
  `
  return result.rows
}

export async function createCourse(data: {
  name: string
  start_date?: string
  tutor?: string
  venue?: string
  participants?: number | null
  sicap_group?: string
}) {
  const result = await sql`
    INSERT INTO courses (name, start_date, tutor, venue, participants, sicap_group)
    VALUES (
      ${data.name},
      ${data.start_date || null},
      ${data.tutor || null},
      ${data.venue || null},
      ${data.participants || null},
      ${data.sicap_group || null}
    )
    RETURNING *
  `
  return result.rows[0]
}

export async function getCourse(id: number) {
  const result = await sql`SELECT * FROM courses WHERE id = ${id}`
  return result.rows[0] || null
}

export async function deleteCourse(id: number) {
  await sql`DELETE FROM courses WHERE id = ${id}`
}

export async function getTaskChecks(courseId: number): Promise<Record<string, boolean>> {
  const result = await sql`
    SELECT task_id, checked FROM task_checks WHERE course_id = ${courseId}
  `
  const map: Record<string, boolean> = {}
  result.rows.forEach((row) => {
    map[row.task_id] = row.checked
  })
  return map
}

export async function setTaskCheck(courseId: number, taskId: string, checked: boolean) {
  await sql`
    INSERT INTO task_checks (course_id, task_id, checked)
    VALUES (${courseId}, ${taskId}, ${checked})
    ON CONFLICT (course_id, task_id)
    DO UPDATE SET checked = ${checked}, updated_at = NOW()
  `
}
