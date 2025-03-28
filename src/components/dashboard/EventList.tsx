
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import EventCard from "./EventCard";

interface Event {
  id: number;
  title: string;
  date: string;
  type: string;
  icon: React.ReactNode;
  action: () => void;
}

interface EventListProps {
  events: Event[];
}

const EventList = ({ events }: EventListProps) => {
  const { toast } = useToast();
  
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Upcoming Events</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {events.map((event, index) => (
          <EventCard key={event.id} event={event} index={index} />
        ))}
        
        <Button 
          variant="outline" 
          size="sm" 
          className="w-full mt-2 text-xs"
          onClick={() => toast({
            title: "Calendar View",
            description: "Calendar view will be available in the next update"
          })}
        >
          View All Events
        </Button>
      </CardContent>
    </Card>
  );
};

export default EventList;
