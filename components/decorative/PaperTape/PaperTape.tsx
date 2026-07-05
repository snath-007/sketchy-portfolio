import { cn } from "@/lib/cn";
import styles from "./PaperTape.module.css";

interface PaperTapeProps {
  className?: string;
}

export default function PaperTape({ className }: PaperTapeProps) {
  return <span className={cn(styles.tape, className)} aria-hidden="true" />;
}
