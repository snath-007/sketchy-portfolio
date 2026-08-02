"use client";

import {
  ArrowUp,
  Check,
  Download,
  FileText,
  MessageSquareText,
  Paperclip,
  Scale,
  Share2,
  Sparkles,
} from "lucide-react";
import Image from "next/image";
import {
  type ReactNode,
  type PointerEvent as ReactPointerEvent,
  useRef,
} from "react";
import styles from "./ProductTheatre.module.css";

type ProductTheatreProps = {
  variant: "revflow" | "procleg";
};

type DragState = {
  active: boolean;
  pointerId: number | null;
  startX: number;
  startY: number;
};

const clamp = (value: number, minimum: number, maximum: number) =>
  Math.min(Math.max(value, minimum), maximum);

const revflowFrames = [
  {
    src: "/assets/product-theatre/revflow-overview.png",
    alt: "RevFlow workspace command center",
    label: "Workspace overview",
  },
  {
    src: "/assets/product-theatre/revflow-customers.png",
    alt: "RevFlow billable customer accounts",
    label: "Billable accounts",
  },
  {
    src: "/assets/product-theatre/revflow-revenue.png",
    alt: "RevFlow earned revenue schedules",
    label: "Revenue schedules",
  },
];

function RevFlowScreen() {
  return (
    <div className={styles.revflowScreen} aria-hidden="true">
      {revflowFrames.map((frame, index) => (
        <div className={styles.revflowFrame} key={frame.src}>
          <Image
            src={frame.src}
            alt={frame.alt}
            fill
            priority={index === 0}
            sizes="(max-width: 860px) 92vw, 48vw"
          />
          <span className={styles.frameLabel}>{frame.label}</span>
        </div>
      ))}
      <div className={styles.frameDots}>
        <i />
        <i />
        <i />
      </div>
    </div>
  );
}

function AssistantChrome({ children }: { children: ReactNode }) {
  return (
    <div className={styles.assistantChrome} aria-hidden="true">
      <aside className={styles.assistantSidebar}>
        <div className={styles.proclegMark}>PL</div>
        <span className={styles.sideCaption}>Recent</span>
        <span className={styles.chatRow}>
          <MessageSquareText /> Proposal review
        </span>
        <span className={styles.chatRow}>
          <FileText /> MSA redline
        </span>
        <span className={styles.chatRow}>
          <Scale /> Policy Q&amp;A
        </span>
      </aside>
      <div className={styles.assistantMain}>
        <header className={styles.assistantTopbar}>
          <div>
            <strong>ProcLeg</strong>
            <span>Enterprise assistant</span>
          </div>
          <div className={styles.topbarActions}>
            <Share2 />
            <Download />
          </div>
        </header>
        {children}
      </div>
    </div>
  );
}

function ProcLegScreen() {
  return (
    <AssistantChrome>
      <div className={styles.procScenes}>
        <section className={styles.procScene}>
          <div className={styles.conversationTitle}>
            <span className={styles.modePill}>
              <Sparkles /> Procurement assistant
            </span>
            <small>Grounded in 12 approved sources</small>
          </div>
          <div className={styles.chatMessages}>
            <div className={styles.userBubble}>
              What are our approved payment terms for strategic suppliers?
            </div>
            <div className={styles.assistantMessage}>
              <span className={styles.aiIcon}>
                <Sparkles />
              </span>
              <div>
                <strong>ProcLeg</strong>
                <p>
                  Strategic suppliers default to Net 45. Net 60 requires Finance
                  approval and a documented working-capital exception.
                </p>
                <div className={styles.sourceChips}>
                  <span>Procurement policy</span>
                  <span>Terms playbook</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className={styles.procScene}>
          <div className={styles.conversationTitle}>
            <span className={styles.modePill}>
              <Scale /> Proposal comparison
            </span>
            <small>3 proposals attached</small>
          </div>
          <div className={styles.chatMessages}>
            <div className={styles.userBubble}>
              Compare Acme and Northstar. Which offer is stronger?
            </div>
            <div className={styles.assistantMessage}>
              <span className={styles.aiIcon}>
                <Sparkles />
              </span>
              <div>
                <strong>Acme is the recommended option</strong>
                <p>
                  It is 8% lower on total cost with comparable delivery risk.
                </p>
                <div className={styles.inlineComparison}>
                  <span>
                    <b>Acme</b>
                    <i>91</i>
                  </span>
                  <span>
                    <b>Northstar</b>
                    <i>86</i>
                  </span>
                </div>
                <div className={styles.sourceChips}>
                  <span>View evidence</span>
                  <span>Download comparison</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className={styles.procScene}>
          <div className={styles.conversationTitle}>
            <span className={styles.modePill}>
              <FileText /> Legal assistant
            </span>
            <small>MSA v4 attached</small>
          </div>
          <div className={styles.chatMessages}>
            <div className={styles.userBubble}>
              Review this agreement and flag non-standard clauses.
            </div>
            <div className={styles.assistantMessage}>
              <span className={styles.aiIcon}>
                <Sparkles />
              </span>
              <div>
                <strong>I found 2 clauses for review</strong>
                <div className={styles.contractSnippet}>
                  <p>
                    <del>one year</del> <ins>three years</ins> retention
                  </p>
                  <p>
                    <del>fees paid</del> <ins>2x annual fees</ins> liability
                  </p>
                </div>
                <div className={styles.sourceChips}>
                  <span>
                    <Check /> Accept changes
                  </span>
                  <span>
                    <Download /> Download DOCX
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
      <div className={styles.chatComposer}>
        <Paperclip />
        <span>Ask ProcLeg anything...</span>
        <i>
          <ArrowUp />
        </i>
      </div>
    </AssistantChrome>
  );
}

export default function ProductTheatre({ variant }: ProductTheatreProps) {
  const theatreRef = useRef<HTMLElement>(null);
  const dragRef = useRef<DragState>({
    active: false,
    pointerId: null,
    startX: 0,
    startY: 0,
  });
  const settleTimerRef = useRef<number | null>(null);
  const isRevFlow = variant === "revflow";

  const motionIsReduced = () =>
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const clearSettleTimer = () => {
    if (settleTimerRef.current) {
      window.clearTimeout(settleTimerRef.current);
      settleTimerRef.current = null;
    }
  };

  const setInteractiveRotation = (rotateX: number, rotateY: number) => {
    const theatre = theatreRef.current;
    if (!theatre) return;
    theatre.style.setProperty(
      "--interactive-x",
      rotateX.toFixed(2).concat("deg"),
    );
    theatre.style.setProperty(
      "--interactive-y",
      rotateY.toFixed(2).concat("deg"),
    );
  };

  const resetRotation = () => setInteractiveRotation(0, 0);

  const finishDrag = (event: ReactPointerEvent<HTMLElement>) => {
    if (!dragRef.current.active) return;

    dragRef.current.active = false;
    dragRef.current.pointerId = null;

    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }

    const theatre = theatreRef.current;
    if (!theatre) return;

    delete theatre.dataset.dragging;
    theatre.dataset.settling = "true";
    resetRotation();
    clearSettleTimer();
    settleTimerRef.current = window.setTimeout(() => {
      delete theatre.dataset.settling;
      settleTimerRef.current = null;
    }, 650);
  };

  const handlePointerDown = (event: ReactPointerEvent<HTMLElement>) => {
    if (
      event.pointerType === "touch" ||
      event.button !== 0 ||
      motionIsReduced()
    ) {
      return;
    }

    clearSettleTimer();
    const theatre = theatreRef.current;
    if (!theatre) return;

    delete theatre.dataset.settling;
    theatre.dataset.dragging = "true";
    dragRef.current = {
      active: true,
      pointerId: event.pointerId,
      startX: event.clientX,
      startY: event.clientY,
    };
    event.currentTarget.setPointerCapture(event.pointerId);
  };

  const handlePointerMove = (event: ReactPointerEvent<HTMLElement>) => {
    if (event.pointerType === "touch" || motionIsReduced()) return;

    const theatre = theatreRef.current;
    if (!theatre) return;

    const bounds = theatre.getBoundingClientRect();

    if (dragRef.current.active) {
      const deltaX = event.clientX - dragRef.current.startX;
      const deltaY = event.clientY - dragRef.current.startY;
      const rotateY = clamp((deltaX / bounds.width) * 24, -12, 12);
      const rotateX = clamp((-deltaY / bounds.height) * 16, -8, 8);
      setInteractiveRotation(rotateX, rotateY);
      return;
    }

    clearSettleTimer();
    delete theatre.dataset.settling;
    const horizontal = (event.clientX - bounds.left) / bounds.width - 0.5;
    const vertical = (event.clientY - bounds.top) / bounds.height - 0.5;
    setInteractiveRotation(-vertical * 10, horizontal * 10);
  };

  const handlePointerLeave = () => {
    if (!dragRef.current.active) resetRotation();
  };

  return (
    <figure
      ref={theatreRef}
      className={`${styles.theatre} ${styles[variant]}`}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={finishDrag}
      onPointerCancel={finishDrag}
      onPointerLeave={handlePointerLeave}
    >
      <div className={styles.aura} />
      <div className={styles.floatingTag}>
        <span /> {isRevFlow ? "7-stage revenue flow" : "2 expert copilots"}
      </div>
      <div className={styles.computer}>
        <div className={styles.device}>
          <div className={styles.camera} />
          <div className={styles.screen}>
            {isRevFlow ? <RevFlowScreen /> : <ProcLegScreen />}
          </div>
          <div className={styles.deviceMark}>
            {isRevFlow ? "REVFLOW / LIVE" : "PROCLEG / LIVE"}
          </div>
        </div>
      </div>
      <figcaption>
        <span className={styles.liveDot} />
        {isRevFlow
          ? "Contract-to-revenue workspace"
          : "Procurement + legal intelligence workspace"}
      </figcaption>
    </figure>
  );
}
