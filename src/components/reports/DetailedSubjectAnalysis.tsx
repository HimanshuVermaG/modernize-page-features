
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { 
  LineChart, 
  Line, 
  BarChart, 
  Bar, 
  PieChart, 
  Pie, 
  Cell, 
  XAxis, 
  YAxis, 
  ResponsiveContainer,
  Legend
} from "recharts";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { AspectRatio } from "@/components/ui/aspect-ratio";

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
            <AspectRatio ratio={16/4} className="mb-4">
              <ChartContainer
                config={{
                  score: {
                    theme: { light: subject.color, dark: subject.color },
                    label: "Score",
                  },
                }}
              >
                <LineChart
                  data={subject.progressData}
                  margin={{ top: 5, right: 5, left: 5, bottom: 5 }}
                >
                  <XAxis 
                    dataKey="week" 
                    axisLine={false}
                    tickLine={false}
                    tick={{ fontSize: 12 }}
                  />
                  <YAxis 
                    domain={[0, 100]} 
                    axisLine={false}
                    tickLine={false}
                    tick={{ fontSize: 12 }}
                  />
                  <ChartTooltip
                    content={<ChartTooltipContent/>}
                  />
                  <Line
                    type="monotone"
                    dataKey="score"
                    stroke={subject.color}
                    strokeWidth={2}
                    dot={{ fill: subject.color }}
                    activeDot={{ r: 6, fill: subject.color }}
                  />
                </LineChart>
              </ChartContainer>
            </AspectRatio>
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
            <AspectRatio ratio={16/4} className="mb-4">
              <ChartContainer
                config={{
                  score: {
                    theme: { light: subject.color, dark: subject.color },
                    label: "Score",
                  },
                }}
              >
                <BarChart
                  data={subject.weakTopics}
                  margin={{ top: 5, right: 5, left: 5, bottom: 20 }}
                >
                  <XAxis 
                    dataKey="name" 
                    axisLine={false}
                    tickLine={false}
                    tick={{ fontSize: 12 }}
                    angle={-45}
                    textAnchor="end"
                    height={60}
                  />
                  <YAxis 
                    domain={[0, 100]} 
                    axisLine={false}
                    tickLine={false}
                    tick={{ fontSize: 12 }}
                  />
                  <ChartTooltip
                    content={<ChartTooltipContent/>}
                  />
                  <Bar 
                    dataKey="score" 
                    fill={subject.color}
                    radius={[4, 4, 0, 0]}
                  />
                </BarChart>
              </ChartContainer>
            </AspectRatio>
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
            <AspectRatio ratio={16/4} className="mb-4 flex justify-center">
              <ChartContainer
                config={{
                  value: {
                    label: "Distribution",
                  },
                }}
              >
                <PieChart>
                  <Pie
                    data={subject.quizDistribution}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={2}
                    dataKey="value"
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    labelLine={false}
                  >
                    {subject.quizDistribution.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <ChartTooltip content={<ChartTooltipContent />} />
                </PieChart>
              </ChartContainer>
            </AspectRatio>
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
