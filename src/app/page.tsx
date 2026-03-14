"use client";

import { motion } from "framer-motion";
import { ArrowRight, ShoppingBag, Sparkles, TrendingUp, ShieldCheck } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import AllProducts from "../components/myProducts/page";

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

export default function Home() {
  return (
    <div className="bg-background text-foreground w-full">
      {/* Hero Section */}
      <section className=" min-h-screen flex items-center overflow-hidden mt-[-6rem] pt-24" style={{ background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)' }}>
        {/* Abstract Background Shapes */}
        <div className="absolute top-0 right-0 w-1/2 h-full bg-indigo-50/50 rounded-l-[100px] -z-10" />
        <motion.div
          animate={{ scale: [1, 1.1, 1], rotate: [0, 5, 0] }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute -top-24 -left-24 w-96 h-96 bg-indigo-200/40 rounded-full blur-3xl -z-10"
        />

        <div className="container w-full  px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              variants={staggerContainer}
              initial="initial"
              animate="animate"
              className="space-y-8"
            >
              <motion.div variants={fadeInUp} className="inline-flex items-center gap-2 px-4 py-2 mt-4 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-700 font-bold text-xs uppercase tracking-wider">
                <Sparkles size={14} />
                <span>New Collection 2026</span>
              </motion.div>

              <motion.h1 variants={fadeInUp} className="text-5xl md:text-7xl lg:text-8xl font-black text-slate-900 leading-[1.1] tracking-tighter">
                Elegance in <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-purple-600">Every Detail.</span>
              </motion.h1>

              <motion.p variants={fadeInUp} className="text-lg md:text-xl text-slate-600 leading-relaxed max-w-lg">
                Shop the latest trends in technology, fashion, and lifestyle. Premium quality products delivered right to your doorstep.
              </motion.p>

              <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row gap-4 pt-4">
                <Button asChild size="lg" className="h-16 px-10 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-lg  hover:scale-110  text-white font-bold shadow-2xl shadow-indigo-200 transition-all hover:-translate-y-1 w-full sm:w-auto">
                  <Link href="#featured">
                    Shop Now <ArrowRight size={20} className="ml-2" />
                  </Link>
                </Button>
                <Button variant="outline" size="lg" className="h-16 px-10 rounded-2xl border-2 border-slate-200 hover:bg-slate-50 text-lg font-bold transition-all w-full sm:w-auto">
                  Explore Categories
                </Button>
              </motion.div>

              <motion.div variants={fadeInUp} className="pt-2 flex items-center gap-8 border-t border-slate-100">
                <div className="flex flex-col">
                  <span className="text-3xl font-black text-slate-900">50k+</span>
                  <span className="text-sm text-slate-500 font-medium">Happy Customers</span>
                </div>
                <div className="w-[1px] h-10 bg-slate-200" />
                <div className="flex flex-col">
                  <span className="text-3xl font-black text-slate-900">120+</span>
                  <span className="text-sm text-slate-500 font-medium">Premium Brands</span>
                </div>
              </motion.div>
            </motion.div>

            <motion.div
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
                <motion.div
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
                </motion.div>

                <motion.div
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
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>




      {/* Featured Products */}
      <section id="featured" className="py-24">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
            <div className="space-y-4">
              <span className="text-indigo-600 font-black text-sm uppercase tracking-widest flex items-center gap-2">
                <div className="w-10 h-[2px] bg-indigo-600" /> Our Picks
              </span>
              <h2 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight">
                Featured Products
              </h2>
            </div>
            <div className="flex gap-2">
              <div className="px-6 py-3 rounded-2xl border border-slate-200 text-sm font-bold text-slate-600 hover:bg-slate-50 cursor-pointer transition-colors">
                All Items
              </div>
              <div className="px-6 py-3 rounded-2xl bg-indigo-600 text-sm font-bold text-white shadow-lg shadow-indigo-100 cursor-pointer">
                Electronics
              </div>
            </div>
          </div>

          <AllProducts />
        </div>
      </section>

      {/* Jewelry Section (Luxury Dark Mode) */}
      <section id="jewelry" className="py-32 category-jewelry relative overflow-hidden">
        <div className="absolute top-0 right-0 w-full h-full opacity-10 pointer-events-none">
          <div className="absolute top-0 right-0 w-96 h-96 bg-jewelry-gold blur-[120px] rounded-full" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-500 blur-[120px] rounded-full" />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="flex flex-col items-center text-center mb-20">
            <span className="text-jewelry-gold font-black text-sm uppercase tracking-[0.3em] mb-4">
              Premium Collection
            </span>
            <h2 className="text-5xl md:text-6xl font-black text-white mb-6">Timeless Luxury</h2>
            <div className="w-24 h-[1px] bg-jewelry-gold" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {[
              { title: "Engagement Rings", img: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&q=80&w=600" },
              { title: "Luxury Watches", img: "https://images.unsplash.com/photo-1524592094714-0f0654e20314?auto=format&fit=crop&q=80&w=600" },
              { title: "Gold Necklaces", img: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&q=80&w=600" },
            ].map((item, i) => (
              <motion.div
                key={i}
                whileHover={{ y: -15, scale: 1.02 }}
                className="group card-luxury p-6 rounded-3xl overflow-hidden cursor-pointer"
              >
                <div className="h-[400px] rounded-2xl overflow-hidden mb-8">
                  <img src={item.img} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">{item.title}</h3>
                <p className="text-slate-400 mb-6">Crafted with precision and excellence.</p>
                <div className="text-jewelry-gold font-bold flex items-center gap-2 group-hover:gap-4 transition-all">
                  Shop Collection <ArrowRight size={18} />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Electronics Section (Tech & Innovation) */}
      <section id="electronics" className="py-32 category-electronics">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-10 mb-20">
            <div>
              <span className="text-electronics-blue font-black text-sm uppercase tracking-widest block mb-4">
                Next-Gen Tech
              </span>
              <h2 className="text-5xl md:text-6xl font-black text-slate-900">Digital Future.</h2>
            </div>
            <Button className="btn-gradient-electronics h-14 px-8 rounded-xl font-bold text-lg shadow-xl shadow-blue-500/20">
              Explore Gadgets
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            <div className="card-tech rounded-[40px] p-12 flex flex-col justify-center items-start space-y-6">
              <span className="bg-blue-50 text-electronics-blue px-4 py-1 rounded-full text-xs font-black uppercase">Trending Now</span>
              <h3 className="text-4xl font-black text-slate-900">Smart Wearables</h3>
              <p className="text-slate-600 text-lg">Experience the peak of human-centered technology.</p>
              <Button variant="outline" className="rounded-xl border-slate-200">Learn More</Button>
            </div>
            <div className="h-[500px] rounded-[40px] overflow-hidden shadow-2xl">
              <img src="https://images.unsplash.com/photo-1546868871-7041f2a55e12?auto=format&fit=crop&q=80&w=800" className="w-full h-full object-cover" />
            </div>
          </div>
        </div>
      </section>

      {/* Clothing Section (Lifestyle) */}
      <section id="clothing" className="py-32 category-clothing">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto space-y-6 mb-20">
            <span className="text-clothing-accent font-black text-sm uppercase tracking-[0.2em]">New Arrivals</span>
            <h2 className="text-5xl md:text-6xl font-black text-clothing-text leading-tight">Comfort Meets Style</h2>
            <p className="text-xl text-slate-500">Premium fabrics designed for your everyday comfort and elegance.</p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="card-lifestyle p-4 group">
                <div className="aspect-[3/4] rounded-2xl bg-white overflow-hidden mb-6">
                  <img src={`https://images.unsplash.com/photo-1523381210434-271e8be1f52b?auto=format&fit=crop&q=80&w=600&v=${i}`} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                </div>
                <h4 className="font-bold text-clothing-text">Essential Tee</h4>
                <p className="text-clothing-accent font-black">$49.00</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <div className="bg-indigo-600 rounded-[50px] p-12 md:p-24 text-center text-white relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10" />

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              className="relative z-10 space-y-8"
            >
              <h2 className="text-4xl md:text-6xl font-black tracking-tight">Join the MYSTORE Community</h2>
              <p className="text-indigo-100 text-xl max-w-2xl mx-auto opacity-80">
                Subscribe to get 15% off your first order plus early access to new releases.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="h-16 px-8 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 text-white placeholder:text-white/50 flex-grow focus:outline-none focus:ring-2 focus:ring-white/50"
                />
                <Button size="lg" className="h-16 px-10 rounded-2xl bg-white text-indigo-600 font-black hover:bg-slate-100 shadow-xl shadow-indigo-900/20">
                  Join Now
                </Button>
              </div>
              <p className="text-xs text-indigo-200 mt-4 italic">By joining, you agree to our privacy policy and terms.</p>
            </motion.div>
          </div>
        </div>
      </section>

      <style jsx global>{`
        @keyframes float {
          0% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(2deg); }
          100% { transform: translateY(0px) rotate(0deg); }
        }
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}
