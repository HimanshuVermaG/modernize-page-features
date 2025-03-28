
import React from "react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BookOpen, Clock } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

interface QuestionSetCardProps {
  set: {
    id: number;
    title: string;
    description: string;
    questions: number;
    timeMinutes: number;
    difficulty: "Easy" | "Medium" | "Hard";
    subjectId: number;
  };
}

const QuestionSetCard = ({ set }: QuestionSetCardProps) => {
  const difficultyColors = {
    Easy: "text-green-600 bg-green-100 dark:bg-green-900 dark:text-green-300",
    Medium: "text-amber-600 bg-amber-100 dark:bg-amber-900 dark:text-amber-300",
    Hard: "text-red-600 bg-red-100 dark:bg-red-900 dark:text-red-300",
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="w-full"
    >
      <Card className="overflow-hidden border bg-card hover:shadow-md transition-shadow duration-300">
        <CardContent className="p-5">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-bold text-lg">{set.title}</h3>
            <span className={`text-xs font-medium rounded-full px-3 py-1 ${difficultyColors[set.difficulty]}`}>
              {set.difficulty}
            </span>
          </div>
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
            {set.description}
          </p>
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-1">
              <BookOpen className="h-4 w-4" />
              <span>{set.questions} questions</span>
            </div>
            <div className="flex items-center gap-1">
              <Clock className="h-4 w-4" />
              <span>{set.timeMinutes} min</span>
            </div>
          </div>
        </CardContent>
        <CardFooter className="px-5 py-3 pt-0 flex justify-end">
          <Button variant="outline" size="sm" asChild>
            <Link to={`/questions/${set.subjectId}/${set.id}`}>
              Start Practice
            </Link>
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  );
};

export default QuestionSetCard;
