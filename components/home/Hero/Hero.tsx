"use client";

import { ArrowRight, Hand, MousePointer2, Move, Sparkles } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { type CSSProperties, type PointerEvent, useRef, useState } from "react";
import styles from "./Hero.module.css";

const hotspots = [
  {
    id: "architecture",
    label: "System architecture",
    kicker: "How I think",
    detail:
      "Composable services, observable workflows, and boundaries that remain useful as products grow.",
    href: "/essays/designing-frontend-backend-architecture",
    x: "67%",
    y: "29%",
  },
  {
    id: "ai",
    label: "Applied AI",
    kicker: "What I build",
    detail:
      "Grounded assistants, agentic workflows, retrieval systems, and human-reviewed automation.",
    href: "/work/procurement-legal-ai-assistant",
    x: "57%",
    y: "51%",
  },
  {
    id: "lab",
    label: "The lab",
    kicker: "Where I experiment",
    detail:
      "Small products and technical side quests where unfinished ideas become working systems.",
    href: "/lab",
    x: "66%",
    y: "75%",
  },
  {
    id: "engineering",
    label: "Production engineering",
    kicker: "What ships",
    detail:
      "React, FastAPI, cloud infrastructure, connected devices, and software designed for real users.",
    href: "/work",
    x: "39%",
    y: "55%",
  },
] as const;

const clamp = (value: number, min: number, max: number) =>
  Math.min(Math.max(value, min), max);

type SceneStyle = CSSProperties & {
  "--scene-x": string;
  "--scene-y": string;
  "--tilt-x": string;
  "--tilt-y": string;
};

export default function Hero() {
  const [activeId, setActiveId] =
    useState<(typeof hotspots)[number]["id"]>("ai");
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [dragging, setDragging] = useState(false);
  const dragState = useRef({ x: 0, y: 0, originX: 0, originY: 0 });
  const active =
    hotspots.find((hotspot) => hotspot.id === activeId) ?? hotspots[1];

  const sceneStyle: SceneStyle = {
    "--scene-x": `${offset.x}px`,
    "--scene-y": `${offset.y}px`,
    "--tilt-x": `${tilt.x}deg`,
    "--tilt-y": `${tilt.y}deg`,
  };

  const handlePointerDown = (event: PointerEvent<HTMLDivElement>) => {
    if ((event.target as HTMLElement).closest("a, button")) return;

    event.currentTarget.setPointerCapture(event.pointerId);
    dragState.current = {
      x: event.clientX,
      y: event.clientY,
      originX: offset.x,
      originY: offset.y,
    };
    setDragging(true);
  };

  const handlePointerMove = (event: PointerEvent<HTMLDivElement>) => {
    const bounds = event.currentTarget.getBoundingClientRect();

    if (dragging) {
      setOffset({
        x: clamp(
          dragState.current.originX + event.clientX - dragState.current.x,
          -34,
          34,
        ),
        y: clamp(
          dragState.current.originY + event.clientY - dragState.current.y,
          -24,
          24,
        ),
      });
      return;
    }

    const normalizedX = (event.clientX - bounds.left) / bounds.width - 0.5;
    const normalizedY = (event.clientY - bounds.top) / bounds.height - 0.5;
    setTilt({
      x: clamp(normalizedY * -3.2, -1.6, 1.6),
      y: clamp(normalizedX * 3.2, -1.6, 1.6),
    });
  };

  const stopDragging = (event: PointerEvent<HTMLDivElement>) => {
    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }
    setDragging(false);
  };

  return (
    <section className={styles.hero} aria-labelledby="hero-title">
      <div
        className={`${styles.experience} ${dragging ? styles.dragging : ""}`}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={stopDragging}
        onPointerCancel={stopDragging}
        onPointerLeave={() => {
          if (!dragging) setTilt({ x: 0, y: 0 });
        }}
      >
        <div className={styles.ambientGlow} aria-hidden="true" />

        <div className={styles.scene} style={sceneStyle}>
          <Image
            className={styles.sceneImage}
            src="/assets/hero/systems-workbench.png"
            alt="An illustrated engineering workbench with monitors, system diagrams, a laptop, notebooks, and an AI node sculpture"
            fill
            priority
            sizes="(max-width: 760px) 160vw, 100vw"
          />

          {hotspots.map((hotspot, index) => (
            <button
              type="button"
              key={hotspot.id}
              className={`${styles.hotspot} ${activeId === hotspot.id ? styles.hotspotActive : ""}`}
              style={
                {
                  "--hotspot-x": hotspot.x,
                  "--hotspot-y": hotspot.y,
                  "--hotspot-delay": `${index * 0.35}s`,
                } as CSSProperties
              }
              aria-label={`Explore ${hotspot.label}`}
              aria-pressed={activeId === hotspot.id}
              onPointerDown={(event) => event.stopPropagation()}
              onClick={() => setActiveId(hotspot.id)}
            >
              <span className={styles.hotspotCore} />
              <span className={styles.hotspotLabel}>{hotspot.label}</span>
            </button>
          ))}
        </div>

        <div className={styles.topline}>
          <span>Soumen Nath / Software Engineer</span>
          <span className={styles.availability}>
            <i aria-hidden="true" /> Available for collaboration
          </span>
        </div>

        <div className={styles.copy}>
          <p className={styles.eyebrow}>
            <Sparkles size={14} aria-hidden="true" />
            An interactive engineering journal
          </p>
          <h1 className={styles.title} id="hero-title">
            Engineering,
            <span>made tangible.</span>
          </h1>
          <p className={styles.description}>
            I build thoughtful AI products and dependable software systems. Move
            through the desk to explore the work, experiments, and ideas behind
            them.
          </p>
          <div className={styles.actions}>
            <Link href="/work" className={styles.primaryAction}>
              Enter the work <ArrowRight size={16} aria-hidden="true" />
            </Link>
            <Link href="/about" className={styles.secondaryAction}>
              About me
            </Link>
          </div>
        </div>

        <div className={styles.exploreHint} aria-hidden="true">
          <Hand size={16} />
          <span>Drag to move</span>
          <i />
          <MousePointer2 size={15} />
          <span>Tap a node</span>
        </div>

        <div className={styles.detailCard} aria-live="polite">
          <div className={styles.detailHeader}>
            <span>{active.kicker}</span>
            <Move size={15} aria-hidden="true" />
          </div>
          <strong>{active.label}</strong>
          <p>{active.detail}</p>
          <Link href={active.href}>
            Explore this thread <ArrowRight size={14} aria-hidden="true" />
          </Link>
        </div>

        <div className={styles.coordinates} aria-hidden="true">
          <span>FIELD / 01</span>
          <span>22.5726° N</span>
          <span>88.3639° E</span>
        </div>
      </div>

      <div className={styles.signalStrip}>
        <div>
          <span className={styles.signalNumber}>3,000+</span>
          <span>users supported</span>
        </div>
        <div>
          <span className={styles.signalNumber}>99%</span>
          <span>device sync accuracy</span>
        </div>
        <div>
          <span className={styles.signalNumber}>AI → action</span>
          <span>grounded production workflows</span>
        </div>
        <div className={styles.nowBuilding}>
          <i aria-hidden="true" />
          <span>Currently building</span>
          <strong>RevFlow AI</strong>
        </div>
      </div>
    </section>
  );
}
