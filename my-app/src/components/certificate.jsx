import { useState, useEffect, useRef } from "react";

// Step 1: Import your certificate images locally
import cert1 from '../assets/certificates/bca.jpg';
import cert2 from '../assets/certificates/django.png';
import cert3 from '../assets/certificates/ccsa.jpg';
import cert4 from '../assets/certificates/prosevo.jpg';
import cert5 from '../assets/certificates/prosevo.jpg';
import Api from "./Api";


// Step 2: Create a map to link an ID to the imported image
const certificateImages = {
  1: cert1,
  2: cert2,
  3: cert3,
  4: cert4,
  5: cert5,

};

const Certificates = () => {
  const [certificates, setCertificates] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [activeCard, setActiveCard] = useState(null);
  const sectionRef = useRef(null);

  const categories = [
    { id: "all", name: "All" },
    { id: "Degree", name: "Degree" },
    { id: "Web", name: "Web" },
    { id: "Cybersecurity", name: "Cybersecurity" }
  ];

  useEffect(() => {
    Api.get("/certificates").then((res) => {
      setCertificates(res.data);
    });
  }, []);

  const filteredCertificates =
    selectedCategory === "all"
      ? certificates
      : certificates.filter((cert) => cert.category === selectedCategory);

  useEffect(() => {
    if (!sectionRef.current) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("opacity-100", "translate-y-0");
            entry.target.classList.remove("opacity-0", "translate-y-5");
          }
        });
      },
      { threshold: 0.1 }
    );

    const cards = sectionRef.current.querySelectorAll(".certificate-card");
    cards.forEach((card) => {
      card.classList.add("opacity-0", "translate-y-5", "transition-all", "duration-500");
      observer.observe(card);
    });

    return () => {
      cards.forEach((card) => observer.unobserve(card));
    };
  }, [filteredCertificates]);

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
            {categories.map(category => (
              <button
                key={category.id}
                className={`px-4 py-2 rounded border transition-all duration-300 font-medium ${
                  selectedCategory === category.id
                    ? 'bg-blue-900/20 border-blue-600 text-white'
                    : 'bg-white/5 border-gray-700 text-gray-300 hover:bg-white/10 hover:border-gray-500'
                }`}
                onClick={() => setSelectedCategory(category.id)}
              >
                {category.name}
              </button>
            ))}
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCertificates.map((cert) => (
            <div
              key={cert.id}
              className={`certificate-card bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl overflow-hidden shadow-lg border border-gray-700 transition-all duration-400 cursor-pointer h-72 perspective-1000 ${
                activeCard === cert.id ? 'expanded h-80' : ''
              }`}
              onClick={() => setActiveCard(activeCard === cert.id ? null : cert.id)}
              style={{ transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)' }}
            >
              <div className="card-content relative w-full h-full transition-transform duration-600 transform-style-preserve-3d">
                <div className="card-front absolute w-full h-full backface-hidden">
                  <div className="relative h-40 overflow-hidden">
                    <img
                      // Step 3: Use the map to set the correct image source
                      src={certificateImages[cert.id]}
                      alt={cert.title}
                      className="w-full h-full object-cover transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/80"></div>
                    <span className="absolute top-3 right-3 bg-blue-700 text-white px-2 py-1 rounded text-xs font-semibold">
                      {cert.issuer}
                    </span>
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold text-lg mb-2 line-clamp-2">{cert.title}</h3>
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-gray-400">
                        {new Date(cert.date).toLocaleDateString('en-US', { year: 'numeric', month: 'short' })}
                      </span>
                      <span className="bg-blue-900/30 text-blue-300 px-2 py-1 rounded-full font-medium capitalize">
                        {cert.category}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="card-back absolute w-full h-full backface-hidden transform rotate-y-180 p-5 flex flex-col justify-between">
                  <div>
                    <h3 className="font-semibold text-lg mb-3">{cert.title}</h3>
                    <p className="text-gray-300 text-sm leading-relaxed">
                      {cert.description}
                    </p>
                  </div>
                  <div className="flex justify-end">
                    <a
                      href={cert.credentialLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-4 py-2 bg-blue-900/30 text-blue-300 border border-blue-700/40 rounded text-sm font-medium transition-colors hover:bg-blue-900/40 hover:border-blue-600"
                      onClick={(e) => e.stopPropagation()}
                    >
                      Verify Credential
                    </a>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <style jsx>{`
        .perspective-1000 { perspective: 1000px; }
        .transform-style-preserve-3d { transform-style: preserve-3d; }
        .backface-hidden { backface-visibility: hidden; -webkit-backface-visibility: hidden; }
        .rotate-y-180 { transform: rotateY(180deg); }
        .expanded .card-content { transform: rotateY(180deg); }
        .certificate-card:hover .card-front img { transform: scale(1.05); }
        .certificate-card:hover { transform: translateY(-8px); box-shadow: 0 12px 24px rgba(0, 0, 0, 0.4), 0 0 0 1px rgba(255, 255, 255, 0.05); }
        .certificate-card:nth-child(1) { transition-delay: 0.1s; }
        .certificate-card:nth-child(2) { transition-delay: 0.2s; }
        .certificate-card:nth-child(3) { transition-delay: 0.3s; }
        .certificate-card:nth-child(4) { transition-delay: 0.4s; }
        .certificate-card:nth-child(5) { transition-delay: 0.5s; }
        .certificate-card:nth-child(6) { transition-delay: 0.6s; }
      `}</style>
    </section>
  );
};

export default Certificates;