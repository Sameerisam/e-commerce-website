"use client";

import { motion } from "framer-motion";
import {
    ShoppingBag,
    Users,
    DollarSign,
    TrendingUp,
    ChevronRight,
    ArrowUpRight,
    ArrowDownRight,
    MoreHorizontal
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

export default function AdminDashboard() {
    const stats = [
        { label: "Total Revenue", value: "$42,650", trend: "+12.5%", isUp: true, icon: DollarSign, color: "bg-emerald-500" },
        { label: "Total Orders", value: "842", trend: "+8.2%", isUp: true, icon: ShoppingBag, color: "bg-indigo-600" },
        { label: "New Customers", value: "156", trend: "-2.4%", isUp: false, icon: Users, color: "bg-purple-500" },
        { label: "Conversion", value: "3.24%", trend: "+1.1%", isUp: true, icon: TrendingUp, color: "bg-orange-500" },
    ];

    const recentOrders = [
        { id: "ORD-9421", user: "Alex Johnson", email: "alex@example.com", status: "Delivered", amount: "$124.00", date: "Today" },
        { id: "ORD-9420", user: "Sarah Smith", email: "sarah@example.com", status: "Processing", amount: "$450.00", date: "Yesterday" },
        { id: "ORD-9419", user: "Michael Chen", email: "mike@example.com", status: "Shipped", amount: "$89.50", date: "Mar 10" },
        { id: "ORD-9418", user: "Emma Wilson", email: "emma@example.com", status: "Delivered", amount: "$210.00", date: "Mar 09" },
    ];

    return (
        <div className="space-y-10">
            {/* Page Header */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div className="space-y-1">
                    <h2 className="text-4xl font-black text-slate-900 tracking-tight">Overview</h2>
                    <p className="text-sm font-bold text-slate-400 uppercase tracking-widest">Real-time performance analytics</p>
                </div>
                <div className="flex gap-3">
                    <Button variant="outline" className="h-12 rounded-xl border-slate-200 font-bold px-6">Export Data</Button>
                    <Button className="h-12 rounded-xl bg-indigo-600 hover:bg-indigo-700 font-bold px-6 shadow-lg shadow-indigo-100">Refresh Data</Button>
                </div>
            </div>

            {/* Quick Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
                {stats.map((stat, index) => {
                    const Icon = stat.icon;
                    return (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className="bg-white p-6 rounded-[32px] border border-slate-100 shadow-sm hover:shadow-xl hover:shadow-slate-200 transition-all duration-300 group"
                        >
                            <div className="flex justify-between items-start mb-6">
                                <div className={`${stat.color} w-14 h-14 rounded-2xl flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                                    <Icon size={24} />
                                </div>
                                <Badge className={`${stat.isUp ? "bg-emerald-50 text-emerald-600" : "bg-red-50 text-red-600"} border-none flex items-center gap-1 font-black`}>
                                    {stat.isUp ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />} {stat.trend}
                                </Badge>
                            </div>
                            <div>
                                <h3 className="text-3xl font-black text-slate-900 tracking-tighter mb-1">{stat.value}</h3>
                                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">{stat.label}</p>
                            </div>
                        </motion.div>
                    );
                })}
            </div>

            {/* Main Dashboard Section */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                {/* Recent Orders Table Area */}
                <div className="lg:col-span-8 bg-white rounded-[40px] border border-slate-100 shadow-sm p-8 space-y-8">
                    <div className="flex items-center justify-between px-2">
                        <div className="flex items-center gap-4">
                            <h3 className="text-2xl font-black text-slate-900 tracking-tight">Recent Activity</h3>
                            <Badge className="bg-slate-50 text-slate-500 hover:bg-slate-100 px-3 uppercase text-[10px] font-black">Live</Badge>
                        </div>
                        <Button variant="ghost" className="text-sm font-bold text-indigo-600 hover:text-indigo-700 p-0 hover:bg-transparent flex items-center gap-1">
                            See all activity <ChevronRight size={16} />
                        </Button>
                    </div>

                    <div className="overflow-x-auto whitespace-nowrap">
                        <table className="w-full text-left border-separate border-spacing-y-4 -mt-4">
                            <thead>
                                <tr className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">
                                    <th className="px-4 pb-2">Reference</th>
                                    <th className="px-4 pb-2">Customer</th>
                                    <th className="px-4 pb-2">Status</th>
                                    <th className="px-4 pb-2 text-right">Amount</th>
                                    <th className="px-4 pb-2 text-right">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {recentOrders.map((order, i) => (
                                    <tr key={order.id} className="group hover:bg-slate-50 transition-all rounded-2xl overflow-hidden">
                                        <td className="px-4 py-4 rounded-l-2xl border-y border-l border-slate-50 group-hover:border-slate-100 transition-colors bg-white group-hover:bg-slate-50">
                                            <span className="text-sm font-black text-slate-900">{order.id}</span>
                                        </td>
                                        <td className="px-4 py-4 border-y border-slate-50 group-hover:border-slate-100 transition-colors bg-white group-hover:bg-slate-50">
                                            <div className="flex flex-col">
                                                <span className="text-xs font-black text-slate-900">{order.user}</span>
                                                <span className="text-[10px] font-bold text-slate-400 truncate max-w-[120px]">{order.email}</span>
                                            </div>
                                        </td>
                                        <td className="px-4 py-4 border-y border-slate-50 group-hover:border-slate-100 transition-colors bg-white group-hover:bg-slate-50">
                                            <Badge className={`border-none px-3 py-1 font-black text-[9px] uppercase tracking-widest ${order.status === 'Delivered' ? 'bg-emerald-50 text-emerald-600' :
                                                order.status === 'Processing' ? 'bg-orange-50 text-orange-600' :
                                                    'bg-indigo-50 text-indigo-600'}`}>
                                                {order.status}
                                            </Badge>
                                        </td>
                                        <td className="px-4 py-4 border-y border-slate-50 group-hover:border-slate-100 transition-colors bg-white group-hover:bg-slate-50 text-right">
                                            <span className="text-sm font-black text-slate-900">{order.amount}</span>
                                        </td>
                                        <td className="px-4 py-4 rounded-r-2xl border-y border-r border-slate-50 group-hover:border-slate-100 transition-colors bg-white group-hover:bg-slate-50 text-right">
                                            <Button variant="ghost" size="icon" className="h-8 w-8 rounded-lg hover:bg-white text-slate-400 hover:text-indigo-600">
                                                <MoreHorizontal size={18} />
                                            </Button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Right Sider Info Area */}
                <div className="lg:col-span-4 space-y-8">
                    {/* Performance Progress */}
                    <div className="bg-slate-900 rounded-[40px] p-8 text-white space-y-8 shadow-2xl shadow-slate-900/10 relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500 blur-[80px] opacity-20" />

                        <div className="flex items-center justify-between relative z-10">
                            <h4 className="text-xl font-black tracking-tight">Top Categories</h4>
                            <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center">
                                <TrendingUp size={20} className="text-emerald-400" />
                            </div>
                        </div>

                        <div className="space-y-8 relative z-10">
                            {[
                                { cat: "Electronics", val: 82, color: "bg-indigo-500" },
                                { cat: "Fashion", val: 64, color: "bg-emerald-400" },
                                { cat: "Gaming", val: 41, color: "bg-orange-400" },
                            ].map((item) => (
                                <div key={item.cat} className="space-y-3">
                                    <div className="flex justify-between items-end">
                                        <span className="text-xs font-black text-slate-400 uppercase tracking-widest">{item.cat}</span>
                                        <span className="text-lg font-black text-white">{item.val}%</span>
                                    </div>
                                    <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                                        <motion.div
                                            initial={{ width: 0 }}
                                            whileInView={{ width: `${item.val}%` }}
                                            transition={{ duration: 1, ease: "easeOut" }}
                                            className={`h-full ${item.color} rounded-full`}
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>

                        <Separator className="bg-white/10" />

                        <div className="pt-2">
                            <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest leading-loose">
                                Electronics continues to dominate the store revenue, up <span className="text-white">12.5%</span> from last quarter.
                            </p>
                        </div>
                    </div>

                    {/* Quick Insight Card */}
                    <div className="bg-emerald-500 rounded-[40px] p-8 text-white relative group cursor-pointer overflow-hidden shadow-xl shadow-emerald-500/20 transition-all hover:-translate-y-1">
                        <div className="absolute bottom-0 right-0 opacity-10 group-hover:scale-110 transition-transform">
                            <ShoppingBag size={140} strokeWidth={1} />
                        </div>
                        <p className="text-[10px] font-black uppercase tracking-[0.2em] opacity-80 mb-2">Performance Alert</p>
                        <h4 className="text-2xl font-black tracking-tight mb-4">Inventory running low on 12 Top Items.</h4>
                        <Button className="bg-white text-emerald-600 font-black rounded-2xl hover:bg-slate-100 gap-2">
                            Restock Now <ArrowUpRight size={18} />
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}
