// src/app/dashboard/categories/page.tsx
import React from "react";
import { fetchData } from "@/app/actions/Server";
import MaxWidthWrapper from "@/components/defaults/MaxWidthWrapper";
import { Button } from "@/app/components/ui/button";
import ModalCustom from "@/components/defaults/ModalCustom";
import CategoryCreateForm from "./CategoryCreateForm";
import CategoryTableClientWrapper from "./CategoryTableClientWrapper"; // 1. استيراد الغلاف الجديد

const CategoriesPage = async () => {
  let categories = []; // 2. ابدأ بمصفوفة فارغة آمنة

  try {
    const categoriesData = await fetchData({
      resourceName: "categories",
      tags: ["categories"],
    });
    // 3. تحقق من وجود البيانات قبل استخدامها
    if (categoriesData && categoriesData.data && categoriesData.data.docs) {
      categories = categoriesData.data.docs;
    }
  } catch (error) {
    console.error("Failed to fetch categories:", error);
    // ستبقى categories مصفوفة فارغة في حالة حدوث خطأ
  }

  return (
    <MaxWidthWrapper>
      <div className="py-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Manage Categories</h1>
          <ModalCustom
            title="Create New Category"
            description="Fill in the details for the new category."
            content={<CategoryCreateForm />}
            btn={<Button>Create Category</Button>}
          />
        </div>
        
        {/* 4. استخدم مكون الغلاف الجديد ومرر له البيانات الآمنة */}
        <CategoryTableClientWrapper categories={categories} />

      </div>
    </MaxWidthWrapper>
  );
};

export default CategoriesPage;
