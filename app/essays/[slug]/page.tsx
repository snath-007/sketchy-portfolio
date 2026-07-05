import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import Container from "@/components/layout/Container/Container";
import styles from "@/components/pages/DetailPage/DetailPage.module.css";
import { essaysSeed } from "@/content/seed/essays.seed";

interface EssayDetailPageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return essaysSeed.map((article) => ({ slug: article.slug }));
}

export async function generateMetadata({ params }: EssayDetailPageProps) {
  const { slug } = await params;
  const article = essaysSeed.find((item) => item.slug === slug);

  return {
    title: article ? `${article.title} | Essays` : "Essays",
    description: article?.summary,
  };
}

export default async function EssayDetailPage({
  params,
}: EssayDetailPageProps) {
  const { slug } = await params;
  const article = essaysSeed.find((item) => item.slug === slug);

  if (!article) {
    notFound();
  }

  return (
    <main className={styles.page}>
      <Container>
        <Link href="/essays" className={styles.backLink}>
          <ArrowLeft size={14} /> Back to Essays
        </Link>

        <article className={styles.articleBody}>
          <p className={styles.eyebrow}>
            {article.publishedAt} - {article.readingTime}
          </p>
          <h1 className={styles.title}>{article.title}</h1>
          <p className={styles.description}>{article.summary}</p>

          <div className={styles.articleContent}>
            {article.sections.map((section) => (
              <section key={section.heading} className={styles.articleSection}>
                <h2>{section.heading}</h2>
                <p>{section.body}</p>
              </section>
            ))}
          </div>
        </article>
      </Container>
    </main>
  );
}
