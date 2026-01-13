import React from 'react';
import { useWorkflow } from '@/contexts/WorkflowContext';
import { phases } from '@/lib/workflowData';
import { Progress } from '@/components/ui/progress';
import { CheckCircle2, Circle } from 'lucide-react';

export const ProgressDashboard: React.FC = () => {
  const { state, getProgress } = useWorkflow();
  const progress = getProgress();

  return (
    <div className="w-full bg-gradient-to-r from-slate-50 to-slate-100 border-b border-slate-200 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Titolo e Percentuale */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold text-slate-900">Workflow Procedurale</h2>
            <p className="text-sm text-slate-600 mt-1">Guida Interattiva What/If</p>
          </div>
          <div className="text-right">
            <div className="text-4xl font-bold text-blue-600">{progress.percentage}%</div>
            <p className="text-sm text-slate-600">
              {progress.completed} di {progress.total} step completati
            </p>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mb-6">
          <Progress value={progress.percentage} className="h-3" />
        </div>

        {/* Fasi */}
        <div className="grid grid-cols-5 gap-3">
          {phases.map((phase) => {
            const phaseNodes = Object.values(state.completedNodes).length > 0;
            const isCurrentPhase = state.currentPhase === phase.number;
            const isCompletedPhase = state.currentPhase > phase.number;

            return (
              <div
                key={phase.number}
                className={`p-4 rounded-lg border-2 transition-all ${
                  isCurrentPhase
                    ? 'border-blue-500 bg-blue-50'
                    : isCompletedPhase
                      ? 'border-green-500 bg-green-50'
                      : 'border-slate-300 bg-white'
                }`}
              >
                <div className="flex items-start gap-2">
                  {isCompletedPhase ? (
                    <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  ) : (
                    <Circle
                      className={`w-5 h-5 flex-shrink-0 mt-0.5 ${
                        isCurrentPhase ? 'text-blue-600' : 'text-slate-400'
                      }`}
                    />
                  )}
                  <div className="min-w-0">
                    <p className="text-xs font-semibold text-slate-600">FASE {phase.number}</p>
                    <p className="text-sm font-semibold text-slate-900 leading-tight">
                      {phase.name}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Informazioni Fase Corrente */}
        <div className="mt-6 p-4 bg-white rounded-lg border border-slate-200">
          <p className="text-sm text-slate-600">
            <span className="font-semibold text-slate-900">Fase Corrente:</span> Fase{' '}
            {state.currentPhase} - {phases[state.currentPhase - 1]?.name}
          </p>
        </div>
      </div>
    </div>
  );
};
