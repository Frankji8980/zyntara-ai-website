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
    line: 'knowledge, client and matter intelligence, internal search',
    body: 'Give teams a secure working layer over the documents, matters, customers and operational knowledge they already have. Search, summarise and retrieve in context — so useful answers sit beside the work, not in another isolated tool.',
    workflows: [
      'Matter, policy and technical document search',
      'Client, project and decision history',
      'Role-aware team copilots',
    ],
    systems: ['Documents', 'Knowledge bases', 'CRM / DMS', 'Databases'],
    relatedWork: 'legal-matter-intelligence',
  },
  {
    id: 'workflow-automation',
    title: 'Workflow Automation',
    line: 'OCR, documents, email, approvals, system integration',
    body: 'Take paper, inboxes and approval chains out of the critical path. We wire capture, routing and hand-offs into the systems you already run, with people still in control of the exceptions that matter.',
    workflows: [
      'Email, form and document intake',
      'OCR-to-system data capture',
      'Exception and approval routing',
    ],
    systems: ['Email', 'PDF / Excel', 'ERP / PMS', 'CRM', 'REST APIs'],
    relatedWork: 'finance-operations-automation',
  },
  {
    id: 'operational-software',
    title: 'Operational Software',
    line: 'custom workflow software, portals, planning and dashboards',
    body: 'Build the software the business actually runs on: intake, planning, coordination, case management and live visibility. Each system is shaped around the people doing the work and the tools already in place.',
    workflows: [
      'Case, job and capacity planning',
      'Client and staff portals',
      'Operational dashboards and exception queues',
    ],
    systems: ['Practice systems', 'ERP / PMS', 'CRM', 'Databases', 'Operational data'],
    relatedWork: 'healthcare-intake-roster',
  },
  {
    id: 'forward-deployed-engineering',
    title: 'Forward Deployed Engineering',
    line: 'embedded engineering / ongoing delivery',
    body: 'Engineers sit with your operational teams, own the problem, and stay through production. Not a slide deck. Not a one-off build that nobody maintains.',
    workflows: [
      'On-site discovery and process mapping',
      'Rapid operational prototypes',
      'Integration, deployment and improvement',
    ],
    systems: ['Business teams', 'Existing systems', 'AI models', 'Production'],
    relatedWork: 'offline-vision-inspection',
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
    eyebrow: 'Production / Supply chain / Quality',
    image: '/images/cnc-manufacturing.jpg',
    imageAlt: 'CNC manufacturing floor with staged machined components',
    body: 'Connect planning, materials, suppliers, warehousing and quality. We build software that reflects how the plant actually runs and helps teams act on delivery risk before it reaches the customer.',
    workflows: ['Production planning', 'Procurement and RFQs', 'Warehouse traceability', 'Quality inspection'],
    workIds: ['production-planning-copilot', 'procurement-rfq', 'warehouse-ocr', 'offline-vision-inspection'],
  },
  {
    id: 'legal',
    title: 'Legal & Professional Services',
    eyebrow: 'Matters / Knowledge / Client service',
    image: '/images/legal-operations.jpg',
    imageAlt: 'Legal professionals reviewing a client matter in a Sydney office',
    body: 'Turn matter files, precedent, correspondence and internal expertise into a governed working layer. We help firms find the right material, prepare first drafts and route work while keeping legal judgement and client decisions with people.',
    workflows: ['Matter intake and triage', 'Precedent and knowledge search', 'Document review and drafting support', 'Client reporting'],
    workIds: ['legal-matter-intelligence'],
  },
  {
    id: 'financial',
    title: 'Accounting & Financial Services',
    eyebrow: 'Finance operations / Research / Controls',
    image: '/images/finance-operations.jpg',
    imageAlt: 'Australian finance operations team reviewing reporting and exceptions',
    body: 'Reduce the manual work around documents, reconciliations, reporting and research. We build traceable systems that gather evidence, surface exceptions and prepare work for review without automating away professional accountability.',
    workflows: ['Invoice and document processing', 'Reconciliation and exception handling', 'Management reporting', 'Market and research intelligence'],
    workIds: ['finance-operations-automation', 'market-news-intelligence', 'multi-agent-quant-research'],
  },
  {
    id: 'healthcare',
    title: 'Healthcare Operations',
    eyebrow: 'Intake / Rostering / Care coordination',
    image: '/images/healthcare-operations.jpg',
    imageAlt: 'Healthcare team coordinating referrals and rosters in an Australian clinic',
    body: 'Improve the operational traffic around care: referrals, intake, rostering, follow-up and reporting. We design around privacy, role-based access and human oversight so clinical teams spend less time moving information between systems.',
    workflows: ['Referral intake and triage', 'Roster and capacity coordination', 'Document and form processing', 'Operational reporting'],
    workIds: ['healthcare-intake-roster'],
  },
] as const

export const WORK_ITEMS = [
  {
    id: 'production-planning-copilot',
    number: '01',
    title: 'Manufacturing Planning Copilot',
    industry: 'CNC machine-tool manufacturing',
    location: 'China',
    stage: 'Operational prototype',
    image: '/images/industrial-operations.jpg',
    imageAlt: 'Manufacturing operations team overlooking a production floor',
    summary:
      'A unified workspace for projects, BOMs, material readiness, suppliers and production schedules — with an AI Copilot designed to explain risk and propose the next action.',
    challenge:
      'Project status, BOM availability, supplier commitments and bay schedules lived across separate views. Planners could see that a project was late, but not always why or what to change next.',
    system:
      'Structured operational data is queried through tools; SOPs and project documents are retrieved through RAG; project decisions are retained as memory. Schedule changes remain behind human approval.',
    outcome:
      'One traceable view of delivery risk, material readiness and production capacity, with proposed actions tied back to the data and operating rules that produced them.',
    architecture: [
      'React scheduler',
      'FastAPI / REST',
      'PostgreSQL + pgvector',
      'RAG + project memory',
      'Tool calling',
      'Human approval',
    ],
    flow: 'BOM + suppliers + schedule → operational model → AI proposal → human approval',
  },
  {
    id: 'procurement-rfq',
    number: '02',
    title: 'Procurement Traceability & Supplier RFQ',
    industry: 'Industrial manufacturing',
    location: 'China',
    stage: 'Workflow engineering',
    image: null,
    imageAlt: '',
    summary:
      'A procurement workflow that connects demand, supplier communication, quotations and approvals instead of leaving the audit trail across inboxes and spreadsheets.',
    challenge:
      'Teams manually assembled RFQs, chased supplier responses and compared inconsistent quote formats, making status and ownership difficult to see.',
    system:
      'Document and email automation captures requirements and quotations, normalises the data, routes exceptions for review and preserves the decision trail for each purchase request.',
    outcome:
      'A clearer path from material demand to supplier decision, with less re-keying and a traceable record of what was requested, received and approved.',
    architecture: [
      'OCR and document parsing',
      'Supplier data model',
      'RFQ workflow',
      'Approval controls',
      'ERP integration layer',
    ],
    flow: 'Material demand → RFQ → supplier response → comparison → approval',
  },
  {
    id: 'warehouse-ocr',
    number: '03',
    title: 'AI Warehouse, WMS & OCR Automation',
    industry: 'Metal manufacturing',
    location: 'China',
    stage: 'Operational software',
    image: null,
    imageAlt: '',
    summary:
      'A warehouse workflow for turning incoming documents and physical stock movements into structured, searchable operational records.',
    challenge:
      'Receiving documents, inventory locations and warehouse updates required repeated manual entry, slowing reconciliation and making exceptions difficult to investigate.',
    system:
      'OCR captures source documents, validation rules route uncertain fields to a person, and WMS records connect receipts, locations and inventory movements through a consistent data model.',
    outcome:
      'Faster capture at receiving and better traceability from the original document to the warehouse transaction and current stock position.',
    architecture: [
      'OCR pipeline',
      'Validation queue',
      'WMS data model',
      'Inventory traceability',
      'Operational dashboard',
    ],
    flow: 'Delivery document → OCR → validation → WMS receipt → inventory visibility',
  },
  {
    id: 'offline-vision-inspection',
    number: '04',
    title: 'Offline Vision Quality Inspection',
    industry: 'Heavy-equipment battery assembly',
    location: 'China',
    stage: 'Solution architecture',
    image: '/images/vision-inspection.jpg',
    imageAlt: 'Machine vision camera inspecting an industrial battery assembly station',
    summary:
      'An offline-first inspection architecture for component placement, cable alignment and assembly sequence across six production stations.',
    challenge:
      'The production environment cannot depend on public cloud connectivity, while the last stations require checking not only the finished state but also tightening and riveting order.',
    system:
      'Industrial cameras and OpenCV/YOLO locate components and tools. Equipment signals confirm completed operations, while a state machine checks sequence. FastAPI and PostgreSQL provide local integration and serial-level traceability.',
    outcome:
      'A practical path to PASS/NG control with image evidence and station history, designed to run entirely on the factory LAN and integrate with PLC/MES workflows.',
    architecture: [
      'Industrial cameras',
      'OpenCV + YOLO',
      'Tool / PLC signals',
      'Sequence state machine',
      'FastAPI',
      'Local PostgreSQL',
    ],
    flow: 'Camera + tool signal → vision and sequence engine → PASS / NG → local traceability',
  },
  {
    id: 'market-news-intelligence',
    number: '05',
    title: 'Market & News Intelligence Assistant',
    industry: 'Financial services',
    location: 'Australia',
    stage: 'Applied AI prototype',
    image: '/images/financial-intelligence.jpg',
    imageAlt: 'Analyst reviewing market intelligence in a Sydney workspace',
    summary:
      'A research assistant for turning fast-moving market news, macro events and instrument context into a structured brief for client-facing teams.',
    challenge:
      'Relevant information arrived across multiple sources and formats. Preparing for client conversations required repeatedly finding, filtering and reconciling the same market context under time pressure.',
    system:
      'The assistant retrieves relevant news and market context, groups evidence by instrument and theme, and produces a concise brief with source links, uncertainty markers and a clear boundary between factual summary and interpretation.',
    outcome:
      'A more repeatable research workflow and faster preparation for client conversations, while keeping final interpretation and communication with the account manager.',
    architecture: [
      'News and market connectors',
      'Retrieval and ranking',
      'LLM synthesis',
      'Source citations',
      'Human review',
      'Conversation context',
    ],
    flow: 'Market data + news → retrieval and ranking → cited AI brief → advisor review',
  },
  {
    id: 'multi-agent-quant-research',
    number: '06',
    title: 'Multi-Agent Quant Research Workflow',
    industry: 'Quantitative research',
    location: 'Australia / China',
    stage: 'Quant research prototype',
    image: null,
    imageAlt: '',
    summary:
      'A controlled research environment for moving from a trading hypothesis to data analysis, backtesting and an EA-ready strategy specification.',
    challenge:
      'Research, coding, market context and risk checks were handled as disconnected tasks, making experiments difficult to reproduce and easy to confuse with production trading logic.',
    system:
      'Specialised agents separate research, data preparation, strategy logic and risk review. Tool calls run deterministic calculations and backtests, while a shared experiment record stores assumptions, parameters and results for comparison.',
    outcome:
      'A traceable path from idea to tested strategy specification, with reusable experiments and explicit human approval before any simulated or live execution step.',
    architecture: [
      'Python research tools',
      'Strategy and risk agents',
      'Backtest tool calling',
      'Experiment memory',
      'EA specification',
      'Human approval gates',
    ],
    flow: 'Hypothesis → data and research tools → backtest → risk review → EA specification',
  },
  {
    id: 'legal-matter-intelligence',
    number: '07',
    title: 'Matter Intelligence & Intake Workspace',
    industry: 'Legal & professional services',
    location: 'Australia',
    stage: 'Representative solution',
    image: '/images/legal-operations.jpg',
    imageAlt: 'Legal professionals reviewing a client matter in a Sydney office',
    summary:
      'A representative delivery pattern for connecting matter intake, precedent, correspondence and internal knowledge without replacing the firm’s existing practice systems.',
    challenge:
      'New instructions arrive through email, forms and conversations, while useful precedent and prior advice sit across a document management system, shared drives and individual inboxes.',
    system:
      'A governed workspace classifies intake, creates a matter brief, retrieves permission-aware sources and prepares reviewable drafts. Every answer links back to source material, and lawyers approve anything used for client work.',
    outcome:
      'Designed to reduce repeated searching and administrative hand-offs while preserving matter permissions, source traceability and professional judgement.',
    architecture: [
      'Matter intake',
      'DMS / email connectors',
      'Permission-aware retrieval',
      'Source citations',
      'Draft review',
      'Audit trail',
    ],
    flow: 'Client instruction → intake and classification → cited matter workspace → lawyer review',
  },
  {
    id: 'finance-operations-automation',
    number: '08',
    title: 'Finance Operations & Reporting Automation',
    industry: 'Accounting & financial services',
    location: 'Australia',
    stage: 'Representative solution',
    image: '/images/finance-operations.jpg',
    imageAlt: 'Australian finance operations team reviewing reporting and exceptions',
    summary:
      'A representative workflow for moving invoices, reconciliations and month-end reporting through one visible exception and approval process.',
    challenge:
      'Teams re-key information from documents, chase missing approvals and reconcile spreadsheets against accounting systems, leaving senior staff to investigate routine exceptions manually.',
    system:
      'Document capture extracts and validates records, rules match transactions, and an exception queue routes uncertain items to the right reviewer. Approved data feeds management reporting with links back to source documents.',
    outcome:
      'Designed to shorten routine processing, make exceptions easier to investigate and give reviewers a traceable path from source document to reported number.',
    architecture: [
      'Document capture',
      'Accounting connector',
      'Matching rules',
      'Exception queue',
      'Approval controls',
      'Management reporting',
    ],
    flow: 'Invoice + ledger data → validation and matching → exception review → reporting',
  },
  {
    id: 'healthcare-intake-roster',
    number: '09',
    title: 'Referral Intake & Rostering Hub',
    industry: 'Healthcare operations',
    location: 'Australia',
    stage: 'Representative solution',
    image: '/images/healthcare-operations.jpg',
    imageAlt: 'Healthcare team coordinating referrals and rosters in an Australian clinic',
    summary:
      'A representative operational hub for receiving referrals, checking completeness, coordinating capacity and keeping follow-up visible across the care team.',
    challenge:
      'Referral details arrive in different formats, staff move information between inboxes and practice systems, and roster changes make it difficult to see capacity and outstanding follow-up in one place.',
    system:
      'An intake layer extracts referral information, flags missing fields and routes the record for staff validation. A role-aware coordination view connects status, capacity and follow-up without making clinical decisions.',
    outcome:
      'Designed to reduce administrative re-entry, surface incomplete referrals earlier and give authorised staff a clearer operational view of demand and capacity.',
    architecture: [
      'Secure intake',
      'Document extraction',
      'Validation queue',
      'Practice-system integration',
      'Role-based access',
      'Operational dashboard',
    ],
    flow: 'Referral → extraction and validation → capacity coordination → staff follow-up',
  },
] as const

export const FEATURED_WORK = WORK_ITEMS[0]
