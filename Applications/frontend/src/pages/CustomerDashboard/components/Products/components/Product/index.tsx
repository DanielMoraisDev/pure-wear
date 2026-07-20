import { TableCell, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Edit, Trash2, ImageIcon } from "lucide-react";
import { Product } from "@/types/products.types";
import { useProduct } from "@/hooks/admin/use-products";
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

interface ProductRowProps {
  product: Product;
  onEdit: () => void;
}

const ProductRow = ({ product, onEdit }: ProductRowProps) => {
  const { Delete } = useProduct();
  const { mutate: deleteProduct, isPending } = Delete();

  return (
    <TableRow className="hover:bg-muted/50 transition-colors">
      <TableCell className="font-medium text-muted-foreground">
        {product.id}
      </TableCell>

      {/* Coluna Foto */}
      <TableCell>
        <div className="h-10 w-10 rounded border bg-muted flex items-center justify-center overflow-hidden">
          {product.image_url ? (
            <img
              src={product.image_url}
              alt={product.title}
              className="h-full w-full object-cover"
            />
          ) : (
            <ImageIcon className="h-5 w-5 text-muted-foreground/50" />
          )}
        </div>
      </TableCell>

      <TableCell className="font-medium">{product.title}</TableCell>

      {/* Colunas Extras mantidas */}
      <TableCell className="font-medium">${product.price}</TableCell>
      <TableCell className="font-medium">{product.qty ?? 0}</TableCell>

      <TableCell>
        <span
          className={`text-sm font-semibold ${product.status === 1 ? "text-emerald-600" : "text-red-500"}`}
        >
          {product.status === 1 ? "Active" : "Inactive"}
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
                  product: <strong>{product.title}</strong>.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction
                  onClick={() =>
                    deleteProduct({ productId: String(product.id) })
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

export default ProductRow;
