import React, { useEffect, useRef } from 'react';
import mermaid from 'mermaid';

interface MermaidDiagramProps {
  diagram: string;
  title?: string;
}

export const MermaidDiagram: React.FC<MermaidDiagramProps> = ({ diagram, title }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (containerRef.current) {
      mermaid.initialize({ startOnLoad: false, securityLevel: 'loose' });
      mermaid.run({ nodes: [containerRef.current] });
    }
  }, [diagram]);

  return (
    <div className="w-full bg-white rounded-lg border border-slate-200 p-4 overflow-x-auto">
      {title && <h3 className="text-lg font-semibold text-slate-900 mb-4">{title}</h3>}
      <div ref={containerRef} className="mermaid">
        {diagram}
      </div>
    </div>
  );
};
