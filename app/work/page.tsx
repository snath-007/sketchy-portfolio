import Container from "@/components/layout/Container/Container";
import styles from "@/components/pages/ListingPage/ListingPage.module.css";
import WorkCard from "@/components/portfolio/WorkCard/Workcard";
import { workSeed } from "@/content/seed/work.seed";

export const metadata = {
  title: "Work | Soumen Nath",
  description: "Selected engineering work and production systems.",
};

export default function WorkPage() {
  return (
    <main className={styles.page}>
      <Container>
        <div className={styles.issueBar}>
          <span>Issue 01</span>
          <span>Summer 2026</span>
        </div>

        <header className={styles.hero}>
          <div>
            <p className={styles.eyebrow}>Work</p>
            <h1 className={styles.title}>Selected engineering work.</h1>
          </div>
          <p className={styles.description}>
            Production-minded AI systems, data products, and internal tools
            built with a focus on reliability, clarity, and business impact.
          </p>
        </header>

        <nav className={styles.tabs} aria-label="Work filters">
          <span>All</span>
          <span>AI Systems</span>
          <span>Data Platforms</span>
          <span>Knowledge Systems</span>
        </nav>

        <div className={`${styles.cardGrid} ${styles.workGrid}`}>
          {workSeed.map((work) => (
            <WorkCard key={work.id} work={work} />
          ))}
        </div>
      </Container>
    </main>
  );
}
