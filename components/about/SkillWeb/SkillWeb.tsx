"use client";

import {
  Braces,
  CloudCog,
  Cpu,
  Database,
  Layers3,
  Network,
  Sparkles,
} from "lucide-react";
import { type CSSProperties, Fragment, useEffect, useState } from "react";
import styles from "./SkillWeb.module.css";

type SkillGroup = "agents" | "backend" | "frontend" | "data" | "cloud";

type SkillNode = {
  name: string;
  group: SkillGroup;
  x: number;
  y: number;
  length: number;
  angle: number;
  delay: number;
};

const groups: Record<
  SkillGroup,
  {
    label: string;
    color: string;
    description: string;
    icon: typeof Network;
  }
> = {
  agents: {
    label: "AI & agents",
    color: "#d85d76",
    icon: Cpu,
    description:
      "Agent workflows, retrieval systems, evaluation, and document intelligence.",
  },
  backend: {
    label: "Backend",
    color: "#d89135",
    icon: Braces,
    description:
      "Reliable APIs, workflow services, integrations, and asynchronous systems.",
  },
  frontend: {
    label: "Frontend",
    color: "#4c79c4",
    icon: Layers3,
    description:
      "Clear interfaces that make complicated products feel approachable.",
  },
  data: {
    label: "Data",
    color: "#4c9670",
    icon: Database,
    description:
      "Governed data platforms, search, analytics, and operational evidence.",
  },
  cloud: {
    label: "Cloud & delivery",
    color: "#8564c4",
    icon: CloudCog,
    description:
      "Infrastructure and delivery practices that carry products into production.",
  },
};

const groupOrder: SkillGroup[] = [
  "agents",
  "backend",
  "frontend",
  "data",
  "cloud",
];

const constellationPositions: Record<
  SkillGroup,
  Array<{ x: number; y: number }>
> = {
  agents: [
    { x: 19, y: 34 },
    { x: 80, y: 29 },
    { x: 73, y: 76 },
  ],
  backend: [
    { x: 17, y: 70 },
    { x: 37, y: 27 },
    { x: 84, y: 61 },
  ],
  frontend: [
    { x: 18, y: 31 },
    { x: 82, y: 38 },
    { x: 31, y: 78 },
  ],
  data: [
    { x: 16, y: 66 },
    { x: 48, y: 24 },
    { x: 84, y: 69 },
  ],
  cloud: [
    { x: 16, y: 38 },
    { x: 82, y: 31 },
    { x: 69, y: 78 },
  ],
};

const skills: SkillNode[] = [
  {
    name: "LangGraph",
    group: "agents",
    x: 26,
    y: 17,
    length: 31,
    angle: -135,
    delay: 0,
  },
  {
    name: "RAG",
    group: "agents",
    x: 12,
    y: 36,
    length: 39,
    angle: -160,
    delay: 1.1,
  },
  {
    name: "LLM systems",
    group: "agents",
    x: 11,
    y: 61,
    length: 39,
    angle: 165,
    delay: 2.3,
  },
  {
    name: "FastAPI",
    group: "backend",
    x: 24,
    y: 78,
    length: 34,
    angle: 128,
    delay: 0.7,
  },
  {
    name: "Python",
    group: "backend",
    x: 43,
    y: 90,
    length: 41,
    angle: 100,
    delay: 1.7,
  },
  {
    name: "Node.js",
    group: "backend",
    x: 60,
    y: 88,
    length: 40,
    angle: 76,
    delay: 2.8,
  },
  {
    name: "React",
    group: "frontend",
    x: 80,
    y: 77,
    length: 38,
    angle: 42,
    delay: 0.3,
  },
  {
    name: "Next.js",
    group: "frontend",
    x: 92,
    y: 57,
    length: 43,
    angle: 10,
    delay: 1.4,
  },
  {
    name: "TypeScript",
    group: "frontend",
    x: 87,
    y: 34,
    length: 40,
    angle: -24,
    delay: 2.5,
  },
  {
    name: "Snowflake",
    group: "data",
    x: 72,
    y: 14,
    length: 34,
    angle: -55,
    delay: 0.9,
  },
  {
    name: "PostgreSQL",
    group: "data",
    x: 51,
    y: 7,
    length: 43,
    angle: -89,
    delay: 2,
  },
  {
    name: "Redis",
    group: "data",
    x: 35,
    y: 34,
    length: 19,
    angle: -126,
    delay: 3.1,
  },
  {
    name: "AWS",
    group: "cloud",
    x: 68,
    y: 35,
    length: 23,
    angle: -42,
    delay: 0.5,
  },
  {
    name: "GCP",
    group: "cloud",
    x: 36,
    y: 63,
    length: 18,
    angle: 138,
    delay: 1.6,
  },
  {
    name: "Docker",
    group: "cloud",
    x: 65,
    y: 65,
    length: 21,
    angle: 47,
    delay: 2.7,
  },
];

export default function SkillWeb() {
  const [activeGroup, setActiveGroup] = useState<SkillGroup | null>(null);
  const [mobileGroup, setMobileGroup] = useState<SkillGroup>("agents");
  const active = activeGroup ? groups[activeGroup] : null;
  const mobileGroupDetails = groups[mobileGroup];
  const mobileSkills = skills.filter((skill) => skill.group === mobileGroup);
  const mobilePositions = constellationPositions[mobileGroup];

  useEffect(() => {
    const media = window.matchMedia("(max-width: 560px)");
    let slideshow: ReturnType<typeof setInterval> | undefined;

    const syncSlideshow = () => {
      if (slideshow) clearInterval(slideshow);
      slideshow = undefined;
      if (!media.matches) return;

      slideshow = setInterval(() => {
        setMobileGroup((current) => {
          const currentIndex = groupOrder.indexOf(current);
          return groupOrder[(currentIndex + 1) % groupOrder.length];
        });
      }, 4800);
    };

    syncSlideshow();
    media.addEventListener("change", syncSlideshow);
    return () => {
      if (slideshow) clearInterval(slideshow);
      media.removeEventListener("change", syncSlideshow);
    };
  }, []);

  return (
    <section className={styles.section} aria-labelledby="skill-web-title">
      <section
        className={styles.mobileConstellation}
        aria-labelledby="mobile-skill-web-title"
      >
        <header className={styles.mobileHeading}>
          <p className={styles.eyebrow}>
            <Network size={14} /> Skills / constellation scan
          </p>
          <h2 id="mobile-skill-web-title">
            One connected domain <em>at a time.</em>
          </h2>
        </header>

        <div
          className={styles.constellationStage}
          key={mobileGroup}
          style={
            {
              "--constellation-color": mobileGroupDetails.color,
            } as CSSProperties
          }
        >
          <svg
            className={styles.constellationLines}
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            {mobilePositions.map((position, index) => (
              <line
                key={mobileSkills[index].name}
                x1="50"
                y1="54"
                x2={position.x}
                y2={position.y}
              />
            ))}
          </svg>

          <div className={styles.mobileCore}>
            <Sparkles size={18} />
            <small>{mobileGroupDetails.label}</small>
            <strong>Connected craft</strong>
            <p>{mobileGroupDetails.description}</p>
          </div>

          {mobileSkills.map((skill, index) => (
            <span
              className={styles.constellationNode}
              key={skill.name}
              style={
                {
                  "--node-x": `${mobilePositions[index].x}%`,
                  "--node-y": `${mobilePositions[index].y}%`,
                  "--node-delay": `${index * 0.24}s`,
                } as CSSProperties
              }
            >
              <i />
              <strong>{skill.name}</strong>
            </span>
          ))}
        </div>

        <div
          className={styles.consoleControls}
          role="tablist"
          aria-label="Choose a skill constellation"
        >
          {groupOrder.map((key) => {
            const group = groups[key];
            const Icon = group.icon;
            return (
              <button
                type="button"
                role="tab"
                key={key}
                aria-selected={mobileGroup === key}
                aria-label={`Show ${group.label} constellation`}
                title={group.label}
                onClick={() => setMobileGroup(key)}
              >
                <Icon aria-hidden="true" />
                <span>{group.label}</span>
              </button>
            );
          })}
        </div>
        <p className={styles.slideStatus} aria-live="polite">
          Auto scan {groupOrder.indexOf(mobileGroup) + 1} / {groupOrder.length}
        </p>
      </section>

      <fieldset
        className={styles.web}
        aria-label="Interactive skill connections"
        data-filtering={activeGroup ? "true" : "false"}
        onMouseLeave={() => setActiveGroup(null)}
      >
        <div className={styles.webHeading}>
          <p className={styles.eyebrow}>
            <Network size={14} /> Skills / connected, not collected
          </p>
          <h2 id="skill-web-title">
            The interesting work happens <em>between</em> the tools.
          </h2>
        </div>
        <span className={styles.orbitOne} aria-hidden="true" />
        <span className={styles.orbitTwo} aria-hidden="true" />
        <span className={styles.orbitThree} aria-hidden="true" />

        {skills.map((skill) => {
          const group = groups[skill.group];
          const isActive = !activeGroup || activeGroup === skill.group;
          const customStyle = {
            "--skill-x": `${skill.x}%`,
            "--skill-y": `${skill.y}%`,
            "--skill-color": group.color,
            "--skill-delay": `${skill.delay}s`,
            "--line-length": `${skill.length}%`,
            "--line-angle": `${skill.angle}deg`,
          } as CSSProperties;

          return (
            <Fragment key={skill.name}>
              <span
                className={styles.connector}
                data-active={isActive ? "true" : "false"}
                style={customStyle}
                aria-hidden="true"
              >
                <i />
              </span>
              <div
                className={styles.skillItem}
                data-active={isActive ? "true" : "false"}
                style={customStyle}
              >
                <button
                  className={styles.skillNode}
                  type="button"
                  aria-pressed={activeGroup === skill.group}
                  onClick={() =>
                    setActiveGroup((current) =>
                      current === skill.group ? null : skill.group,
                    )
                  }
                  onFocus={() => setActiveGroup(skill.group)}
                  onMouseEnter={() => setActiveGroup(skill.group)}
                >
                  <i />
                  {skill.name}
                </button>
              </div>
            </Fragment>
          );
        })}

        <div
          className={styles.core}
          style={
            {
              "--core-color": active?.color ?? "#e06b45",
            } as CSSProperties
          }
        >
          <Sparkles size={18} />
          <small>{active?.label ?? "The connecting idea"}</small>
          <strong>{active ? "Focused craft" : "Systems builder"}</strong>
          <p>
            {active?.description ??
              "Useful products emerge when every layer understands the others."}
          </p>
        </div>
        <div className={styles.legend}>
          {(
            Object.entries(groups) as Array<
              [SkillGroup, (typeof groups)[SkillGroup]]
            >
          ).map(([key, group]) => (
            <button
              type="button"
              key={key}
              aria-pressed={activeGroup === key}
              onClick={() =>
                setActiveGroup((current) => (current === key ? null : key))
              }
            >
              <i style={{ background: group.color }} /> {group.label}
            </button>
          ))}
        </div>
      </fieldset>
    </section>
  );
}
