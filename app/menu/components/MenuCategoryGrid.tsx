"use client";

import { Category } from "@/types";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

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
            className="group flex items-center justify-between bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-[#4e342e]/10 hover:border-[#d3a15d]/50"
          >
            <div className="flex items-center gap-6">
              {/* Number Badge */}
              <span className="flex items-center justify-center w-12 h-12 rounded-full bg-[#f5efe6] text-[#2c1810] font-serif font-bold text-lg group-hover:bg-[#2c1810] group-hover:text-[#d3a15d] transition-colors duration-300">
                {index + 1}
              </span>

              <div>
                <h3 className="text-2xl font-serif font-bold text-[#2c1810] group-hover:text-[#d3a15d] transition-colors">
                  {category.name}
                </h3>
                <p className="text-[#4e342e]/60 text-sm font-medium tracking-wide">
                  View Selection
                </p>
              </div>
            </div>

            <div className="w-10 h-10 rounded-full bg-[#f5efe6] flex items-center justify-center text-[#2c1810] group-hover:bg-[#d3a15d] group-hover:text-[#2c1810] transition-all duration-300">
              <ArrowRight className="w-5 h-5" />
            </div>
          </Link>
        </motion.div>
      ))}
    </div>
  );
}
