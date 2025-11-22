import "./globals.css";
import { Inter } from "next/font/google";
import { AuthProvider } from "../app/context/AuthProvider";
import LayoutManager from "@/components/LayoutManager";
import { Toaster } from "react-hot-toast";
import Providers from "@/components/Providers"; // <-- 1. استيراد المزود الجديد

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "WEB-TEST",
  description: "A complete e-commerce application with Next.js and Wix",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {/* 2. لف كل شيء داخل AuthProvider بالمزود الجديد */}
        <AuthProvider>
          <Providers>
            <LayoutManager>
              <Toaster position="top-center" reverseOrder={false} />
              <main>{children}</main>
            </LayoutManager>
          </Providers>
        </AuthProvider>
      </body>
    </html>
  );
}
