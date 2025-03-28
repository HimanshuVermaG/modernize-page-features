
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from "recharts";

interface SubjectData {
  subject: string;
  score: number;
  accuracy: number;
  className: string;
}

interface SubjectPerformanceProps {
  data: SubjectData[];
  showDetailed?: boolean;
}

const SubjectPerformance = ({ data, showDetailed = false }: SubjectPerformanceProps) => {
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-medium">Subject Performance</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[250px] mb-6">
          <ChartContainer
            config={{
              score: {
                theme: { light: "#8B5CF6", dark: "#8B5CF6" },
                label: "Score",
              },
            }}
          >
            <BarChart
              data={data}
              margin={{ top: 10, right: 10, left: 10, bottom: 20 }}
            >
              <XAxis 
                dataKey="subject" 
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
                radius={[4, 4, 0, 0]} 
                fill="#8B5CF6"
              />
            </BarChart>
          </ChartContainer>
        </div>
        
        {showDetailed && (
          <div className="space-y-4">
            {data.map((subject) => (
              <div key={subject.subject} className="space-y-1">
                <div className="flex justify-between text-sm">
                  <span className="font-medium">{subject.subject}</span>
                  <span className={subject.className}>{subject.score}%</span>
                </div>
                <Progress value={subject.score} className="h-1.5" />
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>Accuracy: {subject.accuracy}%</span>
                  <span>
                    {subject.score >= 80 
                      ? "Excellent" 
                      : subject.score >= 70 
                      ? "Good" 
                      : subject.score >= 60 
                      ? "Average" 
                      : "Needs Improvement"}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default SubjectPerformance;
