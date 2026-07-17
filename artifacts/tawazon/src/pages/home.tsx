import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '@/contexts/language-context';
import { content, t } from '@/lib/content';
import {
  Zap, CloudRain, Coffee, Activity, BrainCircuit,
  Trophy, Target, ShieldCheck, ArrowLeft, ArrowRight, X, CheckCircle2
} from 'lucide-react';
import { useLocation } from 'wouter';

function SparklesIcon({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
      fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
      className={className}>
      <path d="M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z" />
    </svg>
  );
}

const ICONS = { Zap, CloudRain, Coffee };

/* ─── WAITLIST MODAL ────────────────────────────────────────── */
function WaitlistModal({ lang, onClose }: { lang: string; onClose: () => void }) {
  const [email, setEmail] = useState('');
  const [done, setDone] = useState(false);
  const [err, setErr] = useState('');

  const submit = () => {
    if (!email.includes('@') || !email.includes('.')) {
      setErr(lang === 'ar' ? 'أدخل بريداً إلكترونياً صحيحاً' : 'Enter a valid email address');
      return;
    }
    setDone(true);
  };

  return (
    <div
      onClick={onClose}
      style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.8)', zIndex: 300, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 20, backdropFilter: 'blur(8px)' }}
    >
      <motion.div
        initial={{ opacity: 0, y: 20, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.25 }}
        onClick={e => e.stopPropagation()}
        style={{ background: 'linear-gradient(145deg, #0b1020, #080f1d)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 28, padding: 36, width: '100%', maxWidth: 440, position: 'relative', boxShadow: '0 32px 80px rgba(0,0,0,0.7), inset 0 1px 0 rgba(255,255,255,0.07)' }}
      >
        <button onClick={onClose} style={{ position: 'absolute', top: 16, right: 16, width: 32, height: 32, borderRadius: '50%', background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.1)', color: 'rgba(255,255,255,0.5)', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <X className="w-4 h-4" />
        </button>

        {done ? (
          <div style={{ textAlign: 'center', padding: '16px 0' }}>
            <div style={{ width: 72, height: 72, borderRadius: '50%', background: 'rgba(34,197,94,0.1)', border: '1px solid rgba(34,197,94,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px', boxShadow: '0 0 32px rgba(34,197,94,0.2)' }}>
              <CheckCircle2 className="w-9 h-9" style={{ color: '#22c55e' }} />
            </div>
            <h2 style={{ fontWeight: 800, fontSize: 22, color: 'white', marginBottom: 8 }}>
              {lang === 'ar' ? '🎉 تم التسجيل!' : '🎉 You\'re on the list!'}
            </h2>
            <p style={{ color: 'rgba(255,255,255,0.55)', fontSize: 14, lineHeight: 1.7, marginBottom: 24 }}>
              {lang === 'ar'
                ? 'سنُرسل لك إشعاراً فور إطلاق توازن. في الوقت الحالي، يمكنك تجربة التطبيق مباشرةً.'
                : 'We\'ll notify you as soon as Tawazon launches. In the meantime, try the app now.'}
            </p>
            <button onClick={onClose} className="btn-primary" style={{ background: '#00f0ff', color: '#03060d', border: 'none', borderRadius: 14, padding: '13px 32px', fontWeight: 800, fontSize: 15, cursor: 'pointer', boxShadow: '0 0 28px rgba(0,240,255,0.35)' }}>
              {lang === 'ar' ? 'جرّب التطبيق الآن' : 'Try the App Now'}
            </button>
          </div>
        ) : (
          <>
            <div style={{ marginBottom: 24 }}>
              <h2 style={{ fontWeight: 800, fontSize: 22, color: 'white', marginBottom: 8 }}>
                {lang === 'ar' ? 'انضم إلى قائمة الانتظار' : 'Join the Waitlist'}
              </h2>
              <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: 14, lineHeight: 1.65 }}>
                {lang === 'ar'
                  ? 'كن من أوائل المستخدمين لتوازن وادخل عالم الذكاء المالي العاطفي.'
                  : 'Be among the first users of Tawazon and enter the world of emotional financial intelligence.'}
              </p>
            </div>

            <div style={{ display: 'flex', gap: 8, marginBottom: 10 }}>
              {['🚀', '🎁', '🔒'].map((em, i) => (
                <div key={i} style={{ flex: 1, background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 12, padding: '12px', textAlign: 'center', fontSize: 22 }}>{em}</div>
              ))}
            </div>
            <div style={{ display: 'flex', gap: 8, marginBottom: 24, fontSize: 11, color: 'rgba(255,255,255,0.4)', textAlign: 'center' }}>
              {(lang === 'ar'
                ? ['وصول مبكر', 'ميزات مجانية', 'خصوصية تامة']
                : ['Early Access', 'Free Features', 'Full Privacy']
              ).map((l, i) => <span key={i} style={{ flex: 1 }}>{l}</span>)}
            </div>

            <label style={{ fontSize: 13, fontWeight: 600, color: 'rgba(255,255,255,0.65)', display: 'block', marginBottom: 8 }}>
              {lang === 'ar' ? 'البريد الإلكتروني' : 'Email Address'}
            </label>
            <input
              type="email"
              placeholder={lang === 'ar' ? 'example@email.com' : 'your@email.com'}
              value={email}
              onChange={e => { setEmail(e.target.value); setErr(''); }}
              onKeyDown={e => e.key === 'Enter' && submit()}
              dir="ltr"
              style={{ width: '100%', background: 'rgba(255,255,255,0.06)', border: err ? '1px solid rgba(239,68,68,0.5)' : '1px solid rgba(255,255,255,0.12)', borderRadius: 12, padding: '13px 16px', color: 'white', fontSize: 15, outline: 'none', boxSizing: 'border-box', marginBottom: err ? 8 : 18, transition: 'border-color 0.2s' }}
            />
            {err && <p style={{ color: '#f87171', fontSize: 12, marginBottom: 14 }}>{err}</p>}

            <button
              onClick={submit}
              className="btn-primary"
              style={{ width: '100%', background: 'linear-gradient(135deg, #00f0ff, #b44dff)', backgroundSize: '200% 200%', color: '#03060d', border: 'none', borderRadius: 14, padding: '14px', fontWeight: 800, fontSize: 15, cursor: 'pointer', boxShadow: '0 0 28px rgba(0,240,255,0.2)' }}
            >
              {lang === 'ar' ? 'احجز مكانك الآن' : 'Reserve My Spot'}
            </button>
          </>
        )}
      </motion.div>
    </div>
  );
}

/* ─── HERO ──────────────────────────────────────────────────── */
function Hero({ onWaitlist }: { onWaitlist: () => void }) {
  const { lang, dir } = useLanguage();
  const [, navigate] = useLocation();
  const Icon = dir === 'rtl' ? ArrowLeft : ArrowRight;

  return (
    <section style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '80px 24px 60px', position: 'relative', overflow: 'hidden', zIndex: 1 }}>
      {/* Hero glow behind title */}
      <div style={{ position: 'absolute', top: '30%', left: '50%', transform: 'translateX(-50%)', width: 600, height: 400, background: 'radial-gradient(ellipse, rgba(0,240,255,0.07) 0%, rgba(180,77,255,0.05) 50%, transparent 75%)', filter: 'blur(40px)', pointerEvents: 'none' }} />

      <div style={{ maxWidth: 820, margin: '0 auto', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', position: 'relative' }}>
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '7px 18px', borderRadius: 9999, background: 'rgba(0,240,255,0.07)', border: '1px solid rgba(0,240,255,0.25)', color: '#00f0ff', fontSize: 13, fontWeight: 600, marginBottom: 36, boxShadow: '0 0 20px rgba(0,240,255,0.1)' }}
        >
          <SparklesIcon className="w-4 h-4" />
          <span>{t(content.hero.badge, lang)}</span>
        </motion.div>

        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.75, delay: 0.1 }}
          style={{ fontSize: 'clamp(2.6rem, 7.5vw, 5.2rem)', fontWeight: 900, letterSpacing: '-0.025em', lineHeight: 1.1, marginBottom: 26, color: 'white', textShadow: '0 0 60px rgba(0,240,255,0.12)' }}
        >
          {t(content.hero.title, lang)}
        </motion.h1>

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          style={{ fontSize: 18, color: 'rgba(255,255,255,0.6)', maxWidth: 580, lineHeight: 1.75, marginBottom: 44 }}
        >
          {t(content.hero.tagline, lang)}
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.35 }}
          style={{ display: 'flex', gap: 12, flexWrap: 'wrap', justifyContent: 'center' }}
        >
          <button
            onClick={() => navigate('/dashboard')}
            className="btn-primary"
            style={{ background: '#00f0ff', color: '#03060d', border: 'none', borderRadius: 14, padding: '15px 32px', fontSize: 16, fontWeight: 800, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 8, boxShadow: '0 0 32px rgba(0,240,255,0.35)' }}
          >
            {lang === 'ar' ? 'جرّب التطبيق الآن' : 'Try the App Now'}
            <Icon className="w-5 h-5" />
          </button>
          <button
            onClick={onWaitlist}
            className="btn-ghost"
            style={{ background: 'rgba(255,255,255,0.05)', color: 'white', border: '1px solid rgba(255,255,255,0.15)', borderRadius: 14, padding: '15px 32px', fontSize: 16, fontWeight: 600, cursor: 'pointer', backdropFilter: 'blur(8px)', transition: 'all 0.2s' }}
          >
            {t(content.hero.cta, lang)}
          </button>
        </motion.div>

        {/* Social proof */}
        <motion.div
          initial={{ opacity: 0 }} animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.65 }}
          style={{ marginTop: 52, display: 'flex', alignItems: 'center', gap: 14, flexWrap: 'wrap', justifyContent: 'center' }}
        >
          <div style={{ display: 'flex' }}>
            {['#00f0ff', '#b44dff', '#22c55e', '#f97316', '#fbbf24'].map((c, i) => (
              <div key={i} style={{ width: 32, height: 32, borderRadius: '50%', background: `linear-gradient(135deg, ${c}60, ${c}25)`, border: `2px solid ${c}70`, marginInlineStart: i > 0 ? -9 : 0, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, color: 'white', fontWeight: 700, boxShadow: `0 0 8px ${c}40` }}>
                {['أ', 'م', 'س', 'ن', 'ف'][i]}
              </div>
            ))}
          </div>
          <span style={{ color: 'rgba(255,255,255,0.4)', fontSize: 13 }}>
            {lang === 'ar' ? '+٥٠٠ مستخدم انضموا إلى قائمة الانتظار' : '+500 users joined the waitlist'}
          </span>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.3 }}
        style={{ position: 'absolute', bottom: 32, left: '50%', transform: 'translateX(-50%)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 7, color: 'rgba(255,255,255,0.25)', fontSize: 11 }}
      >
        <span>{lang === 'ar' ? 'مرّر للأسفل' : 'Scroll down'}</span>
        <div style={{ width: 22, height: 34, border: '1px solid rgba(255,255,255,0.15)', borderRadius: 11, display: 'flex', alignItems: 'flex-start', justifyContent: 'center', padding: '5px 0' }}>
          <div style={{ width: 3, height: 8, background: '#00f0ff', borderRadius: 2, animation: 'scrollDot 1.6s ease-in-out infinite' }} />
        </div>
      </motion.div>
    </section>
  );
}

/* ─── SECTION DIVIDER ────────────────────────────────────────── */
function Divider() {
  return (
    <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 24px' }}>
      <div style={{ height: 1, background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.06), transparent)' }} />
    </div>
  );
}

/* ─── SECTION WRAPPER ────────────────────────────────────────── */
function SW({ children }: { children: React.ReactNode }) {
  return <div style={{ position: 'relative', zIndex: 1 }}>{children}</div>;
}

/* ─── PROBLEM ────────────────────────────────────────────────── */
function Problem() {
  const { lang } = useLanguage();
  return (
    <SW>
      <section style={{ padding: '96px 24px', maxWidth: 1200, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 64 }}>
          <span className="section-badge" style={{ color: '#b44dff' }}>{t(content.problem.badge, lang)}</span>
          <h2 style={{ fontSize: 'clamp(1.9rem, 4vw, 3rem)', fontWeight: 800, color: 'white', marginBottom: 18, lineHeight: 1.15 }}>{t(content.problem.title, lang)}</h2>
          <p style={{ color: 'rgba(255,255,255,0.55)', fontSize: 17, maxWidth: 560, margin: '0 auto', lineHeight: 1.75 }}>{t(content.problem.desc, lang)}</p>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 20 }}>
          {content.problem.cards.map((card, i) => {
            const IconComponent = ICONS[card.icon as keyof typeof ICONS];
            return (
              <div key={i} style={{
                background: 'rgba(255,255,255,0.04)',
                border: '1px solid rgba(255,255,255,0.08)',
                borderRadius: 24,
                padding: 32,
                position: 'relative',
                overflow: 'hidden',
                boxShadow: '0 4px 24px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.05)',
                transition: 'transform 0.2s, box-shadow 0.2s',
              }}>
                {/* Top accent glow */}
                <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 2, background: 'linear-gradient(90deg, transparent, rgba(180,77,255,0.6), transparent)', borderRadius: '24px 24px 0 0' }} />
                <div style={{ position: 'absolute', top: -30, right: -20, width: 100, height: 100, background: 'rgba(180,77,255,0.06)', borderRadius: '50%', filter: 'blur(30px)' }} />
                <div style={{ background: 'rgba(180,77,255,0.1)', borderRadius: 14, width: 52, height: 52, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 20, border: '1px solid rgba(180,77,255,0.2)' }}>
                  <IconComponent className="w-6 h-6" style={{ color: '#b44dff' }} />
                </div>
                <h3 style={{ fontSize: 18, fontWeight: 700, color: 'white', marginBottom: 10 }}>{t(card.title, lang)}</h3>
                <p style={{ color: 'rgba(255,255,255,0.55)', lineHeight: 1.7, fontSize: 14 }}>{t(card.desc, lang)}</p>
              </div>
            );
          })}
        </div>
      </section>
    </SW>
  );
}

/* ─── SOLUTION ───────────────────────────────────────────────── */
function Solution() {
  const { lang } = useLanguage();
  return (
    <SW>
      <section style={{ padding: '96px 24px', maxWidth: 1200, margin: '0 auto' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 72, alignItems: 'center' }}>
          <div>
            <span className="section-badge" style={{ color: '#00f0ff' }}>{t(content.solution.badge, lang)}</span>
            <h2 style={{ fontSize: 'clamp(1.9rem, 3.5vw, 2.9rem)', fontWeight: 800, color: 'white', marginBottom: 18, lineHeight: 1.15 }}>{t(content.solution.title, lang)}</h2>
            <p style={{ color: 'rgba(255,255,255,0.55)', fontSize: 16, lineHeight: 1.75, marginBottom: 36 }}>{t(content.solution.desc, lang)}</p>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 22 }}>
              {content.solution.features.map((feature, i) => (
                <div key={i} style={{ display: 'flex', gap: 12 }}>
                  <div style={{ width: 28, height: 28, borderRadius: '50%', background: 'rgba(0,240,255,0.08)', border: '1px solid rgba(0,240,255,0.25)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: 2 }}>
                    <ShieldCheck className="w-4 h-4" style={{ color: '#00f0ff' }} />
                  </div>
                  <div>
                    <h4 style={{ fontWeight: 700, color: 'white', marginBottom: 4, fontSize: 14 }}>{t(feature.title, lang)}</h4>
                    <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.5)', lineHeight: 1.55 }}>{t(feature.desc, lang)}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          {/* Orbital diagram */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <div style={{ width: 300, height: 300, position: 'relative' }}>
              {/* Outer ring */}
              <div style={{ position: 'absolute', inset: 0, borderRadius: '50%', border: '1px solid rgba(0,240,255,0.08)' }} />
              <div style={{ position: 'absolute', inset: 24, borderRadius: '50%', border: '1px solid rgba(180,77,255,0.06)' }} />
              {/* Central glow */}
              <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(circle, rgba(0,240,255,0.12) 0%, rgba(180,77,255,0.08) 50%, transparent 75%)', borderRadius: '50%', filter: 'blur(16px)' }} />
              {/* Center circle */}
              <div style={{ position: 'absolute', inset: 40, background: 'rgba(255,255,255,0.03)', backdropFilter: 'blur(12px)', border: '1px solid rgba(0,240,255,0.18)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <BrainCircuit className="w-24 h-24" style={{ color: '#00f0ff', opacity: 0.7 }} strokeWidth={1} />
              </div>
              {/* Orbiting icons */}
              {[
                { top: '8%', left: '14%', icon: Activity, color: '#b44dff', border: 'rgba(180,77,255,0.35)' },
                { bottom: '18%', right: '4%', icon: Target, color: '#00f0ff', border: 'rgba(0,240,255,0.35)' },
                { bottom: '10%', left: '16%', icon: Trophy, color: '#fbbf24', border: 'rgba(251,191,36,0.35)' },
              ].map((item, i) => (
                <div key={i} style={{ position: 'absolute', ...{ top: item.top, left: item.left, bottom: item.bottom, right: item.right } as any, width: 48, height: 48, borderRadius: '50%', background: 'rgba(255,255,255,0.04)', border: `1px solid ${item.border}`, display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: `0 0 16px ${item.color}20`, animation: 'float 4s ease-in-out infinite', animationDelay: `${i * 1.3}s` }}>
                  <item.icon className="w-5 h-5" style={{ color: item.color }} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </SW>
  );
}

/* ─── HOW IT WORKS ───────────────────────────────────────────── */
function HowItWorks() {
  const { lang } = useLanguage();
  const [, navigate] = useLocation();
  const steps = lang === 'ar'
    ? [
        { num: '١', title: 'سجّل حالتك المزاجية', desc: 'أخبر توازن كيف تشعر قبل أو بعد كل عملية شراء' },
        { num: '٢', title: 'تحليل الأنماط', desc: 'يحلل الذكاء الاصطناعي العلاقة بين مشاعرك وقرارات الإنفاق' },
        { num: '٣', title: 'اكتسب رؤى مخصصة', desc: 'احصل على توصيات عملية مبنية على سلوكك الفردي' },
        { num: '٤', title: 'أتمّ التحديات', desc: 'اكسب نقاطاً وشارات لكل هدف مالي تحققه' },
      ]
    : [
        { num: '1', title: 'Log Your Mood', desc: 'Tell Tawazon how you feel before or after each purchase' },
        { num: '2', title: 'Pattern Analysis', desc: 'AI analyzes the link between your emotions and spending' },
        { num: '3', title: 'Get Insights', desc: 'Receive actionable recommendations based on your behavior' },
        { num: '4', title: 'Complete Challenges', desc: 'Earn points and badges for every financial goal you achieve' },
      ];

  const stepColors = ['#00f0ff', '#b44dff', '#fbbf24', '#22c55e'];

  return (
    <SW>
      <section style={{ padding: '96px 24px', maxWidth: 1200, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 64 }}>
          <span className="section-badge" style={{ color: '#00f0ff' }}>
            {lang === 'ar' ? 'كيف يعمل توازن' : 'How It Works'}
          </span>
          <h2 style={{ fontSize: 'clamp(1.9rem, 4vw, 3rem)', fontWeight: 800, color: 'white', lineHeight: 1.15 }}>
            {lang === 'ar' ? 'أربع خطوات نحو الوعي المالي' : 'Four Steps to Financial Awareness'}
          </h2>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(230px, 1fr))', gap: 20, marginBottom: 48 }}>
          {steps.map((step, i) => (
            <div key={i} style={{
              background: 'rgba(255,255,255,0.04)',
              border: '1px solid rgba(255,255,255,0.08)',
              borderRadius: 24,
              padding: 28,
              position: 'relative',
              overflow: 'hidden',
              boxShadow: `0 4px 24px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.05)`,
            }}>
              {/* Top accent */}
              <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 2, background: `linear-gradient(90deg, transparent, ${stepColors[i]}80, transparent)`, borderRadius: '24px 24px 0 0' }} />
              {/* Big watermark number */}
              <div style={{ position: 'absolute', top: -12, right: -4, fontSize: 96, fontWeight: 900, color: `${stepColors[i]}06`, lineHeight: 1, userSelect: 'none', pointerEvents: 'none' }}>{step.num}</div>
              {/* Step circle */}
              <div style={{ width: 38, height: 38, borderRadius: '50%', background: `${stepColors[i]}12`, border: `1px solid ${stepColors[i]}40`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 15, fontWeight: 800, color: stepColors[i], marginBottom: 18 }}>{step.num}</div>
              <h3 style={{ fontWeight: 700, fontSize: 16, color: 'white', marginBottom: 8 }}>{step.title}</h3>
              <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.5)', lineHeight: 1.65 }}>{step.desc}</p>
            </div>
          ))}
        </div>

        {/* CTA block */}
        <div style={{
          background: 'linear-gradient(135deg, rgba(0,240,255,0.06) 0%, rgba(180,77,255,0.04) 100%)',
          border: '1px solid rgba(0,240,255,0.18)',
          borderRadius: 24,
          padding: '36px',
          textAlign: 'center',
          boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.06)',
        }}>
          <p style={{ color: 'rgba(255,255,255,0.65)', fontSize: 17, marginBottom: 20, fontWeight: 500 }}>
            {lang === 'ar' ? 'ابدأ رحلتك الآن — مجاناً تماماً' : 'Start your journey now — completely free'}
          </p>
          <button
            onClick={() => navigate('/dashboard')}
            className="btn-primary"
            style={{ background: '#00f0ff', color: '#03060d', border: 'none', borderRadius: 14, padding: '14px 36px', fontSize: 16, fontWeight: 800, cursor: 'pointer', boxShadow: '0 0 28px rgba(0,240,255,0.3)' }}
          >
            {lang === 'ar' ? 'ابدأ الآن' : 'Get Started'}
          </button>
        </div>
      </section>
    </SW>
  );
}

/* ─── VISION ─────────────────────────────────────────────────── */
function Vision() {
  const { lang } = useLanguage();
  const stats = lang === 'ar'
    ? [{ val: '٧٠٪', label: 'الشباب المستهدفون' }, { val: '٢٠٣٠', label: 'رؤية المملكة' }, { val: '٣×', label: 'تحسين الادخار' }]
    : [{ val: '70%', label: 'Target Youth' }, { val: '2030', label: 'Saudi Vision' }, { val: '3×', label: 'Savings Boost' }];
  return (
    <SW>
      <section style={{ padding: '96px 24px', maxWidth: 860, margin: '0 auto' }}>
        <div style={{
          background: 'linear-gradient(135deg, rgba(234,179,8,0.07) 0%, rgba(20,14,0,0) 100%)',
          border: '1px solid rgba(234,179,8,0.22)',
          borderRadius: 28,
          padding: '60px 48px',
          textAlign: 'center',
          position: 'relative',
          overflow: 'hidden',
          boxShadow: '0 8px 40px rgba(0,0,0,0.4), inset 0 1px 0 rgba(234,179,8,0.1)',
        }}>
          {/* Glow */}
          <div style={{ position: 'absolute', top: -40, left: '50%', transform: 'translateX(-50%)', width: 300, height: 200, background: 'radial-gradient(ellipse, rgba(234,179,8,0.12) 0%, transparent 70%)', filter: 'blur(30px)', pointerEvents: 'none' }} />
          <span className="section-badge" style={{ color: '#eab308' }}>{t(content.vision.badge, lang)}</span>
          <h2 style={{ fontSize: 'clamp(1.7rem, 3.5vw, 2.6rem)', fontWeight: 900, marginBottom: 18, background: 'linear-gradient(90deg, #f59e0b, #fde68a, #d97706)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
            {t(content.vision.title, lang)}
          </h2>
          <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: 16, lineHeight: 1.75, maxWidth: 520, margin: '0 auto 44px' }}>{t(content.vision.desc, lang)}</p>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 16 }}>
            {stats.map((s, i) => (
              <div key={i} style={{ textAlign: 'center', padding: '20px 8px', background: 'rgba(234,179,8,0.05)', borderRadius: 16, border: '1px solid rgba(234,179,8,0.12)' }}>
                <div style={{ fontSize: 'clamp(1.6rem, 3.5vw, 2.2rem)', fontWeight: 900, color: '#fbbf24', textShadow: '0 0 24px rgba(251,191,36,0.4)' }}>{s.val}</div>
                <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.45)', marginTop: 6, fontWeight: 500 }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </SW>
  );
}

/* ─── TEAM ───────────────────────────────────────────────────── */
function Team() {
  const { lang } = useLanguage();
  const memberColors = ['#00f0ff', '#b44dff', '#22c55e', '#f97316', '#fbbf24'];
  return (
    <SW>
      <section style={{ padding: '96px 24px', maxWidth: 1000, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 52 }}>
          <span className="section-badge" style={{ color: '#00f0ff' }}>{t(content.team.badge, lang)}</span>
          <h2 style={{ fontSize: 'clamp(1.9rem, 4vw, 2.6rem)', fontWeight: 800, color: 'white' }}>{t(content.team.title, lang)}</h2>
        </div>
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 16 }}>
          {content.team.members.map((member, i) => {
            const c = memberColors[i % memberColors.length];
            return (
              <div key={i} style={{
                background: 'rgba(255,255,255,0.04)',
                border: '1px solid rgba(255,255,255,0.08)',
                borderRadius: 22,
                padding: '26px 20px',
                textAlign: 'center',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                width: 162,
                backdropFilter: 'blur(12px)',
                boxShadow: `0 4px 20px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.05)`,
                position: 'relative',
                overflow: 'hidden',
              }}>
                <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 2, background: `linear-gradient(90deg, transparent, ${c}70, transparent)`, borderRadius: '22px 22px 0 0' }} />
                <div style={{ width: 56, height: 56, borderRadius: '50%', background: `linear-gradient(135deg, ${c}30, ${c}10)`, border: `1px solid ${c}40`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20, fontWeight: 800, color: c, marginBottom: 14, boxShadow: `0 0 16px ${c}20` }}>
                  {t(member.name, lang).charAt(0)}
                </div>
                <h4 style={{ fontWeight: 700, fontSize: 13, color: 'white', marginBottom: 5 }}>{t(member.name, lang)}</h4>
                <p style={{ fontSize: 11, color: 'rgba(255,255,255,0.45)', lineHeight: 1.4 }}>{t(member.role, lang)}</p>
              </div>
            );
          })}
        </div>
      </section>
    </SW>
  );
}

/* ─── FOOTER ─────────────────────────────────────────────────── */
function Footer({ onWaitlist }: { onWaitlist: () => void }) {
  const { lang } = useLanguage();
  const [, navigate] = useLocation();
  return (
    <footer style={{ borderTop: '1px solid rgba(255,255,255,0.06)', padding: '56px 24px 36px', position: 'relative', zIndex: 1 }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 48, justifyContent: 'space-between', marginBottom: 48 }}>
          {/* Brand */}
          <div style={{ maxWidth: 300 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, color: '#00f0ff', fontWeight: 800, fontSize: 20, marginBottom: 14 }}>
              <div style={{ width: 32, height: 32, borderRadius: 9, background: 'linear-gradient(135deg, #00f0ff, #b44dff)', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 0 14px rgba(0,240,255,0.3)' }}>
                <SparklesIcon className="w-4 h-4" style={{ color: 'white' } as any} />
              </div>
              <span>{t(content.nav.brand, lang)}</span>
            </div>
            <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.38)', lineHeight: 1.75 }}>
              {lang === 'ar'
                ? 'منصة ذكاء مالي عاطفي مدعومة بالذكاء الاصطناعي. مشروع جامعي سعودي حائز على جوائز.'
                : 'AI-powered emotional financial intelligence platform. Award-winning Saudi university project.'}
            </p>
          </div>
          {/* Nav */}
          <div style={{ display: 'flex', gap: 56, flexWrap: 'wrap' }}>
            <div>
              <h4 style={{ fontWeight: 700, color: 'rgba(255,255,255,0.8)', fontSize: 13, marginBottom: 16, letterSpacing: '0.05em' }}>{lang === 'ar' ? 'التطبيق' : 'App'}</h4>
              {(lang === 'ar'
                ? [['لوحة التحكم', '/dashboard'], ['التحليلات', '/insights'], ['التحديات', '/challenges']]
                : [['Dashboard', '/dashboard'], ['Insights', '/insights'], ['Challenges', '/challenges']]
              ).map(([label, path], i) => (
                <button key={i} onClick={() => navigate(path as string)}
                  style={{ display: 'block', background: 'none', border: 'none', color: 'rgba(255,255,255,0.4)', fontSize: 13, cursor: 'pointer', padding: '5px 0', marginBottom: 4, fontFamily: 'inherit', transition: 'color 0.2s' }}
                  onMouseEnter={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.75)')}
                  onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.4)')}>
                  {label}
                </button>
              ))}
            </div>
            <div>
              <h4 style={{ fontWeight: 700, color: 'rgba(255,255,255,0.8)', fontSize: 13, marginBottom: 16, letterSpacing: '0.05em' }}>{lang === 'ar' ? 'انضم' : 'Join'}</h4>
              <button onClick={onWaitlist}
                style={{ display: 'block', background: 'none', border: 'none', color: 'rgba(255,255,255,0.4)', fontSize: 13, cursor: 'pointer', padding: '5px 0', marginBottom: 4, fontFamily: 'inherit', transition: 'color 0.2s' }}
                onMouseEnter={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.75)')}
                onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.4)')}>
                {lang === 'ar' ? 'قائمة الانتظار' : 'Waitlist'}
              </button>
              <button onClick={() => navigate('/dashboard')}
                style={{ display: 'block', background: 'none', border: 'none', color: '#00f0ff', fontSize: 13, cursor: 'pointer', padding: '5px 0', fontFamily: 'inherit', fontWeight: 700 }}>
                {lang === 'ar' ? 'جرّب مجاناً' : 'Try Free'}
              </button>
            </div>
          </div>
        </div>
        <div style={{ borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: 28, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12 }}>
          <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.25)' }}>{t(content.footer.rights, lang)}</p>
          <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.18)' }}>
            {lang === 'ar' ? 'مشروع أكاديمي — ليس منتجاً تجارياً بعد' : 'Academic project — not a commercial product yet'}
          </p>
        </div>
      </div>
    </footer>
  );
}

/* ─── HOME PAGE ──────────────────────────────────────────────── */
export default function Home() {
  const [showWaitlist, setShowWaitlist] = useState(false);
  const { lang } = useLanguage();

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      {showWaitlist && <WaitlistModal lang={lang} onClose={() => setShowWaitlist(false)} />}
      <Hero onWaitlist={() => setShowWaitlist(true)} />
      <Divider />
      <Problem />
      <Divider />
      <Solution />
      <Divider />
      <HowItWorks />
      <Divider />
      <Vision />
      <Divider />
      <Team />
      <Footer onWaitlist={() => setShowWaitlist(true)} />
    </div>
  );
}
