export interface WorkSection {
  title: string;
  body: string;
  bullets?: string[];
}

export interface WorkWorkflowStep {
  title: string;
  description: string;
}

export interface WorkItem {
  id: string;
  slug: string;
  title: string;
  category: string;
  summary: string;
  description: string;
  technologies: string[];
  featured: boolean;
  problem: string;
  built: string[];
  impact: string[];
  snapshot?: string[];
  positioning?: string;
  workflow?: WorkWorkflowStep[];
  sections?: WorkSection[];
  technicalStrengths?: string[];
  screenshotNeeds?: string[];
}
