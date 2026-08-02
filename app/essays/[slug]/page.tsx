import { ArrowLeft } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import MermaidDiagram from "@/components/essays/MermaidDiagram/MermaidDiagram";
import RichText from "@/components/essays/RichText/RichText";
import Container from "@/components/layout/Container/Container";
import styles from "@/components/pages/DetailPage/DetailPage.module.css";
import { publishedEssays } from "@/content/seed/essays.seed";
import { toIsoDate } from "@/lib/seo";

interface EssayDetailPageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return publishedEssays.map((article) => ({ slug: article.slug }));
}

export async function generateMetadata({
  params,
}: EssayDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = publishedEssays.find((item) => item.slug === slug);
  if (!article)
    return { title: "Essays", robots: { index: false, follow: false } };
  const path = `/essays/${article.slug}`;
  return {
    title: article.title,
    description: article.summary,
    alternates: { canonical: path },
    openGraph: {
      type: "article",
      url: path,
      title: article.title,
      description: article.summary,
      publishedTime: toIsoDate(article.publishedAt),
      authors: ["Soumen Nath"],
    },
    twitter: {
      card: "summary_large_image",
      title: article.title,
      description: article.summary,
    },
  };
}

export default async function EssayDetailPage({
  params,
}: EssayDetailPageProps) {
  const { slug } = await params;
  const article = publishedEssays.find((item) => item.slug === slug);

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
            {article.content ? (
              <div className={styles.articleLongform}>
                <RichText content={article.content} />
              </div>
            ) : (
              article.sections.map((section) => (
                <section
                  key={section.heading}
                  className={styles.articleSection}
                >
                  <h2>{section.heading}</h2>
                  {section.body.map((paragraph) => (
                    <RichText key={paragraph} content={paragraph} />
                  ))}
                  {section.bullets && (
                    <ul className={styles.articleList}>
                      {section.bullets.map((bullet) => (
                        <li key={bullet}>
                          <RichText content={bullet} compact />
                        </li>
                      ))}
                    </ul>
                  )}
                  {section.note && (
                    <aside className={styles.articleNote}>
                      <RichText content={section.note} compact />
                    </aside>
                  )}
                  {section.diagram && (
                    <MermaidDiagram
                      title={section.diagram.title}
                      definition={section.diagram.definition}
                    />
                  )}
                </section>
              ))
            )}
          </div>
        </article>
      </Container>
    </main>
  );
}
