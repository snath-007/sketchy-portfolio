import { cn } from "@/lib/cn";
import styles from "./Badge.module.css";

interface BadgeProps {
  children: React.ReactNode;
  className?: string;
}

export default function Badge({ children, className }: BadgeProps) {
  return <span className={cn(styles.badge, className)}>{children}</span>;
}
