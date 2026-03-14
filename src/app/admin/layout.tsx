"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
    LayoutDashboard,
    ShoppingBag,
    PlusCircle,
    Settings,
    LogOut,
    ClipboardList,
    ChevronLeft,
    Bell,
    Search,
    User
} from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();

    const menuItems = [
        { name: "Overview", href: "/admin", icon: LayoutDashboard },
        { name: "Orders", href: "/admin/orders", icon: ClipboardList },
        { name: "Products", href: "/admin/products", icon: ShoppingBag },
        { name: "Add Items", href: "/admin/products/new", icon: PlusCircle },
        { name: "Management", href: "/admin/settings", icon: Settings },
    ];

    return (
        <div className="flex h-screen bg-slate-50 overflow-hidden">
            {/* Sidebar */}
            <aside className="w-72 bg-slate-900 text-slate-400 hidden lg:flex flex-col border-r border-slate-800 p-6 relative z-30">
                <div className="mb-10 px-2 flex items-center gap-3">
                    <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center text-white font-bold text-xl shadow-lg shadow-indigo-500/20">A</div>
                    <div>
                        <h4 className="font-black text-white tracking-tight leading-none">Admin Panel</h4>
                        <p className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.2em] mt-1">v1.2.4 Enterprise</p>
                    </div>
                </div>

                <nav className="space-y-2 flex-grow">
                    <p className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] px-3 mb-4">Main Menu</p>
                    {menuItems.map((item) => {
                        const Icon = item.icon;
                        const isActive = pathname === item.href;
                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                className={`flex items-center gap-4 rounded-2xl px-4 py-3.5 transition-all group font-bold text-sm ${isActive ? "bg-indigo-600 text-white shadow-xl shadow-indigo-600/20" : "hover:bg-slate-800/50 hover:text-slate-200"}`}
                            >
                                <Icon size={20} className={`transition-transform duration-300 ${isActive ? "scale-110" : "group-hover:scale-110"}`} />
                                <span>{item.name}</span>
                                {isActive && (
                                    <motion.div layoutId="sidebar-active" className="ml-auto w-1.5 h-1.5 rounded-full bg-white" />
                                )}
                            </Link>
                        );
                    })}
                </nav>

                <div className="mt-auto space-y-4">
                    <Separator className="bg-slate-800" />
                    <Link href="/" className="flex items-center gap-4 rounded-2xl px-4 py-3.5 font-bold text-sm text-red-400 hover:bg-red-500/10 transition-colors group">
                        <LogOut size={20} className="group-hover:translate-x-1 transition-transform" />
                        <span>Exit Dashboard</span>
                    </Link>
                </div>
            </aside>

            {/* Main Wrapper */}
            <div className="flex-grow flex flex-col h-full overflow-hidden">
                {/* Top Navbar */}
                <header className="h-20 bg-white border-b border-slate-100 flex items-center justify-between px-8 shrink-0 relative z-20">
                    <div className="flex items-center gap-6">
                        <Button variant="ghost" size="icon" className="lg:hidden">
                            <ChevronLeft />
                        </Button>
                        <div className="relative group hidden sm:block">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-600 transition-colors" size={18} />
                            <Input placeholder="Global search..." className="h-11 w-64 pl-12 bg-slate-50 border-none rounded-xl focus-visible:ring-indigo-600" />
                        </div>
                    </div>

                    <div className="flex items-center gap-4">
                        <Button variant="ghost" size="icon" className="relative rounded-full hover:bg-slate-50">
                            <Bell size={20} className="text-slate-600" />
                            <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white" />
                        </Button>
                        <Separator orientation="vertical" className="h-8 hidden sm:block" />
                        <div className="flex items-center gap-3 pl-2">
                            <div className="text-right hidden sm:block">
                                <p className="text-sm font-black text-slate-900 leading-none">Admin User</p>
                                <p className="text-[10px] font-bold text-slate-400 uppercase mt-1">Super Admin</p>
                            </div>
                            <div className="w-10 h-10 rounded-xl bg-slate-900 flex items-center justify-center text-white shadow-lg">
                                <User size={20} />
                            </div>
                        </div>
                    </div>
                </header>

                {/* Content Area */}
                <main className="flex-grow overflow-auto p-8 custom-scrollbar">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.98 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.4 }}
                        className="container mx-auto"
                    >
                        {children}
                    </motion.div>
                </main>
            </div>
        </div>
    );
}
