"use client";

import { motion } from "framer-motion";

interface SectionHeroProps {
  title: string;
  subtitle?: string;
  gradient?: string;
}

export function SectionHero({ 
  title, 
  subtitle, 
  gradient = "from-indigo-600 to-purple-600" 
}: SectionHeroProps) {
  return (
    <section 
      className="relative pt-32 pb-20 overflow-hidden" 
      style={{ background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)' }}
    >
      {/* Decorative Blobs */}
      <div className="absolute top-0 right-0 w-full h-full opacity-40 pointer-events-none">
        <div className={`absolute top-0 right-0 w-[500px] h-[500px] bg-gradient-to-br ${gradient} blur-[120px] rounded-full -translate-y-1/2 translate-x-1/2 opacity-20`} />
        <div className={`absolute bottom-0 left-0 w-[500px] h-[500px] bg-gradient-to-tr ${gradient} blur-[120px] rounded-full translate-y-1/2 -translate-x-1/2 opacity-20`} />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-3xl"
        >
          <motion.h1 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="text-5xl md:text-7xl font-black text-slate-900 mb-6 tracking-tight"
          >
            {title}
          </motion.h1>
          {subtitle && (
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="text-xl text-slate-600 leading-relaxed font-medium"
            >
              {subtitle}
            </motion.p>
          )}
        </motion.div>
      </div>
    </section>
  );
}
