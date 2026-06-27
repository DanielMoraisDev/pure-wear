import { Controller, Control } from "react-hook-form";
import { Label } from "@/components/ui/label";
import { Skeleton } from "@/components/ui/skeleton";
import JoditEditor from "jodit-react";
import { useMemo, useRef } from "react";

interface DescriptionSectionProps {
  isLoading: boolean;
  control: Control<any>;
}

export function DescriptionSection({
  isLoading,
  control,
}: DescriptionSectionProps) {
  const editor = useRef(null);

  const config = useMemo(
    () => ({
      readonly: false,
      iframe: false,
      toolbarAdaptive: false,
      zIndex: 9999,
      // Diz ao Jodit para usar getBoundingClientRect ao invés de offsetTop
      useNativeTooltip: false,
      disablePlugins: ["about"],
    }),
    [],
  );

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
            ref={editor}
            value={field.value || ""}
            config={config}
            onBlur={(newContent) => field.onChange(newContent)}
          />
        )}
      />
    </div>
  );
}
