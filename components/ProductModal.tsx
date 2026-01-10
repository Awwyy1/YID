
import React from 'react';
import { motion } from 'framer-motion';
import { X } from 'lucide-react';
import { Product } from '../types';

interface ProductModalProps {
  product: Product;
  onClose: () => void;
  onAddToCart: (p: Product) => void;
}

const ProductModal: React.FC<ProductModalProps> = ({ product, onClose, onAddToCart }) => {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 bg-customBg overflow-y-auto"
    >
      <div className="min-h-screen flex flex-col lg:flex-row">
        {/* Images Grid - Left Side */}
        <div className="w-full lg:w-2/3 grid grid-cols-1 md:grid-cols-2 gap-[1px] bg-customBorder">
          {product.images.map((img, idx) => (
            <motion.div 
              key={idx} 
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1 * idx, duration: 0.5 }}
              className="bg-customBg aspect-[3/4] overflow-hidden"
            >
              <img 
                src={img} 
                alt={`${product.name} view ${idx}`} 
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-1000 ease-out" 
              />
            </motion.div>
          ))}
        </div>

        {/* Product Details - Right Side (Sticky) */}
        <div className="w-full lg:w-1/3 lg:h-screen lg:sticky lg:top-0 p-8 md:p-12 lg:p-16 flex flex-col justify-center bg-customBg">
          <div className="max-w-md mx-auto w-full">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
            >
              <div className="flex flex-col mb-10">
                <span className="text-[10px] tracking-[0.4em] uppercase font-bold opacity-30 mb-2">Item {product.id}</span>
                <div className="flex justify-between items-baseline">
                  <h2 className="text-3xl font-bold tracking-tight">{product.name}</h2>
                  <p className="text-xl font-light opacity-60">{product.price}</p>
                </div>
              </div>
              
              <div className="mb-12">
                <div className="h-[1px] w-12 bg-customText/20 mb-6" />
                <h3 className="text-[10px] tracking-[0.2em] uppercase font-bold mb-4 opacity-50">Description</h3>
                <p className="text-sm font-light leading-relaxed opacity-80 max-w-[320px]">
                  {product.description}
                </p>
              </div>

              <div className="space-y-3 pt-6">
                <button 
                  onClick={() => onAddToCart(product)}
                  className="w-full py-5 bg-customText text-customBg font-medium text-xs tracking-[0.3em] uppercase transition-all hover:opacity-90 active:scale-[0.98]"
                >
                  Add to Bag
                </button>
                <button 
                  onClick={onClose}
                  className="w-full py-5 border border-customBorder font-medium text-xs tracking-[0.3em] uppercase transition-all hover:bg-customAccent active:scale-[0.98]"
                >
                  Close View
                </button>
              </div>

              {/* Minimalist Trust Badges */}
              <div className="mt-12 flex justify-between border-t border-customBorder pt-6">
                <div className="text-[9px] tracking-widest uppercase opacity-40">Express Shipping</div>
                <div className="text-[9px] tracking-widest uppercase opacity-40">Secure Payment</div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Floating Close Button for Mobile/Quick Exit */}
      <button 
        onClick={onClose}
        className="fixed top-6 right-6 z-50 p-4 rounded-full bg-customBg/50 backdrop-blur-md border border-customBorder hover:scale-110 transition-transform md:top-8 md:right-8"
        aria-label="Close modal"
      >
        <X className="w-5 h-5" />
      </button>
    </motion.div>
  );
};

export default ProductModal;
