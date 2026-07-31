import { motion, useScroll, useTransform } from 'framer-motion';
import horizontalBranch from '../assets/horizontal_branch.png';
import { useEffect, useState } from 'react';

// Floating particles for that magical/esoteric touch
function MysticalParticles() {
  const [particles, setParticles] = useState([]);
  useEffect(() => {
    const newParticles = Array.from({ length: 25 }).map((_, i) => ({
      id: i,
      x: Math.random() * 100, // vw
      y: Math.random() * 100, // vh
      size: Math.random() * 3 + 1,
      duration: Math.random() * 10 + 10,
      delay: Math.random() * 5,
    }));
    setParticles(newParticles);
  }, []);

  return (
    <div className="absolute inset-0 pointer-events-none z-[-1] overflow-hidden opacity-50">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full bg-[var(--color-dorado)] blur-[1px]"
          style={{
            left: `${p.x}vw`,
            top: `${p.y}vh`,
            width: p.size,
            height: p.size,
          }}
          animate={{
            y: [0, -40, 0],
            opacity: [0, 0.8, 0],
            scale: [1, 1.5, 1],
          }}
          transition={{
            duration: p.duration,
            repeat: Infinity,
            delay: p.delay,
            ease: 'easeInOut',
          }}
        />
      ))}
    </div>
  );
}

export default function Vines() {
  const { scrollYProgress } = useScroll();

  // Subtle parallax effect on scroll
  const yParallax = useTransform(scrollYProgress, [0, 1], [0, -150]);

  return (
    <div className="fixed inset-0 pointer-events-none z-[0] overflow-hidden">
      
      {/* ── Mystical Floating Dust/Fireflies ── */}
      <MysticalParticles />

      <div className="absolute inset-0 mix-blend-multiply opacity-50">
        {/* ── LEFT HORIZONTAL BRANCH ── */}
        <motion.div 
          className="absolute top-[10%] left-[-5%] w-[45vw] max-w-[500px]"
          style={{ y: yParallax }}
        >
          <motion.div
            className="w-full h-full origin-left"
            animate={{ rotate: [0, 2, 0], y: [0, 8, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          >
            <img 
              src={horizontalBranch} 
              alt="" 
              className="w-full h-auto object-contain opacity-90"
            />
          </motion.div>
        </motion.div>

        {/* ── RIGHT HORIZONTAL BRANCH ── */}
        <motion.div 
          className="absolute top-[40%] right-[-5%] w-[40vw] max-w-[450px]"
          style={{ y: yParallax }}
        >
          <motion.div
            className="w-full h-full origin-right"
            animate={{ rotate: [0, -2, 0], y: [0, -8, 0] }}
            transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
          >
            <img 
              src={horizontalBranch} 
              alt="" 
              className="w-full h-auto object-contain opacity-90 scale-x-[-1]"
            />
          </motion.div>
        </motion.div>
      </div>

    </div>
  );
}
