import { useState } from "react";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { EnhancedClientTable } from "@/components/clients/EnhancedClientTable";
import { AddClientModal } from "@/components/clients/AddClientModal";

export interface Client {
  id: number;
  name: string;
  email: string;
  status: "Active" | "Inactive" | "Pending";
  joinDate: string;
}

const mockClients: Client[] = [
  {
    id: 1,
    name: "Acme Corporation",
    email: "contact@acme.com",
    status: "Active",
    joinDate: "2024-01-15",
  },
  {
    id: 2,
    name: "TechStart Inc",
    email: "hello@techstart.com",
    status: "Active",
    joinDate: "2024-02-20",
  },
  {
    id: 3,
    name: "Global Solutions",
    email: "info@globalsolutions.com",
    status: "Pending",
    joinDate: "2024-03-10",
  },
  {
    id: 4,
    name: "Innovation Labs",
    email: "team@innovationlabs.com",
    status: "Inactive",
    joinDate: "2024-01-05",
  },
];

const Clients = () => {
  const [clients, setClients] = useState<Client[]>(mockClients);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const handleAddClient = (newClient: Omit<Client, "id">) => {
    const client: Client = {
      ...newClient,
      id: Math.max(...clients.map(c => c.id)) + 1,
    };
    setClients([...clients, client]);
    setIsAddModalOpen(false);
  };

  const handleDeleteClient = (id: number) => {
    setClients(clients.filter(client => client.id !== id));
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">Clients</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">Manage your client relationships and contacts.</p>
        </div>
        <Button 
          onClick={() => setIsAddModalOpen(true)} 
          className="gap-2 hover:scale-105 transition-transform duration-200"
        >
          <Plus className="h-4 w-4" />
          Add Client
        </Button>
      </div>

      <EnhancedClientTable clients={clients} onDelete={handleDeleteClient} />

      <AddClientModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onAdd={handleAddClient}
      />
    </div>
  );
};

export default Clients;
