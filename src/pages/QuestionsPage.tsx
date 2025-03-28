
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { ChevronLeft, ChevronRight, Clock, XCircle, AlertTriangle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { motion } from "framer-motion";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

// Enhanced mock data for questions with more subjects
const questionData = {
  // Math questions
  "1-1": [
    { id: 1, question: "If x + 2 = 5, what is the value of x?", options: ["1", "2", "3", "4"], answer: "3" },
    { id: 2, question: "Solve for y: 2y - 3 = 7", options: ["2", "5", "6", "8"], answer: "5" },
    { id: 3, question: "What is the square root of 81?", options: ["7", "8", "9", "10"], answer: "9" },
    { id: 4, question: "If a rectangle has length 8 units and width 6 units, what is its area?", options: ["14", "28", "48", "56"], answer: "48" },
    { id: 5, question: "What is 15% of 80?", options: ["8", "12", "15", "20"], answer: "12" }
  ],
  "1-2": [
    { id: 1, question: "What is the perimeter of a square with side length 4 units?", options: ["8", "12", "16", "20"], answer: "16" },
    { id: 2, question: "If 3x - 7 = 5, what is x?", options: ["2", "3", "4", "6"], answer: "4" },
    { id: 3, question: "What is the value of π (pi) to two decimal places?", options: ["3.14", "3.41", "3.12", "3.24"], answer: "3.14" },
    { id: 4, question: "What is the value of 5² + 3³?", options: ["25", "34", "52", "127"], answer: "52" }
  ],
  // Hindi questions
  "2-1": [
    { id: 1, question: "निम्नलिखित में से कौन सा शब्द स्त्रीलिंग है?", options: ["लड़का", "पुस्तक", "घोड़ा", "हाथी"], answer: "पुस्तक" },
    { id: 2, question: "क्रिया के कितने भेद होते हैं?", options: ["दो", "तीन", "चार", "पांच"], answer: "दो" },
    { id: 3, question: "'काल' के कितने भेद होते हैं?", options: ["दो", "तीन", "चार", "पांच"], answer: "तीन" },
    { id: 4, question: "'देवनागरी' किस भाषा की लिपि है?", options: ["संस्कृत", "हिंदी", "अंग्रेजी", "तमिल"], answer: "हिंदी" }
  ],
  // G.S. questions
  "3-1": [
    { id: 1, question: "Who was the first Prime Minister of India?", options: ["Mahatma Gandhi", "Jawaharlal Nehru", "Sardar Patel", "B.R. Ambedkar"], answer: "Jawaharlal Nehru" },
    { id: 2, question: "Which is the largest planet in our solar system?", options: ["Earth", "Jupiter", "Saturn", "Mars"], answer: "Jupiter" },
    { id: 3, question: "What is the capital of France?", options: ["London", "Berlin", "Paris", "Rome"], answer: "Paris" },
    { id: 4, question: "Which is the longest river in the world?", options: ["Amazon", "Nile", "Yangtze", "Mississippi"], answer: "Nile" },
    { id: 5, question: "Who wrote 'Discovery of India'?", options: ["Mahatma Gandhi", "Jawaharlal Nehru", "Rabindranath Tagore", "Sarojini Naidu"], answer: "Jawaharlal Nehru" }
  ],
  // English questions
  "4-1": [
    { id: 1, question: "Choose the correct article: She is ___ university student.", options: ["a", "an", "the", "no article"], answer: "a" },
    { id: 2, question: "What is the past tense of 'eat'?", options: ["eated", "eaten", "ate", "eating"], answer: "ate" },
    { id: 3, question: "Choose the correct synonym for 'happy'.", options: ["sad", "joyful", "angry", "tired"], answer: "joyful" },
    { id: 4, question: "Which word is a preposition?", options: ["running", "quickly", "under", "shout"], answer: "under" },
    { id: 5, question: "Complete the analogy: Day is to Night as White is to ___.", options: ["Day", "Bright", "Black", "Dark"], answer: "Black" }
  ]
};

// Subject data mapping with enhanced descriptions
const subjectData = {
  1: { name: "Math", icon: "📐", color: "bg-green-100 dark:bg-green-900", description: "Mathematics Fundamentals" },
  2: { name: "Hindi", icon: "📚", color: "bg-blue-100 dark:bg-blue-900", description: "Hindi Language Practice" },
  3: { name: "G.S.", icon: "🔍", color: "bg-amber-100 dark:bg-amber-900", description: "General Studies Knowledge" },
  4: { name: "English", icon: "🖋️", color: "bg-purple-100 dark:bg-purple-900", description: "English Language Skills" }
};

const QuestionsPage = () => {
  const { subjectId, setId } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, string>>({});
  const [timeLeft, setTimeLeft] = useState(300); // 5 minutes in seconds
  const [timeSpent, setTimeSpent] = useState(0);
  const [quizStarted, setQuizStarted] = useState(false);
  const [exitDialogOpen, setExitDialogOpen] = useState(false);
  
  const questions = questionData[`${subjectId}-${setId}`] || [];
  const currentQuestion = questions[currentQuestionIndex];
  const progress = ((currentQuestionIndex + 1) / questions.length) * 100;
  const subject = subjectData[Number(subjectId)] || { name: "Subject", icon: "📝", description: "Practice Quiz" };
  
  useEffect(() => {
    if (!quizStarted) {
      setQuizStarted(true);
    }
    
    const timer = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime <= 1) {
          clearInterval(timer);
          handleFinish();
          return 0;
        }
        return prevTime - 1;
      });
      setTimeSpent(prev => prev + 1);
    }, 1000);
    
    return () => clearInterval(timer);
  }, [quizStarted]);
  
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
    const answerDetails = [];
    
    questions.forEach(q => {
      const selected = selectedAnswers[q.id] || "Not answered";
      const isCorrect = selected === q.answer;
      if (isCorrect) {
        score++;
      }
      
      answerDetails.push({
        question: q.question,
        selected,
        answer: q.answer,
        isCorrect
      });
    });
    
    const result = {
      subjectId: Number(subjectId),
      subjectName: subject.name,
      totalQuestions: questions.length,
      correctAnswers: score,
      timeSpent,
      answers: answerDetails
    };
    
    // Navigate to results page with the data
    navigate('/quiz-results', { state: { result } });
  };
  
  const handleExit = () => {
    setExitDialogOpen(true);
  };
  
  const confirmExit = () => {
    navigate(`/subject/${subjectId}`);
  };
  
  if (!currentQuestion) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle className="text-center">Questions Not Found</CardTitle>
          </CardHeader>
          <CardContent className="text-center">
            <AlertTriangle className="mx-auto h-12 w-12 text-amber-500 mb-4" />
            <p>Sorry, we couldn't find the questions for this set.</p>
          </CardContent>
          <CardFooter className="flex justify-center">
            <Button onClick={() => navigate(`/subject/${subjectId}`)}>
              Back to Subject
            </Button>
          </CardFooter>
        </Card>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Navbar />
      <div className="container mx-auto px-4 py-6">
        <div className="mb-4 flex justify-between items-center">
          <div>
            <h1 className="text-xl font-bold flex items-center">
              <span className="mr-2">{subject.icon}</span> {subject.name} Practice
            </h1>
            <p className="text-sm text-gray-500 dark:text-gray-400">{subject.description}</p>
          </div>
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
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className={`
                      p-3 rounded-md border cursor-pointer transition-all
                      ${selectedAnswers[currentQuestion.id] === option 
                        ? 'bg-primary/10 border-primary' 
                        : 'hover:bg-gray-100 dark:hover:bg-gray-800'}
                    `}
                    onClick={() => handleAnswerSelect(option)}
                  >
                    {option}
                  </motion.div>
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
      
      <AlertDialog open={exitDialogOpen} onOpenChange={setExitDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Exit Quiz?</AlertDialogTitle>
            <AlertDialogDescription>
              Your progress will be lost. Are you sure you want to exit?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={confirmExit}>Exit Quiz</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default QuestionsPage;
