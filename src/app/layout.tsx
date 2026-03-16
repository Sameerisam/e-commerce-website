import { Metadata } from "next";
import "./globals.css";
import { Navbar } from '@/components/layout/navbar';

import 'bootstrap-icons/font/bootstrap-icons.css'
import { ConditionalFooter } from "@/components/layout/conditional-footer";
import ReduxProvider from "@/redux/ReduxProvider";
import { Geist } from "next/font/google";
import { cn } from "@/lib/utils";

const geist = Geist({subsets:['latin'],variable:'--font-sans'});

export const metadata: Metadata = {
  title: "MYSTORE | Premium E-commerce Experience",
  description: "Explore curated collections of luxury fashion, cutting-edge electronics, and timeless jewelry. Experience the future of premium retail with MYSTORE.",
  icons: {
    icon: "/favicon.ico",
  },
  keywords: ["E-commerce", "Luxury Fashion", "Electronics", "Premium Jewelry", "Shop Online", "MYSTORE"],
  openGraph: {
    title: "MYSTORE | Premium E-commerce",
    description: "Your ultimate destination for curated luxury and high-performance products.",
    images: ["/og-image.jpg"], // Placeholder for future OG image
  }
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning className={cn("font-sans", geist.variable)}>
      <head>
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.8/dist/css/bootstrap.min.css" rel="stylesheet" />
        <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.8/dist/js/bootstrap.bundle.min.js" async />
      </head>

      <body>
        <ReduxProvider>
          <Navbar />
          <main className="pt-[6rem]">
            {children}
          </main>
          <ConditionalFooter />
        </ReduxProvider>
      </body>
    </html>
  );
}

