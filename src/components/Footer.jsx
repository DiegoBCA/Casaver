import { InstagramLogo } from '@phosphor-icons/react';
import { motion } from 'framer-motion';
import logo from '../assets/logo.png';

export default function Footer() {
  return (
    <footer className="bg-white border-t border-stone-200">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-20 lg:py-28">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-16 lg:gap-24">
          
          {/* ── Column 1: La Marca ── */}
          <div className="flex flex-col items-start">
            <motion.a 
              href="#"
              className="inline-block mb-6"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            >
              <img
                src={logo}
                alt="Casa Verum"
                className="h-14 w-auto object-contain opacity-80 mix-blend-multiply"
              />
            </motion.a>
            <p className="font-sans text-sm text-madera font-light leading-relaxed max-w-xs">
              Alta botánica y astrología. Formulaciones de ultra-lujo para conectar con tu verdadera esencia.
            </p>
          </div>

          {/* ── Column 2: Legal y Envíos ── */}
          <div className="flex flex-col">
            <h4 className="font-serif text-lg text-natura mb-8 tracking-wider">
              Legal & Envíos
            </h4>
            <ul className="space-y-4">
              <li>
                <a href="#" className="font-sans text-xs tracking-wide text-madera hover:text-natura transition-colors duration-300">
                  Política de Envíos
                </a>
              </li>
              <li>
                <a href="#" className="font-sans text-xs tracking-wide text-madera hover:text-natura transition-colors duration-300">
                  Aviso de Privacidad
                </a>
              </li>
              <li>
                <a href="#" className="font-sans text-xs tracking-wide text-madera hover:text-natura transition-colors duration-300">
                  Términos del Ritual
                </a>
              </li>
            </ul>
          </div>

          {/* ── Column 3: Comunidad ── */}
          <div className="flex flex-col">
            <h4 className="font-serif text-lg text-natura mb-8 tracking-wider">
              Conecta con tu Energía
            </h4>
            <motion.a
              href="https://instagram.com/vertarot"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 font-sans text-xs tracking-widest uppercase text-madera hover:text-natura transition-colors duration-300 group"
              whileHover={{ x: 4 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            >
              <InstagramLogo size={20} weight="thin" className="group-hover:text-natura transition-colors duration-300" />
              <span>@vertarot</span>
            </motion.a>
          </div>

        </div>

        {/* ── Bottom Bar ── */}
        <div className="mt-20 pt-10 border-t border-stone-100 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="font-sans text-[10px] text-stone-400 tracking-[0.2em] uppercase">
            © {new Date().getFullYear()} Casa Verum.
          </p>
          <div className="flex items-center gap-2">
            <span className="w-1 h-1 rounded-full bg-stone-200" />
            <span className="w-1 h-1 rounded-full bg-stone-300" />
            <span className="w-1 h-1 rounded-full bg-stone-200" />
          </div>
        </div>
      </div>
    </footer>
  );
}
