export interface Task {
  id: string
  text: string
  note?: string
  asap?: boolean
  key?: boolean
}

export interface Stage {
  id: string
  label: string
  tasks: Task[]
}

export const STAGES: Stage[] = [
  {
    id: 'plan',
    label: '1. Course planning',
    tasks: [
      { id: 'p1', text: 'Set course start and end dates', note: 'Confirm at least 4 weeks in advance' },
      { id: 'p2', text: 'Set session schedule (days, times, number of sessions)' },
      { id: 'p3', text: 'Define learning outcomes and content outline', note: 'Needed for SICAP reporting' },
      { id: 'p4', text: 'Identify SICAP target group and eligibility criteria', key: true },
      { id: 'p5', text: 'Get manager approval / add to SICAP programme plan', asap: true },
    ],
  },
  {
    id: 'tutor',
    label: '2. Tutor & contract',
    tasks: [
      { id: 't1', text: 'Confirm tutor availability for all sessions' },
      { id: 't2', text: 'Agree hourly rate and total hours' },
      { id: 't3', text: 'Send contract for signature', asap: true },
      { id: 't4', text: 'Receive signed contract back', note: 'File in course folder' },
      { id: 't5', text: 'Check Garda vetting is current', note: 'Must be done before first session', asap: true },
      { id: 't6', text: 'Confirm tutor has relevant qualifications / insurance' },
    ],
  },
  {
    id: 'venue',
    label: '3. Venue booking',
    tasks: [
      { id: 'v1', text: 'Book venue for all session dates', asap: true },
      { id: 'v2', text: 'Confirm room capacity and accessibility' },
      { id: 'v3', text: 'Get written confirmation of booking', note: 'Email or letter — keep on file' },
      { id: 'v4', text: 'Confirm cost and payment process with venue' },
      { id: 'v5', text: 'Check equipment available (projector, Wi-Fi, whiteboard)' },
    ],
  },
  {
    id: 'reg',
    label: '4. Participant registration',
    tasks: [
      { id: 'r1', text: 'Promote the course (social media, community notice, word of mouth)' },
      { id: 'r2', text: 'Open registration — collect names, contact details, DOB' },
      { id: 'r3', text: 'Get GDPR data consent signed by each participant', note: 'Required before recording any personal data', key: true },
      { id: 'r4', text: 'Record SICAP target group for each participant', note: 'Required for reporting', key: true },
      { id: 'r5', text: 'Confirm final participant list (min/max numbers)' },
      { id: 'r6', text: 'Send joining instructions to participants' },
    ],
  },
  {
    id: 'delivery',
    label: '5. Course delivery',
    tasks: [
      { id: 'd1', text: 'Take attendance at every session (P / A / L / E)', note: 'Keep attendance sheet on file' },
      { id: 'd2', text: 'Note any participants who drop out — record reason' },
      { id: 'd3', text: 'Collect participant feedback mid-course if needed' },
      { id: 'd4', text: 'Confirm certification / QQI requirements with tutor' },
    ],
  },
  {
    id: 'pay',
    label: '6. Payments & invoices',
    tasks: [
      { id: 'f1', text: 'Receive tutor invoice on agreed schedule' },
      { id: 'f2', text: 'Submit tutor payment for approval', note: 'Check against signed contract rate', key: true },
      { id: 'f3', text: 'Pay venue hire invoice', note: 'Keep receipt on file' },
      { id: 'f4', text: 'Record all expenditure in SICAP budget tracker' },
      { id: 'f5', text: 'Keep copies of all invoices and receipts', note: 'Required for audit' },
    ],
  },
  {
    id: 'close',
    label: '7. Completion & reporting',
    tasks: [
      { id: 'c1', text: 'Calculate % attendance per participant' },
      { id: 'c2', text: 'Record how many participants completed (70%+ attendance)', note: 'Standard SICAP completion threshold', key: true },
      { id: 'c3', text: 'Record certifications / awards achieved' },
      { id: 'c4', text: 'Collect end-of-course feedback from participants' },
      { id: 'c5', text: 'Update SICAP progress report with course outcomes', asap: true },
      { id: 'c6', text: 'File all paperwork (contracts, consents, attendance, invoices)', note: 'Keep for minimum 7 years for audit' },
      { id: 'c7', text: 'Note any improvements for next time' },
    ],
  },
]

export const TOTAL_TASKS = STAGES.reduce((sum, s) => sum + s.tasks.length, 0)
