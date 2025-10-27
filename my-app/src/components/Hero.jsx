import { Link } from 'react-scroll';
import { useEffect, useState } from 'react';
import { FaGithub, FaLinkedin, FaTwitter, FaInstagram } from 'react-icons/fa';
import Api from './Api';

// Map icon names from JSON to the imported icon components
const iconMap = {
  Github: FaGithub,
  LinkedIn: FaLinkedin,
  Twitter: FaTwitter,
  Instagram: FaInstagram,
};

// 7. Update SocialLinks to accept `links` as a prop
const SocialLinks = ({ links = [] }) => {
  return (
    <div className="fixed left-5 bottom-0 z-30 hidden md:block">
      <div className="flex flex-col items-center">
        {links.map(({ name, url }) => {
          const Icon = iconMap[name];
          return (
            <a key={name} href={url} target="_blank" rel="noopener noreferrer" aria-label={name}
               className="p-2 text-gray-500 hover:text-gray-200 transition-colors duration-300">
              {Icon && <Icon size={20} />}
            </a>
          );
        })}
        <div className="h-24 w-px bg-gray-800 mt-2"></div>
      </div>
    </div>
  );
};

// 7. Update EmailLink to accept `email` as a prop
const EmailLink = ({ email }) => (
  <div className="fixed right-5 bottom-0 z-30 hidden md:block">
    <div className="flex flex-col items-center">
      <a href={`mailto:${email}`}
         className="p-2 text-gray-500 hover:text-gray-200 transition-colors duration-300 [writing-mode:vertical-rl] tracking-widest text-sm">
        {email}
      </a>
      <div className="h-24 w-px bg-gray-800 mt-2"></div>
    </div>
  </div>
);

const Hero = () => {
  // 3. Add state to hold profile data, with initial values
  const [profile, setProfile] = useState({
    name: "Ashif E.K",
    title: "Digital Architect & Software Engineer",
    description: "I specialize in React, Django, Redux, javascript, html css tailwind to building secure, scalable, and high-performance applications that solve complex problems and deliver exceptional user experiences..",
    email: "ashifek11@gmail.com",
    socialLinks: [
      { "name": "Github", "url": "https://github.com/ashif-ek" },
      { "name": "LinkedIn", "url": "https://linkedin.com/in/ashifek" },
      { "name": "Twitter", "url": "https://twitter.com/your-username" },
      { "name": "Instagram", "url": "https://instagram.com/ashif.io" },
    ],
  });
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    Api.get("/profile")
      .then(res => {
        setProfile(res.data);
      })
      .catch(err => console.error("Error fetching profile data:", err));

    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#0a0a0a] text-gray-300 font-sans">
      
      {/* 5. Pass fetched data as props */}
      <SocialLinks links={profile.socialLinks} />
      <EmailLink email={profile.email} />

      <div className="relative z-20 container mx-auto max-w-4xl px-6 text-center flex flex-col items-center">
        
        {/* 6. Use fetched data from the state */}
        <div className={`transition-all duration-1000 delay-100 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
          <h1 className="text-4xl md:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-400 pb-2">
            {profile.name}
          </h1>
        </div>
        
        <div className={`transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
          <h2 className="text-lg md:text-xl text-gray-400 mt-4 tracking-wide">
            {profile.title}
          </h2>
        </div>
        
        <div className={`transition-all duration-1000 delay-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
          <p className="max-w-2xl mt-6 text-base md:text-lg text-gray-500 leading-relaxed">
            {profile.description}
          </p>
        </div>
        
        <div className={`mt-10 transition-opacity duration-1000 delay-700 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
          <Link 
            to="contact" 
            smooth={true} 
            duration={800} 
            className="inline-block px-6 py-3 bg-white/5 text-gray-200 border border-white/20 rounded-full hover:bg-white/10 backdrop-blur-sm transition-colors duration-300 cursor-pointer"
          >
            Get in Touch
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Hero;