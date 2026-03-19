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
          <div className="grid grid-cols-2 xs:grid-cols-3 sm:flex sm:flex-wrap gap-2 sm:gap-3 w-full sm:w-auto">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-3 sm:px-6 py-2.5 sm:py-3 rounded-[18px] sm:rounded-2xl text-[11px] sm:text-sm font-black uppercase tracking-wider transition-all duration-300 transform active:scale-95 text-center ${
                  activeCategory === category
                    ? "bg-indigo-600 text-white shadow-xl shadow-indigo-100 -translate-y-0.5 sm:-translate-y-1"
                    : "bg-white border border-slate-100 text-slate-500 hover:bg-slate-50 hover:text-indigo-600 hover:border-indigo-100"
                } ${category === "All Items" ? "col-span-2 xs:col-span-3 sm:col-span-1" : ""}`}
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
