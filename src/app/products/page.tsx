import { ProductHero } from "@/components/sections/product-hero";
import { ProductList } from "@/components/sections/product-list";

export default function ProductsPage() {
  return (
    <div className="min-h-screen bg-background">
      <ProductHero />
      <ProductList />
    </div>
  );
}
