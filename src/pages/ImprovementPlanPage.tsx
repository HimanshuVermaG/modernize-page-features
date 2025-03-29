
import React from "react";
import { Navbar } from "@/components/Navbar";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";
import ImprovementPlan from "@/components/reports/ImprovementPlan";

const ImprovementPlanPage = () => {
  const { subjectId } = useParams<{ subjectId: string }>();
  const navigate = useNavigate();
  
  // In a real app, this would come from an API based on the subjectId
  const subjectData = {
    id: Number(subjectId) || 1,
    name: subjectId === "1" ? "Mathematics" : 
          subjectId === "2" ? "English" : 
          subjectId === "3" ? "Hindi" : 
          subjectId === "4" ? "G.S." : "Subject",
    planItems: [
      {
        id: 1,
        topic: "Algebra Fundamentals",
        description: "Basic algebraic operations and equation solving",
        difficulty: "Easy" as const,
        recommended: true,
        progress: 75,
        quizLink: `/questions/${subjectId}/1`
      },
      {
        id: 2,
        topic: "Geometry Concepts",
        description: "Properties of shapes and geometric calculations",
        difficulty: "Medium" as const,
        recommended: true,
        progress: 40,
        quizLink: `/questions/${subjectId}/2`
      },
      {
        id: 3,
        topic: "Advanced Problem Solving",
        description: "Complex word problems and applications",
        difficulty: "Hard" as const,
        recommended: false,
        progress: 20,
        quizLink: `/questions/${subjectId}/3`
      },
      {
        id: 4,
        topic: "Number Theory",
        description: "Properties of numbers and number systems",
        difficulty: "Medium" as const,
        recommended: false,
        progress: 60,
        quizLink: `/questions/${subjectId}/4`
      },
      {
        id: 5,
        topic: "Data Analysis",
        description: "Statistics and probability concepts",
        difficulty: "Medium" as const,
        recommended: true,
        progress: 30,
        quizLink: `/questions/${subjectId}/5`
      },
      {
        id: 6,
        topic: "Basic Arithmetic",
        description: "Fundamental operations and calculations",
        difficulty: "Easy" as const,
        recommended: false,
        progress: 100,
        quizLink: `/questions/${subjectId}/6`
      }
    ]
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Navbar />
      <div className="container mx-auto px-4 py-6">
        <div className="flex items-center mb-6">
          <Button 
            variant="ghost" 
            size="sm"
            onClick={() => navigate(-1)}
            className="mr-2"
          >
            <ChevronLeft className="h-4 w-4 mr-1" />
            Back
          </Button>
          <h1 className="text-2xl font-bold">Improvement Plan</h1>
        </div>

        <div className="max-w-4xl mx-auto">
          <ImprovementPlan 
            subject={subjectData.name}
            planItems={subjectData.planItems}
          />
        </div>
      </div>
    </div>
  );
};

export default ImprovementPlanPage;
