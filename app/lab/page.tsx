import Container from "@/components/layout/Container/Container";
import styles from "@/components/pages/ListingPage/ListingPage.module.css";
import ProjectCard from "@/components/portfolio/ProjectCard/ProjectCard";
import { labSeed } from "@/content/seed/lab.seed";

export const metadata = {
  title: "Lab | Soumen Nath",
  description:
    "Personal experiments, side projects, and technical playgrounds.",
};

export default function LabPage() {
  return (
    <main className={styles.page}>
      <Container>
        <div className={styles.issueBar}>
          <span>Issue 01</span>
          <span>Summer 2026</span>
        </div>

        <header className={styles.hero}>
          <div>
            <p className={styles.eyebrow}>Lab</p>
            <h1 className={styles.title}>Experiments and passion projects.</h1>
          </div>
          <p className={styles.description}>
            Small projects for learning, testing ideas, and exploring tools that
            may become useful in real engineering workflows.
          </p>
        </header>

        <nav className={styles.tabs} aria-label="Lab filters">
          <span>All</span>
          <span>AI/ML</span>
          <span>Tools</span>
          <span>Systems</span>
        </nav>

        <div className={`${styles.cardGrid} ${styles.labGrid}`}>
          {labSeed.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </Container>
    </main>
  );
}
