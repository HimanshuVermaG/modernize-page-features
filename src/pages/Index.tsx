
import { useEffect, useState } from "react";
import { Navbar } from "@/components/Navbar";
import UpcomingEvents from "@/components/dashboard/UpcomingEvents";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import ProgressOverview from "@/components/dashboard/ProgressOverview";
import DashboardContent from "@/components/dashboard/DashboardContent";

const StudentDashboard = () => {
  const [greeting, setGreeting] = useState("");
  const [progress, setProgress] = useState(0);
  
  useEffect(() => {
    const hour = new Date().getHours();
    if (hour < 12) setGreeting("Good Morning");
    else if (hour < 18) setGreeting("Good Afternoon");
    else setGreeting("Good Evening");
    
    // Animate progress on load
    const timer = setTimeout(() => setProgress(75), 500);
    return () => clearTimeout(timer);
  }, []);

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

  const subjectProgress = [
    { name: "Math", progress: 85 },
    { name: "English", progress: 70 },
    { name: "Hindi", progress: 65 },
    { name: "G.S.", progress: 80 },
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Navbar />
      
      <div className="container mx-auto px-4 py-6">
        <DashboardHeader 
          greeting={greeting} 
          studentInfo="Class 6 - Section A" 
        />
        
        <div className="mb-6">
          <ProgressOverview progress={progress} subjects={subjectProgress} />
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <DashboardContent 
              subjects={subjects} 
              tests={tests} 
              results={results} 
            />
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
