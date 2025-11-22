// في ملف src/components/ProtectedRoute.tsx

"use client";

import { useAuth } from "@/app/context/AuthProvider";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { auth, isLoading } = useAuth(); // احصل على isLoading من السياق
  const router = useRouter();

  useEffect(() => {
    if (isLoading) {
      return; // انتظر حتى ينتهي التحميل
    }

    if (!auth?.user) {
      router.replace("/login"); // إذا لم يكن هناك مستخدم، أعد التوجيه
    }
  }, [auth, isLoading, router]);

  // إذا كان لا يزال يتم التحميل، أو إذا لم يكن المستخدم مسجلاً، اعرض شاشة تحميل
  if (isLoading || !auth?.user) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-xl">Loading...</p>
      </div>
    );
  }

  // إذا تم التحقق بنجاح، اعرض المحتوى المحمي
  return <>{children}</>;
}
