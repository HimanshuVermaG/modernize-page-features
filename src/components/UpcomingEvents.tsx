
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, Book, Info, Check, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { 
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const UpcomingEvents = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const events = [
    {
      id: 1,
      title: "Math Quiz",
      date: "Tomorrow, 9:00 AM",
      type: "quiz",
      icon: <Book className="h-4 w-4" />,
      action: () => navigate("/questions/1/1")
    },
    {
      id: 2,
      title: "English Practice Test",
      date: "Friday, 3:00 PM",
      type: "assignment",
      icon: <Calendar className="h-4 w-4" />,
      action: () => navigate("/questions/4/1")
    },
    {
      id: 3,
      title: "Parent-Teacher Meeting",
      date: "Next Monday, 5:00 PM",
      type: "event",
      icon: <Info className="h-4 w-4" />,
      action: () => toast({
        title: "Event Reminder Set",
        description: "You'll be reminded about the Parent-Teacher Meeting."
      })
    },
  ];

  const tasks = [
    { id: 1, title: "Complete Hindi homework", completed: true, action: () => navigate("/subject/2") },
    { id: 2, title: "Prepare for Math quiz", completed: false, action: () => navigate("/questions/1/1") },
    { id: 3, title: "Finish English practice", completed: false, action: () => navigate("/questions/4/1") },
    { id: 4, title: "Read G.S. chapter", completed: true, action: () => navigate("/subject/3") },
  ];

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Upcoming Events</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {events.map((event, index) => (
            <motion.div
              key={event.id}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              className="flex items-start gap-3 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800 p-2 rounded-md"
              onClick={event.action}
            >
              <div className={`p-2 rounded-full ${
                event.type === 'quiz' ? 'bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-300' :
                event.type === 'assignment' ? 'bg-amber-100 text-amber-600 dark:bg-amber-900 dark:text-amber-300' :
                'bg-purple-100 text-purple-600 dark:bg-purple-900 dark:text-purple-300'
              }`}>
                {event.icon}
              </div>
              <div className="flex-1">
                <h4 className="font-medium text-sm flex items-center">
                  {event.title}
                  <ExternalLink className="ml-1 h-3 w-3 text-gray-400" />
                </h4>
                <p className="text-xs text-gray-500 dark:text-gray-400">{event.date}</p>
              </div>
            </motion.div>
          ))}
          
          <Button variant="outline" size="sm" className="w-full mt-2 text-xs"
            onClick={() => toast({
              title: "Calendar View",
              description: "Calendar view will be available in the next update"
            })}>
            View All Events
          </Button>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Tasks</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          {tasks.map((task, index) => (
            <TooltipProvider key={task.id}>
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
            </TooltipProvider>
          ))}
          
          <Button variant="outline" size="sm" className="w-full mt-2 text-xs"
            onClick={() => toast({
              title: "Task Management",
              description: "Full task management will be available in the next update"
            })}>
            View All Tasks
          </Button>
        </CardContent>
      </Card>
    </>
  );
};

export default UpcomingEvents;
