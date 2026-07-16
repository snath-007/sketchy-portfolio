import { ArrowRight } from "lucide-react";
import Link from "next/link";
import Badge from "@/components/shared/Badge/Badge";
import Card from "@/components/ui/Card/Card";
import type { WorkItem } from "@/types/work";
import TechnologyList from "../TechnologyList/TechnologyList";
import styles from "./WorkCard.module.css";

interface WorkCardProps {
  work: WorkItem;
  featured?: boolean;
}

export default function WorkCard({ work, featured = false }: WorkCardProps) {
  return (
    <Link
      href={`/work/${work.slug}`}
      className={styles.cardLink}
      aria-label={`View case study: ${work.title}`}
    >
      <Card hover className={featured ? styles.featuredCard : styles.card}>
        <div className={styles.content}>
          <Badge>{work.category}</Badge>

          <h3 className={styles.title}>{work.title}</h3>

          <p className={styles.summary}>{work.summary}</p>

          <TechnologyList technologies={work.technologies} />

          <span className={styles.link} aria-hidden="true">
            View case study <ArrowRight size={14} />
          </span>
        </div>
      </Card>
    </Link>
  );
}
