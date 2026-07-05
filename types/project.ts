export interface ProjectSection {
  title: string;
  body: string;
  bullets?: string[];
}

export interface ProjectWorkflowStep {
  title: string;
  description: string;
}

export interface ProjectItem {
  id: string;
  slug: string;
  title: string;
  summary: string;
  description: string;
  github?: string;
  liveDemo?: string;
  technologies: string[];
  featured: boolean;
  experimented: string[];
  learnings: string[];
  snapshot?: string[];
  problem?: string;
  productIdea?: string;
  workflow?: ProjectWorkflowStep[];
  sections?: ProjectSection[];
  futureDirection?: string[];
  screenshotNeeds?: string[];
}
