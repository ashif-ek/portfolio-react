import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Contact from './components/Contacts';
import Footer from './components/Footer';
import Certificates from './components/certificate'


function App() {
  return (
    <div className="bg-white text-gray-800 min-h-screen">
      <Header />
      <main>
        <Hero />
        <About />
        <Skills />
        <Projects />
        < Certificates/>
        <Contact />

      </main>
      <Footer />
    </div>
  );
}

export default App;