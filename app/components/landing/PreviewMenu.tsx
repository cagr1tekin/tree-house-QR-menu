"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

const menuItems = [
  {
    name: "Avokado Tost",
    description: "Ekşi maya ekmek, ezilmiş avokado, poşe yumurta, pul biber.",
    price: "$12",
    image: "https://images.unsplash.com/photo-1588137372308-15f75323ca8d?q=80&w=1974&auto=format&fit=crop"
  },
  {
    name: "Orman Meyveli Kase",
    description: "Acai karışımı, granola, taze meyveler, bal, chia tohumu.",
    price: "$14",
    image: "https://images.unsplash.com/photo-1590301157890-4810ed352733?q=80&w=1975&auto=format&fit=crop"
  },
  {
    name: "Trüflü Mantarlı Makarna",
    description: "El yapımı tagliatelle, kremalı trüf sos, parmesan.",
    price: "$18",
    image: "https://images.unsplash.com/photo-1626844131082-256783844137?q=80&w=1935&auto=format&fit=crop"
  }
];

export default function PreviewMenu() {
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
          {menuItems.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group bg-[#333333] rounded-3xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300"
            >
              <div className="relative h-64 w-full overflow-hidden">
                <Image
                  src={item.image}
                  alt={item.name}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                />
              </div>
              <div className="p-6">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-xl font-bold text-[#DFD0B8] font-serif">{item.name}</h3>
                  <span className="text-[#DFD0B8] font-bold">{item.price}</span>
                </div>
                <p className="text-[#DFD0B8]/70 text-sm mb-4">{item.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
