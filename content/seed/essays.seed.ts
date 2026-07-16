import articleOne from "@/content/essays/architecture-that-evolves.json";
import articleSeven from "@/content/essays/building-agentic-applications.json";
import articleTwo from "@/content/essays/building-in-the-cloud.json";
import articleFour from "@/content/essays/production-rag-part-a.json";
import articleFive from "@/content/essays/production-rag-part-b.json";
import articleSix from "@/content/essays/production-rag-part-c.json";
import type { ArticleItem } from "@/types/article";

export const essaysSeed: ArticleItem[] = [
  {
    id: "1",
    slug: "designing-frontend-backend-architecture",
    featured: true,
    published: true,
    title: "Designing Frontend and Backend Architecture That Can Evolve",
    summary:
      "A practical framework for boundaries, APIs, deployment shapes, and choosing technology without chasing trends.",
    publishedAt: "Oct 08, 2025",
    readingTime: "14 min read",
    content: articleOne.content,
    sections: [
      {
        heading: "Begin with constraints, not frameworks",
        body: [
          "Architecture is the set of expensive-to-change decisions around ownership, data, deployment, security, and failure. Start by mapping users, critical journeys, scale, latency, compliance, team skills, and expected rate of change.",
          "A modular monolith is often the strongest default: one deployable system with enforced domain modules. Split services only when a boundary needs independent scale, release cadence, reliability, or ownership.",
        ],
        bullets: [
          "Prefer boring, observable request paths over speculative abstractions.",
          "Define domain and API contracts before choosing UI state libraries or databases.",
          "Record consequential choices as short architecture decision records.",
        ],
        diagram: {
          title: "A durable web application boundary map",
          definition: `flowchart LR
U[Browser] --> E[CDN / edge]
E --> W[Web application]
W --> B[Backend API]
B --> D[(Primary database)]
B --> Q[Queue]
Q --> J[Workers]
B --> O[Logs, metrics, traces]`,
        },
      },
      {
        heading: "Choose the frontend for the product",
        body: [
          "React with Next.js is a strong fit for content plus application experiences, mature ecosystems, and server rendering. Vue with Nuxt favors approachable conventions; Angular provides an opinionated enterprise platform; SvelteKit optimizes for a compact mental model. The deciding factors are rendering needs, accessibility, ecosystem, hiring, and operational familiarityÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬ÃƒÂ¢Ã¢â€šÂ¬Ã‚Ânot benchmark headlines.",
        ],
        note: "Keep server state, URL state, form state, and ephemeral UI state separate. Most frontend complexity comes from mixing them.",
      },
      {
        heading: "Choose backend boundaries deliberately",
        body: [
          "Node.js and TypeScript reduce language switching for web teams; Java or Kotlin and .NET are excellent for mature enterprise domains; Go suits lean network services; Python excels where data and ML dominate. Framework choice matters less than contracts, migrations, idempotency, authorization, and telemetry.",
        ],
        bullets: [
          "REST is the interoperable default; GraphQL helps varied clients compose data; events decouple work that need not complete in the request.",
          "Use a relational database by default, then add caches, search, or document stores for measured access patterns.",
          "Design timeouts, retries with jitter, idempotency keys, and graceful degradation together.",
        ],
      },
    ],
  },
  {
    id: "2",
    slug: "choosing-cloud-aws-gcp-azure",
    featured: true,
    published: true,
    title:
      "Building in the Cloud: AWS, GCP, Azure, and the Tradeoffs Between Them",
    summary:
      "How to select a cloud ecosystem and a deployment model using workload and organizational constraints.",
    publishedAt: "Dec 17, 2025",
    readingTime: "13 min read",
    content: articleTwo.content,
    sections: [
      {
        heading: "Compare capabilities as systems",
        body: [
          "AWS offers the broadest service catalog and ecosystem, GCP is especially coherent around data, analytics, and Kubernetes, and Azure integrates deeply with Microsoft identity and enterprise estates. The best platform is usually the one your organization can secure and operate repeatedly.",
        ],
        bullets: [
          "Compare landing zones, identity, network controls, regional availability, skills, support, and total operational cost.",
          "Use managed services when they remove undifferentiated operations without creating unacceptable lock-in.",
          "Treat multi-cloud as a business continuity or regulatory decision, not an automatic virtue.",
        ],
        diagram: {
          title: "Cloud landing zone and application path",
          definition: `flowchart TB
I[Identity provider] --> L[Cloud landing zone]
L --> N[Network and policy]
N --> C[Compute platform]
C --> DB[(Managed data)]
C --> M[Messaging]
C --> OBS[Central observability]
P[CI/CD] --> C`,
        },
      },
      {
        heading: "Pick the compute shape last",
        body: [
          "Serverless functions fit bursty event handlers; containers fit portable, continuously running services; Kubernetes earns its cost when platform teams need standardized orchestration at meaningful scale. A managed application platform is often enough.",
        ],
        note: "Portability comes primarily from clean domain boundaries, exportable data, and automated infrastructureÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬ÃƒÂ¢Ã¢â€šÂ¬Ã‚Ânot from restricting every workload to the lowest common denominator.",
      },
      {
        heading: "Design cost and exit paths",
        body: [
          "Model steady and peak compute, storage growth, egress, observability, support, and engineer time. Tag resources, set budgets, and make cost visible per product. For critical managed services, document backup restoration, data export, and a credible replacement path before adoption.",
        ],
      },
    ],
  },
  {
    id: "3",
    slug: "rbac-data-governance-snowflake-provisioning",
    featured: true,
    published: false,
    title:
      "Automating Snowflake Access with RBAC, Airflow, and Auditable Approvals",
    summary:
      "A reference design for governed user and service-account provisioning with tickets, hierarchy approvals, and immutable audits.",
    publishedAt: "Jul 14, 2026",
    readingTime: "16 min read",
    sections: [
      {
        heading: "Model access as a product",
        body: [
          "The UI should guide a requester through identity type, environment, Snowflake database and schema, READ or READ/WRITE package, justification, owner, and expiry. Show effective access before submission and reveal advanced fields progressively.",
          "Keep policy separate from presentation. The backend validates eligibility, separation of duties, package compatibility, approver hierarchy, and service-account ownership from versioned rules.",
        ],
        diagram: {
          title: "Governed provisioning control plane",
          definition: `flowchart LR
R[Requester UI] --> API[Request API]
API --> P[Policy engine]
P --> T[(Ticket store)]
T --> A[Approval service]
A -->|approved| Q[Provisioning queue]
Q --> AF[Airflow DAG]
AF --> SF[Snowflake]
API --> AU[(Immutable audit log)]
A --> AU
AF --> AU`,
        },
      },
      {
        heading: "Use an explicit ticket state machine",
        body: [
          "A ticket should move only through validated commands: DRAFT, SUBMITTED, POLICY_REVIEW, PENDING_APPROVAL, APPROVED, PROVISIONING, PROVISIONED, FAILED, REJECTED, REVOKED, or EXPIRED. Store comments as separate append-only records; store every transition with actor, timestamp, reason, correlation ID, and before/after state.",
        ],
        bullets: [
          "Approvers act on a versioned request snapshot so later edits cannot change what they approved.",
          "Require sequential or parallel approval stages based on data sensitivity and hierarchy.",
          "Workers claim only APPROVED tickets using an atomic lease; retries must be idempotent.",
        ],
        diagram: {
          title: "Ticket states consumed by provisioning jobs",
          definition: `stateDiagram-v2
[*] --> Draft
Draft --> Submitted
Submitted --> PolicyReview
PolicyReview --> PendingApproval
PendingApproval --> Approved
PendingApproval --> Rejected
Approved --> Provisioning
Provisioning --> Provisioned
Provisioning --> Failed
Failed --> Approved: retry authorized
Provisioned --> Revoked
Provisioned --> Expired`,
        },
      },
      {
        heading: "Provision roles, not direct grants",
        body: [
          "Map packages such as SCHEMA_READ and SCHEMA_READ_WRITE to Snowflake database roles, then grant account roles to human users or service users. Airflow should call a small idempotent provisioning service or operator: read an approved snapshot, acquire a lease, reconcile desired versus actual grants, verify, and append evidence.",
        ],
        bullets: [
          "For service accounts require owner, purpose, credential mechanism, rotation policy, and expiry.",
          "Use outbox events so ticket state and job publication cannot diverge.",
          "Reconcile periodically to detect drift and revoke expired access.",
        ],
        note: "An audit trail is not an editable status table. Make it append-only, tamper-evident, access-controlled, and exportable for review.",
      },
    ],
  },
  {
    id: "4",
    slug: "rag-part-a-ingestion-embedding",
    featured: true,
    published: true,
    title: "Production RAG, Part A: Ingestion, Chunking, and Embeddings",
    summary:
      "How to turn proprietary enterprise knowledge into retrievable, permission-aware evidence—and why production RAG often fails before a prompt is written.",
    publishedAt: "Apr 09, 2026",
    readingTime: "15 min read",
    content: articleFour.content,
    sections: [
      {
        heading: "What the model is missing",
        body: [
          "A foundation model knows patterns learned before training ended; it does not automatically know private policies, current tickets, customer contracts, or who may see them. Retrieval-augmented generation supplies relevant evidence at request time without retraining the model.",
        ],
        diagram: {
          title: "The ingestion and indexing pipeline",
          definition: `flowchart LR
S[Enterprise sources] --> X[Extract]
X --> N[Normalize and classify]
N --> C[Chunk]
C --> E[Embed]
C --> M[Metadata and ACLs]
E --> V[(Vector index)]
M --> V
N --> O[(Object store)]`,
        },
      },
      {
        heading: "Chunk for the question",
        body: [
          "Fixed token windows are simple but may split meaning. Recursive text splitting respects headings and paragraphs. Semantic chunking groups related sentences; parent-child indexing retrieves precise fragments and expands to broader context. Tables, code, conversations, and scanned documents need structure-aware parsers.",
        ],
        bullets: [
          "Preserve document, section, page, timestamp, source URI, tenant, classification, and access-control metadata.",
          "Choose overlap only when boundaries genuinely lose context; excessive overlap bloats indexes and duplicates evidence.",
          "Version the parser, chunker, embedding model, and source checksum for repeatable re-indexing.",
        ],
      },
      {
        heading: "Bedrock and alternatives",
        body: [
          "Amazon Bedrock Knowledge Bases offers managed ingestion, embeddings, vector-store integrations, and AWS-native security. Azure AI Search is compelling in Microsoft estates; Vertex AI Search aligns with GCP data platforms; Pinecone, Weaviate, and OpenSearch offer different levels of control. Compare parsing quality, hybrid search, metadata filters, tenancy, regions, encryption, evaluation hooks, and cost.",
        ],
        note: "The embedding model and vector database are coupled through vector dimension and similarity behavior. Treat model changes as versioned migrations, not in-place swaps.",
      },
    ],
  },
  {
    id: "5",
    slug: "rag-part-b-retrieval-strategy",
    featured: true,
    published: true,
    title: "Production RAG, Part B: Retrieval, Filtering, and Reranking",
    summary:
      "A retrieval pipeline that balances semantic relevance, exact terms, permissions, latency, and context quality—and the staged ranking problem behind a single search call.",
    publishedAt: "May 14, 2026",
    readingTime: "14 min read",
    content: articleFive.content,
    sections: [
      {
        heading: "Retrieval is a staged ranking problem",
        body: [
          "Normalize or rewrite the query, apply mandatory authorization filters, retrieve candidates, fuse semantic and lexical results, rerank a smaller set, expand parent context, then pack evidence within the model budget. Each stage should expose scores and timing.",
        ],
        diagram: {
          title: "A production retrieval path",
          definition: `flowchart LR
Q[User question] --> R[Rewrite / route]
R --> F[ACL and metadata filter]
F --> H[Hybrid retrieval]
H --> RR[Reranker]
RR --> D[Deduplicate and expand]
D --> P[Context packing]
P --> L[LLM with citations]`,
        },
      },
      {
        heading:
          "Metadata filters are essentialÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬ÃƒÂ¢Ã¢â€šÂ¬Ã‚Âwith care",
        body: [
          "Filters improve precision and enforce boundaries for tenant, geography, product, validity dates, document type, and classification. Security filters are mandatory and must run before generation. Optional filters inferred from vague language can hurt recall, so log and evaluate them.",
        ],
        bullets: [
          "Use hybrid retrieval for exact identifiers and semantic paraphrases.",
          "Retrieve broadly and rerank narrowly when latency permits.",
          "Diversify results to avoid five near-identical chunks from one document.",
        ],
      },
      {
        heading: "Pack evidence, not noise",
        body: [
          "Order context by usefulness, keep source boundaries visible, and attach stable citation identifiers. If evidence conflicts, prefer authoritative and current sources while exposing disagreement. If retrieval confidence is low, ask a clarifying question or abstain instead of padding the prompt.",
        ],
      },
    ],
  },
  {
    id: "6",
    slug: "rag-part-c-guardrails-evaluation-observability",
    featured: true,
    published: true,
    title: "Production RAG, Part C: Guardrails, Evaluation, and Observability",
    summary:
      "How to measure grounded answers, contain failures, trace behavior, and operate RAG safely—the part of the system that prepares for inevitable mistakes.",
    publishedAt: "Jun 18, 2026",
    readingTime: "14 min read",
    content: articleSix.content,
    sections: [
      {
        heading: "Layer the controls",
        body: [
          "Guardrails are a system, not a single moderation call. Validate input, authorize retrieval, defend against instructions inside documents, constrain tools and output schemas, verify citations, scan output, and provide an explicit abstention route.",
        ],
        diagram: {
          title: "Layered RAG safety and quality controls",
          definition: `flowchart TB
I[Input policy] --> A[Authorization]
A --> R[Retrieval]
R --> G[Grounded generation]
G --> V[Citation and output validation]
V --> O[Response]
R -. traces .-> T[Observability]
G -. traces .-> T
V -. scores .-> E[Evaluation suite]`,
        },
      },
      {
        heading: "Evaluate components and outcomes",
        body: [
          "Maintain a versioned test set of questions, expected sources, answer criteria, and adversarial cases. Measure retrieval recall at k, ranking quality, citation correctness, groundedness, answer relevance, refusal behavior, latency, and cost. Human review remains the reference for high-impact domains.",
        ],
        bullets: [
          "Run deterministic regression tests on parsers, ACL filters, citations, and output schemas.",
          "Use model-based judges only with calibration against human labels.",
          "Segment results by document type, user group, language, and question class.",
        ],
      },
      {
        heading: "Trace the whole request",
        body: [
          "A trace should connect user and session identifiers (appropriately protected), query transformations, filters, retrieved chunk IDs and scores, prompt and model versions, token usage, latency, guardrail decisions, citations, and feedback. Redact secrets and set retention deliberately.",
        ],
        note: "Hallucination cannot be promised away. Design for evidence, calibrated uncertainty, abstention, review, and rapid diagnosis.",
      },
    ],
  },
  {
    id: "7",
    slug: "agentic-applications-workflows-agents",
    featured: true,
    published: true,
    title:
      "Building Agentic Applications: Workflow, Agent, or Something Between?",
    summary:
      "A decision guide to deterministic workflows, tool-using agents, and bounded agentic workflows—and why most production systems need less autonomy than expected.",
    publishedAt: "Jul 16, 2026",
    readingTime: "13 min read",
    content: articleSeven.content,
    sections: [
      {
        heading: "Autonomy is a design variable",
        body: [
          "A workflow follows predefined transitions. An AI-assisted workflow uses models inside known steps. An agent chooses the next action and tool based on state. An agentic workflow bounds that autonomy with a graph, budgets, policies, and human checkpoints.",
        ],
        diagram: {
          title: "Match autonomy to uncertainty and risk",
          definition: `flowchart LR
D[Deterministic workflow] --> AI[AI-assisted workflow]
AI --> AW[Bounded agentic workflow]
AW --> AG[Open-ended agent]
D -. low uncertainty .-> L[Predictability]
AG -. high uncertainty .-> X[Autonomy]`,
        },
      },
      {
        heading: "Choose the least autonomy that solves the task",
        body: [
          "Use deterministic code for known rules, a workflow for repeatable multi-step processes, and an agent when the path cannot be enumerated economically. Higher autonomy increases evaluation surface, latency, cost, and security exposure.",
        ],
        bullets: [
          "Give tools narrow schemas, scoped credentials, idempotency, and explicit side-effect labels.",
          "Separate planning from execution and require approval for irreversible actions.",
          "Persist state and make every step replayable and observable.",
        ],
      },
      {
        heading: "Design the stop conditions first",
        body: [
          "Define maximum steps, time and token budgets, retry policy, duplicate-action protection, success criteria, escalation, and safe termination. Evaluate full trajectoriesÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬ÃƒÂ¢Ã¢â€šÂ¬Ã‚Ânot just final proseÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬ÃƒÂ¢Ã¢â€šÂ¬Ã‚Âusing simulated failures and adversarial tool outputs.",
        ],
      },
    ],
  },
  {
    id: "8",
    slug: "mcp-servers-enterprise-tools",
    featured: false,
    published: false,
    title:
      "MCP Servers: Designing a Safe Interface Between Models and Enterprise Tools",
    summary:
      "Resources, prompts, tools, transports, and the security boundaries a production MCP server needs.",
    publishedAt: "Jul 09, 2026",
    readingTime: "11 min read",
    sections: [
      {
        heading: "MCP is a protocol boundary",
        body: [
          "The Model Context Protocol gives clients a consistent way to discover resources, prompts, and tools. It does not make a tool safe or turn a model into an authorization system. The server remains responsible for identity, validation, policy, and auditing.",
        ],
        diagram: {
          title: "MCP trust boundaries",
          definition: `flowchart LR
U[User] --> H[MCP host]
H --> C[MCP client]
C --> S[MCP server]
S --> P[Policy and validation]
P --> E[Enterprise API]
S --> A[(Audit log)]`,
        },
      },
      {
        heading: "Design small, explicit tools",
        body: [
          "Prefer task-shaped tools such as request_schema_access over generic execute_sql. Publish precise input schemas, separate reads from writes, return structured errors, paginate resources, and make mutation idempotency visible.",
        ],
        bullets: [
          "Propagate user identity where downstream authorization requires it.",
          "Use least-privilege server credentials and short-lived delegated tokens.",
          "Treat tool descriptions and remote resource content as untrusted input.",
        ],
      },
      {
        heading: "Operate it like an API",
        body: [
          "Version contracts, cap payloads and execution time, rate-limit callers, trace tool calls, redact sensitive arguments, and test compatibility with multiple clients. Put human approval around high-impact actions and log both the proposed and executed operation.",
        ],
      },
    ],
  },
  {
    id: "9",
    slug: "langgraph-stateful-agent-workflows",
    featured: false,
    published: false,
    title: "LangGraph: Building Stateful, Recoverable Agent Workflows",
    summary:
      "How graph-based orchestration makes agent state, branching, checkpoints, and human review explicit.",
    publishedAt: "Jul 08, 2026",
    readingTime: "11 min read",
    sections: [
      {
        heading: "Think in state transitions",
        body: [
          "LangGraph models an application as nodes that read and update shared typed state, connected by deterministic or conditional edges. The graph makes loops, approvals, recovery, and stop conditions visible instead of hiding them in an agent loop.",
        ],
        diagram: {
          title: "A bounded research graph",
          definition: `stateDiagram-v2
[*] --> Classify
Classify --> Retrieve
Retrieve --> Draft
Draft --> Verify
Verify --> Draft: insufficient evidence
Verify --> HumanReview: high risk
Verify --> Complete: grounded
HumanReview --> Complete
Complete --> [*]`,
        },
      },
      {
        heading: "Persistence changes the design",
        body: [
          "Checkpoint after meaningful steps so an interrupted run can resume without repeating side effects. Keep durable business state outside transient prompt messages, attach an idempotency key to tool calls, and scope checkpoints by thread or job.",
        ],
        bullets: [
          "Use reducers deliberately when parallel branches update the same field.",
          "Keep nodes small enough to test without a model.",
          "Route failures by class: retryable, correctable, approval-required, or terminal.",
        ],
      },
      {
        heading: "Do not graph accidental complexity",
        body: [
          "A graph is valuable when the workflow branches, loops, pauses, or resumes. A short linear request can remain ordinary application code. Evaluate paths, state invariants, tool side effects, and recoveryÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬ÃƒÂ¢Ã¢â€šÂ¬Ã‚Ânot merely the final answer.",
        ],
      },
    ],
  },
  {
    id: "10",
    slug: "dspy-programming-reliable-llm-systems",
    featured: false,
    published: false,
    title: "DSPy: Programming and Optimizing Reliable LLM Pipelines",
    summary:
      "Using signatures, modules, metrics, and optimizers to replace manual prompt tweaking with measurable iteration.",
    publishedAt: "Jul 07, 2026",
    readingTime: "10 min read",
    sections: [
      {
        heading: "Specify behavior before wording",
        body: [
          "DSPy treats LM calls as modules with declared input and output signatures. You compose modules such as retrieval, chain-of-thought, or assertions, define a metric and examples, then use an optimizer to search for effective instructions or demonstrations.",
        ],
        diagram: {
          title: "The DSPy optimization loop",
          definition: `flowchart LR
S[Signature and modules] --> P[Program]
D[Examples] --> O[Optimizer]
M[Metric] --> O
P --> O
O --> C[Compiled program]
C --> E[Held-out evaluation]
E -. iterate .-> S`,
        },
      },
      {
        heading: "The metric is the product contract",
        body: [
          "Exact match may fit extraction; semantic quality may require multiple checks; RAG needs answer and evidence criteria. A weak metric efficiently optimizes the wrong behavior, so calibrate it against expert judgment and keep a held-out test set.",
        ],
        bullets: [
          "Split training, development, and test examples to detect overfitting.",
          "Version data, model, optimizer, metric, and compiled artifacts.",
          "Measure quality together with token cost and latency.",
        ],
      },
      {
        heading: "Know where DSPy fits",
        body: [
          "DSPy is useful when a multi-stage LM program has measurable behavior and enough representative examples. It complements orchestration and observability; it does not replace authorization, deterministic validation, data engineering, or production controls.",
        ],
      },
    ],
  },
  {
    id: "11",
    slug: "production-ai-platform-blueprint",
    featured: false,
    published: false,
    title:
      "A Production AI Platform Blueprint: From Models to Governed Products",
    summary:
      "How retrieval, agents, tools, evaluation, policy, and platform engineering fit into one operating model.",
    publishedAt: "Jul 06, 2026",
    readingTime: "12 min read",
    sections: [
      {
        heading: "Separate product, intelligence, and control planes",
        body: [
          "The product plane owns user experience and business workflow. The intelligence plane owns retrieval, models, prompts, and agent graphs. The control plane owns identity, policy, evaluation, observability, budgets, and release governance. Clear boundaries let each evolve without bypassing risk controls.",
        ],
        diagram: {
          title: "Three planes of an enterprise AI platform",
          definition: `flowchart TB
P[Product plane: UI and APIs] --> I[Intelligence plane: RAG, models, agents]
I --> T[Tool and data systems]
C[Control plane: identity, policy, evals, telemetry] -. governs .-> P
C -. governs .-> I
C -. governs .-> T`,
        },
      },
      {
        heading: "Create paved roads",
        body: [
          "Provide reusable SDKs and templates for model access, retrieval, tool registration, traces, evaluations, and feedback. Teams should inherit safe defaults while retaining escape hatches through reviewed architecture decisions.",
        ],
        bullets: [
          "Route models by task quality, region, latency, and cost.",
          "Promote prompts and agent graphs through environments like code.",
          "Make ownership, SLOs, data classification, and kill switches mandatory metadata.",
        ],
      },
      {
        heading: "Govern changes, not just launches",
        body: [
          "Models, indexes, policies, and tool APIs all drift. Run regression suites before releases, canary changes, monitor segmented quality, and retain rollback artifacts. The platform succeeds when product teams can ship quickly and reviewers can reconstruct exactly why the system acted.",
        ],
      },
    ],
  },
];
export const publishedEssays = essaysSeed
  .filter((article) => article.published)
  .sort(
    (left, right) =>
      new Date(right.publishedAt).getTime() -
      new Date(left.publishedAt).getTime(),
  );
