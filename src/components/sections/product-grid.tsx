"use client";

import { useState } from "react";
import AllProducts from "../myProducts/page";
import { MotionDiv } from "../ui/motions";

interface ProductGridProps {
  categories: string[];
}

export function ProductGrid({ categories }: ProductGridProps) {
  const [activeCategory, setActiveCategory] = useState("All Items");

  return (
    <section id="featured" className="py-18">
      <div className="container mx-auto px-4">
        <MotionDiv 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16"
        >
          <div className="space-y-4">
            <span className="text-indigo-600 font-black text-sm uppercase tracking-widest flex items-center gap-2">
              <MotionDiv 
                initial={{ width: 0 }}
                whileInView={{ width: 40 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="h-[2px] bg-indigo-600" 
              /> 
              Our Picks
            </span>
            <h2 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight">
              Featured Products
            </h2>
          </div>
          <div className="flex flex-wrap gap-3">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-6 py-3 rounded-2xl text-sm font-bold transition-all duration-300 transform active:scale-95 ${
                  activeCategory === category
                    ? "bg-indigo-600 text-white shadow-xl shadow-indigo-200 -translate-y-1"
                    : "bg-white border border-slate-200 text-slate-600 hover:bg-slate-50 hover:border-indigo-200"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </ MotionDiv>

        <AllProducts selectedCategory={activeCategory} />
      </div>
    </section>
  );
}
