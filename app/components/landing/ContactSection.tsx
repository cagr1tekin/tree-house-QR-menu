"use client";

import { motion } from "framer-motion";
import { MapPin, Phone, Clock, Instagram } from "lucide-react";

// --- İLETİŞİM BİLGİLERİ VE HARİTA AYARLARI ---
const CONTACT_INFO = {
  address: "Altı Eylül, Çiğdem Sk. No:5, 10100 Merkez/Balıkesir", // Buraya açık adresi yaz
  phone: "+1 (555) 123-4567",
  email: "hello@treehousecafe.com",
  hours: "11:00–02:00 (Her Gün)"
};

// Google Maps'ten "Harita Yerleştir" (Embed) diyerek aldığın iframe src linkini buraya yapıştır.
const GOOGLE_MAPS_EMBED_URL = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d397.7915708384436!2d27.882521881182733!3d39.644149563330224!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14b701a5c1a1561d%3A0xe9bdb883df986773!2sTreeHouse%20Coffee%20Shop!5e0!3m2!1str!2str!4v1764449689101!5m2!1str!2str";

export default function ContactSection() {
  return (
    <section className="py-24 bg-[#202020] text-[#DFD0B8]">
      <div className="container mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          
          {/* Info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            <h2 className="text-4xl font-serif font-bold text-[#DFD0B8]">Bizi Ziyaret Edin</h2>
            <p className="text-lg text-[#DFD0B8]/80">
Şehrin kalbinde, kolay ulaşılabilir konumumuzla hizmetinizdeyiz. Yoğun geçen gününüze mola verin, şehrin içinde konforlu ve ferah bir atmosferin keyfini çıkarın.
            </p>

            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="bg-[#DFD0B8]/20 p-3 rounded-full text-[#DFD0B8]">
                  <MapPin className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-bold text-lg">Adres</h3>
                  <p className="text-[#DFD0B8]/70">{CONTACT_INFO.address}</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="bg-[#DFD0B8]/20 p-3 rounded-full text-[#DFD0B8]">
                  <Phone className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-bold text-lg">İletişim</h3>
                  <p className="text-[#DFD0B8]/70">{CONTACT_INFO.phone}  -  {CONTACT_INFO.email}</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="bg-[#DFD0B8]/20 p-3 rounded-full text-[#DFD0B8]">
                  <Clock className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-bold text-lg">Çalışma Saatleri</h3>
                  <p className="text-[#DFD0B8]/70">{CONTACT_INFO.hours}</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Map Placeholder */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="h-[400px] w-full bg-[#333333] rounded-3xl overflow-hidden shadow-lg relative"
          >
            {/* Replace with actual Google Maps iframe */}
            <iframe 
              src={GOOGLE_MAPS_EMBED_URL}
              width="100%" 
              height="100%" 
              style={{ border: 0 }} 
              allowFullScreen 
              loading="lazy"
              className="grayscale opacity-80 hover:grayscale-0 hover:opacity-100 transition-all duration-500"
            ></iframe>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
