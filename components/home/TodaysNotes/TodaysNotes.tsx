import Image from "next/image";
import { dashboardSeed } from "@/content/seed/dashboard.seed";
import styles from "./TodaysNotes.module.css";

export default function TodaysNotes() {
  return (
    <aside className={styles.notes}>
      <p className={styles.label}>Today&apos;s Notes</p>

      <div className={styles.block}>
        <h2>Current Sprint</h2>
        <ul>
          {dashboardSeed.sprint.map((item) => (
            <li key={item.label}>
              <span>{item.done ? "☑" : "☐"}</span>
              {item.label}
            </li>
          ))}
        </ul>
      </div>

      <div className={styles.block}>
        <h2>Current Stack</h2>
        <div className={styles.stack}>
          {dashboardSeed.stack.map((item) => (
            <span key={item}>{item}</span>
          ))}
        </div>
      </div>

      <div className={styles.diagram}>
        <Image
          src="/assets/illustrations/architecture/api-flow.svg"
          alt="Sketch-style AI application architecture flow"
          width={520}
          height={260}
        />
      </div>
    </aside>
  );
}
