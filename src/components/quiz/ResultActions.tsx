
import { Button } from "@/components/ui/button";
import { ArrowLeft, Home } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface ResultActionsProps {
  subjectId: number;
}

const ResultActions = ({ subjectId }: ResultActionsProps) => {
  const navigate = useNavigate();

  return (
    <div className="flex justify-between mt-6">
      <Button 
        variant="outline" 
        onClick={() => navigate(`/subject/${subjectId}`)}
      >
        <ArrowLeft className="mr-2 h-4 w-4" /> Back to Subject
      </Button>
      <Button 
        variant="outline" 
        onClick={() => navigate("/")}
      >
        <Home className="mr-2 h-4 w-4" /> Go to Dashboard
      </Button>
    </div>
  );
};

export default ResultActions;
