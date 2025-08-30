import { useEffect, useState, useRef, useMemo } from 'react';

// --- SVG Icons (Self-contained to avoid import errors) ---
const PythonIcon = () => <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="1.5em" height="1.5em"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.24 14.76c-.49.49-1.28.49-1.77 0l-2.01-2.01-2.01 2.01c-.49.49-1.28.49-1.77 0s-.49-1.28 0-1.77l2.01-2.01-2.01-2.01c-.49-.49-.49-1.28 0-1.77s1.28-.49 1.77 0l2.01 2.01 2.01-2.01c.49-.49 1.28-.49 1.77 0s.49 1.28 0 1.77l-2.01 2.01 2.01 2.01c.48.49.48 1.28-.01 1.77z"/></svg>;
const JSIcon = () => <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="1.5em" height="1.5em"><path d="M0 0h24v24H0z" fill="none"/><path d="M13 1.07V9h7c0-4.08-3.05-7.44-7-7.93zM4 15c0 4.42 3.58 8 8 8s8-3.58 8-8v-4H4v4zm7-13.93C7.05 1.56 4 4.92 4 9h7V1.07z"/></svg>;
const ReactIcon = () => <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" fill="currentColor" width="1.5em" height="1.5em"><path d="M416 32H96C51.63 32 16 67.63 16 112v288c0 44.37 35.63 80 80 80h320c44.37 0 80-35.63 80-80V112C496 67.63 460.4 32 416 32zM256 256c-44.13 0-80-35.88-80-80s35.87-80 80-80 80 35.88 80 80-35.87 80-80 80z"/></svg>;
const Html5Icon = () => <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="1.5em" height="1.5em"><path d="M1.5 0h21l-1.91 21.563L11.977 24l-8.565-2.438L1.5 0zm7.031 9.75l-.232-2.718 10.059.003.23-2.622-13.21-.002.625 7.422h8.934l-.386 4.125-2.979.81-2.972-.803-.188-2.11h-2.61l.29 3.855L12 19.351l5.875-1.598.812-8.003h-10.125z"/></svg>;
const Css3Icon = () => <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="1.5em" height="1.5em"><path d="M1.5 0h21l-1.91 21.563L11.977 24l-8.565-2.438L1.5 0zm17.585 9.75l.135-1.52h-5.02l.142-1.61h5.011l.142-1.61h-10.14l.285 3.22h5.028l-.142 1.61h-5.02l.285 3.22h5.02l-.142 1.61h-5.02l.285 3.22L12 19.351l3.053-.827.215-2.415H12.2l-.142-1.61h3.33z"/></svg>;
const ShieldIcon = () => <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="1.5em" height="1.5em"><path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm0 10.99h7c-.53 4.12-3.28 7.79-7 8.94V12H5V6.3l7-3.11v8.8z"/></svg>;
const MobileIcon = () => <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="1.5em" height="1.5em"><path d="M17 1.01L7 1c-1.1 0-2 .9-2 2v18c0 1.1.9 2 2 2h10c1.1 0 2-.9 2-2V3c0-1.1-.9-1.99-2-1.99zM17 19H7V5h10v14z"/></svg>;
const CodeIcon = () => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" width="2.5em" height="2.5em"><path strokeLinecap="round" strokeLinejoin="round" d="M17.25 6.75L22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3l-4.5 16.5" /></svg>;
const PencilRulerIcon = () => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" width="2.5em" height="2.5em"><path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" /></svg>;
const GitIcon = () => <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="2.5em" height="2.5em"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm3.6 13.6c-.4.4-.99.55-1.5.4l-1.7-1.7v3.2c0 .55-.45 1-1 1s-1-.45-1-1v-3.2l-1.7 1.7c-.5.15-1.1-.01-1.5-.4-.4-.4-.55-.99-.4-1.5l3.6-10.8c.15-.45.55-.75 1-.75s.85.3 1 .75l3.6 10.8c.15.51-.01 1.1-.4 1.5z"/></svg>;
const DatabaseIcon = () => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" width="2.5em" height="2.5em"><path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l7.5-7.5 7.5 7.5M4.5 18.75l7.5-7.5 7.5 7.5" /></svg>;
const TailwindIcon = () => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" width="2.5em" height="2.5em"><path strokeLinecap="round" strokeLinejoin="round" d="M9 17.25v-.375c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v.375m-3.75 0h3.75M12 15.75v2.25" /></svg>;

// --- Data Configuration ---
const skillsData = [
  { name: 'Django', level: 90, category: 'Backend', color: '#092E20', icon: <PythonIcon /> },
  { name: 'JavaScript', level: 85, category: 'Frontend', color: '#F7DF1E', icon: <JSIcon /> },
  { name: 'React', level: 80, category: 'Frontend', color: '#61DAFB', icon: <ReactIcon /> },
  { name: 'HTML5', level: 95, category: 'Frontend', color: '#E34F26', icon: <Html5Icon /> },
  { name: 'CSS3', level: 90, category: 'Frontend', color: '#1572B6', icon: <Css3Icon /> },
  { name: 'Cybersecurity', level: 70, category: 'Security', color: '#00A86B', icon: <ShieldIcon /> },
  { name: 'Flutter', level: 65, category: 'Mobile', color: '#02569B', icon: <MobileIcon /> },
];

const toolsData = [
  { name: 'PyCharm', icon: <CodeIcon /> },
  { name: 'VS Code', icon: <CodeIcon /> },
  { name: 'Tailwind CSS', icon: <TailwindIcon /> },
  { name: 'MySQL', icon: <DatabaseIcon /> },
  { name: 'Figma', icon: <PencilRulerIcon /> },
  { name: 'Git', icon: <GitIcon /> },
];

const skillCategories = ['All', 'Frontend', 'Backend', 'Mobile', 'Security'];

// --- Reusable UI Components ---
const RadialProgressBar = ({ level, color }) => {
  const radius = 50;
  const stroke = 8;
  const normalizedRadius = radius - stroke * 2;
  const circumference = normalizedRadius * 2 * Math.PI;
  const strokeDashoffset = circumference - (level / 100) * circumference;

  return (
    <div className="relative w-32 h-32">
      <svg height="100%" width="100%" viewBox="0 0 120 120">
        <circle
          stroke="#374151"
          fill="transparent"
          strokeWidth={stroke}
          r={normalizedRadius}
          cx={radius + 10}
          cy={radius + 10}
        />
        <circle
          stroke={color}
          fill="transparent"
          strokeWidth={stroke}
          strokeDasharray={circumference + ' ' + circumference}
          style={{ strokeDashoffset, strokeLinecap: 'round' }}
          transform={`rotate(-90 ${radius+10} ${radius+10})`}
          r={normalizedRadius}
          cx={radius + 10}
          cy={radius + 10}
          className="transition-all duration-[1.5s] ease-in-out"
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-3xl font-bold" style={{ color }}>{level}%</span>
      </div>
    </div>
  );
};

const SkillCard = ({ skill, isVisible }) => {
  const level = isVisible ? skill.level : 0;

  return (
    <div
      className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/60 rounded-xl p-6 flex flex-col items-center justify-center gap-4 transition-all duration-300 hover:bg-gray-800/80 hover:border-cyan-400/50 hover:-translate-y-2 group"
    >
      <div className="flex items-center justify-center gap-4 text-gray-200 text-2xl font-semibold">
          <div className="transition-transform duration-300 group-hover:scale-110" style={{color: skill.color}}>{skill.icon}</div>
          <h3>{skill.name}</h3>
      </div>
      <RadialProgressBar level={level} color={skill.color} />
      <span className="text-sm text-gray-400 font-light tracking-wider">{skill.category}</span>
    </div>
  );
};

// --- Main App Component ---
const App = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [activeCategory, setActiveCategory] = useState('All');
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const handleMouseMove = (e) => {
    if (sectionRef.current) {
      const rect = sectionRef.current.getBoundingClientRect();
      setMousePosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
    }
  };

  const filteredSkills = useMemo(() => 
    activeCategory === 'All' 
      ? skillsData 
      : skillsData.filter(skill => skill.category === activeCategory),
    [activeCategory]
  );

  return (
    <section
      id="skills"
      ref={sectionRef}
      onMouseMove={handleMouseMove}
      className="py-24 bg-[#0d1117] text-gray-200 relative overflow-hidden"
    >
      <div
        className="absolute inset-0 transition-all duration-300 z-0"
        style={{
          background: `radial-gradient(600px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(22, 78, 99, 0.2), transparent 80%)`,
        }}
      ></div>

      <div className="container mx-auto px-4 max-w-7xl relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-500">
              Professional Skillset
            </span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg">
            A showcase of my technical abilities and the tools I use to bring ideas to life.
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-2 md:gap-4 mb-12">
          {skillCategories.map(category => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-5 py-2 text-sm font-medium rounded-full transition-all duration-300 border-2 ${
                activeCategory === category
                  ? 'bg-cyan-500 border-cyan-500 text-white shadow-lg shadow-cyan-500/20'
                  : 'bg-gray-800/60 border-gray-700/80 text-gray-300 hover:border-cyan-500/50 hover:text-cyan-300'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {filteredSkills.map((skill, index) => (
            <div
              key={skill.name}
              className="transition-all duration-500"
              style={{
                transitionDelay: `${isVisible ? index * 100 : 0}ms`,
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
              }}
            >
              <SkillCard skill={skill} isVisible={isVisible} />
            </div>
          ))}
        </div>

        <div className="mt-24 text-center">
            <h3 className="text-3xl font-bold mb-8">Technologies & Tools</h3>
            <div className="flex flex-wrap justify-center items-center gap-x-8 gap-y-6">
                {toolsData.map(tool => (
                    <div key={tool.name} className="flex flex-col items-center gap-2 text-gray-400 transition-all duration-300 hover:text-cyan-400 hover:scale-105 cursor-pointer">
                        <div className="text-4xl">{tool.icon}</div>
                        <span className="text-sm font-light">{tool.name}</span>
                    </div>
                ))}
            </div>
        </div>
      </div>
    </section>
  );
};

export default App;

