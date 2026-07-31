import { motion, useMotionValue, useSpring, useMotionTemplate } from 'framer-motion';
import { Leaf, Coffee, Plant, ShoppingBag } from '@phosphor-icons/react';
import { useCart } from '../context/CartContext';

const TEAS = [
  {
    id: 'tisana-lavanda',
    title: 'Tisana Dulces Sueños',
    description: 'Flores de lavanda francesa y manzanilla dorada. Una infusión calmante diseñada para relajar el sistema nervioso y preparar el cuerpo para un descanso profundo.',
    icon: Leaf,
    price: 250,
    image: '/images/tisana_lavanda_1782236183000.png'
  },
  {
    id: 'tisana-citricos',
    title: 'Tisana Despertar Cítrico',
    description: 'Rodajas de naranja secadas al sol, ralladura de limón y un toque de flor de jamaica. Un impulso vibrante de antioxidantes para iluminar tus mañanas.',
    icon: Coffee,
    price: 250,
    image: '/images/tisana_citricos_1782236193583.png'
  },
  {
    id: 'tisana-jengibre',
    title: 'Tisana Raíces de Fuego',
    description: 'Raíz de jengibre puro, ramas de canela y cardamomo. Una mezcla terrosa y especiada para encender tu fuego interno y apoyar la digestión.',
    icon: Plant,
    price: 250,
    image: '/images/tisana_jengibre_1782236201357.png'
  }
];

const LUXURY_EASE = [0.16, 1, 0.3, 1];

function MagneticButton({ children, onClick, className }) {
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
    x.set(mouseX * 0.3);
    y.set(mouseY * 0.3);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.button
      onClick={onClick}
      className={className}
      style={{ x: springX, y: springY }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      transition={{ duration: 0.4, ease: LUXURY_EASE }}
    >
      {children}
    </motion.button>
  );
}

function TeaCard({ tea, index }) {
  const Icon = tea.icon;
  const { addToCart } = useCart();

  const handleAddToCart = () => {
    addToCart({
      id: tea.id,
      name: tea.title,
      price: tea.price,
      image: tea.image,
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.8, delay: index * 0.1, ease: LUXURY_EASE }}
      className="
        group relative flex flex-col w-full h-[550px]
        bg-[#1b231d] rounded-2xl
        border border-[var(--color-dorado)]/20
        hover:border-[var(--color-dorado)]/50
        transition-colors duration-500
        overflow-hidden
      "
    >
      {/* Image Section */}
      <div className="relative h-[45%] w-full overflow-hidden shrink-0">
        <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-500 z-10 pointer-events-none" />
        <motion.img 
          src={tea.image} 
          alt={tea.title}
          className="w-full h-full object-cover"
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.6, ease: LUXURY_EASE }}
        />
      </div>

      <div className="relative z-10 flex flex-col flex-grow p-6 sm:p-8">
        <div className="flex items-center gap-3 mb-4 text-[var(--color-dorado)]">
          <Icon size={24} weight="thin" />
          <h3 className="font-serif text-xl sm:text-2xl text-[var(--color-marfil)] font-light">
            {tea.title}
          </h3>
        </div>
        
        <p className="font-sans text-[12px] sm:text-[13px] text-white/60 font-light leading-relaxed mb-6 flex-grow">
          {tea.description}
        </p>

        <div className="flex items-center justify-between mt-auto pt-4 border-t border-[var(--color-dorado)]/15">
          <span className="font-sans text-xl sm:text-2xl text-[var(--color-dorado)] font-light tracking-wide tabular-nums">
            ${tea.price}
            <span className="font-sans text-[10px] tracking-widest text-[var(--color-dorado)]/60 uppercase ml-2">MXN</span>
          </span>
          
          <MagneticButton
            onClick={handleAddToCart}
            className="
              inline-flex items-center justify-center gap-2
              px-6 py-2 rounded-full
              bg-[var(--color-dorado)]/10 hover:bg-[var(--color-dorado)]/20
              text-[var(--color-dorado)]
              font-sans text-[10px] tracking-[0.15em] uppercase
              transition-colors duration-300
            "
          >
            Agregar <ShoppingBag size={14} />
          </MagneticButton>
        </div>
      </div>
    </motion.div>
  );
}

const HERB_COLORS = ['#8a9a5b', '#b5a642', '#6b705c', '#506e55', '#a3b18a'];

function FallingHerbs() {
  const particles = Array.from({ length: 45 }).map((_, i) => ({
    id: i,
    x: Math.random() * 100,
    delay: Math.random() * 15,
    duration: Math.random() * 8 + 7,
    rotation: Math.random() * 360,
    scale: Math.random() * 0.6 + 0.4,
    color: HERB_COLORS[Math.floor(Math.random() * HERB_COLORS.length)],
    type: Math.random() > 0.5 ? 'fill' : 'duotone'
  }));

  const pileLeaves = Array.from({ length: 150 }).map((_, i) => {
    // Normal distribution approximation for a natural mound
    const xOffset = (Math.random() + Math.random() + Math.random() - 1.5) * 40; // -60 to +60
    const heightLimit = Math.max(0, 50 - Math.abs(xOffset) * 1.2); 
    return {
      id: i,
      x: 50 + xOffset, // Centered at 50%
      bottom: Math.random() * heightLimit - 15,
      rotation: Math.random() * 360,
      scale: Math.random() * 0.8 + 0.5,
      color: HERB_COLORS[Math.floor(Math.random() * HERB_COLORS.length)]
    };
  });

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      {/* Falling Particles */}
      {particles.map((p) => (
        <motion.div
          key={`particle-${p.id}`}
          className="absolute top-[-5%]"
          style={{
            left: `${p.x}%`,
            color: p.color,
          }}
          initial={{ scale: p.scale }}
          animate={{
            y: ['0vh', '105vh'],
            rotate: [p.rotation, p.rotation + 360],
            opacity: [0, 0.6, 0.6, 0],
            x: [0, Math.sin(p.id) * 60] // subtle horizontal drift
          }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            repeat: Infinity,
            ease: "linear"
          }}
        >
          <Leaf weight={p.type} size={24} />
        </motion.div>
      ))}

      {/* The Pile */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full h-[80px]">
        {/* Glow behind the pile */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[400px] h-[40px] bg-[#8a9a5b]/10 blur-[30px]" />
        
        {pileLeaves.map((p) => (
          <div
            key={`pile-${p.id}`}
            className="absolute"
            style={{
              left: `${p.x}%`,
              bottom: `${p.bottom}px`,
              transform: `rotate(${p.rotation}deg) scale(${p.scale})`,
              color: p.color,
              opacity: 0.8
            }}
          >
            <Leaf weight="fill" size={24} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default function TeaCollection() {
  return (
    <section className="relative py-24 lg:py-32 bg-[#121814] overflow-hidden" id="tisanas">
      <FallingHerbs />
      
      {/* Golden Frame */}
      <div className="absolute inset-4 sm:inset-6 lg:inset-8 border border-[var(--color-dorado)]/30 rounded-2xl pointer-events-none z-20" />
      
      {/* Subtle ambient lighting */}
      <div className="absolute top-0 left-0 w-full h-[500px] bg-green-900/10 blur-[120px] pointer-events-none" />
      
      <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <motion.div
          className="text-center mb-16 lg:mb-24"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 1, ease: LUXURY_EASE }}
        >
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="h-[1px] w-12 bg-gradient-to-r from-transparent to-[var(--color-dorado)]/40" />
            <Leaf size={14} weight="thin" className="text-[var(--color-dorado)]" />
            <span className="font-sans text-[10px] sm:text-[11px] tracking-[0.35em] uppercase text-[var(--color-dorado)] font-light">
              Rituales Botánicos
            </span>
            <Leaf size={14} weight="thin" className="text-[var(--color-dorado)]" />
            <div className="h-[1px] w-12 bg-gradient-to-l from-transparent to-[var(--color-dorado)]/40" />
          </div>

          <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-[var(--color-marfil)] font-light tracking-tight mb-6">
            Tisanas para el Alma
          </h2>

          <p className="font-sans text-base text-white/60 font-light max-w-xl mx-auto leading-relaxed">
            Complementa tu cuidado exterior con nutrición interior. Nuestras infusiones artesanales combinan hierbas adaptógenas y flores místicas para crear santuarios de paz en tu día a día.
          </p>
        </motion.div>

        <motion.div 
          className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.2, delayChildren: 0.15 } },
          }}
          style={{ perspective: 1200 }}
        >
          {TEAS.map((tea, index) => (
            <motion.div 
              key={tea.id}
              variants={{
                hidden: { opacity: 0, rotateX: -25, y: 60, scale: 0.9 },
                visible: { 
                  opacity: 1, rotateX: 0, y: 0, scale: 1,
                  transition: { duration: 1, ease: LUXURY_EASE },
                },
              }}
              style={{ transformStyle: 'preserve-3d' }}
            >
              <TeaCard tea={tea} index={index} />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
