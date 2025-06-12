import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

const activities = [
  {
    id: 1,
    user: "Sarah Johnson",
    action: "added a new client",
    target: "Acme Corp",
    time: "2 hours ago",
    initials: "SJ",
  },
  {
    id: 2,
    user: "Mike Chen",
    action: "generated report",
    target: "Monthly Sales",
    time: "4 hours ago",
    initials: "MC",
  },
  {
    id: 3,
    user: "Emily Davis",
    action: "updated client status",
    target: "TechStart Inc",
    time: "6 hours ago",
    initials: "ED",
  },
  {
    id: 4,
    user: "John Doe",
    action: "created new project",
    target: "Website Redesign",
    time: "1 day ago",
    initials: "JD",
  },
];

export function RecentActivity() {
  return (
    <Card className="h-full">
      <CardHeader className="p-4 sm:p-6">
        <CardTitle className="text-base sm:text-lg font-semibold text-gray-900 dark:text-gray-100">
          Recent Activity
        </CardTitle>
      </CardHeader>
      <CardContent className="p-4 sm:p-6 pt-0">
        <div className="space-y-3 sm:space-y-4">
          {activities.map((activity) => (
            <div key={activity.id} className="flex items-start sm:items-center gap-2 sm:gap-3">
              <Avatar className="h-6 w-6 sm:h-8 sm:w-8">
                <AvatarFallback className="bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 text-[10px] sm:text-xs">
                  {activity.initials}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <p className="text-xs sm:text-sm text-gray-900 dark:text-gray-100 leading-tight sm:leading-normal">
                  <span className="font-medium">{activity.user}</span>{" "}
                  <span className="text-gray-600 dark:text-gray-400">{activity.action}</span>{" "}
                  <span className="font-medium">{activity.target}</span>
                </p>
                <p className="text-[10px] sm:text-xs text-gray-500 dark:text-gray-400 mt-0.5 sm:mt-1">
                  {activity.time}
                </p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
