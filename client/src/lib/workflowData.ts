/**
 * Struttura dati del workflow procedurale con logica what/if
 * Ogni nodo rappresenta uno step con azioni, domande e percorsi alternativi
 */

export type NodeType = 'decision' | 'action' | 'satellite' | 'outcome' | 'start' | 'end';

export interface WorkflowNode {
  id: string;
  title: string;
  description: string;
  type: NodeType;
  phase: number;
  phaseName: string;
  questions?: Question[];
  actions?: Action[];
  nextNodes?: NextNode[];
  previousNodes?: PreviousNode[];
  satelliteLink?: string;
  completionCriteria?: string;
}

export interface Question {
  id: string;
  text: string;
  type: 'checkbox' | 'radio' | 'text' | 'select';
  options?: string[];
  required: boolean;
  helpText?: string;
}

export interface Action {
  id: string;
  title: string;
  description: string;
  completed: boolean;
  checklist?: ChecklistItem[];
}

export interface ChecklistItem {
  id: string;
  text: string;
  completed: boolean;
}

export interface NextNode {
  nodeId: string;
  condition: string;
  label: string;
}

export interface PreviousNode {
  nodeId: string;
  label: string;
}

export interface WorkflowState {
  currentNodeId: string;
  completedNodes: Set<string>;
  nodeAnswers: Record<string, Record<string, any>>;
  completedActions: Set<string>;
  currentPhase: number;
  totalPhases: number;
}

// ============================================================================
// WORKFLOW DATA STRUCTURE
// ============================================================================

export const workflowNodes: Record<string, WorkflowNode> = {
  // FASE 1: VERIFICA DOCUMENTALE
  start: {
    id: 'start',
    title: 'RICEZIONE PRATICA',
    description: 'Inizio del processo di due diligence',
    type: 'start',
    phase: 1,
    phaseName: 'FASE 1: VERIFICA DOCUMENTALE',
    actions: [
      {
        id: 'doc_reception',
        title: 'Ricezione Documentazione',
        description: 'Acquisire la pratica e la documentazione iniziale',
        completed: false,
        checklist: [
          { id: 'doc_1', text: 'Modulo Info ricevuto', completed: false },
          { id: 'doc_2', text: 'TVR compilato', completed: false },
          { id: 'doc_3', text: 'Company Card acquisita', completed: false },
        ],
      },
    ],
    previousNodes: [],
    nextNodes: [{ nodeId: 'docCheck', condition: 'always', label: 'Procedi' }],
  },

  docCheck: {
    id: 'docCheck',
    title: 'VERIFICA DOCUMENTALE',
    description: 'Verifica della completezza della documentazione',
    type: 'action',
    phase: 1,
    phaseName: 'FASE 1: VERIFICA DOCUMENTALE',
    questions: [
      {
        id: 'doc_complete',
        text: 'Tutta la documentazione è completa e corretta?',
        type: 'radio',
        options: ['Sì', 'No'],
        required: true,
        helpText: 'Verifica Modulo Info, TVR e Company Card',
      },
    ],
    actions: [
      {
        id: 'doc_validation',
        title: 'Validazione Documentale',
        description: 'Controllare completezza e coerenza della documentazione',
        completed: false,
      },
    ],
    nextNodes: [{ nodeId: 'catSel', condition: 'always', label: 'Continua' }],
  },

  // FASE 2: MATRICE DI SCOPING
  catSel: {
    id: 'catSel',
    title: 'FATTISPECIE ACCORDO CONTRATTUALE',
    description: 'Classificazione della tipologia di accordo',
    type: 'decision',
    phase: 2,
    phaseName: 'FASE 2: MATRICE DI SCOPING',
    questions: [
      {
        id: 'fattispecie',
        text: 'Quale è la fattispecie dell\'accordo?',
        type: 'radio',
        options: [
          'Business Agreement / Investimenti (M&A, JV)',
          'Business Associate (Sponsor, No-Profit, Agenti)',
          'Fornitori, Clienti, Consulenti',
        ],
        required: true,
        helpText: 'Seleziona la categoria che meglio descrive l\'accordo',
      },
    ],
    nextNodes: [
      {
        nodeId: 'baPath',
        condition: 'fattispecie === "Business Agreement / Investimenti (M&A, JV)"',
        label: 'Business Agreement',
      },
      {
        nodeId: 'baLogic',
        condition: 'fattispecie === "Business Associate (Sponsor, No-Profit, Agenti)"',
        label: 'Business Associate',
      },
      {
        nodeId: 'riskCheck',
        condition: 'fattispecie === "Fornitori, Clienti, Consulenti"',
        label: 'Fornitori/Clienti',
      },
    ],
  },

  baPath: {
    id: 'baPath',
    title: 'OBBLIGO QUESTIONARIO DD',
    description: 'Percorso Business Agreement / Investimenti',
    type: 'action',
    phase: 2,
    phaseName: 'FASE 2: MATRICE DI SCOPING',
    actions: [
      {
        id: 'ba_questionnaire',
        title: 'Preparazione Questionario DD',
        description: 'Predisporre il questionario per il Business Agreement',
        completed: false,
      },
    ],
    previousNodes: [{ nodeId: 'catSel', label: 'Torna a Fattispecie' }],
    nextNodes: [{ nodeId: 'questCheck', condition: 'always', label: 'Procedi' }],
  },

  baLogic: {
    id: 'baLogic',
    title: 'OBBLIGO QUESTIONARIO (Par. 6.2)',
    description: 'Percorso Business Associate',
    type: 'action',
    phase: 2,
    phaseName: 'FASE 2: MATRICE DI SCOPING',
    actions: [
      {
        id: 'ba_logic_questionnaire',
        title: 'Preparazione Questionario DD',
        description: 'Predisporre il questionario per il Business Associate',
        completed: false,
      },
    ],
    previousNodes: [{ nodeId: 'catSel', label: 'Torna a Fattispecie' }],
    nextNodes: [{ nodeId: 'questCheck', condition: 'always', label: 'Procedi' }],
  },

  riskCheck: {
    id: 'riskCheck',
    title: 'VALUTAZIONE RISCHIO TVR',
    description: 'Valutazione del rischio TVR (1-4)',
    type: 'decision',
    phase: 2,
    phaseName: 'FASE 2: MATRICE DI SCOPING',
    questions: [
      {
        id: 'risk_level',
        text: 'Quale è il livello di rischio TVR?',
        type: 'radio',
        options: ['1-2 (Basso)', '3-4 (Alto)'],
        required: true,
        helpText: 'Valuta il rischio sulla base della TVR',
      },
    ],
    previousNodes: [{ nodeId: 'catSel', label: 'Torna a Fattispecie' }],
    nextNodes: [
      {
        nodeId: 'l12',
        condition: 'risk_level === "1-2 (Basso)"',
        label: 'Rischio Basso',
      },
      {
        nodeId: 'questReq',
        condition: 'risk_level === "3-4 (Alto)"',
        label: 'Rischio Alto',
      },
    ],
  },

  l12: {
    id: 'l12',
    title: 'NO QUESTIONARIO RICHIESTO',
    description: 'Rischio basso - Questionario non obbligatorio',
    type: 'action',
    phase: 2,
    phaseName: 'FASE 2: MATRICE DI SCOPING',
    actions: [
      {
        id: 'low_risk_action',
        title: 'Documentazione Rischio Basso',
        description: 'Registrare la valutazione di rischio basso',
        completed: false,
      },
    ],
    previousNodes: [{ nodeId: 'riskCheck', label: 'Torna a Valutazione Rischio' }],
    nextNodes: [{ nodeId: 'satB', condition: 'always', label: 'Procedi' }],
  },

  questReq: {
    id: 'questReq',
    title: 'OBBLIGO QUESTIONARIO (6.1.1)',
    description: 'Questionario obbligatorio per rischio alto',
    type: 'action',
    phase: 2,
    phaseName: 'FASE 2: MATRICE DI SCOPING',
    actions: [
      {
        id: 'high_risk_questionnaire',
        title: 'Preparazione Questionario DD',
        description: 'Predisporre il questionario per rischio alto',
        completed: false,
      },
    ],
    previousNodes: [{ nodeId: 'riskCheck', label: 'Torna a Valutazione Rischio' }],
    nextNodes: [{ nodeId: 'questCheck', condition: 'always', label: 'Procedi' }],
  },

  questCheck: {
    id: 'questCheck',
    title: 'RICEZIONE QUESTIONARIO',
    description: 'Verifica della ricezione del questionario',
    type: 'decision',
    phase: 2,
    phaseName: 'FASE 2: MATRICE DI SCOPING',
    questions: [
      {
        id: 'questionnaire_received',
        text: 'Il questionario è stato ricevuto?',
        type: 'radio',
        options: ['Sì', 'No'],
        required: true,
        helpText: 'Verifica se la controparte ha inviato il questionario compilato',
      },
    ],
    previousNodes: [{ nodeId: 'catSel', label: 'Torna a Fattispecie' }],
    nextNodes: [
      {
        nodeId: 'satB',
        condition: 'questionnaire_received === "Sì"',
        label: 'Questionario Ricevuto',
      },
      {
        nodeId: 'l23',
        condition: 'questionnaire_received === "No"',
        label: 'Richiesta alla CTP',
      },
    ],
  },

  l23: {
    id: 'l23',
    title: 'RICHIESTA QUESTIONARIO ALLA CTP',
    description: 'Inviare richiesta di completamento alla controparte',
    type: 'action',
    phase: 2,
    phaseName: 'FASE 2: MATRICE DI SCOPING',
    actions: [
      {
        id: 'ctp_request',
        title: 'Richiesta alla CTP',
        description: 'Inviare richiesta formale di completamento del questionario',
        completed: false,
      },
    ],
    previousNodes: [{ nodeId: 'questCheck', label: 'Torna a Ricezione Questionario' }],
    nextNodes: [{ nodeId: 'docCheck', condition: 'always', label: 'Torna alla Verifica' }],
  },

  // FASE 3: ASSETTO PROPRIETARIO - SATELLITE B
  satB: {
    id: 'satB',
    title: 'SATELLITE B: RICOSTRUZIONE ASSETTO E SOGLIE',
    description: 'Analisi della struttura proprietaria e identificazione dei titolari',
    type: 'satellite',
    phase: 3,
    phaseName: 'FASE 3: ASSETTO PROPRIETARIO (Par. 6.2)',
    satelliteLink: 'satellite-b',
    actions: [
      {
        id: 'sat_b_entry',
        title: 'Accesso a Satellite B',
        description: 'Clicca per accedere al workflow dettagliato di Satellite B',
        completed: false,
      },
    ],
    previousNodes: [{ nodeId: 'questCheck', label: 'Torna a Ricezione Questionario' }],
    nextNodes: [{ nodeId: 'satC', condition: 'always', label: 'Procedi a Satellite C' }],
  },

  // FASE 4: ANALISI OPERATIVA - SATELLITE C
  satC: {
    id: 'satC',
    title: 'SATELLITE C: SCREENING E FONTI APERTE',
    description: 'Screening reputazionale e analisi da fonti aperte',
    type: 'satellite',
    phase: 4,
    phaseName: 'FASE 4: ANALISI OPERATIVA E REPUTAZIONALE (Par. D/E/F)',
    satelliteLink: 'satellite-c',
    actions: [
      {
        id: 'sat_c_entry',
        title: 'Accesso a Satellite C',
        description: 'Clicca per accedere al workflow dettagliato di Satellite C',
        completed: false,
      },
    ],
    previousNodes: [{ nodeId: 'satB', label: 'Torna a Satellite B' }],
    nextNodes: [{ nodeId: 'evalOutcome', condition: 'always', label: 'Procedi' }],
  },

  // FASE 5: REPORTING & CHIUSURA
  evalOutcome: {
    id: 'evalOutcome',
    title: 'ESITO SATELLITE C',
    description: 'Valutazione dell\'esito dello screening',
    type: 'decision',
    phase: 5,
    phaseName: 'FASE 5: REPORTING & CHIUSURA (Par. G)',
    questions: [
      {
        id: 'screening_outcome',
        text: 'Quale è l\'esito dello screening?',
        type: 'radio',
        options: [
          'Nessun riscontro',
          'Falso Positivo',
          'Altra positività',
          'Positività mitigata',
          'Red Flag',
        ],
        required: true,
        helpText: 'Seleziona l\'esito sulla base dei risultati dello screening',
      },
    ],
    nextNodes: [
      {
        nodeId: 'form1',
        condition: 'screening_outcome !== "Red Flag"',
        label: 'Esito Negativo',
      },
      {
        nodeId: 'form2',
        condition: 'screening_outcome === "Red Flag"',
        label: 'Red Flag',
      },
    ],
  },

  form1: {
    id: 'form1',
    title: 'ESITO NEGATIVO',
    description: 'Preparazione rapporto con esito negativo',
    type: 'outcome',
    phase: 5,
    phaseName: 'FASE 5: REPORTING & CHIUSURA (Par. G)',
    actions: [
      {
        id: 'form1_report',
        title: 'Invio RAPPORTO DD A DDM',
        description: 'Preparare e inviare il rapporto con esito negativo',
        completed: false,
      },
    ],
    previousNodes: [{ nodeId: 'evalOutcome', label: 'Torna a Valutazione Esito' }],
    nextNodes: [{ nodeId: 'end', condition: 'always', label: 'Chiudi' }],
  },

  form2: {
    id: 'form2',
    title: 'ESITO POSITIVO - RED FLAG',
    description: 'Preparazione rapporto con Red Flag',
    type: 'outcome',
    phase: 5,
    phaseName: 'FASE 5: REPORTING & CHIUSURA (Par. G)',
    actions: [
      {
        id: 'form2_report',
        title: 'Invio RAPPORTO DD A DDM',
        description: 'Preparare e inviare il rapporto con Red Flag',
        completed: false,
      },
      {
        id: 'bic_escalation',
        title: 'INVIO AL PRESIDIO BIC / AC-AML',
        description: 'Escalation al presidio BIC/AC-AML per approfondimento',
        completed: false,
      },
    ],
    nextNodes: [{ nodeId: 'end', condition: 'always', label: 'Chiudi' }],
  },

  end: {
    id: 'end',
    title: 'PROCEDURA COMPLETATA',
    description: 'Fine del workflow di due diligence',
    type: 'end',
    phase: 5,
    phaseName: 'FASE 5: REPORTING & CHIUSURA (Par. G)',
    previousNodes: [{ nodeId: 'form1', label: 'Torna a Esito Negativo' }, { nodeId: 'form2', label: 'Torna a Red Flag' }],
    nextNodes: [],
  },
};

// Definizione delle fasi
export const phases = [
  { number: 1, name: 'VERIFICA DOCUMENTALE', color: 'bg-blue-100' },
  { number: 2, name: 'MATRICE DI SCOPING', color: 'bg-purple-100' },
  { number: 3, name: 'ASSETTO PROPRIETARIO', color: 'bg-cyan-100' },
  { number: 4, name: 'ANALISI OPERATIVA', color: 'bg-green-100' },
  { number: 5, name: 'REPORTING & CHIUSURA', color: 'bg-yellow-100' },
];

export const getTotalSteps = (): number => Object.keys(workflowNodes).length;

export const getPhaseNodes = (phaseNumber: number): WorkflowNode[] => {
  return Object.values(workflowNodes).filter((node) => node.phase === phaseNumber);
};
