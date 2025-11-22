"use client";

import { useCallback, useState } from "react";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import Image from "next/image";
import { Trash } from "lucide-react";

type Photo = {
  url: string;
  fileId: string;
};

export interface PhotoInputProps {
  value?: Photo[];
  onValueChange: (newValue: Photo[]) => void;
  disabled?: boolean;
}

export const PhotoInput = ({ value = [], onValueChange, disabled = false }: PhotoInputProps) => {
  const [isUploading, setIsUploading] = useState(false);

  const handleUpload = useCallback(
    async (files: FileList) => {
      if (files.length === 0) return;

      setIsUploading(true);
      try {
        const uploadPromises = Array.from(files).map(async (file) => {
          const formData = new FormData();
          formData.append("image", file);

          const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/upload`, {
            method: "POST",
            body: formData,
          } );

          if (!res.ok) {
            const errorData = await res.json().catch(() => ({ message: "Upload request failed" }));
            throw new Error(errorData.message || `Failed to upload ${file.name}`);
          }

          const data: Photo = await res.json();
          return data;
        });

        const newPhotos = await Promise.all(uploadPromises);
        onValueChange([...value, ...newPhotos]);

      } catch (err: any) {
        console.error("Upload failed:", err);
      } finally {
        setIsUploading(false);
      }
    },
    [value, onValueChange]
  );

  const handleDelete = useCallback(
    async (fileId: string) => {
      const updatedValue = value.filter((img) => img.fileId !== fileId);
      onValueChange(updatedValue);

      try {
        await fetch("/api/upload/delete", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ fileId }),
        });
      } catch (err) {
        console.error("Delete failed:", err);
        onValueChange(value);
      }
    },
    [value, onValueChange]
  );

  return (
    <div className="space-y-4">
      <Input
        type="file"
        multiple
        accept="image/*"
        disabled={isUploading || disabled}
        onChange={(e) => e.target.files && handleUpload(e.target.files)}
        className="cursor-pointer file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primary file:text-primary-foreground hover:file:bg-primary/90"
      />

      {value.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {value
            .filter(image => image && image.url)
            .map((image) => (
              <div key={image.fileId || image.url} className="relative w-full h-32 sm:h-44 group">
                <Image
                  src={image.url}
                  alt={`Uploaded image ${image.fileId}`}
                  fill
                  sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, 25vw"
                  className="rounded-lg object-cover"
                />
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 transition-all duration-300 rounded-lg" />
                <Button
                  type="button"
                  variant="destructive"
                  size="icon"
                  className="absolute top-2 right-2 h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity"
                  onClick={() => handleDelete(image.fileId)}
                  disabled={disabled}
                >
                  <Trash className="h-4 w-4" />
                </Button>
              </div>
            ))}
        </div>
      )}

      {isUploading && <p className="text-sm text-muted-foreground">Uploading images...</p>}
    </div>
  );
};
