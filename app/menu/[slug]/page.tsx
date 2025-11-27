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
    <main className="min-h-screen pb-20 bg-[#f5efe6] text-[#4e342e] relative selection:bg-[#d3a15d] selection:text-[#2c1810]">
      {/* Header */}
      <header className="relative w-full h-[35vh] overflow-hidden rounded-b-[3rem] z-10 shadow-2xl">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1509042239860-f550ce710b93?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center"></div>
        <div className="absolute inset-0 bg-black/40"></div>
        
        {/* Back Button */}
        <Link href="/menu" className="absolute top-6 left-6 z-20 text-[#f5efe6]/80 hover:text-[#f5efe6] transition-colors p-2 bg-white/10 backdrop-blur-md rounded-full hover:bg-white/20 border border-white/10">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
          </svg>
        </Link>

        <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-4 pt-8">
          <h1 className="text-4xl md:text-5xl font-bold text-[#f5efe6] tracking-wide drop-shadow-xl font-serif mb-2">
            {category.name}
          </h1>
          
          <div className="flex items-center gap-3 my-2 opacity-80">
            <div className="h-[1px] w-6 bg-[#d3a15d]"></div>
            <div className="w-1.5 h-1.5 rounded-full bg-[#d3a15d]"></div>
            <div className="h-[1px] w-6 bg-[#d3a15d]"></div>
          </div>

          <p className="text-[#f5efe6]/80 text-xs font-medium tracking-[0.3em] uppercase text-shadow-sm">
            Tree House Menu
          </p>
        </div>
      </header>

      {/* Products List (Client Component) */}
      <div className="relative z-10 -mt-10 px-4">
        <ProductList products={category.products} />
      </div>
    </main>
  );
}
