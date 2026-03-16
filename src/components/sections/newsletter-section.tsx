
import { MotionDiv } from "../ui/motions";
import { Button } from "@/components/ui/button";

export function NewsletterSection() {
  return (
    <section className="py-24">
      <div className="container mx-auto px-4">
        <div className="bg-indigo-600 rounded-[50px] p-12 md:p-24 text-center text-white relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10" />

          <MotionDiv
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
              <Button size="lg" className="h-16 px-10 rounded-2xl bg-white text-indigo-600 font-black hover:bg-slate-100 shadow-xl shadow-indigo-900/20 transition-all hover:scale-105 active:scale-95">
                Join Now
              </Button>
            </div>
            <p className="text-xs text-indigo-200 mt-4 italic">By joining, you agree to our privacy policy and terms.</p>
          </MotionDiv>
        </div>
      </div>
    </section>
  );
}
