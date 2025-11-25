"use client"; // ✅ 1. نجعله مكون عميل بشكل صريح

import React, { useEffect, useState } from "react";
import { fetchData } from "@/app/actions/Server"; // ✅ 2. نستورد دالة fetchData الحالية
import CategoryList from "./CategoryList";
import { Category } from "@/types"; // تأكد من أن هذا هو النوع الصحيح

const Categories = () => {
  // ✅ 3. نستخدم useState و useEffect لجلب البيانات في المتصفح
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getCategories = async () => {
      try {
        const res = await fetchData({
          resourceName: "categories",
        });
        setCategories(res?.data?.docs || []);
      } catch (error) {
        console.error("Failed to fetch categories:", error);
      } finally {
        setLoading(false);
      }
    };

    getCategories();
  }, []); // يتم تشغيله مرة واحدة عند تحميل المكون

  // يمكنك عرض رسالة تحميل أثناء جلب البيانات
  if (loading) {
    return <div>Loading...</div>;
  }

  // ✅ 4. بعد جلب البيانات، نقوم بتمريرها إلى CategoryList
  return <CategoryList categories={categories} />;
};

export default Categories;
