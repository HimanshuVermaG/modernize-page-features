
import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Check, Home, X, Trophy, ArrowLeft } from "lucide-react";
import { motion } from "framer-motion";
import confetti from "canvas-confetti";

const QuizResults = () => {
  const location = useLocation();
  const navigate = useNavigate();
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
  
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}m ${secs}s`;
  };

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
            <Card className="mb-6 overflow-hidden border-t-4 shadow-lg" 
                  style={{ borderTopColor: percentage >= 70 ? '#10B981' : percentage >= 50 ? '#F59E0B' : '#EF4444' }}>
              <CardHeader className="text-center pb-2">
                <div className="flex justify-center mb-4">
                  <motion.div 
                    initial={{ scale: 0.5, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.2, type: "spring" }}
                    className="rounded-full bg-gray-100 dark:bg-gray-800 p-3"
                  >
                    <Trophy className={`h-12 w-12 ${percentage >= 70 ? 'text-yellow-500' : 'text-gray-400'}`} />
                  </motion.div>
                </div>
                <CardTitle>
                  <span className={`text-4xl font-bold ${color}`}>{grade}</span>
                </CardTitle>
                <p className="text-2xl font-bold mt-2">{result.correctAnswers} / {result.totalQuestions} Correct</p>
              </CardHeader>
              
              <CardContent className="pb-6">
                <div className="space-y-6">
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm font-medium">Score: {percentage}%</span>
                    </div>
                    <Progress value={percentage} className="h-2" />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 text-center">
                    <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-3">
                      <p className="text-sm text-gray-500 dark:text-gray-400">Time Spent</p>
                      <p className="font-bold">{formatTime(result.timeSpent)}</p>
                    </div>
                    <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-3">
                      <p className="text-sm text-gray-500 dark:text-gray-400">Accuracy</p>
                      <p className="font-bold">{percentage}%</p>
                    </div>
                  </div>
                  
                  {result.answers && result.answers.length > 0 && (
                    <div className="mt-6 space-y-3">
                      <h3 className="font-semibold">Question Review:</h3>
                      {result.answers.map((item, index) => (
                        <div key={index} className="flex items-start gap-3 bg-gray-50 dark:bg-gray-800 p-3 rounded-md">
                          {item.isCorrect ? (
                            <div className="bg-green-100 dark:bg-green-900 text-green-600 dark:text-green-300 p-1 rounded-full">
                              <Check className="h-4 w-4" />
                            </div>
                          ) : (
                            <div className="bg-red-100 dark:bg-red-900 text-red-600 dark:text-red-300 p-1 rounded-full">
                              <X className="h-4 w-4" />
                            </div>
                          )}
                          <div className="text-sm">
                            <p className="font-medium">Question {index + 1}</p>
                            <p className={item.isCorrect ? "text-green-600 dark:text-green-400" : "text-red-600 dark:text-red-400"}>
                              {item.isCorrect ? "Correct" : "Incorrect"} - You selected: {item.selected}
                              {!item.isCorrect && <span className="block text-green-600 dark:text-green-400">Correct answer: {item.answer}</span>}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                  
                  <div className="flex flex-col sm:flex-row gap-4 mt-6">
                    <Button 
                      onClick={() => navigate(`/questions/${result.subjectId}/1`)} 
                      variant="outline" 
                      className="flex-1"
                    >
                      <ArrowLeft className="mr-1 h-4 w-4" /> Try Again
                    </Button>
                    <Button 
                      onClick={() => navigate(`/subject/${result.subjectId}`)} 
                      variant="outline" 
                      className="flex-1"
                    >
                      More Practice Sets
                    </Button>
                    <Button 
                      onClick={() => navigate("/")} 
                      className="flex-1"
                    >
                      <Home className="mr-1 h-4 w-4" /> Go Home
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default QuizResults;
