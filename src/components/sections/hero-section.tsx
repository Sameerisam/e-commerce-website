


import { ArrowRight, Sparkles, TrendingUp, ShieldCheck } from "lucide-react";

import { Button } from "@/components/ui/button";
import { MotionDiv, MotionH1, MotionP } from "../ui/motions";
import { NextLink } from "../ui/next-link";

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
      <div className="absolute top-0 right-0 w-1/2 h-full bg-indigo-50/50 rounded-l-[100px] -z-10" />
      <MotionDiv
        animate={{ scale: [1, 1.1, 1], rotate: [0, 5, 0] }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        className="absolute -top-24 -left-24 w-96 h-96 bg-indigo-200/40 rounded-full blur-3xl -z-10"
      />

      <div className="container w-full px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <MotionDiv
            variants={staggerContainer}
            initial="initial"
            animate="animate"
            className="space-y-8"
          >
            <MotionDiv variants={fadeInUp} className="inline-flex items-center gap-2 px-4 py-2 mt-4 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-700 font-bold text-xs uppercase tracking-wider">
              <Sparkles size={14} />
              <span>New Collection 2026</span>
            </MotionDiv>

            <MotionH1 variants={fadeInUp} className="text-5xl md:text-7xl lg:text-8xl font-black text-slate-900 leading-[1.1] tracking-tighter">
              Elegance in <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-purple-600">Every Detail.</span>
            </MotionH1>

            <MotionP variants={fadeInUp} className="text-lg md:text-xl text-slate-600 leading-relaxed max-w-lg">
              Shop the latest trends in technology, fashion, and lifestyle. Premium quality products delivered right to your doorstep.
            </MotionP>

            <MotionDiv variants={fadeInUp} className="flex flex-col sm:flex-row gap-4 pt-4">
              <Button href="/products" size="lg" className="h-16 px-10 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-lg hover:scale-110 text-white font-bold shadow-2xl shadow-indigo-200 transition-all hover:-translate-y-1 w-full sm:w-auto">
                Shop Now <ArrowRight size={20} className="ml-2" />
              </Button>
              <Button href="/categories" size="lg" className="h-16 px-10 bg-white text-indigo-600 hover:bg-indigo-700 text-lg   font-bold shadow-2xl shadow-indigo-200 ">
                Explore Categories
              </Button>
            </MotionDiv>

            <MotionDiv variants={fadeInUp} className="pt-2 flex items-center gap-8 border-t border-slate-100">
              <div className="flex flex-col">
                <span className="text-3xl font-black text-slate-900">50k+</span>
                <span className="text-sm text-slate-500 font-medium">Happy Customers</span>
              </div>
              <div className="w-[1px] h-10 bg-slate-200" />
              <div className="flex flex-col">
                <span className="text-3xl font-black text-slate-900">120+</span>
                <span className="text-sm text-slate-500 font-medium">Premium Brands</span>
              </div>
            </MotionDiv>
          </MotionDiv>

          <MotionDiv
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            className="relative mt-12 lg:mt-0"
          >
            <div className="relative z-10 p-4">
              <img
                src="https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&q=80&w=800"
                alt="Hero Product"
                className="rounded-[60px] shadow-[0_50px_100px_-20px_rgba(79,70,229,0.3)] animate-float"
              />

              {/* Floating Cards */}
              <MotionDiv
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 4, repeat: Infinity }}
                className="absolute -top-6 -right-4 sm:-top-10 sm:-right-10 bg-white p-4 sm:p-6 rounded-2xl sm:rounded-3xl shadow-2xl border border-indigo-50 flex items-center gap-3 sm:gap-4 z-20"
              >
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-emerald-500 rounded-xl sm:rounded-2xl flex items-center justify-center text-white shrink-0">
                  <TrendingUp size={20} className="sm:size-[24px]" />
                </div>
                <div>
                  <h4 className="font-black text-slate-900 text-sm sm:text-base">Best Seller</h4>
                  <p className="text-[10px] sm:text-xs text-slate-500">Top picks of the week</p>
                </div>
              </MotionDiv>

              <MotionDiv
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 5, repeat: Infinity, delay: 0.5 }}
                className="absolute -bottom-6 -left-4 sm:-bottom-10 sm:-left-10 bg-white p-4 sm:p-6 rounded-2xl sm:rounded-3xl shadow-2xl border border-indigo-50 flex items-center gap-3 sm:gap-4 z-20"
              >
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-indigo-600 rounded-xl sm:rounded-2xl flex items-center justify-center text-white shrink-0">
                  <ShieldCheck size={20} className="sm:size-[24px]" />
                </div>
                <div>
                  <h4 className="font-black text-slate-900 text-sm sm:text-base">100% Genuine</h4>
                  <p className="text-[10px] sm:text-xs text-slate-500">Certified products only</p>
                </div>
              </MotionDiv>
            </div>
          </MotionDiv>
        </div>
      </div>

    </section>
  );
}
