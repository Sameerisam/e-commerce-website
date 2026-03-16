import { HeroSection } from "@/components/sections/hero-section";
import { ProductGrid } from "@/components/sections/product-grid";
import { JewelrySection } from "@/components/sections/jewelry-section";
import { ClothingSection } from "@/components/sections/clothing-section";
import { NewsletterSection } from "@/components/sections/newsletter-section";

export default function Home() {
  const categories = ["All Items", "Electronics", "Jewelry", "Men's Clothing", "Women's Clothing"];

  return (
    <div className="bg-background text-foreground w-full">
      <HeroSection />
      <ProductGrid categories={categories} />
      <JewelrySection />     
      <ClothingSection />
      <NewsletterSection />
    </div>
  );
}
