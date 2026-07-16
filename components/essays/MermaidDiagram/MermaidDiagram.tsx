/* biome-ignore-all lint/security/noDangerouslySetInnerHtml: Mermaid sanitizes generated SVG in strict security mode. */
"use client";

import { useEffect, useId, useState } from "react";
import styles from "./MermaidDiagram.module.css";

interface MermaidDiagramProps {
  title: string;
  definition: string;
}

export default function MermaidDiagram({
  title,
  definition,
}: MermaidDiagramProps) {
  const reactId = useId();
  const [svg, setSvg] = useState("");
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    let active = true;
    const id = `mermaid-${reactId.replace(/[^a-zA-Z0-9]/g, "")}`;
    import("mermaid")
      .then(async ({ default: mermaid }) => {
        mermaid.initialize({
          startOnLoad: false,
          securityLevel: "strict",
          theme: "base",
          themeVariables: {
            primaryColor: "#f3ecdc",
            primaryTextColor: "#201f1b",
            primaryBorderColor: "#6f6759",
            lineColor: "#6f6759",
            secondaryColor: "#e5dcc9",
            tertiaryColor: "#faf6eb",
          },
        });
        const result = await mermaid.render(id, definition);
        if (active) setSvg(result.svg);
      })
      .catch(() => active && setFailed(true));
    return () => {
      active = false;
    };
  }, [definition, reactId]);

  return (
    <figure className={styles.figure}>
      <figcaption>{title}</figcaption>
      {failed ? (
        <pre className={styles.fallback}>{definition}</pre>
      ) : (
        <div
          className={styles.diagram}
          role="img"
          aria-label={title}
          dangerouslySetInnerHTML={{ __html: svg }}
        />
      )}
    </figure>
  );
}
