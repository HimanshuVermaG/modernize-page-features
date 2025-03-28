
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { Line, LineChart, ResponsiveContainer, XAxis, YAxis } from "recharts";
import { Trophy, TrendingUp } from "lucide-react";

interface PerformanceOverviewProps {
  score: number;
  rank: number;
  totalStudents: number;
  progressData: Array<{ month: string; score: number }>;
}

const PerformanceOverview = ({ 
  score, 
  rank, 
  totalStudents,
  progressData
}: PerformanceOverviewProps) => {
  const percentile = Math.round(((totalStudents - rank) / totalStudents) * 100);
  
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Overall Performance</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold">{score}%</div>
                <p className="text-xs text-muted-foreground">
                  Overall score across all subjects
                </p>
              </div>
              <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center">
                <TrendingUp className="h-8 w-8 text-primary" />
              </div>
            </div>
            <div className="mt-4">
              <Progress value={score} className="h-2" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Class Ranking</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div>
                <div className="flex items-baseline gap-1">
                  <span className="text-2xl font-bold">#{rank}</span>
                  <span className="text-sm text-muted-foreground">of {totalStudents}</span>
                </div>
                <p className="text-xs text-muted-foreground">
                  Top {percentile}% percentile
                </p>
              </div>
              <div className="h-16 w-16 rounded-full bg-amber-500/10 flex items-center justify-center">
                <Trophy className="h-8 w-8 text-amber-500" />
              </div>
            </div>
            <div className="mt-4">
              <Progress 
                value={percentile} 
                className="h-2 bg-amber-100 dark:bg-amber-950" 
              />
            </div>
          </CardContent>
        </Card>
      </div>
      
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium">Progress Over Time</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[200px]">
            <ChartContainer
              config={{
                score: { theme: { light: "#8B5CF6", dark: "#8B5CF6" } },
              }}
            >
              <LineChart
                data={progressData}
                margin={{ top: 10, right: 10, bottom: 10, left: 10 }}
              >
                <XAxis 
                  dataKey="month" 
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 12 }}
                  dy={10}
                />
                <YAxis 
                  domain={[0, 100]} 
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 12 }}
                  dx={-10}
                />
                <ChartTooltip
                  content={<ChartTooltipContent/>}
                />
                <Line
                  type="monotone"
                  dataKey="score"
                  strokeWidth={2}
                  activeDot={{ r: 6, fill: "#8B5CF6" }}
                  dot={{ r: 4, fill: "#8B5CF6" }}
                />
              </LineChart>
            </ChartContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PerformanceOverview;
