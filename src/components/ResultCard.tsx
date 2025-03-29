
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

interface ResultCardProps {
  result: {
    id: number;
    name: string;
    score: number;
    maxScore: number;
    grade: string;
  };
}

const ResultCard = ({ result }: ResultCardProps) => {
  const navigate = useNavigate();
  const percentage = (result.score / result.maxScore) * 100;
  
  const getBadgeColor = (grade: string) => {
    switch(grade) {
      case 'A+': return 'bg-green-500 hover:bg-green-600';
      case 'A': return 'bg-green-400 hover:bg-green-500';
      case 'B+': return 'bg-blue-500 hover:bg-blue-600';
      case 'B': return 'bg-blue-400 hover:bg-blue-500';
      case 'C+': return 'bg-amber-500 hover:bg-amber-600';
      case 'C': return 'bg-amber-400 hover:bg-amber-500';
      case 'D': return 'bg-red-400 hover:bg-red-500';
      case 'F': return 'bg-red-500 hover:bg-red-600';
      default: return 'bg-gray-500 hover:bg-gray-600';
    }
  };
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: result.id * 0.1 }}
      onClick={() => navigate(`/quiz-result/${result.id}`)}
      className="cursor-pointer"
    >
      <Card className="overflow-hidden hover:shadow-md transition-shadow duration-300">
        <CardContent className="p-6">
          <div className="flex justify-between items-center">
            <div>
              <h3 className="font-semibold text-base">{result.name}</h3>
              <div className="flex items-center mt-1">
                <div className="w-24 h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                  <div 
                    className={`h-full rounded-full ${
                      percentage >= 80 ? 'bg-green-500' : 
                      percentage >= 60 ? 'bg-amber-500' : 
                      'bg-red-500'
                    }`}
                    style={{ width: `${percentage}%` }}
                  ></div>
                </div>
                <span className="ml-2 text-xs text-gray-500 dark:text-gray-400">
                  {result.score}/{result.maxScore}
                </span>
              </div>
            </div>
            <Badge className={getBadgeColor(result.grade)}>
              {result.grade}
            </Badge>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default ResultCard;
