import { Controller, Control } from "react-hook-form";
import { Label } from "@/components/ui/label";
import { Skeleton } from "@/components/ui/skeleton";
import JoditEditor from "jodit-react";

interface DescriptionSectionProps {
  isLoading: boolean;
  control: Control<any>;
}

export function DescriptionSection({
  isLoading,
  control,
}: DescriptionSectionProps) {
  if (isLoading) {
    return (
      <div className="space-y-4 border-t pt-6">
        <Skeleton className="h-6 w-40" />
        <Skeleton className="h-64 w-full" />
      </div>
    );
  }

  return (
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
  );
}
