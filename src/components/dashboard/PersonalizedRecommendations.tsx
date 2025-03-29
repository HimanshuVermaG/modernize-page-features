
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, BookOpen, ChartBar } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

interface SubjectRecommendation {
  id: number;
  subject: string;
  score: number;
  recommendedTests: Array<{
    id: number;
    name: string;
    path: string;
  }>;
}

interface PersonalizedRecommendationsProps {
  recommendations: SubjectRecommendation[];
}

const PersonalizedRecommendations = ({ recommendations }: PersonalizedRecommendationsProps) => {
  const navigate = useNavigate();
  const sortedRecommendations = [...recommendations].sort((a, b) => a.score - b.score);
  
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Personalized Recommendations</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {sortedRecommendations.map((rec, index) => (
          <motion.div
            key={rec.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
          >
            <div className="mb-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className={`p-2 rounded-full mr-3 ${
                    rec.score < 60 ? 'bg-red-100 text-red-600 dark:bg-red-900 dark:text-red-300' :
                    rec.score < 75 ? 'bg-amber-100 text-amber-600 dark:bg-amber-900 dark:text-amber-300' :
                    'bg-green-100 text-green-600 dark:bg-green-900 dark:text-green-300'
                  }`}>
                    {rec.score < 60 ? (
                      <ChartBar className="h-5 w-5" />
                    ) : (
                      <BookOpen className="h-5 w-5" />
                    )}
                  </div>
                  <div>
                    <h3 className="font-medium">{rec.subject}</h3>
                    <div className="flex items-center text-sm">
                      <span className={`font-medium ${
                        rec.score < 60 ? 'text-red-600 dark:text-red-400' :
                        rec.score < 75 ? 'text-amber-600 dark:text-amber-400' :
                        'text-green-600 dark:text-green-400'
                      }`}>
                        {rec.score}%
                      </span>
                      <span className="text-gray-500 dark:text-gray-400 ml-2">
                        {rec.score < 60 ? 'Needs improvement' :
                        rec.score < 75 ? 'Average' :
                        'Good progress'}
                      </span>
                    </div>
                  </div>
                </div>
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={() => navigate(`/subject/${rec.id}`)}
                >
                  View Details
                </Button>
              </div>
            </div>
            {rec.score < 75 && (
              <div className="ml-10 space-y-2">
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">
                  Recommended practice:
                </p>
                {rec.recommendedTests.map((test) => (
                  <Button 
                    key={test.id}
                    variant="outline" 
                    size="sm"
                    className="w-full justify-between mb-1 text-left font-normal"
                    onClick={() => navigate(test.path)}
                  >
                    <span>{test.name}</span>
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                ))}
              </div>
            )}
          </motion.div>
        ))}
      </CardContent>
    </Card>
  );
};

export default PersonalizedRecommendations;
