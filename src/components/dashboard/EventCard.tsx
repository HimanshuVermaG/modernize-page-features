
import { ExternalLink } from "lucide-react";
import { motion } from "framer-motion";

interface EventCardProps {
  event: {
    id: number;
    title: string;
    date: string;
    type: string;
    icon: React.ReactNode;
    action: () => void;
  };
  index: number;
}

const EventCard = ({ event, index }: EventCardProps) => {
  return (
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
  );
};

export default EventCard;
