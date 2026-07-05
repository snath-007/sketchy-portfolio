import { AtSign, Briefcase, Code2 } from "lucide-react";
import Container from "../Container/Container";
import styles from "./Footer.module.css";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <Container>
        <div className={styles.inner}>
          <p>&copy; 2026 Soumen Nath</p>
          <p className={styles.note}>Build with intent. Ship with care.</p>
          <nav className={styles.socials} aria-label="Social links">
            <a href="https://github.com/snath-007" aria-label="GitHub">
              <Code2 size={15} />
            </a>
            <a href="https://linkedin.com/in/nathshoumen" aria-label="LinkedIn">
              <Briefcase size={15} />
            </a>
            <a href="mailto:soumen.nath119@gmail.com" aria-label="Email">
              <AtSign size={15} />
            </a>
          </nav>
        </div>
      </Container>
    </footer>
  );
}
