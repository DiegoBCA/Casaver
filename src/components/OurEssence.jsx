import { motion } from 'framer-motion';

const LUXURY_EASE = [0.16, 1, 0.3, 1];

export default function OurEssence() {
  return (
    <section className="relative py-24 lg:py-32 bg-white overflow-hidden" id="esencia">
      {/* Background accents */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[var(--color-madera-light)]/5 rounded-full blur-[100px] pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-24">
          
          {/* Left: Image */}
          <motion.div 
            className="w-full lg:w-1/2 relative"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 1.2, ease: LUXURY_EASE }}
          >
            <div className="relative w-full aspect-[4/5] rounded-[2rem] overflow-hidden shadow-2xl shadow-[var(--color-madera-light)]/20">
              <img 
                src="/images/our_essence.png" 
                alt="Ingredientes botánicos y místicos" 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/10" />
            </div>
            
            {/* Decorative abstract elements */}
            <motion.div 
              className="absolute -bottom-8 -right-8 w-32 h-32 rounded-full border border-[var(--color-dorado)]/30 backdrop-blur-sm z-[-1]"
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            />
          </motion.div>

          {/* Right: Text Content */}
          <motion.div 
            className="w-full lg:w-1/2 flex flex-col justify-center"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 1, delay: 0.2, ease: LUXURY_EASE }}
          >
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-[1px] bg-[var(--color-dorado)]/60" />
              <span className="font-sans text-[11px] tracking-[0.3em] uppercase text-[var(--color-madera)] font-medium">
                Nuestra Historia
              </span>
            </div>

            <h2 className="font-serif text-4xl sm:text-5xl text-[var(--color-natura)] leading-tight mb-8">
              Donde la botánica se encuentra con la <span className="italic font-light">magia</span>.
            </h2>

            <div className="space-y-6 font-sans text-[15px] sm:text-base text-gray-600 font-light leading-relaxed">
              <p>
                Casa Verum nació de la profunda necesidad de volver al origen. En un mundo acelerado, decidimos detenernos, observar la naturaleza y extraer su esencia más pura.
              </p>
              <p>
                Creemos que el cuidado personal no es solo una rutina de higiene, sino un ritual sagrado. Cada jabón, cada infusión y cada gota de esencia es creada artesanalmente respetando los ciclos lunares y las propiedades astrológicas de la tierra.
              </p>
              <p className="font-medium text-[var(--color-madera)]">
                Todo lo que toca tu piel debe elevar tu espíritu.
              </p>
            </div>

            <div className="mt-12 flex items-center gap-6">
              <div className="w-16 h-16 rounded-full bg-[var(--color-madera-light)]/10 flex items-center justify-center text-[var(--color-dorado)] border border-[var(--color-dorado)]/20">
                <span className="font-serif text-2xl italic">V</span>
              </div>
              <div>
                <p className="font-serif text-xl text-[var(--color-natura)]">Casa Verum</p>
                <p className="font-sans text-xs tracking-[0.2em] uppercase text-gray-400 mt-1">Fundadores</p>
              </div>
            </div>

          </motion.div>
        </div>
      </div>
    </section>
  );
}
