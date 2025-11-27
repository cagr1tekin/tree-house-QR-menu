"use client";

import { motion } from "framer-motion";
import { MapPin, Phone, Clock, Instagram } from "lucide-react";

export default function ContactSection() {
  return (
    <section className="py-24 bg-[#f5efe6] text-[#4e342e]">
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
            <h2 className="text-4xl font-serif font-bold text-[#2c1810]">Visit Us</h2>
            <p className="text-lg text-[#4e342e]/80">
              We are located in the heart of the forest, just a short drive from the city center. 
              Come and breathe in the fresh air.
            </p>

            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="bg-[#d3a15d]/20 p-3 rounded-full text-[#d3a15d]">
                  <MapPin className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-bold text-lg">Address</h3>
                  <p className="text-[#4e342e]/70">123 Forest Lane, Green Valley, CA 90210</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="bg-[#d3a15d]/20 p-3 rounded-full text-[#d3a15d]">
                  <Phone className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-bold text-lg">Contact</h3>
                  <p className="text-[#4e342e]/70">+1 (555) 123-4567</p>
                  <p className="text-[#4e342e]/70">hello@treehousecafe.com</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="bg-[#d3a15d]/20 p-3 rounded-full text-[#d3a15d]">
                  <Clock className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-bold text-lg">Opening Hours</h3>
                  <p className="text-[#4e342e]/70">Mon - Fri: 8:00 AM - 10:00 PM</p>
                  <p className="text-[#4e342e]/70">Sat - Sun: 9:00 AM - 11:00 PM</p>
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
            className="h-[400px] w-full bg-[#e5e0d8] rounded-3xl overflow-hidden shadow-lg relative"
          >
            {/* Replace with actual Google Maps iframe */}
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3151.835434509374!2d144.9537353153169!3d-37.816279742021665!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6ad642af0f11fd81%3A0xf577d22e3189d293!2sFederation%20Square!5e0!3m2!1sen!2sau!4v1645678901234!5m2!1sen!2sau" 
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
