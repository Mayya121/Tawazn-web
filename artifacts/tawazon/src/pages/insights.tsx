import React, { useState } from 'react';
import { useLanguage } from '@/contexts/language-context';
import { useUserData } from '@/contexts/user-data-context';
import { BrainCircuit, TrendingDown, AlertTriangle, CheckCircle, Zap, CloudRain, ArrowUpRight, Plus } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { useLocation } from 'wouter';

const MOOD_COLORS: Record<string, string> = {
  happy: '#00f0ff', neutral: '#fbbf24', stressed: '#f97316', sad: '#b44dff', bored: '#6b7280',
};
const MOOD_LABELS_AR: Record<string, string> = {
  happy: 'سعيد', neutral: 'محايد', stressed: 'متوتر', sad: 'حزين', bored: 'ممل',
};
const MOOD_LABELS_EN: Record<string, string> = {
  happy: 'Happy', neutral: 'Neutral', stressed: 'Stressed', sad: 'Sad', bored: 'Bored',
};
const CAT_LABELS_AR: Record<string, string> = {
  food: 'طعام', shopping: 'تسوق', transport: 'مواصلات', entertainment: 'ترفيه', education: 'تعليم', other: 'أخرى',
};
const CAT_LABELS_EN: Record<string, string> = {
  food: 'Food', shopping: 'Shopping', transport: 'Transport', entertainment: 'Entertainment', education: 'Education', other: 'Other',
};
const CAT_COLORS: Record<string, string> = {
  food: '#f97316', shopping: '#b44dff', transport: '#00f0ff', entertainment: '#fbbf24', education: '#22c55e', other: '#6b7280',
};

const EMOTIONAL_MOODS = ['stressed', 'sad', 'bored'];

/* ─── EMPTY STATE ────────────────────────────────────────────── */
function EmptyState({ lang, navigate }: { lang: string; navigate: (p: string) => void }) {
  return (
    <div style={{ minHeight: '60vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', gap: 24 }}>
      <div style={{ width: 100, height: 100, borderRadius: '50%', background: 'rgba(0,240,255,0.06)', border: '1px solid rgba(0,240,255,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <BrainCircuit className="w-12 h-12" style={{ color: '#00f0ff', opacity: 0.4 }} strokeWidth={1} />
      </div>
      <div>
        <h3 style={{ fontWeight: 800, fontSize: 22, color: 'white', marginBottom: 10 }}>
          {lang === 'ar' ? 'لا توجد بيانات بعد' : 'No Data Yet'}
        </h3>
        <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: 15, lineHeight: 1.75, maxWidth: 360 }}>
          {lang === 'ar'
            ? 'سجّل مصروفاتك من لوحة التحكم وسيبدأ التحليل تلقائياً بناءً على بياناتك الحقيقية.'
            : 'Log your expenses from the Dashboard and analysis will start automatically based on your real data.'}
        </p>
      </div>
      <button
        onClick={() => navigate('/dashboard')}
        className="btn-primary"
        style={{ display: 'flex', alignItems: 'center', gap: 8, background: '#00f0ff', color: '#03060d', border: 'none', borderRadius: 14, padding: '13px 28px', fontWeight: 800, fontSize: 15, cursor: 'pointer', boxShadow: '0 0 28px rgba(0,240,255,0.3)' }}
      >
        <Plus className="w-4 h-4" />
        {lang === 'ar' ? 'سجّل مصروفك الأول' : 'Log First Expense'}
      </button>
    </div>
  );
}

/* ─── CUSTOM TOOLTIP ─────────────────────────────────────────── */
function ChartTooltip({ active, payload, label, lang }: any) {
  if (!active || !payload?.length) return null;
  return (
    <div style={{ background: 'linear-gradient(145deg, #0d1525, #0a1020)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 12, padding: '10px 14px', boxShadow: '0 8px 24px rgba(0,0,0,0.5)' }}>
      <p style={{ color: 'rgba(255,255,255,0.6)', fontWeight: 600, fontSize: 11, marginBottom: 4 }}>{label}</p>
      {payload.map((p: any, i: number) => (
        <p key={i} style={{ color: p.color || '#00f0ff', fontSize: 13, fontWeight: 700 }}>
          {p.value.toLocaleString()} {lang === 'ar' ? 'ر.س' : 'SAR'}
        </p>
      ))}
    </div>
  );
}

/* ─── STAT CARD ──────────────────────────────────────────────── */
function StatCard({ label, value, color }: { label: string; value: string; color: string }) {
  return (
    <div style={{
      background: 'rgba(255,255,255,0.04)',
      border: '1px solid rgba(255,255,255,0.08)',
      borderRadius: 18,
      padding: '20px',
      position: 'relative',
      overflow: 'hidden',
    }}>
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 2, background: `linear-gradient(90deg, ${color}90, ${color}20)`, borderRadius: '18px 18px 0 0' }} />
      <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.45)', marginBottom: 10, fontWeight: 500 }}>{label}</div>
      <div style={{ fontSize: 22, fontWeight: 900, color: 'white', letterSpacing: '-0.02em' }}>{value}</div>
    </div>
  );
}

/* ─── AI INSIGHT CARD ────────────────────────────────────────── */
function InsightCard({ color, icon: Icon, title, desc, cta, onCta }: {
  color: string; icon: any; title: string; desc: string; cta?: string; onCta?: () => void;
}) {
  return (
    <div style={{
      background: 'rgba(255,255,255,0.04)',
      border: `1px solid ${color}30`,
      borderRadius: 20,
      padding: 24,
      position: 'relative',
      overflow: 'hidden',
      boxShadow: `0 4px 20px rgba(0,0,0,0.3)`,
    }}>
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 2, background: `linear-gradient(90deg, ${color}90, transparent)`, borderRadius: '20px 20px 0 0' }} />
      <div style={{ display: 'flex', gap: 12, alignItems: 'flex-start', marginBottom: 12 }}>
        <div style={{ width: 40, height: 40, borderRadius: 12, background: `${color}14`, border: `1px solid ${color}30`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
          <Icon className="w-5 h-5" style={{ color }} />
        </div>
        <h3 style={{ fontWeight: 700, color: 'white', fontSize: 14, lineHeight: 1.45, marginTop: 4 }}>{title}</h3>
      </div>
      <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.55)', lineHeight: 1.7, marginBottom: cta ? 16 : 0 }}>{desc}</p>
      {cta && onCta && (
        <button onClick={onCta}
          style={{ display: 'flex', alignItems: 'center', gap: 5, color, background: 'none', border: 'none', cursor: 'pointer', fontSize: 12, fontWeight: 700, padding: 0 }}>
          {cta}
          <ArrowUpRight className="w-4 h-4" />
        </button>
      )}
    </div>
  );
}

/* ─── INSIGHTS PAGE ──────────────────────────────────────────── */
export default function Insights() {
  const { lang } = useLanguage();
  const [, navigate] = useLocation();
  const { entries, totalSpent, emotionalSpendingPct } = useUserData();
  const [chartType, setChartType] = useState<'mood' | 'category'>('mood');

  const hasData = entries.length > 0;
  const moodLabels = lang === 'ar' ? MOOD_LABELS_AR : MOOD_LABELS_EN;
  const catLabels  = lang === 'ar' ? CAT_LABELS_AR  : CAT_LABELS_EN;

  /* Mood pie data */
  const moodTally = entries.reduce((a, e) => { a[e.mood] = (a[e.mood] || 0) + e.amount; return a; }, {} as Record<string, number>);
  const pieData = Object.entries(moodTally).map(([id, value]) => ({ id, value, name: moodLabels[id] ?? id, color: MOOD_COLORS[id] ?? '#6b7280' }));

  /* Category bar data */
  const catTally = entries.reduce((a, e) => { a[e.category] = (a[e.category] || 0) + e.amount; return a; }, {} as Record<string, number>);
  const catData = Object.entries(catTally).sort((a, b) => b[1] - a[1]).map(([id, value]) => ({ name: catLabels[id] ?? id, value, id, color: CAT_COLORS[id] ?? '#6b7280' }));

  /* Time series (last 10 entries) */
  const timeData = [...entries].reverse().slice(-10).map((e, i) => ({ i: i + 1, amount: e.amount, mood: moodLabels[e.mood] ?? e.mood, color: MOOD_COLORS[e.mood] ?? '#fff' }));

  /* AI insight data */
  const topEmotionalMood = (() => {
    const emotional = entries.filter(e => EMOTIONAL_MOODS.includes(e.mood));
    if (!emotional.length) return null;
    const tally = emotional.reduce((a, e) => { a[e.mood] = (a[e.mood] || 0) + e.amount; return a; }, {} as Record<string, number>);
    return Object.entries(tally).sort((a, b) => b[1] - a[1])[0]?.[0] ?? null;
  })();

  const avgAmount = entries.length ? totalSpent / entries.length : 0;
  const maxEntry  = entries.reduce((best, e) => e.amount > (best?.amount ?? 0) ? e : best, null as typeof entries[0] | null);
  const savedAmount = Math.round(totalSpent * 0.12);

  const chartColors = chartType === 'mood' ? pieData : catData;

  return (
    <div style={{ minHeight: '100vh', padding: '100px 24px 60px', maxWidth: 1200, margin: '0 auto', position: 'relative', zIndex: 1 }}>
      {/* Header */}
      <div style={{ marginBottom: 40 }}>
        <h1 style={{ fontSize: 'clamp(1.7rem, 3vw, 2.5rem)', fontWeight: 900, color: 'white', marginBottom: 6, letterSpacing: '-0.02em' }}>
          {lang === 'ar' ? 'تحليل الإنفاق العاطفي' : 'Emotional Spending Analysis'}
        </h1>
        <p style={{ color: 'rgba(255,255,255,0.45)', fontSize: 14 }}>
          {lang === 'ar'
            ? `${entries.length} مصروف مسجّل — البيانات مبنية على ما أدخلته`
            : `${entries.length} expenses logged — data based on your own entries`}
        </p>
      </div>

      {!hasData ? <EmptyState lang={lang} navigate={navigate} /> : (
        <>
          {/* Stats row */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(175px, 1fr))', gap: 14, marginBottom: 28 }}>
            <StatCard label={lang === 'ar' ? 'إجمالي الإنفاق' : 'Total Spending'} value={`${totalSpent.toLocaleString()} ${lang === 'ar' ? 'ر.س' : 'SAR'}`} color="#f97316" />
            <StatCard label={lang === 'ar' ? 'الإنفاق العاطفي' : 'Emotional Spending'} value={`${emotionalSpendingPct}%`} color="#b44dff" />
            <StatCard label={lang === 'ar' ? 'متوسط العملية' : 'Avg per Entry'} value={`${Math.round(avgAmount).toLocaleString()} ${lang === 'ar' ? 'ر.س' : 'SAR'}`} color="#00f0ff" />
            <StatCard label={lang === 'ar' ? 'التوفير التقديري' : 'Est. Savings'} value={`${savedAmount.toLocaleString()} ${lang === 'ar' ? 'ر.س' : 'SAR'}`} color="#22c55e" />
          </div>

          {/* Charts grid */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(380px, 1fr))', gap: 22, marginBottom: 28 }}>
            {/* Spending over time bar chart */}
            <div style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 24, padding: 26, boxShadow: '0 4px 20px rgba(0,0,0,0.3)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 22 }}>
                <h3 style={{ fontWeight: 700, color: 'white', fontSize: 15 }}>
                  {lang === 'ar' ? 'الإنفاق عبر الزمن' : 'Spending Over Time'}
                </h3>
                <div style={{ display: 'flex', gap: 5, background: 'rgba(255,255,255,0.05)', padding: '3px', borderRadius: 10 }}>
                  {(['mood', 'category'] as const).map(t => (
                    <button key={t} onClick={() => setChartType(t)}
                      style={{ padding: '4px 12px', borderRadius: 8, fontSize: 11, fontWeight: 700, cursor: 'pointer', border: 'none', background: chartType === t ? '#00f0ff' : 'transparent', color: chartType === t ? '#03060d' : 'rgba(255,255,255,0.5)', transition: 'all 0.2s' }}>
                      {t === 'mood' ? (lang === 'ar' ? 'حسب المزاج' : 'By Mood') : (lang === 'ar' ? 'حسب الفئة' : 'By Category')}
                    </button>
                  ))}
                </div>
              </div>
              <ResponsiveContainer width="100%" height={200}>
                <BarChart data={timeData} barCategoryGap="30%">
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" vertical={false} />
                  <XAxis dataKey="i" stroke="rgba(255,255,255,0.2)" fontSize={10} tickFormatter={v => `#${v}`} tickLine={false} axisLine={false} />
                  <YAxis stroke="rgba(255,255,255,0.2)" fontSize={10} tickLine={false} axisLine={false} />
                  <Tooltip content={<ChartTooltip lang={lang} />} cursor={{ fill: 'rgba(255,255,255,0.04)' }} />
                  <Bar dataKey="amount" radius={[6, 6, 0, 0]} name={lang === 'ar' ? 'ر.س' : 'SAR'}>
                    {timeData.map((entry, i) => <Cell key={i} fill={entry.color} fillOpacity={0.85} />)}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
              <p style={{ fontSize: 11, color: 'rgba(255,255,255,0.3)', marginTop: 12, textAlign: 'center' }}>
                {lang === 'ar' ? 'كل بار يمثل مصروفاً، واللون يعكس حالتك المزاجية' : 'Each bar is one expense, color reflects your mood'}
              </p>
            </div>

            {/* Pie chart */}
            <div style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 24, padding: 26, boxShadow: '0 4px 20px rgba(0,0,0,0.3)' }}>
              <h3 style={{ fontWeight: 700, color: 'white', fontSize: 15, marginBottom: 22 }}>
                {chartType === 'mood'
                  ? (lang === 'ar' ? 'توزيع الإنفاق حسب المزاج' : 'Spending by Mood')
                  : (lang === 'ar' ? 'توزيع الإنفاق حسب الفئة' : 'Spending by Category')}
              </h3>
              {chartColors.length === 0 ? (
                <div style={{ height: 200, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'rgba(255,255,255,0.25)', fontSize: 13 }}>
                  {lang === 'ar' ? 'لا توجد بيانات كافية' : 'Not enough data'}
                </div>
              ) : (
                <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
                  <PieChart width={150} height={160}>
                    <Pie data={chartColors} cx={70} cy={75} innerRadius={42} outerRadius={70} paddingAngle={3} dataKey="value">
                      {chartColors.map((entry: any, i: number) => <Cell key={i} fill={entry.color ?? '#6b7280'} />)}
                    </Pie>
                  </PieChart>
                  <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 10 }}>
                    {chartColors.map((item: any, i: number) => {
                      const total = chartColors.reduce((s: number, d: any) => s + d.value, 0);
                      const pct = total > 0 ? Math.round((item.value / total) * 100) : 0;
                      return (
                        <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                          <div style={{ width: 10, height: 10, borderRadius: 3, background: item.color ?? '#6b7280', flexShrink: 0 }} />
                          <span style={{ flex: 1, fontSize: 12, color: 'rgba(255,255,255,0.65)' }}>{item.name}</span>
                          <span style={{ fontSize: 12, fontWeight: 800, color: item.color ?? '#fff' }}>{pct}%</span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Category breakdown bars */}
          {catData.length > 0 && (
            <div style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 24, padding: 26, marginBottom: 28, boxShadow: '0 4px 20px rgba(0,0,0,0.3)' }}>
              <h3 style={{ fontWeight: 700, color: 'white', fontSize: 15, marginBottom: 22 }}>
                {lang === 'ar' ? 'الإنفاق حسب الفئة' : 'Spending by Category'}
              </h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                {catData.map((cat: any, i: number) => {
                  const pct = totalSpent > 0 ? Math.round((cat.value / totalSpent) * 100) : 0;
                  return (
                    <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
                      <span style={{ fontSize: 13, color: 'rgba(255,255,255,0.65)', minWidth: 90, textAlign: 'end', fontWeight: 500 }}>{cat.name}</span>
                      <div style={{ flex: 1, height: 10, background: 'rgba(255,255,255,0.05)', borderRadius: 5, overflow: 'hidden' }}>
                        <div style={{ height: '100%', width: `${pct}%`, background: cat.color ?? `linear-gradient(90deg, #00f0ff, #b44dff)`, borderRadius: 5, transition: 'width 0.9s ease', boxShadow: `0 0 10px ${cat.color ?? '#00f0ff'}50` }} />
                      </div>
                      <span style={{ fontSize: 13, fontWeight: 800, color: 'white', minWidth: 84, textAlign: 'start', letterSpacing: '-0.01em' }}>
                        {cat.value.toLocaleString()} <span style={{ fontSize: 11, fontWeight: 500, color: 'rgba(255,255,255,0.4)' }}>{lang === 'ar' ? 'ر.س' : 'SAR'}</span>
                      </span>
                      <span style={{ fontSize: 12, fontWeight: 700, color: cat.color ?? 'rgba(255,255,255,0.4)', minWidth: 36, textAlign: 'end' }}>{pct}%</span>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* AI Insights */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 20 }}>
              <div style={{ width: 32, height: 32, borderRadius: 9, background: 'rgba(180,77,255,0.12)', border: '1px solid rgba(180,77,255,0.25)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <BrainCircuit className="w-4 h-4" style={{ color: '#b44dff' }} />
              </div>
              <h2 style={{ fontWeight: 800, fontSize: 18, color: 'white' }}>
                {lang === 'ar' ? 'رؤى الذكاء الاصطناعي — بناءً على بياناتك' : 'AI Insights — Based on Your Data'}
              </h2>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 16 }}>
              {emotionalSpendingPct > 0 && (
                <InsightCard
                  color="#f97316"
                  icon={AlertTriangle}
                  title={lang === 'ar' ? `${emotionalSpendingPct}٪ من إنفاقك عاطفي` : `${emotionalSpendingPct}% of your spending is emotional`}
                  desc={lang === 'ar'
                    ? (emotionalSpendingPct > 40 ? 'إنفاقك العاطفي مرتفع. معظمه يحدث عندما تكون متوتراً أو حزيناً أو ممتعضاً.' : 'إنفاقك العاطفي في مستوى معتدل. استمر في تتبع حالتك المزاجية لتحسينه.')
                    : (emotionalSpendingPct > 40 ? 'Your emotional spending is high. Most occurs when stressed, sad or bored.' : 'Your emotional spending is moderate. Keep tracking your mood to improve.')}
                  cta={lang === 'ar' ? 'ابدأ تحدي التحكم في الاندفاع' : 'Start Impulse Control Challenge'}
                  onCta={() => navigate('/challenges')}
                />
              )}

              {topEmotionalMood && (
                <InsightCard
                  color={MOOD_COLORS[topEmotionalMood] ?? '#fff'}
                  icon={CloudRain}
                  title={lang === 'ar' ? `المحفز الأكبر: ${moodLabels[topEmotionalMood]}` : `Top Trigger: ${moodLabels[topEmotionalMood]}`}
                  desc={lang === 'ar'
                    ? 'بياناتك تُظهر أن هذه الحالة المزاجية ترتبط بأعلى إنفاق. تعرّف على هذا المحفز وتحكم فيه.'
                    : 'Your data shows this mood correlates with your highest spending. Recognize this trigger and control it.'}
                />
              )}

              {maxEntry && (
                <InsightCard
                  color="#00f0ff"
                  icon={TrendingDown}
                  title={lang === 'ar' ? `أكبر مصروف: ${maxEntry.amount.toLocaleString()} ر.س` : `Largest expense: ${maxEntry.amount.toLocaleString()} SAR`}
                  desc={lang === 'ar'
                    ? `كان في فئة "${catLabels[maxEntry.category] ?? maxEntry.category}" وأنت ${moodLabels[maxEntry.mood] ?? maxEntry.mood}. راقب هذه الفئة في المستقبل.`
                    : `It was in "${catLabels[maxEntry.category] ?? maxEntry.category}" while you felt ${moodLabels[maxEntry.mood] ?? maxEntry.mood}. Watch this category.`}
                  cta={lang === 'ar' ? 'أنشئ تحدياً للادخار' : 'Create a saving challenge'}
                  onCta={() => navigate('/challenges')}
                />
              )}

              {entries.length >= 3 && (
                <InsightCard
                  color="#22c55e"
                  icon={CheckCircle}
                  title={lang === 'ar' ? `سجّلت ${entries.length} مصروفاً — رائع!` : `You logged ${entries.length} expenses — great!`}
                  desc={lang === 'ar'
                    ? 'كل مصروف مسجّل يمنحك وعياً أعمق بعاداتك المالية. استمر في التسجيل لنتائج أدق.'
                    : 'Every logged expense gives you deeper insight into your financial habits. Keep logging for more accurate results.'}
                />
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
