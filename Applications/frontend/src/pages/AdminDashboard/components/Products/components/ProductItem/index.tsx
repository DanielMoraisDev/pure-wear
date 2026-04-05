import { TableCell, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Edit, Trash2 } from "lucide-react";
import { ProductAttributes } from "@/types/products.types";

const ProductItem = ({ product }: { product: ProductAttributes }) => {
  const finalPrice = product.discount
    ? product.price - product.discount
    : product.price;

  return (
    <TableRow className="hover:bg-muted/50 transition-colors">
      <TableCell>
        <img
          src={product.images[0].image}
          alt={product.name}
          className="w-12 h-12 object-cover rounded-md border"
        />
      </TableCell>
      <TableCell className="font-medium text-foreground">
        {product.name}
      </TableCell>
      <TableCell>
        <div className="flex flex-col">
          {product.discount && (
            <span className="line-through text-[10px] text-muted-foreground leading-none">
              ${product.price.toFixed(2)}
            </span>
          )}
          <span className="font-bold text-sm text-emerald-600">
            ${finalPrice.toFixed(2)}
          </span>
        </div>
      </TableCell>
      <TableCell className="text-muted-foreground text-sm font-mono">
        {product.sku}
      </TableCell>
      <TableCell className="text-right">
        <div className="flex justify-end gap-1">
          <Button variant="ghost" size="icon" className="h-8 w-8 text-blue-600">
            <Edit className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon" className="h-8 w-8 text-red-500">
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </TableCell>
    </TableRow>
  );
};

export default ProductItem;
