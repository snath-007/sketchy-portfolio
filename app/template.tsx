import styles from "./template.module.css";

export default function Template({ children }: { children: React.ReactNode }) {
  return <div className={styles.routeFrame}>{children}</div>;
}
