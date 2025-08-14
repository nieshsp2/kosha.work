import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Start from "./pages/Start";
import UserInfo from "./pages/UserInfo";
import AssessmentExplanation from "./pages/AssessmentExplanation";
import Assessment from "./pages/Assessment";
import Question from "./pages/Question";
import Results from "./pages/Results";
const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/start" element={<Start />} />
                  <Route path="/user-info" element={<UserInfo />} />
        <Route path="/assessment-explanation" element={<AssessmentExplanation />} />
        <Route path="/assessment" element={<Assessment />} />
        <Route path="/assessment/question/:orderIndex" element={<Question />} />
        <Route path="/assessment/results" element={<Results />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
