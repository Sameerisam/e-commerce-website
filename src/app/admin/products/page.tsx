"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";
import {
    Plus,
    Trash2,
    Edit,
    ExternalLink,
    Package,
    Search,
    Filter,
    MoreVertical,
    AlertCircle
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

type Product = {
    _id: string;
    title: string;
    price: number;
    category: string;
    stock: number;
    image: string;
};

export default function AdminProductsPage() {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        try {
            const resp = await axios.get("/api/products");
            setProducts(resp.data);
        } catch (err) {
            console.error("Failed to fetch products", err);
        } finally {
            setLoading(false);
        }
    };

    const deleteProduct = async (id: string) => {
        if (!confirm("Are you sure you want to delete this product?")) return;
        try {
            await axios.delete(`/api/products/${id}`);
            setProducts(products.filter(p => p._id !== id));
        } catch (err) {
            console.error("Delete failed", err);
        }
    };

    const filteredProducts = products.filter(p =>
        p.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.category.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (loading) return (
        <div className="flex flex-col items-center justify-center h-[60vh] space-y-4">
            <div className="w-12 h-12 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin" />
            <p className="text-slate-400 font-bold uppercase text-[10px] tracking-widest">Loading Inventory...</p>
        </div>
    );

    return (
        <div className="space-y-10">
            {/* Page Header */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div className="space-y-1">
                    <h2 className="text-4xl font-black text-slate-900 tracking-tight">Products</h2>
                    <p className="text-sm font-bold text-slate-400 uppercase tracking-widest">Inventory management system</p>
                </div>
                <Button asChild className="h-14 rounded-2xl bg-indigo-600 hover:bg-indigo-700 font-bold px-8 shadow-xl shadow-indigo-100 gap-2 transition-all hover:-translate-y-1">
                    <Link href="/admin/products/new">
                        <Plus size={20} /> Add New Product
                    </Link>
                </Button>
            </div>

            {/* Filter & Search Bar */}
            <div className="bg-white p-4 rounded-[32px] border border-slate-100 shadow-sm flex flex-col md:flex-row gap-4">
                <div className="relative flex-grow group">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-600 transition-colors" size={18} />
                    <Input
                        placeholder="Search by name or category..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="h-12 pl-12 bg-slate-50 border-none rounded-2xl focus-visible:ring-indigo-600"
                    />
                </div>
                <div className="flex gap-2">
                    <Button variant="outline" className="h-12 rounded-2xl border-slate-100 bg-slate-50 font-bold gap-2 hover:bg-white">
                        <Filter size={18} /> Filter
                    </Button>
                    <Separator orientation="vertical" className="h-12 hidden md:block" />
                    <div className="flex items-center px-4 text-xs font-bold text-slate-400 uppercase tracking-widest">
                        {filteredProducts.length} Results
                    </div>
                </div>
            </div>

            {/* Products Table Area */}
            <div className="bg-white rounded-[40px] border border-slate-100 shadow-sm overflow-hidden">
                <div className="overflow-x-auto whitespace-nowrap">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 border-b border-slate-50">
                                <th className="px-8 py-6">Product Details</th>
                                <th className="px-6 py-6">Category</th>
                                <th className="px-6 py-6">Pricing</th>
                                <th className="px-6 py-6">Stock Level</th>
                                <th className="px-8 py-6 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-50">
                            <AnimatePresence mode="popLayout">
                                {filteredProducts.length === 0 ? (
                                    <motion.tr
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        className="text-center"
                                    >
                                        <td colSpan={5} className="py-24 space-y-4">
                                            <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mx-auto text-slate-200">
                                                <Package size={40} />
                                            </div>
                                            <p className="text-slate-400 font-bold uppercase text-[10px] tracking-widest">No products found matching your search</p>
                                        </td>
                                    </motion.tr>
                                ) : (
                                    filteredProducts.map((product, i) => (
                                        <motion.tr
                                            key={product._id}
                                            layout
                                            initial={{ opacity: 0, x: -10 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ delay: i * 0.05 }}
                                            className="group hover:bg-slate-50/50 transition-colors"
                                        >
                                            <td className="px-8 py-5">
                                                <div className="flex items-center gap-4">
                                                    <div className="w-14 h-14 rounded-2xl bg-white border border-slate-100 p-2 flex items-center justify-center shrink-0 shadow-sm group-hover:scale-105 transition-transform duration-300">
                                                        <img
                                                            src={product.image}
                                                            alt={product.title}
                                                            className="max-h-full object-contain mix-blend-multiply"
                                                        />
                                                    </div>
                                                    <div className="min-w-0">
                                                        <p className="text-sm font-black text-slate-900 truncate max-w-[200px]">{product.title}</p>
                                                        <p className="text-[10px] font-bold text-slate-400 uppercase mt-1">ID: {product._id.slice(-8)}</p>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-5">
                                                <Badge className="bg-slate-100 text-slate-500 hover:bg-slate-100 border-none px-3 uppercase text-[9px] font-black tracking-widest">
                                                    {product.category}
                                                </Badge>
                                            </td>
                                            <td className="px-6 py-5">
                                                <span className="text-base font-black text-indigo-600 tracking-tight">${product.price.toFixed(2)}</span>
                                            </td>
                                            <td className="px-6 py-5">
                                                <div className="flex items-center gap-2">
                                                    <div className={`h-2.5 w-16 rounded-full overflow-hidden bg-slate-100 relative`}>
                                                        <motion.div
                                                            initial={{ width: 0 }}
                                                            animate={{ width: `${Math.min(100, (product.stock / 20) * 100)}%` }}
                                                            className={`h-full rounded-full ${product.stock < 10 ? 'bg-red-500' : 'bg-emerald-500'}`}
                                                        />
                                                    </div>
                                                    <span className={`text-[10px] font-black uppercase tracking-widest ${product.stock < 10 ? 'text-red-500' : 'text-slate-400'}`}>
                                                        {product.stock} {product.stock === 1 ? 'UNIT' : 'UNITS'}
                                                    </span>
                                                    {product.stock < 10 && <AlertCircle size={14} className="text-red-500" />}
                                                </div>
                                            </td>
                                            <td className="px-8 py-5 text-right">
                                                <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                                    <Button variant="ghost" size="icon" asChild className="h-10 w-10 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-xl">
                                                        <Link href={`/detail_page/${product._id}`} target="_blank">
                                                            <ExternalLink size={18} />
                                                        </Link>
                                                    </Button>
                                                    <Button variant="ghost" size="icon" asChild className="h-10 w-10 text-slate-400 hover:text-orange-600 hover:bg-orange-50 rounded-xl">
                                                        <Link href={`/admin/products/edit/${product._id}`}>
                                                            <Edit size={18} />
                                                        </Link>
                                                    </Button>
                                                    <Separator orientation="vertical" className="h-5 mx-1" />
                                                    <Button
                                                        variant="ghost"
                                                        size="icon"
                                                        onClick={() => deleteProduct(product._id)}
                                                        className="h-10 w-10 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-xl"
                                                    >
                                                        <Trash2 size={18} />
                                                    </Button>
                                                </div>
                                                <div className="group-hover:hidden transition-opacity">
                                                    <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-300">
                                                        <MoreVertical size={18} />
                                                    </Button>
                                                </div>
                                            </td>
                                        </motion.tr>
                                    ))
                                )}
                            </AnimatePresence>
                        </tbody>
                    </table>
                </div>

                {/* Pagination Placeholder */}
                <div className="p-6 border-t border-slate-50 flex items-center justify-between">
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Showing {filteredProducts.length} of {products.length} Products</p>
                    <div className="flex gap-2">
                        <Button variant="outline" disabled className="h-10 rounded-xl border-slate-100 text-xs font-bold uppercase tracking-widest">Prev</Button>
                        <Button variant="outline" disabled className="h-10 rounded-xl border-slate-100 text-xs font-bold uppercase tracking-widest">Next</Button>
                    </div>
                </div>
            </div>
        </div>
    );
}
