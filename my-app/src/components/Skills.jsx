import React, { useEffect, useState, useRef, useMemo, useCallback } from 'react';
import axios from 'axios';

// --- Memoized SVG Icons (Executive Theme) ---
// Icons are memoized to prevent re-renders. The selection is curated for a professional portfolio.
const PythonIcon = React.memo(() => <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="1.5em" height="1.5em"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.24 14.76c-.49.49-1.28.49-1.77 0l-2.01-2.01-2.01 2.01c-.49.49-1.28.49-1.77 0s-.49-1.28 0-1.77l2.01-2.01-2.01-2.01c-.49-.49-.49-1.28 0-1.77s1.28-.49 1.77 0l2.01 2.01 2.01-2.01c.49-.49 1.28-.49 1.77 0s.49 1.28 0 1.77l-2.01 2.01 2.01 2.01c.48.49.48 1.28-.01 1.77z"/></svg>);
const JSIcon = React.memo(() => <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="1.5em" height="1.5em"><path d="M0 0h24v24H0z" fill="none"/><path d="M13 1.07V9h7c0-4.08-3.05-7.44-7-7.93zM4 15c0 4.42 3.58 8 8 8s8-3.58 8-8v-4H4v4zm7-13.93C7.05 1.56 4 4.92 4 9h7V1.07z"/></svg>);
const ReactIcon = React.memo(() => <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" fill="currentColor" width="1.5em" height="1.5em"><path d="M416 32H96C51.63 32 16 67.63 16 112v288c0 44.37 35.63 80 80 80h320c44.37 0 80-35.63 80-80V112C496 67.63 460.4 32 416 32zM256 256c-44.13 0-80-35.88-80-80s35.87-80 80-80 80 35.88 80 80-35.87 80-80 80z"/></svg>);
const ShieldIcon = React.memo(() => <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="1.5em" height="1.5em"><path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm0 10.99h7c-.53 4.12-3.28 7.79-7 8.94V12H5V6.3l7-3.11v8.8z"/></svg>);
const MobileIcon = React.memo(() => <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="1.5em" height="1.5em"><path d="M17 1.01L7 1c-1.1 0-2 .9-2 2v18c0 1.1.9 2 2 2h10c1.1 0 2-.9 2-2V3c0-1.1-.9-1.99-2-1.99zM17 19H7V5h10v14z"/></svg>);
const CodeIcon = React.memo(() => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" width="2em" height="2em"><path strokeLinecap="round" strokeLinejoin="round" d="M17.25 6.75L22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3l-4.5 16.5" /></svg>);
const PencilRulerIcon = React.memo(() => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" width="1.5em" height="1.5em"><path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" /></svg>);
const GitIcon = React.memo(() => <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="2em" height="2em"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm3.6 13.6c-.4.4-.99.55-1.5.4l-1.7-1.7v3.2c0 .55-.45 1-1 1s-1-.45-1-1v-3.2l-1.7 1.7c-.5.15-1.1-.01-1.5-.4-.4-.4-.55-.99-.4-1.5l3.6-10.8c.15-.45.55-.75 1-.75s.85.3 1 .75l3.6 10.8c.15.51-.01 1.1-.4 1.5z"/></svg>);
const DatabaseIcon = React.memo(() => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" width="2em" height="2em"><path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l7.5-7.5 7.5 7.5M4.5 18.75l7.5-7.5 7.5 7.5" /></svg>);
const TailwindIcon = React.memo(() => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" width="2em" height="2em"><path strokeLinecap="round" strokeLinejoin="round" d="M9 17.25v-.375c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v.375m-3.75 0h3.75M12 15.75v2.25" /></svg>);
const BriefcaseIcon = React.memo(() => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" width="1.5em" height="1.5em"><path strokeLinecap="round" strokeLinejoin="round" d="M20.25 14.15v4.075c0 1.313-.972 2.4-2.215 2.541-1.42.164-2.6-.948-2.6-2.37v-4.075m0-3.35V6.3a2.25 2.25 0 012.25-2.25h1.5A2.25 2.25 0 0121 6.3v4.5m-3.75 0h-10.5a2.25 2.25 0 00-2.25 2.25v4.075c0 1.313.972 2.4 2.215 2.541 1.42.164 2.6-.948-2.6-2.37v-4.075m10.5 0v-4.5a2.25 2.25 0 00-2.25-2.25h-1.5a2.25 2.25 0 00-2.25 2.25v4.5" /></svg>);
const AgileIcon = React.memo(() => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" width="1.5em" height="1.5em"><path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0011.667 0l3.181-3.183m-4.991-2.691L7.985 5.944m12.038 4.992l-3.182-3.182a8.25 8.25 0 00-11.667 0L2.985 15.944m11.666 0l3.182 3.182a8.25 8.25 0 001.167-1.167l3.181-3.182" /></svg>);
const DockerIcon = React.memo(() => <svg xmlns="http://www.w3.org/2000/svg" width="2em" height="2em" viewBox="0 0 24 24" fill="currentColor"><path d="M22.122 13.129c-.139-.212-.547-.852-.547-.852l-2.481-3.922c-.001 0-.306-1.12-1.353-1.12H1.936c-1.047 0-1.282 1.12-1.282 1.12L0 12.277v.852s.408.64.547.851l2.481 3.922s.306 1.12 1.353 1.12h14.328c1.047 0 1.282-1.12 1.282-1.12l.608-.962.035-.054.437-.692.001-.001.546-.865.547-.865zM7.52 12.338a.56.56 0 0 1-.56-.56c0-.308.251-.56.56-.56s.559.252.559.56c0 .309-.25.56-.559.56zm2.8 0a.56.56 0 0 1-.56-.56c0-.308.252-.56.56-.56s.56.252.56.56c0 .309-.252.56-.56.56zm2.799 0a.56.56 0 0 1-.56-.56c0-.308.252-.56.56-.56s.56.252.56.56a.56.56 0 0 1-.56.56zm2.8 0a.56.56 0 0 1-.56-.56c0-.308.252-.56.56-.56s.56.252.56.56a.56.56 0 0 1-.56.56zm2.799 0a.56.56 0 0 1-.56-.56c0-.308.251-.56.56-.56s.559.252.559.56c0 .309-.25.56-.559.56zm-3.36-2.8h-2.24a.56.56 0 0 1-.56-.56c0-.309.252-.56.56-.56h2.24c.309 0 .56.251.56.56a.56.56 0 0 1-.56.56zm3.36 0h-2.24a.56.56 0 0 1-.56-.56c0-.309.252-.56.56-.56h2.24c.309 0 .56.251.56.56a.56.56 0 0 1-.56.56z"/></svg>);
const JiraIcon = React.memo(() => <svg xmlns="http://www.w3.org/2000/svg" width="2em" height="2em" viewBox="0 0 24 24" fill="currentColor"><path d="M21.6 4.81a2.88 2.88 0 0 0-4.07 0l-9.6 9.6a2.88 2.88 0 0 0 0 4.07l4.08 4.07a2.88 2.88 0 0 0 4.07 0l9.6-9.6a2.88 2.88 0 0 0 0-4.07zM12 18.33a.5.5 0 0 1-.35-.15l-4.08-4.07a.5.5 0 0 1 0-.7l9.6-9.6a.5.5 0 0 1 .7 0l4.08 4.07a.5.5 0 0 1 0 .7l-9.6 9.6a.5.5 0 0 1-.35.15z"/><path d="m11.19 12.81-4.07-4.08a2.88 2.88 0 0 0-4.07 0L.47 11.3a2.88 2.88 0 0 0 0 4.07l4.08 4.08a2.88 2.88 0 0 0 4.07 0l2.57-2.57zM5.67 15.17a.5.5 0 0 1-.35-.15l-4.08-4.07a.5.5 0 0 1 0-.7l2.58-2.58a.5.5 0 0 1 .7 0l4.08 4.08a.5.5 0 0 1 0 .7l-2.58 2.57a.5.5 0 0 1-.35.15z"/></svg>);


// --- Dynamic Icon Mapping ---
// Maps icon names from the database to the actual React components.
const iconMap = {
    PythonIcon: <PythonIcon />, JSIcon: <JSIcon />, ReactIcon: <ReactIcon />,
    ShieldIcon: <ShieldIcon />, MobileIcon: <MobileIcon />, CodeIcon: <CodeIcon />,
    PencilRulerIcon: <PencilRulerIcon />, GitIcon: <GitIcon />, DatabaseIcon: <DatabaseIcon />,
    TailwindIcon: <TailwindIcon />, BriefcaseIcon: <BriefcaseIcon />, AgileIcon: <AgileIcon />,
    DockerIcon: <DockerIcon />, JiraIcon: <JiraIcon />,
};

// --- Fallback Data (Initial State) ---
// This data is shown immediately on page load and if the API call fails.
const fallbackSkills =  [
    { "id": 1, "name": "Django", "level": 95, "category": "Technology", "color": "#44B78B", "icon": "PythonIcon" },
    { "id": 2, "name": "JavaScript", "level": 90, "category": "Technology", "color": "#F7DF1E", "icon": "JSIcon" },
    { "id": 3, "name": "React", "level": 90, "category": "Technology", "color": "#61DAFB", "icon": "ReactIcon" },
    { "id": 4, "name": "Flutter", "level": 80, "category": "Technology", "color": "#027DFD", "icon": "MobileIcon" },
    { "id": 5, "name": "Agile Dev", "level": 95, "category": "Methodology", "color": "#F05032", "icon": "AgileIcon" },
    { "id": 6, "name": "Cybersecurity", "level": 85, "category": "Methodology", "color": "#00A86B", "icon": "ShieldIcon" },
    { "id": 7, "name": "Team Leadership", "level": 98, "category": "Leadership", "color": "#A855F7", "icon": "BriefcaseIcon" },
    { "id": 8, "name": "Strategic Planning", "level": 92, "category": "Leadership", "color": "#EC4899", "icon": "PencilRulerIcon" }
  ];
const fallbackTools = [
    { name: 'VS Code', icon: "CodeIcon" }, { name: 'Docker', icon: "DockerIcon" },
    { name: 'Git', icon: "GitIcon" }, { name: 'Jira', icon: "JiraIcon" },
];

const skillCategories = ['All', 'Technology', 'Methodology', 'Leadership'];

// --- Reusable UI Components ---
const RadialProgressBar = React.memo(({ level, color }) => {
    const radius = 50;
    const stroke = 6;
    const normalizedRadius = radius - stroke * 2;
    const circumference = normalizedRadius * 2 * Math.PI;
    const strokeDashoffset = circumference - (level / 100) * circumference;

    return (
        <div className="relative w-32 h-32">
            <svg height="100%" width="100%" viewBox="0 0 120 120">
                <circle stroke="#262626" fill="transparent" strokeWidth={stroke} r={normalizedRadius} cx={radius + 10} cy={radius + 10} />
                <circle
                    stroke={color}
                    fill="transparent"
                    strokeWidth={stroke}
                    strokeDasharray={`${circumference} ${circumference}`}
                    style={{ strokeDashoffset, strokeLinecap: 'round' }}
                    transform={`rotate(-90 ${radius + 10} ${radius + 10})`}
                    r={normalizedRadius}
                    cx={radius + 10}
                    cy={radius + 10}
                    className="transition-all duration-[2s] ease-in-out"
                />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-3xl font-bold" style={{ color }}>{level}<span className="text-xl">%</span></span>
            </div>
        </div>
    );
});

const SkillCard = React.memo(({ skill, isVisible }) => {
    const level = isVisible ? skill.level : 0;
    const cardStyle = {
        '--glow-color': skill.color,
        '--glow-opacity': '0.2',
        '--glow-blur': '16px'
    };
    return (
        <div style={cardStyle} className="bg-neutral-900/70 backdrop-blur-md border border-neutral-800 rounded-2xl p-6 flex flex-col items-center justify-between gap-4 transition-all duration-300 group hover:bg-neutral-900 hover:border-neutral-700 hover:-translate-y-2 hover:shadow-[0_0_var(--glow-blur)_var(--glow-color)]">
            <div className="flex items-center justify-center gap-4 text-white text-2xl font-semibold">
                <div className="transition-transform duration-300 group-hover:scale-110" style={{ color: skill.color }}>{iconMap[skill.icon]}</div>
                <h3>{skill.name}</h3>
            </div>
            <RadialProgressBar level={level} color={skill.color} />
            <span className="text-sm text-gray-500 font-medium tracking-wider uppercase">{skill.category}</span>
        </div>
    );
});

// --- Main Skills Component ---
const Skills = () => {
    const [skills, setSkills] = useState(fallbackSkills);
    const [tools, setTools] = useState(fallbackTools);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    const [isVisible, setIsVisible] = useState(false);
    const [activeCategory, setActiveCategory] = useState('All');
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const sectionRef = useRef(null);
    const API_URL = 'http://localhost:5000';

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [skillsRes, toolsRes] = await Promise.all([
                    axios.get(`${API_URL}/skills`),
                    axios.get(`${API_URL}/tools`)
                ]);
                setSkills(skillsRes.data);
                setTools(toolsRes.data);
            } catch (err) {
                console.error("API Error: ", err.message);
                setError("Could not load live data. Displaying default content.");
            } finally {
                setIsLoading(false);
            }
        };
        fetchData();
    }, []);

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

    const handleMouseMove = useCallback((e) => {
        if (sectionRef.current) {
            const rect = sectionRef.current.getBoundingClientRect();
            setMousePosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
        }
    }, []);

    const filteredSkills = useMemo(() =>
        activeCategory === 'All' ? skills : skills.filter(skill => skill.category === activeCategory),
        [activeCategory, skills]
    );

    return (
        <section id="skills" ref={sectionRef} onMouseMove={handleMouseMove} className="py-24 sm:py-32 bg-black text-gray-200 relative overflow-hidden font-sans">
            <div className="absolute inset-0 transition-all duration-300 z-0" style={{ background: `radial-gradient(800px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(255, 255, 255, 0.04), transparent 80%)` }}></div>
            <div className="container mx-auto px-4 max-w-7xl relative z-10">
                <div className="text-center mb-16">
                    <h2 className="text-5xl md:text-6xl font-extrabold mb-4">
                        <span className="bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400">Core Competencies</span>
                    </h2>
                    {error && <p className="text-yellow-500 mt-4 bg-yellow-900/20 border border-yellow-800 rounded-md py-2 px-4 inline-block">{error}</p>}
                </div>

                <div className="flex flex-wrap justify-center gap-3 md:gap-4 mb-14">
                    {skillCategories.map(category => (
                        <button key={category} data-category={category} onClick={(e) => setActiveCategory(e.currentTarget.dataset.category)} className={`px-6 py-2 text-base font-medium rounded-md transition-all duration-300 border ${activeCategory === category ? 'bg-white text-black border-white' : 'bg-transparent border-gray-700 text-gray-400 hover:border-gray-500 hover:text-white'}`}>
                            {category}
                        </button>
                    ))}
                </div>

                {isLoading ? (
                    <div className="text-center text-gray-400">Loading live data...</div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                        {filteredSkills.map((skill, index) => (
                            <div key={skill.id || skill.name} className="transition-all duration-700 ease-out" style={{ transitionDelay: `${isVisible ? index * 120 : 0}ms`, opacity: isVisible ? 1 : 0, transform: isVisible ? 'translateY(0) scale(1)' : 'translateY(20px) scale(0.95)' }}>
                                <SkillCard skill={skill} isVisible={isVisible} />
                            </div>
                        ))}
                    </div>
                )}

                <div className="mt-28 text-center">
                    <h3 className="text-4xl font-bold mb-12 text-gray-400">Toolkit</h3>
                    <div className="flex flex-wrap justify-center items-center gap-x-6 gap-y-6 max-w-4xl mx-auto">
                        {tools.map(tool => (
                            <div key={tool.name} className="group flex flex-col items-center gap-3 text-gray-500 transition-all duration-300 cursor-pointer">
                                <div className="w-16 h-16 bg-neutral-900 border border-neutral-800 rounded-xl flex items-center justify-center transition-all duration-300 group-hover:bg-neutral-800 group-hover:border-neutral-700 group-hover:scale-105">
                                    <div className="text-4xl text-gray-400 transition-colors group-hover:text-white">{iconMap[tool.icon]}</div>
                                </div>
                                <span className="text-sm font-semibold tracking-wide transition-colors group-hover:text-white">{tool.name}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Skills;