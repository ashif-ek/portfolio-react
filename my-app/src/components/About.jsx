
import Profile from "../assets/profile.jpg";

const About = () => {
  return (
    <section id="about" className="py-20 bg-gradient-to-br from-gray-900 to-black relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-600 rounded-full filter blur-3xl opacity-20 animate-pulse-slow"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-600 rounded-full filter blur-3xl opacity-10 animate-pulse-slower"></div>
      </div>
      
      {/* Grid pattern overlay */}
      <div className="absolute inset-0 opacity-10 bg-grid-pattern bg-center"></div>
      
      <div className="container mx-auto px-6 max-w-4xl relative z-10">
        <h2 className="text-4xl font-bold text-center mb-16 relative">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-cyan-400">
            About <span className="text-white">Me</span>
          </span>
          <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-24 h-1 bg-gradient-to-r from-blue-600 to-cyan-500 rounded-full"></div>
          <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 -mb-1 w-2 h-2 bg-cyan-400 rounded-full animate-ping"></div>
        </h2>
        
        <div className="flex flex-col md:flex-row gap-10 items-center">
          <div className="md:w-2/5 flex justify-center group" style={{ perspective: "1000px" }}>
            <div className="relative w-56 h-56 rounded-2xl overflow-hidden transform transition-all duration-700 group-hover:rotate-3 group-hover:scale-105"
                 style={{ transformStyle: "preserve-3d" }}>
              <div className="absolute inset-0 bg-gradient-to-br from-blue-700/20 to-cyan-500/20 rounded-2xl border border-gray-700/50 shadow-2xl"></div>
              <div className="absolute inset-4 border border-gray-600/30 rounded-xl"></div>
              
              {/* Profile image with elegant frame */}
              <div className="w-full h-full relative transform transition-transform duration-500 group-hover:scale-110">
                <div className="absolute inset-0 rounded-2xl overflow-hidden border-2 border-gray-700/50 shadow-xl">
                  <img 
                    src={Profile}
                    alt="Profile" 
                    className="w-full h-full object-cover transform transition-transform duration-700 group-hover:scale-110"
                  />
                </div>
                
                {/* Shine effect on hover */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
              </div>
              
              {/* Floating elements around profile */}
              <div className="absolute -top-2 -right-2 w-5 h-5 bg-cyan-400 rounded-full filter blur-sm animate-float"></div>
              <div className="absolute -bottom-2 -left-2 w-4 h-4 bg-blue-400 rounded-full filter blur-sm animate-float-slower"></div>
            </div>
          </div>
          
          <div className="md:w-3/5 space-y-6">
            <p className="text-gray-300 leading-relaxed transition-all duration-300 hover:text-white hover:translate-x-1">
              <span className="text-cyan-400 font-semibold">Introduction</span><br />
            I’m a Computer Science graduate and passionate programmer, \
            currently mastering JavaScript and React as a strong foundation for my ultimate goal of becoming highly proficient in Django.
             I enjoy building scalable, full-stack applications and continuously sharpening my skills to grow as a developer.            </p>
            
            <p className="text-gray-300 leading-relaxed transition-all duration-300 hover:text-white hover:translate-x-1">
              <span className="text-cyan-400 font-semibold">Experience</span><br />
              Through academic and personal projects, I’ve worked across diverse technologies. I have built cross-platform web and mobile applications using Django and Flutter, while also gaining experience with HTML, CSS, JavaScript, and React. My projects have strengthened not only my technical skills but also my understanding of core software principles like planning, problem-solving, creative thinking, clean architecture, reliability, and delivering a better user experience.
            </p>
            
            <p className="text-gray-300 leading-relaxed transition-all duration-300 hover:text-white hover:translate-x-1">
              <span className="text-cyan-400 font-semibold">Philosophy</span><br />
             Earlier, I was interested in cybersecurity, but after my final-year project I realized as developers, we have the power to change, contribute, and create impact.

            </p>
            
            {/* Interactive skill bars */}
            <div className="pt-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-cyan-400">proficency</span>
                <span className="text-sm text-gray-400">85%</span>
              </div>
              <div className="h-1.5 bg-gray-800 rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-blue-600 to-cyan-500 rounded-full w-0 transition-all duration-1000 ease-out animate-progress"></div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Decorative corner elements */}
        <div className="absolute top-10 left-10 w-6 h-6 border-t-2 border-l-2 border-cyan-400 opacity-60"></div>
        <div className="absolute top-10 right-10 w-6 h-6 border-t-2 border-r-2 border-cyan-400 opacity-60"></div>
        <div className="absolute bottom-10 left-10 w-6 h-6 border-b-2 border-l-2 border-cyan-400 opacity-60"></div>
        <div className="absolute bottom-10 right-10 w-6 h-6 border-b-2 border-r-2 border-cyan-400 opacity-60"></div>
      </div>
      
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0) scale(1); opacity: 0.7; }
          50% { transform: translateY(-10px) scale(1.05); opacity: 1; }
        }
        @keyframes float-slower {
          0%, 100% { transform: translateY(0) scale(1); opacity: 0.5; }
          50% { transform: translateY(-8px) scale(1.03); opacity: 0.8; }
        }
        @keyframes progress {
          from { width: 0; }
          to { width: 85%; }
        }
        .animate-float {
          animation: float 4s ease-in-out infinite;
        }
        .animate-float-slower {
          animation: float-slower 5s ease-in-out infinite;
        }
        .animate-pulse-slow {
          animation: pulse 6s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }
        .animate-pulse-slower {
          animation: pulse 8s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }
        .animate-progress {
          animation: progress 1.5s ease-out forwards;
        }
        .bg-grid-pattern {
          background-image: linear-gradient(rgba(255, 255, 255, 0.05) 1px, transparent 1px),
                            linear-gradient(90deg, rgba(255, 255, 255, 0.05) 1px, transparent 1px);
          background-size: 40px 40px;
        }
      `}</style>
    </section>
  );
};

export default About;