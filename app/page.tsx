import Header from '@/components/Header';
import Hero from '@/components/Hero';
import Skills from '@/components/Skills';
import Projects from '@/components/Projects';
import Experience from '@/components/Experience';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <main id="main-content" className="min-h-screen overflow-x-hidden bg-[#F9F9F7]">
      <Header />
      <Hero />
      <Skills />
      <Projects />
      <Experience />
      <Footer />
    </main>
  );
}
