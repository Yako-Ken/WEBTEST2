"use client";

import React, { useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

// هذا المكون سيلتف حول تطبيقك
const Providers = ({ children }: { children: React.ReactNode }) => {
  // نقوم بإنشاء نسخة جديدة من QueryClient
  // نستخدم useState لضمان أن يتم إنشاء العميل مرة واحدة فقط لكل عرض
  const [queryClient] = useState(() => new QueryClient());

  return (
    // نوفر العميل للتطبيق بأكمله
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  );
};

export default Providers;
