import React, { useState } from 'react';
import { useLanguage } from '@/contexts/language-context';
import { useUserData } from '@/contexts/user-data-context';
import { useToast } from '@/contexts/toast-context';
import { Trophy, Target, Zap, Shield, Star, CheckCircle, Clock, Lock, Plus, Minus } from 'lucide-react';

/* ─── CHALLENGE DEFINITIONS ─────────────────────────────────────────────── */
const CHALLENGES = {
  ar: [
    { id: 1, title: 'أسبوع بدون تسوق اندفاعي',    desc: 'تجنب أي عملية شراء غير مخططة لمدة ٧ أيام متتالية',                       xp: 200, days: 7,  icon: Shield,      color: '#00f0ff', category: 'التحكم في الاندفاع', locked: false },
    { id: 2, title: 'سجّل مزاجك قبل كل شراء',      desc: 'احرص على تسجيل حالتك المزاجية قبل أي إنفاق لمدة ٥ مصروفات متتالية',    xp: 150, days: 5,  icon: Star,        color: '#b44dff', category: 'الوعي العاطفي',      locked: false },
    { id: 3, title: 'تحدي الـ ٢٤ ساعة',            desc: 'انتظر ٢٤ ساعة قبل شراء أي شيء قيمته أكثر من ١٠٠ ريال',               xp: 100, days: 3,  icon: Clock,       color: '#fbbf24', category: 'القرارات الواعية',    locked: false },
    { id: 4, title: 'وفّر ٢٠٠ ريال هذا الأسبوع',  desc: 'خصص ٢٠٠ ريال من إنفاقك المعتاد للادخار',                               xp: 250, days: 7,  icon: Target,      color: '#22c55e', category: 'الادخار',             locked: false },
    { id: 5, title: 'تتبع كل نفقاتك ليوم كامل',   desc: 'سجّل كل ريال تنفقه خلال ٢٤ ساعة باستخدام توازن',                       xp: 80,  days: 1,  icon: CheckCircle, color: '#22c55e', category: 'التتبع',              locked: false },
    { id: 6, title: 'تحدي الشهر الهادئ',           desc: 'قلل الإنفاق العاطفي بنسبة ٥٠٪ خلال شهر كامل',                          xp: 500, days: 30, icon: Zap,         color: '#f97316', category: 'تقدم متقدم',          locked: true  },
  ],
  en: [
    { id: 1, title: 'No Impulse Shopping Week',    desc: 'Avoid any unplanned purchase for 7 consecutive days',                   xp: 200, days: 7,  icon: Shield,      color: '#00f0ff', category: 'Impulse Control',     locked: false },
    { id: 2, title: 'Log Mood Before Every Buy',   desc: 'Record your mood before any spending for 5 consecutive entries',         xp: 150, days: 5,  icon: Star,        color: '#b44dff', category: 'Emotional Awareness', locked: false },
    { id: 3, title: 'The 24-Hour Rule',            desc: 'Wait 24 hours before buying anything over 100 SAR',                     xp: 100, days: 3,  icon: Clock,       color: '#fbbf24', category: 'Mindful Decisions',   locked: false },
    { id: 4, title: 'Save 200 SAR This Week',      desc: 'Set aside 200 SAR from your usual spending',                            xp: 250, days: 7,  icon: Target,      color: '#22c55e', category: 'Saving',              locked: false },
    { id: 5, title: 'Track Every Expense Today',   desc: 'Log every riyal you spend over 24 hours using Tawazon',                  xp: 80,  days: 1,  icon: CheckCircle, color: '#22c55e', category: 'Tracking',            locked: false },
    { id: 6, title: 'Quiet Month Challenge',       desc: 'Reduce emotional spending by 50% over a full month',                    xp: 500, days: 30, icon: Zap,         color: '#f97316', category: 'Advanced',            locked: true  },
  ],
};

const BADGES = {
  ar: [
    { title: 'قاهر الاندفاع',    desc: 'أكملت تحدي بدون تسوق اندفاعي',        icon: Shield,      color: '#00f0ff', needsId: 1    },
    { title: 'المتسوق الواعي',   desc: 'سجّلت مزاجك قبل ٥ مصروفات متتالية',   icon: Star,        color: '#b44dff', needsId: 2    },
    { title: 'المدخّر الذكي',    desc: 'وفّرت ٢٠٠ ريال في أسبوع واحد',        icon: Target,      color: '#22c55e', needsId: 4    },
    { title: 'المراقب الدقيق',   desc: 'تتبعت كل نفقاتك ليوم كامل',            icon: CheckCircle, color: '#fbbf24', needsId: 5    },
    { title: 'سيد التوازن',      desc: 'أكمل ٣ تحديات للحصول عليها',           icon: Trophy,      color: '#f97316', needsId: null },
    { title: 'أسطورة الادخار',   desc: 'أكمل تحدي الشهر الهادئ للحصول عليها', icon: Zap,         color: '#e11d48', needsId: 6    },
  ],
  en: [
    { title: 'Impulse Conqueror', desc: 'Completed the no impulse shopping challenge',  icon: Shield,      color: '#00f0ff', needsId: 1    },
    { title: 'Mindful Spender',   desc: 'Logged mood before 5 consecutive purchases',   icon: Star,        color: '#b44dff', needsId: 2    },
    { title: 'Smart Saver',       desc: 'Saved 200 SAR in one week',                    icon: Target,      color: '#22c55e', needsId: 4    },
    { title: 'Sharp Tracker',     desc: 'Tracked every expense for a full day',         icon: CheckCircle, color: '#fbbf24', needsId: 5    },
    { title: 'Balance Master',    desc: 'Complete 3 challenges to earn this',           icon: Trophy,      color: '#f97316', needsId: null },
    { title: 'Savings Legend',    desc: 'Complete the Quiet Month challenge to earn',   icon: Zap,         color: '#e11d48', needsId: 6    },
  ],
};

/* ─── PROGRESS MODAL ────────────────────────────────────────────────────── */
function ProgressModal({
  challenge, currentProgress, lang, onSave, onClose,
}: {
  challenge: typeof CHALLENGES.en[0];
  currentProgress: number;
  lang: string;
  onSave: (val: number) => void;
  onClose: () => void;
}) {
  const [val, setVal] = useState(currentProgress);

  return (
    <div onClick={onClose} style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.75)', zIndex: 200, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 20 }}>
      <div onClick={e => e.stopPropagation()} style={{ background: '#0d1117', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 28, padding: 32, width: '100%', maxWidth: 420 }}>
        <div style={{ display: 'flex', gap: 14, alignItems: 'flex-start', marginBottom: 28 }}>
          <div style={{ width: 52, height: 52, borderRadius: 14, background: `${challenge.color}18`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
            <challenge.icon className="w-6 h-6" style={{ color: challenge.color }} />
          </div>
          <div>
            <h2 style={{ fontWeight: 800, fontSize: 17, color: 'white', marginBottom: 4 }}>{challenge.title}</h2>
            <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.45)', lineHeight: 1.5 }}>{challenge.desc}</p>
          </div>
        </div>

        <div style={{ textAlign: 'center', marginBottom: 24 }}>
          <div style={{ fontSize: 64, fontWeight: 900, color: challenge.color, lineHeight: 1 }}>{val}%</div>
          <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.4)', marginTop: 6 }}>{lang === 'ar' ? 'نسبة الإنجاز' : 'Completion'}</div>
        </div>

        <div style={{ marginBottom: 24 }}>
          <input type="range" min={0} max={100} value={val} onChange={e => setVal(Number(e.target.value))}
            style={{ width: '100%', accentColor: challenge.color, cursor: 'pointer' }} />
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11, color: 'rgba(255,255,255,0.3)', marginTop: 4 }}>
            <span>0%</span><span>50%</span><span>100%</span>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 8, marginBottom: 24 }}>
          {[25, 50, 75, 100].map(pct => (
            <button key={pct} onClick={() => setVal(pct)}
              style={{ padding: '8px', borderRadius: 10, background: val === pct ? `${challenge.color}22` : 'rgba(255,255,255,0.05)', border: val === pct ? `1px solid ${challenge.color}` : '1px solid transparent', color: val === pct ? challenge.color : 'rgba(255,255,255,0.5)', fontWeight: 700, fontSize: 13, cursor: 'pointer' }}>
              {pct}%
            </button>
          ))}
        </div>

        {val === 100 && (
          <div style={{ background: 'rgba(34,197,94,0.1)', border: '1px solid rgba(34,197,94,0.3)', borderRadius: 12, padding: '12px 16px', marginBottom: 20, display: 'flex', gap: 8, alignItems: 'center' }}>
            <Trophy className="w-4 h-4" style={{ color: '#22c55e' }} />
            <span style={{ fontSize: 13, color: '#22c55e', fontWeight: 600 }}>
              {lang === 'ar' ? `🎉 ستكسب ${challenge.xp} نقطة XP!` : `🎉 You'll earn ${challenge.xp} XP!`}
            </span>
          </div>
        )}

        <div style={{ display: 'flex', gap: 10 }}>
          <button onClick={onClose}
            style={{ flex: 1, padding: '12px', borderRadius: 12, background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', color: 'rgba(255,255,255,0.6)', fontWeight: 600, cursor: 'pointer', fontSize: 14 }}>
            {lang === 'ar' ? 'إلغاء' : 'Cancel'}
          </button>
          <button onClick={() => { onSave(val); onClose(); }}
            style={{ flex: 2, padding: '12px', borderRadius: 12, background: challenge.color, color: '#03060d', fontWeight: 800, cursor: 'pointer', fontSize: 14, border: 'none' }}>
            {lang === 'ar' ? 'حفظ التقدم' : 'Save Progress'}
          </button>
        </div>
      </div>
    </div>
  );
}

/* ─── CHALLENGES PAGE ────────────────────────────────────────────────────── */
export default function Challenges() {
  const { lang } = useLanguage();
  const { challengeProgress, setChallengeProgress } = useUserData();
  const { showToast } = useToast();
  const [tab, setTab]       = useState<'active' | 'completed' | 'badges'>('active');
  const [editing, setEditing] = useState<number | null>(null);

  const challenges = CHALLENGES[lang as 'ar' | 'en'];
  const badges     = BADGES[lang as 'ar' | 'en'];

  const getProgress = (id: number) => challengeProgress[id] ?? 0;

  const active    = challenges.filter(c => !c.locked && getProgress(c.id) < 100);
  const completed = challenges.filter(c => getProgress(c.id) === 100);
  const locked    = challenges.filter(c => c.locked);

  const totalXp = completed.reduce((sum, c) => sum + c.xp, 0);
  const earnedBadgeCount = badges.filter(b => b.needsId !== null && getProgress(b.needsId as number) === 100).length
    + (completed.length >= 3 ? 1 : 0);

  const editingChallenge = editing !== null ? challenges.find(c => c.id === editing) : null;

  const handleSave = (challengeId: number, val: number) => {
    const c = challenges.find(ch => ch.id === challengeId);
    if (!c) return;
    setChallengeProgress(challengeId, val);
    if (val === 100) {
      showToast(lang === 'ar' ? `🏆 أنجزت "${c.title}"! +${c.xp} XP` : `🏆 Completed "${c.title}"! +${c.xp} XP`, 'xp');
    } else {
      showToast(lang === 'ar' ? `✅ تم تحديث التقدم إلى ${val}%` : `✅ Progress updated to ${val}%`, 'success');
    }
  };

  const handleIncrement = (id: number, delta: number) => {
    const curr = getProgress(id);
    const next = Math.min(100, Math.max(0, curr + delta));
    const c = challenges.find(ch => ch.id === id);
    if (!c) return;
    setChallengeProgress(id, next);
    if (next === 100 && curr < 100) {
      showToast(lang === 'ar' ? `🏆 أنجزت "${c.title}"! +${c.xp} XP` : `🏆 Completed "${c.title}"! +${c.xp} XP`, 'xp');
    }
  };

  return (
    <div style={{ minHeight: '100vh', padding: '100px 24px 60px', maxWidth: 1100, margin: '0 auto', position: 'relative', zIndex: 1 }}>
      {editingChallenge && (
        <ProgressModal
          challenge={editingChallenge}
          currentProgress={getProgress(editingChallenge.id)}
          lang={lang}
          onSave={val => handleSave(editingChallenge.id, val)}
          onClose={() => setEditing(null)}
        />
      )}

      {/* Header */}
      <div style={{ marginBottom: 28 }}>
        <h1 style={{ fontSize: 'clamp(1.6rem, 3vw, 2.4rem)', fontWeight: 800, color: 'white', marginBottom: 6 }}>
          {lang === 'ar' ? 'التحديات والإنجازات' : 'Challenges & Achievements'}
        </h1>
        <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: 14 }}>
          {lang === 'ar' ? 'حدّث تقدمك يدوياً لكسب النقاط والشارات' : 'Update your progress manually to earn XP and badges'}
        </p>
      </div>

      {/* Stats */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: 14, marginBottom: 28 }}>
        {[
          { label: lang === 'ar' ? 'النقاط المكتسبة' : 'XP Earned',          value: `${totalXp}`,          color: '#00f0ff', icon: Zap },
          { label: lang === 'ar' ? 'التحديات النشطة' : 'Active Challenges',   value: `${active.length}`,    color: '#b44dff', icon: Target },
          { label: lang === 'ar' ? 'المكتملة' : 'Completed',                  value: `${completed.length}`, color: '#22c55e', icon: CheckCircle },
          { label: lang === 'ar' ? 'الشارات المكتسبة' : 'Badges Earned',      value: `${earnedBadgeCount}`, color: '#fbbf24', icon: Trophy },
        ].map((s, i) => (
          <div key={i} style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 16, padding: '16px 18px', display: 'flex', alignItems: 'center', gap: 12 }}>
            <div style={{ width: 38, height: 38, borderRadius: 10, background: `${s.color}12`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <s.icon className="w-4 h-4" style={{ color: s.color }} />
            </div>
            <div>
              <div style={{ fontSize: 20, fontWeight: 800, color: 'white' }}>{s.value}</div>
              <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.45)', marginTop: 1 }}>{s.label}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Tabs */}
      <div style={{ display: 'flex', gap: 6, marginBottom: 24, background: 'rgba(255,255,255,0.04)', padding: 5, borderRadius: 14, width: 'fit-content' }}>
        {([
          { key: 'active',    label: lang === 'ar' ? 'النشطة'   : 'Active'    },
          { key: 'completed', label: lang === 'ar' ? 'المكتملة'  : 'Completed' },
          { key: 'badges',    label: lang === 'ar' ? 'الشارات'  : 'Badges'    },
        ] as const).map(t => (
          <button key={t.key} onClick={() => setTab(t.key)}
            style={{ padding: '8px 18px', borderRadius: 10, fontSize: 13, fontWeight: 600, cursor: 'pointer', border: 'none', background: tab === t.key ? '#00f0ff' : 'transparent', color: tab === t.key ? '#03060d' : 'rgba(255,255,255,0.55)', transition: 'all 0.2s' }}>
            {t.label}
          </button>
        ))}
      </div>

      {/* ── ACTIVE ── */}
      {tab === 'active' && (
        <div>
          {active.length === 0 && completed.length > 0 ? (
            <div style={{ textAlign: 'center', padding: '60px 20px' }}>
              <Trophy className="w-16 h-16" style={{ color: '#22c55e', opacity: 0.5, margin: '0 auto 16px' }} />
              <h3 style={{ fontWeight: 700, fontSize: 18, color: 'white', marginBottom: 8 }}>
                {lang === 'ar' ? 'أكملت جميع التحديات!' : 'All Challenges Completed!'}
              </h3>
            </div>
          ) : (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 18 }}>
              {active.map(c => {
                const prog = getProgress(c.id);
                return (
                  <div key={c.id} style={{ background: 'rgba(255,255,255,0.04)', border: `1px solid ${c.color}28`, borderRadius: 24, padding: 26, position: 'relative', overflow: 'hidden' }}>
                    <div style={{ position: 'absolute', top: -20, right: -20, width: 80, height: 80, background: `${c.color}08`, borderRadius: '50%', filter: 'blur(20px)' }} />
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 14 }}>
                      <div style={{ width: 46, height: 46, borderRadius: 13, background: `${c.color}16`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <c.icon className="w-5 h-5" style={{ color: c.color }} />
                      </div>
                      <div style={{ textAlign: 'end' }}>
                        <div style={{ fontSize: 12, color: c.color, fontWeight: 700 }}>+{c.xp} XP</div>
                        <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.35)', marginTop: 2 }}>{c.days} {lang === 'ar' ? 'يوم' : 'days'}</div>
                      </div>
                    </div>
                    <span style={{ fontSize: 10, color: c.color, background: `${c.color}14`, padding: '3px 10px', borderRadius: 6, fontWeight: 600, display: 'inline-block', marginBottom: 10 }}>{c.category}</span>
                    <h3 style={{ fontWeight: 700, fontSize: 15, color: 'white', marginBottom: 6 }}>{c.title}</h3>
                    <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.5)', lineHeight: 1.6, marginBottom: 18 }}>{c.desc}</p>

                    {/* Progress bar */}
                    <div style={{ marginBottom: 16 }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
                        <span style={{ fontSize: 12, color: 'rgba(255,255,255,0.4)' }}>{lang === 'ar' ? 'التقدم' : 'Progress'}</span>
                        <span style={{ fontSize: 12, fontWeight: 700, color: c.color }}>{prog}%</span>
                      </div>
                      <div style={{ height: 7, background: 'rgba(255,255,255,0.07)', borderRadius: 4, overflow: 'hidden' }}>
                        <div style={{ height: '100%', width: `${prog}%`, background: c.color, borderRadius: 4, boxShadow: `0 0 8px ${c.color}50`, transition: 'width 0.5s ease' }} />
                      </div>
                    </div>

                    {/* Buttons */}
                    <div style={{ display: 'flex', gap: 8 }}>
                      <button onClick={() => handleIncrement(c.id, -10)}
                        style={{ width: 36, height: 36, borderRadius: 10, background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', color: 'rgba(255,255,255,0.5)', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}
                        title="-10%">
                        <Minus className="w-4 h-4" />
                      </button>
                      <button onClick={() => setEditing(c.id)}
                        style={{ flex: 1, background: `${c.color}14`, border: `1px solid ${c.color}35`, borderRadius: 10, color: c.color, fontWeight: 700, fontSize: 13, cursor: 'pointer', padding: '8px' }}>
                        {lang === 'ar' ? 'تحديث التقدم' : 'Update Progress'}
                      </button>
                      <button onClick={() => handleIncrement(c.id, 10)}
                        style={{ width: 36, height: 36, borderRadius: 10, background: `${c.color}14`, border: `1px solid ${c.color}35`, color: c.color, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}
                        title="+10%">
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                );
              })}

              {/* Locked cards */}
              {locked.map(c => (
                <div key={c.id} style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)', borderRadius: 24, padding: 26, position: 'relative', overflow: 'hidden' }}>
                  <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.45)', borderRadius: 24, display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: 8, zIndex: 2 }}>
                    <Lock className="w-7 h-7" style={{ color: 'rgba(255,255,255,0.25)' }} />
                    <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.35)', fontWeight: 600 }}>
                      {lang === 'ar' ? 'أكمل ٣ تحديات للفتح' : 'Complete 3 challenges to unlock'}
                    </div>
                  </div>
                  <div style={{ opacity: 0.3 }}>
                    <div style={{ display: 'flex', gap: 14, alignItems: 'center', marginBottom: 12 }}>
                      <div style={{ width: 46, height: 46, borderRadius: 13, background: `${c.color}16`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <c.icon className="w-5 h-5" style={{ color: c.color }} />
                      </div>
                      <div>
                        <h3 style={{ fontWeight: 700, fontSize: 15, color: 'white' }}>{c.title}</h3>
                        <div style={{ fontSize: 12, color: c.color }}>+{c.xp} XP</div>
                      </div>
                    </div>
                    <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.5)', lineHeight: 1.5 }}>{c.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* ── COMPLETED ── */}
      {tab === 'completed' && (
        <div>
          {completed.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '60px 20px' }}>
              <Target className="w-16 h-16" style={{ color: 'rgba(255,255,255,0.15)', margin: '0 auto 16px' }} />
              <h3 style={{ fontWeight: 700, fontSize: 18, color: 'white', marginBottom: 8 }}>
                {lang === 'ar' ? 'لم تكمل أي تحدٍّ بعد' : 'No completed challenges yet'}
              </h3>
              <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: 14, marginBottom: 20 }}>
                {lang === 'ar' ? 'ارفع تقدم أي تحدٍّ إلى ١٠٠٪ لإكماله وكسب النقاط.' : 'Set any challenge progress to 100% to complete it and earn XP.'}
              </p>
              <button onClick={() => setTab('active')}
                style={{ background: '#00f0ff', color: '#03060d', border: 'none', borderRadius: 12, padding: '10px 22px', fontWeight: 700, fontSize: 14, cursor: 'pointer' }}>
                {lang === 'ar' ? 'ابدأ تحدياً' : 'Start a Challenge'}
              </button>
            </div>
          ) : (
            <>
              <div style={{ background: 'rgba(34,197,94,0.07)', border: '1px solid rgba(34,197,94,0.2)', borderRadius: 14, padding: '14px 18px', marginBottom: 20, display: 'flex', gap: 10, alignItems: 'center' }}>
                <Trophy className="w-5 h-5" style={{ color: '#22c55e' }} />
                <span style={{ color: '#22c55e', fontWeight: 600, fontSize: 13 }}>
                  {lang === 'ar'
                    ? `رائع! أكملت ${completed.length} تحديات وكسبت ${totalXp} نقطة`
                    : `Amazing! You've completed ${completed.length} challenges and earned ${totalXp} XP`}
                </span>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 14 }}>
                {completed.map(c => (
                  <div key={c.id} style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(34,197,94,0.2)', borderRadius: 20, padding: 22, display: 'flex', gap: 14, alignItems: 'center' }}>
                    <div style={{ width: 50, height: 50, borderRadius: 14, background: 'rgba(34,197,94,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                      <c.icon className="w-6 h-6" style={{ color: '#22c55e' }} />
                    </div>
                    <div style={{ flex: 1 }}>
                      <h3 style={{ fontWeight: 700, fontSize: 14, color: 'white', marginBottom: 4 }}>{c.title}</h3>
                      <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                        <span style={{ fontSize: 12, color: '#22c55e', fontWeight: 700 }}>+{c.xp} XP</span>
                        <span style={{ fontSize: 11, background: 'rgba(34,197,94,0.15)', color: '#22c55e', padding: '2px 8px', borderRadius: 6 }}>
                          {lang === 'ar' ? 'مكتمل ✓' : 'Completed ✓'}
                        </span>
                      </div>
                    </div>
                    <button onClick={() => { setChallengeProgress(c.id, 0); showToast(lang === 'ar' ? 'تم إعادة التحدي' : 'Challenge reset', 'info'); }}
                      style={{ fontSize: 11, color: 'rgba(255,255,255,0.25)', background: 'none', border: 'none', cursor: 'pointer', padding: '4px 6px', borderRadius: 6 }}>
                      {lang === 'ar' ? 'إعادة' : 'Reset'}
                    </button>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      )}

      {/* ── BADGES ── */}
      {tab === 'badges' && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(190px, 1fr))', gap: 14 }}>
          {badges.map((badge, i) => {
            const earned = badge.needsId !== null
              ? getProgress(badge.needsId as number) === 100
              : completed.length >= 3;
            return (
              <div key={i} style={{ background: earned ? 'rgba(255,255,255,0.05)' : 'rgba(255,255,255,0.02)', border: earned ? `1px solid ${badge.color}28` : '1px solid rgba(255,255,255,0.06)', borderRadius: 20, padding: 22, textAlign: 'center', opacity: earned ? 1 : 0.5, position: 'relative', transition: 'opacity 0.3s' }}>
                {!earned && (
                  <div style={{ position: 'absolute', top: 10, right: 10 }}>
                    <Lock className="w-3 h-3" style={{ color: 'rgba(255,255,255,0.3)' }} />
                  </div>
                )}
                <div style={{ width: 60, height: 60, borderRadius: '50%', background: earned ? `${badge.color}18` : 'rgba(255,255,255,0.04)', border: `2px solid ${earned ? badge.color : 'rgba(255,255,255,0.1)'}`, display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 14px', transition: 'border-color 0.3s' }}>
                  <badge.icon className="w-7 h-7" style={{ color: earned ? badge.color : 'rgba(255,255,255,0.2)' }} />
                </div>
                <h4 style={{ fontWeight: 700, fontSize: 13, color: earned ? 'white' : 'rgba(255,255,255,0.4)', marginBottom: 6 }}>{badge.title}</h4>
                <p style={{ fontSize: 11, color: 'rgba(255,255,255,0.4)', lineHeight: 1.5 }}>{badge.desc}</p>
                {earned && <div style={{ marginTop: 10, fontSize: 11, color: badge.color, fontWeight: 700 }}>{lang === 'ar' ? '✓ مكتسبة' : '✓ Earned'}</div>}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
