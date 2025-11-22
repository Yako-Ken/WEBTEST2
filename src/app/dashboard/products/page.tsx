// src/app/dashboard/products/page.tsx

import Fetcher from "@/components/Fetcher";
import MaxWidthWrapper from "@/components/defaults/MaxWidthWrapper";
import ProductTableClientWrapper from "./ProductTableClientWrapper"; // 1. استيراد المكون الجديد

interface SearchParams {
  limit?: string;
  page?: string;
}

interface ProductsPageProps {
  searchParams: Promise<SearchParams>;
}

export default async function ProductsPage({ searchParams: searchParamsPromise }: ProductsPageProps) {
  const actualSearchParams = await searchParamsPromise;

  const limit = actualSearchParams?.limit || "10";
  const page = actualSearchParams?.page || "1";
  const pageAsNumber = parseInt(page, 10);

  return (
    <MaxWidthWrapper>
      <h1 className="text-2xl font-bold mb-4">Products</h1>
      
      {/* 2. استخدام Fetcher لجلب البيانات على الخادم */}
      <Fetcher
        resourceName="products"
        queryParams={new URLSearchParams({ limit, page })}
        tags={[`products-page-${page}`]}
      >
        {/* 3. تمرير البيانات التي تم جلبها إلى المكون الغلاف الخاص بالعميل */}
        {({ data: { docs }, totalPages }) => (
          <ProductTableClientWrapper
            products={docs}
            totalPages={totalPages}
            page={pageAsNumber}
          />
        )}
      </Fetcher>
    </MaxWidthWrapper>
  );
}