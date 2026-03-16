


import { ArrowRight } from "lucide-react";
import { MotionDiv } from "../ui/motions";

export function JewelrySection() {
  return (
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
            <MotionDiv
              key={i}
              whileHover={{ y: -15, scale: 1.02 }}
              className="group card-luxury p-6 rounded-3xl overflow-hidden cursor-pointer"
            >
              <div className="h-[400px] rounded-2xl overflow-hidden mb-8">
                <img src={item.img} alt={item.title} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-2">{item.title}</h3>
              <p className="text-slate-400 mb-6">Crafted with precision and excellence.</p>
              <div className="text-jewelry-gold font-bold flex items-center gap-2 group-hover:gap-4 transition-all">
                Shop Collection <ArrowRight size={18} />
              </div>
            </MotionDiv>
          ))}
        </div>
      </div>
    </section>
  );
}
