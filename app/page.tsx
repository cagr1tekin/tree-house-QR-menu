import HeroSection from "./components/landing/HeroSection";
import AboutSection from "./components/landing/AboutSection";
import FeaturesSection from "./components/landing/FeaturesSection";
import PreviewMenu from "./components/landing/PreviewMenu";
import GallerySection from "./components/landing/GallerySection";
import ContactSection from "./components/landing/ContactSection";
import Footer from "./components/landing/Footer";
import { createClient } from "@/lib/supabase/server";
import { Product } from "@/types";

export const dynamic = "force-dynamic";

const FEATURED_PRODUCT_NAMES = [
  "Avokado Tost",
  "Orman Meyveli Kase",
  "Trüflü Mantarlı Makarna"
];

async function getFeaturedProducts(): Promise<Product[]> {
  try {
    const supabase = await createClient();
    
    // 1. Try to fetch specific products by name
    const { data: specificProducts } = await supabase
      .from('products')
      .select('*')
      .in('name', FEATURED_PRODUCT_NAMES)
      .eq('is_active', true);

    if (specificProducts && specificProducts.length > 0) {
      // If we found all or some, return them. 
      // If you want to strictly fill 3 spots, you might want to fetch more if length < 3.
      // For now, let's just return what we found, or fill up if needed.
      if (specificProducts.length === 3) return specificProducts;
      
      // If less than 3, fetch more to fill
      const needed = 3 - specificProducts.length;
      const existingIds = specificProducts.map(p => p.id);
      
      const { data: moreProducts } = await supabase
        .from('products')
        .select('*')
        .eq('is_active', true)
        .not('id', 'in', `(${existingIds.join(',')})`)
        .limit(needed);
        
      return [...specificProducts, ...(moreProducts || [])];
    }

    // 2. Fallback: Fetch any 3 active products
    const { data: randomProducts } = await supabase
      .from('products')
      .select('*')
      .eq('is_active', true)
      .order('order_index', { ascending: true })
      .limit(3);

    return randomProducts || [];
  } catch (error) {
    console.error("Error fetching featured products:", error);
    return [];
  }
}

export default async function Home() {
  const featuredProducts = await getFeaturedProducts();

  return (
    <main className="min-h-screen bg-[#202020] selection:bg-[#DFD0B8] selection:text-[#202020]">
      <HeroSection />
      <AboutSection />
      <FeaturesSection />
      <PreviewMenu products={featuredProducts} />
      <GallerySection />
      <ContactSection />
      <Footer />
    </main>
  );
}
