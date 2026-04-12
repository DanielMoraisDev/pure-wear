import { TableCell, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Edit, Trash2 } from "lucide-react";

interface CategoryProps {
  category: {
    id: number;
    title: string;
    status: string;
  };
}

const Category = ({ category }: CategoryProps) => {
  return (
    <TableRow className="hover:bg-muted/50 transition-colors">
      <TableCell className="font-medium text-muted-foreground">
        {category.id}
      </TableCell>
      <TableCell className="font-medium">{category.title}</TableCell>
      <TableCell>
        <span className="text-emerald-600 font-semibold text-sm">
          {category.status}
        </span>
      </TableCell>
      <TableCell className="text-right">
        <div className="flex justify-end gap-1">
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 text-blue-500 hover:text-blue-700"
          >
            <Edit className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 text-red-500 hover:text-red-700"
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </TableCell>
    </TableRow>
  );
};

export default Category;
