import { createClient } from "@/lib/supabase/server";
import GalleryGrid from "./GalleryGrid";

export default async function GallerySection() {
  let images = null;
  
  try {
    const supabase = await createClient();
    
    // Fetch images from 'gallery' table
    const { data } = await supabase
      .from("gallery")
      .select("*")
      .order("created_at", { ascending: false });
      
    images = data;
  } catch (error) {
    console.error("Gallery fetch error:", error);
  }

  // Fallback dummy images if no data (for initial preview)
  const displayImages = images && images.length > 0 ? images : [
    { id: "1", image_url: "https://images.unsplash.com/photo-1554118811-1e0d58224f24?q=80&w=2047&auto=format&fit=crop" },
    { id: "2", image_url: "https://images.unsplash.com/photo-1476224203421-9ac39bcb3327?q=80&w=2070&auto=format&fit=crop" },
    { id: "3", image_url: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?q=80&w=1981&auto=format&fit=crop" },
    { id: "4", image_url: "https://images.unsplash.com/photo-1467003909585-2f8a7270028d?q=80&w=1974&auto=format&fit=crop" },
    { id: "5", image_url: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=2070&auto=format&fit=crop" },
    { id: "6", image_url: "https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?q=80&w=1974&auto=format&fit=crop" },
  ];

  return (
    <section id="gallery" className="py-24 bg-[#181818] text-[#DFD0B8]">
      <div className="container mx-auto px-6 md:px-12">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-serif font-bold text-[#DFD0B8] mb-4">Tree House'da Anlar</h2>
          <p className="text-[#DFD0B8]/70 max-w-2xl mx-auto">
            Mutfak yolculuğumuzun ve atmosferimizin özünü yakalıyoruz.
          </p>
        </div>

        <GalleryGrid images={displayImages} />
      </div>
    </section>
  );
}
