"use client";

import axios from "axios";
import { useState, useEffect, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { ShoppingCart, Eye, Star, ArrowRight, ShoppingBag, Zap, Diamond, Shirt, Heart, Laptop } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { addCart } from "@/redux/slices/add_To_Cart/page";
import { MotionDiv } from "../ui/motions";
import { Skeleton } from "@/components/ui/skeleton";
import Image from "next/image";
import { RootState } from "@/redux/store";

const ProductSkeleton = () => (
  <div className="bg-white rounded-[40px] border border-slate-100 overflow-hidden shadow-sm flex flex-col h-full">
    <Skeleton className="aspect-[4/5] rounded-none" />
    <div className="p-10 space-y-6 flex-grow flex flex-col">
      <div className="flex gap-2">
        <Skeleton className="w-3 h-3 rounded-full" />
        <Skeleton className="w-3 h-3 rounded-full" />
        <Skeleton className="w-3 h-3 rounded-full" />
      </div>
      <div className="space-y-3">
        <Skeleton className="h-4 w-1/3 rounded-full" />
        <Skeleton className="h-8 w-full rounded-xl" />
        <Skeleton className="h-8 w-2/3 rounded-xl" />
      </div>
      <div className="mt-auto pt-8 border-t border-slate-50 flex items-center justify-between">
        <div className="space-y-2">
          <Skeleton className="h-4 w-16 rounded-full" />
          <Skeleton className="h-8 w-24 rounded-lg" />
        </div>
        <Skeleton className="h-14 w-32 rounded-2xl" />
      </div>
    </div>
  </div>
);

const getCategoryStyles = (category: string) => {
  const cat = category.toLowerCase();
  if (cat === 'electronics') return {
    color: 'text-blue-600',
    bg: 'bg-blue-50',
    border: 'border-blue-100',
    glow: 'from-blue-200/20 to-indigo-200/20',
    icon: <Laptop size={12} className="mr-1" />
  };
  if (cat.includes('jewelery')) return {
    color: 'text-amber-600',
    bg: 'bg-amber-50',
    border: 'border-amber-100',
    glow: 'from-amber-200/20 to-orange-200/20',
    icon: <Diamond size={12} className="mr-1" />
  };
  if (cat === "men's clothing") return {
    color: 'text-indigo-600',
    bg: 'bg-indigo-50',
    border: 'border-indigo-100',
    glow: 'from-indigo-200/20 to-blue-200/20',
    icon: <Shirt size={12} className="mr-1" />
  };
  if (cat === "women's clothing") return {
    color: 'text-rose-600',
    bg: 'bg-rose-50',
    border: 'border-rose-100',
    glow: 'from-rose-200/20 to-purple-200/20',
    icon: <Heart size={12} className="mr-1" />
  };
  return {
    color: 'text-slate-600',
    bg: 'bg-slate-50',
    border: 'border-slate-100',
    glow: 'from-slate-200/10 to-slate-100/10',
    icon: <Zap size={12} className="mr-1" />
  };
};

type Product = {
  _id: string;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating?: {
    rate: number;
    count: number;
  };
};

export default function MyProducts({ selectedCategory }: { selectedCategory?: string }) {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const router = useRouter();
  const searchQuery = useSelector((state: RootState) => state.searching.query);
  const { isLoggedIn } = useSelector((state: RootState) => state.user);

  useEffect(() => {
    setLoading(true);
    axios.get<Product[]>("/api/products")
      .then((resp) => {
        setProducts(resp.data);
      })
      .catch((err) => {
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      const matchesSearch = p.title.toLowerCase().includes(searchQuery.toLowerCase());

      // Normalize values for comparison
      const productCat = p.category.toLowerCase().trim();
      const selectedCat = selectedCategory?.toLowerCase().trim() || "all items";

      // Strict category matching to avoid "men" matching in "women"
      let isCategoryMatch = false;

      if (selectedCat === "all items") {
        isCategoryMatch = true;
      } else if (selectedCat === "jewelry" || selectedCat === "jewelery") {
        isCategoryMatch = productCat === "jewelery" || productCat === "jewelry";
      } else if (selectedCat === "men's clothing") {
        isCategoryMatch = productCat === "men's clothing";
      } else if (selectedCat === "women's clothing") {
        isCategoryMatch = productCat === "women's clothing";
      } else if (selectedCat === "electronics") {
        isCategoryMatch = productCat === "electronics";
      } else {
        // Fallback for any other categories
        isCategoryMatch = productCat.includes(selectedCat);
      }

      return matchesSearch && isCategoryMatch;
    });
  }, [products, searchQuery, selectedCategory]);

  const handleAddToCart = (product: Product, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (!isLoggedIn) {
      router.push("/login");
      return;
    }

    dispatch(addCart({
      id: product._id,
      title: product.title,
      price: product.price,
      image: product.image,
      category: product.category,
      quantity: 1
    }));
  };

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
        {[...Array(6)].map((_, i) => (
          <ProductSkeleton key={i} />
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center px-2">

        <div className="h-[1px] flex-grow mx-8 bg-slate-100 hidden md:block" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product, index) => {
            const styles = getCategoryStyles(product.category);
            return (
              <MotionDiv
                key={product._id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: index * 0.1, ease: [0.21, 0.47, 0.32, 0.98] }}
                viewport={{ once: true }}
                className="group relative"
              >
                <div className={`relative h-full rounded-[40px] border border-slate-100 bg-white overflow-hidden transition-all duration-700 hover:shadow-[0_40px_80px_-20px_rgba(0,0,0,0.15)] hover:-translate-y-3 flex flex-col`}>

                  {/* Image & Overlay Section */}
                  <div className={`relative aspect-[4/5] overflow-hidden transition-colors duration-700 bg-slate-50 group-hover:bg-white group/img`}>
                    {/* Dynamic Gradient Glow */}
                    <div className={`absolute inset-0 opacity-0 group-hover:opacity-100 bg-gradient-to-br ${styles.glow} transition-opacity duration-700 pointer-events-none`} />

                    {/* Animated Abstract Shapes */}
                    <div className="absolute top-0 right-0 p-8 transform translate-x-1/2 -translate-y-1/2 group-hover:translate-x-0 group-hover:translate-y-0 transition-transform duration-1000 opacity-20 group-hover:opacity-40 pointer-events-none">
                      <div className={`w-32 h-32 rounded-full blur-2xl bg-current ${styles.color}`} />
                    </div>

                    <Link href={`/detail_page/${product._id}`} className="absolute inset-0 z-10 p-12 flex items-center justify-center">
                      <motion.div
                        className="w-full h-full relative"
                        whileHover={{ scale: 1.1, rotate: -3 }}
                        transition={{ duration: 0.7 }}
                      >
                        <Image
                          src={product.image}
                          alt={product.title}
                          fill
                          className="object-contain mix-blend-multiply drop-shadow-[0_20px_40px_rgba(0,0,0,0.1)]"
                        />
                      </motion.div>
                    </Link>

                    {/* Top Badges */}
                    <div className="absolute top-6 left-6 right-6 z-20 flex justify-between items-start pointer-events-none">
                      <Badge className={`${styles.bg} ${styles.color} border-none px-4 py-2 text-[10px] font-black uppercase tracking-widest rounded-2xl shadow-sm flex items-center`}>
                        {styles.icon}
                        {product.category}
                      </Badge>

                      {index % 3 === 0 && (
                        <Badge className="bg-slate-900 text-white border-none px-4 py-2 text-[10px] font-black uppercase tracking-widest rounded-2xl shadow-xl">
                          Featured
                        </Badge>
                      )}
                    </div>

                    {/* Action Buttons Hub */}
                    <div className="absolute bottom-8 inset-x-0 flex justify-center gap-3 z-30 translate-y-20 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 ease-out">
                      <button
                        onClick={(e) => handleAddToCart(product, e)}
                        className={`h-14 w-14 rounded-2xl bg-slate-900 text-white flex items-center justify-center shadow-2xl hover:scale-110 active:scale-95 transition-all duration-300 transform`}
                      >
                        <ShoppingCart size={22} strokeWidth={2.5} />
                      </button>
                      <Link
                        href={`/detail_page/${product._id}`}
                        className="h-14 w-14 rounded-2xl bg-white text-slate-900 flex items-center justify-center shadow-2xl hover:bg-slate-50 hover:scale-110 active:scale-95 transition-all duration-300"
                      >
                        <Eye size={22} strokeWidth={2.5} />
                      </Link>
                    </div>
                  </div>

                  {/* Content Section */}
                  <div className="p-10 flex flex-col flex-grow relative">
                    {/* Color Switchers (Purely Aesthetic for unique look) */}
                    <div className="flex gap-2 mb-4">
                      {[1, 2, 3].map((c) => (
                        <div
                          key={c}
                          className={`w-3 h-3 rounded-full border border-slate-200 transition-transform hover:scale-150 cursor-pointer`}
                          style={{ backgroundColor: c === 1 ? 'currentColor' : c === 2 ? '#94a3b8' : '#e2e8f0' }}
                        />
                      ))}
                    </div>

                    <div className="flex items-center gap-3 mb-2">
                      <div className="flex text-amber-500">
                        {[1, 2, 3, 4, 5].map((s) => (
                          <Star key={s} size={14} fill={s <= 4 ? "currentColor" : "none"} className={s > 4 ? "text-slate-200" : ""} />
                        ))}
                      </div>

                    </div>

                    <Link href={`/detail_page/${product._id}`} className="block mb-2 group/title">
                      <h3 className="text-2xl font-black text-slate-900 leading-[1.2] line-clamp-2 min-h-[3.8rem] transition-colors group-hover/title:text-indigo-600">
                        {product.title}
                      </h3>
                    </Link>

                    <div className="mt-auto  border-t border-slate-50 flex items-end justify-between">
                      <div>
                        <p className="text-slate-400 text-sm font-bold mb-1 opacity-50 line-through">
                          ${(product.price * 1.4).toFixed(2)}
                        </p>
                        <p className={`text-3xl font-black tracking-tight ${styles.color}`}>
                          ${product.price.toFixed(2)}
                        </p>
                      </div>

                      <Link
                        href={`/detail_page/${product._id}`}
                        className="h-14 px-8 rounded-2xl bg-slate-50 text-slate-900 text-sm font-black flex items-center gap-2 hover:bg-slate-100 transition-colors group/btn"
                      >
                        Details
                        <ArrowRight size={18} className="translate-x-0 group-hover/btn:translate-x-1.5 transition-transform duration-300" />
                      </Link>
                    </div>
                  </div>
                </div>
              </MotionDiv>
            );
          })
        ) : (
          <div className="col-span-full">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 w-full">
              {[...Array(3)].map((_, i) => (
                <ProductSkeleton key={`empty-${i}`} />
              ))}
            </div>
            <div className="py-20 flex flex-col items-center justify-center text-center space-y-6">
              <div className="w-32 h-32 bg-slate-50 rounded-[40px] flex items-center justify-center shadow-inner">
                <ShoppingBag className="text-slate-300" size={56} strokeWidth={1} />
              </div>
              <div className="space-y-2">
                <h3 className="text-2xl font-black text-slate-900 tracking-tight">No Items Found</h3>
                <p className="text-slate-500 text-sm max-w-xs mx-auto">
                  We couldn't find any items matching "{searchQuery || selectedCategory}".
                </p>
              </div>
              <Button
                variant="outline"
                className="rounded-2xl h-14 px-8 border-2 font-bold"
                onClick={() => window.location.reload()}
              >
                Reset All Filters
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}