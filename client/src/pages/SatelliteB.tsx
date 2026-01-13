import React from 'react';
import { useLocation } from 'wouter';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { MermaidDiagram } from '@/components/MermaidDiagram';
import { satelliteBDiagram } from '@/lib/satelliteDiagrams';
import { ArrowLeft, CheckCircle2 } from 'lucide-react';

export default function SatelliteB() {
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
              <h1 className="text-3xl font-bold text-slate-900">SATELLITE B</h1>
              <p className="text-sm text-slate-600">Ricostruzione Assetto e Soglie</p>
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
                  Satellite B gestisce l'analisi della struttura proprietaria e l'identificazione dei titolari secondo le soglie stabilite.
                </p>
                <div className="p-3 bg-blue-50 rounded border border-blue-200">
                  <p className="text-xs font-semibold text-blue-900 mb-2">Fase 3 - Par. 6.2</p>
                  <p className="text-xs text-blue-800">
                    Assetto Proprietario - Identificazione UBO e Titolari
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Flussi Principali */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Flussi Principali</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="space-y-2">
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                    <div className="text-sm">
                      <p className="font-semibold text-slate-900">Canale A</p>
                      <p className="text-slate-600">Ricostruzione per Soglia (Visure/DB)</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                    <div className="text-sm">
                      <p className="font-semibold text-slate-900">Canale B</p>
                      <p className="text-slate-600">Dichiarazioni Soglia Zero (Questionario DD)</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Soglie */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Soglie di Identificazione</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 text-sm">
                <div className="p-2 bg-slate-50 rounded">
                  <p className="font-semibold text-slate-900">M&A/JV/CVC (L2)</p>
                  <p className="text-slate-600">&gt;= 20%</p>
                </div>
                <div className="p-2 bg-slate-50 rounded">
                  <p className="font-semibold text-slate-900">M&A/JV/CVC (L1)</p>
                  <p className="text-slate-600">&gt;= 10% (Look-through)</p>
                </div>
                <div className="p-2 bg-slate-50 rounded">
                  <p className="font-semibold text-slate-900">Fornitori/Clienti (L3-4)</p>
                  <p className="text-slate-600">&gt; 25%</p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Pannello Destro: Diagramma */}
          <div className="lg:col-span-2">
            <Card className="h-full">
              <CardHeader>
                <CardTitle>Workflow Satellite B</CardTitle>
                <CardDescription>Flusso di identificazione dell'assetto proprietario</CardDescription>
              </CardHeader>
              <CardContent>
                <MermaidDiagram diagram={satelliteBDiagram} />
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Azioni */}
        <div className="mt-8 p-6 bg-white rounded-lg border border-slate-200">
          <h3 className="text-lg font-semibold text-slate-900 mb-4">Prossimi Step</h3>
          <div className="space-y-3">
            <p className="text-sm text-slate-700">
              Una volta completata l'analisi di Satellite B, procedi con:
            </p>
            <ol className="list-decimal list-inside space-y-2 text-sm text-slate-700">
              <li>Consolidamento della lista nominativi</li>
              <li>Trasmissione a Satellite C per lo screening reputazionale</li>
              <li>Valutazione degli esiti</li>
            </ol>
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
