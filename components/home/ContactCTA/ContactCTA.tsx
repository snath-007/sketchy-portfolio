import { ArrowRight } from "lucide-react";
import PaperTape from "@/components/decorative/PaperTape/PaperTape";
import Container from "@/components/layout/Container/Container";
import Button from "@/components/ui/Button/Button";
import styles from "./ContactCTA.module.css";

export default function ContactCTA() {
  return (
    <section className={styles.section}>
      <Container>
        <div className={styles.card}>
          <PaperTape className={styles.tape} />
          <div>
            <h2>Let&apos;s build something interesting.</h2>
            <p>
              Whether it&apos;s AI systems, internal tools, or backend
              architecture, I&apos;m always up for meaningful work.
            </p>
          </div>
          <Button href="mailto:soumen.nath119@gmail.com">
            Get in touch <ArrowRight size={15} />
          </Button>
          <p className={styles.note}>coffee + good conversations</p>
        </div>
      </Container>
    </section>
  );
}
