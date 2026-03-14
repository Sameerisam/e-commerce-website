"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  CreditCard,
  Banknote,
  ChevronLeft,
  ShieldCheck,
  CheckCircle2,
  Lock,
  ArrowRight
} from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

export default function PaymentMethod() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [loading, setLoading] = useState(false);
  const [selectedMethod, setSelectedMethod] = useState<"online" | "cod" | null>(null);

  const amount = searchParams.get("amount") || "0";

  const handleChoice = () => {
    if (!selectedMethod) return;

    setLoading(true);
    setTimeout(() => {
      if (selectedMethod === "online") {
        router.push(`/one_time_payment?amount=${amount}`);
      } else {
        router.push(`/order_success?amount=${amount}&method=Cash on Delivery`);
      }
    }, 800);
  };

  return (
    <div className="bg-slate-50 min-h-screen pt-24 pb-20">
      {/* Loading Overlay */}
      <AnimatePresence>
        {loading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-white/80 backdrop-blur-md flex items-center justify-center p-6"
          >
            <div className="text-center space-y-4">
              <div className="w-16 h-16 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin mx-auto" />
              <h3 className="text-2xl font-black text-slate-900 tracking-tight">Initializing Checkout</h3>
              <p className="text-slate-500 font-bold uppercase text-[10px] tracking-[0.2em]">Contacting secure servers...</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="container mx-auto px-4">
        {/* Progress Header */}
        <div className="max-w-4xl mx-auto mb-10 flex items-center justify-between px-4">
          <Link href="/delivery_Information" className="text-slate-400 hover:text-indigo-600 font-bold text-xs uppercase tracking-widest flex items-center gap-2 transition-all">
            <ChevronLeft size={16} /> Shipping Info
          </Link>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 opacity-40">
              <div className="w-6 h-6 rounded-full bg-slate-900 text-white flex items-center justify-center text-[10px] font-bold">1</div>
              <span className="text-[10px] font-black uppercase tracking-widest text-slate-900">Delivery</span>
            </div>
            <div className="w-8 h-[1px] bg-slate-200" />
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-full bg-indigo-600 text-white flex items-center justify-center text-[10px] font-bold">2</div>
              <span className="text-[10px] font-black uppercase tracking-widest text-slate-900">Payment</span>
            </div>
          </div>
        </div>

        <div className="max-w-xl mx-auto space-y-8">
          <div className="text-center space-y-2">
            <h1 className="text-4xl font-black text-slate-900 tracking-tight">Select Payment</h1>
            <p className="text-slate-400 font-bold uppercase text-xs tracking-[0.1em]">Total to pay: <span className="text-indigo-600">${amount}</span></p>
          </div>

          <div className="space-y-4">
            {/* Online (Stripe) */}
            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setSelectedMethod("online")}
              className={`p-6 rounded-[32px] border-2 cursor-pointer transition-all duration-300 relative group overflow-hidden ${selectedMethod === "online" ? "border-indigo-600 bg-white shadow-2xl shadow-indigo-100" : "border-slate-100 bg-white hover:border-slate-200 shadow-sm"}`}
            >
              <div className="flex items-center gap-6 relative z-10">
                <div className={`w-16 h-16 rounded-2xl flex items-center justify-center transition-colors ${selectedMethod === "online" ? "bg-indigo-600 text-white" : "bg-slate-50 text-slate-400 group-hover:bg-indigo-50 group-hover:text-indigo-400"}`}>
                  <CreditCard size={32} />
                </div>
                <div className="flex-grow">
                  <h3 className="text-lg font-black text-slate-900">Online Payment</h3>
                  <p className="text-xs text-slate-400 font-bold uppercase tracking-wider">Credit Card / Apple Pay / G-Pay</p>
                </div>
                {selectedMethod === "online" && (
                  <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="text-indigo-600">
                    <CheckCircle2 size={24} fill="currentColor" className="text-white" />
                    <CheckCircle2 size={24} className="absolute inset-0" />
                  </motion.div>
                )}
              </div>
              {/* Abstract UI indicators */}
              <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-indigo-600/5 rounded-full blur-2xl group-hover:bg-indigo-600/10" />
            </motion.div>

            {/* Cash on Delivery */}
            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setSelectedMethod("cod")}
              className={`p-6 rounded-[32px] border-2 cursor-pointer transition-all duration-300 relative group overflow-hidden ${selectedMethod === "cod" ? "border-emerald-600 bg-white shadow-2xl shadow-emerald-100" : "border-slate-100 bg-white hover:border-slate-200 shadow-sm"}`}
            >
              <div className="flex items-center gap-6 relative z-10">
                <div className={`w-16 h-16 rounded-2xl flex items-center justify-center transition-colors ${selectedMethod === "cod" ? "bg-emerald-600 text-white" : "bg-slate-50 text-slate-400 group-hover:bg-emerald-50 group-hover:text-emerald-400"}`}>
                  <Banknote size={32} />
                </div>
                <div className="flex-grow">
                  <h3 className="text-lg font-black text-slate-900">Cash on Delivery</h3>
                  <p className="text-xs text-slate-400 font-bold uppercase tracking-wider">Pay when you receive the order</p>
                </div>
                {selectedMethod === "cod" && (
                  <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="text-emerald-600">
                    <CheckCircle2 size={24} fill="currentColor" className="text-white" />
                    <CheckCircle2 size={24} className="absolute inset-0" />
                  </motion.div>
                )}
              </div>
              <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-emerald-600/5 rounded-full blur-2xl group-hover:bg-emerald-600/10" />
            </motion.div>
          </div>

          <Button
            onClick={handleChoice}
            disabled={!selectedMethod || loading}
            className="w-full h-16 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-lg font-bold shadow-xl shadow-indigo-100 gap-2 transition-all hover:-translate-y-1 active:scale-95 disabled:opacity-50"
          >
            {loading ? "Confirming..." : "Finalize Order"} <ArrowRight size={20} />
          </Button>

          <div className="bg-white rounded-3xl p-6 border border-slate-100 flex flex-col gap-4">
            <div className="flex items-center gap-4 text-xs font-bold text-slate-400 uppercase tracking-widest">
              <ShieldCheck className="text-indigo-600" size={18} /> Secure Checkout Guarantee
            </div>
            <Separator className="bg-slate-100" />
            <div className="flex items-center gap-3">
              <Lock size={14} className="text-slate-300" />
              <p className="text-[10px] font-black text-slate-300 uppercase leading-relaxed tracking-wider">
                Your payment details are protected by 256-bit SSL encryption. We never store your full card details on our servers.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
