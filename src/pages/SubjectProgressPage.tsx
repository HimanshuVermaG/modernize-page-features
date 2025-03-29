
import React from "react";
import { Navbar } from "@/components/Navbar";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

const SubjectProgressPage = () => {
  const { subjectId } = useParams<{ subjectId: string }>();
  const navigate = useNavigate();
  
  // In a real app, this would come from an API based on the subjectId
  const subjectData = {
    id: Number(subjectId) || 1,
    name: subjectId === "1" ? "Mathematics" : 
          subjectId === "2" ? "English" : 
          subjectId === "3" ? "Hindi" : 
          subjectId === "4" ? "G.S." : "Subject",
    color: subjectId === "1" ? "#10B981" : 
           subjectId === "2" ? "#3B82F6" : 
           subjectId === "3" ? "#F59E0B" : 
           subjectId === "4" ? "#8B5CF6" : "#6B7280",
    weeklyProgress: [
      { week: "Week 1", score: 65, avgScore: 60 },
      { week: "Week 2", score: 68, avgScore: 62 },
      { week: "Week 3", score: 72, avgScore: 65 },
      { week: "Week 4", score: 75, avgScore: 68 },
      { week: "Week 5", score: 78, avgScore: 70 },
      { week: "Week 6", score: 80, avgScore: 72 },
      { week: "Week 7", score: 83, avgScore: 74 },
      { week: "Week 8", score: 85, avgScore: 76 },
    ],
    topicProgress: [
      { topic: "Topic 1", initial: 40, current: 75, target: 90 },
      { topic: "Topic 2", initial: 35, current: 65, target: 85 },
      { topic: "Topic 3", initial: 45, current: 80, target: 90 },
      { topic: "Topic 4", initial: 30, current: 60, target: 80 },
      { topic: "Topic 5", initial: 50, current: 85, target: 95 },
    ],
    quizHistory: [
      { id: 1, name: "Quiz 1", date: "01/15/2023", score: 70, maxScore: 100 },
      { id: 2, name: "Quiz 2", date: "01/29/2023", score: 75, maxScore: 100 },
      { id: 3, name: "Quiz 3", date: "02/12/2023", score: 80, maxScore: 100 },
      { id: 4, name: "Quiz 4", date: "02/26/2023", score: 82, maxScore: 100 },
      { id: 5, name: "Quiz 5", date: "03/12/2023", score: 85, maxScore: 100 },
    ]
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Navbar />
      <div className="container mx-auto px-4 py-6">
        <div className="flex items-center mb-6">
          <Button 
            variant="ghost" 
            size="sm"
            onClick={() => navigate(-1)}
            className="mr-2"
          >
            <ChevronLeft className="h-4 w-4 mr-1" />
            Back
          </Button>
          <h1 className="text-2xl font-bold">{subjectData.name} Progress</h1>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Progress Over Time</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Week</TableHead>
                    <TableHead className="text-right">Your Score</TableHead>
                    <TableHead className="text-right">Class Average</TableHead>
                    <TableHead className="text-right">Difference</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {subjectData.weeklyProgress.map((week, index) => {
                    const difference = week.score - week.avgScore;
                    return (
                      <TableRow key={index}>
                        <TableCell>{week.week}</TableCell>
                        <TableCell className="text-right">{week.score}%</TableCell>
                        <TableCell className="text-right">{week.avgScore}%</TableCell>
                        <TableCell className={`text-right ${difference > 0 ? "text-green-600" : difference < 0 ? "text-red-600" : ""}`}>
                          {difference > 0 ? "+" : ""}{difference}%
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Topic Progress</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Topic</TableHead>
                    <TableHead className="text-right">Initial Score</TableHead>
                    <TableHead className="text-right">Current Score</TableHead>
                    <TableHead className="text-right">Target Score</TableHead>
                    <TableHead className="text-right">Improvement</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {subjectData.topicProgress.map((topic, index) => {
                    const improvement = topic.current - topic.initial;
                    const targetGap = topic.target - topic.current;
                    return (
                      <TableRow key={index}>
                        <TableCell>{topic.topic}</TableCell>
                        <TableCell className="text-right">{topic.initial}%</TableCell>
                        <TableCell className="text-right">{topic.current}%</TableCell>
                        <TableCell className="text-right">{topic.target}%</TableCell>
                        <TableCell className="text-right text-green-600">+{improvement}%</TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Quiz History</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Quiz Name</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead className="text-right">Score</TableHead>
                    <TableHead className="text-right">Percentage</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {subjectData.quizHistory.map((quiz) => {
                    const percentage = (quiz.score / quiz.maxScore) * 100;
                    return (
                      <TableRow key={quiz.id}>
                        <TableCell className="font-medium">{quiz.name}</TableCell>
                        <TableCell>{quiz.date}</TableCell>
                        <TableCell className="text-right">{quiz.score}/{quiz.maxScore}</TableCell>
                        <TableCell className={`text-right font-medium ${
                          percentage >= 80 ? 'text-green-600 dark:text-green-400' : 
                          percentage >= 60 ? 'text-amber-600 dark:text-amber-400' : 
                          'text-red-600 dark:text-red-400'
                        }`}>
                          {percentage.toFixed(0)}%
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default SubjectProgressPage;
