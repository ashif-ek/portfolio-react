import React from 'react';

const MigrateBanner = () => {
  return (
    <div className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-3 px-4 text-center sticky top-0 z-[9999] shadow-lg animate-in fade-in slide-in-from-top duration-500">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-4 text-sm md:text-base font-medium">
        <span className="flex items-center gap-2">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
          </svg>
          This portfolio has moved to a new home
        </span>
        <a 
          href="https://ashifek.in" 
          className="bg-white text-blue-700 px-4 py-1.5 rounded-full font-bold hover:bg-blue-50 transition-colors duration-200 flex items-center gap-1 group"
        >
          Explore ashifek.in
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 group-hover:translate-x-0.5 transition-transform" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
        </a>
      </div>
    </div>
  );
};

export default MigrateBanner;
