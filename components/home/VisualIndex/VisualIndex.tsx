import { ArrowUpRight, Beaker, BriefcaseBusiness, PenLine } from "lucide-react";
import Link from "next/link";
import Container from "@/components/layout/Container/Container";
import styles from "./VisualIndex.module.css";

const routes = [
  {
    href: "/work",
    eyebrow: "01 / Shipped systems",
    title: "Work",
    description: "Production AI, connected products, and enterprise platforms.",
    icon: BriefcaseBusiness,
    visual: "systems",
  },
  {
    href: "/lab",
    eyebrow: "02 / In progress",
    title: "Lab",
    description: "Experiments where rough ideas learn how to work.",
    icon: Beaker,
    visual: "lab",
  },
  {
    href: "/essays",
    eyebrow: "03 / Field notes",
    title: "Essays",
    description:
      "Architecture decisions, AI patterns, and lessons from building.",
    icon: PenLine,
    visual: "notes",
  },
] as const;

export default function VisualIndex() {
  return (
    <section className={styles.section} aria-labelledby="visual-index-title">
      <Container>
        <div className={styles.heading}>
          <p>Choose a route</p>
          <h2 id="visual-index-title">Follow what sparks your curiosity.</h2>
          <span>Three doors into the same engineering practice.</span>
        </div>

        <div className={styles.grid}>
          {routes.map((route) => {
            const Icon = route.icon;
            return (
              <Link
                href={route.href}
                key={route.href}
                className={`${styles.card} ${styles[route.visual]}`}
              >
                <div className={styles.cardTop}>
                  <span>{route.eyebrow}</span>
                  <ArrowUpRight size={18} aria-hidden="true" />
                </div>

                <div className={styles.visual} aria-hidden="true">
                  <span className={styles.orbit} />
                  <span className={styles.orbitSecondary} />
                  <span className={styles.visualCore}>
                    <Icon size={26} />
                  </span>
                  <span className={styles.signalOne} />
                  <span className={styles.signalTwo} />
                  <span className={styles.signalThree} />
                </div>

                <div className={styles.cardCopy}>
                  <h3>{route.title}</h3>
                  <p>{route.description}</p>
                </div>
              </Link>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
