"use client";

import { SectionHero } from "@/components/ui/section-hero";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

const categories = [
  {
    title: "Electronics",
    desc: "Next-gen gadgets, smart home tech, and professional gear.",
    image: "https://images.unsplash.com/photo-1498049794561-7780e7231661?auto=format&fit=crop&q=80&w=800",
    href: "/products?category=electronics",
    color: "from-blue-600 to-indigo-600"
  },
  {
    title: "Jewelry",
    desc: "Exquisite diamonds, gold, and timeless luxury pieces.",
    image: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&q=80&w=800",
    href: "/products?category=jewelery",
    color: "from-amber-500 to-orange-600"
  },
  {
    title: "Men's Clothing",
    desc: "Modern fashion, premium fabrics, and essential styles.",
    image: "https://images.unsplash.com/photo-1490578474895-699cd4e2cf59?auto=format&fit=crop&q=80&w=800",
    href: "/products?category=men's clothing",
    color: "from-slate-700 to-slate-900"
  },
  {
    title: "Women's Clothing",
    desc: "Elegant apparel, trend-setting designs, and comfort.",
    image: "https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&q=80&w=800",
    href: "/products?category=women's clothing",
    color: "from-pink-500 to-rose-600"
  }
];

export default function CategoriesPage() {
  return (
    <div className="min-h-screen bg-background">
      <SectionHero 
        title="Browse Categories" 
        subtitle="Discover our diverse range of products organized for your shopping convenience."
        gradient="from-indigo-600 to-purple-600"
      />

      <main className="container mx-auto px-4 py-24">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {categories.map((cat, i) => (
            <motion.div
              key={i}
              whileHover={{ y: -10 }}
              className="group relative h-[400px] rounded-[40px] overflow-hidden shadow-2xl shadow-indigo-100/20"
            >
              <img 
                src={cat.image} 
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" 
                alt={cat.title}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent opacity-80" />
              
              <div className="absolute inset-0 p-12 flex flex-col justify-end items-start text-white space-y-4">
                <span className={`px-4 py-1 rounded-full bg-gradient-to-r ${cat.color} text-xs font-black uppercase tracking-widest`}>
                  Premium
                </span>
                <h2 className="text-4xl font-black">{cat.title}</h2>
                <p className="text-slate-200 max-w-sm">{cat.desc}</p>
                <Link 
                  href={cat.href}
                  className="inline-flex items-center gap-2 font-bold group/link"
                >
                  Explore Collection 
                  <ArrowRight size={20} className="group-hover/link:translate-x-2 transition-transform" />
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </main>
    </div>
  );
}
