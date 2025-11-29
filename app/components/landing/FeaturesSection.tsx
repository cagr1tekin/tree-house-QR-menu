"use client";

import { motion } from "framer-motion";
import { Leaf, Coffee, Gamepad2, Users } from "lucide-react";

const features = [
  {
    icon: <Coffee className="w-8 h-8" />,
    title: "Premium Coffee & Tea",
    description: "Uzman baristalar tarafından mükemmel tat için hazırlanan özel harmanlarımızın ve organik çaylarımızın tadını çıkarın."
  },
  {
    icon: <Gamepad2 className="w-8 h-8" />,
    title: "Gamehall Eğlencesi",
    description: "Zengin kutu oyunlarımız sayesinde keyifli ve sosyal bir oyun deneyimi yaşayabilirsiniz. Sizi kaliteli zaman geçirmeye davet ediyoruz."
  },
  {
    icon: <Leaf className="w-8 h-8" />,
    title: "Doğal Atmosfer",
    description: "Sizi doğaya daha da yakınlaştırmak için tasarlanmış benzersiz ağaç ev ortamımızda rahatlayın."
  },
  {
    icon: <Users className="w-8 h-8" />,
    title: "Sosyal Buluşma",
    description: "Arkadaşlarınız ve ailenizle bağlantı kurmak, oyun oynamak ve anları paylaşmak için mükemmel buluşma noktası."
  }
];

export default function FeaturesSection() {
  return (
    <section className="py-24 bg-[#202020] text-[#DFD0B8]">
      <div className="container mx-auto px-6 md:px-12">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4 text-[#DFD0B8]">Neden Biz?</h2>
          <p className="text-[#DFD0B8]/70 max-w-2xl mx-auto">
            Biz sadece bir kafeden fazlasıyız; kalite, doğa ve huzur arayanlar için bir varış noktasıyız.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-[#333333]/50 backdrop-blur-sm p-8 rounded-3xl border border-[#DFD0B8]/10 hover:bg-[#333333] transition-colors duration-300 group"
            >
              <div className="mb-6 text-[#DFD0B8] bg-[#202020] w-16 h-16 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg">
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold mb-3 font-serif">{feature.title}</h3>
              <p className="text-[#DFD0B8]/70 text-sm leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
