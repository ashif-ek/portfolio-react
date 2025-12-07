// src/pages/Home.jsx
import { useEffect, useState } from "react";
import Hero from "../components/Hero";
import About from "../components/About";
import Skills from "../components/Skills";
import Projects from "../components/Projects";
import Certificates from "../components/certificate";
import Contact from "../components/Contacts";
import BlogSection from "../components/BlogSection";
import Api from "../components/Api";

export default function Home() {
  const [settings, setSettings] = useState({
    showBlog: true,
    showSkills: true,
    showProjects: true,
    showCertificates: true,
    maintenanceMode: false
  });

  useEffect(() => {
    Api.get('/settings')
      .then(res => {
         if (res.data) setSettings(res.data);
      })
      .catch(err => console.error("Failed to load settings", err));
  }, []);

  if (settings.maintenanceMode) {
      return (
          <div className="h-screen flex flex-col items-center justify-center bg-gray-900 text-white">
              <h1 className="text-4xl font-bold mb-4">Under Maintenance</h1>
              <p className="text-gray-400">We are currently upgrading the site. Please check back later.</p>
          </div>
      );
  }

  return (
    <>
      <Hero />
      <About />
      {settings.showBlog && <BlogSection/>}
      {settings.showSkills && <Skills />}
      {settings.showProjects && <Projects />}
      {settings.showCertificates && <Certificates />}
      <Contact />
    </>
  );
}
