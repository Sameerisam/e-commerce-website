


import { ArrowRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import { MotionDiv } from "../ui/motions";
import { NextLink } from "../ui/next-link";

export function ClothingSection() {
  return (
    <section id="clothing" className="pt-18 bg-slate-50 relative overflow-hidden">
      {/* Decorative Text background */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none select-none overflow-hidden opacity-[0.03] flex items-center justify-center">
         <span className="text-[20vw] font-black uppercase tracking-tighter leading-none">FASHION</span>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-end gap-10 mb-20">
          <div className="space-y-4 max-w-2xl">
            <span className="text-indigo-600 font-black text-xs uppercase tracking-[0.4em] flex items-center gap-2">
              <div className="w-8 h-[2px] bg-indigo-600" />
              Style & Substance
            </span>
            <h2 className="text-5xl md:text-6xl font-black text-slate-900 tracking-tight leading-[1.1]">
              Redefining Modern <br /> 
              <span className="italic text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">Wardrobes.</span>
            </h2>
          </div>
          <p className="text-slate-500 font-medium max-w-sm text-lg leading-relaxed">
            Discover the harmony of premium fabrics and contemporary design tailored for the modern individual.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* Men's Collection */}
          <MotionDiv 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="group relative h-[700px] rounded-[48px] overflow-hidden shadow-2xl"
          >
            <img 
              src="https://images.unsplash.com/photo-1490578474895-699cd4e2cf59?auto=format&fit=crop&q=80&w=1200" 
              alt="Men's Fashion" 
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />
            
            <div className="absolute inset-0 p-12 flex flex-col justify-end items-start text-white">
               <div className="flex items-center gap-3 mb-6">
               </div>
               <h3 className="text-5xl font-black mb-4 tracking-tighter italic">Alpha Collective</h3>
               <p className="text-slate-200 text-lg mb-8 max-w-sm font-medium">
                  Sharp silhouettes and effortless essentials for the discerning man.
               </p>
               <Button asChild size="lg" className="h-16 px-10 rounded-2xl bg-white text-slate-900 hover:bg-slate-900 hover:text-white transition-all font-black text-xs uppercase tracking-widest">
                  <NextLink href="/products?category=men's clothing">
                    Shop Men's <ArrowRight size={16} className="ml-2" />
                  </NextLink>
               </Button>
            </div>
          </MotionDiv>

          {/* Women's Collection */}
          <MotionDiv 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="group relative h-[700px] rounded-[48px] overflow-hidden shadow-2xl"
          >
            <img 
              src="https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&q=80&w=1200" 
              alt="Women's Fashion" 
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />
            
            <div className="absolute inset-0 p-12 flex flex-col justify-end items-start text-white">
               <div className="flex items-center gap-3 mb-6">
               </div>
               <h3 className="text-5xl font-black mb-4 tracking-tighter italic">Luxe Horizon</h3>
               <p className="text-slate-200 text-lg mb-8 max-w-sm font-medium">
                  Ethereal designs and timeless elegance for every woman's story.
               </p>
               <Button asChild size="lg" className="h-16 px-10 rounded-2xl bg-white text-slate-900 hover:bg-slate-900 hover:text-white transition-all font-black text-xs uppercase tracking-widest">
                  <NextLink href="/products?category=women's clothing">
                    Shop Women's <ArrowRight size={16} className="ml-2" />
                  </NextLink>
               </Button>
            </div>
          </MotionDiv>
        </div>

        {/* Featured Mini Grid */}
        <div className="mt-24 text-center space-y-12">
           <h4 className="text-2xl font-black text-slate-900 tracking-tight">Curated Essentials</h4>
           <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-8">
              {[
                { title: "Urban Bomber", price: "$145", img: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?auto=format&fit=crop&q=80&w=600" },
                { title: "Evening Gown", price: "$320", img: "https://images.unsplash.com/photo-1566174053879-31528523f8ae?auto=format&fit=crop&q=80&w=600" },
                { title: "Structured Blazer", price: "$289", img: "https://images.unsplash.com/photo-1548142813-c348350df52b?auto=format&fit=crop&q=80&w=600" },
                { title: "Tailored Trousers", price: "$160", img: "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?auto=format&fit=crop&q=80&w=600" }
              ].map((item, i) => (
                <MotionDiv 
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  whileHover={{ y: -10 }}
                  className="space-y-4 group cursor-pointer"
                >
                  <div className="aspect-[4/5] rounded-3xl overflow-hidden bg-white shadow-xl">
                    <img src={item.img} alt={item.title} className="w-full h-full object-cover grayscale-0 group-hover:grayscale-[0.5] transition-all duration-500" />
                  </div>
                  <div className="flex flex-col items-center">
                    <span className="text-slate-400 text-[10px] font-black uppercase tracking-widest mb-1">Limited Edition</span>
                    <h5 className="font-bold text-slate-900">{item.title}</h5>
                    <p className="text-indigo-600 font-black text-sm">{item.price}</p>
                  </div>
                </MotionDiv>
              ))}
           </div>
           
           <div className="pt-10">
              <Button asChild variant="outline" className="h-14 px-12 rounded-xl border-2 border-slate-200 hover:border-indigo-600 hover:text-indigo-600 transition-all font-black text-xs uppercase tracking-widest">
                 <NextLink href="/products">View Entire Collection</NextLink>
              </Button>
           </div>
        </div>
      </div>
    </section>
  );
}
