import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Client } from "@/pages/Clients";

interface AddClientModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (client: Omit<Client, "id">) => void;
}

export function AddClientModal({ isOpen, onClose, onAdd }: AddClientModalProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    status: "Active" as Client["status"],
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.name && formData.email) {
      onAdd({
        ...formData,
        joinDate: new Date().toISOString().split('T')[0],
      });
      setFormData({ name: "", email: "", status: "Active" });
    }
  };

  const handleClose = () => {
    setFormData({ name: "", email: "", status: "Active" });
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-gray-900 dark:text-gray-100">Add New Client</DialogTitle>
          <DialogDescription className="text-gray-600 dark:text-gray-400">
            Create a new client profile. Fill in the details below.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="name" className="text-gray-900 dark:text-gray-100">Name</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Enter client name"
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="email" className="text-gray-900 dark:text-gray-100">Email</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="Enter email address"
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="status" className="text-gray-900 dark:text-gray-100">Status</Label>
              <Select
                value={formData.status}
                onValueChange={(value: Client["status"]) => setFormData({ ...formData, status: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Active">Active</SelectItem>
                  <SelectItem value="Inactive">Inactive</SelectItem>
                  <SelectItem value="Pending">Pending</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={handleClose}>
              Cancel
            </Button>
            <Button type="submit">Add Client</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
