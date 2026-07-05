export interface ArticleSection {
  heading: string;
  body: string;
}

export interface ArticleItem {
  id: string;
  slug: string;
  title: string;
  summary: string;
  publishedAt: string;
  readingTime: string;
  featured: boolean;
  sections: ArticleSection[];
}
