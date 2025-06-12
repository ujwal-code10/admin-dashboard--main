import { useNavigate } from "react-router-dom";
import { Bell, Search, ChevronDown, Sun, Moon } from "lucide-react";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { useEffect, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useTheme } from "next-themes";
import { MobileMenu } from "./MobileMenu";

export function TopNavbar() {
  const navigate = useNavigate();
  const notificationCount = 3; // This will be dynamic with real backend
  const dropdownRef = useRef<HTMLDivElement>(null);
  const { theme, setTheme } = useTheme();

  // Close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        const trigger = document.querySelector('[data-state="open"]');
        if (trigger) {
          (trigger as HTMLButtonElement).click();
        }
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Close dropdown on ESC key
  useEffect(() => {
    function handleEscKey(event: KeyboardEvent) {
      if (event.key === "Escape") {
        const trigger = document.querySelector('[data-state="open"]');
        if (trigger) {
          (trigger as HTMLButtonElement).click();
        }
      }
    }

    document.addEventListener("keydown", handleEscKey);
    return () => document.removeEventListener("keydown", handleEscKey);
  }, []);

  const handleLogout = () => {
    // Simulate logout - in real app, clear auth tokens, etc.
    console.log("Logging out...");
    navigate("/login");
  };

  return (
    <header className="border-b border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 px-6 py-4 animate-fade-in">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <SidebarTrigger 
            className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 transition-colors duration-200" 
            aria-label="Toggle sidebar"
          />
          <div className="relative hidden sm:block">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500 h-4 w-4" aria-hidden="true" />
            <Input
              placeholder="Search..."
              className="pl-10 w-[200px] md:w-[300px] lg:w-[400px] bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-700 focus:bg-white dark:focus:bg-gray-900 transition-colors duration-200"
              aria-label="Search"
            />
          </div>
        </div>

        <div className="flex items-center gap-2 sm:gap-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="relative hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-200"
            aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
          >
            {theme === "dark" ? (
              <Sun className="h-4 w-4 sm:h-5 sm:w-5 text-gray-600 dark:text-gray-400" />
            ) : (
              <Moon className="h-4 w-4 sm:h-5 sm:w-5 text-gray-600 dark:text-gray-400" />
            )}
          </Button>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button 
                variant="ghost" 
                size="icon" 
                className="relative hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-200"
                aria-label={`Notifications (${notificationCount} unread)`}
              >
                <Bell className="h-4 w-4 sm:h-5 sm:w-5 text-gray-600 dark:text-gray-400" />
                {notificationCount > 0 && (
                  <Badge 
                    className="absolute -top-1 -right-1 h-4 w-4 sm:h-5 sm:w-5 rounded-full bg-red-500 dark:bg-red-600 text-white text-xs flex items-center justify-center p-0 animate-pulse"
                    aria-hidden="true"
                  >
                    {notificationCount}
                  </Badge>
                )}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-[280px] sm:w-[320px] lg:w-[380px]">
              <DropdownMenuLabel>Notifications</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="flex flex-col items-start gap-1 p-3">
                <div className="font-medium dark:text-gray-100">New client added</div>
                <div className="text-sm text-gray-500 dark:text-gray-400">Acme Corp joined 2 hours ago</div>
              </DropdownMenuItem>
              <DropdownMenuItem className="flex flex-col items-start gap-1 p-3">
                <div className="font-medium dark:text-gray-100">Report generated</div>
                <div className="text-sm text-gray-500 dark:text-gray-400">Monthly report is ready for review</div>
              </DropdownMenuItem>
              <DropdownMenuItem className="flex flex-col items-start gap-1 p-3">
                <div className="font-medium dark:text-gray-100">Client status updated</div>
                <div className="text-sm text-gray-500 dark:text-gray-400">TechStart Inc is now active</div>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="text-center text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300">
                View all notifications
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <div ref={dropdownRef} className="hidden lg:block">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button 
                  variant="ghost" 
                  className="flex items-center gap-2 px-2 sm:px-3 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-200"
                  aria-label="User menu"
                >
                  <Avatar className="h-7 w-7 sm:h-8 sm:w-8">
                    <AvatarImage src="/placeholder.svg" alt="User avatar" />
                    <AvatarFallback className="bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300">JD</AvatarFallback>
                  </Avatar>
                  <div className="text-left">
                    <div className="text-sm font-medium text-gray-900 dark:text-gray-100">John Doe</div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">Administrator</div>
                  </div>
                  <ChevronDown className="h-4 w-4 text-gray-500 dark:text-gray-400" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56" asChild>
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                >
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => navigate("/settings/profile")}>
                    Profile
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => navigate("/billing")}>
                    Billing
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => navigate("/team")}>
                    Team
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem 
                    onClick={handleLogout}
                    className="text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300 hover:bg-red-50 dark:hover:bg-red-900/20"
                  >
                    Log out
                  </DropdownMenuItem>
                </motion.div>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          <div className="block lg:hidden">
            <MobileMenu />
          </div>
        </div>
      </div>
    </header>
  );
}
