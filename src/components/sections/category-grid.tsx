


import { ArrowRight, Zap, Diamond, Shirt, Heart, Laptop, Watch, Dumbbell } from "lucide-react";
import { Button } from "@/components/ui/button";
import { MotionDiv } from "../ui/motions";
import { NextLink } from "../ui/next-link";

const categories = [
  {
    title: "Men's Clothing",
    desc: "Classic essentials and the latest trends in men's fashion.",
    image: "https://images.unsplash.com/photo-1490578474895-699cd4e2cf59?auto=format&fit=crop&q=80&w=800",
    href: "/products?category=men's clothing",
    icon: <Shirt size={20} className="text-indigo-600" />
  },
  {
    title: "Women's Clothing",
    desc: "Elegant styles and everyday comfort for the modern woman.",
    image: "https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&q=80&w=800",
    href: "/products?category=women's clothing",
    icon: <Heart size={20} className="text-rose-500" />
  },
  {
    title: "Electronics",
    desc: "Cutting-edge technology and high-performance devices.",
    image: "https://images.unsplash.com/photo-1498049794561-7780e7231661?auto=format&fit=crop&q=80&w=800",
    href: "/products?category=electronics",
    icon: <Laptop size={20} className="text-blue-600" />
  },
  {
    title: "Jewelry",
    desc: "Timeless luxury and exquisite craftsmanship in every piece.",
    image: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&q=80&w=800",
    href: "/products?category=jewelery",
    icon: <Diamond size={20} className="text-amber-500" />
  },
  {
    title: "Shoes",
    desc: "Premium footwear designed for comfort and style.",
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&q=80&w=800",
    href: "/products",
    icon: <Zap size={20} className="text-orange-500" />
  },
  {
    title: "Premium Watches",
    desc: "Exquisite timepieces that define elegance and precision.",
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&q=80&w=800",
    href: "/products",
    icon: <Watch size={20} className="text-indigo-600" />
  },
  {
    title: "Sports & Fitness",
    desc: "Gear up with professional equipment for your active lifestyle.",
    image: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&q=80&w=800",
    href: "/products",
    icon: <Dumbbell size={20} className="text-slate-600" />
  }
];

export function CategoryGrid() {
  return (
    <>
      <section className="py-32 container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-end gap-10 mb-20">
          <div className="space-y-4">
            <span className="text-indigo-600 font-black text-xs uppercase tracking-[0.4em]">Curated Collections</span>
             <h2 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight">Our Specialty Stores</h2>
          </div>
          <div className="h-[1px] flex-grow mx-8 bg-slate-100 hidden md:block" />
          <p className="text-slate-500 font-medium max-w-xs text-right">
            Selective quality items across 7 premium categories.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {categories.map((cat, i) => (
            <MotionDiv
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              viewport={{ once: true }}
              className="group relative h-[480px] rounded-[40px] overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.05)] hover:shadow-[0_40px_80px_rgba(79,70,229,0.15)] transition-all duration-700 hover:-translate-y-4"
            >
              {/* Background Image */}
              <img 
                src={cat.image} 
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" 
                alt={cat.title}
              />
              
              {/* Overlays */}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent opacity-90 transition-opacity group-hover:opacity-100" />
              <div className="absolute inset-0 bg-indigo-600/0 group-hover:bg-indigo-600/10 transition-colors duration-700" />
              
              {/* Content */}
              <div className="absolute inset-0 p-10 flex flex-col justify-end items-start text-white">
                <MotionDiv 
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  className="w-12 h-12 rounded-2xl bg-white flex items-center justify-center mb-6 shadow-xl"
                >
                  {cat.icon}
                </MotionDiv>
                
                <h3 className="text-3xl font-black mb-3 tracking-tight group-hover:text-indigo-400 transition-colors">
                  {cat.title}
                </h3>
                
                <p className="text-slate-300 text-sm leading-relaxed mb-8 max-w-[240px] opacity-0 group-hover:opacity-100 group-hover:translate-y-0 translate-y-4 transition-all duration-500">
                  {cat.desc}
                </p>
                
                <NextLink 
                  href={cat.href}
                  className="flex items-center gap-3 py-4 px-8 rounded-2xl bg-white/10 hover:bg-indigo-600 backdrop-blur-md text-white font-black text-xs uppercase tracking-widest transition-all duration-300"
                >
                  Shop Now
                  <ArrowRight size={16} />
                </NextLink>
              </div>
            </MotionDiv>
          ))}
        </div>
      </section>

      {/* CTA Bottom Section */}
      <section className="pb-32 container mx-auto px-6 text-white">
        <div className="bg-indigo-600 rounded-[48px] p-8 md:p-24 text-center text-white relative overflow-hidden shadow-2xl shadow-indigo-200">
           <div className="absolute top-0 left-0 w-64 h-64 bg-white/5 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
           <div className="absolute bottom-0 right-0 w-64 h-64 bg-slate-900/20 rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />
           
           <h2 className="text-4xl md:text-6xl font-black mb-8 relative z-10 text-white">
             Ready to find your <br />
             perfect match?
           </h2>
           <p className="text-indigo-100 text-lg md:text-xl mb-12 max-w-2xl mx-auto relative z-10">
             Join thousands of happy customers and experience the best of modern e-commerce today.
           </p>
           <Button href="/products" size="lg" className=" h-12 rounded-2xl font-black text-lg bg-white text-indigo-600 hover:bg-white hover:text-indigo-600 transition-all relative z-10 shadow-xl">
             Explore All Products
           </Button>
        </div>
      </section>
    </>
  );
}
