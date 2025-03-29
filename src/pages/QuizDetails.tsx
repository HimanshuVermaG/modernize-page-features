
import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ArrowRight } from "lucide-react";
import PDFResources from "@/components/quiz/PDFResources";

const QuizDetails = () => {
  const { subjectId, quizId } = useParams();
  const navigate = useNavigate();
  
  // This would typically come from an API
  const quizData = {
    id: Number(quizId) || 1,
    subjectId: Number(subjectId) || 1,
    title: "Math Quiz - Basic Algebra",
    description: "Test your knowledge of basic algebraic concepts including equations, inequalities, and graphing.",
    questionsCount: 15,
    timeLimit: 30, // minutes
    difficulty: "Medium",
    topics: ["Equations", "Inequalities", "Graphing"],
    pdfResources: [
      {
        id: 1,
        title: "Algebra Fundamentals",
        description: "Comprehensive guide to basic algebra concepts",
        url: "https://www.example.com/pdfs/algebra-fundamentals.pdf"
      },
      {
        id: 2,
        title: "Equation Solving Techniques",
        description: "Step-by-step approach to solving various equations",
        url: "https://www.example.com/pdfs/equation-solving.pdf"
      }
    ]
  };
  
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Navbar />
      <div className="container mx-auto px-4 py-6">
        <Button 
          variant="ghost" 
          size="sm"
          onClick={() => navigate(-1)}
          className="mb-4"
        >
          <ChevronLeft className="mr-1 h-4 w-4" />
          Back
        </Button>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardContent className="p-6">
                <h1 className="text-2xl font-bold mb-2">{quizData.title}</h1>
                <p className="text-gray-500 dark:text-gray-400 mb-6">
                  {quizData.description}
                </p>
                
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-6">
                  <div className="bg-gray-100 dark:bg-gray-800 p-3 rounded-lg">
                    <p className="text-xs text-gray-500 dark:text-gray-400">Questions</p>
                    <p className="font-medium">{quizData.questionsCount}</p>
                  </div>
                  <div className="bg-gray-100 dark:bg-gray-800 p-3 rounded-lg">
                    <p className="text-xs text-gray-500 dark:text-gray-400">Time Limit</p>
                    <p className="font-medium">{quizData.timeLimit} minutes</p>
                  </div>
                  <div className="bg-gray-100 dark:bg-gray-800 p-3 rounded-lg">
                    <p className="text-xs text-gray-500 dark:text-gray-400">Difficulty</p>
                    <p className="font-medium">{quizData.difficulty}</p>
                  </div>
                </div>
                
                <div className="mb-6">
                  <p className="text-sm font-medium mb-2">Topics Covered:</p>
                  <div className="flex flex-wrap gap-2">
                    {quizData.topics.map((topic, index) => (
                      <span key={index} className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300 px-2 py-1 rounded text-xs">
                        {topic}
                      </span>
                    ))}
                  </div>
                </div>
                
                <Button 
                  onClick={() => navigate(`/questions/${subjectId}/${quizId}`)}
                  className="w-full"
                >
                  Start Quiz <ArrowRight className="ml-1 h-4 w-4" />
                </Button>
              </CardContent>
            </Card>
          </div>
          
          <div className="space-y-6">
            <PDFResources resources={quizData.pdfResources} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuizDetails;
