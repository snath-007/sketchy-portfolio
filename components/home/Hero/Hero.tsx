import Container from "@/components/layout/Container/Container";
import Button from "@/components/ui/Button/Button";
import TodaysNotes from "@/components/home/TodaysNotes/TodaysNotes";
import styles from "./Hero.module.css";

export default function Hero() {
  return (
    <section className={styles.hero}>
      <Container>
        <div className={styles.issueBar}>
          <span>Issue 01</span>
          <span>Summer 2026</span>
        </div>

        <div className={styles.grid}>
          <div className={styles.copy}>
            <p className={styles.eyebrow}>Engineering Journal</p>

            <h1 className={styles.title}>
              Building thoughtful AI products and engineering systems.
            </h1>

            <p className={styles.description}>
              I build enterprise AI products, internal developer platforms, and
              engineering systems that scale.
            </p>

            <div className={styles.actions}>
              <Button href="/work">View Engineering Work →</Button>
              <Button href="/lab" variant="secondary">
                Explore Lab →
              </Button>
            </div>

            <p className={styles.annotation}>
              Focus on clarity. Ship with intention.
            </p>
          </div>

          <div className={styles.visual}>
            <p className={styles.sideNote}>
              Turning ideas into systems that create real impact.
            </p>
            <TodaysNotes />
          </div>
        </div>
      </Container>
    </section>
  );
}
