"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import {
    Package,
    Eye,
    Clock,
    CheckCircle,
    Truck,
    XCircle,
    Search,
    Filter,
    Download,
    Calendar,
    User,
    CreditCard
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

type Order = {
    _id: string;
    userEmail: string;
    totalAmount: number;
    paymentMethod: string;
    paymentStatus: string;
    orderStatus: string;
    createdAt: string;
    items: any[];
    shippingAddress: {
        fullName: string;
        city: string;
    };
};

export default function AdminOrdersPage() {
    const [orders, setOrders] = useState<Order[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {
        fetchOrders();
    }, []);

    const fetchOrders = async () => {
        try {
            const resp = await axios.get("/api/orders");
            setOrders(resp.data);
        } catch (err) {
            console.error("Failed to fetch orders", err);
        } finally {
            setLoading(false);
        }
    };

    const getStatusStyles = (status: string) => {
        switch (status) {
            case "Processing": return { bg: "bg-orange-50", text: "text-orange-600", icon: Clock };
            case "Shipped": return { bg: "bg-indigo-50", text: "text-indigo-600", icon: Truck };
            case "Delivered": return { bg: "bg-emerald-50", text: "text-emerald-600", icon: CheckCircle };
            case "Cancelled": return { bg: "bg-red-50", text: "text-red-600", icon: XCircle };
            default: return { bg: "bg-slate-50", text: "text-slate-500", icon: Package };
        }
    };

    const filteredOrders = orders.filter(o =>
        o.shippingAddress.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        o.userEmail.toLowerCase().includes(searchTerm.toLowerCase()) ||
        o._id.includes(searchTerm)
    );

    if (loading) return (
        <div className="flex flex-col items-center justify-center h-[60vh] space-y-4">
            <div className="w-12 h-12 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin" />
            <p className="text-slate-400 font-bold uppercase text-[10px] tracking-widest">Loading Orders...</p>
        </div>
    );

    return (
        <div className="space-y-10">
            {/* Page Header */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div className="space-y-1">
                    <h2 className="text-4xl font-black text-slate-900 tracking-tight">Orders</h2>
                    <p className="text-sm font-bold text-slate-400 uppercase tracking-widest">Transaction & Fulfillment Control</p>
                </div>
                <div className="flex gap-3">
                    <Button variant="outline" className="h-12 rounded-2xl border-slate-200 bg-white font-bold px-6 gap-2">
                        <Download size={18} /> Export CSV
                    </Button>
                </div>
            </div>

            {/* Stats Summary Bar */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {[
                    { label: "New Orders", val: orders.filter(o => o.orderStatus === 'Processing').length, color: "bg-orange-500" },
                    { label: "In Transit", val: orders.filter(o => o.orderStatus === 'Shipped').length, color: "bg-indigo-600" },
                    { label: "Completed", val: orders.filter(o => o.orderStatus === 'Delivered').length, color: "bg-emerald-500" },
                    { label: "Total Volume", val: `$${orders.reduce((a, b) => a + b.totalAmount, 0).toFixed(0)}`, color: "bg-slate-900" }
                ].map((stat, i) => (
                    <div key={i} className="bg-white p-5 rounded-[28px] border border-slate-100 shadow-sm flex items-center justify-between">
                        <div>
                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">{stat.label}</p>
                            <h4 className="text-xl font-black text-slate-900 tracking-tight">{stat.val}</h4>
                        </div>
                        <div className={`w-10 h-10 rounded-xl ${stat.color} opacity-10`} />
                    </div>
                ))}
            </div>

            {/* Filter & Search Bar */}
            <div className="bg-white p-4 rounded-[32px] border border-slate-100 shadow-sm flex flex-col md:flex-row gap-4">
                <div className="relative flex-grow group">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-600 transition-colors" size={18} />
                    <Input
                        placeholder="Search by Order ID, Name or Email..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="h-12 pl-12 bg-slate-50 border-none rounded-2xl focus-visible:ring-indigo-600"
                    />
                </div>
                <div className="flex gap-2">
                    <Button variant="outline" className="h-12 rounded-2xl border-slate-100 bg-slate-50 font-bold gap-2 hover:bg-white">
                        <Filter size={18} /> Filter Status
                    </Button>
                </div>
            </div>

            {/* Orders Table Area */}
            <div className="bg-white rounded-[40px] border border-slate-100 shadow-sm overflow-hidden">
                <div className="overflow-x-auto whitespace-nowrap">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 border-b border-slate-50">
                                <th className="px-8 py-6">Order ID / Customer</th>
                                <th className="px-6 py-6">Payment</th>
                                <th className="px-6 py-6 text-center">Amount</th>
                                <th className="px-6 py-6 text-center">Fulfillment</th>
                                <th className="px-8 py-6 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-50">
                            <AnimatePresence mode="popLayout">
                                {filteredOrders.length === 0 ? (
                                    <motion.tr initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center">
                                        <td colSpan={5} className="py-24 space-y-4">
                                            <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mx-auto text-slate-200">
                                                <Package size={40} />
                                            </div>
                                            <p className="text-slate-400 font-bold uppercase text-[10px] tracking-widest">No orders found</p>
                                        </td>
                                    </motion.tr>
                                ) : (
                                    filteredOrders.map((order, i) => {
                                        const status = getStatusStyles(order.orderStatus);
                                        const StatusIcon = status.icon;
                                        return (
                                            <motion.tr
                                                key={order._id}
                                                layout
                                                initial={{ opacity: 0, x: -10 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                transition={{ delay: i * 0.05 }}
                                                className="group hover:bg-slate-50/50 transition-colors"
                                            >
                                                <td className="px-8 py-5">
                                                    <div className="flex items-center gap-4">
                                                        <div className="w-12 h-12 rounded-2xl bg-slate-100 flex items-center justify-center text-slate-400 group-hover:bg-indigo-600 group-hover:text-white transition-all duration-300">
                                                            <User size={20} />
                                                        </div>
                                                        <div className="min-w-0">
                                                            <p className="text-sm font-black text-slate-900 truncate max-w-[180px]">MS-{order._id.slice(-6).toUpperCase()}</p>
                                                            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-tight">{order.shippingAddress.fullName}</p>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-5">
                                                    <div className="space-y-1">
                                                        <div className="flex items-center gap-2 text-xs font-bold text-slate-700">
                                                            <CreditCard size={14} className="text-slate-300" />
                                                            {order.paymentMethod}
                                                        </div>
                                                        <Badge className={`border-none px-2 py-0.5 text-[8px] uppercase font-black tracking-widest ${order.paymentStatus === 'Completed' ? 'bg-emerald-100 text-emerald-700' : 'bg-orange-100 text-orange-700'}`}>
                                                            {order.paymentStatus}
                                                        </Badge>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-5 text-center">
                                                    <span className="text-base font-black text-slate-900 tracking-tight">${order.totalAmount.toFixed(2)}</span>
                                                </td>
                                                <td className="px-6 py-5 text-center">
                                                    <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-2xl ${status.bg} ${status.text} transition-all`}>
                                                        <StatusIcon size={16} />
                                                        <span className="text-[10px] font-black uppercase tracking-widest">{order.orderStatus}</span>
                                                    </div>
                                                </td>
                                                <td className="px-8 py-5 text-right">
                                                    <div className="flex items-center justify-end gap-3">
                                                        <div className="text-right hidden sm:block">
                                                            <div className="flex items-center justify-end gap-1 text-[10px] font-bold text-slate-400 uppercase">
                                                                <Calendar size={12} /> {new Date(order.createdAt).toLocaleDateString()}
                                                            </div>
                                                        </div>
                                                        <Button variant="ghost" size="icon" className="h-10 w-10 text-slate-400 hover:text-indigo-600 hover:bg-white rounded-xl shadow-none hover:shadow-lg hover:shadow-indigo-500/10 transition-all">
                                                            <Eye size={18} />
                                                        </Button>
                                                    </div>
                                                </td>
                                            </motion.tr>
                                        );
                                    })
                                )}
                            </AnimatePresence>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
