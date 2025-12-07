import profile from "../assets/profile.jpg";
import { useState, useEffect, useRef, useMemo, useCallback } from "react";
import { about as mockAbout } from "../data/mockData";
import Api from './Api';
import LazyImage from "./LazyImage";

// Using requestAnimationFrame for smoother animations
const AnimatedCounter = ({ value, label }) => {
    const [count, setCount] = useState(0);
    const sectionRef = useRef(null);
    const animationFrameId = useRef(null);

    const animateValue = useCallback((start, end, duration) => {
        let startTimestamp = null;
        const step = (timestamp) => {
            if (!startTimestamp) startTimestamp = timestamp;
            const progress = Math.min((timestamp - startTimestamp) / duration, 1);
            const nextValue = Math.floor(progress * (end - start)) + start;
            setCount(nextValue);
            if (progress < 1) {
                animationFrameId.current = requestAnimationFrame(step);
            }
        };
        animationFrameId.current = requestAnimationFrame(step);
    }, []);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    animateValue(0, value, 2000);
                    observer.disconnect(); // Animate only once
                }
            },
            { threshold: 0.5 }
        );

        const currentRef = sectionRef.current;
        if (currentRef) {
            observer.observe(currentRef);
        }

        return () => {
            if (currentRef) {
                observer.unobserve(currentRef);
            }
            if (animationFrameId.current) {
                cancelAnimationFrame(animationFrameId.current);
            }
        };
    }, [value, animateValue]);

    return (
        <div ref={sectionRef} className="text-center">
            <p className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-500 mb-1">
                {count}+
            </p>
            <p className="text-sm text-gray-400 tracking-wider">{label}</p>
        </div>
    );
};

// Main About Component
const About = () => {
    const [activeTab, setActiveTab] = useState("introduction");
    const [cardStyle, setCardStyle] = useState({});
    const [typedText, setTypedText] = useState("");
    
    // Use hybrid data: init with mock, update from API
    const [aboutData, setAboutData] = useState(mockAbout[0]);

    useEffect(() => {
        Api.get('/about').then(res => {
            if (res.data && res.data.length > 0) setAboutData(res.data[0]);
        }).catch(err => console.error("Failed to fetch fresh about data", err));
    }, []);

    // Optimized Typing effect
    useEffect(() => {
        if (activeTab === "introduction") {
            if (typedText.length < aboutData.introduction.length) {
                const typingTimeout = setTimeout(() => {
                    setTypedText(aboutData.introduction.slice(0, typedText.length + 1));
                }, 50);
                return () => clearTimeout(typingTimeout);
            }
        }
    }, [typedText, activeTab, aboutData.introduction]);


    // Memoizing event handlers with useCallback
    const handleMouseMove = useCallback((e) => {
        const { currentTarget: el } = e;
        const { offsetWidth: width, offsetHeight: height } = el;
        const { clientX, clientY } = e;
        const rect = el.getBoundingClientRect();

        const x = (clientX - rect.left - width / 2) / 20;
        const y = (clientY - rect.top - height / 2) / 20;

        setCardStyle({
            transform: `perspective(1000px) rotateX(${-y}deg) rotateY(${x}deg) scale3d(1.05, 1.05, 1.05)`,
            transition: 'transform 0.1s ease-out'
        });
    }, []);

    const handleMouseLeave = useCallback(() => {
        setCardStyle({
            transform: "perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)",
            transition: 'transform 0.5s ease-out'
        });
    }, []);
    
    // Memoizing tab configuration
    const tabs = useMemo(() => ({
        introduction: {
            title: "Introduction",
            content: (
                <p className="text-gray-300 leading-relaxed min-h-[150px] md:min-h-[120px]">
                    {typedText}
                    <span
                        className="inline-block w-2 h-5 bg-cyan-400 animate-pulse ml-1"
                        aria-hidden="true"
                    ></span>
                </p>
            ),
        },
        experience: {
            title: "Experience",
            content: (
                <p className="text-gray-300 leading-relaxed min-h-[150px] md:min-h-[120px]">
                    {aboutData.experience}
                </p>
            ),
        },
        philosophy: {
            title: "Philosophy",
            content: (
                <p className="text-gray-300 leading-relaxed min-h-[150px] md:min-h-[120px]">
                    {aboutData.philosophy}
                </p>
            ),
        },
    }), [typedText, aboutData.experience, aboutData.philosophy]);

    const handleTabClick = useCallback((tab) => {
        setActiveTab(tab);
        if (tab === "introduction") {
            setTypedText(""); // Reset typing animation
        }
    }, []);


    return (
        <section
            id="about"
            className="py-16 md:py-24 bg-[#0d1117] text-gray-200 relative overflow-hidden"
        >
            {/* Gradient Blobs */}
            <div className="absolute top-0 -left-4 w-72 h-72 md:w-96 md:h-96 bg-purple-600/20 rounded-full filter blur-3xl animate-blob"></div>
            <div className="absolute top-0 -right-4 w-72 h-72 md:w-96 md:h-96 bg-cyan-600/20 rounded-full filter blur-3xl animate-blob animation-delay-2000"></div>
            <div className="absolute -bottom-8 left-20 w-72 h-72 md:w-96 md:h-96 bg-blue-600/20 rounded-full filter blur-3xl animate-blob animation-delay-4000"></div>

            <div className="container mx-auto px-4 max-w-5xl relative z-10">
                <div className="text-center mb-12 md:mb-16">
                    <h2 className="text-4xl md:text-5xl font-bold mb-4">
                        <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-500">
                            About Me
                        </span>
                    </h2>
                    <p className="text-gray-400 max-w-2xl mx-auto text-lg">
                        My journey, my skills, and my passion for development.
                    </p>
                </div>

                <div className="grid md:grid-cols-5 gap-8 md:gap-12 items-center">
                    {/* Profile Card */}
                    <div className="md:col-span-2 flex justify-center">
                        <div
                            className="w-64 h-80 rounded-2xl bg-gray-800/40 backdrop-blur-sm border border-gray-700/60 p-4"
                            style={cardStyle}
                            onMouseMove={handleMouseMove}
                            onMouseLeave={handleMouseLeave}
                        >
                            <LazyImage
                                src={profile}
                                alt="Profile"
                                className="w-full h-full object-cover rounded-lg shadow-2xl shadow-cyan-500/10"
                            />
                        </div>
                    </div>

                    {/* Content */}
                    <div className="md:col-span-3">
                        {/* Tab buttons */}
                        <div className="flex flex-wrap justify-center border-b border-gray-700 mb-6">
                            {Object.keys(tabs).map((tabKey) => (
                                <button
                                    key={tabKey}
                                    onClick={() => handleTabClick(tabKey)}
                                    className={`px-4 sm:px-6 py-3 font-medium text-sm transition-all duration-300 relative ${activeTab === tabKey
                                            ? "text-cyan-400"
                                            : "text-gray-400 hover:text-white"
                                        }`}
                                >
                                    {tabs[tabKey].title}
                                    {activeTab === tabKey && (
                                        <span className="absolute bottom-0 left-0 w-full h-0.5 bg-cyan-400"></span>
                                    )}
                                </button>
                            ))}
                        </div>

                        {/* Tab content */}
                        <div className="transition-opacity duration-500">
                            {tabs[activeTab].content}
                        </div>

                        {/* Stats */}
                         <div className="mt-8 pt-8 border-t border-gray-800 flex flex-col sm:flex-row sm:justify-around items-center gap-8">
                            <AnimatedCounter
                                value={aboutData.stats.projects}
                                label="Projects Completed"
                            />
                            <AnimatedCounter
                                value={aboutData.stats.certificates}
                                label="Certificates"
                            />
                            <AnimatedCounter
                                value={aboutData.stats.technologies}
                                label="Core Technologies"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default About;

