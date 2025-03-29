
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowRight, BookOpen, CheckCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface PlanItem {
  id: number;
  topic: string;
  description: string;
  difficulty: "Easy" | "Medium" | "Hard";
  recommended: boolean;
  progress: number;
  quizLink: string;
}

interface ImprovementPlanProps {
  subject: string;
  planItems: PlanItem[];
}

const ImprovementPlan = ({ subject, planItems }: ImprovementPlanProps) => {
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
      <CardHeader>
        <CardTitle className="text-lg">Improvement Plan for {subject}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {planItems.map((item) => (
          <div key={item.id} className="border-b pb-4 last:border-b-0 last:pb-0">
            <div className="flex justify-between items-start mb-2">
              <div>
                <div className="flex items-center">
                  <h3 className="font-medium">{item.topic}</h3>
                  {item.recommended && (
                    <Badge className="ml-2 bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300">
                      Recommended
                    </Badge>
                  )}
                </div>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                  {item.description}
                </p>
              </div>
              <Badge variant="outline" className={getDifficultyColor(item.difficulty)}>
                {item.difficulty}
              </Badge>
            </div>
            
            <div className="flex justify-between items-center text-xs mb-1">
              <span>Progress</span>
              <span className="font-medium">{item.progress}%</span>
            </div>
            <Progress value={item.progress} className="h-1.5 mb-3" />
            
            <div className="flex justify-between items-center mt-2">
              {item.progress === 100 ? (
                <div className="flex items-center text-green-600 dark:text-green-400 text-sm">
                  <CheckCircle className="h-4 w-4 mr-1" />
                  <span>Completed</span>
                </div>
              ) : (
                <div className="flex items-center text-blue-600 dark:text-blue-400 text-sm">
                  <BookOpen className="h-4 w-4 mr-1" />
                  <span>In progress</span>
                </div>
              )}
              
              <Button 
                size="sm" 
                variant={item.progress === 100 ? "outline" : "default"}
                onClick={() => navigate(item.quizLink)}
              >
                {item.progress === 100 ? "Review" : "Practice"} <ArrowRight className="ml-1 h-4 w-4" />
              </Button>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};

export default ImprovementPlan;
