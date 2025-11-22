// src/app/dashboard/categories/CategoryTableClientWrapper.tsx
"use client";

import { useState, useEffect } from "react";
import { DataTable } from "@/components/DataTable";
import { columns } from "./columns"; // سيتم استيراد أعمدة الفئات

interface CategoryTableClientWrapperProps {
  categories: any[]; // يمكنك تحسين هذا النوع لاحقًا
}

export default function CategoryTableClientWrapper({
  categories,
}: CategoryTableClientWrapperProps) {
  
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    // اعرض مكون تحميل مؤقت لمنع خطأ الترطيب
    return (
        <div className="w-full space-y-4 p-4">
            <div className="h-10 w-full bg-gray-200 rounded-md animate-pulse"></div>
            <div className="h-64 w-full bg-gray-200 rounded-md animate-pulse"></div>
        </div>
    );
  }

  // بعد التأكد من أننا في المتصفح، اعرض الجدول الحقيقي
  return (
    <DataTable
      columns={columns}
      data={categories}
    />
  );
}
