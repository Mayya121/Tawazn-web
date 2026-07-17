import React from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '@/contexts/language-context';
import { content, t } from '@/lib/content';
import { Button } from '@/components/ui/button';
import {
  Zap, CloudRain, Coffee, Activity, BrainCircuit,
  Trophy, Target, ShieldCheck, Gamepad2, ArrowLeft, ArrowRight
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

function Hero() {
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
            style={{ background: '#00f0ff', color: '#03060d', border: 'none', borderRadius: 12, padding: '14px 28px', fontSize: 16, fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 8 }}
          >
            {lang === 'ar' ? 'جرّب التطبيق الآن' : 'Try the App Now'}
            <Icon className="w-5 h-5" />
          </button>
          <button
            style={{ background: 'rgba(255,255,255,0.06)', color: 'white', border: '1px solid rgba(255,255,255,0.15)', borderRadius: 12, padding: '14px 28px', fontSize: 16, fontWeight: 600, cursor: 'pointer' }}
          >
            {t(content.hero.cta, lang)}
          </button>
        </motion.div>
      </div>
    </section>
  );
}

function SectionWrapper({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ position: 'relative', zIndex: 1 }}>
      {children}
    </div>
  );
}

function Problem() {
  const { lang } = useLanguage();
  return (
    <SectionWrapper>
      <section style={{ padding: '80px 24px', maxWidth: 1200, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 56 }}>
          <span style={{ color: '#b44dff', fontSize: 12, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.15em', display: 'block', marginBottom: 12 }}>
            {t(content.problem.badge, lang)}
          </span>
          <h2 style={{ fontSize: 'clamp(1.8rem, 4vw, 3rem)', fontWeight: 700, color: 'white', marginBottom: 16, lineHeight: 1.2 }}>
            {t(content.problem.title, lang)}
          </h2>
          <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: 17, maxWidth: 600, margin: '0 auto', lineHeight: 1.7 }}>
            {t(content.problem.desc, lang)}
          </p>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 20 }}>
          {content.problem.cards.map((card, i) => {
            const IconComponent = ICONS[card.icon as keyof typeof ICONS];
            return (
              <div key={i} style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 24, padding: 32, backdropFilter: 'blur(12px)', position: 'relative', overflow: 'hidden' }}>
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
    </SectionWrapper>
  );
}

function Solution() {
  const { lang } = useLanguage();
  return (
    <SectionWrapper>
      <section style={{ padding: '80px 24px', maxWidth: 1200, margin: '0 auto' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 60, alignItems: 'center' }}>
          <div>
            <span style={{ color: '#00f0ff', fontSize: 12, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.15em', display: 'block', marginBottom: 12 }}>
              {t(content.solution.badge, lang)}
            </span>
            <h2 style={{ fontSize: 'clamp(1.8rem, 3.5vw, 2.8rem)', fontWeight: 700, color: 'white', marginBottom: 16, lineHeight: 1.2 }}>
              {t(content.solution.title, lang)}
            </h2>
            <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: 16, lineHeight: 1.7, marginBottom: 32 }}>
              {t(content.solution.desc, lang)}
            </p>
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
              <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(circle, rgba(0,240,255,0.15) 0%, rgba(180,77,255,0.1) 60%, transparent 100%)', borderRadius: '50%', filter: 'blur(20px)', animation: 'pulse 4s ease-in-out infinite' }} />
              <div style={{ position: 'absolute', inset: 16, background: 'rgba(255,255,255,0.03)', backdropFilter: 'blur(12px)', border: '1px solid rgba(0,240,255,0.15)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <BrainCircuit className="w-32 h-32" style={{ color: '#00f0ff', opacity: 0.8 }} strokeWidth={1} />
              </div>
              <div className="animate-bounce" style={{ position: 'absolute', top: '10%', left: '15%', width: 48, height: 48, borderRadius: '50%', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(180,77,255,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', animationDuration: '3s' }}>
                <Activity className="w-5 h-5" style={{ color: '#b44dff' }} />
              </div>
              <div className="animate-bounce" style={{ position: 'absolute', bottom: '20%', right: '5%', width: 56, height: 56, borderRadius: '50%', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(0,240,255,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', animationDuration: '4s', animationDelay: '1s' }}>
                <Target className="w-6 h-6" style={{ color: '#00f0ff' }} />
              </div>
            </div>
          </div>
        </div>
      </section>
    </SectionWrapper>
  );
}

function HowItWorks() {
  const { lang } = useLanguage();
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
    <SectionWrapper>
      <section style={{ padding: '80px 24px', maxWidth: 1200, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 56 }}>
          <span style={{ color: '#00f0ff', fontSize: 12, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.15em', display: 'block', marginBottom: 12 }}>
            {lang === 'ar' ? 'كيف يعمل توازن' : 'How It Works'}
          </span>
          <h2 style={{ fontSize: 'clamp(1.8rem, 4vw, 3rem)', fontWeight: 700, color: 'white', lineHeight: 1.2 }}>
            {lang === 'ar' ? 'أربع خطوات نحو الوعي المالي' : 'Four Steps to Financial Awareness'}
          </h2>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(230px, 1fr))', gap: 20 }}>
          {steps.map((step, i) => (
            <div key={i} style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 24, padding: 28, position: 'relative', overflow: 'hidden' }}>
              <div style={{ position: 'absolute', top: -16, right: -8, fontSize: 96, fontWeight: 900, color: 'rgba(255,255,255,0.03)', lineHeight: 1, userSelect: 'none' }}>
                {step.num}
              </div>
              <div style={{ width: 36, height: 36, borderRadius: '50%', background: 'rgba(0,240,255,0.08)', border: '1px solid rgba(0,240,255,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14, fontWeight: 700, color: '#00f0ff', marginBottom: 16 }}>
                {step.num}
              </div>
              <h3 style={{ fontWeight: 700, fontSize: 16, color: 'white', marginBottom: 8 }}>{step.title}</h3>
              <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.55)', lineHeight: 1.6 }}>{step.desc}</p>
            </div>
          ))}
        </div>
      </section>
    </SectionWrapper>
  );
}

function Vision() {
  const { lang } = useLanguage();
  const stats = lang === 'ar'
    ? [{ val: '٧٠٪', label: 'الشباب المستهدفون' }, { val: '٢٠٣٠', label: 'رؤية المملكة' }, { val: '٣×', label: 'تحسين الادخار' }]
    : [{ val: '70%', label: 'Target Youth' }, { val: '2030', label: 'Saudi Vision' }, { val: '3×', label: 'Savings Boost' }];
  return (
    <SectionWrapper>
      <section style={{ padding: '80px 24px', maxWidth: 800, margin: '0 auto' }}>
        <div style={{ background: 'linear-gradient(135deg, rgba(234,179,8,0.08) 0%, rgba(0,0,0,0) 100%)', border: '1px solid rgba(234,179,8,0.2)', borderRadius: 28, padding: '56px 40px', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
          <span style={{ color: '#eab308', fontSize: 12, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.15em', display: 'block', marginBottom: 16 }}>
            {t(content.vision.badge, lang)}
          </span>
          <h2 style={{ fontSize: 'clamp(1.6rem, 3.5vw, 2.5rem)', fontWeight: 800, marginBottom: 16, background: 'linear-gradient(90deg, #eab308, #fbbf24, #ca8a04)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
            {t(content.vision.title, lang)}
          </h2>
          <p style={{ color: 'rgba(255,255,255,0.65)', fontSize: 16, lineHeight: 1.7, maxWidth: 540, margin: '0 auto 40px' }}>
            {t(content.vision.desc, lang)}
          </p>
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
    </SectionWrapper>
  );
}

function Team() {
  const { lang } = useLanguage();
  return (
    <SectionWrapper>
      <section style={{ padding: '80px 24px', maxWidth: 1000, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 48 }}>
          <span style={{ color: '#00f0ff', fontSize: 12, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.15em', display: 'block', marginBottom: 12 }}>
            {t(content.team.badge, lang)}
          </span>
          <h2 style={{ fontSize: 'clamp(1.8rem, 4vw, 2.5rem)', fontWeight: 700, color: 'white' }}>
            {t(content.team.title, lang)}
          </h2>
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
    </SectionWrapper>
  );
}

function Footer() {
  const { lang } = useLanguage();
  return (
    <footer style={{ borderTop: '1px solid rgba(255,255,255,0.06)', padding: '32px 24px', textAlign: 'center', position: 'relative', zIndex: 1 }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, color: '#00f0ff', fontWeight: 700, fontSize: 18, marginBottom: 8 }}>
        <SparklesIcon className="w-5 h-5" />
        <span>{t(content.nav.brand, lang)}</span>
      </div>
      <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.4)' }}>{t(content.footer.rights, lang)}</p>
    </footer>
  );
}

export default function Home() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Hero />
      <Problem />
      <Solution />
      <HowItWorks />
      <Vision />
      <Team />
      <Footer />
    </div>
  );
}
