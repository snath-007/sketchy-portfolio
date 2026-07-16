import type { ComponentPropsWithoutRef } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import styles from "./RichText.module.css";

interface RichTextProps {
  content: string;
  compact?: boolean;
}

function RichLink({
  href = "",
  children,
  ...props
}: ComponentPropsWithoutRef<"a">) {
  const external = /^https?:\/\//.test(href);
  return (
    <a
      href={href}
      {...props}
      {...(external ? { target: "_blank", rel: "noreferrer" } : {})}
    >
      {children}
    </a>
  );
}

export default function RichText({ content, compact = false }: RichTextProps) {
  return (
    <div
      className={
        compact ? `${styles.richText} ${styles.compact}` : styles.richText
      }
    >
      <ReactMarkdown remarkPlugins={[remarkGfm]} components={{ a: RichLink }}>
        {content}
      </ReactMarkdown>
    </div>
  );
}
