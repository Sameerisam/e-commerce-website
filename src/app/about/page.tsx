import { AboutHero } from "@/components/sections/about-hero";
import { AboutSections } from "@/components/sections/about-sections";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background">
      <AboutHero />
      <AboutSections />
    </div>
  );
}
