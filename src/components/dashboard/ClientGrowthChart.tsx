import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer, CartesianGrid, Tooltip, Area } from "recharts";
import { useEffect, useState, useRef } from "react";

const chartData = [
  { month: "Jan", clients: 186 },
  { month: "Feb", clients: 205 },
  { month: "Mar", clients: 237 },
  { month: "Apr", clients: 273 },
  { month: "May", clients: 209 },
  { month: "Jun", clients: 214 },
  { month: "Jul", clients: 234 },
  { month: "Aug", clients: 267 },
  { month: "Sep", clients: 289 },
  { month: "Oct", clients: 312 },
  { month: "Nov", clients: 334 },
  { month: "Dec", clients: 367 },
];

const chartColors = {
  blue: "#2563eb", // Primary blue color
  lightBlue: "#60a5fa", // Lighter blue for dark mode
  background: "var(--background)",
  border: "var(--border)",
  text: "var(--foreground)",
  grid: "rgb(243 244 246)", // gray-100
  gridDark: "rgb(31 41 55)" // gray-800
};

export function ClientGrowthChart() {
  const [isMobile, setIsMobile] = useState(false);
  const [containerWidth, setContainerWidth] = useState(0);
  const chartContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 640);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (!chartContainerRef.current) return;
    const observer = new window.ResizeObserver(entries => {
      for (let entry of entries) {
        setContainerWidth(entry.contentRect.width);
      }
    });
    observer.observe(chartContainerRef.current);
    return () => observer.disconnect();
  }, []);

  // Calculate interval based on container width and label size
  const minLabelWidth = 48; // px, increased for better spacing
  let dynamicInterval = 0;
  if (containerWidth > 0) {
    const maxLabels = Math.floor(containerWidth / minLabelWidth);
    if (maxLabels >= 12) {
      dynamicInterval = 0; // show all
    } else if (maxLabels >= 6) {
      dynamicInterval = 1; // every other
    } else {
      dynamicInterval = 2; // every third
    }
  }

  return (
    <Card className="h-full animate-fade-in">
      <CardHeader className="p-4 sm:p-6">
        <CardTitle className="text-xl font-semibold text-gray-900 dark:text-gray-100">
          Client Growth Over Time
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0 sm:p-2">
        <div className="chart-container w-full h-[300px] sm:h-[350px] relative" ref={chartContainerRef}>
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={chartData}
              margin={{
                top: 20,
                right: 30,
                left: 35,
                bottom: 20,
              }}
            >
              <CartesianGrid
                strokeDasharray="3 3"
                horizontal={true}
                vertical={false}
                className="text-gray-100 dark:text-gray-800"
                strokeOpacity={0.8}
              />
              <XAxis
                dataKey="month"
                axisLine={false}
                tickLine={false}
                interval={dynamicInterval}
                tick={props => {
                  const fontSize = isMobile ? 9 : 12;
                  const dy = isMobile ? 18 : 16;
                  return (
                    <text
                      x={props.x}
                      y={props.y}
                      dy={dy}
                      textAnchor="middle"
                      fill="currentColor"
                      fontSize={fontSize}
                    >
                      {props.payload.value}
                    </text>
                  );
                }}
                dy={10}
                tickMargin={8}
                className="text-gray-500 dark:text-gray-400"
                padding={{ left: 32, right: 32 }}
              />
              <YAxis
                axisLine={false}
                tickLine={false}
                tick={{ 
                  fill: 'currentColor',
                  fontSize: 12,
                }}
                dx={-10}
                tickMargin={10}
                className="text-gray-500 dark:text-gray-400"
                width={40}
                tickCount={5}
                domain={[0, 'dataMax + 100']}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: chartColors.background,
                  border: `1px solid ${chartColors.border}`,
                  borderRadius: '8px',
                  boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                  padding: '8px 12px',
                }}
                labelStyle={{
                  color: chartColors.text,
                  fontWeight: 600,
                  fontSize: '14px',
                  marginBottom: '4px',
                }}
                itemStyle={{
                  color: chartColors.text,
                  fontSize: '14px',
                  padding: '2px 0',
                }}
                cursor={{ 
                  stroke: chartColors.border,
                  strokeWidth: 1,
                  strokeDasharray: '3 3'
                }}
                wrapperStyle={{
                  outline: 'none'
                }}
              />
              <Line
                type="monotone"
                dataKey="clients"
                stroke={chartColors.blue}
                className="dark:!stroke-[#60a5fa]"
                strokeWidth={2}
                dot={{
                  r: 4,
                  fill: chartColors.blue,
                  className: "dark:!fill-[#60a5fa]",
                  strokeWidth: 0
                }}
                activeDot={{
                  r: 6,
                  stroke: chartColors.blue,
                  className: "dark:!stroke-[#60a5fa]",
                  strokeWidth: 2,
                  fill: chartColors.background
                }}
                isAnimationActive={true}
                animationDuration={2000}
                animationBegin={0}
                animationEasing="ease-out"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
