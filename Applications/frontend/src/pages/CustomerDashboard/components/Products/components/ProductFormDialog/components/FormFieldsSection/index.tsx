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
import { Skeleton } from "@/components/ui/skeleton";
import {
  UseFormWatch,
  UseFormSetValue,
  UseFormRegister,
} from "react-hook-form";

interface FormFieldsSectionProps {
  isLoading: boolean;
  categories: any[];
  brands: any[];
  register: UseFormRegister<any>;
  watch: UseFormWatch<any>;
  setValue: UseFormSetValue<any>;
}

export function FormFieldsSection({
  isLoading,
  categories,
  brands,
  register,
  watch,
  setValue,
}: FormFieldsSectionProps) {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4 border-t">
        <div className="space-y-6">
          <div className="grid gap-2">
            <Skeleton className="h-6 w-16" />
            <Skeleton className="h-10 w-full" />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Skeleton className="h-6 w-12" />
              <Skeleton className="h-10 w-full" />
            </div>
            <div className="grid gap-2">
              <Skeleton className="h-6 w-16" />
              <Skeleton className="h-10 w-full" />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Skeleton className="h-6 w-20" />
              <Skeleton className="h-10 w-full" />
            </div>
            <div className="grid gap-2">
              <Skeleton className="h-6 w-12" />
              <Skeleton className="h-10 w-full" />
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="grid grid-cols-3 gap-4">
            <div className="grid gap-2">
              <Skeleton className="h-6 w-12" />
              <Skeleton className="h-10 w-full" />
            </div>
            <div className="grid gap-2">
              <Skeleton className="h-6 w-24" />
              <Skeleton className="h-10 w-full" />
            </div>
            <div className="grid gap-2">
              <Skeleton className="h-6 w-8" />
              <Skeleton className="h-10 w-full" />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Skeleton className="h-6 w-12" />
              <Skeleton className="h-10 w-full" />
            </div>
            <div className="grid gap-2">
              <Skeleton className="h-6 w-16" />
              <Skeleton className="h-10 w-full" />
            </div>
          </div>

          <div className="grid gap-2">
            <Skeleton className="h-6 w-32" />
            <Skeleton className="h-24 w-full" />
          </div>
        </div>
      </div>
    );
  }

  return (
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
  );
}
