import { useEffect, useState } from "react";
import { products } from "@/dataMockProducts";
import ProductItem from "./components/ProductItem";
import { Card } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import ProductItemSkeleton from "./components/ProductItemSkeleton";

const Products = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const randomDelay = Math.floor(Math.random() * (2000 - 1000 + 1)) + 1000;
    const timer = setTimeout(() => setIsLoading(false), randomDelay);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center w-full">
        <h1 className="text-2xl font-bold tracking-tight">Products</h1>
        <Button className="bg-[#4ebccb] hover:bg-[#3daab8] text-white">
          Create
        </Button>
      </div>

      <Card className="border shadow-sm">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[80px]">Image</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>SKU</TableHead>
              <TableHead className="text-right">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading
              ? Array.from({ length: 5 }).map((_, i) => (
                  <ProductItemSkeleton key={i} />
                ))
              : products.map((product) => (
                  <ProductItem key={product.id} product={product} />
                ))}
          </TableBody>
        </Table>
      </Card>
    </div>
  );
};

export default Products;
