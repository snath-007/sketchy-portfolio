"use client";

import { ArrowUpRight, Menu, X } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
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
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className={styles.header}>
      <Container>
        <nav
          className={styles.nav}
          onKeyDown={(event) => {
            if (event.key === "Escape") setIsMenuOpen(false);
          }}
        >
          <Link
            href="/"
            className={styles.logo}
            aria-label="Home"
            onClick={() => setIsMenuOpen(false)}
          >
            SN.
          </Link>

          <div className={styles.centerLabel}>Field Notes</div>

          <button
            type="button"
            className={styles.menuButton}
            aria-label={
              isMenuOpen ? "Close navigation menu" : "Open navigation menu"
            }
            aria-expanded={isMenuOpen}
            aria-controls="mobile-navigation"
            onClick={() => setIsMenuOpen((open) => !open)}
          >
            {isMenuOpen ? <X size={18} /> : <Menu size={18} />}
          </button>

          <div
            className={`${styles.links} ${isMenuOpen ? styles.menuOpen : ""}`}
            id="mobile-navigation"
          >
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={styles.link}
                onClick={() => setIsMenuOpen(false)}
              >
                {item.label}
              </Link>
            ))}

            <Link
              href="/resume.pdf"
              className={styles.resume}
              onClick={() => setIsMenuOpen(false)}
            >
              Resume <ArrowUpRight size={14} />
            </Link>

            <div className={styles.themeControl}>
              <span>Theme</span>
              <ThemeToggle />
            </div>
          </div>
        </nav>
      </Container>
    </header>
  );
}
