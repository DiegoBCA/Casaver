import { motion, useMotionValue, useSpring, useMotionTemplate } from 'framer-motion';
import { Fire, Drop, Wind, Mountains, ShoppingBag, Sparkle } from '@phosphor-icons/react';
import { useCart } from '../context/CartContext';

const SETS = [
  {
    id: 'kit-fuego',
    title: 'Kit Elemento Fuego',
    description: 'Para Aries, Leo y Sagitario. Jabones energizantes de cítricos y maderas rojas para encender tu vitalidad y pasión interior.',
    icon: Fire,
    price: 580,
    image: '/images/elemental_fire.png'
  },
  {
    id: 'kit-tierra',
    title: 'Kit Elemento Tierra',
    description: 'Para Tauro, Virgo y Capricornio. Arcillas purificantes y aromas profundos a bosque para enraizar tu energía y calmar la mente.',
    icon: Mountains,
    price: 580,
    image: '/images/elemental_earth.png'
  },
  {
    id: 'kit-aire',
    title: 'Kit Elemento Aire',
    description: 'Para Géminis, Libra y Acuario. Esencias ligeras de lavanda y menta para despejar la mente y permitir que tus ideas fluyan.',
    icon: Wind,
    price: 580,
    image: '/images/elemental_air.png'
  },
  {
    id: 'kit-agua',
    title: 'Kit Elemento Agua',
    description: 'Para Cáncer, Escorpio y Piscis. Sales marinas marinas y eucalipto para limpiar emociones estancadas y potenciar tu intuición.',
    icon: Drop,
    price: 580,
    image: '/images/elemental_water.png'
  }
];

const LUXURY_EASE = [0.16, 1, 0.3, 1];

const CONSTELLATIONS = [
  // Original 5
  {
    name: "Leo",
    d: "M 600 400 L 620 350 L 670 320 L 700 380 L 680 420 L 600 400 L 750 450 L 800 400 L 850 460 L 820 520 L 750 450",
    stars: [[600, 400], [620, 350], [670, 320], [700, 380], [680, 420], [750, 450], [800, 400], [850, 460], [820, 520]],
    delay: 0,
    duration: 14
  },
  {
    name: "Scorpio",
    d: "M 150 700 L 180 680 L 220 690 L 250 720 L 270 760 L 280 800 L 260 830 L 230 840 L 200 820 L 210 800",
    stars: [[150, 700], [180, 680], [220, 690], [250, 720], [270, 760], [280, 800], [260, 830], [230, 840], [200, 820], [210, 800]],
    delay: 3,
    duration: 12
  },
  {
    name: "Taurus",
    d: "M 700 150 L 750 200 L 800 160 M 750 200 L 850 100 M 750 200 L 780 280 L 820 250 M 780 280 L 730 250",
    stars: [[700, 150], [750, 200], [800, 160], [850, 100], [820, 250], [780, 280], [730, 250]],
    delay: 6,
    duration: 10
  },
  {
    name: "Sagittarius",
    d: "M 400 500 L 450 480 L 500 500 L 550 450 L 600 480 L 550 550 L 450 550 L 400 500 M 500 500 L 550 550 M 450 480 L 450 550 M 450 550 L 400 600",
    stars: [[400, 500], [450, 480], [500, 500], [550, 450], [600, 480], [550, 550], [450, 550], [400, 600]],
    delay: 2,
    duration: 13
  },
  {
    name: "Aries",
    d: "M 200 300 L 350 250 L 450 320",
    stars: [[200, 300], [350, 250], [450, 320]],
    delay: 5,
    duration: 15
  },
  // Added 7 new ones to saturate the sky
  {
    name: "Gemini",
    d: "M 400 100 L 430 150 L 480 120 L 450 80 M 500 150 L 550 120 L 520 80",
    stars: [[400, 100], [430, 150], [480, 120], [450, 80], [500, 150], [550, 120], [520, 80]],
    delay: 1,
    duration: 11
  },
  {
    name: "Cancer",
    d: "M 800 550 L 850 580 L 920 520 M 850 580 L 900 650",
    stars: [[800, 550], [850, 580], [920, 520], [900, 650]],
    delay: 4,
    duration: 16
  },
  {
    name: "Virgo",
    d: "M 50 400 L 100 450 L 120 380 L 80 320 L 40 380",
    stars: [[50, 400], [100, 450], [120, 380], [80, 320], [40, 380]],
    delay: 7,
    duration: 12
  },
  {
    name: "Libra",
    d: "M 400 800 L 450 780 L 520 810 L 480 860 L 420 830 L 400 800",
    stars: [[400, 800], [450, 780], [520, 810], [480, 860], [420, 830]],
    delay: 0,
    duration: 9
  },
  {
    name: "Capricorn",
    d: "M 800 800 L 880 820 L 920 760 L 850 720 L 800 800",
    stars: [[800, 800], [880, 820], [920, 760], [850, 720]],
    delay: 3,
    duration: 14
  },
  {
    name: "Aquarius",
    d: "M 100 550 L 150 500 L 220 530 M 120 600 L 180 550 L 250 580",
    stars: [[100, 550], [150, 500], [220, 530], [120, 600], [180, 550], [250, 580]],
    delay: 5,
    duration: 11
  },
  {
    name: "Pisces",
    d: "M 500 200 L 550 250 L 620 220 M 600 300 L 650 250 L 700 280 M 550 250 L 600 300",
    stars: [[500, 200], [550, 250], [620, 220], [600, 300], [650, 250], [700, 280]],
    delay: 8,
    duration: 13
  }
];

/* ─── Constellation Background ─── */
function ConstellationsBackground() {
  const ambientStars = Array.from({ length: 80 }).map((_, i) => ({
    id: i,
    size: Math.random() * 2 + 0.5,
    left: `${Math.random() * 100}%`,
    top: `${Math.random() * 100}%`,
    duration: Math.random() * 3 + 2,
    delay: Math.random() * 2,
  }));

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Ambient background stars */}
      {ambientStars.map((star) => (
        <motion.div
          key={`bg-${star.id}`}
          className="absolute rounded-full bg-white shadow-[0_0_12px_rgba(255,255,255,1)]"
          style={{
            width: star.size,
            height: star.size,
            left: star.left,
            top: star.top,
          }}
          animate={{
            opacity: [0.2, 0.9, 0.2],
          }}
          transition={{
            duration: star.duration,
            delay: star.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}

      {/* Animated Constellations */}
      <div className="absolute inset-0 opacity-100 drop-shadow-[0_0_16px_rgba(255,255,255,1)]">
        <svg className="w-full h-full" viewBox="0 0 1000 1000" preserveAspectRatio="xMidYMid slice">
          {CONSTELLATIONS.map((constellation, i) => (
            <g key={`const-${i}`}>
              <motion.path
                d={constellation.d}
                fill="none"
                stroke="white"
                strokeWidth="1.5"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: [0, 1, 1, 0], opacity: [0, 0.8, 0.8, 0] }}
                transition={{
                  duration: constellation.duration,
                  delay: constellation.delay,
                  repeat: Infinity,
                  ease: "easeInOut",
                  times: [0, 0.25, 0.75, 1]
                }}
              />
              {constellation.stars.map((pos, j) => (
                <motion.circle
                  key={`star-${i}-${j}`}
                  cx={pos[0]}
                  cy={pos[1]}
                  r="4"
                  fill="white"
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: [0, 1, 1, 0], scale: [0, 1.4, 1.4, 0] }}
                  transition={{
                    duration: constellation.duration,
                    delay: constellation.delay,
                    repeat: Infinity,
                    ease: "easeInOut",
                    times: [0, 0.25, 0.75, 1]
                  }}
                />
              ))}
            </g>
          ))}
        </svg>
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-[#02040c] via-transparent to-[#02040c]" />
    </div>
  );
}

/* ─── Magnetic Button Component ─── */
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

/* ─── Set Card ─── */
function SetCard({ set, index }) {
  const Icon = set.icon;
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const { addToCart } = useCart();

  function handleMouseMove({ currentTarget, clientX, clientY }) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  const hoverBackground = useMotionTemplate`
    radial-gradient(
      200px circle at ${mouseX}px ${mouseY}px,
      rgba(217, 119, 6, 0.15),
      transparent 80%
    )
  `;

  const handleAddToCart = () => {
    addToCart({
      id: set.id,
      name: set.title,
      price: set.price,
      image: set.image, 
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.85, filter: 'blur(12px)' }}
      whileInView={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 1, delay: index * 0.15, ease: LUXURY_EASE }}
      onMouseMove={handleMouseMove}
      className="
        group relative flex flex-col h-[500px] sm:h-[550px] w-full
        bg-white/5 backdrop-blur-md rounded-2xl
        border border-[var(--color-dorado)]/20
        hover:border-[var(--color-dorado)]/50
        transition-colors duration-500
        overflow-hidden
      "
    >
      {/* Dynamic Glow Background */}
      <motion.div
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100 z-0"
        style={{ background: hoverBackground }}
      />

      {/* Image Section */}
      <div className="relative h-[45%] w-full overflow-hidden shrink-0">
        <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-500 z-10 pointer-events-none" />
        <motion.img 
          src={set.image} 
          alt={set.title}
          className="w-full h-full object-cover"
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.6, ease: LUXURY_EASE }}
        />
      </div>

      <div className="relative z-10 flex flex-col flex-grow p-6 sm:p-8">
        <div className="flex items-center gap-3 mb-4 text-[var(--color-dorado)]">
          <Icon size={24} weight="thin" />
          <h3 className="font-serif text-xl sm:text-2xl text-white/90 font-light">
            {set.title}
          </h3>
        </div>
        
        <p className="font-sans text-[12px] sm:text-[13px] text-white/60 font-light leading-relaxed mb-6 flex-grow">
          {set.description}
        </p>

        <div className="flex items-center justify-between mt-auto pt-4 border-t border-[var(--color-dorado)]/15">
          <span className="font-sans text-xl sm:text-2xl text-[var(--color-dorado)] font-light tracking-wide tabular-nums">
            ${set.price} 
            <span className="font-sans text-[10px] tracking-widest text-[var(--color-dorado)]/60 uppercase ml-2">MXN</span>
          </span>
          
          <MagneticButton
            onClick={handleAddToCart}
            className="
              inline-flex items-center gap-2
              text-[var(--color-dorado)]
              font-sans text-[10px] tracking-[0.15em] uppercase
              hover:text-white transition-colors duration-300
            "
          >
            Agregar <ShoppingBag size={14} />
          </MagneticButton>
        </div>
      </div>
    </motion.div>
  );
}

/* ─── Main Component ─── */
export default function EsotericServices() {
  return (
    <section id="colecciones" className="relative py-32 lg:py-48 bg-[#02040c] overflow-hidden">
      <ConstellationsBackground />
      
      {/* Subtle ambient lighting */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-[var(--color-dorado)]/5 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-blue-900/15 blur-[150px] rounded-full pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 1, ease: LUXURY_EASE }}
        >
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="h-[1px] w-12 bg-gradient-to-r from-transparent to-[var(--color-dorado)]/40" />
            <Sparkle size={14} weight="thin" className="text-[var(--color-dorado)]" />
            <span className="font-sans text-[10px] sm:text-[11px] tracking-[0.35em] uppercase text-[var(--color-dorado)] font-light">
              Espacio Esotérico
            </span>
            <Sparkle size={14} weight="thin" className="text-[var(--color-dorado)]" />
            <div className="h-[1px] w-12 bg-gradient-to-l from-transparent to-[var(--color-dorado)]/40" />
          </div>

          <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-white/90 font-light tracking-tight mb-6">
            Conecta con las Estrellas
          </h2>

          <p className="font-sans text-base text-white/60 font-light max-w-xl mx-auto leading-relaxed">
            Más allá de la botánica, ofrecemos rituales completos curados por expertos astrólogos. Cada kit elemental está diseñado para equilibrar y potenciar la energía de tu signo zodiacal.
          </p>
        </motion.div>

        <style>
          {`
            .hide-scrollbar::-webkit-scrollbar {
              display: none;
            }
            .hide-scrollbar {
              -ms-overflow-style: none;
              scrollbar-width: none;
            }
          `}
        </style>

        <div className="flex overflow-x-auto snap-x snap-mandatory gap-4 lg:gap-6 pb-8 -mx-6 px-6 sm:-mx-8 sm:px-8 lg:-mx-12 lg:px-12 hide-scrollbar">
          {SETS.map((set, index) => (
            <div key={set.id} className="snap-center shrink-0 w-[85vw] sm:w-[350px] lg:w-[400px]">
              <SetCard set={set} index={index} />
            </div>
          ))}
        </div>
      </div>
      
      {/* Golden Frame */}
      <div className="absolute inset-4 sm:inset-6 lg:inset-8 border border-[var(--color-dorado)]/30 rounded-2xl pointer-events-none z-20" />
    </section>
  );
}
