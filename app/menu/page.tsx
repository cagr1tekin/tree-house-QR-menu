import { createClient } from "@/lib/supabase/server";
import { Category } from "@/types";
import MenuCategoryGrid from "./components/MenuCategoryGrid";
import Image from "next/image";

// Sadece kategorileri çeken fonksiyon
async function getCategories(): Promise<Category[]> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("categories")
    .select("*")
    .order("order_index", { ascending: true });

  if (error) {
    console.error("Error fetching categories:", error);
    return [];
  }

  return data as Category[];
}

export default async function MenuPage() {
  const categories = await getCategories();

  return (
    <main className="min-h-screen pb-20 text-[#DFD0B8]">
      {/* Header Content (Text Only) */}
      <header className="relative w-full h-[45vh] flex flex-col items-center justify-center text-center px-4 pb-10">
        <div className="relative w-28 h-28 mb-6 flex items-center justify-center rounded-full bg-[#DFD0B8] shadow-2xl p-5">
          <div className="relative w-full h-full">
            <Image 
              src="/logo.png" 
              alt="Tree House Logo" 
              fill
              className="object-contain opacity-90"
              priority
            />
          </div>
        </div>
        <h1 className="text-5xl font-bold text-[#DFD0B8] tracking-wide drop-shadow-xl font-serif mb-3">
          MENÜMÜZ
        </h1>
        
        <p className="text-[#DFD0B8]/80 text-sm font-medium tracking-[0.3em] uppercase relative z-10">
          Doğal & Organik Lezzetler
        </p>
      </header>

      {/* Categories Grid */}
      <MenuCategoryGrid categories={categories} />
      
      {/* Footer Decoration */}
      <div className="mt-20 text-center opacity-40">
        <p className="font-serif text-[#DFD0B8] italic">Afiyet Olsun</p>
      </div>
    </main>
  );
}
