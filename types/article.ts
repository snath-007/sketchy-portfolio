export interface ArticleSection {
  heading: string;
  body: string[];
  bullets?: string[];
  note?: string;
  diagram?: {
    title: string;
    definition: string;
  };
}

export interface ArticleItem {
  id: string;
  slug: string;
  title: string;
  summary: string;
  publishedAt: string;
  readingTime: string;
  featured: boolean;
  published: boolean;
  content?: string;
  sections: ArticleSection[];
}
