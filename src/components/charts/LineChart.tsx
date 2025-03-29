
import React from "react";
import {
  Line,
  LineChart as RechartsLineChart,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  Legend
} from "recharts";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { AspectRatio } from "@/components/ui/aspect-ratio";

interface LineChartProps {
  data: any[];
  xAxisKey: string;
  lines: Array<{
    dataKey: string;
    name: string;
    color: string;
    strokeWidth?: number;
    dotSize?: number;
    activeDotSize?: number;
  }>;
  aspectRatio?: number;
  showLegend?: boolean;
  showGrid?: boolean;
  className?: string;
  height?: number;
}

const LineChart = ({
  data,
  xAxisKey,
  lines,
  aspectRatio = 16/4,
  showLegend = true,
  showGrid = true,
  className = "",
  height
}: LineChartProps) => {
  // Create config for ChartContainer
  const chartConfig = lines.reduce((config, line) => {
    return {
      ...config,
      [line.dataKey]: {
        theme: { light: line.color, dark: line.color },
        label: line.name,
      }
    };
  }, {});

  return (
    <AspectRatio ratio={aspectRatio} className={className}>
      <ChartContainer
        config={chartConfig}
      >
        <ResponsiveContainer width="100%" height={height || "100%"}>
          <RechartsLineChart
            data={data}
            margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
          >
            {showGrid && <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />}
            <XAxis 
              dataKey={xAxisKey} 
              tick={{ fontSize: 12 }}
            />
            <YAxis 
              domain={[0, 100]} 
              tick={{ fontSize: 12 }}
            />
            <ChartTooltip
              content={<ChartTooltipContent/>}
            />
            {showLegend && <Legend />}
            
            {lines.map((line, index) => (
              <Line
                key={index}
                type="monotone"
                dataKey={line.dataKey}
                name={line.name}
                stroke={line.color}
                strokeWidth={line.strokeWidth || 2}
                dot={{ r: line.dotSize || 4, fill: line.color }}
                activeDot={{ r: line.activeDotSize || 6, fill: line.color }}
              />
            ))}
          </RechartsLineChart>
        </ResponsiveContainer>
      </ChartContainer>
    </AspectRatio>
  );
};

export default LineChart;
