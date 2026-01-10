
import React from 'react';
import { motion } from 'framer-motion';
import { Product } from '../types';

interface ProductCardProps {
  product: Product;
  onClick: () => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onClick }) => {
  if (product.isComingSoon) {
    return (
      <div className="relative aspect-square md:aspect-auto border-r border-b border-customBorder bg-customAccent flex flex-col items-center justify-center cursor-default group overflow-hidden">
        <span className="text-xs tracking-[0.2em] font-medium opacity-50">{product.id}</span>
        <span className="text-sm tracking-[0.3em] font-light mt-2">{product.name}</span>
      </div>
    );
  }

  return (
    <motion.div 
      layoutId={`card-${product.id}`}
      onClick={onClick}
      className="relative aspect-square md:aspect-auto border-r border-b border-customBorder flex flex-col items-center justify-center cursor-pointer group overflow-hidden"
    >
      <motion.img 
        src={product.images[0]} 
        alt={product.name}
        className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
      />
      
      {/* Inset Border Overlay */}
      <div className="absolute inset-0 border-[0px] group-hover:border-[1px] border-white/20 dark:border-white/10 transition-all duration-300 pointer-events-none" />

      {/* Overlay Info */}
      <div className="absolute inset-x-0 bottom-0 p-6 flex justify-between items-end translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 bg-gradient-to-t from-black/40 to-transparent">
        <div className="text-white">
          <p className="text-[10px] tracking-widest uppercase mb-1 opacity-70">New Arrival</p>
          <h3 className="text-sm font-medium tracking-wide">{product.name}</h3>
        </div>
        <p className="text-white text-sm font-light">{product.price}</p>
      </div>
    </motion.div>
  );
};

export default ProductCard;
