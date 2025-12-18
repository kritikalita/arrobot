import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import DecryptText from "./DecryptText";

const Hero = () => {
  return (
    <div
      id="about"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* 🎥 VIDEO BACKGROUND */}
      <div className="absolute inset-0 z-0">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover"
        >
          <source
            src="https://www.dropbox.com/scl/fi/eih1or4g3ji3xji276nd5/0_Modern_Gadget_1920x1920.mp4?rlkey=15i3w98jv7mzbh1n8wwxtgxmh&st=teeh9ti7&raw=1"
            type="video/mp4"
          />
        </video>

        {/* Dark Overlay (So text is readable) */}
        <div className="absolute inset-0 bg-black/60"></div>
      </div>

      {/* Content */}
      {/* 1. UPDATED: Consistent Padding (px-6 mobile, px-12 tablet, px-20 desktop) */}
      <div className="relative z-10 text-center px-6 md:px-12 lg:px-20 max-w-5xl mx-auto mt-16">
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          {/* 2. UPDATED: Responsive Subtitle Size */}
          <p className="text-cyan-500 font-bold tracking-widest mb-4 uppercase text-xs md:text-sm">
            Indigenous Deep-Tech Company
          </p>

          {/* 3. UPDATED: Smoother Font Scaling (4xl -> 5xl -> 6xl -> 7xl) */}
          <div className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-8 leading-tight">
            <DecryptText text="Advancing Mission Critical" className="block" />
            <span className="text-gray-400">
              <DecryptText text="Robotics & Systems" className="block" />
            </span>
          </div>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.6 }}
          // 4. UPDATED: Responsive Paragraph Size
          className="text-base md:text-lg lg:text-xl text-gray-300 mb-10 max-w-2xl mx-auto leading-relaxed"
        >
          We design and manufacture high-reliability platforms that operate in
          the most demanding environments for India's strategic sectors.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.8 }}
        >
          <button className="group bg-transparent border border-white/30 hover:border-cyan-500 hover:bg-cyan-500/10 text-white px-6 py-3 md:px-8 md:py-4 rounded-full transition-all duration-300 flex items-center mx-auto gap-2 text-sm md:text-base">
            Explore Systems
            <ArrowRight
              className="group-hover:translate-x-1 transition-transform w-4 h-4 md:w-5 md:h-5"
            />
          </button>
        </motion.div>
      </div>
    </div>
  );
};

export default Hero;