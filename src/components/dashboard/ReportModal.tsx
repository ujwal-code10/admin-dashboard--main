import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";

interface ReportModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function ReportModal({ open, onOpenChange }: ReportModalProps) {
  const [formData, setFormData] = useState({
    type: "monthly",
    dateRange: "last-30",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Generating report:", formData);
    toast.success("Report generated successfully!");
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-gray-900 dark:text-gray-100">Generate Report</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid gap-2">
            <Label htmlFor="type" className="text-gray-900 dark:text-gray-100">Report Type</Label>
            <Select
              value={formData.type}
              onValueChange={(value) => setFormData({ ...formData, type: value })}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select report type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="monthly">Monthly Overview</SelectItem>
                <SelectItem value="financial">Financial Report</SelectItem>
                <SelectItem value="clients">Client Activity</SelectItem>
                <SelectItem value="performance">Performance Metrics</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="dateRange" className="text-gray-900 dark:text-gray-100">Date Range</Label>
            <Select
              value={formData.dateRange}
              onValueChange={(value) => setFormData({ ...formData, dateRange: value })}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select date range" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="last-7">Last 7 Days</SelectItem>
                <SelectItem value="last-30">Last 30 Days</SelectItem>
                <SelectItem value="last-90">Last 90 Days</SelectItem>
                <SelectItem value="year-to-date">Year to Date</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <DialogFooter>
            <Button type="submit">Generate Report</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
} 