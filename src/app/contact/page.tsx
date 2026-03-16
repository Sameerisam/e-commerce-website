import { ContactHero } from "@/components/sections/contact-hero";
import { ContactSections } from "@/components/sections/contact-sections";



export default function ContactPage() {
  return (
    <div className="min-h-screen bg-background">
      <ContactHero />
      <ContactSections />
    </div>
  );
}
