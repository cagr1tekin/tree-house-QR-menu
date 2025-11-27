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
    <main className="min-h-screen pb-20 bg-[#f5efe6] text-[#4e342e] relative selection:bg-[#d3a15d] selection:text-[#2c1810]">
      {/* Header / Hero Section */}
      <header className="relative w-full h-[40vh] overflow-hidden rounded-b-[3rem] z-10 shadow-2xl">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1509042239860-f550ce710b93?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center"></div>
        <div className="absolute inset-0 bg-black/40"></div>
        
        <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-4">
          <h1 className="text-5xl font-bold text-[#f5efe6] tracking-wide drop-shadow-xl font-serif mb-2">
            OUR MENU
          </h1>
          
          <p className="text-[#f5efe6]/80 text-sm font-medium tracking-[0.3em] uppercase">
            Natural & Organic Tastes
          </p>
        </div>
      </header>

      {/* Categories Grid */}
      <MenuCategoryGrid categories={categories} />
      
      {/* Footer Decoration */}
      <div className="mt-20 text-center opacity-40">
        <p className="font-serif text-[#4e342e] italic">Bon Appétit</p>
      </div>
    </main>
  );
}
