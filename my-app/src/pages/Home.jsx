// src/pages/Home.jsx
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Hero from "../components/Hero";
import About from "../components/About";
import Skills from "../components/Skills";
import Projects from "../components/Projects";
import Certificates from "../components/certificate";
import Contact from "../components/Contacts";
import BlogSection from "../components/BlogSection";
import Api from "../components/Api";

import SEO from "../components/SEO";

export default function Home() {
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Person",
        "@id": "https://ashif-ek.vercel.app/#person",
        "name": "Ashif E.K",
        "jobTitle": "Full-Stack Engineer",
        "description": "Full-Stack Engineer focused on building reliable, production-grade web platforms with Django REST Framework, React, PostgreSQL, Docker, and AWS.",
        "url": "https://ashif-ek.vercel.app/",
        "image": "https://ashif-ek.vercel.app/profile.jpg",
        "sameAs": [
          "https://github.com/ashif-ek",
          "https://linkedin.com/in/ashifek",
          "https://instagram.com/ashif.io",
          "http://www.fiverr.com/s/gDLy45X",
          "https://ashif-ek.github.io/docs-stack-material/"
        ],
        "knowsAbout": ["Django REST Framework", "React", "PostgreSQL", "Docker", "AWS", "JWT Authentication", "RBAC", "CI/CD", "System Design", "Performance Optimization"],
        "alumniOf": {
            "@type": "CollegeOrUniversity",
            "name": "SAFA Arts & Science College"
        }
      },
      {
        "@type": "WebSite",
        "@id": "https://ashif-ek.vercel.app/#website",
        "url": "https://ashif-ek.vercel.app/",
        "name": "Ashif E.K Portfolio",
        "description": "Full-Stack Engineer portfolio focused on production-grade backend and frontend systems.",
        "publisher": {
          "@id": "https://ashif-ek.vercel.app/#person"
        },
        "inLanguage": "en-US"
      }
    ]
  };

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

  const { isAdmin } = useAuth();

  if (settings.maintenanceMode && !isAdmin) {
      return (
          <div className="h-screen flex flex-col items-center justify-center bg-gray-900 text-white relative">
              <h1 className="text-4xl font-bold mb-4">Under Maintenance</h1>
              <p className="text-gray-400 mb-8">We are currently upgrading the site. Please check back later.</p>
              
               <Link 
                  to="/admin/login" 
                  className="opacity-20 hover:opacity-100 transition-opacity text-sm text-gray-500 hover:text-cyan-400 absolute bottom-10"
              >
                  Admin Login
              </Link>
          </div>
      );
  }

  return (
    <>
      <SEO structuredData={structuredData} />
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
