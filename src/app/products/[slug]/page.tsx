"use client";

import { useEffect, useState } from "react";
import { useParams, notFound } from "next/navigation";
import Add from "@/components/Add";
import CustomizeProducts from "@/components/CustomizeProducts";
import ProductImages from "@/components/ProductImages";
import { fetchData } from "@/app/actions/Server";

export default function SinglePage() {
  const params = useParams();
  const slug = params?.slug as string; // أصبح الآن آمنًا

  const [product, setProduct] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!slug) {
      return;
    }
    
    const loadProduct = async () => {
      setIsLoading(true);
      try {
        // هذا هو التعديل الأهم: استدعاء المسار الصحيح
        const response = await fetchData({ resourceName: `products/slug/${slug}` });
        
        if (!response?.data) {
          notFound();
        } else {
          setProduct(response.data);
        }
      } catch (err) {
        console.error("Failed to load product", err);
        notFound();
      } finally {
        setIsLoading(false);
      }
    };

    loadProduct();
  }, [slug]);

  if (isLoading) {
    return <div className="p-6">Loading...</div>;
  }

  if (!product) {
    return notFound();
  }

  // بما أننا لا نملك selectedVariant في هذه البنية، سنمرر البيانات مباشرة
  return (
    <div className="px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-64 relative flex flex-col lg:flex-row gap-16">
      <div className="w-full lg:w-1/2 lg:sticky top-20 h-max">
        <ProductImages
          mainImageUrl={product.images?.[0]?.secure_url}
          thumbnails={product.images}
          onThumbnailClick={() => {}} // يمكن تعديلها لاحقًا
        />
      </div>
      <div className="w-full lg:w-1/2 flex flex-col gap-6">
        <h1 className="text-4xl font-medium">{product.name}</h1>
        <p className="text-gray-500">{product.description}</p>
        <div className="h-[2px] bg-gray-100" />
        <h2 className="font-medium text-2xl">${product.price}</h2>
        <div className="h-[2px] bg-gray-100" />
        
        {/* تم دمج CustomizeProducts و Add في مكون واحد لتجنب التعقيد */}
        <Add
          productId={product._id}
          productName={product.name}
          productPrice={product.basePrice} 
          productImage={product.images?.[0]?.secure_url}
          variants={product.variants || []}
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
