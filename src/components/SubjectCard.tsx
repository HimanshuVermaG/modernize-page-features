
import React from "react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

interface SubjectCardProps {
  subject: {
    id: number;
    name: string;
    icon: string;
    color: string;
    questions: number;
  };
}

const SubjectCard = ({ subject }: SubjectCardProps) => {
  return (
    <motion.div
      whileHover={{ y: -5 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: subject.id * 0.1 }}
    >
      <Card className="overflow-hidden border-0 shadow-md hover:shadow-lg transition-shadow duration-300">
        <div className={`${subject.color} p-4`}>
          <div className="flex justify-between items-center">
            <span className="text-3xl">{subject.icon}</span>
            <span className="text-xs font-medium bg-white/20 rounded-full px-2 py-1">
              {subject.questions} Questions
            </span>
          </div>
        </div>
        <CardContent className="p-4">
          <h3 className="font-bold text-lg">{subject.name}</h3>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Latest question sets
          </p>
        </CardContent>
        <CardFooter className="p-4 pt-0 flex justify-end">
          <Button variant="ghost" size="sm" className="text-xs">
            View <ArrowRight className="ml-1 h-3 w-3" />
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  );
};

export default SubjectCard;
