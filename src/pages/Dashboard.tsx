import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { MetricCard } from "@/components/dashboard/MetricCard";
import { RecentActivity } from "@/components/dashboard/RecentActivity";
import { ClientGrowthChart } from "@/components/dashboard/ClientGrowthChart";
import { Users, DollarSign, TrendingUp, FileText } from "lucide-react";
import { ClientFormModal } from "@/components/dashboard/ClientFormModal";
import { ReportModal } from "@/components/dashboard/ReportModal";

const Dashboard = () => {
  const navigate = useNavigate();
  const [clientModalOpen, setClientModalOpen] = useState(false);
  const [reportModalOpen, setReportModalOpen] = useState(false);

  const metrics = [
    {
      title: "Total Clients",
      value: "1,234",
      change: "+12%",
      trend: "up" as const,
      icon: Users,
    },
    {
      title: "Monthly Revenue",
      value: "$45,231",
      change: "+8%",
      trend: "up" as const,
      icon: DollarSign,
    },
    {
      title: "Active Projects",
      value: "23",
      change: "+3%",
      trend: "up" as const,
      icon: TrendingUp,
    },
    {
      title: "Reports Generated",
      value: "89",
      change: "-2%",
      trend: "down" as const,
      icon: FileText,
    },
  ];

  return (
    <div className="space-y-4 sm:space-y-6 lg:space-y-8 animate-fade-in">
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-gray-100">Dashboard</h1>
        <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 mt-1 sm:mt-2">Welcome back! Here's what's happening with your business today.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6">
        {metrics.map((metric, index) => (
          <div key={index} style={{ animationDelay: `${index * 0.1}s` }}>
            <MetricCard {...metric} />
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 sm:gap-4 lg:gap-6">
        <div className="min-h-[300px] sm:min-h-[400px]">
          <ClientGrowthChart />
        </div>
        <div className="min-h-[300px] sm:min-h-[400px]">
          <RecentActivity />
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4 sm:p-6 animate-fade-in">
        <h3 className="text-base sm:text-lg font-semibold text-gray-900 dark:text-gray-100 mb-3 sm:mb-4">Quick Actions</h3>
        <div className="space-y-2 sm:space-y-3">
          <button 
            onClick={() => setClientModalOpen(true)}
            className="w-full text-left p-2 sm:p-3 rounded-lg border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-all duration-200 hover:scale-[1.02]"
          >
            <div className="font-medium text-sm sm:text-base text-gray-900 dark:text-gray-100">Add New Client</div>
            <div className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">Create a new client profile</div>
          </button>
          <button 
            onClick={() => setReportModalOpen(true)}
            className="w-full text-left p-2 sm:p-3 rounded-lg border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-all duration-200 hover:scale-[1.02]"
          >
            <div className="font-medium text-sm sm:text-base text-gray-900 dark:text-gray-100">Generate Report</div>
            <div className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">Create monthly business report</div>
          </button>
          <button 
            onClick={() => navigate("/reports")}
            className="w-full text-left p-2 sm:p-3 rounded-lg border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-all duration-200 hover:scale-[1.02]"
          >
            <div className="font-medium text-sm sm:text-base text-gray-900 dark:text-gray-100">View Analytics</div>
            <div className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">Check performance metrics</div>
          </button>
        </div>
      </div>

      <ClientFormModal open={clientModalOpen} onOpenChange={setClientModalOpen} />
      <ReportModal open={reportModalOpen} onOpenChange={setReportModalOpen} />
    </div>
  );
};

export default Dashboard;
