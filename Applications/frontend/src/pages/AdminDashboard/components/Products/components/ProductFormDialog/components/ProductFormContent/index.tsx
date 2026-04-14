import { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import JoditEditor from "jodit-react";
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
import { ImageIcon, Loader2, Plus, X } from "lucide-react";

// Tipos importados
import { Product } from "@/types/admin/products.types";
import { Category } from "@/types/admin/categories.types";
import { Brand } from "@/types/admin/brands.types";

interface ProductFormContentProps {
  initialData?: Product | null;
  onSubmit: (data: any, galleryIds: number[]) => void;
  isLoading: boolean;
  categories: Category[];
  brands: Brand[];
  uploadImage: (formData: FormData, options: any) => void;
  isUploading: boolean;
}

// Estendemos o tipo base para lidar com os valores dos Selects que o HTML/Radix trata como string
interface FormValues extends Partial<Product> {
  status_str: string;
  category_id_str: string;
  brand_id_str: string;
}

export const ProductFormContent = ({
  initialData,
  onSubmit,
  isLoading,
  categories,
  brands,
  uploadImage,
  isUploading,
}: ProductFormContentProps) => {
  const [gallery, setGallery] = useState<
    { id?: number; url: string; isTemp: boolean }[]
  >([]);

  const { register, handleSubmit, reset, setValue, watch, control } =
    useForm<FormValues>();

  useEffect(() => {
    if (initialData) {
      reset({
        ...initialData,
        status_str: String(initialData.status),
        category_id_str: String(initialData.category_id),
        brand_id_str: String(initialData.brand_id),
      });

      const existingImages =
        initialData.product_images?.map((img) => ({
          url: `http://localhost:8000/uploads/products/small/${img.image}`,
          isTemp: false,
        })) || [];
      setGallery(existingImages);
    } else {
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
  }, [initialData, reset]);

  const handleMultipleImages = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    Array.from(files).forEach((file) => {
      const formData = new FormData();
      formData.append("image", file);

      uploadImage(formData, {
        onSuccess: (res: { data: { id: number } }) => {
          setGallery((prev) => [
            ...prev,
            { id: res.data.id, url: URL.createObjectURL(file), isTemp: true },
          ]);
        },
      });
    });
  };

  const internalOnSubmit = (data: FormValues) => {
    const tempIds = gallery
      .filter((img) => img.isTemp)
      .map((img) => img.id as number);
    onSubmit(data, tempIds);
  };

  return (
    <form onSubmit={handleSubmit(internalOnSubmit)} className="space-y-8">
      {/* --- GALERIA --- */}
      <div className="space-y-4">
        <Label className="text-sm font-bold uppercase tracking-widest flex items-center gap-2 text-primary">
          <ImageIcon className="h-4 w-4" /> Galeria do Produto
        </Label>
        <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-4">
          {gallery.map((img, index) => (
            <div
              key={index}
              className="relative aspect-square border rounded-xl overflow-hidden group bg-muted"
            >
              <img
                src={img.url}
                className="w-full h-full object-cover"
                alt="Product"
              />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <Button
                  type="button"
                  variant="destructive"
                  size="icon"
                  className="h-8 w-8 rounded-full"
                  onClick={() =>
                    setGallery((prev) => prev.filter((_, i) => i !== index))
                  }
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
              {img.isTemp && (
                <div className="absolute top-1 left-1 bg-blue-600 text-[10px] text-white px-1.5 rounded-full uppercase font-bold">
                  Novo
                </div>
              )}
            </div>
          ))}
          <label className="relative aspect-square border-2 border-dashed rounded-xl flex flex-col items-center justify-center cursor-pointer hover:bg-muted/50">
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
              <Plus className="h-6 w-6 text-muted-foreground" />
            )}
          </label>
        </div>
      </div>

      {/* --- CAMPOS DO FORMULÁRIO --- */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4 border-t">
        <div className="space-y-6">
          <div className="grid gap-2">
            <Label className="font-bold">Título</Label>
            <Input {...register("title", { required: true })} />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label>SKU</Label>
              <Input {...register("sku", { required: true })} />
            </div>
            <div className="grid gap-2">
              <Label>Barcode</Label>
              <Input {...register("barcode")} />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label>Categoria</Label>
              <Select
                value={watch("category_id_str")}
                onValueChange={(v) => setValue("category_id_str", v)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Selecione..." />
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
              <Label>Marca</Label>
              <Select
                value={watch("brand_id_str")}
                onValueChange={(v) => setValue("brand_id_str", v)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Selecione..." />
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
              <Label className="text-emerald-600 font-bold">Preço</Label>
              <Input
                type="number"
                step="0.01"
                {...register("price", { required: true })}
              />
            </div>
            <div className="grid gap-2">
              <Label>Comparação</Label>
              <Input type="number" step="0.01" {...register("compare_price")} />
            </div>
            <div className="grid gap-2">
              <Label>Qtd</Label>
              <Input type="number" {...register("qty")} />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label>Status</Label>
              <Select
                value={watch("status_str")}
                onValueChange={(v) => setValue("status_str", v)}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">Ativo</SelectItem>
                  <SelectItem value="0">Inativo</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-2">
              <Label>Destaque</Label>
              <Select
                value={watch("is_featured")}
                onValueChange={(v: any) => setValue("is_featured", v)}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="yes">Sim</SelectItem>
                  <SelectItem value="no">Não</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="grid gap-2">
            <Label>Descrição Curta</Label>
            <Textarea {...register("short_description")} />
          </div>
        </div>
      </div>

      <div className="space-y-4 border-t pt-6">
        <Label className="font-bold">Descrição Completa</Label>
        <Controller
          name="description"
          control={control}
          render={({ field }) => (
            <JoditEditor
              value={field.value || ""}
              onBlur={(v) => field.onChange(v)}
            />
          )}
        />
      </div>

      <div className="flex justify-end gap-3 sticky bottom-0 bg-background py-4 border-t z-50">
        <Button type="submit" size="lg" disabled={isLoading || isUploading}>
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Salvando...
            </>
          ) : initialData ? (
            "Salvar Alterações"
          ) : (
            "Criar Produto"
          )}
        </Button>
      </div>
    </form>
  );
};
