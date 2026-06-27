import { Label } from "@/components/ui/label";
import { Size } from "@/types/admin/sizes.types";

interface SizesSectionProps {
  sizes: Size[];
  selectedSizes: number[];
  onSizeToggle: (sizeId: number) => void;
}

export function SizesSection({
  sizes,
  selectedSizes,
  onSizeToggle,
}: SizesSectionProps) {
  return (
    <div className="space-y-4 border-t pt-6">
      <Label className="text-sm font-bold uppercase tracking-widest flex items-center gap-2 text-primary">
        Available Sizes
      </Label>

      {Array.isArray(sizes) && sizes.length > 0 ? (
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-3">
          {sizes.map((size) => (
            <button
              key={size.id}
              type="button"
              onClick={() => onSizeToggle(size.id)}
              className={`px-4 py-2 rounded-lg font-semibold text-sm transition-all border-2 ${
                selectedSizes.includes(size.id)
                  ? "border-primary bg-primary text-white"
                  : "border-gray-300 bg-white text-gray-700 hover:border-primary"
              }`}
            >
              {size.name}
            </button>
          ))}
        </div>
      ) : (
        <p className="text-sm text-muted-foreground">No sizes available</p>
      )}

      {selectedSizes.length > 0 && (
        <div className="flex flex-wrap gap-2 pt-2">
          <span className="text-xs font-semibold text-muted-foreground">
            Selected: {selectedSizes.length}
          </span>
          {sizes
            ?.filter((size) => selectedSizes.includes(size.id))
            .map((size) => (
              <span
                key={size.id}
                className="px-2 py-1 text-xs bg-primary text-white rounded-full"
              >
                {size.name}
              </span>
            ))}
        </div>
      )}
    </div>
  );
}
