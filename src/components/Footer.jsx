import { useRef, useState } from "react";
import { Mail, MapPin, Linkedin, Youtube, Loader2 } from "lucide-react";
import { motion } from "framer-motion";
import emailjs from '@emailjs/browser';

// --- INTERNAL COMPONENT: TARGET LOCK INPUT ---
const TargetInput = ({ as = "input", className, ...props }) => {
  const [isFocused, setIsFocused] = useState(false);
  const Component = as; 

  return (
    <div className={`relative ${className}`}>
      <Component
        {...props}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        className="w-full bg-gray-900/50 text-white px-4 py-3 outline-none border-b border-gray-800 focus:border-transparent transition-colors placeholder:text-gray-600 resize-none"
      />
      <motion.div
        animate={isFocused ? { opacity: 1, x: 0, y: 0 } : { opacity: 0, x: -10, y: -10 }}
        className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-cyan-500 pointer-events-none"
      />
      <motion.div
        animate={isFocused ? { opacity: 1, x: 0, y: 0 } : { opacity: 0, x: 10, y: -10 }}
        className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-cyan-500 pointer-events-none"
      />
      <motion.div
        animate={isFocused ? { opacity: 1, x: 0, y: 0 } : { opacity: 0, x: -10, y: 10 }}
        className="absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 border-cyan-500 pointer-events-none"
      />
      <motion.div
        animate={isFocused ? { opacity: 1, x: 0, y: 0 } : { opacity: 0, x: 10, y: 10 }}
        className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-cyan-500 pointer-events-none"
      />
    </div>
  );
};

// --- MAIN FOOTER ---
const Footer = () => {
  const form = useRef();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSent, setIsSent] = useState(false);

  const SERVICE_ID = "service_w8775j4";      
  const TEMPLATE_ID = "template_z33mulu";    
  const PUBLIC_KEY = "FXNV7WHilpcZDLGUT";      

  const sendEmail = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    emailjs.sendForm(SERVICE_ID, TEMPLATE_ID, form.current, PUBLIC_KEY)
      .then((result) => {
          setIsSent(true);
          setIsSubmitting(false);
          e.target.reset(); 
          setTimeout(() => setIsSent(false), 5000);
      }, (error) => {
          alert("Failed to send message. Please try again.");
          setIsSubmitting(false);
      });
  };

  return (
    <footer id="contact" className="bg-transparent text-white pt-16 md:pt-20 pb-10 border-t border-gray-800">
      
      {/* ✅ UPDATED: Consistent Horizontal Padding (px-6 md:px-12 lg:px-20) */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-20 grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16">
        
        {/* Left Side: Contact Form */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-2xl md:text-3xl font-bold mb-2">Unlock your next technological leap.</h2>
          <p className="text-gray-400 mb-8 text-sm md:text-base">Contact us to begin!</p>
          
          {isSent ? (
            <div className="bg-cyan-500/10 border border-cyan-500 text-cyan-500 p-6 rounded-lg text-center">
              <h3 className="text-xl font-bold mb-2">Message Sent!</h3>
              <p>We will get back to you shortly.</p>
            </div>
          ) : (
            <form ref={form} onSubmit={sendEmail} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <TargetInput as="input" type="text" name="first_name" required placeholder="First Name" />
                <TargetInput as="input" type="text" name="last_name" required placeholder="Last Name" />
              </div>
              <TargetInput as="input" type="email" name="email" required placeholder="Email Address" />
              <TargetInput as="textarea" name="message" required placeholder="Message" rows="4" />
              
              <button 
                type="submit" 
                disabled={isSubmitting}
                className="bg-cyan-600 hover:bg-cyan-700 text-white font-bold py-3 px-8 rounded transition-colors w-full md:w-auto flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed mt-2"
              >
                {isSubmitting ? (
                  <>Sending <Loader2 className="animate-spin" size={20}/></>
                ) : (
                  "Send Message"
                )}
              </button>
            </form>
          )}
        </motion.div>

        {/* Right Side: Info & Links */}
        <motion.div 
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="flex flex-col justify-between"
        >
          <div>
            <h3 className="text-xl font-bold mb-6 text-cyan-500">Contact Information</h3>
            <div className="space-y-4 text-gray-300 text-sm md:text-base">
              <div className="flex items-start space-x-3">
                <MapPin className="text-cyan-500 mt-1 shrink-0" size={20} />
                <p>Plot No: 26/A, Hardware Park<br />Telangana-501359, India</p>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="text-cyan-500 shrink-0" size={20} />
                <p>info@arrobot.co</p>
              </div>
            </div>
          </div>

          <div className="mt-12 pt-8 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center text-sm text-gray-500">
            <p className="text-center md:text-left">&copy; 2025 Arrobot. All rights reserved.</p>
            <div className="flex space-x-4 mt-4 md:mt-0">
              <a 
                href="https://www.linkedin.com/company/arrobot/posts/?feedView=all" 
                target="_blank" 
                rel="noopener noreferrer"
                className="hover:text-cyan-500 transition-colors"
              >
                <Linkedin size={20} />
              </a>
              
              <a 
                href="https://www.youtube.com/@RaghuVamsiAerospaceGroup" 
                target="_blank" 
                rel="noopener noreferrer"
                className="hover:text-cyan-500 transition-colors"
              >
                <Youtube size={20} />
              </a>
            </div>
          </div>
        </motion.div>

      </div>
    </footer>
  );
};

export default Footer;