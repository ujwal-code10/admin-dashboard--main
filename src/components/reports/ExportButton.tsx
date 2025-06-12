
import { useState } from "react";
import { Download, FileText, File } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { toast } from "sonner";

interface ExportButtonProps {
  data: any[];
  filename?: string;
}

export function ExportButton({ data, filename = "report" }: ExportButtonProps) {
  const [isExporting, setIsExporting] = useState(false);

  const exportToCSV = () => {
    setIsExporting(true);
    
    // Simulate export delay
    setTimeout(() => {
      const headers = Object.keys(data[0] || {});
      const csvContent = [
        headers.join(","),
        ...data.map(row => headers.map(header => `"${row[header] || ''}"`).join(","))
      ].join("\n");
      
      const blob = new Blob([csvContent], { type: "text/csv" });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `${filename}.csv`;
      a.click();
      window.URL.revokeObjectURL(url);
      
      toast.success("CSV exported successfully!");
      setIsExporting(false);
    }, 1000);
  };

  const exportToPDF = () => {
    setIsExporting(true);
    
    // Simulate PDF export
    setTimeout(() => {
      toast.success("PDF export feature coming soon!");
      setIsExporting(false);
    }, 1000);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button 
          variant="outline" 
          className="gap-2"
          disabled={isExporting}
          aria-label="Export options"
        >
          <Download className="h-4 w-4" />
          {isExporting ? "Exporting..." : "Export"}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={exportToCSV} className="gap-2">
          <FileText className="h-4 w-4" />
          Export as CSV
        </DropdownMenuItem>
        <DropdownMenuItem onClick={exportToPDF} className="gap-2">
          <File className="h-4 w-4" />
          Export as PDF
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
