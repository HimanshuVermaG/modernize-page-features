
import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChevronLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend
} from 'recharts';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";

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
  
  const COLORS = ["#10B981", "#EF4444"];
  
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
                <AspectRatio ratio={16/4} className="bg-card rounded-md overflow-hidden">
                  <ChartContainer
                    config={{
                      correct: { 
                        theme: { light: "#10B981", dark: "#10B981" },
                        label: "Correct" 
                      },
                      incorrect: { 
                        theme: { light: "#EF4444", dark: "#EF4444" },
                        label: "Incorrect" 
                      },
                    }}
                  >
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart
                        data={resultData.topicPerformance}
                        margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                        barGap={2}
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <ChartTooltip content={<ChartTooltipContent />} />
                        <Bar dataKey="correct" stackId="a" fill="#10B981" />
                        <Bar dataKey="incorrect" stackId="a" fill="#EF4444" />
                      </BarChart>
                    </ResponsiveContainer>
                  </ChartContainer>
                </AspectRatio>
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
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-500">Questions</span>
                  <span className="font-medium">{resultData.correctAnswers}/{resultData.totalQuestions} correct</span>
                </div>
                
                <AspectRatio ratio={16/4} className="mt-4">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={resultData.answerDistribution}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        {resultData.answerDistribution.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                </AspectRatio>
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
