import type { ArticleItem } from "@/types/article";

export const essaysSeed: ArticleItem[] = [
  {
    id: "1",
    slug: "building-enterprise-ai-products",
    title: "Building Enterprise AI Products That People Actually Use",
    summary:
      "Lessons from shipping AI features in regulated, production environments.",
    publishedAt: "May 18, 2026",
    readingTime: "6 min read",
    featured: true,
    sections: [
      {
        heading: "Start with real workflows",
        body: "The best AI features feel invisible because they fit naturally into how people already work. Before choosing models or tooling, map the human workflow and the decision that needs to become easier.",
      },
      {
        heading: "Trust comes from transparency",
        body: "Enterprise users need to understand where an answer came from, what evidence supports it, and when the system is uncertain. Retrieval, citations, and feedback loops are product features, not implementation details.",
      },
      {
        heading: "Reliability beats novelty",
        body: "A boring system that behaves predictably will outperform a flashy demo that cannot be monitored, evaluated, or debugged. Production AI work is equal parts product design and operational discipline.",
      },
    ],
  },
  {
    id: "2",
    slug: "designing-reliable-ai-systems",
    title: "Designing Reliable AI Systems: From Prompt to Production",
    summary:
      "A practical guide to reliability, evaluation, and observability for AI products.",
    publishedAt: "May 03, 2026",
    readingTime: "8 min read",
    featured: true,
    sections: [
      {
        heading: "Prompts are only one layer",
        body: "Prompt design matters, but durable systems also need clear data boundaries, retrieval quality, deterministic business rules, and well-defined failure states.",
      },
      {
        heading: "Evaluate the workflow",
        body: "Model metrics are useful, but product teams should also evaluate task completion, user correction rate, latency, and the quality of decisions made with the system.",
      },
      {
        heading: "Make debugging normal",
        body: "Logs, traces, feedback, and replayable test cases make AI systems easier to improve. If a team cannot explain an output, it cannot responsibly ship the feature.",
      },
    ],
  },
  {
    id: "3",
    slug: "architecture-decisions-id-make-differently",
    title: "Architecture Decisions I’d Make Differently",
    summary:
      "A retrospective on real systems and the trade-offs that become visible later.",
    publishedAt: "Apr 19, 2026",
    readingTime: "5 min read",
    featured: true,
    sections: [
      {
        heading: "Optimize for change",
        body: "The systems that age well are usually the ones with clear boundaries, boring integration points, and fewer clever abstractions. Change is the default state of useful software.",
      },
      {
        heading: "Keep data contracts visible",
        body: "Many architecture problems are really contract problems. Naming events, schemas, and ownership clearly saves teams from hidden coupling later.",
      },
      {
        heading: "Document decisions while they are fresh",
        body: "A short decision note written at the right time can prevent months of confusion. The goal is not ceremony; it is preserving context for future maintainers.",
      },
    ],
  },
];
