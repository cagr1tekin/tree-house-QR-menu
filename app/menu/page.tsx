import { createClient } from "@/lib/supabase/server";
import { Category } from "@/types";
import Link from "next/link";

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
    <main className="min-h-screen pb-20 bg-[#f5f5f0] text-[#3e2b22] relative selection:bg-[#8d6e63] selection:text-white">
      {/* Background Texture Overlay (Subtle Noise) */}
      <div className="fixed inset-0 opacity-[0.03] pointer-events-none z-0 mix-blend-multiply" 
           style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }}>
      </div>

      {/* Header / Hero Section */}
      <header className="relative w-full h-80 bg-primary overflow-hidden shadow-2xl rounded-b-[3rem] z-10 border-b-4 border-[#8d6e63]">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1449156493391-d2cfa28e468b?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center opacity-60 mix-blend-overlay"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-[#3e2b22]/95"></div>
        
        <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-4 pt-4">
          {/* Logo Circle */}
          <div className="w-20 h-20 mb-6 rounded-full border border-white/20 bg-white/10 backdrop-blur-md flex items-center justify-center shadow-lg ring-1 ring-white/10">
             <span className="text-4xl filter drop-shadow-lg">🌲</span>
          </div>
          
          <h1 className="text-5xl font-bold text-white tracking-[0.15em] drop-shadow-xl font-serif">
            TREE HOUSE
          </h1>
          
          <div className="flex items-center gap-3 my-4 opacity-80">
            <div className="h-[1px] w-8 bg-[#d7ccc8]"></div>
            <div className="w-1.5 h-1.5 rounded-full bg-[#d7ccc8]"></div>
            <div className="h-[1px] w-8 bg-[#d7ccc8]"></div>
          </div>

          <p className="text-[#d7ccc8] text-xs font-medium tracking-[0.4em] uppercase text-shadow-sm">
            Natural & Organic Tastes
          </p>
        </div>
      </header>

      {/* Categories Grid */}
      <div className="max-w-md mx-auto px-6 mt-12 relative z-10">
        <div className="flex items-center justify-center gap-4 mb-8">
            <h2 className="text-center text-lg font-serif font-bold text-[#5d4037] tracking-[0.2em] uppercase border-b border-[#5d4037]/20 pb-2">
            Explore Our Menu
            </h2>
        </div>
        
        <div className="grid grid-cols-1 gap-5">
          {categories.length === 0 ? (
            <div className="text-center py-10 text-primary-light">
              <p>Menü kategorileri yükleniyor...</p>
            </div>
          ) : (
            categories.map((category) => (
              <Link
                key={category.id}
                href={`/menu/${category.slug}`}
                className="group relative h-28 w-full overflow-hidden rounded-xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-1 border border-[#8d6e63]/20"
              >
                {/* Background Gradient mimicking wood depth */}
                <div className="absolute inset-0 bg-gradient-to-r from-[#3e2b22] via-[#4e342e] to-[#5d4037] group-hover:from-[#2d1f19] group-hover:to-[#4a332a] transition-colors duration-500"></div>
                
                {/* Subtle Texture Overlay on Card */}
                <div className="absolute inset-0 opacity-10 mix-blend-overlay bg-[url('https://www.transparenttextures.com/patterns/wood-pattern.png')]"></div>

                {/* Content */}
                <div className="relative h-full flex items-center justify-between px-8">
                  <div className="flex flex-col z-10">
                    <span className="text-2xl font-bold text-[#f5f5f0] font-serif tracking-wider group-hover:text-white transition-colors drop-shadow-md">
                        {category.name}
                    </span>
                    <span className="text-[10px] text-[#a1887f] uppercase tracking-[0.3em] mt-2 group-hover:text-[#d7ccc8] transition-colors font-sans">
                        View Selection
                    </span>
                  </div>
                  
                  {/* Custom Arrow Button */}
                  <div className="w-12 h-12 rounded-full border border-white/10 bg-white/5 flex items-center justify-center backdrop-blur-sm group-hover:bg-[#f5f5f0] group-hover:text-[#3e2b22] transition-all duration-500 shadow-inner group-hover:shadow-lg group-hover:scale-110">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                    </svg>
                  </div>
                </div>
                
                {/* Decorative Shine Effect */}
                <div className="absolute -inset-full top-0 block h-full w-1/2 -skew-x-12 bg-gradient-to-r from-transparent to-white opacity-10 group-hover:animate-shine" />
              </Link>
            ))
          )}
        </div>
      </div>

      {/* Footer */}
      <footer className="mt-20 py-8 text-center text-[#8d6e63]/60 text-[10px] tracking-widest uppercase relative z-10">
        <div className="w-8 h-[1px] bg-[#8d6e63]/30 mx-auto mb-4"></div>
        <p>© 2025 Tree-House Hotel & Restaurant</p>
      </footer>
    </main>
  );
}
