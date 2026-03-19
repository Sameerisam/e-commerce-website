"use client";

import { Star, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { MotionDiv, MotionH1, MotionP } from "../ui/motions";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import NextLink from "next/link";
import Image from "next/image";

export function ProductHero() {
  const { isLoggedIn } = useSelector((state: RootState) => state.user);

  return (
    <section className="relative pt-32 pb-0 overflow-hidden bg-slate-50 mt-[-6rem]" style={{ background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)' }}>
      {/* Background Dot Patterns */}
      <div className="absolute top-40 left-10 w-64 h-64 opacity-10 pointer-events-none transform -rotate-12">
        <div className="grid grid-cols-10 gap-3">
          {[...Array(100)].map((_, i) => (
            <div key={i} className="w-1 h-1 bg-indigo-600 rounded-full" />
          ))}
        </div>
      </div>
      <div className="absolute bottom-40 right-10 w-64 h-64 opacity-10 pointer-events-none transform rotate-12">
        <div className="grid grid-cols-10 gap-3">
          {[...Array(100)].map((_, i) => (
            <div key={i} className="w-1 h-1 bg-indigo-600 rounded-full" />
          ))}
        </div>
      </div>

      <div className="container mx-auto px-4 relative z-10 text-center">
        {/* Ratings */}
        <MotionDiv
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col items-center gap-3 mb-8 pt-10"
        >
          <div className="flex text-indigo-600 gap-1.5">
            {[...Array(5)].map((_, i) => <Star key={i} size={18} fill="currentColor" />)}
          </div>
          <span className="text-[12px] font-black uppercase tracking-[0.4em] text-slate-500">
            102+ Premium Collections
          </span>
        </MotionDiv>

        {/* Headline */}
        <MotionH1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-5xl md:text-7xl lg:text-8xl font-black text-slate-900 leading-[1.05] tracking-tighter mb-8 max-w-6xl mx-auto"
        >
          The Ultimate Choice for <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">Premium Lifestyle.</span>
        </MotionH1>

        <MotionP 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-lg md:text-xl text-slate-600 max-w-3xl mx-auto mb-12 leading-relaxed font-medium"
        >
          Explore our curated selection across fashion, technology, and luxury jewelry. 
          Professional quality products delivered right to your doorstep.
        </MotionP>

        {/* Action Buttons */}
        <MotionDiv 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="flex flex-wrap justify-center items-center gap-6 mb-24"
        >
          <Button asChild size="lg" className="h-16 px-10 rounded-full bg-indigo-600 text-white hover:text-indigo-600 border-2 border-transparent hover:border-indigo-600 transition-all text-lg font-bold shadow-2xl shadow-indigo-200">
            <NextLink href={isLoggedIn ? "/delivery_Information" : "/login"}>
              Get Started
            </NextLink>
          </Button>
      
        </MotionDiv>

        {/* Image Gallery Layout - Sophia Structure */}
        <div className="relative max-w-6xl mx-auto px-4 md:px-0">
          {/* Main Arch Image */}
          <MotionDiv 
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="relative aspect-[16/10] md:aspect-[21/9] w-full bg-white rounded-t-[300px] md:rounded-t-[500px] overflow-hidden border-[10px] md:border-[20px] border-white shadow-[0_-20px_60px_-15px_rgba(0,0,0,0.1)]"
          >
            <Image 
              src="/men_cloth.png" 
              alt="Premium Men's Fashion" 
              fill
              className="object-cover"
              priority
            />
          </MotionDiv>

          {/* Floating Circles */}
          <MotionDiv 
            animate={{ y: [0, -25, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -top-12 -left-4 md:-left-24 w-32 h-32 md:w-56 md:h-56 rounded-full border-[6px] md:border-[12px] border-white shadow-2xl overflow-hidden z-20 group"
          >
             <div className="absolute inset-0 bg-indigo-600/10 group-hover:bg-indigo-600/0 transition-colors z-10" />
             <Image src="/hero_jewelry.png" alt="Jewelry" width={224} height={224} className="w-full h-full object-cover scale-110 group-hover:scale-125 transition-transform duration-700" />
             <div className="absolute bottom-4 left-0 right-0 text-center z-20">
                <span className="bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-[10px] font-black text-indigo-600 uppercase">Jewelry</span>
             </div>
          </MotionDiv>

          <MotionDiv 
            animate={{ y: [0, 25, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1 }}
            className="absolute top-20 -right-4 md:-right-24 w-28 h-28 md:w-52 md:h-52 rounded-full border-[6px] md:border-[12px] border-white shadow-2xl overflow-hidden z-20 group"
          >
             <div className="absolute inset-0 bg-indigo-600/10 group-hover:bg-indigo-600/0 transition-colors z-10" />
             <Image src="/hero_tech.png" alt="Technology" width={208} height={208} className="w-full h-full object-cover scale-110 group-hover:scale-125 transition-transform duration-700" />
             <div className="absolute bottom-4 left-0 right-0 text-center z-20">
                <span className="bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-[10px] font-black text-indigo-600 uppercase">Gadgets</span>
             </div>
          </MotionDiv>

          <MotionDiv 
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
            className="absolute bottom-20 -right-16 md:-right-48 w-24 h-24 md:w-44 md:h-44 rounded-full border-[5px] md:border-[10px] border-white shadow-2xl overflow-hidden z-20 hidden lg:block group"
          >
             <div className="absolute inset-0 bg-indigo-600/10 group-hover:bg-indigo-600/0 transition-colors z-10" />
             <Image src="/hero_fashion.png" alt="Fashion" width={176} height={176} className="w-full h-full object-cover scale-110 group-hover:scale-125 transition-transform duration-700" />
             <div className="absolute bottom-4 left-0 right-0 text-center z-20">
                <span className="bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-[10px] font-black text-indigo-600 uppercase">Clothing</span>
             </div>
          </MotionDiv>
        </div>
      </div>
    </section>
  );
}
