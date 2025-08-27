import { useRef, useState } from 'react';


const Contact = () => {
  const formRef = useRef();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setSubmitSuccess(true);
    formRef.current.reset();
    
    // Reset success message after 3 seconds
    setTimeout(() => {
      setSubmitSuccess(false);
      setIsSubmitting(false);
    }, 3000);
  };

  return (
    <section id="contact" className="py-20 bg-gray-900 relative overflow-hidden">
      {/* Microsoft-inspired background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-cyan-500"></div>
        <div className="absolute top-1/4 -right-20 w-64 h-64 bg-blue-600 rounded-full filter blur-[90px] opacity-20"></div>
        <div className="absolute bottom-1/3 -left-20 w-64 h-64 bg-purple-600 rounded-full filter blur-[90px] opacity-20"></div>
        
        {/* Grid overlay */}
        <div className="absolute inset-0 opacity-10 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
      </div>
      
      <div className="container mx-auto px-6 max-w-2xl relative z-10">
        <h2 className="text-4xl font-bold text-center mb-4">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-cyan-400 font-light">
            Get In <span className="font-semibold text-white">Touch</span>
          </span>
        </h2>
        
        <p className="text-gray-400 text-center mb-12 max-w-md mx-auto">
          Have a project in mind or want to discuss potential opportunities? Feel free to reach out.
        </p>
        
        {/* Success message */}
        {submitSuccess && (
          <div className="mb-6 p-4 bg-green-900/30 border border-green-700/50 rounded-lg text-green-400 text-center backdrop-blur-sm animate-fade-in">
            <svg className="w-6 h-6 inline-block mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
            </svg>
            Your message has been sent successfully!
          </div>
        )}
        
        <form 
          ref={formRef} 
          onSubmit={handleSubmit} 
          className="space-y-6 bg-gray-800/40 backdrop-blur-md p-8 rounded-xl border border-gray-700/50 shadow-xl"
        >
          <div className="relative">
            <label htmlFor="name" className="block mb-3 text-sm font-medium text-gray-300">
              Full Name
            </label>
            <div className="relative">
              <input
                type="text"
                id="name"
                required
                className="w-full px-4 py-3 bg-gray-700/40 border border-gray-600/50 rounded-lg text-white placeholder-gray-500 focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/70 outline-none transition-all duration-300"
                placeholder="Enter your full name"
              />
              <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-400 to-cyan-400 transition-all duration-300 group-hover:w-full"></div>
            </div>
          </div>
          
          <div className="relative">
            <label htmlFor="email" className="block mb-3 text-sm font-medium text-gray-300">
              Email Address
            </label>
            <div className="relative">
              <input
                type="email"
                id="email"
                required
                className="w-full px-4 py-3 bg-gray-700/40 border border-gray-600/50 rounded-lg text-white placeholder-gray-500 focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/70 outline-none transition-all duration-300"
                placeholder="Enter your email address"
              />
              <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-400 to-cyan-400 transition-all duration-300 group-hover:w-full"></div>
            </div>
          </div>
          
          <div className="relative">
            <label htmlFor="message" className="block mb-3 text-sm font-medium text-gray-300">
              Message
            </label>
            <div className="relative">
              <textarea
                id="message"
                rows="4"
                required
                className="w-full px-4 py-3 bg-gray-700/40 border border-gray-600/50 rounded-lg text-white placeholder-gray-500 focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/70 outline-none transition-all duration-300 resize-none"
                placeholder="Tell me about your project or inquiry..."
              ></textarea>
              <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-400 to-cyan-400 transition-all duration-300 group-hover:w-full"></div>
            </div>
          </div>
          
          <button
            type="submit"
            disabled={isSubmitting}
            className={`w-full py-3 px-6 rounded-lg transition-all duration-300 flex items-center justify-center
              ${isSubmitting 
                ? 'bg-blue-700/50 cursor-not-allowed' 
                : 'bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 shadow-lg hover:shadow-blue-500/20'}
            `}
          >
            {isSubmitting ? (
              <>
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Sending...
              </>
            ) : (
              <>
                Send Message
                <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                </svg>
              </>
            )}
          </button>
        </form>
        
        {/* Additional contact information */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
          <div className="p-4 bg-gray-800/40 backdrop-blur-md rounded-lg border border-gray-700/50">
            <div className="w-12 h-12 bg-blue-900/30 rounded-full flex items-center justify-center mx-auto mb-3">
              <svg className="w-6 h-6 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
              </svg>
            </div>
            <h3 className="text-white font-medium mb-1">Email</h3>
            <p className="text-gray-400 text-sm">ashifek11@example.com</p>
          </div>
          
          <div className="p-4 bg-gray-800/40 backdrop-blur-md rounded-lg border border-gray-700/50">
            <div className="w-12 h-12 bg-blue-900/30 rounded-full flex items-center justify-center mx-auto mb-3">
              <svg className="w-6 h-6 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path>
              </svg>
            </div>
            <h3 className="text-white font-medium mb-1">Phone</h3>
            <p className="text-gray-400 text-sm">+91 9037499763</p>
          </div>
          
          <div className="p-4 bg-gray-800/40 backdrop-blur-md rounded-lg border border-gray-700/50">
            <div className="w-12 h-12 bg-blue-900/30 rounded-full flex items-center justify-center mx-auto mb-3">
              <svg className="w-6 h-6 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
              </svg>
            </div>
            <h3 className="text-white font-medium mb-1">Location</h3>
            <p className="text-gray-400 text-sm">palakkad, kerala</p>
          </div>
        </div>
      </div>
      
      <style jsx>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fade-in 0.5s ease-out forwards;
        }
        
        input:focus + div, textarea:focus + div {
          width: 100%;
        }
      `}</style>
    </section>
  );
};

export default Contact;