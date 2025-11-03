// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion"; 

function ErrorFallback({ resetErrorBoundary }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      className="flex flex-col items-center justify-center min-h-[50vh] bg-gradient-to-r from-pink-50 via-white to-blue-50 p-10 rounded-2xl shadow-lg text-center"
    >
      {/* Animated Icon */}
      <motion.div
        animate={{ rotate: [0, 15, -15, 0] }}
        transition={{ repeat: Infinity, duration: 1.5 }}
        className="bg-red-100 text-red-600 w-20 h-20 flex items-center justify-center rounded-full mb-6"
      >
        <span className="text-3xl">⚠️</span>
      </motion.div>

      {/* Title */}
      <h2 className="text-2xl md:text-3xl font-bold text-red-700 mb-4">
        Oops! Something went wrong
      </h2>

      {/* Description */}
      <p className="text-gray-700 mb-6 max-w-md">
        This section failed to load. Click the button below to try again.
      </p>

      {/* Try Again Button */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={resetErrorBoundary}
        className="px-6 py-3 bg-red-600 text-white font-semibold rounded-xl shadow hover:bg-red-700 transition-all"
      >
       Try Again
      </motion.button>
    </motion.div>
  );
}

export default ErrorFallback;