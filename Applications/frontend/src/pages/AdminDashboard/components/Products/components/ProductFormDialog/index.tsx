import { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
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
import { ImageIcon, Loader2, Plus, X, Star, CopyMinus } from "lucide-react";
import { toast } from "sonner";

// Hooks
import { useProduct } from "@/hooks/admin/use-products";
import { useCategory } from "@/hooks/admin/use-categories";
import { useBrand } from "@/hooks/admin/use-brands";
import { useTempImage } from "@/hooks/admin/use-temp-images";

import { Product } from "@/types/admin/products.types";
import * as api from "@/services/admin/products";

interface Props {
  open: boolean;
  setOpen: (open: boolean) => void;
  product: Product | null;
}

const ProductFormDialog = ({ open, setOpen, product }: Props) => {
  const { Create, Update, SaveProductImages } = useProduct();
  const { GetAll: getCategories } = useCategory();
  const { GetAll: getBrands } = useBrand();
  const { Create: createTempImage } = useTempImage();

  const { data: categoriesResp } = getCategories({}, { enabled: open });
  const { data: brandsResp } = getBrands({}, { enabled: open });

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
      onSuccess: (response: any) => {
        toast.success("Default image updated!");
        // Atualiza o estado local da imagem padrão
        setDefaultImage(response.data.image || "");
      },
      onError: (error) => {
        toast.error("Failed to set default image");
        console.error(error);
      },
    });

  // Estado para gerenciar a galeria (IDs e URLs)
  const [gallery, setGallery] = useState<
    { id: number; url: string; isNew: boolean; imageName?: string }[]
  >([]);
  const [defaultImage, setDefaultImage] = useState<string>("");

  const { register, handleSubmit, reset, setValue, watch, control } =
    useForm<any>();

  useEffect(() => {
    if (product && open) {
      // SET DO FORM COM DADOS DO PRODUTO
      reset({
        title: product.title,
        price: product.price,
        compare_price: product.compare_price,
        qty: product.qty,
        sku: product.sku,
        barcode: product.barcode,
        status_str: String(product.status),
        is_featured: product.is_featured || "no",
        category_id_str: String(product.category_id || ""),
        brand_id_str: String(product.brand_id || ""),
        short_description: product.short_description,
        description: product.description,
      });

      // Mapeia as imagens existentes
      const existingImages =
        product.product_images?.map((img) => ({
          id: img.id,
          url: `http://localhost:8000/uploads/products/small/${img.image}`,
          isNew: false,
        })) || [];
      setGallery(existingImages);
      setDefaultImage(product.image || ""); // Armazena a imagem padrão
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
    }
  }, [product, reset, open]);

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
          setGallery((prev) => [
            ...prev,
            {
              id: newImage.id,
              url: URL.createObjectURL(file),
              isNew: true,
              imageName: newImage.image, // Armazena o nome real da imagem
            },
          ]);
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

    const payload: any = {
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
      image: defaultImage || null, // Envia o nome da imagem padrão
    };

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
              {product ? `Editando: ${product.title}` : "New Product"}
            </DialogTitle>
          </DialogHeader>

          {/* --- GALLERY SECTION --- */}
          <div className="space-y-4">
            <Label className="text-sm font-bold uppercase tracking-widest flex items-center gap-2 text-primary">
              <ImageIcon className="h-4 w-4" /> Product Gallery
            </Label>

            <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-4">
              <label className="relative aspect-[3/4] border-2 border-dashed rounded-xl flex flex-col items-center justify-center cursor-pointer hover:bg-muted/50 transition-colors">
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  className="hidden"
                  onChange={handleMultipleImages}
                  disabled={isUploading || isSavingDirect}
                />
                {isUploading || isSavingDirect ? (
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

              {gallery.map((img) => {
                // Usa o imageName armazenado se disponível, senão extrai da URL
                const imageName =
                  img.imageName || img.url.split("/").pop() || "";
                const isDefault = defaultImage === imageName;

                console.log(img);

                return (
                  <div
                    key={img.id}
                    className={`relative  aspect-[3/4] border-2 rounded-xl overflow-hidden bg-muted flex flex-col transition-all ${
                      isDefault
                        ? "border-yellow-500 shadow-md shadow-yellow-300"
                        : "border-gray-300"
                    }`}
                  >
                    <img
                      src={img.url}
                      className="w-full h-full object-cover flex-1"
                      alt="Preview"
                    />

                    {/* Badge de NEW ou DEFAULT */}
                    {isDefault ? (
                      <div className="absolute top-1 left-1 bg-yellow-500 text-[10px] text-white px-1.5 rounded-full font-bold flex items-center gap-0.5">
                        <Star className="h-2.5 w-2.5" /> DEFAULT
                      </div>
                    ) : img.isNew ? (
                      <div className="absolute top-1 left-1 bg-blue-600 text-[10px] text-white px-1.5 rounded-full font-bold">
                        NEW
                      </div>
                    ) : null}

                    {/* Botões de ação (Delete e Set Default) */}
                    <div className="w-full flex flex-col gap-1 border-t p-1 bg-background">
                      {/* Botão DELETE */}
                      <Button
                        type="button"
                        variant="destructive"
                        size="sm"
                        className="flex h-6 text-[10px] gap-1"
                        onClick={() => removeImage(img.id)}
                      >
                        <X className="h-3 w-3" />
                        Delete
                      </Button>

                      {/* Botão SET DEFAULT (em UPDATE e CREATE) */}
                      {!isDefault && (
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          className="flex h-6 text-[10px] gap-1"
                          disabled={isSettingDefault}
                          onClick={() => {
                            // Em criação (imagem nova), apenas atualiza o state
                            if (img.isNew) {
                              setDefaultImage(imageName);
                            } else {
                              // Em update, faz requisição ao backend
                              setDefaultImageMutation({
                                productId: String(product.id),
                                image: imageName,
                              });
                            }
                          }}
                        >
                          {isSettingDefault ? (
                            <Loader2 className="h-3 w-3 animate-spin" />
                          ) : (
                            <Star className="h-3 w-3" />
                          )}
                          Set Default
                        </Button>
                      )}
                      {isDefault && (
                        <Button
                          type="button"
                          variant="default"
                          size="sm"
                          className="flex h-6 text-[10px] gap-1 bg-yellow-500 hover:bg-yellow-600 text-white"
                          disabled={true}
                        >
                          <Star className="h-3 w-3 fill-current" />
                          Current
                        </Button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* --- FORM FIELDS --- */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4 border-t">
            <div className="space-y-6">
              <div className="grid gap-2">
                <Label className="font-bold">Title</Label>
                <Input
                  placeholder="Enter product title"
                  {...register("title", { required: true })}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label>SKU</Label>
                  <Input
                    placeholder="Enter SKU"
                    {...register("sku", { required: true })}
                  />
                </div>
                <div className="grid gap-2">
                  <Label>Barcode</Label>
                  <Input
                    placeholder="Enter barcode (optional)"
                    {...register("barcode")}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label>Category</Label>
                  <Select
                    value={watch("category_id_str") || ""}
                    onValueChange={(v) => setValue("category_id_str", v)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Choose a category..." />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((c) => (
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
                    value={watch("brand_id_str") || ""}
                    onValueChange={(v) => setValue("brand_id_str", v)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Choose a brand..." />
                    </SelectTrigger>
                    <SelectContent>
                      {brands.map((b) => (
                        <SelectItem key={b.id} value={String(b.id)}>
                          {b.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div className="grid grid-cols-3 gap-4">
                <div className="grid gap-2">
                  <Label className="text-emerald-600 font-bold">Price</Label>
                  <Input
                    type="number"
                    step="0.01"
                    placeholder="0.00"
                    {...register("price", { required: true })}
                  />
                </div>
                <div className="grid gap-2">
                  <Label>Compare Price</Label>
                  <Input
                    type="number"
                    step="0.01"
                    placeholder="0.00 (optional)"
                    {...register("compare_price")}
                  />
                </div>
                <div className="grid gap-2">
                  <Label>Qty</Label>
                  <Input type="number" placeholder="0" {...register("qty")} />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label>Status</Label>
                  <Select
                    value={watch("status_str") || "1"}
                    onValueChange={(v) => setValue("status_str", v)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select status..." />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">Active</SelectItem>
                      <SelectItem value="0">Inactive</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-2">
                  <Label>Featured</Label>
                  <Select
                    value={watch("is_featured") || "no"}
                    onValueChange={(v) => setValue("is_featured", v)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Featured?" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="yes">Yes</SelectItem>
                      <SelectItem value="no">No</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid gap-2">
                <Label>Short Description</Label>
                <Textarea
                  placeholder="Enter a short description of the product..."
                  {...register("short_description")}
                  rows={3}
                />
              </div>
            </div>
          </div>

          {/* --- FULL DESCRIPTION (JODIT) --- */}
          <div className="space-y-4 border-t pt-6">
            <Label className="font-bold">Full Description</Label>
            <Controller
              name="description"
              control={control}
              render={({ field }) => (
                <JoditEditor
                  value={field.value || ""}
                  onBlur={(newContent) => field.onChange(newContent)}
                />
              )}
            />
          </div>

          <DialogFooter className="sticky bottom-0 bg-background border-t py-4 z-50">
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
