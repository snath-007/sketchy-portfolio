import { cn } from "@/lib/cn";
import styles from "./Divider.module.css";

interface DividerProps {
  className?: string;
}

export default function Divider({ className }: DividerProps) {
  return <div className={cn(styles.divider, className)} />;
}
