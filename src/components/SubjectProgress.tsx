
import { motion } from "framer-motion";

interface SubjectProgressProps {
  subject: string;
  progress: number;
}

export function SubjectProgress({ subject, progress }: SubjectProgressProps) {
  const colors = {
    Math: { bg: "bg-green-100 dark:bg-green-900", text: "text-green-800 dark:text-green-300", fill: "bg-green-500" },
    English: { bg: "bg-blue-100 dark:bg-blue-900", text: "text-blue-800 dark:text-blue-300", fill: "bg-blue-500" },
    Hindi: { bg: "bg-amber-100 dark:bg-amber-900", text: "text-amber-800 dark:text-amber-300", fill: "bg-amber-500" },
    "G.S.": { bg: "bg-purple-100 dark:bg-purple-900", text: "text-purple-800 dark:text-purple-300", fill: "bg-purple-500" },
  };
  
  const subjectColors = colors[subject as keyof typeof colors] || { 
    bg: "bg-gray-100 dark:bg-gray-800", 
    text: "text-gray-800 dark:text-gray-300", 
    fill: "bg-gray-500" 
  };
  
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className={`${subjectColors.bg} rounded-lg p-3`}
    >
      <div className="flex justify-between items-center mb-1">
        <h4 className={`text-sm font-medium ${subjectColors.text}`}>{subject}</h4>
        <span className="text-xs font-medium">{progress}%</span>
      </div>
      <div className="w-full h-1.5 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 1, ease: "easeOut" }}
          className={`h-full rounded-full ${subjectColors.fill}`}
        ></motion.div>
      </div>
    </motion.div>
  );
}
