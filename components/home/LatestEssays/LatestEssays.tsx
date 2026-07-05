import Container from "@/components/layout/Container/Container";
import ArticleCard from "@/components/portfolio/ArticleCard/ArticleCard";
import SectionHeader from "@/components/shared/SectionHeader/SectionHeader";
import { essaysSeed } from "@/content/seed/essays.seed";
import styles from "./LatestEssays.module.css";

export default function LatestEssays() {
  const featured = essaysSeed.filter((item) => item.featured);

  return (
    <section className={styles.section}>
      <Container>
        <SectionHeader
          eyebrow="Essays"
          title="Notes on software, systems, and AI engineering"
          description="Short-form engineering notes, architecture breakdowns, and lessons from building production software."
        />

        <div className={styles.grid}>
          {featured.map((article) => (
            <ArticleCard key={article.id} article={article} />
          ))}
        </div>
      </Container>
    </section>
  );
}
