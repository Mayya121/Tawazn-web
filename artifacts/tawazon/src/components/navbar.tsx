import React from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '@/contexts/language-context';
import { content, t } from '@/lib/content';
import { Button } from './ui/button';
import { Globe, Sparkles } from 'lucide-react';

export function Navbar() {
  const { lang, toggleLanguage } = useLanguage();

  return (
    <motion.nav 
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="fixed top-0 left-0 right-0 z-50 px-6 py-4"
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between glass-card px-6 py-3 rounded-2xl">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-primary to-secondary flex items-center justify-center shadow-[0_0_15px_rgba(0,240,255,0.4)]">
            <Sparkles className="w-5 h-5 text-primary-foreground" />
          </div>
          <div>
            <h1 className="text-xl font-bold leading-none tracking-tight">
              {t(content.nav.brand, lang)}
            </h1>
            <p className="text-[10px] uppercase tracking-wider text-primary font-medium mt-1">
              {t(content.nav.subBrand, lang)}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={toggleLanguage}
            className="flex items-center gap-2 font-medium"
          >
            <Globe className="w-4 h-4" />
            <span className="mb-[2px]">{t(content.nav.toggle, lang)}</span>
          </Button>
          
          <Button size="sm" className="hidden sm:flex">
            {t(content.hero.cta, lang)}
          </Button>
        </div>
      </div>
    </motion.nav>
  );
}
