import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Features from "@/components/Features";
import DemoVideo from "@/components/DemoVideo";
import Testimonials from "@/components/Testimonials";
import Pricing from "@/components/Pricing";
import FAQ from "@/components/FAQ";
import CTABanner from "@/components/CTABanner";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";

export default function Home() {
  return (
    <main className="min-h-screen overflow-hidden">
      <Navbar />
      <Hero />
      <Features />
      <DemoVideo />
      <Testimonials />
      <Pricing />
      <FAQ />
      <CTABanner />
      <Footer />
      <WhatsAppButton />
    </main>
  );
}
