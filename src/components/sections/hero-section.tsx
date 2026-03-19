import { ArrowRight, Sparkles, TrendingUp, ShieldCheck } from "lucide-react";
import Image from "next/image";

import { Button } from "@/components/ui/button";
import { MotionDiv, MotionH1, MotionP } from "../ui/motions";

const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.8, ease: "easeOut" }
};

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1
    }
  }
};

export function HeroSection() {
  return (
        <section className="min-h-screen flex items-center overflow-hidden mt-[-6rem] pt-24" style={{ background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)' }}>
      {/* Abstract Background Shapes */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-indigo-50/10 rounded-l-[100px] -z-10" />
      
      <MotionDiv
        animate={{ scale: [1, 1.1, 1], rotate: [0, 5, 0] }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        className="absolute -top-24 -left-24 w-96 h-96 bg-indigo-200/40 rounded-full blur-3xl -z-10"
      />

      <div className="w-full px-4 md:px-8 xl:px-20 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20 justify-center h-full max-w-[1600px] mx-auto">
          
          {/* Left Content Column */}
          <MotionDiv
            variants={staggerContainer}
            initial="initial"
            animate="animate"
            className="flex-1 space-y-4 md:space-y-6 text-center lg:text-left z-20"
          >
            <MotionDiv 
              variants={fadeInUp} 
              className="inline-flex items-center gap-2 px-5 py-2 mt-2 rounded-full bg-white/80 backdrop-blur-md border border-indigo-100 text-indigo-700 font-bold text-[10px] md:text-xs uppercase tracking-[0.15em] shadow-sm"
            >
              <Sparkles size={14} className="animate-pulse " />
              <span>New Collection 2026</span>
            </MotionDiv>

            <MotionH1 
              variants={fadeInUp} 
              className="text-[2.75rem] sm:text-7xl md:text-8xl lg:text-[5rem] xl:text-[6rem] font-bold text-slate-900 leading-[1] tracking-[-0.04em]"
            >
             Shop smarter<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-violet-600 to-indigo-800">
                Live better
              </span>
            </MotionH1>

            <MotionP 
              variants={fadeInUp} 
              className="text-lg md:text-xl text-slate-500 font-medium leading-relaxed max-w-lg mx-auto lg:mx-0"
            >
              Shop the latest trends in technology, fashion, and lifestyle. Premium quality products delivered right to your doorstep.
            </MotionP>

            <MotionDiv variants={fadeInUp} className="flex flex-col sm:flex-row gap-4 pt-4 justify-center lg:justify-start">
              <Button 
                href="/products" 
                size="lg" 
                className="h-16 px-12 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-lg text-white font-bold shadow-2xl shadow-indigo-100 transition-all hover:-translate-y-1 active:scale-95 w-full sm:w-auto"
              >
                Shop Now <ArrowRight size={20} className="ml-2" />
              </Button>
              <Button 
                href="/categories" 
                size="lg" 
                variant="outline"
                className="h-16 px-12 rounded-2xl border-2 border-slate-200 bg-white text-indigo-600 hover:bg-slate-50 text-lg font-bold shadow-xl shadow-slate-100 transition-all hover:-translate-y-1 active:scale-95 w-full sm:w-auto"
              >
                Explore Categories
              </Button>
            </MotionDiv>

            <MotionDiv variants={fadeInUp} className="pt-8 flex items-center justify-center lg:justify-start gap-8 border-t border-slate-100">
              <div className="flex flex-col">
                <span className="text-3xl md:text-4xl font-black text-slate-900 leading-none">50k+</span>
                <span className="text-xs text-slate-400 font-bold uppercase tracking-wider mt-1">Users</span>
              </div>
              <div className="w-[1px] h-10 bg-slate-200" />
              <div className="flex flex-col">
                <span className="text-3xl md:text-4xl font-black text-slate-900 leading-none">120+</span>
                <span className="text-xs text-slate-400 font-bold uppercase tracking-wider mt-1">Brands</span>
              </div>
            </MotionDiv>
          </MotionDiv>

          {/* Right Visual Column - Increased Width */}
          <MotionDiv
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            className="flex-1 relative w-full flex items-center justify-center lg:justify-end"
          >
            <div className="relative z-10 group max-w-[700px] xl:max-w-[750px] w-full">
              <div className="absolute inset-0 bg-indigo-600/5 blur-[120px] rounded-full -z-10" />
              
              <Image
                src="https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&q=80&w=1200"
                alt="Featured Product"
                width={1200}
                height={1200}
                className="rounded-[60px] shadow-[0_50px_100px_-20px_rgba(79,70,229,0.25)] animate-float-medium w-full h-auto object-cover relative z-10 border-[12px] border-white"
                priority
              />

              {/* Floating Performance Badges */}
              <MotionDiv
                animate={{ y: [0, -12, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -top-6 -right-4 sm:-top-10 sm:-right-6 bg-white/95 backdrop-blur-md p-5 sm:p-6 rounded-[32px] shadow-2xl border border-white flex items-center gap-4 z-20 group hover:scale-105 transition-transform"
              >
                <div className="w-12 h-12 bg-indigo-600 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-indigo-200/50">
                  <TrendingUp size={24} />
                </div>
                <div className="pr-6">
                  <h4 className="font-black text-slate-900 text-base leading-none mb-1">Best Seller</h4>
                  <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Top Rated</p>
                </div>
              </MotionDiv>

              <MotionDiv
                animate={{ y: [0, 12, 0] }}
                transition={{ duration: 5, repeat: Infinity, delay: 0.5, ease: "easeInOut" }}
                className="absolute -bottom-6 -left-4 sm:-bottom-10 sm:-left-6 bg-white/95 backdrop-blur-md p-5 sm:p-6 rounded-[32px] shadow-2xl border border-white flex items-center gap-4 z-20 group hover:scale-105 transition-transform"
              >
                <div className="w-12 h-12 bg-slate-900 rounded-2xl flex items-center justify-center text-white shadow-xl">
                  <ShieldCheck size={24} />
                </div>
                <div className="pr-6">
                  <h4 className="font-black text-slate-900 text-base leading-none mb-1">100% Genuine</h4>
                  <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Verified Source</p>
                </div>
              </MotionDiv>
            </div>
          </MotionDiv>

        </div>
      </div>
    </section>
  );
}
