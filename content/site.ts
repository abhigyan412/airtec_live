// Home, /why-airtec and FAQ copy. Every line traces to plan §5 and §7; the
// guardrail in plan §8 (no WhatsApp/SMS, no live GPS, no PDF timetable export,
// no certifications, no AI claims until merged, no testimonials) applies here.

export const POSITIONING = {
  headlineLead: 'One system for the entire school, from admissions to alumni.',
  headlineRest: 'Built for how Indian schools actually work, with ',
  headlineAccent: 'every rule configurable',
  headlineTail: ' instead of hardcoded.',
  sub: 'Admissions, fees, timetable, exams, library, transport, HR and a family portal, connected so a change in one place shows up everywhere it should.',
}

/**
 * Free-trial offer: one module of the school's choice, free for a short
 * period. The length is deliberately not stated on the site; it is agreed on
 * the setup call.
 */
export const TRIAL = {
  badge: 'Free trial',
  banner: 'Pick any one module and try it free. No payment details needed.',
  headline: 'Pick one module. Try it free.',
  lead: 'Choose the module your school needs most and use it free for a short trial, set up on your own school. No payment details needed.',
  steps: [
    { title: 'Pick your module', body: 'Fees, Timetable, Exams or any other. One module, your choice.' },
    { title: 'We set it up with you', body: 'We call within one working day and set it up on your school.' },
    { title: 'Use it free', body: 'Run it with your own staff and data for a short trial period.' },
  ],
  points: ['Any one module', 'Set up on your own school', 'No payment details needed'],
}

export const REPLACES = [
  'Paper registers',
  'Excel timetables',
  'Fee receipt books',
  'WhatsApp groups',
  'Separate biometric software',
]

/** Every entry is a real scheduled job in backend/src/index.ts (plan §5.5). */
export const DAY_TIMELINE: { time: string; text: string; area: string }[] = [
  { time: '00:05', text: 'Starts any exam scheduled for today', area: 'Exams' },
  { time: '06:45', text: 'Syncs approved staff leave into today’s absences and proposes absences from biometric attendance (Mon–Sat)', area: 'Timetable' },
  { time: '07:00', text: 'Sends fee reminders to families with dues, RTE seats excluded', area: 'Fees' },
  { time: '07:00–15:00', text: 'Every 15 minutes, watches for teachers who haven’t checked in before their period starts', area: 'Timetable' },
  { time: '06:00–16:00', text: 'Every 5 minutes, reminds substitutes who haven’t acknowledged a cover, then escalates', area: 'Timetable' },
  { time: '07:30 Mon', text: 'Flags teachers over their workload limit', area: 'Timetable' },
  { time: '08:00', text: 'HR alerts: probation ending, documents expiring, work anniversaries', area: 'HR' },
  { time: '08:00 & 11:00', text: 'Alerts the manager to periods still without cover', area: 'Timetable' },
  { time: '08:15', text: 'Flags staff with long unexplained absence (absconding check)', area: 'HR' },
  { time: '08:30', text: 'Transport compliance: vehicle and driver documents near expiry', area: 'Transport' },
  { time: '08:45', text: 'Library: due-soon reminders, overdue marking, fine updates', area: 'Library' },
  { time: 'Hourly', text: 'Releases unpaid admission seat holds, re-offers expired waitlist offers, expires abandoned online payments', area: 'Admissions' },
  { time: 'Every minute', text: 'Delivers queued notifications to phones and browsers', area: 'Notifications' },
  { time: '1st of month', text: 'Credits leave accrual', area: 'HR' },
  { time: '1 January', text: 'Runs leave year-end carry-forward', area: 'HR' },
]

export type RoleTab = { id: string; label: string; title: string; bullets: string[] }

export const ROLE_TABS: RoleTab[] = [
  {
    id: 'principal',
    label: 'Principal',
    title: 'Visibility without chasing anyone',
    bullets: [
      'Staff attendance, low-attendance students and syllabus progress across classes on one dashboard',
      'Uncovered periods flagged at 08:00 and 11:00, with ranked substitutes already suggested',
      'Override authority where the rules give it: document gaps, fee-hold extensions, seat freezes, always with a recorded reason',
    ],
  },
  {
    id: 'admin',
    label: 'Admin',
    title: 'The front office, without the paperwork',
    bullets: [
      'Enquiries, applications and approvals in one pipeline, with a seat ledger that can’t be oversold',
      'TCs, ID cards, admit cards and custom certificates generated and numbered',
      'Bulk add, bulk edit and year-end promotion, class by class',
    ],
  },
  {
    id: 'accountant',
    label: 'Accountant',
    title: 'Balances you can trust',
    bullets: [
      'Counter collection by cash, cheque, UPI, card or bank transfer, with numbered receipts and a day book',
      'An aging report, defaulters, late fees and arrears carried forward',
      'RTE reimbursement claims generated at the state rate',
    ],
  },
  {
    id: 'teacher',
    label: 'Teacher',
    title: 'Less admin between periods',
    bullets: [
      '“My Week” timetable, cover duties and free-period booking',
      'Homework assigned, submitted online and graded with feedback',
      'Own attendance, leave and payslips in My Space',
    ],
  },
  {
    id: 'parent',
    label: 'Parent',
    title: 'Everything about their child, on their phone',
    bullets: [
      'Attendance, homework, results, timetable and transport status',
      'Fees paid online, confirmed by the gateway, with the receipt in the portal',
      'Push notifications to the app and browser, with mute controls',
    ],
  },
]

export type Faq = { q: string; a: string }

export const FAQS: Faq[] = [
  {
    q: 'Is there a free trial?',
    a: 'Yes. Pick any one module and use it free for a short trial, set up on your own school. No payment details are needed. We confirm the trial period with you on the setup call.',
  },
  {
    q: 'How is AIRTEC priced?',
    a: 'Pricing depends on your school’s size and the modules you use. Tell us a little about your school and we’ll share a quote on the call.',
  },
  {
    q: 'Can we move from Excel or our old ERP?',
    a: 'Yes. Timetables, syllabus, vehicles, drivers, stops and fee slabs import from Excel, because that’s where most schools’ data is today. The timetable import copes with messy real-world sheets and previews before committing.',
  },
  {
    q: 'How long does onboarding take?',
    a: 'Every rule ships with a safe default, so nothing breaks before anyone configures it. You can start with the modules you need most and switch on the rest as you go. We’ll plan the timeline with you on the demo call.',
  },
  {
    q: 'Is there a mobile app?',
    a: 'Parents and students use the family portal on their phone, with push notifications to the mobile app (Android and iOS) and to browsers. Staff use AIRTEC in the browser on any device.',
  },
  {
    q: 'Who owns our data?',
    a: 'Your school does. Each school’s data is scoped on the server, so staff see only what their role allows, a teacher sees only their own classes, and a parent sees only their own child.',
  },
  {
    q: 'Does it work with our biometric device?',
    a: 'AIRTEC syncs staff attendance from your biometric device, with device-to-staff mapping. A teacher who hasn’t checked in becomes a proposed absence, and their periods become cover requests. Tell us which device you use and we’ll confirm it’s supported.',
  },
  {
    q: 'Which boards are supported?',
    a: 'CBSE and ICSE presets are built in, plus a generic preset for State boards and others. A preset is only a starting point: every result rule can be changed per class and subject.',
  },
]

export type WhyItem = {
  id: string
  title: string
  problem: string
  how: string[]
  proof?: string
}

/** Plan §7, minus §7.6 (AI) which is gated on the Policy Assistant landing on `main`. */
export const WHY_ITEMS: WhyItem[] = [
  {
    id: 'rules',
    title: 'Every rule is a setting, not code',
    problem: 'Schools bend their process to fit the software, or pay for custom changes.',
    how: [
      'Result rules and fee concessions',
      'Admission hold days, waitlist response time and document checklists',
      'Homework late and resubmission policy',
      'Library borrowing policies',
      'Teacher workload limits',
      'Transport workflows',
      'Each with a safe default, so nothing breaks before anyone configures it',
    ],
    proof: 'In the demo: apply the CBSE preset, change one subject’s pass mark, and watch the report card change.',
  },
  {
    id: 'runs',
    title: 'It runs while you’re not looking',
    problem: 'Reminders, alerts and sweeps rely on someone remembering.',
    how: [
      '17 scheduled jobs across fees, admissions, timetable cover, HR, transport, library, exams and notification delivery',
      'Each has a manual “run now” fallback for administrators',
    ],
  },
  {
    id: 'india',
    title: 'Built for Indian schools',
    problem: 'Global products treat India as a currency setting.',
    how: [
      'Indian time end to end and the April–March financial year',
      'RTE: fee exclusion, reimbursement claims, textbook distribution, fine waivers',
      'CBSE and ICSE presets; INR with Razorpay and UPI',
      'Students without their own login supported everywhere',
      'Excel import for timetables, syllabus, vehicles, drivers, stops and fee slabs',
    ],
  },
  {
    id: 'connected',
    title: 'One connected system',
    problem: 'Separate tools for library, transport and fees mean dues and records that don’t talk to each other.',
    how: [
      'Library fines are billed into fees',
      'Unreturned books and unpaid fees block a TC',
      'Biometric check-ins create cover requests',
      'Attendance drives exam eligibility',
      'Homework feeds early warning',
      'Admission approval creates the student record',
      'Seat release triggers waitlist offers',
    ],
  },
  {
    id: 'parents',
    title: 'Parents included, on their phones',
    problem: 'Parent apps are often a separate product with a separate bill.',
    how: ['The family portal and push notifications to the mobile app and browser come with the system'],
  },
  {
    id: 'numbers',
    title: 'Trustworthy numbers',
    problem: 'Fee balances that drift and seat counts that lie.',
    how: [
      'Fee balances maintained by the database, with overpayment refused',
      'A stored seat ledger for every class',
      'Approvals with a recorded actor and reason for overrides, extensions and waivers',
      'Publicly verifiable certificates',
    ],
  },
  {
    id: 'a11y',
    title: 'Accessible by design',
    problem: 'School software is rarely built for every user’s eyes.',
    how: [
      'Status colours measured to WCAG AA contrast in light and dark',
      'Form fields with visible edges',
      'Reduced-motion respected throughout, including on this site',
    ],
  },
]

/** Generic comparison rows; competitors are never named (plan §7). */
export const COMPARISON: { area: string; typical: string; airtec: string }[] = [
  { area: 'Result rules', typical: 'One fixed formula', airtec: 'Configurable per class and subject, with board presets' },
  { area: 'Seat counts', typical: 'Counted on the fly', airtec: 'A stored ledger: confirmed, reserved, frozen, available' },
  { area: 'Fee balances', typical: 'Can drift under simultaneous payments', airtec: 'Maintained by the database; overpayment refused' },
  { area: 'Timetable', typical: 'Rebuild before it’s useful', airtec: 'Import your Excel sheet and run on it tomorrow' },
  { area: 'Morning cover', typical: 'Phone calls at 7 AM', airtec: 'Absences built at 06:45, ranked substitutes, auto-chasing' },
  { area: 'Library and transport', typical: 'Separate tools, separate dues', airtec: 'Fines on the fee ledger; books block a TC' },
  { area: 'Parent app', typical: 'Separate product, separate bill', airtec: 'Family portal and push included' },
]
