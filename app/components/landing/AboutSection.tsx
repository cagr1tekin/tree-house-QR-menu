"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export default function AboutSection() {
  return (
    <section className="relative py-24 bg-[#f5efe6] text-[#4e342e] overflow-hidden">
      <div className="container mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-2 items-center">
          
          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="space-y-6"
          >
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-[#2c1810]">
              A Sanctuary in Nature
            </h2>
            <div className="h-1 w-20 bg-[#d3a15d]"></div>
            <p className="text-lg leading-relaxed text-[#4e342e]/80">
              Nestled amongst the trees, our cafe offers a unique escape from the bustling city life. 
              We believe in the power of nature to heal and rejuvenate. Every corner of our space 
              is designed to bring you closer to the earth, with open-air seating, natural wood 
              interiors, and a peaceful ambiance.
            </p>
            <p className="text-lg leading-relaxed text-[#4e342e]/80">
              Our menu is crafted with love, using only the freshest organic ingredients sourced 
              from local farmers. Whether you're here for a morning coffee or a sunset dinner, 
              Tree House promises an unforgettable experience.
            </p>
          </motion.div>

          {/* Image Content */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative h-[500px] w-full rounded-3xl overflow-hidden shadow-2xl"
          >
            <Image
              src="https://images.unsplash.com/photo-1559339352-11d035aa65de?q=80&w=1974&auto=format&fit=crop"
              alt="Cafe Interior"
              fill
              className="object-cover hover:scale-105 transition-transform duration-700"
            />
            {/* Decorative Frame */}
            <div className="absolute inset-4 border border-[#f5efe6]/30 rounded-2xl pointer-events-none"></div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
