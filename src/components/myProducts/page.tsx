"use client";

import axios from "axios";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Link from "next/link";
import { motion } from "framer-motion";
import { ShoppingCart, Eye, Star, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { addCart } from "@/redux/slices/add_To_Cart/page";

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

export default function MyProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const searchQuery = useSelector((state: any) => state.searching.query);

  useEffect(() => {
    setLoading(true);
    axios.get<Product[]>("/api/products")
      .then((resp) => {
        setProducts(resp.data);
      })
      .catch((err) => {
        console.error("Error fetching products:", err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const filteredProducts = products.filter((p) => {
    return p.title.toLowerCase().includes(searchQuery.toLowerCase());
  });

  const handleAddToCart = (product: Product, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
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
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {[...Array(8)].map((_, i) => (
          <div key={i} className="animate-pulse bg-slate-50 rounded-3xl border border-slate-100 overflow-hidden aspect-[3/4]">
            <div className="h-48 bg-slate-100 mb-4" />
            <div className="px-6 space-y-3">
              <div className="h-4 w-2/3 bg-slate-100 rounded" />
              <div className="h-4 w-1/2 bg-slate-100 rounded" />
              <div className="h-10 w-full bg-slate-100 rounded-xl mt-6" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
      {filteredProducts.map((product, index) => (
        <motion.div
          key={product._id}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: index * 0.05 }}
          viewport={{ once: true }}
          className={`group relative rounded-3xl border border-slate-100 overflow-hidden transition-all duration-500 hover:-translate-y-2 flex flex-col ${
            product.category === "jewelery" ? "card-luxury" : 
            product.category === "electronics" ? "card-tech" : 
            "card-lifestyle bg-white"
          }`}
        >
          {/* Badge */}
          <div className="absolute top-4 left-4 z-10 flex flex-col gap-2">
            <Badge className="bg-white/80 backdrop-blur-md text-slate-900 border-none px-3 py-1 text-[10px] font-bold uppercase tracking-wider rounded-full shadow-sm">
              {product.category}
            </Badge>
          </div>

          {/* Image Container */}
          <div className="relative h-64 overflow-hidden bg-slate-50 flex items-center justify-center p-8 group">
            <Link href={`/detail_page/${product._id}`} className="absolute inset-0 flex items-center justify-center p-8">
              <motion.img
                src={product.image}
                alt={product.title}
                className="max-h-full object-contain mix-blend-multiply transition-transform duration-700 group-hover:scale-110"
                loading="lazy"
              />
            </Link>
            
            {/* Quick Actions Overlay */}
            <div className="absolute inset-x-0 bottom-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-500 flex justify-center gap-2 z-20">
              <Button
                size="icon"
                variant="secondary"
                className="rounded-full h-12 w-12 bg-white/90 backdrop-blur-sm shadow-xl hover:bg-primary hover:text-white transition-all transform hover:scale-110 active:scale-95"
                onClick={(e) => handleAddToCart(product, e)}
              >
                <ShoppingCart size={20} />
              </Button>
              <Button
                size="icon"
                variant="secondary"
                className="rounded-full h-12 w-12 bg-white/90 backdrop-blur-sm shadow-xl hover:bg-primary hover:text-white transition-all transform hover:scale-110 active:scale-95"
                asChild
              >
                <Link href={`/detail_page/${product._id}`}>
                  <Eye size={20} />
                </Link>
              </Button>
            </div>
          </div>

          {/* Content */}
          <div className="p-6 flex flex-col flex-grow">
            <div className="flex items-center gap-2 mb-2">
              <div className="flex text-amber-400">
                <Star size={12} fill="currentColor" />
                <Star size={12} fill="currentColor" />
                <Star size={12} fill="currentColor" />
                <Star size={12} fill="currentColor" />
                <Star size={12} fill="currentColor" className="text-slate-200" />
              </div>
              <span className="text-[10px] text-slate-400 font-bold uppercase">(128 reviews)</span>
            </div>

            <Link href={`/detail_page/${product._id}`} className="block mb-2">
              <h3 className={`font-bold leading-tight transition-colors line-clamp-2 min-h-[3rem] ${
                product.category === "jewelery" ? "text-white group-hover:text-jewelry-gold" : "text-foreground group-hover:text-primary"
              }`}>
                {product.title}
              </h3>
            </Link>

            <div className="mt-auto pt-4 flex items-center justify-between">
              <div>
                <span className="text-slate-400 text-xs font-semibold line-through mr-2">$ {(product.price * 1.25).toFixed(2)}</span>
                <span className={`text-xl font-black ${
                  product.category === "jewelery" ? "text-jewelry-gold" : "text-price-tag"
                }`}>${product.price.toFixed(2)}</span>
              </div>
              <Link
                href={`/detail_page/${product._id}`}
                className={`text-xs font-bold flex items-center gap-1 group/btn ${
                  product.category === "jewelery" ? "text-jewelry-gold" : "text-slate-800"
                }`}
              >
                Details
                <ArrowRight size={14} className="group-hover/btn:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
}