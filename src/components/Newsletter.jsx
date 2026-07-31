import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PaperPlaneRight, CheckCircle } from '@phosphor-icons/react';

export default function Newsletter() {
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubscribed(true);
    setTimeout(() => setSubscribed(false), 5000);
  };

  return (
    <section className="relative py-24 lg:py-32 bg-[#0a0d0b] overflow-hidden flex items-center justify-center">
      {/* Mystical glow background */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-[800px] h-[300px] bg-[var(--color-dorado)]/10 blur-[120px] rounded-full" />
      </div>

      <div className="relative z-10 max-w-3xl mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        >
          <h2 className="font-serif text-3xl sm:text-4xl text-white/90 mb-4">Únete a nuestro círculo</h2>
          <p className="font-sans text-sm sm:text-base text-white/50 tracking-wide font-light mb-10 max-w-lg mx-auto">
            Suscríbete para recibir rituales lunares, conocimientos botánicos y obtén un <span className="text-[var(--color-dorado)]">10% de descuento</span> en tu primera tisana.
          </p>

          <AnimatePresence mode="wait">
            {subscribed ? (
              <motion.div
                key="success"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="flex flex-col items-center justify-center text-[var(--color-dorado)] h-14"
              >
                <CheckCircle size={32} weight="light" className="mb-2" />
                <p className="font-sans text-sm tracking-widest uppercase">¡Gracias por unirte al aquelarre!</p>
              </motion.div>
            ) : (
              <motion.form 
                key="form"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="relative max-w-md mx-auto flex items-center h-14" 
                onSubmit={handleSubmit}
              >
                <input 
                  type="email" 
                  placeholder="Tu esencia (correo electrónico)..." 
                  className="w-full h-full bg-white/5 border border-[var(--color-dorado)]/30 rounded-full pl-6 pr-16 text-white text-sm placeholder:text-white/30 focus:outline-none focus:border-[var(--color-dorado)]/80 transition-colors backdrop-blur-md"
                  required
                />
                <button 
                  type="submit"
                  className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-[var(--color-dorado)]/20 hover:bg-[var(--color-dorado)] flex items-center justify-center text-[var(--color-dorado)] hover:text-white transition-all duration-300"
                >
                  <PaperPlaneRight size={18} weight="fill" />
                </button>
              </motion.form>
            )}
          </AnimatePresence>
          
          <p className="font-sans text-[10px] text-white/30 mt-6 tracking-widest uppercase">
            Respetamos tu energía. Cero spam.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
