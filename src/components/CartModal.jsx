import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Minus, Plus, CircleNotch } from '@phosphor-icons/react';
import { useCart } from '../context/CartContext';

const LUXURY_EASE = [0.16, 1, 0.3, 1];

export default function CartModal() {
  const { isCartOpen, closeCart, cartItems, updateQuantity, removeFromCart, cartTotalAmount } = useCart();
  const [isCheckingOut, setIsCheckingOut] = useState(false);

  const handleCheckout = () => {
    setIsCheckingOut(true);
    // Simulating API call to Stripe / MercadoPago to generate payment link
    setTimeout(() => {
      setIsCheckingOut(false);
      alert("En este punto, la aplicación te redirigirá a la pasarela de pagos segura (Stripe o MercadoPago) para procesar el cargo real.");
      window.open('https://www.mercadopago.com.mx', '_blank');
    }, 1500);
  };

  return (
    <AnimatePresence>
      {isCartOpen && (
        <>
          {/* Backdrop Blur Overlay */}
          <motion.div
            className="fixed inset-0 z-40 bg-black/10 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: LUXURY_EASE }}
            onClick={closeCart}
          />

          {/* Slide-over Panel */}
          <motion.div
            className="fixed inset-y-0 right-0 z-50 w-full sm:w-[480px] bg-white shadow-2xl flex flex-col"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ duration: 0.6, ease: LUXURY_EASE }}
          >
            {/* Header */}
            <div className="flex items-center justify-between px-8 py-6 border-b border-[var(--color-marfil)]/40">
              <h2 className="font-serif text-2xl text-[var(--color-natura)] font-light">Tu Ritual</h2>
              <button
                onClick={closeCart}
                className="p-2 text-[var(--color-madera)] hover:text-[var(--color-natura)] transition-colors"
                aria-label="Cerrar carrito"
              >
                <X size={24} weight="thin" />
              </button>
            </div>

            {/* Cart Items */}
            <div className="flex-1 overflow-y-auto px-8 py-6 flex flex-col gap-6">
              {cartItems.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-center opacity-70">
                  <p className="font-sans text-[var(--color-madera)] font-light tracking-wide uppercase text-sm mb-4">
                    Tu ritual aún no comienza
                  </p>
                  <p className="font-serif text-[var(--color-natura)] text-lg italic">
                    Descubre nuestras esencias.
                  </p>
                </div>
              ) : (
                cartItems.map((item) => (
                  <div key={item.id} className="flex gap-4 items-center group">
                    {/* Item Image */}
                    <div className="w-20 h-24 rounded-sm shrink-0 overflow-hidden bg-[#f0fdfa] flex items-center justify-center p-1">
                      {item.image ? (
                        <img src={item.image} alt={item.name} className="w-full h-full object-contain" />
                      ) : (
                        <div className="w-full h-full" style={{ background: item.color || '#f0fdfa' }} />
                      )}
                    </div>
                    
                    {/* Item Details */}
                    <div className="flex-1 flex flex-col justify-center">
                      <div className="flex justify-between items-start mb-1">
                        <h3 className="font-serif text-lg text-[var(--color-natura)] leading-tight pr-4">
                          {item.name}
                        </h3>
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="text-[var(--color-madera)] hover:text-red-700 transition-colors"
                          aria-label="Eliminar producto"
                        >
                          <X size={16} weight="thin" />
                        </button>
                      </div>
                      
                      <p className="font-sans text-[var(--color-madera)] font-light text-sm mb-3">
                        ${item.price} MXN
                      </p>

                      {/* Quantity Controls */}
                      <div className="flex items-center gap-4">
                        <div className="flex items-center border border-[var(--color-dorado)]/30 rounded-sm">
                          <button
                            onClick={() => updateQuantity(item.id, -1)}
                            className="p-1.5 text-[var(--color-madera)] hover:text-[var(--color-natura)] transition-colors"
                          >
                            <Minus size={12} weight="thin" />
                          </button>
                          <span className="font-sans text-xs text-[var(--color-natura)] w-6 text-center">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(item.id, 1)}
                            className="p-1.5 text-[var(--color-madera)] hover:text-[var(--color-natura)] transition-colors"
                          >
                            <Plus size={12} weight="thin" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Footer / Checkout */}
            {cartItems.length > 0 && (
              <div className="px-8 py-8 bg-slate-50 border-t border-[var(--color-marfil)]/40">
                <div className="flex justify-between items-center mb-6">
                  <span className="font-sans text-sm tracking-widest text-[var(--color-madera)] uppercase">Subtotal</span>
                  <span className="font-sans text-xl text-[var(--color-natura)] font-light tracking-wide tabular-nums">${cartTotalAmount.toLocaleString('es-MX')} MXN</span>
                </div>
                
                <button
                  onClick={handleCheckout}
                  disabled={isCheckingOut}
                  className={`
                    w-full py-4
                    bg-[var(--color-natura)] text-white
                    font-sans text-xs tracking-[0.2em] uppercase font-light
                    rounded-sm
                    hover:bg-emerald-950 transition-colors duration-300
                    flex items-center justify-center gap-2
                    ${isCheckingOut ? 'opacity-80 cursor-wait' : ''}
                  `}
                >
                  {isCheckingOut ? (
                    <>
                      <CircleNotch size={16} weight="bold" className="animate-spin" />
                      Conectando...
                    </>
                  ) : (
                    'Proceder al Pago Seguramente'
                  )}
                </button>
                <div className="text-center font-sans text-[10px] text-[var(--color-madera)]/70 mt-4 tracking-wider uppercase flex flex-col items-center gap-1">
                  <span>Envío gratis en órdenes sobre $2,000 MXN</span>
                  <span className="text-[var(--color-dorado)]">Pagos 100% seguros</span>
                </div>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
