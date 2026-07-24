"use client";

import React, { useEffect, useState, useRef } from "react";
import { useParams } from "next/navigation";
import gsap from "gsap";
import { ShoppingCart, Check, Star, Loader2, Info } from "lucide-react";
import { productService } from "@/src/services/product.service";
import { cartService } from "@/src/services/cart.service";
import { Product } from "@/src/types/product";
import { IMAGE_BASE_URL } from "@/src/lib/api-client";

export default function ProductDetailPage() {
  const { id } = useParams();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  
  const [activeImage, setActiveImage] = useState("");
  const [selectedSize, setSelectedSize] = useState("");
  const [qty, setQty] = useState(1);
  const [addingToCart, setAddingToCart] = useState(false);
  const [added, setAdded] = useState(false);

  const imageRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    productService.getProductById(Number(id)).then((data) => {
      setProduct(data);
      if (data.productImages?.length) {
        setActiveImage(data.productImages[0].imageUrl);
      }
      const firstAvail = data.variants?.find((v) => v.stock > 0);
      if (firstAvail) setSelectedSize(firstAvail.size);
      setLoading(false);
    });
  }, [id]);

  useEffect(() => {
    if (!loading && imageRef.current && contentRef.current) {
      gsap.fromTo(imageRef.current, { opacity: 0, x: -40 }, { opacity: 1, x: 0, duration: 1, ease: "power3.out" });
      gsap.fromTo(contentRef.current.children, 
        { opacity: 0, y: 20 }, 
        { opacity: 1, y: 0, duration: 0.8, stagger: 0.1, ease: "power2.out", delay: 0.2 }
      );
    }
  }, [loading]);

  if (loading) {
    return <div className="min-h-screen bg-[#060606] flex items-center justify-center"><Loader2 className="animate-spin text-[#D4AF37]" /></div>;
  }

  if (!product) return <div className="min-h-screen bg-[#060606] text-white flex items-center justify-center">Asset Not Found</div>;

  const resolveImageUrl = (url: string) => {
    if (url.startsWith("http")) return url;
    return `${IMAGE_BASE_URL}${url.startsWith("/") ? "" : "/"}${url}`;
  };

  const selectedVariant = product.variants?.find((v) => v.size === selectedSize);
  const isOutOfStock = !product.variants?.some((v) => v.stock > 0);
  const currentStock = selectedVariant?.stock || 0;

  const handleAddToCart = async () => {
    if (!selectedVariant || addingToCart || currentStock === 0) return;
    setAddingToCart(true);
    try {
      for(let i=0; i<qty; i++) {
        await cartService.addItem(selectedVariant.id, 1);
      }
      setAdded(true);
      setTimeout(() => setAdded(false), 2500);
    } catch (err) {
      alert("Error securing allocation.");
    } finally {
      setAddingToCart(false);
    }
  };

  // 3D Hover Effect for Main Image
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!imageRef.current) return;
    const { left, top, width, height } = imageRef.current.getBoundingClientRect();
    const x = (e.clientX - left) / width - 0.5;
    const y = (e.clientY - top) / height - 0.5;
    gsap.to(imageRef.current, { rotateY: x * 8, rotateX: -y * 8, transformPerspective: 1000, ease: "power1.out" });
  };
  const handleMouseLeave = () => {
    if (imageRef.current) gsap.to(imageRef.current, { rotateY: 0, rotateX: 0, duration: 0.5 });
  };

  return (
    <div className="min-h-screen bg-[#060606] pt-32 pb-24 text-[#F8F6F2]">
      <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-2 gap-16">
        
        {/* Left: Image Gallery */}
        <div className="relative">
          <div 
            ref={imageRef} 
            onMouseMove={handleMouseMove} 
            onMouseLeave={handleMouseLeave}
            className="aspect-square bg-[#0D0D0D] border border-white/[0.04] p-4 relative shadow-[0_0_50px_rgba(212,175,55,0.05)]"
          >
            <img src={resolveImageUrl(activeImage)} alt={product.name} className="w-full h-full object-cover filter brightness-90 contrast-125" />
          </div>
          
          <div className="flex gap-4 mt-6 overflow-x-auto custom-scrollbar pb-2">
            {product.productImages?.map((img) => (
              <button 
                key={img.id} 
                onClick={() => setActiveImage(img.imageUrl)}
                className={`w-20 h-20 border flex-shrink-0 transition-colors ${activeImage === img.imageUrl ? "border-[#D4AF37] opacity-100" : "border-white/[0.04] opacity-50 hover:opacity-100"}`}
              >
                <img src={resolveImageUrl(img.imageUrl)} alt="Thumbnail" className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        </div>

        {/* Right: Product Info */}
        <div ref={contentRef} className="flex flex-col">
          <span className="font-body text-[10px] uppercase tracking-[0.3em] text-[#D4AF37]">{product.category?.name}</span>
          <h1 className="mt-4 font-display text-4xl md:text-5xl font-bold tracking-tight">{product.name}</h1>
          
          <div className="mt-6 font-mono text-2xl text-[#D4AF37]">
            {selectedVariant ? `£${selectedVariant.price}` : "Select Variant"}
          </div>

          <p className="mt-8 font-body text-[13px] leading-[1.8] text-[#888888]">
            {product.description}
          </p>

          <div className="border-t border-white/[0.04] mt-10 pt-8">
            <div className="flex justify-between items-center mb-4">
              <span className="font-body text-[11px] uppercase tracking-widest text-[#666]">Configuration Spec</span>
              {currentStock > 0 && currentStock <= 5 && (
                <span className="text-[10px] text-amber-500 uppercase tracking-widest flex items-center gap-1"><Info className="w-3 h-3"/> Low Allocation</span>
              )}
            </div>
            
            <div className="flex flex-wrap gap-3">
              {product.variants?.map((v) => (
                <button
                  key={v.id}
                  disabled={v.stock === 0}
                  onClick={() => { setSelectedSize(v.size); setQty(1); }}
                  className={`px-5 py-2 border font-mono text-xs transition-all ${
                    selectedSize === v.size ? "border-[#D4AF37] text-[#D4AF37] bg-[#D4AF37]/10" 
                    : v.stock === 0 ? "border-white/[0.02] text-[#444] cursor-not-allowed" 
                    : "border-white/[0.06] hover:border-white/[0.2] text-[#A0A0A0]"
                  }`}
                >
                  {v.size}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-10 flex gap-4">
            <div className="flex items-center border border-white/[0.06] bg-[#0A0A0A]">
              <button onClick={() => setQty(q => Math.max(1, q - 1))} className="px-4 text-[#888] hover:text-white transition">-</button>
              <span className="font-mono text-sm w-8 text-center">{qty}</span>
              <button onClick={() => setQty(q => Math.min(currentStock, q + 1))} className="px-4 text-[#888] hover:text-white transition">+</button>
            </div>
            
            <button
              onClick={handleAddToCart}
              disabled={isOutOfStock || addingToCart || added}
              className={`flex-1 py-4 flex items-center justify-center gap-2 font-body text-[10px] uppercase tracking-widest font-bold transition-all ${
                added ? "bg-green-900/30 text-green-400 border border-green-500/50" 
                : isOutOfStock ? "bg-[#111] text-[#555] cursor-not-allowed" 
                : "bg-[#D4AF37] text-[#0B0B0B] hover:bg-[#EAD07B]"
              }`}
            >
              {added ? <><Check className="w-4 h-4"/> Allocation Secured</> 
               : addingToCart ? <Loader2 className="w-4 h-4 animate-spin"/> 
               : isOutOfStock ? "Depleted" 
               : <><ShoppingCart className="w-4 h-4"/> Acquire Asset</>}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}