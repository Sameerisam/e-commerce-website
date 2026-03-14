"use client";

import { useRouter, usePathname } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import Link from "next/link";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import {
  ShoppingCart,
  User,
  Menu,
  X,
  LogOut,
  ChevronDown,
  Phone,
  Mail,
  Instagram,
  Facebook,
  Twitter,
  Home as HomeIcon,
  ShoppingBag as BagIcon,
  Search as SearchIcon,
  LayoutGrid,
  Users,
  PhoneCall
} from "lucide-react";

import { setSearchQuery } from "@/redux/slices/searching/page";
import { logout } from "@/redux/slices/usersSlice/page";
import { setUserEmail } from "@/redux/slices/add_To_Cart/page";
import type { RootState } from "@/redux/store";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

export default function Header() {
  const router = useRouter();
  const pathname = usePathname();
  const dispatch = useDispatch();

  const cart = useSelector((state: RootState) => state.addToCart.items);
  const { isLoggedIn, user } = useSelector((state: RootState) => state.user);
  const userEmail = useSelector((state: RootState) => state.addToCart.userEmail);

  const [mounted, setMounted] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const showSearch = pathname === "/";
  const hideCart = pathname === "/login" || pathname === "/signUp";

  useEffect(() => {
    setMounted(true);
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (isLoggedIn && user?.email) {
      if (userEmail !== user.email) {
        dispatch(setUserEmail(user.email));
      }
    } else if (!isLoggedIn && userEmail) {
      dispatch(setUserEmail(null));
    }
  }, [isLoggedIn, user, userEmail, dispatch]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setSearchQuery(e.target.value));
  };

  const handleLogout = async () => {
    try {
      dispatch(setUserEmail(null));
      await axios.post("/api/auth", { action: "logout" });
      dispatch(logout());
      router.replace("/");
    } catch (error) {
      console.error("Logout failed:", error);
      router.replace("/");
    }
  };

  const navLinks = [
    { label: "Home", href: "/", icon: HomeIcon },
    { label: "Products", href: "/products", icon: BagIcon },
    { label: "Categories", href: "/categories", icon: LayoutGrid },
    { label: "About", href: "/about", icon: Users },
    { label: "Contact", href: "/contact", icon: PhoneCall },
  ];

  if (!mounted) return null;

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 py-4 ${isScrolled ? "px-4" : "px-6"
        }`}
    >
      <div className={`container mx-auto max-w-7xl transition-all duration-500 ${isScrolled ? "scale-95" : "scale-100"
        }`}>
        <div className={`flex items-center justify-between px-6 py-3 transition-all duration-500 ${isScrolled
            ? "bg-white/30 backdrop-blur-2xl shadow-[0_8px_32px_rgba(0,0,0,0.12)] border border-white/20 rounded-[2.5rem]"
            : "bg-white/10 backdrop-blur-xl border border-white/10 rounded-[2rem] shadow-sm"
          }`}>
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group shrink-0">
            <div className="w-9 h-9 bg-primary rounded-full flex items-center justify-center text-white shadow-lg group-hover:rotate-12 transition-transform">
              <BagIcon size={18} strokeWidth={2.5} />
            </div>
            <span className="text-xl font-black tracking-tighter text-slate-900">
              MY<span className="text-primary">STORE.</span>
            </span>
          </Link>

          {/* Centered Navigation or Inline Search */}
          <div className="flex-1 max-w-2xl px-8 hidden lg:flex items-center justify-center">
            <AnimatePresence mode="wait">
              {!isSearchOpen ? (
                <motion.nav
                  key="nav"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 10 }}
                  transition={{ duration: 0.2 }}
                  className="flex items-center bg-slate-100/50 p-1.5 rounded-full border border-slate-200/50"
                >
                  {navLinks.map((link) => {
                    const Icon = link.icon;
                    const isActive = pathname === link.href;
                    return (
                      <Link
                        key={link.label}
                        href={link.href}
                        className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all hover:bg-white hover:text-primary hover:shadow-sm ${isActive ? "bg-white text-primary shadow-sm" : "text-slate-600"
                          }`}
                      >
                        <Icon size={14} strokeWidth={isActive ? 2.5 : 2} />
                        {link.label}
                      </Link>
                    );
                  })}
                </motion.nav>
              ) : (
                <motion.div
                  key="search"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="w-full flex items-center bg-slate-100/80 backdrop-blur-md p-1.5 rounded-full border border-primary/20 shadow-inner"
                >
                  <div className="px-4 text-primary">
                    <SearchIcon size={18} />
                  </div>
                  <Input
                    autoFocus
                    placeholder="Search products..."
                    className="flex-1 bg-transparent border-none text-sm font-bold placeholder:text-slate-400 focus-visible:ring-0 h-9"
                    onChange={handleSearchChange}
                  />
                  <Button
                    variant="ghost"
                    size="icon"
                    className="rounded-full h-9 w-9 hover:bg-white text-slate-400"
                    onClick={() => setIsSearchOpen(false)}
                  >
                    <X size={16} />
                  </Button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-3 shrink-0">
            <div className="flex items-center gap-1">
              {showSearch && (
                <Button
                  variant="ghost"
                  size="icon"
                  className="rounded-full w-10 h-10 text-slate-700 hover:bg-slate-200/50"
                  onClick={() => setIsSearchOpen(!isSearchOpen)}
                >
                  <SearchIcon className="w-5 h-5" />
                </Button>
              )}

              {isLoggedIn && (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="rounded-full w-10 h-10 hover:bg-slate-200/50">
                      <User className="w-5 h-5 text-slate-700" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-56 p-2 rounded-2xl border-slate-100 shadow-2xl">
                    <DropdownMenuLabel className="font-normal text-slate-900">
                      <div className="flex flex-col space-y-1">
                        <p className="text-sm font-bold leading-none">{user?.name || "User"}</p>
                        <p className="text-xs leading-none text-slate-500">{user?.email}</p>
                      </div>
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator className="my-2" />
                    <DropdownMenuItem asChild className="rounded-xl cursor-pointer text-slate-700 focus:bg-slate-50" onClick={handleLogout}>
                      <div className="flex items-center w-full">
                        <LogOut className="w-4 h-4 mr-2" />
                        <span>Log out</span>
                      </div>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              )}
            </div>

            <div className="w-[1px] h-6 bg-slate-200" />

            {!hideCart && (
              <Link href="/cart_Products" className="relative group">
                <div className="w-10 h-10 bg-slate-900 rounded-full flex items-center justify-center text-white transition-all group-hover:scale-110 group-active:scale-95 shadow-lg">
                  <BagIcon className="w-4 h-4" strokeWidth={2.5} />
                </div>
                {cart?.length > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-primary text-white text-[10px] font-black rounded-full flex items-center justify-center border-2 border-white shadow-sm animate-in zoom-in">
                    {cart.length}
                  </span>
                )}
              </Link>
            )}

            {/* Mobile Menu */}
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="lg:hidden rounded-full w-10 h-10 hover:bg-slate-200/50">
                  <Menu className="w-5 h-5 text-slate-700" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px] p-0 border-none rounded-l-3xl">
                <div className="flex flex-col h-full bg-slate-50/50 backdrop-blur-xl">
                  <SheetHeader className="p-8 text-left border-b border-white/20">
                    <SheetTitle className="flex items-center gap-2">
                      <div className="w-9 h-9 bg-primary rounded-xl flex items-center justify-center text-white font-black text-xl shadow-lg">M</div>
                      <span className="font-black tracking-tight text-slate-900">MYSTORE</span>
                    </SheetTitle>
                  </SheetHeader>
                  <div className="flex flex-col p-8 gap-4 overflow-y-auto">
                    {navLinks.map((link) => {
                      const Icon = link.icon;
                      return (
                        <Link
                          key={link.label}
                          href={link.href}
                          className="flex items-center gap-4 p-4 rounded-2xl bg-white border border-slate-100 shadow-sm text-slate-700 font-bold transition-all active:scale-95"
                        >
                          <div className="w-10 h-10 bg-slate-50 rounded-xl flex items-center justify-center text-primary">
                            <Icon size={20} />
                          </div>
                          {link.label}
                        </Link>
                      );
                    })}
                  </div>
                  <div className="mt-auto p-8 border-t border-white/20">
                    {!isLoggedIn ? (
                      <Button asChild className="w-full bg-slate-900 hover:bg-slate-800 rounded-2xl py-7 text-lg font-black shadow-xl shadow-slate-200 transition-all active:scale-95">
                        <Link href="/login">Sign In</Link>
                      </Button>
                    ) : (
                      <Button variant="outline" className="w-full rounded-2xl py-7 text-lg font-bold border-2" onClick={handleLogout}>
                        Log Out
                      </Button>
                    )}
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>

    </header>
  );
}
