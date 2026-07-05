import { ArrowRight } from "lucide-react";
import Link from "next/link";
import Container from "@/components/layout/Container/Container";
import ProjectCard from "@/components/portfolio/ProjectCard/ProjectCard";
import SectionHeader from "@/components/shared/SectionHeader/SectionHeader";
import { labSeed } from "@/content/seed/lab.seed";
import styles from "./FeaturedLab.module.css";

export default function FeaturedLab() {
  const featured = labSeed.filter((item) => item.featured);

  return (
    <section className={styles.section}>
      <Container>
        <div className={styles.headerRow}>
          <SectionHeader
            eyebrow="Lab Notes"
            title="Experiments, side quests, and passion projects."
            description="Small products and technical experiments I build to explore ideas outside day-to-day work."
          />
          <Link href="/lab" className={styles.sectionLink}>
            Explore all labs <ArrowRight size={14} />
          </Link>
        </div>

        <div className={styles.grid}>
          {featured.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </Container>
    </section>
  );
}
