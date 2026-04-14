import { useState } from "react";
import ProductRow from "./components/Product";
import ProductSkeleton from "./components/ProductSkeleton";
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
import { useProduct } from "@/hooks/admin/use-products";
import ProductFormDialog from "./components/ProductFormDialog";
import { Product } from "@/types/admin/products.types";

const Products = () => {
  const { GetAll } = useProduct();
  const { data: response, isLoading } = GetAll({});

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const handleCreate = () => {
    setSelectedProduct(null);
    setIsFormOpen(true);
  };

  const handleEdit = (product: Product) => {
    setSelectedProduct(product);
    setIsFormOpen(true);
  };

  const products = Array.isArray(response?.data) ? response.data : [];

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Products</h2>
        <Button onClick={handleCreate} className="gap-2">
          <Plus className="h-4 w-4" /> New Product
        </Button>
      </div>

      <Card className="border shadow-sm">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-16">ID</TableHead>
              <TableHead className="w-20">Photo</TableHead>
              <TableHead>Title</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Qty</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              Array.from({ length: 5 }).map((_, i) => (
                <ProductSkeleton key={i} />
              ))
            ) : products.length > 0 ? (
              products.map((product) => (
                <ProductRow
                  key={product.id}
                  product={product}
                  onEdit={() => handleEdit(product)}
                />
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={7}
                  className="text-center py-10 text-muted-foreground"
                >
                  No products found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </Card>

      <ProductFormDialog
        open={isFormOpen}
        setOpen={setIsFormOpen}
        product={selectedProduct}
      />
    </div>
  );
};

export default Products;
