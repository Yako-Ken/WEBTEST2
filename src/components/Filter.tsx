"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React from "react";
import { Category } from "@/types"; // استيراد النوع

// واجهة جديدة للـ props
interface FilterProps {
  categories: Category[];
}

const Filter = ({ categories }: FilterProps) => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { replace } = useRouter();

  const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>) => {
    const { name, value } = e.target;
    const params = new URLSearchParams(searchParams);

    if (value) {
      params.set(name, value);
    } else {
      params.delete(name);
    }

    replace(`${pathname}?${params.toString()}`);
  };

  return (
    <div className="mt-12 flex justify-between">
      <div className="flex gap-6 flex-wrap">
        {/* فلتر النوع (يمكن أن يبقى ثابتًا) */}
        <select
          name="type"
          className="py-2 px-4 rounded-2xl text-xs font-medium bg-[#EBEDED]"
          onChange={handleFilterChange}
          defaultValue={searchParams.get("type") || ""}
        >
          <option value="">Type</option>
          <option value="physical">Physical</option>
          <option value="digital">Digital</option>
        </select>

        {/* فلتر السعر */}
        <input
          type="text"
          name="min"
          placeholder="min price"
          className="text-xs rounded-2xl pl-2 w-24 ring-1 ring-gray-400"
          onChange={handleFilterChange}
          defaultValue={searchParams.get("min") || ""}
        />
        <input
          type="text"
          name="max"
          placeholder="max price"
          className="text-xs rounded-2xl pl-2 w-24 ring-1 ring-gray-400"
          onChange={handleFilterChange}
          defaultValue={searchParams.get("max") || ""}
        />

        {/* --- فلتر الفئات الديناميكي --- */}
        <select
          name="cat"
          className="py-2 px-4 rounded-2xl text-xs font-medium bg-[#EBEDED]"
          onChange={handleFilterChange}
          defaultValue={searchParams.get("cat") || ""}
        >
          <option value="">Category</option>
          {categories.map((category) => (
            <option key={category._id} value={category.slug}>
              {category.name}
            </option>
          ))}
        </select>

        {/* فلتر "كل الفلاتر" (يمكن تطويره لاحقًا) */}
        <select
          name="all"
          className="py-2 px-4 rounded-2xl text-xs font-medium bg-[#EBEDED]"
          onChange={handleFilterChange}
        >
          <option>All Filters</option>
        </select>
      </div>

      {/* --- فلتر الترتيب --- */}
      <div className="">
        <select
          name="sort"
          className="py-2 px-4 rounded-2xl text-xs font-medium bg-white ring-1 ring-gray-400"
          onChange={handleFilterChange}
          defaultValue={searchParams.get("sort") || ""}
        >
          <option value="">Sort By</option>
          <option value="price.asc">Price (low to high)</option>
          <option value="price.desc">Price (high to low)</option>
          <option value="createdAt.desc">Newest</option>
          <option value="createdAt.asc">Oldest</option>
        </select>
      </div>
    </div>
  );
};

export default Filter;
