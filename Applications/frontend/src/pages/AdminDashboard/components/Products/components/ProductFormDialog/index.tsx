import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";

// Hooks
import { useProduct } from "@/hooks/admin/use-products";
import { useCategory } from "@/hooks/admin/use-categories";
import { useBrand } from "@/hooks/admin/use-brands";
import { useTempImage } from "@/hooks/admin/use-temp-images";
import { useSize } from "@/hooks/admin/use-sizes";

import { Product, ProductImage } from "@/types/admin/products.types";
import * as api from "@/services/admin/products";

// Subcomponents
import { GallerySection } from "./components/GallerySection";
import { FormFieldsSection } from "./components/FormFieldsSection";
import { SizesSection } from "./components/SizesSection";
import { DescriptionSection } from "./components/DescriptionSection";

interface Props {
  open: boolean;
  setOpen: (open: boolean) => void;
  product: Product | null;
}

interface GalleryImage extends ProductImage {
  url: string;
  isNew: boolean;
}

interface ChangeProductDefaultImageResponse {
  status: number;
  message: string;
}

const ProductFormDialog = ({ open, setOpen, product }: Props) => {
  const { Create, Update, SaveProductImages, GetOne } = useProduct();
  const { GetAll: getCategories } = useCategory();
  const { GetAll: getBrands } = useBrand();
  const { GetAll: getSizes } = useSize();
  const { Create: createTempImage } = useTempImage();

  const { data: categoriesResp } = getCategories({}, { enabled: open });
  const { data: brandsResp } = getBrands({}, { enabled: open });
  const { data: sizesResp } = getSizes({}, { enabled: open });

  // Pegar dados atualizados do produto quando está em modo de edição
  const { data: productDataResp, isLoading: isLoadingProductData } = GetOne(
    product?.id ? String(product.id) : "",
  );

  const { mutate: uploadImage, isPending: isUploading } = createTempImage();
  const { mutate: saveDirectImage, isPending: isSavingDirect } =
    SaveProductImages();
  const { mutate: createMutate, isPending: isCreating } = Create();
  const { mutate: updateMutate, isPending: isUpdating } = Update();

  // Mutation para definir imagem padrão
  const { mutate: setDefaultImageMutation, isPending: isSettingDefault } =
    useMutation({
      mutationFn: ({
        productId,
        image,
      }: {
        productId: string;
        image: string;
      }) => api.changeProductDefaultImage({ productId, image }),
      onSuccess: (response: ChangeProductDefaultImageResponse) => {
        toast.success(response.message || "Default image updated!");
        // O estado local já foi atualizado no onClick, apenas pegamos a confirmação do backend
      },
      onError: (error) => {
        toast.error("Failed to set default image");
        console.error(error);
      },
    });

  // Estado para gerenciar a galeria (IDs, URLs e metadados)
  const [gallery, setGallery] = useState<GalleryImage[]>([]);
  const [defaultImage, setDefaultImage] = useState<string>("");

  // Estado para gerenciar sizes selecionados
  const [sizesData, setSizesData] = useState<number[]>([]);

  const { register, handleSubmit, reset, setValue, watch, control } =
    useForm<any>();

  useEffect(() => {
    // Usar dados do GetOne quando estiver atualizando, senão usar product direto
    const productData = productDataResp?.data || product;

    if (product && open && productData) {
      // SET DO FORM COM DADOS DO PRODUTO (ATUALIZADO DO SERVIDOR)
      reset({
        title: productData.title,
        price: productData.price,
        compare_price: productData.compare_price,
        qty: productData.qty,
        sku: productData.sku,
        barcode: productData.barcode,
        status_str: String(productData.status),
        is_featured: productData.is_featured || "no",
        category_id_str: String(productData.category_id || ""),
        brand_id_str: String(productData.brand_id || ""),
        short_description: productData.short_description,
        description: productData.description,
      });

      // Mapeia as imagens existentes usando o padrão ProductImage
      const existingImages: GalleryImage[] =
        productData.product_images?.map((img) => ({
          ...img,
          url: `http://localhost:8000/uploads/products/small/${img.image}`,
          isNew: false,
        })) || [];
      setGallery(existingImages);
      setDefaultImage(productData.image || ""); // Armazena a imagem padrão

      // Carregar sizes já associados ao produto a partir da resposta do GetOne
      if (
        productDataResp?.productSizes &&
        Array.isArray(productDataResp.productSizes)
      ) {
        setSizesData(productDataResp.productSizes);
        console.log(productDataResp);
      } else {
        setSizesData([]);
      }
    } else if (open) {
      reset({
        title: "",
        price: "",
        compare_price: "",
        qty: "",
        sku: "",
        barcode: "",
        status_str: "1",
        is_featured: "no",
        category_id_str: "",
        brand_id_str: "",
        description: "",
        short_description: "",
      });
      setGallery([]);
      setDefaultImage("");
      setSizesData([]); // Resetar sizes quando abre novo produto
    }
  }, [product, productDataResp, reset, open]);

  const handleMultipleImages = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    Array.from(files).forEach((file) => {
      const formData = new FormData();
      formData.append("image", file);

      if (product?.id) {
        formData.append("product_id", String(product.id));
      }

      // Se é update, salva direto. Se é criação, upload temporário
      const mutateFn = product ? saveDirectImage : uploadImage;

      mutateFn(formData, {
        onSuccess: (response: any) => {
          const newImage = response.data;
          const newGalleryImage: GalleryImage = {
            id: newImage.id,
            product_id: newImage.product_id || (product?.id ?? 0),
            image: newImage.image,
            created_at: newImage.created_at || new Date().toISOString(),
            updated_at: newImage.updated_at || new Date().toISOString(),
            url: URL.createObjectURL(file),
            isNew: true,
          };
          setGallery((prev) => [...prev, newGalleryImage]);
        },
      });
    });
  };

  const removeImage = (id: number) => {
    setGallery((prev) => prev.filter((img) => img.id !== id));
  };

  const onSubmit = (data: any) => {
    // Pega apenas os IDs das imagens
    const galleryIds = gallery.map((img) => img.id);

    if (product) {
      // PAYLOAD PARA UPDATE
      const updatePayload: any = {
        productId: String(product.id),
        title: data.title,
        price: Number(data.price),
        compare_price: data.compare_price ? Number(data.compare_price) : null,
        qty: data.qty ? Number(data.qty) : null,
        sku: data.sku,
        barcode: data.barcode || null,
        category_id: Number(data.category_id_str),
        brand_id: Number(data.brand_id_str),
        status: Number(data.status_str),
        is_featured: data.is_featured,
        short_description: data.short_description,
        description: data.description,
        gallery: galleryIds.length > 0 ? galleryIds : null,
        image: defaultImage || null,
        // Adiciona sizes no update
        sizes: sizesData.length > 0 ? sizesData : [],
      };

      updateMutate(updatePayload, { onSuccess: () => setOpen(false) });
    } else {
      // PAYLOAD PARA CREATE
      const createPayload: any = {
        title: data.title,
        price: Number(data.price),
        compare_price: data.compare_price ? Number(data.compare_price) : null,
        qty: data.qty ? Number(data.qty) : null,
        sku: data.sku,
        barcode: data.barcode || null,
        category_id: Number(data.category_id_str),
        brand_id: Number(data.brand_id_str),
        status: Number(data.status_str),
        is_featured: data.is_featured,
        short_description: data.short_description,
        description: data.description,
        gallery: galleryIds.length > 0 ? galleryIds : null,
        image: defaultImage || null,
        // Create não inclui sizes
      };

      createMutate(createPayload, { onSuccess: () => setOpen(false) });
    }
  };

  const categories = Array.isArray(categoriesResp?.data)
    ? categoriesResp.data
    : [];
  const brands = Array.isArray(brandsResp?.data) ? brandsResp.data : [];

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-[1000px] max-h-[95vh] overflow-y-auto">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold">
              {product ? `Editando: ${product.title}` : "New Product"}
            </DialogTitle>
          </DialogHeader>

          {/* --- GALLERY SECTION --- */}
          <GallerySection
            gallery={gallery}
            defaultImage={defaultImage}
            isUploading={isUploading}
            isSavingDirect={isSavingDirect}
            isSettingDefault={isSettingDefault}
            onImageSelect={handleMultipleImages}
            onRemoveImage={removeImage}
            onSetDefaultImage={(img) => {
              if (img.isNew) {
                setDefaultImage(img.image);
              } else {
                setDefaultImageMutation({
                  productId: String(product?.id),
                  image: img.image,
                });
              }
            }}
            productId={product?.id}
          />

          {/* --- FORM FIELDS --- */}
          <FormFieldsSection
            isLoading={product && isLoadingProductData ? true : false}
            categories={categories}
            brands={brands}
            register={register}
            watch={watch}
            setValue={setValue}
          />

          {/* --- SIZES SECTION (Only on Update) --- */}
          {product && (
            <SizesSection
              sizes={Array.isArray(sizesResp?.data) ? sizesResp.data : []}
              selectedSizes={sizesData}
              onSizeToggle={(sizeId) => {
                setSizesData((prev) =>
                  prev.includes(sizeId)
                    ? prev.filter((id) => id !== sizeId)
                    : [...prev, sizeId],
                );
              }}
            />
          )}

          {/* --- FULL DESCRIPTION (JODIT) --- */}
          <DescriptionSection
            isLoading={product && isLoadingProductData ? true : false}
            control={control}
          />

          <DialogFooter className="bottom-0 bg-background border-t py-4 z-50">
            <Button
              type="button"
              variant="outline"
              onClick={() => setOpen(false)}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              size="lg"
              disabled={
                isCreating ||
                isUpdating ||
                isUploading ||
                isSavingDirect ||
                isSettingDefault
              }
            >
              {isCreating || isUpdating ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Saving...
                </>
              ) : product ? (
                "Save Changes"
              ) : (
                "Create Product"
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default ProductFormDialog;
