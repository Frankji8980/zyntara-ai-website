export const EMAIL = 'frank.j@zyntaraai.com.au'
export const SLOGAN = 'From problem to production.'

export const NAV_LINKS = [
  { label: 'Solutions', to: '/solutions' },
  { label: 'Industries', to: '/industries' },
  { label: 'Work', to: '/work' },
  { label: 'Approach', to: '/approach' },
  { label: 'About', to: '/about' },
] as const

export const SOLUTIONS = [
  {
    id: 'ai-workspaces',
    title: 'AI Workspaces',
    line: 'knowledge, client/matter intelligence, internal search',
    body: 'Give teams a working layer over the documents, matters and operational knowledge they already have. Search, summarise and retrieve in context — so answers sit next to the work, not in another tool.',
  },
  {
    id: 'workflow-automation',
    title: 'Workflow Automation',
    line: 'OCR, documents, email, approvals, system integration',
    body: 'Take paper, inboxes and approval chains out of the critical path. We wire capture, routing and hand-offs into the systems you already run, with people still in control of the exceptions that matter.',
  },
  {
    id: 'operational-software',
    title: 'Operational Software',
    line: 'MES, WMS, planning, procurement, dashboards',
    body: 'Build the operational systems the business actually runs on: materials, production, warehouses, planning and live visibility. Software shaped around the floor, not a generic template.',
  },
  {
    id: 'forward-deployed-engineering',
    title: 'Forward Deployed Engineering',
    line: 'embedded engineering / ongoing delivery',
    body: 'Engineers sit with your operational teams, own the problem, and stay through production. Not a slide deck. Not a one-off build that nobody maintains.',
  },
] as const

export const STEPS = [
  {
    title: 'Discover',
    body: 'Understand workflows and bottlenecks — how work actually moves, where hours disappear, and what is worth fixing first.',
  },
  {
    title: 'Build',
    body: 'Create software and AI around real business needs, not a generic assistant dropped onto a messy process.',
  },
  {
    title: 'Deploy',
    body: 'Integrate with existing systems and put the work into production, running beside the current process until it can take over.',
  },
  {
    title: 'Improve',
    body: 'Monitor, evaluate, improve and scale — measure what changed, tighten the next workflow, and keep the system in the business.',
  },
] as const

export const INDUSTRIES = [
  {
    id: 'manufacturing',
    title: 'Manufacturing & Industrial',
    featured: true,
    body: 'Materials, suppliers, production planning and the shop floor. We help manufacturers see inventory and demand in one place, tighten procurement, and give planners software that matches how the plant actually runs.',
  },
  {
    id: 'legal',
    title: 'Legal & Professional Services',
    featured: false,
    body: 'Matters, precedent and client knowledge are scattered across files and inboxes. Workspaces and search that sit on top of how the firm already works — without asking lawyers to change their practice overnight.',
  },
  {
    id: 'accounting',
    title: 'Accounting & Financial Services',
    featured: false,
    body: 'Ledgers, source documents and recurring close work. Capture, classify and route documents into the systems your team already trusts, with oversight on every exception.',
  },
  {
    id: 'healthcare',
    title: 'Healthcare Operations',
    featured: false,
    body: 'Rosters, referrals, intake and the operational traffic around care. Tools that reduce admin load on clinical teams, designed around privacy, access control and human oversight.',
  },
] as const

export const FEATURED_WORK = {
  title: 'Procurement & Production Planning',
  industry: 'Manufacturing',
  summary: 'Unified materials, supplier and production visibility.',
  result: '30%+ improvement in procurement and planning efficiency',
} as const
