
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import TaskItem from "./TaskItem";

interface Task {
  id: number;
  title: string;
  completed: boolean;
  action: () => void;
}

interface TaskListProps {
  tasks: Task[];
}

const TaskList = ({ tasks }: TaskListProps) => {
  const { toast } = useToast();
  
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Tasks</CardTitle>
      </CardHeader>
      <CardContent className="space-y-2">
        {tasks.map((task, index) => (
          <TaskItem key={task.id} task={task} index={index} />
        ))}
        
        <Button 
          variant="outline" 
          size="sm" 
          className="w-full mt-2 text-xs"
          onClick={() => toast({
            title: "Task Management",
            description: "Full task management will be available in the next update"
          })}
        >
          View All Tasks
        </Button>
      </CardContent>
    </Card>
  );
};

export default TaskList;
