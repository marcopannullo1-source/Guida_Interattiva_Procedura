/**
 * Diagrammi Mermaid per i Satelliti
 */

export const satelliteBDiagram = `graph TD
    Start_SatB([START SATELLITE B]) --> Triage{Identificazione <br/>Fattispecie e Rischio}
    Triage -- "M&A, JV, CVC, Sponsor, <br/>Iniziative No-Profit L2" --> Threshold_20["SOGLIA >= 20% <br/>P. Fisiche e Giuridiche"]
    Threshold_20 --> Get_20["Identificazione Titolari >= 20%"]
    Triage -- "M&A, JV, CVC L1 Strategico" --> Threshold_10["SOGLIA >= 10% <br/>Look-through Totale"]
    Threshold_10 --> Get_10["Identificazione UBO >= 10%"]
    Triage -- "Intermediari / Agenti" --> Threshold_BA["SOGLIA >= 10% <br/>Fissa / Rafforzata"]
    Threshold_BA --> Get_BA["Identificazione UBO >= 10%"]
    Triage -- "Fornitori / Clienti L3-4" --> Threshold_25["SOGLIA > 25% <br/>UBO AML Standard"]
    Threshold_25 --> Get_25["Identificazione UBO > 25%"]
    Triage -- "Fornitori / Clienti L2" --> Threshold_50["SOGLIA > 50% <br/>Controllo di Diritto"]
    Threshold_50 --> Get_50["Identificazione Azionista Controllo"]
    Triage -- "Fornitori / Clienti L1" --> Threshold_Zero["SOGLIA 0% ASSETTO"]
    Threshold_Zero --> Get_LR["Identificazione LR e Referenti"]
    Triage -- "Questionario DD <br/>Par. 6.2" --> Questionnaire["ANALISI DICHIARAZIONI <br/>CONTROPARTE"]
    Questionnaire --> Get_SelfDecl["Estrai Nominativi PEP/Sanzionati <br/>dichiarati Sotto Soglia"]
    Get_20 & Get_10 & Get_BA & Get_25 & Get_50 & Get_LR & Get_SelfDecl --> Consolidation["CONSOLIDAMENTO LISTA NOMINATIVI <br/>Persone Fisiche e Giuridiche"]
    Consolidation --> End_SatB([FINE SATELLITE B])
    
    style Threshold_20 fill:#e1f5fe,stroke:#01579b,stroke-width:2px
    style Threshold_10 fill:#fce4ec,stroke:#880e4f,stroke-width:2px
    style Questionnaire fill:#fff9c4,stroke:#fbc02d,stroke-width:2px
    style Consolidation fill:#e8f5e9,stroke:#2e7d32,stroke-width:2px`;

export const satelliteCDiagram = `graph TD
    Start_SatC([START SATELLITE C]) --> InputList[Input: Lista Nominativi Consolidata]
    InputList --> Scenario_Triage{Triage Fattispecie <br/> vs Risk Assessment}
    Scenario_Triage -- "Business Associate / M&A <br/> JV / CVC / Sponsor" --> Provider_High["SISTEMI FULL ACCESS: <br/> DD4Eni 2.0 / ORBIS / DJ ASAM <br/> DJ Factiva / WCO / Google-Bing Web"]
    Scenario_Triage -- "Fornitori e Clienti <br/> Rischio Medio-Alto" --> Provider_Std["SISTEMI STANDARD: <br/> DD4Eni 2.0 / CRIBIS-D&B <br/> DJ Factiva / Google Web"]
    Scenario_Triage -- "Fornitori e Clienti <br/> Rischio Basso" --> Provider_Low["SISTEMI ESSENTIAL: <br/> DD4Eni 2.0 / Liste Sanzioni <br/> tramite DJ ASAM / WCO"]
    Provider_High & Provider_Std & Provider_Low --> Search_Execution["ESECUZIONE RICERCA INTEGRATA: <br/> 1. Liste Sanzioni/PEP WCO / DJ ASAM <br/> 2. DB Reputazionali DJ Factiva / ORBIS <br/> 3. OSINT Google / Bing Web"]
    Search_Execution --> Found_Check{Riscontro <br/>Individuato?}
    Found_Check -- "NO" --> E_Clear["ESITO: <br/> NESSUN RISCONTRO"]
    E_Clear --> Form1[REPORT: FORM 1]
    Found_Check -- "SI" --> E_CheckID{"Soggetto coincidente? <br/> Check Omonimia"}
    E_CheckID -- "NO" --> E_FP["ESITO: FALSO POSITIVO"]
    E_FP --> E_NoteFP["Azione: Nota omonimia <br/> nel Test Book"]
    E_NoteFP --> Form1
    E_CheckID -- "SI Pertinente" --> E_WhatType{Tipologia di <br/>Riscontro?}
    E_WhatType -- "RED FLAG <br/> Corruzione, AML, Mafia" --> E_RF_Time{Vicenda < 15 anni <br/> o Pendente?}
    E_RF_Time -- "SI" --> Mandatory_CP["WORKFLOW: VERIFICA OBBLIGATORIA <br/> COMPLIANCE PROGRAM Par. F"]
    E_RF_Time -- "NO Obsoleta / <br/> Assoluzione" --> E_Mit["ESITO: POSITIVITA MITIGATA"]
    E_Mit --> E_ActionMit["Azione: Descrizione vicenda <br/> con elementi mitiganti"]
    E_WhatType -- "ALTRA POSITIVITA <br/> Antitrust, HSE, Etica" --> E_Alt["ESITO: ALTRA POSITIVITA"]
    E_Alt --> E_ActionAlt["Azione: Inserimento in Testbook <br/> TAB ALTRA POSITIVITA"]
    Mandatory_CP --> CP_Eval{Programma <br/>Efficace?}
    CP_Eval -- "NO" --> E_RF_Final["CONFERMA: RED FLAG"]
    CP_Eval -- "SI" --> E_Mit
    E_RF_Final --> RedFlag_Escalation["APPROFONDIMENTO SISTEMI: <br/> DJ Factiva / DJ ASAM / WCO"]
    RedFlag_Escalation --> E_ActionRF["Azione: STANDARD TESTO RF <br/> Linguaggio Condizionale"]
    E_ActionRF --> End_SatC([FINE SATELLITE C])
    Form1 --> End_SatC
    E_ActionMit --> End_SatC
    E_ActionAlt --> End_SatC`;

export const masterDiagram = `---
config:
  layout: dagre
---
flowchart TB
   Start(["RICEZIONE PRATICA"]) --> DocCheck["FASE 1: VERIFICA DOCUMENTALE"]
 
 subgraph Fase_2_Scoping["FASE 2: MATRICE DI SCOPING"]
        CatSel{"Fattispecie ACCORDO"}
        BA_Path["OBBLIGO Questionario DD"]
        BA_Logic["OBBLIGO Questionario"]
        RiskCheck{"Rischio TVR?"}
        L12["No Questionario"]
        QuestReq["OBBLIGO Questionario"]
        QuestCheck{"Ricezione <br/>Questionario?"}
  end
 subgraph Fase_3_Screening["FASE 3: ASSETTO PROPRIETARIO"]
        SatB[["SATELLITE B"]]
  end
 subgraph Fase_4_Analisi["FASE 4: ANALISI OPERATIVA"]
        SatC[["SATELLITE C"]]
  end
 subgraph Fase_5_Reporting["FASE 5: REPORTING"]
        EvalOutcome{"Esito?"}
        Form1["ESITO NEGATIVO"]
        Form2["ESITO POSITIVO"]
        BIC["INVIO BIC / AC-AML"]
  end
    DocCheck --> CatSel
    CatSel -- Business Agreement --> BA_Path
    CatSel -- Business Associate --> BA_Logic
    CatSel -- Fornitori/Clienti --> RiskCheck
    RiskCheck -- Basso --> L12
    RiskCheck -- Alto --> QuestReq
    BA_Path --> QuestCheck
    BA_Logic --> QuestCheck
    QuestReq --> QuestCheck
    QuestCheck -- SI --> SatB
    QuestCheck -- NO --> L23["Richiesta CTP"]
    L12 --> SatB
    SatB --> SatC
    SatC --> EvalOutcome
    EvalOutcome -- Negativo --> Form1
    EvalOutcome -- Positivo --> Form2
    Form1
    Form2 --> BIC
    L23 --> DocCheck
    
    style SatB fill:#e1f5fe,stroke:#01579b,stroke-width:2px
    style SatC fill:#e1f5fe,stroke:#01579b,stroke-width:2px
    style BIC fill:#fff9c4,stroke:#fbc02d,stroke-width:2px`;
