
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import BarChart from "@/components/charts/BarChart";

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
          <BarChart 
            data={data}
            xAxisKey="subject"
            bars={[{ dataKey: "score", name: "Score", color: "#8B5CF6" }]}
            xAxisAngle={-45}
            xAxisHeight={60}
          />
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
