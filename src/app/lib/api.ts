// src/lib/api.ts (النسخة الصحيحة والبسيطة)

import axios from 'axios';

const API_BASE_URL = 'https://ecommerce-backend-production-a014.up.railway.app';

// 1. نسخة للطلبات العامة (لا تحتاج توكن )
export const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// 2. نسخة للطلبات المحمية (تحتاج توكن)
export const axiosPrivate = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

// 3. إضافة معترض (Interceptor) للنسخة المحمية فقط
// هذا المعترض سيضيف التوكن من localStorage قبل إرسال أي طلب
axiosPrivate.interceptors.request.use(
  (config) => {
    // حاول قراءة بيانات المصادقة من localStorage
    const authString = localStorage.getItem('auth');
    if (authString) {
      const auth = JSON.parse(authString);
      const token = auth?.accessToken;

      if (token) {
        // إذا وجدنا التوكن، أضفه إلى الـ headers
        config.headers['Authorization'] = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// (اختياري ولكن مهم): يمكنك إضافة معترض للاستجابة هنا لاحقًا
// للتعامل مع انتهاء صلاحية التوكن وتحديثه تلقائيًا
