'use client';

import { useTheme } from '@/app/components/ThemeProvider';
import { Moon, Sun } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="relative p-2.5 rounded-xl hover:bg-primary/10 transition-colors group cursor-pointer z-[60]"
      aria-label="Toggle theme"
    >
      <div className="relative w-5 h-5 overflow-hidden">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={theme}
            initial={{ y: 20, opacity: 0, rotate: 45 }}
            animate={{ y: 0, opacity: 1, rotate: 0 }}
            exit={{ y: -20, opacity: 0, rotate: -45 }}
            transition={{ duration: 0.2, ease: "easeInOut" }}
            className="absolute inset-0 flex items-center justify-center"
          >
            {theme === 'dark' ? (
              <Sun className="h-5 w-5 text-primary" />
            ) : (
              <Moon className="h-5 w-5 text-primary" />
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </button>
  );
}