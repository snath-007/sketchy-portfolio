import type { WorkItem } from "@/types/work";

export const workSeed: WorkItem[] = [
  {
    id: "bassinest-smart-nursery",
    slug: "bassinest-smart-nursery-baby-monitor",
    title: "Bassinest Smart Nursery Baby Monitor",
    category: "IoT + Mobile",
    summary:
      "An IoT-based Android monitoring system for continuously managing and monitoring smart baby bassinests.",
    description:
      "A connected nursery monitoring application that links Android users, a backend service, and bassinet hardware through secure BLE/Wi-Fi pairing and real-time WebSocket communication.",
    technologies: [
      "Kotlin",
      "Android",
      "BLE",
      "Wi-Fi",
      "WebSockets",
      "Firebase",
    ],
    featured: true,
    problem:
      "Caregivers need a reliable way to pair with smart bassinests, monitor device state continuously, receive real-time updates, and coordinate access across primary and secondary users without losing sync accuracy.",
    built: [
      "Led Android development for the HALO smart bassinet monitoring application",
      "Implemented secure BLE and Wi-Fi pairing flows for bassinet hardware",
      "Built real-time monitoring flows over WebSockets for live device updates",
      "Supported primary and secondary user access patterns for shared caregiving",
      "Integrated Firebase-backed application services for mobile workflows",
    ],
    impact: [
      "Supported 3,000+ users on the smart bassinet monitoring platform",
      "Delivered reliable device synchronization with 99% sync accuracy",
      "Created a real-time bridge between mobile users and connected nursery hardware",
    ],
  },
  {
    id: "snowflake-onboarding-automation",
    slug: "snowflake-onboarding-access-provisioning",
    title: "Snowflake Onboarding Access Provisioning",
    category: "Data Governance",
    summary:
      "An onboarding automation system for provisioning new user access across Snowflake resources and data objects.",
    description:
      "A data governance and engineering platform that automates enterprise data access provisioning through Streamlit workflows, FastAPI services, Snowflake operations, and scheduled Airflow jobs on AWS.",
    technologies: [
      "Streamlit",
      "Snowflake",
      "FastAPI",
      "Apache Airflow",
      "AWS MWAA",
      "S3",
    ],
    featured: true,
    problem:
      "Manual data access provisioning for enterprise users can take days, create inconsistent role assignments, and make audit reporting difficult when teams need controlled access across Snowflake resources and objects.",
    built: [
      "Built onboarding workflows for requesting and provisioning Snowflake access",
      "Implemented backend provisioning logic for users, roles, resources, and governance flows",
      "Delivered the system in phased releases to support enterprise rollout",
      "Added DAG-based scheduled jobs through Apache Airflow / MWAA for recurring operations",
      "Produced audit-ready governance reporting for user access and provisioning state",
    ],
    impact: [
      "Reduced enterprise data provisioning time from days to minutes",
      "Scaled onboarding and governance workflows to hundreds of users",
      "Improved audit readiness with consistent reporting across access operations",
    ],
  },
  {
    id: "procurement-legal-ai-assistant",
    slug: "procurement-legal-ai-assistant",
    title: "ProcLeg Procurement and Legal AI Assistant",
    category: "Enterprise AI",
    summary:
      "An enterprise AI copilot that turns legal and procurement knowledge into actionable workflows for Q&A, RFP creation, agreement generation, and supplier review.",
    description:
      "ProcLeg helps legal and procurement teams move from question to action faster by combining grounded retrieval, multi-agent orchestration, document generation, supplier intelligence, and workflow state tracking in one conversational platform.",
    technologies: [
      "LangGraph",
      "DSPy",
      "FastAPI",
      "PostgreSQL/RDS",
      "DynamoDB",
      "S3",
      "AWS Bedrock KB",
      "Azure OpenAI",
      "LiteLLM",
      "python-docx",
    ],
    featured: true,
    snapshot: [
      "Client domain: Enterprise legal and procurement workflows",
      "Modules: Legal / Ally and Procurement Copilot",
      "Architecture: FastAPI API, core library, and UI application",
      "Pattern: Hexagonal / ports-and-adapters style layering",
    ],
    problem:
      "Legal and procurement teams spend significant time moving across approved knowledge sources, templates, supplier data, RFP history, uploaded files, and internal process guidance. The problem is not only answering questions; users need guided workflows that help them draft agreements, create RFPs, analyze suppliers, review proposals, and generate downloadable business documents without restarting context every turn.",
    positioning:
      "ProcLeg is an enterprise AI copilot for legal and procurement teams. It reduces manual effort, improves consistency, and accelerates document-heavy workflows by turning approved internal knowledge, templates, supplier data, and historical documents into guided AI workflows.",
    workflow: [
      {
        title: "User starts from chat or module navigation",
        description:
          "The UI supports chat, uploads, conversation history, help, and module navigation across Legal / Ally and Procurement experiences.",
      },
      {
        title: "FastAPI receives the request",
        description:
          "The backend exposes REST and SSE endpoints for chat, streaming, conversation retrieval, workflow state, clearing, sharing, and document download flows.",
      },
      {
        title: "Application service resumes state",
        description:
          "LegalQAService or ProcurementService creates or resumes the conversation, tracks uploaded files, restores workflow metadata, and prepares recent context.",
      },
      {
        title: "Router selects the right workflow path",
        description:
          "Legal uses an intent router to split Q&A and HCP generation paths, while procurement uses a LangGraph supervisor to route to specialized nodes.",
      },
      {
        title: "Agent produces grounded output or artifact",
        description:
          "The system can return grounded answers, generate RFP or HCP DOCX files, assess suppliers or proposals, and persist conversation state for multi-turn continuation.",
      },
    ],
    sections: [
      {
        title: "System Overview",
        body: "ProcLeg is organized across three main codebases: a UI app for chat and navigation, a FastAPI backend exposing REST/SSE endpoints, and a core library containing domain models, application services, agents, persistence, document generation, retrieval, and infrastructure integrations.",
        bullets: [
          "rdu-ai-genio-legal-assistant-ui for chat, uploads, history, help, and module navigation",
          "rdu-ai-genio-legal-assistant-api for FastAPI REST and streaming endpoints",
          "rdu-ai-genio-legal-assistant-lib for domain, application, agents, repositories, and integrations",
          "Legal / Ally module for legal Q&A and HCP agreement generation",
          "Procurement module for Q&A, RFP creation, supplier intelligence, proposal scoring, and SoW review",
        ],
      },
      {
        title: "Layered Architecture",
        body: "The project follows a hexagonal / ports-and-adapters style. Domain models and interfaces stay independent from DSPy, LangGraph, AWS, SQL, or FastAPI. Application services orchestrate workflows, while infrastructure adapters handle persistence, retrieval, document generation, and cloud integrations.",
        bullets: [
          "Domain layer defines conversation models, request/response models, workflow state, agent interfaces, repository interfaces, and document contracts",
          "Application layer orchestrates LegalQAService and ProcurementService workflows",
          "Infrastructure layer connects to DynamoDB, S3, Postgres/RDS, Bedrock Knowledge Base, Azure OpenAI, and document generation utilities",
          "Shared agent interfaces allow multiple frameworks such as DSPy and LangGraph to coexist cleanly",
        ],
      },
      {
        title: "Legal Q&A Module",
        body: "The legal Q&A path uses a DSPy multi-hop RAG agent to answer legal, compliance, and policy questions from approved internal knowledge sources. Responses are constrained to retrieved context and include answer, sources, limitations, confidence assessment, and follow-up questions.",
        bullets: [
          "Intent and entity extraction before retrieval",
          "First-hop and second-hop retrieval from AWS Bedrock Knowledge Base",
          "Scenario analysis and step extraction before final response generation",
          "Grounded answer generation through the generic AgentBase interface",
        ],
      },
      {
        title: "HCP Agreement Generation",
        body: "The HCP path is a guided document-generation workflow. The system detects agreement creation intent, extracts country, looks up the right template, analyzes placeholders and choices, collects required values over multiple turns, previews drafts, supports refinement, generates DOCX output, uploads it to S3, and returns a download URL.",
        bullets: [
          "HCPGenerationService controls the state machine",
          "LLMDocumentGenerator handles country extraction, placeholder analysis, field extraction, workflow action detection, refinement detection, rephrasing, and translation",
          "RDSTemplateRepository finds templates through RDS and S3",
          "docx_merge.py fills DOCX templates deterministically",
        ],
      },
      {
        title: "Procurement Multi-Agent System",
        body: "The procurement module uses LangGraph as a multi-agent workflow system. A supervisor routes each query to one specialized node, allowing the platform to support procurement Q&A, RFP drafting, supplier intelligence, vendor proposal assessment, and SoW review through a single conversational experience.",
        bullets: [
          "Procurement Q&A node rewrites follow-ups into standalone retrieval queries and retrieves knowledge from Bedrock KB",
          "RFP creation node reads templates and guidance from S3, accepts uploaded files, uses historical RFP metadata, and generates DOCX output",
          "Supplier intelligence node queries Postgres supplier tables through guarded safe SQL tooling",
          "Vendor / SoW scoring node analyzes uploaded proposals or statements of work using internal guidance and Azure OpenAI",
        ],
      },
      {
        title: "Persistence and Integrations",
        body: "ProcLeg uses a split persistence strategy based on data shape and access pattern. DynamoDB handles conversation metadata and module state, S3 handles large chat payloads and documents, and Postgres/RDS stores prompt repositories, supplier data, file metadata, HCP template lookup, historical RFP metadata, and ETL job state.",
        bullets: [
          "DynamoDB for conversation metadata, message history references, and module state",
          "S3 for uploaded/generated documents, templates, guidance files, metadata JSON files, and large payloads",
          "Postgres/RDS for prompts, supplier intelligence, file metadata, templates, historical RFP metadata, and ETL audit records",
          "LangGraph memory saver and Postgres checkpointing for graph and sub-agent continuity",
        ],
      },
      {
        title: "ETL v4 Ingestion and Knowledge Sync",
        body: "ETL v4 is the ingestion and synchronization backbone of ProcLeg. It keeps legal and procurement knowledge sources current by syncing curated SharePoint document libraries into S3, exporting metadata tags, converting files to PDF when needed, triggering Bedrock Knowledge Base syncs, and loading supplier intelligence data into RDS.",
        bullets: [
          "Discovers files recursively from configured SharePoint sites, drives, and folders",
          "Writes discovered file metadata into Postgres with source URI, site ID, drive ID, item ID, path, content hash, size, tags, geography, descriptions, and source modified time",
          "Uses content hash comparison to detect new, updated, unchanged, re-discovered, and deleted files incrementally",
          "Handles deletion using both source URI and drive/item ID comparison to reduce false deletion events",
          "Uploads source files, converted PDFs, metadata JSON files, legal templates, procurement reference files, and ETL run logs to S3",
          "Triggers Legal and Procurement Bedrock Knowledge Base syncs only after upload/delete jobs complete successfully",
        ],
      },
      {
        title: "ETL Job Orchestration and Auditability",
        body: "File processing is handled asynchronously through Celery workers. Each task is persisted before execution, giving the system task-level traceability, batch-level job IDs, retry counts, Celery task IDs, payload history, result history, errors, and timestamps.",
        bullets: [
          "Celery tasks include upload_to_s3_kb, delete_from_s3, and dump_tags_to_s3 style operations",
          "file_metadata acts as the source-of-truth catalog for discovered enterprise files and per-task processing state",
          "etl_jobs_v4 records project ID, file metadata ID, batch job ID, task type, status, redacted payload, result, error message, execution metadata, retry count, and timestamps",
          "Retry and recovery APIs support worker checks, job submission, polling, failed-task retry, and cleanup",
          "Retries re-inject SharePoint credentials because persisted payloads intentionally redact secrets",
        ],
      },
      {
        title: "Supplier Intelligence ETL",
        body: "Procurement has a dedicated supplier intelligence ingestion path. ETL v4 scans procurement Excel files from S3, parses supplier profile data, and upserts structured records into RDS tables that are later used by the Supplier Intelligence agent through guarded SQL access.",
        bullets: [
          "Parses supplier profile data from procurement Excel files in S3",
          "Populates supplier_info, capabilities_map, therapeutic_areas, local_presence, and roles_and_rates tables",
          "Supports supplier questions such as capability, geography, therapeutic area, local presence, and role/rate analysis",
          "Keeps supplier data separate from document retrieval so structured supplier intelligence can be queried deterministically",
        ],
      },
      {
        title: "Observability, LangSmith, and Evaluation",
        body: "ProcLeg separates operational observability from AI observability. ETL v4 tracks jobs, files, retries, failures, and durable run logs through RDS, S3, Celery, and structured logging, while LangSmith is used across chat and agent workflows for LLM and agent traces.",
        bullets: [
          "ETL v4 uses structured Loguru logging, run-scoped logs, Celery status polling, RDS job tables, file-level status columns, retry summaries, and S3-uploaded run logs",
          "LangSmith traces chat and agent execution through traceable/OpenInference utilities in the AI application layer",
          "A traceable chain can connect SharePoint document, file_metadata row, ETL job, S3 object, Bedrock KB sync, user question, LangSmith trace, answer, and sources",
          "LLM-as-judge evaluation can run after ingestion to assess groundedness, citation correctness, retrieval relevance, completeness, hallucination risk, policy compliance, document version usage, and metadata filtering",
          "Feedback reports can summarize discovered files, new/updated/deleted files, S3 uploads, PDF conversions, metadata JSON uploads, KB sync status, failed files, retries, supplier rows, judge scores, failed queries, and recommendations",
        ],
      },
      {
        title: "Prompt and LLM Management",
        body: "Prompts are loaded dynamically from Postgres where possible, allowing behavior to be tuned without redeploying code. The system uses Azure OpenAI through the enterprise gateway, LiteLLM for async completions in workflow utilities, LangChain AzureChatOpenAI for procurement nodes, DSPy LM wrappers for legal Q&A, and AWS Bedrock Knowledge Base for retrieval.",
        bullets: [
          "Runtime prompt tuning for procurement Q&A, supervisor routing, supplier intelligence, proposal assessment, HCP extraction, and legal intent classification",
          "Structured service boundaries keep model usage behind workflow-aware application logic",
          "Retrieval is grounded in approved internal sources instead of unbounded model memory",
        ],
      },
      {
        title: "End-to-End User Journeys",
        body: "The system is designed around completing work, not just answering questions. Users can ask legal questions, generate HCP agreements, create RFP documents, query supplier intelligence, or assess proposals while the platform preserves conversation and workflow state across turns.",
        bullets: [
          "Legal Q&A: ask a policy question, retrieve approved guidance, generate grounded answer, persist conversation",
          "HCP agreement: detect country and template, collect fields, preview draft, refine values, generate DOCX, return download URL",
          "Procurement RFP: route to RFP node, use templates/guidance/uploads/history, draft RFP, generate downloadable document",
          "Supplier intelligence: safely query supplier tables and refine raw SQL-agent output into readable answers",
        ],
      },
    ],
    built: [
      "Built a LangGraph supervisor that routes procurement queries to specialized Q&A, RFP, supplier intelligence, and proposal/SoW assessment nodes",
      "Implemented LegalQAService and ProcurementService orchestration for stateful multi-turn conversations",
      "Built HCP agreement generation with template lookup, placeholder analysis, field collection, refinement, DOCX generation, S3 upload, and download URL support",
      "Integrated DSPy multi-hop RAG for grounded legal Q&A over approved internal sources",
      "Implemented guarded SQL access for supplier intelligence with SELECT-only safe query execution",
      "Designed persistence across DynamoDB, S3, Postgres/RDS, and LangGraph checkpointers",
      "Built ETL v4 ingestion flows for SharePoint discovery, metadata tracking, S3 sync, PDF conversion, Bedrock KB sync, and supplier intelligence loading",
      "Added operational observability through Celery job state, RDS audit tables, file-level status, structured logs, S3 run logs, retry handling, and LangSmith trace linkage",
    ],
    impact: [
      "Reduced manual effort across legal and procurement document-heavy workflows",
      "Improved consistency by grounding answers and documents in approved knowledge, templates, supplier data, and historical records",
      "Enabled users to move from questions to generated agreements, RFPs, supplier insights, and proposal assessments in one conversational platform",
      "Preserved workflow state across turns so complex tasks can continue without starting over",
    ],
    technicalStrengths: [
      "Clean separation of domain, application, and infrastructure layers",
      "DSPy where structured RAG reasoning is useful and LangGraph where multi-agent routing is useful",
      "Conversation state persists across turns and workflows",
      "Document workflows produce real downloadable DOCX/XLSX artifacts",
      "Prompt repository enables runtime tuning without redeployment",
      "Uploaded files can influence RFP and proposal workflows",
      "S3/RDS/DynamoDB split fits large documents, relational metadata, ETL job state, supplier intelligence, and chat state",
      "ETL v4 keeps knowledge bases current without blindly reloading unchanged enterprise documents",
      "LangSmith plus ETL job metadata creates an explainable path from source documents to retrieved answers",
    ],
    screenshotNeeds: [
      "Module navigation showing Legal / Ally and Procurement Copilot",
      "Legal Q&A answer with grounded sources and follow-up guidance",
      "HCP agreement generation flow or draft preview",
      "Procurement RFP creation conversation and downloadable document state",
      "Supplier intelligence result or proposal / SoW scoring output",
      "Any architecture diagram for UI, API, services, agents, and persistence",
    ],
  },
];
