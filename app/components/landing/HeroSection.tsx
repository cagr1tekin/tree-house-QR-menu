"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export default function HeroSection() {
  return (
    <section className="relative h-screen w-full overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1509042239860-f550ce710b93?q=80&w=2070&auto=format&fit=crop')",
        }}
      >
        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-black/40" />
      </div>

      {/* Content */}
      <div className="relative z-10 flex h-full flex-col items-center justify-center text-center px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="flex flex-col items-center"
        >
          {/* Logo Placeholder */}
          <div className="mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-white/10 backdrop-blur-md border border-white/20 shadow-2xl">
            <span className="text-5xl">🌲</span>
          </div>

          <h1 className="mb-4 font-serif text-5xl font-bold text-[#f5efe6] drop-shadow-lg md:text-7xl tracking-wide">
            TREE HOUSE
          </h1>
          <p className="mb-8 max-w-lg text-lg font-light text-[#f5efe6]/90 md:text-xl tracking-widest uppercase">
            Experience Nature & Taste
          </p>

          <Link 
            href="#gallery"
            className="group relative overflow-hidden rounded-full bg-[#d3a15d] px-8 py-3 text-[#2c1810] font-semibold transition-all hover:bg-[#e0b374] hover:scale-105 shadow-lg"
          >
            <span className="relative z-10">Discover Our Place</span>
          </Link>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 text-[#f5efe6]/70"
      >
        <div className="flex flex-col items-center gap-2">
          <span className="text-xs uppercase tracking-widest">Scroll</span>
          <motion.div 
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
            className="h-6 w-4 rounded-full border-2 border-[#f5efe6]/50 flex justify-center pt-1"
          >
            <div className="h-1.5 w-1 bg-[#f5efe6] rounded-full" />
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
