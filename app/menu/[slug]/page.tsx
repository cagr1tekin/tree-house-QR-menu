import { createClient } from "@/lib/supabase/server";
import { CategoryWithProducts } from "@/types";
import Link from "next/link";
import { notFound } from "next/navigation";
import ProductList from "./components/ProductList";

// Slug'a göre kategori ve ürünleri çeken fonksiyon
async function getCategoryBySlug(slug: string): Promise<CategoryWithProducts | null> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("categories")
    .select(`
      *,
      products (
        *
      )
    `)
    .eq("slug", slug)
    .single();

  if (error || !data) {
    console.error("Error fetching category:", error);
    return null;
  }

  // Ürünleri sırala ve filtrele
  const category = {
    ...data,
    products: (data.products || [])
      .filter((p: any) => p.is_active)
      .sort((a: any, b: any) => (a.order_index || 0) - (b.order_index || 0)),
  } as CategoryWithProducts;

  return category;
}

export default async function CategoryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const category = await getCategoryBySlug(slug);

  if (!category) {
    notFound();
  }

  return (
    <main className="min-h-screen pb-20 bg-[#f5f5f0] text-[#3e2b22] relative selection:bg-[#8d6e63] selection:text-white">
      {/* Background Texture Overlay (Subtle Noise) */}
      <div className="fixed inset-0 opacity-[0.03] pointer-events-none z-0 mix-blend-multiply" 
           style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }}>
      </div>

      {/* Header */}
      <header className="relative w-full h-64 bg-primary overflow-hidden shadow-2xl rounded-b-[3rem] z-10 border-b-4 border-[#8d6e63]">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1449156493391-d2cfa28e468b?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center opacity-60 mix-blend-overlay"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-[#3e2b22]/95"></div>
        
        {/* Back Button */}
        <Link href="/menu" className="absolute top-6 left-6 z-20 text-white/80 hover:text-white transition-colors p-2 bg-white/10 backdrop-blur-md rounded-full hover:bg-white/20">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
          </svg>
        </Link>

        <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-4 pt-8">
          <h1 className="text-4xl font-bold text-white tracking-[0.1em] drop-shadow-xl font-serif mb-2">
            {category.name}
          </h1>
          
          <div className="flex items-center gap-3 my-2 opacity-80">
            <div className="h-[1px] w-6 bg-[#d7ccc8]"></div>
            <div className="w-1 h-1 rounded-full bg-[#d7ccc8]"></div>
            <div className="h-[1px] w-6 bg-[#d7ccc8]"></div>
          </div>

          <p className="text-[#d7ccc8] text-[10px] font-medium tracking-[0.3em] uppercase text-shadow-sm">
            Tree House Menu
          </p>
        </div>
      </header>

      {/* Products List (Client Component) */}
      <div className="relative z-10 mt-8">
        <ProductList products={category.products} />
      </div>
    </main>
  );
}
