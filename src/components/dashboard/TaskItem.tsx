
import { Check, ExternalLink } from "lucide-react";
import { motion } from "framer-motion";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface TaskItemProps {
  task: {
    id: number;
    title: string;
    completed: boolean;
    action: () => void;
  };
  index: number;
}

const TaskItem = ({ task, index }: TaskItemProps) => {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3, delay: index * 0.1 }}
          className="flex items-center gap-2 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800 p-2 rounded-md"
          onClick={task.action}
        >
          <div className={`flex-shrink-0 w-5 h-5 rounded-full border ${
            task.completed 
              ? 'bg-green-500 border-green-500 dark:bg-green-600 dark:border-green-600'
              : 'border-gray-300 dark:border-gray-700'
          } flex items-center justify-center`}>
            {task.completed && <Check className="h-3 w-3 text-white" />}
          </div>
          <span className={`text-sm ${
            task.completed ? 'line-through text-gray-400 dark:text-gray-500' : ''
          }`}>
            {task.title}
          </span>
          <ExternalLink className="ml-auto h-3 w-3 text-gray-400" />
        </motion.div>
      </TooltipTrigger>
      <TooltipContent>
        <p>Click to {task.completed ? "view" : "start"}</p>
      </TooltipContent>
    </Tooltip>
  );
};

export default TaskItem;
