import React from 'react';
import { useLocation } from 'wouter';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { MermaidDiagram } from '@/components/MermaidDiagram';
import { satelliteCDiagram } from '@/lib/satelliteDiagrams';
import { ArrowLeft, AlertTriangle } from 'lucide-react';

export default function SatelliteC() {
  const [, setLocation] = useLocation();

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setLocation('/')}
              className="gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              Torna al Workflow
            </Button>
            <div>
              <h1 className="text-3xl font-bold text-slate-900">SATELLITE C</h1>
              <p className="text-sm text-slate-600">Screening e Fonti Aperte</p>
            </div>
          </div>
        </div>
      </header>

      {/* Contenuto */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Pannello Sinistro: Informazioni */}
          <div className="lg:col-span-1 space-y-6">
            {/* Descrizione */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Descrizione</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <p className="text-sm text-slate-700">
                  Satellite C gestisce lo screening reputazionale e l'analisi da fonti aperte per identificare rischi e red flag.
                </p>
                <div className="p-3 bg-orange-50 rounded border border-orange-200">
                  <p className="text-xs font-semibold text-orange-900 mb-2">Fase 4 - Par. D/E/F</p>
                  <p className="text-xs text-orange-800">
                    Analisi Operativa e Reputazionale - Screening Integrato
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Sistemi di Ricerca */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Sistemi di Ricerca</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="space-y-2">
                  <div className="p-2 bg-red-50 rounded border border-red-200">
                    <p className="text-xs font-semibold text-red-900">FULL ACCESS</p>
                    <p className="text-xs text-red-800">DD4Eni 2.0, ORBIS, DJ ASAM, Factiva, WCO</p>
                  </div>
                  <div className="p-2 bg-yellow-50 rounded border border-yellow-200">
                    <p className="text-xs font-semibold text-yellow-900">STANDARD</p>
                    <p className="text-xs text-yellow-800">DD4Eni 2.0, CRIBIS-D&B, Factiva</p>
                  </div>
                  <div className="p-2 bg-green-50 rounded border border-green-200">
                    <p className="text-xs font-semibold text-green-900">ESSENTIAL</p>
                    <p className="text-xs text-green-800">DD4Eni 2.0, Liste Sanzioni</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Esiti Possibili */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Esiti Possibili</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 text-sm">
                <div className="flex items-start gap-2">
                  <div className="w-2 h-2 rounded-full bg-green-600 mt-1.5 flex-shrink-0" />
                  <p className="text-slate-700">Nessun Riscontro</p>
                </div>
                <div className="flex items-start gap-2">
                  <div className="w-2 h-2 rounded-full bg-yellow-600 mt-1.5 flex-shrink-0" />
                  <p className="text-slate-700">Falso Positivo</p>
                </div>
                <div className="flex items-start gap-2">
                  <div className="w-2 h-2 rounded-full bg-orange-600 mt-1.5 flex-shrink-0" />
                  <p className="text-slate-700">Altra Positività</p>
                </div>
                <div className="flex items-start gap-2">
                  <div className="w-2 h-2 rounded-full bg-red-600 mt-1.5 flex-shrink-0" />
                  <p className="text-slate-700">Red Flag</p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Pannello Destro: Diagramma */}
          <div className="lg:col-span-2">
            <Card className="h-full">
              <CardHeader>
                <CardTitle>Workflow Satellite C</CardTitle>
                <CardDescription>Flusso di screening reputazionale e analisi da fonti aperte</CardDescription>
              </CardHeader>
              <CardContent>
                <MermaidDiagram diagram={satelliteCDiagram} />
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Avviso Red Flag */}
        <div className="mt-8 p-6 bg-red-50 rounded-lg border border-red-200">
          <div className="flex items-start gap-3">
            <AlertTriangle className="w-6 h-6 text-red-600 flex-shrink-0 mt-0.5" />
            <div>
              <h3 className="font-semibold text-red-900 mb-2">Red Flag - Escalation Obbligatoria</h3>
              <p className="text-sm text-red-800 mb-3">
                In caso di Red Flag (reati allegato 1, corruzione, AML, mafia), è obbligatorio:
              </p>
              <ol className="list-decimal list-inside space-y-1 text-sm text-red-800">
                <li>Verificare l'efficacia del Compliance Program</li>
                <li>Approfondire con sistemi specializzati (DJ Factiva, DJ ASAM, WCO)</li>
                <li>Escalare al Presidio BIC / AC-AML</li>
              </ol>
            </div>
          </div>
        </div>

        {/* Pulsante Torna */}
        <div className="mt-8 flex justify-center">
          <Button
            onClick={() => setLocation('/')}
            size="lg"
            className="gap-2"
          >
            <ArrowLeft className="w-5 h-5" />
            Torna al Workflow Principale
          </Button>
        </div>
      </div>
    </div>
  );
}
