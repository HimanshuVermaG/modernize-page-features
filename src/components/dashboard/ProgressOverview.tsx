
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { SubjectProgress } from "@/components/SubjectProgress";
import { motion } from "framer-motion";

interface ProgressOverviewProps {
  progress: number;
  subjects: {
    name: string;
    progress: number;
  }[];
}

const ProgressOverview = ({ progress, subjects }: ProgressOverviewProps) => {
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle>Overall Progress</CardTitle>
        <CardDescription>Your academic journey this semester</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <div className="flex justify-between">
            <span className="text-sm font-medium">{progress}% Complete</span>
            <span className="text-sm text-gray-500">Target: 90%</span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-6">
          {subjects.map((subject) => (
            <motion.div key={subject.name} className="w-full">
              <SubjectProgress subject={subject.name} progress={subject.progress} />
            </motion.div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default ProgressOverview;
