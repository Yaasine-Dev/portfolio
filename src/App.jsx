import { ThemeProvider } from './ThemeContext';
import SmoothScroll from './components/SmoothScroll';
import ThreeBackground from './components/ThreeBackground';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Skills from './components/Skills';
import Experience from './components/Experience';
import Projects from './components/Projects';
import Certificates from './components/Certificates';
import Contact from './components/Contact';
import Footer from './components/Footer';

export default function App() {
  return (
    <ThemeProvider>
      <SmoothScroll>
        <ThreeBackground />
        <Navbar />
        <main style={{ position: 'relative', zIndex: 1 }}>
          <Hero />
          <Skills />
          <Experience />
          <Projects />
          <Certificates />
          <Contact />
        </main>
        <Footer />
      </SmoothScroll>
    </ThemeProvider>
  );
}
