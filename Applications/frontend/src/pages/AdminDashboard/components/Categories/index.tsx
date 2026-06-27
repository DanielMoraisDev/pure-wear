import { useState } from "react";
import CategoryRow from "./components/Category";
import CategorySkeleton from "./components/CategorySkeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useCategory } from "@/hooks/admin/use-categories";
import CategoryFormDialog from "./components/CategoryFormDialog";
import { Category } from "@/types/admin/categories.types";

const Categories = () => {
  const { GetAll } = useCategory();
  const { data: response, isLoading } = GetAll({});

  // Estado para controlar o Dialog de Create/Update
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(
    null,
  );

  const handleCreate = () => {
    setSelectedCategory(null);
    setIsFormOpen(true);
  };

  const handleEdit = (category: Category) => {
    setSelectedCategory(category);
    setIsFormOpen(true);
  };

  // O data costuma vir dentro de response.data dependendo da sua API
  const categories = Array.isArray(response?.data) ? response.data : [];

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Categories</h2>
        <Button onClick={handleCreate} className="gap-2">
          <Plus className="h-4 w-4" /> New Category
        </Button>
      </div>

      <Card className="border shadow-sm">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-16">ID</TableHead>
              <TableHead>Title</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              Array.from({ length: 5 }).map((_, i) => (
                <CategorySkeleton key={i} />
              ))
            ) : categories.length > 0 ? (
              categories.map((cat) => (
                <CategoryRow
                  key={cat.id}
                  category={cat}
                  onEdit={() => handleEdit(cat)}
                />
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={4}
                  className="text-center py-10 text-muted-foreground"
                >
                  Anyone category founded.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </Card>

      <CategoryFormDialog
        open={isFormOpen}
        setOpen={setIsFormOpen}
        category={selectedCategory}
      />
    </div>
  );
};

export default Categories;
