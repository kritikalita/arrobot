import { useState } from "react";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const menuItems = [
    { label: "About Us", href: "#about" },
    { label: "UAS Systems", href: "#uas" },
    { label: "Ground Systems", href: "#ground" },
    { label: "Capabilities", href: "#capabilities" },
    { label: "Contact", href: "#contact" },
  ];

  return (
    <nav className="bg-black/50 backdrop-blur-md text-white fixed w-full z-50 top-0 border-b border-cyan-500/20">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        
        {/* LOGO */}
        <a href="#" className="flex items-center">
          <img 
            src="https://www.dropbox.com/scl/fi/oq74e93mj5ztmm367iky4/wLogo.png?rlkey=m4qfd187o79c20ecg1tkimm0o&st=nbcxnfvj&raw=1" 
            alt="Arrobot Logo" 
            // Optional: Added 'mr-12' to forcefully push items away if they get too close
            className="h-10 md:h-12 w-auto object-contain scale-[2.5] origin-left ml-1 mr-12" 
          />
        </a>
        
        {/* Desktop Menu - UPDATED: Changed 'md:flex' to 'lg:flex' */}
        {/* This hides the text links on Tablets and shows them only on Laptops */}
        <div className="hidden lg:flex space-x-8">
          {menuItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className="text-sm uppercase font-medium tracking-wider hover:text-cyan-500 transition-colors relative group"
            >
              {item.label}
              <span className="absolute -bottom-2 left-0 w-0 h-0.5 bg-cyan-500 transition-all group-hover:w-full"></span>
            </a>
          ))}
        </div>

        {/* Mobile/Tablet Menu Button - UPDATED: Changed 'md:hidden' to 'lg:hidden' */}
        {/* This ensures the Hamburger button is visible on Tablets */}
        <button
          className="lg:hidden text-white hover:text-cyan-500 transition-colors"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile/Tablet Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            // UPDATED: Changed 'md:hidden' to 'lg:hidden'
            className="lg:hidden absolute top-full left-0 w-full bg-black/95 border-b border-cyan-500/20 py-4 shadow-2xl backdrop-blur-xl"
          >
            <div className="flex flex-col space-y-4 px-6">
              {menuItems.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  className="text-lg font-medium hover:text-cyan-500 transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  {item.label}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;