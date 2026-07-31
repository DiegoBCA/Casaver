import { motion } from 'framer-motion';
import { Star } from '@phosphor-icons/react';

const REVIEWS = [
  {
    text: "El Jabón Suave de Avena y Maderas realmente transformó mi rutina matutina. Es como traer la tranquilidad del bosque a mi propio baño.",
    author: "Elena M.",
    product: "Jabón de Avena"
  },
  {
    text: "Los Kits Esotéricos están curados con una intención palpable. El Kit de Fuego me ha devuelto la energía que necesitaba para mis proyectos.",
    author: "Sofía R.",
    product: "Kit Elemento Fuego"
  },
  {
    text: "Las tisanas son de una calidad excepcional. Tomar 'Dulces Sueños' por la noche se ha vuelto mi ritual sagrado para desconectar.",
    author: "Valeria T.",
    product: "Tisana Dulces Sueños"
  }
];

export default function Testimonials() {
  return (
    <section className="py-24 lg:py-32 bg-[#faf9f6]">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="font-serif text-3xl sm:text-4xl text-[var(--color-natura)] mb-4">Lo que dice nuestro aquelarre</h2>
          <div className="w-16 h-[1px] bg-[var(--color-dorado)] mx-auto" />
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
          {REVIEWS.map((review, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.2, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-col items-center text-center p-8 bg-white rounded-2xl shadow-[0_4px_24px_rgba(0,0,0,0.03)] border border-[var(--color-dorado)]/10"
            >
              <div className="flex gap-1 mb-6 text-[var(--color-dorado)]">
                {[...Array(5)].map((_, j) => (
                  <Star key={j} weight="fill" size={16} />
                ))}
              </div>
              
              <p className="font-serif text-[15px] text-gray-700 italic leading-relaxed mb-8 flex-grow">
                "{review.text}"
              </p>
              
              <div>
                <p className="font-sans text-[13px] font-medium text-[var(--color-natura)] tracking-wide">{review.author}</p>
                <p className="font-sans text-[11px] text-gray-400 mt-1">{review.product}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
