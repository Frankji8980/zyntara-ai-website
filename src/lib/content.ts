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
    workflows: [
      'SOP and technical document search',
      'Project memory and decision history',
      'Role-aware operational copilots',
    ],
    systems: ['Documents', 'SOPs', 'Project records', 'PostgreSQL'],
    relatedWork: 'production-planning-copilot',
  },
  {
    id: 'workflow-automation',
    title: 'Workflow Automation',
    line: 'OCR, documents, email, approvals, system integration',
    body: 'Take paper, inboxes and approval chains out of the critical path. We wire capture, routing and hand-offs into the systems you already run, with people still in control of the exceptions that matter.',
    workflows: [
      'Supplier RFQ and quote comparison',
      'OCR-to-ERP document capture',
      'Exception and approval routing',
    ],
    systems: ['Email', 'PDF / Excel', 'ERP', 'CRM', 'REST APIs'],
    relatedWork: 'procurement-rfq',
  },
  {
    id: 'operational-software',
    title: 'Operational Software',
    line: 'MES, WMS, planning, procurement, dashboards',
    body: 'Build the operational systems the business actually runs on: materials, production, warehouses, planning and live visibility. Software shaped around the floor, not a generic template.',
    workflows: [
      'BOM and material readiness',
      'Production and bay scheduling',
      'Warehouse receiving and traceability',
    ],
    systems: ['MES', 'WMS', 'ERP', 'PostgreSQL', 'Shop-floor data'],
    relatedWork: 'warehouse-ocr',
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
    title: 'Financial Services & Quantitative Systems',
    featured: false,
    body: 'Market information, research workflows and client-facing decisions move quickly. We build assistants and research systems that gather evidence, structure analysis and keep a person in control of every consequential action.',
  },
  {
    id: 'healthcare',
    title: 'Healthcare Operations',
    featured: false,
    body: 'Rosters, referrals, intake and the operational traffic around care. Tools that reduce admin load on clinical teams, designed around privacy, access control and human oversight.',
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
] as const

export const FEATURED_WORK = WORK_ITEMS[0]
