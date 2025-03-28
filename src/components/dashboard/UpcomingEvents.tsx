
import { Book, Calendar, Info } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import EventList from "./EventList";
import TaskList from "./TaskList";

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
      <EventList events={events} />
      <TaskList tasks={tasks} />
    </>
  );
};

export default UpcomingEvents;
