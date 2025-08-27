// import { Link } from 'react-scroll';
// import { useEffect, useState, useRef } from 'react';

// const Hero = () => {
//   const [isVisible, setIsVisible] = useState(false);
//   const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
//   const [textIndex, setTextIndex] = useState(0);
//   const [isHovered, setIsHovered] = useState(false);
//   const canvasRef = useRef(null);
  
//   const roles = ["Full-Stack Developer", "CyberSecurity Specialist", "Mobile Developer", "Problem Solver"];
  
//   useEffect(() => {
//     setIsVisible(true);
    
//     // Mouse position tracker for parallax effects
//     const handleMouseMove = (e) => {
//       setMousePosition({ x: e.clientX, y: e.clientY });
//     };
    
//     window.addEventListener('mousemove', handleMouseMove);
    
//     // Text rotation animation
//     const textInterval = setInterval(() => {
//       setTextIndex((prev) => (prev + 1) % roles.length);
//     }, 3000);
    
//     // Canvas animation for particles
//     const canvas = canvasRef.current;
//     if (canvas) {
//       const ctx = canvas.getContext('2d');
//       canvas.width = window.innerWidth;
//       canvas.height = window.innerHeight;
      
//       // Particle system
//       class Particle {
//         constructor() {
//           this.x = Math.random() * canvas.width;
//           this.y = Math.random() * canvas.height;
//           this.size = Math.random() * 2 + 0.5;
//           this.speedX = Math.random() * 1 - 0.5;
//           this.speedY = Math.random() * 1 - 0.5;
//           this.color = `rgba(${Math.random() * 70 + 150}, ${Math.random() * 100 + 150}, ${Math.random() * 100 + 200}, ${Math.random() * 0.5 + 0.2})`;
//         }
        
//         update() {
//           this.x += this.speedX;
//           this.y += this.speedY;
          
//           if (this.x > canvas.width || this.x < 0) this.speedX *= -1;
//           if (this.y > canvas.height || this.y < 0) this.speedY *= -1;
//         }
        
//         draw() {
//           ctx.fillStyle = this.color;
//           ctx.beginPath();
//           ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
//           ctx.fill();
//         }
//       }
      
//       const particles = [];
//       for (let i = 0; i < 100; i++) {
//         particles.push(new Particle());
//       }
      
//       const animate = () => {
//         ctx.clearRect(0, 0, canvas.width, canvas.height);
        
//         // Create connection lines between particles
//         for (let i = 0; i < particles.length; i++) {
//           for (let j = i; j < particles.length; j++) {
//             const dx = particles[i].x - particles[j].x;
//             const dy = particles[i].y - particles[j].y;
//             const distance = Math.sqrt(dx * dx + dy * dy);
            
//             if (distance < 100) {
//               ctx.beginPath();
//               ctx.strokeStyle = `rgba(100, 200, 255, ${0.2 - distance/500})`;
//               ctx.lineWidth = 0.5;
//               ctx.moveTo(particles[i].x, particles[i].y);
//               ctx.lineTo(particles[j].x, particles[j].y);
//               ctx.stroke();
//             }
//           }
//         }
        
//         particles.forEach(particle => {
//           particle.update();
//           particle.draw();
//         });
        
//         requestAnimationFrame(animate);
//       };
      
//       animate();
      
//       // Handle resize
//       const handleResize = () => {
//         canvas.width = window.innerWidth;
//         canvas.height = window.innerHeight;
//       };
      
//       window.addEventListener('resize', handleResize);
      
//       return () => {
//         window.removeEventListener('resize', handleResize);
//         clearInterval(textInterval);
//       };
//     }
    
//     return () => {
//       window.removeEventListener('mousemove', handleMouseMove);
//     };
//   }, []);

//   // Calculate parallax effect based on mouse position
//   const calculateParallax = (factor) => {
//     const x = (mousePosition.x - window.innerWidth / 2) * factor;
//     const y = (mousePosition.y - window.innerHeight / 2) * factor;
//     return { transform: `translate(${x}px, ${y}px)` };
//   };

//   return (
//     <section id="hero" className="min-h-screen flex items-center justify-center relative overflow-hidden pt-20 px-6">
//       {/* Advanced Canvas Background */}
//       <canvas 
//         ref={canvasRef} 
//         className="absolute inset-0 w-full h-full pointer-events-none"
//         style={{ zIndex: 0 }}
//       />
      
//       {/* Animated background elements with parallax */}
//       <div className="absolute inset-0 overflow-hidden" style={{ zIndex: 1 }}>
//         <div 
//           className="absolute top-1/4 -left-20 w-72 h-72 bg-blue-600/20 rounded-full filter blur-3xl animate-pulse-slow"
//           style={calculateParallax(0.01)}
//         ></div>
//         <div 
//           className="absolute bottom-1/4 -right-20 w-72 h-72 bg-cyan-600/20 rounded-full filter blur-3xl animate-pulse-slower"
//           style={calculateParallax(0.015)}
//         ></div>
//         <div 
//           className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-purple-600/10 rounded-full filter blur-3xl animate-pulse-slowest"
//           style={calculateParallax(0.02)}
//         ></div>
//       </div>
      
//       {/* Grid overlay with parallax */}
//       <div 
//         className="absolute inset-0 opacity-10 bg-grid-pattern bg-center"
//         style={{ 
//           ...calculateParallax(0.005),
//           backgroundSize: '40px 40px',
//           zIndex: 2 
//         }}
//       ></div>
      
//       <div className="container mx-auto max-w-5xl relative z-10" style={{ zIndex: 3 }}>
//         <div className="text-center">
//           {/* Main headline with animation and typing effect */}
//           <h1 className={`text-5xl md:text-7xl font-bold mb-6 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
//             Hi, I'm <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-cyan-400">ashif e.k</span>
//           </h1>
          
//           {/* Animated role text with typewriter effect */}
//           <h2 className={`text-xl md:text-2xl text-gray-400 mb-8 transition-all duration-1000 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
//             A <span 
//               className="text-cyan-400 typewriter-text" 
//               key={textIndex}
//             >
//               {roles[textIndex]}
//             </span> 
//           </h2>
          
//           {/* Description with animation delay and interactive highlights */}
//           <p
//             className={`text-gray-400 mb-12 max-w-3xl mx-auto text-lg leading-relaxed transition-all duration-1000 delay-300 ${
//               isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
//             }`}
//           >
//             Specializing in 
//             <span 
//               className="text-blue-400 hover:text-blue-300 transition-colors duration-300 cursor-pointer"
//               onMouseEnter={() => setIsHovered(true)}
//               onMouseLeave={() => setIsHovered(false)}
//             > Django (Full-Stack)</span>,{" "}
//             <span className="text-cyan-400 hover:text-cyan-300 transition-colors duration-300 cursor-pointer">JavaScript</span>,{" "}
//             <span className="text-purple-400 hover:text-purple-300 transition-colors duration-300 cursor-pointer">React</span>,{" "}
//             <span className="text-pink-400 hover:text-pink-300 transition-colors duration-300 cursor-pointer">Flutter</span> and{" "}
//             <span className="text-green-400 hover:text-green-300 transition-colors duration-300 cursor-pointer">CyberSecurity</span>.
//           </p>
          
//           {/* CTA buttons with advanced hover effects */}
//           <div className={`flex flex-col sm:flex-row justify-center gap-5 transition-all duration-1000 delay-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
//             <Link
//               to="projects"
//               smooth={true}
//               duration={800}
//               className="px-8 py-4 bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-medium rounded-xl hover:shadow-2xl hover:shadow-cyan-500/30 transition-all duration-300 transform hover:-translate-y-1 flex items-center justify-center gap-2 relative overflow-hidden group"
//               onMouseEnter={(e) => {
//                 e.target.style.background = 'linear-gradient(to right, #2563eb, #0891b2)';
//               }}
//               onMouseLeave={(e) => {
//                 e.target.style.background = 'linear-gradient(to right, #2563eb, #06b6d4)';
//               }}
//             >
//               <span className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 transition-opacity duration-300"></span>
//               <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
//               </svg>
//               Download CV
//             </Link>
            
//             <Link
//               to="contact"
//               smooth={true}
//               duration={800}
//               className="px-8 py-4 bg-gray-800 border border-gray-700 text-white font-medium rounded-xl hover:bg-gray-700/50 transition-all duration-300 transform hover:-translate-y-1 flex items-center justify-center gap-2 relative overflow-hidden group"
//             >
//               <span className="absolute inset-0 bg-white opacity-0 group-hover:opacity-5 transition-opacity duration-300"></span>
//               <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
//               </svg>
//               Contact Me
//             </Link>
//           </div>
//         </div>
//       </div>
      
//       {/* Scroll indicator */}
//       <div 
//         className="absolute bottom-10 left-1/2 transform -translate-x-1/2 z-10 animate-bounce"
//         style={{ zIndex: 4 }}
//       >
//         <Link to="about" smooth={true} duration={800} className="cursor-pointer">
//           <div className="w-6 h-10 border-2 border-gray-400 rounded-full flex justify-center">
//             <div className="w-1 h-3 bg-gray-400 rounded-full mt-2 animate-pulse"></div>
//           </div>
//         </Link>
//       </div>
      
//       {/* Custom cursor for extra interactivity */}
//       {isHovered && (
//         <div 
//           className="fixed w-8 h-8 border-2 border-blue-400 rounded-full pointer-events-none transform -translate-x-1/2 -translate-y-1/2 z-50"
//           style={{ left: mousePosition.x, top: mousePosition.y }}
//         ></div>
//       )}
      
//       <style jsx>{`
//         @keyframes float1 {
//           0%, 100% { transform: translateY(0) translateX(0); }
//           50% { transform: translateY(-20px) translateX(10px); }
//         }
//         @keyframes float2 {
//           0%, 100% { transform: translateY(0) translateX(0); }
//           50% { transform: translateY(-15px) translateX(-15px); }
//         }
//         @keyframes float3 {
//           0%, 100% { transform: translateY(0) translateX(0); }
//           50% { transform: translateY(-25px) translateX(5px); }
//         }
//         @keyframes pulse-slow {
//           0%, 100% { opacity: 0.2; }
//           50% { opacity: 0.3; }
//         }
//         @keyframes pulse-slower {
//           0%, 100% { opacity: 0.1; }
//           50% { opacity: 0.2; }
//         }
//         @keyframes pulse-slowest {
//           0%, 100% { opacity: 0.05; }
//           50% { opacity: 0.1; }
//         }
//         .animate-pulse-slow {
//           animation: pulse-slow 8s ease-in-out infinite;
//         }
//         .animate-pulse-slower {
//           animation: pulse-slower 12s ease-in-out infinite;
//         }
//         .animate-pulse-slowest {
//           animation: pulse-slowest 16s ease-in-out infinite;
//         }
//         .typewriter-text {
//           overflow: hidden;
//           border-right: 2px solid #22d3ee;
//           white-space: nowrap;
//           animation: typing 3.5s steps(40, end), blink-caret 0.75s step-end infinite;
//         }
//         @keyframes typing {
//           from { width: 0 }
//           to { width: 100% }
//         }
//         @keyframes blink-caret {
//           from, to { border-color: transparent }
//           50% { border-color: #22d3ee; }
//         }
//       `}</style>
//     </section>
//   );
// };

// export default Hero;


import { Link } from 'react-scroll';
import { useEffect, useState, useRef } from 'react';

const Hero = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [textIndex, setTextIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const canvasRef = useRef(null);
  
  const roles = ["Full-Stack Developer", "CyberSecurity Specialist", "Mobile Developer", "Problem Solver"];
  
  // Social media icons data
  const socialIcons = [
    { name: 'github', url: '#', icon: 'M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z' },
    { name: 'linkedin', url: '#', icon: 'M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z' },
    { name: 'twitter', url: '#', icon: 'M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z' },
    { name: 'instagram', url: '#', icon: 'M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z' }
  ];

  useEffect(() => {
    setIsVisible(true);
    
    // Mouse position tracker for parallax effects
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    
    // Text rotation animation
    const textInterval = setInterval(() => {
      setTextIndex((prev) => (prev + 1) % roles.length);
    }, 3000);
    
    // Canvas animation for particles
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext('2d');
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      
      // Create a gradient for the background
      const gradient = ctx.createRadialGradient(
        canvas.width / 2,
        canvas.height / 2,
        0,
        canvas.width / 2,
        canvas.height / 2,
        Math.max(canvas.width, canvas.height)
      );
      gradient.addColorStop(0, 'rgba(11, 12, 27, 0.8)');
      gradient.addColorStop(0.3, 'rgba(15, 23, 42, 0.9)');
      gradient.addColorStop(1, 'rgba(3, 7, 18, 1)');
      
      // Enhanced particle system
      class Particle {
        constructor() {
          this.x = Math.random() * canvas.width;
          this.y = Math.random() * canvas.height;
          this.size = Math.random() * 2.5 + 0.5;
          this.speedX = Math.random() * 0.8 - 0.4;
          this.speedY = Math.random() * 0.8 - 0.4;
          this.color = this.getStarColor();
          this.brightness = Math.random() * 0.5 + 0.5;
          this.flickerSpeed = Math.random() * 0.02 + 0.005;
          this.flickerValue = Math.random() * Math.PI * 2;
        }
        
        getStarColor() {
          const colors = [
            `rgba(255, 255, 255, `, // White stars
            `rgba(200, 220, 255, `, // Blue-white stars
            `rgba(255, 220, 180, `, // Yellow stars
            `rgba(180, 220, 255, `, // Light blue stars
          ];
          return colors[Math.floor(Math.random() * colors.length)];
        }
        
        update() {
          this.flickerValue += this.flickerSpeed;
          this.brightness = 0.5 + Math.sin(this.flickerValue) * 0.5;
          
          this.x += this.speedX;
          this.y += this.speedY;
          
          if (this.x > canvas.width || this.x < 0) this.speedX *= -1;
          if (this.y > canvas.height || this.y < 0) this.speedY *= -1;
        }
        
        draw() {
          ctx.fillStyle = this.color + this.brightness + ')';
          ctx.beginPath();
          ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
          ctx.fill();
          
          // Add a glow effect for some stars
          if (this.size > 1.5) {
            ctx.shadowBlur = 10;
            ctx.shadowColor = this.color.replace('rgba(', 'rgb(').replace(/,[^)]+\)/, ')');
            ctx.fill();
            ctx.shadowBlur = 0;
          }
        }
      }
      
      const particles = [];
      for (let i = 0; i < 200; i++) {
        particles.push(new Particle());
      }
      
      // Add some larger "stars"
      for (let i = 0; i < 15; i++) {
        const star = new Particle();
        star.size = Math.random() * 3 + 2;
        star.speedX = star.speedX * 0.3;
        star.speedY = star.speedY * 0.3;
        particles.push(star);
      }
      
      const animate = () => {
        // Fill with gradient background
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        // Create connection lines between particles
        for (let i = 0; i < particles.length; i++) {
          for (let j = i; j < particles.length; j++) {
            const dx = particles[i].x - particles[j].x;
            const dy = particles[i].y - particles[j].y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            
            if (distance < 100) {
              ctx.beginPath();
              ctx.strokeStyle = `rgba(100, 150, 255, ${0.2 - distance/500})`;
              ctx.lineWidth = 0.3;
              ctx.moveTo(particles[i].x, particles[i].y);
              ctx.lineTo(particles[j].x, particles[j].y);
              ctx.stroke();
            }
          }
        }
        
        particles.forEach(particle => {
          particle.update();
          particle.draw();
        });
        
        requestAnimationFrame(animate);
      };
      
      animate();
      
      // Handle resize
      const handleResize = () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
      };
      
      window.addEventListener('resize', handleResize);
      
      return () => {
        window.removeEventListener('resize', handleResize);
        clearInterval(textInterval);
      };
    }
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  // Calculate parallax effect based on mouse position
  const calculateParallax = (factor) => {
    const x = (mousePosition.x - window.innerWidth / 2) * factor;
    const y = (mousePosition.y - window.innerHeight / 2) * factor;
    return { transform: `translate(${x}px, ${y}px)` };
  };

  return (
    <section id="hero" className="min-h-screen flex items-center justify-center relative overflow-hidden pt-20 px-6 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Advanced Canvas Background */}
      <canvas 
        ref={canvasRef} 
        className="absolute inset-0 w-full h-full pointer-events-none"
        style={{ zIndex: 0 }}
      />
      
      {/* Nebula background elements with parallax */}
      <div className="absolute inset-0 overflow-hidden" style={{ zIndex: 1 }}>
        <div 
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-900/30 rounded-full filter blur-6xl animate-pulse-slow"
          style={calculateParallax(0.01)}
        ></div>
        <div 
          className="absolute bottom-1/3 right-1/4 w-80 h-80 bg-blue-900/40 rounded-full filter blur-5xl animate-pulse-slower"
          style={calculateParallax(0.015)}
        ></div>
        <div 
          className="absolute top-1/2 left-1/3 w-72 h-72 bg-indigo-900/30 rounded-full filter blur-5xl animate-pulse-slowest"
          style={calculateParallax(0.02)}
        ></div>
      </div>
      
      {/* Social Icons - Bottom Left Vertically */}
      <div className="fixed left-6 bottom-6 z-30 flex flex-col items-center space-y-5">
        {socialIcons.map((social, index) => (
          <a
            key={social.name}
            href={social.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-300 hover:text-cyan-400 transition-all duration-300 transform hover:-translate-y-1"
            style={{ transitionDelay: `${index * 100}ms` }}
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
              <path d={social.icon} />
            </svg>
          </a>
        ))}
        <div className="h-10 w-px bg-gradient-to-t from-cyan-400 to-transparent mt-2"></div>
      </div>
      
      <div className="container mx-auto max-w-5xl relative z-10" style={{ zIndex: 3 }}>
        <div className="text-center">
          {/* Main headline with animation and typing effect */}
          <h1 className={`text-5xl md:text-7xl font-bold mb-6 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            Hi, I'm <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-cyan-400 drop-shadow-glow">ashif e.k</span>
          </h1>
          
          {/* Animated role text with typewriter effect */}
          <h2 className={`text-xl md:text-2xl text-gray-300 mb-8 transition-all duration-1000 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            A <span 
              className="text-cyan-400 typewriter-text font-medium" 
              key={textIndex}
            >
              {roles[textIndex]}
            </span> 
          </h2>
          
          {/* Description with animation delay and interactive highlights */}
          <p
            className={`text-gray-300 mb-12 max-w-3xl mx-auto text-lg leading-relaxed transition-all duration-1000 delay-300 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
          >
            Specializing in 
            <span 
              className="text-blue-400 hover:text-blue-300 transition-colors duration-300 cursor-pointer"
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            > Django (Full-Stack)</span>,{" "}
            <span className="text-cyan-400 hover:text-cyan-300 transition-colors duration-300 cursor-pointer">JavaScript</span>,{" "}
            <span className="text-purple-400 hover:text-purple-300 transition-colors duration-300 cursor-pointer">React</span>,{" "}
            <span className="text-pink-400 hover:text-pink-300 transition-colors duration-300 cursor-pointer">Flutter</span> and{" "}
            <span className="text-green-400 hover:text-green-300 transition-colors duration-300 cursor-pointer">CyberSecurity</span>.
          </p>
          
          {/* CTA buttons with advanced hover effects */}
          <div className={`flex flex-col sm:flex-row justify-center gap-5 transition-all duration-1000 delay-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <Link
              to="projects"
              smooth={true}
              duration={800}
              className="px-8 py-4 bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-medium rounded-xl hover:shadow-2xl hover:shadow-cyan-500/40 transition-all duration-300 transform hover:-translate-y-1 flex items-center justify-center gap-2 relative overflow-hidden group"
              onMouseEnter={(e) => {
                e.target.style.background = 'linear-gradient(to right, #2563eb, #0891b2)';
              }}
              onMouseLeave={(e) => {
                e.target.style.background = 'linear-gradient(to right, #2563eb, #06b6d4)';
              }}
            >
              <span className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 transition-opacity duration-300"></span>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
              </svg>
              View My Work
            </Link>
            
            <Link
              to="contact"
              smooth={true}
              duration={800}
              className="px-8 py-4 bg-slate-800/60 border border-slate-700/50 text-white font-medium rounded-xl hover:bg-slate-700/40 transition-all duration-300 transform hover:-translate-y-1 flex items-center justify-center gap-2 relative overflow-hidden group backdrop-blur-sm"
            >
              <span className="absolute inset-0 bg-white opacity-0 group-hover:opacity-5 transition-opacity duration-300"></span>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              Contact Me
            </Link>
          </div>
        </div>
      </div>
      
      {/* Scroll indicator */}
      <div 
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2 z-10 animate-bounce"
        style={{ zIndex: 4 }}
      >
        <Link to="about" smooth={true} duration={800} className="cursor-pointer">
          <div className="w-6 h-10 border-2 border-slate-400 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-slate-400 rounded-full mt-2 animate-pulse"></div>
          </div>
        </Link>
      </div>
      
      {/* Custom cursor for extra interactivity */}
      {isHovered && (
        <div 
          className="fixed w-8 h-8 border-2 border-blue-400 rounded-full pointer-events-none transform -translate-x-1/2 -translate-y-1/2 z-50 transition-all duration-150"
          style={{ left: mousePosition.x, top: mousePosition.y }}
        ></div>
      )}
      
      <style jsx>{`
        @keyframes float1 {
          0%, 100% { transform: translateY(0) translateX(0); }
          50% { transform: translateY(-20px) translateX(10px); }
        }
        @keyframes float2 {
          0%, 100% { transform: translateY(0) translateX(0); }
          50% { transform: translateY(-15px) translateX(-15px); }
        }
        @keyframes float3 {
          0%, 100% { transform: translateY(0) translateX(0); }
          50% { transform: translateY(-25px) translateX(5px); }
        }
        @keyframes pulse-slow {
          0%, 100% { opacity: 0.2; }
          50% { opacity: 0.4; }
        }
        @keyframes pulse-slower {
          0%, 100% { opacity: 0.1; }
          50% { opacity: 0.3; }
        }
        @keyframes pulse-slowest {
          0%, 100% { opacity: 0.05; }
          50% { opacity: 0.15; }
        }
        .animate-pulse-slow {
          animation: pulse-slow 8s ease-in-out infinite;
        }
        .animate-pulse-slower {
          animation: pulse-slower 12s ease-in-out infinite;
        }
        .animate-pulse-slowest {
          animation: pulse-slowest 16s ease-in-out infinite;
        }
        .typewriter-text {
          overflow: hidden;
          border-right: 2px solid #22d3ee;
          white-space: nowrap;
          animation: typing 3.5s steps(40, end), blink-caret 0.75s step-end infinite;
        }
        @keyframes typing {
          from { width: 0 }
          to { width: 100% }
        }
        @keyframes blink-caret {
          from, to { border-color: transparent }
          50% { border-color: #22d3ee; }
        }
        .drop-shadow-glow {
          filter: drop-shadow(0 0 8px rgba(56, 189, 248, 0.5));
        }
      `}</style>
    </section>
  );
};

export default Hero;