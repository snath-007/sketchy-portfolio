import Link from "next/link";
import { ExternalLink } from "lucide-react";
import Badge from "@/components/shared/Badge/Badge";
import Card from "@/components/ui/Card/Card";
import type { ProjectItem } from "@/types/project";
import TechnologyList from "../TechnologyList/TechnologyList";
import styles from "./ProjectCard.module.css";

interface ProjectCardProps {
  project: ProjectItem;
}

export default function ProjectCard({ project }: ProjectCardProps) {
  return (
    <Card hover className={styles.card}>
      <Badge>Lab Project</Badge>

      <h3 className={styles.title}>{project.title}</h3>

      <p className={styles.summary}>{project.summary}</p>

      <TechnologyList technologies={project.technologies} />

      <div className={styles.actions}>
        {project.liveDemo && (
          <Link href={project.liveDemo} className={styles.link}>
            <ExternalLink size={16} />
            Live Demo
          </Link>
        )}

        {project.github && (
          <Link href={project.github} className={styles.link}>
            <ExternalLink size={16} />
            GitHub
          </Link>
        )}
      </div>
    </Card>
  );
}
