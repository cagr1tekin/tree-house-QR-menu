"use client";

import { Category } from "@/types";
import { motion } from "framer-motion";
import Link from "next/link";

export default function MenuCategoryGrid({ categories }: { categories: Category[] }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto px-6 -mt-20 relative z-20">
      {categories.map((category, index) => (
        <motion.div
          key={category.id}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
        >
          <Link
            href={`/menu/${category.slug}`}
            className="group relative flex flex-col items-start justify-center bg-[#333333] p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-[#DFD0B8]/10 hover:border-[#DFD0B8]/50 overflow-hidden"
          >
            <h3 className="text-2xl font-serif font-bold text-[#DFD0B8] group-hover:text-[#DFD0B8]/80 transition-colors text-left z-10 pl-2 mb-2">
              {category.name}
            </h3>
            <p className="text-[#DFD0B8]/60 text-sm font-medium tracking-widest camelcase pl-2 group-hover:text-[#DFD0B8] transition-colors">
              Explore Our Selections
            </p>
          </Link>
        </motion.div>
      ))}
    </div>
  );
}
