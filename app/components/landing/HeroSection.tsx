"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";

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
          className="flex flex-col items-center w-full max-w-6xl"
        >
          <div className="flex flex-col md:flex-row items-center justify-center gap-16 md:gap-48 mb-16 w-full">
            
            {/* Coffee & Tea */}
            <div className="flex flex-col items-center gap-6 group">
              <div className="relative w-32 h-32 md:w-40 md:h-40 flex items-center justify-center rounded-full bg-[#DFD0B8] shadow-[0_0_30px_rgba(223,208,184,0.2)] p-6 transition-transform duration-500 group-hover:scale-105">
                <div className="relative w-full h-full">
                  <Image 
                    src="/og-image.jpg" 
                    alt="Coffee & Tea Logo" 
                    fill
                    className="object-contain opacity-90"
                    priority
                  />
                </div>
              </div>
              <div className="flex flex-col items-center text-center">
                <h1 className="text-3xl md:text-4xl font-serif font-bold text-[#DFD0B8] tracking-wide mb-1">TREE HOUSE</h1>
                <h2 className="text-xl font-serif font-bold text-[#DFD0B8]/90 tracking-wider">COFFEE & TEA</h2>
                <span className="text-sm text-[#DFD0B8]/70 uppercase tracking-widest mt-2">Doğal Demlemeler</span>
              </div>
            </div>

            {/* Divider */}
            <div className="hidden md:block w-px h-48 bg-[#DFD0B8]/20"></div>

            {/* Gamehall */}
            <div className="flex flex-col items-center gap-6 group">
              <div className="relative w-32 h-32 md:w-40 md:h-40 flex items-center justify-center rounded-full bg-[#DFD0B8] shadow-[0_0_30px_rgba(223,208,184,0.2)] p-6 transition-transform duration-500 group-hover:scale-105">
                <div className="relative w-full h-full">
                  <Image 
                    src="/og-image.jpg" 
                    alt="Gamehall Logo" 
                    fill
                    className="object-contain opacity-90"
                    priority
                  />
                </div>
              </div>
              <div className="flex flex-col items-center text-center">
                <h1 className="text-3xl md:text-4xl font-serif font-bold text-[#DFD0B8] tracking-wide mb-1">TREE HOUSE</h1>
                <h2 className="text-xl font-serif font-bold text-[#DFD0B8]/90 tracking-wider">GAMEHALL</h2>
                <span className="text-sm text-[#DFD0B8]/70 uppercase tracking-widest mt-2">Eğlence & Oyunlar</span>
              </div>
            </div>

          </div>

          <Link 
            href="#gallery"
            className="group relative overflow-hidden rounded-full bg-[#DFD0B8] px-10 py-4 text-[#202020] font-semibold transition-all hover:bg-[#DFD0B8]/90 hover:scale-105 shadow-lg mt-12"
          >
            <span className="relative z-10 tracking-widest uppercase text-sm">Mekanımızı Keşfedin</span>
          </Link>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 text-[#DFD0B8]/70"
      >
        <div className="flex flex-col items-center gap-2">
          <span className="text-xs uppercase tracking-widest">Kaydır</span>
          <motion.div 
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
            className="h-6 w-4 rounded-full border-2 border-[#DFD0B8]/50 flex justify-center pt-1"
          >
            <div className="h-1.5 w-1 bg-[#DFD0B8] rounded-full" />
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
