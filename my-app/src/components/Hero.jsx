
import { Link } from 'react-scroll';
import { useEffect, useState, useRef } from 'react';
import { FaGithub, FaLinkedin, FaTwitter, FaInstagram } from 'react-icons/fa';
import { useGalaxyAnimation } from './galaxy_animation';
import './Hero.css';

const defaultProps = {
  name: "Ashif E.K",
  roles: ["Full-Stack Developer", "CyberSecurity Specialist", "Mobile Developer", "Problem Solver"],
  description: "Specializing in Django, JavaScript, React, Flutter, and CyberSecurity to build robust and secure digital solutions from the ground up.",
};

const Hero = ({ name = defaultProps.name, roles = defaultProps.roles, description = defaultProps.description }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [textIndex, setTextIndex] = useState(0);
  const canvasRef = useRef(null);
  
  useGalaxyAnimation(canvasRef);

  const socialIcons = [
    { name: 'Github', url: 'https://github.com/ashif-ek', Icon: FaGithub },
    { name: 'LinkedIn', url: 'https://linkedin.com/in/ashifek', Icon: FaLinkedin },
    { name: 'Twitter', url: 'https://twitter.com/your-username', Icon: FaTwitter },
    { name: 'Instagram', url: 'https://instagram.com/ashif.io', Icon: FaInstagram },
  ];

  useEffect(() => {
    const entryTimer = setTimeout(() => setIsVisible(true), 100);

    if (roles && roles.length > 0) {
      const textInterval = setInterval(() => {
        setTextIndex(prev => (prev + 1) % roles.length);
      }, 4000);
      
      return () => {
        clearTimeout(entryTimer);
        clearInterval(textInterval);
      };
    }

    return () => clearTimeout(entryTimer);
  }, [roles]);

  return (
    <section id="hero" className="min-h-screen flex items-center justify-center relative overflow-hidden bg-slate-900">
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full z-0" />
      
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-900/20 rounded-full filter blur-3xl animate-pulse-slow z-0"></div>
      <div className="absolute bottom-1/3 right-1/4 w-80 h-80 bg-blue-900/30 rounded-full filter blur-3xl animate-pulse-slower z-0"></div>

      <div className="fixed left-6 bottom-6 z-30 flex flex-col items-center space-y-5">
        {socialIcons.map(({ name, url, Icon }) => (
          <a
            key={name}
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Link to my ${name} profile`}
            className="text-gray-400 hover:text-cyan-400 transition-all duration-300 transform hover:-translate-y-1"
          >
            <Icon size={20} />
          </a>
        ))}
        <div className="h-20 w-px bg-slate-600"></div>
      </div>
      
      <div className="container mx-auto max-w-4xl relative z-10 px-6 text-center">
        <h1 className={`text-5xl md:text-7xl font-bold mb-4 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <span className="text-gray-300">Hi, I'm </span>
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-cyan-400">{name}</span>
        </h1>
        
        <h2 className={`text-2xl md:text-3xl text-gray-300 mb-8 transition-all duration-1000 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        <span className="text-cyan-400 font-medium typewriter" key={textIndex}> A
            {roles && roles.length > 0 ? roles[textIndex] : ''}
          </span>
        </h2>
        
        <p className={`text-lg text-gray-400 mb-12 max-w-2xl mx-auto leading-relaxed transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          {description}
        </p>
        
        <div className={`flex flex-col sm:flex-row justify-center gap-5 transition-all duration-1000 delay-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <Link to="projects" smooth={true} duration={800} className="px-8 py-4 bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-semibold rounded-lg hover:shadow-lg hover:shadow-cyan-500/30 transition-all duration-300 transform hover:-translate-y-1 cursor-pointer">
            View My Work
          </Link>
          <Link to="contact" smooth={true} duration={800} className="px-8 py-4 bg-slate-800/60 border border-slate-700 text-white font-semibold rounded-lg hover:bg-slate-700/80 transition-all duration-300 transform hover:-translate-y-1 cursor-pointer backdrop-blur-sm">
            Contact Me
          </Link>
        </div>
      </div>
      
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10">
        <Link to="about" smooth={true} duration={800} className="cursor-pointer">
          <div className="w-6 h-10 border-2 border-slate-500 rounded-full flex justify-center p-1">
            <div className="w-1 h-2 bg-slate-500 rounded-full animate-bounce-slow"></div>
          </div>
        </Link>
      </div>
    </section>
  );
};

export default Hero;