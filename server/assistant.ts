export type AssistantMessage = {
  role: 'user' | 'assistant'
  content: string
}

const KNOWLEDGE = `
Zyntara AI is a Forward Deployed AI Engineering company for Australian businesses.
Brand line: "AI that works inside your business." Supporting line: "From problem to production."
Contact: frank.j@zyntaraai.com.au.

Solutions:
1. AI Workspaces — knowledge, client and matter intelligence, internal search, SOP search, project memory and role-aware operational copilots.
2. Workflow Automation — OCR, documents, email, approvals, supplier RFQs and system integration.
3. Operational Software — custom workflow software, portals, case and job planning, operational dashboards, MES/WMS and practice-system integration.
4. Forward Deployed Engineering — discovery, process mapping, rapid prototypes, integration, deployment and ongoing improvement.

Approach:
Discover the workflow and bottleneck. Build software around the real operation. Deploy into existing systems. Monitor, evaluate, improve and scale.

Industries:
Zyntara serves Australian small and medium businesses across manufacturing and industrial, legal and professional services, accounting and financial services, and healthcare operations. No single industry is the primary market; begin with the client's workflow and operating context.

Representative industry workflows:
- Legal and professional services: matter intake, precedent and knowledge search, document review support and client reporting.
- Accounting and financial services: document processing, reconciliations, exception handling, reporting and research intelligence.
- Healthcare operations: referral intake, rostering, capacity coordination, form processing and operational reporting. Zyntara does not make clinical decisions.
- Manufacturing and industrial: planning, procurement, warehouse traceability and quality inspection.

Selected work (client identities withheld):
- Manufacturing Planning Copilot: projects, BOMs, material readiness, suppliers and production schedules; operational prototype.
- Procurement Traceability & Supplier RFQ: document capture, quote comparison, approvals and ERP integration; workflow engineering.
- AI Warehouse, WMS & OCR Automation: receiving documents, validation and inventory traceability; operational software.
- Offline Vision Quality Inspection: industrial cameras, OpenCV/YOLO, tool/PLC signals, sequence state machine and local traceability; solution architecture.
- Market & News Intelligence Assistant: cited research briefs with human review; applied AI prototype.
- Multi-Agent Quant Research Workflow: hypothesis, research tools, backtest, risk review and EA specification; research prototype. It does not provide investment advice or guarantee returns.
- Matter Intelligence & Intake Workspace: representative solution for governed intake, permission-aware knowledge retrieval, cited drafts and lawyer review.
- Finance Operations & Reporting Automation: representative solution for document capture, reconciliation exceptions, approvals and traceable reporting.
- Referral Intake & Rostering Hub: representative solution for referral validation, capacity coordination, staff follow-up and role-based access. It does not provide clinical advice.

Security and privacy positioning:
Deployment and data architecture are designed around each client's security, privacy and operational requirements. Private cloud, customer-managed environments and local deployment can be supported where required. Never claim blanket compliance or promise that all data stays in a client's environment.
`

const INSTRUCTIONS = `
You are the Zyntara Workflow Assistant on the Zyntara AI website.
Your job is to help a prospective client understand Zyntara's services, identify a useful workflow to discuss, recommend a relevant case study, and suggest a practical next step.

Use only the company knowledge below. If the answer is not established there, say you do not have that detail and invite the visitor to contact frank.j@zyntaraai.com.au. Never invent customers, metrics, prices, certifications, project outcomes or delivery dates.

Respond in the language used by the visitor. Keep responses concise, clear and practical: usually 2–5 short paragraphs or a short list. Ask at most one useful follow-up question at a time. Do not pressure the visitor to provide contact details.
Use plain text only. Simple dash bullets are allowed, but do not use Markdown headings, bold markers, tables or code fences.

Do not provide financial, legal or medical advice. For financial-system questions, discuss software and research workflows only. Never ask for passwords, API keys, customer records, financial account data or other confidential information. If a visitor starts sharing sensitive information, ask them to remove it and continue with a high-level description.

When enough context is available, summarise: workflow, systems involved, bottleneck, desired outcome, and recommended Zyntara solution. Offer frank.j@zyntaraai.com.au as the human handoff.

${KNOWLEDGE}
`

export function normaliseMessages(value: unknown): AssistantMessage[] {
  if (!Array.isArray(value)) return []

  if (!value.every(
      (item): item is AssistantMessage =>
        typeof item === 'object' &&
        item !== null &&
        ('role' in item) &&
        (item.role === 'user' || item.role === 'assistant') &&
        ('content' in item) &&
        typeof item.content === 'string' && item.content.trim().length > 0,
    )) return []

  return value
    .slice(-10)
    .map((item) => ({
      role: item.role,
      content: item.content.trim().slice(0, 1600),
    }))
    .filter((item) => item.content.length > 0)
}

export const ASSISTANT_TIMEOUT_MS = 20_000

export class AssistantRequestError extends Error {
  readonly code: 'timeout' | 'network_error' | 'upstream_error' | 'invalid_response' | 'empty_response'
  readonly upstreamStatus?: number

  constructor(code: AssistantRequestError['code'], upstreamStatus?: number) {
    super(`Assistant request failed: ${code}`)
    this.name = 'AssistantRequestError'
    this.code = code
    this.upstreamStatus = upstreamStatus
  }
}

export async function createAssistantReply({
  apiKey,
  model,
  messages,
  page,
}: {
  apiKey: string
  model: string
  messages: AssistantMessage[]
  page?: string
}) {
  const context = page ? `The visitor is currently viewing: ${page}` : ''
  const controller = new AbortController()
  // Leave time for a JSON error before Vercel's 30-second function deadline.
  const timeout = setTimeout(() => controller.abort(), ASSISTANT_TIMEOUT_MS)
  try {
  const response = await fetch('https://api.openai.com/v1/responses', {
    signal: controller.signal,
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model,
      reasoning: { effort: 'low' },
      instructions: `${INSTRUCTIONS}\n${context}`,
      input: messages,
      max_output_tokens: 500,
      store: false,
    }),
  })

  if (!response.ok) {
    // Do not read or propagate provider error bodies: they can contain request data.
    await response.body?.cancel()
    throw new AssistantRequestError('upstream_error', response.status)
  }

  let data: unknown
  try {
    data = await response.json()
  } catch {
    throw new AssistantRequestError('invalid_response')
  }
  if (!data || typeof data !== 'object' || !('output' in data) || !Array.isArray(data.output)) {
    throw new AssistantRequestError('invalid_response')
  }

  const outputText = data.output
    .flatMap((item: unknown) =>
      item && typeof item === 'object' && 'content' in item && Array.isArray(item.content)
        ? item.content : [],
    )
    .filter((item: unknown): item is { type: 'output_text'; text: string } =>
      !!item && typeof item === 'object' && 'type' in item && item.type === 'output_text' &&
      'text' in item && typeof item.text === 'string',
    )
    .map((item) => item.text)
    .join('\n')
    .trim()

  if (!outputText) {
    throw new AssistantRequestError('empty_response')
  }

  return outputText
  } catch (error) {
    if (controller.signal.aborted) throw new AssistantRequestError('timeout')
    if (error instanceof AssistantRequestError) throw error
    throw new AssistantRequestError('network_error')
  } finally {
    clearTimeout(timeout)
  }
}
