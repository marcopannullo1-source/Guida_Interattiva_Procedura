# Guida Interattiva Procedura - Workflow Manager

Una Web App interattiva basata su React che guida l'utente attraverso un complesso workflow procedurale di due diligence con logica **what/if** e interfaccia a doppio schermo.

## 🎯 Caratteristiche Principali

### 1. **Interfaccia a Doppio Schermo**
- **Pannello Orizzontale (Top)**: Dashboard di progresso con 5 fasi, indicatore percentuale e step completati
- **Pannello Verticale (Left)**: Visualizzazione del diagramma Mermaid del workflow master
- **Pannello Verticale (Right)**: Pannello azioni con domande, check-box e navigazione

### 2. **Logica What/If**
- Percorsi alternativi basati sulle risposte dell'utente
- Valutazione automatica delle condizioni
- Gestione dello stato completo del workflow

### 3. **Nodi Interattivi**
- **Nodi Decisione**: Domande con radio button e opzioni multiple
- **Nodi Azione**: Checklist e task da completare
- **Nodi Satellite**: Accesso ai workflow dettagliati (Satellite B e C)
- **Nodi Esito**: Risultati finali con escalation

### 4. **Diagrammi Mermaid Integrati**
- Visualizzazione dinamica del workflow master
- Diagrammi dettagliati per Satellite B (Assetto Proprietario)
- Diagrammi dettagliati per Satellite C (Screening Reputazionale)

## 📊 Struttura del Workflow

### Fasi Principali

1. **FASE 1: VERIFICA DOCUMENTALE** (Par. 6.1)
   - Ricezione pratica
   - Verifica completezza documentazione

2. **FASE 2: MATRICE DI SCOPING** (Par. 6.1)
   - Classificazione fattispecie accordo
   - Valutazione rischio TVR
   - Gestione questionario DD

3. **FASE 3: ASSETTO PROPRIETARIO** (Par. 6.2)
   - **SATELLITE B**: Ricostruzione assetto e soglie
   - Identificazione titolari e UBO

4. **FASE 4: ANALISI OPERATIVA** (Par. D/E/F)
   - **SATELLITE C**: Screening e fonti aperte
   - Valutazione rischi reputazionali

5. **FASE 5: REPORTING & CHIUSURA** (Par. G)
   - Valutazione esiti
   - Generazione rapporti
   - Escalation BIC/AC-AML

## 🚀 Come Usare

### Navigazione Principale
1. Rispondi alle domande nel pannello destro
2. Completa le azioni richieste con i check-box
3. Clicca "Procedi al Prossimo Step" per avanzare
4. Il dashboard orizzontale mostra il progresso

### Accesso ai Satelliti
- Quando raggiungi la **FASE 3** o **FASE 4**, puoi accedere ai satelliti
- Clicca "Accedi al Satellite" per visualizzare il workflow dettagliato
- Usa "Torna al Workflow Principale" per ritornare

### Ricominciare
- Clicca il pulsante "Ricomincia" nell'header per resettare il workflow

## 🏗️ Architettura Tecnica

### Stack Tecnologico
- **Frontend**: React 19 + TypeScript
- **Styling**: Tailwind CSS 4 + shadcn/ui
- **Routing**: Wouter (client-side routing)
- **Diagrammi**: Mermaid.js
- **State Management**: React Context API

### Struttura File
```
client/src/
├── pages/
│   ├── Home.tsx              # Workflow principale
│   ├── SatelliteB.tsx        # Satellite B
│   └── SatelliteC.tsx        # Satellite C
├── components/
│   ├── ProgressDashboard.tsx # Dashboard progresso
│   ├── ActionPanel.tsx       # Pannello azioni
│   └── MermaidDiagram.tsx    # Visualizzazione diagrammi
├── contexts/
│   └── WorkflowContext.tsx   # Gestione stato workflow
└── lib/
    ├── workflowData.ts       # Definizione nodi e fasi
    └── satelliteDiagrams.ts  # Diagrammi Mermaid
```

### Gestione dello Stato
Il `WorkflowContext` gestisce:
- **currentNodeId**: Nodo corrente
- **completedNodes**: Set di nodi completati
- **nodeAnswers**: Risposte alle domande per nodo
- **completedActions**: Azioni completate
- **currentPhase**: Fase corrente
- **totalPhases**: Numero totale di fasi

## 🔄 Logica What/If

### Valutazione Condizioni
Le condizioni sono valutate dinamicamente in base alle risposte:
```javascript
// Esempio: "fattispecie === 'Business Agreement / Investimenti (M&A, JV)'"
// Viene valutata in base al valore di answers['fattispecie']
```

### Percorsi Alternativi
Ogni nodo può avere più percorsi successivi:
- Se **condition === 'always'**: il percorso è sempre seguito
- Altrimenti: la condizione viene valutata sulle risposte

## 📱 Responsive Design

- **Desktop**: Layout a doppio schermo con pannelli affiancati
- **Tablet/Mobile**: Layout verticale con stack dei pannelli

## 🎨 Personalizzazione

### Aggiungere Nuovi Nodi
1. Modifica `client/src/lib/workflowData.ts`
2. Aggiungi il nodo all'oggetto `workflowNodes`
3. Configura domande, azioni e percorsi successivi

### Modificare Diagrammi
1. Aggiorna i diagrammi Mermaid in `client/src/lib/satelliteDiagrams.ts`
2. I diagrammi si aggiorneranno automaticamente

### Cambiare Colori/Stili
- Modifica `client/src/index.css` per i token di design
- Usa le classi Tailwind nei componenti

## 🧪 Testing

### Flussi di Test Consigliati

1. **Percorso Business Agreement**
   - Seleziona "Business Agreement" in FASE 2
   - Verifica il flusso verso il questionario DD

2. **Percorso Rischio Basso**
   - Seleziona "Fornitori/Clienti" e rischio "1-2 (Basso)"
   - Verifica il bypass del questionario

3. **Accesso Satelliti**
   - Raggiungi FASE 3 e accedi a Satellite B
   - Raggiungi FASE 4 e accedi a Satellite C

4. **Red Flag**
   - Completa il workflow fino a FASE 5
   - Seleziona "Red Flag" come esito

## 📚 Documentazione Aggiuntiva

### Parametri Riferimento
- **Par. 6.1**: Matrice di Scoping
- **Par. 6.2**: Assetto Proprietario
- **Par. D/E/F**: Analisi Operativa e Reputazionale
- **Par. G**: Reporting e Chiusura

### Soglie di Identificazione
- **M&A/JV/CVC (L2)**: >= 20%
- **M&A/JV/CVC (L1)**: >= 10% (Look-through)
- **Fornitori/Clienti (L3-4)**: > 25%
- **Fornitori/Clienti (L2)**: > 50%
- **Fornitori/Clienti (L1)**: 0% (LR e Referenti)

## 🔐 Note di Sicurezza

- Tutte le risposte sono memorizzate localmente nel browser
- Non viene effettuato alcun invio di dati a server esterni
- I dati vengono persi al refresh della pagina (è possibile aggiungere localStorage)

## 🚀 Deployment

La Web App è pronta per il deployment su Manus:
1. Clicca il pulsante "Publish" nella Management UI
2. La Web App sarà disponibile su un dominio pubblico

## 📞 Supporto

Per domande o problemi:
1. Consulta la documentazione del workflow
2. Verifica i diagrammi Mermaid per la logica
3. Controlla il pannello di progresso per lo stato corrente
