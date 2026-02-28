import React, { useEffect, useRef, useState } from "react";
import {
  Activity,
  ArrowRight,
  CalendarClock,
  Check,
  ChevronDown,
  Clock,
  Github,
  HeartPulse,
  Instagram,
  Linkedin,
  Mail,
  Menu,
  Microscope,
  ShieldCheck,
  Sparkles,
  Star,
  TestTube2,
  Twitter,
  UserCheck,
  X,
} from "lucide-react";

const sections = [
  { id: "hero", label: "Главная" },
  { id: "features", label: "Преимущества" },
  { id: "stats", label: "Цифры" },
  { id: "how", label: "Как это работает" },
  { id: "pricing", label: "Цены" },
  { id: "faq", label: "FAQ" },
  { id: "contacts", label: "Контакты" },
];

function useInView(options = {}) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setInView(true);
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.15,
        ...options,
      },
    );

    observer.observe(node);

    return () => observer.disconnect();
  }, [options]);

  return [ref, inView];
}

function AnimatedCounter({ value, suffix = "", duration = 2000 }) {
  const [display, setDisplay] = useState(0);
  const [ref, inView] = useInView();
  const startedRef = useRef(false);

  useEffect(() => {
    if (!inView || startedRef.current) return;
    startedRef.current = true;

    const start = performance.now();

    const animate = (time) => {
      const progress = Math.min((time - start) / duration, 1);
      const current = Math.floor(progress * value);
      setDisplay(current);
      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }, [inView, value, duration]);

  return (
    <span ref={ref}>
      {display.toLocaleString("ru-RU")}
      {suffix}
    </span>
  );
}

const faqs = [
  {
    q: "Нужно ли направление от врача для сдачи анализов?",
    a: "Нет, вы можете сдать большинство анализов без направления. Результаты подойдут для консультации у любого врача.",
  },
  {
    q: "Как быстро готовы результаты?",
    a: "Большинство стандартных анализов — в течение 24 часов. Срочные — от 2 часов, расширенные панели — до 3 рабочих дней.",
  },
  {
    q: "Можно ли сдать анализы на дому?",
    a: "Да, наш выездной медперсонал может приехать к вам домой или в офис по предварительной записи.",
  },
  {
    q: "Насколько точны ваши исследования?",
    a: "Мы используем только сертифицированное оборудование экспертного класса и тройной контроль качества на каждом этапе.",
  },
  {
    q: "Как я получу результаты?",
    a: "Результаты доступны в личном кабинете, а также могут быть отправлены на email или в мессенджер по вашему выбору.",
  },
  {
    q: "Безопасно ли хранение моих данных?",
    a: "Да, все данные шифруются, хранятся на защищённых серверах и не передаются третьим лицам без вашего согласия.",
  },
];

const testimonials = [
  {
    name: "Анна К.",
    role: "Пациент, чекап раз в год",
    text: "Записалась онлайн за 3 минуты, в лаборатории всё заняло меньше 15 минут. Результаты пришли уже вечером с подробными комментариями.",
    rating: 5,
    color: "from-cyan-400 to-emerald-400",
  },
  {
    name: "Д-р Игорь П.",
    role: "Врач-терапевт, партнёр клиники",
    text: "Работаем с лабораторией более 3 лет. Отмечаю стабильное качество, точность и понятные отчёты для врачей.",
    rating: 5,
    color: "from-sky-400 to-blue-500",
  },
  {
    name: "Сергей Л.",
    role: "HR-директор, корпоративный клиент",
    text: "Организовали корпоративный чекап для 120 сотрудников за два дня. Всё чётко по времени, без очередей и с индивидуальной аналитикой.",
    rating: 5,
    color: "from-emerald-400 to-teal-400",
  },
];

const pricingPlans = [
  {
    name: "Базовый",
    priceMonthly: 1900,
    priceYearly: 1900 * 12 * 0.8,
    description: "Стартовый набор ключевых анализов для базовой оценки здоровья.",
    popular: false,
    features: [
      "Общий анализ крови и мочи",
      "Глюкоза, холестерин",
      "Готовность результатов — до 24 часов",
      "Доступ к личному кабинету",
    ],
  },
  {
    name: "Про",
    badge: "Популярный",
    priceMonthly: 3900,
    priceYearly: 3900 * 12 * 0.8,
    description:
      "Расширенный чекап с ключевыми биохимическими показателями и витаминами.",
    popular: true,
    features: [
      "Все из тарифа «Базовый»",
      "Расширенная биохимия крови",
      "Гормональный профиль (основные показатели)",
      "Онлайн-консультация врача по результатам",
      "Приоритетная обработка анализов",
    ],
  },
  {
    name: "Энтерпрайз",
    priceMonthly: 9900,
    priceYearly: 9900 * 12 * 0.8,
    description: "Индивидуальные программы для компаний и VIP-пациентов.",
    popular: false,
    features: [
      "Корпоративные и VIP-программы",
      "Выездная служба забора анализов",
      "Персональный координатор",
      "Гибкая интеграция с IT-системами",
      "Персонализированная отчётность",
    ],
  },
];

const featureCards = [
  {
    icon: <Microscope className="w-7 h-7 text-cyan-300" />,
    title: "Оборудование экспертного класса",
    description:
      "Анализаторы последнего поколения от ведущих мировых производителей с тройным контролем качества.",
  },
  {
    icon: <Clock className="w-7 h-7 text-emerald-300" />,
    title: "Результаты — от 2 часов",
    description:
      "Срочные исследования выполняем в течение нескольких часов, без потери качества и точности.",
  },
  {
    icon: <ShieldCheck className="w-7 h-7 text-sky-300" />,
    title: "Медицинская надёжность",
    description:
      "Соответствие международным стандартам, валидация методик и строгие протоколы лабораторной безопасности.",
  },
  {
    icon: <HeartPulse className="w-7 h-7 text-teal-300" />,
    title: "Фокус на профилактике",
    description:
      "Готовые профили чекапов и подсказки по интерпретации помогают выявлять риски до появления симптомов.",
  },
  {
    icon: <CalendarClock className="w-7 h-7 text-cyan-300" />,
    title: "Гибкая запись",
    description:
      "Онлайн-бронирование, напоминания и выезд на дом — подстроимся под ваш график и ритм жизни.",
  },
  {
    icon: <Activity className="w-7 h-7 text-emerald-300" />,
    title: "Цифровая экосистема",
    description:
      "Личный кабинет, история анализов, динамика показателей и удобный экспорт для лечащего врача.",
  },
];

function getInitials(name) {
  return name
    .split(" ")
    .filter(Boolean)
    .map((part) => part[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
}

function App() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [billingPeriod, setBillingPeriod] = useState("month");
  const [openFaq, setOpenFaq] = useState(null);

  const heroRef = useRef(null);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!heroRef.current) return;
    const elements = heroRef.current.querySelectorAll("[data-fade-up]");
    elements.forEach((el, index) => {
      el.style.animationDelay = `${index * 80}ms`;
      el.classList.add("fade-in-up");
    });
  }, []);

  const handleNavClick = (id) => {
    const el = document.getElementById(id);
    if (!el) return;
    setMobileOpen(false);
    el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const priceFor = (plan) =>
    billingPeriod === "month" ? plan.priceMonthly : plan.priceYearly;

  return (
    <div className="min-h-screen bg-[#050710] text-slate-100 relative overflow-x-hidden">
      <style>{`
        :root {
          --bg-primary: #050710;
          --accent-from: #22d3ee;
          --accent-to: #22c55e;
          --card-bg: rgba(15, 23, 42, 0.8);
          --border-subtle: rgba(148, 163, 184, 0.18);
        }

        .glass-panel {
          background: radial-gradient(circle at top left, rgba(45, 212, 191, 0.08), transparent 55%),
                      radial-gradient(circle at bottom right, rgba(56, 189, 248, 0.10), transparent 55%),
                      var(--card-bg);
          border: 1px solid var(--border-subtle);
          backdrop-filter: blur(18px);
        }

        .gradient-text {
          background: linear-gradient(120deg, var(--accent-from), var(--accent-to));
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
        }

        .btn-primary {
          background-image: linear-gradient(120deg, var(--accent-from), var(--accent-to));
          box-shadow: 0 0 0 0 rgba(45, 212, 191, 0.4);
          transition: transform 0.18s ease-out, box-shadow 0.18s ease-out, filter 0.2s ease-out;
        }
        .btn-primary:hover {
          transform: translateY(-1px) scale(1.04);
          box-shadow: 0 18px 45px rgba(45, 212, 191, 0.45);
          filter: saturate(1.1);
        }

        .btn-ghost {
          background: rgba(15, 23, 42, 0.75);
          border: 1px solid rgba(148, 163, 184, 0.5);
          transition: transform 0.18s ease-out, box-shadow 0.18s ease-out, border-color 0.18s ease-out, background 0.18s ease-out;
        }
        .btn-ghost:hover {
          transform: translateY(-1px) scale(1.04);
          box-shadow: 0 16px 35px rgba(15, 23, 42, 0.5);
          border-color: rgba(56, 189, 248, 0.8);
          background: radial-gradient(circle at top left, rgba(56, 189, 248, 0.18), rgba(15, 23, 42, 0.95));
        }

        .card-hover {
          transition: transform 0.22s ease-out, box-shadow 0.22s ease-out, border-color 0.22s ease-out, background 0.22s ease-out;
        }
        .card-hover:hover {
          transform: translateY(-4px) scale(1.03);
          box-shadow: 0 24px 60px rgba(15, 23, 42, 0.95);
          border-color: rgba(56, 189, 248, 0.8);
          background: radial-gradient(circle at top left, rgba(45, 212, 191, 0.12), rgba(15, 23, 42, 0.98));
        }

        .fade-section {
          opacity: 0;
          transform: translateY(16px);
          transition: opacity 0.7s ease-out, transform 0.7s ease-out;
        }
        .fade-section.visible {
          opacity: 1;
          transform: translateY(0);
        }

        @keyframes float-slow {
          0% { transform: translate3d(0, 0, 0) scale(1); opacity: 0.65; }
          50% { transform: translate3d(20px, -30px, 0) scale(1.08); opacity: 0.9; }
          100% { transform: translate3d(0, 0, 0) scale(1); opacity: 0.65; }
        }

        @keyframes float-alt {
          0% { transform: translate3d(0, 0, 0) scale(1); opacity: 0.5; }
          50% { transform: translate3d(-24px, 26px, 0) scale(1.03); opacity: 0.85; }
          100% { transform: translate3d(0, 0, 0) scale(1); opacity: 0.5; }
        }

        @keyframes fadeInUpSoft {
          0% {
            opacity: 0;
            transform: translate3d(0, 24px, 0) scale(0.99);
            filter: blur(4px);
          }
          60% {
            opacity: 1;
            transform: translate3d(0, -2px, 0) scale(1.005);
            filter: blur(0);
          }
          100% {
            opacity: 1;
            transform: translate3d(0, 0, 0) scale(1);
          }
        }

        .fade-in-up {
          opacity: 0;
          animation: fadeInUpSoft 0.7s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }

        .blob {
          position: absolute;
          border-radius: 999px;
          filter: blur(60px);
          opacity: 0.6;
          mix-blend-mode: screen;
          pointer-events: none;
        }

        .blob-1 {
          width: 520px;
          height: 520px;
          background: radial-gradient(circle at 30% 20%, rgba(45, 212, 191, 0.42), transparent 60%);
          top: -120px;
          left: -80px;
          animation: float-slow 16s ease-in-out infinite;
        }
        .blob-2 {
          width: 620px;
          height: 620px;
          background: radial-gradient(circle at 70% 80%, rgba(56, 189, 248, 0.38), transparent 55%);
          top: 40%;
          right: -160px;
          animation: float-alt 20s ease-in-out infinite;
        }
        .blob-3 {
          width: 380px;
          height: 380px;
          background: radial-gradient(circle at 20% 80%, rgba(59, 130, 246, 0.28), transparent 50%);
          bottom: -120px;
          left: 35%;
          animation: float-slow 22s ease-in-out infinite;
        }

        .nav-backdrop {
          backdrop-filter: blur(18px);
          background: radial-gradient(circle at top left, rgba(56, 189, 248, 0.14), rgba(15, 23, 42, 0.92));
          border-bottom: 1px solid rgba(148, 163, 184, 0.32);
        }

        .nav-backdrop-transparent {
          background: linear-gradient(to bottom, rgba(5, 7, 16, 0.98), rgba(5, 7, 16, 0.5), transparent);
        }

        .drawer-enter {
          transform: translateY(-16px);
          opacity: 0;
        }
        .drawer-open {
          transform: translateY(0);
          opacity: 1;
          transition: transform 0.24s ease-out, opacity 0.24s ease-out;
        }

        .faq-body-enter {
          max-height: 0;
          opacity: 0;
        }
        .faq-body-open {
          max-height: 260px;
          opacity: 1;
          transition: max-height 0.26s ease, opacity 0.26s ease;
        }
      `}</style>

      <div className="pointer-events-none blob blob-1" />
      <div className="pointer-events-none blob blob-2" />
      <div className="pointer-events-none blob blob-3" />

      <header
        className={`fixed top-0 inset-x-0 z-40 transition-all duration-300 ${
          scrolled ? "nav-backdrop shadow-xl shadow-cyan-500/10" : "nav-backdrop-transparent"
        }`}
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 sm:h-20">
            <button
              onClick={() => handleNavClick("hero")}
              className="flex items-center gap-2 sm:gap-3 group"
            >
              <div className="relative">
                <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-2xl bg-slate-900/70 border border-cyan-400/60 flex items-center justify-center shadow-lg shadow-cyan-500/30">
                  <TestTube2 className="w-5 h-5 sm:w-6 sm:h-6 text-cyan-300 group-hover:scale-110 transition-transform" />
                </div>
                <span className="absolute -bottom-1 -right-1 px-1.5 py-0.5 rounded-full bg-emerald-500/90 text-[10px] font-semibold text-slate-900 uppercase tracking-[0.12em] shadow-md shadow-emerald-500/50">
                  Lab
                </span>
              </div>
              <div className="flex flex-col text-left">
                <span className="font-semibold text-sm sm:text-base tracking-tight">
                  Helex Grozny
                </span>
                <span className="text-[11px] sm:text-xs text-slate-400">
                  Медицинская лаборатория нового поколения
                </span>
              </div>
            </button>

            <nav className="hidden lg:flex items-center gap-8 text-sm">
              {sections.map((section) => (
                <button
                  key={section.id}
                  onClick={() => handleNavClick(section.id)}
                  className="relative text-slate-300 hover:text-white transition-colors"
                >
                  <span>{section.label}</span>
                  <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-gradient-to-r from-cyan-400 to-emerald-400 rounded-full transition-all group-hover:w-full" />
                </button>
              ))}
            </nav>

            <div className="flex items-center gap-3">
              <button
                onClick={() => handleNavClick("pricing")}
                className="hidden sm:inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium btn-ghost"
              >
                <Sparkles className="w-4 h-4 text-cyan-300" />
                Тарифы
              </button>
              <button
                onClick={() => handleNavClick("contacts")}
                className="hidden md:inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold text-slate-900 btn-primary"
              >
                <CalendarClock className="w-4 h-4" />
                Записаться на анализы
              </button>
              <button
                onClick={() => setMobileOpen((prev) => !prev)}
                className="inline-flex lg:hidden items-center justify-center w-10 h-10 rounded-full border border-slate-700/70 bg-slate-900/70 hover:border-cyan-400/80 hover:bg-slate-900/90 transition-colors"
              >
                {mobileOpen ? (
                  <X className="w-5 h-5 text-slate-200" />
                ) : (
                  <Menu className="w-5 h-5 text-slate-200" />
                )}
              </button>
            </div>
          </div>

          {mobileOpen && (
            <div className="lg:hidden pb-4 drawer-open drawer-enter">
              <div className="glass-panel border border-slate-700/70 rounded-2xl p-4 mt-1 space-y-3">
                <div className="flex flex-wrap gap-2">
                  {sections.map((section) => (
                    <button
                      key={section.id}
                      onClick={() => handleNavClick(section.id)}
                      className="px-3 py-1.5 rounded-full bg-slate-900/80 text-sm text-slate-200 hover:bg-slate-800/90 transition-colors border border-slate-700/60"
                    >
                      {section.label}
                    </button>
                  ))}
                </div>
                <div className="flex flex-col gap-2 pt-1">
                  <button
                    onClick={() => handleNavClick("pricing")}
                    className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-full text-sm font-medium btn-ghost w-full"
                  >
                    <Sparkles className="w-4 h-4 text-cyan-300" />
                    Тарифы и чекапы
                  </button>
                  <button
                    onClick={() => handleNavClick("contacts")}
                    className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-full text-sm font-semibold text-slate-900 btn-primary w-full"
                  >
                    <CalendarClock className="w-4 h-4" />
                    Записаться на анализы
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </header>

      <main className="relative pt-24 sm:pt-28 lg:pt-32">
        <section
          id="hero"
          ref={heroRef}
          className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-16 sm:pb-20 lg:pb-28"
        >
          <div className="absolute inset-0 -z-10 pointer-events-none">
            <div className="absolute inset-0 opacity-40 bg-[radial-gradient(circle_at_top,_rgba(56,189,248,0.06),transparent_55%),radial-gradient(circle_at_bottom,_rgba(16,185,129,0.07),transparent_55%)]" />
            <div className="absolute inset-x-0 top-10 h-px bg-gradient-to-r from-transparent via-cyan-500/40 to-transparent" />
          </div>

          <div className="grid lg:grid-cols-[1.1fr,0.9fr] gap-10 lg:gap-14 items-center">
            <div className="space-y-8">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900/80 border border-cyan-500/40 shadow shadow-cyan-500/40 text-xs sm:text-[11px] uppercase tracking-[0.16em] text-cyan-200/90 data-[fade]/fade-in-up">
                <div className="w-4 h-4 rounded-full bg-emerald-400/20 border border-emerald-300/70 flex items-center justify-center">
                  <Sparkles className="w-2.5 h-2.5 text-emerald-300" />
                </div>
                <span data-fade-up="1">Результаты от 2 часов</span>
                <span className="h-1 w-1 rounded-full bg-slate-500" />
                <span className="text-slate-300/90" data-fade-up="1">
                  Точность, на которую можно опереться
                </span>
              </div>

              <h1
                data-fade-up="1"
                className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-[58px] font-semibold tracking-tight leading-tight"
              >
                <span className="block gradient-text">
                  Медицинская лаборатория,
                </span>
                <span className="block mt-1">
                  которая говорит на языке
                  <span className="gradient-text"> цифр и заботы</span>.
                </span>
              </h1>

              <p
                data-fade-up="1"
                className="text-sm sm:text-base text-slate-300/80 max-w-xl leading-relaxed"
              >
                Современные лабораторные исследования для тех, кто ценит время и
                точность. Никаких очередей, прозрачные результаты, цифровой
                доступ и поддержка врача на каждом шаге.
              </p>

              <div
                data-fade-up="1"
                className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-5"
              >
                <button
                  onClick={() => handleNavClick("pricing")}
                  className="inline-flex items-center justify-center gap-2 px-6 sm:px-8 py-3 sm:py-3.5 rounded-full text-sm sm:text-base font-semibold text-slate-900 btn-primary"
                >
                  Записаться на анализы
                  <ArrowRight className="w-4 h-4" />
                </button>
                <button
                  onClick={() => handleNavClick("how")}
                  className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium text-slate-100 btn-ghost"
                >
                  <PlayIcon />
                  Как всё устроено
                </button>
              </div>

              <div
                data-fade-up="1"
                className="flex flex-wrap items-center gap-4 sm:gap-6 text-xs sm:text-sm"
              >
                <div className="flex -space-x-2">
                  {["А", "И", "С", "Л"].map((char, idx) => (
                    <div
                      key={idx}
                      className="w-7 h-7 rounded-full border border-slate-900/80 bg-gradient-to-br from-cyan-400/80 to-emerald-400/80 flex items-center justify-center text-[11px] font-semibold text-slate-900 shadow-md shadow-cyan-500/50"
                    >
                      {char}
                    </div>
                  ))}
                </div>
                <div className="flex flex-col">
                  <span className="text-slate-200 font-medium">
                    4.9/5 по отзывам пациентов
                  </span>
                  <span className="text-slate-400 text-[11px]">
                    на основе более 12K исследований в год
                  </span>
                </div>
              </div>
            </div>

            <div
              data-fade-up="1"
              className="relative mt-4 lg:mt-0"
            >
              <div className="absolute -inset-0.5 rounded-3xl bg-gradient-to-br from-cyan-400/35 via-sky-500/10 to-emerald-400/35 blur-2xl opacity-80" />
              <div className="relative glass-panel rounded-3xl p-4 sm:p-6 lg:p-7 card-hover">
                <div className="flex items-center justify-between gap-4 mb-4 sm:mb-5">
                  <div>
                    <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-emerald-500/15 border border-emerald-400/50">
                      <ShieldCheck className="w-3.5 h-3.5 text-emerald-300" />
                      <span className="text-[11px] font-medium text-emerald-200">
                        Контроль качества 24/7
                      </span>
                    </div>
                    <h2 className="mt-3 text-base sm:text-lg font-semibold text-slate-50">
                      Профильный чекап здоровья
                    </h2>
                    <p className="text-xs sm:text-[13px] text-slate-300/80 mt-1.5">
                      Готовые наборы анализов для профилактики и мониторинга.
                    </p>
                  </div>
                  <div className="flex flex-col items-end gap-2">
                    <div className="flex items-center gap-1.5 bg-slate-900/70 border border-slate-600/60 rounded-full px-2 py-1">
                      <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                      <span className="text-[10px] text-slate-200">
                        Лаборатория онлайн
                      </span>
                    </div>
                    <div className="flex items-baseline gap-1">
                      <span className="text-xs text-slate-400">готово</span>
                      <span className="text-lg sm:text-xl font-semibold text-emerald-300">
                        &lt; 24 ч
                      </span>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3 sm:gap-4 mb-4 sm:mb-5">
                  <MiniStat
                    icon={<Microscope className="w-4 h-4 text-cyan-300" />}
                    label="Панель микробиологии"
                    value="27 показателей"
                  />
                  <MiniStat
                    icon={<HeartPulse className="w-4 h-4 text-emerald-300" />}
                    label="Кардио-профиль"
                    value="12 маркеров"
                  />
                  <MiniStat
                    icon={<Activity className="w-4 h-4 text-sky-300" />}
                    label="Метаболический статус"
                    value="19 анализов"
                  />
                  <MiniStat
                    icon={<UserCheck className="w-4 h-4 text-teal-300" />}
                    label="Чекап 360°"
                    value="45+ параметров"
                  />
                </div>

                <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4">
                  <div className="flex items-center gap-2">
                    <div className="flex -space-x-1">
                      {[1, 2, 3].map((n) => (
                        <div
                          key={n}
                          className="w-6 h-6 rounded-full border border-slate-900/80 bg-slate-800/90 flex items-center justify-center"
                        >
                          <Star className="w-3 h-3 text-amber-300" />
                        </div>
                      ))}
                    </div>
                    <div className="flex flex-col leading-tight">
                      <span className="text-xs text-slate-300">98% пациентов</span>
                      <span className="text-[11px] text-slate-400">
                        рекомендуют NeoLab друзьям
                      </span>
                    </div>
                  </div>
                  <button
                    onClick={() => handleNavClick("pricing")}
                    className="inline-flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-full text-[11px] font-medium text-cyan-100 bg-cyan-500/15 border border-cyan-400/70 hover:bg-cyan-500/25 transition-colors"
                  >
                    Смотреть готовые профили
                    <ArrowRight className="w-3 h-3" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        <FadeSection id="features">
          <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14 lg:py-18">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8 sm:mb-10">
              <div>
                <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight mb-2">
                  <span className="gradient-text">Почему пациенты</span> и врачи
                  выбирают нас
                </h2>
                <p className="text-sm sm:text-base text-slate-300/80 max-w-xl">
                  Современная инженерия лабораторных процессов, цифровые
                  продукты и человечное отношение. Всё, чтобы каждый анализ
                  был шагом к осознанному здоровью.
                </p>
              </div>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-900/80 border border-slate-700/80 text-[11px] sm:text-xs text-slate-300/90">
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                <span>ISO-сертифицированная лаборатория</span>
                <span className="text-slate-500">•</span>
                <span className="text-emerald-300 font-medium">
                  Клинические рекомендации в основе протоколов
                </span>
              </div>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
              {featureCards.map((feature, index) => (
                <FeatureCard key={feature.title} feature={feature} index={index} />
              ))}
            </div>
          </section>
        </FadeSection>

        <FadeSection id="stats">
          <section className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan-500/40 to-transparent" />
            <div className="relative glass-panel rounded-3xl px-5 sm:px-8 py-6 sm:py-8 lg:py-9 overflow-hidden">
              <div className="absolute inset-px rounded-[22px] bg-gradient-to-r from-cyan-500/12 via-emerald-500/6 to-sky-500/12 pointer-events-none" />
              <div className="relative flex flex-col md:flex-row md:items-center md:justify-between gap-6 sm:gap-8 mb-6 sm:mb-8">
                <div>
                  <h2 className="text-xl sm:text-2xl font-semibold tracking-tight mb-2">
                    <span className="gradient-text">Цифры, за которыми</span>{" "}
                    стоит опыт
                  </h2>
                  <p className="text-sm sm:text-base text-slate-300/80 max-w-xl">
                    Мы измеряем всё: от времени от взятия биоматериала до
                    выдачи результатов, до доли повторных обращений и
                    удовлетворённости пациентов.
                  </p>
                </div>
                <div className="flex items-center gap-3 px-3 py-2 rounded-2xl bg-slate-950/70 border border-slate-700/70">
                  <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-emerald-400/20 to-cyan-400/20 border border-emerald-400/70 flex items-center justify-center">
                    <ShieldCheck className="w-5 h-5 text-emerald-300" />
                  </div>
                  <div className="flex flex-col leading-tight">
                    <span className="text-xs text-slate-300">
                      Внутренний и внешний контроль качества
                    </span>
                    <span className="text-[11px] text-slate-400">
                      каждая партия реагентов проходит двойную проверку
                    </span>
                  </div>
                </div>
              </div>
              <div className="relative grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
                <StatCard
                  label="исследований в год"
                  value={52}
                  suffix="K"
                  accent="from-cyan-400 to-emerald-400"
                />
                <StatCard
                  label="анализов выдаём вовремя"
                  value={99.2}
                  suffix="%"
                  accent="from-emerald-400 to-teal-400"
                />
                <StatCard
                  label="пациентов возвращаются повторно"
                  value={76}
                  suffix="%"
                  accent="from-sky-400 to-cyan-400"
                />
                <StatCard
                  label="среднее время пребывания в лаборатории"
                  value={14}
                  suffix=" мин"
                  accent="from-cyan-400 to-sky-500"
                />
              </div>
            </div>
          </section>
        </FadeSection>

        <FadeSection id="how">
          <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14 lg:py-16">
            <div className="flex flex-col md:flex-row md:items-start gap-6 sm:gap-8 mb-8 sm:mb-10">
              <div className="md:w-1/2">
                <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight mb-2">
                  <span className="gradient-text">Как это работает:</span>{" "}
                  путь анализа без стресса
                </h2>
                <p className="text-sm sm:text-base text-slate-300/80 max-w-xl">
                  Каждый шаг выверен, чтобы вы тратили меньше времени на
                  организацию и больше — на жизнь. Всё — от записи до
                  расшифровки результатов — в одном цифровом потоке.
                </p>
              </div>
              <div className="md:w-1/2 flex items-center md:justify-end">
                <div className="inline-flex items-center gap-3 px-3 py-2 rounded-2xl bg-slate-950/80 border border-slate-700/80">
                  <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-cyan-500/20 to-emerald-500/20 flex items-center justify-center border border-cyan-400/60">
                    <CalendarClock className="w-5 h-5 text-cyan-300" />
                  </div>
                  <div className="flex flex-col leading-tight">
                    <span className="text-xs text-slate-200">
                      Среднее время записи — 42 секунды
                    </span>
                    <span className="text-[11px] text-slate-400">
                      от выбора профиля до подтверждения
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="hidden lg:block absolute top-9 inset-x-10 h-px bg-gradient-to-r from-cyan-500/40 via-emerald-400/60 to-sky-500/40" />
              <div className="grid gap-6 sm:gap-8 lg:grid-cols-3">
                <HowStep
                  number={1}
                  icon={<MouseClickIcon />}
                  title="Выбираете профиль и записываетесь"
                  description="Подбираете готовый набор анализов или составляете свой. Указываете удобное время и формат — в лаборатории или на дому."
                />
                <HowStep
                  number={2}
                  icon={<TestTube2 className="w-6 h-6 text-cyan-300" />}
                  title="Сдаёте анализы — быстро и бережно"
                  description="Среднее время в лаборатории — до 15 минут. Комфортные зоны ожидания, индивидуальные кабинеты и бережный забор биоматериала."
                />
                <HowStep
                  number={3}
                  icon={<ScreenIcon />}
                  title="Получаете результаты и поддержку"
                  description="Результаты появляются в личном кабинете, где вы видите динамику показателей и можете получить консультацию врача онлайн."
                />
              </div>
            </div>
          </section>
        </FadeSection>

        <FadeSection id="testimonials">
          <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8 sm:mb-10">
              <div>
                <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight mb-2">
                  <span className="gradient-text">Голоса пациентов</span> и
                  партнёров
                </h2>
                <p className="text-sm sm:text-base text-slate-300/80 max-w-xl">
                  Мы ценим честную обратную связь и превращаем её в улучшения.
                  Вот что говорят те, кто уже доверил нам своё здоровье и
                  здоровье команды.
                </p>
              </div>
              <div className="flex items-center gap-2 text-xs sm:text-sm text-slate-300">
                <div className="flex">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className="w-4 h-4 text-amber-300 fill-amber-300"
                    />
                  ))}
                </div>
                <span>4.9/5 на основе 1200+ отзывов</span>
              </div>
            </div>
            <div className="flex gap-4 sm:gap-6 overflow-x-auto pb-2 sm:pb-3 -mx-4 px-4 lg:mx-0 lg:px-0 lg:grid lg:grid-cols-3 lg:overflow-visible">
              {testimonials.map((item) => (
                <TestimonialCard key={item.name} item={item} />
              ))}
            </div>
          </section>
        </FadeSection>

        <FadeSection id="pricing">
          <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14 lg:py-16">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8 sm:mb-10">
              <div>
                <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight mb-2">
                  <span className="gradient-text">Прозрачные тарифы</span> под
                  разные задачи
                </h2>
                <p className="text-sm sm:text-base text-slate-300/80 max-w-xl">
                  От базовых профилей до корпоративных программ. Выбирайте
                  формат, который подходит именно вам, без скрытых платежей и
                  мелкого шрифта.
                </p>
              </div>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-950/80 border border-slate-700/80 text-xs sm:text-sm">
                <span className="text-slate-300/90">Биллинг:</span>
                <button
                  onClick={() => setBillingPeriod("month")}
                  className={`px-2.5 py-1 rounded-full text-xs font-medium ${
                    billingPeriod === "month"
                      ? "bg-cyan-500/20 text-cyan-200 border border-cyan-400/70"
                      : "text-slate-400"
                  }`}
                >
                  Месяц
                </button>
                <button
                  onClick={() => setBillingPeriod("year")}
                  className={`px-2.5 py-1 rounded-full text-xs font-medium flex items-center gap-1 ${
                    billingPeriod === "year"
                      ? "bg-emerald-500/20 text-emerald-200 border border-emerald-400/70"
                      : "text-slate-400"
                  }`}
                >
                  Год
                  <span className="hidden sm:inline text-[10px] text-emerald-200/90">
                    -20%
                  </span>
                </button>
              </div>
            </div>

            <div className="grid md:grid-cols-3 gap-6 lg:gap-7">
              {pricingPlans.map((plan) => {
                const price = priceFor(plan);
                const isPopular = plan.popular;
                return (
                  <div
                    key={plan.name}
                    className={`relative rounded-3xl glass-panel card-hover flex flex-col h-full ${
                      isPopular
                        ? "border-cyan-400/80 shadow-[0_0_0_1px_rgba(34,211,238,0.4)] scale-[1.02]"
                        : ""
                    }`}
                  >
                    {isPopular && (
                      <div className="absolute -top-3 left-5 inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-gradient-to-r from-cyan-400 to-emerald-400 text-[11px] font-semibold text-slate-900 shadow-lg shadow-cyan-500/40">
                        <Sparkles className="w-3.5 h-3.5" />
                        Популярный выбор
                      </div>
                    )}
                    <div className="p-5 sm:p-6 pb-4 sm:pb-5">
                      <div className="flex items-baseline justify-between gap-2 mb-3">
                        <div>
                          <h3 className="text-lg sm:text-xl font-semibold">
                            {plan.name}
                          </h3>
                          <p className="text-xs sm:text-sm text-slate-400 mt-1">
                            {plan.description}
                          </p>
                        </div>
                        <div className="text-right">
                          <div className="flex items-baseline justify-end gap-1">
                            <span className="text-sm text-slate-300">от</span>
                            <span className="text-2xl sm:text-3xl font-semibold gradient-text">
                              {price.toLocaleString("ru-RU")}
                            </span>
                            <span className="text-xs text-slate-400">
                              ₽/{billingPeriod === "month" ? "мес" : "год"}
                            </span>
                          </div>
                          {billingPeriod === "year" && (
                            <span className="text-[11px] text-emerald-300">
                              Экономия до 20% по сравнению с помесячной оплатой
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="px-5 sm:px-6 pb-5 sm:pb-6 flex-1">
                      <ul className="space-y-2.5 text-sm text-slate-200">
                        {plan.features.map((feature) => (
                          <li key={feature} className="flex items-start gap-2.5">
                            <div className="mt-0.5 w-5 h-5 rounded-full bg-emerald-500/15 border border-emerald-400/70 flex items-center justify-center flex-shrink-0">
                              <Check className="w-3 h-3 text-emerald-300" />
                            </div>
                            <span className="text-xs sm:text-[13px]">
                              {feature}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="px-5 sm:px-6 pb-5 sm:pb-6 pt-0">
                      <button
                        onClick={() => handleNavClick("contacts")}
                        className={`w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-full text-sm font-semibold ${
                          isPopular
                            ? "text-slate-900 btn-primary"
                            : "text-slate-100 btn-ghost"
                        }`}
                      >
                        {plan.name === "Энтерпрайз"
                          ? "Обсудить индивидуальную программу"
                          : "Выбрать этот профиль"}
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>
        </FadeSection>

        <FadeSection id="faq">
          <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
            <div className="flex flex-col md:flex-row md:items-start gap-6 sm:gap-8 mb-8 sm:mb-10">
              <div className="md:w-1/3">
                <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight mb-2">
                  <span className="gradient-text">Частые вопросы</span>, которые
                  снимают тревогу
                </h2>
                <p className="text-sm sm:text-base text-slate-300/80">
                  Если вы не нашли ответ — оставьте вопрос в форме ниже. Наш
                  координатор вернётся к вам в течение 15 минут в рабочее
                  время.
                </p>
              </div>
              <div className="md:w-2/3 grid md:grid-cols-2 gap-4 sm:gap-5">
                {faqs.map((item, index) => {
                  const isOpen = openFaq === index;
                  return (
                    <div
                      key={item.q}
                      className="glass-panel rounded-2xl border border-slate-700/80 card-hover"
                    >
                      <button
                        onClick={() =>
                          setOpenFaq((prev) => (prev === index ? null : index))
                        }
                        className="w-full flex items-start gap-2.5 sm:gap-3 px-4 sm:px-5 py-3.5 sm:py-4"
                      >
                        <div className="mt-0.5 w-6 h-6 rounded-full bg-slate-900/80 border border-slate-600/80 flex items-center justify-center flex-shrink-0">
                          <ChevronDown
                            className={`w-3.5 h-3.5 text-cyan-300 transition-transform duration-200 ${
                              isOpen ? "rotate-180" : ""
                            }`}
                          />
                        </div>
                        <div className="flex-1 text-left">
                          <p className="text-xs sm:text-[13px] font-medium text-slate-100">
                            {item.q}
                          </p>
                          <div
                            className={`text-[11px] sm:text-xs text-slate-300/90 mt-1.5 overflow-hidden ${
                              isOpen ? "faq-body-open" : "faq-body-enter"
                            }`}
                          >
                            <p>{item.a}</p>
                          </div>
                        </div>
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>
          </section>
        </FadeSection>

        <FadeSection id="contacts">
          <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-12 sm:pb-16 lg:pb-20">
            <div className="relative rounded-3xl overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/25 via-sky-500/25 to-emerald-500/25 opacity-90" />
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(15,23,42,0.9),transparent_60%),radial-gradient(circle_at_bottom_right,_rgba(15,23,42,0.9),transparent_60%)]" />
              <div className="relative px-5 sm:px-8 lg:px-10 py-7 sm:py-9 lg:py-11 flex flex-col lg:flex-row lg:items-center gap-6 sm:gap-8">
                <div className="lg:w-3/5">
                  <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-slate-950/70 border border-white/15 text-[11px] sm:text-xs text-cyan-100 mb-3 sm:mb-4">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>
                      Первый комплексный чекап — со скидкой{" "}
                      <span className="font-semibold">15%</span>
                    </span>
                  </div>
                  <h2 className="text-2xl sm:text-3xl lg:text-4xl font-semibold tracking-tight mb-3 sm:mb-4">
                    <span className="block">
                      Готовы сделать первый шаг к
                    </span>
                    <span className="block gradient-text">
                      осознанному контролю здоровья?
                    </span>
                  </h2>
                  <p className="text-sm sm:text-base text-slate-100/80 max-w-xl mb-4 sm:mb-5">
                    Оставьте email — вышлем подборку подходящих профилей,
                    чек-листы подготовки и персональное предложение по
                    чекапу именно под ваш запрос.
                  </p>
                  <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4 mb-4 sm:mb-5">
                    <div className="flex-1 flex items-center gap-2 rounded-full bg-slate-950/80 border border-white/15 px-3 py-1.5 sm:py-1.5">
                      <Mail className="w-4 h-4 text-slate-300 flex-shrink-0" />
                      <input
                        type="email"
                        placeholder="Введите ваш email"
                        className="flex-1 bg-transparent outline-none text-xs sm:text-sm text-slate-50 placeholder:text-slate-400"
                      />
                    </div>
                    <button className="inline-flex items-center justify-center gap-2 px-5 sm:px-7 py-2.5 rounded-full text-sm font-semibold text-slate-900 btn-primary">
                      Получить подборку анализов
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                  <div className="flex flex-wrap items-center gap-3 text-[11px] sm:text-xs text-slate-100/80">
                    <div className="flex items-center gap-1.5">
                      <ShieldCheck className="w-3.5 h-3.5 text-emerald-300" />
                      <span>Медицинская тайна и защита персональных данных</span>
                    </div>
                    <span className="hidden sm:inline text-slate-300/60">•</span>
                    <div className="flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-cyan-300" />
                      <span>Ответим в течение 15 минут в рабочее время</span>
                    </div>
                  </div>
                </div>
                <div className="lg:w-2/5">
                  <div className="rounded-2xl bg-slate-950/80 border border-white/10 p-4 sm:p-5 space-y-4 sm:space-y-5">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <h3 className="text-sm sm:text-base font-semibold text-slate-50 mb-1">
                          Контакт-центр NeoLab
                        </h3>
                        <p className="text-[11px] sm:text-xs text-slate-300/80">
                          Поможем подобрать анализы, подготовиться и записаться в
                          удобное время.
                        </p>
                      </div>
                      <div className="w-9 h-9 rounded-full bg-gradient-to-br from-cyan-400/25 to-emerald-400/25 border border-cyan-300/60 flex items-center justify-center">
                        <HeadsetIcon />
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-3 text-xs sm:text-[13px] text-slate-100/90">
                      <div className="space-y-1.5">
                        <div className="text-slate-400 text-[11px]">
                          Телефон
                        </div>
                        <div className="font-semibold text-slate-50">
                          +7 (495) 000-00-00
                        </div>
                        <div className="text-[11px] text-slate-400">
                          ежедневно с 7:00 до 22:00
                        </div>
                      </div>
                      <div className="space-y-1.5">
                        <div className="text-slate-400 text-[11px]">
                          Адрес флагманского центра
                        </div>
                        <div className="font-semibold text-slate-50">
                          Москва, ул. Здоровья, 12
                        </div>
                        <div className="text-[11px] text-slate-400">
                          3 минуты от м. Парк науки
                        </div>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-2 text-[11px] sm:text-xs">
                      <div className="flex items-center gap-2 rounded-xl bg-slate-900/90 border border-slate-700/80 px-2.5 py-2">
                        <CalendarClock className="w-3.5 h-3.5 text-cyan-300" />
                        <span>Онлайн-запись без ожидания на линии</span>
                      </div>
                      <div className="flex items-center gap-2 rounded-xl bg-slate-900/90 border border-slate-700/80 px-2.5 py-2">
                        <UserCheck className="w-3.5 h-3.5 text-emerald-300" />
                        <span>
                          Персональный кабинет для контроля всей истории анализов
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </FadeSection>
      </main>

      <footer className="border-t border-slate-800/80 bg-slate-950/80 backdrop-blur-xl">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
          <div className="grid gap-8 md:grid-cols-[1.8fr,2fr] lg:grid-cols-[1.8fr,2.4fr]">
            <div className="space-y-4 sm:space-y-5">
              <div className="flex items-center gap-2 sm:gap-3">
                <div className="relative">
                  <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-2xl bg-slate-900/80 border border-cyan-400/70 flex items-center justify-center shadow-lg shadow-cyan-500/30">
                    <TestTube2 className="w-5 h-5 sm:w-6 sm:h-6 text-cyan-300" />
                  </div>
                </div>
                <div className="flex flex-col">
                  <span className="font-semibold text-sm sm:text-base">
                    NeoLab Diagnostics
                  </span>
                  <span className="text-[11px] sm:text-xs text-slate-400">
                    Медицинская лаборатория нового поколения
                  </span>
                </div>
              </div>
              <p className="text-xs sm:text-sm text-slate-400 max-w-md">
                Мы объединяем точность лабораторной диагностики, цифровые
                технологии и человеческую эмпатию, чтобы сделать заботу о
                здоровье понятной и предсказуемой.
              </p>
              <div className="flex items-center gap-3">
                <span className="text-[11px] text-slate-500">
                  Следите за обновлениями:
                </span>
                <div className="flex items-center gap-2">
                  <SocialIcon Icon={Github} label="Github" />
                  <SocialIcon Icon={Twitter} label="Twitter" />
                  <SocialIcon Icon={Linkedin} label="LinkedIn" />
                  <SocialIcon Icon={Instagram} label="Instagram" />
                </div>
              </div>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-5 text-xs sm:text-sm">
              <FooterColumn
                title="Пациентам"
                links={[
                  "Чекапы и профили",
                  "Подготовка к анализам",
                  "Личный кабинет",
                  "Вопросы и ответы",
                ]}
              />
              <FooterColumn
                title="Врачам"
                links={[
                  "Партнёрская программа",
                  "Справочник анализов",
                  "Передача направлений",
                  "Образцы заключений",
                ]}
              />
              <FooterColumn
                title="Компаниям"
                links={[
                  "Корпоративные чекапы",
                  "Медицинские программы",
                  "Выездные сессии",
                  "HR-аналитика здоровья",
                ]}
              />
              <FooterColumn
                title="О лаборатории"
                links={[
                  "О NeoLab",
                  "Качество и стандарты",
                  "Локации и часы работы",
                  "Документы и лицензии",
                ]}
              />
            </div>
          </div>
          <div className="mt-6 sm:mt-8 pt-4 border-t border-slate-800/80 flex flex-col sm:flex-row gap-3 sm:items-center justify-between text-[11px] sm:text-xs text-slate-500">
            <div>
              © {new Date().getFullYear()} NeoLab Diagnostics. Все права
              защищены.
            </div>
            <div className="flex flex-wrap items-center gap-3">
              <button className="hover:text-slate-300 transition-colors">
                Политика конфиденциальности
              </button>
              <span className="hidden sm:inline">•</span>
              <button className="hover:text-slate-300 transition-colors">
                Пользовательское соглашение
              </button>
              <span className="hidden sm:inline">•</span>
              <span>18+ Медицинские услуги</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

function FadeSection({ id, children }) {
  const [ref, inView] = useInView();
  return (
    <div
      id={id}
      ref={ref}
      className={`fade-section ${inView ? "visible" : ""}`}
    >
      {children}
    </div>
  );
}

function FeatureCard({ feature, index }) {
  const [ref, inView] = useInView();
  return (
    <div
      ref={ref}
      style={{ transitionDelay: `${index * 80}ms` }}
      className={`glass-panel rounded-2xl p-4 sm:p-5 border border-slate-700/80 card-hover fade-section ${
        inView ? "visible" : ""
      }`}
    >
      <div className="flex items-center gap-3 mb-3">
        <div className="w-9 h-9 rounded-2xl bg-slate-900/80 border border-slate-600/80 flex items-center justify-center">
          {feature.icon}
        </div>
        <h3 className="text-sm sm:text-base font-semibold text-slate-50">
          {feature.title}
        </h3>
      </div>
      <p className="text-xs sm:text-sm text-slate-300/90 leading-relaxed">
        {feature.description}
      </p>
    </div>
  );
}

function StatCard({ label, value, suffix, accent }) {
  return (
    <div className="relative rounded-2xl border border-slate-700/80 bg-slate-950/90 overflow-hidden">
      <div
        className={`absolute inset-0 bg-gradient-to-br ${accent} opacity-20`}
      />
      <div className="relative px-4 sm:px-5 py-4 sm:py-5">
        <div className="text-[11px] sm:text-xs uppercase tracking-[0.16em] text-slate-400 mb-1.5">
          {label}
        </div>
        <div className="flex items-baseline gap-1">
          <span className="text-2xl sm:text-3xl font-semibold gradient-text">
            <AnimatedCounter value={value} suffix={suffix} />
          </span>
        </div>
      </div>
    </div>
  );
}

function HowStep({ number, icon, title, description }) {
  return (
    <div className="relative flex flex-col h-full">
      <div className="flex items-center gap-3 mb-3 sm:mb-4">
        <div className="relative">
          <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-2xl bg-slate-950/90 border border-slate-700/80 flex items-center justify-center">
            {icon}
          </div>
          <div className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 px-2 py-0.5 rounded-full bg-gradient-to-r from-cyan-400 to-emerald-400 text-[10px] font-semibold text-slate-900 shadow-md">
            Шаг {number}
          </div>
        </div>
        <h3 className="text-sm sm:text-base font-semibold text-slate-50">
          {title}
        </h3>
      </div>
      <p className="text-xs sm:text-sm text-slate-300/90 leading-relaxed flex-1">
        {description}
      </p>
    </div>
  );
}

function MiniStat({ icon, label, value }) {
  return (
    <div className="flex items-start gap-2.5 rounded-2xl bg-slate-950/80 border border-slate-700/80 px-3 py-2.5">
      <div className="w-7 h-7 rounded-2xl bg-slate-900/90 border border-slate-600/80 flex items-center justify-center flex-shrink-0">
        {icon}
      </div>
      <div className="flex flex-col">
        <span className="text-[11px] sm:text-xs text-slate-400">{label}</span>
        <span className="text-xs sm:text-sm text-slate-50 font-medium">
          {value}
        </span>
      </div>
    </div>
  );
}

function TestimonialCard({ item }) {
  const initials = getInitials(item.name);
  return (
    <div className="min-w-[240px] max-w-xs lg:max-w-none glass-panel rounded-2xl border border-slate-700/80 card-hover p-4 sm:p-5 flex flex-col justify-between">
      <div className="flex items-center gap-3 mb-3">
        <div
          className={`w-10 h-10 rounded-full bg-gradient-to-br ${item.color} flex items-center justify-center text-sm font-semibold text-slate-900 shadow-md shadow-cyan-500/40`}
        >
          {initials}
        </div>
        <div className="flex flex-col">
          <span className="text-xs sm:text-sm font-semibold text-slate-50">
            {item.name}
          </span>
          <span className="text-[11px] sm:text-xs text-slate-400">
            {item.role}
          </span>
        </div>
      </div>
      <div className="flex items-center gap-1 mb-3">
        {Array.from({ length: item.rating }).map((_, i) => (
          <Star
            key={i}
            className="w-3.5 h-3.5 text-amber-300 fill-amber-300"
          />
        ))}
      </div>
      <p className="text-xs sm:text-sm text-slate-200/90 leading-relaxed">
        “{item.text}”
      </p>
    </div>
  );
}

function FooterColumn({ title, links }) {
  return (
    <div className="space-y-2">
      <div className="text-[11px] sm:text-xs font-semibold text-slate-200 uppercase tracking-[0.14em]">
        {title}
      </div>
      <ul className="space-y-1.5">
        {links.map((link) => (
          <li key={link}>
            <button className="text-[11px] sm:text-xs text-slate-400 hover:text-slate-200 transition-colors">
              {link}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

function SocialIcon({ Icon, label }) {
  return (
    <button
      aria-label={label}
      className="w-8 h-8 rounded-full bg-slate-900/80 border border-slate-700/80 flex items-center justify-center text-slate-300 hover:border-cyan-400/80 hover:text-cyan-300 hover:shadow-lg hover:shadow-cyan-500/40 transition-all"
    >
      <Icon className="w-3.5 h-3.5" />
    </button>
  );
}

function PlayIcon() {
  return (
    <span className="inline-flex items-center justify-center w-4 h-4 rounded-full border border-slate-500/80">
      <span className="ml-[1px] w-0 h-0 border-y-[4px] border-y-transparent border-l-[6px] border-l-slate-100" />
    </span>
  );
}

function MouseClickIcon() {
  return (
    <div className="relative">
      <div className="w-5 h-7 rounded-full border border-cyan-300/80 bg-slate-900/80 flex items-start justify-center pt-1">
        <div className="w-1 h-2 rounded-full bg-cyan-300/90" />
      </div>
      <div className="absolute -bottom-1 -right-1 w-3 h-3 rounded-full bg-emerald-400/90 border border-emerald-200/80" />
    </div>
  );
}

function ScreenIcon() {
  return (
    <div className="w-7 h-7 rounded-2xl bg-slate-900/80 border border-sky-400/60 flex items-center justify-center">
      <div className="w-5 h-3 rounded-md bg-gradient-to-r from-sky-400/60 to-cyan-400/60 border border-sky-200/70" />
    </div>
  );
}

function HeadsetIcon() {
  return (
    <div className="relative">
      <div className="w-5 h-5 rounded-full border border-cyan-300/80" />
      <div className="absolute inset-y-1 -left-1 w-1 rounded-full bg-cyan-300/90" />
      <div className="absolute inset-y-1 -right-1 w-1 rounded-full bg-cyan-300/90" />
      <div className="absolute bottom-0 right-0 w-3 h-2 rounded-full bg-cyan-400/80" />
    </div>
  );
}

export default App;

