
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { TooltipProvider } from "@/components/ui/tooltip";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import SubjectDetails from "./pages/SubjectDetails";
import QuestionsPage from "./pages/QuestionsPage";
import QuizResults from "./pages/QuizResults";
import MyReport from "./pages/MyReport";
import ImprovementPlanPage from "./pages/ImprovementPlanPage";
import SubjectProgressPage from "./pages/SubjectProgressPage";
import QuizDetails from "./pages/QuizDetails";
import QuizResultDetails from "./pages/QuizResultDetails";
import TestAnalysis from "./pages/TestAnalysis";

// Create a client for React Query
const queryClient = new QueryClient();

/**
 * Main App Component
 * Provides context providers and routing for the application
 */
const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          {/* Main routes */}
          <Route path="/" element={<Index />} />
          <Route path="/subject/:subjectId" element={<SubjectDetails />} />
          <Route path="/questions/:subjectId/:setId" element={<QuestionsPage />} />
          <Route path="/quiz-results" element={<QuizResults />} />
          <Route path="/my-report" element={<MyReport />} />
          
          {/* New routes for detailed features */}
          <Route path="/improvement-plan/:subjectId" element={<ImprovementPlanPage />} />
          <Route path="/subject-progress/:subjectId" element={<SubjectProgressPage />} />
          <Route path="/quiz/:subjectId/:quizId" element={<QuizDetails />} />
          <Route path="/quiz-result/:resultId" element={<QuizResultDetails />} />
          <Route path="/test-analysis/:testId" element={<TestAnalysis />} />
          
          {/* 404 fallback */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
