import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { PageHeader } from "@/components/ui/page-header";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { Users, Shield, Settings, UserPlus, Key, Cog } from "lucide-react";
import { toast } from "sonner";

const Team = () => {
  const [loadingStates, setLoadingStates] = useState({
    inviteMembers: false,
    updateRoles: false,
    saveSettings: false,
  });

  const handleAction = async (action: keyof typeof loadingStates, message: string) => {
    setLoadingStates(prev => ({ ...prev, [action]: true }));
    await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API call
    setLoadingStates(prev => ({ ...prev, [action]: false }));
    toast.success(message);
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

  const teamMembers = [
    { name: "John Doe", role: "Admin", avatar: "JD" },
    { name: "Sarah Smith", role: "Editor", avatar: "SS" },
    { name: "Mike Johnson", role: "Viewer", avatar: "MJ" },
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="space-y-6"
    >
      <PageHeader
        title="Team Management"
        description="Manage your team members, roles, and permissions."
      />

      <div className="grid gap-6 md:grid-cols-2">
        <motion.div
          custom={0}
          initial="hidden"
          animate="visible"
          variants={cardVariants}
        >
          <Card className="h-full transition-all duration-200 hover:shadow-xl">
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <motion.div variants={iconVariants} whileHover="hover">
                  <Users className="h-6 w-6 text-blue-600" />
                </motion.div>
                <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">Team Members</h2>
              </div>
              <div className="space-y-4 mb-6">
                {teamMembers.map((member, i) => (
                  <motion.div
                    key={member.name}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 + i * 0.1 }}
                    className="flex items-center justify-between p-3 rounded-lg bg-gray-50 dark:bg-gray-800/50 hover:bg-gray-100 dark:hover:bg-gray-700/50 transition-colors duration-200"
                  >
                    <div className="flex items-center gap-3">
                      <div className="h-8 w-8 rounded-full bg-blue-100 dark:bg-blue-900/50 text-blue-600 dark:text-blue-400 flex items-center justify-center font-medium">
                        {member.avatar}
                      </div>
                      <div>
                        <div className="font-medium text-gray-900 dark:text-gray-100">{member.name}</div>
                        <div className="text-sm text-gray-600 dark:text-gray-400">{member.role}</div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
              <Button
                onClick={() => handleAction("inviteMembers", "Team invitation sent successfully")}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white transition-all duration-200 hover:scale-105"
                disabled={loadingStates.inviteMembers}
              >
                {loadingStates.inviteMembers ? (
                  <LoadingSpinner className="mr-2" />
                ) : (
                  <UserPlus className="mr-2 h-4 w-4" />
                )}
                Invite Team Members
              </Button>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          custom={1}
          initial="hidden"
          animate="visible"
          variants={cardVariants}
        >
          <Card className="h-full transition-all duration-200 hover:shadow-xl">
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <motion.div variants={iconVariants} whileHover="hover">
                  <Shield className="h-6 w-6 text-blue-600" />
                </motion.div>
                <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">Roles & Permissions</h2>
              </div>
              <div className="space-y-4 mb-6">
                {[
                  { role: "Admin", permissions: "Full access to all features" },
                  { role: "Editor", permissions: "Can edit and publish content" },
                  { role: "Viewer", permissions: "View-only access" },
                ].map((role, i) => (
                  <motion.div
                    key={role.role}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 + i * 0.1 }}
                    className="p-3 rounded-lg bg-gray-50 dark:bg-gray-800/50 hover:bg-gray-100 dark:hover:bg-gray-700/50 transition-colors duration-200"
                  >
                    <div className="font-medium text-gray-900 dark:text-gray-100">{role.role}</div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">{role.permissions}</div>
                  </motion.div>
                ))}
              </div>
              <Button
                onClick={() => handleAction("updateRoles", "Roles updated successfully")}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white transition-all duration-200 hover:scale-105"
                disabled={loadingStates.updateRoles}
              >
                {loadingStates.updateRoles ? (
                  <LoadingSpinner className="mr-2" />
                ) : (
                  <Key className="mr-2 h-4 w-4" />
                )}
                Update Roles
              </Button>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          custom={2}
          initial="hidden"
          animate="visible"
          variants={cardVariants}
          className="md:col-span-2"
        >
          <Card className="transition-all duration-200 hover:shadow-xl">
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <motion.div variants={iconVariants} whileHover="hover">
                  <Settings className="h-6 w-6 text-blue-600" />
                </motion.div>
                <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">Team Settings</h2>
              </div>
              <div className="grid md:grid-cols-2 gap-4 mb-6">
                {[
                  { title: "Team Name", value: "AdminHub Team" },
                  { title: "Team Size", value: "5 members" },
                  { title: "Created", value: "Jan 1, 2024" },
                  { title: "Storage", value: "45% used" },
                ].map((setting, i) => (
                  <motion.div
                    key={setting.title}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 + i * 0.1 }}
                    className="p-3 rounded-lg bg-gray-50 dark:bg-gray-800/50"
                  >
                    <div className="text-sm text-gray-600 dark:text-gray-400">{setting.title}</div>
                    <div className="font-medium text-gray-900 dark:text-gray-100">{setting.value}</div>
                  </motion.div>
                ))}
              </div>
              <Button
                onClick={() => handleAction("saveSettings", "Team settings saved successfully")}
                variant="outline"
                className="w-full border-blue-200 text-blue-600 hover:bg-blue-50 transition-all duration-200 hover:scale-105"
                disabled={loadingStates.saveSettings}
              >
                {loadingStates.saveSettings ? (
                  <LoadingSpinner className="mr-2" />
                ) : (
                  <Cog className="mr-2 h-4 w-4" />
                )}
                Save Settings
              </Button>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Team; 