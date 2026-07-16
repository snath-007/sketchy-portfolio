import { ArrowRight } from "lucide-react";
import Link from "next/link";
import type { ArticleItem } from "@/types/article";
import styles from "./ArticleCard.module.css";

interface ArticleCardProps {
  article: ArticleItem;
}

export default function ArticleCard({ article }: ArticleCardProps) {
  return (
    <Link
      href={`/essays/${article.slug}`}
      className={styles.cardLink}
      aria-label={`Read ${article.title}`}
    >
      <article className={styles.card}>
        <div className={styles.meta}>
          <span>{article.publishedAt}</span>
          <span>{article.readingTime}</span>
        </div>

        <div className={styles.copy}>
          <h3 className={styles.title}>{article.title}</h3>
          <p className={styles.summary}>{article.summary}</p>
        </div>

        <span className={styles.link} aria-hidden="true">
          <ArrowRight size={17} />
        </span>
      </article>
    </Link>
  );
}
