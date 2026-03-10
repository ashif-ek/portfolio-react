import React, { useState, useEffect } from 'react';

const RedirectModal = () => {
  const [countdown, setCountdown] = useState(10);
  const [isVisible, setIsVisible] = useState(true);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (isPaused || !isVisible) return;

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
  }, [isPaused, isVisible]);

  const handleRedirect = () => {
    const currentPath = window.location.pathname + window.location.search + window.location.hash;
    window.location.replace(`https://ashifek.in${currentPath}`);
  };

  const handleClose = () => {
    setIsVisible(false);
    setIsPaused(true);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-[10000] flex items-center justify-center p-4 bg-black/70 backdrop-blur-md animate-in fade-in duration-500">
      <div className="relative w-full max-w-md overflow-hidden bg-[#1a1a1a]/80 border border-white/10 backdrop-blur-2xl rounded-[2.5rem] shadow-2xl animate-in zoom-in-95 duration-500">
        
        {/* Close Button */}
        <button 
          onClick={handleClose}
          className="absolute top-6 right-6 p-2 rounded-full bg-white/5 text-white/40 hover:bg-white/10 hover:text-white transition-all duration-300 z-10"
          aria-label="Close"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Decorative background elements */}
        <div className="absolute top-0 left-0 w-40 h-40 bg-blue-600/20 rounded-full blur-[80px] -translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 right-0 w-40 h-40 bg-indigo-600/20 rounded-full blur-[80px] translate-x-1/2 translate-y-1/2"></div>
        
        <div className="relative p-10 text-center">
          <div className="inline-flex items-center justify-center w-24 h-24 mb-8 rounded-3xl bg-gradient-to-br from-blue-500 to-indigo-600 text-white shadow-2xl shadow-blue-500/20 animate-bounce-subtle">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-12 h-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
          
          <h2 className="text-3xl font-extrabold text-white mb-3 tracking-tight">We've Migrated!</h2>
          <p className="text-white/60 mb-10 leading-relaxed text-lg">
            My portfolio has a brand new home at <span className="text-blue-400 font-semibold">ashifek.in</span> with a better experience for you.
          </p>
          
          <div className="flex flex-col gap-4">
            <button
              onClick={handleRedirect}
              className="group relative flex items-center justify-center gap-3 w-full py-4.5 bg-white text-indigo-700 font-bold rounded-2xl hover:bg-blue-50 transition-all duration-300 active:scale-[0.98] shadow-xl shadow-white/5 text-lg"
            >
              Take me to ashifek.in
              <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </button>
            
            <button
              onClick={handleClose}
              className="w-full py-3.5 bg-white/5 text-white/60 font-semibold rounded-2xl hover:bg-white/10 hover:text-white transition-all duration-300 active:scale-[0.98] border border-white/5"
            >
              Stay on this site
            </button>
            
            <div className="mt-4 text-sm text-white/30 font-medium flex items-center justify-center gap-2">
              <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></span>
              Redirecting automatically in <span className="text-blue-400 tabular-nums font-bold">{countdown}s</span>
            </div>
          </div>
        </div>
        
        {/* Progress bar at the bottom */}
        <div className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-blue-500 to-indigo-600 transition-all duration-1000 ease-linear shadow-[0_0_10px_rgba(59,130,246,0.5)]" style={{ width: `${(countdown / 10) * 100}%` }}></div>
      </div>
      
      <style>{`
        @keyframes bounce-subtle {
          0%, 100% { transform: translateY(0) scale(1); }
          50% { transform: translateY(-12px) scale(1.05); }
        }
        .animate-bounce-subtle {
          animation: bounce-subtle 3s ease-in-out infinite;
        }
        .py-4\.5 {
          padding-top: 1.125rem;
          padding-bottom: 1.125rem;
        }
      `}</style>
    </div>
  );
};

export default RedirectModal;
