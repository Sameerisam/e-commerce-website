"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { motion, AnimatePresence } from "framer-motion";
import {
  Star,
  ShoppingCart,
  Zap,
  ShieldCheck,
  Truck,
  RotateCcw,
  Minus,
  Plus,
  Heart,
  ChevronRight,
  Home
} from "lucide-react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { addCart, setPendingCartItem, setBuyNowItem } from "@/redux/slices/add_To_Cart/page";
import { store, RootState } from "@/redux/store";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";

type Product = {
  _id: string;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: {
    rate: number;
    count: number;
  };
};

export default function DetailPageWrapper() {
  const { id } = useParams();
  const [product, setProduct] = useState<Product | null>(null);
  const [quantity, setQuantity] = useState<number>(1);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("description");

  const dispatch = useDispatch();
  const router = useRouter();
  const { isLoggedIn } = useSelector((state: RootState) => state.user);

  useEffect(() => {
    if (id) {
      setIsLoading(true);
      axios
        .get<Product>(`/api/products/${id}`)
        .then((resp) => {
          setProduct(resp.data);
        })
        .catch((error) => {
          console.error("Error fetching product:", error);
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  }, [id]);

  const handleAddToCart = () => {
    if (!product) return;

    const cartItem = {
      id: product._id,
      title: product.title,
      price: product.price,
      image: product.image,
      category: product.category,
      quantity,
    };

    if (!isLoggedIn) {
      dispatch(setPendingCartItem(cartItem));
      router.push(`/login?callbackUrl=/detail_page/${id}&action=addToCart`);
      return;
    }

    dispatch(addCart(cartItem));
    toast.success("Added to cart!", {
      position: "bottom-right",
      autoClose: 2000,
      theme: "colored"
    });
  };

  const handleBuyNow = () => {
    if (!product) return;

    const buyNowProduct = {
      id: product._id,
      title: product.title,
      price: product.price,
      image: product.image,
      category: product.category,
      quantity,
    };

    dispatch(setBuyNowItem(buyNowProduct));

    if (!isLoggedIn) {
      router.push(`/login?callbackUrl=/delivery_Information&action=buyNow`);
    } else {
      router.push('/delivery_Information');
    }
  };

  if (isLoading || !product) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-4">
        <div className="w-16 h-16 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin" />
        <p className="mt-4 text-slate-500 font-medium">Fetching product details...</p>
      </div>
    );
  }

  return (
    <div className="bg-white min-h-screen pt-24 pb-12">
      <div className="container mx-auto px-4">
        {/* Breadcrumbs */}
        <nav className="flex items-center gap-2 text-sm font-medium text-slate-400 mb-8 overflow-x-auto whitespace-nowrap pb-2">
          <Link href="/" className="hover:text-indigo-600 flex items-center gap-1">
            <Home size={16} /> Home
          </Link>
          <ChevronRight size={14} />
          <Link href="/products" className="hover:text-indigo-600">Products</Link>
          <ChevronRight size={14} />
          <span className="text-slate-900 truncate">{product.title}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left: Sticky Image Gallery */}
          <div className="lg:col-span-6 flex flex-col gap-6 lg:sticky lg:top-28">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="aspect-square rounded-[40px] bg-slate-50 border border-slate-100 flex items-center justify-center p-12 relative overflow-hidden group shadow-2xl shadow-slate-100"
            >
              <motion.img
                src={product.image}
                alt={product.title}
                className="max-h-full object-contain mix-blend-multiply drop-shadow-2xl transition-transform duration-700 hover:scale-105"
              />
              <button className="absolute top-6 right-6 w-12 h-12 bg-white rounded-full flex items-center justify-center text-slate-400 hover:text-red-500 shadow-xl transition-all hover:scale-110 active:scale-95">
                <Heart size={20} />
              </button>
            </motion.div>

            <div className="grid grid-cols-4 gap-4">
              {[...Array(4)].map((_, i) => (
                <div key={i} className={`aspect-square rounded-2xl border-2 transition-all cursor-pointer flex items-center justify-center p-2 hover:border-indigo-600 ${i === 0 ? "border-indigo-600 bg-white shadow-lg" : "border-slate-100 bg-slate-50"}`}>
                  <img src={product.image} className="max-h-full object-contain opacity-60" />
                </div>
              ))}
            </div>
          </div>

          {/* Right: Product Details */}
          <div className="lg:col-span-6 space-y-8">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-4"
            >
              <Badge className="bg-indigo-50 text-indigo-700 hover:bg-indigo-50 border-none px-4 py-1 rounded-full font-bold uppercase tracking-wider text-[10px]">
                {product.category}
              </Badge>
              <h1 className="text-4xl lg:text-5xl font-black text-slate-900 leading-tight tracking-tighter">
                {product.title}
              </h1>
              <div className="flex items-center gap-6">
                <div className="flex items-center gap-2">
                  <div className="flex text-amber-400">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={18} fill={i < Math.floor(product.rating.rate) ? "currentColor" : "none"} className={i < Math.floor(product.rating.rate) ? "" : "text-slate-200"} />
                    ))}
                  </div>
                  <span className="text-sm font-bold text-slate-900">{product.rating.rate} / 5</span>
                </div>
                <Separator orientation="vertical" className="h-4" />
                <span className="text-sm font-medium text-slate-500">{product.rating.count} Verified Reviews</span>
              </div>
            </motion.div>

            <div className="flex items-baseline gap-4">
              <span className="text-4xl lg:text-5xl font-black text-indigo-600 tracking-tighter">
                ${product.price.toFixed(2)}
              </span>
              <span className="text-xl text-slate-400 line-through font-medium">
                ${(product.price * 1.25).toFixed(2)}
              </span>
              <Badge className="bg-emerald-100 text-emerald-700 rounded-full border-none font-bold ml-2">Save 25% Today</Badge>
            </div>

            <Separator className="bg-slate-100" />

            <div className="space-y-4">
              <span className="text-sm font-bold text-slate-900 uppercase tracking-widest">Select Quantity</span>
              <div className="flex items-center gap-4">
                <div className="flex items-center bg-slate-100 rounded-2xl p-1 w-fit">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-12 w-12 rounded-xl hover:bg-white text-slate-600"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    disabled={quantity <= 1}
                  >
                    <Minus size={18} />
                  </Button>
                  <span className="w-12 text-center font-black text-slate-900 text-lg">{quantity}</span>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-12 w-12 rounded-xl hover:bg-white text-slate-600"
                    onClick={() => setQuantity(quantity + 1)}
                  >
                    <Plus size={18} />
                  </Button>
                </div>
                <p className="text-xs font-bold text-emerald-600 flex items-center gap-1">
                  <Zap size={14} fill="currentColor" /> Only 12 items left in stock!
                </p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Button
                className="h-16 flex-1 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-lg font-bold shadow-xl shadow-indigo-100 gap-3 transition-all hover:-translate-y-1 active:scale-95"
                onClick={handleAddToCart}
              >
                <ShoppingCart size={22} /> Add to Cart
              </Button>
              <Button
                variant="outline"
                className="h-16 flex-1 rounded-2xl border-2 border-slate-200 hover:bg-slate-50 text-lg font-bold transition-all hover:-translate-y-1 active:scale-95"
                onClick={handleBuyNow}
              >
                Buy Now
              </Button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6">
              {[
                { icon: Truck, text: "Free Fast Delivery" },
                { icon: RotateCcw, text: "30 Days Returns" },
                { icon: ShieldCheck, text: "Official Warranty" },
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-3 p-4 rounded-2xl bg-slate-50 border border-slate-100 group">
                  <item.icon size={20} className="text-indigo-600 group-hover:scale-110 transition-transform" />
                  <span className="text-xs font-bold text-slate-700 leading-tight">{item.text}</span>
                </div>
              ))}
            </div>

            <div className="pt-8">
              <div className="flex gap-8 border-b border-slate-100 mb-6">
                {["description", "details", "shipping"].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`pb-4 text-sm font-bold uppercase tracking-widest relative transition-colors ${activeTab === tab ? "text-indigo-600" : "text-slate-400 hover:text-slate-600"}`}
                  >
                    {tab}
                    {activeTab === tab && (
                      <motion.div layoutId="activeTab" className="absolute bottom-0 left-0 right-0 h-0.5 bg-indigo-600" />
                    )}
                  </button>
                ))}
              </div>
              <div className="text-slate-600 leading-relaxed min-h-[100px]">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeTab}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                  >
                    {activeTab === "description" && product.description}
                    {activeTab === "details" && "Product weight: 0.4kg. Materials: Sustainably sourced components. Model: 2026 Edition."}
                    {activeTab === "shipping" && "Standard shipping takes 3-5 business days. Express shipping available at checkout."}
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer hideProgressBar={true} />
    </div>
  );
}
