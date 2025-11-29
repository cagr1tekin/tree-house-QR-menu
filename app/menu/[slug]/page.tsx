import { createClient } from "@/lib/supabase/server";
import { CategoryWithProducts } from "@/types";
import Link from "next/link";
import { notFound } from "next/navigation";
import ProductList from "./components/ProductList";

export const dynamic = "force-dynamic";

// Slug'a göre kategori ve ürünleri çeken fonksiyon
async function getCategoryBySlug(slug: string): Promise<CategoryWithProducts | null> {
  try {
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

    if (error) {
      // PGRST116: JSON object could not be generated (usually means no rows found)
      if (error.code !== 'PGRST116') {
        console.error("Error fetching category:", error);
      }
      return null;
    }

    if (!data) {
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
  } catch (error) {
    console.error("Unexpected error fetching category:", error);
    return null;
  }
}

export default async function CategoryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const category = await getCategoryBySlug(slug);

  if (!category) {
    notFound();
  }

  return (
    <main className="min-h-screen pb-20 text-[#DFD0B8]">
      {/* Header Content (Text Only) */}
      <header className="relative w-full h-[40vh] flex flex-col items-center justify-center text-center px-4 pt-8">
        {/* Back Button */}
        <Link href="/menu" className="absolute top-6 left-6 z-20 text-[#DFD0B8]/80 hover:text-[#DFD0B8] transition-colors p-2 bg-[#333333]/50 backdrop-blur-md rounded-full hover:bg-[#333333]/80 border border-[#DFD0B8]/10">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
          </svg>
        </Link>

        <h1 className="text-3xl md:text-4xl font-bold text-[#DFD0B8] tracking-wide drop-shadow-xl font-serif mb-2 px-4">
          {category.name}
        </h1>
        
        <div className="flex items-center gap-3 my-2 opacity-80">
          <div className="h-[1px] w-6 bg-[#DFD0B8]"></div>
          <div className="w-1.5 h-1.5 rounded-full bg-[#DFD0B8]"></div>
          <div className="h-[1px] w-6 bg-[#DFD0B8]"></div>
        </div>

        <p className="text-[#DFD0B8]/80 text-xs font-medium tracking-[0.3em] uppercase text-shadow-sm" translate="no">
          Tree House Menü
        </p>
      </header>

      {/* Products List (Client Component) */}
      <div className="relative z-10 -mt-10 px-4">
        <ProductList products={category.products} />
      </div>
    </main>
  );
}
