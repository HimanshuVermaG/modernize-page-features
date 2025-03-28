
import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";
import confetti from "canvas-confetti";
import ResultSummary from "@/components/quiz/ResultSummary";
import AnswerReview from "@/components/quiz/AnswerReview";
import ResultActions from "@/components/quiz/ResultActions";

const QuizResults = () => {
  const location = useLocation();
  const { result } = location.state || { 
    result: {
      subjectId: 1,
      subjectName: "Unknown",
      totalQuestions: 0,
      correctAnswers: 0,
      timeSpent: 0,
      answers: []
    }
  };
  
  const percentage = Math.round((result.correctAnswers / result.totalQuestions) * 100);
  
  React.useEffect(() => {
    // Trigger confetti if score is good
    if (percentage >= 70) {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      });
    }
  }, [percentage]);

  const getGrade = (percent: number) => {
    if (percent >= 90) return { grade: "A+", color: "text-green-500" };
    if (percent >= 80) return { grade: "A", color: "text-green-500" };
    if (percent >= 70) return { grade: "B+", color: "text-blue-500" };
    if (percent >= 60) return { grade: "B", color: "text-blue-500" };
    if (percent >= 50) return { grade: "C", color: "text-amber-500" };
    if (percent >= 40) return { grade: "D", color: "text-orange-500" };
    return { grade: "F", color: "text-red-500" };
  };

  const { grade, color } = getGrade(percentage);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Navbar />
      <div className="container mx-auto px-4 py-6">
        <div className="mb-6">
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col items-center text-center"
          >
            <h1 className="text-3xl font-bold text-gray-800 dark:text-white">
              Quiz Results
            </h1>
            <p className="text-gray-500 dark:text-gray-400">
              {result.subjectName} Quiz Results
            </p>
          </motion.div>
        </div>

        <div className="max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
          >
            <ResultSummary 
              correctAnswers={result.correctAnswers}
              totalQuestions={result.totalQuestions}
              timeSpent={result.timeSpent}
              grade={grade}
              gradeColor={color}
            />
            
            <Card>
              <CardContent className="py-6">
                <AnswerReview answers={result.answers} />
                <ResultActions subjectId={result.subjectId} />
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default QuizResults;
