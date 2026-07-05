import Container from "../Container/Container";
import styles from "./Footer.module.css";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <Container>
        <div className={styles.inner}>
          <p>© 2026 Soumen Nath</p>
          <p>Built with React, Next.js, and too much coffee.</p>
        </div>
      </Container>
    </footer>
  );
}
