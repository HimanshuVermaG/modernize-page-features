
import React from "react";
import { useParams, Link } from "react-router-dom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Download, Share2, Printer } from "lucide-react";
import { motion } from "framer-motion";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import PageContainer from "@/components/layout/PageContainer";
import PageHeader from "@/components/layout/PageHeader";

const TestAnalysis = () => {
  const { testId } = useParams<{ testId: string }>();
  
  // Mock data for the test
  const testData = {
    id: testId,
    name: "Mathematics Mid-Term Test",
    date: "2023-05-15",
    score: 85,
    totalQuestions: 30,
    correctAnswers: 25,
    wrongAnswers: 5,
    timeMinutes: 45,
    topicBreakdown: [
      { name: "Algebra", score: 90, questions: 10 },
      { name: "Geometry", score: 80, questions: 8 },
      { name: "Calculus", score: 70, questions: 7 },
      { name: "Statistics", score: 100, questions: 5 }
    ],
    questionDifficulty: [
      { name: "Easy", value: 12, color: "#10B981" },
      { name: "Medium", value: 10, color: "#3B82F6" },
      { name: "Hard", value: 8, color: "#EF4444" }
    ],
    timePerQuestion: [
      { id: 1, time: 30, result: "correct" },
      { id: 2, time: 45, result: "correct" },
      { id: 3, time: 60, result: "correct" },
      { id: 4, time: 90, result: "wrong" },
      { id: 5, time: 75, result: "correct" },
      { id: 6, time: 120, result: "wrong" },
      { id: 7, time: 30, result: "correct" },
      { id: 8, time: 60, result: "correct" },
      { id: 9, time: 45, result: "correct" },
      { id: 10, time: 105, result: "wrong" },
      { id: 11, time: 90, result: "correct" },
      { id: 12, time: 55, result: "correct" },
      { id: 13, time: 35, result: "correct" },
      { id: 14, time: 40, result: "correct" },
      { id: 15, time: 65, result: "wrong" }
    ],
    wrongQuestions: [4, 6, 10, 15]
  };
  
  const averageTime = testData.timePerQuestion.reduce((acc, curr) => acc + curr.time, 0) / testData.timePerQuestion.length;
  
  // Progress data for line chart
  const progressData = [
    { month: "Jan", score: 65 },
    { month: "Feb", score: 70 },
    { month: "Mar", score: 75 },
    { month: "Apr", score: 80 },
    { month: "May", score: 85 }
  ];
  
  return (
    <PageContainer>
      <PageHeader 
        title="Test Analysis" 
        action={
          <Button variant="outline" size="sm" asChild className="mr-2">
            <Link to="/quiz-results">
              <ArrowLeft className="h-4 w-4 mr-1" />
              Back to Results
            </Link>
          </Button>
        }
      />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Left column - Overview */}
        <div className="md:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-xl">{testData.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center p-4 bg-primary/10 rounded-lg">
                  <div className="text-2xl font-bold">{testData.score}%</div>
                  <div className="text-sm text-muted-foreground">Score</div>
                </div>
                <div className="text-center p-4 bg-green-500/10 rounded-lg">
                  <div className="text-2xl font-bold">{testData.correctAnswers}</div>
                  <div className="text-sm text-muted-foreground">Correct</div>
                </div>
                <div className="text-center p-4 bg-red-500/10 rounded-lg">
                  <div className="text-2xl font-bold">{testData.wrongAnswers}</div>
                  <div className="text-sm text-muted-foreground">Wrong</div>
                </div>
                <div className="text-center p-4 bg-blue-500/10 rounded-lg">
                  <div className="text-2xl font-bold">{testData.timeMinutes} min</div>
                  <div className="text-sm text-muted-foreground">Time</div>
                </div>
              </div>
              
              <div className="mt-6">
                <h3 className="text-lg font-medium mb-2">Topic Breakdown</h3>
                {testData.topicBreakdown.map((topic, index) => (
                  <div key={index} className="mb-3">
                    <div className="flex justify-between mb-1 text-sm">
                      <span>{topic.name}</span>
                      <span className="font-medium">{topic.score}%</span>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
                      <div 
                        className="bg-primary h-2.5 rounded-full" 
                        style={{ width: `${topic.score}%` }}
                      ></div>
                    </div>
                    <div className="text-xs text-muted-foreground mt-1">
                      {topic.questions} questions
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
          
          <Tabs defaultValue="questions">
            <TabsList className="grid grid-cols-3 mb-4">
              <TabsTrigger value="questions">Questions</TabsTrigger>
              <TabsTrigger value="time">Time Analysis</TabsTrigger>
              <TabsTrigger value="progress">Progress</TabsTrigger>
            </TabsList>
            
            <TabsContent value="questions" className="space-y-4">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">Question Difficulty</CardTitle>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Difficulty</TableHead>
                        <TableHead className="text-right">Count</TableHead>
                        <TableHead className="text-right">Percentage</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {testData.questionDifficulty.map((item, index) => (
                        <TableRow key={index}>
                          <TableCell>{item.name}</TableCell>
                          <TableCell className="text-right">{item.value}</TableCell>
                          <TableCell className="text-right">
                            {Math.round((item.value / testData.totalQuestions) * 100)}%
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">Performance by Topic</CardTitle>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Topic</TableHead>
                        <TableHead className="text-right">Questions</TableHead>
                        <TableHead className="text-right">Score</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {testData.topicBreakdown.map((item, index) => (
                        <TableRow key={index}>
                          <TableCell>{item.name}</TableCell>
                          <TableCell className="text-right">{item.questions}</TableCell>
                          <TableCell className="text-right">{item.score}%</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="time" className="space-y-4">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">Time per Question</CardTitle>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Question</TableHead>
                        <TableHead className="text-right">Time (seconds)</TableHead>
                        <TableHead className="text-right">Result</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {testData.timePerQuestion.map((item) => (
                        <TableRow key={item.id}>
                          <TableCell>Question {item.id}</TableCell>
                          <TableCell className="text-right">{item.time}</TableCell>
                          <TableCell className={`text-right ${item.result === "correct" ? "text-green-600" : "text-red-600"}`}>
                            {item.result === "correct" ? "Correct" : "Wrong"}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                  <div className="mt-4 text-sm text-center text-muted-foreground">
                    Average time per question: <span className="font-medium">{averageTime.toFixed(1)} seconds</span>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="progress" className="space-y-4">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">Score Progress</CardTitle>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Month</TableHead>
                        <TableHead className="text-right">Score</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {progressData.map((item, index) => (
                        <TableRow key={index}>
                          <TableCell>{item.month}</TableCell>
                          <TableCell className="text-right">{item.score}%</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
        
        {/* Right column - Actions and Related */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button className="w-full flex items-center justify-center gap-2" variant="outline">
                <Download className="h-4 w-4" />
                Download Report
              </Button>
              <Button className="w-full flex items-center justify-center gap-2" variant="outline">
                <Printer className="h-4 w-4" />
                Print Analysis
              </Button>
              <Button className="w-full flex items-center justify-center gap-2" variant="outline">
                <Share2 className="h-4 w-4" />
                Share Results
              </Button>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Areas for Improvement</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {testData.wrongQuestions.map(qNumber => (
                <div key={qNumber} className="border-b pb-3 last:border-b-0 last:pb-0">
                  <div className="font-medium">Question {qNumber}</div>
                  <p className="text-sm text-muted-foreground">
                    Review {testData.topicBreakdown.find((_, i) => i % testData.wrongQuestions.length === testData.wrongQuestions.indexOf(qNumber) % testData.wrongQuestions.length)?.name} concepts
                  </p>
                  <Button size="sm" variant="link" className="p-0 h-auto mt-1">
                    View Question
                  </Button>
                </div>
              ))}
              
              <Button className="w-full mt-2">
                Get Improvement Plan
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </PageContainer>
  );
};

export default TestAnalysis;
