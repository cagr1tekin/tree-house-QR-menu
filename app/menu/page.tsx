import { createClient } from "@/lib/supabase/server";
import { Category } from "@/types";
import MenuCategoryGrid from "./components/MenuCategoryGrid";

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
      <header className="relative w-full h-[40vh] flex flex-col items-center justify-center text-center px-4">
        <h1 className="text-5xl font-bold text-[#DFD0B8] tracking-wide drop-shadow-xl font-serif mb-2">
          OUR MENU
        </h1>
        
        <p className="text-[#DFD0B8]/80 text-sm font-medium tracking-[0.3em] uppercase">
          Natural & Organic Tastes
        </p>
      </header>

      {/* Categories Grid */}
      <MenuCategoryGrid categories={categories} />
      
      {/* Footer Decoration */}
      <div className="mt-20 text-center opacity-40">
        <p className="font-serif text-[#DFD0B8] italic">Bon Appétit</p>
      </div>
    </main>
  );
}
