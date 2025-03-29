
import React, { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import PerformanceOverview from "@/components/reports/PerformanceOverview";
import SubjectPerformance from "@/components/reports/SubjectPerformance";
import RecentResults from "@/components/reports/RecentResults";
import ComparisonChart from "@/components/reports/ComparisonChart";
import DetailedSubjectAnalysis from "@/components/reports/DetailedSubjectAnalysis";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ChevronLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const MyReport = () => {
  const navigate = useNavigate();
  const [selectedSubject, setSelectedSubject] = useState("1");
  
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
    ],
    subjects: [
      {
        id: 1,
        name: "Mathematics",
        score: 85,
        color: "#3B82F6",
        weakTopics: [
          { name: "Algebra", score: 70 },
          { name: "Geometry", score: 65 },
          { name: "Calculus", score: 60 },
          { name: "Statistics", score: 75 },
        ],
        progressData: [
          { week: "Week 1", score: 65 },
          { week: "Week 2", score: 70 },
          { week: "Week 3", score: 75 },
          { week: "Week 4", score: 80 },
          { week: "Week 5", score: 85 },
        ],
        quizDistribution: [
          { name: "Excellent", value: 60, color: "#10B981" },
          { name: "Good", value: 20, color: "#3B82F6" },
          { name: "Average", value: 15, color: "#F59E0B" },
          { name: "Poor", value: 5, color: "#EF4444" },
        ],
      },
      {
        id: 2,
        name: "English",
        score: 72,
        color: "#10B981",
        weakTopics: [
          { name: "Grammar", score: 65 },
          { name: "Vocabulary", score: 70 },
          { name: "Comprehension", score: 75 },
          { name: "Writing", score: 60 },
        ],
        progressData: [
          { week: "Week 1", score: 60 },
          { week: "Week 2", score: 65 },
          { week: "Week 3", score: 68 },
          { week: "Week 4", score: 70 },
          { week: "Week 5", score: 72 },
        ],
        quizDistribution: [
          { name: "Excellent", value: 40, color: "#10B981" },
          { name: "Good", value: 30, color: "#3B82F6" },
          { name: "Average", value: 20, color: "#F59E0B" },
          { name: "Poor", value: 10, color: "#EF4444" },
        ],
      },
      {
        id: 3,
        name: "Science",
        score: 80,
        color: "#8B5CF6",
        weakTopics: [
          { name: "Physics", score: 75 },
          { name: "Chemistry", score: 70 },
          { name: "Biology", score: 85 },
          { name: "Earth Science", score: 80 },
        ],
        progressData: [
          { week: "Week 1", score: 70 },
          { week: "Week 2", score: 73 },
          { week: "Week 3", score: 75 },
          { week: "Week 4", score: 78 },
          { week: "Week 5", score: 80 },
        ],
        quizDistribution: [
          { name: "Excellent", value: 50, color: "#10B981" },
          { name: "Good", value: 30, color: "#3B82F6" },
          { name: "Average", value: 15, color: "#F59E0B" },
          { name: "Poor", value: 5, color: "#EF4444" },
        ],
      },
    ]
  };
  
  const currentSubject = studentData.subjects.find(s => s.id.toString() === selectedSubject) || studentData.subjects[0];

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
                <TabsTrigger value="detailed">Detailed Analysis</TabsTrigger>
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
                
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                  {studentData.subjects.map(subject => (
                    <Card key={subject.id} className="overflow-hidden">
                      <CardHeader className="pb-2">
                        <div className="flex justify-between items-center">
                          <CardTitle className="text-sm font-medium">{subject.name}</CardTitle>
                          <div className="flex items-center">
                            <span className={`h-2 w-2 rounded-full mr-1`} style={{ backgroundColor: subject.color }}></span>
                            <span className="text-sm">{subject.score}%</span>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent className="pt-0">
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="w-full"
                          onClick={() => navigate(`/subject-progress/${subject.id}`)}
                        >
                          View Progress
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>
              
              <TabsContent value="comparison" className="space-y-6">
                <ComparisonChart data={studentData.rankingData} />
              </TabsContent>
              
              <TabsContent value="detailed" className="space-y-6">
                <div className="flex items-center space-x-2 mb-4">
                  <span className="text-sm font-medium">Select Subject:</span>
                  <Select value={selectedSubject} onValueChange={setSelectedSubject}>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Select Subject" />
                    </SelectTrigger>
                    <SelectContent>
                      {studentData.subjects.map(subject => (
                        <SelectItem key={subject.id} value={subject.id.toString()}>
                          {subject.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <DetailedSubjectAnalysis subject={currentSubject} />
                
                <div className="flex justify-end">
                  <Button 
                    onClick={() => navigate(`/improvement-plan/${currentSubject.id}`)}
                  >
                    Get Improvement Plan for {currentSubject.name}
                  </Button>
                </div>
              </TabsContent>
            </Tabs>
          </div>
          
          {/* Right column */}
          <div className="space-y-6">
            <RecentResults 
              results={studentData.recentResults} 
              title="Recent Results"
              showViewAll={true}
            />
            
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Button 
                  variant="outline" 
                  className="w-full justify-start"
                  onClick={() => navigate('/quiz-results')}
                >
                  View All Quiz Results
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full justify-start"
                  onClick={() => navigate('/improvement-plan/1')}
                >
                  Get Math Improvement Plan
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full justify-start"
                  onClick={() => navigate('/subject-progress/1')}
                >
                  View Math Progress
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyReport;
