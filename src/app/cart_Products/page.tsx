"use client";

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { motion, AnimatePresence } from "framer-motion";
import {
    Trash2,
    Minus,
    Plus,
    ArrowLeft,
    ShoppingBag,
    ChevronRight,
    ShieldCheck,
    Truck,
    CreditCard
} from "lucide-react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Link from "next/link";

import { removeFromCart, updateQuantity, setBuyNowItem } from "@/redux/slices/add_To_Cart/page";
import { RootState } from "@/redux/store";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

type CartItem = {
    id: string | number;
    title: string;
    price: number;
    image: string;
    category?: string;
    quantity?: number;
};

export default function CartPage() {
    const dispatch = useDispatch();
    const cart = useSelector((state: RootState) => state.addToCart.items as CartItem[]);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    const handleRemove = (itemId: string | number) => {
        dispatch(removeFromCart({ id: itemId }));
        toast.error("Removed from cart", {
            position: "bottom-right",
            autoClose: 1500,
            theme: "colored"
        });
    };

    const handleQuantityChange = (item: CartItem, change: number) => {
        const newQuantity = (item.quantity || 1) + change;
        if (newQuantity >= 1) {
            dispatch(updateQuantity({ id: item.id, quantity: newQuantity }));
        }
    };

    const subtotal = cart.reduce(
        (total, item) => total + item.price * (item.quantity || 1),
        0
    );
    const shipping = subtotal > 150 ? 0 : 15;
    const tax = subtotal * 0.08;
    const total = subtotal + shipping + tax;

    if (!mounted) return (
        <div className="min-h-screen flex items-center justify-center">
            <div className="w-12 h-12 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin" />
        </div>
    );

    return (
        <div className="bg-slate-50 min-h-screen pt-24 pb-20">
            <div className="container mx-auto px-4">
                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
                    <div className="space-y-2">
                        <Link href="/" className="text-indigo-600 font-bold text-sm flex items-center gap-1 hover:gap-2 transition-all">
                            <ArrowLeft size={16} /> Continue Shopping
                        </Link>
                        <h1 className="text-4xl font-black text-slate-900 tracking-tight flex items-center gap-3">
                            Your Bag <Badge className="bg-slate-900 text-white rounded-full px-3">{cart.length}</Badge>
                        </h1>
                    </div>
                </div>

                {cart.length === 0 ? (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-white rounded-[40px] p-16 text-center shadow-2xl shadow-slate-200 border border-slate-100 max-w-2xl mx-auto"
                    >
                        <div className="w-24 h-24 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-8 text-slate-300">
                            <ShoppingBag size={48} />
                        </div>
                        <h2 className="text-3xl font-black text-slate-900 mb-4">Your bag is empty</h2>
                        <p className="text-slate-500 mb-10 max-w-sm mx-auto leading-relaxed">
                            Looks like you haven't added anything to your bag yet. Explore our latest collections and find something you love!
                        </p>
                        <Button asChild className="h-16 px-12 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-lg font-bold shadow-xl shadow-indigo-100 transition-all hover:-translate-y-1">
                            <Link href="/">Browse Products</Link>
                        </Button>
                    </motion.div>
                ) : (
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
                        {/* Cart Items List */}
                        <div className="lg:col-span-8 space-y-4">
                            <AnimatePresence mode="popLayout">
                                {cart.map((item) => (
                                    <motion.div
                                        key={item.id}
                                        layout
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, scale: 0.95 }}
                                        className="bg-white rounded-[32px] p-6 shadow-sm border border-slate-100 flex flex-col sm:flex-row items-center gap-8 group hover:shadow-xl hover:shadow-slate-200 transition-all duration-300"
                                    >
                                        <div className="w-32 h-32 bg-slate-50 rounded-2xl p-4 flex items-center justify-center shrink-0">
                                            <img
                                                src={item.image}
                                                alt={item.title}
                                                className="max-h-full object-contain mix-blend-multiply transition-transform group-hover:scale-110"
                                            />
                                        </div>

                                        <div className="flex-grow space-y-2 text-center sm:text-left">
                                            <Badge className="bg-indigo-50 text-indigo-700 hover:bg-indigo-50 border-none font-bold uppercase tracking-widest text-[9px]">
                                                {item.category || "General"}
                                            </Badge>
                                            <h3 className="text-xl font-black text-slate-900 leading-tight line-clamp-1">
                                                {item.title}
                                            </h3>
                                            <p className="text-sm font-medium text-slate-400">Expected delivery in 2-4 business days</p>

                                            <div className="flex items-center justify-center sm:justify-start gap-4 pt-2">
                                                <div className="flex items-center bg-slate-50 rounded-xl p-1 border border-slate-100">
                                                    <Button
                                                        variant="ghost"
                                                        size="icon"
                                                        className="h-8 w-8 rounded-lg hover:bg-white"
                                                        onClick={() => handleQuantityChange(item, -1)}
                                                    >
                                                        <Minus size={14} />
                                                    </Button>
                                                    <span className="w-8 text-center font-black text-slate-900">{item.quantity}</span>
                                                    <Button
                                                        variant="ghost"
                                                        size="icon"
                                                        className="h-8 w-8 rounded-lg hover:bg-white"
                                                        onClick={() => handleQuantityChange(item, 1)}
                                                    >
                                                        <Plus size={14} />
                                                    </Button>
                                                </div>
                                                <Button
                                                    variant="ghost"
                                                    size="icon"
                                                    className="text-slate-300 hover:text-red-500 hover:bg-red-50"
                                                    onClick={() => handleRemove(item.id)}
                                                >
                                                    <Trash2 size={18} />
                                                </Button>
                                            </div>
                                        </div>

                                        <div className="text-right sm:min-w-[100px]">
                                            <p className="text-2xl font-black text-slate-900">${(item.price * (item.quantity || 1)).toFixed(2)}</p>
                                            <p className="text-xs font-bold text-slate-400">${item.price.toFixed(2)} each</p>
                                        </div>
                                    </motion.div>
                                ))}
                            </AnimatePresence>
                        </div>

                        {/* Order Summary Checkout Card */}
                        <div className="lg:col-span-4 lg:sticky lg:top-28">
                            <div className="bg-white rounded-[40px] p-8 shadow-2xl shadow-indigo-900/5 border border-slate-100 space-y-6">
                                <h2 className="text-2xl font-black text-slate-900 tracking-tight">Summary</h2>

                                <div className="space-y-4">
                                    <div className="flex justify-between text-slate-500 font-bold text-sm uppercase tracking-wider">
                                        <span>Subtotal</span>
                                        <span className="text-slate-900">${subtotal.toFixed(2)}</span>
                                    </div>
                                    <div className="flex justify-between text-slate-500 font-bold text-sm uppercase tracking-wider">
                                        <span>Shipping</span>
                                        <span className={shipping === 0 ? "text-emerald-500" : "text-slate-900"}>
                                            {shipping === 0 ? "FREE" : `$${shipping.toFixed(2)}`}
                                        </span>
                                    </div>
                                    <div className="flex justify-between text-slate-500 font-bold text-sm uppercase tracking-wider">
                                        <span>Estimated Tax</span>
                                        <span className="text-slate-900">${tax.toFixed(2)}</span>
                                    </div>
                                </div>

                                <Separator className="bg-slate-100" />

                                <div className="flex justify-between items-end">
                                    <span className="text-slate-900 font-black text-xl tracking-tight uppercase">Total Cost</span>
                                    <span className="text-4xl font-black text-indigo-600 tracking-tighter">${total.toFixed(2)}</span>
                                </div>

                                <Button asChild className="w-full h-16 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-lg font-bold shadow-xl shadow-indigo-100 gap-2 transition-all hover:-translate-y-1 active:scale-95">
                                    <Link href="/delivery_Information" onClick={() => dispatch(setBuyNowItem(null))}>
                                        Proceed Checkout <ChevronRight size={20} />
                                    </Link>
                                </Button>

                                <div className="space-y-4 pt-4">
                                    {[
                                        { icon: ShieldCheck, text: "Secure Payment", desc: "Encrypted checkout" },
                                        { icon: Truck, text: "Carbon Neutral", desc: "Eco-friendly delivery" },
                                        { icon: CreditCard, text: "Flexible Payment", desc: "Pay with Cards, PayPal or COD" }
                                    ].map((item, i) => (
                                        <div key={i} className="flex gap-4 items-center p-4 rounded-2xl bg-slate-50 border border-slate-100">
                                            <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-indigo-600 shadow-sm shrink-0">
                                                <item.icon size={20} />
                                            </div>
                                            <div>
                                                <h4 className="text-xs font-black text-slate-900 uppercase tracking-wider">{item.text}</h4>
                                                <p className="text-[10px] text-slate-400 font-bold uppercase">{item.desc}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
            <ToastContainer />
        </div>
    );
}
