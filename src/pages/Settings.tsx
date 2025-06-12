import { useState, useEffect } from "react";
import { Save, User, Shield, Bell, Palette } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";
import { useTheme } from "next-themes";

const Settings = () => {
  // Profile form state
  const [profileForm, setProfileForm] = useState({
    name: "John Doe",
    email: "john.doe@example.com",
    company: "AdminHub Inc.",
  });

  // Password form state
  const [passwordForm, setPasswordForm] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  // Notification preferences state
  const [notifications, setNotifications] = useState({
    email: true,
    desktop: true,
    weekly: true,
    marketing: false,
  });

  // Theme management
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Wait until mounted to avoid hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  // Handle profile form submission
  const handleProfileSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Saving profile:", profileForm);
    toast.success("Profile updated successfully!");
  };

  // Handle password update
  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      toast.error("New passwords do not match!");
      return;
    }
    if (passwordForm.newPassword.length < 8) {
      toast.error("Password must be at least 8 characters long!");
      return;
    }
    console.log("Updating password...");
    toast.success("Password updated successfully!");
    setPasswordForm({ currentPassword: "", newPassword: "", confirmPassword: "" });
  };

  // Handle notification preference changes
  const handleNotificationChange = (key: keyof typeof notifications) => {
    setNotifications(prev => {
      const newState = { ...prev, [key]: !prev[key] };
      console.log("Notification preferences:", newState);
      toast.success("Notification preferences saved!");
      return newState;
    });
  };

  // Handle dark mode toggle
  const handleDarkModeToggle = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  if (!mounted) {
    return null;
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">Settings</h1>
        <p className="text-gray-600 dark:text-gray-400 mt-2">Manage your account settings and preferences.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-gray-900 dark:text-gray-100">
              <User className="h-5 w-5" />
              Profile Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <form onSubmit={handleProfileSubmit} className="space-y-4">
              <div className="grid gap-2">
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  value={profileForm.name}
                  onChange={(e) => setProfileForm({ ...profileForm, name: e.target.value })}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="email">Email Address</Label>
                <Input
                  id="email"
                  type="email"
                  value={profileForm.email}
                  onChange={(e) => setProfileForm({ ...profileForm, email: e.target.value })}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="company">Company</Label>
                <Input
                  id="company"
                  value={profileForm.company}
                  onChange={(e) => setProfileForm({ ...profileForm, company: e.target.value })}
                />
              </div>
              <Button type="submit" className="w-full gap-2">
                <Save className="h-4 w-4" />
                Save Changes
              </Button>
            </form>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-gray-900 dark:text-gray-100">
              <Shield className="h-5 w-5" />
              Security Settings
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <form onSubmit={handlePasswordSubmit} className="space-y-4">
              <div className="grid gap-2">
                <Label htmlFor="current-password">Current Password</Label>
                <Input
                  id="current-password"
                  type="password"
                  value={passwordForm.currentPassword}
                  onChange={(e) => setPasswordForm({ ...passwordForm, currentPassword: e.target.value })}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="new-password">New Password</Label>
                <Input
                  id="new-password"
                  type="password"
                  value={passwordForm.newPassword}
                  onChange={(e) => setPasswordForm({ ...passwordForm, newPassword: e.target.value })}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="confirm-password">Confirm Password</Label>
                <Input
                  id="confirm-password"
                  type="password"
                  value={passwordForm.confirmPassword}
                  onChange={(e) => setPasswordForm({ ...passwordForm, confirmPassword: e.target.value })}
                />
              </div>
              <Button type="submit" variant="outline" className="w-full gap-2">
                <Shield className="h-4 w-4" />
                Update Password
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-gray-900 dark:text-gray-100">
            <Bell className="h-5 w-5" />
            Notification Preferences
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-medium text-gray-900 dark:text-gray-100">Email Notifications</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">Receive notifications via email</p>
            </div>
            <Switch
              checked={notifications.email}
              onCheckedChange={() => handleNotificationChange("email")}
            />
          </div>
          <Separator />
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-medium text-gray-900 dark:text-gray-100">Desktop Notifications</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">Show desktop notifications</p>
            </div>
            <Switch
              checked={notifications.desktop}
              onCheckedChange={() => handleNotificationChange("desktop")}
            />
          </div>
          <Separator />
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-medium text-gray-900 dark:text-gray-100">Weekly Reports</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">Receive weekly summary reports</p>
            </div>
            <Switch
              checked={notifications.weekly}
              onCheckedChange={() => handleNotificationChange("weekly")}
            />
          </div>
          <Separator />
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-medium text-gray-900 dark:text-gray-100">Marketing Updates</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">Receive product updates and tips</p>
            </div>
            <Switch
              checked={notifications.marketing}
              onCheckedChange={() => handleNotificationChange("marketing")}
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-gray-900 dark:text-gray-100">
            <Palette className="h-5 w-5" />
            Appearance
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-medium text-gray-900 dark:text-gray-100">Dark Mode</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">Toggle dark mode interface</p>
            </div>
            <Switch
              checked={theme === 'dark'}
              onCheckedChange={handleDarkModeToggle}
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Settings;
