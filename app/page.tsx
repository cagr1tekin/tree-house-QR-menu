import HeroSection from "./components/landing/HeroSection";
import AboutSection from "./components/landing/AboutSection";
import FeaturesSection from "./components/landing/FeaturesSection";
import PreviewMenu from "./components/landing/PreviewMenu";
import GallerySection from "./components/landing/GallerySection";
import ContactSection from "./components/landing/ContactSection";
import Footer from "./components/landing/Footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#f5efe6] selection:bg-[#d3a15d] selection:text-[#22330e]">
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
