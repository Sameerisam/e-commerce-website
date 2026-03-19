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
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";

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
    }
  };

  const password = watch("password");

  return (
    <section className="min-h-screen relative flex items-center justify-center p-4 overflow-hidden mt-[-6rem] pt-24" style={{ background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)' }}>
      {/* Decorative Animated Shapes */}
      <motion.div
        animate={{
          scale: [1, 1.3, 1],
          rotate: [0, 45, 0],
          x: [0, 60, 0],
          y: [0, -40, 0]
        }}
        transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
        className="absolute -top-32 -right-32 w-[500px] h-[500px] bg-indigo-200/20 rounded-full blur-[120px] -z-10"
      />
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          rotate: [0, -90, 0],
          x: [0, -40, 0],
          y: [0, 60, 0]
        }}
        transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
        className="absolute -bottom-32 -left-32 w-96 h-96 bg-emerald-200/20 rounded-full blur-[100px] -z-10"
      />

      <div className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative z-10">
        {/* Left: Branding & Benefits */}
        <div className="hidden lg:flex flex-col space-y-12 pr-12">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-6"
          >
            <div className="space-y-4">
              <Badge className="bg-emerald-600/10 text-emerald-600 border-none px-4 py-1 rounded-full font-black uppercase tracking-widest text-[10px]">
                Membership Registration
              </Badge>
              <h1 className="text-7xl font-black text-slate-900 leading-[0.9] tracking-tighter">
                Joined the <br />
                <span className="text-emerald-600">Elite</span> Circle.
              </h1>
              <p className="text-lg text-slate-500 max-w-md font-medium leading-relaxed">
                Connect with thousands of premium shoppers and enjoy exclusive benefits tailored for you.
              </p>
            </div>
          </motion.div>

          <div className="space-y-3">
            {[
              "Priority Customer Support",
              "Exclusive seasonal collections",
              "Next-day delivery on select items",
              "Seamless returns and exchanges"
            ].map((benefit, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 + i * 0.1 }}
                className="flex items-center gap-3 text-slate-400 font-bold uppercase text-[10px] tracking-widest"
              >
                <div className="w-2 h-2 bg-emerald-500 rounded-full shadow-[0_0_10px_rgba(16,185,129,0.5)]" />
                <span>{benefit}</span>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="flex gap-4 p-8 rounded-[40px] bg-white/50 backdrop-blur-md border border-white/50 shadow-sm max-w-sm"
          >
            <div className="flex -space-x-3">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="w-10 h-10 rounded-full border-4 border-white bg-slate-200 overflow-hidden shadow-sm">
                  <img src={`https://i.pravatar.cc/100?u=${i + 10}`} alt="User" />
                </div>
              ))}
              <div className="w-10 h-10 rounded-full border-4 border-white bg-indigo-600 flex items-center justify-center text-white text-[10px] font-black">+</div>
            </div>
            <div>
              <h4 className="font-black text-slate-900 text-sm tracking-tight">50,000+ Members</h4>
              <p className="text-[10px] text-slate-400 font-black uppercase tracking-wider">Trusted worldwide</p>
            </div>
          </motion.div>
        </div>

        {/* Right: Signup Form */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="bg-white/80 mt-28 backdrop-blur-2xl p-8 md:p-14 rounded-[56px] shadow-2xl shadow-slate-200/50 border border-white"
        >
          <div className="max-w-md mx-auto space-y-8">
            <div className="space-y-2">
              <h2 className="text-4xl font-black text-slate-900 tracking-tight">Register</h2>
              <p className="text-slate-400 font-bold uppercase text-xs tracking-[0.2em]">Become a member today</p>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1">Username</label>
                  <div className="relative group">
                    <UserIcon className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-emerald-600 transition-colors" size={18} />
                    <Input
                      {...register("name", { required: "Name is required" })}
                      placeholder="Enter your name"
                      className="h-16 pl-14 rounded-2xl bg-slate-50 border-none focus-visible:ring-emerald-600 text-sm font-medium"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1">Email Address</label>
                  <div className="relative group">
                    <Mail className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-emerald-600 transition-colors" size={18} />
                    <Input
                      {...register("email", {
                        required: "Email is required",
                        pattern: { value: /^\S+@\S+$/i, message: "Invalid email" }
                      })}
                      type="email"
                      placeholder="name@example.com"
                      className="h-16 pl-14 rounded-2xl bg-slate-50 border-none focus-visible:ring-emerald-600 text-sm font-medium"
                    />
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1">Password</label>
                    <div className="relative group">
                      <Lock className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-emerald-600 transition-colors" size={18} />
                      <Input
                        {...register("password", { required: true, minLength: 6 })}
                        type={showPassword ? "text" : "password"}
                        placeholder="••••••••"
                        className="h-16 pl-14 pr-12 rounded-2xl bg-slate-50 border-none focus-visible:ring-emerald-600 text-sm font-medium"
                      />
                      <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-5 top-1/2 -translate-y-1/2 text-slate-400">
                        {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                      </button>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1">Confirm Password</label>
                    <div className="relative group">
                      <Lock className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-emerald-600 transition-colors" size={18} />
                      <Input
                        {...register("confirmPassword", {
                          required: true,
                          validate: val => val === watch('password')
                        })}
                        type={showConfirmPassword ? "text" : "password"}
                        placeholder="••••••••"
                        className="h-16 pl-14 pr-12 rounded-2xl bg-slate-50 border-none focus-visible:ring-emerald-600 text-sm font-medium"
                      />
                      <button type="button" onClick={() => setShowConfirmPassword(!showConfirmPassword)} className="absolute right-5 top-1/2 -translate-y-1/2 text-slate-400">
                        {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full h-16 rounded-2xl bg-emerald-600 hover:bg-slate-900 text-lg font-black shadow-xl shadow-emerald-100 gap-3 transition-all hover:-translate-y-1 active:scale-95 disabled:opacity-70"
              >
                {isSubmitting ? "Creating..." : <>Create Account <ArrowRight size={20} /></>}
              </Button>
            </form>

            <div className="text-center space-y-6">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <Separator className="w-full bg-slate-100" />
                </div>
                <div className="relative flex justify-center text-[10px] uppercase font-black tracking-[0.2em]">
                  <span className="bg-white px-4 text-slate-300">Ready to join?</span>
                </div>
              </div>

              <div className="flex flex-col gap-4">
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                  Already a member? <Link href="/login" className="text-emerald-600 hover:underline">Sign In Here</Link>
                </p>
                <Link href="/" className="flex items-center justify-center gap-2 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] hover:text-emerald-600 transition-all group">
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