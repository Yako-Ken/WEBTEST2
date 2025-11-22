// src/context/AuthProvider.tsx

"use client";
import React, { useState, createContext, useContext, useEffect } from "react";

// تعريف الأنواع لتحسين القراءة
interface User {
  name: string;
  // أضف أي خصائص أخرى للمستخدم هنا
}

interface AuthState {
  accessToken: string;
  user: User | null;
}

interface AuthContextType {
  auth: AuthState | null | undefined; // 1. السماح بـ `undefined` للحالة الأولية
  setAuth: React.Dispatch<React.SetStateAction<AuthState | null>>;
  isLoading: boolean; // 2. إضافة حالة التحميل
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  // 3. ابدأ بـ `undefined` لتمييز الحالة الأولية عن "غير مسجل" (`null`)
  const [auth, setAuth] = useState<AuthState | null | undefined>(undefined);
  const [isLoading, setIsLoading] = useState(true); // 4. ابدأ التحميل بـ `true`

  // 🌟 استرجاع البيانات من localStorage عند أول تحميل
  useEffect(() => {
    try {
      const savedAuth = localStorage.getItem("auth");
      if (savedAuth) {
        setAuth(JSON.parse(savedAuth));
      } else {
        setAuth(null); // إذا لم يكن هناك شيء، قم بتعيينه إلى `null` صراحة
      }
    } catch (error) {
      console.error("Failed to parse auth from localStorage", error);
      setAuth(null); // في حالة وجود خطأ، اعتبر المستخدم غير مسجل
    } finally {
      setIsLoading(false); // 5. الأهم: قم بإنهاء التحميل بعد الانتهاء
    }
  }, []);

  // 🌟 كل مرة auth يتغير (بعد التحميل الأولي) → خزنه في localStorage
  useEffect(() => {
    // لا تقم بالتخزين أثناء التحميل الأولي
    if (!isLoading) {
      if (auth) {
        localStorage.setItem("auth", JSON.stringify(auth));
      } else {
        localStorage.removeItem("auth");
      }
    }
  }, [auth, isLoading]);

  // 6. أضف `isLoading` إلى القيمة التي يتم توفيرها
  const value = { auth, setAuth, isLoading };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export default AuthContext;
