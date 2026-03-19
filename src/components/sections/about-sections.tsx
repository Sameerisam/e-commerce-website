
import { ShieldCheck, Globe, Truck, Heart, Users, Award, Target } from "lucide-react";
import { Button } from "@/components/ui/button";
import { MotionDiv } from "../ui/motions";

export function AboutSections() {
  return (
    <main className="container mx-auto px-6 py-32 space-y-40">
      {/* Our Story Section - Centered Storytelling */}
      <section className="max-w-4xl mx-auto text-center space-y-12">
         <MotionDiv
           initial={{ opacity: 0, y: 30 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true }}
           className="space-y-6"
         >
            <span className="text-indigo-600 font-black text-xs uppercase tracking-[0.4em]">Our Story</span>
            <h2 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight">The Vision of Excellence</h2>
            <p className="text-xl text-slate-500 leading-relaxed font-medium">
              We believe that every product tells a story. From the meticulous selection of materials to the final delivery at your doorstep, we ensure that every chapter of our journey is defined by authenticity and excellence.
            </p>
         </MotionDiv>
         
         <div className="relative aspect-video rounded-[48px] overflow-hidden border-[12px] border-white shadow-2xl group">
            <img 
              src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&q=80&w=1200" 
              alt="Our Collaborative Spirit" 
              className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-1000 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-indigo-600/10 mix-blend-multiply opacity-60 group-hover:opacity-0 transition-opacity" />
         </div>
      </section>

      {/* Stats Section */}
      <section className="grid grid-cols-2 lg:grid-cols-4 gap-12 py-16 px-12 bg-white rounded-[60px] shadow-[0_20px_50px_rgba(0,0,0,0.03)] border border-slate-50">
         {[
           { label: "Happy Customers", val: "10K+", icon: Users },
           { label: "Countries Served", val: "50+", icon: Globe },
           { label: "Quality Awards", val: "15+", icon: Award },
           { label: "Partner Brands", val: "200+", icon: Target }
         ].map((stat, i) => (
           <div key={i} className="text-center space-y-3">
              <div className="w-12 h-12 bg-indigo-50 rounded-2xl flex items-center justify-center mx-auto text-indigo-600 mb-4">
                <stat.icon size={22} />
              </div>
              <div className="text-4xl font-black text-slate-900">{stat.val}</div>
              <div className="text-xs font-bold text-slate-400 uppercase tracking-widest">{stat.label}</div>
           </div>
         ))}
      </section>

      {/* Values Section */}
      <section className="space-y-20">
         <div className="text-center space-y-4">
           <span className="text-indigo-600 font-black text-xs uppercase tracking-[0.4em]">Our Foundations</span>
           <h2 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight">The Principles We Live By</h2>
         </div>

         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
           {[
             { icon: ShieldCheck, title: "Unwavering Trust", desc: "Every item in our collection is 100% authenticated by world-class experts.", color: "bg-blue-50 text-blue-600" },
             { icon: Globe, title: "Global Vision", desc: "Bridging the gap between international craft and local luxury convenience.", color: "bg-emerald-50 text-emerald-600" },
             { icon: Truck, title: "Agile Logistics", desc: "Proprietary logistics systems ensuring your luxury reaches you in record time.", color: "bg-indigo-50 text-indigo-600" },
             { icon: Heart, title: "Human Centric", desc: "Technology is our tool, but human experience is our ultimate purpose.", color: "bg-rose-50 text-rose-600" }
           ].map((value, i) => (
             <MotionDiv 
               key={i}
               initial={{ opacity: 0, y: 20 }}
               whileInView={{ opacity: 1, y: 0 }}
               transition={{ delay: i * 0.1 }}
               viewport={{ once: true }}
               whileHover={{ y: -12 }}
               className="bg-white p-10 rounded-[40px] shadow-[0_10px_40px_rgba(0,0,0,0.02)] border border-slate-100 space-y-6 hover:shadow-[0_40px_80px_rgba(0,0,0,0.06)] transition-all duration-500"
             >
               <div className={`w-14 h-14 ${value.color} rounded-2xl flex items-center justify-center mb-4`}>
                 <value.icon size={28} />
               </div>
               <h3 className="text-2xl font-black text-slate-900 tracking-tight">{value.title}</h3>
               <p className="text-slate-500 text-sm leading-relaxed font-medium">{value.desc}</p>
             </MotionDiv>
           ))}
         </div>
      </section>

      {/* Closing CTA */}
      <section className="bg-slate-900 rounded-[60px] p-8 md:p-16 text-center relative overflow-hidden">
         <div className="absolute top-0 right-0 w-[40%] h-full bg-indigo-600/20 skew-x-12 translate-x-1/2" />
         <div className="relative z-10 space-y-8">
            <h2 className="text-4xl md:text-6xl font-black text-white leading-tight max-w-4xl mx-auto">
              Be part of our next <br /> <span className="text-indigo-400 italic">amazing chapter.</span>
            </h2>
            <p className="text-slate-400 text-lg max-w-2xl mx-auto">
              Join our community of trendsetters and experience the future of digital shopping today.
            </p>
            <Button size="lg" className="h-16 px-12 rounded-2xl bg-white text-indigo-600  transition-all text-lg font-black shadow-xl">
              Ready to shop?
            </Button>
         </div>
      </section>
    </main>
  );
}
