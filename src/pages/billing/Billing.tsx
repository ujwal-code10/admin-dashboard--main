import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { PageHeader } from "@/components/ui/page-header";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { CreditCard, Receipt, History, Plus, Download } from "lucide-react";
import { toast } from "sonner";

const Billing = () => {
  const [loadingStates, setLoadingStates] = useState({
    addPayment: false,
    upgradePlan: false,
    downloadHistory: false,
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

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="space-y-6"
    >
      <PageHeader
        title="Billing"
        description="Manage your subscription, payment methods, and billing history."
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
                  <CreditCard className="h-6 w-6 text-blue-600" />
                </motion.div>
                <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">Payment Methods</h2>
              </div>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                Add or update your payment methods to manage your subscription seamlessly.
              </p>
              <Button
                onClick={() => handleAction("addPayment", "Payment method added successfully")}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white transition-all duration-200 hover:scale-105"
                disabled={loadingStates.addPayment}
              >
                {loadingStates.addPayment ? (
                  <LoadingSpinner className="mr-2" />
                ) : (
                  <Plus className="mr-2 h-4 w-4" />
                )}
                Add Payment Method
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
                  <Receipt className="h-6 w-6 text-blue-600" />
                </motion.div>
                <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">Current Plan</h2>
              </div>
              <div className="mb-6">
                <div className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-2">Pro Plan</div>
                <p className="text-gray-600 dark:text-gray-400">$49/month</p>
                <ul className="mt-4 space-y-2 text-gray-600 dark:text-gray-400">
                  <li>✓ Unlimited projects</li>
                  <li>✓ Priority support</li>
                  <li>✓ Advanced analytics</li>
                </ul>
              </div>
              <Button
                onClick={() => handleAction("upgradePlan", "Plan upgraded successfully")}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white transition-all duration-200 hover:scale-105"
                disabled={loadingStates.upgradePlan}
              >
                {loadingStates.upgradePlan ? (
                  <LoadingSpinner className="mr-2" />
                ) : (
                  "Upgrade Plan"
                )}
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
                  <History className="h-6 w-6 text-blue-600" />
                </motion.div>
                <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">Billing History</h2>
              </div>
              <div className="space-y-4 mb-6">
                {[
                  { date: "Mar 1, 2024", amount: "$49.00", status: "Paid" },
                  { date: "Feb 1, 2024", amount: "$49.00", status: "Paid" },
                  { date: "Jan 1, 2024", amount: "$49.00", status: "Paid" },
                ].map((invoice, i) => (
                  <motion.div
                    key={invoice.date}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 + i * 0.1 }}
                    className="flex items-center justify-between p-4 rounded-lg bg-gray-50 dark:bg-gray-800/50"
                  >
                    <div>
                      <div className="font-medium text-gray-900 dark:text-gray-100">{invoice.date}</div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">{invoice.amount}</div>
                    </div>
                    <span className="px-3 py-1 text-sm font-medium text-green-700 dark:text-green-400 bg-green-100 dark:bg-green-900/50 rounded-full">
                      {invoice.status}
                    </span>
                  </motion.div>
                ))}
              </div>
              <Button
                onClick={() => handleAction("downloadHistory", "Invoice history downloaded")}
                variant="outline"
                className="w-full border-blue-200 text-blue-600 hover:bg-blue-50 transition-all duration-200 hover:scale-105"
                disabled={loadingStates.downloadHistory}
              >
                {loadingStates.downloadHistory ? (
                  <LoadingSpinner className="mr-2" />
                ) : (
                  <Download className="mr-2 h-4 w-4" />
                )}
                Download History
              </Button>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Billing; 