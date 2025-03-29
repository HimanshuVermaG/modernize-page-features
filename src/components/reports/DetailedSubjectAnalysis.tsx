
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import LineChart from "@/components/charts/LineChart";
import BarChart from "@/components/charts/BarChart";
import PieChart from "@/components/charts/PieChart";

interface SubjectAnalysisProps {
  subject: {
    id: number;
    name: string;
    score: number;
    color: string;
    weakTopics: Array<{ name: string; score: number }>;
    progressData: Array<{ week: string; score: number }>;
    quizDistribution: Array<{ name: string; value: number; color: string }>;
  };
}

const DetailedSubjectAnalysis = ({ subject }: SubjectAnalysisProps) => {
  const navigate = useNavigate();
  
  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex justify-between items-center">
          <CardTitle className="text-lg">
            {subject.name} Analysis
          </CardTitle>
          <div className="flex items-center space-x-1">
            <span className={`h-3 w-3 rounded-full`} style={{ backgroundColor: subject.color }}></span>
            <span className="text-sm font-medium">{subject.score}%</span>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="progress" className="w-full">
          <TabsList className="mb-4 w-full">
            <TabsTrigger value="progress" className="flex-1">Progress</TabsTrigger>
            <TabsTrigger value="weak-areas" className="flex-1">Weak Areas</TabsTrigger>
            <TabsTrigger value="distribution" className="flex-1">Distribution</TabsTrigger>
          </TabsList>
          
          <TabsContent value="progress">
            <LineChart 
              data={subject.progressData}
              xAxisKey="week"
              lines={[
                { dataKey: "score", name: "Score", color: subject.color }
              ]}
              className="mb-4"
            />
            <Button 
              variant="outline" 
              size="sm" 
              className="w-full"
              onClick={() => navigate(`/subject-progress/${subject.id}`)}
            >
              View Detailed Progress <ArrowRight className="ml-1 h-4 w-4" />
            </Button>
          </TabsContent>
          
          <TabsContent value="weak-areas">
            <BarChart 
              data={subject.weakTopics}
              xAxisKey="name"
              bars={[
                { dataKey: "score", name: "Score", color: subject.color }
              ]}
              className="mb-4"
              xAxisAngle={-45}
              xAxisHeight={60}
            />
            <Button 
              variant="outline" 
              size="sm" 
              className="w-full"
              onClick={() => navigate(`/improvement-plan/${subject.id}`)}
            >
              Get Improvement Plan <ArrowRight className="ml-1 h-4 w-4" />
            </Button>
          </TabsContent>
          
          <TabsContent value="distribution">
            <div className="flex justify-center mb-4">
              <PieChart 
                data={subject.quizDistribution}
                className="h-[250px]"
              />
            </div>
            <Button 
              variant="outline" 
              size="sm" 
              className="w-full"
              onClick={() => navigate(`/quiz-statistics/${subject.id}`)}
            >
              View Quiz Statistics <ArrowRight className="ml-1 h-4 w-4" />
            </Button>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default DetailedSubjectAnalysis;
