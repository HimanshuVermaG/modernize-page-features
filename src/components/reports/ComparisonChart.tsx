
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import BarChart from "@/components/charts/BarChart";

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
          <BarChart 
            data={data}
            xAxisKey="name"
            bars={[{ dataKey: "score", name: "Score" }]}
            useCells={true}
            colorKey="fill"
          />
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium">Detailed Statistics</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Comparison</TableHead>
                <TableHead>Score</TableHead>
                <TableHead className="text-right">Difference</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.map((entry, index) => {
                const baseLine = data.find(item => item.name === "You")?.score || 0;
                const difference = entry.name !== "You" ? entry.score - baseLine : 0;
                
                return (
                  <TableRow key={index}>
                    <TableCell className="font-medium">{entry.name}</TableCell>
                    <TableCell>{entry.score}%</TableCell>
                    <TableCell className="text-right">
                      {entry.name !== "You" && (
                        <span className={difference >= 0 ? "text-green-500" : "text-red-500"}>
                          {difference > 0 ? "+" : ""}{difference}%
                        </span>
                      )}
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default ComparisonChart;
