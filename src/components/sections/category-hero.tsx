

import {NextLink }from "@/components/ui/next-link"
import { ArrowRight, ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { MotionDiv } from "../ui/motions";

export function CategoryHero() {
  return (
    <section className="relative pt-44 pb-32 overflow-hidden mt-[-6rem]" style={{ background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)' }}>
      {/* Background Effects */}
      <div className="absolute inset-0 z-0 text-white">
         <div className="absolute top-0 right-0 w-[60%] h-full bg-indigo-600/5 skew-x-12 transform translate-x-20" />
         <div className="absolute top-1/2 left-0 w-96 h-96 bg-indigo-500/10 rounded-full blur-[120px] -translate-y-1/2 -translate-x-1/2" />
      </div>

      <div className="container mx-auto px-6 relative z-10 text-white">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          {/* Left Content */}
          <MotionDiv 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-600/10 backdrop-blur-md border border-indigo-600/20">
               <ShoppingBag size={16} className="text-indigo-600" />
               <span className="text-xs font-black uppercase tracking-[0.2em] text-indigo-600">Full Collection</span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-black text-slate-900 leading-[1.1] tracking-tighter">
              Explore Our <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600 italic">Product Categories</span>
            </h1>
            
            <p className="text-lg md:text-xl text-slate-600 max-w-xl leading-relaxed font-medium">
              Dive into our meticulously curated collections. From high-end fashion to cutting-edge technology, discover everything you need to elevate your lifestyle.
            </p>
            
            <div className="flex flex-wrap gap-6 pt-4">
              
              <NextLink href="/products" className="flex items-center gap-3 text-lg font-bold text-slate-900 group hover:text-indigo-600 transition-colors">
                Start Shopping <ArrowRight className="group-hover:translate-x-2 transition-transform" />
              </NextLink>
            </div>
          </MotionDiv>

          {/* Right Image */}
          <MotionDiv 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="relative aspect-square lg:aspect-[4/3] rounded-[48px] overflow-hidden border-[12px] border-white/5 shadow-2xl"
          >
            <img 
              src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&q=80&w=1200" 
              alt="Branded Lifestyle" 
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 to-transparent" />
          </MotionDiv>
        </div>
      </div>
    </section>
  );
}
