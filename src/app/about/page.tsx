"use client";

import { SectionHero } from "@/components/ui/section-hero";
import { motion } from "framer-motion";
import { ShieldCheck, Truck, Globe, Award } from "lucide-react";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background">
      <SectionHero 
        title="Our Story" 
        subtitle="We're on a mission to bring premium quality products to everyone, everywhere."
        gradient="from-purple-600 to-indigo-600"
      />

      <main className="container mx-auto px-4 py-24 space-y-32">
        {/* Mission Section */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-6">
            <h2 className="text-4xl font-black text-foreground">Defining the Future of Retail.</h2>
            <p className="text-lg text-slate-500 leading-relaxed">
              Founded in 2024, MYSTORE has grown from a small local boutique to a global leader in premium e-commerce. We believe that everyone deserves access to high-quality, authentic products that enhance their lifestyle.
            </p>
            <p className="text-lg text-slate-500 leading-relaxed">
              Our team of curators travels the world to find unique pieces that meet our rigorous standards for quality, sustainability, and design.
            </p>
          </div>
          <div className="relative">
            <img 
              src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&q=80&w=800" 
              alt="Our Team" 
              className="rounded-[40px] shadow-2xl"
            />
          </div>
        </section>

        {/* Values Section */}
        <section className="bg-slate-50 rounded-[60px] p-12 md:p-20">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-black text-foreground mb-4">Our Core Values</h2>
            <p className="text-slate-500">The principles that guide everything we do.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: ShieldCheck, title: "Authenticity", desc: "100% genuine products from verified brands." },
              { icon: Globe, title: "Sustainability", desc: "Committed to reducing our carbon footprint." },
              { icon: Truck, title: "Efficiency", desc: "Global shipping with lightning-fast delivery." },
              { icon: Award, title: "Quality", desc: "Meticulous attention to Every Detail." }
            ].map((value, i) => (
              <motion.div 
                key={i}
                whileHover={{ y: -10 }}
                className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100 space-y-4"
              >
                <div className="w-12 h-12 bg-indigo-50 text-indigo-600 rounded-2xl flex items-center justify-center">
                  <value.icon size={24} />
                </div>
                <h3 className="text-xl font-bold text-foreground">{value.title}</h3>
                <p className="text-slate-500 text-sm leading-relaxed">{value.desc}</p>
              </motion.div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
