import React, { useState, useEffect, useRef } from 'react';
import { useForm, ValidationError } from '@formspree/react';

const CheckIcon = () => (
  <svg className="w-6 h-6 inline-block mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
  </svg>
);

const ErrorIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 inline-block mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
);

const SendIcon = () => (
  <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
  </svg>
);

const SpinnerIcon = () => (
  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
  </svg>
);

const CopyIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
    </svg>
);

// --- Reusable Input Field Component ---
// This component encapsulates the label, input, and focus animation for a cleaner form structure.
const FormInput = ({ id, name, type = 'text', placeholder, required, value, onChange }) => (
    <div className="relative group">
        <label htmlFor={id} className="block mb-2 text-sm font-medium text-gray-300">
            {placeholder}
        </label>
        <input
            type={type}
            id={id}
            name={name}
            required={required}
            value={value}
            onChange={onChange}
            className="w-full px-4 py-3 bg-gray-700/40 border border-gray-600/50 rounded-lg text-white placeholder-gray-500 focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/70 outline-none transition-all duration-300"
            placeholder={`Enter your ${placeholder.toLowerCase()}`}
        />
        {/* Underline animation on focus */}
        <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-400 to-cyan-400 transition-all duration-500 group-focus-within:w-full"></div>
    </div>
);


// --- Contact Information Card Component ---
// Includes logic for the "Copy to Clipboard" feature.
const ContactInfoCard = ({ icon, title, value }) => {
    const [isCopied, setIsCopied] = useState(false);

    const handleCopy = () => {
        if (!value) return;
        
        // This is a workaround for clipboard API in secure contexts (like iframes)
        const textArea = document.createElement("textarea");
        textArea.value = value;
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        try {
            document.execCommand('copy');
            setIsCopied(true);
            setTimeout(() => setIsCopied(false), 2000); // Reset after 2 seconds
        } catch (err) {
            console.error('Failed to copy text: ', err);
        }
        document.body.removeChild(textArea);
    };

    return (
        <div className="p-4 bg-gray-800/40 backdrop-blur-md rounded-lg border border-gray-700/50 flex items-center space-x-4">
            <div className="w-12 h-12 bg-blue-900/30 rounded-full flex items-center justify-center flex-shrink-0">
                {icon}
            </div>
            <div className="flex-grow">
                <h3 className="text-white font-medium">{title}</h3>
                <p className="text-gray-400 text-sm">{value || 'N/A'}</p>
            </div>
            {value && (
                <button 
                    onClick={handleCopy}
                    className="relative p-2 rounded-full text-gray-400 hover:bg-gray-700/50 hover:text-white transition-colors duration-200"
                    aria-label={`Copy ${title}`}
                >
                    <CopyIcon />
                    {isCopied && (
                        <span className="absolute -top-8 left-1/2 -translate-x-1/2 px-2 py-1 bg-green-600 text-white text-xs rounded-md shadow-lg transition-opacity duration-300">
                            Copied!
                        </span>
                    )}
                </button>
            )}
        </div>
    );
};


// --- Main Contact Component ---
function Contact() {
  const [state, handleSubmit] = useForm("mgvkqbrp"); // IMPORTANT: Replace with your Formspree form ID
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const formRef = useRef(null);
  
  const MESSAGE_MAX_LENGTH = 500;

  // Save message to local backend on successful Formspree submission
  useEffect(() => {
    if (state.succeeded) {
      const saveMessage = async () => {
          try {
              await Api.post('/messages', {
                  ...formData,
                  date: new Date().toISOString()
              });
          } catch (err) {
              console.error("Failed to save message locally", err);
          }
      };
      saveMessage();
      
      // Clear form fields after successful submission
      setFormData({ name: '', email: '', message: '' });
    }
  }, [state.succeeded]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const hasFormErrors = state.errors && state.errors.length > 0;
// ... (rest of the component remains the same until the end)

  return (
    <div className="min-h-screen bg-gray-900 text-white font-sans">
      <section id="contact" className="py-20 px-4 relative overflow-hidden">
        {/* Decorative background elements */}
        <div className="absolute inset-0 z-0">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-cyan-500"></div>
          <div className="absolute top-1/4 -right-20 w-64 h-64 bg-blue-600 rounded-full filter blur-[120px] opacity-20 animate-pulse"></div>
          <div className="absolute bottom-1/3 -left-20 w-64 h-64 bg-purple-600 rounded-full filter blur-[120px] opacity-20 animate-pulse animation-delay-4000"></div>
          <div className="absolute inset-0 opacity-10 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
        </div>
        
        <div className="container mx-auto max-w-2xl relative z-10">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-4">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-cyan-400 font-light">
              Get In <span className="font-semibold text-white">Touch</span>
            </span>
          </h2>
          
          <p className="text-gray-400 text-center mb-12 max-w-md mx-auto">
            Have a project in mind or want to discuss potential opportunities? I'm always open to new ideas.
          </p>
          
          {/* Main Form container */}
          <div className="bg-gray-800/40 backdrop-blur-xl p-8 rounded-xl border border-gray-700/50 shadow-2xl">
            {/* --- Submission Status Messages --- */}
            {state.succeeded && (
              <div className="mb-6 p-4 flex items-center bg-green-900/50 border border-green-700/50 rounded-lg text-green-300 text-center backdrop-blur-sm animate-fade-in-down">
                <CheckIcon /> Your message has been sent successfully! I'll get back to you soon.
              </div>
            )}
            {hasFormErrors && (
              <div className="mb-6 p-4 flex items-center bg-red-900/50 border border-red-700/50 rounded-lg text-red-300 text-center backdrop-blur-sm animate-fade-in-down">
                <ErrorIcon /> Oops! Something went wrong. Please check your details and try again.
              </div>
            )}
            
            <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
                <FormInput 
                    id="name"
                    name="name"
                    placeholder="Full Name"
                    required
                    value={formData.name}
                    onChange={handleInputChange}
                />
                <ValidationError className="text-red-400 text-sm mt-1" prefix="Name" field="name" errors={state.errors} />

                <FormInput 
                    id="email"
                    name="email"
                    type="email"
                    placeholder="Email Address"
                    required
                    value={formData.email}
                    onChange={handleInputChange}
                />
                <ValidationError className="text-red-400 text-sm mt-1" prefix="Email" field="email" errors={state.errors} />
              
                <div className="relative group">
                    <label htmlFor="message" className="block mb-2 text-sm font-medium text-gray-300">
                        Message
                    </label>
                    <textarea
                        id="message"
                        name="message"
                        rows="5"
                        required
                        maxLength={MESSAGE_MAX_LENGTH}
                        value={formData.message}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 bg-gray-700/40 border border-gray-600/50 rounded-lg text-white placeholder-gray-500 focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/70 outline-none transition-all duration-300 resize-none"
                        placeholder="Tell me about your project or inquiry..."
                    ></textarea>
                     {/* Underline animation on focus */}
                    <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-400 to-cyan-400 transition-all duration-500 group-focus-within:w-full"></div>
                    <div className="text-right text-xs text-gray-400 mt-1">
                        {formData.message.length} / {MESSAGE_MAX_LENGTH}
                    </div>
                </div>
                <ValidationError className="text-red-400 text-sm mt-1" prefix="Message" field="message" errors={state.errors} />
              
                <button
                    type="submit"
                    disabled={state.submitting}
                    className="w-full py-3 px-6 rounded-lg text-white font-semibold transition-all duration-300 flex items-center justify-center disabled:cursor-not-allowed bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 disabled:from-blue-700/50 disabled:to-cyan-700/50 shadow-lg hover:shadow-blue-500/30 disabled:shadow-none transform hover:-translate-y-0.5"
                >
                    {state.submitting ? (
                        <>
                            <SpinnerIcon /> Sending...
                        </>
                    ) : (
                        <>
                            Send Message <SendIcon />
                        </>
                    )}
                </button>
            </form>
          </div>
          
          {/* --- Additional Contact Information --- */}
          <div className="mt-12">
            <h3 className="text-lg font-semibold text-center text-gray-300 mb-6">Or contact me directly</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <ContactInfoCard 
                    icon={<svg className="w-6 h-6 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>}
                    title="Email"
                    value="ashifek11@gmail.com"
                />
                <ContactInfoCard 
                    icon={<svg className="w-6 h-6 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path></svg>}
                    title="Phone"
                    value="+91 9037499763"
                />
            </div>
          </div>
        </div>
      </section>

      {/* Adding custom keyframe animations */}
      <style>{`
        @keyframes fade-in-down {
          from { opacity: 0; transform: translateY(-15px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in-down {
          animation: fade-in-down 0.5s ease-out forwards;
        }
        .animation-delay-4000 {
            animation-delay: 4s;
        }
      `}</style>
    </div>
  );
}

export default Contact;
