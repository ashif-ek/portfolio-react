import { useEffect, useState, useRef } from 'react';

const skills = [
  { name: 'Django', level: 90, color: 'from-orange-500 to-orange-300' },
  { name: 'Javascript', level: 85, color: 'from-blue-500 to-blue-300' },
  { name: 'React', level: 80, color: 'from-yellow-500 to-yellow-300' },
  { name: 'HTML,CSS', level: 75, color: 'from-cyan-500 to-cyan-300' },
  { name: 'Cybersecurity', level: 70, color: 'from-green-500 to-green-300' },
  { name: 'Flutter', level: 65, color: 'from-purple-500 to-purple-300' },
];

const Skills = () => {
  const [animated, setAnimated] = useState(false);
  const [activeSkill, setActiveSkill] = useState(null);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setAnimated(true);
        }
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section 
      id="skills" 
      ref={sectionRef}
      className="py-20 bg-gray-900 relative overflow-hidden transition-all duration-500"
    >
      {/* Microsoft-inspired background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 -right-20 w-80 h-80 bg-blue-600 rounded-full filter blur-[100px] opacity-20 animate-pulse-slow"></div>
        <div className="absolute bottom-1/3 -left-20 w-80 h-80 bg-purple-600 rounded-full filter blur-[100px] opacity-20 animate-pulse-slower"></div>
        
        {/* Grid overlay with Microsoft Fluent design inspiration */}
        <div className="absolute inset-0 opacity-10 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
        
        {/* Subtle animated particles */}
        <div className="absolute inset-0 opacity-30">
          {[...Array(15)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-cyan-400 rounded-full opacity-70"
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                animation: `float ${Math.random() * 10 + 10}s infinite ease-in-out`,
                animationDelay: `${Math.random() * 5}s`
              }}
            ></div>
          ))}
        </div>
      </div>
      
      <div className="container mx-auto px-6 max-w-6xl relative z-10">
        <h2 className="text-5xl font-bold text-center mb-16 relative">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-cyan-400 font-light tracking-wide">
            Technical <span className="font-semibold text-white">Expertise</span>
          </span>
          <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-32 h-1 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full"></div>
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {skills.map((skill, index) => (
            <div 
              key={skill.name} 
              className={`bg-gray-800/60 backdrop-blur-md rounded-lg p-5 border border-gray-700/50 transition-all duration-300 hover:border-cyan-500/50 hover:shadow-lg hover:shadow-cyan-500/10 hover:-translate-y-1
                ${activeSkill === skill.name ? 'scale-105 border-cyan-500/70 shadow-xl shadow-cyan-500/20' : ''}`}
              style={{ 
                transitionDelay: `${index * 100}ms`,
                opacity: animated ? 1 : 0,
                transform: animated ? 'translateY(0)' : 'translateY(20px)',
              }}
              onMouseEnter={() => setActiveSkill(skill.name)}
              onMouseLeave={() => setActiveSkill(null)}
            >
              <div className="flex justify-between items-center mb-4">
                <span className="font-medium text-gray-200 text-lg">{skill.name}</span>
                <span className="text-cyan-400 font-bold text-lg">{skill.level}%</span>
              </div>
              
              <div className="w-full bg-gray-700/70 rounded-full h-2.5 overflow-hidden backdrop-blur-sm">
                <div 
                  className={`h-2.5 rounded-full bg-gradient-to-r ${skill.color} transition-all duration-1000 ease-out`}
                  style={{ width: animated ? `${skill.level}%` : '0%' }}
                ></div>
              </div>
              
              {/* Microsoft-style progress indicators */}
              <div className="relative mt-3">
                <div className="flex justify-between text-xs text-gray-400">
                  {[0, 25, 50, 75, 100].map((point) => (
                    <div key={point} className="relative">
                      <span className="text-[10px]">{point}%</span>
                      <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 w-px h-2 bg-gray-600"></div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {/* Technologies section with Microsoft Fluent design chips */}
        <div className="mt-20 text-center">
          <h3 className="text-xl font-light text-gray-300 mb-8 tracking-wide">Technologies & Tools</h3>
          <div className="flex flex-wrap justify-center gap-3">
            {['PyCharm', 'VS Code' , 'Tailwind CSS', 'MySQL', 'Figma', 'Git'].map((tech) => (
              <span 
                key={tech}
                className="px-4 py-2.5 bg-gray-800/40 text-gray-300 rounded-md border border-gray-700/50 hover:bg-cyan-900/20 hover:text-cyan-300 hover:border-cyan-500/30 transition-all duration-300 cursor-default text-sm font-light tracking-wide backdrop-blur-sm"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </div>
      
      <style jsx>{`
        @keyframes pulse-slow {
          0%, 100% { opacity: 0.2; transform: scale(1); }
          50% { opacity: 0.25; transform: scale(1.05); }
        }
        @keyframes pulse-slower {
          0%, 100% { opacity: 0.15; transform: scale(1); }
          50% { opacity: 0.2; transform: scale(1.03); }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0) translateX(0); }
          33% { transform: translateY(-10px) translateX(5px); }
          66% { transform: translateY(5px) translateX(-5px); }
        }
        .animate-pulse-slow {
          animation: pulse-slow 8s ease-in-out infinite;
        }
        .animate-pulse-slower {
          animation: pulse-slower 10s ease-in-out infinite;
        }
      `}</style>
    </section>
  );
};

export default Skills;