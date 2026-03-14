"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter, useParams } from "next/navigation";
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
    XCircle,
    Eye
} from "lucide-react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

export default function EditProductPage() {
    const router = useRouter();
    const { id } = useParams();
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
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

    useEffect(() => {
        if (id) {
            axios.get(`/api/products/${id}`)
                .then(resp => {
                    const p = resp.data;
                    setFormData({
                        title: p.title,
                        description: p.description,
                        price: p.price.toString(),
                        category: p.category,
                        image: p.image,
                        stock: p.stock?.toString() || "0",
                    });
                    setLoading(false);
                })
                .catch(err => {
                    console.error("Fetch failed", err);
                    router.push("/admin/products");
                });
        }
    }, [id, router]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSaving(true);
        try {
            await axios.put(`/api/products/${id}`, formData);
            router.push("/admin/products");
        } catch (err) {
            console.error("Update failed", err);
        } finally {
            setSaving(false);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    if (loading) return (
        <div className="flex flex-col items-center justify-center h-[60vh] space-y-4">
            <div className="w-12 h-12 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin" />
            <p className="text-slate-400 font-bold uppercase text-[10px] tracking-widest">Hydrating Product Data...</p>
        </div>
    );

    return (
        <div className="max-w-5xl mx-auto space-y-10">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div className="space-y-1">
                    <div className="flex items-center gap-3 mb-2">
                        <Link href="/admin/products" className="w-10 h-10 rounded-xl bg-white border border-slate-100 flex items-center justify-center text-slate-400 hover:text-indigo-600 hover:border-indigo-100 transition-all shadow-sm">
                            <ArrowLeft size={18} />
                        </Link>
                        <Badge className="bg-orange-50 text-orange-600 hover:bg-orange-50 border-none font-black text-[9px] uppercase tracking-widest px-3">Inventory Edit</Badge>
                    </div>
                    <h2 className="text-4xl font-black text-slate-900 tracking-tight">Edit Product</h2>
                    <p className="text-sm font-bold text-slate-400 uppercase tracking-widest">Update specifications and availability</p>
                </div>
                <div className="flex gap-3">
                    <Button variant="outline" asChild className="h-12 rounded-xl bg-white border-slate-200 font-bold px-6 gap-2 shadow-sm">
                        <Link href={`/detail_page/${id}`} target="_blank"><Eye size={18} /> View Live</Link>
                    </Button>
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
                        <div className="space-y-6">
                            <div className="flex items-center gap-2 mb-4">
                                <Info size={18} className="text-indigo-600" />
                                <h3 className="text-sm font-black text-slate-900 uppercase tracking-widest">Core Information</h3>
                            </div>

                            <div className="space-y-2">
                                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Product Title</label>
                                <Input
                                    name="title"
                                    value={formData.title}
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
                                    value={formData.description}
                                    rows={5}
                                    placeholder="Describe the product details..."
                                    required
                                    onChange={handleChange}
                                    className="w-full rounded-2xl bg-slate-50 border-none focus-visible:ring-2 focus-visible:ring-indigo-600 px-6 py-4 font-medium outline-none text-sm transition-all shadow-inner"
                                />
                            </div>
                        </div>

                        <Separator className="bg-slate-50" />

                        <div className="space-y-6">
                            <div className="flex items-center gap-2 mb-4">
                                <Layout size={18} className="text-emerald-500" />
                                <h3 className="text-sm font-black text-slate-900 uppercase tracking-widest">Management & Pricing</h3>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Category</label>
                                    <select
                                        name="category"
                                        value={formData.category}
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
                                            value={formData.price}
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
                                            value={formData.stock}
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
                                    value={formData.image}
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
                                disabled={saving}
                                className="h-16 flex-grow rounded-[20px] bg-slate-900 hover:bg-black text-white font-black text-lg gap-3 shadow-2xl shadow-slate-200 transition-all hover:-translate-y-1"
                            >
                                {saving ? "Updating..." : <><Save size={20} /> Deploy Updates</>}
                            </Button>
                            <Button variant="ghost" asChild className="h-16 px-8 rounded-[20px] font-black text-slate-400 hover:bg-slate-50 hover:text-slate-900 transition-colors">
                                <Link href="/admin/products">Cancel Edits</Link>
                            </Button>
                        </div>
                    </form>
                </motion.div>

                {/* Preview Sidebar */}
                <div className="lg:col-span-4 space-y-8">
                    <div className="sticky top-28 space-y-8">
                        <div className="bg-slate-900 rounded-[40px] p-8 text-white relative overflow-hidden shadow-2xl shadow-orange-500/10 border border-slate-800">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-orange-500 blur-[80px] opacity-20" />
                            <h4 className="text-lg font-black tracking-tight mb-6">Live Edit View</h4>

                            <div className="aspect-square rounded-3xl bg-white/5 border border-white/10 p-8 flex items-center justify-center relative overflow-hidden group mb-6">
                                <AnimatePresence mode="wait">
                                    {formData.image && (
                                        <motion.img
                                            key={formData.image}
                                            initial={{ opacity: 0, scale: 0.9 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            src={formData.image}
                                            className="max-h-full object-contain mix-blend-screen drop-shadow-2xl"
                                        />
                                    )}
                                </AnimatePresence>
                            </div>

                            <div className="space-y-4">
                                <div>
                                    <Badge className="bg-orange-500 text-white border-none py-0.5 px-3 uppercase text-[9px] font-black tracking-widest mb-2">
                                        {formData.category || "General"}
                                    </Badge>
                                    <h5 className="text-xl font-black truncate">{formData.title || "Untitled"}</h5>
                                </div>
                                <div className="flex justify-between items-end">
                                    <span className="text-3xl font-black text-orange-400 tracking-tighter">${formData.price || "0.00"}</span>
                                    <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">{formData.stock || "0"} in Stock</span>
                                </div>
                            </div>
                        </div>

                        <div className="bg-white rounded-[40px] p-8 border border-slate-100 space-y-4 shadow-sm">
                            <h4 className="text-xs font-black text-slate-400 uppercase tracking-widest">Modification Log</h4>
                            <div className="space-y-4 pt-2">
                                <div className="flex items-start gap-3">
                                    <div className="w-1.5 h-1.5 rounded-full bg-indigo-600 mt-1.5 shrink-0" />
                                    <p className="text-[10px] font-bold text-slate-500 uppercase leading-relaxed tracking-wider">
                                        Last modified by <span className="text-slate-900">Admin</span> 2 minutes ago
                                    </p>
                                </div>
                                <div className="flex items-start gap-3">
                                    <div className="w-1.5 h-1.5 rounded-full bg-slate-200 mt-1.5 shrink-0" />
                                    <p className="text-[10px] font-bold text-slate-300 uppercase leading-relaxed tracking-wider">
                                        Original publish date Dec 12, 2025
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
