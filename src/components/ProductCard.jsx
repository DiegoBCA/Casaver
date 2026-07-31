import { motion, useMotionValue, useTransform } from 'framer-motion';
import { ShoppingBag } from '@phosphor-icons/react';
import { useCart } from '../context/CartContext';

/**
 * ProductCard — Premium product card with hover zoom + slide-up cart button.
 *
 * Props:
 *  - product: { name, subtitle, price, image, etc. }
 */

const LUXURY_EASE = [0.16, 1, 0.3, 1];

export default function ProductCard({ product }) {
  const { addToCart } = useCart();

  // ── 3D Tilt Logic ──
  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);

  const rotateX = useTransform(mouseY, [0, 1], [8, -8]);
  const rotateY = useTransform(mouseX, [0, 1], [-8, 8]);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    mouseX.set((e.clientX - rect.left) / rect.width);
    mouseY.set((e.clientY - rect.top) / rect.height);
  };

  const handleMouseLeave = () => {
    mouseX.set(0.5);
    mouseY.set(0.5);
  };

  return (
    <motion.article
      className="group relative flex flex-col cursor-pointer"
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.6, ease: LUXURY_EASE }}
      id={`product-card-${product.id}`}
    >
      {/* ── Image Container (with 3D Tilt + Mask Reveal) ── */}
      <motion.div
        className="relative aspect-[3/4] rounded-2xl overflow-hidden bg-[#f0fdfa] mb-5"
        initial={{ clipPath: 'inset(100% 0 0 0)' }}
        whileInView={{ clipPath: 'inset(0% 0 0 0)' }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 1.2, ease: LUXURY_EASE }}
      >
      <motion.div 
        className="relative w-full h-full"
        style={{ perspective: 1000, transformStyle: "preserve-3d" }}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        <motion.div
          className="absolute inset-0 w-full h-full"
          style={{ rotateX, rotateY }}
        >
          {/* Actual Product Image */}
          <motion.img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover origin-center"
            initial={{ scale: 1.01 }}
            whileHover={{ scale: 1.15 }}
            transition={{ duration: 0.8, ease: LUXURY_EASE }}
          />
        </motion.div>

        {/* Hover: bottom gradient overlay for button reveal */}
        <div className="
          absolute inset-x-0 bottom-0 h-28
          bg-gradient-to-t from-black/20 via-black/8 to-transparent
          opacity-0 group-hover:opacity-100
          transition-opacity duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]
          pointer-events-none
        " />

        {/* Hover: slide-up "Agregar al Carrito" button */}
        <div className="
          absolute inset-x-0 bottom-0
          flex justify-center
          pb-5 px-4
          translate-y-full group-hover:translate-y-0
          opacity-0 group-hover:opacity-100
          transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]
        ">
          <motion.button
            className="
              flex items-center gap-2
              px-6 py-3
              bg-white/90 backdrop-blur-md
              text-natura
              font-sans text-[11px] font-light tracking-[0.18em] uppercase
              rounded-sm
              border border-[var(--color-dorado)]/20
              hover:bg-white hover:border-[var(--color-dorado)]/40
              hover:shadow-[0_4px_20px_-4px_rgba(6,78,59,0.12)]
              transition-all duration-300
              cursor-pointer
            "
            whileTap={{ scale: 0.96 }}
            onClick={(e) => {
              e.stopPropagation();
              addToCart(product);
            }}
          >
            <ShoppingBag size={14} weight="thin" />
            Agregar al Carrito
          </motion.button>
        </div>

        {/* Category tag */}
        {product.tag && (
          <span className="
            absolute top-4 left-4
            px-3 py-1
            bg-white/80 backdrop-blur-sm
            font-sans text-[9px] tracking-[0.2em] uppercase
            text-natura/70
            rounded-sm
          ">
            {product.tag}
          </span>
        )}
      </motion.div>
      </motion.div>

      {/* ── Product Info ── */}
      <div className="flex flex-col gap-1.5 px-0.5">
        {/* Category */}
        {product.category && (
          <span className="font-sans text-[10px] tracking-[0.2em] uppercase text-madera-light font-light">
            {product.category}
          </span>
        )}

        {/* Product Name */}
        <h3 className="
          font-serif text-lg sm:text-xl text-natura font-light
          leading-snug tracking-wide
          group-hover:text-natura-light
          transition-colors duration-300
        ">
          {product.name}
        </h3>

        {/* Price */}
        <div className="mt-2 flex items-center">
          <span className="font-sans text-xl sm:text-2xl text-natura font-light tracking-wide tabular-nums">
            {product.price.split(' ')[0]}
            <span className="font-sans text-[11px] tracking-widest text-natura/60 uppercase ml-2 font-light">MXN</span>
          </span>
        </div>

        {/* Description */}
        {product.description && (
          <p className="font-sans text-[12px] text-madera/80 font-light mt-1 leading-relaxed line-clamp-2">
            {product.description}
          </p>
        )}
      </div>
    </motion.article>
  );
}
