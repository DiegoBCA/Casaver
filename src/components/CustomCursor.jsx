import { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

/**
 * CustomCursor — Mystic dual-ring cursor for desktop only.
 * Inner dot + outer ring that follows with spring delay.
 * Changes size on hover over interactive elements.
 */
export default function CustomCursor() {
  const [isDesktop, setIsDesktop] = useState(false);
  const [cursorVariant, setCursorVariant] = useState('default');

  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  const springConfig = { damping: 25, stiffness: 200, mass: 0.5 };
  const ringX = useSpring(mouseX, springConfig);
  const ringY = useSpring(mouseY, springConfig);

  useEffect(() => {
    // Only show on devices with a fine pointer (desktop/laptop)
    const mql = window.matchMedia('(pointer: fine)');
    setIsDesktop(mql.matches);
    if (!mql.matches) return;

    const moveCursor = (e) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    const handleMouseOver = (e) => {
      const target = e.target.closest('a, button, [data-cursor="grow"]');
      if (target) {
        setCursorVariant('hover');
      }
    };

    const handleMouseOut = (e) => {
      const target = e.target.closest('a, button, [data-cursor="grow"]');
      if (target) {
        setCursorVariant('default');
      }
    };

    window.addEventListener('mousemove', moveCursor);
    document.addEventListener('mouseover', handleMouseOver);
    document.addEventListener('mouseout', handleMouseOut);

    return () => {
      window.removeEventListener('mousemove', moveCursor);
      document.removeEventListener('mouseover', handleMouseOver);
      document.removeEventListener('mouseout', handleMouseOut);
    };
  }, [mouseX, mouseY]);

  if (!isDesktop) return null;

  const variants = {
    default: { width: 36, height: 36, opacity: 0.5 },
    hover: { width: 60, height: 60, opacity: 0.25 },
  };

  return (
    <>
      {/* Inner dot — follows immediately */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999] mix-blend-difference"
        style={{
          x: mouseX,
          y: mouseY,
          translateX: '-50%',
          translateY: '-50%',
        }}
      >
        <div className="w-2 h-2 rounded-full bg-[var(--color-dorado)]" />
      </motion.div>

      {/* Outer ring — follows with spring delay */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999] rounded-full border border-[var(--color-dorado)]/40 mix-blend-difference"
        style={{
          x: ringX,
          y: ringY,
          translateX: '-50%',
          translateY: '-50%',
        }}
        animate={variants[cursorVariant]}
        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
      />
    </>
  );
}
