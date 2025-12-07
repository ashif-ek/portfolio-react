import { useState, useEffect, useRef } from "react";
import { certificates as mockCertificates } from '../data/mockData';
import Api from './Api';

import cert1 from "../assets/certificates/image.png";
import cert2 from "../assets/certificates/django.png";
import cert3 from "../assets/certificates/ccsa.jpg";
import cert4 from '../assets/certificates/image.png';
import cert5 from "../assets/certificates/prosevo.jpg";
// import LoadingSpinner from "./LoadingSpinner"; // <-- REMOVED
import LazyImage from "./LazyImage";

// Map certificate IDs to their imported image assets.
const certificateImages = {
  1: cert1,
  2: cert2,
  3: cert3,
  4: cert4,
  5: cert5,
};



const Certificates = () => {
  // --- State Management ---
  const [certificates, setCertificates] = useState(mockCertificates);

  // Hybrid fetch: Update with live data on mount
  useEffect(() => {
    Api.get('/certificates')
        .then(res => setCertificates(res.data))
        .catch(err => console.error("Failed to fetch fresh certificates", err));
  }, []);
  // const [isLoading, setIsLoading] = useState(true); // <-- REMOVED
  // const [error, setError] = useState(null); // Removed error state
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [showAll, setShowAll] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const sectionRef = useRef(null);

  const categories = [
    { id: "all", name: "All" },
    { id: "Degree", name: "Degree" },
    { id: "Web", name: "Web" },
    { id: "Cybersecurity", name: "Cybersecurity" },
  ];

  // Data fetching logic removed

  // --- Filter Logic ---
  const filteredCertificates =
    selectedCategory === "all"
      ? certificates
      : certificates.filter((cert) => cert.category === selectedCategory);
  
  // Reset showAll when category changes
  useEffect(() => {
    setShowAll(false);
  }, [selectedCategory]);

  // --- Animation Observer Effect ---
  useEffect(() => {
    // if (!sectionRef.current || isLoading) return; // <-- UPDATED
    if (!sectionRef.current) return; // <-- Now just checks for ref
    
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("opacity-100", "translate-y-0");
            entry.target.classList.remove("opacity-0", "translate-y-5");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    const cards = sectionRef.current.querySelectorAll(".certificate-card");
    cards.forEach((card) => {
      // Only apply animation to cards that haven't been animated yet
      if (card.classList.contains('opacity-0')) {
        card.classList.add(
          "transition-all",
          "duration-500"
        );
        observer.observe(card);
      }
    });

    return () => {
      cards.forEach((card) => observer.unobserve(card));
    };
  // Re-run when filtered certificates change (from API or filter) OR when showAll changes
  }, [filteredCertificates, showAll]); // <-- 'isLoading' removed from dependency array

  // --- Render Logic ---
  const renderContent = () => {
    // if (isLoading) { // <-- REMOVED
    //   return <LoadingSpinner />;
    // }

    // Check based on the *full* filtered list
    // if (filteredCertificates.length === 0 && !isLoading) { // <-- UPDATED
    if (filteredCertificates.length === 0) { // <-- Simplified check
      return (
        <div className="text-center text-gray-500 text-lg py-10">
          No certificates found in this category.
        </div>
      );
    }
    
    // Decide which certificates to display
    const certificatesToShow = showAll
      ? filteredCertificates
      : filteredCertificates.slice(0, 3);

    return (
      // Fragment to hold grid and button
      <>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {certificatesToShow.map((cert) => (
            <div
              key={cert.id}
              className="certificate-card opacity-0 translate-y-5 flex flex-col bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl overflow-hidden shadow-lg border border-gray-700 transition-all duration-300 hover:translate-y-[-5px] hover:shadow-2xl"
            >
              {/* Image Section - Now clickable for modal */}
              <div
                className="relative h-44 overflow-hidden cursor-pointer"
                onClick={() => setSelectedImage(certificateImages[cert.id])}
              >
                <LazyImage
                  src={certificateImages[cert.id]}
                  alt={cert.title}
                  className="w-full h-full object-contain transition-transform duration-300 group-hover:scale-105" // <-- This fits
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900/50 to-transparent"></div>
                {/* Category Badge */}
                <span className="absolute top-3 right-3 bg-blue-900/50 text-blue-300 px-2 py-1 rounded-full text-xs font-medium backdrop-blur-sm border border-blue-700/50 capitalize">
                  {cert.category}
                </span>
              </div>

              {/* Content Section */}
              <div className="p-5 flex flex-col flex-grow">
                {/* Top Meta: Issuer & Date */}
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-semibold text-blue-400 line-clamp-1">
                    {cert.issuer}
                  </span>
                  <span className="text-xs text-gray-400 flex-shrink-0 ml-2">
                    {cert.date}
                  </span>
                </div>

                {/* Title */}
                <h3 className="font-semibold text-lg text-white mb-3 line-clamp-2">
                  {cert.title}
                </h3>

                {/* Description */}
                <p className="text-gray-300 text-sm leading-relaxed mb-4 flex-grow">
                  {cert.description}
                </p>

                {/* Link (at the bottom) */}
                <div className="mt-auto pt-4 border-t border-gray-700/50">
                  <a
                    href={cert.credentialLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center w-full px-4 py-2 bg-blue-900/30 text-blue-300 border border-blue-700/40 rounded text-sm font-medium transition-colors hover:bg-blue-800/50 hover:border-blue-600"
                  >
                    Verify Credential
                    <svg
                      className="w-4 h-4 ml-2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002 2v-4M14 4h6m0 0v6m0-6L10 14"
                      ></path>
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Show More/Less Button */}
        {filteredCertificates.length > 3 && (
          <div className="text-center mt-12">
            <button
              onClick={() => setShowAll(!showAll)}
              className="px-6 py-3 rounded border font-medium transition-all duration-300 bg-white/5 border-gray-700 text-gray-300 hover:bg-white/10 hover:border-gray-500"
            >
              {showAll ? "Show Less" : "Show More"}
            </button>
          </div>
        )}
      </>
    );
  };

  return (
    <section
      ref={sectionRef}
      className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 py-16 px-4 sm:px-8 text-white font-['Segoe_UI',system-ui,-apple-system,sans-serif]"
    >
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-semibold mb-2 bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
            Certifications & Accreditations
          </h2>
          <p className="text-gray-400 text-lg mb-8">
            Professional credentials that validate expertise
          </p>
          <div className="flex flex-wrap justify-center gap-3 mt-6">
            {categories.map((category) => (
              <button
                key={category.id}
                className={`px-4 py-2 rounded border transition-all duration-300 font-medium ${
                  selectedCategory === category.id
                    ? "bg-blue-900/20 border-blue-600 text-white"
                    : "bg-white/5 border-gray-700 text-gray-300 hover:bg-white/10 hover:border-gray-500"
                }`}
                onClick={() => setSelectedCategory(category.id)}
              >
                {category.name}
              </button>
            ))}
          </div>
        </div>



        {/* Main Content: Certificate Grid (no loading spinner) */}
        {renderContent()}
      </div>

      {/* --- Image Modal --- */}
      {selectedImage && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 transition-opacity duration-300"
          onClick={() => setSelectedImage(null)} // Click backdrop to close
        >
          {/* Close button */}
          <button
            className="absolute top-4 right-6 text-white text-5xl opacity-70 hover:opacity-100 transition-opacity z-50"
            onClick={() => setSelectedImage(null)}
          >
            &times;
          </button>
          
          {/* Image */}
          <LazyImage
            src={selectedImage}
            alt="Certificate Preview"
            className="max-w-full max-h-[90vh] object-contain rounded-lg shadow-2xl transition-transform duration-300 scale-95 animate-zoomIn"
            onClick={(e) => e.stopPropagation()} // Click image to NOT close
          />
        </div>
      )}

      {/* Add CSS for modal animation */}
      <style>{`
        @keyframes zoomIn {
          from {
            opacity: 0;
            transform: scale(0.9);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
        .animate-zoomIn {
          animation: zoomIn 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards;
        }
      `}</style>
    </section>
  );
};

export default Certificates;