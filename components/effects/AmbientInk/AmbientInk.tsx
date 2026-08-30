"use client";

import { useEffect, useRef } from "react";
import styles from "./AmbientInk.module.css";

type InkParticle = {
  x: number;
  y: number;
  velocityX: number;
  velocityY: number;
  radius: number;
  angle: number;
  stretch: number;
  life: number;
  decay: number;
  color: string;
};

type Point = {
  x: number;
  y: number;
};

const lightPalette = ["#ff4fa3", "#bd5cff", "#7c3aed"];
const darkPalette = ["#8aaec7", "#6f88b5", "#817fa8"];
const maximumParticles = 105;

function rgba(hex: string, alpha: number) {
  const value = Number.parseInt(hex.slice(1), 16);
  const red = (value >> 16) & 255;
  const green = (value >> 8) & 255;
  const blue = value & 255;
  return `rgba(${red}, ${green}, ${blue}, ${alpha})`;
}

export default function AmbientInk() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (reducedMotion.matches) return;

    const context = canvas.getContext("2d");
    if (!context) return;

    const coarsePointer = window.matchMedia("(pointer: coarse)");
    const particles: InkParticle[] = [];
    let animationFrame = 0;
    let animationRunning = false;
    let dragging = false;
    let lastPoint: Point | null = null;
    let darkMode = document.documentElement.dataset.theme === "dark";

    const resizeCanvas = () => {
      const pixelRatio = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(window.innerWidth * pixelRatio);
      canvas.height = Math.round(window.innerHeight * pixelRatio);
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
    };

    const drawFrame = () => {
      context.clearRect(0, 0, window.innerWidth, window.innerHeight);
      context.globalCompositeOperation = "source-over";

      for (let index = particles.length - 1; index >= 0; index -= 1) {
        const particle = particles[index];
        particle.life -= particle.decay;
        if (particle.life <= 0) {
          particles.splice(index, 1);
          continue;
        }

        particle.x += particle.velocityX;
        particle.y += particle.velocityY;
        particle.velocityX *= 0.985;
        particle.velocityY *= 0.985;

        const expansion = 1 + (1 - particle.life) * 0.72;
        const radius = particle.radius * expansion;
        const opacity = particle.life ** 1.8 * 0.055;

        context.save();
        context.translate(particle.x, particle.y);
        context.rotate(particle.angle);
        context.scale(particle.stretch, 0.42);
        const gradient = context.createRadialGradient(0, 0, 0, 0, 0, radius);
        gradient.addColorStop(0, rgba(particle.color, opacity));
        gradient.addColorStop(0.28, rgba(particle.color, opacity * 0.62));
        gradient.addColorStop(1, rgba(particle.color, 0));

        context.fillStyle = gradient;
        context.beginPath();
        context.arc(0, 0, radius, 0, Math.PI * 2);
        context.fill();
        context.restore();
      }

      if (particles.length > 0) {
        animationFrame = window.requestAnimationFrame(drawFrame);
      } else {
        animationRunning = false;
      }
    };

    const ensureAnimation = () => {
      if (animationRunning) return;
      animationRunning = true;
      animationFrame = window.requestAnimationFrame(drawFrame);
    };

    const addParticle = (
      x: number,
      y: number,
      speedX: number,
      speedY: number,
    ) => {
      const palette = darkMode ? darkPalette : lightPalette;
      const color = palette[Math.floor(Math.random() * palette.length)];
      const touchScale = coarsePointer.matches ? 1.08 : 1;
      const speed = Math.hypot(speedX, speedY);
      const angle =
        speed > 0.15 ? Math.atan2(speedY, speedX) : Math.random() * Math.PI * 2;

      particles.push({
        x: x + (Math.random() - 0.5) * 4,
        y: y + (Math.random() - 0.5) * 4,
        velocityX: speedX * 0.16 + (Math.random() - 0.5) * 0.28,
        velocityY: speedY * 0.16 + (Math.random() - 0.5) * 0.28,
        radius: (7 + Math.random() * 11) * touchScale,
        angle,
        stretch: Math.min(3.2, 1.65 + speed * 0.22),
        life: 1,
        decay: 0.018 + Math.random() * 0.012,
        color,
      });

      if (particles.length > maximumParticles) {
        particles.splice(0, particles.length - maximumParticles);
      }
    };

    const paintToward = (point: Point) => {
      if (!lastPoint) {
        addParticle(point.x, point.y, 0, 0);
        lastPoint = point;
        ensureAnimation();
        return;
      }

      const deltaX = point.x - lastPoint.x;
      const deltaY = point.y - lastPoint.y;
      const distance = Math.hypot(deltaX, deltaY);
      const steps = Math.min(8, Math.max(1, Math.ceil(distance / 15)));

      for (let step = 1; step <= steps; step += 1) {
        const progress = step / steps;
        const x = lastPoint.x + deltaX * progress;
        const y = lastPoint.y + deltaY * progress;
        addParticle(x, y, deltaX / steps, deltaY / steps);
      }

      lastPoint = point;
      ensureAnimation();
    };

    const handlePointerDown = (event: PointerEvent) => {
      if (event.pointerType !== "touch") return;
      dragging = true;
      lastPoint = null;
      paintToward({ x: event.clientX, y: event.clientY });
    };

    const handlePointerMove = (event: PointerEvent) => {
      if (event.pointerType === "touch" && !dragging) return;
      paintToward({ x: event.clientX, y: event.clientY });
    };

    const stopDragging = () => {
      dragging = false;
      lastPoint = null;
    };

    const handlePointerLeave = (event: PointerEvent) => {
      if (!event.relatedTarget) lastPoint = null;
    };

    const themeObserver = new MutationObserver(() => {
      darkMode = document.documentElement.dataset.theme === "dark";
    });

    resizeCanvas();
    themeObserver.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-theme"],
    });
    window.addEventListener("resize", resizeCanvas, { passive: true });
    window.addEventListener("pointerdown", handlePointerDown, {
      passive: true,
    });
    window.addEventListener("pointermove", handlePointerMove, {
      passive: true,
    });
    window.addEventListener("pointerup", stopDragging, { passive: true });
    window.addEventListener("pointercancel", stopDragging, { passive: true });
    window.addEventListener("pointerout", handlePointerLeave, {
      passive: true,
    });

    return () => {
      window.cancelAnimationFrame(animationFrame);
      themeObserver.disconnect();
      window.removeEventListener("resize", resizeCanvas);
      window.removeEventListener("pointerdown", handlePointerDown);
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerup", stopDragging);
      window.removeEventListener("pointercancel", stopDragging);
      window.removeEventListener("pointerout", handlePointerLeave);
    };
  }, []);

  return (
    <div aria-hidden="true">
      <canvas ref={canvasRef} className={styles.canvas} />
    </div>
  );
}
