"use client";

import { Product } from "@/types";
import Image from "next/image";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function ProductList({ products }: { products: Product[] }) {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
        {products.length === 0 ? (
          <div className="col-span-full text-center py-10 text-[#4e342e]/60">
            <p>Bu kategoride henüz ürün bulunmuyor.</p>
          </div>
        ) : (
          products.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
              onClick={() => setSelectedProduct(product)}
              className="group bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 cursor-pointer flex flex-row items-center p-3 gap-4 h-auto"
            >
              {/* Product Image */}
              <div className="relative w-24 h-24 flex-shrink-0 bg-gray-100 overflow-hidden rounded-xl">
                {product.image_url ? (
                  <Image
                    src={product.image_url}
                    alt={product.name}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-[#4e342e]/20 bg-[#f5efe6]">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-8 h-8"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
                      />
                    </svg>
                  </div>
                )}
              </div>

              {/* Product Details */}
              <div className="flex-1 flex flex-col justify-center">
                <div className="flex justify-between items-start mb-1">
                  <h3 className="font-bold text-lg text-[#2c1810] leading-tight font-serif group-hover:text-[#d3a15d] transition-colors">
                    {product.name}
                  </h3>
                  <span className="font-bold text-[#d3a15d] text-base whitespace-nowrap ml-2">
                    {product.price} {product.currency}
                  </span>
                </div>
                {product.description && (
                  <p className="text-xs text-[#4e342e]/70 line-clamp-2 leading-relaxed">
                    {product.description}
                  </p>
                )}
              </div>
            </motion.div>
          ))
        )}
      </div>

      {/* Product Detail Modal */}
      <AnimatePresence>
        {selectedProduct && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0"
              onClick={() => setSelectedProduct(null)}
            />
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="bg-[#f5efe6] w-full max-w-md rounded-3xl overflow-hidden shadow-2xl relative z-10"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button 
                onClick={() => setSelectedProduct(null)}
                className="absolute top-4 right-4 z-20 w-10 h-10 bg-black/20 hover:bg-black/40 text-white rounded-full flex items-center justify-center backdrop-blur-md transition-colors"
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>

              {/* Large Image */}
              <div className="relative w-full h-72 bg-gray-100">
                {selectedProduct.image_url ? (
                  <Image
                    src={selectedProduct.image_url}
                    alt={selectedProduct.name}
                    fill
                    className="object-cover"
                    priority
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-[#4e342e]/20 bg-[#e5e0d8]">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-16 h-16">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
                    </svg>
                  </div>
                )}
              </div>

              {/* Content */}
              <div className="p-8 space-y-6">
                <div className="flex justify-between items-start gap-4 border-b border-[#4e342e]/10 pb-4">
                  <h2 className="text-3xl font-bold text-[#2c1810] font-serif leading-tight">
                    {selectedProduct.name}
                  </h2>
                  <span className="text-2xl font-bold text-[#d3a15d] whitespace-nowrap font-serif">
                    {selectedProduct.price} {selectedProduct.currency}
                  </span>
                </div>
                
                {selectedProduct.description && (
                  <p className="text-[#4e342e]/80 leading-relaxed text-lg">
                    {selectedProduct.description}
                  </p>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
