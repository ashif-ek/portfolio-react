import { Link } from 'react-scroll';
import { useEffect, useState, useRef } from 'react';

const Hero = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [textIndex, setTextIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const canvasRef = useRef(null);
  
  const roles = ["Full-Stack Developer", "CyberSecurity Specialist", "Mobile Developer", "Problem Solver"];
  
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
      
      // Particle system
      class Particle {
        constructor() {
          this.x = Math.random() * canvas.width;
          this.y = Math.random() * canvas.height;
          this.size = Math.random() * 2 + 0.5;
          this.speedX = Math.random() * 1 - 0.5;
          this.speedY = Math.random() * 1 - 0.5;
          this.color = `rgba(${Math.random() * 70 + 150}, ${Math.random() * 100 + 150}, ${Math.random() * 100 + 200}, ${Math.random() * 0.5 + 0.2})`;
        }
        
        update() {
          this.x += this.speedX;
          this.y += this.speedY;
          
          if (this.x > canvas.width || this.x < 0) this.speedX *= -1;
          if (this.y > canvas.height || this.y < 0) this.speedY *= -1;
        }
        
        draw() {
          ctx.fillStyle = this.color;
          ctx.beginPath();
          ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
          ctx.fill();
        }
      }
      
      const particles = [];
      for (let i = 0; i < 100; i++) {
        particles.push(new Particle());
      }
      
      const animate = () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        // Create connection lines between particles
        for (let i = 0; i < particles.length; i++) {
          for (let j = i; j < particles.length; j++) {
            const dx = particles[i].x - particles[j].x;
            const dy = particles[i].y - particles[j].y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            
            if (distance < 100) {
              ctx.beginPath();
              ctx.strokeStyle = `rgba(100, 200, 255, ${0.2 - distance/500})`;
              ctx.lineWidth = 0.5;
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
    <section id="hero" className="min-h-screen flex items-center justify-center relative overflow-hidden pt-20 px-6">
      {/* Advanced Canvas Background */}
      <canvas 
        ref={canvasRef} 
        className="absolute inset-0 w-full h-full pointer-events-none"
        style={{ zIndex: 0 }}
      />
      
      {/* Animated background elements with parallax */}
      <div className="absolute inset-0 overflow-hidden" style={{ zIndex: 1 }}>
        <div 
          className="absolute top-1/4 -left-20 w-72 h-72 bg-blue-600/20 rounded-full filter blur-3xl animate-pulse-slow"
          style={calculateParallax(0.01)}
        ></div>
        <div 
          className="absolute bottom-1/4 -right-20 w-72 h-72 bg-cyan-600/20 rounded-full filter blur-3xl animate-pulse-slower"
          style={calculateParallax(0.015)}
        ></div>
        <div 
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-purple-600/10 rounded-full filter blur-3xl animate-pulse-slowest"
          style={calculateParallax(0.02)}
        ></div>
      </div>
      
      {/* Grid overlay with parallax */}
      <div 
        className="absolute inset-0 opacity-10 bg-grid-pattern bg-center"
        style={{ 
          ...calculateParallax(0.005),
          backgroundSize: '40px 40px',
          zIndex: 2 
        }}
      ></div>
      
      <div className="container mx-auto max-w-5xl relative z-10" style={{ zIndex: 3 }}>
        <div className="text-center">
          {/* Main headline with animation and typing effect */}
          <h1 className={`text-5xl md:text-7xl font-bold mb-6 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            Hi, I'm <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-cyan-400">ashif e.k</span>
          </h1>
          
          {/* Animated role text with typewriter effect */}
          <h2 className={`text-xl md:text-2xl text-gray-400 mb-8 transition-all duration-1000 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            A <span 
              className="text-cyan-400 typewriter-text" 
              key={textIndex}
            >
              {roles[textIndex]}
            </span> 
          </h2>
          
          {/* Description with animation delay and interactive highlights */}
          <p
            className={`text-gray-400 mb-12 max-w-3xl mx-auto text-lg leading-relaxed transition-all duration-1000 delay-300 ${
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
              className="px-8 py-4 bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-medium rounded-xl hover:shadow-2xl hover:shadow-cyan-500/30 transition-all duration-300 transform hover:-translate-y-1 flex items-center justify-center gap-2 relative overflow-hidden group"
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
              Download CV
            </Link>
            
            <Link
              to="contact"
              smooth={true}
              duration={800}
              className="px-8 py-4 bg-gray-800 border border-gray-700 text-white font-medium rounded-xl hover:bg-gray-700/50 transition-all duration-300 transform hover:-translate-y-1 flex items-center justify-center gap-2 relative overflow-hidden group"
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
          <div className="w-6 h-10 border-2 border-gray-400 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-gray-400 rounded-full mt-2 animate-pulse"></div>
          </div>
        </Link>
      </div>
      
      {/* Custom cursor for extra interactivity */}
      {isHovered && (
        <div 
          className="fixed w-8 h-8 border-2 border-blue-400 rounded-full pointer-events-none transform -translate-x-1/2 -translate-y-1/2 z-50"
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
          50% { opacity: 0.3; }
        }
        @keyframes pulse-slower {
          0%, 100% { opacity: 0.1; }
          50% { opacity: 0.2; }
        }
        @keyframes pulse-slowest {
          0%, 100% { opacity: 0.05; }
          50% { opacity: 0.1; }
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
      `}</style>
    </section>
  );
};

export default Hero;