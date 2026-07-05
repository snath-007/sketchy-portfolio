import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import Container from "@/components/layout/Container/Container";
import styles from "@/components/pages/DetailPage/DetailPage.module.css";
import { labSeed } from "@/content/seed/lab.seed";

interface LabDetailPageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return labSeed.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: LabDetailPageProps) {
  const { slug } = await params;
  const project = labSeed.find((item) => item.slug === slug);

  return {
    title: project ? `${project.title} | Lab` : "Lab",
    description: project?.summary,
  };
}

export default async function LabDetailPage({ params }: LabDetailPageProps) {
  const { slug } = await params;
  const project = labSeed.find((item) => item.slug === slug);

  if (!project) {
    notFound();
  }

  return (
    <main className={styles.page}>
      <Container>
        <Link href="/lab" className={styles.backLink}>
          <ArrowLeft size={14} /> Back to Lab
        </Link>

        <section className={styles.hero}>
          <div>
            <p className={styles.eyebrow}>Lab Project</p>
            <h1 className={styles.title}>{project.title}</h1>
            <p className={styles.description}>{project.description}</p>
          </div>

          <aside className={styles.metaCard}>
            <p className={styles.metaTitle}>Project Snapshot</p>
            {project.snapshot && (
              <ul className={styles.compactList}>
                {project.snapshot.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            )}
            <div className={styles.tags}>
              {project.technologies.map((technology) => (
                <span key={technology} className={styles.tag}>
                  {technology}
                </span>
              ))}
            </div>
          </aside>
        </section>

        <section className={styles.caseStudyLayout}>
          <div className={styles.caseStudyMain}>
            {project.problem && (
              <section className={styles.sectionBlock}>
                <p className={styles.sectionEyebrow}>Problem</p>
                <h2>What RevFlow is trying to solve</h2>
                <p>{project.problem}</p>
              </section>
            )}

            {project.productIdea && (
              <section className={styles.sectionBlock}>
                <p className={styles.sectionEyebrow}>Product Idea</p>
                <h2>Workflow intelligence for revenue teams</h2>
                <p>{project.productIdea}</p>
              </section>
            )}

            {project.workflow && (
              <section className={styles.sectionBlock}>
                <p className={styles.sectionEyebrow}>Core Workflow</p>
                <h2>How the system turns context into action</h2>
                <div className={styles.workflowList}>
                  {project.workflow.map((step, index) => (
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

            {project.sections?.map((section) => (
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
              <h2>What I Experimented With</h2>
              <ul className={styles.checkList}>
                {project.experimented.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>

            <div className={styles.noteCard}>
              <h2>Learnings</h2>
              <ul className={styles.checkList}>
                {project.learnings.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>

            {project.futureDirection && (
              <div className={styles.noteCard}>
                <h2>Future Direction</h2>
                <ul className={styles.checkList}>
                  {project.futureDirection.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            )}

            {project.screenshotNeeds && (
              <div className={styles.noteCard}>
                <h2>Useful Screenshots Later</h2>
                <ul className={styles.compactList}>
                  {project.screenshotNeeds.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            )}
          </aside>
        </section>
      </Container>
    </main>
  );
}
