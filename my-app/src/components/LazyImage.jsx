import { useState } from "react";

// This component is designed to fill its parent container.
// Size and shape (like rounded corners) should be defined by the parent.
const LazyImage = ({ src, alt, className = "" }) => {
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);
  const fallback =
    "https://placehold.co/800x400/1a1a1a/777?text=No+Image+Available";

  return (
    <div className="relative h-full w-full bg-gray-800/40">
      {/* --- Loading Spinner --- */}
      {!loaded && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-800/60">
          <div className="w-6 h-6 border-2 border-gray-500 border-t-transparent rounded-full animate-spin" />
        </div>
      )}

      {/* --- The Image --- */}
      <img
        loading="lazy"
        decoding="async"
        src={!error ? src : fallback}
        alt={alt}
        onError={() => setError(true)}
        onLoad={() => setLoaded(true)}
        className={`w-full h-full object-cover transition-opacity duration-700 ease-out ${
          loaded ? "opacity-100" : "opacity-0"
        } ${className}`} // Pass through any extra classes
      />
    </div>
  );
};

export default LazyImage;