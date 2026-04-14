import { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import JoditEditor from "jodit-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// Hooks
import { useProduct } from "@/hooks/admin/use-products";
import { useCategory } from "@/hooks/admin/use-categories";
import { useBrand } from "@/hooks/admin/use-brands";
import { useTempImage } from "@/hooks/admin/use-temp-images";

import {
  Product,
  FetchCreateProductParams,
} from "@/types/admin/products.types";
import {
  UploadCloud,
  X,
  Package,
  Tag,
  Layers,
  Loader2,
  Plus,
  Image as ImageIcon,
} from "lucide-react";

interface Props {
  open: boolean;
  setOpen: (open: boolean) => void;
  product: any | null; // Tipado como any para aceitar o novo retorno com product_images
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

  // Estado para gerenciar a galeria (IDs temporários e Previews)
  const [gallery, setGallery] = useState<
    { id?: number; url: string; isTemp: boolean }[]
  >([]);

  const { register, handleSubmit, reset, setValue, watch, control } = useForm<
    FetchCreateProductParams & {
      status_str: string;
      category_id_str: string;
      brand_id_str: string;
    }
  >();

  useEffect(() => {
    if (product && open) {
      reset({
        ...product,
        status_str: String(product.status),
        category_id_str: String(product.category_id),
        brand_id_str: String(product.brand_id),
      });

      // Mapeia as imagens existentes para a galeria
      const existingImages =
        product.product_images?.map((img: any) => ({
          url: `http://localhost:8000/uploads/products/small/${img.image}`, // Ajuste conforme seu storage
          isTemp: false,
        })) || [];
      setGallery(existingImages);
    } else if (open) {
      reset({
        title: "",
        price: 0,
        status_str: "1",
        is_featured: "no",
        category_id_str: "",
        brand_id_str: "",
      });
      setGallery([]);
    }
  }, [product, reset, open]);

  const handleMultipleImages = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    Array.from(files).forEach((file) => {
      const formData = new FormData();
      formData.append("image", file);

      uploadImage(formData, {
        onSuccess: (res) => {
          setGallery((prev) => [
            ...prev,
            {
              id: res.data.id,
              url: URL.createObjectURL(file),
              isTemp: true,
            },
          ]);
        },
      });
    });
  };

  const removeImage = (index: number) => {
    setGallery((prev) => prev.filter((_, i) => i !== index));
  };

  const onSubmit = (data: any) => {
    // Pegamos apenas os IDs das imagens temporárias que foram subidas nesta sessão
    const tempIds = gallery
      .filter((img) => img.isTemp)
      .map((img) => img.id as number);

    const payload: any = {
      ...data,
      price: Number(data.price),
      compare_price: data.compare_price ? Number(data.compare_price) : null,
      qty: data.qty !== "" ? Number(data.qty) : null,
      category_id: Number(data.category_id_str),
      brand_id: Number(data.brand_id_str),
      status: Number(data.status_str) as 1 | 0,
      gallery: tempIds.length > 0 ? tempIds : null,
    };

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
              {product ? `Editing: ${product.title}` : "New Product"}
            </DialogTitle>
          </DialogHeader>

          {/* --- SESSÃO DE GALERIA (TOPO) --- */}
          <div className="space-y-4">
            <Label className="text-sm font-bold uppercase tracking-widest flex items-center gap-2 text-primary">
              <ImageIcon className="h-4 w-4" /> Product Gallery
            </Label>

            <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-4">
              {/* Cards das Imagens */}
              {gallery.map((img, index) => (
                <div
                  key={index}
                  className="relative aspect-square border rounded-xl overflow-hidden group bg-muted"
                >
                  <img
                    src={img.url}
                    className="w-full h-full object-cover"
                    alt="Gallery"
                  />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <Button
                      type="button"
                      variant="destructive"
                      size="icon"
                      className="h-8 w-8 rounded-full"
                      onClick={() => removeImage(index)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                  {img.isTemp && (
                    <div className="absolute top-1 left-1 bg-blue-600 text-[10px] text-white px-1.5 rounded-full uppercase font-bold">
                      New
                    </div>
                  )}
                </div>
              ))}

              {/* Botão Adicionar */}
              <label className="relative aspect-square border-2 border-dashed rounded-xl flex flex-col items-center justify-center cursor-pointer hover:bg-muted/50 transition-colors">
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  className="hidden"
                  onChange={handleMultipleImages}
                  disabled={isUploading}
                />
                {isUploading ? (
                  <Loader2 className="h-6 w-6 animate-spin text-primary" />
                ) : (
                  <>
                    <Plus className="h-6 w-6 text-muted-foreground" />
                    <span className="text-[10px] font-medium text-muted-foreground mt-1">
                      Add Image
                    </span>
                  </>
                )}
              </label>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4 border-t">
            {/* --- LADO ESQUERDO: INFOS BÁSICAS --- */}
            <div className="space-y-6">
              <div className="grid gap-2">
                <Label htmlFor="title" className="font-bold">
                  Title
                </Label>
                <Input
                  id="title"
                  {...register("title", { required: true })}
                  placeholder="Product name..."
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="sku">SKU</Label>
                  <Input
                    id="sku"
                    {...register("sku", { required: true })}
                    placeholder="SKU-123"
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="barcode">Barcode</Label>
                  <Input
                    id="barcode"
                    {...register("barcode")}
                    placeholder="EAN-13"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label>Category</Label>
                  <Select
                    value={watch("category_id_str")}
                    onValueChange={(val) => setValue("category_id_str", val)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select..." />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((c: any) => (
                        <SelectItem key={c.id} value={String(c.id)}>
                          {c.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-2">
                  <Label>Brand</Label>
                  <Select
                    value={watch("brand_id_str")}
                    onValueChange={(val) => setValue("brand_id_str", val)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select..." />
                    </SelectTrigger>
                    <SelectContent>
                      {brands.map((b: any) => (
                        <SelectItem key={b.id} value={String(b.id)}>
                          {b.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>

            {/* --- LADO DIREITO: PREÇOS E STATUS --- */}
            <div className="space-y-6">
              <div className="grid grid-cols-3 gap-4">
                <div className="grid gap-2">
                  <Label className="text-emerald-600 font-bold">Price</Label>
                  <Input
                    type="number"
                    step="0.01"
                    {...register("price", { required: true })}
                  />
                </div>
                <div className="grid gap-2">
                  <Label className="text-muted-foreground font-bold">
                    Compare
                  </Label>
                  <Input
                    type="number"
                    step="0.01"
                    {...register("compare_price")}
                  />
                </div>
                <div className="grid gap-2">
                  <Label className="font-bold">Qty</Label>
                  <Input type="number" {...register("qty")} />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label className="font-bold">Status</Label>
                  <Select
                    value={watch("status_str")}
                    onValueChange={(val) => setValue("status_str", val)}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">Active</SelectItem>
                      <SelectItem value="0">Inactive</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-2">
                  <Label className="font-bold text-amber-600">Featured</Label>
                  <Select
                    value={watch("is_featured")}
                    onValueChange={(val: "yes" | "no") =>
                      setValue("is_featured", val)
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="yes">Yes</SelectItem>
                      <SelectItem value="no">No</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid gap-2">
                <Label className="font-bold">Short Description</Label>
                <Textarea
                  {...register("short_description")}
                  className="min-h-[80px]"
                />
              </div>
            </div>
          </div>

          {/* --- DESCRIÇÃO LONGA (RODAPÉ) --- */}
          <div className="space-y-4 border-t pt-6">
            <Label className="font-bold">Full Description</Label>
            <Controller
              name="description"
              control={control}
              render={({ field }) => (
                <JoditEditor
                  value={field.value || ""}
                  onBlur={(c) => field.onChange(c)}
                />
              )}
            />
          </div>

          <DialogFooter className="sticky bottom-0 bg-background border-t py-4 z-30">
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
              disabled={isCreating || isUpdating || isUploading}
            >
              {product ? "Save Changes" : "Create Product"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default ProductFormDialog;
