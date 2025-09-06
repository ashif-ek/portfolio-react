// import { Link } from 'react-scroll';
// import { useEffect, useState, useRef } from 'react';
// import { FaGithub, FaLinkedin, FaTwitter, FaInstagram } from 'react-icons/fa';
// import { FiArrowRight } from 'react-icons/fi';

// // Default props for easy customization
// const defaultProps = {
//   name: "Ashif E.K",
//   roles: ["Full-Stack Developer", "CyberSecurity Specialist", "Mobile Developer", "Creative Problem Solver"],
// };

// // Sub-component for Social Links for cleaner code
// const SocialLinks = () => {
//   const socialIcons = [
//     { name: 'Github', url: 'https://github.com/ashif-ek', Icon: FaGithub },
//     { name: 'LinkedIn', url: 'https://linkedin.com/in/ashifek', Icon: FaLinkedin },
//     { name: 'Twitter', url: 'https://twitter.com/your-username', Icon: FaTwitter },
//     { name: 'Instagram', url: 'https://instagram.com/ashif.io', Icon: FaInstagram },
//   ];

//   return (
//     <div className="fixed left-5 bottom-0 z-30 hidden md:block">
//       <div className="flex flex-col items-center space-y-5">
//         {socialIcons.map(({ name, url, Icon }) => (
//           <a
//             key={name}
//             href={url}
//             target="_blank"
//             rel="noopener noreferrer"
//             aria-label={`Link to my ${name} profile`}
//             className="text-slate-400 hover:text-cyan-300 transition-all duration-300 transform hover:-translate-y-1"
//           >
//             <Icon size={22} />
//           </a>
//         ))}
//         <div className="h-24 w-px bg-slate-600 mt-5"></div>
//       </div>
//     </div>
//   );
// };

// // Sub-component for the email link for symmetry
// const EmailLink = () => (
//   <div className="fixed right-5 bottom-0 z-30 hidden md:block">
//     <div className="flex flex-col items-center space-y-5">
//       <a 
//         href="mailto:your-email@example.com" 
//         className="text-slate-400 hover:text-cyan-300 transition-all duration-300 [writing-mode:vertical-rl] tracking-widest text-sm transform hover:-translate-y-1"
//       >
//         your.email@provider.com
//       </a>
//       <div className="h-24 w-px bg-slate-600 mt-5"></div>
//     </div>
//   </div>
// );

// const Hero = ({ name = defaultProps.name, roles = defaultProps.roles }) => {
//   const [isVisible, setIsVisible] = useState(false);
//   const [currentRoleIndex, setCurrentRoleIndex] = useState(0);
//   const canvasRef = useRef(null);
  
//   // Use our new starfield animation hook

//   useEffect(() => {
//     // Staggered fade-in effect
//     const timer = setTimeout(() => setIsVisible(true), 100);
//     return () => clearTimeout(timer);
//   }, []);

//   useEffect(() => {
//     if (!roles || roles.length === 0) return;
    
//     // Interval for cycling through roles
//     const roleInterval = setInterval(() => {
//       setCurrentRoleIndex(prev => (prev + 1) % roles.length);
//     }, 4000); // Change role every 4 seconds

//     return () => clearInterval(roleInterval);
//   }, [roles]);

//   // Staggered animation delays
//   const animationDelay = (delay) => ({
//     transitionDelay: `${delay}ms`,
//   });

//   return (
//     <section id="hero" className="min-h-screen flex items-center justify-center relative overflow-hidden bg-slate-900 text-slate-300">
//       <canvas ref={canvasRef} className="absolute inset-0 w-full h-full z-0" />
      
//       {/* Animated gradient blobs for a fluid aurora effect */}
//       <div className="absolute top-0 -left-4 w-72 h-72 bg-purple-600/50 rounded-full filter blur-3xl opacity-40 animate-blob z-0"></div>
//       <div className="absolute top-0 -right-4 w-72 h-72 bg-cyan-600/50 rounded-full filter blur-3xl opacity-40 animate-blob [animation-delay:2000ms] z-0"></div>
//       <div className="absolute -bottom-8 left-20 w-72 h-72 bg-blue-600/50 rounded-full filter blur-3xl opacity-40 animate-blob [animation-delay:4000ms] z-0"></div>

//       <SocialLinks />
//       <EmailLink />
      
//       <div className="container mx-auto max-w-4xl relative z-10 px-6 text-left">
//         {/* Staggered fade-in content */}
//         <div className={`transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`} style={animationDelay(200)}>
//           <p className="text-lg text-cyan-400 font-mono mb-4">Hello, world. My name is</p>
//         </div>

//         <div className={`transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`} style={animationDelay(300)}>
//           <h1 className="text-4xl sm:text-6xl md:text-7xl font-bold text-slate-100">
//             {name}.
//           </h1>
//         </div>

//         <div className={`transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`} style={animationDelay(400)}>
//           <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-slate-400 mt-2">
//             I build things for the web.
//           </h2>
//         </div>

//         <div className={`transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`} style={animationDelay(500)}>
//           <p className="text-base sm:text-lg text-slate-400 mt-6 max-w-xl leading-relaxed">
//             I'm a <span className="text-cyan-300 font-medium">{roles[currentRoleIndex]}</span> specializing in creating robust, secure, and beautiful digital experiences. I bring ideas to life, from complex back-end systems to elegant user interfaces.
//           </p>
//         </div>
        
//         <div className={`mt-12 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`} style={animationDelay(600)}>
//           <Link 
//             to="projects" 
//             smooth={true} 
//             duration={800} 
//             className="group inline-flex items-center gap-3 px-8 py-4 bg-transparent border-2 border-cyan-400 text-cyan-400 font-semibold rounded-lg hover:bg-cyan-400/10 transition-all duration-300 transform hover:-translate-y-1 cursor-pointer text-lg"
//           >
//             Check out my work!
//             <FiArrowRight className="transition-transform duration-300 group-hover:rotate-90" />
//           </Link>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default Hero;





import { Link } from 'react-scroll';
import { useEffect, useState } from 'react';
import { FaGithub, FaLinkedin, FaTwitter, FaInstagram } from 'react-icons/fa';

// Updated props for a more professional tone
const defaultProps = {
  name: "Ashif E.K",
  title: "Digital Architect & Software Engineer",
  description: "I specialize in building secure, scalable, and high-performance applications that solve complex problems and deliver exceptional user experiences.",
};

// Subtly styled social links
const SocialLinks = () => {
  const socialIcons = [
    { name: 'Github', url: 'https://github.com/ashif-ek', Icon: FaGithub },
    { name: 'LinkedIn', url: 'https://linkedin.com/in/ashifek', Icon: FaLinkedin },
    { name: 'Twitter', url: 'https://twitter.com/your-username', Icon: FaTwitter },
    { name: 'Instagram', url: 'https://instagram.com/ashif.io', Icon: FaInstagram },
  ];
  return (
    <div className="fixed left-5 bottom-0 z-30 hidden md:block">
      <div className="flex flex-col items-center">
        {socialIcons.map(({ name, url, Icon }) => (
          <a key={name} href={url} target="_blank" rel="noopener noreferrer" aria-label={name}
             className="p-2 text-gray-500 hover:text-gray-200 transition-colors duration-300">
            <Icon size={20} />
          </a>
        ))}
        <div className="h-24 w-px bg-gray-800 mt-2"></div>
      </div>
    </div>
  );
};

// Subtly styled email link
const EmailLink = () => (
  <div className="fixed right-5 bottom-0 z-30 hidden md:block">
    <div className="flex flex-col items-center">
      <a href="mailto:ashifek11@gmail.com"
         className="p-2 text-gray-500 hover:text-gray-200 transition-colors duration-300 [writing-mode:vertical-rl] tracking-widest text-sm">
        ashifek11@gemail.com
      </a>
      <div className="h-24 w-px bg-gray-800 mt-2"></div>
    </div>
  </div>
);

const Hero = ({ name = defaultProps.name, title = defaultProps.title, description = defaultProps.description }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

 

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#0a0a0a] text-gray-300 font-sans">
      {/* Mouse-aware gradient spotlight */}
   

      <SocialLinks />
      <EmailLink />

      <div className="relative z-20 container mx-auto max-w-4xl px-6 text-center flex flex-col items-center">
        
        <div className={`transition-all duration-1000 delay-100 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
          <h1 className="text-4xl md:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-400 pb-2">
            {name}
          </h1>
        </div>
        
        <div className={`transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
          <h2 className="text-lg md:text-xl text-gray-400 mt-4 tracking-wide">
            {title}
          </h2>
        </div>
        
        <div className={`transition-all duration-1000 delay-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
          <p className="max-w-2xl mt-6 text-base md:text-lg text-gray-500 leading-relaxed">
            {description}
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