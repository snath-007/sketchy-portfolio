import { cn } from "@/lib/cn";
import styles from "./Chip.module.css";

interface ChipProps {
  label: string;
  className?: string;
}

export default function Chip({ label, className }: ChipProps) {
  return <span className={cn(styles.chip, className)}>{label}</span>;
}
