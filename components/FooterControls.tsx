
import React from 'react';
import { Instagram, Twitter } from 'lucide-react';

interface FooterControlsProps {
  isDarkMode: boolean;
  toggleTheme: () => void;
}

const FooterControls: React.FC<FooterControlsProps> = ({ isDarkMode, toggleTheme }) => {
  return (
    <footer className="fixed bottom-0 left-0 w-full z-40 pointer-events-none">
      <div className="flex justify-between items-center px-8 py-8 w-full">
        {/* Socials */}
        <div className="flex gap-6 pointer-events-auto">
          <a 
            href="#" 
            className="group"
            aria-label="Instagram"
          >
            <Instagram className="w-5 h-5 stroke-customText group-hover:opacity-50 transition-all duration-400" />
          </a>
          <a 
            href="#" 
            className="group"
            aria-label="Twitter"
          >
            <Twitter className="w-5 h-5 stroke-customText group-hover:opacity-50 transition-all duration-400" />
          </a>
        </div>

        {/* Theme Toggle */}
        <button 
          onClick={toggleTheme}
          className="pointer-events-auto text-[10px] tracking-[0.3em] font-bold uppercase py-2 px-4 bg-customBg border border-customBorder hover:bg-customText hover:text-customBg transition-all duration-400"
        >
          [ {isDarkMode ? 'Light' : 'Dark'} ]
        </button>
      </div>
    </footer>
  );
};

export default FooterControls;
