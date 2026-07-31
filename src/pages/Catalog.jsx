import { motion } from 'framer-motion';
import { useCart } from '../context/CartContext';
import { products as baseProducts } from '../data/products';

// Data from EsotericServices.jsx
const SETS = [
  {
    id: 'kit-fuego',
    title: 'Kit Elemento Fuego',
    description: 'Para Aries, Leo y Sagitario. Jabones energizantes de cítricos y maderas.',
    price: 580,
    category: 'Kits Esotéricos',
    image: '/images/elemental_fire.png'
  },
  {
    id: 'kit-tierra',
    title: 'Kit Elemento Tierra',
    description: 'Para Tauro, Virgo y Capricornio. Arcillas purificantes y aromas a bosque.',
    price: 580,
    category: 'Kits Esotéricos',
    image: '/images/elemental_earth.png'
  },
  {
    id: 'kit-aire',
    title: 'Kit Elemento Aire',
    description: 'Para Géminis, Libra y Acuario. Esencias ligeras de lavanda y menta.',
    price: 580,
    category: 'Kits Esotéricos',
    image: '/images/elemental_air.png'
  },
  {
    id: 'kit-agua',
    title: 'Kit Elemento Agua',
    description: 'Para Cáncer, Escorpio y Piscis. Sales marinas marinas y eucalipto.',
    price: 580,
    category: 'Kits Esotéricos',
    image: '/images/elemental_water.png'
  }
];

// Data from TeaCollection.jsx
const TEAS = [
  {
    id: 'tisana-lavanda',
    title: 'Tisana Dulces Sueños',
    description: 'Flores de lavanda francesa y manzanilla dorada.',
    price: 250,
    category: 'Tisanas',
    image: '/images/tisana_lavanda_1782236183000.png'
  },
  {
    id: 'tisana-citricos',
    title: 'Tisana Despertar Cítrico',
    description: 'Rodajas de naranja secadas al sol, ralladura de limón y un toque de flor de jamaica.',
    price: 250,
    category: 'Tisanas',
    image: '/images/tisana_citricos_1782236193583.png'
  },
  {
    id: 'tisana-jengibre',
    title: 'Tisana Raíces de Fuego',
    description: 'Raíz de jengibre puro, ramas de canela y cardamomo.',
    price: 250,
    category: 'Tisanas',
    image: '/images/tisana_jengibre_1782236201357.png'
  }
];

// Unified catalog
const ALL_PRODUCTS = [
  ...baseProducts.map(p => ({
    ...p,
    title: p.name,
    price: parseInt(p.price.replace(/[^0-9]/g, ''), 10) // convert "$180 MXN" to 180
  })),
  ...SETS,
  ...TEAS
];

const CATEGORIES = ['Jabones Botánicos', 'Esencias Puras', 'Kits Esotéricos', 'Tisanas'];

function AppleCard({ product }) {
  const { addToCart } = useCart();

  const handleBuy = () => {
    addToCart({
      id: product.id,
      name: product.title,
      price: product.price,
      image: product.image,
    });
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-20px' }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="bg-white rounded-[2rem] p-8 flex flex-col items-center text-center shadow-[0_2px_20px_rgba(0,0,0,0.04)] hover:shadow-[0_10px_40px_rgba(0,0,0,0.08)] transition-shadow duration-500"
    >
      <h3 className="font-sans text-2xl font-semibold text-gray-900 mb-1">{product.title}</h3>
      <p className="font-sans text-sm text-gray-500 mb-6 h-10">{product.description}</p>
      
      <div className="w-full aspect-square mb-6 relative overflow-hidden flex items-center justify-center">
        <motion.img 
          src={product.image} 
          alt={product.title}
          className="w-[85%] h-[85%] object-contain"
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        />
      </div>

      {/* Decorative Dots */}
      <div className="flex gap-2 mb-6">
        <div className="w-2.5 h-2.5 rounded-full bg-stone-300 shadow-inner" />
        <div className="w-2.5 h-2.5 rounded-full bg-stone-500 shadow-inner" />
        <div className="w-2.5 h-2.5 rounded-full bg-stone-800 shadow-inner" />
      </div>

      <div className="mt-auto w-full flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="text-left">
          <p className="font-sans text-xs text-gray-500 mb-0.5">Desde ${product.price} MXN</p>
          <p className="font-sans text-[10px] text-gray-400">o 12 meses sin intereses</p>
        </div>
        
        <button
          onClick={handleBuy}
          className="bg-[#0071e3] hover:bg-[#0077ED] text-white font-sans text-sm font-medium px-5 py-2 rounded-full transition-colors w-full sm:w-auto"
        >
          Comprar
        </button>
      </div>
    </motion.div>
  );
}

export default function Catalog() {
  return (
    <div className="min-h-screen bg-[#f5f5f7] pt-32 pb-24">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        
        <header className="mb-16 text-center">
          <h1 className="font-sans text-4xl sm:text-5xl lg:text-6xl font-semibold text-gray-900 tracking-tight mb-4">
            Catálogo Completo.
          </h1>
          <p className="font-sans text-xl sm:text-2xl text-gray-500 font-light">
            Encuentra tu esencia. Conecta con la naturaleza.
          </p>
        </header>

        {CATEGORIES.map(category => {
          const categoryProducts = ALL_PRODUCTS.filter(p => p.category === category);
          if (categoryProducts.length === 0) return null;

          return (
            <section key={category} className="mb-24">
              <h2 className="font-sans text-2xl sm:text-3xl font-semibold text-gray-900 tracking-tight mb-8 pl-2 border-l-4 border-[#0071e3]">
                {category}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 lg:gap-8">
                {categoryProducts.map(product => (
                  <AppleCard key={product.id} product={product} />
                ))}
              </div>
            </section>
          );
        })}

      </div>
    </div>
  );
}
