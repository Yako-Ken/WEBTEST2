"use client";

import Image from "next/image";

interface ImageItem {
  _id?: string;
  id?: number;
  url?: string;
  secure_url?: string;
}

interface ProductImagesProps {
  mainImageUrl: string | null;
  thumbnails: ImageItem[];
  onThumbnailClick: (url: string) => void;
}

export default function ProductImages({ mainImageUrl, thumbnails, onThumbnailClick }: ProductImagesProps) {
  if (!thumbnails || thumbnails.length === 0) {
    return (
      <div className="h-[500px] relative bg-gray-100 rounded-md flex items-center justify-center">
        <p className="text-gray-500">No images available</p>
      </div>
    );
  }

  return (
    <div>
      <div className="h-[500px] relative">
        {mainImageUrl && (
          <Image
            src={mainImageUrl}
            alt="Product Image"
            fill
            sizes="50vw"
            className="object-cover rounded-md"
            priority={true}
          />
        )}
      </div>
      <div className="flex justify-between gap-4 mt-8">
        {thumbnails.map((item, i) => {
          const thumbnailUrl = item.secure_url || item.url;
          if (!thumbnailUrl) return null;

          return (
            <div
              className={`w-1/4 h-32 relative cursor-pointer`}
              key={item._id || item.id || i}
              onClick={() => onThumbnailClick(thumbnailUrl)}
            >
              <Image
                src={thumbnailUrl}
                alt="Product Thumbnail"
                fill
                sizes="30vw"
                className="object-cover rounded-md"
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}
