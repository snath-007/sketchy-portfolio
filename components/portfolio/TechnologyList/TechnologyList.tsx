import Chip from "@/components/ui/Chip/Chip";
import styles from "./TechnologyList.module.css";

interface TechnologyListProps {
  technologies: string[];
}

export default function TechnologyList({ technologies }: TechnologyListProps) {
  return (
    <div className={styles.list}>
      {technologies.map((technology) => (
        <Chip key={technology} label={technology} />
      ))}
    </div>
  );
}
