import { ArrowDown, ArrowRight, Gamepad2, Route } from "lucide-react";
import JourneyGame from "@/components/about/JourneyGame/JourneyGame";
import Container from "@/components/layout/Container/Container";
import Button from "@/components/ui/Button/Button";
import styles from "./AboutPage.module.css";

export const metadata = {
  title: "About | Soumen Nath",
  description:
    "An interactive illustrated journey through Soumen Nath's schools, teaching years, adventures, and software engineering career.",
};

export default function AboutPage() {
  return (
    <main className={styles.page}>
      <Container>
        <section className={styles.hero}>
          <div className={styles.heroTopline}>
            <span>PLAYER ONE</span>
            <i />
            <span>ORIGIN STORY</span>
          </div>
          <div className={styles.heroGrid}>
            <div>
              <p className={styles.eyebrow}>
                Soumen&apos;s journey / Level select
              </p>
              <h1>
                Every new place
                <span className={styles.heroAccent}>
                  unlocked a different version of me.
                </span>
              </h1>
            </div>
            <div className={styles.heroAside}>
              <p>
                From school corridors in Silchar to classrooms in Karimganj,
                festival camps across the Northeast, my first IT job in
                Guwahati, and a new chapter in Bangalore.
              </p>
              <a className={styles.startButton} href="#journey">
                Start the journey <ArrowDown size={17} />
              </a>
            </div>
          </div>
          <div className={styles.gameLegend}>
            <span>
              <Gamepad2 size={15} /> Scroll to drive
            </span>
            <span>
              <Route size={15} /> 10 checkpoints
            </span>
            <span>
              <kbd>W</kbd>
              <kbd>S</kbd>
              <span>or arrow keys</span>
            </span>
          </div>
        </section>
      </Container>

      <JourneyGame />

      <Container>
        <section className={styles.closing}>
          <div>
            <p className={styles.eyebrow}>Current level / Bangalore</p>
            <h2>The map ends here. The journey doesn&apos;t.</h2>
            <p>
              I&apos;m still collecting questions, building useful things, and
              looking for the next landscape that changes how I think.
            </p>
          </div>
          <Button href="mailto:soumen.nath119@gmail.com">
            Send a message <ArrowRight size={15} />
          </Button>
        </section>
      </Container>
    </main>
  );
}
