
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
    color?: string; 
    renderDot?: (props: any) => React.ReactElement;
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
    
    // Check if the item has a color property in a type-safe way
    const itemColor = ('color' in item) ? item.color : undefined;
    
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
            
            {scatters.map((scatter, index) => {
              // Type-safe way to access the optional color property
              const scatterColor = scatter.color;
              
              return (
                <Scatter
                  key={`scatter-${index}`}
                  dataKey={scatter.dataKey}
                  name={scatter.name}
                  fill={scatterColor}
                  shape={scatter.renderDot ? (props) => {
                    const element = scatter.renderDot?.(props);
                    return element || null;
                  } : undefined}
                />
              );
            })}
          </RechartsComposedChart>
        </ResponsiveContainer>
      </ChartContainer>
    </AspectRatio>
  );
};

export default ComposedChart;
