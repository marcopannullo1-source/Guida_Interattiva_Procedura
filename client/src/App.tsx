import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch, Router } from "wouter"; // Aggiunto Router
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import { WorkflowProvider } from "./contexts/WorkflowContext";
import Home from "./pages/Home";
import SatelliteB from "./pages/SatelliteB";
import SatelliteC from "./pages/SatelliteC";

// Definiamo la base path per GitHub Pages
const base = "/Guida_Interattiva_Procedura";

function AppRouter() {
  return (
    <Router base={base}>
      <Switch>
        <Route path="/" component={Home} />
        <Route path="/satellite-b" component={SatelliteB} />
        <Route path="/satellite-c" component={SatelliteC} />
        <Route path="/404" component={NotFound} />
        <Route component={NotFound} />
      </Switch>
    </Router>
  );
}

function App() {
  return (
    // Questo "base" dice a tutta l'app di aggiungere il nome del repo a ogni link
    <Router base="/Guida_Interattiva_Procedura">
      <ErrorBoundary>
        <ThemeProvider defaultTheme="light">
          <WorkflowProvider>
            <TooltipProvider>
              <Toaster />
              <Switch>
                <Route path="/" component={Home} />
                <Route path="/satellite-b" component={SatelliteB} />
                <Route path="/satellite-c" component={SatelliteC} />
                <Route component={NotFound} />
              </Switch>
            </TooltipProvider>
          </WorkflowProvider>
        </ThemeProvider>
      </ErrorBoundary>
    </Router>
  );
}

export default App;
