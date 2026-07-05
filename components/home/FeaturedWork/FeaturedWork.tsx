import { ArrowRight } from "lucide-react";
import Link from "next/link";
import Container from "@/components/layout/Container/Container";
import WorkCard from "@/components/portfolio/WorkCard/Workcard";
import SectionHeader from "@/components/shared/SectionHeader/SectionHeader";
import { workSeed } from "@/content/seed/work.seed";

import styles from "./FeaturedWork.module.css";

export default function FeaturedWork() {
  const featured =
    workSeed.find((item) => item.slug === "procurement-legal-ai-assistant") ??
    workSeed[0];

  return (
    <section className={styles.section}>
      <Container>
        <div className={styles.headerRow}>
          <SectionHeader
            eyebrow="Selected Engineering Work"
            title="A featured case study from production."
            description="One deeper engineering story up front, with the full archive available on the Work page."
          />
          <Link href="/work" className={styles.sectionLink}>
            View all work <ArrowRight size={14} />
          </Link>
        </div>

        <div className={styles.grid}>
          <WorkCard work={featured} featured />
        </div>
      </Container>
    </section>
  );
}
