// src/pages/Home.jsx
import Hero from "../components/Hero";
import About from "../components/About";
import Skills from "../components/Skills";
import Projects from "../components/Projects";
import Certificates from "../components/certificate";
import Contact from "../components/Contacts";
import BlogSection from "../components/BlogSection";

export default function Home() {
  return (
    <>
      <Hero />
      <About />
      <BlogSection/>
      <Skills />
      <Projects />
      <Certificates />
      <Contact />
    </>
  );
}
