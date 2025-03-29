
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowRight, BookOpen } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

interface ImprovementPlanPreviewProps {
  subject: string;
  subjectId: number;
  topics: Array<{
    id: number;
    name: string;
    progress: number;
    difficulty: "Easy" | "Medium" | "Hard";
  }>;
}

const ImprovementPlanPreview = ({ subject, subjectId, topics }: ImprovementPlanPreviewProps) => {
  const navigate = useNavigate();
  
  const getDifficultyColor = (difficulty: string) => {
    switch(difficulty) {
      case "Easy": return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300";
      case "Medium": return "bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-300";
      case "Hard": return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300";
      default: return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300";
    }
  };
  
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg flex justify-between items-center">
          <span>Improvement Plan for {subject}</span>
          <Button 
            variant="ghost" 
            size="sm"
            onClick={() => navigate(`/improvement-plan/${subjectId}`)}
          >
            View All
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {topics.slice(0, 3).map((topic, index) => (
          <motion.div 
            key={topic.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            className="border-b pb-3 last:border-b-0 last:pb-0"
          >
            <div className="flex justify-between items-start mb-2">
              <div>
                <h3 className="font-medium">{topic.name}</h3>
              </div>
              <Badge variant="outline" className={getDifficultyColor(topic.difficulty)}>
                {topic.difficulty}
              </Badge>
            </div>
            
            <div className="flex justify-between items-center text-xs mb-1">
              <span>Progress</span>
              <span className="font-medium">{topic.progress}%</span>
            </div>
            <Progress value={topic.progress} className="h-1.5 mb-3" />
            
            <div className="flex justify-between items-center mt-2">
              <div className="flex items-center text-blue-600 dark:text-blue-400 text-sm">
                <BookOpen className="h-4 w-4 mr-1" />
                <span>In progress</span>
              </div>
              
              <Button 
                size="sm" 
                variant="outline"
                onClick={() => navigate(`/questions/${subjectId}/${topic.id}`)}
                className="flex items-center"
              >
                Practice <ArrowRight className="ml-1 h-4 w-4" />
              </Button>
            </div>
          </motion.div>
        ))}
        
        <Button 
          variant="default" 
          className="w-full"
          onClick={() => navigate(`/improvement-plan/${subjectId}`)}
        >
          View Full Improvement Plan
        </Button>
      </CardContent>
    </Card>
  );
};

export default ImprovementPlanPreview;
