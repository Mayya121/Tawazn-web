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

/* ─── WAITLIST MODAL ─────────────────────────────────────────────────────── */
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
      style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.75)', zIndex: 300, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 20 }}
    >
      <div
        onClick={e => e.stopPropagation()}
        style={{ background: '#0d1117', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 28, padding: 36, width: '100%', maxWidth: 440, position: 'relative' }}
      >
        <button onClick={onClose} style={{ position: 'absolute', top: 16, right: 16, width: 32, height: 32, borderRadius: '50%', background: 'rgba(255,255,255,0.07)', border: 'none', color: 'rgba(255,255,255,0.5)', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <X className="w-4 h-4" />
        </button>

        {done ? (
          /* Success state */
          <div style={{ textAlign: 'center', padding: '16px 0' }}>
            <div style={{ width: 72, height: 72, borderRadius: '50%', background: 'rgba(34,197,94,0.1)', border: '1px solid rgba(34,197,94,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px' }}>
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
            <button onClick={onClose} style={{ background: '#00f0ff', color: '#03060d', border: 'none', borderRadius: 12, padding: '12px 28px', fontWeight: 800, fontSize: 15, cursor: 'pointer' }}>
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

            <div style={{ display: 'flex', gap: 8, marginBottom: 12 }}>
              {['🚀', '🎁', '🔒'].map((em, i) => (
                <div key={i} style={{ flex: 1, background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: 10, padding: '10px', textAlign: 'center', fontSize: 20 }}>{em}</div>
              ))}
            </div>
            <div style={{ display: 'flex', gap: 8, marginBottom: 22, fontSize: 11, color: 'rgba(255,255,255,0.4)', textAlign: 'center' }}>
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
              style={{ width: '100%', background: 'rgba(255,255,255,0.06)', border: err ? '1px solid rgba(239,68,68,0.5)' : '1px solid rgba(255,255,255,0.12)', borderRadius: 12, padding: '12px 16px', color: 'white', fontSize: 15, outline: 'none', boxSizing: 'border-box', marginBottom: err ? 8 : 16 }}
            />
            {err && <p style={{ color: '#f87171', fontSize: 12, marginBottom: 12 }}>{err}</p>}

            <button
              onClick={submit}
              style={{ width: '100%', background: 'linear-gradient(135deg, #00f0ff, #b44dff)', color: '#03060d', border: 'none', borderRadius: 14, padding: '13px', fontWeight: 800, fontSize: 15, cursor: 'pointer' }}
            >
              {lang === 'ar' ? 'احجز مكانك الآن' : 'Reserve My Spot'}
            </button>
          </>
        )}
      </div>
    </div>
  );
}

/* ─── HERO ───────────────────────────────────────────────────────────────── */
function Hero({ onWaitlist }: { onWaitlist: () => void }) {
  const { lang, dir } = useLanguage();
  const [, navigate] = useLocation();
  const Icon = dir === 'rtl' ? ArrowLeft : ArrowRight;

  return (
    <section style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '80px 24px 60px', position: 'relative', overflow: 'hidden', zIndex: 1 }}>
      <div style={{ maxWidth: 800, margin: '0 auto', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '8px 16px', borderRadius: 9999, background: 'rgba(0,240,255,0.08)', border: '1px solid rgba(0,240,255,0.2)', color: '#00f0ff', fontSize: 14, fontWeight: 500, marginBottom: 32 }}
        >
          <SparklesIcon className="w-4 h-4" />
          <span>{t(content.hero.badge, lang)}</span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          style={{ fontSize: 'clamp(2.5rem, 7vw, 5rem)', fontWeight: 800, letterSpacing: '-0.02em', lineHeight: 1.15, marginBottom: 24, color: 'white' }}
        >
          {t(content.hero.title, lang)}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          style={{ fontSize: 18, color: 'rgba(255,255,255,0.65)', maxWidth: 600, lineHeight: 1.7, marginBottom: 40 }}
        >
          {t(content.hero.tagline, lang)}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.35 }}
          style={{ display: 'flex', gap: 12, flexWrap: 'wrap', justifyContent: 'center' }}
        >
          <button
            onClick={() => navigate('/dashboard')}
            style={{ background: '#00f0ff', color: '#03060d', border: 'none', borderRadius: 12, padding: '14px 28px', fontSize: 16, fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 8, boxShadow: '0 0 28px rgba(0,240,255,0.3)' }}
          >
            {lang === 'ar' ? 'جرّب التطبيق الآن' : 'Try the App Now'}
            <Icon className="w-5 h-5" />
          </button>
          <button
            onClick={onWaitlist}
            style={{ background: 'rgba(255,255,255,0.06)', color: 'white', border: '1px solid rgba(255,255,255,0.18)', borderRadius: 12, padding: '14px 28px', fontSize: 16, fontWeight: 600, cursor: 'pointer' }}
          >
            {t(content.hero.cta, lang)}
          </button>
        </motion.div>

        {/* Social proof */}
        <motion.div
          initial={{ opacity: 0 }} animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          style={{ marginTop: 48, display: 'flex', alignItems: 'center', gap: 12, flexWrap: 'wrap', justifyContent: 'center' }}
        >
          <div style={{ display: 'flex' }}>
            {['#00f0ff', '#b44dff', '#22c55e', '#f97316', '#fbbf24'].map((c, i) => (
              <div key={i} style={{ width: 30, height: 30, borderRadius: '50%', background: `linear-gradient(135deg, ${c}50, ${c}20)`, border: `2px solid ${c}60`, marginInlineStart: i > 0 ? -8 : 0, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, color: 'white', fontWeight: 700 }}>
                {['أ', 'م', 'س', 'ن', 'ف'][i]}
              </div>
            ))}
          </div>
          <span style={{ color: 'rgba(255,255,255,0.45)', fontSize: 13 }}>
            {lang === 'ar' ? '+٥٠٠ مستخدم انضموا إلى قائمة الانتظار' : '+500 users joined the waitlist'}
          </span>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.2 }}
        style={{ position: 'absolute', bottom: 32, left: '50%', transform: 'translateX(-50%)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6, color: 'rgba(255,255,255,0.3)', fontSize: 11 }}
      >
        <span>{lang === 'ar' ? 'مرّر للأسفل' : 'Scroll down'}</span>
        <div style={{ width: 20, height: 32, border: '1px solid rgba(255,255,255,0.2)', borderRadius: 10, display: 'flex', alignItems: 'flex-start', justifyContent: 'center', padding: '4px 0' }}>
          <div style={{ width: 3, height: 8, background: '#00f0ff', borderRadius: 2, animation: 'scrollDot 1.6s ease-in-out infinite' }} />
        </div>
        <style>{`@keyframes scrollDot { 0%,100%{transform:translateY(0);opacity:1} 50%{transform:translateY(10px);opacity:0.3} }`}</style>
      </motion.div>
    </section>
  );
}

/* ─── SECTION WRAPPER ────────────────────────────────────────────────────── */
function SW({ children }: { children: React.ReactNode }) {
  return <div style={{ position: 'relative', zIndex: 1 }}>{children}</div>;
}

/* ─── PROBLEM ────────────────────────────────────────────────────────────── */
function Problem() {
  const { lang } = useLanguage();
  return (
    <SW>
      <section style={{ padding: '80px 24px', maxWidth: 1200, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 56 }}>
          <span style={{ color: '#b44dff', fontSize: 12, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.15em', display: 'block', marginBottom: 12 }}>{t(content.problem.badge, lang)}</span>
          <h2 style={{ fontSize: 'clamp(1.8rem, 4vw, 3rem)', fontWeight: 700, color: 'white', marginBottom: 16, lineHeight: 1.2 }}>{t(content.problem.title, lang)}</h2>
          <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: 17, maxWidth: 600, margin: '0 auto', lineHeight: 1.7 }}>{t(content.problem.desc, lang)}</p>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 20 }}>
          {content.problem.cards.map((card, i) => {
            const IconComponent = ICONS[card.icon as keyof typeof ICONS];
            return (
              <div key={i} style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 24, padding: 32, position: 'relative', overflow: 'hidden' }}>
                <div style={{ background: 'rgba(180,77,255,0.1)', borderRadius: 16, width: 56, height: 56, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 20 }}>
                  <IconComponent className="w-7 h-7" style={{ color: '#b44dff' }} />
                </div>
                <h3 style={{ fontSize: 18, fontWeight: 700, color: 'white', marginBottom: 10 }}>{t(card.title, lang)}</h3>
                <p style={{ color: 'rgba(255,255,255,0.6)', lineHeight: 1.65, fontSize: 14 }}>{t(card.desc, lang)}</p>
              </div>
            );
          })}
        </div>
      </section>
    </SW>
  );
}

/* ─── SOLUTION ───────────────────────────────────────────────────────────── */
function Solution() {
  const { lang } = useLanguage();
  return (
    <SW>
      <section style={{ padding: '80px 24px', maxWidth: 1200, margin: '0 auto' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 60, alignItems: 'center' }}>
          <div>
            <span style={{ color: '#00f0ff', fontSize: 12, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.15em', display: 'block', marginBottom: 12 }}>{t(content.solution.badge, lang)}</span>
            <h2 style={{ fontSize: 'clamp(1.8rem, 3.5vw, 2.8rem)', fontWeight: 700, color: 'white', marginBottom: 16, lineHeight: 1.2 }}>{t(content.solution.title, lang)}</h2>
            <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: 16, lineHeight: 1.7, marginBottom: 32 }}>{t(content.solution.desc, lang)}</p>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
              {content.solution.features.map((feature, i) => (
                <div key={i} style={{ display: 'flex', gap: 12 }}>
                  <div style={{ width: 28, height: 28, borderRadius: '50%', background: 'rgba(0,240,255,0.1)', border: '1px solid rgba(0,240,255,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: 2 }}>
                    <ShieldCheck className="w-4 h-4" style={{ color: '#00f0ff' }} />
                  </div>
                  <div>
                    <h4 style={{ fontWeight: 700, color: 'white', marginBottom: 4, fontSize: 14 }}>{t(feature.title, lang)}</h4>
                    <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.55)', lineHeight: 1.5 }}>{t(feature.desc, lang)}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <div style={{ width: 320, height: 320, position: 'relative' }}>
              <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(circle, rgba(0,240,255,0.15) 0%, rgba(180,77,255,0.1) 60%, transparent 100%)', borderRadius: '50%', filter: 'blur(20px)' }} />
              <div style={{ position: 'absolute', inset: 16, background: 'rgba(255,255,255,0.03)', backdropFilter: 'blur(12px)', border: '1px solid rgba(0,240,255,0.15)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <BrainCircuit className="w-32 h-32" style={{ color: '#00f0ff', opacity: 0.8 }} strokeWidth={1} />
              </div>
              <div style={{ position: 'absolute', top: '10%', left: '15%', width: 48, height: 48, borderRadius: '50%', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(180,77,255,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Activity className="w-5 h-5" style={{ color: '#b44dff' }} />
              </div>
              <div style={{ position: 'absolute', bottom: '20%', right: '5%', width: 56, height: 56, borderRadius: '50%', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(0,240,255,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Target className="w-6 h-6" style={{ color: '#00f0ff' }} />
              </div>
            </div>
          </div>
        </div>
      </section>
    </SW>
  );
}

/* ─── HOW IT WORKS ───────────────────────────────────────────────────────── */
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
  return (
    <SW>
      <section style={{ padding: '80px 24px', maxWidth: 1200, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 56 }}>
          <span style={{ color: '#00f0ff', fontSize: 12, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.15em', display: 'block', marginBottom: 12 }}>
            {lang === 'ar' ? 'كيف يعمل توازن' : 'How It Works'}
          </span>
          <h2 style={{ fontSize: 'clamp(1.8rem, 4vw, 3rem)', fontWeight: 700, color: 'white', lineHeight: 1.2 }}>
            {lang === 'ar' ? 'أربع خطوات نحو الوعي المالي' : 'Four Steps to Financial Awareness'}
          </h2>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(230px, 1fr))', gap: 20, marginBottom: 48 }}>
          {steps.map((step, i) => (
            <div key={i} style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 24, padding: 28, position: 'relative', overflow: 'hidden' }}>
              <div style={{ position: 'absolute', top: -16, right: -8, fontSize: 96, fontWeight: 900, color: 'rgba(255,255,255,0.03)', lineHeight: 1, userSelect: 'none' }}>{step.num}</div>
              <div style={{ width: 36, height: 36, borderRadius: '50%', background: 'rgba(0,240,255,0.08)', border: '1px solid rgba(0,240,255,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14, fontWeight: 700, color: '#00f0ff', marginBottom: 16 }}>{step.num}</div>
              <h3 style={{ fontWeight: 700, fontSize: 16, color: 'white', marginBottom: 8 }}>{step.title}</h3>
              <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.55)', lineHeight: 1.6 }}>{step.desc}</p>
            </div>
          ))}
        </div>
        {/* CTA block */}
        <div style={{ background: 'rgba(0,240,255,0.05)', border: '1px solid rgba(0,240,255,0.15)', borderRadius: 20, padding: '32px', textAlign: 'center' }}>
          <p style={{ color: 'rgba(255,255,255,0.65)', fontSize: 16, marginBottom: 18 }}>
            {lang === 'ar' ? 'ابدأ رحلتك الآن — مجاناً تماماً' : 'Start your journey now — completely free'}
          </p>
          <button
            onClick={() => navigate('/dashboard')}
            style={{ background: '#00f0ff', color: '#03060d', border: 'none', borderRadius: 12, padding: '13px 32px', fontSize: 16, fontWeight: 700, cursor: 'pointer' }}
          >
            {lang === 'ar' ? 'ابدأ الآن' : 'Get Started'}
          </button>
        </div>
      </section>
    </SW>
  );
}

/* ─── VISION ─────────────────────────────────────────────────────────────── */
function Vision() {
  const { lang } = useLanguage();
  const stats = lang === 'ar'
    ? [{ val: '٧٠٪', label: 'الشباب المستهدفون' }, { val: '٢٠٣٠', label: 'رؤية المملكة' }, { val: '٣×', label: 'تحسين الادخار' }]
    : [{ val: '70%', label: 'Target Youth' }, { val: '2030', label: 'Saudi Vision' }, { val: '3×', label: 'Savings Boost' }];
  return (
    <SW>
      <section style={{ padding: '80px 24px', maxWidth: 800, margin: '0 auto' }}>
        <div style={{ background: 'linear-gradient(135deg, rgba(234,179,8,0.08) 0%, rgba(0,0,0,0) 100%)', border: '1px solid rgba(234,179,8,0.2)', borderRadius: 28, padding: '56px 40px', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
          <span style={{ color: '#eab308', fontSize: 12, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.15em', display: 'block', marginBottom: 16 }}>{t(content.vision.badge, lang)}</span>
          <h2 style={{ fontSize: 'clamp(1.6rem, 3.5vw, 2.5rem)', fontWeight: 800, marginBottom: 16, background: 'linear-gradient(90deg, #eab308, #fbbf24, #ca8a04)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
            {t(content.vision.title, lang)}
          </h2>
          <p style={{ color: 'rgba(255,255,255,0.65)', fontSize: 16, lineHeight: 1.7, maxWidth: 540, margin: '0 auto 40px' }}>{t(content.vision.desc, lang)}</p>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 16 }}>
            {stats.map((s, i) => (
              <div key={i} style={{ textAlign: 'center' }}>
                <div style={{ fontSize: 'clamp(1.4rem, 3vw, 2rem)', fontWeight: 900, color: '#fbbf24' }}>{s.val}</div>
                <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.5)', marginTop: 4 }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </SW>
  );
}

/* ─── TEAM ───────────────────────────────────────────────────────────────── */
function Team() {
  const { lang } = useLanguage();
  return (
    <SW>
      <section style={{ padding: '80px 24px', maxWidth: 1000, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 48 }}>
          <span style={{ color: '#00f0ff', fontSize: 12, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.15em', display: 'block', marginBottom: 12 }}>{t(content.team.badge, lang)}</span>
          <h2 style={{ fontSize: 'clamp(1.8rem, 4vw, 2.5rem)', fontWeight: 700, color: 'white' }}>{t(content.team.title, lang)}</h2>
        </div>
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 16 }}>
          {content.team.members.map((member, i) => (
            <div key={i} style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 20, padding: '24px 20px', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', width: 160, backdropFilter: 'blur(12px)' }}>
              <div style={{ width: 56, height: 56, borderRadius: '50%', background: 'linear-gradient(135deg, rgba(0,240,255,0.25), rgba(180,77,255,0.25))', border: '1px solid rgba(255,255,255,0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20, fontWeight: 700, color: 'white', marginBottom: 12 }}>
                {t(member.name, lang).charAt(0)}
              </div>
              <h4 style={{ fontWeight: 700, fontSize: 13, color: 'white', marginBottom: 4 }}>{t(member.name, lang)}</h4>
              <p style={{ fontSize: 11, color: 'rgba(255,255,255,0.5)' }}>{t(member.role, lang)}</p>
            </div>
          ))}
        </div>
      </section>
    </SW>
  );
}

/* ─── FOOTER ─────────────────────────────────────────────────────────────── */
function Footer({ onWaitlist }: { onWaitlist: () => void }) {
  const { lang } = useLanguage();
  const [, navigate] = useLocation();
  return (
    <footer style={{ borderTop: '1px solid rgba(255,255,255,0.06)', padding: '48px 24px 32px', position: 'relative', zIndex: 1 }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 40, justifyContent: 'space-between', marginBottom: 40 }}>
          {/* Brand */}
          <div style={{ maxWidth: 280 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, color: '#00f0ff', fontWeight: 700, fontSize: 20, marginBottom: 12 }}>
              <SparklesIcon className="w-5 h-5" />
              <span>{t(content.nav.brand, lang)}</span>
            </div>
            <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.4)', lineHeight: 1.7 }}>
              {lang === 'ar'
                ? 'منصة ذكاء مالي عاطفي مدعومة بالذكاء الاصطناعي. مشروع جامعي سعودي حائز على جوائز.'
                : 'AI-powered emotional financial intelligence platform. Award-winning Saudi university project.'}
            </p>
          </div>
          {/* Nav */}
          <div style={{ display: 'flex', gap: 48, flexWrap: 'wrap' }}>
            <div>
              <h4 style={{ fontWeight: 700, color: 'white', fontSize: 13, marginBottom: 14 }}>{lang === 'ar' ? 'التطبيق' : 'App'}</h4>
              {(lang === 'ar'
                ? [['لوحة التحكم', '/dashboard'], ['التحليلات', '/insights'], ['التحديات', '/challenges']]
                : [['Dashboard', '/dashboard'], ['Insights', '/insights'], ['Challenges', '/challenges']]
              ).map(([label, path], i) => (
                <button key={i} onClick={() => navigate(path as string)}
                  style={{ display: 'block', background: 'none', border: 'none', color: 'rgba(255,255,255,0.45)', fontSize: 13, cursor: 'pointer', padding: '4px 0', marginBottom: 6, fontFamily: 'inherit' }}>
                  {label}
                </button>
              ))}
            </div>
            <div>
              <h4 style={{ fontWeight: 700, color: 'white', fontSize: 13, marginBottom: 14 }}>{lang === 'ar' ? 'انضم' : 'Join'}</h4>
              <button onClick={onWaitlist}
                style={{ display: 'block', background: 'none', border: 'none', color: 'rgba(255,255,255,0.45)', fontSize: 13, cursor: 'pointer', padding: '4px 0', marginBottom: 6, fontFamily: 'inherit' }}>
                {lang === 'ar' ? 'قائمة الانتظار' : 'Waitlist'}
              </button>
              <button onClick={() => navigate('/dashboard')}
                style={{ display: 'block', background: 'none', border: 'none', color: '#00f0ff', fontSize: 13, cursor: 'pointer', padding: '4px 0', fontFamily: 'inherit', fontWeight: 600 }}>
                {lang === 'ar' ? 'جرّب مجاناً' : 'Try Free'}
              </button>
            </div>
          </div>
        </div>
        <div style={{ borderTop: '1px solid rgba(255,255,255,0.06)', paddingTop: 24, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12 }}>
          <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.3)' }}>{t(content.footer.rights, lang)}</p>
          <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.2)' }}>
            {lang === 'ar' ? 'مشروع أكاديمي — ليس منتجاً تجارياً بعد' : 'Academic project — not a commercial product yet'}
          </p>
        </div>
      </div>
    </footer>
  );
}

/* ─── HOME PAGE ──────────────────────────────────────────────────────────── */
export default function Home() {
  const [showWaitlist, setShowWaitlist] = useState(false);
  const { lang } = useLanguage();

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      {showWaitlist && <WaitlistModal lang={lang} onClose={() => setShowWaitlist(false)} />}
      <Hero onWaitlist={() => setShowWaitlist(true)} />
      <Problem />
      <Solution />
      <HowItWorks />
      <Vision />
      <Team />
      <Footer onWaitlist={() => setShowWaitlist(true)} />
    </div>
  );
}
