import { useEffect } from "react";
import { useForm } from "react-hook-form";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useBrand } from "@/hooks/admin/use-brands";
import { Brand } from "@/types/admin/brands.types";

interface Props {
  open: boolean;
  setOpen: (open: boolean) => void;
  brand: Brand | null;
}

const BrandFormDialog = ({ open, setOpen, brand }: Props) => {
  const { Create, Update } = useBrand();
  const { mutate: createMutate, isPending: isCreating } = Create();
  const { mutate: updateMutate, isPending: isUpdating } = Update();

  const { register, handleSubmit, reset, setValue, watch } = useForm({
    defaultValues: {
      name: "",
      status: "1",
    },
  });

  // Sincroniza os dados quando o dialog abre para edição
  useEffect(() => {
    if (brand) {
      reset({
        name: brand.name,
        status: String(brand.status),
      });
    } else {
      reset({ name: "", status: "1" });
    }
  }, [brand, reset, open]);

  const onSubmit = (data: any) => {
    const payload = {
      name: data.name,
      status: Number(data.status),
    };

    if (brand) {
      updateMutate(
        { brandId: String(brand.id), ...payload },
        { onSuccess: () => setOpen(false) },
      );
    } else {
      createMutate(payload, { onSuccess: () => setOpen(false) });
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-[425px]">
        <form onSubmit={handleSubmit(onSubmit)}>
          <DialogHeader>
            <DialogTitle>{brand ? "Edit Brand" : "New Brand"}</DialogTitle>
          </DialogHeader>

          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                {...register("name", { required: true })}
                placeholder="Ex: Kids"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="status">Status</Label>
              <Select
                value={watch("status")}
                onValueChange={(val) => setValue("status", val)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">Active</SelectItem>
                  <SelectItem value="0">Inactive</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => setOpen(false)}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={isCreating || isUpdating}>
              {brand ? "Save Alterations" : "New Brand"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default BrandFormDialog;
