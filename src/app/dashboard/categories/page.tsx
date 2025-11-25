import React from "react";
import { fetchData } from "@/app/actions/Server";
import MaxWidthWrapper from "@/components/defaults/MaxWidthWrapper";
import { Button } from "@/app/components/ui/button";
import ModalCustom from "@/components/defaults/ModalCustom";
import CategoryCreateForm from "./CategoryCreateForm";
import CategoryTableClientWrapper from "./CategoryTableClientWrapper";

export const dynamic = 'force-dynamic';

const CategoriesPage = async () => {
  let categories = [];

  try {
    const categoriesData = await fetchData({
      resourceName: "categories",
      tags: ["categories"],
    });
    
    if (categoriesData && categoriesData.data && categoriesData.data.docs) {
      categories = categoriesData.data.docs;
    }
  } catch (error) {
    console.error("Failed to fetch categories:", error);
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
        
        <CategoryTableClientWrapper categories={categories} />

      </div>
    </MaxWidthWrapper>
  );
};

export default CategoriesPage;
