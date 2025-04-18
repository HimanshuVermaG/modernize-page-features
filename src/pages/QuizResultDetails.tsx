
import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChevronLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

const QuizResultDetails = () => {
  const { resultId } = useParams();
  const navigate = useNavigate();
  
  // This would typically come from an API
  const resultData = {
    id: Number(resultId) || 1,
    title: "English Grammar Quiz",
    date: "October 15, 2023",
    score: 85,
    totalQuestions: 20,
    correctAnswers: 17,
    timeSpent: "25 minutes",
    grade: "A",
    topicPerformance: [
      { name: "Grammar", correct: 6, incorrect: 1 },
      { name: "Vocabulary", correct: 4, incorrect: 0 },
      { name: "Syntax", correct: 3, incorrect: 1 },
      { name: "Punctuation", correct: 4, incorrect: 1 },
    ],
    answerDistribution: [
      { name: "Correct", value: 17, color: "#10B981" },
      { name: "Incorrect", value: 3, color: "#EF4444" },
    ],
    difficultQuestions: [
      { id: 5, question: "Identify the correct use of the semicolon in the following sentences." },
      { id: 12, question: "Select the sentence with the correct subject-verb agreement." },
      { id: 17, question: "Choose the sentence that correctly uses the past perfect tense." },
    ]
  };
  
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Navbar />
      <div className="container mx-auto px-4 py-6">
        <Button 
          variant="ghost" 
          size="sm"
          onClick={() => navigate(-1)}
          className="mb-4"
        >
          <ChevronLeft className="mr-1 h-4 w-4" />
          Back
        </Button>
        
        <h1 className="text-2xl font-bold mb-6">{resultData.title} Results</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Performance by Topic</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Topic</TableHead>
                      <TableHead className="text-right">Correct</TableHead>
                      <TableHead className="text-right">Incorrect</TableHead>
                      <TableHead className="text-right">Success Rate</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {resultData.topicPerformance.map((topic, index) => {
                      const total = topic.correct + topic.incorrect;
                      const rate = Math.round((topic.correct / total) * 100);
                      return (
                        <TableRow key={index}>
                          <TableCell>{topic.name}</TableCell>
                          <TableCell className="text-right text-green-600">{topic.correct}</TableCell>
                          <TableCell className="text-right text-red-600">{topic.incorrect}</TableCell>
                          <TableCell className="text-right font-medium">{rate}%</TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Difficult Questions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {resultData.difficultQuestions.map((question, index) => (
                  <div key={question.id} className="p-4 bg-gray-100 dark:bg-gray-800 rounded-lg">
                    <p className="text-sm font-medium">
                      Question {index + 1}: {question.question}
                    </p>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
          
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center pb-2 border-b">
                  <span className="text-sm text-gray-500">Date</span>
                  <span className="font-medium">{resultData.date}</span>
                </div>
                <div className="flex justify-between items-center pb-2 border-b">
                  <span className="text-sm text-gray-500">Score</span>
                  <span className="font-medium">{resultData.score}%</span>
                </div>
                <div className="flex justify-between items-center pb-2 border-b">
                  <span className="text-sm text-gray-500">Grade</span>
                  <span className="font-medium">{resultData.grade}</span>
                </div>
                <div className="flex justify-between items-center pb-2 border-b">
                  <span className="text-sm text-gray-500">Time Spent</span>
                  <span className="font-medium">{resultData.timeSpent}</span>
                </div>
                <div className="flex justify-between items-center pb-2 border-b">
                  <span className="text-sm text-gray-500">Questions</span>
                  <span className="font-medium">{resultData.correctAnswers}/{resultData.totalQuestions} correct</span>
                </div>
                
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Answer Type</TableHead>
                      <TableHead className="text-right">Count</TableHead>
                      <TableHead className="text-right">Percentage</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {resultData.answerDistribution.map((item, index) => (
                      <TableRow key={index}>
                        <TableCell>{item.name}</TableCell>
                        <TableCell className="text-right">{item.value}</TableCell>
                        <TableCell className="text-right">
                          {Math.round((item.value / resultData.totalQuestions) * 100)}%
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
            
            <div className="flex justify-center">
              <Button onClick={() => navigate(`/improvement-plan/1`)}>
                View Improvement Plan
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuizResultDetails;
