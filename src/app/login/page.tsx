"use client";

import React, { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { motion } from "framer-motion";
import {
  Mail,
  Lock,
  ArrowRight,
  Eye,
  EyeOff,
  ChevronLeft,
  ShieldCheck,
  Zap,
  Star
} from "lucide-react";

import { login } from "@/redux/slices/usersSlice/page";
import { setUserEmail } from "@/redux/slices/add_To_Cart/page";
import { RootState } from "@/redux/store";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

type LoginFormValues = {
  email: string;
  password: string;
};

export default function LogIn() {
  const { register, handleSubmit, setError, formState: { errors, isSubmitting }, reset } = useForm<LoginFormValues>();
  const [showPassword, setShowPassword] = useState(false);

  const router = useRouter();
  const searchParams = useSearchParams();
  const dispatch = useDispatch();

  const buyNowItem = useSelector((state: RootState) => state.addToCart.buyNowItem);

  const callbackUrl = searchParams.get("callbackUrl") || "/";
  const action = searchParams.get("action");

  const onSubmit = async (data: LoginFormValues) => {
    try {
      const resp = await axios.post("/api/auth", { action: "login", data });

      if (resp.status === 200) {
        dispatch(
          login({
            email: data.email,
            token: resp.data.token || "dummy-token",
            name: resp.data.user?.name || "User",
          })
        );

        dispatch(setUserEmail(data.email));
        reset();

        const dest = (action === "buyNow" || buyNowItem)
          ? '/delivery_Information'
          : callbackUrl;

        setTimeout(() => router.push(dest), 300);
      }
    } catch (error: any) {
      if (error.response?.status === 400) {
        setError("password", { message: "Invalid email or password" });
      }
    }
  };

  return (
    <section className="min-h-screen relative flex items-center justify-center p-4 overflow-hidden mt-[-6rem] pt-24" style={{ background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)' }}>
      {/* Decorative Animated Shapes */}
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          rotate: [0, 90, 0],
          x: [0, 50, 0],
          y: [0, 30, 0]
        }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        className="absolute -top-24 -left-24 w-96 h-96 bg-indigo-200/20 rounded-full blur-[100px] -z-10"
      />
      <motion.div
        animate={{
          scale: [1, 1.3, 1],
          rotate: [0, -45, 0],
          x: [0, -30, 0],
          y: [0, 50, 0]
        }}
        transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
        className="absolute -bottom-24 -right-24 w-80 h-80 bg-blue-200/20 rounded-full blur-[80px] -z-10"
      />

      <div className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative z-10 ">
        {/* Left: Branding & Benefits */}
        <div className="hidden lg:flex flex-col space-y-12 pr-12">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-6"
          >
            <div className="space-y-4">
              <Badge className="bg-indigo-600/10 text-indigo-600 border-none px-4 py-1 rounded-full font-black uppercase tracking-widest text-[10px]">
                Authentication Portal
              </Badge>
              <h1 className="text-7xl font-black text-slate-900 leading-[0.9] tracking-tighter">
                Elegance in <br />
                <span className="text-indigo-600">Every</span> Shop.
              </h1>
              <p className="text-lg text-slate-500 max-w-md font-medium leading-relaxed">
                Re-enter our world of premium products and curated experiences designed just for you.
              </p>
            </div>
          </motion.div>

          <div className="grid grid-cols-1 gap-4">
            {[
              { icon: ShieldCheck, title: "Secure Data", desc: "Your privacy is our priority" },
              { icon: Zap, title: "Instant Sync", desc: "Access your cart from any device" },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 + i * 0.1 }}
                className="flex gap-4 items-center p-6 rounded-[32px] bg-white/50 backdrop-blur-sm border border-white/50 shadow-sm"
              >
                <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-indigo-600 shadow-sm">
                  <item.icon size={22} />
                </div>
                <div>
                  <h4 className="font-black text-slate-900 text-sm tracking-tight">{item.title}</h4>
                  <p className="text-xs text-slate-400 font-bold uppercase tracking-wider">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Right: Login Form */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="bg-white/80 relative mt-28 backdrop-blur-2xl p-8 md:p-14 rounded-[56px] shadow-2xl shadow-slate-200/50 border border-white"
        >
          <div className="max-w-md mx-auto space-y-10 ">
            <div className="space-y-2">
              <h2 className="text-4xl font-black text-slate-900 tracking-tight">Login</h2>
              <p className="text-slate-400 font-bold uppercase text-xs tracking-[0.2em]">Unlock your experience</p>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div className="space-y-5">
                <div className="space-y-2">
                  <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1">Email Address</label>
                  <div className="relative group">
                    <Mail className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-600 transition-colors" size={18} />
                    <Input
                      {...register("email", { required: "Email is required" })}
                      type="email"
                      placeholder="name@example.com"
                      className="h-16 pl-14 rounded-2xl bg-slate-50 border-none focus-visible:ring-indigo-600 text-sm font-medium"
                    />
                  </div>
                  {errors.email && <p className="text-[10px] font-black text-red-500 ml-2 uppercase tracking-tighter">{errors.email.message}</p>}
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between items-end mb-1">
                    <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1">Password</label>
                  </div>
                  <div className="relative group">
                    <Lock className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-600 transition-colors" size={18} />
                    <Input
                      {...register("password", { required: "Password is required" })}
                      type={showPassword ? "text" : "password"}
                      placeholder="••••••••"
                      className="h-16 pl-14 pr-12 rounded-2xl bg-slate-50 border-none focus-visible:ring-indigo-600 text-sm font-medium"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
                    >
                      {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                  {errors.password && <p className="text-[10px] font-black text-red-500 ml-2 uppercase tracking-tighter">{errors.password.message}</p>}
                </div>
              </div>

              <div className="flex justify-end">
                <Link href="#" className="text-[10px] font-black text-indigo-600 hover:text-indigo-700 uppercase tracking-widest">Forgot Password?</Link>
              </div>

              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full h-16 rounded-2xl bg-indigo-600 hover:bg-slate-900 text-lg font-black shadow-xl shadow-indigo-100 gap-3 transition-all hover:-translate-y-1 active:scale-95 disabled:opacity-70"
              >
                {isSubmitting ? "Authenticating..." : <>Continue Shopping <ArrowRight size={20} /></>}
              </Button>
            </form>

            <div className="space-y-6">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <Separator className="w-full bg-slate-100" />
                </div>
                <div className="relative flex justify-center text-[10px] uppercase font-black tracking-[0.2em]">
                  <span className="bg-white px-4 text-slate-300">Or Discover More</span>
                </div>
              </div>

              <div className="flex flex-col gap-4">
                <Button variant="outline" asChild className="w-full h-16 rounded-2xl border-2 border-slate-50 bg-slate-50/50 hover:bg-white hover:border-indigo-600 text-slate-900 font-black text-sm transition-all">
                  <Link href="/signUp">Create New Account</Link>
                </Button>

                <Link href="/" className="flex items-center justify-center gap-2 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] hover:text-indigo-600 transition-all group">
                  <ChevronLeft size={16} className="group-hover:-translate-x-1 transition-transform" /> Back to store
                </Link>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
