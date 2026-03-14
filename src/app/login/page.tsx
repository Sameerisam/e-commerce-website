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

  const pendingCartItem = useSelector((state: RootState) => state.addToCart.pendingCartItem);
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
            role: resp.data.user?.role || "user"
          })
        );

        dispatch(setUserEmail(data.email));
        reset();

        // Smooth redirection
        const dest = (action === "buyNow" || buyNowItem)
          ? '/delivery_Information'
          : callbackUrl;

        setTimeout(() => router.push(dest), 300);
      }
    } catch (error: any) {
      if (error.response?.status === 400) {
        setError("password", { message: "Invalid email or password" });
      }
      console.error("Login error:", error);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50/50 flex items-center justify-center p-4 pt-24 pb-12 relative overflow-hidden">
      {/* Abstract background elements for premium feel */}
      <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_top_right,rgba(99,102,241,0.05),transparent_40%)] -z-10" />
      <div className="absolute bottom-0 right-0 w-full h-full bg-[radial-gradient(circle_at_bottom_left,rgba(99,102,241,0.03),transparent_40%)] -z-10" />

      <div className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

        {/* Left: Branding & Benefits */}
        <div className="hidden lg:flex flex-col space-y-12 pr-12">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-6"
          >
            <Link href="/" className="flex items-center gap-2 mb-12">
              <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center text-white font-bold text-xl shadow-lg">M</div>
              <span className="font-black tracking-tight text-slate-900 text-2xl">MYSTORE</span>
            </Link>

            <h1 className="text-6xl font-black text-slate-900 leading-tight tracking-tighter">
              Welcome back to <br />
              <span className="text-indigo-600 uppercase">Premium</span> shopping.
            </h1>
            <p className="text-xl text-slate-500 max-w-md">
              Sign in to access your saved orders, personalized recommendations, and member-only rewards.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 gap-6">
            {[
              { icon: ShieldCheck, title: "Secure Access", desc: "Enterprise-grade encryption for your data" },
              { icon: Zap, title: "Fast Checkout", desc: "Saved addresses and payment methods" },
              { icon: Star, title: "Points & Rewards", desc: "Earn 2x points on every purchase" }
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="flex gap-4 items-center p-6 rounded-3xl bg-slate-50 border border-slate-100 group hover:border-indigo-100 hover:bg-white transition-all duration-300"
              >
                <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-indigo-600 shadow-sm group-hover:scale-110 transition-transform">
                  <item.icon size={24} />
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 tracking-tight">{item.title}</h4>
                  <p className="text-sm text-slate-400 font-medium">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Right: Login Form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white lg:bg-slate-50 lg:p-12 rounded-[48px] border-none lg:border lg:border-slate-100"
        >
          <div className="max-w-md mx-auto space-y-10">
            <div className="text-center lg:text-left space-y-2">
              <h2 className="text-3xl font-black text-slate-900 tracking-tight">Sign In</h2>
              <p className="text-slate-400 font-bold uppercase text-xs tracking-widest">Access your personal dashboard</p>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-700 ml-1 uppercase tracking-wider">Email Address</label>
                  <div className="relative group">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-600 transition-colors" size={20} />
                    <Input
                      {...register("email", { required: "Email is required" })}
                      type="email"
                      placeholder="name@example.com"
                      className="h-14 pl-12 rounded-2xl bg-white border-slate-200 focus-visible:ring-indigo-600"
                    />
                  </div>
                  {errors.email && <p className="text-xs font-bold text-red-500 ml-1 uppercase">{errors.email.message}</p>}
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between items-end mb-1">
                    <label className="text-sm font-bold text-slate-700 ml-1 uppercase tracking-wider">Password</label>
                    <Link href="#" className="text-xs font-bold text-indigo-600 hover:text-indigo-700 uppercase tracking-wider">Forgot?</Link>
                  </div>
                  <div className="relative group">
                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-600 transition-colors" size={20} />
                    <Input
                      {...register("password", { required: "Password is required" })}
                      type={showPassword ? "text" : "password"}
                      placeholder="••••••••"
                      className="h-14 pl-12 pr-12 rounded-2xl bg-white border-slate-200 focus-visible:ring-indigo-600"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
                    >
                      {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                    </button>
                  </div>
                  {errors.password && <p className="text-xs font-bold text-red-500 ml-1 uppercase">{errors.password.message}</p>}
                </div>
              </div>

              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full h-14 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-lg font-bold shadow-xl shadow-indigo-100 gap-2 transition-all hover:-translate-y-1 active:scale-95 disabled:opacity-70"
              >
                {isSubmitting ? "Signing in..." : <>Continue <ArrowRight size={20} /></>}
              </Button>
            </form>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <Separator className="w-full" />
              </div>
              <div className="relative flex justify-center text-xs uppercase font-bold tracking-widest">
                <span className="bg-white lg:bg-slate-50 px-4 text-slate-400">New around here?</span>
              </div>
            </div>

            <Button variant="outline" asChild className="w-full h-14 rounded-2xl border-2 border-slate-100 bg-white hover:bg-slate-50 hover:border-slate-200 text-slate-900 font-bold transition-all items-center justify-center">
              <Link href="/signUp">Create an account</Link>
            </Button>

            <Link href="/" className="flex items-center justify-center gap-1 text-xs font-bold text-slate-300 uppercase tracking-widest hover:text-indigo-600 transition-colors">
              <ChevronLeft size={16} /> Back to store
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
