
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

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
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Week</TableHead>
                  <TableHead className="text-right">Score</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {subject.progressData.map((item, index) => (
                  <TableRow key={index}>
                    <TableCell>{item.week}</TableCell>
                    <TableCell className="text-right">{item.score}%</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            <Button 
              variant="outline" 
              size="sm" 
              className="w-full mt-4"
              onClick={() => navigate(`/subject-progress/${subject.id}`)}
            >
              View Detailed Progress <ArrowRight className="ml-1 h-4 w-4" />
            </Button>
          </TabsContent>
          
          <TabsContent value="weak-areas">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Topic</TableHead>
                  <TableHead className="text-right">Score</TableHead>
                  <TableHead className="text-right">Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {subject.weakTopics.map((item, index) => (
                  <TableRow key={index}>
                    <TableCell>{item.name}</TableCell>
                    <TableCell className="text-right">{item.score}%</TableCell>
                    <TableCell className="text-right">
                      {item.score < 60 ? (
                        <span className="text-red-500">Needs Work</span>
                      ) : item.score < 75 ? (
                        <span className="text-amber-500">Improving</span>
                      ) : (
                        <span className="text-green-500">Good</span>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            <Button 
              variant="outline" 
              size="sm" 
              className="w-full mt-4"
              onClick={() => navigate(`/improvement-plan/${subject.id}`)}
            >
              Get Improvement Plan <ArrowRight className="ml-1 h-4 w-4" />
            </Button>
          </TabsContent>
          
          <TabsContent value="distribution">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Type</TableHead>
                  <TableHead className="text-right">Value</TableHead>
                  <TableHead className="text-right">Percentage</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {subject.quizDistribution.map((item, index) => {
                  const total = subject.quizDistribution.reduce((sum, item) => sum + item.value, 0);
                  const percentage = Math.round((item.value / total) * 100);
                  return (
                    <TableRow key={index}>
                      <TableCell>{item.name}</TableCell>
                      <TableCell className="text-right">{item.value}</TableCell>
                      <TableCell className="text-right">{percentage}%</TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
            <Button 
              variant="outline" 
              size="sm" 
              className="w-full mt-4"
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
