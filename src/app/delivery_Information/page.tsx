"use client";

import { useState, FormEvent, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSelector, useDispatch } from "react-redux";
import { motion } from "framer-motion";
import {
  User,
  Mail,
  Phone,
  MapPin,
  Hash,
  ArrowRight,
  ShieldCheck,
  Truck,
  ChevronLeft,
  Calendar
} from "lucide-react";

import { RootState } from "@/redux/store";
import { setShippingInfo } from "@/redux/slices/add_To_Cart/page";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";

export default function DeliveryInformation() {
  const router = useRouter();
  const dispatch = useDispatch();

  const cart = useSelector((state: RootState) => state.addToCart.items || []);
  const buyNowItem = useSelector((state: RootState) => state.addToCart.buyNowItem);
  const { isLoggedIn, user } = useSelector((state: RootState) => state.user);
  const [loading, setLoading] = useState(false);

  const isBuyNowMode = buyNowItem !== null;
  const displayItems = isBuyNowMode ? (buyNowItem ? [buyNowItem] : []) : cart;

  useEffect(() => {
    if (!isLoggedIn) {
      router.push('/login?callbackUrl=/delivery_Information');
    }
  }, [isLoggedIn, router]);

  const [formData, setFormData] = useState({
    fullName: user?.name || "",
    email: user?.email || "",
    phone: "",
    address: "",
    city: "",
    postalCode: "",
  });

  const subtotal = displayItems.reduce(
    (acc, item) => acc + item.price * (item.quantity || 1),
    0
  );
  const shipping = subtotal > 150 ? 0 : 15;
  const totalAmount = subtotal + shipping;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    if (!formData.fullName || !formData.email || !formData.phone || !formData.address || !formData.city) {
      return;
    }

    setLoading(true);
    dispatch(setShippingInfo(formData));

    setTimeout(() => {
      router.push(`/payment_method?amount=${totalAmount}`);
    }, 500);
  };

  return (
    <div className="bg-slate-50 min-h-screen pt-24 pb-20">
      <div className="container mx-auto px-4">
        {/* Progress Header */}
        <div className="max-w-4xl mx-auto mb-10 flex items-center justify-between px-4">
          <Link href="/cart_Products" className="text-slate-400 hover:text-indigo-600 font-bold text-xs uppercase tracking-widest flex items-center gap-2 transition-all">
            <ChevronLeft size={16} /> Back to Bag
          </Link>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-full bg-indigo-600 text-white flex items-center justify-center text-[10px] font-bold">1</div>
              <span className="text-[10px] font-black uppercase tracking-widest text-slate-900">Delivery</span>
            </div>
            <div className="w-8 h-[1px] bg-slate-200" />
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-full bg-slate-200 text-slate-400 flex items-center justify-center text-[10px] font-bold">2</div>
              <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Payment</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start max-w-6xl mx-auto">
          {/* Left: Shipping Form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="lg:col-span-7 space-y-8"
          >
            <div className="bg-white rounded-[40px] p-8 md:p-12 shadow-2xl shadow-slate-200 border border-slate-100">
              <h2 className="text-3xl font-black text-slate-900 tracking-tight mb-8">Shipping Address</h2>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1">Full Name</label>
                    <div className="relative group">
                      <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-600 transition-colors" size={18} />
                      <Input
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleChange}
                        placeholder="John Doe"
                        className="h-14 pl-12 rounded-2xl bg-slate-50 border-none focus-visible:ring-indigo-600"
                        required
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1">Email Address</label>
                    <div className="relative group">
                      <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-600 transition-colors" size={18} />
                      <Input
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="john@example.com"
                        className="h-14 pl-12 rounded-2xl bg-slate-50 border-none focus-visible:ring-indigo-600"
                        required
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1">Phone Number</label>
                  <div className="relative group">
                    <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-600 transition-colors" size={18} />
                    <Input
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="+1 (234) 567-890"
                      className="h-14 pl-12 rounded-2xl bg-slate-50 border-none focus-visible:ring-indigo-600"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1">Street Address</label>
                  <div className="relative group">
                    <MapPin className="absolute left-4 top-6 text-slate-400 group-focus-within:text-indigo-600 transition-colors" size={18} />
                    <textarea
                      name="address"
                      value={formData.address}
                      onChange={handleChange}
                      placeholder="House No, Street, Area"
                      className="w-full min-h-[120px] pl-12 pt-4 rounded-2xl bg-slate-50 border-none focus-visible:ring-2 focus-visible:ring-indigo-600 outline-none text-sm transition-all"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1">City</label>
                    <Input
                      name="city"
                      value={formData.city}
                      onChange={handleChange}
                      placeholder="New York"
                      className="h-14 px-6 rounded-2xl bg-slate-50 border-none focus-visible:ring-indigo-600"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1">Postal Code</label>
                    <Input
                      name="postalCode"
                      value={formData.postalCode}
                      onChange={handleChange}
                      placeholder="10001"
                      className="h-14 px-6 rounded-2xl bg-slate-50 border-none focus-visible:ring-indigo-600"
                    />
                  </div>
                </div>

                <Button
                  type="submit"
                  disabled={loading || displayItems.length === 0}
                  className="w-full h-16 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-lg font-bold shadow-xl shadow-indigo-100 gap-2 transition-all hover:-translate-y-1 active:scale-95 disabled:opacity-70"
                >
                  {loading ? "Processing..." : <>Review Payment Options <ArrowRight size={20} /></>}
                </Button>
              </form>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-6 rounded-[32px] bg-white border border-slate-100 flex items-center gap-4">
                <div className="w-12 h-12 bg-indigo-50 rounded-2xl flex items-center justify-center text-indigo-600">
                  <ShieldCheck size={24} />
                </div>
                <div>
                  <h4 className="font-black text-slate-900 text-sm tracking-tight">Purchase Protection</h4>
                  <p className="text-xs text-slate-400 font-medium">Your data is always encrypted</p>
                </div>
              </div>
              <div className="p-6 rounded-[32px] bg-white border border-slate-100 flex items-center gap-4">
                <div className="w-12 h-12 bg-emerald-50 rounded-2xl flex items-center justify-center text-emerald-600">
                  <Truck size={24} />
                </div>
                <div>
                  <h4 className="font-black text-slate-900 text-sm tracking-tight">Worldwide Delivery</h4>
                  <p className="text-xs text-slate-400 font-medium">Express tracking included</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right: Order Summary */}
          <div className="lg:col-span-5 lg:sticky lg:top-28">
            <div className="bg-white rounded-[40px] p-8 shadow-2xl shadow-indigo-900/5 border border-slate-100 space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-black text-slate-900 tracking-tight">Summary</h2>
                <Badge className="bg-slate-100 text-slate-600 rounded-full py-1 hover:bg-slate-100">{isBuyNowMode ? "Buy Now" : "Cart Checkout"}</Badge>
              </div>

              <div className="max-h-[300px] overflow-y-auto pr-2 space-y-4 custom-scrollbar">
                {displayItems.map((item) => (
                  <div key={item.id} className="flex gap-4 group">
                    <div className="w-20 h-20 bg-slate-50 rounded-2xl p-2 shrink-0 flex items-center justify-center border border-slate-100">
                      <img src={item.image} alt={item.title} className="max-h-full object-contain mix-blend-multiply group-hover:scale-110 transition-transform" />
                    </div>
                    <div className="flex-grow min-w-0 flex flex-col justify-center">
                      <h4 className="font-bold text-slate-900 text-sm truncate">{item.title}</h4>
                      <div className="flex justify-between items-center mt-1">
                        <p className="text-xs font-bold text-slate-400">Qty: {item.quantity || 1} × ${item.price.toFixed(2)}</p>
                        <p className="text-sm font-black text-slate-900">${(item.price * (item.quantity || 1)).toFixed(2)}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <Separator className="bg-slate-100" />

              <div className="space-y-4">
                <div className="flex justify-between text-slate-500 font-bold text-xs uppercase tracking-widest">
                  <span>Subtotal</span>
                  <span className="text-slate-900">${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-slate-500 font-bold text-xs uppercase tracking-widest">
                  <span>Shipping</span>
                  <span className={shipping === 0 ? "text-emerald-500" : "text-slate-900"}>
                    {shipping === 0 ? "FREE" : `$${shipping.toFixed(2)}`}
                  </span>
                </div>
              </div>

              <Separator className="bg-slate-100" />

              <div className="flex justify-between items-end">
                <span className="text-slate-900 font-black text-lg tracking-tight uppercase">Order Total</span>
                <span className="text-4xl font-black text-indigo-600 tracking-tighter">${totalAmount.toFixed(2)}</span>
              </div>

              <div className="p-4 rounded-2xl bg-indigo-50 border border-indigo-100 flex items-start gap-3">
                <Calendar size={18} className="text-indigo-600 shrink-0 mt-0.5" />
                <p className="text-[10px] font-bold text-indigo-700 uppercase leading-relaxed tracking-wider">
                  Estimated delivery between <span className="underline">March 15th - March 18th</span>. Tracking numbers will be sent via email.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
