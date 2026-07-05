import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import ThemeToggle from "@/components/layout/ThemeToggle/ThemeToggle";
import Container from "../Container/Container";
import styles from "./Navbar.module.css";

const navItems = [
  { label: "Work", href: "/work" },
  { label: "Lab", href: "/lab" },
  { label: "Essays", href: "/essays" },
  { label: "About", href: "/about" },
];

export default function Navbar() {
  return (
    <header className={styles.header}>
      <Container>
        <nav className={styles.nav}>
          <Link href="/" className={styles.logo} aria-label="Home">
            SN.
          </Link>

          <div className={styles.centerLabel}>Field Notes</div>

          <div className={styles.links}>
            {navItems.map((item) => (
              <Link key={item.href} href={item.href} className={styles.link}>
                {item.label}
              </Link>
            ))}

            <Link href="/resume.pdf" className={styles.resume}>
              Resume <ArrowUpRight size={14} />
            </Link>

            <ThemeToggle />
          </div>
        </nav>
      </Container>
    </header>
  );
}
