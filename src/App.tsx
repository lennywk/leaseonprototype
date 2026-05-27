import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import { CompareProvider } from "@/context/CompareContext";
import Landing from "./pages/Landing";
import UnitDetail from "./pages/UnitDetail";
import Inquiry from "./pages/Inquiry";
import Confirmation from "./pages/Confirmation";
import DemoEmailInternal from "./pages/DemoEmailInternal";
import DemoEmailApplicant from "./pages/DemoEmailApplicant";
import Compare from "./pages/Compare";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
          <CompareProvider>
            <Routes>
              <Route path="/" element={<Landing />} />
              <Route path="/unit/:id" element={<UnitDetail />} />
              <Route path="/inquiry/:id" element={<Inquiry />} />
              <Route path="/confirmation" element={<Confirmation />} />
              <Route path="/demo/email-internal" element={<DemoEmailInternal />} />
              <Route path="/demo/email-applicant" element={<DemoEmailApplicant />} />
              <Route path="/compare" element={<Compare />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </CompareProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
