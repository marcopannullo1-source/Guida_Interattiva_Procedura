import React, { useState, useEffect } from 'react';
import { ProgressDashboard } from '@/components/ProgressDashboard';
import { ActionPanel } from '@/components/ActionPanel';
import { MermaidDiagram } from '@/components/MermaidDiagram';
import { useWorkflow } from '@/contexts/WorkflowContext';
import { workflowNodes } from '@/lib/workflowData';
import { masterDiagram } from '@/lib/satelliteDiagrams';
import { Button } from '@/components/ui/button';
import { RotateCcw } from 'lucide-react';

/**
 * Pagina principale del Workflow Procedurale
 * Layout a doppio schermo:
 * - Orizzontale (top): Dashboard di progresso con fasi
 * - Verticale (bottom): Pannello azioni con domande e checklist
 */
export default function Home() {
  const { state, reset } = useWorkflow();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1024);
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const currentNode = workflowNodes[state.currentNodeId];

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-slate-900">Guida Interattiva Procedura</h1>
            <p className="text-sm text-slate-600 mt-1">Workflow Manager - Modalità What/If</p>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={reset}
            className="gap-2"
          >
            <RotateCcw className="w-4 h-4" />
            Ricomincia
          </Button>
        </div>
      </header>

      {/* Dashboard di Progresso (Orizzontale) */}
      <ProgressDashboard />

      {/* Contenitore Principale */}
      <div className="flex-1 overflow-hidden">
        {isMobile ? (
          // Layout Mobile: Stack verticale
          <div className="flex flex-col h-full overflow-y-auto">
            <div className="flex-1 overflow-y-auto">
              <ActionPanel />
            </div>
          </div>
        ) : (
          // Layout Desktop: Doppio schermo
          <div className="flex h-full">
            {/* Pannello Sinistro: Informazioni e Diagramma Workflow */}
            <div className="w-1/2 border-r border-slate-200 bg-white overflow-y-auto">
              <div className="p-8 space-y-6">
                {/* Informazioni Nodo Corrente */}
                <div className="space-y-4">
                  <div className="p-6 bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg border border-blue-200">
                    <h2 className="text-2xl font-bold text-blue-900 mb-2">
                      {currentNode?.title}
                    </h2>
                    <p className="text-blue-800">{currentNode?.description}</p>
                    {currentNode?.completionCriteria && (
                      <div className="mt-4 p-3 bg-white rounded border border-blue-200">
                        <p className="text-sm font-semibold text-slate-900">
                          Criteri di Completamento:
                        </p>
                        <p className="text-sm text-slate-700 mt-1">
                          {currentNode.completionCriteria}
                        </p>
                      </div>
                    )}
                  </div>
                </div>

                {/* Visualizzazione Diagramma Mermaid */}
                <div className="space-y-3">
                  <h3 className="text-lg font-semibold text-slate-900">Workflow Master</h3>
                  <MermaidDiagram diagram={masterDiagram} />
                </div>

                {/* Info Fase */}
                <div className="p-4 bg-slate-100 rounded-lg border border-slate-200">
                  <p className="text-sm text-slate-600">
                    <span className="font-semibold text-slate-900">Fase Corrente:</span>{' '}
                    {currentNode?.phaseName}
                  </p>
                  <p className="text-sm text-slate-600 mt-2">
                    <span className="font-semibold text-slate-900">Tipo Nodo:</span>{' '}
                    {currentNode?.type}
                  </p>
                </div>
              </div>
            </div>

            {/* Pannello Destro: Azioni e Domande */}
            <div className="w-1/2 bg-slate-50 overflow-y-auto">
              <ActionPanel />
            </div>
          </div>
        )}
      </div>

      {/* Footer */}
      <footer className="bg-white border-t border-slate-200 py-4">
        <div className="max-w-7xl mx-auto px-4 text-center text-sm text-slate-600">
          <p>Procedura Workflow - Guida Interattiva What/If © 2024</p>
        </div>
      </footer>
    </div>
  );
}
