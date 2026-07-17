import React, { useState } from 'react';
import { useLanguage } from '@/contexts/language-context';
import { content, t } from '@/lib/content';
import { Globe, Sparkles, BarChart2, Trophy, LayoutDashboard, Home, Menu, X } from 'lucide-react';
import { useLocation } from 'wouter';

export function Navbar() {
  const { lang, toggleLanguage } = useLanguage();
  const [location, navigate] = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  const navLinks = lang === 'ar'
    ? [
        { path: '/',           label: 'الرئيسية',    icon: Home },
        { path: '/dashboard',  label: 'لوحة التحكم', icon: LayoutDashboard },
        { path: '/insights',   label: 'التحليلات',   icon: BarChart2 },
        { path: '/challenges', label: 'التحديات',    icon: Trophy },
      ]
    : [
        { path: '/',           label: 'Home',       icon: Home },
        { path: '/dashboard',  label: 'Dashboard',  icon: LayoutDashboard },
        { path: '/insights',   label: 'Insights',   icon: BarChart2 },
        { path: '/challenges', label: 'Challenges', icon: Trophy },
      ];

  return (
    <nav style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 50, padding: '12px 20px' }}>
      <div style={{
        maxWidth: 1200, margin: '0 auto',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        background: 'rgba(3,6,13,0.88)',
        backdropFilter: 'blur(28px)',
        WebkitBackdropFilter: 'blur(28px)',
        border: '1px solid rgba(255,255,255,0.08)',
        borderRadius: 20,
        padding: '9px 18px',
        boxShadow: '0 4px 32px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.06)',
      }}>

        {/* Logo */}
        <button onClick={() => { navigate('/'); setMenuOpen(false); }}
          style={{ display: 'flex', alignItems: 'center', gap: 10, background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}>
          <div style={{
            width: 36, height: 36, borderRadius: 10,
            background: 'linear-gradient(135deg, #00f0ff, #b44dff)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            boxShadow: '0 0 18px rgba(0,240,255,0.4)',
            flexShrink: 0,
          }}>
            <Sparkles className="w-4 h-4" style={{ color: 'white' }} />
          </div>
          <div>
            <div style={{ fontSize: 16, fontWeight: 800, color: 'white', lineHeight: 1 }}>{t(content.nav.brand, lang)}</div>
            <div style={{ fontSize: 9, textTransform: 'uppercase', letterSpacing: '0.14em', color: '#00f0ff', fontWeight: 700, marginTop: 2 }}>{t(content.nav.subBrand, lang)}</div>
          </div>
        </button>

        {/* Desktop Nav */}
        <div className="tw-nav-desktop" style={{ display: 'flex', alignItems: 'center', gap: 3 }}>
          {navLinks.map(link => {
            const active = location === link.path;
            return (
              <button key={link.path} onClick={() => navigate(link.path)}
                style={{
                  display: 'flex', alignItems: 'center', gap: 6,
                  padding: '7px 14px', borderRadius: 12,
                  background: active ? 'rgba(0,240,255,0.12)' : 'transparent',
                  border: active ? '1px solid rgba(0,240,255,0.3)' : '1px solid transparent',
                  color: active ? '#00f0ff' : 'rgba(255,255,255,0.55)',
                  fontWeight: active ? 700 : 500,
                  fontSize: 13,
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                  boxShadow: active ? '0 0 12px rgba(0,240,255,0.15)' : 'none',
                }}>
                <link.icon className="w-3.5 h-3.5" />
                {link.label}
              </button>
            );
          })}
        </div>

        {/* Right side */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <button onClick={toggleLanguage}
            style={{
              display: 'flex', alignItems: 'center', gap: 6,
              padding: '7px 12px', borderRadius: 10,
              background: 'rgba(255,255,255,0.05)',
              border: '1px solid rgba(255,255,255,0.09)',
              color: 'rgba(255,255,255,0.65)',
              fontWeight: 600, fontSize: 13, cursor: 'pointer',
              transition: 'all 0.2s',
            }}>
            <Globe className="w-4 h-4" />
            <span>{t(content.nav.toggle, lang)}</span>
          </button>

          <button onClick={() => setMenuOpen(v => !v)} className="tw-nav-mobile-btn"
            style={{
              padding: '7px', borderRadius: 10,
              background: 'rgba(255,255,255,0.05)',
              border: '1px solid rgba(255,255,255,0.09)',
              color: 'rgba(255,255,255,0.7)',
              cursor: 'pointer',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
            {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile dropdown */}
      {menuOpen && (
        <div className="tw-nav-mobile-menu" style={{
          maxWidth: 1200, margin: '8px auto 0',
          background: 'rgba(6,10,22,0.96)',
          backdropFilter: 'blur(28px)',
          WebkitBackdropFilter: 'blur(28px)',
          border: '1px solid rgba(255,255,255,0.08)',
          borderRadius: 16,
          padding: '10px 12px',
          boxShadow: '0 16px 48px rgba(0,0,0,0.6)',
        }}>
          {navLinks.map(link => {
            const active = location === link.path;
            return (
              <button key={link.path} onClick={() => { navigate(link.path); setMenuOpen(false); }}
                style={{
                  display: 'flex', alignItems: 'center', gap: 10,
                  width: '100%', padding: '13px 14px', borderRadius: 12,
                  background: active ? 'rgba(0,240,255,0.1)' : 'transparent',
                  border: 'none',
                  color: active ? '#00f0ff' : 'rgba(255,255,255,0.75)',
                  fontWeight: active ? 700 : 500, fontSize: 15,
                  cursor: 'pointer', marginBottom: 2,
                  textAlign: 'start', boxSizing: 'border-box',
                  borderLeft: active ? '2px solid rgba(0,240,255,0.5)' : '2px solid transparent',
                }}>
                <link.icon className="w-4 h-4" />
                {link.label}
              </button>
            );
          })}
        </div>
      )}

      <style>{`
        @media (min-width: 640px) {
          .tw-nav-desktop      { display: flex !important; }
          .tw-nav-mobile-btn   { display: none !important; }
          .tw-nav-mobile-menu  { display: none !important; }
        }
        @media (max-width: 639px) {
          .tw-nav-desktop      { display: none !important; }
          .tw-nav-mobile-btn   { display: flex !important; }
          .tw-nav-mobile-menu  { display: block !important; }
        }
      `}</style>
    </nav>
  );
}
