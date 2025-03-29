
import React from "react";
import {
  Bar,
  BarChart as RechartsBarChart,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  Cell
} from "recharts";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { AspectRatio } from "@/components/ui/aspect-ratio";

interface BarChartProps {
  data: any[];
  xAxisKey: string;
  bars: Array<{
    dataKey: string;
    name: string;
    color?: string;
    radius?: [number, number, number, number];
  }>;
  aspectRatio?: number;
  useCells?: boolean;
  colorKey?: string;
  showGrid?: boolean;
  className?: string;
  height?: number;
  xAxisAngle?: number;
  xAxisHeight?: number;
}

const BarChart = ({
  data,
  xAxisKey,
  bars,
  aspectRatio = 16/4,
  useCells = false,
  colorKey,
  showGrid = true,
  className = "",
  height,
  xAxisAngle = 0,
  xAxisHeight = 30
}: BarChartProps) => {
  // Create config for ChartContainer
  const chartConfig = bars.reduce((config, bar) => {
    return {
      ...config,
      [bar.dataKey]: {
        theme: bar.color ? { light: bar.color, dark: bar.color } : undefined,
        label: bar.name,
      }
    };
  }, {});

  return (
    <AspectRatio ratio={aspectRatio} className={className}>
      <ChartContainer
        config={chartConfig}
      >
        <ResponsiveContainer width="100%" height={height || "100%"}>
          <RechartsBarChart
            data={data}
            margin={{ 
              top: 10, 
              right: 10, 
              left: 10, 
              bottom: xAxisAngle !== 0 ? xAxisHeight : 10 
            }}
          >
            {showGrid && <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />}
            <XAxis 
              dataKey={xAxisKey} 
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 12 }}
              angle={xAxisAngle}
              textAnchor={xAxisAngle < 0 ? "end" : "middle"}
              height={xAxisHeight}
            />
            <YAxis 
              domain={[0, 100]} 
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 12 }}
            />
            <ChartTooltip
              content={<ChartTooltipContent/>}
            />
            
            {bars.map((bar, index) => (
              <Bar 
                key={index}
                dataKey={bar.dataKey} 
                name={bar.name}
                fill={bar.color}
                radius={bar.radius || [4, 4, 0, 0]}
              >
                {useCells && data.map((entry, cellIndex) => (
                  <Cell 
                    key={`cell-${cellIndex}`} 
                    fill={colorKey ? entry[colorKey] : bar.color} 
                  />
                ))}
              </Bar>
            ))}
          </RechartsBarChart>
        </ResponsiveContainer>
      </ChartContainer>
    </AspectRatio>
  );
};

export default BarChart;
