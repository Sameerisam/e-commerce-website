
import { MessageSquare } from "lucide-react";
import { MotionDiv } from "../ui/motions";

export function ContactHero() {
  return (
    <section className="relative pt-44 pb-32 overflow-hidden mt-[-6rem]" style={{ background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)' }}>
      {/* Background Decorative Elements */}
      <div className="absolute inset-0 z-0 opacity-20 pointer-events-none">
        <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-500 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-500 rounded-full blur-[120px] translate-y-1/2 -translate-x-1/2" />
      </div>

      <div className="container mx-auto px-6 relative z-10 text-center">
        <MotionDiv
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col items-center gap-6"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-600/10 backdrop-blur-md border border-indigo-600/20">
            <MessageSquare size={16} className="text-indigo-600" />
            <span className="text-xs font-black uppercase tracking-[0.2em] text-indigo-600">Connect with us</span>
          </div>

          <h1 className="text-5xl md:text-7xl lg:text-8xl font-black text-slate-900 leading-[1.05] tracking-tighter mb-8 max-w-5xl mx-auto">
            How Can We <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600 italic">Help You?</span>
          </h1>

          <p className="text-lg md:text-xl text-slate-600 max-w-3xl mx-auto mb-12 leading-relaxed font-medium">
            Whether you have a question about products, shipping, returns, or anything else,
            our dedicated support team is ready to answer all your inquiries 24/7.
          </p>
        </MotionDiv>
      </div>
    </section>
  );
}
