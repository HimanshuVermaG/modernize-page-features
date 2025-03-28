
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { motion } from "framer-motion";
import { formatDistanceToNow } from "date-fns";

interface TestCardProps {
  test: {
    id: number;
    name: string;
    score: number;
    maxScore: number;
    date: string;
  };
}

const TestCard = ({ test }: TestCardProps) => {
  const percentage = (test.score / test.maxScore) * 100;
  const dateFormatted = formatDistanceToNow(new Date(test.date), { addSuffix: true });
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: test.id * 0.1 }}
    >
      <Card className="overflow-hidden hover:shadow-md transition-shadow duration-300">
        <CardContent className="p-6">
          <div className="flex justify-between items-start mb-2">
            <div>
              <h3 className="font-semibold text-base">{test.name}</h3>
              <p className="text-xs text-gray-500 dark:text-gray-400">{dateFormatted}</p>
            </div>
            <div className="text-right">
              <span className="text-lg font-bold">{test.score}</span>
              <span className="text-gray-500 dark:text-gray-400">/{test.maxScore}</span>
            </div>
          </div>
          
          <div className="space-y-1">
            <div className="flex justify-between text-xs">
              <span>Score</span>
              <span className={`font-medium ${
                percentage >= 80 ? 'text-green-600 dark:text-green-400' : 
                percentage >= 60 ? 'text-amber-600 dark:text-amber-400' : 
                'text-red-600 dark:text-red-400'
              }`}>
                {percentage}%
              </span>
            </div>
            <Progress 
              value={percentage} 
              className={`h-1.5 ${
                percentage >= 80 ? 'bg-green-100 dark:bg-green-950' : 
                percentage >= 60 ? 'bg-amber-100 dark:bg-amber-950' : 
                'bg-red-100 dark:bg-red-950'
              }`}
            />
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default TestCard;
