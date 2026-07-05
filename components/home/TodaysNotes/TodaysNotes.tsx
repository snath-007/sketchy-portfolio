import { CheckSquare } from "lucide-react";
import PaperTape from "@/components/decorative/PaperTape/PaperTape";
import { dashboardSeed } from "@/content/seed/dashboard.seed";
import styles from "./TodaysNotes.module.css";

export default function TodaysNotes() {
  return (
    <aside className={styles.notes}>
      <PaperTape className={styles.tape} />
      <p className={styles.label}>Today&apos;s Notes</p>

      <ul className={styles.list}>
        {dashboardSeed.sprint.map((item) => (
          <li key={item.label}>
            <CheckSquare size={17} strokeWidth={1.7} />
            <span>{item.label}</span>
          </li>
        ))}
      </ul>
    </aside>
  );
}
