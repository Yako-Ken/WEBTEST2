"use client";

import React from "react";
import GridContainer from "../../../../../components/defaults/GridContainer";
import MaxWidthWrapper from "../../../../../components/defaults/MaxWidthWrapper";
import ProductVariantForm from "../../../../../components/VariantForm";

interface VariantsClientPageProps {
  productId: string;
  initialProductVariants: any[];
  allGlobalVariants: any[];
}

export default function VariantsClientPage({
  productId,
  initialProductVariants,
  allGlobalVariants,
}: VariantsClientPageProps) {
  return (
    <MaxWidthWrapper>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Manage Product Variants</h1>
      </div>

      <GridContainer cols={2} className="gap-5 w-full">
        {initialProductVariants.map((variant: any) => (
          <ProductVariantForm
            key={variant._id}
            defaultValues={variant}
            productId={productId}
            variants={allGlobalVariants}
          />
        ))}
        <ProductVariantForm
          key="new-variant"
          productId={productId}
          variants={allGlobalVariants}
          isNew={true}
        />
      </GridContainer>
    </MaxWidthWrapper>
  );
}
