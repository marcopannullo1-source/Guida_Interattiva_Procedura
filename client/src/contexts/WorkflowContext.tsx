import React, { createContext, useContext, useState, useCallback } from 'react';
import { WorkflowState, workflowNodes, getTotalSteps } from '@/lib/workflowData';

interface WorkflowContextType {
  state: WorkflowState;
  goToNode: (nodeId: string) => void;
  completeNode: (nodeId: string) => void;
  completeAction: (actionId: string) => void;
  saveAnswers: (nodeId: string, answers: Record<string, any>) => void;
  getProgress: () => { completed: number; total: number; percentage: number };
  reset: () => void;
  getPreviousNode: () => string | null;
}

const WorkflowContext = createContext<WorkflowContextType | undefined>(undefined);

export const WorkflowProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, setState] = useState<WorkflowState>({
    currentNodeId: 'start',
    completedNodes: new Set(),
    nodeAnswers: {},
    completedActions: new Set(),
    currentPhase: 1,
    totalPhases: 5,
  });

  const goToNode = useCallback((nodeId: string) => {
    if (workflowNodes[nodeId]) {
      setState((prev) => ({
        ...prev,
        currentNodeId: nodeId,
        currentPhase: workflowNodes[nodeId].phase,
      }));
    }
  }, []);

  const completeNode = useCallback((nodeId: string) => {
    setState((prev) => {
      const newCompleted = new Set(prev.completedNodes);
      newCompleted.add(nodeId);
      return {
        ...prev,
        completedNodes: newCompleted,
      };
    });
  }, []);

  const completeAction = useCallback((actionId: string) => {
    setState((prev) => {
      const newCompleted = new Set(prev.completedActions);
      newCompleted.add(actionId);
      return {
        ...prev,
        completedActions: newCompleted,
      };
    });
  }, []);

  const saveAnswers = useCallback((nodeId: string, answers: Record<string, any>) => {
    setState((prev) => ({
      ...prev,
      nodeAnswers: {
        ...prev.nodeAnswers,
        [nodeId]: answers,
      },
    }));
  }, []);

  const getProgress = useCallback(() => {
    const total = getTotalSteps();
    const completed = state.completedNodes.size;
    return {
      completed,
      total,
      percentage: Math.round((completed / total) * 100),
    };
  }, [state.completedNodes]);

  const reset = useCallback(() => {
    setState({
      currentNodeId: 'start',
      completedNodes: new Set(),
      nodeAnswers: {},
      completedActions: new Set(),
      currentPhase: 1,
      totalPhases: 5,
    });
  }, []);

  const getPreviousNode = useCallback(() => {
    const currentNode = workflowNodes[state.currentNodeId];
    if (currentNode && currentNode.previousNodes && currentNode.previousNodes.length > 0) {
      return currentNode.previousNodes[0].nodeId;
    }
    return null;
  }, [state.currentNodeId]);

  const value: WorkflowContextType = {
    state,
    goToNode,
    completeNode,
    completeAction,
    saveAnswers,
    getProgress,
    reset,
    getPreviousNode,
  };

  return <WorkflowContext.Provider value={value}>{children}</WorkflowContext.Provider>;
};

export const useWorkflow = (): WorkflowContextType => {
  const context = useContext(WorkflowContext);
  if (!context) {
    throw new Error('useWorkflow deve essere usato dentro WorkflowProvider');
  }
  return context;
};
