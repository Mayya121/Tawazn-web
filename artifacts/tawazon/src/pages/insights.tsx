import React, { useState } from 'react';
import { useLanguage } from '@/contexts/language-context';
import { useUserData } from '@/contexts/user-data-context';
import { BrainCircuit, TrendingDown, AlertTriangle, CheckCircle, Zap, CloudRain, ArrowUpRight, Plus } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, BarChart, Bar } from 'recharts';
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

const EMOTIONAL_MOODS = ['stressed', 'sad', 'bored'];

function EmptyState({ lang, navigate }: { lang: string; navigate: (p: string) => void }) {
  return (
    <div style={{ minHeight: '60vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', gap: 20 }}>
      <BrainCircuit className="w-20 h-20" style={{ color: '#00f0ff', opacity: 0.25 }} strokeWidth={1} />
      <div>
        <h3 style={{ fontWeight: 700, fontSize: 20, color: 'white', marginBottom: 8 }}>
          {lang === 'ar' ? 'لا توجد بيانات بعد' : 'No Data Yet'}
        </h3>
        <p style={{ color: 'rgba(255,255,255,0.45)', fontSize: 14, lineHeight: 1.7, maxWidth: 340 }}>
          {lang === 'ar'
            ? 'سجّل مصروفاتك من لوحة التحكم وسيبدأ التحليل تلقائياً بناءً على بياناتك الحقيقية.'
            : 'Log your expenses from the Dashboard and analysis will start automatically based on your real data.'}
        </p>
      </div>
      <button
        onClick={() => navigate('/dashboard')}
        style={{ display: 'flex', alignItems: 'center', gap: 8, background: '#00f0ff', color: '#03060d', border: 'none', borderRadius: 14, padding: '12px 24px', fontWeight: 800, fontSize: 15, cursor: 'pointer' }}
      >
        <Plus className="w-4 h-4" />
        {lang === 'ar' ? 'سجّل مصروفك الأول' : 'Log First Expense'}
      </button>
    </div>
  );
}

export default function Insights() {
  const { lang } = useLanguage();
  const [, navigate] = useLocation();
  const { entries, totalSpent, emotionalSpendingPct } = useUserData();
  const [chartType, setChartType] = useState<'mood' | 'category'>('mood');

  const hasData = entries.length > 0;
  const moodLabels = lang === 'ar' ? MOOD_LABELS_AR : MOOD_LABELS_EN;
  const catLabels  = lang === 'ar' ? CAT_LABELS_AR  : CAT_LABELS_EN;

  /* ── Mood distribution for pie chart ── */
  const moodTally = entries.reduce((a, e) => {
    a[e.mood] = (a[e.mood] || 0) + e.amount;
    return a;
  }, {} as Record<string, number>);
  const pieData = Object.entries(moodTally).map(([id, value]) => ({
    id, value, name: moodLabels[id] ?? id, color: MOOD_COLORS[id] ?? '#6b7280',
  }));

  /* ── Category totals for bar chart ── */
  const catTally = entries.reduce((a, e) => {
    a[e.category] = (a[e.category] || 0) + e.amount;
    return a;
  }, {} as Record<string, number>);
  const catData = Object.entries(catTally)
    .sort((a, b) => b[1] - a[1])
    .map(([id, value]) => ({ name: catLabels[id] ?? id, value, id }));

  /* ── Last 10 entries as a simple time-series ── */
  const timeData = [...entries].reverse().slice(-10).map((e, i) => ({
    i: i + 1,
    amount: e.amount,
    mood: moodLabels[e.mood] ?? e.mood,
    color: MOOD_COLORS[e.mood] ?? '#fff',
  }));

  /* ── AI Insights derived from real data ── */
  const topEmotionalMood = (() => {
    const emotional = entries.filter(e => EMOTIONAL_MOODS.includes(e.mood));
    if (!emotional.length) return null;
    const tally = emotional.reduce((a, e) => { a[e.mood] = (a[e.mood] || 0) + e.amount; return a; }, {} as Record<string, number>);
    return Object.entries(tally).sort((a, b) => b[1] - a[1])[0]?.[0] ?? null;
  })();

  const avgAmount = entries.length ? totalSpent / entries.length : 0;
  const maxEntry  = entries.reduce((best, e) => e.amount > (best?.amount ?? 0) ? e : best, null as typeof entries[0] | null);

  const savedAmount = Math.round(totalSpent * 0.12); // simulate 12% saving via challenges

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (!active || !payload?.length) return null;
    return (
      <div style={{ background: '#0d1117', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 10, padding: '10px 14px' }}>
        <p style={{ color: 'white', fontWeight: 700, fontSize: 12, marginBottom: 4 }}>{label}</p>
        {payload.map((p: any, i: number) => (
          <p key={i} style={{ color: p.color || '#00f0ff', fontSize: 12 }}>{p.name}: {p.value} {lang === 'ar' ? 'ر.س' : 'SAR'}</p>
        ))}
      </div>
    );
  };

  return (
    <div style={{ minHeight: '100vh', padding: '100px 24px 60px', maxWidth: 1200, margin: '0 auto', position: 'relative', zIndex: 1 }}>
      <div style={{ marginBottom: 36 }}>
        <h1 style={{ fontSize: 'clamp(1.6rem, 3vw, 2.4rem)', fontWeight: 800, color: 'white', marginBottom: 6 }}>
          {lang === 'ar' ? 'تحليل الإنفاق العاطفي' : 'Emotional Spending Analysis'}
        </h1>
        <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: 14 }}>
          {lang === 'ar'
            ? `${entries.length} مصروف مسجّل — البيانات مبنية على ما أدخلته`
            : `${entries.length} expenses logged — data based on your own entries`}
        </p>
      </div>

      {!hasData ? <EmptyState lang={lang} navigate={navigate} /> : (
        <>
          {/* Stats row */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(175px, 1fr))', gap: 14, marginBottom: 28 }}>
            {[
              { label: lang === 'ar' ? 'إجمالي الإنفاق' : 'Total Spending',      value: `${totalSpent.toLocaleString()} ${lang === 'ar' ? 'ر.س' : 'SAR'}`, color: '#f97316' },
              { label: lang === 'ar' ? 'الإنفاق العاطفي' : 'Emotional Spending', value: `${emotionalSpendingPct}%`,                                           color: '#b44dff' },
              { label: lang === 'ar' ? 'متوسط العملية' : 'Avg per Entry',       value: `${Math.round(avgAmount).toLocaleString()} ${lang === 'ar' ? 'ر.س' : 'SAR'}`, color: '#00f0ff' },
              { label: lang === 'ar' ? 'التوفير التقديري' : 'Est. Savings',      value: `${savedAmount.toLocaleString()} ${lang === 'ar' ? 'ر.س' : 'SAR'}`,   color: '#22c55e' },
            ].map((s, i) => (
              <div key={i} style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 16, padding: '18px 20px' }}>
                <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.45)', marginBottom: 8 }}>{s.label}</div>
                <div style={{ fontSize: 22, fontWeight: 800, color: 'white' }}>{s.value}</div>
              </div>
            ))}
          </div>

          {/* Charts grid */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(380px, 1fr))', gap: 22, marginBottom: 28 }}>
            {/* Spending over time */}
            <div style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 24, padding: 26 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
                <h3 style={{ fontWeight: 700, color: 'white', fontSize: 15 }}>
                  {lang === 'ar' ? 'الإنفاق عبر الزمن' : 'Spending Over Time'}
                </h3>
                <div style={{ display: 'flex', gap: 6 }}>
                  {(['mood', 'category'] as const).map(t => (
                    <button key={t} onClick={() => setChartType(t)}
                      style={{ padding: '4px 12px', borderRadius: 8, fontSize: 11, fontWeight: 600, cursor: 'pointer', border: 'none', background: chartType === t ? '#00f0ff' : 'rgba(255,255,255,0.06)', color: chartType === t ? '#03060d' : 'rgba(255,255,255,0.55)' }}>
                      {t === 'mood' ? (lang === 'ar' ? 'حسب المزاج' : 'By Mood') : (lang === 'ar' ? 'حسب الفئة' : 'By Category')}
                    </button>
                  ))}
                </div>
              </div>
              <ResponsiveContainer width="100%" height={200}>
                <BarChart data={timeData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                  <XAxis dataKey="i" stroke="rgba(255,255,255,0.25)" fontSize={11} tickFormatter={v => `#${v}`} />
                  <YAxis stroke="rgba(255,255,255,0.25)" fontSize={11} />
                  <Tooltip content={<CustomTooltip />} />
                  <Bar dataKey="amount" radius={[5, 5, 0, 0]} name={lang === 'ar' ? 'ر.س' : 'SAR'}>
                    {timeData.map((entry, i) => (
                      <Cell key={i} fill={entry.color} opacity={0.85} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
              <p style={{ fontSize: 11, color: 'rgba(255,255,255,0.35)', marginTop: 10, textAlign: 'center' }}>
                {lang === 'ar' ? 'كل بار يمثل مصروفاً، واللون يعكس حالتك المزاجية' : 'Each bar is one expense, color reflects your mood'}
              </p>
            </div>

            {/* Pie — mood or category */}
            <div style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 24, padding: 26 }}>
              <h3 style={{ fontWeight: 700, color: 'white', fontSize: 15, marginBottom: 20 }}>
                {chartType === 'mood'
                  ? (lang === 'ar' ? 'توزيع الإنفاق حسب المزاج' : 'Spending by Mood')
                  : (lang === 'ar' ? 'توزيع الإنفاق حسب الفئة' : 'Spending by Category')}
              </h3>
              {(chartType === 'mood' ? pieData : catData).length === 0 ? (
                <div style={{ height: 200, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'rgba(255,255,255,0.3)', fontSize: 13 }}>
                  {lang === 'ar' ? 'لا توجد بيانات كافية' : 'Not enough data'}
                </div>
              ) : (
                <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                  <PieChart width={150} height={150}>
                    <Pie data={chartType === 'mood' ? pieData : catData} cx={70} cy={70} innerRadius={40} outerRadius={68} paddingAngle={3} dataKey="value">
                      {(chartType === 'mood' ? pieData : catData).map((entry, i) => (
                        <Cell key={i} fill={entry.color ?? '#6b7280'} />
                      ))}
                    </Pie>
                  </PieChart>
                  <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 8 }}>
                    {(chartType === 'mood' ? pieData : catData).map((item: any, i: number) => {
                      const total = (chartType === 'mood' ? pieData : catData).reduce((s, d) => s + d.value, 0);
                      const pct = total > 0 ? Math.round((item.value / total) * 100) : 0;
                      return (
                        <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                          <div style={{ width: 10, height: 10, borderRadius: 2, background: item.color ?? '#6b7280', flexShrink: 0 }} />
                          <span style={{ flex: 1, fontSize: 12, color: 'rgba(255,255,255,0.7)' }}>{item.name}</span>
                          <span style={{ fontSize: 12, fontWeight: 700, color: item.color ?? '#fff' }}>{pct}%</span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Category bar chart */}
          {catData.length > 0 && (
            <div style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 24, padding: 26, marginBottom: 28 }}>
              <h3 style={{ fontWeight: 700, color: 'white', fontSize: 15, marginBottom: 20 }}>
                {lang === 'ar' ? 'الإنفاق حسب الفئة' : 'Spending by Category'}
              </h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                {catData.map((cat, i) => {
                  const pct = totalSpent > 0 ? Math.round((cat.value / totalSpent) * 100) : 0;
                  return (
                    <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
                      <span style={{ fontSize: 13, color: 'rgba(255,255,255,0.7)', minWidth: 100, textAlign: 'end' }}>{cat.name}</span>
                      <div style={{ flex: 1, height: 10, background: 'rgba(255,255,255,0.06)', borderRadius: 5, overflow: 'hidden' }}>
                        <div style={{ height: '100%', width: `${pct}%`, background: `linear-gradient(90deg, #00f0ff, #b44dff)`, borderRadius: 5, transition: 'width 0.8s ease' }} />
                      </div>
                      <span style={{ fontSize: 13, fontWeight: 700, color: 'white', minWidth: 80, textAlign: 'start' }}>
                        {cat.value.toLocaleString()} {lang === 'ar' ? 'ر.س' : 'SAR'}
                      </span>
                      <span style={{ fontSize: 11, color: 'rgba(255,255,255,0.4)', minWidth: 34, textAlign: 'end' }}>{pct}%</span>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* AI Insights from real data */}
          <div>
            <h2 style={{ fontWeight: 700, fontSize: 17, color: 'white', marginBottom: 18 }}>
              {lang === 'ar' ? 'رؤى الذكاء الاصطناعي — بناءً على بياناتك' : 'AI Insights — Based on Your Data'}
            </h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 16 }}>
              {/* Emotional spending insight */}
              {emotionalSpendingPct > 0 && (
                <div style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(249,115,22,0.25)', borderRadius: 20, padding: 22 }}>
                  <div style={{ display: 'flex', gap: 12, alignItems: 'flex-start', marginBottom: 10 }}>
                    <div style={{ width: 38, height: 38, borderRadius: 11, background: 'rgba(249,115,22,0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                      <AlertTriangle className="w-5 h-5" style={{ color: '#f97316' }} />
                    </div>
                    <h3 style={{ fontWeight: 700, color: 'white', fontSize: 14, lineHeight: 1.4 }}>
                      {lang === 'ar' ? `${emotionalSpendingPct}٪ من إنفاقك عاطفي` : `${emotionalSpendingPct}% of your spending is emotional`}
                    </h3>
                  </div>
                  <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.6)', lineHeight: 1.65, marginBottom: 14 }}>
                    {lang === 'ar'
                      ? `${emotionalSpendingPct > 40 ? 'إنفاقك العاطفي مرتفع. معظمه يحدث عندما تكون متوتراً أو حزيناً أو ممتعضاً.' : 'إنفاقك العاطفي في مستوى معتدل. استمر في تتبع حالتك المزاجية لتحسينه.'}`
                      : `${emotionalSpendingPct > 40 ? 'Your emotional spending is high. Most occurs when stressed, sad or bored.' : 'Your emotional spending is moderate. Keep tracking your mood to improve.'}`}
                  </p>
                  <button onClick={() => navigate('/challenges')} style={{ display: 'flex', alignItems: 'center', gap: 6, color: '#f97316', background: 'none', border: 'none', cursor: 'pointer', fontSize: 12, fontWeight: 700, padding: 0 }}>
                    {lang === 'ar' ? 'ابدأ تحدي التحكم في الاندفاع' : 'Start Impulse Control Challenge'}
                    <ArrowUpRight className="w-4 h-4" />
                  </button>
                </div>
              )}

              {/* Top trigger */}
              {topEmotionalMood && (
                <div style={{ background: 'rgba(255,255,255,0.04)', border: `1px solid ${MOOD_COLORS[topEmotionalMood] ?? '#fff'}30`, borderRadius: 20, padding: 22 }}>
                  <div style={{ display: 'flex', gap: 12, alignItems: 'flex-start', marginBottom: 10 }}>
                    <div style={{ width: 38, height: 38, borderRadius: 11, background: `${MOOD_COLORS[topEmotionalMood] ?? '#fff'}15`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                      <CloudRain className="w-5 h-5" style={{ color: MOOD_COLORS[topEmotionalMood] ?? '#fff' }} />
                    </div>
                    <h3 style={{ fontWeight: 700, color: 'white', fontSize: 14, lineHeight: 1.4 }}>
                      {lang === 'ar'
                        ? `المحفز الأكبر: ${moodLabels[topEmotionalMood]}`
                        : `Top Trigger: ${moodLabels[topEmotionalMood]}`}
                    </h3>
                  </div>
                  <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.6)', lineHeight: 1.65 }}>
                    {lang === 'ar'
                      ? 'بياناتك تُظهر أن هذه الحالة المزاجية ترتبط بأعلى إنفاق. تعرّف على هذا المحفز وتحكم فيه.'
                      : 'Your data shows this mood correlates with your highest spending. Recognize this trigger and control it.'}
                  </p>
                </div>
              )}

              {/* Biggest single expense */}
              {maxEntry && (
                <div style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(0,240,255,0.2)', borderRadius: 20, padding: 22 }}>
                  <div style={{ display: 'flex', gap: 12, alignItems: 'flex-start', marginBottom: 10 }}>
                    <div style={{ width: 38, height: 38, borderRadius: 11, background: 'rgba(0,240,255,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                      <TrendingDown className="w-5 h-5" style={{ color: '#00f0ff' }} />
                    </div>
                    <h3 style={{ fontWeight: 700, color: 'white', fontSize: 14, lineHeight: 1.4 }}>
                      {lang === 'ar'
                        ? `أكبر مصروف: ${maxEntry.amount.toLocaleString()} ر.س`
                        : `Largest expense: ${maxEntry.amount.toLocaleString()} SAR`}
                    </h3>
                  </div>
                  <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.6)', lineHeight: 1.65, marginBottom: 14 }}>
                    {lang === 'ar'
                      ? `كان في فئة "${catLabels[maxEntry.category] ?? maxEntry.category}" وأنت ${moodLabels[maxEntry.mood] ?? maxEntry.mood}. راقب هذه الفئة في المستقبل.`
                      : `It was in "${catLabels[maxEntry.category] ?? maxEntry.category}" while you felt ${moodLabels[maxEntry.mood] ?? maxEntry.mood}. Watch this category.`}
                  </p>
                  <button onClick={() => navigate('/challenges')} style={{ display: 'flex', alignItems: 'center', gap: 6, color: '#00f0ff', background: 'none', border: 'none', cursor: 'pointer', fontSize: 12, fontWeight: 700, padding: 0 }}>
                    {lang === 'ar' ? 'أنشئ تحدياً للادخار' : 'Create a saving challenge'}
                    <ArrowUpRight className="w-4 h-4" />
                  </button>
                </div>
              )}

              {/* Positive insight */}
              {entries.length >= 3 && (
                <div style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(34,197,94,0.25)', borderRadius: 20, padding: 22 }}>
                  <div style={{ display: 'flex', gap: 12, alignItems: 'flex-start', marginBottom: 10 }}>
                    <div style={{ width: 38, height: 38, borderRadius: 11, background: 'rgba(34,197,94,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                      <CheckCircle className="w-5 h-5" style={{ color: '#22c55e' }} />
                    </div>
                    <h3 style={{ fontWeight: 700, color: 'white', fontSize: 14 }}>
                      {lang === 'ar' ? `سجّلت ${entries.length} مصروفاً — رائع!` : `You logged ${entries.length} expenses — great!`}
                    </h3>
                  </div>
                  <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.6)', lineHeight: 1.65 }}>
                    {lang === 'ar'
                      ? 'كل مصروف مسجّل يمنحك وعياً أعمق بعاداتك المالية. استمر في التسجيل لنتائج أدق.'
                      : 'Every logged expense gives you deeper insight into your financial habits. Keep logging for more accurate results.'}
                  </p>
                </div>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
