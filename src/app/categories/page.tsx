import { CategoryHero } from "@/components/sections/category-hero";
import { CategoryGrid } from "@/components/sections/category-grid";

export default function CategoriesPage() {
  return (
    <div className="min-h-screen bg-background">
      <CategoryHero />
      <CategoryGrid />
    </div>
  );
}
