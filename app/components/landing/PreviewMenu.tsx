"use client";

import { Product } from "@/types";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

export default function PreviewMenu({ products }: { products: Product[] }) {
  return (
    <section className="py-24 bg-[#202020]">
      <div className="container mx-auto px-6 md:px-12">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
          <div>
            <h2 className="text-4xl font-serif font-bold text-[#DFD0B8] mb-2">Favorilerimiz</h2>
            <p className="text-[#DFD0B8]/80">Mutfağımızın en seçkin lezzetlerine bir bakış.</p>
          </div>
          <Link 
            href="/menu" 
            className="px-6 py-3 rounded-full border border-[#DFD0B8] text-[#DFD0B8] font-medium hover:bg-[#DFD0B8] hover:text-[#202020] transition-colors duration-300"
          >
            Tüm Menüyü Gör
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {products.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group bg-[#333333] rounded-3xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300"
            >
              <div className="relative h-64 w-full overflow-hidden bg-[#1a1a1a]">
                {item.image_url ? (
                  <Image
                    src={item.image_url}
                    alt={item.name}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-[#DFD0B8]/20">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-12 h-12">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
                    </svg>
                  </div>
                )}
              </div>
              <div className="p-6">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-xl font-bold text-[#DFD0B8] font-serif">{item.name}</h3>
                  <span className="text-[#DFD0B8] font-bold">{item.price} {item.currency}</span>
                </div>
                {item.description && (
                  <p className="text-[#DFD0B8]/70 text-sm mb-4 line-clamp-2">{item.description}</p>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
