
import { useState, useEffect } from 'react';
import { Link as ScrollLink } from 'react-scroll'; // For scrolling within the page
import { Link as RouterLink } from 'react-router-dom'; 

// NOTE: Since we don't know your icon library, I'll use a simple SVG from heroicons for the Admin button.
const UserIcon = (props) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
    </svg>
);


const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = ['About', 'Skills', 'Projects', 'Contact'];

  // Toggle body scroll when mobile menu is open
  useEffect(() => {
      document.body.style.overflow = isOpen ? 'hidden' : 'unset';
      return () => {
          document.body.style.overflow = 'unset';
      };
  }, [isOpen]);

  return (
    <header className={`fixed w-full z-50 transition-all duration-500 ${isScrolled ? 'bg-gray-900/95 backdrop-blur-md shadow-xl' : 'bg-transparent'}`}>
      <div className="container mx-auto px-6 py-3">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <ScrollLink 
            to="hero" 
            smooth={true} 
            duration={700} 
            className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-cyan-400 cursor-pointer transition-all hover:scale-105"
            aria-label="Ashif E.K Home"
          >
            ashif
          </ScrollLink>

          {/* Desktop Navigation (Centered) - UNCHANGED */}
          <nav className="hidden md:flex space-x-6">
            {navLinks.map((item) => (
              <ScrollLink
                key={item}
                to={item.toLowerCase()}
                smooth={true}
                duration={700}
                spy={true}
                offset={-70}
                className="relative group cursor-pointer py-2 px-1 text-gray-300 hover:text-white transition-colors"
                activeClass="text-cyan-400"
              >
                {item}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-400 to-cyan-400 transition-all group-hover:w-full"></span>
              </ScrollLink>
            ))}
          </nav>

          {/* Desktop Action Buttons (Right) - UNCHANGED */}
          <div className="hidden md:flex items-center space-x-4">
            <button 
              className="flex items-center px-4 py-2 rounded-lg bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-medium shadow-lg hover:shadow-cyan-500/20 hover:scale-105 transition-all"
              aria-label="Contact Ashif" 
            >
              Get in Touch
            </button>
            <RouterLink
              to="/admin"
              aria-label="Admin Login" 
              title="Admin Login"
              className="p-2 rounded-full text-gray-400 hover:text-cyan-400 hover:bg-gray-800 transition-all"
            >
                <UserIcon className="h-6 w-6" />
            </RouterLink>
          </div>

          {/* Mobile Menu Button - UNCHANGED */}
          <button 
            className="md:hidden focus:outline-none p-2 rounded-lg bg-gray-800 hover:bg-gray-700 transition-colors"
            onClick={() => setIsOpen(!isOpen)}
            aria-label={isOpen ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={isOpen}
          >
            <div className="w-6 h-6 relative">
              <span className={`absolute block h-0.5 w-6 bg-white transition-all duration-300 ${isOpen ? 'rotate-45 top-3' : 'top-1'}`}></span>
              <span className={`absolute block h-0.5 w-6 bg-white transition-all duration-300 ${isOpen ? 'opacity-0 top-3' : 'top-2.5'}`}></span>
              <span className={`absolute block h-0.5 w-6 bg-white transition-all duration-300 ${isOpen ? '-rotate-45 top-3' : 'top-4'}`}></span>
            </div>
          </button>
        </div>

        {/* Mobile Menu: Enhanced Glassmorphism & Admin Button Split */}
        <div 
            className={`md:hidden overflow-hidden transition-all duration-500 ease-in-out 
              ${isOpen ? 'max-h-screen opacity-100 mt-4' : 'max-h-0 opacity-0'}
              ${isOpen ? 'bg-gray-900/40 backdrop-blur-lg border border-gray-700/50 rounded-lg shadow-2xl' : ''}  
            `}
        >
          <div className="py-4 px-2 space-y-2">
            {navLinks.map((item) => (
              <ScrollLink
                key={item}
                to={item.toLowerCase()}
                smooth={true}
                duration={700}
                className="block py-3 px-4 rounded-lg text-gray-200 hover:bg-white/10 transition-colors cursor-pointer font-medium"
                onClick={() => setIsOpen(false)}
                activeClass="bg-white/10 text-cyan-400"
              >
                {item}
              </ScrollLink>
            ))}
            
            {/* Action Buttons Section */}
            <div className="pt-4 space-y-3 border-t border-gray-700/50">
                {/* Primary Contact Button (Get in Touch) */}
                <button 
                    className="w-full py-3 px-4 rounded-lg bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-semibold shadow-lg hover:shadow-cyan-500/30 transition-all"
                >
                    Get in Touch
                </button>
                
                {/* Secondary Admin Button (Model/Different Button) */}
                <RouterLink
                    to="/admin"
                    className="flex items-center justify-center space-x-2 w-full py-3 px-4 rounded-lg text-cyan-400 border border-cyan-400 hover:bg-cyan-400/10 transition-colors font-medium"
                    onClick={() => setIsOpen(false)}
                >
                    <UserIcon />
                    <span>Admin Login</span>
                </RouterLink>

            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;