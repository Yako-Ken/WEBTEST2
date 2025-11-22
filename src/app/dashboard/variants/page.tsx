// src/app/dashboard/variants/page.tsx

import { DataTable } from "../../../components/DataTable";
import React from "react";
import { variantColumns } from "./columns";
import { fetchData } from "@/app/actions/Server";
import MaxWidthWrapper from "../../../components/defaults/MaxWidthWrapper";
import ModalCustom from "../../../components/defaults/ModalCustom";
import { Button } from "@/app/components/ui/button"; // المسار الصحيح
import GlobalVariantForm from "../../../components/GlobalVariantForm";

// تعريف واجهة للـ props بشكل منفصل
interface VariantsPageProps {
  searchParams: Promise<{
    limit?: string;
    page?: string;
  }>;
}

const Page = async ({ searchParams: searchParamsPromise }: VariantsPageProps) => {
  
  // فك الـ Promise بشكل صريح
  const actualSearchParams = await searchParamsPromise;

  // الوصول الآمن إلى الخصائص مع قيم افتراضية
  const limit = actualSearchParams?.limit || "10";
  const page = actualSearchParams?.page || "1";
  const pageAsNumber = parseInt(page, 10);

  // جلب البيانات باستخدام معاملات البحث الصحيحة
  const variantsData = await fetchData({
    resourceName: "variants",
    tags: ["variants"],
    queryParams: new URLSearchParams({ limit, page }),
  });

  const { data, totalPages } = variantsData;
  const { docs } = data;

  return (
    <MaxWidthWrapper>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Global Variants</h1>
        <ModalCustom
          title="Create New Global Variant"
          description="Define a new variant type that can be used across multiple products."
          content={<GlobalVariantForm />}
          btn={<Button>Create Global Variant</Button>}
        />
      </div>
      <DataTable
        totalPages={totalPages}
        page={pageAsNumber}
        columns={variantColumns}
        data={docs || []}
      />
    </MaxWidthWrapper>
  );
};

export default Page;
