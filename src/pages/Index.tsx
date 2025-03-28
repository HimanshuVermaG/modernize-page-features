
import { useEffect, useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { ArrowRight, Book, Calendar, Check, Home, Info } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { motion } from "framer-motion";
import SubjectCard from "@/components/SubjectCard";
import TestCard from "@/components/TestCard";
import ResultCard from "@/components/ResultCard";
import { Navbar } from "@/components/Navbar";
import UpcomingEvents from "@/components/UpcomingEvents";
import { SubjectProgress } from "@/components/SubjectProgress";

const StudentDashboard = () => {
  const { toast } = useToast();
  const [greeting, setGreeting] = useState("");
  const [progress, setProgress] = useState(75);
  
  useEffect(() => {
    const hour = new Date().getHours();
    if (hour < 12) setGreeting("Good Morning");
    else if (hour < 18) setGreeting("Good Afternoon");
    else setGreeting("Good Evening");
    
    // Animate progress on load
    const timer = setTimeout(() => setProgress(75), 500);
    return () => clearTimeout(timer);
  }, []);

  const handleReportClick = () => {
    toast({
      title: "Generating Report",
      description: "Your full academic report is being prepared",
    });
  };

  const subjects = [
    { id: 1, name: "Math", icon: "📐", color: "bg-green-100 dark:bg-green-900", questions: 45 },
    { id: 2, name: "Hindi", icon: "📚", color: "bg-blue-100 dark:bg-blue-900", questions: 36 },
    { id: 3, name: "G.S.", icon: "🔍", color: "bg-amber-100 dark:bg-amber-900", questions: 50 },
    { id: 4, name: "English", icon: "🖋️", color: "bg-purple-100 dark:bg-purple-900", questions: 40 },
  ];

  const tests = [
    { id: 1, name: "English Test - I", score: 50, maxScore: 50, date: "2023-11-10" },
    { id: 2, name: "Math Test - I", score: 50, maxScore: 50, date: "2023-11-15" },
    { id: 3, name: "Science Test - I", score: 45, maxScore: 50, date: "2023-11-20" },
  ];

  const results = [
    { id: 1, name: "English Set - I", score: 18, maxScore: 20, grade: "A" },
    { id: 2, name: "English Set - II", score: 10, maxScore: 20, grade: "B" },
    { id: 3, name: "Math Set - I", score: 19, maxScore: 20, grade: "A+" },
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Navbar />
      
      <div className="container mx-auto px-4 py-6">
        <div className="flex justify-between items-center mb-6">
          <div>
            <motion.h1 
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-3xl font-bold text-gray-800 dark:text-white"
            >
              {greeting}, Student!
            </motion.h1>
            <p className="text-gray-500 dark:text-gray-400">Class 6 - Section A</p>
          </div>
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.2 }}
          >
            <Button 
              onClick={handleReportClick}
              className="bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600"
            >
              My Report <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </motion.div>
        </div>
        
        <div className="mb-6">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle>Overall Progress</CardTitle>
              <CardDescription>Your academic journey this semester</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm font-medium">75% Complete</span>
                  <span className="text-sm text-gray-500">Target: 90%</span>
                </div>
                <Progress value={progress} className="h-2" />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-6">
                <SubjectProgress subject="Math" progress={85} />
                <SubjectProgress subject="English" progress={70} />
                <SubjectProgress subject="Hindi" progress={65} />
                <SubjectProgress subject="G.S." progress={80} />
              </div>
            </CardContent>
          </Card>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
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
          </div>
          
          <div className="space-y-6">
            <UpcomingEvents />
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;
