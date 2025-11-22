// src/app/dashboard/page.tsx

"use client";

import React from "react";
import { useAuth } from "../context/AuthProvider"; // تأكد من المسار الصحيح
import MaxWidthWrapper from "../../components/defaults/MaxWidthWrapper";
import ProtectedRoute from "../../components/ProtectedRoute"; // 1. استيراد الحارس

const Page = () => {
  const { auth } = useAuth();

  return (
    // 2. تغليف كل شيء داخل الحارس
    <ProtectedRoute>
      <MaxWidthWrapper >
        {/* هذا المحتوى لن يتم عرضه إلا للمستخدمين المسجلين */}
        <h2 className="text-black font-bold text-4xl">
          Welcome, {auth?.user?.name}!
        </h2>
        <p className="mt-4">This is your protected dashboard.</p>
      </MaxWidthWrapper>
    </ProtectedRoute>
  );
};

export default Page;
