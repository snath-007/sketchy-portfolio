import Container from "@/components/layout/Container/Container";
import styles from "@/components/pages/ListingPage/ListingPage.module.css";
import ArticleCard from "@/components/portfolio/ArticleCard/ArticleCard";
import { essaysSeed } from "@/content/seed/essays.seed";

export const metadata = {
  title: "Essays | Soumen Nath",
  description: "Writing on software, systems, and AI engineering.",
};

export default function EssaysPage() {
  return (
    <main className={styles.page}>
      <Container>
        <div className={styles.issueBar}>
          <span>Issue 01</span>
          <span>Summer 2026</span>
        </div>

        <header className={styles.hero}>
          <div>
            <p className={styles.eyebrow}>Essays</p>
            <h1 className={styles.title}>
              Notes on software and AI engineering.
            </h1>
          </div>
          <p className={styles.description}>
            Practical writing on architecture, product engineering, reliability,
            and lessons from building production systems.
          </p>
        </header>

        <div className={styles.essayList}>
          {essaysSeed.map((article) => (
            <ArticleCard key={article.id} article={article} />
          ))}
        </div>
      </Container>
    </main>
  );
}
