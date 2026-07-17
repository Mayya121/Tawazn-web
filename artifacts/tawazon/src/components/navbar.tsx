import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '@/contexts/language-context';
import { content, t } from '@/lib/content';
import { Globe, Sparkles, BarChart2, Trophy, LayoutDashboard, Home, Menu, X } from 'lucide-react';
import { useLocation } from 'wouter';

export function Navbar() {
  const { lang, toggleLanguage } = useLanguage();
  const [location, navigate] = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  const isApp = location !== '/';

  const navLinks = lang === 'ar'
    ? [
        { path: '/', label: 'الرئيسية', icon: Home },
        { path: '/dashboard', label: 'لوحة التحكم', icon: LayoutDashboard },
        { path: '/insights', label: 'التحليلات', icon: BarChart2 },
        { path: '/challenges', label: 'التحديات', icon: Trophy },
      ]
    : [
        { path: '/', label: 'Home', icon: Home },
        { path: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
        { path: '/insights', label: 'Insights', icon: BarChart2 },
        { path: '/challenges', label: 'Challenges', icon: Trophy },
      ];

  return (
    <motion.nav
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 50, padding: '12px 20px' }}
    >
      <div style={{ maxWidth: 1200, margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: 'rgba(5,8,18,0.85)', backdropFilter: 'blur(20px)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: 18, padding: '10px 20px' }}>
        {/* Logo */}
        <button onClick={() => navigate('/')} style={{ display: 'flex', alignItems: 'center', gap: 10, background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}>
          <div style={{ width: 38, height: 38, borderRadius: 10, background: 'linear-gradient(135deg, #00f0ff, #b44dff)', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 0 14px rgba(0,240,255,0.35)' }}>
            <Sparkles className="w-5 h-5" style={{ color: 'white' }} />
          </div>
          <div>
            <div style={{ fontSize: 17, fontWeight: 800, color: 'white', lineHeight: 1 }}>
              {t(content.nav.brand, lang)}
            </div>
            <div style={{ fontSize: 9, textTransform: 'uppercase', letterSpacing: '0.12em', color: '#00f0ff', fontWeight: 600, marginTop: 2 }}>
              {t(content.nav.subBrand, lang)}
            </div>
          </div>
        </button>

        {/* Desktop Nav Links */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 4 }} className="hidden-mobile">
          {navLinks.map(link => {
            const active = location === link.path;
            return (
              <button
                key={link.path}
                onClick={() => navigate(link.path)}
                style={{
                  display: 'flex', alignItems: 'center', gap: 6, padding: '7px 14px', borderRadius: 10, background: active ? 'rgba(0,240,255,0.1)' : 'transparent', border: active ? '1px solid rgba(0,240,255,0.25)' : '1px solid transparent', color: active ? '#00f0ff' : 'rgba(255,255,255,0.6)', fontWeight: active ? 700 : 500, fontSize: 13, cursor: 'pointer', transition: 'all 0.2s'
                }}
              >
                <link.icon className="w-4 h-4" />
                {link.label}
              </button>
            );
          })}
        </div>

        {/* Right Actions */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <button
            onClick={toggleLanguage}
            style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '7px 12px', borderRadius: 10, background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)', color: 'rgba(255,255,255,0.7)', fontWeight: 600, fontSize: 13, cursor: 'pointer' }}
          >
            <Globe className="w-4 h-4" />
            <span>{t(content.nav.toggle, lang)}</span>
          </button>

          {!isApp && (
            <button
              onClick={() => navigate('/dashboard')}
              style={{ padding: '7px 16px', borderRadius: 10, background: '#00f0ff', color: '#03060d', fontWeight: 700, fontSize: 13, cursor: 'pointer', border: 'none', display: 'none' }}
              className="show-sm"
            >
              {lang === 'ar' ? 'جرّب الآن' : 'Try Now'}
            </button>
          )}

          {/* Mobile menu toggle */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            style={{ padding: '7px', borderRadius: 10, background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)', color: 'rgba(255,255,255,0.7)', cursor: 'pointer', display: 'none' }}
            className="show-mobile"
          >
            {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile dropdown menu */}
      {menuOpen && (
        <div style={{ maxWidth: 1200, margin: '8px auto 0', background: 'rgba(5,8,18,0.95)', backdropFilter: 'blur(20px)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: 16, padding: '12px 16px', display: 'none' }} className="show-mobile">
          {navLinks.map(link => {
            const active = location === link.path;
            return (
              <button
                key={link.path}
                onClick={() => { navigate(link.path); setMenuOpen(false); }}
                style={{ display: 'flex', alignItems: 'center', gap: 10, width: '100%', padding: '12px 14px', borderRadius: 10, background: active ? 'rgba(0,240,255,0.08)' : 'transparent', border: 'none', color: active ? '#00f0ff' : 'rgba(255,255,255,0.7)', fontWeight: active ? 700 : 500, fontSize: 14, cursor: 'pointer', marginBottom: 4, textAlign: 'start' }}
              >
                <link.icon className="w-4 h-4" />
                {link.label}
              </button>
            );
          })}
        </div>
      )}

      <style>{`
        @media (min-width: 640px) {
          .hidden-mobile { display: flex !important; }
          .show-mobile { display: none !important; }
          .show-sm { display: flex !important; }
        }
        @media (max-width: 639px) {
          .hidden-mobile { display: none !important; }
          .show-mobile { display: flex !important; }
          .show-sm { display: none !important; }
        }
      `}</style>
    </motion.nav>
  );
}
