import { ArrowRight } from "lucide-react";
import Container from "@/components/layout/Container/Container";
import styles from "@/components/pages/DetailPage/DetailPage.module.css";
import Button from "@/components/ui/Button/Button";

export const metadata = {
  title: "About | Soumen Nath",
  description:
    "About Soumen Nath, Senior Software Engineer working across full-stack systems and agentic AI products.",
};

export default function AboutPage() {
  return (
    <main className={styles.page}>
      <Container>
        <section className={styles.hero}>
          <div>
            <p className={styles.eyebrow}>About</p>
            <h1 className={styles.title}>
              Senior Software Engineer. Full-stack and agentic AI systems.
            </h1>
            <p className={styles.description}>
              I&apos;m a Bangalore-based software engineer with 4+ years of
              experience building backend systems, full-stack products, and
              agentic AI pipelines for enterprise clients including AstraZeneca,
              Alexion, Bank of America, and HALO.
            </p>
          </div>

          <aside className={styles.metaCard}>
            <p className={styles.metaTitle}>Current Focus</p>
            <ul className={styles.checkList}>
              <li>Multi-agent LLM systems</li>
              <li>Enterprise document automation</li>
              <li>Data governance workflows</li>
              <li>Full-stack product engineering</li>
              <li>Cloud-native backend systems</li>
            </ul>
          </aside>
        </section>

        <section className={styles.contentGrid}>
          <div>
            <div className={styles.section}>
              <h2>Experience</h2>
              <p>
                I currently work at TrieDatum as a Senior Software Engineer,
                building procurement, contracting, data access, analytics, and
                document automation systems. My recent work spans LangGraph
                multi-agent workflows, FastAPI services, Snowflake governance,
                Streamlit internal tools, Android IoT monitoring, and React
                enterprise frontends.
              </p>
            </div>

            <div className={styles.section}>
              <h2>Selected Work</h2>
              <p>
                I&apos;ve helped build an IoT smart baby monitor used by 3,000+
                users, automated Snowflake access provisioning from days to
                minutes with audit-ready reporting, developed supply-chain AI
                analytics workflows, and worked on agentic procurement and legal
                systems using LangGraph, RAG, and cloud services.
              </p>
            </div>

            <div className={styles.section}>
              <h2>Beyond Code</h2>
              <p>
                I like systems that are useful, calm, and easy to reason about.
                This portfolio collects shipped work, lab experiments, and notes
                from building practical AI products rather than one-off demos.
              </p>
            </div>
          </div>

          <aside className={styles.noteCard}>
            <h2>Tech That I Use</h2>
            <div className={styles.tags}>
              {[
                "FastAPI",
                "Node.js",
                "Python",
                "LangGraph",
                "LangChain",
                "React",
                "Next.js",
                "TypeScript",
                "Streamlit",
                "Kotlin",
                "PostgreSQL",
                "Snowflake",
                "DynamoDB",
                "Redis",
                "AWS",
                "GCP",
                "Docker",
                "Airflow",
                "OpenSearch",
                "python-docx",
              ].map((item) => (
                <span key={item} className={styles.tag}>
                  {item}
                </span>
              ))}
            </div>
          </aside>
        </section>

        <div className={styles.actionRow}>
          <Button href="mailto:soumen.nath119@gmail.com">
            Get in touch <ArrowRight size={15} />
          </Button>
        </div>
      </Container>
    </main>
  );
}
