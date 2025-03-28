
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import SubjectCard from "@/components/SubjectCard";
import TestCard from "@/components/TestCard";
import ResultCard from "@/components/ResultCard";

interface Subject {
  id: number;
  name: string;
  icon: string;
  color: string;
  questions: number;
}

interface Test {
  id: number;
  name: string;
  score: number;
  maxScore: number;
  date: string;
}

interface Result {
  id: number;
  name: string;
  score: number;
  maxScore: number;
  grade: string;
}

interface DashboardContentProps {
  subjects: Subject[];
  tests: Test[];
  results: Result[];
}

const DashboardContent = ({ subjects, tests, results }: DashboardContentProps) => {
  return (
    <Tabs defaultValue="subjects" className="w-full">
      <TabsList className="grid w-full grid-cols-3 mb-4">
        <TabsTrigger value="subjects">Question Sets</TabsTrigger>
        <TabsTrigger value="practice">Practice Tests</TabsTrigger>
        <TabsTrigger value="results">Results</TabsTrigger>
      </TabsList>
      
      <TabsContent value="subjects" className="space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {subjects.map((subject) => (
            <SubjectCard key={subject.id} subject={subject} />
          ))}
        </div>
      </TabsContent>
      
      <TabsContent value="practice" className="space-y-4">
        {tests.map((test) => (
          <TestCard key={test.id} test={test} />
        ))}
      </TabsContent>
      
      <TabsContent value="results" className="space-y-4">
        {results.map((result) => (
          <ResultCard key={result.id} result={result} />
        ))}
      </TabsContent>
    </Tabs>
  );
};

export default DashboardContent;
