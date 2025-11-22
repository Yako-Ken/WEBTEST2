// hooks/useRedirectIfAuthenticated.ts

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../context/AuthProvider'; // تأكد من أن المسار صحيح

/**
 * A custom hook that redirects the user to a specified path if they are already authenticated.
 * @param {string} redirectPath - The path to redirect to if the user is authenticated. Defaults to '/'.
 */
export const useRedirectIfAuthenticated = (redirectPath: string = '/') => {
  const { auth } = useAuth();
  const router = useRouter();

  useEffect(() => {
    // =================== التعديل هنا ===================
    // استخدم `auth?.accessToken` بدلاً من `auth.accessToken`
    // هذا يعني: "إذا كان auth موجودًا، حاول الوصول إلى accessToken. وإلا، توقف."
    if (auth?.accessToken) {
      console.log("User is authenticated. Redirecting...");
      router.push(redirectPath);
    }
    // =================================================

  // تحديث الاعتماديات لتشمل كائن auth بأكمله
  }, [auth, router, redirectPath]); 
};
