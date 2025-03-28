
import { Trophy } from "lucide-react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

interface ResultSummaryProps {
  correctAnswers: number;
  totalQuestions: number;
  timeSpent: number;
  grade: string;
  gradeColor: string;
}

const ResultSummary = ({ 
  correctAnswers, 
  totalQuestions, 
  timeSpent, 
  grade, 
  gradeColor 
}: ResultSummaryProps) => {
  const percentage = Math.round((correctAnswers / totalQuestions) * 100);
  
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}m ${secs}s`;
  };

  return (
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
          <span className={`text-4xl font-bold ${gradeColor}`}>{grade}</span>
        </CardTitle>
        <p className="text-2xl font-bold mt-2">{correctAnswers} / {totalQuestions} Correct</p>
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
              <p className="font-bold">{formatTime(timeSpent)}</p>
            </div>
            <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-3">
              <p className="text-sm text-gray-500 dark:text-gray-400">Accuracy</p>
              <p className="font-bold">{percentage}%</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ResultSummary;
