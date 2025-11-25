// src/app/list/page.tsx

import React from "react";
import Filter from "@/components/Filter";
import ProductList from "@/components/ProductList";
import Image from "next/image";
import { fetchData } from "@/app/actions/Server";
import { Category } from "@/types";

// واجهة جديدة للـ props
interface ListPageProps {
  searchParams: { [key: string]: string | string[] | undefined };
}

// تحويل المكون إلى async ليتمكن من جلب البيانات
const ListPage = async ({ searchParams }: ListPageProps) => {
  // --- 1. جلب بيانات الفئات للفلتر ---
  const categoriesResponse = await fetchData({
    resourceName: "categories",
    cache: "force-cache",
    tags: ["categories"],
  });
  const categories: Category[] = categoriesResponse?.data?.docs || [];

  // --- 2. جلب بيانات المنتجات بناءً على الفلاتر ---
  const params = new URLSearchParams();
  Object.entries(searchParams).forEach(([key, value]) => {
    if (value) {
      params.append(key, Array.isArray(value) ? value.join(",") : value);
    }
  });

  const productsResponse = await fetchData({
    resourceName: "products",
    queryParams: params,
  });

  return (
    <div className="px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-64 relative">
      {/* CAMPAIGN */}
      <div className="bg-gradient-to-r from-pink-100 to-blue-100 px-4 flex justify-center h-32 sm:h-64">
        <div className="w-2/3 flex flex-col items-center justify-center gap-3 sm:gap-8">
          <h1 className=" sm:text-4xl text-md font-semibold sm:leading-[48px] text-gray-700 text-center">
            Grab up to 50% off on   
 Selected Products
          </h1>
          <button className="rounded-3xl bg-gray-400 text-white text-sm w-max py-3 px-5">
            Buy Now
          </button>
        </div>
      </div>

      {/* --- FILTER (مع تمرير البيانات) --- */}
      <Filter categories={categories} />

      {/* --- PRODUCT LIST (مع تمرير البيانات) --- */}
      <h1 className="text-xl font-semibold mt-10">Shoes For You!</h1>
      <ProductList/>
    </div>
  );
};

export default ListPage;
