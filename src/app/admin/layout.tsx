"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, ShoppingBag, PlusCircle, Settings, LogOut, ClipboardList } from "lucide-react";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();

    const menuItems = [
        { name: "Dashboard", href: "/admin", icon: LayoutDashboard },
        { name: "Orders", href: "/admin/orders", icon: ClipboardList },
        { name: "Products", href: "/admin/products", icon: ShoppingBag },
        { name: "Add Product", href: "/admin/products/new", icon: PlusCircle },
        { name: "Settings", href: "/admin/settings", icon: Settings },
    ];

    return (
        <div className="d-flex min-vh-100 bg-light">
            {/* Sidebar */}
            <aside className="bg-dark text-white p-3" style={{ width: "250px" }}>
                <div className="mb-5 px-2">
                    <h4 className="fw-bold">Admin Panel</h4>
                </div>

                <nav className="nav flex-column gap-2">
                    {menuItems.map((item) => {
                        const Icon = item.icon;
                        const isActive = pathname === item.href;
                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                className={`nav-link d-flex align-items-center gap-3 rounded px-3 py-2 transition-all ${isActive ? "bg-primary text-white" : "text-light opacity-75 hover-opacity-100"
                                    }`}
                            >
                                <Icon size={20} />
                                <span>{item.name}</span>
                            </Link>
                        );
                    })}
                </nav>

                <div className="mt-auto pt-5">
                    <Link href="/" className="nav-link d-flex align-items-center gap-3 text-danger px-3">
                        <LogOut size={20} />
                        <span>Exit Admin</span>
                    </Link>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-grow-1 p-4 overflow-auto">
                <div className="container-fluid">
                    {children}
                </div>
            </main>

            <style jsx>{`
        .nav-link:hover {
          opacity: 1 !important;
          background-color: rgba(255, 255, 255, 0.1);
        }
      `}</style>
        </div>
    );
}
