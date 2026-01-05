import { useState, useEffect } from 'react';
import { Link } from 'react-scroll';
import { motion } from 'framer-motion';
import { FaGithub, FaLinkedin, FaInstagram, FaBook } from 'react-icons/fa';
import { SiFiverr } from 'react-icons/si';
import { profile as profileData } from '../data/mockData';
import Api from './Api';

const iconMap = {
  Github: FaGithub,
  LinkedIn: FaLinkedin,
  Instagram: FaInstagram,
  Fiverr: SiFiverr,
  "Docs Material": FaBook,
};

const SocialLinks = ({ links = [] }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 1.5, duration: 0.5 }}
      className="fixed left-5 bottom-0 z-30 hidden md:block"
    >
      <div className="flex flex-col items-center">
        {links.map(({ name, url }) => {
          const Icon = iconMap[name];
          return (
            <a key={name} href={url} target="_blank" rel="noopener noreferrer" aria-label={name}
               className="p-2 text-gray-500 hover:text-gray-200 transition-colors duration-300 transform hover:-translate-y-1">
              {Icon && <Icon size={20} />}
            </a>
          );
        })}
        <div className="h-24 w-px bg-gray-800 mt-2"></div>
      </div>
    </motion.div>
  );
};

const EmailLink = ({ email }) => (
  <motion.div 
    initial={{ opacity: 0, x: 20 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ delay: 1.5, duration: 0.5 }}
    className="fixed right-5 bottom-0 z-30 hidden md:block"
  >
    <div className="flex flex-col items-center">
      <a href={`mailto:${email}`}
         className="p-2 text-gray-500 hover:text-gray-200 transition-colors duration-300 [writing-mode:vertical-rl] tracking-widest text-sm transform hover:-translate-y-1">
        {email}
      </a>
      <div className="h-24 w-px bg-gray-800 mt-2"></div>
    </div>
  </motion.div>
);

const Hero = () => {
  const [profile, setProfile] = useState(profileData);

  useEffect(() => {
    Api.get('/profile')
      .then(res => setProfile(res.data))
      .catch(err => console.error("Failed to fetch fresh profile data:", err));
  }, []);

  const { name, title, description, email, socialLinks } = profile;

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#0a0a0a] text-gray-300 font-sans">
      
      <SocialLinks links={socialLinks} />
      <EmailLink email={email} />

      <div className="relative z-20 container mx-auto max-w-4xl px-6 text-center flex flex-col items-center">
        
        <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="mb-8"
        >
            {profile.avatar && (
                <div className="w-32 h-32 md:w-40 md:h-40 rounded-full border-4 border-gray-800 overflow-hidden shadow-2xl mx-auto">
                     <img 
                        src={`http://localhost:5000/uploads/${profile.avatar}`} 
                        alt={name} 
                        className="w-full h-full object-cover"
                     />
                </div>
            )}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
        >
          <span className="block text-accent text-sm md:text-base mb-4 tracking-widest font-mono">
            Hello, my name is
          </span>
          <h1 className="text-5xl md:text-7xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-400 pb-2">
            {name}
          </h1>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.4 }}
        >
          <h2 className="text-2xl md:text-4xl text-gray-400 mt-4 tracking-wide font-light">
            {title}
          </h2>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.6 }}
        >
          <p className="max-w-2xl mt-8 text-base md:text-lg text-gray-500 leading-relaxed">
            {description}
          </p>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.8 }}
          className="mt-12"
        >
          <Link 
            to="contact" 
            smooth={true} 
            duration={800} 
            className="group relative inline-flex px-8 py-3 overflow-hidden rounded-full cursor-pointer bg-transparent border border-gray-600 text-gray-300 hover:text-white transition-all duration-300"
          >
            <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-purple-500/20 to-blue-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <span className="relative font-medium tracking-wide">Get in Touch</span>
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;