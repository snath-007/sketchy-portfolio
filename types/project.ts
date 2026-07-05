export interface ProjectItem {
  id: string;
  slug: string;
  title: string;
  summary: string;
  github?: string;
  liveDemo?: string;
  technologies: string[];
  featured: boolean;
}
