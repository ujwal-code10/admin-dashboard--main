import { Outlet } from "react-router-dom";
import { AppSidebar } from "./AppSidebar";
import { TopNavbar } from "./TopNavbar";

const DashboardLayout = () => {
  return (
    <>
      <AppSidebar />
      <main className="flex-1 flex flex-col overflow-hidden">
        <TopNavbar />
        <div className="flex-1 overflow-y-auto bg-gray-50/50 dark:bg-gray-900/50 p-3 sm:p-4 md:p-6">
          <div className="container mx-auto max-w-7xl">
            <Outlet />
          </div>
        </div>
      </main>
    </>
  );
};

export default DashboardLayout;
