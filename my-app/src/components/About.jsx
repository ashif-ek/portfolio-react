import { useState, useEffect, useRef } from 'react';
import profile from "../assets/profile.jpg";


// A simple animated counter for stats
const AnimatedCounter = ({ value, label }) => {
    const [count, setCount] = useState(0);
    const sectionRef = useRef(null);
    const hasAnimated = useRef(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting && !hasAnimated.current) {
                    hasAnimated.current = true;
                    let start = 0;
                    const end = value;
                    if (start === end) return;

                    const duration = 2000;
                    const incrementTime = (duration / end);
                    
                    const timer = setInterval(() => {
                        start += 1;
                        setCount(start);
                        if (start === end) clearInterval(timer);
                    }, incrementTime);
                }
            },
            { threshold: 0.5 }
        );

        if (sectionRef.current) {
            observer.observe(sectionRef.current);
        }

        return () => observer.disconnect();
    }, [value]);

    return (
        <div ref={sectionRef} className="text-center">
            <p className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-500 mb-1">
                {count}+
            </p>
            <p className="text-sm text-gray-400 tracking-wider">{label}</p>
        </div>
    );
};


// --- Main About Component ---

const About = () => {
    const [activeTab, setActiveTab] = useState('introduction');
    const [cardStyle, setCardStyle] = useState({});
    const [typedText, setTypedText] = useState('');
    const introText = "I’m a Computer Science graduate and passionate programmer, currently mastering JavaScript and React as a strong foundation for my ultimate goal of becoming highly proficient in Django.";

    // Typing effect for the introduction
    useEffect(() => {
        if (activeTab === 'introduction') {
            const typingTimeout = setTimeout(() => {
                if (typedText.length < introText.length) {
                    setTypedText(introText.slice(0, typedText.length + 1));
                }
            }, 50);
            return () => clearTimeout(typingTimeout);
        }
    }, [typedText, activeTab, introText]);
    
    // 3D Card mouse effect
    const handleMouseMove = (e) => {
        const { currentTarget: el } = e;
        const { offsetWidth: width, offsetHeight: height } = el;
        const { clientX, clientY } = e;

        const x = (clientX - el.getBoundingClientRect().left - width / 2) / 20;
        const y = (clientY - el.getBoundingClientRect().top - height / 2) / 20;

        setCardStyle({
            transform: `perspective(1000px) rotateX(${-y}deg) rotateY(${x}deg) scale3d(1.05, 1.05, 1.05)`,
        });
    };

    const handleMouseLeave = () => {
        setCardStyle({
            transform: 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)',
        });
    };

    const tabs = {
        introduction: {
            title: "Introduction",
            content: (
                <p className="text-gray-300 leading-relaxed min-h-[120px]">
                    {typedText}
                    <span className="inline-block w-2 h-5 bg-cyan-400 animate-pulse ml-1" aria-hidden="true"></span>
                </p>
            ),
        },
        experience: {
            title: "Experience",
            content: (
                 <p className="text-gray-300 leading-relaxed min-h-[120px]">
                    Through academic and personal projects, I’ve worked across diverse technologies. I have built cross-platform web and mobile applications using Django and Flutter, while also gaining experience with HTML, CSS, JavaScript, and React. My projects have strengthened not only my technical skills but also my understanding of core software principles like planning, problem-solving, and delivering a better user experience.
                 </p>
            ),
        },
        philosophy: {
            title: "Philosophy",
            content: (
                 <p className="text-gray-300 leading-relaxed min-h-[120px]">
                    Earlier, I was interested in cybersecurity, but after my final-year project, I realized that as developers, we have the power to change, contribute, and create a tangible impact on the world through technology. This drives my passion for building meaningful applications.
                 </p>
            ),
        },
    };

  return (
    <section id="about" className="py-24 bg-[#0d1117] text-gray-200 relative overflow-hidden">
        {/* Animated Gradient Blobs */}
        <div className="absolute top-0 -left-4 w-96 h-96 bg-purple-600/20 rounded-full filter blur-3xl animate-blob"></div>
        <div className="absolute top-0 -right-4 w-96 h-96 bg-cyan-600/20 rounded-full filter blur-3xl animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-20 w-96 h-96 bg-blue-600/20 rounded-full filter blur-3xl animate-blob animation-delay-4000"></div>

      <div className="container mx-auto px-4 max-w-5xl relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-500">
              About Me
            </span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg">
            My journey, my skills, and my passion for development.
          </p>
        </div>

        <div className="grid md:grid-cols-5 gap-12 items-center">
            {/* 3D Profile Card */}
            <div className="md:col-span-2 flex justify-center">
                <div 
                    className="w-64 h-80 rounded-2xl bg-gray-800/40 backdrop-blur-sm border border-gray-700/60 p-4 transition-transform duration-300 ease-out"
                    style={cardStyle}
                    onMouseMove={handleMouseMove}
                    onMouseLeave={handleMouseLeave}
                >
                    <img 
                        src={profile}
                        alt="Profile"
                        className="w-full h-full object-cover rounded-lg shadow-2xl shadow-cyan-500/10"
                    />
                </div>
            </div>

            {/* Content Section */}
            <div className="md:col-span-3">
                {/* Tab buttons */}
                <div className="flex border-b border-gray-700 mb-6">
                    {Object.keys(tabs).map(tab => (
                        <button 
                            key={tab}
                            onClick={() => {
                                setActiveTab(tab);
                                if(tab === 'introduction') setTypedText(''); // Reset typing animation
                            }}
                            className={`px-6 py-3 font-medium text-sm transition-all duration-300 relative ${activeTab === tab ? 'text-cyan-400' : 'text-gray-400 hover:text-white'}`}
                        >
                            {tabs[tab].title}
                            {activeTab === tab && <span className="absolute bottom-0 left-0 w-full h-0.5 bg-cyan-400"></span>}
                        </button>
                    ))}
                </div>

                {/* Tab content */}
                <div className="transition-opacity duration-500">
                    {tabs[activeTab].content}
                </div>

                {/* Animated Stats */}
                <div className="mt-8 pt-8 border-t border-gray-800 flex justify-around">
                    <AnimatedCounter value={10} label="Projects Completed" />
                    <AnimatedCounter value={4} label="Certificates" />
                    <AnimatedCounter value={5} label="Core Technologies" />
                </div>
            </div>
        </div>
      </div>
      <style>{`
        @keyframes blob {
	        0% { transform: translate(0px, 0px) scale(1); }
	        33% { transform: translate(30px, -50px) scale(1.1); }
	        66% { transform: translate(-20px, 20px) scale(0.9); }
	        100% { transform: translate(0px, 0px) scale(1); }
        }
        .animate-blob {
            animation: blob 7s infinite;
        }
        .animation-delay-2000 {
            animation-delay: 2s;
        }
        .animation-delay-4000 {
            animation-delay: 4s;
        }
      `}</style>
    </section>
  );
};

export default About;
