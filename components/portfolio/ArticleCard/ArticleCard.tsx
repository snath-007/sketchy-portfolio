import Link from "next/link";
import Badge from "@/components/shared/Badge/Badge";
import Card from "@/components/ui/Card/Card";
import type { ArticleItem } from "@/types/article";
import styles from "./ArticleCard.module.css";

interface ArticleCardProps {
  article: ArticleItem;
}

export default function ArticleCard({ article }: ArticleCardProps) {
  return (
    <Card hover className={styles.card}>
      <Badge>Essay</Badge>

      <div>
        <h3 className={styles.title}>{article.title}</h3>
        <p className={styles.meta}>
          {article.publishedAt} · {article.readingTime}
        </p>
      </div>

      <p className={styles.summary}>{article.summary}</p>

      <Link href={`/essays/${article.slug}`} className={styles.link}>
        Read essay →
      </Link>
    </Card>
  );
}
