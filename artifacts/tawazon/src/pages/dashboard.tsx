import React, { useState } from 'react';
import { useLanguage } from '@/contexts/language-context';
import { useUserData } from '@/contexts/user-data-context';
import {
  BrainCircuit, TrendingDown, Trophy, Target, Zap, CloudRain, Coffee,
  Smile, Meh, Frown, ArrowLeft, ArrowRight, BarChart2, Shield,
  Plus, Trash2, X, ShoppingBag, Car, Utensils, Gamepad2, BookOpen, MoreHorizontal
} from 'lucide-react';
import { useLocation } from 'wouter';

/* ─── MOODS ─────────────────────────────────────────────────────────────── */
const MOODS = {
  ar: [
    { id: 'happy',    label: 'سعيد',   icon: Smile,   color: '#00f0ff', aiTip: 'مزاجك الجيد يساعدك على قرارات مالية أفضل. استمر!' },
    { id: 'neutral',  label: 'محايد',  icon: Meh,     color: '#fbbf24', aiTip: 'وقت مثالي لمراجعة ميزانيتك بموضوعية.' },
    { id: 'stressed', label: 'متوتر',  icon: Zap,     color: '#f97316', aiTip: 'تحذير: إنفاقك يرتفع ٤٥٪ أثناء التوتر. فكّر قبل الشراء!' },
    { id: 'sad',      label: 'حزين',   icon: Frown,   color: '#b44dff', aiTip: 'الإنفاق لن يرفع معنوياتك. جرّب أحد تحدياتنا بدلاً من ذلك.' },
    { id: 'bored',    label: 'ممل',    icon: Coffee,  color: '#6b7280', aiTip: 'الملل يدفع للتسوق الاندفاعي. جرّب نشاطاً مجانياً بدلاً من الشراء.' },
  ],
  en: [
    { id: 'happy',    label: 'Happy',    icon: Smile,   color: '#00f0ff', aiTip: 'Good mood = better decisions. Keep it up!' },
    { id: 'neutral',  label: 'Neutral',  icon: Meh,     color: '#fbbf24', aiTip: 'Perfect time to review your budget objectively.' },
    { id: 'stressed', label: 'Stressed', icon: Zap,     color: '#f97316', aiTip: 'Warning: spending spikes 45% when stressed. Think before buying!' },
    { id: 'sad',      label: 'Sad',      icon: Frown,   color: '#b44dff', aiTip: 'Spending won\'t lift your mood. Try a challenge instead.' },
    { id: 'bored',    label: 'Bored',    icon: Coffee,  color: '#6b7280', aiTip: 'Boredom triggers impulse buying. Try a free activity instead.' },
  ],
};

/* ─── CATEGORIES ────────────────────────────────────────────────────────── */
const CATEGORIES = {
  ar: [
    { id: 'food',       label: 'طعام ومشروبات', icon: Utensils,    color: '#f97316' },
    { id: 'shopping',   label: 'تسوق',          icon: ShoppingBag, color: '#b44dff' },
    { id: 'transport',  label: 'مواصلات',       icon: Car,         color: '#00f0ff' },
    { id: 'entertainment', label: 'ترفيه',      icon: Gamepad2,    color: '#fbbf24' },
    { id: 'education',  label: 'تعليم',         icon: BookOpen,    color: '#22c55e' },
    { id: 'other',      label: 'أخرى',          icon: MoreHorizontal, color: '#6b7280' },
  ],
  en: [
    { id: 'food',       label: 'Food & Drinks',  icon: Utensils,    color: '#f97316' },
    { id: 'shopping',   label: 'Shopping',       icon: ShoppingBag, color: '#b44dff' },
    { id: 'transport',  label: 'Transport',      icon: Car,         color: '#00f0ff' },
    { id: 'entertainment', label: 'Entertainment', icon: Gamepad2,  color: '#fbbf24' },
    { id: 'education',  label: 'Education',      icon: BookOpen,    color: '#22c55e' },
    { id: 'other',      label: 'Other',          icon: MoreHorizontal, color: '#6b7280' },
  ],
};

/* ─── HELPERS ───────────────────────────────────────────────────────────── */
function fmtDate(iso: string, lang: string) {
  const d = new Date(iso);
  return d.toLocaleDateString(lang === 'ar' ? 'ar-SA' : 'en-SA', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' });
}

/* ─── ADD EXPENSE MODAL ─────────────────────────────────────────────────── */
function AddExpenseModal({ onClose, lang }: { onClose: () => void; lang: string }) {
  const { addEntry } = useUserData();
  const moods = MOODS[lang as 'ar' | 'en'];
  const cats  = CATEGORIES[lang as 'ar' | 'en'];
  const [amount,   setAmount]   = useState('');
  const [category, setCategory] = useState('');
  const [mood,     setMood]     = useState('');
  const [note,     setNote]     = useState('');
  const [error,    setError]    = useState('');

  const selectedMoodObj = moods.find(m => m.id === mood);

  const handleSubmit = () => {
    const val = parseFloat(amount.replace(/,/g, '.'));
    if (!val || val <= 0) { setError(lang === 'ar' ? 'أدخل مبلغاً صحيحاً' : 'Enter a valid amount'); return; }
    if (!category)        { setError(lang === 'ar' ? 'اختر الفئة'         : 'Choose a category');    return; }
    if (!mood)            { setError(lang === 'ar' ? 'اختر حالتك المزاجية' : 'Choose your mood');     return; }
    addEntry({ amount: val, category, mood, note });
    onClose();
  };

  const labelStyle: React.CSSProperties = { fontSize: 13, fontWeight: 600, color: 'rgba(255,255,255,0.7)', marginBottom: 10, display: 'block' };
  const inputStyle: React.CSSProperties = { width: '100%', background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.12)', borderRadius: 12, padding: '12px 16px', color: 'white', fontSize: 15, outline: 'none', boxSizing: 'border-box' };

  return (
    /* Backdrop */
    <div
      onClick={onClose}
      style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.7)', zIndex: 200, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 20 }}
    >
      <div
        onClick={e => e.stopPropagation()}
        style={{ background: '#0d1117', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 28, padding: 32, width: '100%', maxWidth: 480, maxHeight: '90vh', overflowY: 'auto', position: 'relative' }}
      >
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 28 }}>
          <div>
            <h2 style={{ fontWeight: 800, fontSize: 20, color: 'white', marginBottom: 4 }}>
              {lang === 'ar' ? 'تسجيل مصروف جديد' : 'Log New Expense'}
            </h2>
            <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.45)' }}>
              {lang === 'ar' ? 'أدخل تفاصيل المصروف وحالتك المزاجية' : 'Enter expense details and your current mood'}
            </p>
          </div>
          <button onClick={onClose} style={{ width: 36, height: 36, borderRadius: '50%', background: 'rgba(255,255,255,0.07)', border: 'none', color: 'rgba(255,255,255,0.6)', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Amount */}
        <div style={{ marginBottom: 22 }}>
          <label style={labelStyle}>{lang === 'ar' ? 'المبلغ (ريال سعودي)' : 'Amount (SAR)'}</label>
          <input
            type="number"
            min="0"
            placeholder={lang === 'ar' ? '٠.٠٠' : '0.00'}
            value={amount}
            onChange={e => setAmount(e.target.value)}
            style={{ ...inputStyle, fontSize: 22, fontWeight: 700 }}
            dir="ltr"
          />
        </div>

        {/* Category */}
        <div style={{ marginBottom: 22 }}>
          <label style={labelStyle}>{lang === 'ar' ? 'الفئة' : 'Category'}</label>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 8 }}>
            {cats.map(cat => (
              <button
                key={cat.id}
                onClick={() => setCategory(cat.id)}
                style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6, padding: '12px 8px', borderRadius: 12, background: category === cat.id ? `${cat.color}20` : 'rgba(255,255,255,0.04)', border: category === cat.id ? `2px solid ${cat.color}` : '2px solid transparent', cursor: 'pointer', transition: 'all 0.15s' }}
              >
                <cat.icon className="w-5 h-5" style={{ color: category === cat.id ? cat.color : 'rgba(255,255,255,0.5)' }} />
                <span style={{ fontSize: 11, color: category === cat.id ? cat.color : 'rgba(255,255,255,0.55)', fontWeight: category === cat.id ? 700 : 400, textAlign: 'center' }}>{cat.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Mood */}
        <div style={{ marginBottom: 22 }}>
          <label style={labelStyle}>{lang === 'ar' ? 'حالتك المزاجية الآن' : 'Your Mood Right Now'}</label>
          <div style={{ display: 'flex', gap: 8 }}>
            {moods.map(m => (
              <button
                key={m.id}
                onClick={() => setMood(m.id)}
                style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 5, padding: '10px 4px', borderRadius: 12, background: mood === m.id ? `${m.color}18` : 'rgba(255,255,255,0.03)', border: mood === m.id ? `2px solid ${m.color}` : '2px solid transparent', cursor: 'pointer', transition: 'all 0.15s' }}
              >
                <m.icon className="w-5 h-5" style={{ color: mood === m.id ? m.color : 'rgba(255,255,255,0.45)' }} />
                <span style={{ fontSize: 10, color: mood === m.id ? m.color : 'rgba(255,255,255,0.45)', fontWeight: mood === m.id ? 700 : 400 }}>{m.label}</span>
              </button>
            ))}
          </div>
          {selectedMoodObj && (
            <div style={{ marginTop: 10, background: `${selectedMoodObj.color}12`, border: `1px solid ${selectedMoodObj.color}30`, borderRadius: 10, padding: '10px 14px', display: 'flex', gap: 8, alignItems: 'flex-start' }}>
              <BrainCircuit className="w-4 h-4" style={{ color: selectedMoodObj.color, flexShrink: 0, marginTop: 1 }} />
              <span style={{ fontSize: 12, color: 'rgba(255,255,255,0.7)', lineHeight: 1.5 }}>{selectedMoodObj.aiTip}</span>
            </div>
          )}
        </div>

        {/* Note */}
        <div style={{ marginBottom: 24 }}>
          <label style={labelStyle}>{lang === 'ar' ? 'ملاحظة (اختياري)' : 'Note (optional)'}</label>
          <textarea
            placeholder={lang === 'ar' ? 'لماذا أنفقت هذا المبلغ؟' : 'Why did you spend this?'}
            value={note}
            onChange={e => setNote(e.target.value)}
            rows={2}
            style={{ ...inputStyle, resize: 'none', fontFamily: 'inherit' }}
          />
        </div>

        {error && (
          <div style={{ background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.3)', borderRadius: 10, padding: '10px 14px', marginBottom: 16, fontSize: 13, color: '#f87171' }}>
            {error}
          </div>
        )}

        <button
          onClick={handleSubmit}
          style={{ width: '100%', background: 'linear-gradient(135deg, #00f0ff, #0ea5e9)', color: '#03060d', border: 'none', borderRadius: 14, padding: '14px', fontWeight: 800, fontSize: 16, cursor: 'pointer' }}
        >
          {lang === 'ar' ? 'تسجيل المصروف' : 'Log Expense'}
        </button>
      </div>
    </div>
  );
}

/* ─── DASHBOARD ─────────────────────────────────────────────────────────── */
export default function Dashboard() {
  const { lang, dir } = useLanguage();
  const [, navigate] = useLocation();
  const { entries, totalSpent, emotionalSpendingPct, removeEntry } = useUserData();
  const [showAdd, setShowAdd] = useState(false);
  const ArrowIcon = dir === 'rtl' ? ArrowLeft : ArrowRight;

  const cats   = CATEGORIES[lang as 'ar' | 'en'];
  const getCat = (id: string) => cats.find(c => c.id === id) ?? cats[cats.length - 1];

  const recentEntries = entries.slice(0, 5);
  const hasData = entries.length > 0;

  const xp      = Math.min(2000, entries.length * 80 + 200);
  const maxXp   = 2000;
  const xpPct   = (xp / maxXp) * 100;
  const level   = Math.floor(xp / 500) + 1;
  const streak  = Math.min(entries.length + 1, 30);

  return (
    <div style={{ minHeight: '100vh', padding: '100px 24px 60px', maxWidth: 1200, margin: '0 auto', position: 'relative', zIndex: 1 }}>
      {showAdd && <AddExpenseModal onClose={() => setShowAdd(false)} lang={lang} />}

      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 32, flexWrap: 'wrap', gap: 16 }}>
        <div>
          <h1 style={{ fontSize: 'clamp(1.6rem, 3vw, 2.4rem)', fontWeight: 800, color: 'white', marginBottom: 6 }}>
            {lang === 'ar' ? 'لوحة التحكم' : 'Dashboard'}
          </h1>
          <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: 14 }}>
            {lang === 'ar' ? 'سجّل مصروفاتك وتتبّع حالتك المزاجية' : 'Log your expenses and track your emotional patterns'}
          </p>
        </div>
        <button
          onClick={() => setShowAdd(true)}
          style={{ display: 'flex', alignItems: 'center', gap: 8, background: '#00f0ff', color: '#03060d', border: 'none', borderRadius: 14, padding: '12px 22px', fontWeight: 800, fontSize: 15, cursor: 'pointer', boxShadow: '0 0 20px rgba(0,240,255,0.25)' }}
        >
          <Plus className="w-5 h-5" />
          {lang === 'ar' ? 'تسجيل مصروف' : 'Log Expense'}
        </button>
      </div>

      {/* XP Bar */}
      <div style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 20, padding: '18px 24px', marginBottom: 22, display: 'flex', alignItems: 'center', gap: 18 }}>
        <div style={{ width: 46, height: 46, borderRadius: '50%', background: 'linear-gradient(135deg, #00f0ff, #b44dff)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
          <Trophy className="w-5 h-5" style={{ color: 'white' }} />
        </div>
        <div style={{ flex: 1 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
            <span style={{ fontWeight: 700, color: 'white', fontSize: 13 }}>
              {lang === 'ar' ? `المستوى ${level}: الوعي المالي` : `Level ${level}: Financial Awareness`}
            </span>
            <span style={{ color: '#00f0ff', fontWeight: 700, fontSize: 12 }}>
              {xp} / {maxXp} XP
            </span>
          </div>
          <div style={{ height: 7, background: 'rgba(255,255,255,0.08)', borderRadius: 4, overflow: 'hidden' }}>
            <div style={{ height: '100%', width: `${xpPct}%`, background: 'linear-gradient(90deg, #00f0ff, #b44dff)', borderRadius: 4, transition: 'width 0.8s ease', boxShadow: '0 0 10px rgba(0,240,255,0.5)' }} />
          </div>
          <div style={{ marginTop: 5, fontSize: 11, color: 'rgba(255,255,255,0.4)' }}>
            🔥 {streak} {lang === 'ar' ? 'مصروف مسجّل' : 'expenses logged'} &nbsp;•&nbsp; {xp} {lang === 'ar' ? 'نقطة' : 'XP'}
          </div>
        </div>
      </div>

      {/* Stats */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 14, marginBottom: 28 }}>
        {[
          {
            label: lang === 'ar' ? 'إجمالي الإنفاق' : 'Total Spending',
            value: hasData ? `${totalSpent.toLocaleString()} ${lang === 'ar' ? 'ر.س' : 'SAR'}` : (lang === 'ar' ? 'لا يوجد بعد' : 'No data yet'),
            icon: TrendingDown, color: '#f97316',
            sub: lang === 'ar' ? `${entries.length} عملية` : `${entries.length} entries`,
          },
          {
            label: lang === 'ar' ? 'الإنفاق العاطفي' : 'Emotional Spending',
            value: hasData ? `${emotionalSpendingPct}%` : '—',
            icon: BrainCircuit, color: '#b44dff',
            sub: lang === 'ar' ? 'من إجمالي الإنفاق' : 'of total spending',
          },
          {
            label: lang === 'ar' ? 'المصروفات المسجّلة' : 'Entries Logged',
            value: `${entries.length}`,
            icon: Target, color: '#00f0ff',
            sub: lang === 'ar' ? `+${xp} نقطة XP` : `+${xp} XP earned`,
          },
          {
            label: lang === 'ar' ? 'أعلى فئة إنفاق' : 'Top Spending Category',
            value: (() => {
              if (!hasData) return '—';
              const tally = entries.reduce((a, e) => { a[e.category] = (a[e.category] || 0) + e.amount; return a; }, {} as Record<string, number>);
              const top = Object.entries(tally).sort((a, b) => b[1] - a[1])[0];
              return top ? getCat(top[0]).label : '—';
            })(),
            icon: Shield, color: '#22c55e',
            sub: lang === 'ar' ? 'حسب بياناتك' : 'based on your data',
          },
        ].map((stat, i) => (
          <div key={i} style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 16, padding: '18px 20px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 10 }}>
              <span style={{ fontSize: 11, color: 'rgba(255,255,255,0.45)', lineHeight: 1.4 }}>{stat.label}</span>
              <div style={{ width: 32, height: 32, borderRadius: 9, background: `${stat.color}15`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <stat.icon className="w-4 h-4" style={{ color: stat.color }} />
              </div>
            </div>
            <div style={{ fontSize: 20, fontWeight: 800, color: 'white', marginBottom: 4 }}>{stat.value}</div>
            <div style={{ fontSize: 11, color: stat.color }}>{stat.sub}</div>
          </div>
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: 22 }}>
        {/* Recent Entries */}
        <div style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 24, padding: 26 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
            <h2 style={{ fontWeight: 700, fontSize: 16, color: 'white' }}>
              {lang === 'ar' ? 'آخر المصروفات' : 'Recent Expenses'}
            </h2>
            <button
              onClick={() => navigate('/insights')}
              style={{ display: 'flex', alignItems: 'center', gap: 5, color: '#00f0ff', background: 'none', border: 'none', cursor: 'pointer', fontSize: 12, fontWeight: 600 }}
            >
              {lang === 'ar' ? 'التحليل الكامل' : 'Full Analysis'}
              <ArrowIcon className="w-3 h-3" />
            </button>
          </div>

          {!hasData ? (
            <div style={{ textAlign: 'center', padding: '40px 20px' }}>
              <div style={{ width: 56, height: 56, borderRadius: '50%', background: 'rgba(0,240,255,0.08)', border: '1px dashed rgba(0,240,255,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px' }}>
                <Plus className="w-6 h-6" style={{ color: '#00f0ff', opacity: 0.6 }} />
              </div>
              <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: 14, lineHeight: 1.6 }}>
                {lang === 'ar' ? 'لم تسجّل أي مصروف بعد.\nاضغط "تسجيل مصروف" لتبدأ.' : 'No expenses logged yet.\nClick "Log Expense" to start.'}
              </p>
              <button
                onClick={() => setShowAdd(true)}
                style={{ marginTop: 16, background: 'rgba(0,240,255,0.1)', border: '1px solid rgba(0,240,255,0.3)', borderRadius: 10, padding: '10px 20px', color: '#00f0ff', fontWeight: 700, fontSize: 13, cursor: 'pointer' }}
              >
                {lang === 'ar' ? '+ أضف أول مصروف' : '+ Add First Expense'}
              </button>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {recentEntries.map(entry => {
                const cat  = getCat(entry.category);
                const moods = MOODS[lang as 'ar' | 'en'];
                const moodObj = moods.find(m => m.id === entry.mood);
                return (
                  <div key={entry.id} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '11px 14px', background: 'rgba(255,255,255,0.03)', borderRadius: 14, border: '1px solid rgba(255,255,255,0.06)' }}>
                    <div style={{ width: 38, height: 38, borderRadius: 11, background: `${cat.color}18`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                      <cat.icon className="w-4 h-4" style={{ color: cat.color }} />
                    </div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ fontWeight: 600, fontSize: 13, color: 'white', marginBottom: 2 }}>{cat.label}</div>
                      <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.4)', display: 'flex', alignItems: 'center', gap: 6 }}>
                        {moodObj && <span style={{ color: moodObj.color }}>{moodObj.label}</span>}
                        <span>•</span>
                        <span>{fmtDate(entry.date, lang)}</span>
                      </div>
                      {entry.note && <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.35)', marginTop: 2, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{entry.note}</div>}
                    </div>
                    <div style={{ textAlign: 'end', flexShrink: 0 }}>
                      <div style={{ fontWeight: 700, color: 'white', fontSize: 14 }}>{entry.amount.toLocaleString()} {lang === 'ar' ? 'ر.س' : 'SAR'}</div>
                      <button
                        onClick={() => removeEntry(entry.id)}
                        style={{ marginTop: 4, background: 'none', border: 'none', cursor: 'pointer', padding: '2px 4px', color: 'rgba(255,255,255,0.2)' }}
                        title={lang === 'ar' ? 'حذف' : 'Delete'}
                      >
                        <Trash2 className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                );
              })}
              {entries.length > 5 && (
                <button onClick={() => navigate('/insights')} style={{ color: 'rgba(255,255,255,0.4)', background: 'none', border: 'none', cursor: 'pointer', fontSize: 12, padding: '6px 0', textAlign: 'center' }}>
                  {lang === 'ar' ? `+ ${entries.length - 5} مصروف آخر — عرض الكل` : `+ ${entries.length - 5} more — view all`}
                </button>
              )}
            </div>
          )}
        </div>

        {/* AI Mood Insight card */}
        <div style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 24, padding: 26, display: 'flex', flexDirection: 'column', gap: 18 }}>
          <h2 style={{ fontWeight: 700, fontSize: 16, color: 'white' }}>
            {lang === 'ar' ? 'رؤية الذكاء الاصطناعي' : 'AI Snapshot'}
          </h2>

          {!hasData ? (
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: '30px 10px', gap: 16 }}>
              <BrainCircuit className="w-14 h-14" style={{ color: '#00f0ff', opacity: 0.3 }} strokeWidth={1} />
              <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: 14, lineHeight: 1.6, maxWidth: 220 }}>
                {lang === 'ar' ? 'سجّل مصروفاتك وسيحلل الذكاء الاصطناعي أنماط إنفاقك العاطفي.' : 'Log your expenses and AI will analyze your emotional spending patterns.'}
              </p>
            </div>
          ) : (
            <>
              {/* Mood breakdown */}
              <div>
                <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.5)', marginBottom: 12, fontWeight: 600 }}>
                  {lang === 'ar' ? 'توزيع حالتك المزاجية' : 'Mood Distribution'}
                </div>
                {(() => {
                  const moods = MOODS[lang as 'ar' | 'en'];
                  const tally = entries.reduce((a, e) => { a[e.mood] = (a[e.mood] || 0) + 1; return a; }, {} as Record<string, number>);
                  return moods.map(m => {
                    const count = tally[m.id] || 0;
                    const pct   = entries.length > 0 ? Math.round((count / entries.length) * 100) : 0;
                    if (count === 0) return null;
                    return (
                      <div key={m.id} style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
                        <m.icon className="w-4 h-4" style={{ color: m.color, flexShrink: 0 }} />
                        <span style={{ fontSize: 12, color: 'rgba(255,255,255,0.65)', width: 60 }}>{m.label}</span>
                        <div style={{ flex: 1, height: 6, background: 'rgba(255,255,255,0.07)', borderRadius: 3, overflow: 'hidden' }}>
                          <div style={{ height: '100%', width: `${pct}%`, background: m.color, borderRadius: 3, transition: 'width 0.6s ease' }} />
                        </div>
                        <span style={{ fontSize: 11, fontWeight: 700, color: m.color, minWidth: 32, textAlign: 'end' }}>{pct}%</span>
                      </div>
                    );
                  });
                })()}
              </div>

              {/* Insight message */}
              {(() => {
                const moodMap = entries.reduce((a, e) => { a[e.mood] = (a[e.mood] || 0) + e.amount; return a; }, {} as Record<string, number>);
                const topMood = Object.entries(moodMap).sort((a, b) => b[1] - a[1])[0];
                if (!topMood) return null;
                const moods = MOODS[lang as 'ar' | 'en'];
                const moodObj = moods.find(m => m.id === topMood[0]);
                if (!moodObj) return null;
                return (
                  <div style={{ background: `${moodObj.color}10`, border: `1px solid ${moodObj.color}30`, borderRadius: 14, padding: 16 }}>
                    <div style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
                      <BrainCircuit className="w-4 h-4" style={{ color: moodObj.color, flexShrink: 0, marginTop: 2 }} />
                      <div>
                        <div style={{ fontWeight: 700, color: moodObj.color, fontSize: 12, marginBottom: 4 }}>
                          {lang === 'ar' ? 'رؤية الذكاء الاصطناعي' : 'AI Insight'}
                        </div>
                        <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.65)', lineHeight: 1.55 }}>{moodObj.aiTip}</p>
                      </div>
                    </div>
                  </div>
                );
              })()}

              <button
                onClick={() => navigate('/insights')}
                style={{ width: '100%', background: 'rgba(0,240,255,0.08)', border: '1px solid rgba(0,240,255,0.2)', borderRadius: 12, padding: '11px', color: '#00f0ff', fontWeight: 700, fontSize: 13, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}
              >
                <BarChart2 className="w-4 h-4" />
                {lang === 'ar' ? 'عرض التحليل الكامل' : 'View Full Analysis'}
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
