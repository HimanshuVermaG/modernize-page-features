
import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { ChevronLeft, ChevronRight, Clock, XCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { motion } from "framer-motion";

// Mock data for questions
const questionData = {
  // Math questions
  "1-1": [
    { id: 1, question: "If x + 2 = 5, what is the value of x?", options: ["1", "2", "3", "4"], answer: "3" },
    { id: 2, question: "Solve for y: 2y - 3 = 7", options: ["2", "5", "6", "8"], answer: "5" },
    { id: 3, question: "What is the square root of 81?", options: ["7", "8", "9", "10"], answer: "9" }
  ],
  // Hindi questions
  "2-1": [
    { id: 1, question: "निम्नलिखित में से कौन सा शब्द स्त्रीलिंग है?", options: ["लड़का", "पुस्तक", "घोड़ा", "हाथी"], answer: "पुस्तक" },
    { id: 2, question: "क्रिया के कितने भेद होते हैं?", options: ["दो", "तीन", "चार", "पांच"], answer: "दो" }
  ],
  // G.S. questions
  "3-1": [
    { id: 1, question: "Who was the first Prime Minister of India?", options: ["Mahatma Gandhi", "Jawaharlal Nehru", "Sardar Patel", "B.R. Ambedkar"], answer: "Jawaharlal Nehru" },
    { id: 2, question: "Which is the largest planet in our solar system?", options: ["Earth", "Jupiter", "Saturn", "Mars"], answer: "Jupiter" },
    { id: 3, question: "What is the capital of France?", options: ["London", "Berlin", "Paris", "Rome"], answer: "Paris" }
  ],
  // English questions
  "4-1": [
    { id: 1, question: "Choose the correct article: She is ___ university student.", options: ["a", "an", "the", "no article"], answer: "a" },
    { id: 2, question: "What is the past tense of 'eat'?", options: ["eated", "eaten", "ate", "eating"], answer: "ate" },
    { id: 3, question: "Choose the correct synonym for 'happy'.", options: ["sad", "joyful", "angry", "tired"], answer: "joyful" }
  ]
};

const getSubjectNameById = (id: number) => {
  const subjects = { 1: "Math", 2: "Hindi", 3: "G.S.", 4: "English" };
  return subjects[id as keyof typeof subjects] || "Subject";
};

const QuestionsPage = () => {
  const { subjectId, setId } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, string>>({});
  const [timeLeft, setTimeLeft] = useState(300); // 5 minutes in seconds
  
  const questions = questionData[`${subjectId}-${setId}`] || [];
  const currentQuestion = questions[currentQuestionIndex];
  const progress = ((currentQuestionIndex + 1) / questions.length) * 100;
  
  React.useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime <= 1) {
          clearInterval(timer);
          handleFinish();
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);
    
    return () => clearInterval(timer);
  }, []);
  
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };
  
  const handleAnswerSelect = (answer: string) => {
    setSelectedAnswers({
      ...selectedAnswers,
      [currentQuestion.id]: answer
    });
  };
  
  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      handleFinish();
    }
  };
  
  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };
  
  const handleFinish = () => {
    let score = 0;
    questions.forEach(q => {
      if (selectedAnswers[q.id] === q.answer) {
        score++;
      }
    });
    
    toast({
      title: "Practice Complete!",
      description: `Your score: ${score}/${questions.length}`,
    });
    
    // In a real app, you'd save the result to a database
    // For now, we'll just navigate back to the subject page
    navigate(`/subject/${subjectId}`);
  };
  
  const handleExit = () => {
    navigate(`/subject/${subjectId}`);
  };
  
  if (!currentQuestion) {
    return <div>Questions not found</div>;
  }
  
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Navbar />
      <div className="container mx-auto px-4 py-6">
        <div className="mb-4 flex justify-between items-center">
          <h1 className="text-xl font-bold">
            {getSubjectNameById(Number(subjectId))} Practice
          </h1>
          <div className="flex items-center">
            <Clock className="h-4 w-4 mr-2 text-amber-500" />
            <span className={`font-medium ${timeLeft < 60 ? 'text-red-500' : ''}`}>
              {formatTime(timeLeft)}
            </span>
          </div>
        </div>
        
        <div className="mb-6">
          <div className="flex justify-between text-sm mb-1">
            <span>Question {currentQuestionIndex + 1} of {questions.length}</span>
            <span>{Math.round(progress)}% Complete</span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>
        
        <motion.div
          key={currentQuestionIndex}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3 }}
        >
          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="text-lg font-medium">
                {currentQuestion.question}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {currentQuestion.options.map((option, index) => (
                  <div
                    key={index}
                    className={`
                      p-3 rounded-md border cursor-pointer transition-all
                      ${selectedAnswers[currentQuestion.id] === option 
                        ? 'bg-primary/10 border-primary' 
                        : 'hover:bg-gray-100 dark:hover:bg-gray-800'}
                    `}
                    onClick={() => handleAnswerSelect(option)}
                  >
                    {option}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
        
        <div className="flex justify-between items-center">
          <Button
            variant="outline"
            onClick={handlePrevious}
            disabled={currentQuestionIndex === 0}
          >
            <ChevronLeft className="h-4 w-4 mr-1" /> Previous
          </Button>
          
          <Button
            variant="outline"
            onClick={handleExit}
            className="text-red-500 hover:text-red-600"
          >
            <XCircle className="h-4 w-4 mr-1" /> Exit
          </Button>
          
          <Button
            onClick={handleNext}
          >
            {currentQuestionIndex === questions.length - 1 ? 'Finish' : 'Next'} <ChevronRight className="h-4 w-4 ml-1" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default QuestionsPage;
