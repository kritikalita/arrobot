import React, { useEffect, useRef } from "react";

const ParticleBackground = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    let animationFrameId;

    // Set canvas size
    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    
    // Initial resize
    handleResize();
    window.addEventListener("resize", handleResize);

    // Configuration
    const particleCount = 50; // Adjust count
    const connectionDistance = 150;
    const mouseDistance = 200;
    
    // Mouse State
    let mouse = { x: null, y: null };
    
    const handleMouseMove = (e) => {
      mouse.x = e.clientX; // Changed to clientX for better accuracy
      mouse.y = e.clientY;
    };
    window.addEventListener("mousemove", handleMouseMove);
    
    const handleMouseLeave = () => {
      mouse.x = null;
      mouse.y = null;
    };
    window.addEventListener("mouseout", handleMouseLeave);

    // Particle Class
    class Particle {
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.vx = (Math.random() - 0.5) * 1.5; // Faster movement
        this.vy = (Math.random() - 0.5) * 1.5;
        this.size = Math.random() * 2 + 1; // Slightly bigger dots
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;

        // Bounce off edges
        if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
        if (this.y < 0 || this.y > canvas.height) this.vy *= -1;
      }

      draw() {
        // High Visibility Cyan Color
        ctx.fillStyle = "rgba(6, 182, 212, 0.8)"; 
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    // Create Particles
    const particles = [];
    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle());
    }

    // Animation Loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      particles.forEach((particle) => {
        particle.update();
        particle.draw();
        
        // Connect to Mouse
        if (mouse.x != null) {
          let dx = mouse.x - particle.x;
          let dy = mouse.y - particle.y;
          let distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < mouseDistance) {
            ctx.beginPath();
            // Cyan Connection Line
            ctx.strokeStyle = `rgba(6, 182, 212, ${1 - distance / mouseDistance})`; 
            ctx.lineWidth = 1.5;
            ctx.moveTo(particle.x, particle.y);
            ctx.lineTo(mouse.x, mouse.y);
            ctx.stroke();
          }
        }

        // Connect to other particles
        particles.forEach((otherParticle) => {
          let dx = particle.x - otherParticle.x;
          let dy = particle.y - otherParticle.y;
          let distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < connectionDistance) {
            ctx.beginPath();
            // Faint Cyan/White Line
            ctx.strokeStyle = `rgba(6, 182, 212, ${0.2 - distance / connectionDistance * 0.2})`; 
            ctx.lineWidth = 0.5;
            ctx.moveTo(particle.x, particle.y);
            ctx.lineTo(otherParticle.x, otherParticle.y);
            ctx.stroke();
          }
        });
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseout", handleMouseLeave);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      // Added 'z-1' to force it above the black background layer
      className="fixed top-0 left-0 w-full h-full pointer-events-none z-[1]"
    />
  );
};

export default ParticleBackground;