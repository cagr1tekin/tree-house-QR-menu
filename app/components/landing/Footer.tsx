import Link from "next/link";
import { Instagram, Facebook, Twitter } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-[#1a260b] text-[#f5efe6] py-12 border-t border-[#f5efe6]/10">
      <div className="container mx-auto px-6 md:px-12 flex flex-col md:flex-row justify-between items-center gap-6">
        
        <div className="flex flex-col items-center md:items-start">
          <h3 className="text-2xl font-serif font-bold text-[#d3a15d] mb-2">TREE HOUSE</h3>
          <p className="text-sm text-[#f5efe6]/60">© 2025 All rights reserved.</p>
        </div>

        <div className="flex gap-6">
          <Link href="#" className="hover:text-[#d3a15d] transition-colors">
            <Instagram className="w-6 h-6" />
          </Link>
          <Link href="#" className="hover:text-[#d3a15d] transition-colors">
            <Facebook className="w-6 h-6" />
          </Link>
          <Link href="#" className="hover:text-[#d3a15d] transition-colors">
            <Twitter className="w-6 h-6" />
          </Link>
        </div>

      </div>
    </footer>
  );
}
