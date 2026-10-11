import {
  AlertOctagon,
  AlertTriangle,
  ArrowRightLeft,
  ArrowUpCircle,
  Award,
  BadgeCheck,
  BadgePercent,
  BarChart3,
  BellRing,
  BookCopy,
  BookMarked,
  BookOpenCheck,
  BookmarkCheck,
  Briefcase,
  Bus,
  Calculator,
  CalendarCheck,
  CalendarClock,
  CalendarDays,
  CalendarOff,
  CalendarRange,
  CheckSquare,
  ClipboardCheck,
  ClipboardList,
  Clock,
  Coins,
  Copy,
  CopyX,
  CreditCard,
  Download,
  FileBarChart,
  FileCheck,
  FileClock,
  FilePen,
  FileSignature,
  FileSpreadsheet,
  FileText,
  Fingerprint,
  FolderOpen,
  Gauge,
  GitBranch,
  GraduationCap,
  HeartHandshake,
  History,
  Hourglass,
  Inbox,
  IndianRupee,
  Layers,
  LayoutGrid,
  Library,
  Link2,
  ListChecks,
  Lock,
  LogOut,
  Mail,
  MapPin,
  Megaphone,
  MessageCircleWarning,
  MessageSquareText,
  Navigation,
  Network,
  Newspaper,
  PenLine,
  PlayCircle,
  QrCode,
  RefreshCw,
  Scale,
  ScanLine,
  ScrollText,
  Search,
  Settings2,
  ShieldAlert,
  ShieldCheck,
  ShoppingCart,
  Siren,
  Smartphone,
  Sparkles,
  Ticket,
  Undo2,
  UserCheck,
  UserCog,
  UserPlus,
  UserX,
  Users,
  type LucideIcon,
} from 'lucide-react'

// The one source for the module grid, the mega-menu, every /modules/[slug]
// page and the contact form's module chips. Copy *and* visual data live here
// (module-features-plan.md §6), so changing a demo number never means touching
// a component. Capabilities are bounded by plan.md §6/§8, which wins on any
// disagreement. `source` is never rendered: it names the code that proves the
// claims, so the copy can be re-checked before launch.

export type ModuleGroup = 'Front office' | 'Academics' | 'Operations' | 'Everyone'

export type Tone = 'primary' | 'success' | 'warning' | 'destructive' | 'muted'
type Pill = { label: string; tone: Tone }

/**
 * The 14 micro-visual types (module-features-plan.md §4.5). Each draws at most
 * three data items; `lintModuleCopy` enforces that at build time. A few types
 * carry an optional extra (a disabled action, a caption, a layout) where the
 * plan's per-feature spec needs it. `month` is the calendar form of `grid`.
 */
export type Visual =
  | { type: 'pills'; items: Pill[]; caption?: string; tabs?: boolean; action?: string }
  | { type: 'bar'; label: string; segments: { label: string; value: number; tone: Tone }[]; action?: string }
  | {
      type: 'rows'
      caption?: string
      header?: string[]
      rows: { name: string; meta?: string; values?: string[]; pill?: Pill; struck?: boolean; dim?: boolean }[]
      link?: string
    }
  | { type: 'flow'; steps: { label: string; tone?: Tone }[]; layout?: 'line' | 'merge' | 'split'; note?: Pill }
  | { type: 'stat'; value: string; caption: string; pills?: Pill[] }
  | { type: 'settings'; rows: { label: string; value: string | boolean }[] }
  | {
      type: 'grid'
      cols: string[]
      rows: string[]
      /** Keyed `${rowIndex}-${colIndex}`. */
      cells: Record<string, { label: string; tone?: Tone }>
      highlight?: string
      note?: string
    }
  | { type: 'month'; marks: Record<number, Tone>; today?: number; caption?: string }
  | {
      type: 'phone'
      title: string
      body?: string
      time?: string
      steps?: { label: string; done: boolean }[]
      dots?: Tone[]
      action?: string
    }
  | { type: 'doc'; heading: string; number?: string; sub?: string; stack?: number; kind?: 'letter' | 'card' | 'id'; tag?: string }
  | { type: 'chart'; points: number[]; labels?: string[]; lastLabel: string; highlight?: number }
  | { type: 'scan'; kind: 'barcode' | 'qr'; result: Pill }
  | { type: 'compare'; before: string; after: string; note?: string; duplicate?: boolean }
  | { type: 'clock'; time: string; from?: string; label: string; tone?: Tone; pill?: Pill; actions?: string[] }
  | { type: 'form'; field: string; value: string; result?: string; tag?: string }

export type Feature = {
  icon: LucideIcon
  title: string
  /** One benefit line: at most 90 characters and no semicolons (checked at build). */
  line: string
  chip?: Pill
  /** Required: every feature has a picture (§2.3). */
  visual: Visual
  /** Hidden until verified on `main` (plan.md §8). */
  gated?: boolean
}

/** Key into the hero mock-up map on the module page. */
export type HeroMockup =
  | 'result-rules'
  | 'seat-ledger'
  | 'promotion'
  | 'fee-balance'
  | 'cover'
  | 'low-attendance'
  | 'homework-completion'
  | 'library-scan'
  | 'boarding-roster'
  | 'biometric-chain'
  | 'verify'
  | 'notifications'

/** Key into the spotlight mock-up map on the module page. */
export type SpotlightMockup =
  | 'report-card'
  | 'board-preset'
  | 'qr-apply'
  | 'waitlist'
  | 'bulk-edit'
  | 'student-profile'
  | 'aging-bars'
  | 'online-payment'
  | 'generate'
  | 'excel-import'
  | 'mark-class'
  | 'school-attendance'
  | 'syllabus-progress'
  | 'submit-home'
  | 'fine-to-fees'
  | 'stock-check'
  | 'route-stops'
  | 'compliance'
  | 'payroll-run'
  | 'hiring-kanban'
  | 'template-editor'
  | 'print-sheet'
  | 'portal-home'
  | 'mute-settings'

export type Spotlight = {
  /** The group the feature belongs to, shown as the eyebrow (§4.3). */
  eyebrow: string
  title: string
  line: string
  bullets: [string, string, string]
  mockup: SpotlightMockup
}

export type Module = {
  slug: string
  name: string
  /** One line for the grid card and the mega-menu. */
  short: string
  group: ModuleGroup
  icon: LucideIcon
  headline: string
  lead: string
  /** Three outcome chips under the headline: results, not features. */
  outcomes: [string, string, string]
  hero: { title: string; problem: string; solution: string; mockup: HeroMockup }
  spotlights: [Spotlight, Spotlight]
  /** Feature cards. Spotlight features are not repeated here. */
  groups: { label: string; features: Feature[] }[]
  detailList?: { title: string; items: string[] }
  related: string[]
  source: string
}

export const MODULE_GROUPS: ModuleGroup[] = ['Front office', 'Academics', 'Operations', 'Everyone']

const auto: Pill = { label: 'Auto', tone: 'success' }
const bulk: Pill = { label: 'Bulk', tone: 'primary' }
const excel: Pill = { label: 'Excel', tone: 'primary' }
const rte: Pill = { label: 'RTE', tone: 'primary' }
const parent: Pill = { label: 'Parent-facing', tone: 'primary' }
const daily: Pill = { label: 'Daily', tone: 'primary' }
const ok = (label: string): Pill => ({ label, tone: 'success' })

export const MODULES: Module[] = [
  {
    slug: 'admissions',
    name: 'Admissions',
    short: 'Enquiry to admitted student, with a seat ledger that cannot be oversold.',
    group: 'Front office',
    icon: ClipboardList,
    headline: 'From first enquiry to admitted student, with no seat sold twice.',
    lead: 'Track every enquiry, let parents apply online, and let seats manage themselves.',
    outcomes: ['No overbooked classes', 'Parents apply by QR', 'Seats free themselves'],
    hero: {
      title: 'A seat ledger that can’t be oversold',
      problem: 'Two offices admit “the last seat” on the same day.',
      solution: 'Every class shows Confirmed, Reserved, Frozen and Available live, and every action updates it.',
      mockup: 'seat-ledger',
    },
    spotlights: [
      {
        eyebrow: 'Bring families in',
        title: 'Apply by scanning a QR',
        line: 'Print one poster, and parents apply from their phone with no login.',
        bullets: ['One printable poster per school', 'No parent login needed', 'Documents uploaded from the phone'],
        mockup: 'qr-apply',
      },
      {
        eyebrow: 'Seats that manage themselves',
        title: 'Waitlist moves up on its own',
        line: 'A freed seat is offered to the next family in rank, with a reply deadline.',
        bullets: ['Ranked waitlist', 'Offer goes out the moment a seat frees', 'Reply deadline, then the next family'],
        mockup: 'waitlist',
      },
    ],
    groups: [
      {
        label: 'Bring families in',
        features: [
          {
            icon: Inbox,
            title: 'Every enquiry tracked',
            line: 'Source, counsellor and follow-ups in one place, so no lead goes cold.',
            visual: {
              type: 'rows',
              rows: [
                { name: 'Mehta family', meta: 'Walk-in', pill: { label: 'Follow-up today', tone: 'warning' } },
                { name: 'Khan family', meta: 'QR', pill: { label: 'Visited', tone: 'primary' } },
                { name: 'Rao family', meta: 'Referral', pill: ok('Applied') },
              ],
            },
          },
          {
            icon: Search,
            title: 'Parents check their own status',
            line: 'Fewer “what’s happening with my application?” calls to the office.',
            chip: parent,
            visual: {
              type: 'phone',
              title: 'Aditi · Class 1',
              steps: [
                { label: 'Applied', done: true },
                { label: 'Test', done: true },
                { label: 'Decision', done: false },
              ],
            },
          },
          {
            icon: CalendarCheck,
            title: 'Parents book their own test slot',
            line: 'Families pick an entrance test or interview time themselves.',
            chip: parent,
            visual: {
              type: 'grid',
              cols: ['Fri', 'Sat'],
              rows: ['09:00', '10:00', '11:00'],
              cells: {
                '0-0': { label: 'Open' },
                '1-0': { label: 'Full', tone: 'muted' },
                '2-0': { label: 'Open' },
                '0-1': { label: 'Open' },
                '1-1': { label: 'Booked', tone: 'primary' },
                '2-1': { label: 'Open' },
              },
              highlight: '1-1',
            },
          },
          {
            icon: BarChart3,
            title: 'Know which source works',
            line: 'See which channels bring enquiries that actually convert.',
            visual: { type: 'chart', points: [18, 42, 30, 12], labels: ['Walk-in', 'QR', 'Referral', 'Web'], highlight: 1, lastLabel: '42% convert' },
          },
        ],
      },
      {
        label: 'Decide and admit',
        features: [
          {
            icon: FileCheck,
            title: 'No admission with missing papers',
            line: 'Final approval waits until the class’s required documents are verified.',
            visual: {
              type: 'pills',
              items: [ok('Birth certificate ✓'), ok('TC ✓'), { label: 'Photo · Missing', tone: 'destructive' }],
              action: 'Approve',
            },
          },
          {
            icon: GitBranch,
            title: 'Step-by-step approval',
            line: 'Counsellor, admin and principal each sign off, and every step is recorded.',
            visual: {
              type: 'flow',
              steps: [
                { label: 'Counsellor ✓', tone: 'success' },
                { label: 'Admin ✓', tone: 'success' },
                { label: 'Principal …', tone: 'muted' },
              ],
            },
          },
          {
            icon: UserPlus,
            title: 'Student record created for you',
            line: 'Approval creates the student and places them in a section, with no retyping.',
            chip: auto,
            visual: { type: 'flow', steps: [{ label: 'Approved' }, { label: 'Student created · 1-B', tone: 'success' }] },
          },
          {
            icon: FileSignature,
            title: 'Numbered offer letters',
            line: 'Printable offer letters, issued only to admitted students.',
            visual: { type: 'doc', heading: 'Offer of admission', number: 'OL/2027/0031', kind: 'letter' },
          },
        ],
      },
      {
        label: 'Seats that manage themselves',
        features: [
          {
            icon: Hourglass,
            title: 'Unpaid seats free themselves',
            line: 'A seat held without fee payment is released after 7 days (you set the number).',
            chip: auto,
            visual: {
              type: 'clock',
              from: '1 day left',
              time: '0 days left',
              label: 'Seat hold · Riya M.',
              tone: 'warning',
              pill: ok('Released · Available +1'),
            },
          },
          {
            icon: Lock,
            title: 'Lock a full class',
            line: 'Close one class while admission stays open for the rest.',
            visual: {
              type: 'pills',
              items: [ok('Class 1 · Open'), { label: 'Class 2 · Locked', tone: 'warning' }, ok('Class 3 · Open')],
            },
          },
          {
            icon: Sparkles,
            title: 'Ask your policy a question',
            line: '“What if the fee hold were 5 days?” Answered from your own data.',
            chip: { label: 'AI', tone: 'primary' },
            visual: { type: 'form', field: 'Ask', value: 'What if the fee hold were 5 days?', result: 'About 9 more seats freed per cycle' },
            // §5.2: hidden until policyCopilot.ts is merged (plan.md §8).
            gated: true,
          },
        ],
      },
    ],
    related: ['students', 'fees', 'certificates'],
    source:
      'backend/src/modules/admission/plan.md, remaining-work-plan.md, modules/public/routes.ts, shared/utils/admissionSeatLedger.ts',
  },
  {
    slug: 'students',
    name: 'Students',
    short: 'Every student record in one place, from admission to TC.',
    group: 'Front office',
    icon: Users,
    headline: 'Every student record, one place, from admission to TC.',
    lead: 'One profile per child that every other module reads from.',
    outcomes: ['One record per child', 'Bulk edit like Excel', 'Promote a class in one go'],
    hero: {
      title: 'Year-end promotion in minutes',
      problem: 'Promoting every class at year end takes the office days.',
      solution: 'Promote a whole class at once, and students with pending dues or books are flagged, not lost.',
      mockup: 'promotion',
    },
    spotlights: [
      {
        eyebrow: 'Records',
        title: 'Edit many students at once',
        line: 'Change sections, houses or details in a grid, like a spreadsheet.',
        bullets: ['Spreadsheet-style grid', 'Change section or house for many at once', 'Saved together'],
        mockup: 'bulk-edit',
      },
      {
        eyebrow: 'Records',
        title: 'Complete student profile',
        line: 'Guardians, house, photo and documents for each child, in one place.',
        bullets: ['Guardians, house, photo and documents', 'Fees, attendance and results linked', 'Printable profile'],
        mockup: 'student-profile',
      },
    ],
    groups: [
      {
        label: 'Features',
        features: [
          {
            icon: UserPlus,
            title: 'Add one or add many',
            line: 'A single admission form or a bulk import for a new session.',
            chip: bulk,
            visual: { type: 'form', field: 'Import', value: 'students-2027.xlsx', result: '212 rows ready' },
          },
          {
            icon: ArrowUpCircle,
            title: 'Promote whole classes',
            line: 'Move everyone up, with a history of who moved where.',
            chip: bulk,
            visual: {
              type: 'flow',
              steps: [{ label: '5-A (38)' }, { label: '6-A (36)', tone: 'success' }],
              note: { label: '2 held', tone: 'warning' },
            },
          },
          {
            icon: ScrollText,
            title: 'TC without the chase',
            line: 'Fee and library clearance checked before a TC is issued.',
            visual: { type: 'pills', items: [ok('Fees cleared ✓'), ok('Library cleared ✓'), { label: 'TC ready', tone: 'primary' }] },
          },
          {
            icon: CreditCard,
            title: 'ID cards for the whole school',
            line: 'Print ID cards class by class.',
            chip: bulk,
            visual: { type: 'doc', heading: 'Meera Joshi', sub: '6-A · Roll 21', kind: 'id', stack: 2 },
          },
          {
            icon: MessageCircleWarning,
            title: 'Complaints tracked to closure',
            line: 'Each complaint has an owner, status and comment thread.',
            visual: {
              type: 'rows',
              rows: [
                { name: 'Bus late', meta: 'Transport', pill: { label: 'Open', tone: 'warning' } },
                { name: 'Water cooler', meta: 'Admin', pill: ok('Resolved') },
              ],
            },
          },
          {
            icon: FolderOpen,
            title: 'Resource centre',
            line: 'Share files with staff and classes from one place.',
            visual: {
              type: 'rows',
              rows: [
                { name: 'Science fair rules', meta: 'PDF', pill: { label: '6-A', tone: 'muted' } },
                { name: 'Lesson plan', meta: 'DOCX', pill: { label: 'Staff', tone: 'muted' } },
                { name: 'Solar system', meta: 'PPT', pill: { label: '5-B', tone: 'muted' } },
              ],
            },
          },
        ],
      },
    ],
    related: ['admissions', 'certificates', 'library'],
    source: 'modules/sis/routes.ts, documents/routes.ts, library/lib/gates.ts',
  },
  {
    slug: 'fees',
    name: 'Fees',
    short: 'Collection, concessions, RTE and recovery, with balances you can trust.',
    group: 'Front office',
    icon: IndianRupee,
    headline: 'Collect faster, chase less, and trust every balance.',
    lead: 'From fee structure to receipt to reminder, with the numbers kept right by the system itself.',
    outcomes: ['Online & counter payments', 'Reminders at 7 AM', 'RTE handled'],
    hero: {
      title: 'Balances you never have to double-check',
      problem: 'Two cashiers, one invoice, and the totals no longer add up.',
      solution: 'The database keeps every balance correct and refuses an overpayment, from any screen.',
      mockup: 'fee-balance',
    },
    spotlights: [
      {
        eyebrow: 'Recover',
        title: 'See how old each due is',
        line: 'Aging report shows 0–30, 31–60, 61–90 and 90+ days at a glance.',
        bullets: ['0–30, 31–60, 61–90, 90+ days', 'Click a bucket to see the families', 'RTE students never listed'],
        mockup: 'aging-bars',
      },
      {
        eyebrow: 'Collect',
        title: 'Parents pay online',
        line: 'Pay from the parent portal through Razorpay, confirmed by the gateway itself.',
        bullets: ['From the parent portal', 'UPI, cards and net banking via Razorpay', 'Confirmed by the gateway, not the browser'],
        mockup: 'online-payment',
      },
    ],
    groups: [
      {
        label: 'Set up',
        features: [
          {
            icon: Layers,
            title: 'Fee structures per class',
            line: 'Define heads and amounts once, then assign them to every student.',
            visual: {
              type: 'rows',
              caption: 'Class 7',
              rows: [
                { name: 'Tuition', values: ['₹12,000'] },
                { name: 'Lab', values: ['₹1,500'] },
                { name: 'Activity', values: ['₹2,000'] },
              ],
            },
          },
          {
            icon: BadgePercent,
            title: 'Concessions that really apply',
            line: 'Sibling, staff-ward and scholarship discounts reduce the actual bill.',
            visual: { type: 'compare', before: '₹15,500', after: '₹13,950', note: 'Sibling −10%' },
          },
          {
            icon: CheckSquare,
            title: 'Discounts need approval',
            line: 'Every waiver or discount request is approved and recorded.',
            visual: {
              type: 'flow',
              steps: [{ label: 'Request −₹2,000' }, { label: 'Principal ✓', tone: 'success' }, { label: 'Applied', tone: 'success' }],
            },
          },
        ],
      },
      {
        label: 'Collect',
        features: [
          {
            icon: IndianRupee,
            title: 'Counter collection',
            line: 'Cash, cheque, UPI, card or bank transfer, with a numbered receipt.',
            visual: { type: 'doc', heading: 'Fee receipt', number: 'R-2026-1183', sub: '₹4,500 · Cash', kind: 'letter' },
          },
          {
            icon: BookOpenCheck,
            title: 'Day book by category',
            line: 'Today’s collection, split the way your accounts team reports it.',
            visual: {
              type: 'stat',
              value: '₹3,42,600',
              caption: 'Collected today',
              pills: [
                { label: 'Cash 41%', tone: 'muted' },
                { label: 'UPI 48%', tone: 'muted' },
                { label: 'Cheque 11%', tone: 'muted' },
              ],
            },
          },
          {
            icon: CalendarRange,
            title: 'Right financial year, always',
            line: 'A payment on 31 March evening lands in the right year.',
            visual: { type: 'clock', time: '31 Mar · 8:40 PM', label: 'Payment recorded', pill: ok('FY 2025–26 ✓') },
          },
        ],
      },
      {
        label: 'Recover',
        features: [
          {
            icon: BellRing,
            title: 'Reminders go out by themselves',
            line: 'Families with dues get a phone notification every morning.',
            chip: { label: 'Daily 07:00', tone: 'primary' },
            visual: { type: 'phone', title: 'Fee due', body: '₹6,200 by 10 Oct', time: '07:00' },
          },
          {
            icon: Users,
            title: 'Defaulter list that’s actually right',
            line: 'RTE students are never wrongly listed as defaulters.',
            chip: rte,
            visual: {
              type: 'rows',
              rows: [
                { name: 'Arjun K.', values: ['₹8,200'], pill: { label: '90+ days', tone: 'destructive' } },
                { name: 'Sara P.', values: ['₹3,100'], pill: { label: '31–60', tone: 'warning' } },
                { name: 'Ravi · RTE', meta: 'not owed', struck: true },
              ],
            },
          },
          {
            icon: ArrowRightLeft,
            title: 'Arrears carry forward',
            line: 'Last year’s dues move into this year, ready to collect or waive.',
            visual: { type: 'flow', steps: [{ label: '2025–26 · ₹3,200 due' }, { label: '2026–27 arrears', tone: 'primary' }] },
          },
          {
            icon: FileSpreadsheet,
            title: 'RTE claims generated',
            line: 'Reimbursement claims at the state rate, without a separate spreadsheet.',
            chip: rte,
            visual: { type: 'doc', heading: 'RTE reimbursement claim', sub: '24 students × ₹1,850', number: '₹44,400', kind: 'letter' },
          },
        ],
      },
    ],
    related: ['family-portal', 'library', 'admissions'],
    source: 'modules/fee/*, fee/lib/providers.ts, root plan.md, docs/fee-module-*.md',
  },
  {
    slug: 'certificates',
    name: 'Certificates & Documents',
    short: 'Every certificate printable, numbered and publicly verifiable.',
    group: 'Front office',
    icon: Award,
    headline: 'Every certificate printable, numbered and verifiable.',
    lead: 'The documents your office prints every day, generated from records already in the system.',
    outcomes: ['Numbered', 'Verifiable online', 'Bulk print'],
    hero: {
      title: 'A TC anyone can verify',
      problem: 'Receiving schools can’t tell a real TC from a forged one.',
      solution: 'Every TC and certificate has a number that anyone can check online.',
      mockup: 'verify',
    },
    spotlights: [
      {
        eyebrow: 'What the office prints',
        title: 'Custom certificates',
        line: 'Bonafide, character or sports certificates from your own templates.',
        bullets: ['Bonafide, character, sports and more', 'Your own templates', 'Every issue recorded'],
        mockup: 'template-editor',
      },
      {
        eyebrow: 'What the office prints',
        title: 'Whole-class printing',
        line: 'ID cards and admit cards for a whole class or the whole school, in one print.',
        bullets: ['ID cards for the whole school', 'Admit cards per exam', 'One print job'],
        mockup: 'print-sheet',
      },
    ],
    groups: [
      {
        label: 'What the office prints',
        features: [
          {
            icon: ScrollText,
            title: 'Transfer certificates',
            line: 'Issued after fee and library clearance, with a unique number.',
            visual: { type: 'doc', heading: 'Transfer certificate', number: 'TC/2026/0142', kind: 'letter' },
          },
          {
            icon: ListChecks,
            title: 'Issued register',
            line: 'Every certificate issued is on record.',
            visual: {
              type: 'rows',
              rows: [
                { name: 'Bonafide', meta: 'Meera', values: ['3 Oct'] },
                { name: 'Character', meta: 'Kabir', values: ['1 Oct'] },
              ],
            },
          },
          {
            icon: Mail,
            title: 'Letters for staff',
            line: 'Offer letters, payslips and relieving letters, printable.',
            visual: { type: 'doc', heading: 'Relieving letter', kind: 'letter', stack: 3 },
          },
        ],
      },
    ],
    detailList: {
      title: 'Documents AIRTEC prints',
      items: [
        'Transfer certificate',
        'Student ID card',
        'Admit card',
        'Report card',
        'Admission offer letter',
        'Staff offer letter',
        'Payslip',
        'Relieving letter',
        'Student profile',
        'Custom certificates',
      ],
    },
    related: ['students', 'exams', 'hr-payroll'],
    source: 'modules/documents/routes.ts',
  },
  {
    slug: 'timetable',
    name: 'Timetable',
    short: 'Import or generate the timetable, and automate the morning cover scramble.',
    group: 'Academics',
    icon: CalendarClock,
    headline: 'Run today’s timetable from day one. Cover absences before the first bell.',
    lead: 'Import the timetable you already have, and AIRTEC handles the daily cover.',
    outcomes: ['Import your Excel', 'Cover sorted by 7 AM', 'Conflict-free drafts'],
    hero: {
      title: 'The morning substitute scramble, done',
      problem: 'At 7 AM someone works out who’s absent and who’s free, on paper.',
      solution: 'Absences come in from leave and biometric check-ins, and each empty period gets ranked substitutes.',
      mockup: 'cover',
    },
    spotlights: [
      {
        eyebrow: 'Build',
        title: 'Generate a timetable',
        line: 'A full draft in seconds that respects every teacher’s limits.',
        bullets: ['A draft in seconds', 'Respects teacher limits and double periods', 'Never overwrites the live timetable'],
        mockup: 'generate',
      },
      {
        eyebrow: 'Set up fast',
        title: 'Import your existing timetable',
        line: 'Upload your Excel sheet and run the school on it tomorrow.',
        bullets: ['Your current Excel sheet', 'Preview before saving', 'Setup filled in from the sheet'],
        mockup: 'excel-import',
      },
    ],
    groups: [
      {
        label: 'Set up fast',
        features: [
          {
            icon: Settings2,
            title: 'Rules for every teacher',
            line: 'Max periods a day, blocked slots and subjects, set once.',
            visual: {
              type: 'settings',
              rows: [
                { label: 'Max per day', value: '6' },
                { label: 'Max in a row', value: '3' },
                { label: 'Blocked', value: 'Sat P-VIII' },
              ],
            },
          },
          {
            icon: Download,
            title: 'Export back to Excel',
            line: 'Download in the same format, so the file goes back in cleanly.',
            chip: excel,
            visual: { type: 'flow', steps: [{ label: 'AIRTEC' }, { label: 'timetable.xlsx', tone: 'success' }, { label: 'AIRTEC', tone: 'primary' }] },
          },
        ],
      },
      {
        label: 'Build',
        features: [
          {
            icon: AlertTriangle,
            title: 'Clashes caught as you edit',
            line: 'Double-booked teachers or rooms are flagged, with a swap suggested.',
            visual: {
              type: 'grid',
              cols: ['Wed', 'Thu'],
              rows: ['P-4', 'P-5'],
              cells: {
                '0-0': { label: 'Mr. Das ×2', tone: 'destructive' },
                '0-1': { label: 'Maths' },
                '1-0': { label: 'Eng' },
                '1-1': { label: 'Free', tone: 'success' },
              },
              highlight: '0-0',
              note: 'Swap with Thu P-5 ✓',
            },
          },
          {
            icon: History,
            title: 'Publish, or roll back',
            line: 'Drafts never overwrite the live timetable, and old versions can be restored.',
            visual: {
              type: 'rows',
              rows: [
                { name: 'v4', pill: ok('Live') },
                { name: 'v3', meta: '2 Sep' },
                { name: 'v2', meta: '14 Jul' },
              ],
              link: 'Restore',
            },
          },
        ],
      },
      {
        label: 'Every day',
        features: [
          {
            icon: UserX,
            title: 'Absences found for you',
            line: 'Approved leave and missed check-ins become absences by 6:45 AM.',
            chip: auto,
            visual: {
              type: 'flow',
              layout: 'merge',
              steps: [{ label: 'Leave approved' }, { label: 'No check-in' }, { label: '2 absences today', tone: 'warning' }],
            },
          },
          {
            icon: UserCheck,
            title: 'Best substitute first',
            line: 'Only teachers who are truly free and under their limit are suggested.',
            visual: {
              type: 'rows',
              rows: [
                { name: 'Ms. Rao', pill: ok('Free ✓') },
                { name: 'Mr. Khan', pill: ok('Free ✓') },
                { name: 'Ms. Iyer', pill: { label: 'At limit', tone: 'muted' }, dim: true },
              ],
            },
          },
          {
            icon: BellRing,
            title: 'Cover chased automatically',
            line: 'A substitute who doesn’t confirm is reminded, then the manager is alerted.',
            chip: auto,
            visual: {
              type: 'flow',
              steps: [{ label: 'Assigned 07:10' }, { label: 'Reminder 07:25' }, { label: 'Escalated 07:40', tone: 'warning' }],
            },
          },
          {
            icon: Scale,
            title: 'Fair cover duty',
            line: 'See who has covered how often this month, so it isn’t always the same people.',
            visual: { type: 'chart', points: [4, 5, 4, 3, 5, 4], lastLabel: 'This month' },
          },
          {
            icon: Gauge,
            title: 'Spot overloaded teachers',
            line: 'Weekly workload check, with a one-click reassign to a free colleague.',
            chip: { label: 'Weekly', tone: 'primary' },
            visual: { type: 'bar', label: 'Mr. Sen', segments: [{ label: '34 / 30 periods', value: 100, tone: 'destructive' }], action: 'Reassign' },
          },
        ],
      },
      {
        label: 'Views',
        features: [
          {
            icon: LayoutGrid,
            title: 'Every view you need',
            line: 'Class, teacher, whole-school grid and “who’s free now”.',
            visual: {
              type: 'pills',
              tabs: true,
              items: [
                { label: 'Class', tone: 'muted' },
                { label: 'Teacher', tone: 'muted' },
                { label: 'Free now', tone: 'primary' },
              ],
              caption: 'Ms. Rao · Mr. Khan · Ms. Gill',
            },
          },
          {
            icon: CalendarDays,
            title: 'Teachers see their own week',
            line: 'My Week shows each teacher’s periods and cover duties.',
            visual: {
              type: 'grid',
              cols: ['Mon', 'Tue', 'Wed'],
              rows: ['P-1', 'P-2'],
              cells: {
                '0-0': { label: '7-A' },
                '0-1': { label: '8-B' },
                '0-2': { label: '7-A' },
                '1-0': { label: '—', tone: 'muted' },
                '1-1': { label: 'Cover', tone: 'primary' },
                '1-2': { label: '9-C' },
              },
              highlight: '1-1',
            },
          },
        ],
      },
    ],
    related: ['hr-payroll', 'attendance', 'exams'],
    source: 'timetable-progress.md (phases 0–5), modules/timetable/{engine,import,services}, timetable/routes.ts',
  },
  {
    slug: 'exams',
    name: 'Exams & Results',
    short: 'Your school’s result rules, configurable per class and subject.',
    group: 'Academics',
    icon: GraduationCap,
    headline: 'Your school’s result rules, not a vendor’s guess.',
    lead: 'Set your own pass, grade and promotion rules once, and every report card follows them.',
    outcomes: ['Report cards in minutes', 'CBSE / ICSE presets', 'No Excel formulas'],
    hero: {
      title: 'Rules you control, at every level',
      problem: 'Every school’s rules differ, even between classes and subjects.',
      solution: 'Set rules per school, class, exam, subject or student, and results compute themselves.',
      mockup: 'result-rules',
    },
    spotlights: [
      {
        eyebrow: 'During and after the exam',
        title: 'Report cards ready to print',
        line: 'Term-wise or full-year report cards, generated straight from the marks.',
        bullets: ['Term-wise or full-year', 'Remarks filled in by score band', 'Whole class in one go'],
        mockup: 'report-card',
      },
      {
        eyebrow: 'Setting up',
        title: 'Start from your board',
        line: 'Apply a CBSE, ICSE or generic preset in one click, then change anything.',
        bullets: ['CBSE, ICSE or generic preset', 'Applied in one click', 'Change any rule afterwards'],
        mockup: 'board-preset',
      },
    ],
    groups: [
      {
        label: 'Before the exam',
        features: [
          {
            icon: CalendarDays,
            title: 'Exam calendar in one place',
            line: 'Structure, datesheets and time slots for the whole year, set up once.',
            chip: { label: 'Yearly', tone: 'primary' },
            visual: {
              type: 'grid',
              cols: ['Mon 14', 'Wed 16', 'Fri 18'],
              rows: ['10-A', '10-B'],
              cells: {
                '0-0': { label: 'Maths' },
                '0-1': { label: 'Sci' },
                '0-2': { label: 'Eng' },
                '1-0': { label: 'Sci' },
                '1-1': { label: 'Maths', tone: 'primary' },
                '1-2': { label: 'Eng' },
              },
              highlight: '1-1',
            },
          },
          {
            icon: Megaphone,
            title: 'Announce to every family',
            line: 'Publish the exam and families see the datesheet in their portal.',
            chip: parent,
            visual: { type: 'phone', title: 'Half-yearly exams', body: 'Datesheet published', time: '09:30' },
          },
          {
            icon: Ticket,
            title: 'Admit cards in one click',
            line: 'Print the whole class’s admit cards together, not one by one.',
            chip: bulk,
            visual: { type: 'doc', heading: 'Admit card', number: 'Roll 14 · 10-A', kind: 'card', stack: 3 },
          },
          {
            icon: PlayCircle,
            title: 'Exams start themselves',
            line: 'Exams open for marks on their date, so nobody has to remember.',
            chip: auto,
            visual: { type: 'clock', time: '00:05', label: 'Half-yearly', pill: ok('Started') },
          },
        ],
      },
      {
        label: 'During and after the exam',
        features: [
          {
            icon: PenLine,
            title: 'Fast marks entry',
            line: 'Teachers enter theory and practical marks per class, in one grid.',
            visual: {
              type: 'rows',
              header: ['Theory', 'Practical'],
              rows: [
                { name: 'Kabir', values: ['62', '18'] },
                { name: 'Sana', values: ['71', '19'] },
                { name: 'Dev', values: ['55', '17'] },
              ],
            },
          },
          {
            icon: Calculator,
            title: 'Results compute themselves',
            line: 'Totals, grades and pass/fail follow your rules, with no formula errors.',
            chip: auto,
            visual: { type: 'flow', steps: [{ label: 'Marks 78/100' }, { label: 'Rule: A2 ≥ 71' }, { label: 'Grade A2', tone: 'success' }] },
          },
          {
            icon: MessageSquareText,
            title: 'Remarks written for you',
            line: 'Automatic remarks by score band, editable before printing.',
            chip: auto,
            visual: { type: 'form', field: 'Remark', value: 'Shows steady improvement', tag: 'Auto' },
          },
          {
            icon: ShieldCheck,
            title: 'Nothing goes out unchecked',
            line: 'Results go through approval before any parent can see them.',
            visual: {
              type: 'flow',
              steps: [{ label: 'Class teacher ✓', tone: 'success' }, { label: 'Principal ✓', tone: 'success' }, { label: 'Published', tone: 'primary' }],
            },
          },
        ],
      },
      {
        label: 'Setting up',
        features: [
          {
            icon: Copy,
            title: 'Set once, apply to many classes',
            line: 'Term templates copy the same scheme across classes in one step.',
            chip: bulk,
            visual: { type: 'pills', caption: 'Term 1 + Term 2 (40/60)', items: [ok('6-A ✓'), ok('6-B ✓'), ok('7-A ✓')] },
          },
        ],
      },
    ],
    detailList: {
      title: 'Every rule you can set',
      items: [
        'Grade scales',
        'Pass marks per subject',
        'Theory / practical split',
        'Best-of-N subjects',
        'Compartment',
        'Grace marks',
        'Attendance eligibility',
        'No-detention up to a class',
        'Subject groups',
        'Additional-subject substitution',
        'Weighted composite terms',
        'Remarks by band',
      ],
    },
    related: ['attendance', 'homework-syllabus', 'certificates'],
    source: 'backend/src/modules/exam/plan.md, exam/*.routes.ts',
  },
  {
    slug: 'attendance',
    name: 'Attendance',
    short: 'Mark in seconds; the same numbers drive eligibility and early warning.',
    group: 'Academics',
    icon: ClipboardCheck,
    headline: 'Mark in seconds, spot the pattern before it’s a problem.',
    lead: 'Daily attendance that feeds results, alerts and the principal’s view.',
    outcomes: ['Class-wise marking', 'Low-attendance alerts', 'Parents see it too'],
    hero: {
      title: 'Low attendance spotted early',
      problem: 'A child’s falling attendance is noticed at exam time, too late.',
      solution: 'The principal sees students below threshold, and the same data decides exam eligibility.',
      mockup: 'low-attendance',
    },
    spotlights: [
      {
        eyebrow: 'Every day',
        title: 'Mark a class in seconds',
        line: 'Everyone is present by default, so you tap only the absentees.',
        bullets: ['Everyone present by default', 'Tap only the absentees', 'Saved in one click'],
        mockup: 'mark-class',
      },
      {
        eyebrow: 'Every day',
        title: 'Today’s whole-school picture',
        line: 'Attendance across all classes on one screen.',
        bullets: ['Every class on one screen', 'Classes not yet marked stand out', 'Drill into any class'],
        mockup: 'school-attendance',
      },
    ],
    groups: [
      {
        label: 'Features',
        features: [
          {
            icon: FileBarChart,
            title: 'Reports by student or class',
            line: 'Monthly and term reports, ready to print.',
            visual: { type: 'chart', points: [91, 93, 89, 94, 92, 95], labels: ['Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep'], lastLabel: '95%' },
          },
          {
            icon: GraduationCap,
            title: 'Linked to exam eligibility',
            line: 'Your attendance rule applies to results automatically.',
            chip: auto,
            visual: { type: 'flow', steps: [{ label: 'Attendance 68%' }, { label: 'Rule: min 75%' }, { label: 'Not eligible', tone: 'warning' }] },
          },
          {
            icon: Smartphone,
            title: 'Parents see it daily',
            line: 'Attendance shows in the family portal without a phone call.',
            chip: parent,
            visual: { type: 'phone', title: 'Present 21 / 22', body: 'October', dots: ['success', 'success', 'destructive', 'success', 'success'] },
          },
        ],
      },
    ],
    related: ['exams', 'homework-syllabus', 'hr-payroll'],
    source: 'modules/sis/routes.ts, modules/principal/routes.ts',
  },
  {
    slug: 'homework-syllabus',
    name: 'Homework & Syllabus',
    short: 'Assigned, submitted, graded, and tied to where the syllabus actually is.',
    group: 'Academics',
    icon: BookOpenCheck,
    headline: 'Assigned, submitted, graded, and tied to the syllabus.',
    lead: 'Homework and teaching progress in one place, visible to teachers, parents and the principal.',
    outcomes: ['Online submission', 'Who hasn’t submitted, live', 'Syllabus on track'],
    hero: {
      title: 'Know who hasn’t submitted, right now',
      problem: 'Teachers count notebooks to find out who did the homework.',
      solution: 'A live completion view per assignment, with one-tap reminders to everyone who’s missing.',
      mockup: 'homework-completion',
    },
    spotlights: [
      {
        eyebrow: 'Syllabus',
        title: 'Teaching progress logged',
        line: 'Teachers log what they covered, so the principal sees who’s behind.',
        bullets: ['Teachers log what they covered', 'Planned vs actual by chapter', 'The principal sees who’s behind'],
        mockup: 'syllabus-progress',
      },
      {
        eyebrow: 'Homework',
        title: 'Submit from home',
        line: 'Students or parents submit online through the portal.',
        bullets: ['Students or parents upload from the phone', 'Late submissions marked automatically', 'Feedback comes back to the same place'],
        mockup: 'submit-home',
      },
    ],
    groups: [
      {
        label: 'Homework',
        features: [
          {
            icon: ClipboardList,
            title: 'Assign with attachments',
            line: 'Post work with files to a class or section in a minute.',
            visual: { type: 'form', field: 'Fractions practice · 6-B', value: 'sheet.pdf', result: 'Posted' },
          },
          {
            icon: PenLine,
            title: 'Grade with feedback',
            line: 'Marks plus a written comment that the family can read.',
            visual: {
              type: 'rows',
              rows: [
                { name: 'Aditi', meta: '“Great”', values: ['9/10'] },
                { name: 'Rohan', meta: '“Revise Q3”', values: ['6/10'] },
              ],
            },
          },
          {
            icon: Clock,
            title: 'Your late-work policy',
            line: 'Allow or block late submissions and resubmissions, school-wide.',
            visual: {
              type: 'settings',
              rows: [
                { label: 'Allow late submission', value: true },
                { label: 'Allow resubmission', value: false },
              ],
            },
          },
          {
            icon: BellRing,
            title: 'Remind the missing ones',
            line: 'Nudge everyone who hasn’t submitted, in one tap.',
            chip: bulk,
            visual: { type: 'stat', value: '7', caption: 'families reminded', pills: [ok('Sent')] },
          },
        ],
      },
      {
        label: 'Syllabus',
        features: [
          {
            icon: BookMarked,
            title: 'Syllabus set up in minutes',
            line: 'Import from Excel, type it in or upload, per class and subject.',
            chip: excel,
            visual: { type: 'form', field: 'Import', value: 'syllabus-class8.xlsx', result: '14 chapters added' },
          },
          {
            icon: CalendarClock,
            title: 'Chapter due dates',
            line: 'Know when each chapter should be finished.',
            visual: { type: 'month', marks: { 6: 'primary', 15: 'primary', 24: 'warning' }, today: 12, caption: 'October' },
          },
          {
            icon: Link2,
            title: 'Linked to exams',
            line: 'See whether the chapters in next week’s exam have actually been taught.',
            visual: {
              type: 'pills',
              caption: 'Unit Test 2',
              items: [ok('Ch 5 taught ✓'), ok('Ch 6 taught ✓'), { label: 'Ch 7 not yet', tone: 'warning' }],
            },
          },
          {
            icon: Siren,
            title: 'Early warning',
            line: 'Missed homework helps flag students who are starting to struggle.',
            visual: { type: 'rows', rows: [{ name: 'Dev', meta: '7-B', pill: { label: '4 missed this month', tone: 'warning' } }] },
          },
        ],
      },
    ],
    related: ['exams', 'attendance', 'family-portal'],
    source: 'backend/src/modules/academics/plan.md',
  },
  {
    slug: 'library',
    name: 'Library',
    short: 'Scan-and-go circulation, connected to fees, TCs and exams.',
    group: 'Academics',
    icon: Library,
    headline: 'A full library system, connected to fees and TCs.',
    lead: 'Fast circulation at the desk, and fines and dues that the rest of the school can see.',
    outcomes: ['One scan issue / return', 'Fines into fees', 'Stock check by scan'],
    hero: {
      title: 'One scan. The system knows the rest.',
      problem: 'A whole class reaches the desk in one period, and mode-switching causes mistakes.',
      solution: 'Scan a book and AIRTEC knows whether it’s going out or coming back.',
      mockup: 'library-scan',
    },
    spotlights: [
      {
        eyebrow: 'Fines and dues',
        title: 'Fines on the fee bill',
        line: 'Families see library fines with their fees, in one balance.',
        bullets: ['Overdue fines added daily', 'Shown on the family’s fee balance', 'RTE fines waived automatically'],
        mockup: 'fine-to-fees',
      },
      {
        eyebrow: 'Collection',
        title: 'Stock check by scanning',
        line: 'Scan every shelf, and anything not scanned is marked missing.',
        bullets: ['Snapshot every copy', 'Scan shelves back in', 'Unscanned copies marked missing'],
        mockup: 'stock-check',
      },
    ],
    groups: [
      {
        label: 'At the desk',
        features: [
          {
            icon: ScanLine,
            title: 'Scan-and-go circulation',
            line: 'One scan issues or returns, with no mode switching.',
            visual: { type: 'scan', kind: 'barcode', result: { label: 'Issued · due 25 Oct', tone: 'primary' } },
          },
          {
            icon: BookmarkCheck,
            title: 'Reservations held for the right reader',
            line: 'A returned book goes to the next person waiting.',
            chip: auto,
            visual: { type: 'flow', steps: [{ label: 'Returned' }, { label: 'Held for Aarav', tone: 'warning' }] },
          },
          {
            icon: Users,
            title: 'Every student can borrow',
            line: 'Students without a portal login are still full members.',
            visual: {
              type: 'rows',
              rows: [
                { name: 'Meera', meta: 'no login', pill: ok('Member ✓') },
                { name: 'Kabir', meta: 'no login', pill: ok('Member ✓') },
              ],
            },
          },
          {
            icon: CalendarDays,
            title: 'Library period ready',
            line: 'Today’s scheduled library classes are shown at the desk.',
            visual: {
              type: 'rows',
              caption: 'Today',
              rows: [
                { name: 'P-II', meta: '6-A' },
                { name: 'P-V', meta: '7-C' },
              ],
            },
          },
        ],
      },
      {
        label: 'Fines and dues',
        features: [
          {
            icon: Coins,
            title: 'Fines calculated daily',
            line: 'Overdue fines add up automatically, never charged twice.',
            chip: auto,
            visual: { type: 'stat', value: '₹30', caption: '6 days × ₹5' },
          },
          {
            icon: HeartHandshake,
            title: 'RTE fine waiver',
            line: 'RTE students’ fines are waived automatically.',
            chip: rte,
            visual: { type: 'compare', before: '₹45', after: '₹0', note: 'RTE waiver' },
          },
          {
            icon: ShieldAlert,
            title: 'No TC with a book out',
            line: 'Unreturned books block a TC and staff exit, just like unpaid fees.',
            visual: { type: 'pills', items: [ok('Fees ✓'), { label: 'Library · 1 book out', tone: 'destructive' }], action: 'Issue TC' },
          },
          {
            icon: Undo2,
            title: 'Recall before exams',
            line: 'Shorten all due dates and notify borrowers in one action.',
            chip: bulk,
            visual: {
              type: 'flow',
              steps: [{ label: 'Recall 214 books' }, { label: 'Due by 28 Oct' }, { label: 'Borrowers notified', tone: 'success' }],
            },
          },
        ],
      },
      {
        label: 'Collection',
        features: [
          {
            icon: ShoppingCart,
            title: 'Book requests with approval',
            line: 'Librarian and principal approve, and receiving adds the copy.',
            visual: {
              type: 'flow',
              steps: [{ label: 'Librarian ✓', tone: 'success' }, { label: 'Principal ✓', tone: 'success' }, { label: 'In catalogue', tone: 'primary' }],
            },
          },
          {
            icon: Newspaper,
            title: 'Periodicals tracked',
            line: 'Subscriptions and expected issues in one list.',
            visual: {
              type: 'rows',
              rows: [
                { name: 'Science Reporter', meta: 'Oct', pill: ok('Received ✓') },
                { name: 'Tinkle', meta: 'Oct', pill: { label: 'Expected', tone: 'muted' } },
              ],
            },
          },
          {
            icon: BookCopy,
            title: 'Textbook distribution records',
            line: 'RTE and scheme textbook hand-outs, with an exportable audit trail.',
            chip: rte,
            visual: { type: 'doc', heading: 'Distribution register', sub: 'Class 3 · 42 sets given', tag: 'Export CSV', kind: 'letter' },
          },
        ],
      },
    ],
    related: ['fees', 'students', 'exams'],
    source: 'commits c67a9d5a, ac429977 and earlier Library phases; modules/library/*',
  },
  {
    slug: 'transport',
    name: 'Transport',
    short: 'Fleet, routes, boarding rosters and compliance alerts.',
    group: 'Operations',
    icon: Bus,
    headline: 'Know which child is on which bus.',
    lead: 'Fleet, routes, boarding and compliance in one place, with parents kept informed.',
    outcomes: ['Boarding roster', 'Document expiry alerts', 'Parents see their bus'],
    hero: {
      title: 'Every boarding recorded',
      problem: 'When a parent calls, nobody can say for sure whether their child got on.',
      solution: 'The attendant marks boarding on the trip, and parents see their child’s trip status.',
      mockup: 'boarding-roster',
    },
    spotlights: [
      {
        eyebrow: 'Routes',
        title: 'Routes and stops',
        line: 'Build routes stop by stop, or import stops from Excel.',
        bullets: ['Build routes stop by stop', 'Import stops from Excel', 'Every child linked to a stop'],
        mockup: 'route-stops',
      },
      {
        eyebrow: 'Fleet',
        title: 'Expiry alerts before it’s late',
        line: 'Fitness, insurance, permit and licence expiries flagged daily.',
        bullets: ['Fitness, insurance, permit and licence', 'Checked every morning', 'Vehicles and drivers both covered'],
        mockup: 'compliance',
      },
    ],
    groups: [
      {
        label: 'Fleet',
        features: [
          {
            icon: Bus,
            title: 'Vehicles and drivers on file',
            line: 'Import your fleet from Excel, with documents and service history.',
            chip: excel,
            visual: {
              type: 'rows',
              rows: [
                { name: 'Bus 07', meta: '42 seats', pill: { label: 'Service due Nov', tone: 'warning' } },
                { name: 'Bus 02', meta: '32 seats', pill: ok('OK') },
              ],
            },
          },
          {
            icon: UserCog,
            title: 'Driver absent? Substitute assigned',
            line: 'Record a driver absence and assign a cover driver.',
            visual: { type: 'flow', steps: [{ label: 'Suresh absent', tone: 'warning' }, { label: 'Ramesh covers Route 4', tone: 'success' }] },
          },
        ],
      },
      {
        label: 'Routes',
        features: [
          {
            icon: MapPin,
            title: 'Students assigned to stops',
            line: 'Every child linked to a route and stop.',
            visual: {
              type: 'rows',
              rows: [
                { name: 'Ishaan', meta: 'Route 4', values: ['Sector 9'] },
                { name: 'Ananya', meta: 'Route 4', values: ['Park Gate'] },
              ],
            },
          },
          {
            icon: IndianRupee,
            title: 'Transport fee slabs',
            line: 'Distance-based fees, set up once.',
            visual: {
              type: 'rows',
              rows: [
                { name: '0–5 km', values: ['₹1,200'] },
                { name: '5–10 km', values: ['₹1,800'] },
                { name: '10+ km', values: ['₹2,400'] },
              ],
            },
          },
        ],
      },
      {
        label: 'Every trip',
        features: [
          {
            icon: ClipboardCheck,
            title: 'Boarding roster',
            line: 'Mark who got on, trip by trip.',
            visual: { type: 'stat', value: '38 / 40', caption: 'boarded · Route 4 AM', pills: [{ label: '2 absent', tone: 'warning' }] },
          },
          {
            // Never "live GPS": text only, no map, no moving dot (plan.md §8).
            icon: Navigation,
            title: 'Trip location updates',
            line: 'The latest location of each trip, for staff and parents.',
            visual: { type: 'clock', time: '07:18', label: 'Last update · near Park Gate' },
          },
          {
            icon: Siren,
            title: 'Incidents logged and resolved',
            line: 'Breakdowns or issues recorded, followed up and closed.',
            visual: { type: 'rows', rows: [{ name: 'Flat tyre', meta: 'Route 2', pill: ok('Resolved') }] },
          },
          {
            icon: Smartphone,
            title: 'Parents see only their child',
            line: 'Route, today’s trip and status, never other families’ data.',
            chip: parent,
            visual: { type: 'phone', title: 'Ishaan boarded', body: '07:12 · Route 4', time: '07:12' },
          },
        ],
      },
    ],
    related: ['family-portal', 'fees', 'hr-payroll'],
    source: 'modules/transport/*.routes.ts',
  },
  {
    slug: 'hr-payroll',
    name: 'HR & Payroll',
    short: 'Job post to payslip to relieving letter, with biometric sync.',
    group: 'Operations',
    icon: Briefcase,
    headline: 'Every staff member, from job post to payslip.',
    lead: 'Hiring, attendance, leave, payroll and exits in one record per person.',
    outcomes: ['Biometric sync', 'Payslips with approval', 'Staff self-service'],
    hero: {
      title: 'A missed check-in becomes a covered period',
      problem: 'Biometric data sits in one system and the timetable in another.',
      solution: 'No check-in by the first period means a proposed absence, and the teacher’s classes go to the cover queue.',
      mockup: 'biometric-chain',
    },
    spotlights: [
      {
        eyebrow: 'Pay',
        title: 'Payroll with approval',
        line: 'Generate payslips, approve them, then export the bank file.',
        bullets: ['Generate the month’s payslips', 'Approve before anything is paid', 'Export the bank file'],
        mockup: 'payroll-run',
      },
      {
        eyebrow: 'Hire',
        title: 'Hiring pipeline with QR apply',
        line: 'Applied, offer sent and joined, all tracked.',
        bullets: ['Public careers page and QR poster', 'CVs uploaded from the phone', 'Applied → Offer → Joined'],
        mockup: 'hiring-kanban',
      },
    ],
    groups: [
      {
        label: 'Hire',
        features: [
          {
            icon: QrCode,
            title: 'Candidates apply by QR',
            line: 'Candidates upload a CV from their phone on a public careers page.',
            chip: { label: 'Public', tone: 'primary' },
            visual: { type: 'scan', kind: 'qr', result: ok('Application received') },
          },
          {
            icon: UserPlus,
            title: 'Add staff in one pass',
            line: 'Account, employment and bank details on one page.',
            visual: { type: 'pills', tabs: true, items: [ok('Account ✓'), ok('Employment ✓'), ok('Bank ✓')] },
          },
        ],
      },
      {
        label: 'Every day',
        features: [
          {
            icon: Fingerprint,
            title: 'Biometric attendance sync',
            line: 'Staff attendance pulled from your device, with no double entry.',
            visual: { type: 'flow', steps: [{ label: 'Device' }, { label: 'AIRTEC · 61 / 64 in', tone: 'success' }] },
          },
          {
            icon: Clock,
            title: 'Shifts and duty log',
            line: 'Shifts are set once, and extra duties are logged and approved.',
            visual: {
              type: 'rows',
              rows: [
                { name: 'Exam invigilation', meta: '2 hrs', pill: ok('Approved') },
                { name: 'Sports day', meta: '4 hrs', pill: { label: 'Pending', tone: 'warning' } },
              ],
            },
          },
          {
            icon: CalendarOff,
            title: 'Leave with approvals',
            line: 'Requests, approvals and balances, with comp-off included.',
            visual: {
              type: 'rows',
              rows: [
                { name: 'Casual leave', values: ['6 left'] },
                { name: 'Earned leave', values: ['12 left'] },
                { name: 'Comp-off', values: ['1'], pill: { label: 'Pending', tone: 'warning' } },
              ],
            },
          },
          {
            icon: RefreshCw,
            title: 'Leave credited automatically',
            line: 'Monthly accrual and year-end carry-forward run themselves.',
            chip: auto,
            visual: { type: 'clock', time: '1 Nov', label: '+1.5 EL credited', tone: 'success' },
          },
          {
            icon: AlertOctagon,
            title: 'Unexplained absence flagged',
            line: 'Long absences without leave are flagged to HR.',
            chip: daily,
            visual: { type: 'pills', items: [{ label: 'Mr. Lal · 5 days · No leave', tone: 'destructive' }] },
          },
        ],
      },
      {
        label: 'Pay',
        features: [
          {
            icon: FilePen,
            title: 'Corrections and arrears',
            line: 'Pay changes go through a decision step, never silent edits.',
            visual: { type: 'flow', steps: [{ label: 'Correction +₹1,200' }, { label: 'Approved', tone: 'success' }] },
          },
          {
            icon: FileText,
            title: 'Self-service payslips',
            line: 'Staff download their own payslips anytime.',
            visual: { type: 'doc', heading: 'Payslip · Oct 2026', sub: 'Net ₹42,300', tag: 'Download', kind: 'letter' },
          },
        ],
      },
      {
        label: 'Career and exit',
        features: [
          {
            icon: BadgeCheck,
            title: 'Probation reminders',
            line: 'Confirm or extend before probation ends.',
            chip: daily,
            visual: { type: 'clock', time: '10 days', label: 'Ms. Gill · probation ends', tone: 'warning', actions: ['Confirm', 'Extend'] },
          },
          {
            icon: FileClock,
            title: 'Document expiry alerts',
            line: 'Staff documents flagged before they expire.',
            chip: daily,
            visual: { type: 'pills', items: [{ label: 'Police verification · 20 days', tone: 'warning' }] },
          },
          {
            icon: Network,
            title: 'Org chart',
            line: 'Who reports to whom, generated from staff records.',
            visual: { type: 'flow', layout: 'split', steps: [{ label: 'Principal', tone: 'primary' }, { label: 'Coordinators (3)' }, { label: 'Teachers (58)' }] },
          },
          {
            icon: LogOut,
            title: 'Clean exits',
            line: 'Checklist, settlement (blocked by unreturned books) and relieving letter.',
            visual: { type: 'pills', items: [ok('Assets returned ✓'), ok('Library ✓'), ok('Settlement ✓')], caption: 'Relieving letter ready' },
          },
        ],
      },
    ],
    related: ['timetable', 'certificates', 'attendance'],
    source: 'modules/hrms/routes.ts, commits d66bccd4, 73a69944',
  },
  {
    slug: 'family-portal',
    name: 'Family Portal & Notifications',
    short: 'Parents see what you see, on their phone, with push notifications.',
    group: 'Everyone',
    icon: Smartphone,
    headline: 'Parents see what you see, on their phone.',
    lead: 'One portal for attendance, fees, homework, results and the bus, with notifications that actually arrive.',
    outcomes: ['Phone app + browser', 'Pay fees online', 'Parents mute what they want'],
    hero: {
      title: 'One message, every device',
      problem: 'Notices get lost in WhatsApp groups.',
      solution: 'Each notification reaches the parent’s phone app and browser, and opens the right page inside the app.',
      mockup: 'notifications',
    },
    spotlights: [
      {
        eyebrow: 'For parents and students',
        title: 'The parent’s home screen',
        line: 'Everything about their child on one screen, on any phone.',
        bullets: ['Attendance, fees, homework, results, timetable and bus', 'One login per family', 'Works on any phone'],
        mockup: 'portal-home',
      },
      {
        eyebrow: 'Notifications',
        title: 'Parents choose what to mute',
        line: 'Everything is on by default, and families switch off what they don’t want.',
        bullets: ['Everything on by default', 'Mute any type', 'New alerts reach families with no setup'],
        mockup: 'mute-settings',
      },
    ],
    groups: [
      {
        label: 'For parents and students',
        features: [
          {
            icon: CalendarCheck,
            title: 'Attendance',
            line: 'See daily attendance without calling the school.',
            visual: { type: 'month', marks: { 2: 'success', 3: 'success', 6: 'success', 7: 'destructive', 8: 'success', 9: 'success' }, caption: 'October' },
          },
          {
            icon: IndianRupee,
            title: 'Fees and online payment',
            line: 'See dues and pay from the phone.',
            chip: { label: 'Razorpay', tone: 'primary' },
            visual: { type: 'phone', title: '₹6,200 due', body: 'Term 2 · by 10 Oct', action: 'Pay' },
          },
          {
            icon: ClipboardList,
            title: 'Homework',
            line: 'See assignments, submit work and read the teacher’s feedback.',
            visual: {
              type: 'rows',
              rows: [
                { name: 'Maths', pill: { label: 'Due tomorrow', tone: 'warning' } },
                { name: 'Science', pill: ok('Graded 18/20') },
              ],
            },
          },
          {
            icon: GraduationCap,
            title: 'Exams and results',
            line: 'Datesheets and published results in one place.',
            visual: { type: 'doc', heading: 'Report card · Term 1', number: '87%', kind: 'card' },
          },
          {
            icon: CalendarDays,
            title: 'Timetable',
            line: 'The child’s weekly timetable, always current.',
            visual: {
              type: 'grid',
              cols: ['Mon', 'Tue', 'Wed'],
              rows: ['P-1', 'P-2'],
              cells: {
                '0-0': { label: 'Eng' },
                '0-1': { label: 'Maths', tone: 'primary' },
                '0-2': { label: 'Hindi' },
                '1-0': { label: 'EVS' },
                '1-1': { label: 'Art', tone: 'primary' },
                '1-2': { label: 'Maths' },
              },
              highlight: '0-1',
              note: 'Today · Tue',
            },
          },
          {
            icon: Bus,
            title: 'Bus status',
            line: 'Their child’s route and today’s trip.',
            visual: { type: 'stat', value: '07:12', caption: 'Boarded this morning', pills: [{ label: 'Route 4', tone: 'primary' }] },
          },
        ],
      },
      {
        // No WhatsApp, SMS or email in copy or visuals (plan.md §8).
        label: 'Notifications',
        features: [
          {
            icon: BellRing,
            title: 'Push to phone and browser',
            line: 'Reaches the mobile app and the browser from one send.',
            visual: { type: 'flow', layout: 'split', steps: [{ label: '1 notice', tone: 'primary' }, { label: 'App' }, { label: 'Browser' }] },
          },
          {
            icon: CopyX,
            title: 'No duplicate alerts',
            line: 'The same event never notifies the same person twice in a day.',
            visual: { type: 'compare', before: 'Fee due · ₹6,200', after: 'Fee due · ₹6,200', duplicate: true },
          },
        ],
      },
    ],
    related: ['fees', 'homework-syllabus', 'transport'],
    source: 'frontend-portal/app/(portal), modules/notifications/routes.ts, design.md, CLAUDE.md “Push has two transports”',
  },
]

export function getModule(slug: string) {
  return MODULES.find((m) => m.slug === slug)
}

export function modulesByGroup() {
  return MODULE_GROUPS.map((group) => ({ group, modules: MODULES.filter((m) => m.group === group) }))
}

/** A module's groups with gated features removed and empty groups dropped. */
export function publishedGroups(m: Module) {
  return m.groups
    .map((g) => ({ ...g, features: g.features.filter((f) => !f.gated) }))
    .filter((g) => g.features.length > 0)
}

/** How many data items a visual draws (§4.5: at most three). */
export function visualItems(v: Visual): number {
  switch (v.type) {
    case 'pills':
      return v.items.length
    case 'bar':
      return v.segments.length
    case 'rows':
      return v.rows.length
    case 'flow':
      return v.steps.length
    case 'stat':
      return v.pills?.length ?? 0
    case 'settings':
      return v.rows.length
    case 'phone':
      return v.steps?.length ?? 1
    default:
      return 1
  }
}

/**
 * Copy and visual lint (module-features-plan.md §6). Run from
 * generateStaticParams, so a violation fails `next build` instead of reaching
 * the page.
 */
export function lintModuleCopy() {
  const errors: string[] = []
  const lineRules = (where: string, line: string) => {
    if (line.length > 90) errors.push(`${where}: line is ${line.length} chars (max 90)`)
    if (line.includes(';')) errors.push(`${where}: contains a semicolon`)
  }
  for (const m of MODULES) {
    if (m.spotlights.length !== 2) errors.push(`${m.slug}: needs exactly 2 spotlights`)
    for (const s of m.spotlights) lineRules(`${m.slug} › spotlight ${s.title}`, s.line)
    for (const g of m.groups) {
      if (g.features.filter((f) => !f.gated).length > 6) errors.push(`${m.slug} › ${g.label}: more than 6 features, split the group`)
      for (const f of g.features) {
        const where = `${m.slug} › ${f.title}`
        lineRules(where, f.line)
        if (!f.visual) errors.push(`${where}: has no visual`)
        else if (visualItems(f.visual) > 3) errors.push(`${where}: visual has more than 3 items`)
        if (f.visual?.type === 'chart' && f.visual.points.length > 7) errors.push(`${where}: chart has more than 7 bars`)
      }
    }
  }
  if (errors.length) throw new Error(`Module copy lint failed:\n- ${errors.join('\n- ')}`)
}
