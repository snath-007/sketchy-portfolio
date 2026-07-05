import styles from "./SectionHeader.module.css";

interface SectionHeaderProps {
  eyebrow?: string;
  title: string;
  description?: string;
}

export default function SectionHeader({
  eyebrow,
  title,
  description,
}: SectionHeaderProps) {
  return (
    <header className={styles.header}>
      {eyebrow && <p className={styles.eyebrow}>{eyebrow}</p>}

      <h2>{title}</h2>

      {description && <p>{description}</p>}
    </header>
  );
}
