import { ArrowRight } from "lucide-react";
import Image from "next/image";
import TodaysNotes from "@/components/home/TodaysNotes/TodaysNotes";
import Container from "@/components/layout/Container/Container";
import Button from "@/components/ui/Button/Button";
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
              A notebook of shipped work, architecture decisions, personal
              experiments, and essays from a software engineer working across
              React, FastAPI, cloud systems, and enterprise AI.
            </p>

            <div className={styles.actions}>
              <Button href="/work">
                View Work <ArrowRight size={15} />
              </Button>
              <Button href="/lab" variant="secondary">
                Explore Lab <ArrowRight size={15} />
              </Button>
            </div>
          </div>

          <div className={styles.visual}>
            <div className={styles.diagram} aria-hidden="true">
              <Image
                src="/assets/illustrations/architecture/api-flow.svg"
                alt=""
                width={280}
                height={150}
              />
            </div>
            <TodaysNotes />
            <p className={styles.sideNote}>Ship things that make an impact.</p>
          </div>
        </div>
      </Container>
    </section>
  );
}
