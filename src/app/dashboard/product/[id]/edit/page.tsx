// src/app/dashboard/product/[id]/edit/page.tsx

"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { fetchData } from "@/app/actions/Server";
import ProductCreatePage from "../../../../../components/ProductForm";

export default function EditProductClientPage() {
  const params = useParams();
  const id = params.id as string;

  const [product, setProduct] = useState<any>(null);
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) {
      setError("Product ID is missing from the URL.");
      setIsLoading(false);
      return;
    }

    const loadData = async () => {
      try {
        setIsLoading(true);
        const [productResponse, categoriesResponse] = await Promise.all([
          fetchData({ resourceName: "products", id: id }),
          fetchData({ resourceName: "categories" }),
        ]);

        if (!productResponse?.data?.doc) {
          throw new Error("Product not found.");
        }

        setProduct(productResponse.data.doc);
        setCategories(categoriesResponse?.data?.docs || []);
      } catch (err: any) {
        setError(err.message || "Failed to load data.");
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, [id]);

  if (isLoading) {
    return <div className="p-6">Loading product data...</div>;
  }

  if (error) {
    return <div className="p-6 text-red-500">Error: {error}</div>;
  }

  if (!product) {
    return <div className="p-6">No product data available.</div>;
  }

  const transformedDefaultValues = {
    ...product,
    category: product.category?._id,
    images: product.images?.map((img: any) => ({
      url: img.secure_url,
      fileId: img.publicId,
    })) || [],
  };

  return (
    <div className="w-full mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">
        Edit Product: <span className="font-normal text-gray-600">{product.name}</span>
      </h1>
      <ProductCreatePage
        categories={categories}
        defaultValues={transformedDefaultValues}
      />
    </div>
  );
}
