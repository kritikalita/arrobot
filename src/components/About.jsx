import { motion, useInView, useSpring, useMotionValue } from "framer-motion";
import { useEffect, useRef } from "react";
import DecryptText from "./DecryptText";

// Helper component for counting numbers
const NumberCounter = ({ value, suffix = "" }) => {
  const ref = useRef(null);
  
  const inView = useInView(ref, { once: false }); 
  
  const motionValue = useMotionValue(0);
  const springValue = useSpring(motionValue, { duration: 2000 });

  useEffect(() => {
    if (inView) {
      motionValue.set(value);
    } else {
      motionValue.set(0);
    }
  }, [inView, value, motionValue]);

  useEffect(() => {
    springValue.on("change", (latest) => {
      if (ref.current) {
        ref.current.textContent = Math.floor(latest) + suffix;
      }
    });
  }, [springValue, suffix]);

  return (
    <span ref={ref} className="block text-3xl md:text-5xl font-bold text-cyan-500">
      0{suffix}
    </span>
  );
};

const About = () => {
  return (
    <div 
      id="about" 
      // ✅ UPDATED: Consistent padding (px-6 mobile, px-12 tablet, px-20 desktop)
      className="scroll-mt-32 bg-transparent text-white py-16 md:py-24 px-6 md:px-12 lg:px-20"
    >
      <div className="max-w-4xl mx-auto text-center">
        
        {/* Animated Title */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-cyan-500 font-bold tracking-widest uppercase mb-4 text-xs md:text-sm">
            About Us
          </h2>
          
          <h3 className="text-3xl md:text-5xl font-bold mb-8 leading-tight text-white">
            <DecryptText text="Pioneering Autonomous Defence" />
          </h3>
        </motion.div>
        
        {/* Animated Text */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.3 }}
          viewport={{ once: true }}
        >
          <p className="text-base md:text-xl text-gray-300 leading-relaxed mb-6">
            ARROBOT is an indigenous deep-tech company advancing mission-critical robotics, 
            autonomous systems, and defence technologies for India's armed forces and strategic sectors.
          </p>

          <p className="text-base md:text-xl text-gray-400 leading-relaxed">
            We design, engineer, and manufacture high reliability platforms that operate in the 
            most demanding environments - on the field, at the frontline, and across complex industrial theatres.
          </p>
        </motion.div>
        
        {/* Animated Counters Grid */}
        <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-y-10 gap-x-6 md:gap-8 border-t border-gray-800 pt-12">
            <div>
              <NumberCounter value={100} suffix="%" />
              <span className="text-xs md:text-sm text-gray-500 uppercase tracking-wider mt-2 block">Indigenous</span>
            </div>
            <div>
              <NumberCounter value={24} suffix="/7" />
              <span className="text-xs md:text-sm text-gray-500 uppercase tracking-wider mt-2 block">Support</span>
            </div>
            <div>
              <NumberCounter value={50} suffix="+" />
              <span className="text-xs md:text-sm text-gray-500 uppercase tracking-wider mt-2 block">Engineers</span>
            </div>
            <div>
              <NumberCounter value={10} suffix="+" />
              <span className="text-xs md:text-sm text-gray-500 uppercase tracking-wider mt-2 block">Patents</span>
            </div>
        </div>
      </div>
    </div>
  );
};

export default About;