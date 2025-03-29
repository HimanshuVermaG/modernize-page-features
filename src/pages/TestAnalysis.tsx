
import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChevronLeft, ArrowRight, Clock, BarChart2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Progress } from "@/components/ui/progress";
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  ComposedChart,
  Bar,
  Scatter
} from 'recharts';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import PDFResources from "@/components/quiz/PDFResources";

const TestAnalysis = () => {
  const { testId } = useParams();
  const navigate = useNavigate();
  
  // This would typically come from an API
  const testData = {
    id: Number(testId) || 1,
    title: "Math Test - Basic Algebra",
    date: "November 15, 2023",
    score: 42,
    maxScore: 50,
    completionTime: "28 minutes",
    averageTime: "1.4 minutes per question",
    weakAreas: [
      { topic: "Quadratic Equations", accuracy: 60 },
      { topic: "Word Problems", accuracy: 45 },
      { topic: "Inequalities", accuracy: 70 }
    ],
    questionTimeData: [
      { id: 1, time: 45, difficulty: "Easy", correct: true },
      { id: 2, time: 90, difficulty: "Medium", correct: true },
      { id: 3, time: 120, difficulty: "Hard", correct: false },
      { id: 4, time: 60, difficulty: "Medium", correct: true },
      { id: 5, time: 150, difficulty: "Hard", correct: false },
      { id: 6, time: 40, difficulty: "Easy", correct: true },
      { id: 7, time: 70, difficulty: "Medium", correct: true },
      { id: 8, time: 100, difficulty: "Medium", correct: false },
      { id: 9, time: 30, difficulty: "Easy", correct: true },
      { id: 10, time: 80, difficulty: "Medium", correct: true },
    ],
    performanceOverTime: [
      { attempt: 1, score: 65 },
      { attempt: 2, score: 72 },
      { attempt: 3, score: 68 },
      { attempt: 4, score: 78 },
      { attempt: 5, score: 84 },
    ],
    pdfResources: [
      {
        id: 1,
        title: "Algebraic Expressions Guide",
        description: "Complete reference for algebraic expressions and operations",
        url: "https://www.example.com/pdfs/algebraic-expressions.pdf"
      },
      {
        id: 2,
        title: "Word Problem Solving Techniques",
        description: "Strategies for tackling math word problems effectively",
        url: "https://www.example.com/pdfs/word-problems.pdf"
      }
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
        
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold">{testData.title}</h1>
            <p className="text-gray-500 dark:text-gray-400">Completed on {testData.date}</p>
          </div>
          <div className="mt-4 md:mt-0 bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300 px-4 py-2 rounded-lg flex items-center">
            <span className="font-medium">Score: {testData.score}/{testData.maxScore}</span>
            <span className="ml-2 text-sm">({Math.round((testData.score / testData.maxScore) * 100)}%)</span>
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-center mb-4">
                    <div className="p-2 rounded-full bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-300 mr-3">
                      <Clock className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="font-medium">Time Analysis</h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        Total time: {testData.completionTime}
                      </p>
                    </div>
                  </div>
                  <p className="text-sm mb-2">Average time per question</p>
                  <p className="font-medium text-lg">{testData.averageTime}</p>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-center mb-4">
                    <div className="p-2 rounded-full bg-purple-100 text-purple-600 dark:bg-purple-900 dark:text-purple-300 mr-3">
                      <BarChart2 className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="font-medium">Accuracy Analysis</h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        Overall accuracy: {Math.round((testData.score / testData.maxScore) * 100)}%
                      </p>
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    {testData.weakAreas.map((area, index) => (
                      <div key={index}>
                        <div className="flex justify-between text-sm mb-1">
                          <span>{area.topic}</span>
                          <span className={`${
                            area.accuracy >= 70 ? 'text-green-600 dark:text-green-400' :
                            area.accuracy >= 50 ? 'text-amber-600 dark:text-amber-400' :
                            'text-red-600 dark:text-red-400'
                          }`}>
                            {area.accuracy}%
                          </span>
                        </div>
                        <Progress value={area.accuracy} className="h-1.5" />
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
            
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Performance Over Time</CardTitle>
              </CardHeader>
              <CardContent>
                <AspectRatio ratio={16/4} className="bg-card rounded-md overflow-hidden">
                  <ChartContainer
                    config={{
                      score: { 
                        theme: { light: "#8B5CF6", dark: "#8B5CF6" },
                        label: "Score (%)" 
                      }
                    }}
                  >
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart
                        data={testData.performanceOverTime}
                        margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="attempt" />
                        <YAxis domain={[0, 100]} />
                        <ChartTooltip content={<ChartTooltipContent />} />
                        <Line
                          type="monotone"
                          dataKey="score"
                          stroke="#8B5CF6"
                          strokeWidth={2}
                          dot={{ fill: "#8B5CF6", r: 6 }}
                          activeDot={{ r: 8 }}
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </ChartContainer>
                </AspectRatio>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Time Spent vs Question Difficulty</CardTitle>
              </CardHeader>
              <CardContent>
                <AspectRatio ratio={16/4} className="bg-card rounded-md overflow-hidden">
                  <ChartContainer
                    config={{
                      time: { 
                        theme: { light: "#3B82F6", dark: "#3B82F6" },
                        label: "Time (seconds)" 
                      }
                    }}
                  >
                    <ResponsiveContainer width="100%" height="100%">
                      <ComposedChart
                        data={testData.questionTimeData}
                        margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="id" label={{ value: 'Question Number', position: 'insideBottom', offset: -5 }} />
                        <YAxis label={{ value: 'Time (seconds)', angle: -90, position: 'insideLeft' }} />
                        <ChartTooltip 
                          content={<ChartTooltipContent />}
                          formatter={(value, name, props) => {
                            if (name === 'time') return [`${value}s`, 'Time Spent'];
                            return [value, name];
                          }}
                        />
                        <Bar 
                          dataKey="time" 
                          fill="#3B82F6" 
                          radius={[4, 4, 0, 0]}
                          name="time"
                        />
                        <Scatter
                          dataKey="time"
                          fill="#10B981"
                          shape={(props) => {
                            const { cx, cy } = props;
                            const entry = props.payload;
                            const color = entry.correct ? "#10B981" : "#EF4444";
                            return (
                              <circle cx={cx} cy={cy} r={6} fill={color} />
                            );
                          }}
                          name="result"
                        />
                      </ComposedChart>
                    </ResponsiveContainer>
                  </ChartContainer>
                </AspectRatio>
                <div className="flex justify-center mt-4 gap-4 text-sm">
                  <div className="flex items-center">
                    <div className="w-3 h-3 rounded-full bg-green-500 mr-1"></div>
                    <span>Correct</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-3 h-3 rounded-full bg-red-500 mr-1"></div>
                    <span>Incorrect</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Improvement Areas</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  {testData.weakAreas.map((area, index) => (
                    <div key={index} className="p-3 bg-gray-100 dark:bg-gray-800 rounded-lg">
                      <div className="flex justify-between items-center mb-2">
                        <h4 className="font-medium">{area.topic}</h4>
                        <span className={`text-sm px-2 py-1 rounded ${
                          area.accuracy >= 70 ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300' :
                          area.accuracy >= 50 ? 'bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-300' :
                          'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300'
                        }`}>
                          {area.accuracy}% accuracy
                        </span>
                      </div>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="w-full"
                        onClick={() => navigate(`/improvement-plan/1`)}
                      >
                        Practice {area.topic} <ArrowRight className="ml-1 h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
                
                <Button 
                  className="w-full" 
                  onClick={() => navigate(`/improvement-plan/1`)}
                >
                  View Full Improvement Plan
                </Button>
              </CardContent>
            </Card>
            
            <PDFResources resources={testData.pdfResources} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestAnalysis;
