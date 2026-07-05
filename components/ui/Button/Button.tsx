import Link from "next/link";
import type { ReactNode } from "react";
import { cn } from "@/lib/cn";
import styles from "./Button.module.css";

interface ButtonProps {
  children: ReactNode;
  href?: string;
  variant?: "primary" | "secondary" | "ghost";
  className?: string;
}

export default function Button({
  children,
  href,
  variant = "primary",
  className,
}: ButtonProps) {
  const buttonClassName = cn(styles.button, styles[variant], className);

  if (href) {
    return (
      <Link href={href} className={buttonClassName}>
        {children}
      </Link>
    );
  }

  return (
    <button className={buttonClassName} type="button">
      {children}
    </button>
  );
}
