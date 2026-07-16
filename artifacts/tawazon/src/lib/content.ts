export type Translation = { ar: string; en: string };

export const t = (obj: Translation, lang: 'ar' | 'en') => obj[lang];

export const content = {
  nav: {
    brand: { ar: "توازن", en: "Tawazon" },
    subBrand: { ar: "FinAura", en: "FinAura" },
    toggle: { ar: "English", en: "العربية" }
  },
  hero: {
    badge: { ar: "مستقبل الصحة المالية", en: "The Future of Financial Wellness" },
    title: {
      ar: "اكتشف لماذا تنفق، قبل أن تنفق.",
      en: "Discover why you spend — before you spend it."
    },
    tagline: {
      ar: "منصة توازن — حيث يلتقي الذكاء الاصطناعي بعلم النفس المالي. حول رحلتك المالية إلى تجربة ممتعة وذكية.",
      en: "Tawazon — Where AI meets behavioral finance. Transform your financial journey into an engaging, intelligent experience."
    },
    cta: {
      ar: "انضم إلى قائمة الانتظار",
      en: "Join the Waitlist"
    }
  },
  problem: {
    badge: { ar: "الإنفاق العاطفي", en: "Emotional Spending" },
    title: {
      ar: "القرارات المالية ليست أرقاماً فقط، بل مشاعر",
      en: "Financial decisions aren't just numbers, they're emotions"
    },
    desc: {
      ar: "نحن لا ننفق المال فقط لشراء الأشياء، بل استجابة لمشاعرنا. التوتر، الملل، والاندفاع هي المحركات الخفية التي تستهلك ميزانيتك.",
      en: "We don't just spend to buy things; we spend in response to our emotions. Stress, boredom, and impulsiveness are the hidden drivers draining your budget."
    },
    cards: [
      {
        icon: "Zap",
        title: { ar: "الاندفاع", en: "Impulsiveness" },
        desc: { ar: "شراء لحظي لتخفيف الضغط أو البحث عن سعادة مؤقتة", en: "Instant purchases to relieve pressure or seek temporary happiness" }
      },
      {
        icon: "CloudRain",
        title: { ar: "التوتر", en: "Stress" },
        desc: { ar: "الإنفاق كآلية هروب وتكيف مع ضغوط الحياة", en: "Spending as an escape and coping mechanism for life's pressures" }
      },
      {
        icon: "Coffee",
        title: { ar: "الملل", en: "Boredom" },
        desc: { ar: "التسوق اللاواعي للبحث عن الدوبامين السريع", en: "Mindless shopping to chase quick dopamine hits" }
      }
    ]
  },
  solution: {
    badge: { ar: "الحل الذكي", en: "The Smart Solution" },
    title: { ar: "توازن يعيد الوعي لقراراتك", en: "Tawazon brings awareness back to your decisions" },
    desc: { ar: "من خلال تتبع المشاعر وتحليل الأنماط عبر الذكاء الاصطناعي، نساعدك على فهم دوافعك وبناء عادات مالية صحية بأسلوب مشوق.", en: "By tracking emotions and analyzing patterns via AI, we help you understand your triggers and build healthy financial habits in an engaging way." },
    features: [
      { 
        title: { ar: "تحليل الأنماط العاطفية", en: "Emotional Pattern Analysis" },
        desc: { ar: "ربط النفقات بحالتك المزاجية لاكتشاف المحفزات الخفية.", en: "Connecting expenses to your mood to uncover hidden triggers." }
      },
      { 
        title: { ar: "مهام وتحديات مخصصة", en: "Personalized Missions" },
        desc: { ar: "تحويل الأهداف المالية إلى لعبة ممتعة مع مكافآت.", en: "Turning financial goals into a fun game with rewards." }
      },
      { 
        title: { ar: "رؤى ذكية مخصصة", en: "Smart AI Insights" },
        desc: { ar: "نصائح استباقية مبنية على سلوكك الفردي.", en: "Proactive advice based on your individual behavior." }
      },
      { 
        title: { ar: "توقع ارتفاعات الإنفاق", en: "Spike Detection" },
        desc: { ar: "تنبيهك قبل المواسم والأوقات التي يكثر فيها إنفاقك.", en: "Alerting you before seasons and times when you spend most." }
      }
    ]
  },
  gamification: {
    badge: { ar: "التجربة الممتعة", en: "The Gamified Experience" },
    title: { ar: "رحلة مالية تشعرك بالإنجاز", en: "A financial journey that feels rewarding" },
    app: {
      level: { ar: "المستوى ٤: التوازن العاطفي", en: "Level 4: Emotional Balance" },
      xp: { ar: "١٢٠٠ / ٢٠٠٠ نقطة خبرة", en: "1200 / 2000 XP" },
      streak: { ar: "🔥 ٧ أيام متتالية", en: "🔥 7 Day Streak" },
      badge1: { ar: "قاهر الاندفاع", en: "Impulse Conqueror" },
      badge1Date: { ar: "مكتسب حديثاً", en: "Recently Earned" },
      badge2: { ar: "المتسوق الواعي", en: "Mindful Spender" },
      badge2Date: { ar: "مكتسب أمس", en: "Earned Yesterday" }
    }
  },
  vision: {
    badge: { ar: "رؤية طموحة", en: "Ambitious Vision" },
    title: { ar: "متوافق مع رؤية المملكة ٢٠٣٠", en: "Aligned with Saudi Vision 2030" },
    desc: { ar: "نفخر في توازن بدعم أهداف الرؤية في تعزيز الوعي المالي، رفع معدلات الادخار، وتحسين جودة الحياة للفرد والمجتمع لغد أكثر استقراراً.", en: "At Tawazon, we are proud to support the Vision's goals of enhancing financial literacy, increasing savings rates, and improving the quality of life for a more stable tomorrow." }
  },
  team: {
    badge: { ar: "المبتكرون", en: "The Innovators" },
    title: { ar: "الفريق خلف توازن", en: "The Team Behind Tawazon" },
    members: [
      { name: { ar: "حصة الزامل", en: "Hessa Al-Zamil" }, role: { ar: "مؤسس مشارك", en: "Co-Founder" } },
      { name: { ar: "مايا الشهري", en: "Maya Al-Shehri" }, role: { ar: "مؤسس مشارك", en: "Co-Founder" } },
      { name: { ar: "نجود الفهيد", en: "Nujud Al-Fuhaid" }, role: { ar: "مؤسس مشارك", en: "Co-Founder" } },
      { name: { ar: "ريم العرفج", en: "Reem Al-Arfaj" }, role: { ar: "مؤسس مشارك", en: "Co-Founder" } },
      { name: { ar: "جوري العزني", en: "Jouri Al-Azni" }, role: { ar: "مؤسس مشارك", en: "Co-Founder" } }
    ]
  },
  footer: {
    rights: { ar: "© ٢٠٢٤ توازن. جميع الحقوق محفوظة.", en: "© 2024 Tawazon. All rights reserved." }
  }
};
