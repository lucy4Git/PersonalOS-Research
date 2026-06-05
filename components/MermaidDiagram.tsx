"use client";

import { useEffect, useRef, useState } from "react";

interface MermaidDiagramProps {
  chart: string;
  title?: string;
}

declare global {
  interface Window {
    mermaid: {
      initialize: (config: Record<string, unknown>) => void;
      render: (id: string, definition: string) => Promise<{ svg: string }>;
    };
  }
}

let mermaidLoaded = false;
let mermaidLoadPromise: Promise<void> | null = null;

function loadMermaid(): Promise<void> {
  if (mermaidLoaded && window.mermaid) return Promise.resolve();
  if (mermaidLoadPromise) return mermaidLoadPromise;

  mermaidLoadPromise = new Promise((resolve, reject) => {
    const script = document.createElement("script");
    script.src = "https://cdn.jsdelivr.net/npm/mermaid@11/dist/mermaid.min.js";
    script.onload = () => {
      window.mermaid.initialize({
        startOnLoad: false,
        theme: "neutral",
        securityLevel: "loose",
        fontFamily: "system-ui, -apple-system, sans-serif",
        flowchart: { useMaxWidth: true, htmlLabels: true, curve: "basis" },
        sequence: { useMaxWidth: true, actorMargin: 80, mirrorActors: false },
        er: { useMaxWidth: true },
      });
      mermaidLoaded = true;
      resolve();
    };
    script.onerror = () => {
      mermaidLoadPromise = null;
      reject(new Error("Failed to load Mermaid from CDN"));
    };
    document.head.appendChild(script);
  });

  return mermaidLoadPromise;
}

export default function MermaidDiagram({ chart, title }: MermaidDiagramProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [svg, setSvg] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    async function renderDiagram() {
      try {
        await loadMermaid();
        const id = `mermaid-${Math.random().toString(36).slice(2, 9)}`;
        const { svg: rendered } = await window.mermaid.render(id, chart);
        if (!cancelled) {
          setSvg(rendered);
          setLoading(false);
        }
      } catch (err) {
        if (!cancelled) {
          setError(err instanceof Error ? err.message : "Failed to render diagram");
          setLoading(false);
        }
      }
    }

    renderDiagram();
    return () => { cancelled = true; };
  }, [chart]);

  if (loading) {
    return (
      <div className="bg-white rounded-xl shadow-sm ring-1 ring-slate-200 p-6">
        {title && <h3 className="font-semibold text-slate-900 mb-4">{title}</h3>}
        <div className="flex items-center justify-center h-48">
          <div className="animate-pulse flex items-center gap-2 text-slate-400">
            <svg className="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
            </svg>
            Rendering diagram...
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white rounded-xl shadow-sm ring-1 ring-red-200 p-6">
        {title && <h3 className="font-semibold text-slate-900 mb-4">{title}</h3>}
        <div className="bg-red-50 rounded-lg p-4">
          <p className="text-sm text-red-700">Diagram render error: {error}</p>
          <pre className="mt-2 text-xs text-red-600 overflow-x-auto whitespace-pre-wrap">{chart}</pre>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-sm ring-1 ring-slate-200 p-6">
      {title && <h3 className="font-semibold text-slate-900 mb-4">{title}</h3>}
      <div
        ref={containerRef}
        className="overflow-x-auto flex justify-center"
        dangerouslySetInnerHTML={{ __html: svg }}
      />
    </div>
  );
}
