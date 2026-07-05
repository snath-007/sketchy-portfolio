import SectionHeader from "@/components/shared/SectionHeader/SectionHeader";
import WorkCard from "@/components/portfolio/WorkCard/Workcard";
import Container from "@/components/layout/Container/Container";
import { workSeed } from "@/content/seed/work.seed";

import styles from "./FeaturedWork.module.css";

export default function FeaturedWork() {
  const featured = workSeed.filter((item) => item.featured);

  return (
    <section className={styles.section}>
      <Container>
        <SectionHeader
          eyebrow="Engineering"
          title="Selected Engineering Work"
          description="A selection of enterprise systems, AI applications, and products I've contributed to."
        />

        <div className={styles.grid}>
          {featured.map((work) => (
            <WorkCard key={work.id} work={work} />
          ))}
        </div>
      </Container>
    </section>
  );
}
