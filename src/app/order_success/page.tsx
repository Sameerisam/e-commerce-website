"use client";

import { useSearchParams } from "next/navigation";
import { CheckCircle2, ShoppingBag, ArrowRight, Download, Share2, Star } from "lucide-react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";
import Link from "next/link";

import { clearCart } from "@/redux/slices/add_To_Cart/page";
import { persistor, RootState } from "@/redux/store";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

export default function SuccessPage() {
  const dispatch = useDispatch();
  const searchParams = useSearchParams();
  const amount = searchParams.get("amount");
  const method = searchParams.get("method") || "Online Payment";
  const [isSaved, setIsSaved] = useState(false);

  const { items, shippingInfo, userEmail, buyNowItem } = useSelector((state: RootState) => state.addToCart);

  useEffect(() => {
    const saveOrder = async () => {
      const orderItems = buyNowItem ? [buyNowItem] : items;

      if (orderItems.length === 0 || !shippingInfo || !userEmail || isSaved) {
        return;
      }

      try {
        await axios.post("/api/orders", {
          userEmail,
          items: orderItems,
          totalAmount: Number(amount),
          shippingAddress: shippingInfo,
          paymentMethod: method,
          paymentStatus: method === "Online Payment" ? "Completed" : "Pending"
        });

        setIsSaved(true);
        dispatch(clearCart());
        setTimeout(() => {
          persistor.flush().then(() => persistor.persist());
        }, 100);
      } catch (err) {
        console.error("Order save failed:", err);
      }
    };

    saveOrder();
  }, [dispatch, items, shippingInfo, userEmail, buyNowItem, amount, method, isSaved]);

  return (
    <div className="bg-slate-50 min-h-screen pt-24 pb-20 overflow-hidden relative">
      {/* Abstract Background Elements */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[500px] bg-gradient-to-b from-emerald-50 to-transparent -z-10" />
      <motion.div
        animate={{ scale: [1, 1.2, 1], rotate: [0, 45, 0] }}
        transition={{ duration: 15, repeat: Infinity }}
        className="absolute top-20 -left-20 w-96 h-96 bg-emerald-100/30 rounded-full blur-3xl -z-10"
      />

      <div className="container mx-auto px-4 max-w-4xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">

          {/* Left: Success Illustration & Message */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="lg:col-span-12 text-center space-y-8 mb-12"
          >
            <div className="relative inline-block">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", damping: 12, delay: 0.2 }}
                className="w-32 h-32 bg-emerald-500 rounded-[40px] flex items-center justify-center text-white shadow-2xl shadow-emerald-200 relative z-10"
              >
                <CheckCircle2 size={64} strokeWidth={2.5} />
              </motion.div>
              {/* Decorative Sparkles */}
              {[...Array(6)].map((_, i) => (
                <motion.div
                  key={i}
                  animate={{
                    scale: [0, 1, 0],
                    x: [0, (i % 2 === 0 ? 60 : -60) * Math.random()],
                    y: [0, (i < 3 ? 60 : -60) * Math.random()]
                  }}
                  transition={{ duration: 2, repeat: Infinity, delay: i * 0.2 }}
                  className="absolute top-1/2 left-1/2 w-2 h-2 bg-emerald-400 rounded-full"
                />
              ))}
            </div>

            <div className="space-y-4">
              <h1 className="text-5xl lg:text-7xl font-black text-slate-900 tracking-tighter">
                Order <span className="text-emerald-500 uppercase">Confirmed!</span>
              </h1>
              <p className="text-xl text-slate-500 max-w-xl mx-auto font-medium">
                Your payment was successful and your order #MS-{Math.floor(Math.random() * 90000) + 10000} is now being processed.
              </p>
            </div>
          </motion.div>

          {/* Detailed Receipt Section */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4 }}
            className="lg:col-span-7 bg-white rounded-[48px] p-8 md:p-12 shadow-2xl shadow-slate-200 border border-slate-100 flex flex-col gap-8 relative overflow-hidden"
          >
            {/* Texture background */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-50/50 rounded-bl-[100px] -z-10" />

            <div className="flex justify-between items-start">
              <div className="space-y-1">
                <h3 className="text-2xl font-black text-slate-900 tracking-tight">Receipt Details</h3>
                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Date: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</p>
              </div>
              <Badge className="bg-emerald-50 text-emerald-600 hover:bg-emerald-50 border-none px-4 py-1 rounded-full font-black uppercase tracking-wider text-[10px]">
                Verified Transaction
              </Badge>
            </div>

            <Separator className="bg-slate-100" />

            <div className="space-y-6">
              <div className="flex justify-between items-center bg-slate-50 p-4 rounded-2xl">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-white rounded-xl shadow-sm flex items-center justify-center text-indigo-600">
                    <ShoppingBag size={20} />
                  </div>
                  <span className="text-sm font-bold text-slate-500 uppercase tracking-wider">Payment Method</span>
                </div>
                <span className="font-black text-slate-900">{method}</span>
              </div>

              <div className="flex justify-between items-center bg-slate-50 p-4 rounded-2xl">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-white rounded-xl shadow-sm flex items-center justify-center text-emerald-600">
                    <Star size={20} />
                  </div>
                  <span className="text-sm font-bold text-slate-500 uppercase tracking-wider">Status</span>
                </div>
                <span className="font-black text-emerald-600 uppercase tracking-widest text-xs">Completed</span>
              </div>
            </div>

            <div className="mt-4 pt-4 border-t border-dashed border-slate-200">
              <div className="flex justify-between items-end">
                <span className="text-slate-400 font-black uppercase tracking-widest text-xs">Total Amount Paid</span>
                <span className="text-5xl font-black text-slate-900 tracking-tighter">${amount || "0.00"}</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 mt-4">
              <Button variant="outline" className="h-14 rounded-2xl border-2 border-slate-100 font-bold gap-2">
                <Download size={18} /> Receipt
              </Button>
              <Button variant="outline" className="h-14 rounded-2xl border-2 border-slate-100 font-bold gap-2">
                <Share2 size={18} /> Share
              </Button>
            </div>
          </motion.div>

          {/* Right: Next Steps / Community */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6 }}
            className="lg:col-span-5 space-y-6"
          >
            <div className="bg-indigo-600 rounded-[40px] p-8 text-white relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10" />
              <h4 className="text-2xl font-black mb-4 relative z-10">What's Next?</h4>
              <ul className="space-y-4 relative z-10">
                {[
                  "Check your email for the detailed invoice.",
                  "We will notify you when your order ships.",
                  "Manage your order in your account dashboard."
                ].map((step, i) => (
                  <li key={i} className="flex gap-3 text-sm font-medium text-indigo-100">
                    <div className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center text-white text-[10px] font-bold shrink-0 mt-0.5">{i + 1}</div>
                    {step}
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-white rounded-[40px] p-8 border border-slate-100 space-y-6">
              <p className="text-slate-500 text-sm font-medium text-center">Want to see more of our premium products?</p>
              <Button asChild className="w-full h-16 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-lg font-bold shadow-xl shadow-indigo-100 transition-all hover:-translate-y-1 active:scale-95">
                <Link href="/" className="gap-2">
                  Back to Store <ArrowRight size={20} />
                </Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
