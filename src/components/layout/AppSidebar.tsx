import { useLocation, Link } from "react-router-dom";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
  SidebarFooter,
} from "@/components/ui/sidebar";
import { LayoutDashboard, Users, FileText, Settings, Building2 } from "lucide-react";

const menuItems = [
  {
    title: "Dashboard",
    url: "/",
    icon: LayoutDashboard,
  },
  {
    title: "Clients",
    url: "/clients",
    icon: Users,
  },
  {
    title: "Reports",
    url: "/reports",
    icon: FileText,
  },
  {
    title: "Settings",
    url: "/settings",
    icon: Settings,
  },
];

export function AppSidebar() {
  const location = useLocation();

  return (
    <Sidebar className="border-r border-[hsl(var(--sidebar-border))] transition-all duration-300 ease-in-out md:bg-[hsl(var(--sidebar-bg))]">
      <SidebarHeader className="border-b border-[hsl(var(--sidebar-border))] p-6">
        <div className="flex items-center gap-2 animate-fade-in">
          <Building2 className="h-8 w-8 text-blue-600 dark:text-blue-400" />
          <span className="text-xl font-bold text-[hsl(var(--sidebar-fg))]">AdminHub</span>
        </div>
      </SidebarHeader>
      
      <SidebarContent className="p-4">
        <SidebarGroup>
          <SidebarGroupLabel className="text-xs font-semibold text-[hsl(var(--sidebar-muted))] uppercase tracking-wider mb-2">
            Navigation
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item, index) => {
                const isActive = location.pathname === item.url;
                return (
                  <SidebarMenuItem key={item.title} className="animate-fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
                    <SidebarMenuButton asChild>
                      <Link
                        to={item.url}
                        className={`group relative flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                          isActive
                            ? "bg-blue-50 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400"
                            : "text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800/60"
                        }`}
                        aria-current={isActive ? "page" : undefined}
                        aria-label={`Navigate to ${item.title}`}
                      >
                        <item.icon 
                          className={`h-4 w-4 transition-colors duration-200 ${
                            isActive 
                              ? "text-blue-600 dark:text-blue-400" 
                              : "text-gray-500 dark:text-gray-400 group-hover:text-gray-600 dark:group-hover:text-gray-300"
                          }`} 
                        />
                        <span>
                          {item.title}
                        </span>
                        {isActive && (
                          <span className="absolute inset-0 rounded-lg ring-1 ring-inset ring-blue-500/20 dark:ring-blue-500/30" />
                        )}
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter className="mt-auto p-4 text-sm text-gray-500 dark:text-gray-400">
        © 2024 AdminHub
      </SidebarFooter>
    </Sidebar>
  );
}
