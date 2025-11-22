// components/LayoutManager.tsx

"use client";

import { usePathname } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

// هذا المكون يلتف حول children ويقرر عرض Navbar/Footer
export default function LayoutManager({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const hideOnRoutes = ["/login", "/signup"];
  const shouldHide = hideOnRoutes.includes(pathname);

  return (
    <>
      {!shouldHide && <Navbar />}
      <main>{children}</main>
      {!shouldHide && <Footer />}
    </>
  );
}
