import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const CustomCursor = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(false); // New state to manage visibility

  useEffect(() => {
    // 1. DETECT INPUT TYPE
    // If the primary pointing device is "coarse" (finger/stylus), DO NOT render the cursor
    if (window.matchMedia("(pointer: coarse)").matches) {
      setIsVisible(false);
      return; 
    }
    
    // Otherwise, it's likely a mouse, so show it
    setIsVisible(true);

    const mouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    const handleMouseOver = (e) => {
      if (
        e.target.tagName === "BUTTON" || 
        e.target.tagName === "A" || 
        e.target.closest(".cursor-pointer") ||
        e.target.closest("a") ||
        e.target.closest("button")
      ) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    window.addEventListener("mousemove", mouseMove);
    window.addEventListener("mouseover", handleMouseOver);

    return () => {
      window.removeEventListener("mousemove", mouseMove);
      window.removeEventListener("mouseover", handleMouseOver);
    };
  }, []);

  // 2. SAFETY RETURN
  // If we detected a touch device, return null (render nothing)
  if (!isVisible) return null;

  return (
    <>
      {/* 1. Center Dot (Hidden on mobile via CSS, but now also logical check) */}
      <motion.div
        className="fixed top-0 left-0 w-1.5 h-1.5 bg-cyan-500 rounded-full pointer-events-none z-[9999]"
        animate={{ x: mousePosition.x, y: mousePosition.y }}
        transition={{ duration: 0 }}
      />

      {/* 2. Outer Reticle */}
      <motion.div
        className="fixed top-0 left-0 border border-cyan-500 rounded-full pointer-events-none z-[9999] flex items-center justify-center backdrop-blur-[1px]"
        animate={{
          x: mousePosition.x - 16, 
          y: mousePosition.y - 16,
          scale: isHovering ? 1.5 : 1, 
          borderColor: isHovering ? "rgba(6, 182, 212, 0.8)" : "rgba(6, 182, 212, 0.3)"
        }}
        transition={{ type: "spring", stiffness: 500, damping: 28 }}
        style={{ width: 32, height: 32 }}
      >
        <div className="absolute w-full h-[1px] bg-cyan-500/20"></div>
        <div className="absolute h-full w-[1px] bg-cyan-500/20"></div>
      </motion.div>
    </>
  );
};

export default CustomCursor;