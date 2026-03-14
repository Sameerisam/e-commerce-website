"use client";

import Link from "next/link";
import {
  Instagram,
  Facebook,
  Twitter,
  Mail,
  Phone,
  MapPin,
  ArrowRight,
  ShieldCheck,
  Truck,
  RotateCcw
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-slate-900 text-slate-300">
      {/* Top Banner: Value Props */}
      <div className="border-b border-slate-800 bg-slate-950/50">
        <div className="container mx-auto px-4 py-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            { icon: Truck, title: "Free Shipping", desc: "On all orders over $150" },
            { icon: RotateCcw, title: "30 Days Return", desc: "Easy returns and exchanges" },
            { icon: ShieldCheck, title: "Secure Payment", desc: "100% secure payment methods" },
            { icon: Mail, title: "24/7 Support", desc: "Dedicated support team" },
          ].map((feature, i) => (
            <div key={i} className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 flex items-center justify-center text-indigo-400 group hover:bg-indigo-500 hover:text-white transition-all duration-300">
                <feature.icon size={24} />
              </div>
              <div>
                <h4 className="text-white font-bold text-sm tracking-tight">{feature.title}</h4>
                <p className="text-xs text-slate-400">{feature.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="container mx-auto px-4 pt-16 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand Info */}
          <div className="space-y-6">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center text-white font-bold text-lg">M</div>
              <span className="font-black tracking-tight text-white text-xl">MYSTORE</span>
            </Link>
            <p className="text-sm leading-relaxed max-w-xs">
              Elevating your lifestyle with curated collections of high-quality products. Your one-stop shop for everything premium.
            </p>
            <div className="flex gap-4">
              {[Instagram, Facebook, Twitter].map((Icon, i) => (
                <a key={i} href="#" className="w-10 h-10 rounded-xl bg-slate-800 flex items-center justify-center hover:bg-indigo-600 hover:text-white transition-all duration-300">
                  <Icon size={18} />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-bold mb-6 tracking-tight uppercase text-xs">Shop Categories</h4>
            <ul className="space-y-4 text-sm">
              {["Electronics", "Men's Clothing", "Women's Clothing", "Jewelery", "Gaming"].map((link) => (
                <li key={link}>
                  <Link href={`/products?category=${link}`} className="hover:text-indigo-400 transition-colors flex items-center group">
                    <span className="w-1.5 h-1.5 rounded-full bg-slate-700 mr-2 group-hover:bg-indigo-400 transition-all"></span>
                    {link}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h4 className="text-white font-bold mb-6 tracking-tight uppercase text-xs">Help & Support</h4>
            <ul className="space-y-4 text-sm">
              {["Shipping & Returns", "Store Policy", "Payment Methods", "FAQ", "Contact Us"].map((link) => (
                <li key={link}>
                  <Link href="#" className="hover:text-indigo-400 transition-colors">{link}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="text-white font-bold mb-6 tracking-tight uppercase text-xs">Stay in the Loop</h4>
            <p className="text-sm mb-4">Subscribe to get special offers, free giveaways, and once-in-a-lifetime deals.</p>
            <form className="relative group">
              <Input
                type="email"
                placeholder="Your email address"
                className="bg-slate-800 border-none rounded-xl h-12 pr-12 focus-visible:ring-indigo-500 placeholder:text-slate-500"
              />
              <Button
                size="icon"
                className="absolute right-1 top-1 h-10 w-10 bg-indigo-600 hover:bg-indigo-700 rounded-lg shadow-lg"
              >
                <ArrowRight size={18} />
              </Button>
            </form>
            <div className="mt-8 pt-8 border-t border-slate-800/50">
              <div className="flex flex-col gap-2">
                <div className="flex items-center gap-2 text-xs">
                  <Phone className="text-indigo-400" size={14} />
                  <span>+1 (234) 567-890</span>
                </div>
                <div className="flex items-center gap-2 text-xs">
                  <Mail className="text-indigo-400" size={14} />
                  <span>support@mystore.com</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-slate-800">
        <div className="container mx-auto px-4 py-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs font-medium text-slate-500">
          <p>© {currentYear} MYSTORE. All rights reserved.</p>
          <div className="flex gap-8">
            <Link href="#" className="hover:text-slate-300">Privacy Policy</Link>
            <Link href="#" className="hover:text-slate-300">Terms of Service</Link>
            <Link href="#" className="hover:text-slate-300">Sitemap</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}