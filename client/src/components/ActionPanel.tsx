import React, { useState } from 'react';
import { useWorkflow } from '@/contexts/WorkflowContext';
import { workflowNodes, WorkflowNode } from '@/lib/workflowData';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { AlertCircle, ChevronRight, Zap, ExternalLink } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { useLocation } from 'wouter';

interface ActionPanelProps {
  onNavigate?: (nodeId: string) => void;
}

export const ActionPanel: React.FC<ActionPanelProps> = ({ onNavigate }) => {
  const { state, goToNode, completeNode, completeAction, saveAnswers, getPreviousNode } = useWorkflow();
  const [, setLocation] = useLocation();
  const currentNode = workflowNodes[state.currentNodeId];
  const previousNodeId = getPreviousNode();
  const [answers, setAnswers] = useState<Record<string, any>>(
    state.nodeAnswers[state.currentNodeId] || {}
  );
  const [completedChecklist, setCompletedChecklist] = useState<Set<string>>(new Set());

  if (!currentNode) {
    return (
      <div className="p-6 text-center text-slate-500">
        <p>Nodo non trovato</p>
      </div>
    );
  }

  const handleQuestionChange = (questionId: string, value: any) => {
    setAnswers((prev) => ({
      ...prev,
      [questionId]: value,
    }));
  };

  const handleChecklistToggle = (itemId: string) => {
    setCompletedChecklist((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(itemId)) {
        newSet.delete(itemId);
      } else {
        newSet.add(itemId);
      }
      return newSet;
    });
  };

  const handleActionComplete = (actionId: string) => {
    completeAction(actionId);
  };

  const handleProceed = (nextNodeId: string) => {
    // Salva le risposte prima di procedere
    saveAnswers(state.currentNodeId, answers);
    completeNode(state.currentNodeId);
    goToNode(nextNodeId);
    if (onNavigate) {
      onNavigate(nextNodeId);
    }
  };

  const handleGoBack = (prevNodeId: string) => {
    goToNode(prevNodeId);
    if (onNavigate) {
      onNavigate(prevNodeId);
    }
  };

  const getNextNode = (): string | null => {
    if (!currentNode.nextNodes || currentNode.nextNodes.length === 0) {
      return null;
    }

    // Se c'è solo un nodo successivo, ritornalo
    if (currentNode.nextNodes.length === 1) {
      return currentNode.nextNodes[0].nodeId;
    }

    // Altrimenti, valuta le condizioni
    for (const next of currentNode.nextNodes) {
      if (next.condition === 'always') {
        return next.nodeId;
      }

      // Valuta le condizioni what/if
      // Questo è un semplice parser - in produzione potrebbe essere più sofisticato
      const conditionResult = evaluateCondition(next.condition, answers);
      if (conditionResult) {
        return next.nodeId;
      }
    }

    return null;
  };

  const evaluateCondition = (condition: string, answers: Record<string, any>): boolean => {
    // Semplice valutazione di condizioni come: "fattispecie === 'Business Agreement'"
    try {
      // Sostituisci i nomi delle variabili con i loro valori
      let evaluableCondition = condition;
      for (const [key, value] of Object.entries(answers)) {
        const valueStr = typeof value === 'string' ? `"${value}"` : value;
        evaluableCondition = evaluableCondition.replace(new RegExp(key, 'g'), valueStr);
      }
      // Usa Function per valutare l'espressione (sicuro in questo contesto)
      return new Function(`return ${evaluableCondition}`)();
    } catch {
      return false;
    }
  };

  const nextNodeId = getNextNode();
  const canProceed = !currentNode.questions || currentNode.questions.every((q) => !q.required || answers[q.id]);

  return (
    <div className="h-full overflow-y-auto p-6 space-y-6">
      {/* Intestazione */}
      <div>
        <div className="flex items-start gap-3 mb-4">
          <div className="p-2 bg-blue-100 rounded-lg">
            <Zap className="w-5 h-5 text-blue-600" />
          </div>
          <div>
            <h3 className="text-2xl font-bold text-slate-900">{currentNode.title}</h3>
            <p className="text-sm text-slate-600 mt-1">{currentNode.description}</p>
          </div>
        </div>
      </div>

      {/* Domande */}
      {currentNode.questions && currentNode.questions.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Domande</CardTitle>
            <CardDescription>Rispondi alle domande per procedere</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {currentNode.questions.map((question) => (
              <div key={question.id} className="space-y-3">
                <div>
                  <Label className="text-base font-semibold text-slate-900">
                    {question.text}
                    {question.required && <span className="text-red-500 ml-1">*</span>}
                  </Label>
                  {question.helpText && (
                    <p className="text-sm text-slate-600 mt-1">{question.helpText}</p>
                  )}
                </div>

                {question.type === 'radio' && question.options && (
                  <RadioGroup value={answers[question.id] || ''} onValueChange={(value) => handleQuestionChange(question.id, value)}>
                    <div className="space-y-2">
                      {question.options.map((option) => (
                        <div key={option} className="flex items-center space-x-2">
                          <RadioGroupItem value={option} id={`${question.id}-${option}`} />
                          <Label htmlFor={`${question.id}-${option}`} className="cursor-pointer font-normal">
                            {option}
                          </Label>
                        </div>
                      ))}
                    </div>
                  </RadioGroup>
                )}

                {question.type === 'checkbox' && question.options && (
                  <div className="space-y-2">
                    {question.options.map((option) => (
                      <div key={option} className="flex items-center space-x-2">
                        <Checkbox
                          id={`${question.id}-${option}`}
                          checked={answers[question.id]?.includes(option) || false}
                          onCheckedChange={(checked) => {
                            const current = answers[question.id] || [];
                            if (checked) {
                              handleQuestionChange(question.id, [...current, option]);
                            } else {
                              handleQuestionChange(question.id, current.filter((o: string) => o !== option));
                            }
                          }}
                        />
                        <Label htmlFor={`${question.id}-${option}`} className="cursor-pointer font-normal">
                          {option}
                        </Label>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </CardContent>
        </Card>
      )}

      {/* Azioni */}
      {currentNode.actions && currentNode.actions.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Azioni</CardTitle>
            <CardDescription>Completa le azioni richieste</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {currentNode.actions.map((action) => (
              <div key={action.id} className="space-y-3 p-4 bg-slate-50 rounded-lg border border-slate-200">
                <div className="flex items-start justify-between">
                  <div>
                    <h4 className="font-semibold text-slate-900">{action.title}</h4>
                    <p className="text-sm text-slate-600 mt-1">{action.description}</p>
                  </div>
                </div>

                {/* Checklist */}
                {action.checklist && action.checklist.length > 0 && (
                  <div className="space-y-2 mt-3">
                    {action.checklist.map((item) => (
                      <div key={item.id} className="flex items-center space-x-2">
                        <Checkbox
                          id={item.id}
                          checked={completedChecklist.has(item.id)}
                          onCheckedChange={() => handleChecklistToggle(item.id)}
                        />
                        <Label htmlFor={item.id} className="cursor-pointer font-normal text-slate-700">
                          {item.text}
                        </Label>
                      </div>
                    ))}
                  </div>
                )}

                {currentNode.satelliteLink ? (
                  <Button
                    size="sm"
                    onClick={() => setLocation(`/${currentNode.satelliteLink}`)}
                    className="w-full mt-2 gap-2"
                  >
                    Accedi al Satellite
                    <ExternalLink className="w-4 h-4" />
                  </Button>
                ) : (
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleActionComplete(action.id)}
                    className="w-full mt-2"
                  >
                    Segna come Completato
                  </Button>
                )}
              </div>
            ))}
          </CardContent>
        </Card>
      )}

      {/* Avviso di Completamento Richiesto */}
      {!canProceed && (
        <Alert>
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            Completa tutte le domande obbligatorie prima di procedere.
          </AlertDescription>
        </Alert>
      )}

      {/* Pulsanti Navigazione */}
      <div className="flex gap-3">
        {previousNodeId && (
          <Button
            onClick={() => handleGoBack(previousNodeId)}
            variant="outline"
            className="flex-1 h-12 text-base font-semibold gap-2"
          >
            <ChevronRight className="w-5 h-5 rotate-180" />
            Torna Indietro
          </Button>
        )}
        {nextNodeId && (
          <Button
            onClick={() => handleProceed(nextNodeId)}
            disabled={!canProceed}
            className="flex-1 h-12 text-base font-semibold gap-2"
          >
            Procedi
            <ChevronRight className="w-5 h-5" />
          </Button>
        )}
      </div>

      {/* Messaggio Fine Workflow */}
      {!nextNodeId && state.currentNodeId === 'end' && (
        <Alert className="bg-green-50 border-green-200">
          <AlertCircle className="h-4 w-4 text-green-600" />
          <AlertDescription className="text-green-800">
            Procedura completata con successo!
          </AlertDescription>
        </Alert>
      )}
    </div>
  );
};
