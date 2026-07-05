import { ArrowRight } from "lucide-react";
import Link from "next/link";
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
        <div className={styles.headerRow}>
          <SectionHeader
            eyebrow="Recent Writing"
            title="Thoughts on software, systems, and AI engineering."
            description="Short engineering notes, architecture breakdowns, and lessons from building production software."
          />
          <Link href="/essays" className={styles.sectionLink}>
            Read all essays <ArrowRight size={14} />
          </Link>
        </div>

        <div className={styles.list}>
          {featured.map((article) => (
            <ArticleCard key={article.id} article={article} />
          ))}
        </div>
      </Container>
    </section>
  );
}
