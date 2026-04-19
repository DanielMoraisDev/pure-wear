import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { ImageIcon, Loader2, Plus, X, Star } from "lucide-react";
import { ProductImage } from "@/types/admin/products.types";

interface GalleryImage extends ProductImage {
  url: string;
  isNew: boolean;
}

interface GallerySectionProps {
  gallery: GalleryImage[];
  defaultImage: string;
  isUploading: boolean;
  isSavingDirect: boolean;
  isSettingDefault: boolean;
  onImageSelect: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onRemoveImage: (id: number) => void;
  onSetDefaultImage: (image: GalleryImage) => void;
  productId?: number;
}

export function GallerySection({
  gallery,
  defaultImage,
  isUploading,
  isSavingDirect,
  isSettingDefault,
  onImageSelect,
  onRemoveImage,
  onSetDefaultImage,
}: GallerySectionProps) {
  return (
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
            onChange={onImageSelect}
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
          const isDefault = defaultImage === img.image;

          return (
            <div
              key={img.id}
              className={`relative aspect-[3/4] border-2 rounded-xl overflow-hidden bg-muted flex flex-col transition-all ${
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

              {isDefault ? (
                <div className="absolute top-1 left-1 bg-yellow-500 text-[10px] text-white px-1.5 rounded-full font-bold flex items-center gap-0.5">
                  <Star className="h-2.5 w-2.5" /> DEFAULT
                </div>
              ) : img.isNew ? (
                <div className="absolute top-1 left-1 bg-blue-600 text-[10px] text-white px-1.5 rounded-full font-bold">
                  NEW
                </div>
              ) : null}

              <div className="w-full flex flex-col gap-1 border-t p-1 bg-background">
                <Button
                  type="button"
                  variant="destructive"
                  size="sm"
                  className="flex h-6 text-[10px] gap-1"
                  onClick={() => onRemoveImage(img.id)}
                >
                  <X className="h-3 w-3" />
                  Delete
                </Button>

                {!isDefault && (
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    className="flex h-6 text-[10px] gap-1"
                    disabled={isSettingDefault}
                    onClick={() => onSetDefaultImage(img)}
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
  );
}
