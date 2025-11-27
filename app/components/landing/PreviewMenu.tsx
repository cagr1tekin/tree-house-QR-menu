"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

const menuItems = [
  {
    name: "Avocado Toast",
    description: "Sourdough bread, smashed avocado, poached egg, chili flakes.",
    price: "$12",
    image: "https://images.unsplash.com/photo-1588137372308-15f75323ca8d?q=80&w=1974&auto=format&fit=crop"
  },
  {
    name: "Forest Berry Bowl",
    description: "Acai blend, granola, fresh berries, honey, chia seeds.",
    price: "$14",
    image: "https://images.unsplash.com/photo-1590301157890-4810ed352733?q=80&w=1975&auto=format&fit=crop"
  },
  {
    name: "Truffle Mushroom Pasta",
    description: "Handmade tagliatelle, creamy truffle sauce, parmesan.",
    price: "$18",
    image: "https://images.unsplash.com/photo-1626844131082-256783844137?q=80&w=1935&auto=format&fit=crop"
  }
];

export default function PreviewMenu() {
  return (
    <section className="py-24 bg-[#f5efe6]">
      <div className="container mx-auto px-6 md:px-12">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
          <div>
            <h2 className="text-4xl font-serif font-bold text-[#2c1810] mb-2">Our Favorites</h2>
            <p className="text-[#4e342e]/80">A glimpse into our kitchen's finest creations.</p>
          </div>
          <Link 
            href="/menu" 
            className="px-6 py-3 rounded-full border border-[#4e342e] text-[#4e342e] font-medium hover:bg-[#4e342e] hover:text-[#f5efe6] transition-colors duration-300"
          >
            View Full Menu
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
              className="group bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300"
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
                  <h3 className="text-xl font-bold text-[#2c1810] font-serif">{item.name}</h3>
                  <span className="text-[#d3a15d] font-bold">{item.price}</span>
                </div>
                <p className="text-[#4e342e]/70 text-sm mb-4">{item.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
