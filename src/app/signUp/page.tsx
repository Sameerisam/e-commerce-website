"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useForm } from "react-hook-form";
import axios from "axios";
import { motion } from "framer-motion";
import {
  Mail,
  Lock,
  User as UserIcon,
  ArrowRight,
  Eye,
  EyeOff,
  ChevronLeft,
  CheckCircle2,
  ShieldCheck,
  Zap
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";

type user = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string
}

export default function SignUpPage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const { register, handleSubmit, watch, reset, formState: { errors, isSubmitting }, setError } = useForm<user>();

  const onSubmit = async (data: user) => {
    try {
      const resp = await axios.post("/api/auth", { data, action: "signup" });
      if (resp.status === 200) {
        setTimeout(() => router.push('/login'), 300);
      }
      reset();
    } catch (error: any) {
      if (error.response?.status === 400) {
        setError('email', { message: 'Email already exists' });
      }
      console.error("Signup error:", error);
    }
  };

  const password = watch("password");

  return (
    <div className="min-h-screen bg-slate-50/50 flex items-center justify-center p-4 pt-24 pb-12 relative overflow-hidden">
      {/* Abstract background elements for premium feel */}
      <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_top_right,rgba(99,102,241,0.05),transparent_40%)] -z-10" />
      <div className="absolute bottom-0 right-0 w-full h-full bg-[radial-gradient(circle_at_bottom_left,rgba(99,102,241,0.03),transparent_40%)] -z-10" />

      <div className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

        {/* Left: Branding & Sign Up Benefits */}
        <div className="hidden lg:flex flex-col space-y-12 pr-12 order-last lg:order-first">
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
              Start your <br />
              <span className="text-indigo-600 uppercase">Premium</span> journey.
            </h1>
            <p className="text-xl text-slate-500 max-w-md">
              Create an account to join 50k+ happy customers and unlock exclusive membership rewards today.
            </p>
          </motion.div>

          <div className="space-y-4">
            {[
              "15% Discount on your first order",
              "Early access to seasonal sales",
              "Personalized product recommendations",
              "Track orders in real-time",
              "Earn points on every purchase"
            ].map((benefit, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
                className="flex items-center gap-3 text-slate-500 font-bold uppercase text-[10px] tracking-widest"
              >
                <CheckCircle2 className="text-emerald-500" size={18} />
                <span>{benefit}</span>
              </motion.div>
            ))}
          </div>

          <div className="flex gap-4 p-6 rounded-3xl bg-slate-50 border border-slate-100 max-w-sm">
            <div className="flex -space-x-3">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="w-10 h-10 rounded-full border-2 border-white bg-slate-200 overflow-hidden shadow-sm">
                  <img src={`https://i.pravatar.cc/100?u=${i}`} alt="User" />
                </div>
              ))}
            </div>
            <div>
              <h4 className="font-black text-slate-900 text-sm tracking-tight">Join 50k+ Members</h4>
              <p className="text-xs text-slate-400 font-medium tracking-tight">Across 12 countries</p>
            </div>
          </div>
        </div>

        {/* Right: Signup Form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white lg:bg-slate-50 lg:p-12 rounded-[48px] border-none lg:border lg:border-slate-100"
        >
          <div className="max-w-md mx-auto space-y-8">
            <div className="text-center lg:text-left space-y-2">
              <h2 className="text-3xl font-black text-slate-900 tracking-tight">Join MyStore</h2>
              <p className="text-slate-400 font-bold uppercase text-xs tracking-widest">Create your premium account</p>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-700 ml-1 uppercase tracking-wider">UserName</label>
                  <div className="relative group">
                    <UserIcon className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-600 transition-colors" size={20} />
                    <Input
                      {...register("name", { required: "Username is required" })}
                      type="text"
                      placeholder="Your name"
                      className="h-14 pl-12 rounded-2xl bg-white border-slate-200 focus-visible:ring-indigo-600"
                    />
                  </div>
                  {errors.name && <p className="text-xs font-bold text-red-500 ml-1 uppercase">{errors.name.message}</p>}
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-700 ml-1 uppercase tracking-wider">Email Address</label>
                  <div className="relative group">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-600 transition-colors" size={20} />
                    <Input
                      {...register("email", {
                        required: "Email is required",
                        pattern: { value: /^\S+@\S+$/i, message: "Invalid email" }
                      })}
                      type="email"
                      placeholder="name@example.com"
                      className="h-14 pl-12 rounded-2xl bg-white border-slate-200 focus-visible:ring-indigo-600"
                    />
                  </div>
                  {errors.email && <p className="text-xs font-bold text-red-500 ml-1 uppercase">{errors.email.message}</p>}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-700 ml-1 uppercase tracking-wider">Password</label>
                    <div className="relative group">
                      <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-600 transition-colors" size={18} />
                      <Input
                        {...register("password", {
                          required: "Password is required",
                          minLength: { value: 6, message: "Min 6 chars" }
                        })}
                        type={showPassword ? "text" : "password"}
                        placeholder="••••••"
                        className="h-14 pl-11 pr-11 rounded-2xl bg-white border-slate-200 focus-visible:ring-indigo-600 text-sm"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                      >
                        {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                      </button>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-700 ml-1 uppercase tracking-wider">Confirm</label>
                    <div className="relative group">
                      <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-600 transition-colors" size={18} />
                      <Input
                        {...register("confirmPassword", {
                          required: "Confirm your password",
                          validate: (value) => value === password || "Match fail"
                        })}
                        type={showConfirmPassword ? "text" : "password"}
                        placeholder="••••••"
                        className="h-14 pl-11 pr-11 rounded-2xl bg-white border-slate-200 focus-visible:ring-indigo-600 text-sm"
                      />
                      <button
                        type="button"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                      >
                        {showConfirmPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                      </button>
                    </div>
                  </div>
                </div>
                {(errors.password || errors.confirmPassword) && (
                  <p className="text-[10px] font-black text-red-500 uppercase tracking-wider text-center">
                    {errors.password?.message || errors.confirmPassword?.message}
                  </p>
                )}
              </div>

              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full h-14 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-lg font-bold shadow-xl shadow-indigo-100 gap-2 transition-all hover:-translate-y-1 active:scale-95 disabled:opacity-70"
              >
                {isSubmitting ? "Creating..." : <>Create Account <ArrowRight size={20} /></>}
              </Button>
            </form>

            <div className="text-center space-y-4">
              <p className="text-sm font-medium text-slate-500">
                Already have an account? <Link href="/login" className="text-indigo-600 font-bold hover:underline">Sign In</Link>
              </p>

              <Link href="/" className="flex items-center justify-center gap-1 text-[10px] font-black text-slate-300 uppercase tracking-[0.2em] hover:text-indigo-600 transition-colors">
                <ChevronLeft size={16} /> Back to store
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}