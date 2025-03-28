
import React from "react";
import ResultCard from "@/components/ResultCard";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

interface Result {
  id: number;
  name: string;
  score: number;
  maxScore: number;
  grade: string;
}

interface RecentResultsProps {
  results: Result[];
}

const RecentResults = ({ results }: RecentResultsProps) => {
  const navigate = useNavigate();
  
  return (
    <div className="space-y-4">
      {results.map((result) => (
        <ResultCard key={result.id} result={result} />
      ))}
      
      <Button 
        variant="outline" 
        size="sm" 
        className="w-full mt-2"
        onClick={() => navigate('/quiz-results')}
      >
        View All Results
      </Button>
    </div>
  );
};

export default RecentResults;
