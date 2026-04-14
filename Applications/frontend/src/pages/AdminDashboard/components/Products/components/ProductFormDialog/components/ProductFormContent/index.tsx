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

import { Product } from "@/types/admin/products.types";
import { Category } from "@/types/admin/categories.types";
import { Brand } from "@/types/admin/brands.types";

interface ProductFormContentProps {
  initialData?: Product | null;
  onSubmit: (data: any, galleryIds: number[]) => void;
  isLoading: boolean;
  saveImageMutation: {
    mutate: any;
    isPending: boolean;
  };
  categories: Category[];
  brands: Brand[];
}

export const ProductFormContent = ({
  initialData,
  onSubmit,
  isLoading,
  categories,
  brands,
  saveImageMutation,
}: ProductFormContentProps) => {
  const [gallery, setGallery] = useState<{ id: number; url: string }[]>([]);

  const { register, handleSubmit, reset, setValue, watch, control } =
    useForm<any>();

  useEffect(() => {
    if (initialData) {
      // SYNCING ALL FIELDS FROM GET DATA
      reset({
        title: initialData.title,
        price: initialData.price,
        compare_price: initialData.compare_price,
        qty: initialData.qty,
        sku: initialData.sku,
        barcode: initialData.barcode,
        status_str: String(initialData.status),
        is_featured: initialData.is_featured || "no",
        category_id_str: String(initialData.category_id || ""),
        brand_id_str: String(initialData.brand_id || ""),
        short_description: initialData.short_description,
        description: initialData.description,
      });

      const existingImages =
        initialData.product_images?.map((img) => ({
          id: img.id,
          url: `http://localhost:8000/uploads/products/small/${img.image}`,
        })) || [];
      setGallery(existingImages);
    } else {
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
    }
  }, [initialData, reset]);

  const handleMultipleImages = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    Array.from(files).forEach((file) => {
      const formData = new FormData();
      formData.append("image", file);

      if (initialData?.id) {
        formData.append("product_id", String(initialData.id));
      }

      saveImageMutation.mutate(formData, {
        onSuccess: (response: any) => {
          const newImage = response.data;
          setGallery((prev) => [
            ...prev,
            {
              id: newImage.id,
              url: URL.createObjectURL(file),
            },
          ]);
        },
      });
    });
  };

  const internalOnSubmit = (data: any) => {
    const galleryIds = gallery.map((img) => img.id);
    onSubmit(data, galleryIds);
  };

  return (
    <form onSubmit={handleSubmit(internalOnSubmit)} className="space-y-8">
      {/* --- GALLERY SECTION --- */}
      <div className="space-y-4">
        <Label className="text-sm font-bold uppercase tracking-widest flex items-center gap-2 text-primary">
          <ImageIcon className="h-4 w-4" /> Product Gallery
        </Label>

        <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-4">
          {gallery.map((img) => (
            <div
              key={img.id}
              className="relative aspect-square border rounded-xl overflow-hidden group bg-muted"
            >
              <img
                src={img.url}
                className="w-full h-full object-cover"
                alt="Preview"
              />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <Button
                  type="button"
                  variant="destructive"
                  size="icon"
                  className="h-8 w-8 rounded-full"
                  onClick={() =>
                    setGallery((prev) => prev.filter((i) => i.id !== img.id))
                  }
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ))}

          <label className="relative aspect-square border-2 border-dashed rounded-xl flex flex-col items-center justify-center cursor-pointer hover:bg-muted/50">
            <input
              type="file"
              multiple
              accept="image/*"
              className="hidden"
              onChange={handleMultipleImages}
              disabled={saveImageMutation.isPending}
            />
            {saveImageMutation.isPending ? (
              <Loader2 className="h-6 w-6 animate-spin text-primary" />
            ) : (
              <Plus className="h-6 w-6 text-muted-foreground" />
            )}
          </label>
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
                onValueChange={(v: any) => setValue("is_featured", v)}
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

      <div className="flex justify-end gap-3 sticky bottom-0 bg-background py-4 border-t z-50">
        <Button
          type="submit"
          size="lg"
          disabled={isLoading || saveImageMutation.isPending}
        >
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Saving...
            </>
          ) : initialData ? (
            "Save Changes"
          ) : (
            "Create Product"
          )}
        </Button>
      </div>
    </form>
  );
};
