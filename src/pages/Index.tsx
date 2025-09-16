import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Features from "@/components/Features";
import FeaturedJobs from "@/components/FeaturedJobs";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background font-inter">
      <Header />
      <main>
        <Hero />
        <Features />
        <FeaturedJobs />
      </main>
      <Footer />
    </div>
  );
};

export default Index;