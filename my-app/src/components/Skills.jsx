import React, { useEffect, useState, useRef, useMemo } from 'react';
import { skills as mockSkills, tools as mockTools } from '../data/mockData';
import Api from './Api';
// Icons
import { BsBootstrap, BsGithub } from "react-icons/bs";
import { SiPython, SiJavascript, SiReact, SiTailwindcss, SiDocker, SiJira } from "react-icons/si";

// --- Memoized SVG Icons (No changes here) ---
const PythonIcon = React.memo(() => <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="1.5em" height="1.5em"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.24 14.76c-.49.49-1.28.49-1.77 0l-2.01-2.01-2.01 2.01c-.49.49-1.28.49-1.77 0s-.49-1.28 0-1.77l2.01-2.01-2.01-2.01c-.49-.49-.49-1.28 0-1.77s1.28-.49 1.77 0l2.01 2.01 2.01-2.01c.49-.49 1.28-.49 1.77 0s.49 1.28 0 1.77l-2.01 2.01 2.01 2.01c.48.49.48 1.28-.01 1.77z"/></svg>);
const JSIcon = React.memo(() => <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="1.5em" height="1.5em"><path d="M0 0h24v24H0z" fill="none"/><path d="M13 1.07V9h7c0-4.08-3.05-7.44-7-7.93zM4 15c0 4.42 3.58 8 8 8s8-3.58 8-8v-4H4v4zm7-13.93C7.05 1.56 4 4.92 4 9h7V1.07z"/></svg>);
const ReactIcon = React.memo(() => <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" fill="currentColor" width="1.5em" height="1.5em"><path d="M416 32H96C51.63 32 16 67.63 16 112v288c0 44.37 35.63 80 80 80h320c44.37 0 80-35.63 80-80V112C496 67.63 460.4 32 416 32zM256 256c-44.13 0-80-35.88-80-80s35.87-80 80-80 80 35.88 80 80-35.87 80-80 80z"/></svg>);
const ShieldIcon = React.memo(() => <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="1.5em" height="1.5em"><path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm0 10.99h7c-.53 4.12-3.28 7.79-7 8.94V12H5V6.3l7-3.11v8.8z"/></svg>);
const MobileIcon = React.memo(() => <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="1.5em" height="1.5em"><path d="M17 1.01L7 1c-1.1 0-2 .9-2 2v18c0 1.1.9 2 2 2h10c1.1 0 2-.9 2-2V3c0-1.1-.9-1.99-2-1.99zM17 19H7V5h10v14z"/></svg>);
const CodeIcon = React.memo(() => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" width="2em" height="2em"><path strokeLinecap="round" strokeLinejoin="round" d="M17.25 6.75L22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3l-4.5 16.5" /></svg>);
const PencilRulerIcon = React.memo(() => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" width="1.5em" height="1.5em"><path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" /></svg>);
const GitIcon = React.memo(() => <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="2em" height="2em"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm3.6 13.6c-.4.4-.99.55-1.5.4l-1.7-1.7v3.2c0 .55-.45 1-1 1s-1-.45-1-1v-3.2l-1.7 1.7c-.5.15-1.1-.01-1.5-.4-.4-.4-.55-.99-.4-1.5l3.6-10.8c.15-.45.55-.75 1-.75s.85.3 1 .75l3.6 10.8c.15.51-.01 1.1-.4 1.5z"/></svg>);
const DockerIcon = React.memo(() => <svg xmlns="http://www.w3.org/2000/svg" width="2em" height="2em" viewBox="0 0 24 24" fill="currentColor"><path d="M22.122 13.129c-.139-.212-.547-.852-.547-.852l-2.481-3.922c-.001 0-.306-1.12-1.353-1.12H1.936c-1.047 0-1.282 1.12-1.282 1.12L0 12.277v.852s.408.64.547.851l2.481 3.922s.306 1.12 1.353 1.12h14.328c1.047 0 1.282-1.12 1.282-1.12l.608-.962.035-.054.437-.692.001-.001.546-.865.547-.865zM7.52 12.338a.56.56 0 0 1-.56-.56c0-.308.251-.56.56-.56s.559.252.559.56c0 .309-.25.56-.559.56zm2.8 0a.56.56 0 0 1-.56-.56c0-.308.252-.56.56-.56s.56.252.56.56c0 .309-.252.56-.56.56zm2.799 0a.56.56 0 0 1-.56-.56c0-.308.252-.56.56-.56s.56.252.56.56a.56.56 0 0 1-.56.56zm2.8 0a.56.56 0 0 1-.56-.56c0-.308.252-.56.56-.56s.56.252.56.56a.56.56 0 0 1-.56.56zm2.799 0a.56.56 0 0 1-.56-.56c0-.308.251-.56.56-.56s.559.252.559.56c0 .309-.25.56-.559.56zm-3.36-2.8h-2.24a.56.56 0 0 1-.56-.56c0-.309.252-.56.56-.56h2.24c.309 0 .56.251.56.56a.56.56 0 0 1-.56.56zm3.36 0h-2.24a.56.56 0 0 1-.56-.56c0-.309.252-.56.56-.56h2.24c.309 0 .56.251.56.56a.56.56 0 0 1-.56.56z"/></svg>);
const JiraIcon = React.memo(() => <svg xmlns="http://www.w3.org/2000/svg" width="2em" height="2em" viewBox="0 0 24 24" fill="currentColor"><path d="M21.6 4.81a2.88 2.88 0 0 0-4.07 0l-9.6 9.6a2.88 2.88 0 0 0 0 4.07l4.08 4.07a2.88 2.88 0 0 0 4.07 0l9.6-9.6a2.88 2.88 0 0 0 0-4.07zM12 18.33a.5.5 0 0 1-.35-.15l-4.08-4.07a.5.5 0 0 1 0-.7l9.6-9.6a.5.5 0 0 1 .7 0l4.08 4.07a.5.5 0 0 1 0 .7l-9.6 9.6a.5.5 0 0 1-.35.15z"/><path d="m11.19 12.81-4.07-4.08a2.88 2.88 0 0 0-4.07 0L.47 11.3a2.88 2.88 0 0 0 0 4.07l4.08 4.08a2.88 2.88 0 0 0 4.07 0l2.57-2.57zM5.67 15.17a.5.5 0 0 1-.35-.15l-4.08-4.07a.5.5 0 0 1 0-.7l2.58-2.58a.5.5 0 0 1 .7 0l4.08 4.08a.5.5 0 0 1 0 .7l-2.58 2.57a.5.5 0 0 1-.35.15z"/></svg>);
const AgileIcon = React.memo(() => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" width="1.5em" height="1.5em"><path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0011.667 0l3.181-3.183m-4.991-2.691L7.985 5.944m12.038 4.992l-3.182-3.182a8.25 8.25 0 00-11.667 0L2.985 15.944m11.666 0l3.182 3.182a8.25 8.25 0 001.167-1.167l3.181-3.182" /></svg>);
const BriefcaseIcon = React.memo(() => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" width="1.5em" height="1.5em"><path strokeLinecap="round" strokeLinejoin="round" d="M20.25 14.15v4.075c0 1.313-.972 2.4-2.215 2.541-1.42.164-2.6-.948-2.6-2.37v-4.075m0-3.35V6.3a2.25 2.25 0 012.25-2.25h1.5A2.25 2.25 0 0121 6.3v4.5m-3.75 0h-10.5a2.25 2.25 0 00-2.25 2.25v4.075c0 1.313.972 2.4 2.215 2.541-1.42.164 2.6-.948-2.6-2.37v-4.075m10.5 0v-4.5a2.25 2.25 0 00-2.25-2.25h-1.5a2.25 2.25 0 00-2.25 2.25v4.5" /></svg>);


// --- Dynamic Icon Mapping ---
const iconMap = {
  PythonIcon: <SiPython className="w-6 h-6" />,
  JSIcon: <SiJavascript className="w-6 h-6" />,
  ReactIcon: <SiReact className="w-6 h-6" />,
  TailwindIcon: <SiTailwindcss className="w-6 h-6" />, 
  GitIcon: <BsGithub className="w-6 h-6" />,
  BootstrapIcon: <BsBootstrap className="w-6 h-6" />, 
  DockerIcon: <SiDocker className="w-6 h-6" />,
  JiraIcon: <SiJira className="w-6 h-6" />,
  CodeIcon: <CodeIcon className="w-6 h-6" />,
  PencilRulerIcon: <PencilRulerIcon className="w-6 h-6" />,
  MobileIcon: <MobileIcon className="w-6 h-6" />,
  AgileIcon: <AgileIcon className="w-6 h-6" />,
  ShieldIcon: <ShieldIcon className="w-6 h-6" />,
  BriefcaseIcon: <BriefcaseIcon className="w-6 h-6" />,
};



const skillCategories = ['All', 'Technology', 'Methodology', 'Leadership'];

// ---     Custom hook to check screen size ---
const useMediaQuery = (query) => {
  const [matches, setMatches] = useState(false);
  useEffect(() => {
    // Ensure window is defined (for safety, e.g., in SSR)
    if (typeof window === 'undefined') return;

    const media = window.matchMedia(query);
    const listener = () => setMatches(media.matches);
    
    // Call listener once to set initial state
    listener();
    
    // Add change listener
    media.addEventListener('change', listener);
    
    // Cleanup
    return () => media.removeEventListener('change', listener);
  }, [query]); // Re-run effect if query string changes
  return matches;
};


// --- Reusable UI Component: 3D Interactive SkillCard ---
// --- THIS IS THE MODIFIED COMPONENT ---
const SkillCard = React.memo(({ skill, isVisible, index }) => {
  const cardRef = useRef(null);
  const [style, setStyle] = useState({
    transform: 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)',
    background: 'transparent'
  });
  // --- 1. ADD STATE ---
  const [isExpanded, setIsExpanded] = useState(false); // <--- ADDED

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;

    const maxTilt = 12; // Max tilt angle
    const rotateY = (x / (rect.width / 2)) * maxTilt;
    const rotateX = -(y / (rect.height / 2)) * maxTilt;

    setStyle({
      transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.05)`,
      background: `radial-gradient(circle at ${x + rect.width / 2}px ${y + rect.height / 2}px, rgba(255, 255, 255, 0.1), transparent 50%)`
    });
  };

  const handleMouseLeave = () => {
    setStyle({
      transform: 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)',
      background: 'transparent'
    });
    // Optional: auto-collapse on mouse leave
    // setIsExpanded(false); 
  };

  // --- 2. ADD CLICK HANDLER ---
  const toggleExpand = () => { // <--- ADDED
    setIsExpanded(prev => !prev);
  };

  // Animate bar width when it becomes visible
  const barStyle = {
    backgroundColor: skill.color,
    width: isVisible ? `${skill.level}%` : '0%',
    boxShadow: `0 0 12px ${skill.color}60`
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={toggleExpand} // <--- ADDED
      className="transition-all duration-500 ease-out cursor-pointer" // <--- MODIFIED: Added cursor-pointer
      style={{
        transitionDelay: `${isVisible ? index * 100 : 0}ms`,
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
        transformStyle: 'preserve-3d' // Enable 3D space
      }}
    >
      <div
        className="h-full bg-neutral-900/70 backdrop-blur-sm border border-neutral-800 rounded-xl p-5 flex flex-col overflow-hidden relative" // overflow-hidden is important for animation
        style={{ transition: 'transform 0.1s ease-out', transform: style.transform }}
      >
        {/* Dynamic mouse-follow glow */}
        <div
          className="absolute inset-0 transition-all duration-100 ease-out"
          style={{ background: style.background }}
        />

        {/* Content: Added flex-grow to push progress bar to bottom */}
        <div className="relative z-10 flex-grow">
          <div className="flex items-center gap-3 mb-3">
            <span style={{ color: skill.color }} className="text-2xl">{iconMap[skill.icon]}</span>
            <span className="text-xl font-semibold text-white">{skill.name}</span>
          </div>
          {/* --- 3. UPDATE STYLES --- */}
          <p className={`
            text-sm text-gray-400 mb-4
            transition-all duration-300 ease-in-out
            ${isExpanded 
              ? 'max-h-40 whitespace-normal' // Expands to show text, which will wrap
              : 'max-h-5 truncate'          // Collapsed (uses max-h-5 which is 1.25rem, same as h-5)
            }
          `}>
            {skill.description}
          </p>
        </div>

        {/* Progress Bar */}
        <div className="relative z-10">
          <div className="flex justify-between items-center mb-1 text-sm">
            <span className="text-gray-300">{skill.category}</span>
            <span className="font-medium" style={{ color: skill.color }}>{skill.level}%</span>
          </div>
          <div className="w-full bg-neutral-700/50 rounded-full h-1.5 overflow-hidden">
            <div
              className="h-1.5 rounded-full transition-all ease-out duration-1000"
              style={barStyle}
              role="progressbar"
              aria-valuenow={skill.level}
              aria-valuemin="0"
              aria-valuemax="100"
              aria-label={`${skill.name} skill level`}
            />
          </div>
        </div>
      </div>
    </div>
  );
});

// --- Reusable UI Component: 3D Interactive ToolCard ---
const ToolCard = React.memo(({ tool }) => {
  const cardRef = useRef(null);
  const [style, setStyle] = useState({
    transform: 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)',
    background: 'transparent'
  });

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;

    const maxTilt = 15;
    const rotateY = (x / (rect.width / 2)) * maxTilt;
    const rotateX = -(y / (rect.height / 2)) * maxTilt;

    setStyle({
      transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.1)`,
      background: `radial-gradient(circle at ${x + rect.width / 2}px ${y + rect.height / 2}px, rgba(255, 255, 255, 0.1), transparent 50%)`
    });
  };

  const handleMouseLeave = () => {
    setStyle({
      transform: 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)',
      background: 'transparent'
    });
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="group flex flex-col items-center gap-3 text-gray-500 cursor-pointer"
      style={{ transformStyle: 'preserve-3d' }}
    >
      <div
        className="w-20 h-20 bg-neutral-900 border border-neutral-800 rounded-xl flex items-center justify-center transition-all duration-300 relative overflow-hidden"
        style={{ transition: 'transform 0.1s ease-out', transform: style.transform }}
      >
        <div
          className="absolute inset-0 transition-all duration-100 ease-out"
          style={{ background: style.background }}
        />
        <div className="text-4xl text-gray-400 transition-colors group-hover:text-white relative z-10">
          {iconMap[tool.icon]}
        </div>
      </div>
      <span className="text-sm font-semibold tracking-wide transition-colors group-hover:text-white">{tool.name}</span>
    </div>
  );
});

const Skills = () => {
    // Hybrid Data Strategy: Init with mock, update with API
    const [skills, setSkills] = useState(mockSkills);
    const [tools, setTools] = useState(mockTools);

    useEffect(() => {
        const fetchSkills = async () => {
            try {
                const [skillsRes, toolsRes] = await Promise.all([
                    Api.get('/skills'),
                    Api.get('/tools')
                ]);
                if (skillsRes.data) setSkills(skillsRes.data);
                if (toolsRes.data) setTools(toolsRes.data);
            } catch (err) {
                console.error("Failed to fetch fresh skills data", err);
            }
        };
        fetchSkills();
    }, []);
    // const [error, setError] = useState(null); // Removed error state

    const [isVisible, setIsVisible] = useState(false);
    const [activeCategory, setActiveCategory] = useState('All');
    const sectionRef = useRef(null);

    // ---     State for "Show More" on mobile ---
    const [showAllSkills, setShowAllSkills] = useState(false);
    // ---     Check if we are on a mobile screen ---
    const isMobile = useMediaQuery('(max-width: 640px)'); // Tailwind's 'sm' breakpoint

    // Data fetching removed - using static data

    // Intersection Observer for animations
    useEffect(() => {
        const observer = new IntersectionObserver(([entry]) => {
            if (entry.isIntersecting) {
                setIsVisible(true);
                observer.unobserve(entry.target);
            }
        }, { threshold: 0.1 });
        const currentRef = sectionRef.current;
        if (currentRef) observer.observe(currentRef);
        return () => { if (currentRef) observer.unobserve(currentRef) };
    }, []);

    // Memoized filtering
    const filteredSkills = useMemo(() =>
        activeCategory === 'All' ? skills : skills.filter(skill => skill.category === activeCategory),
        [activeCategory, skills]
    );

    // ---     Memoized list of skills to display ---
    // On desktop (isMobile=false), or if "Show All" is clicked, show all.
    // On mobile (isMobile=true) and "Show All" is false, show 3.
    const skillsToShow = useMemo(() => {
      if (!isMobile || showAllSkills) {
        return filteredSkills;
      }
      return filteredSkills.slice(0, 3);
    }, [filteredSkills, isMobile, showAllSkills]);

    // ---     Reset showAllSkills when category changes ---
    useEffect(() => {
      setShowAllSkills(false);
    }, [activeCategory]);


    return (
        <section 
          id="skills" 
          ref={sectionRef} 
          className="py-24 sm:py-32 bg-black text-gray-200 relative overflow-hidden font-sans"
        >
            {/* Static "spotlight" background */}
            <div 
              className="absolute inset-x-0 -top-40 z-0 opacity-20" 
              style={{
                background: 'radial-gradient(ellipse at top, rgba(100, 180, 255, 0.15) 0%, transparent 50%)'
              }}
            />
            
            <div className="container mx-auto px-4 max-w-7xl relative z-10">
                <div className="text-center mb-16">
                    <h2 className="text-5xl md:text-6xl font-extrabold mb-4">
                        <span className="bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400">Core Competencies</span>
                    </h2>

                </div>

                {/* Category Filters */}
                <div className="flex flex-wrap justify-center gap-3 md:gap-4 mb-14">
                    {skillCategories.map(category => (
                        <button key={category} data-category={category} onClick={(e) => setActiveCategory(e.currentTarget.dataset.category)} className={`px-6 py-2 text-base font-medium rounded-md transition-all duration-300 border ${activeCategory === category ? 'bg-white text-black border-white' : 'bg-transparent border-gray-700 text-gray-400 hover:border-gray-500 hover:text-white'}`}>
                            {category}
                        </button>
                    ))}
                </div>

                {/* --- 3D SKILL GRID --- */}
                {/* --- MODIFIED: Now maps over 'skillsToShow' --- */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {skillsToShow.map((skill, index) => (
                        <SkillCard 
                          key={skill.id || skill.name} 
                          skill={skill} 
                          isVisible={isVisible} 
                          index={index} 
                        />
                    ))}
                </div>

                {/* ---   "Show More" Button for Mobile --- */}
                {isMobile && filteredSkills.length > 3 && (
                  <div className="mt-12 text-center">
                    <button
                      onClick={() => setShowAllSkills(!showAllSkills)}
                      className="px-6 py-3 rounded border font-medium transition-all duration-300 bg-white/5 border-gray-700 text-gray-300 hover:bg-white/10 hover:border-gray-500"
                    >
                      {showAllSkills ? 'Show Less' : 'Show More Skills'}
                    </button>
                  </div>
                )}


                {/* --- 3D Toolkit Section --- */}
                <div className="mt-28 text-center">
                    <h3 className="text-4xl font-bold mb-12 text-gray-400">Toolkit</h3>
                    <div className="flex flex-wrap justify-center items-center gap-x-8 gap-y-8 max-w-4xl mx-auto">
                        {tools.map(tool => (
                            <ToolCard key={tool.name} tool={tool} />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Skills;