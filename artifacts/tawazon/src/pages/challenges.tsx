import React, { useState } from 'react';
import { useLanguage } from '@/contexts/language-context';
import { Trophy, Target, Zap, Shield, Star, CheckCircle, Clock, Lock } from 'lucide-react';

const CHALLENGES_AR = [
  {
    id: 1, active: true, completed: false,
    title: 'أسبوع بدون تسوق اندفاعي',
    desc: 'تجنب أي عملية شراء غير مخططة لمدة ٧ أيام متتالية',
    xp: 200, days: 7, daysLeft: 3, progress: 57,
    icon: Shield, color: '#00f0ff', category: 'التحكم في الاندفاع',
  },
  {
    id: 2, active: true, completed: false,
    title: 'سجّل مزاجك قبل كل عملية شراء',
    desc: 'احرص على تسجيل حالتك المزاجية قبل أي إنفاق لمدة ٥ أيام',
    xp: 150, days: 5, daysLeft: 2, progress: 60,
    icon: Star, color: '#b44dff', category: 'الوعي العاطفي',
  },
  {
    id: 3, active: true, completed: false,
    title: 'تحدي الـ ٢٤ ساعة',
    desc: 'انتظر ٢٤ ساعة قبل شراء أي شيء قيمته أكثر من ١٠٠ ريال',
    xp: 100, days: 3, daysLeft: 1, progress: 67,
    icon: Clock, color: '#fbbf24', category: 'القرارات الواعية',
  },
  {
    id: 4, active: false, completed: true,
    title: 'ادخر ٢٠٠ ريال هذا الأسبوع',
    desc: 'خصص ٢٠٠ ريال من إنفاقك المعتاد للادخار',
    xp: 250, days: 7, daysLeft: 0, progress: 100,
    icon: Target, color: '#22c55e', category: 'الادخار',
  },
  {
    id: 5, active: false, completed: true,
    title: 'تتبع جميع نفقاتك ليوم كامل',
    desc: 'سجّل كل ريال تنفقه خلال ٢٤ ساعة',
    xp: 80, days: 1, daysLeft: 0, progress: 100,
    icon: CheckCircle, color: '#22c55e', category: 'التتبع',
  },
  {
    id: 6, active: false, completed: false,
    title: 'تحدي الشهر الهادئ',
    desc: 'قلل الإنفاق العاطفي بنسبة ٥٠٪ خلال شهر كامل',
    xp: 500, days: 30, daysLeft: 30, progress: 0,
    icon: Zap, color: '#f97316', category: 'تقدم متقدم', locked: true,
  },
];

const CHALLENGES_EN = [
  {
    id: 1, active: true, completed: false,
    title: 'No Impulse Shopping Week',
    desc: 'Avoid any unplanned purchase for 7 consecutive days',
    xp: 200, days: 7, daysLeft: 3, progress: 57,
    icon: Shield, color: '#00f0ff', category: 'Impulse Control',
  },
  {
    id: 2, active: true, completed: false,
    title: 'Log Mood Before Every Purchase',
    desc: 'Record your emotional state before any spending for 5 days',
    xp: 150, days: 5, daysLeft: 2, progress: 60,
    icon: Star, color: '#b44dff', category: 'Emotional Awareness',
  },
  {
    id: 3, active: true, completed: false,
    title: 'The 24-Hour Rule',
    desc: 'Wait 24 hours before buying anything over 100 SAR',
    xp: 100, days: 3, daysLeft: 1, progress: 67,
    icon: Clock, color: '#fbbf24', category: 'Mindful Decisions',
  },
  {
    id: 4, active: false, completed: true,
    title: 'Save 200 SAR This Week',
    desc: 'Set aside 200 SAR from your usual spending',
    xp: 250, days: 7, daysLeft: 0, progress: 100,
    icon: Target, color: '#22c55e', category: 'Saving',
  },
  {
    id: 5, active: false, completed: true,
    title: 'Track Every Purchase for a Day',
    desc: 'Log every riyal you spend over 24 hours',
    xp: 80, days: 1, daysLeft: 0, progress: 100,
    icon: CheckCircle, color: '#22c55e', category: 'Tracking',
  },
  {
    id: 6, active: false, completed: false,
    title: 'Quiet Month Challenge',
    desc: 'Reduce emotional spending by 50% over a full month',
    xp: 500, days: 30, daysLeft: 30, progress: 0,
    icon: Zap, color: '#f97316', category: 'Advanced', locked: true,
  },
];

const BADGES_AR = [
  { title: 'قاهر الاندفاع', desc: 'أتممت تحدي بدون تسوق اندفاعي', icon: Shield, color: '#00f0ff', earned: true },
  { title: 'المتسوق الواعي', desc: 'سجّلت مزاجك ٣٠ يوماً متتالياً', icon: Star, color: '#b44dff', earned: true },
  { title: 'المدخّر الذكي', desc: 'وفّرت ٢٠٠ ريال في أسبوع واحد', icon: Target, color: '#22c55e', earned: true },
  { title: 'المراقب الدقيق', desc: 'تتبعت كل نفقاتك ليوم كامل', icon: CheckCircle, color: '#fbbf24', earned: true },
  { title: 'سيد التوازن', desc: 'أكمل ١٠ تحديات متتالية', icon: Trophy, color: '#f97316', earned: false },
  { title: 'أسطورة الادخار', desc: 'وفّر ١٠٠٠ ريال في شهر واحد', icon: Zap, color: '#e11d48', earned: false },
];
const BADGES_EN = [
  { title: 'Impulse Conqueror', desc: 'Completed the no impulse shopping challenge', icon: Shield, color: '#00f0ff', earned: true },
  { title: 'Mindful Spender', desc: 'Logged your mood 30 days in a row', icon: Star, color: '#b44dff', earned: true },
  { title: 'Smart Saver', desc: 'Saved 200 SAR in one week', icon: Target, color: '#22c55e', earned: true },
  { title: 'Sharp Tracker', desc: 'Tracked every expense for a full day', icon: CheckCircle, color: '#fbbf24', earned: true },
  { title: 'Balance Master', desc: 'Complete 10 challenges in a row', icon: Trophy, color: '#f97316', earned: false },
  { title: 'Savings Legend', desc: 'Save 1000 SAR in one month', icon: Zap, color: '#e11d48', earned: false },
];

export default function Challenges() {
  const { lang } = useLanguage();
  const [tab, setTab] = useState<'active' | 'completed' | 'badges'>('active');
  const challenges = lang === 'ar' ? CHALLENGES_AR : CHALLENGES_EN;
  const badges = lang === 'ar' ? BADGES_AR : BADGES_EN;

  const active = challenges.filter(c => c.active && !c.completed);
  const completed = challenges.filter(c => c.completed);
  const locked = challenges.filter(c => (c as any).locked);

  const totalXp = completed.reduce((sum, c) => sum + c.xp, 0);

  return (
    <div style={{ minHeight: '100vh', padding: '100px 24px 60px', maxWidth: 1100, margin: '0 auto', position: 'relative', zIndex: 1 }}>
      {/* Header */}
      <div style={{ marginBottom: 32 }}>
        <h1 style={{ fontSize: 'clamp(1.6rem, 3vw, 2.4rem)', fontWeight: 800, color: 'white', marginBottom: 8 }}>
          {lang === 'ar' ? 'التحديات والإنجازات' : 'Challenges & Achievements'}
        </h1>
        <p style={{ color: 'rgba(255,255,255,0.55)', fontSize: 15 }}>
          {lang === 'ar' ? 'أنجز تحديات وتوسّع رحلتك نحو الوعي المالي' : 'Complete challenges and expand your financial wellness journey'}
        </p>
      </div>

      {/* XP / Stats */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: 14, marginBottom: 32 }}>
        {[
          { label: lang === 'ar' ? 'النقاط الكلية' : 'Total XP', value: lang === 'ar' ? '١,٢٠٠' : '1,200', color: '#00f0ff', icon: Zap },
          { label: lang === 'ar' ? 'التحديات النشطة' : 'Active Challenges', value: `${active.length}`, color: '#b44dff', icon: Target },
          { label: lang === 'ar' ? 'المكتملة' : 'Completed', value: `${completed.length}`, color: '#22c55e', icon: CheckCircle },
          { label: lang === 'ar' ? 'الشارات المكتسبة' : 'Badges Earned', value: `${badges.filter(b => b.earned).length}`, color: '#fbbf24', icon: Trophy },
        ].map((s, i) => (
          <div key={i} style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 16, padding: '18px 20px', display: 'flex', alignItems: 'center', gap: 14 }}>
            <div style={{ width: 40, height: 40, borderRadius: 12, background: `${s.color}15`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <s.icon className="w-5 h-5" style={{ color: s.color }} />
            </div>
            <div>
              <div style={{ fontSize: 22, fontWeight: 800, color: 'white' }}>{s.value}</div>
              <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.5)', marginTop: 2 }}>{s.label}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Tabs */}
      <div style={{ display: 'flex', gap: 8, marginBottom: 28, background: 'rgba(255,255,255,0.04)', padding: 6, borderRadius: 14, width: 'fit-content' }}>
        {([
          { key: 'active', label: lang === 'ar' ? 'التحديات النشطة' : 'Active' },
          { key: 'completed', label: lang === 'ar' ? 'المكتملة' : 'Completed' },
          { key: 'badges', label: lang === 'ar' ? 'الشارات' : 'Badges' },
        ] as const).map(t => (
          <button key={t.key} onClick={() => setTab(t.key)}
            style={{ padding: '8px 20px', borderRadius: 10, fontSize: 13, fontWeight: 600, cursor: 'pointer', border: 'none', background: tab === t.key ? '#00f0ff' : 'transparent', color: tab === t.key ? '#03060d' : 'rgba(255,255,255,0.6)', transition: 'all 0.2s' }}>
            {t.label}
          </button>
        ))}
      </div>

      {/* Active Challenges */}
      {tab === 'active' && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 20 }}>
          {active.map(c => (
            <div key={c.id} style={{ background: 'rgba(255,255,255,0.04)', border: `1px solid ${c.color}30`, borderRadius: 24, padding: 28, position: 'relative', overflow: 'hidden' }}>
              <div style={{ position: 'absolute', top: -20, right: -20, width: 100, height: 100, background: `${c.color}08`, borderRadius: '50%', filter: 'blur(30px)' }} />
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 16 }}>
                <div style={{ width: 48, height: 48, borderRadius: 14, background: `${c.color}18`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <c.icon className="w-6 h-6" style={{ color: c.color }} />
                </div>
                <div style={{ textAlign: 'end' }}>
                  <div style={{ fontSize: 12, color: c.color, fontWeight: 700 }}>+{c.xp} XP</div>
                  <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.4)', marginTop: 2 }}>
                    {lang === 'ar' ? `${c.daysLeft} أيام متبقية` : `${c.daysLeft} days left`}
                  </div>
                </div>
              </div>
              <span style={{ fontSize: 11, color: c.color, background: `${c.color}15`, padding: '3px 10px', borderRadius: 6, fontWeight: 600, display: 'inline-block', marginBottom: 10 }}>{c.category}</span>
              <h3 style={{ fontWeight: 700, fontSize: 16, color: 'white', marginBottom: 8 }}>{c.title}</h3>
              <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.55)', lineHeight: 1.6, marginBottom: 20 }}>{c.desc}</p>
              <div style={{ marginBottom: 8 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
                  <span style={{ fontSize: 12, color: 'rgba(255,255,255,0.5)' }}>{lang === 'ar' ? 'التقدم' : 'Progress'}</span>
                  <span style={{ fontSize: 12, fontWeight: 700, color: c.color }}>{c.progress}%</span>
                </div>
                <div style={{ height: 6, background: 'rgba(255,255,255,0.08)', borderRadius: 3, overflow: 'hidden' }}>
                  <div style={{ height: '100%', width: `${c.progress}%`, background: c.color, borderRadius: 3, boxShadow: `0 0 8px ${c.color}60` }} />
                </div>
              </div>
              <button style={{ width: '100%', marginTop: 16, padding: '11px 20px', borderRadius: 12, background: `${c.color}15`, border: `1px solid ${c.color}40`, color: c.color, fontWeight: 700, fontSize: 14, cursor: 'pointer' }}>
                {lang === 'ar' ? 'تحديث التقدم' : 'Update Progress'}
              </button>
            </div>
          ))}
          {/* Locked challenge */}
          {locked.map(c => (
            <div key={c.id} style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 24, padding: 28, opacity: 0.6, position: 'relative' }}>
              <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: 24 }}>
                <div style={{ textAlign: 'center' }}>
                  <Lock className="w-8 h-8" style={{ color: 'rgba(255,255,255,0.3)', margin: '0 auto 8px' }} />
                  <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.4)' }}>
                    {lang === 'ar' ? 'أكمل ٣ تحديات للإفتح' : 'Complete 3 challenges to unlock'}
                  </div>
                </div>
              </div>
              <div style={{ display: 'flex', gap: 14, alignItems: 'flex-start', marginBottom: 12 }}>
                <div style={{ width: 48, height: 48, borderRadius: 14, background: `${c.color}10`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <c.icon className="w-6 h-6" style={{ color: c.color }} />
                </div>
                <div>
                  <h3 style={{ fontWeight: 700, fontSize: 16, color: 'white', marginBottom: 4 }}>{c.title}</h3>
                  <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.45)', lineHeight: 1.5 }}>{c.desc}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Completed Challenges */}
      {tab === 'completed' && (
        <div>
          <div style={{ background: 'rgba(34,197,94,0.08)', border: '1px solid rgba(34,197,94,0.2)', borderRadius: 16, padding: '16px 20px', marginBottom: 24, display: 'flex', gap: 12, alignItems: 'center' }}>
            <Trophy className="w-5 h-5" style={{ color: '#22c55e' }} />
            <span style={{ color: '#22c55e', fontWeight: 600, fontSize: 14 }}>
              {lang === 'ar' ? `رائع! أكملت ${completed.length} تحديات وكسبت ${totalXp} نقطة خبرة` : `Amazing! You've completed ${completed.length} challenges and earned ${totalXp} XP`}
            </span>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 16 }}>
            {completed.map(c => (
              <div key={c.id} style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(34,197,94,0.2)', borderRadius: 20, padding: 24, display: 'flex', gap: 16, alignItems: 'center' }}>
                <div style={{ width: 52, height: 52, borderRadius: 14, background: 'rgba(34,197,94,0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <c.icon className="w-7 h-7" style={{ color: '#22c55e' }} />
                </div>
                <div style={{ flex: 1 }}>
                  <h3 style={{ fontWeight: 700, fontSize: 15, color: 'white', marginBottom: 4 }}>{c.title}</h3>
                  <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.5)', lineHeight: 1.4, marginBottom: 8 }}>{c.desc}</p>
                  <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
                    <span style={{ fontSize: 12, color: '#22c55e', fontWeight: 700 }}>+{c.xp} XP {lang === 'ar' ? 'مكتسبة' : 'earned'}</span>
                    <span style={{ fontSize: 11, background: 'rgba(34,197,94,0.15)', color: '#22c55e', padding: '2px 8px', borderRadius: 6 }}>
                      {lang === 'ar' ? 'مكتمل' : 'Completed'}
                    </span>
                  </div>
                </div>
                <CheckCircle className="w-6 h-6" style={{ color: '#22c55e', flexShrink: 0 }} />
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Badges */}
      {tab === 'badges' && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: 16 }}>
          {badges.map((badge, i) => (
            <div key={i} style={{ background: badge.earned ? 'rgba(255,255,255,0.05)' : 'rgba(255,255,255,0.02)', border: badge.earned ? `1px solid ${badge.color}30` : '1px solid rgba(255,255,255,0.06)', borderRadius: 20, padding: 24, textAlign: 'center', opacity: badge.earned ? 1 : 0.5, position: 'relative' }}>
              {!badge.earned && (
                <div style={{ position: 'absolute', top: 12, right: 12 }}>
                  <Lock className="w-4 h-4" style={{ color: 'rgba(255,255,255,0.3)' }} />
                </div>
              )}
              <div style={{ width: 64, height: 64, borderRadius: '50%', background: badge.earned ? `${badge.color}20` : 'rgba(255,255,255,0.05)', border: `2px solid ${badge.earned ? badge.color : 'rgba(255,255,255,0.1)'}`, display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px' }}>
                <badge.icon className="w-8 h-8" style={{ color: badge.earned ? badge.color : 'rgba(255,255,255,0.2)' }} />
              </div>
              <h4 style={{ fontWeight: 700, fontSize: 14, color: badge.earned ? 'white' : 'rgba(255,255,255,0.4)', marginBottom: 6 }}>{badge.title}</h4>
              <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.4)', lineHeight: 1.5 }}>{badge.desc}</p>
              {badge.earned && (
                <div style={{ marginTop: 12, fontSize: 11, color: badge.color, fontWeight: 600 }}>
                  {lang === 'ar' ? 'مكتسبة' : 'Earned'}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
