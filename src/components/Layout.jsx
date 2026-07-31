import { useState, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useTransform, useMotionValueEvent } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import { Bag, List, X } from '@phosphor-icons/react';
import logo from '../assets/logo.png';
import { useCart } from '../context/CartContext';
import CartModal from './CartModal';
import Footer from './Footer';

/**
 * Layout — Main application wrapper
 * Includes the sticky glass-morphism Navbar and a Footer.
 */
export default function Layout({ children }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { scrollY } = useScroll();
  const location = useLocation();

  // Gold accent line width based on scroll
  const goldLineWidth = useTransform(scrollY, [0, 300], ['0%', '100%']);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    
    // Handle anchor scrolling
    if (location.hash) {
      setTimeout(() => {
        const el = document.getElementById(location.hash.substring(1));
        if (el) {
          if (window.lenis) {
            window.lenis.scrollTo(el, { offset: -80 });
          } else {
            el.scrollIntoView({ behavior: 'smooth' });
          }
        }
      }, 100);
    } else if (location.pathname === '/') {
      if (window.lenis) window.lenis.scrollTo(0, { immediate: true });
      else window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    return () => window.removeEventListener('scroll', handleScroll);
  }, [location.pathname, location.hash]);

  const navLinks = [
    { label: 'Inicio', href: '/' },
    { label: 'Catálogo', href: '/catalogo' },
    { label: 'Colecciones', href: '/#colecciones' },
    { label: 'Rituales', href: '/#rituales' },
  ];

  return (
    <div className="relative min-h-screen bg-white">
      {/* ═══════════════ NAVBAR (Meet Cleo "Floating Pill" Style) ═══════════════ */}
      <motion.header
        initial={{ y: -100, x: '-50%' }}
        animate={{ y: 0, x: '-50%' }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className={`
          fixed top-4 sm:top-6 left-1/2 z-50
          w-[calc(100%-2rem)] max-w-5xl rounded-full
          border transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]
          ${isScrolled
            ? 'glass-strong shadow-[0_8px_32px_rgba(0,0,0,0.1)] border-[var(--color-dorado)]/20'
            : 'bg-white/90 backdrop-blur-md shadow-sm border-[var(--color-dorado)]/10'
          }
        `}
      >
        <nav className="px-6 sm:px-8">
          <div className="flex items-center justify-between h-12 sm:h-14 lg:h-14">

            {/* ─── Left: Navigation Links (Desktop) ─── */}
            <div className="hidden lg:flex items-center gap-8 flex-1">
              {navLinks.slice(0, 2).map((link) => (
                <NavLink key={link.label} href={link.href}>
                  {link.label}
                </NavLink>
              ))}
            </div>

            {/* ─── Mobile hamburger ─── */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-natura hover:text-natura-light transition-colors duration-300"
              aria-label="Menú de navegación"
              id="mobile-menu-toggle"
            >
              <AnimatePresence mode="wait">
                {mobileMenuOpen ? (
                  <motion.div
                    key="close"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <X size={24} weight="thin" />
                  </motion.div>
                ) : (
                  <motion.div
                    key="menu"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <List size={24} weight="thin" />
                  </motion.div>
                )}
              </AnimatePresence>
            </button>

            {/* ─── Center: Logo ─── */}
            <Link
              to="/"
              className="flex items-center justify-center flex-shrink-0 mx-4 lg:mx-8"
              id="navbar-logo"
            >
              <motion.img
                src={logo}
                alt="Casa Verum — Productos Naturales Puros y Auténticos"
                className="h-12 sm:h-14 lg:h-16 w-auto object-contain drop-shadow-sm mix-blend-multiply"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              />
            </Link>

            {/* ─── Right: Navigation Links (Desktop) + Cart ─── */}
            <div className="hidden lg:flex items-center gap-8 flex-1 justify-end">
              {navLinks.slice(2).map((link) => (
                <NavLink key={link.label} href={link.href}>
                  {link.label}
                </NavLink>
              ))}

              {/* Divider */}
              <div className="w-[1px] h-5 bg-[var(--color-madera-light)]/30" />

              {/* Cart */}
              <CartButton />
            </div>

            {/* ─── Mobile Cart ─── */}
            <div className="lg:hidden">
              <CartButton />
            </div>
          </div>
        </nav>
      </motion.header>

      {/* ═══════════════ MOBILE MENU ═══════════════ */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 lg:hidden"
            id="mobile-menu-overlay"
          >
            {/* Backdrop */}
            <motion.div
              className="absolute inset-0 bg-black/20 backdrop-blur-sm"
              onClick={() => setMobileMenuOpen(false)}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            />

            {/* Menu Panel */}
            <motion.nav
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="
                absolute top-0 left-0 bottom-0 w-[85%] max-w-sm
                bg-white/95 backdrop-blur-xl
                shadow-[var(--shadow-elevated)]
                flex flex-col
                pt-28 px-8 pb-10
              "
            >
              {/* Nav Links */}
              <div className="flex flex-col gap-2">
                {navLinks.map((link, index) => (
                  <motion.div
                    key={link.label}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{
                      delay: index * 0.07,
                      duration: 0.4,
                      ease: [0.16, 1, 0.3, 1],
                    }}
                  >
                    <Link
                      to={link.href}
                      onClick={(e) => {
                        setMobileMenuOpen(false);
                        if (link.href.includes('#')) {
                          const hash = link.href.split('#')[1];
                          if (location.pathname === '/') {
                            e.preventDefault();
                            setTimeout(() => {
                              const el = document.getElementById(hash);
                              if (el) {
                                if (window.lenis) {
                                  window.lenis.scrollTo(el, { offset: -80 });
                                } else {
                                  const top = el.getBoundingClientRect().top + window.scrollY - 80;
                                  window.scrollTo({ top, behavior: 'smooth' });
                                }
                                window.history.pushState(null, '', `#${hash}`);
                              }
                            }, 100);
                          }
                        }
                      }}
                      className="
                        block py-4 px-2
                        font-serif text-2xl font-light tracking-wide
                        text-natura/80 hover:text-natura
                        border-b border-[var(--color-dorado)]/10
                        transition-colors duration-300
                      "
                    >
                      {link.label}
                    </Link>
                  </motion.div>
                ))}
              </div>

              {/* Bottom accent */}
              <div className="mt-auto">
                <div className="gold-line w-full mb-6" />
                <p className="font-sans text-xs text-madera tracking-[0.2em] uppercase">
                  Productos Naturales · Puros · Auténticos
                </p>
              </div>
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ═══════════════ VERTICAL SIDE NAVIGATION (Thorgal Style) ═══════════════ */}
      {location.pathname === '/' && <SideNavigation />}

      {/* ═══════════════ MAIN CONTENT ═══════════════ */}
      <main className="relative">
        {children}
      </main>

      {/* ═══════════════ FOOTER ═══════════════ */}
      <Footer />

      {/* Cart Modal Slide-over */}
      <CartModal />
    </div>
  );
}

/* ─── Sub-components ─── */

function SideNavigation() {
  const { scrollYProgress } = useScroll();
  const [activeIndex, setActiveIndex] = useState(0);

  const sections = [
    { label: 'Inicio', id: '#' },
    { label: 'Colecciones', id: '#colecciones' },
    { label: 'Rituales', id: '#rituales' },
    { label: 'Esencia', id: '#esencia' },
  ];

  // A simple way to map scroll progress to an active section index
  useMotionValueEvent(scrollYProgress, "change", (val) => {
    if (val < 0.2) setActiveIndex(0);
    else if (val < 0.5) setActiveIndex(1);
    else if (val < 0.8) setActiveIndex(2);
    else setActiveIndex(3);
  });

  return (
    <div className="fixed left-6 sm:left-10 top-1/2 -translate-y-1/2 z-40 hidden xl:flex flex-col items-center gap-4">
      {sections.map((section, idx) => {
        const isActive = activeIndex === idx;
        return (
          <div key={section.id} className="relative flex flex-col items-center group">
            {/* Diamond Node */}
            <a 
              href={section.id}
              onClick={(e) => {
                if (section.id !== '#') {
                  e.preventDefault();
                  const hash = section.id.substring(1);
                  const el = document.getElementById(hash);
                  if (el) {
                    if (window.lenis) window.lenis.scrollTo(el, { offset: -80 });
                    else el.scrollIntoView({ behavior: 'smooth' });
                    window.history.pushState(null, '', `#${hash}`);
                  }
                } else {
                  e.preventDefault();
                  if (window.lenis) window.lenis.scrollTo(0, { immediate: false });
                  else window.scrollTo({ top: 0, behavior: 'smooth' });
                  window.history.pushState(null, '', '/');
                }
              }}
              className="relative flex items-center justify-center w-8 h-8 cursor-pointer"
            >
              <motion.div
                className={`
                  w-2.5 h-2.5 rotate-45 border transition-all duration-500
                  ${isActive ? 'bg-[var(--color-dorado)] border-[var(--color-dorado)] scale-125' : 'bg-transparent border-[var(--color-dorado)]/40 hover:border-[var(--color-dorado)]'}
                `}
              />
              
              {/* Tooltip Label (Thorgal style) */}
              <div className="absolute left-full ml-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                <span className="font-sans text-[10px] tracking-[0.2em] uppercase whitespace-nowrap text-natura/70 bg-white/80 px-2 py-1 rounded backdrop-blur-sm">
                  {section.label}
                </span>
              </div>
            </a>
            
            {/* Connecting Line */}
            {idx < sections.length - 1 && (
              <div className="w-[1px] h-8 bg-gradient-to-b from-[var(--color-dorado)]/40 to-[var(--color-dorado)]/10" />
            )}
          </div>
        );
      })}
    </div>
  );
}

function NavLink({ href, children }) {
  const location = useLocation();

  const handleClick = (e) => {
    if (href.includes('#')) {
      const hash = href.split('#')[1];
      // Si estamos en la página principal, scrollear manualmente
      if (location.pathname === '/') {
        e.preventDefault();
        const el = document.getElementById(hash);
        if (el) {
          if (window.lenis) {
            window.lenis.scrollTo(el, { offset: -80 });
          } else {
            const top = el.getBoundingClientRect().top + window.scrollY - 80;
            window.scrollTo({ top, behavior: 'smooth' });
          }
          window.history.pushState(null, '', `#${hash}`);
        }
      }
    }
  };

  return (
    <motion.div whileHover="hover" className="inline-block relative">
      <Link
        to={href}
        onClick={handleClick}
        className="
          relative font-sans text-[13px] font-light tracking-[0.12em] uppercase
          text-natura/70 hover:text-natura
          transition-colors duration-300
          block
        "
      >
        {children}
        <motion.span
          className="
            absolute -bottom-1 left-0 right-0 h-[1px]
            bg-[var(--color-dorado)]
            origin-left
          "
          initial={{ scaleX: 0 }}
          variants={{
            hover: { scaleX: 1 },
          }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
        />
      </Link>
    </motion.div>
  );
}

function CartButton() {
  const { openCart, cartItems } = useCart();
  const itemCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <motion.button
      className="
        relative p-2.5
        text-natura/60 hover:text-natura
        transition-colors duration-300
      "
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={openCart}
      aria-label="Carrito de compras"
      id="cart-button"
    >
      <Bag size={22} weight="thin" />

      {/* Badge */}
      <AnimatePresence>
        {itemCount > 0 && (
          <motion.span
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0 }}
            className="
              absolute -top-0.5 -right-0.5
              w-4 h-4 rounded-full
              bg-[var(--color-dorado)] text-white
              text-[9px] font-sans font-medium
              flex items-center justify-center
            "
          >
            {itemCount}
          </motion.span>
        )}
      </AnimatePresence>
    </motion.button>
  );
}
