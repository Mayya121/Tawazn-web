import React from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '@/contexts/language-context';
import { content, t } from '@/lib/content';
import { Button } from '@/components/ui/button';
import { BackgroundEffects } from '@/components/background-effects';
import { 
  Zap, CloudRain, Coffee, Activity, BrainCircuit,
  Trophy, Target, ArrowRight, ShieldCheck, Gamepad2, ChevronRight, ChevronLeft
} from 'lucide-react';

const FADE_UP = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
};

const STAGGER = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } }
};

function Hero() {
  const { lang, dir } = useLanguage();
  const Icon = dir === 'rtl' ? ChevronLeft : ChevronRight;

  return (
    <section className="relative min-h-[100dvh] flex flex-col items-center justify-center overflow-hidden px-6 pt-20">
      <motion.div 
        variants={STAGGER}
        initial="hidden"
        animate="visible"
        className="max-w-4xl mx-auto text-center z-10 flex flex-col items-center"
      >
        <motion.div variants={FADE_UP} className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card text-primary text-sm font-medium mb-8 border-primary/20 shadow-[0_0_20px_rgba(0,240,255,0.15)]">
          <SparklesIcon className="w-4 h-4" />
          <span>{t(content.hero.badge, lang)}</span>
        </motion.div>

        <motion.h1 variants={FADE_UP} className="text-5xl md:text-7xl font-bold tracking-tight mb-8 leading-[1.1]">
          {t(content.hero.title, lang)}
        </motion.h1>

        <motion.p variants={FADE_UP} className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-12 leading-relaxed">
          {t(content.hero.tagline, lang)}
        </motion.p>

        <motion.div variants={FADE_UP} className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
          <Button size="lg" className="group text-lg">
            {t(content.hero.cta, lang)}
            <Icon className="w-5 h-5 ml-2 mr-2 group-hover:translate-x-1 rtl:group-hover:-translate-x-1 transition-transform" />
          </Button>
        </motion.div>
      </motion.div>
    </section>
  );
}

function SparklesIcon({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z" />
    </svg>
  );
}

const ICONS = {
  Zap: Zap,
  CloudRain: CloudRain,
  Coffee: Coffee,
};

function Problem() {
  const { lang } = useLanguage();

  return (
    <section className="py-24 px-6 relative z-10">
      <div className="max-w-6xl mx-auto">
        <motion.div 
          initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }}
          variants={FADE_UP}
          className="text-center mb-16"
        >
          <span className="text-secondary font-medium tracking-wider uppercase text-sm mb-4 block">
            {t(content.problem.badge, lang)}
          </span>
          <h2 className="text-3xl md:text-5xl font-bold mb-6">{t(content.problem.title, lang)}</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            {t(content.problem.desc, lang)}
          </p>
        </motion.div>

        <motion.div 
          initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }}
          variants={STAGGER}
          className="grid md:grid-cols-3 gap-6"
        >
          {content.problem.cards.map((card, i) => {
            const IconComponent = ICONS[card.icon as keyof typeof ICONS];
            return (
              <motion.div key={i} variants={FADE_UP} className="glass-card p-8 rounded-3xl relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-32 h-32 bg-secondary/10 rounded-full blur-3xl group-hover:bg-secondary/20 transition-colors" />
                <div className="w-14 h-14 rounded-2xl bg-secondary/10 text-secondary flex items-center justify-center mb-6">
                  <IconComponent className="w-7 h-7" />
                </div>
                <h3 className="text-xl font-bold mb-3">{t(card.title, lang)}</h3>
                <p className="text-muted-foreground leading-relaxed">{t(card.desc, lang)}</p>
              </motion.div>
            )
          })}
        </motion.div>
      </div>
    </section>
  );
}

function Solution() {
  const { lang } = useLanguage();

  return (
    <section className="py-32 px-6 relative z-10">
      <div className="max-w-6xl mx-auto flex flex-col lg:flex-row items-center gap-16">
        <motion.div 
          initial="hidden" whileInView="visible" viewport={{ once: true }}
          variants={STAGGER}
          className="flex-1 space-y-8"
        >
          <div>
            <span className="text-primary font-medium tracking-wider uppercase text-sm mb-4 block">
              {t(content.solution.badge, lang)}
            </span>
            <h2 className="text-3xl md:text-5xl font-bold mb-6 leading-tight">
              {t(content.solution.title, lang)}
            </h2>
            <p className="text-muted-foreground text-lg leading-relaxed">
              {t(content.solution.desc, lang)}
            </p>
          </div>

          <div className="grid sm:grid-cols-2 gap-6">
            {content.solution.features.map((feature, i) => (
              <motion.div key={i} variants={FADE_UP} className="flex gap-4">
                <div className="mt-1 shrink-0 w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="font-bold mb-1">{t(feature.title, lang)}</h4>
                  <p className="text-sm text-muted-foreground">{t(feature.desc, lang)}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="flex-1 relative w-full aspect-square max-w-md"
        >
          <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-secondary/20 rounded-full blur-[80px] animate-pulse" />
          <div className="absolute inset-4 glass-card rounded-full border border-primary/20 flex items-center justify-center shadow-[0_0_50px_rgba(0,240,255,0.2)]">
            <BrainCircuit className="w-32 h-32 text-primary opacity-80" strokeWidth={1} />
          </div>
          {/* Orbital nodes */}
          <div className="absolute top-[10%] left-[20%] w-12 h-12 rounded-full glass-card flex items-center justify-center animate-bounce shadow-[0_0_15px_rgba(180,68,255,0.4)]" style={{ animationDelay: '0s', animationDuration: '3s' }}>
            <Activity className="w-5 h-5 text-secondary" />
          </div>
          <div className="absolute bottom-[20%] right-[10%] w-16 h-16 rounded-full glass-card flex items-center justify-center animate-bounce shadow-[0_0_15px_rgba(0,240,255,0.4)]" style={{ animationDelay: '1s', animationDuration: '4s' }}>
            <Target className="w-6 h-6 text-primary" />
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function Gamification() {
  const { lang } = useLanguage();

  return (
    <section className="py-24 px-6 relative z-10">
      <div className="max-w-4xl mx-auto text-center mb-16">
         <span className="text-secondary font-medium tracking-wider uppercase text-sm mb-4 block">
            {t(content.gamification.badge, lang)}
          </span>
          <h2 className="text-3xl md:text-5xl font-bold">{t(content.gamification.title, lang)}</h2>
      </div>

      <div className="max-w-5xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="glass-card rounded-[2.5rem] p-8 md:p-12 relative overflow-hidden border-primary/20"
        >
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[100px] pointer-events-none" />
          
          <div className="grid md:grid-cols-2 gap-12 items-center relative z-10">
            <div className="space-y-8">
              <div className="glass-card p-6 rounded-3xl bg-black/40">
                <div className="flex justify-between items-center mb-4">
                  <h4 className="font-bold text-lg">{t(content.gamification.app.level, lang)}</h4>
                  <span className="text-primary font-bold">{t(content.gamification.app.xp, lang)}</span>
                </div>
                <div className="h-3 bg-white/10 rounded-full overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    whileInView={{ width: "60%" }}
                    transition={{ duration: 1.5, ease: "easeOut" }}
                    className="h-full bg-gradient-to-r from-primary to-cyan-300 rounded-full shadow-[0_0_10px_rgba(0,240,255,0.8)]" 
                  />
                </div>
                <p className="mt-4 text-sm text-muted-foreground font-medium flex items-center gap-2">
                  {t(content.gamification.app.streak, lang)}
                </p>
              </div>

              <div className="grid gap-4">
                <div className="glass-card p-4 rounded-2xl flex items-center gap-4 bg-black/20 hover:bg-black/40 transition-colors cursor-default border-secondary/20">
                  <div className="w-12 h-12 rounded-full bg-secondary/20 flex items-center justify-center shrink-0">
                    <Trophy className="w-6 h-6 text-secondary" />
                  </div>
                  <div>
                    <h5 className="font-bold">{t(content.gamification.app.badge1, lang)}</h5>
                    <p className="text-xs text-muted-foreground">{t(content.gamification.app.badge1Date, lang)}</p>
                  </div>
                </div>
                <div className="glass-card p-4 rounded-2xl flex items-center gap-4 bg-black/20 hover:bg-black/40 transition-colors cursor-default">
                  <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center shrink-0">
                    <Gamepad2 className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h5 className="font-bold">{t(content.gamification.app.badge2, lang)}</h5>
                    <p className="text-xs text-muted-foreground">{t(content.gamification.app.badge2Date, lang)}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex justify-center">
              {/* Mockup visual */}
              <div className="w-full max-w-[300px] aspect-[1/2] rounded-[3rem] border-[8px] border-black/80 glass-card bg-black/50 overflow-hidden relative shadow-2xl">
                 <div className="absolute top-0 inset-x-0 h-6 bg-black z-20 flex justify-center rounded-b-xl w-32 mx-auto" />
                 <div className="p-6 pt-16 flex flex-col gap-6 h-full relative z-10">
                   <div className="h-24 rounded-2xl bg-gradient-to-br from-primary/20 to-secondary/20 border border-white/5 flex items-center justify-center flex-col gap-2">
                     <BrainCircuit className="w-8 h-8 text-primary" />
                   </div>
                   <div className="space-y-3">
                     <div className="h-4 w-2/3 bg-white/10 rounded-full" />
                     <div className="h-3 w-1/2 bg-white/5 rounded-full" />
                   </div>
                   <div className="grid grid-cols-2 gap-3 mt-auto">
                     <div className="h-20 rounded-2xl bg-white/5" />
                     <div className="h-20 rounded-2xl bg-white/5" />
                   </div>
                 </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function Vision() {
  const { lang } = useLanguage();

  return (
    <section className="py-24 px-6 relative z-10">
      <div className="max-w-4xl mx-auto">
        <motion.div 
          initial="hidden" whileInView="visible" viewport={{ once: true }}
          variants={FADE_UP}
          className="glass-card rounded-3xl p-10 md:p-16 text-center relative overflow-hidden border-yellow-500/20"
        >
          <div className="absolute inset-0 bg-gradient-to-b from-yellow-500/5 to-transparent pointer-events-none" />
          <span className="text-yellow-500 font-medium tracking-wider uppercase text-sm mb-6 block">
            {t(content.vision.badge, lang)}
          </span>
          <h2 className="text-3xl md:text-5xl font-bold mb-6 text-gradient-gold">
            {t(content.vision.title, lang)}
          </h2>
          <p className="text-muted-foreground text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
            {t(content.vision.desc, lang)}
          </p>
        </motion.div>
      </div>
    </section>
  );
}

function Team() {
  const { lang } = useLanguage();

  return (
    <section className="py-24 px-6 relative z-10">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <span className="text-primary font-medium tracking-wider uppercase text-sm mb-4 block">
            {t(content.team.badge, lang)}
          </span>
          <h2 className="text-3xl md:text-4xl font-bold">{t(content.team.title, lang)}</h2>
        </div>

        <div className="flex flex-wrap justify-center gap-6">
          {content.team.members.map((member, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="glass-card w-48 p-6 rounded-2xl text-center flex flex-col items-center hover:-translate-y-2 transition-transform duration-300"
            >
              <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-primary/20 to-secondary/20 mb-4 border border-white/10 flex items-center justify-center text-xl font-bold">
                {t(member.name, lang).charAt(0)}
              </div>
              <h4 className="font-bold text-sm mb-1">{t(member.name, lang)}</h4>
              <p className="text-xs text-muted-foreground">{t(member.role, lang)}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Footer() {
  const { lang } = useLanguage();
  return (
    <footer className="py-8 px-6 text-center border-t border-white/5 relative z-10 mt-20">
      <p className="text-sm text-muted-foreground">{t(content.footer.rights, lang)}</p>
    </footer>
  );
}

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <BackgroundEffects />
      <Hero />
      <Problem />
      <Solution />
      <Gamification />
      <Vision />
      <Team />
      <Footer />
    </div>
  );
}
