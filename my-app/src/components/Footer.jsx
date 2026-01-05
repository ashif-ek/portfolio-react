import { useState, useEffect } from 'react';

const Footer = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    setIsVisible(true);

    return () => clearInterval(timer);
  }, []);

  const socialLinks = [
    { name: 'LinkedIn', icon: 'fab fa-linkedin', url: 'https://www.linkedin.com/in/ashifek/', color: 'hover:text-blue-500' },
    { name: 'whatsapp', icon: 'fab fa-whatsapp', url: 'https://9037499763/', color: 'hover:text-blue-400' },
    { name: 'GitHub', icon: 'fab fa-github', url: 'https://github.com/Ashif-ek', color: 'hover:text-gray-300' },
    { name: 'Instagram', icon: 'fab fa-instagram', url: 'https://www.instagram.com/ashif.io', color: 'hover:text-pink-500' },
    { name: 'Fiverr', icon: 'fas fa-briefcase', url: 'http://www.fiverr.com/s/gDLy45X', color: 'hover:text-green-500' },
    { name: 'Docs Material', icon: 'fas fa-book', url: 'https://ashif-ek.github.io/docs-stack-material/', color: 'hover:text-yellow-500' },
  ];

  const quickLinks = [
    { name: 'About', url: '#about' },
    { name: 'Projects', url: '#projects' },
    { name: 'Skills', url: '#skills' },
    { name: 'Contact', url: '#contact' },
  ];

  return (
    <footer className="relative bg-gradient-to-b from-gray-900 to-black border-t border-gray-800 overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-blue-600 rounded-full filter blur-3xl opacity-10 animate-pulse-slow"></div>
        <div className="absolute -bottom-40 -right-20 w-80 h-80 bg-purple-600 rounded-full filter blur-3xl opacity-10 animate-pulse-slower"></div>
      </div>
      
      {/* Grid pattern overlay */}
      <div className="absolute inset-0 opacity-10 bg-grid-pattern bg-center"></div>
      
      <div className="container mx-auto px-6 py-12 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Brand section */}
          <div className={`transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <h3 className="text-xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-cyan-400">
              ashif e.k
            </h3>
            <p className="text-gray-400 mb-4 leading-relaxed">
              Creating innovative digital experiences with modern technologies and cutting-edge design.
            </p>
            <div className="flex items-center text-gray-500 text-sm">
              <div className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></div>
              <span>Available for new projects</span>
            </div>
          </div>

          {/* Quick Links */}
          <div className={`transition-all duration-700 delay-100 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <h4 className="text-lg font-semibold text-white mb-4">Navigate</h4>
            <ul className="space-y-3">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <a 
                    href={link.url} 
                    className="text-gray-400 hover:text-cyan-400 transition-colors duration-300 flex items-center group"
                  >
                    <span className="w-1 h-1 bg-cyan-500 rounded-full mr-3 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div className={`transition-all duration-700 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <h4 className="text-lg font-semibold text-white mb-4">Get in Touch</h4>
            <ul className="space-y-3">
              <li className="flex items-center text-gray-400">
                <svg className="w-4 h-4 mr-3 text-cyan-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <span>ashifek11@example.com</span>
              </li>
              <li className="flex items-center text-gray-400">
                <svg className="w-4 h-4 mr-3 text-cyan-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span>Based on world wide</span>
              </li>
            </ul>
          </div>

          {/* Social & Newsletter */}
          <div className={`transition-all duration-700 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <h4 className="text-lg font-semibold text-white mb-4">Connect</h4>
            <div className="flex space-x-4 mb-6">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.url}
                  className={`w-10 h-10 rounded-lg bg-gray-800 flex items-center justify-center text-gray-400 border border-gray-700 transition-all duration-300 ${social.color} hover:border-cyan-500/30 hover:bg-gray-700/50 hover:scale-110`}
                  aria-label={social.name}
                >
                  <i className={social.icon}></i>
                </a>
              ))}
            </div>
            
            <div className="mt-4">
              <p className="text-gray-400 text-sm mb-2">Local Time</p>
              <div className="text-cyan-400 font-mono bg-gray-800/50 py-2 px-4 rounded-lg border border-gray-700">
                {currentTime.toLocaleTimeString()}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom section */}
        <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-500 mb-4 md:mb-0">
            © {new Date().getFullYear()} ashif e.k. All rights reserved.
          </p>
          
          <div className="flex items-center space-x-6 text-gray-500 text-sm">
            <span className="flex items-center">
              <svg className="w-4 h-4 mr-1 text-cyan-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              Made with React & JSON, Tailwind
            </span>
            <span>•</span>
            <span className="flex items-center">
              <svg className="w-4 h-4 mr-1 text-cyan-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
              </svg>
              Fully Dynamic
            </span>
          </div>
        </div>
      </div>

      {/* The "Back to top button" has been removed from this file. */}
      {/* It should be in its own component, <ScrollToTop />, and added to App.jsx or UserLayout.jsx */}

      <style >{`
        @keyframes pulse-slow {
          0%, 100% { opacity: 0.1; }
          50% { opacity: 0.15; }
        }
        @keyframes pulse-slower {
          0%, 100% { opacity: 0.05; }
          50% { opacity: 0.1; }
        }
        .animate-pulse-slow {
          animation: pulse-slow 6s ease-in-out infinite;
        }
        .animate-pulse-slower {
          animation: pulse-slower 8s ease-in-out infinite;
        }
        .bg-grid-pattern {
          background-image: linear-gradient(rgba(255, 255, 255, 0.05) 1px, transparent 1px),
                            linear-gradient(90deg, rgba(255, 255, 255, 0.05) 1px, transparent 1px);
          background-size: 40px 40px;
        }
      `}</style>
    </footer>
  );
};

export default Footer;