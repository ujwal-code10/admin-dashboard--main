import { LucideIcon, TrendingUp, TrendingDown } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface MetricCardProps {
  title: string;
  value: string;
  change: string;
  trend: "up" | "down";
  icon: LucideIcon;
}

export function MetricCard({ title, value, change, trend, icon: Icon }: MetricCardProps) {
  return (
    <Card className="hover:shadow-lg transition-all duration-300 hover:scale-[1.02] cursor-pointer group animate-fade-in">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-1 sm:pb-2">
        <CardTitle className="text-xs sm:text-sm font-medium text-gray-600 dark:text-gray-400" id={`metric-${title.replace(/\s+/g, '-').toLowerCase()}`}>
          {title}
        </CardTitle>
        <Icon className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-gray-400 dark:text-gray-500 group-hover:text-blue-500 dark:group-hover:text-blue-400 transition-colors duration-200" aria-hidden="true" />
      </CardHeader>
      <CardContent>
        <div className="text-lg sm:text-2xl font-bold text-gray-900 dark:text-gray-100 group-hover:text-blue-700 dark:group-hover:text-blue-400 transition-colors duration-200" 
             aria-labelledby={`metric-${title.replace(/\s+/g, '-').toLowerCase()}`}>
          {value}
        </div>
        <div className="flex items-center text-[10px] sm:text-xs mt-0.5 sm:mt-1" role="status" aria-label={`${change} change from last month`}>
          {trend === "up" ? (
            <TrendingUp className="h-2.5 w-2.5 sm:h-3 sm:w-3 text-green-600 dark:text-green-500 mr-1" aria-hidden="true" />
          ) : (
            <TrendingDown className="h-2.5 w-2.5 sm:h-3 sm:w-3 text-red-600 dark:text-red-500 mr-1" aria-hidden="true" />
          )}
          <span className={`font-medium ${trend === "up" ? "text-green-600 dark:text-green-500" : "text-red-600 dark:text-red-500"}`}>
            {change}
          </span>
          <span className="text-gray-500 dark:text-gray-400 ml-1">from last month</span>
        </div>
      </CardContent>
    </Card>
  );
}
