"use client";

import { SectionHero } from "@/components/ui/section-hero";
import AllProducts from "@/components/myProducts/page";

export default function ProductsPage() {
  return (
    <div className="min-h-screen bg-background">
      <SectionHero 
        title="Our Collection" 
        subtitle="Explore our curated selection of premium products across fashion, electronics, and luxury jewelry."
        gradient="from-indigo-600 to-blue-600"
      />
      
      <main className="container mx-auto px-4 py-20">
        <AllProducts />
      </main>
    </div>
  );
}
