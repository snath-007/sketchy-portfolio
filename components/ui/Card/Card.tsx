import type { ReactNode } from "react";
import PaperTape from "@/components/decorative/PaperTape/PaperTape";
import { cn } from "@/lib/cn";
import styles from "./Card.module.css";

interface CardProps {
  children: ReactNode;
  hover?: boolean;
  tape?: boolean;
  className?: string;
}

export default function Card({
  children,
  hover = false,
  tape = true,
  className,
}: CardProps) {
  return (
    <article className={cn(styles.card, hover && styles.hover, className)}>
      {tape && <PaperTape />}
      {children}
    </article>
  );
}
