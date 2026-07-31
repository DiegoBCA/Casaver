import { motion } from 'framer-motion';
import { Plant, HandHeart, Flower, Sparkle } from '@phosphor-icons/react';

const VALUES = [
  {
    icon: Plant,
    num: '01',
    title: '100% Natural',
    desc: 'Ingredientes puros extraídos directamente de la tierra, sin alteraciones.'
  },
  {
    icon: HandHeart,
    num: '02',
    title: 'Hecho a Mano',
    desc: 'Elaboración artesanal local con extrema atención al detalle.'
  },
  {
    icon: Flower,
    num: '03',
    title: 'Cero Químicos',
    desc: 'Fórmulas limpias. Completamente libres de sulfatos y parabenos.'
  },
  {
    icon: Sparkle,
    num: '04',
    title: 'Energía Curada',
    desc: 'Cada elemento es seleccionado bajo estricta intención y astrología.'
  }
];

export default function BrandValues() {
  return (
    <section id="esencia" className="relative w-full bg-[#fcfbf9] py-24 lg:py-32 z-10 border-y border-[var(--color-dorado)]/15">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="flex flex-col lg:flex-row gap-16 lg:gap-24">
          
          {/* Left: Editorial Title */}
          <div className="w-full lg:w-1/3 flex flex-col justify-start pt-4">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="flex items-center gap-4 mb-8">
                <div className="w-8 h-[1px] bg-[var(--color-madera)]/40" />
                <span className="font-sans text-[10px] tracking-[0.3em] uppercase text-[var(--color-madera)] font-medium">
                  Nuestra Promesa
                </span>
              </div>
              
              <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-[#1a1a1a] font-light leading-[1.1] mb-6">
                Volver al <br/>
                <span className="italic text-[var(--color-madera)]">origen puro.</span>
              </h2>
              
              <p className="font-sans text-sm text-gray-500 font-light leading-relaxed max-w-sm">
                Creemos en el lujo que proviene de la tierra. Sin atajos, sin químicos. Solo botánica, tiempo e intención pura.
              </p>
            </motion.div>
          </div>

          {/* Right: Premium List */}
          <div className="w-full lg:w-2/3 flex flex-col">
            {VALUES.map((val, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="group flex flex-col sm:flex-row sm:items-center py-8 border-t border-[var(--color-dorado)]/20 last:border-b hover:bg-[var(--color-dorado)]/[0.02] transition-colors duration-500 cursor-default"
              >
                <div className="flex items-center sm:w-1/3 mb-4 sm:mb-0 gap-6">
                  <span className="font-serif text-3xl text-[var(--color-dorado)]/40 font-light italic group-hover:text-[var(--color-dorado)] transition-colors duration-500">
                    {val.num}
                  </span>
                  <h4 className="font-sans text-[13px] tracking-[0.2em] text-[#1a1a1a] uppercase font-medium">
                    {val.title}
                  </h4>
                </div>
                
                <div className="sm:w-2/3 flex items-center justify-between sm:pl-8">
                  <p className="font-serif text-[15px] text-gray-500 italic max-w-sm">
                    {val.desc}
                  </p>
                  <div className="hidden sm:flex text-[var(--color-dorado)]/30 group-hover:text-[var(--color-madera)] transition-colors duration-500">
                    <val.icon size={24} weight="light" />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
