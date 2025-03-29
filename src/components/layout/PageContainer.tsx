
import React from "react";
import { Navbar } from "@/components/Navbar";

interface PageContainerProps {
  children: React.ReactNode;
  className?: string;
}

const PageContainer = ({ children, className = "" }: PageContainerProps) => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Navbar />
      <div className={`container mx-auto px-4 py-6 ${className}`}>
        {children}
      </div>
    </div>
  );
};

export default PageContainer;
