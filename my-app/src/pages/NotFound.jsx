import React from 'react';

// --- Icon for the button ---
const HomeIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
  </svg>
);


// --- The 404 Not Found Page Component ---
function NotFoundPage() {
  return (
    <div className="min-h-screen bg-gray-900 text-white font-sans flex items-center justify-center p-4">
      {/* Background decorative elements matching the contact form style */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-cyan-500"></div>
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-blue-600 rounded-full filter blur-[150px] opacity-20 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-purple-600 rounded-full filter blur-[150px] opacity-20 animate-pulse animation-delay-4000"></div>
        <div className="absolute inset-0 opacity-10 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
      </div>

      <div className="relative z-10 text-center animate-fade-in-up">
        <h1 className="text-8xl md:text-9xl font-black bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-cyan-400 mb-2">
          404
        </h1>
        <p className="text-2xl md:text-3xl font-semibold text-gray-200 mb-4">
          Page Not Found
        </p>
        <p className="text-gray-400 max-w-sm mx-auto mb-8">
          Sorry, the page you are looking for doesn't exist or has been moved.
        </p>

        <a
          href="/" 
          onClick={(e) => { e.preventDefault(); alert('Redirecting to homepage...'); }} // Placeholder for actual routing
          className="inline-flex items-center justify-center py-3 px-8 rounded-lg text-white font-semibold transition-all duration-300 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 shadow-lg hover:shadow-blue-500/30 transform hover:-translate-y-0.5"
        >
          <HomeIcon />
          Go to Homepage
        </a>
      </div>

      <style>{`
        @keyframes fade-in-up {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in-up {
          animation: fade-in-up 0.7s ease-out forwards;
        }
        .animation-delay-4000 {
            animation-delay: 4s;
        }
      `}</style>
    </div>
  );
}

// Default export for the App
export default function App() {
  return <NotFoundPage />;
}

