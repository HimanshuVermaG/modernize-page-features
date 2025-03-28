
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, Book, Info, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

const UpcomingEvents = () => {
  const events = [
    {
      id: 1,
      title: "Math Quiz",
      date: "Tomorrow, 9:00 AM",
      type: "quiz",
      icon: <Book className="h-4 w-4" />,
    },
    {
      id: 2,
      title: "Science Project Due",
      date: "Friday, 3:00 PM",
      type: "assignment",
      icon: <Calendar className="h-4 w-4" />,
    },
    {
      id: 3,
      title: "Parent-Teacher Meeting",
      date: "Next Monday, 5:00 PM",
      type: "event",
      icon: <Info className="h-4 w-4" />,
    },
  ];

  const tasks = [
    { id: 1, title: "Complete Hindi homework", completed: true },
    { id: 2, title: "Prepare for Math quiz", completed: false },
    { id: 3, title: "Finish Science project", completed: false },
    { id: 4, title: "Read English chapter", completed: true },
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
              className="flex items-start gap-3"
            >
              <div className={`p-2 rounded-full ${
                event.type === 'quiz' ? 'bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-300' :
                event.type === 'assignment' ? 'bg-amber-100 text-amber-600 dark:bg-amber-900 dark:text-amber-300' :
                'bg-purple-100 text-purple-600 dark:bg-purple-900 dark:text-purple-300'
              }`}>
                {event.icon}
              </div>
              <div className="flex-1">
                <h4 className="font-medium text-sm">{event.title}</h4>
                <p className="text-xs text-gray-500 dark:text-gray-400">{event.date}</p>
              </div>
            </motion.div>
          ))}
          
          <Button variant="outline" size="sm" className="w-full mt-2 text-xs">
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
            <motion.div
              key={task.id}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              className="flex items-center gap-2"
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
            </motion.div>
          ))}
          
          <Button variant="outline" size="sm" className="w-full mt-2 text-xs">
            View All Tasks
          </Button>
        </CardContent>
      </Card>
    </>
  );
};

export default UpcomingEvents;
