import React, { useState, useEffect } from 'react';

const RedirectModal = () => {
  const [countdown, setCountdown] = useState(5);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          handleRedirect();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const handleRedirect = () => {
    const currentPath = window.location.pathname + window.location.search + window.location.hash;
    window.location.replace(`https://ashifek.in${currentPath}`);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-[10000] flex items-center justify-center p-4 bg-black/60 backdrop-blur-md animate-in fade-in duration-500">
      <div className="relative w-full max-w-md overflow-hidden bg-white/10 border border-white/20 backdrop-blur-xl rounded-3xl shadow-2xl animate-in zoom-in-95 duration-500">
        {/* Decorative background elements */}
        <div className="absolute top-0 left-0 w-32 h-32 bg-blue-500/20 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 right-0 w-32 h-32 bg-indigo-500/20 rounded-full blur-3xl translate-x-1/2 translate-y-1/2"></div>
        
        <div className="relative p-8 text-center">
          <div className="inline-flex items-center justify-center w-20 h-20 mb-6 rounded-2xl bg-gradient-to-tr from-blue-600 to-indigo-600 text-white shadow-xl shadow-blue-500/30 animate-bounce-subtle">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
          
          <h2 className="text-3xl font-bold text-white mb-2 tracking-tight">We've Moved!</h2>
          <p className="text-blue-100/80 mb-8 leading-relaxed">
            My portfolio has a brand new home with a better experience for you.
          </p>
          
          <div className="flex flex-col gap-4">
            <button
              onClick={handleRedirect}
              className="group relative flex items-center justify-center gap-2 w-full py-4 bg-white text-indigo-700 font-bold rounded-2xl hover:bg-blue-50 transition-all duration-300 active:scale-[0.98] shadow-lg shadow-white/5"
            >
              Take me to ashifek.in
              <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </button>
            
            <div className="text-sm text-white/40 font-medium">
              Redirecting automatically in <span className="text-blue-400 tabular-nums">{countdown}s</span>...
            </div>
          </div>
        </div>
        
        {/* Progress bar at the bottom */}
        <div className="absolute bottom-0 left-0 h-1.5 bg-blue-500/50 transition-all duration-1000 ease-linear" style={{ width: `${(countdown / 5) * 100}%` }}></div>
      </div>
      
      <style>{`
        @keyframes bounce-subtle {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-8px); }
        }
        .animate-bounce-subtle {
          animation: bounce-subtle 3s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default RedirectModal;
