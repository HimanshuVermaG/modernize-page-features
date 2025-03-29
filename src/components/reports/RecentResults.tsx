
import React from "react";
import ResultCard from "@/components/ResultCard";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight } from "lucide-react";

interface Result {
  id: number;
  name: string;
  score: number;
  maxScore: number;
  grade: string;
}

interface RecentResultsProps {
  results: Result[];
  title?: string;
  showViewAll?: boolean;
  maxItems?: number;
  className?: string;
}

const RecentResults = ({ 
  results, 
  title = "Recent Results", 
  showViewAll = true,
  maxItems = 4,
  className = ""
}: RecentResultsProps) => {
  const navigate = useNavigate();
  const displayResults = results.slice(0, maxItems);
  
  return (
    <Card className={className}>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg">{title}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {displayResults.map((result) => (
          <ResultCard key={result.id} result={result} />
        ))}
        
        {showViewAll && (
          <Button 
            variant="outline" 
            size="sm" 
            className="w-full mt-2"
            onClick={() => navigate('/quiz-results')}
          >
            View All Results <ArrowRight className="ml-1 h-4 w-4" />
          </Button>
        )}
      </CardContent>
    </Card>
  );
};

export default RecentResults;
