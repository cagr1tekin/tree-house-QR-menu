"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export default function AboutSection() {
  return (
    <section className="relative py-24 bg-[#181818] text-[#DFD0B8] overflow-hidden">
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
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-[#DFD0B8]">
              İki Dünya, Tek Marka
            </h2>
            <div className="h-1 w-20 bg-[#DFD0B8]"></div>
            <p className="text-lg leading-relaxed text-[#DFD0B8]/80">
Tree House olarak Balıkesir’de aynı marka çatısı altında iki farklı deneyim sunuyoruz. Coffee & Tea konseptimizle; konforlu, kaliteli ve içecek odaklı yapımız sayesinde günün her anında profesyonel ve huzurlu bir atmosfer oluşturuyoruz. GameHall’da ise modern oyun alanımız ve sosyal ortamımızla eğlence odaklı bir deneyim sağlıyoruz. Her iki lokasyonda da konseptimizi, hizmet standartlarımızı ve misafir memnuniyetine verdiğimiz önemi koruyarak şehirde seçkin bir marka olarak konumlanıyoruz.
            </p>
          </motion.div>

          {/* Image Content */}
          <div className="relative h-[600px] w-full hidden md:block">
            {/* Image 1: Coffee & Tea (Classic/Cozy) */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="absolute top-0 left-0 w-[65%] h-[70%] rounded-3xl overflow-hidden shadow-2xl z-10"
            >
              <Image
                src="https://images.unsplash.com/photo-1509042239860-f550ce710b93?q=80&w=1000&auto=format&fit=crop"
                alt="Coffee & Tea Area"
                fill
                className="object-cover hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-black/20"></div>
              <div className="absolute bottom-4 left-6">
                <span className="text-[#DFD0B8] font-serif text-xl font-bold drop-shadow-md">Coffee & Tea</span>
              </div>
            </motion.div>

            {/* Image 2: Gamehall (Social/Lively) */}
            <motion.div
              initial={{ opacity: 0, y: -50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="absolute bottom-0 right-0 w-[65%] h-[70%] rounded-3xl overflow-hidden shadow-2xl z-20 border-8 border-[#181818]"
            >
              <Image
                src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=1000&auto=format&fit=crop"
                alt="Gamehall Area"
                fill
                className="object-cover hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-black/20"></div>
              <div className="absolute bottom-4 left-6">
                <span className="text-[#DFD0B8] font-serif text-xl font-bold drop-shadow-md">Gamehall</span>
              </div>
            </motion.div>
          </div>

          {/* Mobile Image View (Single Stacked) */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative h-[400px] w-full rounded-3xl overflow-hidden shadow-2xl md:hidden"
          >
             <Image
                src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=1000&auto=format&fit=crop"
                alt="Tree House Atmosphere"
                fill
                className="object-cover"
              />
          </motion.div>

        </div>
      </div>
    </section>
  );
}
