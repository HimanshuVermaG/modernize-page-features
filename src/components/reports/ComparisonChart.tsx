
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartContainer, ChartTooltip, ChartTooltipContent, ChartLegend, ChartLegendContent } from "@/components/ui/chart";
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Cell } from "recharts";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

interface RankingData {
  name: string;
  score: number;
  fill: string;
}

interface ComparisonChartProps {
  data: RankingData[];
}

const ComparisonChart = ({ data }: ComparisonChartProps) => {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium">Performance Comparison</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[250px]">
            <ChartContainer
              config={{
                score: { label: "Score" },
              }}
            >
              <BarChart
                data={data}
                margin={{ top: 20, right: 20, left: 20, bottom: 20 }}
              >
                <XAxis 
                  dataKey="name" 
                  axisLine={false}
                  tickLine={false}
                />
                <YAxis 
                  domain={[0, 100]} 
                  axisLine={false}
                  tickLine={false}
                />
                <ChartTooltip
                  content={<ChartTooltipContent />}
                />
                <Bar 
                  dataKey="score" 
                  radius={[4, 4, 0, 0]}
                >
                  {data.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.fill} />
                  ))}
                </Bar>
                <ChartLegend content={<ChartLegendContent />} />
              </BarChart>
            </ChartContainer>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium">Detailed Comparison</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Category</TableHead>
                <TableHead className="text-right">Score</TableHead>
                <TableHead className="text-right">Percentile</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell className="font-medium">You</TableCell>
                <TableCell className="text-right">{data[0].score}%</TableCell>
                <TableCell className="text-right">78th</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Class Average</TableCell>
                <TableCell className="text-right">{data[1].score}%</TableCell>
                <TableCell className="text-right">50th</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Top Performer</TableCell>
                <TableCell className="text-right">{data[2].score}%</TableCell>
                <TableCell className="text-right">99th</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default ComparisonChart;
