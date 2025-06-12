import { cn } from "@/lib/utils";

interface PageHeaderProps {
  title: string;
  description?: string;
}

export function PageHeader({ title, description }: PageHeaderProps) {
  return (
    <div className="mb-8">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">{title}</h1>
      {description && <p className="text-gray-600 dark:text-gray-400 mt-2">{description}</p>}
    </div>
  );
} 