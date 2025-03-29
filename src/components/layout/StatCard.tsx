
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";

interface StatCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon?: LucideIcon;
  iconColor?: string;
  iconBgColor?: string;
}

const StatCard = ({ 
  title, 
  value, 
  subtitle, 
  icon: Icon, 
  iconColor = "text-blue-600 dark:text-blue-300",
  iconBgColor = "bg-blue-100 dark:bg-blue-900"
}: StatCardProps) => {
  return (
    <Card>
      <CardContent className="pt-6">
        <div className="flex items-center mb-4">
          {Icon && (
            <div className={`p-2 rounded-full ${iconBgColor} ${iconColor} mr-3`}>
              <Icon className="h-5 w-5" />
            </div>
          )}
          <div>
            <h3 className="font-medium">{title}</h3>
            {subtitle && (
              <p className="text-sm text-gray-500 dark:text-gray-400">{subtitle}</p>
            )}
          </div>
        </div>
        <p className="font-medium text-lg">{value}</p>
      </CardContent>
    </Card>
  );
};

export default StatCard;
