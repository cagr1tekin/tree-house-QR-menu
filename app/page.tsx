import HeroSection from "./components/landing/HeroSection";
import AboutSection from "./components/landing/AboutSection";
import FeaturesSection from "./components/landing/FeaturesSection";
import PreviewMenu from "./components/landing/PreviewMenu";
import GallerySection from "./components/landing/GallerySection";
import ContactSection from "./components/landing/ContactSection";
import Footer from "./components/landing/Footer";

export const dynamic = "force-dynamic";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#202020] selection:bg-[#DFD0B8] selection:text-[#202020]">
      <HeroSection />
      <AboutSection />
      <FeaturesSection />
      <PreviewMenu />
      <GallerySection />
      <ContactSection />
      <Footer />
    </main>
  );
}
