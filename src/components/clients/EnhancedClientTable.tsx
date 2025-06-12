import { useState } from "react";
import { Edit, Trash2, MoreHorizontal, ArrowUpDown, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Client } from "@/pages/Clients";

interface EnhancedClientTableProps {
  clients: Client[];
  onDelete: (id: number) => void;
}

type SortField = "name" | "email" | "status" | "joinDate";
type SortDirection = "asc" | "desc";

export function EnhancedClientTable({ clients, onDelete }: EnhancedClientTableProps) {
  const [sortField, setSortField] = useState<SortField>("name");
  const [sortDirection, setSortDirection] = useState<SortDirection>("asc");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [searchTerm, setSearchTerm] = useState("");

  const handleSort = (field: SortField) => {
    if (field === sortField) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
  };

  const filteredAndSortedClients = clients
    .filter((client) => {
      const matchesSearch = client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          client.email.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus = statusFilter === "all" || client.status === statusFilter;
      return matchesSearch && matchesStatus;
    })
    .sort((a, b) => {
      let aValue: string | Date;
      let bValue: string | Date;

      switch (sortField) {
        case "joinDate":
          aValue = new Date(a.joinDate);
          bValue = new Date(b.joinDate);
          break;
        default:
          aValue = a[sortField];
          bValue = b[sortField];
      }

      if (aValue < bValue) return sortDirection === "asc" ? -1 : 1;
      if (aValue > bValue) return sortDirection === "asc" ? 1 : -1;
      return 0;
    });

  const getStatusVariant = (status: Client["status"]) => {
    switch (status) {
      case "Active":
        return "default";
      case "Inactive":
        return "secondary";
      case "Pending":
        return "outline";
      default:
        return "secondary";
    }
  };

  const getStatusColor = (status: Client["status"]) => {
    switch (status) {
      case "Active":
        return "bg-green-100 text-green-800 hover:bg-green-100";
      case "Inactive":
        return "bg-gray-100 text-gray-800 hover:bg-gray-100";
      case "Pending":
        return "bg-yellow-100 text-yellow-800 hover:bg-yellow-100";
      default:
        return "bg-gray-100 text-gray-800 hover:bg-gray-100";
    }
  };

  return (
    <Card className="animate-fade-in">
      <div className="p-4 border-b border-gray-200">
        <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
          <div className="flex-1 max-w-sm">
            <Input
              placeholder="Search clients..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full"
              aria-label="Search clients"
            />
          </div>
          <div className="flex gap-2 items-center">
            <Filter className="h-4 w-4 text-gray-500" aria-hidden="true" />
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-32" aria-label="Filter by status">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="Active">Active</SelectItem>
                <SelectItem value="Inactive">Inactive</SelectItem>
                <SelectItem value="Pending">Pending</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>
              <Button
                variant="ghost"
                onClick={() => handleSort("name")}
                className="h-auto p-0 font-medium hover:bg-transparent"
                aria-label="Sort by name"
              >
                Name
                <ArrowUpDown className="ml-2 h-4 w-4" />
              </Button>
            </TableHead>
            <TableHead>
              <Button
                variant="ghost"
                onClick={() => handleSort("email")}
                className="h-auto p-0 font-medium hover:bg-transparent"
                aria-label="Sort by email"
              >
                Email
                <ArrowUpDown className="ml-2 h-4 w-4" />
              </Button>
            </TableHead>
            <TableHead>
              <Button
                variant="ghost"
                onClick={() => handleSort("status")}
                className="h-auto p-0 font-medium hover:bg-transparent"
                aria-label="Sort by status"
              >
                Status
                <ArrowUpDown className="ml-2 h-4 w-4" />
              </Button>
            </TableHead>
            <TableHead>
              <Button
                variant="ghost"
                onClick={() => handleSort("joinDate")}
                className="h-auto p-0 font-medium hover:bg-transparent"
                aria-label="Sort by join date"
              >
                Join Date
                <ArrowUpDown className="ml-2 h-4 w-4" />
              </Button>
            </TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredAndSortedClients.map((client, index) => (
            <TableRow 
              key={client.id} 
              className="hover:bg-gray-50 transition-colors duration-200 animate-fade-in"
              style={{ animationDelay: `${index * 0.05}s` }}
            >
              <TableCell className="font-medium text-gray-900 dark:text-gray-100">{client.name}</TableCell>
              <TableCell className="text-gray-600 dark:text-gray-400">{client.email}</TableCell>
              <TableCell>
                <Badge className={getStatusColor(client.status)}>
                  {client.status}
                </Badge>
              </TableCell>
              <TableCell className="text-gray-600 dark:text-gray-400">
                {new Date(client.joinDate).toLocaleDateString()}
              </TableCell>
              <TableCell className="text-right">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" aria-label={`Actions for ${client.name}`}>
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem className="gap-2">
                      <Edit className="h-4 w-4" />
                      Edit
                    </DropdownMenuItem>
                    <DropdownMenuItem 
                      className="gap-2 text-red-600 focus:text-red-600"
                      onClick={() => onDelete(client.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                      Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      
      {filteredAndSortedClients.length === 0 && (
        <div className="p-8 text-center text-gray-500">
          No clients found matching your criteria.
        </div>
      )}
    </Card>
  );
}
