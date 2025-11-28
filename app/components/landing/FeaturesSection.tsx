"use client";

import { motion } from "framer-motion";
import { Leaf, Coffee, Sun, Star } from "lucide-react";

const features = [
  {
    icon: <Leaf className="w-8 h-8" />,
    title: "Organic & Fresh",
    description: "We source our ingredients directly from local organic farms to ensure the highest quality and taste."
  },
  {
    icon: <Sun className="w-8 h-8" />,
    title: "Outdoor Ambiance",
    description: "Enjoy your meal in our beautiful open-air treehouse setting, surrounded by lush greenery."
  },
  {
    icon: <Coffee className="w-8 h-8" />,
    title: "Artisan Coffee",
    description: "Our baristas craft the perfect cup using premium beans roasted to perfection."
  },
  {
    icon: <Star className="w-8 h-8" />,
    title: "Premium Service",
    description: "Experience warm, attentive hospitality that makes you feel right at home."
  }
];

export default function FeaturesSection() {
  return (
    <section className="py-24 bg-[#202020] text-[#DFD0B8]">
      <div className="container mx-auto px-6 md:px-12">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4 text-[#DFD0B8]">Why Choose Us</h2>
          <p className="text-[#DFD0B8]/70 max-w-2xl mx-auto">
            We are more than just a cafe; we are a destination for those who seek quality, nature, and peace.
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
