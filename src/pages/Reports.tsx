import { useState } from "react";
import { FileText, TrendingUp, Calendar } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DateRangePicker } from "@/components/reports/DateRangePicker";
import { ExportButton } from "@/components/reports/ExportButton";
import { DateRange } from "react-day-picker";

const Reports = () => {
  const [dateRange, setDateRange] = useState<DateRange | undefined>();

  const mockReports = [
    {
      id: 1,
      title: "Monthly Client Growth",
      date: "2024-03-01",
      summary: "Client base grew by 15% this month",
      type: "Growth",
    },
    {
      id: 2,
      title: "Revenue Analysis",
      date: "2024-03-01",
      summary: "Revenue increased by 8% compared to last month",
      type: "Financial",
    },
    {
      id: 3,
      title: "Client Satisfaction Survey",
      date: "2024-02-28",
      summary: "Overall satisfaction score: 4.8/5",
      type: "Satisfaction",
    },
  ];

  const filteredReports = mockReports.filter(report => {
    if (!dateRange?.from || !dateRange?.to) return true;
    const reportDate = new Date(report.date);
    return reportDate >= dateRange.from && reportDate <= dateRange.to;
  });

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">Reports</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">View and analyze your business performance metrics.</p>
        </div>
        <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center">
          <DateRangePicker 
            onDateRangeChange={setDateRange} 
            className="animate-fade-in"
          />
          <ExportButton 
            data={filteredReports} 
            filename="business-reports"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="hover:shadow-lg transition-all duration-300 hover:scale-105 animate-fade-in">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Reports</CardTitle>
            <FileText className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{filteredReports.length}</div>
            <p className="text-xs text-muted-foreground">
              {dateRange?.from && dateRange?.to 
                ? `For selected period` 
                : "All time"
              }
            </p>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-all duration-300 hover:scale-105 animate-fade-in" style={{ animationDelay: "0.1s" }}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg. Growth Rate</CardTitle>
            <TrendingUp className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12.5%</div>
            <p className="text-xs text-muted-foreground">
              Month over month
            </p>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-all duration-300 hover:scale-105 animate-fade-in" style={{ animationDelay: "0.2s" }}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Last Updated</CardTitle>
            <Calendar className="h-4 w-4 text-purple-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">Today</div>
            <p className="text-xs text-muted-foreground">
              March 15, 2024
            </p>
          </CardContent>
        </Card>
      </div>

      <Card className="animate-fade-in" style={{ animationDelay: "0.3s" }}>
        <CardHeader>
          <CardTitle>Available Reports</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredReports.map((report, index) => (
              <div 
                key={report.id} 
                className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-all duration-200 hover:scale-[1.02] animate-fade-in"
                style={{ animationDelay: `${0.4 + index * 0.1}s` }}
              >
                <div className="flex-1">
                  <h3 className="font-medium text-gray-900 dark:text-gray-100">{report.title}</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{report.summary}</p>
                  <div className="flex items-center gap-4 mt-2">
                    <span className="text-xs text-gray-400 dark:text-gray-500">
                      {new Date(report.date).toLocaleDateString()}
                    </span>
                    <span className="text-xs bg-blue-100 dark:bg-blue-900/50 text-blue-800 dark:text-blue-300 px-2 py-1 rounded">
                      {report.type}
                    </span>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 text-sm font-medium transition-colors duration-200">
                    View
                  </button>
                  <button className="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 text-sm transition-colors duration-200">
                    Download
                  </button>
                </div>
              </div>
            ))}
          </div>
          
          {filteredReports.length === 0 && (
            <div className="text-center py-8 text-gray-500 dark:text-gray-400">
              No reports found for the selected date range.
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default Reports;
