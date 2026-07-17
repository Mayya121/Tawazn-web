import { motion } from 'framer-motion';

export function BackgroundEffects() {
  return (
    <div style={{ position: 'fixed', inset: 0, overflow: 'hidden', pointerEvents: 'none', zIndex: -1, background: '#03060d' }}>
      {/* CSS grain texture — no external URL */}
      <div style={{
        position: 'absolute', inset: 0, opacity: 0.04,
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='1'/%3E%3C/svg%3E")`,
        backgroundRepeat: 'repeat',
      }} />

      {/* Top-left cyan glow */}
      <motion.div
        animate={{ scale: [1, 1.2, 1], opacity: [0.18, 0.3, 0.18] }}
        transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut' }}
        style={{
          position: 'absolute', top: '-15%', left: '-12%',
          width: '55%', height: '55%', borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(0,240,255,0.22) 0%, transparent 70%)',
          filter: 'blur(60px)', mixBlendMode: 'screen',
        }}
      />

      {/* Bottom-right purple glow */}
      <motion.div
        animate={{ scale: [1, 1.35, 1], opacity: [0.12, 0.22, 0.12] }}
        transition={{ duration: 11, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
        style={{
          position: 'absolute', bottom: '-22%', right: '-12%',
          width: '65%', height: '65%', borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(180,77,255,0.2) 0%, transparent 70%)',
          filter: 'blur(80px)', mixBlendMode: 'screen',
        }}
      />

      {/* Bottom-left accent glow */}
      <motion.div
        animate={{ scale: [1, 1.15, 1], opacity: [0.08, 0.16, 0.08] }}
        transition={{ duration: 13, repeat: Infinity, ease: 'easeInOut', delay: 5 }}
        style={{
          position: 'absolute', bottom: '10%', left: '-5%',
          width: '35%', height: '40%', borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(0,240,255,0.14) 0%, transparent 70%)',
          filter: 'blur(60px)', mixBlendMode: 'screen',
        }}
      />

      {/* Center ambient */}
      <div style={{
        position: 'absolute', top: '35%', left: '50%', transform: 'translateX(-50%)',
        width: '45%', height: '45%', borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(60,80,160,0.12) 0%, transparent 70%)',
        filter: 'blur(80px)',
      }} />

      {/* Subtle grid overlay */}
      <div style={{
        position: 'absolute', inset: 0, opacity: 0.018,
        backgroundImage: `linear-gradient(rgba(0,240,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(0,240,255,1) 1px, transparent 1px)`,
        backgroundSize: '80px 80px',
      }} />
    </div>
  );
}
