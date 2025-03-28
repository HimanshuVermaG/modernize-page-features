
import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import QuestionSetCard from "@/components/QuestionSetCard";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowLeft, Filter, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { motion } from "framer-motion";
import { useToast } from "@/hooks/use-toast";

// Mock data for question sets
const questionSets = {
  1: [ // Math
    { id: 1, title: "Algebra Basics", description: "Fundamental algebraic equations and expressions", questions: 15, timeMinutes: 20, difficulty: "Easy", subjectId: 1 },
    { id: 2, title: "Geometry Fundamentals", description: "Basic shapes, areas and properties", questions: 12, timeMinutes: 15, difficulty: "Medium", subjectId: 1 },
    { id: 3, title: "Advanced Equations", description: "Complex equations and problem solving", questions: 10, timeMinutes: 25, difficulty: "Hard", subjectId: 1 },
    { id: 4, title: "Number Theory", description: "Principles of numbers and operations", questions: 8, timeMinutes: 15, difficulty: "Medium", subjectId: 1 },
  ],
  2: [ // Hindi
    { id: 1, title: "व्याकरण अभ्यास", description: "Hindi grammar practice and concepts", questions: 20, timeMinutes: 25, difficulty: "Easy", subjectId: 2 },
    { id: 2, title: "शब्द भंडार", description: "Vocabulary building exercises", questions: 15, timeMinutes: 20, difficulty: "Medium", subjectId: 2 },
    { id: 3, title: "रचनात्मक लेखन", description: "Creative writing practice", questions: 5, timeMinutes: 30, difficulty: "Hard", subjectId: 2 },
  ],
  3: [ // G.S.
    { id: 1, title: "Indian History", description: "Important events and figures in Indian history", questions: 25, timeMinutes: 30, difficulty: "Medium", subjectId: 3 },
    { id: 2, title: "World Geography", description: "Countries, capitals and physical features", questions: 20, timeMinutes: 25, difficulty: "Medium", subjectId: 3 },
    { id: 3, title: "Current Affairs", description: "Recent news and events", questions: 15, timeMinutes: 20, difficulty: "Easy", subjectId: 3 },
    { id: 4, title: "Science Concepts", description: "Basic scientific principles and discoveries", questions: 18, timeMinutes: 25, difficulty: "Hard", subjectId: 3 },
  ],
  4: [ // English
    { id: 1, title: "Grammar Practice", description: "English grammar rules and applications", questions: 20, timeMinutes: 25, difficulty: "Easy", subjectId: 4 },
    { id: 2, title: "Reading Comprehension", description: "Passages with understanding questions", questions: 10, timeMinutes: 30, difficulty: "Medium", subjectId: 4 },
    { id: 3, title: "Vocabulary Builder", description: "Word meanings, synonyms and antonyms", questions: 15, timeMinutes: 20, difficulty: "Medium", subjectId: 4 },
    { id: 4, title: "Essay Writing", description: "Structured writing exercises", questions: 2, timeMinutes: 45, difficulty: "Hard", subjectId: 4 },
  ]
};

// Subject data mapping
const subjectData = {
  1: { name: "Math", icon: "📐", color: "bg-green-100 dark:bg-green-900" },
  2: { name: "Hindi", icon: "📚", color: "bg-blue-100 dark:bg-blue-900" },
  3: { name: "G.S.", icon: "🔍", color: "bg-amber-100 dark:bg-amber-900" },
  4: { name: "English", icon: "🖋️", color: "bg-purple-100 dark:bg-purple-900" }
};

const SubjectDetails = () => {
  const { subjectId } = useParams();
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState("");
  const [filterDifficulty, setFilterDifficulty] = useState("all");
  
  if (!subjectId || !subjectData[Number(subjectId)]) {
    return <div>Subject not found</div>;
  }
  
  const subject = subjectData[Number(subjectId)];
  const sets = questionSets[Number(subjectId)] || [];
  
  const filteredSets = sets.filter(set => {
    const matchesSearch = set.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          set.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDifficulty = filterDifficulty === "all" || set.difficulty.toLowerCase() === filterDifficulty.toLowerCase();
    
    return matchesSearch && matchesDifficulty;
  });

  const handleFilterChange = (value: string) => {
    setFilterDifficulty(value);
  };

  const handleDownload = () => {
    toast({
      title: "Downloading question sets",
      description: `${subject.name} practice sets will be available offline`,
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Navbar />
      <div className="container mx-auto px-4 py-6">
        <div className="mb-6">
          <div className="flex items-center mb-2">
            <Button variant="ghost" size="sm" asChild className="mr-2">
              <Link to="/">
                <ArrowLeft className="h-4 w-4 mr-1" />
                Back
              </Link>
            </Button>
            <h1 className="text-3xl font-bold text-gray-800 dark:text-white">
              {subject.name} <span className="text-2xl">{subject.icon}</span>
            </h1>
          </div>
          <p className="text-gray-500 dark:text-gray-400">
            Explore and practice {subject.name} question sets for your grade
          </p>
        </div>

        <div className="mb-6 flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
          <div className="relative w-full sm:w-64">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
            <Input
              type="search"
              placeholder="Search question sets"
              className="pl-9"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <div className="flex gap-2 w-full sm:w-auto">
            <Tabs 
              defaultValue="all" 
              className="w-full sm:w-auto"
              onValueChange={handleFilterChange}
            >
              <TabsList>
                <TabsTrigger value="all">All</TabsTrigger>
                <TabsTrigger value="easy">Easy</TabsTrigger>
                <TabsTrigger value="medium">Medium</TabsTrigger>
                <TabsTrigger value="hard">Hard</TabsTrigger>
              </TabsList>
            </Tabs>
            
            <Button 
              variant="outline" 
              size="icon"
              className="shrink-0"
              onClick={handleDownload}
            >
              <Filter className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
          variants={{
            hidden: { opacity: 0 },
            show: {
              opacity: 1,
              transition: {
                staggerChildren: 0.1
              }
            }
          }}
          initial="hidden"
          animate="show"
        >
          {filteredSets.length > 0 ? (
            filteredSets.map((set) => (
              <QuestionSetCard key={set.id} set={set} />
            ))
          ) : (
            <div className="col-span-full py-8 text-center">
              <p className="text-gray-500 dark:text-gray-400">No question sets found. Try adjusting your filters.</p>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default SubjectDetails;
