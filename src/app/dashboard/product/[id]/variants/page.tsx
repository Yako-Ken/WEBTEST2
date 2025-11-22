"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { fetchData } from "@/app/actions/Server";
import GridContainer from "../../../../../components/defaults/GridContainer";
import MaxWidthWrapper from "../../../../../components/defaults/MaxWidthWrapper";
import ProductVariantPage from "../../../../../components/VariantForm";
import React from "react";

export default function VariantsClientPage() {
  const params = useParams();
  const id = params.id as string;

  const [productVariants, setProductVariants] = useState([]);
  const [allVariants, setAllVariants] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;

    const loadData = async () => {
      try {
        setIsLoading(true);
        const [productResponse, variantsResponse] = await Promise.all([
          fetchData({ resourceName: "products", id: id }),
          fetchData({ resourceName: "variants" }),
        ]);

        setProductVariants(productResponse?.data?.doc?.variants || []);
        setAllVariants(variantsResponse?.data?.docs || []);
      } catch (err: any) {
        setError(err.message || "Failed to load variant data.");
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, [id]);

  if (isLoading) {
    return <MaxWidthWrapper><p>Loading variants...</p></MaxWidthWrapper>;
  }

  if (error) {
    return <MaxWidthWrapper><p className="text-red-500">Error: {error}</p></MaxWidthWrapper>;
  }

  return (
    <MaxWidthWrapper>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Product Variants</h1>
      </div>

      <GridContainer cols={2} className="gap-5 w-full">
        {productVariants.map((variant: any) => (
          <ProductVariantPage
            key={variant._id}
            defaultValues={variant}
            productId={id}
            variants={allVariants}
          />
        ))}
        <ProductVariantPage
          key="new-variant"
          productId={id}
          variants={allVariants}
          isNew={true}
        />
      </GridContainer>
    </MaxWidthWrapper>
  );
}
