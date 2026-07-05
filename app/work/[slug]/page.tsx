import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import Container from "@/components/layout/Container/Container";
import styles from "@/components/pages/DetailPage/DetailPage.module.css";
import { workSeed } from "@/content/seed/work.seed";

interface WorkDetailPageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return workSeed.map((work) => ({ slug: work.slug }));
}

export async function generateMetadata({ params }: WorkDetailPageProps) {
  const { slug } = await params;
  const work = workSeed.find((item) => item.slug === slug);

  return {
    title: work ? `${work.title} | Work` : "Work",
    description: work?.summary,
  };
}

export default async function WorkDetailPage({ params }: WorkDetailPageProps) {
  const { slug } = await params;
  const work = workSeed.find((item) => item.slug === slug);

  if (!work) {
    notFound();
  }

  const hasRichCaseStudy = Boolean(
    work.positioning ||
      work.workflow ||
      work.sections ||
      work.technicalStrengths,
  );

  return (
    <main className={styles.page}>
      <Container>
        <Link href="/work" className={styles.backLink}>
          <ArrowLeft size={14} /> Back to Work
        </Link>

        <section className={styles.hero}>
          <div>
            <p className={styles.eyebrow}>Featured Project</p>
            <h1 className={styles.title}>{work.title}</h1>
            <p className={styles.description}>{work.description}</p>
          </div>

          <aside className={styles.metaCard}>
            <p className={styles.metaTitle}>
              {work.snapshot ? "Project Snapshot" : "Tech Stack"}
            </p>
            {work.snapshot && (
              <ul className={styles.compactList}>
                {work.snapshot.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            )}
            <div className={styles.tags}>
              {work.technologies.map((technology) => (
                <span key={technology} className={styles.tag}>
                  {technology}
                </span>
              ))}
            </div>
          </aside>
        </section>

        {hasRichCaseStudy ? (
          <section className={styles.caseStudyLayout}>
            <div className={styles.caseStudyMain}>
              <section className={styles.sectionBlock}>
                <p className={styles.sectionEyebrow}>Problem</p>
                <h2>What this project is solving</h2>
                <p>{work.problem}</p>
              </section>

              {work.positioning && (
                <section className={styles.sectionBlock}>
                  <p className={styles.sectionEyebrow}>Positioning</p>
                  <h2>From question to completed business workflow</h2>
                  <p>{work.positioning}</p>
                </section>
              )}

              {work.workflow && (
                <section className={styles.sectionBlock}>
                  <p className={styles.sectionEyebrow}>Core Workflow</p>
                  <h2>How the platform moves users through work</h2>
                  <div className={styles.workflowList}>
                    {work.workflow.map((step, index) => (
                      <article key={step.title} className={styles.workflowStep}>
                        <span>{String(index + 1).padStart(2, "0")}</span>
                        <div>
                          <h3>{step.title}</h3>
                          <p>{step.description}</p>
                        </div>
                      </article>
                    ))}
                  </div>
                </section>
              )}

              {work.sections?.map((section) => (
                <section key={section.title} className={styles.sectionBlock}>
                  <p className={styles.sectionEyebrow}>Case Study</p>
                  <h2>{section.title}</h2>
                  <p>{section.body}</p>
                  {section.bullets && (
                    <ul className={styles.checkList}>
                      {section.bullets.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  )}
                </section>
              ))}
            </div>

            <aside className={styles.caseStudyAside}>
              <div className={styles.noteCard}>
                <h2>What I Built</h2>
                <ul className={styles.checkList}>
                  {work.built.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>

              <div className={styles.noteCard}>
                <h2>Impact</h2>
                <ul className={styles.checkList}>
                  {work.impact.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>

              {work.technicalStrengths && (
                <div className={styles.noteCard}>
                  <h2>Technical Strengths</h2>
                  <ul className={styles.checkList}>
                    {work.technicalStrengths.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>
              )}

              {work.screenshotNeeds && (
                <div className={styles.noteCard}>
                  <h2>Useful Screenshots Later</h2>
                  <ul className={styles.compactList}>
                    {work.screenshotNeeds.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>
              )}
            </aside>
          </section>
        ) : (
          <section className={styles.contentGrid}>
            <div>
              <div className={styles.section}>
                <h2>The Problem</h2>
                <p>{work.problem}</p>
              </div>

              <div className={styles.section}>
                <h2>What I Built</h2>
                <ul className={styles.checkList}>
                  {work.built.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            </div>

            <aside className={styles.noteCard}>
              <h2>Impact</h2>
              <ul className={styles.checkList}>
                {work.impact.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </aside>
          </section>
        )}
      </Container>
    </main>
  );
}
