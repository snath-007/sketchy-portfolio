export interface WorkItem {
  id: string;
  slug: string;
  title: string;
  category: string;
  summary: string;
  technologies: string[];
  featured: boolean;
}
