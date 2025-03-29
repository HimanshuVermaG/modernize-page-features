
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

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
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Subject</TableHead>
              <TableHead className="text-right">Score</TableHead>
              {showDetailed && <TableHead className="text-right">Accuracy</TableHead>}
              {showDetailed && <TableHead className="text-right">Assessment</TableHead>}
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((subject, index) => (
              <TableRow key={index}>
                <TableCell>{subject.subject}</TableCell>
                <TableCell className={`text-right ${subject.className}`}>{subject.score}%</TableCell>
                {showDetailed && <TableCell className="text-right">{subject.accuracy}%</TableCell>}
                {showDetailed && (
                  <TableCell className="text-right">
                    {subject.score >= 80 
                      ? "Excellent" 
                      : subject.score >= 70 
                      ? "Good" 
                      : subject.score >= 60 
                      ? "Average" 
                      : "Needs Improvement"}
                  </TableCell>
                )}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default SubjectPerformance;
