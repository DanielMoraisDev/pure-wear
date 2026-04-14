import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useProduct } from "@/hooks/admin/use-products";
import { useCategory } from "@/hooks/admin/use-categories";
import { useBrand } from "@/hooks/admin/use-brands";
import { useTempImage } from "@/hooks/admin/use-temp-images";
import { ProductFormContent } from "./components/ProductFormContent";
import { Product } from "@/types/admin/products.types";

interface Props {
  open: boolean;
  setOpen: (open: boolean) => void;
  product: Product | null;
}

const ProductFormDialog = ({ open, setOpen, product }: Props) => {
  const { Create, Update } = useProduct();
  const { GetAll: getCategories } = useCategory();
  const { GetAll: getBrands } = useBrand();
  const { Create: createTempImage } = useTempImage();

  const { data: categoriesResp } = getCategories({}, { enabled: open });
  const { data: brandsResp } = getBrands({}, { enabled: open });

  const { mutate: uploadImage, isPending: isUploading } = createTempImage();
  const { mutate: createMutate, isPending: isCreating } = Create();
  const { mutate: updateMutate, isPending: isUpdating } = Update();

  const handleFormSubmit = (data: any, galleryIds: number[]) => {
    const payload = {
      ...data,
      price: Number(data.price),
      compare_price: data.compare_price ? Number(data.compare_price) : null,
      qty: data.qty ? Number(data.qty) : null,
      category_id: Number(data.category_id_str),
      brand_id: Number(data.brand_id_str),
      status: Number(data.status_str),
      gallery: galleryIds.length > 0 ? galleryIds : null,
    };

    // Remove campos auxiliares de string antes de enviar
    delete payload.status_str;
    delete payload.category_id_str;
    delete payload.brand_id_str;

    if (product) {
      updateMutate(
        { productId: String(product.id), ...payload },
        { onSuccess: () => setOpen(false) },
      );
    } else {
      createMutate(payload, { onSuccess: () => setOpen(false) });
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-[1000px] max-h-[95vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">
            {product ? `Editando: ${product.title}` : "Novo Produto"}
          </DialogTitle>
        </DialogHeader>

        <ProductFormContent
          initialData={product}
          onSubmit={handleFormSubmit}
          isLoading={isCreating || isUpdating}
          isUploading={isUploading}
          uploadImage={uploadImage}
          categories={
            Array.isArray(categoriesResp?.data) ? categoriesResp.data : []
          }
          brands={Array.isArray(brandsResp?.data) ? brandsResp.data : []}
        />
      </DialogContent>
    </Dialog>
  );
};

export default ProductFormDialog;
