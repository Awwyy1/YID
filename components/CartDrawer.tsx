
import React from 'react';
import { motion } from 'framer-motion';
import { X, Trash2 } from 'lucide-react';
import { CartItem } from '../types';

interface CartDrawerProps {
  items: CartItem[];
  onClose: () => void;
  onRemove: (id: string) => void;
}

const CartDrawer: React.FC<CartDrawerProps> = ({ items, onClose, onRemove }) => {
  const subtotal = items.reduce((acc, curr) => {
    const price = parseFloat(curr.product.price.replace('$', ''));
    return acc + (price * curr.quantity);
  }, 0);

  return (
    <>
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 z-[60] bg-black/40 backdrop-blur-sm"
      />
      <motion.div 
        initial={{ x: '100%' }}
        animate={{ x: 0 }}
        exit={{ x: '100%' }}
        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
        className="fixed top-0 right-0 h-screen w-full max-w-md z-[70] bg-customBg border-l border-customBorder flex flex-col shadow-2xl"
      >
        <div className="flex items-center justify-between p-8 border-b border-customBorder">
          <h2 className="text-sm font-bold tracking-[0.2em] uppercase">Your Cart</h2>
          <button onClick={onClose} className="p-2 hover:opacity-50 transition-opacity">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-8 space-y-8">
          {items.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center opacity-30">
              <p className="text-xs tracking-widest uppercase">Cart is empty</p>
            </div>
          ) : (
            items.map((item) => (
              <div key={item.product.id} className="flex gap-6 items-start">
                <div className="w-24 aspect-[3/4] bg-customAccent overflow-hidden border border-customBorder">
                  <img src={item.product.images[0]} alt={item.product.name} className="w-full h-full object-cover" />
                </div>
                <div className="flex-1">
                  <h3 className="text-sm font-medium tracking-tight mb-1">{item.product.name}</h3>
                  <p className="text-xs opacity-50 mb-4">{item.product.price} × {item.quantity}</p>
                  <button 
                    onClick={() => onRemove(item.product.id)}
                    className="text-[10px] tracking-widest uppercase font-bold flex items-center gap-2 hover:text-red-500 transition-colors"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        <div className="p-8 border-t border-customBorder bg-customAccent/50">
          <div className="flex justify-between items-center mb-8">
            <span className="text-[10px] tracking-widest uppercase font-bold opacity-50">Subtotal</span>
            <span className="text-lg font-light">${subtotal.toFixed(2)}</span>
          </div>
          <button 
            disabled={items.length === 0}
            className="w-full py-5 bg-customText text-customBg font-medium text-xs tracking-[0.2em] uppercase transition-transform active:scale-95 disabled:opacity-20"
          >
            Checkout
          </button>
          <p className="text-center text-[9px] mt-4 opacity-40 tracking-wider">SHIPPING & TAXES CALCULATED AT CHECKOUT</p>
        </div>
      </motion.div>
    </>
  );
};

export default CartDrawer;
