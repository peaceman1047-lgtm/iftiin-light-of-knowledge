import { createFileRoute } from "@tanstack/react-router";
import {
  ArrowRight,
  BookOpen,
  BriefcaseBusiness,
  ChevronRight,
  Clock3,
  Facebook,
  Globe2,
  GraduationCap,
  HeartHandshake,
  Instagram,
  Mail,
  Menu,
  MessageCircle,
  Play,
  Quote,
  Smartphone,
  Sparkles,
  Star,
  WalletCards,
  X,
} from "lucide-react";
import { useEffect, useMemo, useRef, useState, type CSSProperties, type MouseEvent } from "react";
import { QRCodeSVG } from "qrcode.react";

import { Button } from "@/components/ui/button";
import heroImage from "@/assets/iftiin-hero.jpg";
import technologyImage from "@/assets/track-technology.jpg";
import languageImage from "@/assets/track-language.jpg";
import truckingImage from "@/assets/track-trucking.jpg";
import careerImage from "@/assets/track-career.jpg";
import lifeImage from "@/assets/track-life.jpg";
import businessImage from "@/assets/track-business.jpg";
import aminaImage from "@/assets/testimonial-amina.jpg";
import yusufImage from "@/assets/testimonial-yusuf.jpg";
import hodanImage from "@/assets/testimonial-hodan.jpg";
import globalLearnersImage from "@/assets/global-online-learners.jpg";
import studyCommunityImage from "@/assets/online-study-community.jpg";
import { initializeAnalytics, trackOutbound } from "@/lib/analytics";

const WHATSAPP_URL = "https://wa.me/254714348375";
const CONTACT_EMAIL = "hussein.farah@students.jkuat.ac.ke";
const SKOOL_URL = "https://www.skool.com/your-community";

type Course = { title: string; description: string; badge: string; image: string };
type Track = { name: string; short: string; intro: string; courses: Course[]; flagship?: boolean };

const tracks: Track[] = [
  {
    name: "Language & Culture",
    short: "Language",
    flagship: true,
    intro: "Keep language, faith, and belonging strong across generations.",
    courses: [
      { title: "Somali Language for Diaspora Kids", description: "Help your child speak with grandparents, understand their roots, and feel proud of who they are.", badge: "Flagship", image: languageImage },
      { title: "English Language", description: "Build confident conversational and academic English for school, work, and everyday life.", badge: "Popular", image: careerImage },
      { title: "Quran, Arabic & Islamic Studies", description: "A calm, supportive path to reading, understanding, and growing in faith from home.", badge: "Flagship", image: languageImage },
    ],
  },
  {
    name: "Trucking & Logistics",
    short: "Trucking",
    flagship: true,
    intro: "Practical preparation for one of the diaspora’s most proven career paths.",
    courses: [
      { title: "CDL Permit Test Prep", description: "Study the rules, signs, and safety knowledge you need to walk into your permit test prepared.", badge: "Flagship", image: truckingImage },
      { title: "Dispatch Fundamentals", description: "Learn the real workflow behind loads, brokers, routes, and driver communication.", badge: "Popular", image: truckingImage },
      { title: "Owner-Operator Basics", description: "Understand costs, compliance, loads, and cash flow before putting your own truck on the road.", badge: "New", image: truckingImage },
    ],
  },
  {
    name: "Technology & Digital Skills",
    short: "Technology",
    intro: "Build digital confidence that opens doors at school, work, and in business.",
    courses: [
      { title: "Microsoft Office Essentials", description: "Create polished documents, useful spreadsheets, and confident presentations for work or school.", badge: "Popular", image: technologyImage },
      { title: "AI Tools for Beginners", description: "Use everyday AI to learn faster, write better, organize life, and turn ideas into action.", badge: "New", image: technologyImage },
      { title: "Mathematics", description: "Clear, patient, exam-focused support that makes difficult topics finally click.", badge: "Popular", image: lifeImage },
      { title: "Basic Coding / Web Design", description: "Build your first web pages and discover how digital products come to life.", badge: "New", image: technologyImage },
      { title: "Social Media & Digital Marketing", description: "Plan content, grow an audience, and promote a small business with purpose.", badge: "Popular", image: technologyImage },
    ],
  },
  {
    name: "Immigration & Life-Abroad Prep",
    short: "Life Abroad",
    intro: "Walk into important tests and new chapters feeling prepared, not overwhelmed.",
    courses: [
      { title: "US Citizenship Test Prep", description: "Learn the civics, vocabulary, and interview confidence you need for naturalization day.", badge: "Popular", image: careerImage },
      { title: "Life in the UK Test Prep", description: "Focused practice and plain-English guidance for a major step toward settling in the UK.", badge: "Popular", image: careerImage },
      { title: "Driving Theory Test Prep", description: "Master road rules and hazard awareness with US, UK, and Kenya-focused variants.", badge: "New", image: truckingImage },
      { title: "IELTS / TOEFL Prep", description: "Strengthen speaking, listening, reading, and writing for your next study or career move.", badge: "Popular", image: careerImage },
    ],
  },
  {
    name: "Career & Business Skills",
    short: "Career",
    intro: "Turn your experience and ambition into stronger applications and healthier businesses.",
    courses: [
      { title: "CV Writing & Job Interview Skills", description: "Tell your story clearly, present your strengths, and enter interviews ready to shine.", badge: "Popular", image: careerImage },
      { title: "Small Business & Bookkeeping", description: "Use simple Excel systems to understand sales, expenses, and the true health of your business.", badge: "New", image: businessImage },
    ],
  },
  {
    name: "School Support for Diaspora Kids",
    short: "School",
    intro: "Patient, culturally aware support that helps young learners catch up and aim higher.",
    courses: [
      { title: "Science", description: "Make key exam topics memorable through clear explanations and practical examples.", badge: "Popular", image: lifeImage },
      { title: "English as a School Subject", description: "Grow stronger in reading, analysis, writing, and the confidence to speak up in class.", badge: "New", image: languageImage },
    ],
  },
  {
    name: "Family Life",
    short: "Family",
    intro: "Practical tools for raising grounded, confident children between cultures.",
    courses: [
      { title: "Parenting in the Diaspora", description: "Navigate identity, school, communication, and family expectations with empathy and practical tools.", badge: "New", image: lifeImage },
    ],
  },
  {
    name: "High-Demand Additions",
    short: "Top Picks",
    intro: "Forward-looking skills for the opportunities diaspora learners ask about most.",
    courses: [
      { title: "Nursing / CNA / Healthcare Prep", description: "Build the knowledge, vocabulary, and test confidence to begin a caring healthcare career.", badge: "Top Pick", image: lifeImage },
      { title: "Import-Export & Trade Skills", description: "Understand suppliers, shipping, customs, and how to connect markets across borders.", badge: "New", image: businessImage },
      { title: "Real Estate Investment", description: "Learn how to evaluate property, risk, financing, and long-term opportunities from wherever you live.", badge: "New", image: businessImage },
      { title: "Halal Finance & Investing", description: "Build wealth thoughtfully through practical, faith-conscious financial principles.", badge: "Popular", image: businessImage },
      { title: "Visa & Scholarship Guidance", description: "Find opportunities, strengthen applications, and plan your study-abroad journey with clarity.", badge: "Top Pick", image: careerImage },
    ],
  },
];

const benefits = [
  { icon: HeartHandshake, title: "Taught by our own", text: "Somali educators who know the culture, the language, and the journey." },
  { icon: BriefcaseBusiness, title: "Real careers, real skills", text: "From trucking to nursing prep, learn skills that lead somewhere." },
  { icon: WalletCards, title: "Pay your way", text: "Card and PayPal abroad; EVC Plus, Zaad, and M-Pesa back home." },
  { icon: Clock3, title: "Learn on your schedule", text: "Join live classes or download lessons when bandwidth is limited." },
];

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Astra USA Academy | Online Learning for the Somali Diaspora" },
      { name: "description", content: "Online language, career, faith, and life-skills courses for Somali learners in the UK, USA, Somalia, and worldwide." },
      { property: "og:title", content: "Astra USA Academy — Learn, Grow & Get Ahead" },
      { property: "og:description", content: "Practical online courses created for the Somali diaspora, wherever you live." },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://iftiin-light-of-knowledge.lovable.app/" },
      { property: "og:image", content: "https://iftiin-light-of-knowledge.lovable.app/og-iftiin-academy.jpg" },
      { property: "og:image:width", content: "1200" },
      { property: "og:image:height", content: "630" },
      { property: "og:image:alt", content: "Somali diaspora learners studying online with Astra USA Academy" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Astra USA Academy — Learn, Grow & Get Ahead" },
      { name: "twitter:description", content: "Practical online courses created for the Somali diaspora, wherever you live." },
      { name: "twitter:image", content: "https://iftiin-light-of-knowledge.lovable.app/og-iftiin-academy.jpg" },
    ],
    links: [{ rel: "canonical", href: "https://iftiin-light-of-knowledge.lovable.app/" }],
  }),
  component: Index,
});

/* Badges never rely on colour alone: each carries its own label and icon. */
const badgeStyles: Record<string, string> = {
  Flagship: "bg-gold text-gold-foreground",
  "Top Pick": "bg-primary text-primary-foreground",
  Popular: "bg-surface text-primary ring-1 ring-border-strong",
  New: "bg-surface text-gold-foreground ring-1 ring-border-strong",
};

function CourseBadge({ label }: { label: string }) {
  const Icon = label === "Flagship" || label === "Top Pick" ? Star : Sparkles;
  return (
    <span className={`absolute left-3 top-3 inline-flex items-center gap-1.5 rounded-sm px-2.5 py-1 text-[11px] font-bold uppercase tracking-wide shadow-sm ${badgeStyles[label] ?? badgeStyles["Popular"]}`}>
      <Icon className="size-3" aria-hidden="true" />
      {label}
    </span>
  );
}

function Logo({ inverted = false }: { inverted?: boolean }) {
  return (
    <a href="#home" className="flex items-center gap-2.5" aria-label="Astra USA Academy home">
      <span className={`grid size-9 place-items-center rounded-md chip-grad ${inverted ? "opacity-90" : ""}`}>
        <Sparkles className="size-5 text-gold" />
      </span>
      <span className={`font-display text-lg font-extrabold tracking-tight ${inverted ? "text-primary-foreground" : "text-primary"}`}>
        Astra<span className="text-gold"> USA</span>
      </span>
    </a>
  );
}

/* Falling-stars decorative layer for dark panels. No-ops under reduced motion. */
function Starfield({ count = 36, fall = 680 }: { count?: number; fall?: number }) {
  const stars = useMemo(
    () =>
      Array.from({ length: count }, () => ({
        left: Math.random() * 100,
        size: Math.random() * 2 + 1.1,
        duration: Math.random() * 9 + 6,
        delay: Math.random() * -14,
        opacity: Math.random() * 0.5 + 0.35,
        gold: Math.random() > 0.68,
      })),
    [count],
  );
  return (
    <div className="starfield" aria-hidden="true">
      {stars.map((s, i) => (
        <span
          key={i}
          className="star"
          style={
            {
              left: `${s.left}%`,
              width: `${s.size}px`,
              height: `${s.size}px`,
              "--duration": `${s.duration}s`,
              "--delay": `${s.delay}s`,
              "--star-color": s.gold ? "var(--gold-bright)" : "#fffaf0",
              "--star-opacity": s.opacity,
              "--fall": `${fall}px`,
            } as CSSProperties
          }
        />
      ))}
    </div>
  );
}

function Index() {
  const [activeTrack, setActiveTrack] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);
  const techPanelRef = useRef<HTMLDivElement>(null);
  const track = tracks[activeTrack] ?? tracks[0];
  useEffect(() => initializeAnalytics(), []);

  /* Fade-and-rise on scroll, once per element, skipped when reduced motion is preferred. */
  useEffect(() => {
    const nodes = Array.from(document.querySelectorAll<HTMLElement>('[data-reveal="hidden"]'));
    if (!nodes.length) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches || !("IntersectionObserver" in window)) {
      nodes.forEach((node) => node.setAttribute("data-reveal", "shown"));
      return;
    }
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.setAttribute("data-reveal", "shown");
          observer.unobserve(entry.target);
        });
      },
      { rootMargin: "0px 0px -10% 0px", threshold: 0.05 },
    );
    nodes.forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, [activeTrack]);

  if (!track) return null;

  const handleTechMove = (event: MouseEvent<HTMLDivElement>) => {
    const panel = techPanelRef.current;
    if (!panel) return;
    const bounds = panel.getBoundingClientRect();
    panel.style.setProperty("--cursor-x", `${event.clientX - bounds.left}px`);
    panel.style.setProperty("--cursor-y", `${event.clientY - bounds.top}px`);
  };

  const trackWhatsApp = (label: string) => trackOutbound({ action: "whatsapp_enroll_click", destination: "whatsapp", label });
  const trackSkool = (label: string, course?: string) =>
    trackOutbound({
      action: course ? "course_card_click" : "skool_enroll_click",
      destination: "skool",
      label,
      ...(course ? { course, track: track.name } : {}),
    });

  return (
    <main className="overflow-hidden">
      <header className="fixed inset-x-0 top-0 z-50 border-b border-border/70 bg-background/90 backdrop-blur-xl">
        <div className="section-shell grid h-17 grid-cols-[minmax(0,1fr)_auto] items-center gap-4 lg:flex lg:justify-between">
          <Logo />
          <nav aria-label="Main navigation" className="hidden items-center gap-7 lg:flex">
            {[["Home", "#home"], ["Courses", "#courses"], ["How it works", "#how-it-works"], ["Stories", "#testimonials"], ["Contact", "#contact"]].map(([label, href]) => <a key={href} href={href} className="text-sm font-semibold text-muted-foreground transition-colors hover:text-primary">{label}</a>)}
          </nav>
          <div className="hidden lg:block"><Button asChild variant="whatsapp"><a href={WHATSAPP_URL} target="_blank" rel="noreferrer" onClick={() => trackWhatsApp("Header enroll now")}><MessageCircle className="size-4" />Enroll on WhatsApp</a></Button></div>
          <Button aria-label={menuOpen ? "Close menu" : "Open menu"} variant="ghost" size="icon" className="lg:hidden" onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? <X /> : <Menu />}</Button>
        </div>
        {menuOpen && <nav aria-label="Mobile navigation" className="border-t border-border bg-background px-4 py-4 lg:hidden">{[["Home", "#home"], ["Courses", "#courses"], ["How it works", "#how-it-works"], ["Testimonials", "#testimonials"], ["Contact", "#contact"]].map(([label, href]) => <a key={href} href={href} onClick={() => setMenuOpen(false)} className="block border-b border-border py-3 font-bold text-foreground last:border-0">{label}</a>)}</nav>}
      </header>

      <section id="home" className="relative min-h-[92svh] scroll-mt-20 bg-primary pt-17 text-primary-foreground">
        <img src={heroImage} width={1280} height={853} fetchPriority="high" decoding="async" alt="Somali diaspora learners studying together with laptops" className="absolute inset-0 size-full object-cover object-[68%_center]" />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,var(--primary)_0%,color-mix(in_oklab,var(--primary)_94%,transparent)_38%,color-mix(in_oklab,var(--primary)_35%,transparent)_72%,color-mix(in_oklab,var(--primary)_15%,transparent)_100%)]" />
        <Starfield count={42} fall={900} />
        <div className="section-shell relative z-10 flex min-h-[calc(92svh-4.25rem)] items-end pb-12 pt-20 sm:items-center sm:pb-16">
          <div className="max-w-3xl reveal-up">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-gold/40 bg-primary/50 px-3 py-1.5 text-xs font-bold backdrop-blur"><Sparkles className="size-4 text-gold" />Knowledge without borders</div>
            <h1 className="text-balance font-display text-[2.6rem] font-extrabold leading-[1.02] tracking-[-0.02em] sm:text-7xl lg:text-8xl">Astra USA Academy — Where the Somali Diaspora <span className="text-gold">Learns, Grows, and Gets Ahead.</span></h1>
            <p className="mt-6 max-w-xl text-balance text-base leading-7 text-primary-foreground/90 sm:text-lg">Language, careers, faith, and life skills — taught by people who understand your journey. Learn from anywhere, pay the way that works for you.</p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button asChild variant="whatsapp" size="lg"><a href={WHATSAPP_URL} target="_blank" rel="noreferrer" onClick={() => trackWhatsApp("Hero enroll")}><MessageCircle className="size-5" />Enroll / Join WhatsApp</a></Button>
              <Button asChild size="lg" className="border border-primary-foreground/40 bg-primary-foreground/10 hover:bg-primary-foreground/20"><a href="#courses">Browse courses <ArrowRight className="size-4" /></a></Button>
            </div>
          </div>
        </div>
      </section>

      <div className="bg-gold text-gold-foreground"><div className="section-shell flex flex-col items-center justify-between gap-3 py-4 text-center text-sm font-bold sm:flex-row sm:text-left"><span className="flex items-center gap-2"><Globe2 className="size-5" />Trusted by learners across the diaspora</span><span className="text-xs sm:text-sm">United States · United Kingdom · Kenya · Somalia</span></div></div>

      <section className="section-soft relative py-20 sm:py-28">
        <div className="aurora-blob left-[-6rem] top-10 size-72 bg-primary/20" aria-hidden="true" />
        <div className="aurora-blob right-[-4rem] bottom-0 size-80 bg-gold/25" aria-hidden="true" />
        <div data-reveal="hidden" className="section-shell relative grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <div><span className="section-kicker"><Globe2 className="size-4" />One academy, worldwide</span><h2 className="mt-4 text-balance text-3xl font-extrabold sm:text-5xl">Your classroom travels with you.</h2><p className="mt-5 max-w-xl leading-7 text-muted-foreground">Join online from London, Minneapolis, Mogadishu, Nairobi, or wherever opportunity takes you. Learn on a laptop, tablet, or phone without leaving your community behind.</p><div className="mt-7 flex flex-wrap gap-2 text-xs font-extrabold text-primary"><span className="rounded-sm bg-surface px-3 py-2 shadow-sm ring-1 ring-border">UK learners</span><span className="rounded-sm bg-surface px-3 py-2 shadow-sm ring-1 ring-border">USA learners</span><span className="rounded-sm bg-surface px-3 py-2 shadow-sm ring-1 ring-border">Somalia learners</span><span className="rounded-sm bg-surface px-3 py-2 shadow-sm ring-1 ring-border">Worldwide diaspora</span></div></div>
          <div ref={techPanelRef} onMouseMove={handleTechMove} className="tech-panel group relative overflow-hidden rounded-lg border border-border bg-primary shadow-card"><img src={globalLearnersImage} width={1280} height={853} loading="lazy" decoding="async" alt="Somali online learners using a laptop, tablet, and phone in the UK, USA, and Somalia" className="aspect-[3/2] size-full object-cover transition-transform duration-700 group-hover:scale-[1.02]" /><div className="tech-grid" aria-hidden="true" /><div className="tech-cursor" aria-hidden="true" /><div className="absolute inset-x-4 bottom-4 flex items-center justify-between rounded-md border border-primary-foreground/20 bg-primary/85 px-4 py-3 text-primary-foreground backdrop-blur"><span className="text-xs font-extrabold uppercase tracking-[0.14em]">Live online · Learn anywhere</span><span className="size-2 rounded-full bg-gold shadow-[0_0_18px_var(--gold)]" /></div></div>
        </div>
      </section>

      <section className="section-tint relative py-20 sm:py-28">
        <div className="aurora-blob right-[-5rem] top-0 size-72 bg-gold/20" aria-hidden="true" />
        <div data-reveal="hidden" className="section-shell relative">
          <div className="max-w-2xl"><span className="section-kicker"><Star className="size-4" />Why Astra</span><h2 className="mt-4 text-balance text-3xl font-extrabold leading-tight sm:text-5xl">Built around how our community actually learns.</h2></div>
          <div className="mt-12 grid gap-px overflow-hidden rounded-lg border border-border bg-border sm:grid-cols-2 lg:grid-cols-4">{benefits.map(({ icon: Icon, title, text }, index) => <article key={title} className="group bg-surface p-6 transition-colors hover:bg-gold-soft"><span className="mb-8 grid size-11 place-items-center rounded-full chip-grad text-gold"><Icon className="size-5" /></span><span className="text-xs font-extrabold text-gold-foreground">0{index + 1}</span><h3 className="mt-2 text-lg font-extrabold">{title}</h3><p className="mt-2 text-sm leading-6 text-muted-foreground">{text}</p></article>)}</div>
        </div>
      </section>

      <section id="courses" className="section-soft relative scroll-mt-16 py-20 sm:py-28">
        <div className="aurora-blob left-[-4rem] top-20 size-72 bg-primary/15" aria-hidden="true" />
        <div className="section-shell relative">
          <div className="grid gap-6 lg:grid-cols-[1fr_auto] lg:items-end"><div className="max-w-3xl"><span className="section-kicker"><BookOpen className="size-4" />Course catalog</span><h2 className="mt-4 text-balance text-3xl font-extrabold sm:text-5xl">Skills for the life you’re building.</h2><p className="mt-4 max-w-2xl leading-7 text-muted-foreground">Start with what matters now. Every course is practical, welcoming, and built to move you forward.</p></div><div className="flex items-center gap-2 text-sm font-bold text-primary"><Play className="size-4 fill-current" />Live + downloadable lessons</div></div>
          <div className="mt-10 flex gap-2 overflow-x-auto pb-3" role="tablist" aria-label="Course tracks">{tracks.map((item, index) => <button key={item.name} type="button" role="tab" aria-selected={index === activeTrack} onClick={() => setActiveTrack(index)} className={`shrink-0 rounded-md border px-4 py-2.5 text-sm font-bold transition-all ${index === activeTrack ? "border-primary bg-primary text-primary-foreground shadow-button" : "border-border bg-surface text-muted-foreground hover:border-primary hover:text-primary"}`}>{item.short}{item.flagship && <span className="ml-2 text-gold">★</span>}</button>)}</div>
          <div className="mt-7 flex flex-col gap-2 border-l-4 border-gold pl-4"><p className="text-xs font-extrabold uppercase tracking-[0.14em] text-primary">{track.flagship ? "Flagship track" : `Track ${activeTrack + 1}`}</p><h3 className="text-2xl font-extrabold sm:text-3xl">{track.name}</h3><p className="text-sm text-muted-foreground">{track.intro}</p></div>
          <div className={`mt-8 grid gap-5 ${track.courses.length === 1 ? "max-w-md" : "sm:grid-cols-2 lg:grid-cols-3"}`}>{track.courses.map((course) => <article data-reveal="hidden" key={course.title} className="group overflow-hidden rounded-lg border border-border bg-card shadow-card transition-all duration-300 hover:-translate-y-1 hover:border-primary/50 hover:shadow-[0_24px_60px_color-mix(in_oklab,var(--primary)_16%,transparent)]"><div className="relative aspect-[4/3] overflow-hidden"><img src={course.image} width={800} height={600} loading="lazy" decoding="async" alt="" className="size-full object-cover transition-transform duration-500 group-hover:scale-[1.03]" /><CourseBadge label={course.badge} /></div><div className="p-5"><h3 className="text-lg font-extrabold leading-snug">{course.title}</h3><p className="mt-2 min-h-18 text-sm leading-6 text-muted-foreground">{course.description}</p><a href={SKOOL_URL} target="_blank" rel="noreferrer" onClick={() => trackSkool("Explore course", course.title)} className="mt-5 inline-flex items-center gap-1 text-sm font-extrabold text-primary">Explore course <ChevronRight className="size-4 transition-transform group-hover:translate-x-1" /></a></div></article>)}</div>
        </div>
      </section>

      <section id="how-it-works" className="section-tint relative scroll-mt-16 py-20 sm:py-28">
        <div className="aurora-blob left-[-5rem] bottom-0 size-80 bg-primary/15" aria-hidden="true" />
        <div data-reveal="hidden" className="section-shell relative"><div className="mx-auto max-w-2xl text-center"><span className="section-kicker"><GraduationCap className="size-4" />How it works</span><h2 className="mt-4 text-balance text-3xl font-extrabold sm:text-5xl">Three simple steps. One brighter next chapter.</h2></div>
          <div className="relative mt-14 grid gap-5 lg:grid-cols-3">{[
            { number: "1", title: "Pick your course", text: "Choose the skill, test, or subject that moves your goals forward.", icon: BookOpen },
            { number: "2", title: "Pay your way", text: "Use card or PayPal in the US, or EVC Plus, Zaad, and M-Pesa in Somalia and Kenya.", icon: WalletCards },
            { number: "3", title: "Start learning", text: "Get enrolled, meet your instructor, and begin with live or downloadable lessons.", icon: Play },
          ].map(({ number, title, text, icon: StepIcon }) => <article key={number} className="relative overflow-hidden rounded-lg border border-border bg-surface p-7 shadow-card transition-all duration-300 hover:-translate-y-1 hover:border-primary/40"><span className="absolute right-6 top-2 font-display text-7xl font-extrabold text-muted/70">{number}</span><span className="relative grid size-12 place-items-center rounded-full chip-grad text-gold"><StepIcon className="size-5" /></span><h3 className="mt-8 text-xl font-extrabold">{title}</h3><p className="mt-2 text-sm leading-6 text-muted-foreground">{text}</p></article>)}</div>
           <div className="relative mt-8 grid gap-5 overflow-hidden rounded-lg bg-primary p-6 text-primary-foreground sm:p-8 lg:grid-cols-[1fr_auto] lg:items-center"><Starfield count={26} fall={520} /><div className="relative z-10"><h3 className="text-xl font-extrabold">Paying from Somalia or Kenya?</h3><p className="mt-2 max-w-2xl text-sm leading-6 text-primary-foreground/90">After payment, message us your receipt on WhatsApp and we’ll enroll you within hours.</p></div><div className="relative z-10"><Button asChild variant="whatsapp" size="lg"><a href={WHATSAPP_URL} target="_blank" rel="noreferrer" onClick={() => trackWhatsApp("Send payment receipt")}><MessageCircle className="size-5" />Send receipt on WhatsApp</a></Button></div></div>
        </div>
      </section>

      <section id="faq" className="section-soft relative py-20 sm:py-28">
        <div className="aurora-blob right-[-4rem] top-10 size-72 bg-gold/20" aria-hidden="true" />
        <div data-reveal="hidden" className="section-shell relative grid gap-12 lg:grid-cols-[0.85fr_1.15fr]">
          <div><span className="section-kicker">Enrollment FAQ</span><h2 className="mt-4 text-balance text-3xl font-extrabold sm:text-5xl">Clear answers before you begin.</h2><p className="mt-5 max-w-lg leading-7 text-muted-foreground">Not sure where to start? Message our team and we’ll help you choose without pressure.</p><img src={studyCommunityImage} width={1280} height={853} loading="lazy" decoding="async" alt="Somali students joining an online study community from home" className="mt-8 aspect-[3/2] w-full rounded-lg object-cover shadow-card ring-1 ring-border" /></div>
          <div className="divide-y divide-border border-y border-border">{[
            ["How does enrollment work?", "Choose a course, select the payment option that works in your country, and complete payment. We’ll confirm your place and send the details you need to begin live or downloadable lessons."],
            ["How does pay-your-way confirmation on WhatsApp work?", "If you pay with EVC Plus, Zaad, or M-Pesa, open WhatsApp after payment and send a clear receipt or transaction screenshot with your name and chosen course. Our team will verify it and enroll you within hours."],
            ["Which course track should I choose?", "Start with your immediate goal: Language & Culture for identity and faith, Trucking or Career Skills for work, Technology for digital confidence, School Support for young learners, or Life-Abroad Prep for tests and relocation. If two tracks fit, ask us on WhatsApp."],
          ].map(([question, answer]) => <details key={question} className="group py-5" open={question === "How does enrollment work?"}><summary className="flex cursor-pointer list-none items-center justify-between gap-6 font-display text-lg font-extrabold"><span>{question}</span><span className="grid size-8 shrink-0 place-items-center rounded-full bg-primary text-primary-foreground transition-transform group-open:rotate-45">+</span></summary><p className="max-w-2xl pt-4 text-sm leading-7 text-muted-foreground">{answer}</p></details>)}</div>
        </div>
      </section>

      <section className="relative py-20 sm:py-24">
        <div data-reveal="hidden" className="section-shell relative grid overflow-hidden rounded-2xl bg-primary text-primary-foreground shadow-card lg:grid-cols-[1fr_auto]">
          <Starfield count={30} fall={620} />
          <div className="relative z-10 p-7 sm:p-10"><span className="section-kicker !text-gold">Scan to enroll</span><h2 className="mt-4 max-w-xl text-balance text-3xl font-extrabold sm:text-5xl">Open WhatsApp. Start your next chapter.</h2><p className="mt-4 max-w-xl leading-7 text-primary-foreground/90">Scan with your phone camera to ask about a course, confirm payment, or get help choosing the right track.</p><Button asChild variant="whatsapp" size="lg" className="mt-7"><a href={WHATSAPP_URL} target="_blank" rel="noreferrer" onClick={() => trackWhatsApp("QR section enroll")}><MessageCircle className="size-5" />Open WhatsApp</a></Button></div>
          <a href={WHATSAPP_URL} target="_blank" rel="noreferrer" onClick={() => trackWhatsApp("WhatsApp QR code")} aria-label="Open WhatsApp enrollment" className="relative z-10 m-7 grid place-items-center rounded-xl bg-surface p-5 sm:m-10"><QRCodeSVG value={WHATSAPP_URL} size={210} level="H" bgColor="transparent" fgColor="var(--primary)" title="WhatsApp enrollment QR code" /><span className="mt-3 text-xs font-extrabold text-primary">SCAN TO ENROLL</span></a>
        </div>
      </section>

      <section id="testimonials" className="relative scroll-mt-16 bg-primary py-20 text-primary-foreground sm:py-28">
        <Starfield count={40} fall={760} />
        <div data-reveal="hidden" className="section-shell relative z-10"><div className="max-w-2xl"><span className="section-kicker !text-gold"><Quote className="size-4" />Learner stories</span><h2 className="mt-4 text-balance text-3xl font-extrabold sm:text-5xl">Progress feels better when it feels possible.</h2></div>
          {/* Placeholder testimonials — replace with verified learner testimonials before launch. */}
          <div className="mt-12 grid gap-5 md:grid-cols-3">{[
            [aminaImage, "Amina", "Minneapolis", "I finally found lessons I could share with my children without having to explain our whole family story first."],
            [yusufImage, "Yusuf", "Nairobi", "The steps were practical and clear. I could study after work and use what I learned straight away."],
            [hodanImage, "Hodan", "London", "It felt warm, ambitious, and made for us. That gave me the confidence to keep going."],
          ].map(([image, name, location, quote]) => <figure key={name} className="rounded-lg border border-primary-foreground/15 bg-primary-foreground/5 p-6 backdrop-blur-sm transition-transform duration-300 hover:-translate-y-1"><Quote className="size-7 text-gold" /><blockquote className="mt-5 min-h-28 text-base leading-7 text-primary-foreground/95">“{quote}”</blockquote><figcaption className="mt-6 flex items-center gap-3"><img src={image} width={816} height={816} loading="lazy" alt={`Illustrated placeholder avatar for ${name}`} className="size-11 rounded-full object-cover ring-2 ring-gold/40" /><span><strong className="block text-sm">{name}</strong><span className="text-xs text-primary-foreground/80">{location}</span></span></figcaption></figure>)}</div>
        </div>
      </section>

      <section className="section-tint relative py-20 sm:py-24"><div data-reveal="hidden" className="section-shell relative"><div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-end"><div><span className="section-kicker">Our team</span><h2 className="mt-4 text-3xl font-extrabold sm:text-4xl">One mission. Many kinds of expertise.</h2></div><p className="max-w-xl leading-7 text-muted-foreground">A founding team focused on building trusted learning experiences for Somali families around the world.</p></div><div className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">{[["PT", "Product & Tech Lead"], ["OL", "Operations Lead"], ["CL", "Curriculum Lead"], ["ML", "Marketing Lead"]].map(([initials, role]) => <div key={role} className="flex items-center gap-4 rounded-lg border border-border bg-surface p-4 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-primary/40"><span className="grid size-11 shrink-0 place-items-center rounded-full chip-grad font-display text-sm font-extrabold text-gold">{initials}</span><span className="text-sm font-extrabold">{role}</span></div>)}</div></div></section>

      <section id="contact" className="relative scroll-mt-16 bg-gold-soft py-16 sm:py-20"><div className="aurora-blob left-[-4rem] top-0 size-72 bg-primary/15" aria-hidden="true" /><div data-reveal="hidden" className="section-shell relative grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center"><div><p className="text-sm font-extrabold text-primary">Ready when you are.</p><h2 className="mt-2 text-balance text-3xl font-extrabold sm:text-5xl">Your next step can start today.</h2><p className="mt-4 max-w-xl leading-7 text-muted-foreground">Tell us what you want to learn. We’ll help you choose the right course and payment path.</p></div><div className="flex flex-col gap-3 sm:flex-row"><Button asChild variant="whatsapp" size="lg"><a href={WHATSAPP_URL} target="_blank" rel="noreferrer" onClick={() => trackWhatsApp("Contact WhatsApp")}><MessageCircle className="size-5" />Chat on WhatsApp</a></Button><Button asChild variant="outline" size="lg"><a href={SKOOL_URL} target="_blank" rel="noreferrer" onClick={() => trackSkool("Visit our school")}>Visit our school <ArrowRight className="size-4" /></a></Button><Button asChild variant="outline" size="lg"><a href={`mailto:${CONTACT_EMAIL}`} onClick={() => trackOutbound({ action: "email_contact_click", destination: "email", label: "Contact email" })}><Mail className="size-5" />Email us</a></Button><p className="mt-3 text-xs font-bold text-muted-foreground">{CONTACT_EMAIL}</p></div></div></section>

      <footer className="relative bg-primary py-12 text-primary-foreground"><Starfield count={30} fall={560} /><div className="section-shell relative z-10"><div className="grid gap-10 border-b border-primary-foreground/15 pb-10 md:grid-cols-[1.4fr_1fr_1fr]"><div><Logo inverted /><p className="mt-4 max-w-sm text-sm leading-6 text-primary-foreground/85">Bringing knowledge and opportunity to the Somali diaspora, wherever they live.</p></div><div><p className="text-xs font-extrabold uppercase tracking-[0.15em] text-gold">Explore</p><div className="mt-4 grid gap-3 text-sm text-primary-foreground/90"><a href="#courses">Courses</a><a href="#how-it-works">How it works</a><a href="#testimonials">Testimonials</a><a href={WHATSAPP_URL}>WhatsApp</a></div></div><div><p className="text-xs font-extrabold uppercase tracking-[0.15em] text-gold">Follow</p><div className="mt-4 flex gap-2"><a href="#contact" aria-label="TikTok" className="grid size-10 place-items-center rounded-md border border-primary-foreground/20 transition-colors hover:bg-primary-foreground/10"><Smartphone className="size-4" /></a><a href="#contact" aria-label="Facebook" className="grid size-10 place-items-center rounded-md border border-primary-foreground/20 transition-colors hover:bg-primary-foreground/10"><Facebook className="size-4" /></a><a href="#contact" aria-label="Instagram" className="grid size-10 place-items-center rounded-md border border-primary-foreground/20 transition-colors hover:bg-primary-foreground/10"><Instagram className="size-4" /></a></div></div></div><div className="flex flex-col gap-3 pt-6 text-xs text-primary-foreground/80 sm:flex-row sm:items-center sm:justify-between"><span>© 2026 Astra USA Academy. All rights reserved. · <a href={`mailto:${CONTACT_EMAIL}`} className="underline underline-offset-2">{CONTACT_EMAIL}</a> · <a href={WHATSAPP_URL} target="_blank" rel="noreferrer" className="underline underline-offset-2">+254 714 348 375</a></span><span>Pricing in USD-equivalent to protect against currency changes.</span></div></div></footer>
    </main>
  );
}
