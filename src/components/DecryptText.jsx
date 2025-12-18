import React, { useState, useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";

const chars = "-_~`!@#$%^&*()+=[]{}|;:,.<>?/";

const DecryptText = ({ text, className }) => {
  const [displayText, setDisplayText] = useState("");
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });

  useEffect(() => {
    if (!isInView) return;

    let iteration = 0;
    let interval = null;

    // Start with same length but empty
    setDisplayText(text.split("").map(() => " ").join(""));

    interval = setInterval(() => {
      setDisplayText((prev) =>
        text
          .split("")
          .map((letter, index) => {
            if (index < iteration) {
              return text[index];
            }
            return chars[Math.floor(Math.random() * chars.length)];
          })
          .join("")
      );

      if (iteration >= text.length) {
        clearInterval(interval);
      }

      iteration += 1 / 3; // Speed of decoding (Lower = Slower)
    }, 30);

    return () => clearInterval(interval);
  }, [isInView, text]);

  return (
    <motion.span
      ref={ref}
      className={className}
      initial={{ opacity: 0 }}
      animate={isInView ? { opacity: 1 } : {}}
      transition={{ duration: 0.5 }}
    >
      {displayText}
    </motion.span>
  );
};

export default DecryptText;