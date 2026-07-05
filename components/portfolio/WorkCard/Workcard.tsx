import Link from "next/link";
import Badge from "@/components/shared/Badge/Badge";
import Card from "@/components/ui/Card/Card";
import type { WorkItem } from "@/types/work";
import TechnologyList from "../TechnologyList/TechnologyList";
import styles from "./WorkCard.module.css";

interface WorkCardProps {
  work: WorkItem;
}

export default function WorkCard({ work }: WorkCardProps) {
  return (
    <Card hover className={styles.card}>
      <Badge>{work.category}</Badge>

      <h3 className={styles.title}>{work.title}</h3>

      <p className={styles.summary}>{work.summary}</p>

      <TechnologyList technologies={work.technologies} />

      <Link href={`/work/${work.slug}`} className={styles.link}>
        View case study →
      </Link>
    </Card>
  );
}
