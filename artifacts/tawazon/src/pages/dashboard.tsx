import React, { useState } from 'react';
import { useLanguage } from '@/contexts/language-context';
import { BrainCircuit, TrendingDown, Trophy, Target, Zap, CloudRain, Coffee, Smile, Meh, Frown, ArrowRight, ArrowLeft, BarChart2, Shield } from 'lucide-react';
import { useLocation } from 'wouter';

const MOODS_AR = [
  { id: 'happy', label: 'سعيد', icon: Smile, color: '#00f0ff', desc: 'مزاجي ممتاز اليوم' },
  { id: 'neutral', label: 'محايد', icon: Meh, color: '#fbbf24', desc: 'أشعر بشيء من الحياد' },
  { id: 'stressed', label: 'متوتر', icon: Zap, color: '#f97316', desc: 'أشعر بضغط وتوتر' },
  { id: 'sad', label: 'حزين', icon: Frown, color: '#b44dff', desc: 'يوم صعب نوعاً ما' },
  { id: 'bored', label: 'بored', icon: Coffee, color: '#6b7280', desc: 'أشعر بالملل' },
];
const MOODS_EN = [
  { id: 'happy', label: 'Happy', icon: Smile, color: '#00f0ff', desc: 'Feeling great today!' },
  { id: 'neutral', label: 'Neutral', icon: Meh, color: '#fbbf24', desc: 'Just okay' },
  { id: 'stressed', label: 'Stressed', icon: Zap, color: '#f97316', desc: 'Feeling pressure' },
  { id: 'sad', label: 'Sad', icon: Frown, color: '#b44dff', desc: 'Having a tough day' },
  { id: 'bored', label: 'Bored', icon: Coffee, color: '#6b7280', desc: 'Nothing exciting' },
];

const RECENT_SPENDING_AR = [
  { cat: 'طعام ومشروبات', amount: '٨٥ ر.س', mood: 'متوتر', trigger: 'توتر', icon: CloudRain, color: '#f97316' },
  { cat: 'تسوق إلكتروني', amount: '٢٤٠ ر.س', mood: 'بored', trigger: 'ملل', icon: Coffee, color: '#6b7280' },
  { cat: 'مطاعم', amount: '١٢٠ ر.س', mood: 'سعيد', trigger: 'احتفال', icon: Smile, color: '#00f0ff' },
  { cat: 'ترفيه', amount: '٦٠ ر.س', mood: 'محايد', trigger: 'تسلية', icon: Meh, color: '#fbbf24' },
];
const RECENT_SPENDING_EN = [
  { cat: 'Food & Drinks', amount: '85 SAR', mood: 'Stressed', trigger: 'stress', icon: CloudRain, color: '#f97316' },
  { cat: 'Online Shopping', amount: '240 SAR', mood: 'Bored', trigger: 'boredom', icon: Coffee, color: '#6b7280' },
  { cat: 'Restaurants', amount: '120 SAR', mood: 'Happy', trigger: 'celebration', icon: Smile, color: '#00f0ff' },
  { cat: 'Entertainment', amount: '60 SAR', mood: 'Neutral', trigger: 'leisure', icon: Meh, color: '#fbbf24' },
];

const insightMessages: Record<string, { ar: string; en: string }> = {
  stressed: {
    ar: 'لاحظنا أن إنفاقك يرتفع بنسبة ٤٥٪ عندما تكون متوتراً. هل تريد تفعيل وضع "التوقف والتفكير"؟',
    en: 'We noticed your spending spikes 45% when you\'re stressed. Want to enable "Pause & Reflect" mode?',
  },
  bored: {
    ar: 'الملل يدفعك للتسوق العشوائي. نقترح عليك تحديًا بديلاً: ١٥ دقيقة نشاطاً مفيداً بدلاً من التسوق.',
    en: 'Boredom is pushing you to impulse shopping. We suggest an alternative challenge: 15 min activity instead.',
  },
  happy: {
    ar: 'رائع! المزاج الجيد يجعل قراراتك المالية أكثر حكمة. استمر في هذه الطاقة الإيجابية!',
    en: 'Great! A positive mood leads to wiser financial decisions. Keep that positive energy going!',
  },
  neutral: {
    ar: 'أنت في حالة محايدة — وقت مثالي لمراجعة ميزانيتك بموضوعية وتخطيط الأسبوع القادم.',
    en: 'You\'re in a neutral state — the perfect time to review your budget objectively and plan ahead.',
  },
  sad: {
    ar: 'نحن هنا معك. الإنفاق لن يرفع معنوياتك على المدى البعيد. جرّب أحد تحدياتنا المجانية بدلاً من ذلك.',
    en: 'We\'re here for you. Spending won\'t lift your spirits long-term. Try one of our free challenges instead.',
  },
};

export default function Dashboard() {
  const { lang, dir } = useLanguage();
  const [, navigate] = useLocation();
  const [selectedMood, setSelectedMood] = useState<string | null>(null);
  const [moodLogged, setMoodLogged] = useState(false);
  const moods = lang === 'ar' ? MOODS_AR : MOODS_EN;
  const spending = lang === 'ar' ? RECENT_SPENDING_AR : RECENT_SPENDING_EN;
  const ArrowIcon = dir === 'rtl' ? ArrowLeft : ArrowRight;

  const handleLogMood = () => {
    if (selectedMood) setMoodLogged(true);
  };

  const xp = 1200;
  const maxXp = 2000;
  const xpPct = (xp / maxXp) * 100;

  return (
    <div style={{ minHeight: '100vh', padding: '100px 24px 60px', maxWidth: 1200, margin: '0 auto', position: 'relative', zIndex: 1 }}>
      {/* Header */}
      <div style={{ marginBottom: 40 }}>
        <h1 style={{ fontSize: 'clamp(1.6rem, 3vw, 2.4rem)', fontWeight: 800, color: 'white', marginBottom: 8 }}>
          {lang === 'ar' ? 'مرحباً بك في توازن' : 'Welcome to Tawazon'}
        </h1>
        <p style={{ color: 'rgba(255,255,255,0.55)', fontSize: 15 }}>
          {lang === 'ar' ? 'كيف تشعر اليوم؟ سجّل حالتك المزاجية لنبدأ التحليل' : 'How are you feeling today? Log your mood to start your analysis'}
        </p>
      </div>

      {/* XP Bar */}
      <div style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 20, padding: '20px 24px', marginBottom: 24, display: 'flex', alignItems: 'center', gap: 20 }}>
        <div style={{ width: 48, height: 48, borderRadius: '50%', background: 'linear-gradient(135deg, #00f0ff, #b44dff)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
          <Trophy className="w-6 h-6" style={{ color: 'white' }} />
        </div>
        <div style={{ flex: 1 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
            <span style={{ fontWeight: 700, color: 'white', fontSize: 14 }}>
              {lang === 'ar' ? 'المستوى ٤: التوازن العاطفي' : 'Level 4: Emotional Balance'}
            </span>
            <span style={{ color: '#00f0ff', fontWeight: 700, fontSize: 13 }}>
              {lang === 'ar' ? `${xp.toLocaleString('ar-EG')} / ${maxXp.toLocaleString('ar-EG')} نقطة` : `${xp} / ${maxXp} XP`}
            </span>
          </div>
          <div style={{ height: 8, background: 'rgba(255,255,255,0.08)', borderRadius: 4, overflow: 'hidden' }}>
            <div style={{ height: '100%', width: `${xpPct}%`, background: 'linear-gradient(90deg, #00f0ff, #b44dff)', borderRadius: 4, boxShadow: '0 0 12px rgba(0,240,255,0.5)' }} />
          </div>
          <div style={{ marginTop: 6, fontSize: 12, color: 'rgba(255,255,255,0.45)' }}>
            {lang === 'ar' ? '🔥 ٧ أيام متتالية • ٨٠٠ نقطة للمستوى التالي' : '🔥 7-day streak • 800 XP to next level'}
          </div>
        </div>
      </div>

      {/* Stats Row */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 16, marginBottom: 32 }}>
        {[
          { label: lang === 'ar' ? 'إجمالي الإنفاق هذا الشهر' : 'Total Spending This Month', value: lang === 'ar' ? '١,٨٤٠ ر.س' : '1,840 SAR', icon: TrendingDown, color: '#f97316', change: lang === 'ar' ? '-١٢٪ عن الشهر الماضي' : '-12% vs last month' },
          { label: lang === 'ar' ? 'نسبة الإنفاق العاطفي' : 'Emotional Spending Rate', value: '38%', icon: BrainCircuit, color: '#b44dff', change: lang === 'ar' ? 'انخفض من ٥٢٪' : 'Down from 52%' },
          { label: lang === 'ar' ? 'التحديات المكتملة' : 'Completed Challenges', value: '7', icon: Trophy, color: '#00f0ff', change: lang === 'ar' ? 'هذا الشهر' : 'This month' },
          { label: lang === 'ar' ? 'النقاط المكتسبة' : 'Points Earned', value: '1,200', icon: Target, color: '#22c55e', change: lang === 'ar' ? 'من ٢٠٠٠' : 'of 2000 total' },
        ].map((stat, i) => (
          <div key={i} style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 16, padding: 20 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 12 }}>
              <span style={{ fontSize: 12, color: 'rgba(255,255,255,0.5)', lineHeight: 1.4, maxWidth: 120 }}>{stat.label}</span>
              <div style={{ width: 36, height: 36, borderRadius: 10, background: `${stat.color}18`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <stat.icon className="w-4 h-4" style={{ color: stat.color }} />
              </div>
            </div>
            <div style={{ fontSize: 22, fontWeight: 800, color: 'white', marginBottom: 4 }}>{stat.value}</div>
            <div style={{ fontSize: 11, color: stat.color }}>{stat.change}</div>
          </div>
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: 24 }}>
        {/* Mood Check-In */}
        <div style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 24, padding: 28 }}>
          <h2 style={{ fontWeight: 700, fontSize: 17, color: 'white', marginBottom: 6 }}>
            {lang === 'ar' ? 'سجّل حالتك المزاجية' : 'Log Your Mood'}
          </h2>
          <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.5)', marginBottom: 24 }}>
            {lang === 'ar' ? 'كيف تشعر الآن قبل إنفاق أي مبلغ؟' : 'How are you feeling right now before any spending?'}
          </p>

          {!moodLogged ? (
            <>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 10, marginBottom: 20 }}>
                {moods.map((mood) => (
                  <button
                    key={mood.id}
                    onClick={() => setSelectedMood(mood.id)}
                    style={{
                      display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6,
                      padding: '12px 6px', borderRadius: 14,
                      background: selectedMood === mood.id ? `${mood.color}22` : 'rgba(255,255,255,0.03)',
                      border: selectedMood === mood.id ? `2px solid ${mood.color}` : '2px solid transparent',
                      cursor: 'pointer', transition: 'all 0.2s'
                    }}
                  >
                    <mood.icon className="w-6 h-6" style={{ color: mood.color }} />
                    <span style={{ fontSize: 11, color: 'rgba(255,255,255,0.7)', fontWeight: selectedMood === mood.id ? 700 : 400 }}>{mood.label}</span>
                  </button>
                ))}
              </div>
              {selectedMood && (
                <div style={{ background: 'rgba(255,255,255,0.04)', borderRadius: 12, padding: '12px 16px', marginBottom: 16, fontSize: 13, color: 'rgba(255,255,255,0.7)' }}>
                  {moods.find(m => m.id === selectedMood)?.desc}
                </div>
              )}
              <button
                onClick={handleLogMood}
                disabled={!selectedMood}
                style={{ width: '100%', background: selectedMood ? '#00f0ff' : 'rgba(255,255,255,0.06)', color: selectedMood ? '#03060d' : 'rgba(255,255,255,0.3)', border: 'none', borderRadius: 12, padding: '12px 20px', fontWeight: 700, fontSize: 14, cursor: selectedMood ? 'pointer' : 'not-allowed', transition: 'all 0.2s' }}
              >
                {lang === 'ar' ? 'تسجيل الحالة المزاجية' : 'Log Mood'}
              </button>
            </>
          ) : (
            <div>
              <div style={{ background: 'rgba(0,240,255,0.08)', border: '1px solid rgba(0,240,255,0.2)', borderRadius: 16, padding: 20, marginBottom: 16 }}>
                <div style={{ fontWeight: 700, color: '#00f0ff', marginBottom: 8, fontSize: 14 }}>
                  {lang === 'ar' ? 'رؤية الذكاء الاصطناعي' : 'AI Insight'}
                </div>
                <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.75)', lineHeight: 1.6 }}>
                  {insightMessages[selectedMood]?.[lang] || insightMessages.neutral[lang]}
                </p>
              </div>
              <div style={{ display: 'flex', gap: 8 }}>
                <button
                  onClick={() => { setMoodLogged(false); setSelectedMood(null); }}
                  style={{ flex: 1, background: 'rgba(255,255,255,0.06)', color: 'rgba(255,255,255,0.7)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 10, padding: '10px', cursor: 'pointer', fontSize: 13 }}
                >
                  {lang === 'ar' ? 'تغيير الحالة' : 'Change Mood'}
                </button>
                <button
                  onClick={() => navigate('/challenges')}
                  style={{ flex: 1, background: 'linear-gradient(135deg, #00f0ff, #b44dff)', color: 'white', border: 'none', borderRadius: 10, padding: '10px', cursor: 'pointer', fontSize: 13, fontWeight: 700 }}
                >
                  {lang === 'ar' ? 'ابدأ تحدياً' : 'Start Challenge'}
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Recent Spending */}
        <div style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 24, padding: 28 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
            <h2 style={{ fontWeight: 700, fontSize: 17, color: 'white' }}>
              {lang === 'ar' ? 'الإنفاق الأخير' : 'Recent Spending'}
            </h2>
            <button
              onClick={() => navigate('/insights')}
              style={{ display: 'flex', alignItems: 'center', gap: 6, color: '#00f0ff', background: 'none', border: 'none', cursor: 'pointer', fontSize: 13, fontWeight: 600 }}
            >
              {lang === 'ar' ? 'التحليل الكامل' : 'Full Analysis'}
              <ArrowIcon className="w-4 h-4" />
            </button>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {spending.map((item, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 14, padding: '12px 16px', background: 'rgba(255,255,255,0.03)', borderRadius: 14, border: '1px solid rgba(255,255,255,0.06)' }}>
                <div style={{ width: 40, height: 40, borderRadius: 12, background: `${item.color}18`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <item.icon className="w-5 h-5" style={{ color: item.color }} />
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 600, fontSize: 14, color: 'white', marginBottom: 2 }}>{item.cat}</div>
                  <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.45)' }}>
                    {lang === 'ar' ? `المشاعر: ${item.mood}` : `Emotion: ${item.mood}`}
                  </div>
                </div>
                <div style={{ textAlign: 'end' }}>
                  <div style={{ fontWeight: 700, color: 'white', fontSize: 14 }}>{item.amount}</div>
                  <div style={{ fontSize: 11, background: `${item.color}22`, color: item.color, padding: '2px 8px', borderRadius: 6, marginTop: 2 }}>
                    {item.trigger}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 24, padding: 28 }}>
          <h2 style={{ fontWeight: 700, fontSize: 17, color: 'white', marginBottom: 20 }}>
            {lang === 'ar' ? 'الإجراءات السريعة' : 'Quick Actions'}
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {[
              { icon: BarChart2, label: lang === 'ar' ? 'عرض تحليل الإنفاق' : 'View Spending Analysis', color: '#00f0ff', route: '/insights' },
              { icon: Trophy, label: lang === 'ar' ? 'التحديات النشطة (٣)' : 'Active Challenges (3)', color: '#b44dff', route: '/challenges' },
              { icon: Shield, label: lang === 'ar' ? 'نظام حماية الميزانية' : 'Budget Protection Mode', color: '#22c55e', route: '/insights' },
              { icon: BrainCircuit, label: lang === 'ar' ? 'رؤى الذكاء الاصطناعي' : 'AI Insights Report', color: '#fbbf24', route: '/insights' },
            ].map((action, i) => (
              <button
                key={i}
                onClick={() => navigate(action.route)}
                style={{ display: 'flex', alignItems: 'center', gap: 14, padding: '14px 16px', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: 14, cursor: 'pointer', textAlign: 'start', width: '100%', transition: 'background 0.2s' }}
              >
                <div style={{ width: 40, height: 40, borderRadius: 12, background: `${action.color}15`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <action.icon className="w-5 h-5" style={{ color: action.color }} />
                </div>
                <span style={{ color: 'rgba(255,255,255,0.85)', fontWeight: 600, fontSize: 14, flex: 1 }}>{action.label}</span>
                <ArrowIcon className="w-4 h-4" style={{ color: 'rgba(255,255,255,0.3)', flexShrink: 0 }} />
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
