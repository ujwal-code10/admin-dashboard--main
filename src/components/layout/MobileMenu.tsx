import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Menu, User, CreditCard, Users2, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export function MobileMenu() {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const handleNavigation = (path: string) => {
    setOpen(false);
    navigate(path);
  };

  const menuItems = [
    {
      label: "Billing",
      icon: CreditCard,
      path: "/billing",
    },
    {
      label: "Team",
      icon: Users2,
      path: "/team",
    },
    {
      label: "Profile",
      icon: User,
      path: "/settings/profile",
    },
  ];

  return (
    <div className="block lg:hidden">
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            className="relative hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-200"
            aria-label="Open mobile menu"
          >
            <Menu className="h-4 w-4 sm:h-5 sm:w-5 text-gray-600 dark:text-gray-400" />
          </Button>
        </SheetTrigger>
        <SheetContent side="right" className="w-full xs:w-[300px] sm:w-[350px] p-0">
          <SheetHeader className="p-4 sm:p-6 border-b border-gray-200 dark:border-gray-800">
            <div className="flex items-center gap-3">
              <Avatar className="h-8 w-8 sm:h-10 sm:w-10">
                <AvatarImage src="/placeholder.svg" alt="User avatar" />
                <AvatarFallback className="bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300">JD</AvatarFallback>
              </Avatar>
              <div>
                <SheetTitle className="text-left text-base sm:text-lg">John Doe</SheetTitle>
                <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">Administrator</p>
              </div>
            </div>
          </SheetHeader>
          <nav className="p-2 sm:p-4">
            <div className="space-y-1">
              {menuItems.map((item) => (
                <Button
                  key={item.path}
                  variant="ghost"
                  className="w-full justify-start gap-3 text-sm sm:text-base h-10 sm:h-12 mb-1 hover:bg-gray-100 dark:hover:bg-gray-800"
                  onClick={() => handleNavigation(item.path)}
                >
                  <item.icon className="h-4 w-4 sm:h-5 sm:w-5" />
                  {item.label}
                </Button>
              ))}
              <Button
                variant="ghost"
                className="w-full justify-start gap-3 text-sm sm:text-base h-10 sm:h-12 text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300 hover:bg-red-50 dark:hover:bg-red-900/20"
                onClick={() => handleNavigation("/login")}
              >
                <LogOut className="h-4 w-4 sm:h-5 sm:w-5" />
                Log out
              </Button>
            </div>
          </nav>
        </SheetContent>
      </Sheet>
    </div>
  );
} 