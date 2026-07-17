import React, { useState } from 'react';
import { useLanguage } from '@/contexts/language-context';
import { BrainCircuit, TrendingDown, TrendingUp, Zap, CloudRain, Coffee, Smile, AlertTriangle, CheckCircle, ArrowUpRight } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, BarChart, Bar } from 'recharts';

const spendingData = [
  { day: 'Sat', happy: 120, stressed: 40, bored: 20, neutral: 60 },
  { day: 'Sun', happy: 80, stressed: 180, bored: 90, neutral: 40 },
  { day: 'Mon', happy: 60, stressed: 60, bored: 140, neutral: 80 },
  { day: 'Tue', happy: 150, stressed: 30, bored: 30, neutral: 90 },
  { day: 'Wed', happy: 90, stressed: 200, bored: 50, neutral: 110 },
  { day: 'Thu', happy: 110, stressed: 70, bored: 180, neutral: 70 },
  { day: 'Fri', happy: 200, stressed: 40, bored: 80, neutral: 130 },
];

const triggerData = [
  { name: 'Stress', nameAr: 'التوتر', value: 38, color: '#f97316' },
  { name: 'Boredom', nameAr: 'الملل', value: 28, color: '#6b7280' },
  { name: 'Impulse', nameAr: 'الاندفاع', value: 22, color: '#b44dff' },
  { name: 'Happy', nameAr: 'السعادة', value: 12, color: '#00f0ff' },
];

const monthlyData = [
  { month: 'Oct', value: 2400 },
  { month: 'Nov', value: 2100 },
  { month: 'Dec', value: 2800 },
  { month: 'Jan', value: 2200 },
  { month: 'Feb', value: 1950 },
  { month: 'Mar', value: 1840 },
];

export default function Insights() {
  const { lang } = useLanguage();
  const [activeChart, setActiveChart] = useState<'weekly' | 'monthly'>('weekly');

  const insights = lang === 'ar' ? [
    {
      type: 'warning',
      icon: AlertTriangle, color: '#f97316',
      title: 'ارتفاع في الإنفاق أيام الأربعاء',
      desc: 'لاحظنا أن إنفاقك يرتفع بنسبة ٦٢٪ أيام الأربعاء مقارنة ببقية الأسبوع. يتزامن ذلك مع ارتفاع مستوى التوتر لديك في منتصف الأسبوع.',
      action: 'تفعيل تنبيه يوم الأربعاء',
    },
    {
      type: 'positive',
      icon: CheckCircle, color: '#22c55e',
      title: 'تحسن ملحوظ في الإنفاق العاطفي',
      desc: 'انخفض إنفاقك العاطفي من ٥٢٪ إلى ٣٨٪ خلال الشهر الماضي. استمرارك في تسجيل حالتك المزاجية يساعدك على الوعي المالي.',
      action: 'مشاهدة التفاصيل',
    },
    {
      type: 'warning',
      icon: Zap, color: '#b44dff',
      title: 'نمط الإنفاق الاندفاعي في المساء',
      desc: '٧٢٪ من مشترياتك الاندفاعية تحدث بعد الساعة ١٠ مساءً. ننصح بتفعيل قاعدة "الانتظار ٢٤ ساعة" للمشتريات الكبيرة في هذه الأوقات.',
      action: 'إعداد قاعدة الانتظار',
    },
    {
      type: 'info',
      icon: TrendingDown, color: '#00f0ff',
      title: 'توقع ارتفاع إنفاق موسمي',
      desc: 'بناءً على سلوكك العام الماضي، يُتوقع ارتفاع إنفاقك في رمضان القادم بنسبة ٤٠٪. ابدأ التخطيط الآن لتجنب الإنفاق المفرط.',
      action: 'إنشاء خطة رمضان',
    },
  ] : [
    {
      type: 'warning',
      icon: AlertTriangle, color: '#f97316',
      title: 'Wednesday Spending Spike',
      desc: 'Your spending spikes 62% on Wednesdays vs other days. This correlates with higher stress levels mid-week.',
      action: 'Enable Wednesday Alert',
    },
    {
      type: 'positive',
      icon: CheckCircle, color: '#22c55e',
      title: 'Emotional Spending Improving',
      desc: 'Your emotional spending dropped from 52% to 38% last month. Logging your mood consistently is working.',
      action: 'View Details',
    },
    {
      type: 'warning',
      icon: Zap, color: '#b44dff',
      title: 'Late-Night Impulse Pattern',
      desc: '72% of your impulse purchases happen after 10 PM. We recommend enabling a "24-hour wait rule" for large purchases at night.',
      action: 'Set Wait Rule',
    },
    {
      type: 'info',
      icon: TrendingDown, color: '#00f0ff',
      title: 'Seasonal Spending Forecast',
      desc: 'Based on last year, you\'re expected to spend 40% more during Ramadan. Start planning now to avoid overspending.',
      action: 'Create Ramadan Plan',
    },
  ];

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div style={{ background: '#0d1117', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 12, padding: '12px 16px' }}>
          <p style={{ color: 'white', fontWeight: 700, marginBottom: 6, fontSize: 13 }}>{label}</p>
          {payload.map((p: any, i: number) => (
            <p key={i} style={{ color: p.color, fontSize: 12 }}>{p.name}: {p.value} SAR</p>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div style={{ minHeight: '100vh', padding: '100px 24px 60px', maxWidth: 1200, margin: '0 auto', position: 'relative', zIndex: 1 }}>
      <div style={{ marginBottom: 40 }}>
        <h1 style={{ fontSize: 'clamp(1.6rem, 3vw, 2.4rem)', fontWeight: 800, color: 'white', marginBottom: 8 }}>
          {lang === 'ar' ? 'تحليل الإنفاق العاطفي' : 'Emotional Spending Analysis'}
        </h1>
        <p style={{ color: 'rgba(255,255,255,0.55)', fontSize: 15 }}>
          {lang === 'ar' ? 'فهم العلاقة بين مشاعرك وقراراتك المالية' : 'Understanding the link between your emotions and financial decisions'}
        </p>
      </div>

      {/* Summary Stats */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 16, marginBottom: 32 }}>
        {[
          { label: lang === 'ar' ? 'الإنفاق العاطفي' : 'Emotional Spending', value: '38%', sub: lang === 'ar' ? '↓ من ٥٢٪' : '↓ from 52%', color: '#22c55e' },
          { label: lang === 'ar' ? 'المحفز الرئيسي' : 'Top Trigger', value: lang === 'ar' ? 'توتر' : 'Stress', sub: '38%', color: '#f97316' },
          { label: lang === 'ar' ? 'متوسط الإنفاق اليومي' : 'Avg Daily Spend', value: lang === 'ar' ? '٦١ ر.س' : '61 SAR', sub: lang === 'ar' ? '↓ ١٢٪' : '↓ 12%', color: '#00f0ff' },
          { label: lang === 'ar' ? 'توفير هذا الشهر' : 'Saved This Month', value: lang === 'ar' ? '٣٦٠ ر.س' : '360 SAR', sub: lang === 'ar' ? 'بفضل التحديات' : 'via challenges', color: '#b44dff' },
        ].map((s, i) => (
          <div key={i} style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 16, padding: 20 }}>
            <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.5)', marginBottom: 8 }}>{s.label}</div>
            <div style={{ fontSize: 26, fontWeight: 800, color: 'white', marginBottom: 4 }}>{s.value}</div>
            <div style={{ fontSize: 12, color: s.color }}>{s.sub}</div>
          </div>
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: 24, marginBottom: 32 }}>
        {/* Spending by Mood Chart */}
        <div style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 24, padding: 28 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
            <h3 style={{ fontWeight: 700, color: 'white', fontSize: 16 }}>
              {lang === 'ar' ? 'الإنفاق حسب الحالة المزاجية' : 'Spending by Mood'}
            </h3>
            <div style={{ display: 'flex', gap: 8 }}>
              {(['weekly', 'monthly'] as const).map(t => (
                <button key={t} onClick={() => setActiveChart(t)}
                  style={{ padding: '4px 12px', borderRadius: 8, fontSize: 12, fontWeight: 600, cursor: 'pointer', background: activeChart === t ? '#00f0ff' : 'rgba(255,255,255,0.06)', color: activeChart === t ? '#03060d' : 'rgba(255,255,255,0.6)', border: 'none' }}>
                  {t === 'weekly' ? (lang === 'ar' ? 'أسبوعي' : 'Weekly') : (lang === 'ar' ? 'شهري' : 'Monthly')}
                </button>
              ))}
            </div>
          </div>
          <ResponsiveContainer width="100%" height={220}>
            {activeChart === 'weekly' ? (
              <LineChart data={spendingData}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.06)" />
                <XAxis dataKey="day" stroke="rgba(255,255,255,0.3)" fontSize={12} />
                <YAxis stroke="rgba(255,255,255,0.3)" fontSize={12} />
                <Tooltip content={<CustomTooltip />} />
                <Line type="monotone" dataKey="stressed" stroke="#f97316" strokeWidth={2} dot={false} name="Stressed" />
                <Line type="monotone" dataKey="bored" stroke="#6b7280" strokeWidth={2} dot={false} name="Bored" />
                <Line type="monotone" dataKey="happy" stroke="#00f0ff" strokeWidth={2} dot={false} name="Happy" />
                <Line type="monotone" dataKey="neutral" stroke="#fbbf24" strokeWidth={2} dot={false} name="Neutral" />
              </LineChart>
            ) : (
              <BarChart data={monthlyData}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.06)" />
                <XAxis dataKey="month" stroke="rgba(255,255,255,0.3)" fontSize={12} />
                <YAxis stroke="rgba(255,255,255,0.3)" fontSize={12} />
                <Tooltip content={<CustomTooltip />} />
                <Bar dataKey="value" fill="#00f0ff" radius={[6, 6, 0, 0]} opacity={0.8} name="SAR" />
              </BarChart>
            )}
          </ResponsiveContainer>
          <div style={{ display: 'flex', gap: 16, marginTop: 16, flexWrap: 'wrap' }}>
            {[{ c: '#f97316', l: lang === 'ar' ? 'توتر' : 'Stressed' }, { c: '#6b7280', l: lang === 'ar' ? 'ملل' : 'Bored' }, { c: '#00f0ff', l: lang === 'ar' ? 'سعيد' : 'Happy' }, { c: '#fbbf24', l: lang === 'ar' ? 'محايد' : 'Neutral' }].map((item, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 12, color: 'rgba(255,255,255,0.6)' }}>
                <div style={{ width: 10, height: 10, borderRadius: '50%', background: item.c }} />
                {item.l}
              </div>
            ))}
          </div>
        </div>

        {/* Trigger Breakdown */}
        <div style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 24, padding: 28 }}>
          <h3 style={{ fontWeight: 700, color: 'white', fontSize: 16, marginBottom: 24 }}>
            {lang === 'ar' ? 'توزيع المحفزات العاطفية' : 'Emotional Trigger Breakdown'}
          </h3>
          <div style={{ display: 'flex', alignItems: 'center', gap: 24 }}>
            <PieChart width={160} height={160}>
              <Pie data={triggerData} cx={75} cy={75} innerRadius={45} outerRadius={75} paddingAngle={3} dataKey="value">
                {triggerData.map((entry, index) => (
                  <Cell key={index} fill={entry.color} />
                ))}
              </Pie>
            </PieChart>
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 10 }}>
              {triggerData.map((item, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <div style={{ width: 12, height: 12, borderRadius: 3, background: item.color, flexShrink: 0 }} />
                  <span style={{ flex: 1, fontSize: 13, color: 'rgba(255,255,255,0.75)' }}>{lang === 'ar' ? item.nameAr : item.name}</span>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <div style={{ width: 60, height: 6, background: 'rgba(255,255,255,0.08)', borderRadius: 3, overflow: 'hidden' }}>
                      <div style={{ height: '100%', width: `${item.value}%`, background: item.color, borderRadius: 3 }} />
                    </div>
                    <span style={{ fontSize: 13, fontWeight: 700, color: item.color, minWidth: 30 }}>{item.value}%</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Top trigger detail */}
          <div style={{ marginTop: 24, background: 'rgba(249,115,22,0.08)', border: '1px solid rgba(249,115,22,0.2)', borderRadius: 14, padding: 16 }}>
            <div style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
              <CloudRain className="w-5 h-5" style={{ color: '#f97316', flexShrink: 0, marginTop: 2 }} />
              <div>
                <div style={{ fontWeight: 700, color: '#f97316', fontSize: 13, marginBottom: 4 }}>
                  {lang === 'ar' ? 'التوتر: المحفز الأكثر تكلفة' : 'Stress: Your Costliest Trigger'}
                </div>
                <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.6)', lineHeight: 1.5 }}>
                  {lang === 'ar'
                    ? 'إنفاقك تحت التوتر أعلى بـ ٢.٤× من متوسطك العادي. تعلّم التعرف على علامات التوتر قبل الشراء.'
                    : 'Your stress spending is 2.4× your normal average. Learn to recognize stress triggers before purchasing.'}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* AI Insights Cards */}
      <div>
        <h2 style={{ fontWeight: 700, fontSize: 18, color: 'white', marginBottom: 20 }}>
          {lang === 'ar' ? 'رؤى الذكاء الاصطناعي المخصصة' : 'Personalized AI Insights'}
        </h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 16 }}>
          {insights.map((insight, i) => (
            <div key={i} style={{ background: 'rgba(255,255,255,0.04)', border: `1px solid ${insight.color}30`, borderRadius: 20, padding: 24 }}>
              <div style={{ display: 'flex', gap: 12, alignItems: 'flex-start', marginBottom: 12 }}>
                <div style={{ width: 40, height: 40, borderRadius: 12, background: `${insight.color}15`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <insight.icon className="w-5 h-5" style={{ color: insight.color }} />
                </div>
                <h3 style={{ fontWeight: 700, color: 'white', fontSize: 14, lineHeight: 1.4 }}>{insight.title}</h3>
              </div>
              <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.6)', lineHeight: 1.65, marginBottom: 16 }}>{insight.desc}</p>
              <button style={{ display: 'flex', alignItems: 'center', gap: 6, color: insight.color, background: 'none', border: 'none', cursor: 'pointer', fontSize: 13, fontWeight: 600, padding: 0 }}>
                {insight.action}
                <ArrowUpRight className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
