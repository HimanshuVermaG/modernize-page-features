
import React from "react";
import { Navbar } from "@/components/Navbar";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { 
  LineChart, 
  Line, 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
  Legend
} from "recharts";
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
              <div className="h-[300px]">
                <ChartContainer
                  config={{
                    score: {
                      theme: { light: subjectData.color, dark: subjectData.color },
                      label: "Your Score",
                    },
                    avgScore: {
                      theme: { light: "#94A3B8", dark: "#64748B" },
                      label: "Class Average",
                    }
                  }}
                >
                  <LineChart
                    data={subjectData.weeklyProgress}
                    margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
                    <XAxis 
                      dataKey="week" 
                      tick={{ fontSize: 12 }}
                    />
                    <YAxis 
                      domain={[0, 100]} 
                      tick={{ fontSize: 12 }}
                    />
                    <ChartTooltip
                      content={<ChartTooltipContent/>}
                    />
                    <Legend />
                    <Line
                      type="monotone"
                      dataKey="score"
                      name="Your Score"
                      stroke={subjectData.color}
                      strokeWidth={2}
                      dot={{ r: 4, fill: subjectData.color }}
                      activeDot={{ r: 6, fill: subjectData.color }}
                    />
                    <Line
                      type="monotone"
                      dataKey="avgScore"
                      name="Class Average"
                      stroke="#94A3B8"
                      strokeWidth={2}
                      dot={{ r: 4, fill: "#94A3B8" }}
                    />
                  </LineChart>
                </ChartContainer>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Topic Progress</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ChartContainer
                  config={{
                    initial: {
                      theme: { light: "#CBD5E1", dark: "#64748B" },
                      label: "Initial",
                    },
                    current: {
                      theme: { light: subjectData.color, dark: subjectData.color },
                      label: "Current",
                    },
                    target: {
                      theme: { light: "#94A3B8", dark: "#94A3B8" },
                      label: "Target",
                    }
                  }}
                >
                  <AreaChart
                    data={subjectData.topicProgress}
                    margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
                    <XAxis 
                      dataKey="topic" 
                      tick={{ fontSize: 12 }}
                    />
                    <YAxis 
                      domain={[0, 100]} 
                      tick={{ fontSize: 12 }}
                    />
                    <ChartTooltip
                      content={<ChartTooltipContent/>}
                    />
                    <Legend />
                    <Area
                      type="monotone"
                      dataKey="initial"
                      name="Initial Score"
                      stackId="1"
                      stroke="#CBD5E1"
                      fill="#CBD5E1"
                    />
                    <Area
                      type="monotone"
                      dataKey="current"
                      name="Current Score"
                      stackId="2"
                      stroke={subjectData.color}
                      fill={subjectData.color}
                    />
                    <Area
                      type="monotone"
                      dataKey="target"
                      name="Target Score"
                      stackId="3"
                      stroke="#94A3B8"
                      fill="none"
                      strokeDasharray="4 4"
                    />
                  </AreaChart>
                </ChartContainer>
              </div>
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
