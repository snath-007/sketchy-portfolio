"use client";

import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";
import Link from "next/link";
import type { CSSProperties, PointerEvent as ReactPointerEvent } from "react";
import { useRef, useState } from "react";
import styles from "./EssayDeck.module.css";

export interface EssayDeckItem {
  id: string;
  slug: string;
  title: string;
  summary: string;
  publishedAt: string;
  readingTime: string;
}

interface EssayDeckProps {
  articles: EssayDeckItem[];
}

type DeckCardStyle = CSSProperties & {
  "--card-left": string;
  "--card-depth": string;
  "--card-lift": string;
  "--card-rotate": string;
  "--card-scale": number;
  "--card-opacity": number;
  "--card-order": number;
};

function getRelativePosition(
  index: number,
  activeIndex: number,
  count: number,
  direction: -1 | 1,
) {
  let position = index - activeIndex;
  const halfway = count / 2;

  if (position > halfway) position -= count;
  if (position < -halfway) position += count;
  if (count % 2 === 0 && position === halfway && direction < 0) {
    position = -halfway;
  }

  return position;
}

function getCardStyle(position: number, count: number): DeckCardStyle {
  const angle = (position * Math.PI * 2) / count;
  const distance = Math.abs(position);
  const isOpposite = distance >= Math.ceil(count / 2);

  return {
    "--card-left": `${50 + Math.sin(angle) * 34}%`,
    "--card-depth": `${(Math.cos(angle) - 1) * 230}px`,
    "--card-lift": `${distance * 12}px`,
    "--card-rotate": `${position * 18}deg`,
    "--card-scale": Math.max(0.72, 1 - distance * 0.1),
    "--card-opacity": isOpposite ? 0 : Math.max(0.32, 1 - distance * 0.28),
    "--card-order": 10 - distance,
  };
}

export default function EssayDeck({ articles }: EssayDeckProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [travelDirection, setTravelDirection] = useState<-1 | 1>(1);
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState(0);
  const pointerStart = useRef<number | null>(null);
  const didDrag = useRef(false);
  const suppressClick = useRef(false);
  const count = articles.length;

  const move = (direction: number) => {
    setTravelDirection(direction < 0 ? -1 : 1);
    setActiveIndex((current) => (current + direction + count) % count);
  };

  const handlePointerDown = (event: ReactPointerEvent<HTMLElement>) => {
    if (event.pointerType === "mouse" && event.button !== 0) return;
    pointerStart.current = event.clientX;
    didDrag.current = false;
    setDragOffset(0);
  };

  const handlePointerMove = (event: ReactPointerEvent<HTMLElement>) => {
    if (pointerStart.current === null) return;

    const distance = event.clientX - pointerStart.current;
    if (Math.abs(distance) > 5) {
      didDrag.current = true;
      setIsDragging(true);
      if (!event.currentTarget.hasPointerCapture(event.pointerId)) {
        event.currentTarget.setPointerCapture(event.pointerId);
      }
    }
    setDragOffset(Math.max(-110, Math.min(110, distance)));
    event.preventDefault();
  };

  const finishPointerGesture = (event: ReactPointerEvent<HTMLElement>) => {
    if (pointerStart.current === null) return;

    const distance = event.clientX - pointerStart.current;
    pointerStart.current = null;
    setDragOffset(0);
    setIsDragging(false);

    if (didDrag.current) {
      suppressClick.current = true;
      window.setTimeout(() => {
        suppressClick.current = false;
      }, 0);
    }

    if (Math.abs(distance) > 38) {
      move(distance > 0 ? -1 : 1);
    }
  };

  const cancelPointerGesture = () => {
    pointerStart.current = null;
    didDrag.current = false;
    setDragOffset(0);
    setIsDragging(false);
  };

  if (count === 0) return null;

  return (
    <div className={styles.deckShell}>
      <section
        className={`${styles.viewport} ${isDragging ? styles.dragging : ""}`}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={finishPointerGesture}
        onPointerCancel={cancelPointerGesture}
        style={{ "--deck-drag": `${dragOffset}px` } as CSSProperties}
        onKeyDown={(event) => {
          if (event.key === "ArrowLeft") {
            event.preventDefault();
            move(-1);
          }
          if (event.key === "ArrowRight") {
            event.preventDefault();
            move(1);
          }
        }}
        aria-roledescription="carousel"
        aria-label="Featured essays. Use left and right arrow keys to rotate the deck."
      >
        <div className={styles.table} aria-hidden="true" />

        {articles.map((article, index) => {
          const position = getRelativePosition(
            index,
            activeIndex,
            count,
            travelDirection,
          );
          const isActive = index === activeIndex;

          return (
            <Link
              key={article.id}
              href={`/essays/${article.slug}`}
              target="_blank"
              rel="noopener noreferrer"
              className={`${styles.card} ${isActive ? styles.activeCard : ""}`}
              style={getCardStyle(position, count)}
              data-accent={index % 4}
              aria-label={
                isActive
                  ? `Read ${article.title}`
                  : `Bring ${article.title} to the front`
              }
              aria-current={isActive ? "true" : undefined}
              tabIndex={isActive ? 0 : -1}
              draggable={false}
              onDragStart={(event) => event.preventDefault()}
              onClick={(event) => {
                if (suppressClick.current) {
                  event.preventDefault();
                  return;
                }
                if (!isActive) {
                  event.preventDefault();
                  setTravelDirection(position < 0 ? -1 : 1);
                  setActiveIndex(index);
                }
              }}
            >
              <article>
                {Math.abs(position) === 1 ? (
                  <span
                    className={styles.sideIndicator}
                    data-side={position < 0 ? "left" : "right"}
                    aria-hidden="true"
                  >
                    <span />
                    <span />
                    <span />
                  </span>
                ) : null}

                <div className={styles.cardTopline}>
                  <span>Field note {String(index + 1).padStart(2, "0")}</span>
                  <span>{article.readingTime}</span>
                </div>

                <div className={styles.cardCopy}>
                  <h3>{article.title}</h3>
                  <p>{article.summary}</p>
                </div>

                <div className={styles.cardFooter}>
                  <span>{article.publishedAt}</span>
                  <span className={styles.readCue}>
                    {isActive ? "Open essay" : "Bring forward"}
                    <ArrowUpRight size={15} />
                  </span>
                </div>
              </article>
            </Link>
          );
        })}
      </section>

      <div className={styles.controls}>
        <button
          type="button"
          onClick={() => move(-1)}
          aria-label="Previous essay"
        >
          <ArrowLeft size={17} />
        </button>
        <p aria-live="polite">
          <span>{String(activeIndex + 1).padStart(2, "0")}</span>
          <i aria-hidden="true" />
          {String(count).padStart(2, "0")}
        </p>
        <button type="button" onClick={() => move(1)} aria-label="Next essay">
          <ArrowRight size={17} />
        </button>
      </div>

      <p className={styles.hint}>
        Drag, swipe, or use the arrow keys to explore
      </p>
    </div>
  );
}
