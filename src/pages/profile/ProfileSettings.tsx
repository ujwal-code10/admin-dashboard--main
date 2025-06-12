import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { PageHeader } from "@/components/ui/page-header";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { User, Mail, Building2, Globe, Camera, Save, Shield } from "lucide-react";
import { toast } from "sonner";

const ProfileSettings = () => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "John Doe",
    email: "john.doe@example.com",
    company: "AdminHub Inc.",
    website: "https://www.adminhub.com",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API call
    setLoading(false);
    toast.success("Profile updated successfully!");
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.5,
        ease: "easeOut",
      },
    }),
  };

  const iconVariants = {
    hover: {
      rotate: 360,
      transition: { duration: 0.5, ease: "easeInOut" },
    },
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="space-y-6"
    >
      <PageHeader
        title="Profile Settings"
        description="Manage your personal information and preferences."
      />

      <div className="grid gap-6">
        <motion.div
          custom={0}
          initial="hidden"
          animate="visible"
          variants={cardVariants}
        >
          <Card className="transition-all duration-200 hover:shadow-xl">
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <motion.div variants={iconVariants} whileHover="hover">
                  <User className="h-6 w-6 text-blue-600" />
                </motion.div>
                <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">Personal Information</h2>
              </div>

              <div className="flex items-center justify-center mb-8">
                <div className="relative group">
                  <div className="h-24 w-24 rounded-full bg-blue-100 dark:bg-blue-900/50 text-blue-600 dark:text-blue-400 flex items-center justify-center text-2xl font-bold">
                    JD
                  </div>
                  <button className="absolute bottom-0 right-0 h-8 w-8 bg-white dark:bg-gray-800 rounded-full border border-gray-200 dark:border-gray-700 shadow-md flex items-center justify-center text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200">
                    <Camera className="h-4 w-4" />
                  </button>
                </div>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid gap-2">
                  <Label htmlFor="name">Full Name</Label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500" />
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="pl-10"
                    />
                  </div>
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="email">Email Address</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500" />
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="pl-10"
                    />
                  </div>
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="company">Company</Label>
                  <div className="relative">
                    <Building2 className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500" />
                    <Input
                      id="company"
                      value={formData.company}
                      onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                      className="pl-10"
                    />
                  </div>
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="website">Website</Label>
                  <div className="relative">
                    <Globe className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500" />
                    <Input
                      id="website"
                      value={formData.website}
                      onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                      className="pl-10"
                    />
                  </div>
                </div>

                <Button
                  type="submit"
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white transition-all duration-200 hover:scale-105"
                  disabled={loading}
                >
                  {loading ? (
                    <LoadingSpinner className="mr-2" />
                  ) : (
                    <Save className="mr-2 h-4 w-4" />
                  )}
                  Save Changes
                </Button>
              </form>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          custom={1}
          initial="hidden"
          animate="visible"
          variants={cardVariants}
        >
          <Card className="transition-all duration-200 hover:shadow-xl">
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <motion.div variants={iconVariants} whileHover="hover">
                  <Shield className="h-6 w-6 text-blue-600" />
                </motion.div>
                <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">Account Activity</h2>
              </div>

              <div className="space-y-4">
                {[
                  { action: "Profile updated", date: "2 hours ago" },
                  { action: "Password changed", date: "2 days ago" },
                  { action: "Login from new device", date: "5 days ago" },
                ].map((activity, i) => (
                  <motion.div
                    key={activity.action}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 + i * 0.1 }}
                    className="flex items-center justify-between p-3 rounded-lg bg-gray-50 dark:bg-gray-800/50 hover:bg-gray-100 dark:hover:bg-gray-700/50 transition-colors duration-200"
                  >
                    <div className="font-medium text-gray-900 dark:text-gray-100">{activity.action}</div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">{activity.date}</div>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default ProfileSettings; 