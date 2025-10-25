const LoadingSpinner = () => {
  return (
    <div className="flex items-center justify-center">
      <div className="flex space-x-2">
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            className="w-2.5 h-2.5 bg-blue-500 rounded-full"
            style={{
              animation: 'bounce 1.4s ease-in-out infinite',
              animationDelay: `${i * 0.16}s`
            }}
          />
        ))}
      </div>

      {/* ✅ just <style>, remove jsx */}
      <style>{`
        @keyframes bounce {
          0%, 80%, 100% { 
            transform: scale(0.8);
            opacity: 0.5;
          }
          40% { 
            transform: scale(1.2);
            opacity: 1;
          }
        }
      `}</style>
    </div>
  );
};

export default LoadingSpinner;
