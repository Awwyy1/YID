
import React, { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { ShoppingCart } from 'lucide-react';
import { Product, CartItem } from './types';
import ProductCard from './components/ProductCard';
import ProductModal from './components/ProductModal';
import CartDrawer from './components/CartDrawer';
import FooterControls from './components/FooterControls';
import Hero from './components/Hero';

const PRODUCTS: Product[] = [
  {
    id: '01',
    name: 'CORE HOODIE / NOIR',
    price: '$180.00',
    description: 'Ultra-heavyweight 500GSM cotton. Oversized fit. Dropped shoulders. Signature YID tonal embroidery on chest.',
    images: [
      'https://picsum.photos/seed/hoodie1/1200/1600',
      'https://picsum.photos/seed/hoodie2/1200/1600',
      'https://picsum.photos/seed/hoodie3/1200/1600',
      'https://picsum.photos/seed/hoodie4/1200/1600',
    ]
  },
  {
    id: '02',
    name: 'CARGO PANT / CLAY',
    price: '$220.00',
    description: 'Technical stretch twill. 8-pocket architecture. Adjustable ankle cinches. Water-repellent finish.',
    images: [
      'https://picsum.photos/seed/pants1/1200/1600',
      'https://picsum.photos/seed/pants2/1200/1600',
      'https://picsum.photos/seed/pants3/1200/1600',
      'https://picsum.photos/seed/pants4/1200/1600',
    ]
  },
  {
    id: '03',
    name: 'STRUX TEE / CHALK',
    price: '$85.00',
    description: 'Japanese jersey cotton. Boxy silhouette. Reinforced collar construction. Minimalist labeling.',
    images: [
      'https://picsum.photos/seed/tee1/1200/1600',
      'https://picsum.photos/seed/tee2/1200/1600',
      'https://picsum.photos/seed/tee3/1200/1600',
      'https://picsum.photos/seed/tee4/1200/1600',
    ]
  },
  {
    id: '04',
    name: 'COMING SOON',
    price: 'N/A',
    description: '',
    images: [],
    isComingSoon: true
  },
  {
    id: '05',
    name: 'COMING SOON',
    price: 'N/A',
    description: '',
    images: [],
    isComingSoon: true
  },
  {
    id: '06',
    name: 'COMING SOON',
    price: 'N/A',
    description: '',
    images: [],
    isComingSoon: true
  }
];

const App: React.FC = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  
  const { scrollY } = useScroll();
  // Logo in header fades in after the user scrolls past the Hero section (~500px)
  const headerLogoOpacity = useTransform(scrollY, [0, 400], [0, 1]);

  const toggleTheme = useCallback(() => {
    setIsDarkMode(prev => !prev);
  }, []);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  const addToCart = (product: Product) => {
    setCartItems(prev => {
      const existing = prev.find(item => item.product.id === product.id);
      if (existing) {
        return prev.map(item => 
          item.product.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { product, quantity: 1 }];
    });
    setIsCartOpen(true);
  };

  const removeFromCart = (id: string) => {
    setCartItems(prev => prev.filter(item => item.product.id !== id));
  };

  return (
    <div className="min-h-screen bg-customBg text-customText overflow-x-hidden selection:bg-customText selection:text-customBg">
      {/* Ghost Header */}
      <header className="fixed top-0 left-0 w-full z-40 flex justify-between items-center px-8 py-6 border-b border-customBorder backdrop-blur-md bg-customBg/50">
        <motion.h1 
          style={{ opacity: headerLogoOpacity }}
          className="text-xl font-bold tracking-widest cursor-default select-none"
        >
          YID
        </motion.h1>
        
        <button 
          onClick={() => setIsCartOpen(true)}
          className="relative group p-2 transition-transform active:scale-90"
        >
          <ShoppingCart className="w-6 h-6 stroke-[1.2]" />
          {cartItems.length > 0 && (
            <span className="absolute -top-0 -right-0 bg-customText text-customBg text-[9px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
              {cartItems.reduce((acc, curr) => acc + curr.quantity, 0)}
            </span>
          )}
        </button>
      </header>

      {/* Main Content */}
      <main>
        <Hero />
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-0">
          {PRODUCTS.map((product) => (
            <ProductCard 
              key={product.id} 
              product={product} 
              onClick={() => !product.isComingSoon && setSelectedProduct(product)} 
            />
          ))}
        </div>
      </main>

      {/* Modals & Drawers */}
      <AnimatePresence>
        {selectedProduct && (
          <ProductModal 
            product={selectedProduct} 
            onClose={() => setSelectedProduct(null)} 
            onAddToCart={addToCart}
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isCartOpen && (
          <CartDrawer 
            items={cartItems} 
            onClose={() => setIsCartOpen(false)} 
            onRemove={removeFromCart}
          />
        )}
      </AnimatePresence>

      <FooterControls 
        isDarkMode={isDarkMode} 
        toggleTheme={toggleTheme} 
      />
    </div>
  );
};

export default App;
