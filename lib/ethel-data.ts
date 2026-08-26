// Realistic sample case data used across the interactive demo, the summary-type
// toggle, and the "Ask Ethel Anything" playground. No real case data is used.

export const sampleCase = {
  id: "2605-CDEMO-30001-01",
  title: "Expense reimbursement discrepancy",
  category: "Financial / Expense Fraud",
  severity: "Medium",
  status: "Open — Under Investigation",
  reportedVia: "ComplianceLine",
  reportedOn: "05/14/2026 at 3:45 PM",
  assignedTo: "Yvonne Arceneaux",
  location: "Regional Sales — Midwest",
  intake: [
    {
      q: "Who is involved?",
      a: "A regional sales manager and a direct report submitted overlapping travel expenses for the same client trip.",
    },
    {
      q: "What happened?",
      a: "Duplicate hotel and meal receipts were submitted across two expense reports totaling approximately $4,200 within the same reporting period.",
    },
    {
      q: "Where and when?",
      a: "Client engagement in Chicago, IL, over a four-day period in late April 2026.",
    },
    {
      q: "How was it discovered?",
      a: "Flagged by the finance team during a routine quarterly reconciliation of the T&E ledger.",
    },
  ],
  notes: [
    {
      date: "05/16/2026",
      author: "Y. Arceneaux",
      text: "Opened case, requested itemized receipts and the corporate card statement from Finance.",
    },
    {
      date: "05/21/2026",
      author: "Y. Arceneaux",
      text: "Interviewed the direct report. Stated the manager instructed them to submit the shared costs 'to simplify the split.'",
    },
    {
      date: "05/27/2026",
      author: "Finance (J. Okafor)",
      text: "Confirmed two reimbursements were issued for the same three receipts. Net duplicate payout: $2,150.",
    },
  ],
}

export type SummaryKey = "case" | "investigation" | "executive"

export const summaryTabs: {
  key: SummaryKey
  label: string
  audience: string
  description: string
}[] = [
  {
    key: "case",
    label: "Case Summary",
    audience: "Get up to speed / share with your team",
    description:
      "A broad overview at a glance — who's involved, the nature of the concern, and the current status.",
  },
  {
    key: "investigation",
    label: "Investigation Summary",
    audience: "For investigators tracking progress",
    description:
      "A focused view of investigation activity — progress made, key findings, and next steps.",
  },
  {
    key: "executive",
    label: "Executive Summary",
    audience: "For leadership & stakeholder reporting",
    description:
      "A concise, polished summary that distills the most important outcomes and decisions, ready to share upward.",
  },
]

export type SummaryBlock = { heading: string; body: string[] }

export const summaries: Record<SummaryKey, SummaryBlock[]> = {
  case: [
    {
      heading: "What Happened",
      body: [
        "A regional sales manager and a direct report submitted overlapping travel expenses for a shared client trip to Chicago in late April 2026.",
        "Duplicate hotel and meal receipts appeared across two expense reports totaling roughly $4,200 in the same reporting period.",
      ],
    },
    {
      heading: "Key Facts",
      body: [
        "Reported via ComplianceLine on 05/14/2026; category Financial / Expense Fraud, severity Medium.",
        "Two individuals involved; discovered by Finance during a routine quarterly T&E reconciliation.",
        "Assigned to Yvonne Arceneaux.",
      ],
    },
    {
      heading: "Current Status",
      body: [
        "Case is open and under active investigation. Receipts and the corporate card statement have been requested and partially reviewed.",
      ],
    },
  ],
  investigation: [
    {
      heading: "Progress to Date",
      body: [
        "Itemized receipts and the corporate card statement were requested from Finance and received.",
        "The direct report was interviewed on 05/21/2026 and stated the manager directed them to submit the shared costs together.",
      ],
    },
    {
      heading: "Key Findings",
      body: [
        "Finance confirmed two reimbursements were issued for the same three receipts, with a net duplicate payout of $2,150.",
        "The pattern is consistent with a directed duplicate submission rather than an isolated clerical error.",
      ],
    },
    {
      heading: "Next Steps",
      body: [
        "Interview the regional sales manager to corroborate the direct report's account.",
        "Coordinate with Finance to recover the $2,150 duplicate payout and review the manager's prior three quarters of expenses.",
      ],
    },
  ],
  executive: [
    {
      heading: "Overview",
      body: [
        "A medium-severity expense-fraud matter involving duplicate reimbursement of approximately $2,150 across two employees on a single client trip.",
      ],
    },
    {
      heading: "Impact & Exposure",
      body: [
        "Confirmed financial exposure is limited and quantified. No customer, regulatory, or data-privacy impact identified.",
        "Reputational risk is contained to the Midwest regional sales team.",
      ],
    },
    {
      heading: "Recommended Decision",
      body: [
        "Proceed with recovery of duplicate funds and a focused look-back on the manager's expense history, with HR consulted on corrective action.",
      ],
    },
  ],
}

export const suggestedPrompts: { q: string; a: string }[] = [
  {
    q: "Who is involved in this case?",
    a: "Two people: a regional sales manager and their direct report. The direct report submitted the duplicate receipts; the case notes indicate the manager directed them to do so. Yvonne Arceneaux is the assigned investigator.",
  },
  {
    q: "What are the recommended next steps?",
    a: "Interview the regional sales manager to corroborate the account, coordinate with Finance to recover the $2,150 duplicate payout, and review the manager's prior three quarters of expenses for similar patterns.",
  },
  {
    q: "How much money is involved?",
    a: "Roughly $4,200 in overlapping receipts were submitted across two expense reports. Finance confirmed a net duplicate payout of $2,150 — that is the actual confirmed exposure.",
  },
  {
    q: "Is there any regulatory or data-privacy impact?",
    a: "No. Based on the current case record, there is no customer, regulatory, or data-privacy impact. Reputational risk is contained to the Midwest regional sales team.",
  },
]
