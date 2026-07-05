import type { ProjectItem } from "@/types/project";

export const labSeed: ProjectItem[] = [
  {
    id: "revflow-ai",
    slug: "revflow-ai",
    title: "RevFlow AI",
    summary:
      "An AI-assisted revenue workflow platform that turns scattered account, opportunity, and activity data into structured workflows and next-best actions.",
    description:
      "RevFlow is a long-running lab project exploring how applied AI, workflow automation, and domain-aware backend architecture can reduce operational friction for modern revenue teams.",
    github: "https://github.com/snath-007/rev_flow_ai",
    liveDemo: "#",
    technologies: [
      "AI Agents",
      "Workflow Engine",
      "Structured Outputs",
      "RBAC",
      "Audit Trail",
    ],
    featured: true,
    snapshot: [
      "Type: Passion project / AI workflow platform",
      "Domain: Revenue operations",
      "Status: Ongoing POC",
      "Focus: Context assembly, workflow intelligence, and human-in-the-loop automation",
    ],
    problem:
      "Revenue teams are rarely blocked by a lack of data. They are blocked by fragmented systems, manual handoffs, inconsistent follow-ups, and the amount of context a person needs to reconstruct before taking the next action. Sales, customer success, finance, and operations teams often move across CRMs, spreadsheets, Slack threads, emails, notes, and internal tools just to understand what happened with an account, which opportunities are stuck, and where revenue is leaking because of delays or missed context.",
    productIdea:
      "RevFlow is designed as a workflow intelligence layer for revenue teams. It does not try to replace the CRM. Instead, it organizes scattered revenue signals around accounts, opportunities, tasks, notes, activities, and user actions, then uses AI to help with summarization, prioritization, recommendations, and controlled workflow execution.",
    workflow: [
      {
        title: "Assemble context",
        description:
          "Bring together account history, recent activity, open tasks, notes, opportunity state, and user context so the user does not need to search across systems manually.",
      },
      {
        title: "Build workflow-aware AI input",
        description:
          "Prepare scoped, domain-aware context for the AI layer instead of sending raw UI prompts or noisy data directly to the model.",
      },
      {
        title: "Generate structured insight",
        description:
          "Ask the model for predictable outputs such as summary, risk level, recommended action, reasoning, and confidence rather than free-form text.",
      },
      {
        title: "Validate and store output",
        description:
          "Let the backend parse, validate, persist, and explain AI-generated recommendations before they appear inside the user workflow.",
      },
      {
        title: "Human reviews or acts",
        description:
          "Keep important business actions reviewable, auditable, and reversible so AI supports the workflow without silently controlling it.",
      },
    ],
    sections: [
      {
        title: "High-Level Architecture",
        body: "RevFlow is structured as a layered application with a frontend workspace, API layer, authentication and user context, domain data layer, workflow orchestration layer, AI reasoning layer, background jobs, integrations, and persistence. The important design choice is that AI does not directly control the system. AI produces structured outputs that the application validates, stores, and turns into controlled workflow state.",
        bullets: [
          "Frontend workspace for records, workflows, insights, and actions",
          "API boundary for validation, auth context, business operations, and persistence",
          "Domain layer for accounts, opportunities, contacts, tasks, notes, and activities",
          "Workflow layer for states, transitions, recommendations, and follow-ups",
          "AI layer for summarization, classification, drafting, risk detection, and reasoning",
          "Persistence and audit layer for generated insights and user approvals",
        ],
      },
      {
        title: "AI Design Philosophy",
        body: "The AI layer is treated as a backend service capability, not a UI gimmick. Prompts are controlled by backend workflows, context is assembled deliberately, and outputs are expected in structured shapes that can be validated before being shown to users or used by workflow logic.",
        bullets: [
          "AI is workflow-aware, not generic chat-first",
          "Structured outputs are preferred over free-form responses",
          "Backend validation decides what becomes application state",
          "Humans stay in control of meaningful business actions",
          "Every recommendation should preserve enough reasoning to be trusted",
        ],
      },
      {
        title: "Core Modules",
        body: "The project has been evolving in modules so the architecture can grow gradually instead of becoming a large, brittle automation tool. Each module owns a clear responsibility inside the revenue workflow lifecycle.",
        bullets: [
          "User and workspace management",
          "Revenue entity management",
          "Workflow engine",
          "AI context builder",
          "AI output parser and validator",
          "Insight storage",
          "Async job processing",
          "Audit and traceability",
        ],
      },
      {
        title: "Key Engineering Decisions",
        body: "RevFlow is interesting because it asks how AI can be embedded into operational workflows without making the system unpredictable, opaque, or hard to maintain. That affects the data model, prompts, UI states, workflow transitions, and logging strategy.",
        bullets: [
          "AI as a service layer rather than a standalone assistant",
          "Workflow-first architecture instead of passive dashboards",
          "Incremental modules so new workflows can be added over time",
          "Reviewable recommendations over blind automation",
          "Traceable AI outputs with reasoning, confidence, and historical state",
        ],
      },
    ],
    experimented: [
      "Revenue entity modeling for accounts, opportunities, contacts, notes, activities, and tasks",
      "Workflow orchestration around states, actions, recommendations, and follow-ups",
      "AI context building for scoped summarization, classification, risk detection, and next-best actions",
      "Validated structured AI outputs instead of relying on free-form model responses",
      "Human-in-the-loop automation with reviewable, auditable, and reversible actions",
      "Traceability for AI-generated insights, recommendations, user approvals, and workflow state changes",
    ],
    learnings: [
      "AI is most useful when it is workflow-aware, not bolted on as a generic chat interface",
      "Backend-controlled prompts, scoped context, and output validation make AI features easier to trust and debug",
      "Revenue operations tools need traceability because users must understand why a recommendation was made",
      "Workflow-first architecture makes the product more useful than a passive dashboard or disconnected assistant",
      "Modular architecture lets the platform grow from one useful workflow into a broader revenue intelligence layer",
    ],
    futureDirection: [
      "CRM integrations",
      "Email and calendar activity ingestion",
      "Account health scoring",
      "Opportunity risk detection",
      "AI-generated follow-up drafts",
      "Workflow templates and approval flows",
      "Team dashboards and revenue bottleneck analytics",
      "Memory and retrieval over customer history",
    ],
    screenshotNeeds: [
      "Main revenue workflow dashboard",
      "Account or opportunity context view",
      "AI recommendation / next-best-action review screen",
      "Workflow state or audit trail screen",
      "Any architecture diagram or module map you already have",
    ],
  },
];
