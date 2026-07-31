import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus } from '@phosphor-icons/react';

const FAQS = [
  {
    question: "¿Cuánto tardan los envíos?",
    answer: "Procesamos los pedidos en 1 a 2 días hábiles. Una vez despachado, el envío estándar a todo México toma de 3 a 5 días hábiles. Te enviaremos un código de rastreo en cuanto tu paquete inicie su viaje."
  },
  {
    question: "¿Sus productos son aptos para pieles sensibles?",
    answer: "Absolutamente. Formulamos nuestros jabones y esencias con ingredientes 100% naturales, libres de químicos abrasivos, sulfatos y parabenos. Sin embargo, siempre recomendamos hacer una pequeña prueba en tu piel si tienes alergias a plantas específicas."
  },
  {
    question: "¿Cómo funcionan los Kits Esotéricos zodiacales?",
    answer: "Cada kit está curado astrológicamente para potenciar o equilibrar la energía de tu elemento (Fuego, Tierra, Aire o Agua). No necesitas ser un experto; cada kit incluye una guía paso a paso para realizar tu propio ritual de reconexión y armonía."
  },
  {
    question: "¿De qué están hechos los empaques?",
    answer: "Somos fieles a nuestra promesa con la naturaleza. Nuestros empaques son 100% biodegradables o reciclables, utilizando tintas de base vegetal y papeles reciclados post-consumo."
  }
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(null);

  return (
    <section className="relative py-24 lg:py-32 bg-white">
      <div className="max-w-4xl mx-auto px-6 sm:px-8 lg:px-12">
        
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="w-12 h-[1px] bg-[var(--color-dorado)]/40" />
            <span className="font-sans text-[10px] tracking-[0.3em] uppercase text-[var(--color-madera)] font-medium">
              Respuestas Claras
            </span>
            <div className="w-12 h-[1px] bg-[var(--color-dorado)]/40" />
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-[#1a1a1a] font-light mb-4">Preguntas Frecuentes</h2>
        </motion.div>

        <div className="flex flex-col gap-4">
          {FAQS.map((faq, index) => {
            const isOpen = index === openIndex;

            return (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                className="border border-[var(--color-dorado)]/20 rounded-2xl overflow-hidden bg-[#faf9f6]"
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  className="w-full flex items-center justify-between p-6 sm:p-8 text-left focus:outline-none"
                >
                  <span className="font-serif text-lg sm:text-xl text-[#1a1a1a] pr-4">
                    {faq.question}
                  </span>
                  <div className="text-[var(--color-madera)] flex-shrink-0">
                    {isOpen ? <Minus size={20} weight="light" /> : <Plus size={20} weight="light" />}
                  </div>
                </button>
                
                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                    >
                      <div className="px-6 sm:px-8 pb-8 font-sans text-sm sm:text-base text-gray-600 font-light leading-relaxed">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
