
import React from "react";
import {
  ComposedChart as RechartsComposedChart,
  Bar,
  Line,
  Area,
  Scatter,
  CartesianGrid,
  XAxis,
  YAxis,
  ResponsiveContainer
} from "recharts";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { AspectRatio } from "@/components/ui/aspect-ratio";

interface ComposedChartProps {
  data: any[];
  xAxisKey: string;
  bars?: Array<{
    dataKey: string;
    name: string;
    color: string;
    radius?: [number, number, number, number];
  }>;
  lines?: Array<{
    dataKey: string;
    name: string;
    color: string;
    strokeWidth?: number;
  }>;
  areas?: Array<{
    dataKey: string;
    name: string;
    color: string;
    fillOpacity?: number;
    strokeDasharray?: string;
  }>;
  scatters?: Array<{
    dataKey: string;
    name: string;
    color?: string; // Add optional color property
    renderDot?: (props: any) => React.ReactElement; // Change return type to ReactElement
  }>;
  aspectRatio?: number;
  showGrid?: boolean;
  className?: string;
  height?: number;
}

const ComposedChart = ({
  data,
  xAxisKey,
  bars = [],
  lines = [],
  areas = [],
  scatters = [],
  aspectRatio = 16/4,
  showGrid = true,
  className = "",
  height
}: ComposedChartProps) => {
  // Create config for ChartContainer
  const chartConfig = [...bars, ...lines, ...areas, ...scatters].reduce((config, item) => {
    if (!item.dataKey) return config;
    
    // Check if item has color property before using it
    const hasColor = 'color' in item;
    const itemColor = hasColor ? item.color : undefined;
    
    return {
      ...config,
      [item.dataKey]: {
        theme: itemColor ? { light: itemColor, dark: itemColor } : undefined,
        label: item.name,
      }
    };
  }, {});

  return (
    <AspectRatio ratio={aspectRatio} className={className}>
      <ChartContainer
        config={chartConfig}
      >
        <ResponsiveContainer width="100%" height={height || "100%"}>
          <RechartsComposedChart
            data={data}
            margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
          >
            {showGrid && <CartesianGrid strokeDasharray="3 3" />}
            <XAxis dataKey={xAxisKey} />
            <YAxis />
            <ChartTooltip content={<ChartTooltipContent />} />
            
            {areas.map((area, index) => (
              <Area
                key={`area-${index}`}
                type="monotone"
                dataKey={area.dataKey}
                name={area.name}
                fill={area.color}
                stroke={area.color}
                fillOpacity={area.fillOpacity || 0.6}
                strokeDasharray={area.strokeDasharray}
              />
            ))}
            
            {bars.map((bar, index) => (
              <Bar
                key={`bar-${index}`}
                dataKey={bar.dataKey}
                name={bar.name}
                fill={bar.color}
                radius={bar.radius || [4, 4, 0, 0]}
              />
            ))}
            
            {lines.map((line, index) => (
              <Line
                key={`line-${index}`}
                type="monotone"
                dataKey={line.dataKey}
                name={line.name}
                stroke={line.color}
                strokeWidth={line.strokeWidth || 2}
              />
            ))}
            
            {scatters.map((scatter, index) => (
              <Scatter
                key={`scatter-${index}`}
                dataKey={scatter.dataKey}
                name={scatter.name}
                fill={scatter.color} // Use color if provided
                shape={scatter.renderDot ? (props) => {
                  // Ensure renderDot returns a React element
                  const element = scatter.renderDot?.(props);
                  return element || null;
                } : undefined}
              />
            ))}
          </RechartsComposedChart>
        </ResponsiveContainer>
      </ChartContainer>
    </AspectRatio>
  );
};

export default ComposedChart;
