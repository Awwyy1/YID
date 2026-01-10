
import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const Hero: React.FC = () => {
  const { scrollY } = useScroll();
  const yidScale = useTransform(scrollY, [0, 500], [1, 0.9]);
  const opacity = useTransform(scrollY, [0, 400], [1, 0]);

  return (
    <section className="relative w-full h-[85vh] flex flex-col items-center justify-center bg-customBg border-b border-customBorder overflow-hidden">
      
      {/* Main Branding Composition */}
      <motion.div 
        style={{ scale: yidScale, opacity }}
        className="flex flex-col items-center justify-center text-center px-6"
      >
        {/* The Primary Logo (Now at Top) */}
        <motion.h2 
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="text-7xl md:text-9xl lg:text-[12rem] font-bold tracking-tighter leading-none"
        >
          YID
        </motion.h2>

        {/* The Slogan Manifest (Now Below Logo) */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 1.2, ease: "easeOut" }}
          className="mt-4 mb-2"
        >
          <p className="text-[10px] md:text-xs uppercase font-light tracking-[1.5em] mr-[-1.5em] text-customText/60">
            OWN IT
          </p>
        </motion.div>

        {/* Sub-Manifesto Elements */}
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: "80px" }}
          transition={{ delay: 1.2, duration: 1 }}
          className="h-[1px] bg-customText/20 my-10"
        />

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.3 }}
          transition={{ delay: 1.5, duration: 1 }}
          className="text-[9px] md:text-[11px] tracking-[0.5em] uppercase font-bold text-customText"
        >
          The Essence of Self
        </motion.p>
      </motion.div>

      {/* Aesthetic Scroll Indicator */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.2 }}
        transition={{ delay: 2.5, duration: 1 }}
        className="absolute bottom-12 flex flex-col items-center gap-4"
      >
        <div className="w-[1px] h-12 bg-customText relative overflow-hidden">
          <motion.div 
            animate={{ y: [0, 48, 0] }}
            transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
            className="absolute top-0 left-0 w-full h-1/2 bg-customBg"
          />
        </div>
      </motion.div>

      {/* Grid Pattern Overlay */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.03] dark:opacity-[0.05]" 
           style={{ backgroundImage: `linear-gradient(var(--border) 1px, transparent 1px), linear-gradient(90deg, var(--border) 1px, transparent 1px)`, backgroundSize: '100px 100px' }} 
      />
    </section>
  );
};

export default Hero;
