
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";

interface DashboardHeaderProps {
  greeting: string;
  studentInfo: string;
}

const DashboardHeader = ({ greeting, studentInfo }: DashboardHeaderProps) => {
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleReportClick = () => {
    navigate("/my-report");
  };

  return (
    <div className="flex justify-between items-center mb-6">
      <div>
        <motion.h1 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-3xl font-bold text-gray-800 dark:text-white"
        >
          {greeting}, Student!
        </motion.h1>
        <p className="text-gray-500 dark:text-gray-400">{studentInfo}</p>
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
  );
};

export default DashboardHeader;
