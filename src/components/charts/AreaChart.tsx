
import React from "react";
import {
  Area,
  AreaChart as RechartsAreaChart,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  Legend
} from "recharts";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { AspectRatio } from "@/components/ui/aspect-ratio";

interface AreaChartProps {
  data: any[];
  xAxisKey: string;
  areas: Array<{
    dataKey: string;
    name: string;
    color: string;
    stackId?: string | number;
    fillOpacity?: number;
    strokeDasharray?: string;
    type?: "basis" | "basisClosed" | "basisOpen" | "linear" | "linearClosed" | "natural" | "monotone" | "monotoneX" | "monotoneY" | "step" | "stepBefore" | "stepAfter";
  }>;
  aspectRatio?: number;
  showLegend?: boolean;
  showGrid?: boolean;
  className?: string;
  height?: number;
}

const AreaChart = ({
  data,
  xAxisKey,
  areas,
  aspectRatio = 16/4,
  showLegend = true,
  showGrid = true,
  className = "",
  height
}: AreaChartProps) => {
  // Create config for ChartContainer
  const chartConfig = areas.reduce((config, area) => {
    return {
      ...config,
      [area.dataKey]: {
        theme: { light: area.color, dark: area.color },
        label: area.name,
      }
    };
  }, {});

  return (
    <AspectRatio ratio={aspectRatio} className={className}>
      <ChartContainer
        config={chartConfig}
      >
        <ResponsiveContainer width="100%" height={height || "100%"}>
          <RechartsAreaChart
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
            
            {areas.map((area, index) => (
              <Area
                key={index}
                type={area.type || "monotone"}
                dataKey={area.dataKey}
                name={area.name}
                stackId={area.stackId}
                stroke={area.color}
                fill={area.color}
                fillOpacity={area.fillOpacity || 1}
                strokeDasharray={area.strokeDasharray}
              />
            ))}
          </RechartsAreaChart>
        </ResponsiveContainer>
      </ChartContainer>
    </AspectRatio>
  );
};

export default AreaChart;
