import { motion, useScroll, useTransform } from 'framer-motion';

/**
 * AuroraBackground — A mystical, slowly-shifting aurora/gradient mesh
 * that lives behind all content, giving the page depth and life.
 * Inspired by northern lights + botanical energy fields.
 */
export default function AuroraBackground() {
  const { scrollYProgress } = useScroll();
  
  // Shift hue and position as user scrolls through the page
  const rotate1 = useTransform(scrollYProgress, [0, 1], [0, 360]);
  const rotate2 = useTransform(scrollYProgress, [0, 1], [180, -180]);
  const y1 = useTransform(scrollYProgress, [0, 1], ['0%', '60%']);
  const y2 = useTransform(scrollYProgress, [0, 1], ['0%', '-40%']);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      
      {/* Primary aurora blob — emerald/teal, top-left */}
      <motion.div
        className="absolute -top-[20%] -left-[15%] w-[70vw] h-[70vw] max-w-[900px] max-h-[900px] rounded-full opacity-[0.04]"
        style={{
          background: 'radial-gradient(circle, #064e3b 0%, #0d9488 40%, transparent 70%)',
          y: y1,
          rotate: rotate1,
        }}
        animate={{
          scale: [1, 1.15, 1.05, 1.2, 1],
          x: [0, 30, -20, 15, 0],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      {/* Secondary aurora blob — gold/amber, bottom-right */}
      <motion.div
        className="absolute -bottom-[10%] -right-[15%] w-[60vw] h-[60vw] max-w-[800px] max-h-[800px] rounded-full opacity-[0.03]"
        style={{
          background: 'radial-gradient(circle, #d97706 0%, #f59e0b 35%, transparent 70%)',
          y: y2,
          rotate: rotate2,
        }}
        animate={{
          scale: [1, 1.1, 0.95, 1.12, 1],
          x: [0, -25, 15, -10, 0],
        }}
        transition={{
          duration: 30,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      {/* Tertiary — deep purple mist, center (appears mid-page for esoteric section) */}
      <motion.div
        className="absolute top-[35%] left-[20%] w-[50vw] h-[50vw] max-w-[700px] max-h-[700px] rounded-full opacity-[0.025]"
        style={{
          background: 'radial-gradient(circle, #7c3aed 0%, #4c1d95 40%, transparent 70%)',
        }}
        animate={{
          scale: [1, 1.2, 1],
          y: [0, -40, 20, -30, 0],
          x: [0, 20, -30, 10, 0],
        }}
        transition={{
          duration: 35,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      {/* Floating particles — tiny dots of light */}
      {Array.from({ length: 20 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full bg-[var(--color-dorado)]"
          style={{
            width: Math.random() * 3 + 1,
            height: Math.random() * 3 + 1,
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            opacity: [0, 0.15, 0],
            y: [0, -(Math.random() * 60 + 20), 0],
          }}
          transition={{
            duration: Math.random() * 6 + 4,
            delay: Math.random() * 5,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      ))}
    </div>
  );
}
