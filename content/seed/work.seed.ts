import type { WorkItem } from "@/types/work";

export const workSeed: WorkItem[] = [
  {
    id: "genie",
    slug: "genie",
    title: "GENiE Legal Assistant",
    category: "Enterprise AI",
    summary:
      "Built an enterprise legal AI platform using FastAPI, Streamlit and Azure OpenAI.",
    technologies: ["FastAPI", "Streamlit", "AWS", "Azure OpenAI", "DynamoDB"],
    featured: true,
  },
  {
    id: "supply-chain-cortex",
    slug: "supply-chain-cortex",
    title: "Supply Chain Cortex",
    category: "Data + AI",
    summary:
      "AI-powered analytics platform with natural language SQL, anomaly detection, and functional-area intelligence.",
    technologies: ["Snowflake", "Cortex", "Streamlit", "AWS", "S3"],
    featured: true,
  },
];
