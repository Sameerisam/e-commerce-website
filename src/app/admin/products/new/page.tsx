"use client";

import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import {
    ArrowLeft,
    Save,
    Image as ImageIcon,
    Info,
    Layers,
    DollarSign,
    Box,
    Layout,
    CheckCircle2,
    XCircle
} from "lucide-react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

export default function NewProductPage() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        title: "",
        description: "",
        price: "",
        category: "",
        image: "",
        stock: "",
    });

    const categories = [
        "Electronics",
        "Jewelery",
        "Men's Clothing",
        "Women's Clothing",
        "Gaming",
        "Accessories"
    ];

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
            await axios.post("/api/products", formData);
            router.push("/admin/products");
        } catch (err) {
            console.error("Failed to add product", err);
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    return (
        <div className="max-w-5xl mx-auto space-y-10">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div className="space-y-1">
                    <div className="flex items-center gap-3 mb-2">
                        <Link href="/admin/products" className="w-10 h-10 rounded-xl bg-white border border-slate-100 flex items-center justify-center text-slate-400 hover:text-indigo-600 hover:border-indigo-100 transition-all shadow-sm">
                            <ArrowLeft size={18} />
                        </Link>
                        <Badge className="bg-indigo-50 text-indigo-600 hover:bg-indigo-50 border-none font-black text-[9px] uppercase tracking-widest px-3">Inventory Add</Badge>
                    </div>
                    <h2 className="text-4xl font-black text-slate-900 tracking-tight">Create Product</h2>
                    <p className="text-sm font-bold text-slate-400 uppercase tracking-widest">Publish new inventory to the global store</p>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                {/* Main Form Area */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="lg:col-span-8 bg-white rounded-[40px] border border-slate-100 shadow-sm p-8 md:p-12"
                >
                    <form onSubmit={handleSubmit} className="space-y-8">
                        {/* Section: Basic Info */}
                        <div className="space-y-6">
                            <div className="flex items-center gap-2 mb-4">
                                <Info size={18} className="text-indigo-600" />
                                <h3 className="text-sm font-black text-slate-900 uppercase tracking-widest">Product Basics</h3>
                            </div>

                            <div className="space-y-2">
                                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Title</label>
                                <Input
                                    name="title"
                                    placeholder="Enter premium title..."
                                    required
                                    onChange={handleChange}
                                    className="h-14 rounded-2xl bg-slate-50 border-none focus-visible:ring-indigo-600 px-6 font-bold"
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Detailed Description</label>
                                <textarea
                                    name="description"
                                    rows={5}
                                    placeholder="Tell the story of this product..."
                                    required
                                    onChange={handleChange}
                                    className="w-full rounded-2xl bg-slate-50 border-none focus-visible:ring-2 focus-visible:ring-indigo-600 px-6 py-4 font-medium outline-none text-sm transition-all"
                                />
                            </div>
                        </div>

                        <Separator className="bg-slate-50" />

                        {/* Section: Inventory and Price */}
                        <div className="space-y-6">
                            <div className="flex items-center gap-2 mb-4">
                                <Layout size={18} className="text-emerald-500" />
                                <h3 className="text-sm font-black text-slate-900 uppercase tracking-widest">Classification & Pricing</h3>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Category</label>
                                    <select
                                        name="category"
                                        required
                                        onChange={handleChange}
                                        className="h-14 w-full rounded-2xl bg-slate-50 border-none focus-visible:ring-2 focus-visible:ring-indigo-600 px-6 font-bold outline-none text-sm appearance-none cursor-pointer"
                                    >
                                        <option value="">Select Category</option>
                                        {categories.map(c => <option key={c} value={c}>{c}</option>)}
                                    </select>
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Price ($)</label>
                                        <Input
                                            name="price"
                                            type="number"
                                            step="0.01"
                                            placeholder="0.00"
                                            required
                                            onChange={handleChange}
                                            className="h-14 rounded-2xl bg-slate-50 border-none focus-visible:ring-indigo-600 px-6 font-bold"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Stock</label>
                                        <Input
                                            name="stock"
                                            type="number"
                                            placeholder="0"
                                            required
                                            onChange={handleChange}
                                            className="h-14 rounded-2xl bg-slate-50 border-none focus-visible:ring-indigo-600 px-6 font-bold"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

                        <Separator className="bg-slate-50" />

                        {/* Section: Assets */}
                        <div className="space-y-6">
                            <div className="flex items-center gap-2 mb-4">
                                <ImageIcon size={18} className="text-purple-500" />
                                <h3 className="text-sm font-black text-slate-900 uppercase tracking-widest">Visual Assets</h3>
                            </div>
                            <div className="space-y-2">
                                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Image URL</label>
                                <Input
                                    name="image"
                                    type="url"
                                    placeholder="https://images.unsplash.com/..."
                                    required
                                    onChange={handleChange}
                                    className="h-14 rounded-2xl bg-slate-50 border-none focus-visible:ring-indigo-600 px-6 font-bold"
                                />
                            </div>
                        </div>

                        <div className="pt-6 flex flex-col sm:flex-row gap-4">
                            <Button
                                type="submit"
                                disabled={loading}
                                className="h-16 flex-grow rounded-[20px] bg-slate-900 hover:bg-black text-white font-black text-lg gap-3 shadow-2xl shadow-slate-200 transition-all hover:-translate-y-1"
                            >
                                {loading ? "Publishing..." : <><Save size={20} /> Build & Publish Product</>}
                            </Button>
                            <Button variant="ghost" asChild className="h-16 px-8 rounded-[20px] font-black text-slate-400 hover:bg-slate-50 hover:text-slate-900 transition-colors">
                                <Link href="/admin/products">Discard Draft</Link>
                            </Button>
                        </div>
                    </form>
                </motion.div>

                {/* Live Preview Sidebar */}
                <div className="lg:col-span-4 space-y-8">
                    <div className="sticky top-28 space-y-8">
                        <div className="bg-slate-900 rounded-[40px] p-8 text-white relative overflow-hidden shadow-2xl shadow-indigo-500/10">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500 blur-[60px] opacity-20" />
                            <h4 className="text-lg font-black tracking-tight mb-6">Real-time Preview</h4>

                            <div className="aspect-square rounded-3xl bg-white/5 border border-white/10 p-8 flex items-center justify-center relative overflow-hidden group mb-6">
                                <AnimatePresence mode="wait">
                                    {formData.image ? (
                                        <motion.img
                                            key={formData.image}
                                            initial={{ opacity: 0, scale: 0.9 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            src={formData.image}
                                            className="max-h-full object-contain mix-blend-screen drop-shadow-2xl"
                                            onError={(e) => (e.currentTarget.style.display = "none")}
                                        />
                                    ) : (
                                        <div className="text-center space-y-2 text-white/20">
                                            <ImageIcon size={48} strokeWidth={1} className="mx-auto" />
                                            <p className="text-[10px] font-black uppercase tracking-widest">Awaiting Media</p>
                                        </div>
                                    )}
                                </AnimatePresence>
                            </div>

                            <div className="space-y-4">
                                <div>
                                    <Badge className="bg-indigo-500 text-white border-none py-0.5 px-3 uppercase text-[9px] font-black tracking-widest mb-2">
                                        {formData.category || "No Category"}
                                    </Badge>
                                    <h5 className="text-xl font-black truncate">{formData.title || "Untitled Product"}</h5>
                                </div>
                                <div className="flex justify-between items-end">
                                    <span className="text-3xl font-black text-indigo-400 tracking-tighter">${formData.price || "0.00"}</span>
                                    <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">{formData.stock || "0"} in Stock</span>
                                </div>
                            </div>
                        </div>

                        {/* Validation Summary Card */}
                        <div className="bg-white rounded-[40px] p-8 border border-slate-100 space-y-4 shadow-sm">
                            <h4 className="text-xs font-black text-slate-400 uppercase tracking-widest">Quality Checklist</h4>
                            <div className="space-y-3">
                                {[
                                    { label: "High Resolution Media", met: !!formData.image },
                                    { label: "Detailed Metadata", met: formData.description.length > 50 },
                                    { label: "Valid Pricing Model", met: Number(formData.price) > 0 },
                                    { label: "Initial Inventory", met: Number(formData.stock) >= 1 }
                                ].map((item, i) => (
                                    <div key={i} className="flex items-center gap-3">
                                        {item.met ? <CheckCircle2 size={16} className="text-emerald-500" /> : <XCircle size={16} className="text-slate-200" />}
                                        <span className={`text-xs font-bold ${item.met ? 'text-slate-700' : 'text-slate-300'}`}>{item.label}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
