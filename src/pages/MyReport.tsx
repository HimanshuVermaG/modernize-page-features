
import React from "react";
import { Navbar } from "@/components/Navbar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import PerformanceOverview from "@/components/reports/PerformanceOverview";
import SubjectPerformance from "@/components/reports/SubjectPerformance";
import RecentResults from "@/components/reports/RecentResults";
import ComparisonChart from "@/components/reports/ComparisonChart";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ChevronLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const MyReport = () => {
  const navigate = useNavigate();
  
  // Sample data - in a real app, this would come from an API
  const studentData = {
    name: "John Doe",
    overallScore: 78,
    rank: 12,
    totalStudents: 120,
    recentResults: [
      { id: 1, name: "Mathematics Quiz 3", score: 85, maxScore: 100, grade: "A" },
      { id: 2, name: "English Literature Test", score: 72, maxScore: 100, grade: "B" },
      { id: 3, name: "Physics Midterm", score: 80, maxScore: 100, grade: "B+" },
      { id: 4, name: "Chemistry Quiz 2", score: 68, maxScore: 100, grade: "C+" },
    ],
    subjectPerformance: [
      { subject: "Mathematics", score: 85, accuracy: 85, className: "text-blue-500" },
      { subject: "English", score: 72, accuracy: 72, className: "text-green-500" },
      { subject: "Physics", score: 80, accuracy: 80, className: "text-purple-500" },
      { subject: "Chemistry", score: 68, accuracy: 68, className: "text-amber-500" },
      { subject: "Biology", score: 75, accuracy: 75, className: "text-red-500" },
    ],
    rankingData: [
      { name: "You", score: 78, fill: "#8B5CF6" },
      { name: "Class Average", score: 72, fill: "#D1D5DB" },
      { name: "Top Performer", score: 92, fill: "#10B981" }
    ],
    progressData: [
      { month: "Jan", score: 65 },
      { month: "Feb", score: 68 },
      { month: "Mar", score: 72 },
      { month: "Apr", score: 75 },
      { month: "May", score: 78 },
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
          <h1 className="text-2xl font-bold">Academic Report</h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Left column */}
          <div className="md:col-span-2 space-y-6">
            <Tabs defaultValue="overview" className="w-full">
              <TabsList className="mb-4">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="subjects">Subjects</TabsTrigger>
                <TabsTrigger value="comparison">Comparison</TabsTrigger>
              </TabsList>
              
              <TabsContent value="overview" className="space-y-6">
                <PerformanceOverview 
                  score={studentData.overallScore} 
                  rank={studentData.rank} 
                  totalStudents={studentData.totalStudents}
                  progressData={studentData.progressData}
                />
                
                <SubjectPerformance data={studentData.subjectPerformance} />
              </TabsContent>
              
              <TabsContent value="subjects" className="space-y-6">
                <SubjectPerformance data={studentData.subjectPerformance} showDetailed={true} />
              </TabsContent>
              
              <TabsContent value="comparison" className="space-y-6">
                <ComparisonChart data={studentData.rankingData} />
              </TabsContent>
            </Tabs>
          </div>
          
          {/* Right column */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Recent Results</CardTitle>
              </CardHeader>
              <CardContent>
                <RecentResults results={studentData.recentResults} />
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyReport;
