"use client";

import { useState } from "react";
import AllProducts from "@/components/myProducts/page";
import { Shirt, Heart, Diamond, Laptop } from "lucide-react";

export function ProductList() {
  const [activeTab, setActiveTab] = useState("All Items");

  return (
    <>
      <section className="bg-white py-14 border-b border-slate-100">
        <div className="container mx-auto px-4">
          <div className="flex flex-col items-center">
             <div className="flex flex-wrap justify-center items-center gap-10 md:gap-20 opacity-50 grayscale hover:grayscale-0 transition-all duration-700">
                <div className="flex items-center gap-3 font-black text-sm tracking-widest text-slate-900">
                   <Shirt size={20} className="text-indigo-600" /> MEN'S WEAR
                </div>
                <div className="flex items-center gap-3 font-black text-sm tracking-widest text-slate-900">
                   <Heart size={20} className="text-indigo-600" /> WOMEN'S WEAR
                </div>
                <div className="flex items-center gap-3 font-black text-sm tracking-widest text-slate-900">
                   <Diamond size={20} className="text-indigo-600" /> LUXE JEWELS
                </div>
                <div className="flex items-center gap-3 font-black text-sm tracking-widest text-slate-900">
                   <Laptop size={20} className="text-indigo-600" /> TECH HUB
                </div>
             </div>
          </div>
        </div>
      </section>

      <main className="container mx-auto px-4 py-24">
        <div className="flex flex-col md:flex-row justify-between items-end gap-10 mb-20 border-l-4 border-indigo-600 pl-8">
          <div className="space-y-3">
            <span className="text-indigo-600 font-black text-xs uppercase tracking-[0.4em]">Curated Picks</span>
            <h2 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight">Browse Our Collection</h2>
          </div>
          
          <div className="flex flex-wrap gap-3">
            {["All Items", "Electronics", "Jewelry", "Men's Clothing", "Women's Clothing"].map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveTab(cat)}
                className={`px-7 py-3 rounded-2xl text-xs font-black uppercase tracking-widest transition-all duration-300 ${
                  activeTab === cat 
                  ? "bg-indigo-600 text-white shadow-xl shadow-indigo-100 -translate-y-1" 
                  : "bg-white border border-slate-200 text-slate-500 hover:border-indigo-600 hover:text-indigo-600"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <AllProducts selectedCategory={activeTab} />
      </main>
    </>
  );
}
