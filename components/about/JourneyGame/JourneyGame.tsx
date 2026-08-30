"use client";

import {
  BookOpen,
  BriefcaseBusiness,
  Building2,
  ChevronDown,
  ChevronUp,
  Cloud,
  Code2,
  Gamepad2,
  GraduationCap,
  MapPin,
  MonitorUp,
  School,
  Sparkles,
  TentTree,
  Trophy,
  Wifi,
} from "lucide-react";
import {
  type CSSProperties,
  type KeyboardEvent,
  useEffect,
  useRef,
  useState,
} from "react";
import styles from "./JourneyGame.module.css";

type Vehicle = "bike" | "auto" | "bus" | "train" | "jeep" | "plane";
type Scene =
  | "school"
  | "town"
  | "college"
  | "campus"
  | "classroom"
  | "festival"
  | "corporate"
  | "remote"
  | "sky";

type JourneyLevel = {
  id: string;
  chapter: string;
  year: string;
  location: string;
  title: string;
  story: string;
  quest: string;
  collectible: string;
  vehicle: Vehicle;
  scene: Scene;
  accent: string;
  icon: typeof School;
  workMode?: string;
};

const levels: JourneyLevel[] = [
  {
    id: "holy-cross",
    chapter: "01",
    year: "The early years",
    location: "Silchar",
    title: "Holy Cross School",
    story:
      "The first checkpoint: school corridors, new notebooks, and the quiet beginning of a habit that stayed with me - asking how things work.",
    quest: "Begin with curiosity",
    collectible: "First notebook",
    vehicle: "bike",
    scene: "school",
    accent: "#e1a448",
    icon: School,
  },
  {
    id: "sacred-heart",
    chapter: "02",
    year: "School days",
    location: "Silchar",
    title: "Sacred Heart",
    story:
      "A new campus meant learning to adapt, find my people, and keep moving even when the surroundings changed.",
    quest: "Learn the new map",
    collectible: "Adaptability",
    vehicle: "auto",
    scene: "town",
    accent: "#d96945",
    icon: BookOpen,
  },
  {
    id: "capitanio",
    chapter: "03",
    year: "School days",
    location: "Silchar",
    title: "St. Capitanio School",
    story:
      "Another chapter of school life, friendships, routines, and small experiences that slowly shaped confidence.",
    quest: "Build confidence",
    collectible: "Friendships",
    vehicle: "bus",
    scene: "school",
    accent: "#4e79bd",
    icon: School,
  },
  {
    id: "hemangini",
    chapter: "04",
    year: "Junior college",
    location: "Silchar",
    title: "Hemangini Dey Memorial Junior College",
    story:
      "The road started widening. Subjects became choices, choices became direction, and the future felt a little less abstract.",
    quest: "Choose a direction",
    collectible: "New perspective",
    vehicle: "bus",
    scene: "college",
    accent: "#8d6bc3",
    icon: GraduationCap,
  },
  {
    id: "assam-university",
    chapter: "05",
    year: "University",
    location: "Assam University, Silchar",
    title: "A bigger world of ideas",
    story:
      "University brought independence, deeper learning, and the first sense that technology could become more than an interest.",
    quest: "Explore what is possible",
    collectible: "Graduation cap",
    vehicle: "bus",
    scene: "campus",
    accent: "#4f936e",
    icon: GraduationCap,
  },
  {
    id: "teaching",
    chapter: "06",
    year: "Teaching chapter",
    location: "Karimganj",
    title: "Learning by teaching",
    story:
      "A public-transport ride from Silchar opened a teaching chapter. Explaining something clearly became its own kind of engineering.",
    quest: "Help someone understand",
    collectible: "Chalk and patience",
    vehicle: "bus",
    scene: "classroom",
    accent: "#c55c59",
    icon: BookOpen,
  },
  {
    id: "adventures",
    chapter: "07",
    year: "Adventure side quest",
    location: "Ziro, Arunachal Pradesh",
    title: "Music, camps, hills, and open roads",
    story:
      "Camping and festival volunteering in Ziro added a different education: improvisation, community, weather, music, and unfamiliar roads.",
    quest: "Follow the music",
    collectible: "Festival wristband",
    vehicle: "jeep",
    scene: "festival",
    accent: "#e05d78",
    icon: TentTree,
  },
  {
    id: "first-it-job",
    chapter: "08",
    year: "2022",
    location: "Guwahati",
    title: "The first IT job",
    story:
      "A long train journey led to the first professional checkpoint in technology: deadlines, teammates, users, and software that had to work beyond my own screen.",
    quest: "Ship the first build",
    collectible: "First office ID card",
    vehicle: "train",
    scene: "corporate",
    accent: "#367dc0",
    icon: Code2,
    workMode: "On-site corporate",
  },
  {
    id: "triedatum",
    chapter: "09",
    year: "2023",
    location: "Remote / location-independent",
    title: "Joining TrieDatum",
    story:
      "Remote work brought enterprise systems, data platforms, AI workflows, and a shift from writing features to thinking in products and systems.",
    quest: "Level up the craft",
    collectible: "Remote workstation",
    vehicle: "train",
    scene: "remote",
    accent: "#7257d3",
    icon: BriefcaseBusiness,
    workMode: "Working remotely",
  },
  {
    id: "bangalore",
    chapter: "10",
    year: "2025",
    location: "Guwahati → Silchar → Bangalore",
    title: "A flight into the next chapter",
    story:
      "The final move looped from Guwahati back home to Silchar, then took flight to Bangalore while remote work continued.",
    quest: "Start the next level",
    collectible: "A new remote basecamp",
    vehicle: "plane",
    scene: "sky",
    accent: "#e4773d",
    icon: Building2,
    workMode: "Remote from Bangalore",
  },
];

export default function JourneyGame() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [mobileFlipped, setMobileFlipped] = useState(false);
  const levelRefs = useRef<Array<HTMLElement | null>>([]);
  const activeLevel = levels[activeIndex];
  const ActiveLevelIcon = activeLevel.icon;
  const progress = (activeIndex / (levels.length - 1)) * 100;

  useEffect(() => {
    const nodes = levelRefs.current.filter(
      (node): node is HTMLElement => node !== null,
    );
    const observer = new IntersectionObserver(
      (entries) => {
        const mostVisible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (!mostVisible) return;
        const nextIndex = Number(
          (mostVisible.target as HTMLElement).dataset.level,
        );
        setActiveIndex((current) =>
          current === nextIndex ? current : nextIndex,
        );
      },
      { rootMargin: "-24% 0px -48%", threshold: [0.2, 0.45, 0.7] },
    );
    nodes.forEach((node) => {
      observer.observe(node);
    });
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const media = window.matchMedia("(max-width: 560px)");
    const storyIndex = activeIndex;
    let flipTimer: ReturnType<typeof setTimeout> | undefined;
    let backTimer: ReturnType<typeof setTimeout> | undefined;
    let advanceTimer: ReturnType<typeof setTimeout> | undefined;

    const clearStoryTimers = () => {
      if (flipTimer) clearTimeout(flipTimer);
      if (backTimer) clearTimeout(backTimer);
      if (advanceTimer) clearTimeout(advanceTimer);
    };

    const scheduleStory = () => {
      clearStoryTimers();
      if (!media.matches) return;

      setMobileFlipped(false);
      flipTimer = setTimeout(() => setMobileFlipped(true), 2400);
      backTimer = setTimeout(() => setMobileFlipped(false), 6900);
      advanceTimer = setTimeout(() => {
        setActiveIndex((storyIndex + 1) % levels.length);
      }, 8200);
    };

    scheduleStory();
    media.addEventListener("change", scheduleStory);
    return () => {
      clearStoryTimers();
      media.removeEventListener("change", scheduleStory);
    };
  }, [activeIndex]);

  const goToLevel = (index: number) => {
    const nextIndex = Math.min(Math.max(index, 0), levels.length - 1);
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    levelRefs.current[nextIndex]?.scrollIntoView({
      behavior: reduceMotion ? "auto" : "smooth",
      block: "center",
    });
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLElement>) => {
    const nextKeys = ["ArrowDown", "ArrowRight", "s", "d"];
    const previousKeys = ["ArrowUp", "ArrowLeft", "w", "a"];
    if (nextKeys.includes(event.key)) {
      event.preventDefault();
      goToLevel(activeIndex + 1);
    }
    if (previousKeys.includes(event.key)) {
      event.preventDefault();
      goToLevel(activeIndex - 1);
    }
  };

  const changeMobileLevel = (index: number) => {
    setActiveIndex(Math.min(Math.max(index, 0), levels.length - 1));
    setMobileFlipped(false);
  };

  return (
    <section
      className={styles.journey}
      id="journey"
      onKeyDown={handleKeyDown}
      role="application"
      aria-label="Interactive journey through Soumen Nath's life"
      style={
        {
          "--journey-accent": activeLevel.accent,
          "--journey-progress": progress.toString().concat("%"),
        } as CSSProperties
      }
    >
      <div className={styles.gameHeader}>
        <div>
          <Gamepad2 className={styles.gameHeaderIcon} size={16} />
          <span>Journey mode</span>
        </div>
        <p>Scroll, click a checkpoint, or use arrow keys</p>
        <span className={styles.saveStatus}>
          <i /> Story in motion
        </span>
      </div>

      <div className={styles.mobileJourney}>
        <div className={styles.mobilePerspective}>
          <div
            className={styles.mobileBox}
            data-flipped={mobileFlipped ? "true" : "false"}
          >
            <button
              className={`${styles.mobileFace} ${styles.mobileFront}`}
              type="button"
              onClick={() => setMobileFlipped(true)}
              aria-label={`Show details for ${activeLevel.title}`}
              aria-pressed={mobileFlipped}
              tabIndex={mobileFlipped ? -1 : 0}
            >
              <span className={styles.legoStuds} aria-hidden="true">
                <i />
                <i />
                <i />
                <i />
              </span>
              <span className={styles.mobileScene} aria-hidden="true">
                <i />
                <i />
                <i />
                <ActiveLevelIcon size={42} />
              </span>
              <small>
                Level {activeLevel.chapter} / {activeLevel.year}
              </small>
              <strong>{activeLevel.title}</strong>
              <span>{activeLevel.location}</span>
              <em>Tap to rotate + read the phase</em>
            </button>

            <section
              className={`${styles.mobileFace} ${styles.mobileBack}`}
              aria-hidden={!mobileFlipped}
            >
              <small>Phase {activeLevel.chapter}</small>
              <h2>{activeLevel.title}</h2>
              <p>{activeLevel.story}</p>
              <dl>
                <div>
                  <dt>Quest</dt>
                  <dd>{activeLevel.quest}</dd>
                </div>
                <div>
                  <dt>Collected</dt>
                  <dd>{activeLevel.collectible}</dd>
                </div>
              </dl>
              <button
                type="button"
                onClick={() => setMobileFlipped(false)}
                tabIndex={mobileFlipped ? 0 : -1}
              >
                Back to animation
              </button>
            </section>
          </div>
        </div>

        <div className={styles.mobilePhaseControls}>
          <button
            type="button"
            onClick={() => changeMobileLevel(activeIndex - 1)}
            disabled={activeIndex === 0}
            aria-label="Previous journey phase"
          >
            <ChevronUp />
          </button>
          <span>
            Phase {activeIndex + 1} of {levels.length}
          </span>
          <button
            type="button"
            onClick={() => changeMobileLevel(activeIndex + 1)}
            disabled={activeIndex === levels.length - 1}
            aria-label="Next journey phase"
          >
            <ChevronDown />
          </button>
        </div>
      </div>

      <div className={styles.journeyGrid}>
        <div className={styles.routeColumn}>
          <div className={styles.routeLine} aria-hidden="true">
            <i />
          </div>
          {levels.map((level, index) => {
            const Icon = level.icon;
            const isActive = index === activeIndex;
            const isPassed = index < activeIndex;
            return (
              <article
                className={[
                  styles.level,
                  isActive ? styles.activeLevel : "",
                  isPassed ? styles.passedLevel : "",
                ].join(" ")}
                data-level={index}
                key={level.id}
                ref={(node) => {
                  levelRefs.current[index] = node;
                }}
              >
                <button
                  className={styles.checkpoint}
                  type="button"
                  onClick={() => goToLevel(index)}
                  aria-label={`Go to ${level.title}`}
                  aria-current={isActive ? "step" : undefined}
                >
                  <span>{isPassed ? "✓" : level.chapter}</span>
                </button>
                <div className={styles.levelCard}>
                  <div className={styles.levelMeta}>
                    <span>{level.year}</span>
                    <span>
                      <MapPin size={12} /> {level.location}
                    </span>
                  </div>
                  <div className={styles.levelTitle}>
                    <span className={styles.levelIcon}>
                      <Icon size={21} />
                    </span>
                    <div>
                      <small>LEVEL {level.chapter}</small>
                      <h2>{level.title}</h2>
                    </div>
                  </div>
                  <p>{level.story}</p>
                  <div className={styles.questRow}>
                    <span>
                      <Trophy size={13} /> Quest
                    </span>
                    <strong>{level.quest}</strong>
                  </div>
                  <div className={styles.collectible}>
                    <Sparkles size={13} />
                    <span>Collected:</span>
                    <strong>{level.collectible}</strong>
                  </div>
                  {level.workMode ? (
                    <div className={styles.workMode}>
                      <Wifi size={13} /> {level.workMode}
                    </div>
                  ) : null}
                </div>
              </article>
            );
          })}
        </div>

        <aside
          className={[
            styles.stage,
            styles[activeLevel.scene.concat("Scene")],
          ].join(" ")}
          data-level-id={activeLevel.id}
          aria-live="polite"
        >
          <div className={styles.hud}>
            <div>
              <small>LEVEL</small>
              <strong>{activeLevel.chapter}</strong>
            </div>
            <div>
              <small>YEAR</small>
              <strong>{activeLevel.year}</strong>
            </div>
            <div className={styles.hudLocation}>
              <small>LOCATION</small>
              <strong>{activeLevel.location}</strong>
            </div>
          </div>
          <div className={styles.progressBar}>
            <i />
            <span>{Math.round(progress)}%</span>
          </div>
          <div className={styles.world} aria-hidden="true">
            <div className={styles.sun} />
            <div className={styles.clouds}>
              <Cloud />
              <Cloud />
              <Cloud />
            </div>
            <div className={styles.stars}>
              <i />
              <i />
              <i />
              <i />
              <i />
            </div>
            <div className={styles.mountains}>
              <i />
              <i />
              <i />
            </div>
            <div className={styles.landmark}>
              <span />
              <span />
              <span />
              <strong />
            </div>
            <div className={styles.festival}>
              <span />
              <i />
              <i />
            </div>
            <div className={styles.road}>
              <i />
              <i />
              <i />
              <i />
            </div>
            <div
              className={[styles.vehicle, styles[activeLevel.vehicle]].join(
                " ",
              )}
              key={activeLevel.id}
            >
              <span className={styles.vehicleBody} />
              <span className={styles.vehicleCabin} />
              <span className={styles.vehicleDetail} />
              <span className={styles.rider} />
              <span className={styles.wheelOne} />
              <span className={styles.wheelTwo} />
              <i className={styles.speedLine} />
            </div>
          </div>
          <div className={styles.stageCaption}>
            <span>CURRENT QUEST</span>
            <strong>{activeLevel.quest}</strong>
            {activeLevel.workMode ? (
              <small>
                <MonitorUp size={13} /> {activeLevel.workMode}
              </small>
            ) : null}
          </div>
          <div className={styles.controls}>
            <button
              type="button"
              onClick={() => goToLevel(activeIndex - 1)}
              disabled={activeIndex === 0}
              aria-label="Previous journey level"
            >
              <ChevronUp />
            </button>
            <button
              type="button"
              onClick={() => goToLevel(activeIndex + 1)}
              disabled={activeIndex === levels.length - 1}
              aria-label="Next journey level"
            >
              <ChevronDown />
            </button>
          </div>
        </aside>
      </div>
    </section>
  );
}
