
import React from "react";
import {
  PieChart as RechartsPieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Legend
} from "recharts";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { AspectRatio } from "@/components/ui/aspect-ratio";

interface PieChartProps {
  data: Array<{
    name: string;
    value: number;
    color: string;
  }>;
  aspectRatio?: number;
  innerRadius?: number;
  outerRadius?: number;
  paddingAngle?: number;
  valueKey?: string;
  nameKey?: string;
  showLabel?: boolean;
  showLegend?: boolean;
  className?: string;
  height?: number;
}

const PieChart = ({
  data,
  aspectRatio = 16/4,
  innerRadius = 60,
  outerRadius = 80,
  paddingAngle = 2,
  valueKey = "value",
  nameKey = "name",
  showLabel = true,
  showLegend = true,
  className = "",
  height
}: PieChartProps) => {
  return (
    <AspectRatio ratio={aspectRatio} className={className}>
      <ChartContainer
        config={{
          value: {
            label: "Distribution",
          },
        }}
      >
        <ResponsiveContainer width="100%" height={height || "100%"}>
          <RechartsPieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={innerRadius}
              outerRadius={outerRadius}
              paddingAngle={paddingAngle}
              dataKey={valueKey}
              nameKey={nameKey}
              label={showLabel ? ({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%` : undefined}
              labelLine={false}
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            {showLegend && <Legend />}
            <ChartTooltip content={<ChartTooltipContent />} />
          </RechartsPieChart>
        </ResponsiveContainer>
      </ChartContainer>
    </AspectRatio>
  );
};

export default PieChart;
