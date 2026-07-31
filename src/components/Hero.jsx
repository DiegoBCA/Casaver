import { motion, useMotionValue, useSpring, useScroll, useTransform } from 'framer-motion';
import { Sparkle, Leaf } from '@phosphor-icons/react';
import { Link } from 'react-router-dom';

/**
 * Hero — Cinematic entrance with word-by-word reveal animation.
 * Ultra-luxury botanical personal care brand statement.
 */

const LUXURY_EASE = [0.16, 1, 0.3, 1];

/* ─── Animation Variants ─── */

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.04,
      delayChildren: 0.2,
    },
  },
};

const charVariants = {
  hidden: {
    opacity: 0,
    y: 20,
    rotateX: -45,
    filter: 'blur(4px)',
  },
  visible: {
    opacity: 1,
    y: 0,
    rotateX: 0,
    filter: 'blur(0px)',
    transition: {
      duration: 1.2,
      ease: LUXURY_EASE,
    },
  },
};

const fadeUpVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.9,
      delay,
      ease: LUXURY_EASE,
    },
  }),
};

const lineGrowVariants = {
  hidden: { scaleX: 0 },
  visible: (delay = 0) => ({
    scaleX: 1,
    transition: {
      duration: 1.4,
      delay,
      ease: LUXURY_EASE,
    },
  }),
};

/* ─── Letter-by-letter title renderer ─── */
function AnimatedTitle({ text, className }) {
  const words = text.split(' ');

  return (
    <motion.h1
      className={className}
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-80px' }}
      style={{ perspective: 1000 }}
    >
      {words.map((word, wordIndex) => {
        // preserve line breaks
        const hasLineBreak = word.includes('\n');
        const splitWord = word.replace('\n', '');

        return (
          <span key={wordIndex} className="inline-block whitespace-nowrap mr-[0.28em] mb-1">
            {splitWord.split('').map((char, charIndex) => (
              <motion.span
                key={`${wordIndex}-${charIndex}`}
                variants={charVariants}
                className="inline-block origin-bottom"
                style={{ transformStyle: 'preserve-3d' }}
              >
                {char}
              </motion.span>
            ))}
            {hasLineBreak && <br />}
          </span>
        );
      })}
    </motion.h1>
  );
}

/* ─── Magnetic Button Component ─── */
function MagneticButton({ children, href, className, variants, custom }) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springX = useSpring(x, { stiffness: 150, damping: 15, mass: 0.1 });
  const springY = useSpring(y, { stiffness: 150, damping: 15, mass: 0.1 });

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left - width / 2;
    const mouseY = e.clientY - rect.top - height / 2;
    x.set(mouseX * 0.4);
    y.set(mouseY * 0.4);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      variants={variants}
      custom={custom}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
    >
      <motion.a
        href={href}
        className={className}
        style={{ x: springX, y: springY }}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        transition={{ duration: 0.4, ease: LUXURY_EASE }}
      >
        {children}
      </motion.a>
    </motion.div>
  );
}

/* ─── Main Hero Component ─── */
export default function Hero() {
  const { scrollYProgress } = useScroll();
  
  // Parallax transforms — different speeds for depth
  const heroOpacity = useTransform(scrollYProgress, [0, 0.25], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 0.25], [1, 0.92]);
  const heroBlur = useTransform(scrollYProgress, [0, 0.25], [0, 8]);
  const orbY1 = useTransform(scrollYProgress, [0, 0.3], [0, -80]);
  const orbY2 = useTransform(scrollYProgress, [0, 0.3], [0, -50]);
  const linesY = useTransform(scrollYProgress, [0, 0.3], [0, -120]);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">

      {/* ── Ambient decorative elements (parallax layer: slow) ── */}
      <motion.div style={{ y: orbY1 }} className="absolute inset-0 pointer-events-none">
        <FloatingOrb
          size={320}
          color="var(--color-natura-subtle)"
          position="top-[8%] -left-[6%]"
          delay={0}
          duration={22}
        />
        <FloatingOrb
          size={260}
          color="var(--color-dorado-subtle)"
          position="bottom-[12%] -right-[4%]"
          delay={2}
          duration={26}
        />
      </motion.div>
      <motion.div style={{ y: orbY2 }} className="absolute inset-0 pointer-events-none">
        <FloatingOrb
          size={180}
          color="var(--color-natura-subtle)"
          position="top-[60%] left-[15%]"
          delay={4}
          duration={30}
          opacity={0.3}
        />
      </motion.div>

      {/* ── Thin vertical gold accent lines (parallax layer: fast) ── */}
      <motion.div style={{ y: linesY }} className="absolute inset-0 pointer-events-none">
      <motion.div
        className="absolute left-[12%] top-[20%] w-[1px] h-32 origin-top bg-gradient-to-b from-[var(--color-dorado)]/20 via-[var(--color-dorado)]/8 to-transparent"
        variants={lineGrowVariants}
        custom={1.2}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      />
      <motion.div
        className="absolute right-[12%] bottom-[22%] w-[1px] h-24 origin-top bg-gradient-to-b from-transparent via-[var(--color-dorado)]/8 to-[var(--color-dorado)]/20"
        variants={lineGrowVariants}
        custom={1.6}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      />
      </motion.div>

      {/* ── Gate / Porte Visual Structure (Thorgal Style) ── */}
      <motion.div 
        className="absolute inset-x-6 sm:inset-x-12 lg:inset-x-24 top-24 bottom-0 border-x border-t border-[var(--color-dorado)]/20 rounded-t-full pointer-events-none"
        initial={{ opacity: 0, scaleY: 0.9 }}
        animate={{ opacity: 1, scaleY: 1 }}
        transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1], delay: 0.5 }}
        style={{ transformOrigin: 'bottom' }}
      >
        {/* Top center badge on the arch */}
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-white px-4">
          <span className="font-sans text-[10px] sm:text-[11px] tracking-[0.35em] uppercase text-madera font-light">
            Porte 01
          </span>
        </div>
      </motion.div>

      {/* ── Main Content (parallax: scale + blur on scroll) ── */}
      <motion.div 
        className="relative z-10 text-center max-w-5xl mx-auto px-6 sm:px-8 py-32 lg:py-40"
        style={{ 
          opacity: heroOpacity, 
          scale: heroScale,
          filter: useTransform(heroBlur, (v) => `blur(${v}px)`),
        }}
      >

        {/* Decorative pre-title badge */}
        <motion.div
          className="flex items-center justify-center gap-3 mb-12"
          variants={fadeUpVariants}
          custom={0}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <motion.div
            className="h-[1px] w-10 bg-gradient-to-r from-transparent to-[var(--color-dorado)]/40 origin-right"
            variants={lineGrowVariants}
            custom={0.6}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          />
          <Sparkle
            size={14}
            weight="thin"
            className="text-[var(--color-dorado)]"
          />
          <span className="font-sans text-[10px] sm:text-[11px] tracking-[0.35em] uppercase text-madera font-light">
            El Origen Botánico
          </span>
          <Sparkle
            size={14}
            weight="thin"
            className="text-[var(--color-dorado)]"
          />
          <motion.div
            className="h-[1px] w-10 bg-gradient-to-l from-transparent to-[var(--color-dorado)]/40 origin-left"
            variants={lineGrowVariants}
            custom={0.6}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          />
        </motion.div>

        {/* ── Hero Title — word-by-word reveal ── */}
        <AnimatedTitle
          text={"El Ritual de\n tu Naturaleza"}
          className="
            font-serif text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-[6.5rem]
            font-light text-natura leading-[1.05] tracking-tight
            mb-8 lg:mb-10
          "
        />

        {/* ── Gold divider ── */}
        <motion.div
          className="flex items-center justify-center gap-3 my-8 lg:my-10"
          variants={fadeUpVariants}
          custom={0.9}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <div className="h-[1px] w-8 sm:w-12 bg-gradient-to-r from-transparent to-[var(--color-dorado)]/30" />
          <Leaf
            size={18}
            weight="thin"
            className="text-[var(--color-dorado)]/60"
          />
          <div className="h-[1px] w-8 sm:w-12 bg-gradient-to-l from-transparent to-[var(--color-dorado)]/30" />
        </motion.div>

        {/* ── Subtitle ── */}
        <motion.p
          className="
            font-sans text-base sm:text-lg lg:text-xl
            text-madera font-light leading-relaxed
            max-w-xl mx-auto mb-14 lg:mb-16
            tracking-wide
          "
          variants={fadeUpVariants}
          custom={1.1}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          Alinea tu energía. Descubre la botánica
          <br className="hidden sm:block" />
          {' '}que rige tu signo.
        </motion.p>

        {/* ── Direct Action Button ── */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 1, ease: LUXURY_EASE }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="relative z-20 mt-16 lg:mt-20 inline-flex items-center justify-center"
        >
          <Link
            to="/catalogo"
            className="
              relative
              inline-flex items-center justify-center
              px-12 py-5 bg-[#1C1C1C] text-white
              font-sans text-[11px] font-light tracking-[0.25em] uppercase
              border border-[var(--color-dorado)]/30
              hover:border-[var(--color-dorado)]/60
              hover:bg-[#1C1C1C]/80
              transition-all duration-500
            "
          >
            {/* Decorative side brackets like Thorgal's button */}
            <span className="absolute left-[-15px] top-1/2 -translate-y-1/2 w-4 h-[1px] bg-gradient-to-r from-transparent to-[var(--color-dorado)]/50" />
            <span className="absolute right-[-15px] top-1/2 -translate-y-1/2 w-4 h-[1px] bg-gradient-to-l from-transparent to-[var(--color-dorado)]/50" />
            
            <span className="absolute left-[-15px] top-1/2 -translate-y-1/2 w-[3px] h-[3px] rotate-45 bg-[var(--color-dorado)]" />
            <span className="absolute right-[-15px] top-1/2 -translate-y-1/2 w-[3px] h-[3px] rotate-45 bg-[var(--color-dorado)]" />
            
            Ver Catálogo
          </Link>
        </motion.div>


        {/* ── Scroll cue ── */}
        <motion.div
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2.5"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.4, duration: 1 }}
        >
          <span className="font-sans text-[9px] tracking-[0.35em] uppercase text-madera-light font-light">
            Explorar
          </span>
          <motion.div
            className="w-[1px] h-9 bg-gradient-to-b from-[var(--color-dorado)]/30 to-transparent"
            animate={{ scaleY: [1, 0.4, 1], opacity: [0.6, 0.2, 0.6] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
          />
        </motion.div>
      </motion.div>
    </section>
  );
}

/* ─── Floating Orb (ambient decoration) ─── */
function FloatingOrb({ size, color, position, delay = 0, duration = 20, opacity = 0.4 }) {
  return (
    <motion.div
      className={`absolute ${position} rounded-full pointer-events-none`}
      style={{
        width: size,
        height: size,
        background: `radial-gradient(circle, ${color} 0%, transparent 70%)`,
        opacity,
      }}
      animate={{
        y: [0, -30, 10, -20, 0],
        x: [0, 15, -10, 20, 0],
        scale: [1, 1.06, 0.97, 1.03, 1],
      }}
      transition={{
        duration,
        delay,
        repeat: Infinity,
        ease: 'easeInOut',
      }}
    />
  );
}
