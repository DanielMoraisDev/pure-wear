import { useState } from "react";
import BrandRow from "./components/Brand";
import BrandSkeleton from "./components/BrandSkeleton";
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
import { useBrand } from "@/hooks/admin/use-brands";
import BrandFormDialog from "./components/BrandFormDialog";
import { Brand } from "@/types/admin/brands.types";

const Brands = () => {
  const { GetAll } = useBrand();
  const { data: response, isLoading } = GetAll({});

  // Estado para controlar o Dialog de Create/Update
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [selectedBrand, setSelectedBrand] = useState<Brand | null>(null);

  const handleCreate = () => {
    setSelectedBrand(null);
    setIsFormOpen(true);
  };

  const handleEdit = (brand: Brand) => {
    setSelectedBrand(brand);
    setIsFormOpen(true);
  };

  // O data costuma vir dentro de response.data dependendo da sua API
  const brands = Array.isArray(response?.data) ? response.data : [];

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Brands</h2>
        <Button onClick={handleCreate} className="gap-2">
          <Plus className="h-4 w-4" /> New Brand
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
              Array.from({ length: 5 }).map((_, i) => <BrandSkeleton key={i} />)
            ) : brands.length > 0 ? (
              brands.map((cat) => (
                <BrandRow
                  key={cat.id}
                  brand={cat}
                  onEdit={() => handleEdit(cat)}
                />
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={4}
                  className="text-center py-10 text-muted-foreground"
                >
                  Anyone brand founded.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </Card>

      <BrandFormDialog
        open={isFormOpen}
        setOpen={setIsFormOpen}
        brand={selectedBrand}
      />
    </div>
  );
};

export default Brands;
