// src/app/dashboard/products/ProductTableClientWrapper.tsx
"use client";

import { useState, useEffect } from "react";
import { DataTable } from "@/components/DataTable";
import { columns } from "./columns";

interface ProductTableClientWrapperProps {
  products: any[];
  totalPages: number;
  page: number;
}

export default function ProductTableClientWrapper({
  products,
  totalPages,
  page,
}: ProductTableClientWrapperProps) {
  
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  // هذا هو "الحارس" الذي يمنع خطأ الترطيب
  if (!isClient) {
    // أثناء العرض على الخادم، أو قبل اكتمال الترطيب، اعرض هذا.
    // هذا الـ HTML بسيط ولا يستخدم أي hooks، لذلك لن يسبب عدم تطابق.
    return (
        <div className="w-full space-y-4 p-4">
            <div className="h-10 w-full bg-gray-200 rounded-md animate-pulse"></div>
            <div className="h-64 w-full bg-gray-200 rounded-md animate-pulse"></div>
            <div className="h-10 w-full bg-gray-200 rounded-md animate-pulse"></div>
        </div>
    );
  }

  // فقط بعد التأكد من أننا في المتصفح، نعرض الجدول الحقيقي.
  return (
    <DataTable
      totalPages={totalPages}
      page={page}
      columns={columns}
      data={products}
    />
  );
}
