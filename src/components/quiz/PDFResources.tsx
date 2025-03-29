
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileText, ExternalLink } from "lucide-react";
import { motion } from "framer-motion";
import { AspectRatio } from "@/components/ui/aspect-ratio";

interface PDFResource {
  id: number;
  title: string;
  description: string;
  url: string;
}

interface PDFResourcesProps {
  resources: PDFResource[];
}

const PDFResources = ({ resources }: PDFResourcesProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Learning Resources</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {resources.map((resource, index) => (
          <motion.div
            key={resource.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            className="border rounded-lg overflow-hidden"
          >
            <div className="bg-gray-100 dark:bg-gray-800 p-3">
              <div className="flex items-start space-x-3">
                <div className="p-2 bg-red-100 text-red-600 dark:bg-red-900 dark:text-red-300 rounded-lg">
                  <FileText className="h-5 w-5" />
                </div>
                <div className="flex-1">
                  <h3 className="font-medium text-sm">{resource.title}</h3>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                    {resource.description}
                  </p>
                </div>
              </div>
            </div>
            <div className="p-3">
              <AspectRatio ratio={16/9} className="bg-gray-100 dark:bg-gray-800 mb-3 rounded overflow-hidden">
                <div className="flex items-center justify-center h-full">
                  <FileText className="h-10 w-10 text-gray-400" />
                </div>
              </AspectRatio>
              <Button 
                variant="outline" 
                size="sm" 
                className="w-full flex items-center justify-center"
                onClick={() => window.open(resource.url, "_blank")}
              >
                Open PDF <ExternalLink className="ml-1 h-4 w-4" />
              </Button>
            </div>
          </motion.div>
        ))}
      </CardContent>
    </Card>
  );
};

export default PDFResources;
