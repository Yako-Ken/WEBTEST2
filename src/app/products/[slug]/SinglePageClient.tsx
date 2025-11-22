"use client";

import { useState, useEffect } from "react";
import Add from "@/components/Add";
import ProductImages from "@/components/ProductImages";

export default function SinglePageClient({ product }: { product: any }) {
  const [selectedVariant, setSelectedVariant] = useState<any>(null);
  const [mainImageUrl, setMainImageUrl] = useState<string | null>(null);

  useEffect(() => {
    if (product?.variants && product.variants.length > 0) {
      const initialVariant = product.variants[0];
      setSelectedVariant(initialVariant);
      setMainImageUrl(initialVariant?.images?.[0]?.secure_url || product.images?.[0]?.secure_url);
    } else if (product?.images && product.images.length > 0) {
      setMainImageUrl(product.images[0].secure_url);
    }
  }, [product]);

  useEffect(() => {
    if (selectedVariant?.images && selectedVariant.images.length > 0) {
      setMainImageUrl(selectedVariant.images[0].secure_url);
    }
  }, [selectedVariant]);

  if (!product) {
    return <div>Product not found.</div>;
  }

  return (
    <div className="px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-64 relative flex flex-col lg:flex-row gap-16">
      <div className="w-full lg:w-1/2 lg:sticky top-20 h-max">
        <ProductImages
          mainImageUrl={mainImageUrl}
          thumbnails={product.images}
          onThumbnailClick={setMainImageUrl}
        />
      </div>
      <div className="w-full lg:w-1/2 flex flex-col gap-6">
        <h1 className="text-4xl font-medium">{product.name}</h1>
        <p className="text-gray-500">{product.description}</p>
        <div className="h-[2px] bg-gray-100" />
        <h2 className="font-medium text-2xl">${selectedVariant?.price || product.price}</h2>
        <div className="h-[2px] bg-gray-100" />
        
        <Add
          product={product}
          selectedVariant={selectedVariant}
          onVariantSelect={setSelectedVariant}
        />
        
        <div className="h-[2px] bg-gray-100" />
        <div className="text-sm">
          <h4 className="font-medium mb-4">About this product</h4>
          <p className="text-gray-500">{product.description}</p>
        </div>
      </div>
    </div>
  );
}
