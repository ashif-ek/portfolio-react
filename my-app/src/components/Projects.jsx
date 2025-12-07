import { useState, useEffect } from 'react';

// Import project images locally to ensure they are always available.
import project1 from '../assets/projects/project1.png';
import project2 from '../assets/projects/project2.jpg';
import project3 from '../assets/projects/project3.jpg';
import project4 from '../assets/projects/project4.jpg';
import { projects as mockProjects } from '../data/mockData';
import Api from './Api';
// import LoadingSpinner from './LoadingSpinner'; // No longer needed
import LazyImage from './LazyImage';

// Map project IDs to their imported image assets.
const projectImages = {
  1: project1,
  2: project2,
  3: project3,
  4: project4,
};




const Projects = () => {
  // --- State Management ---
  const [projects, setProjects] = useState(mockProjects); 

  // Hybrid fetch: Update with live data on mount
  useEffect(() => {
    Api.get('/projects')
      .then(res => setProjects(res.data))
      .catch(err => console.error("Failed to fetch fresh projects", err));
  }, []);

  // const [isLoading, setIsLoading] = useState(true); // <-- REMOVED
  // const [error, setError] = useState(null); // Removed error state
  const [animated, setAnimated] = useState(false);
  const [showAllProjects, setShowAllProjects] = useState(false);

  // --- Animation Trigger Effect ---
  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimated(true);
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  // --- Render Logic ---
  const renderContent = () => {
    // <-- The 'if (isLoading)' block was removed from here.
    // This function now renders the 'projects' state immediately.

    // Determine which projects to show
    const projectsToShow = showAllProjects ? projects : projects.slice(0, 2);

    return (
      <>
        <div className="grid md:grid-cols-2 gap-8">
          {projectsToShow.map((project, index) => (
            <div 
              key={project.id}
              className="group bg-gray-800/50 backdrop-blur-sm rounded-xl overflow-hidden border border-gray-700/30 hover:border-cyan-500/30 transition-all duration-500 hover:shadow-2xl hover:shadow-cyan-500/10"
              style={{ 
                transitionDelay: `${index * 100}ms`,
                opacity: animated ? 1 : 0,
                transform: animated ? 'translateY(0)' : 'translateY(20px)',
                transition: 'opacity 0.5s ease, transform 0.5s ease, border-color 0.3s ease, box-shadow 0.3s ease'
              }}
            >
              {/* Project image */}
              <div className="relative overflow-hidden h-48">
                <LazyImage
                  src={projectImages[project.id]} // Safely map ID to local image
                  alt={project.title}
                  className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                />
                <div 
                  className={`
                    absolute inset-0 bg-gradient-to-t from-black/80 to-transparent 
                    flex items-end justify-between p-4 transition-opacity duration-300
                    opacity-100 
                    md:opacity-0 md:group-hover:opacity-100 
                  `}
                >
                  <a href={project.link} target="_blank" rel="noopener noreferrer" className="px-4 py-2 bg-cyan-500 text-white rounded-lg text-sm font-medium hover:bg-cyan-600 transition-colors">
                    Live Demo
                  </a>
                  <a href={project.github} target="_blank" rel="noopener noreferrer" className="p-2 bg-gray-800/80 text-gray-300 rounded-lg hover:text-white transition-colors">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
                    </svg>
                  </a>
                </div>
              </div>
              
              {/* Project content */}
              <div className="p-6">
                <h3 className="text-xl font-bold text-white mb-2 group-hover:text-cyan-400 transition-colors">{project.title}</h3>
                <p className="text-gray-400 mb-4 leading-relaxed">{project.description}</p>
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span 
                      key={tag} 
                      className="px-3 py-1 bg-gray-700/50 text-cyan-300 rounded-full text-sm border border-cyan-500/20 hover:bg-cyan-500/20 hover:text-white transition-colors"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* --- Show More/Less Button --- */}
        {projects.length > 2 && (
          <div className="text-center mt-12">
            <button
              onClick={() => setShowAllProjects(!showAllProjects)}
              className="px-6 py-3 rounded border font-medium transition-all duration-300 bg-white/5 border-gray-700 text-gray-300 hover:bg-white/10 hover:border-gray-500"
            >
              {showAllProjects ? "Show Less" : "Show More"}
            </button>
          </div>
        )}
      </>
    );
  };

  return (
    <section id="projects" className="py-20 bg-gradient-to-br from-gray-900 to-black relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-20 -left-20 w-64 h-64 bg-blue-600 rounded-full filter blur-3xl opacity-10 animate-pulse-slow"></div>
        <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-purple-600 rounded-full filter blur-3xl opacity-10 animate-pulse-slower"></div>
      </div>
      
      {/* Grid pattern overlay */}
      <div className="absolute inset-0 opacity-10 bg-grid-pattern bg-center"></div>
      
      <div className="container mx-auto px-6 max-w-6xl relative z-10">
        <h2 className="text-4xl font-bold text-center mb-12 relative">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-cyan-400">
            My <span className="text-white">Projects</span>
          </span>
          <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-24 h-1 bg-gradient-to-r from-blue-600 to-cyan-500 rounded-full"></div>
        </h2>


        
        {/* Main Content: Projects Grid */}
        {/* This will render fallbackProjects immediately, then update with API data */}
        {renderContent()}
        
        {/* Call to action */}
        <div className="text-center mt-16">
          <p className="text-gray-400 mb-6">Interested in seeing more of my work?</p>
          <a 
            href="https://github.com/ashif-ek" 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-medium rounded-lg hover:shadow-2xl hover:shadow-cyan-500/20 transition-all duration-300 transform hover:-translate-y-1"
          >
            Visit my GitHub
            <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </a>
        </div>
      </div>
      
      {/* Kept the same styles */}
      <style>{`
        @keyframes pulse-slow {
          0%, 100% { opacity: 0.1; }
          50% { opacity: 0.15; }
        }
        @keyframes pulse-slower {
          0%, 100% { opacity: 0.05; }
          50% { opacity: 0.1; }
        }
        .animate-pulse-slow {
          animation: pulse-slow 6s ease-in-out infinite;
        }
        .animate-pulse-slower {
          animation: pulse-slower 8s ease-in-out infinite;
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

export default Projects;