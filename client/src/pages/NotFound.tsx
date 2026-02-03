import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { AlertCircle, Home } from "lucide-react";
import { Link } from "wouter"; // Importiamo Link invece di useLocation

export default function NotFound() {
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100">
      <Card className="w-full max-w-lg mx-4 shadow-lg border-0 bg-white/80 backdrop-blur-sm">
        <CardContent className="pt-8 pb-8 text-center">
          <div className="flex justify-center mb-6">
            <div className="relative">
              <div className="absolute inset-0 bg-red-100 rounded-full animate-pulse" />
              <AlertCircle className="relative h-16 w-16 text-red-500" />
            </div>
          </div>

          <h1 className="text-4xl font-bold text-slate-900 mb-2">404</h1>
          <h2 className="text-xl font-semibold text-slate-700 mb-4">Pagina non trovata</h2>
          <p className="text-slate-600 mb-8 leading-relaxed">
            Spiacenti, la pagina che stai cercando non esiste.<br />
            Potrebbe essere stata spostata o rimossa.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            {/* Usando Link con il Router base impostato in App.tsx, 
                "/" punterà automaticamente alla cartella corretta del repo */}
            <Link href="/">
              <Button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-2.5 rounded-lg flex items-center gap-2 transition-all">
                <Home className="h-4 w-4" />
                Torna alla Home
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
