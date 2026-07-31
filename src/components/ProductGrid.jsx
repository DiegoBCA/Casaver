import { motion } from 'framer-motion';
import { Sparkle } from '@phosphor-icons/react';
import { Link } from 'react-router-dom';
import ProductCard from './ProductCard';
import { products } from '../data/products';

/**
 * ProductGrid — Curated product showcase grid.
 * White background, generous padding, staggered entrance.
 */

const LUXURY_EASE = [0.16, 1, 0.3, 1];

const fadeUpVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay, ease: LUXURY_EASE },
  }),
};

const gridContainerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1,
    },
  },
};

/* Unique animation: alternating slide from left/right with subtle rotation */
const cardRevealLeft = {
  hidden: { 
    opacity: 0, 
    x: -60, 
    rotate: -3,
  },
  visible: {
    opacity: 1,
    x: 0,
    rotate: 0,
    transition: { duration: 0.8, ease: LUXURY_EASE },
  },
};

const cardRevealRight = {
  hidden: { 
    opacity: 0, 
    x: 60, 
    rotate: 3,
  },
  visible: {
    opacity: 1,
    x: 0,
    rotate: 0,
    transition: { duration: 0.8, ease: LUXURY_EASE },
  },
};

export default function ProductGrid() {
  return (
    <section
      id="rituales"
      className="relative py-24 sm:py-32 lg:py-40 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">

        {/* ── Section Header ── */}
        <motion.div
          className="text-center mb-16 lg:mb-20"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
        >
          <motion.div
            className="flex items-center justify-center gap-3 mb-6"
            variants={fadeUpVariants}
            custom={0}
          >
            <div className="h-[1px] w-10 bg-gradient-to-r from-transparent to-[var(--color-dorado)]/30" />
            <Sparkle size={14} weight="thin" className="text-[var(--color-dorado)]" />
            <span className="font-sans text-[10px] sm:text-[11px] tracking-[0.3em] uppercase text-madera font-light">
              Colección Botánica
            </span>
            <Sparkle size={14} weight="thin" className="text-[var(--color-dorado)]" />
            <div className="h-[1px] w-10 bg-gradient-to-l from-transparent to-[var(--color-dorado)]/30" />
          </motion.div>

          <motion.h2
            className="font-serif text-3xl sm:text-4xl lg:text-5xl text-natura font-light tracking-tight mb-5"
            variants={fadeUpVariants}
            custom={0.1}
          >
            Rituales de Cuidado
          </motion.h2>

          <motion.p
            className="font-sans text-base text-madera font-light max-w-lg mx-auto leading-relaxed"
            variants={fadeUpVariants}
            custom={0.2}
          >
            Cada fórmula es una sinfonía de ingredientes botánicos de origen ético,
            diseñada para elevar tu rutina a un ritual.
          </motion.p>
        </motion.div>

        {/* ── Product Grid (Stagger Cascade) ── */}
        <motion.div 
          className="
            grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4
            gap-x-5 gap-y-12 sm:gap-x-6 sm:gap-y-14 lg:gap-x-7 lg:gap-y-16
          "
          variants={gridContainerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
        >
          {products.map((product, index) => (
            <motion.div key={product.id} variants={index % 2 === 0 ? cardRevealLeft : cardRevealRight}>
              <ProductCard product={product} />
            </motion.div>
          ))}
        </motion.div>

        {/* ── View All CTA ── */}
        <motion.div
          className="flex justify-center mt-16 lg:mt-20"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUpVariants}
          custom={0.2}
        >
          <motion.div
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            transition={{ duration: 0.3, ease: LUXURY_EASE }}
          >
            <Link
              to="/catalogo"
              className="
                inline-flex items-center gap-2
                px-10 py-4
                bg-transparent text-[var(--color-natura)]
                font-sans text-[12px] font-light tracking-[0.2em] uppercase
                rounded-sm
                border border-[var(--color-natura)]/15
                hover:border-[var(--color-natura)]/30
                hover:bg-[var(--color-marfil)]
                transition-all duration-500
                cursor-pointer
              "
            >
              Ver toda la colección
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
