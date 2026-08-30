import { ArrowRight } from "lucide-react";
import Link from "next/link";
import Badge from "@/components/shared/Badge/Badge";
import Card from "@/components/ui/Card/Card";
import type { ProjectItem } from "@/types/project";
import TechnologyList from "../TechnologyList/TechnologyList";
import styles from "./ProjectCard.module.css";

interface ProjectCardProps {
  project: ProjectItem;
  blended?: boolean;
}

export default function ProjectCard({
  project,
  blended = false,
}: ProjectCardProps) {
  return (
    <Card
      hover
      className={`${styles.card} ${blended ? styles.blendedCard : ""}`}
    >
      <div className={styles.content}>
        <Badge>Lab Project</Badge>

        <h3 className={styles.title}>{project.title}</h3>

        <p className={styles.summary}>{project.summary}</p>

        <TechnologyList technologies={project.technologies} />

        <div className={styles.actions}>
          <Link href={`/lab/${project.slug}`} className={styles.link}>
            View project <ArrowRight size={14} />
          </Link>

          {project.github && (
            <Link
              href={project.github}
              className={styles.link}
              target="_blank"
              rel="noreferrer"
            >
              View code <ArrowRight size={14} />
            </Link>
          )}

          {project.liveDemo && project.liveDemo !== "#" && (
            <Link
              href={project.liveDemo}
              className={styles.link}
              target="_blank"
              rel="noreferrer"
            >
              Live demo <ArrowRight size={14} />
            </Link>
          )}
        </div>
      </div>
    </Card>
  );
}
