import { TableCell, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Edit, Trash2 } from "lucide-react";
import { Category } from "@/types/admin/categories.types";
import { useCategory } from "@/hooks/admin/use-categories";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

interface CategoryProps {
  category: Category;
  onEdit: () => void;
}

const CategoryRow = ({ category, onEdit }: CategoryProps) => {
  const { Delete } = useCategory();
  const { mutate: deleteCategory, isPending } = Delete();

  return (
    <TableRow className="hover:bg-muted/50 transition-colors">
      <TableCell className="font-medium text-muted-foreground">
        {category.id}
      </TableCell>
      <TableCell className="font-medium">{category.name}</TableCell>
      <TableCell>
        <span
          className={`text-sm font-semibold ${category.status === 1 ? "text-emerald-600" : "text-red-500"}`}
        >
          {category.status === 1 ? "Active" : "Inactive"}
        </span>
      </TableCell>
      <TableCell className="text-right">
        <div className="flex justify-end gap-1">
          <Button
            variant="ghost"
            size="icon"
            onClick={onEdit}
            className="h-8 w-8 text-blue-500 hover:text-blue-700"
          >
            <Edit className="h-4 w-4" />
          </Button>

          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 text-red-500 hover:text-red-700"
                disabled={isPending}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone. This will permanently delete the
                  category. <strong>{category.name}</strong>.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction
                  onClick={() =>
                    deleteCategory({ categoryId: String(category.id) })
                  }
                  className="bg-red-600 hover:bg-red-700"
                >
                  Delete
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </TableCell>
    </TableRow>
  );
};

export default CategoryRow;
