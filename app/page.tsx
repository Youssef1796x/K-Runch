import Navbar from "@/src/components/Navbar";
import Hero from "@/src/components/Hero";
import Menu from "@/src/components/Menu";
import About from "@/src/components/About";
import Reviews from "@/src/components/Reviews";
import Location from "@/src/components/Location";
import Footer from "@/src/components/Footer";

export default function Home() {
  return (
    <div className="page-shell">
      <Navbar />
      <main>
        <Hero />
        <Menu />
        <About />
        <Reviews />
        <Location />
      </main>
      <Footer />
    </div>
  );
}
