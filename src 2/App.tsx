/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import davidPortrait from './assets/images/david_portrait.JPG';
import QRCode from 'qrcode';
import { 
  ArrowRight, 
  ChevronLeft,
  ChevronRight,
  CheckCircle2, 
  Menu, 
  X, 
  Briefcase, 
  Zap, 
  Users, 
  Target, 
  TrendingUp,
  Brain,
  Rocket,
  Trophy,
  Quote,
  Globe,
  Mail,
  Send,
  Copy,
  Check,
  QrCode
} from 'lucide-react';

// --- Types ---

interface NavItem {
  label: string;
  href: string;
}

interface Package {
  name: string;
  priceUSD: number | "Custom";
  description: string;
  features: string[];
  highlight?: boolean;
}

interface Testimonial {
  quote: string;
  author: string;
  role: string;
}

interface BlogPost {
  title: string;
  excerpt: string;
  date: string;
  category: string;
}

// --- Data ---

const navItems: NavItem[] = [
  { label: 'Approach', href: '#method' },
  { label: 'You', href: '#offerings' },
  { label: 'Results', href: '#transformation' },
  { label: 'Packages', href: '#packages' },
  { label: 'About', href: '#about' },
  { label: 'Testimonials', href: '#testimonials' },
  { label: 'Partners', href: '#partners' },
  { label: 'Blog', href: '#blog' },
];

const packages: Package[] = [
  {
    name: "Foundational Breakthrough",
    priceUSD: 369,
    description: "Shatter the status quo and surface from the noise. Designed for high-achievers ready to crack the glass ceiling of their current performance.",
    features: [
      "3 weeks support including 3X 45min sessions",
      "Building clarity for your life",
      "Discovering your values and needs",
      "Identify hidden bottlenecks",
      "Core mindset reconstruction",
      "The 90-Day vision Execution Map"
    ]
  },
  {
    name: "Accelerated Growth",
    priceUSD: 669,
    description: "Total intervention for those who demand immediate results. We don't just fix paths; we shatter the old blueprint and build a new legacy.",
    features: [
      "6 weeks support including 6 X 45min sessions",
      "Foundational breakthrough",
      "Break emotional patterns and free yourself",
      "Create new empowering alternatives for lasting changes",
      "Priority access via private chat",
      "Weekly progress & outcome audits"
    ],
    highlight: true
  },
  {
    name: "Executive Transformation",
    priceUSD: "Custom",
    description: "The ultimate reconstruction of your professional and personal reality. Bespoke advisory for those at the top who need a silent partner in transformation.",
    features: [
      "Unlimited Strategic Advisory access",
      "On-site shadow coaching & board support",
      "Full lifestyle & legacy integration",
      "Crisis-proof leadership architecture",
      "Dedicated Success & Logistics Suite"
    ]
  }
];

const blogPosts: BlogPost[] = [
  {
    title: "The Neurobiology of Breakthroughs",
    excerpt: "Why the brain resists change and how 'Intervention' flips the switch.",
    date: "Oct 12, 2023",
    category: "Mindset"
  },
  {
    title: "CxO Burnout: The Silent Profit Killer",
    excerpt: "Strategies for sustaining elite performance without physical collapse.",
    date: "Sep 28, 2023",
    category: "Leadership"
  },
  {
    title: "From Dreaming to Doing",
    excerpt: "Five steps to move past the visualization phase and into massive action.",
    date: "Sep 15, 2023",
    category: "Execution"
  }
];

const testimonials: Testimonial[] = [
  {
    quote: "Working with David was the pivot point my career needed. I stopped overthinking and started executing with absolute clarity.",
    author: "James T.",
    role: "Tech Founder"
  },
  {
    quote: "The 'Intervention' approach isn't just coaching; it's a re-architecting of your reality. I'm hitting targets I thought were 5 years away.",
    author: "Sarah L.",
    role: "Sales Director"
  },
  {
    quote: "As a parent and student, I was drowning. The structured guidance helped me find my center and excel in both worlds.",
    author: "Michael R.",
    role: "Executive MBA Student"
  },
  {
    quote: "David brings a level of intensity and truth that most coaches shy away from. It's exactly what I needed to break through my revenue ceiling.",
    author: "Elena G.",
    role: "Impact Entrepreneur"
  }
];

// --- Components ---

const GlassShard = ({ delay = 0 }: { delay?: number, key?: React.Key }) => {
  const [randomCoords] = useState(() => ({
    x: Math.random() * 100,
    y: Math.random() * 100,
    rotate: Math.random() * 360,
    scale: 0.5 + Math.random() * 1,
    polygon: `polygon(${Math.random() * 50}% ${Math.random() * 20}%, ${50 + Math.random() * 50}% ${Math.random() * 50}%, ${Math.random() * 100}% ${50 + Math.random() * 50}%, ${Math.random() * 20}% ${Math.random() * 100}%)`
  }));

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0, x: '50%', y: '50%' }}
      animate={{ 
        opacity: [0, 0.3, 0],
        scale: [0, randomCoords.scale, randomCoords.scale * 1.5],
        x: `${randomCoords.x}%`,
        y: `${randomCoords.y}%`,
        rotate: randomCoords.rotate + 180
      }}
      transition={{ 
        duration: 8, 
        repeat: Infinity, 
        delay,
        ease: "linear"
      }}
      className="glass-shard absolute w-32 h-32"
      style={{ clipPath: randomCoords.polygon }}
    />
  );
};

const SectionHeading = ({ children, subtitle, light = false, className = "mb-12" }: { children: React.ReactNode, subtitle?: string, light?: boolean, className?: string }) => (
  <div className={className}>
    {subtitle && (
      <span className={`text-xs uppercase tracking-[0.3em] ${light ? 'text-white/50' : 'text-brand-gold'} font-bold mb-2 block`}>
        {subtitle}
      </span>
    )}
    <h2 className={`text-4xl md:text-5xl font-display ${light ? 'text-white' : 'text-white'} leading-tight`}>
      {children}
    </h2>
  </div>
);

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        const progress = (window.scrollY / totalHeight) * 100;
        setScrollProgress(progress);
      } else {
        setScrollProgress(0);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className="fixed top-0 left-0 w-full z-50">
      {/* Top Banner for Global Availability */}
      <div className="bg-brand-gold text-black py-2.5 px-6 text-center text-[10px] sm:text-xs font-black uppercase tracking-[0.25em] relative overflow-hidden flex items-center justify-center gap-3 border-b border-black/10">
        <div className="w-5 h-5 rounded-full border border-black flex items-center justify-center text-black shrink-0 animate-pulse">
          <Globe size={11} className="fill-transparent stroke-[2.5]" />
        </div>
        <span>Global Availability — Elite Executive Coaching in English, French & Spanish</span>
      </div>

      <nav className={`w-full transition-all duration-300 ${scrolled ? 'bg-brand-black/90 backdrop-blur-md py-4' : 'bg-transparent py-6'}`}>
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
          <a href="#" className="group">
            <div className="flex items-center gap-3">
              {/* Signature Monogram Monolith Design */}
              <div className="relative w-12 h-12 border border-brand-gold/30 flex items-center justify-center group-hover:border-brand-gold transition-colors overflow-hidden shrink-0">
                <div className="absolute inset-0 bg-brand-gold/5 group-hover:bg-brand-gold/10 transition-colors"></div>
                <div className="relative font-display font-black text-xl tracking-tighter flex items-center">
                  <span className="text-white group-hover:text-brand-gold transition-colors translate-x-0.5">D</span>
                  <span className="text-brand-gold group-hover:text-white transition-colors -translate-x-0.5 mt-1.5">G</span>
                </div>
                <div className="absolute top-0 right-0 w-1.5 h-1.5 border-t border-r border-brand-gold"></div>
                <div className="absolute bottom-0 left-0 w-1.5 h-1.5 border-b border-l border-brand-gold"></div>
              </div>
              <div className="hidden sm:block">
                <div className="text-[10px] font-black uppercase tracking-[0.4em] text-white/40 leading-none mb-1">Intervention</div>
                <div className="text-sm font-black uppercase tracking-[0.1em] text-white leading-none">Coaching</div>
              </div>
            </div>
          </a>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-6 xl:gap-8">
            {navItems.map((item, index) => (
              <a 
                key={item.href} 
                href={item.href} 
                className={`text-white/70 hover:text-brand-gold text-xs xl:text-sm font-medium uppercase tracking-widest transition-colors ${index === 0 ? 'ml-2 xl:ml-4' : ''}`}
              >
                {item.label}
              </a>
            ))}
            <a 
              href="https://calendly.com/admin-dgicoaching/30min" 
              target="_blank"
              rel="noopener noreferrer"
              className="bg-brand-gold text-black px-4 xl:px-6 py-2.5 font-bold uppercase tracking-wider hover:bg-white transition-colors ml-2 xl:ml-4 text-[11px] xl:text-xs shrink-0 whitespace-nowrap shadow-gold-glow"
            >
              Schedule Your Free Clarity Session now
            </a>
          </div>

          {/* Mobile Toggle */}
          <button className="lg:hidden text-white" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="absolute top-full left-0 w-full bg-brand-black border-t border-white/10 p-6 flex flex-col gap-6 lg:hidden shadow-2xl"
            >
              {navItems.map((item) => (
                <a 
                  key={item.href} 
                  href={item.href} 
                  onClick={() => setIsOpen(false)}
                  className="text-white text-xl font-display font-bold uppercase tracking-widest border-b border-white/5 pb-2"
                >
                  {item.label}
                </a>
              ))}
              <a 
                href="https://calendly.com/admin-dgicoaching/30min" 
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setIsOpen(false)}
                className="bg-brand-gold text-black py-4 px-6 text-center font-bold uppercase tracking-wider text-base sm:text-lg"
              >
                Schedule Your Free Clarity Session now
              </a>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Thin Gold Scroll Progress Bar */}
      <div className="w-full h-[3px] bg-white/5 relative overflow-hidden">
        <div 
          className="absolute top-0 left-0 h-full bg-brand-gold transition-all duration-75 ease-out"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>
    </header>
  );
};

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden pt-28 md:pt-36">
      {/* Background shards */}
      <div className="absolute inset-0 z-0">
        {[...Array(12)].map((_, i) => (
          <GlassShard key={i} delay={i * 0.5} />
        ))}
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_1fr] gap-12 lg:gap-20 items-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-5xl sm:text-6xl md:text-7xl font-display font-black text-white mb-6 leading-[0.95] tracking-tight uppercase">
              Your Next Level<br/> 
              <span className="text-brand-gold">of Growth and Fulfilment</span>
            </h1>
            <p className="font-serif italic text-2xl md:text-3xl text-white/80 max-w-2xl leading-relaxed">
              Precision Intervention Coaching helps ambitious individuals overcome internal barriers, gain clarity and create rapid, lasting changes.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="hidden lg:block border-l-4 border-brand-gold pl-10 py-4"
          >
            <p className="font-serif italic text-2xl text-white/90 leading-relaxed mb-6">
              "The session was a complete paradigm shift. I stopped oscillating between choices and started leading with clarity I didn't know I possessed."
            </p>
            <div className="text-sm font-black uppercase tracking-[0.2em] text-white/40">
              — MARCUS REED, TECH CEO
            </div>
          </motion.div>
        </div>
      </div>

      {/* Decorative breakthrough effect */}
      <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-brand-black to-transparent" />
    </section>
  );
};

const FlyerSection = () => {
  const challenges = [
    "Recently promoted and adjusting to new expectations",
    "Successful on paper, but feeling disconnected or unfulfilled",
    "Lacking clarity, motivation or direction",
    "Facing an important life or career transition"
  ];

  return (
    <section id="method" className="py-24 bg-brand-white text-brand-black overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center border-b-2 border-black pb-20">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <span className="text-xs uppercase tracking-[0.3em] text-brand-gold font-bold mb-3 block">
              APPROACH
            </span>
            <h2 className="text-5xl sm:text-6xl md:text-7xl font-display font-black leading-none mb-6 uppercase">
              Committing to change
            </h2>
            <p className="text-xl italic font-medium text-black/60 mb-8 border-l-4 border-brand-gold pl-4">
              "Let the transformation happen"
            </p>
            <div className="space-y-6">
              <p className="text-2xl font-bold leading-snug">
                You don't need more pressure. You need clarity on what's holding you back and a proven path forward.
              </p>
              <div className="space-y-4">
                <p className="text-sm font-bold uppercase tracking-widest text-black/60 pt-2">
                  You may recognize yourself here:
                </p>
                <ul className="space-y-3">
                  {challenges.map((item, i) => (
                    <li key={i} className="flex gap-3 items-start font-medium text-lg text-black/85">
                      <span className="text-brand-gold font-black text-xl leading-none">•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="bg-brand-black p-12 text-white shadow-[20px_20px_0px_0px_#D4AF37] relative z-10">
              <div className="space-y-12">
                <div className="flex items-start gap-4">
                  <span className="text-4xl font-black text-brand-gold">01</span>
                  <div>
                    <h3 className="text-2xl font-bold mb-2">Go beyond yourself</h3>
                    <p className="text-white/60">Unlock the potential that remains hidden beneath the surface of your daily habits.</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <span className="text-4xl font-black text-brand-gold">02</span>
                  <div>
                    <h3 className="text-2xl font-bold mb-2">Reconnect to your true nature</h3>
                    <p className="text-white/60">Align with your core values and biology to create a sustainable state of high performance.</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <span className="text-4xl font-black text-brand-gold">03</span>
                  <div>
                    <h3 className="text-2xl font-bold mb-2">Create a completely new state of living</h3>
                    <p className="text-white/60">Transform your reality into one where breakthroughs are the standard, not the exception.</p>
                  </div>
                </div>
              </div>
            </div>
            {/* Visual breakdown metaphor */}
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-brand-gold/10 rounded-full blur-3xl" />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

const Offerings = () => {
  const targets = [
    { title: "CxOs & Executives", icon: <Briefcase className="text-brand-gold" />, desc: "High-stakes decision support." },
    { title: "Entrepreneurs", icon: <Rocket className="text-brand-gold" />, desc: "Growth without the burnout." },
    { title: "Elite Athletes", icon: <Trophy className="text-brand-gold" />, desc: "Unbreakable mental performance under pressure." },
    { title: "Team leaders and corporate achievers", icon: <Users className="text-brand-gold" />, desc: "Lead with high-impact influence, clarity, and supreme execution." },
  ];

  return (
    <section id="offerings" className="py-24 bg-brand-black border-y border-white/5">
      <div className="max-w-7xl mx-auto px-6">
        <SectionHeading subtitle="Who we serve">DESIGNED FOR HIGH-ACHIEVERS</SectionHeading>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {targets.map((target, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ 
                duration: 0.7, 
                delay: i * 0.12,
                ease: [0.16, 1, 0.3, 1] // Out-expo cubic-bezier for a super smooth deceleration
              }}
              whileHover={{ y: -10 }}
              className="bg-zinc-900/50 border border-white/5 p-8 hover:border-brand-gold/50 transition-all group flex flex-col items-center text-center h-full"
            >
              <div className="mb-6 group-hover:scale-110 transition-transform flex justify-center">{target.icon}</div>
              <h3 className="text-lg md:text-xl font-black mb-3 text-balance tracking-tight min-h-[3rem] flex items-center">
                {target.title}
              </h3>
              <p className="text-white/50 text-sm leading-relaxed text-balance">
                {target.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const WhoYouBecomeSection = () => {
  const [qrCodeUrl, setQrCodeUrl] = useState<string>('');
  const [copiedLink, setCopiedLink] = useState(false);
  const bookingUrl = 'https://calendly.com/admin-dgicoaching/30min';

  useEffect(() => {
    QRCode.toDataURL(bookingUrl, {
      width: 280,
      margin: 1,
      color: {
        dark: '#000000',
        light: '#ffffff',
      },
    })
      .then((url) => setQrCodeUrl(url))
      .catch((err) => console.error('Failed to generate QR code:', err));
  }, [bookingUrl]);

  const handleCopyLink = () => {
    navigator.clipboard.writeText(bookingUrl);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2500);
  };

  const transformations = [
    {
      num: "01",
      title: "You understand what is really driving you.",
      context: "Self-Awareness & Human Needs",
      paragraphs: [
        "You begin to see beyond the immediate problem. Instead of focusing only on what happened, you learn to recognize the deeper needs, beliefs, emotions and patterns influencing your decisions and behaviour.",
        "That awareness changes the question from \u201cWhy does this keep happening to me?\u201d to \u201cWhat is really happening here, and what can I change?\u201d"
      ]
    },
    {
      num: "02",
      title: "You create space between the trigger and your response.",
      context: "Emotional State & Self-Mastery",
      paragraphs: [
        "Pressure, frustration, uncertainty or conflict no longer have to dictate what happens next.",
        "You learn to recognize your emotional state, understand what triggers it, and deliberately shift how you respond. Not by suppressing emotions, but by using them as information rather than allowing them to take control.",
        "The result is more composure, more choice, and less emotional autopilot."
      ]
    },
    {
      num: "03",
      title: "You turn insight into action.",
      context: "Clarity, Decisions & Behavioural Change",
      paragraphs: [
        "Understanding yourself is powerful, but insight alone does not create transformation.",
        "Together, we identify what needs to change and translate it into concrete decisions, behaviours and commitments. Whether you are facing a difficult transition, an important decision, recurring relationship patterns, loss of direction or simply the feeling that something needs to change, we focus on movement.",
        "Less overthinking. More clarity. More intentional action."
      ]
    },
    {
      num: "04",
      title: "The change becomes visible in how you live.",
      context: "Integration & Lasting Impact",
      paragraphs: [
        "Personal change rarely stays personal.",
        "When you become clearer about who you are, what you need and how you want to show up, it influences the conversations you have, the boundaries you set, the decisions you make and the relationships you build.",
        "At work. At home. In relationships. And especially in the moments when life puts you under pressure.",
        "The goal is not a temporary breakthrough. It is a different way of showing up."
      ]
    }
  ];

  return (
    <section id="transformation" className="py-24 md:py-32 bg-[#080808] border-b border-white/5 relative overflow-hidden">
      {/* Subtle ambient light accents */}
      <div className="absolute top-1/4 -right-40 w-96 h-96 bg-brand-gold/5 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 -left-40 w-96 h-96 bg-brand-gold/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Section Label */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex items-center gap-3 mb-6"
        >
          <span className="text-xs uppercase tracking-[0.3em] text-brand-gold font-bold">
            WHO YOU BECOME
          </span>
        </motion.div>

        {/* Main Section Headline */}
        <motion.h2 
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-4xl sm:text-5xl lg:text-6xl font-display font-black tracking-tight leading-[1.08] max-w-4xl mb-16 md:mb-20 uppercase"
        >
          After working together, your everyday life{' '}
          <span className="text-brand-gold relative inline-block">
            looks different.
            <span className="absolute -bottom-1 left-0 w-full h-[3px] bg-brand-gold/50 rounded-full" />
          </span>
        </motion.h2>

        {/* 4 Transformation Pillars */}
        <div className="space-y-4">
          {transformations.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="group border-b border-white/10 pb-10 pt-8 transition-colors hover:bg-white/[0.02] px-4 -mx-4 rounded-lg"
            >
              <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-8 items-start">
                {/* Number */}
                <div className="md:col-span-2 flex items-center md:items-start gap-4">
                  <span className="text-4xl md:text-5xl font-display font-black text-brand-gold/80 group-hover:text-brand-gold transition-colors tracking-tight">
                    {item.num}
                  </span>
                  <span className="md:hidden text-xs uppercase tracking-widest text-white/40 font-bold self-center">
                    {item.context}
                  </span>
                </div>

                {/* Headline */}
                <div className="md:col-span-4">
                  <h3 className="text-2xl md:text-3xl font-display font-black text-white group-hover:text-brand-gold transition-colors leading-tight">
                    {item.title}
                  </h3>
                  <div className="hidden md:block mt-2">
                    <span className="text-[11px] uppercase tracking-[0.2em] text-white/40 font-semibold">
                      {item.context}
                    </span>
                  </div>
                </div>

                {/* Narrative Description */}
                <div className="md:col-span-6 space-y-3.5">
                  {item.paragraphs.map((p, idx) => (
                    <p key={idx} className="text-white/70 text-base md:text-lg leading-relaxed font-sans font-normal">
                      {p}
                    </p>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom Callout Banner */}
        <motion.div
          initial={{ opacity: 0, y: 35 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mt-16 md:mt-24 bg-gradient-to-br from-zinc-900/90 via-black to-zinc-950 border border-brand-gold/30 p-8 sm:p-12 relative overflow-hidden shadow-[0_25px_60px_rgba(0,0,0,0.8)]"
        >
          {/* Subtle gold accent corners */}
          <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-brand-gold/60 pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-brand-gold/60 pointer-events-none" />
          <div className="absolute -top-24 -right-24 w-64 h-64 bg-brand-gold/10 rounded-full blur-3xl pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center relative z-10">
            {/* Left Content */}
            <div className="lg:col-span-7 xl:col-span-8 space-y-6">
              <h3 className="text-3xl sm:text-4xl lg:text-5xl font-display font-black text-white leading-tight">
                You don't have to decide <br className="hidden sm:inline" />
                from a website.
              </h3>
              <p className="text-white/70 text-base sm:text-lg max-w-xl leading-relaxed">
                Real, lasting change is not judged from bullet points or reading material. It's worth finding out in a focused 1-on-1 discovery conversation how high-performance transformation would actually look for you.
              </p>
              
              <div className="pt-2 flex flex-wrap items-center gap-4">
                <a
                  href={bookingUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-3 bg-brand-gold text-black font-black uppercase tracking-wider px-8 py-4 text-base hover:bg-white hover:scale-[1.02] active:scale-[0.98] transition-all shadow-[0_4px_20px_rgba(212,175,55,0.3)]"
                >
                  Schedule Your Free Clarity Session now
                  <ArrowRight size={18} className="stroke-[2.5]" />
                </a>

                <button
                  type="button"
                  onClick={handleCopyLink}
                  className="inline-flex items-center gap-2 border border-white/20 hover:border-brand-gold text-white/80 hover:text-white px-5 py-4 text-xs font-bold uppercase tracking-widest transition-colors cursor-pointer"
                >
                  {copiedLink ? (
                    <>
                      <Check size={16} className="text-brand-gold" />
                      <span>Link Copied</span>
                    </>
                  ) : (
                    <>
                      <Copy size={16} />
                      <span>Copy booking link</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Right QR Code / Quick Scan */}
            <div className="lg:col-span-5 xl:col-span-4 flex flex-col items-center lg:items-end justify-center">
              <div className="bg-zinc-950/80 border border-white/10 p-5 rounded-md flex flex-col items-center text-center shadow-2xl max-w-[240px] w-full">
                <div className="bg-white p-3 rounded-sm shadow-inner w-full flex items-center justify-center aspect-square">
                  {qrCodeUrl ? (
                    <img 
                      src={qrCodeUrl} 
                      alt="Scan to schedule your free clarity session with DGI Coaching" 
                      className="w-full h-full object-contain"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-black/40">
                      <QrCode size={64} />
                    </div>
                  )}
                </div>

                <div className="mt-4 space-y-1">
                  <span className="text-[10px] uppercase font-black tracking-widest text-brand-gold block">
                    Instant Scheduling
                  </span>
                  <p className="text-white/60 text-xs font-medium">
                    Scan with your phone camera to pick your time directly.
                  </p>
                  <span className="text-[10px] text-white/30 font-mono block pt-1 break-all">
                    calendly.com/admin-dgicoaching/30min
                  </span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

interface PackageInquiryModalProps {
  pkg: Package | null;
  isOpen: boolean;
  onClose: () => void;
  currency: string;
  rates: Record<string, number>;
}

const PackageInquiryModal = ({
  pkg,
  isOpen,
  onClose,
  currency,
  rates,
}: PackageInquiryModalProps) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [comment, setComment] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setSubmitted(false);
      setCopied(false);
    }
  }, [isOpen, pkg]);

  if (!isOpen || !pkg) return null;

  const formatPrice = (usdAmount: number | "Custom") => {
    if (typeof usdAmount !== 'number') return usdAmount;
    if (currency === 'USD' || !rates[currency]) {
      return `$${usdAmount}`;
    }
    const converted = usdAmount * rates[currency];
    return new Intl.NumberFormat(undefined, { 
      style: 'currency', 
      currency: currency,
      maximumFractionDigits: 0
    }).format(converted);
  };

  const getInquiryBody = () => {
    return `Inquiry for: ${pkg.name} (${formatPrice(pkg.priceUSD)})

Client Details:
- Name: ${name.trim()}
- Email: ${email.trim()}

Comments / Goals:
${comment.trim() || 'No additional comments provided.'}

Sent from DGI Coaching Website`;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim()) return;

    const subject = encodeURIComponent(`Package Inquiry: ${pkg.name} - ${name.trim()}`);
    const body = encodeURIComponent(getInquiryBody());

    // Open user's default email client
    window.location.href = `mailto:admin@dgicoaching.com?subject=${subject}&body=${body}`;
    setSubmitted(true);
  };

  const handleCopyDetails = () => {
    const textToCopy = `To: admin@dgicoaching.com\nSubject: Package Inquiry: ${pkg.name} - ${name.trim()}\n\n${getInquiryBody()}`;
    navigator.clipboard.writeText(textToCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/85 backdrop-blur-md"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative w-full max-w-lg bg-zinc-950 border border-brand-gold/40 shadow-2xl p-6 sm:p-8 rounded-sm text-left my-8 z-10 overflow-hidden"
          style={{ boxShadow: '0 25px 60px -15px rgba(0, 0, 0, 0.9), 0 0 30px -5px rgba(212, 175, 55, 0.15)' }}
        >
          {/* Corner gold brackets */}
          <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-brand-gold"></div>
          <div className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-brand-gold"></div>
          <div className="absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 border-brand-gold"></div>
          <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-brand-gold"></div>

          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-5 right-5 text-white/40 hover:text-white transition-colors cursor-pointer p-1"
            aria-label="Close modal"
          >
            <X size={20} />
          </button>

          {!submitted ? (
            <div>
              {/* Header */}
              <div className="mb-6">
                <div className="inline-flex items-center gap-2 px-2.5 py-1 bg-brand-gold/10 border border-brand-gold/30 text-[10px] font-black uppercase tracking-[0.2em] text-brand-gold mb-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-brand-gold animate-pulse"></span>
                  Selected Investment
                </div>
                <h3 className="text-2xl sm:text-3xl font-display font-black text-white uppercase tracking-tight">
                  {pkg.name}
                </h3>
                <div className="flex items-baseline gap-2 mt-1">
                  <span className="text-xl font-bold text-brand-gold">
                    {formatPrice(pkg.priceUSD)}
                  </span>
                  <span className="text-xs text-white/50 tracking-wide">
                    {typeof pkg.priceUSD === 'number' ? 'investment program' : 'bespoke advisory'}
                  </span>
                </div>
                <p className="text-xs text-white/50 mt-2 leading-relaxed">
                  {pkg.description}
                </p>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-widest text-white/70 mb-1.5">
                    Your Full Name <span className="text-brand-gold">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. David Smith"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full bg-white/5 border border-white/10 p-3.5 text-sm text-white focus:border-brand-gold outline-none transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-widest text-white/70 mb-1.5">
                    Your Email Address <span className="text-brand-gold">*</span>
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="e.g. name@company.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-white/5 border border-white/10 p-3.5 text-sm text-white focus:border-brand-gold outline-none transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-widest text-white/70 mb-1.5">
                    Comment or Current Challenge
                  </label>
                  <textarea
                    rows={3}
                    placeholder="What goals or bottlenecks would you like to address?"
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    className="w-full bg-white/5 border border-white/10 p-3.5 text-sm text-white focus:border-brand-gold outline-none transition-colors resize-none"
                  />
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    className="w-full bg-brand-gold text-black py-4 px-6 font-black uppercase tracking-[0.15em] text-sm hover:bg-white transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer shadow-gold-glow"
                  >
                    <span>Send Request to admin@dgicoaching.com</span>
                    <ArrowRight size={16} />
                  </button>
                </div>

                <p className="text-[10px] text-white/40 text-center tracking-wide mt-2">
                  Direct dispatch to <span className="text-brand-gold">admin@dgicoaching.com</span>. We review and reply within 24 hours.
                </p>
              </form>
            </div>
          ) : (
            /* Success confirmation screen */
            <div className="py-4 text-center">
              <div className="w-16 h-16 rounded-full border-2 border-brand-gold/80 bg-brand-gold/10 flex items-center justify-center text-brand-gold mx-auto mb-5">
                <CheckCircle2 size={32} />
              </div>
              <h3 className="text-2xl font-display font-black text-white uppercase tracking-tight mb-2">
                Inquiry Initialized!
              </h3>
              <p className="text-sm text-white/70 mb-6 leading-relaxed max-w-sm mx-auto">
                Your email client was opened with your pre-filled inquiry for <strong className="text-brand-gold">{pkg.name}</strong> to <strong className="text-white">admin@dgicoaching.com</strong>.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-sm mb-6 text-left text-xs font-mono text-white/70 space-y-1">
                <div><span className="text-brand-gold font-bold">To:</span> admin@dgicoaching.com</div>
                <div><span className="text-brand-gold font-bold">Package:</span> {pkg.name}</div>
                <div><span className="text-brand-gold font-bold">From:</span> {name} ({email})</div>
                {comment && <div><span className="text-brand-gold font-bold">Comment:</span> {comment}</div>}
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  type="button"
                  onClick={handleCopyDetails}
                  className="flex-1 border border-white/20 hover:border-brand-gold text-white text-xs font-bold uppercase tracking-wider py-3.5 px-4 flex items-center justify-center gap-2 transition-colors cursor-pointer"
                >
                  {copied ? (
                    <>
                      <Check size={16} className="text-brand-gold" />
                      <span>Copied to Clipboard!</span>
                    </>
                  ) : (
                    <>
                      <Copy size={16} />
                      <span>Copy Inquiry Details</span>
                    </>
                  )}
                </button>
                <button
                  type="button"
                  onClick={onClose}
                  className="flex-1 bg-brand-gold hover:bg-white text-black text-xs font-black uppercase tracking-wider py-3.5 px-4 transition-colors cursor-pointer"
                >
                  Done
                </button>
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

const PackageCard = ({ 
  pkg, 
  currency, 
  rates,
  onSelect
}: { 
  pkg: Package; 
  currency: string; 
  rates: Record<string, number>; 
  onSelect: (pkg: Package) => void;
  key?: React.Key; 
}) => {
  const formatPrice = (usdAmount: number | "Custom") => {
    if (typeof usdAmount !== 'number') return usdAmount;
    if (currency === 'USD' || !rates[currency]) {
      return `$${usdAmount}`;
    }
    const converted = usdAmount * rates[currency];
    return new Intl.NumberFormat(undefined, { 
      style: 'currency', 
      currency: currency,
      maximumFractionDigits: 0
    }).format(converted);
  };

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      className={`relative flex flex-col p-8 md:p-10 border glass-card rounded-sm ${pkg.highlight ? 'border-brand-gold/50 ring-1 ring-brand-gold/20' : 'border-white/10'} transition-all`}
    >
      {pkg.highlight && (
        <span className="absolute -top-3 left-6 bg-brand-gold text-black px-4 py-0.5 text-[10px] font-black uppercase tracking-widest">
          Elite Strategy
        </span>
      )}
      <h4 className="text-[10px] uppercase tracking-[0.3em] text-brand-gold mb-4 font-black">{pkg.name}</h4>
      <div className="flex items-baseline gap-1 mb-4">
        <span className="text-4xl font-black text-white">
          {formatPrice(pkg.priceUSD)}
        </span>
      </div>
      <p className="text-white/60 mb-8 text-sm leading-relaxed">{pkg.description}</p>
      <div className="space-y-4 mb-10 flex-grow">
        {pkg.features.map((feature, i) => (
          <div key={i} className="flex gap-3 items-start text-xs">
            <CheckCircle2 size={14} className="text-brand-gold mt-0.5 shrink-0" />
            <span className="text-white/80">{feature}</span>
          </div>
        ))}
      </div>
      <button 
        onClick={() => onSelect(pkg)}
        className={`w-full py-4 text-xs font-black uppercase tracking-widest transition-all rounded-sm cursor-pointer ${pkg.highlight ? 'bg-brand-gold text-black hover:bg-white shadow-gold-glow' : 'border border-white/20 text-white hover:border-white hover:bg-white/5'}`}
      >
        Choose {pkg.name}
      </button>
    </motion.div>
  );
};

const BlogSection = () => (
  <section id="blog" className="py-24 bg-brand-black">
    <div className="max-w-7xl mx-auto px-6">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
        <SectionHeading subtitle="Authority">THE INTERVENTION BLOG</SectionHeading>
        <a href="#" className="font-bold uppercase tracking-widest text-brand-gold hover:text-white flex items-center gap-2 mb-12 md:mb-0 transition-colors">
          View all insights <ArrowRight size={20} />
        </a>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
        {blogPosts.map((post, i) => (
          <article key={i} className="group cursor-pointer">
            <div className="aspect-[16/9] bg-zinc-900 mb-6 overflow-hidden relative">
              <motion.div 
                whileHover={{ scale: 1.05 }}
                className="w-full h-full bg-gradient-to-br from-brand-gold/20 to-black flex items-center justify-center relative group-hover:from-brand-gold/30 transition-colors duration-500"
              >
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-brand-gold/10 via-transparent to-transparent opacity-60" />
                <TrendingUp className="text-brand-gold/40 group-hover:text-brand-gold/80 group-hover:scale-110 transition-all duration-500 relative z-10" size={60} strokeWidth={1.5} />
              </motion.div>
            </div>
            <span className="text-xs font-bold text-brand-gold uppercase tracking-widest mb-3 block">{post.category}</span>
            <h3 className="text-2xl font-bold mb-4 group-hover:text-brand-gold transition-colors">{post.title}</h3>
            <p className="text-white/50 mb-6 line-clamp-2">{post.excerpt}</p>
            <div className="text-xs font-medium text-white/30">{post.date}</div>
          </article>
        ))}
      </div>
    </div>
  </section>
);

const WhoIAm = () => (
  <section id="about" className="py-24 bg-brand-black overflow-hidden border-b border-white/5">
    <div className="max-w-7xl mx-auto px-6">
      {/* Section Subtitle aligned on the left of the page */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="flex items-center gap-3 mb-8"
      >
        <span className="text-xs uppercase tracking-[0.3em] text-brand-gold font-bold">
          Who I am
        </span>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
        {/* Left Column: Portrait */}
        <motion.div 
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="lg:col-span-5 relative lg:sticky lg:top-28 space-y-6"
        >
          <div className="relative group overflow-hidden border border-brand-gold/30 hover:border-brand-gold transition-colors duration-500 bg-zinc-900 aspect-[4/5] sm:aspect-[3/4]">
            {/* Corner brackets */}
            <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-brand-gold z-20"></div>
            <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-brand-gold z-20"></div>
            <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-brand-gold z-20"></div>
            <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-brand-gold z-20"></div>
            
            {/* Gold gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-brand-black via-transparent to-transparent opacity-60 z-10"></div>
            
            <img 
              src={davidPortrait} 
              alt="David Gits Portrait" 
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover grayscale contrast-[1.15] brightness-[0.9] group-hover:grayscale-0 group-hover:brightness-100 transition-all duration-700 ease-out"
            />
          </div>
          {/* Subtle golden backlight */}
          <div className="absolute -left-8 -bottom-8 w-48 h-48 bg-brand-gold/10 blur-[80px] rounded-full pointer-events-none" />

          {/* Quick Credential Anchor to rebalance column height */}
          <div className="p-5 border border-white/10 bg-zinc-950/70 glass-card">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-2 h-2 rounded-full bg-brand-gold animate-pulse"></div>
              <span className="text-[10px] font-black uppercase tracking-[0.25em] text-brand-gold">
                Strategic Intervention
              </span>
            </div>
            <p className="text-xs text-white/70 leading-relaxed font-medium">
              Robbins-Madanes Institute Trained • Focused on deep personal & executive shifts.
            </p>
            <div className="mt-3 pt-3 border-t border-white/5 flex items-center justify-between text-[10px] uppercase tracking-widest text-white/40 font-mono">
              <span>Zürich & Global</span>
              <span className="text-brand-gold">EN • FR • ES</span>
            </div>
          </div>
        </motion.div>

        {/* Right Column: Bio and Cards */}
        <div className="lg:col-span-7 space-y-10">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-5xl md:text-7xl font-display font-black text-white leading-none mb-3 uppercase">
              David <span className="text-brand-gold">Gits</span>
            </h2>
            <div className="text-sm font-black uppercase tracking-[0.4em] text-white/40 mb-8">
              Intervention Coach
            </div>
            
            <div className="space-y-5 text-base md:text-lg text-white/80 leading-relaxed border-l-2 border-brand-gold/60 pl-6 font-sans">
              <p>
                My background combines international business, high-pressure environments, sport, wellbeing and professional coaching development. But who I am today has been shaped just as much by life: losing my mother too early, navigating divorce, and experiencing the privilege and responsibility of being a father.
              </p>
              <p>
                Now in my forties, these experiences have deepened my understanding of resilience, change and what truly matters.
              </p>
              <p className="text-white font-medium">
                My role isn't to tell you who you should become. It's to help you uncover what may be preventing you from becoming more fully yourself.
              </p>
            </div>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative bg-zinc-900/40 border border-white/5 p-8 md:p-10 glass-card"
          >
            <div className="space-y-6">
              <div className="flex gap-6 items-start">
                <div className="w-12 h-12 shrink-0 border border-brand-gold flex items-center justify-center text-brand-gold">
                  <Target size={24} />
                </div>
                <p className="text-white/80 leading-relaxed">
                  You will beneficiate from my years of personal development and intensive training on <span className="text-white font-bold">strategic intervention</span> from the <span className="text-brand-gold">Robbins-Madanes Institute (USA)</span>.
                </p>
              </div>

              <div className="flex gap-6 items-start">
                <div className="w-12 h-12 shrink-0 border border-brand-gold flex items-center justify-center text-brand-gold">
                  <Zap size={24} />
                </div>
                <p className="text-white/80 leading-relaxed">
                  I'm here to coach high-performers and those who demand more of their life, facilitating breakthroughs using <span className="text-white font-bold">scientific based approaches</span> and proven strategies.
                </p>
              </div>

              <div className="pt-6 border-t border-white/10">
                <div className="flex items-center gap-4 text-brand-gold font-black uppercase tracking-widest text-xs">
                  <span>The Commitment</span>
                  <div className="h-[1px] flex-grow bg-brand-gold/20"></div>
                </div>
                <p className="mt-3 text-white/40 text-sm italic font-medium">
                  Every intervention is absolute. Every session is a total reconstruction of what's possible.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  </section>
);

const TestimonialSlider = () => {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(0);

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0
    })
  };

  const swipeConfidenceThreshold = 10000;
  const swipePower = (offset: number, velocity: number) => {
    return Math.abs(offset) * velocity;
  };

  const paginate = (newDirection: number) => {
    setDirection(newDirection);
    setCurrent((prev) => (prev + newDirection + testimonials.length) % testimonials.length);
  };

  return (
    <section id="testimonials" className="py-24 bg-brand-black overflow-hidden border-b border-white/5">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-left mb-16">
          <SectionHeading subtitle="Voice of Impact">Proven Breakthroughs</SectionHeading>
        </div>

        <div className="relative h-[400px] md:h-[350px] flex items-center justify-center">
          <AnimatePresence initial={false} custom={direction}>
            <motion.div
              key={current}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{
                x: { type: "spring", stiffness: 300, damping: 30 },
                opacity: { duration: 0.2 }
              }}
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={1}
              onDragEnd={(_e, { offset, velocity }) => {
                const swipe = swipePower(offset.x, velocity.x);
                if (swipe < -swipeConfidenceThreshold) {
                  paginate(1);
                } else if (swipe > swipeConfidenceThreshold) {
                  paginate(-1);
                }
              }}
              className="absolute w-full max-w-4xl px-4 flex flex-col items-center text-center"
            >
              <Quote className="text-brand-gold/20 mb-8" size={64} />
              <p className="text-2xl md:text-4xl font-serif italic text-white/90 leading-tight mb-8">
                "{testimonials[current].quote}"
              </p>
              <div>
                <div className="text-xl font-display font-black text-white uppercase tracking-[0.2em]">
                  {testimonials[current].author}
                </div>
                <div className="text-brand-gold font-black uppercase tracking-widest text-xs mt-2">
                  {testimonials[current].role}
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation Arrows */}
          <button
            onClick={() => paginate(-1)}
            className="absolute left-0 z-20 p-4 text-white/30 hover:text-brand-gold transition-colors"
          >
            <ChevronLeft size={40} />
          </button>
          <button
            onClick={() => paginate(1)}
            className="absolute right-0 z-20 p-4 text-white/30 hover:text-brand-gold transition-colors"
          >
            <ChevronRight size={40} />
          </button>
        </div>

        {/* Pagination Dots */}
        <div className="flex justify-center gap-4 mt-8">
          {testimonials.map((_, i) => (
            <button
              key={i}
              onClick={() => {
                setDirection(i > current ? 1 : -1);
                setCurrent(i);
              }}
              className={`w-3 h-3 rounded-none rotate-45 transition-all duration-300 ${
                i === current ? 'bg-brand-gold scale-125 shadow-gold-glow' : 'bg-white/10'
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

const PartnerSection = () => {
  const partnerData = [
    {
      name: "The Good Life Specialist",
      url: "https://www.thegoodlifespecialist.com/",
      description: "Nutrition, Yoga & Holistic Coaching to reclaim your energy and reset your biology.",
      accent: "text-emerald-500",
      icon: (
        <div className="w-12 h-12 border border-emerald-500/30 flex items-center justify-center text-emerald-500 mb-6 group-hover:bg-emerald-500 group-hover:text-black transition-all">
          <Zap size={24} />
        </div>
      )
    },
    {
      name: "Loïc Jean",
      url: "https://www.loicjean.com/",
      description: "Strategic clarity and efficiency framework for sustained performance and personal fulfillment.",
      accent: "text-blue-500",
      icon: (
        <div className="w-12 h-12 border border-blue-500/30 flex items-center justify-center text-blue-500 mb-6 group-hover:bg-blue-500 group-hover:text-black transition-all">
          <Target size={24} />
        </div>
      )
    },
    {
      name: "Anne-Françoise Gailly",
      url: "https://www.annefrancoisegailly.com/",
      description: "Harmonization and frequency coaching for atypical leaders seeking magic and expansion.",
      accent: "text-purple-500",
      icon: (
        <div className="w-12 h-12 border border-purple-500/30 flex items-center justify-center text-purple-500 mb-6 group-hover:bg-purple-500 group-hover:text-black transition-all">
          <Brain size={24} />
        </div>
      )
    },
    {
      name: "OsteoPro",
      url: "https://osteopro.ch/",
      description: "Professional osteopathy and physical health optimization for elite physical longevity.",
      accent: "text-brand-gold",
      icon: (
        <div className="w-12 h-12 border border-brand-gold/30 flex items-center justify-center text-brand-gold mb-6 group-hover:bg-brand-gold group-hover:text-black transition-all">
          <Trophy size={24} />
        </div>
      )
    }
  ];

  return (
    <section id="partners" className="py-24 bg-zinc-950 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-left mb-12">
          <SectionHeading subtitle="Ecosystem" className="mb-4">
            STRATEGIC PARTNERS
          </SectionHeading>
          <p className="w-full max-w-none text-white/50 text-base md:text-lg leading-relaxed">
            Transformation requires a multidimensional approach. I partner with specialists who bring depth to every aspect of human performance.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {partnerData.map((partner, i) => (
            <motion.a
              key={i}
              href={partner.url}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ y: -5 }}
              className="group flex flex-col p-8 md:p-10 border border-white/5 bg-white/[0.02] hover:border-white/10 transition-all h-full"
            >
              {partner.icon}
              <h3 className="text-xl font-bold mb-4 group-hover:text-brand-gold transition-colors">
                {partner.name}
              </h3>
              <p className="text-white/40 text-sm leading-relaxed mb-8 flex-grow">
                {partner.description}
              </p>
              <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-brand-gold group-hover:gap-4 transition-all">
                Visit Website <ArrowRight size={12} />
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
};

const ToastTimer = ({ active, onClose }: { active: boolean; onClose: () => void }) => {
  useEffect(() => {
    if (active) {
      const timer = setTimeout(() => {
        onClose();
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [active, onClose]);
  return null;
};

const ContactFooter = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [packageSelected, setPackageSelected] = useState('Interested in Package...');
  const [bottleneck, setBottleneck] = useState('');
  const [toast, setToast] = useState<{ show: boolean; message: string; type: 'success' | 'error' | 'info' | null }>({
    show: false,
    message: '',
    type: null,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email) {
      setToast({
        show: true,
        message: 'Please fill in your name and email to proceed.',
        type: 'error'
      });
      return;
    }

    // Trigger the email client
    const subject = encodeURIComponent(`Intervention Breakthrough Inquiry - ${name}`);
    const body = encodeURIComponent(
      `Name: ${name}\nEmail: ${email}\nPackage: ${packageSelected}\nBottleneck: ${bottleneck || 'None specified'}`
    );
    
    window.location.href = `mailto:admin@dgicoaching.com?subject=${subject}&body=${body}`;

    // Show custom toast notification
    setToast({
      show: true,
      message: 'Your breakthrough session inquiry has been initialized. Your email client is opening...',
      type: 'success'
    });

    // Reset inputs
    setName('');
    setEmail('');
    setPackageSelected('Interested in Package...');
    setBottleneck('');
  };

  return (
    <footer id="contact" className="pt-24 pb-12 bg-zinc-950 relative">
      {/* Toast Notification rendered with AnimatePresence */}
      <AnimatePresence>
        {toast.show && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            className="fixed bottom-8 right-8 z-50 max-w-md bg-zinc-900 border border-brand-gold/30 p-5 shadow-2xl flex gap-4 items-start"
            style={{ boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.8)' }}
          >
            {/* Corner brackets */}
            <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-brand-gold"></div>
            <div className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-brand-gold"></div>
            <div className="absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 border-brand-gold"></div>
            <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-brand-gold"></div>

            <div className="mt-1">
              {toast.type === 'error' ? (
                <Zap className="text-red-500 animate-pulse" size={20} />
              ) : (
                <CheckCircle2 className="text-brand-gold" size={20} />
              )}
            </div>
            
            <div className="flex-grow">
              <h4 className="text-xs font-black uppercase tracking-[0.2em] text-brand-gold mb-1">
                {toast.type === 'error' ? 'Validation Alert' : 'System Breakthrough'}
              </h4>
              <p className="text-white/80 text-sm leading-relaxed font-medium">
                {toast.message}
              </p>
            </div>

            <button 
              onClick={() => setToast({ ...toast, show: false })} 
              className="text-white/40 hover:text-white transition-colors"
            >
              <X size={16} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Auto-dismiss timer */}
      <ToastTimer active={toast.show} onClose={() => setToast(prev => ({ ...prev, show: false }))} />

      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 mb-20">
          <div>
            <h2 className="text-5xl md:text-7xl font-display font-black mb-8 leading-[0.9]">
              READY TO <br/> <span className="text-brand-gold">ACT?</span>
            </h2>
            <p className="text-xl text-white/50 mb-12 max-w-md">
              The next step isn't more thinking. It's an intervention. Book your initial consultation today.
            </p>
            <div className="flex items-center gap-6">
              <div className="w-16 h-16 rounded-full border border-brand-gold flex items-center justify-center text-brand-gold">
                <Globe size={32} className="stroke-[1.5]" />
              </div>
              <div>
                <div className="font-bold text-white uppercase tracking-widest">Global Availability (EN/FR/ES)</div>
                <div className="text-white/40">Mostly online with onsite visits available for business customers.</div>
              </div>
            </div>
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <input 
                type="text" 
                placeholder="Full Name" 
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full bg-white/5 border border-white/10 p-5 text-white focus:border-brand-gold outline-none transition-colors"
                required
              />
              <input 
                type="email" 
                placeholder="Email Address" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-white/5 border border-white/10 p-5 text-white focus:border-brand-gold outline-none transition-colors"
                required
              />
            </div>
            <select 
              value={packageSelected}
              onChange={(e) => setPackageSelected(e.target.value)}
              className="w-full bg-white/5 border border-white/10 p-5 text-white focus:border-brand-gold outline-none appearance-none transition-colors"
            >
              <option className="bg-brand-black">Interested in Package...</option>
              <option className="bg-brand-black">Foundational Breakthrough</option>
              <option className="bg-brand-black">Accelerated Growth</option>
              <option className="bg-brand-black">Executive Transformation</option>
            </select>
            <textarea 
              placeholder="What is your biggest bottleneck?" 
              rows={4}
              value={bottleneck}
              onChange={(e) => setBottleneck(e.target.value)}
              className="w-full bg-white/5 border border-white/10 p-5 text-white focus:border-brand-gold outline-none transition-colors"
            ></textarea>
            <button 
              type="submit"
              className="block w-full bg-brand-gold text-black py-6 text-center font-black uppercase tracking-[0.2em] text-xl hover:bg-white transition-colors cursor-pointer"
            >
              Start Your Journey
            </button>
          </form>
        </div>

        <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-8 text-sm text-white/30 font-medium">
          <div className="flex flex-col items-center md:items-start gap-6">
            <div className="flex items-center gap-4 group transition-all duration-300">
              {/* Monogram Monolith Design */}
              <div className="relative w-14 h-14 border border-brand-gold/30 flex items-center justify-center group-hover:border-brand-gold transition-colors overflow-hidden">
                <div className="absolute inset-0 bg-brand-gold/5 group-hover:bg-brand-gold/10 transition-colors"></div>
                <div className="relative font-display font-black text-2xl tracking-tighter flex items-center">
                  <span className="text-white group-hover:text-brand-gold transition-colors translate-x-0.5">D</span>
                  <span className="text-brand-gold group-hover:text-white transition-colors -translate-x-0.5 mt-2">G</span>
                </div>
                <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-brand-gold"></div>
                <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-brand-gold"></div>
              </div>

              {/* Typography */}
              <div>
                <div className="text-xs font-light uppercase tracking-[0.6em] text-white/60 leading-none mb-1.5 flex items-center gap-2">
                  Intervention
                  <div className="h-[1px] w-8 bg-brand-gold/30"></div>
                </div>
                <div className="text-xl font-black uppercase tracking-[0.1em] text-brand-gold leading-none">
                  Coaching
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2 mt-2">
              <span className="text-[10px] uppercase tracking-widest text-white/20">© 2026 DGI Coaching. Selective Excellence.</span>
            </div>
          </div>
          <div className="flex gap-8">
            <a href="#" className="hover:text-brand-gold transition-colors uppercase tracking-widest">Privacy</a>
            <a href="#" className="hover:text-brand-gold transition-colors uppercase tracking-widest">Terms</a>
            <a href="#" className="hover:text-brand-gold transition-colors uppercase tracking-widest">LinkedIn</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default function App() {
  const [currency, setCurrency] = useState('USD');
  const [rates, setRates] = useState<Record<string, number>>({});
  const [selectedPackage, setSelectedPackage] = useState<Package | null>(null);

  useEffect(() => {
    // Detect currency from locale
    try {
      const localeCurrency = new Intl.NumberFormat(undefined, { 
        style: 'currency', 
        currency: 'USD' 
      }).resolvedOptions().currency;
      if (localeCurrency) setCurrency(localeCurrency);
    } catch (e) {
      console.warn('Currency detection failed, defaulting to USD');
    }

    // Fetch exchange rates (USD base)
    fetch('/api/rates')
      .then(res => res.json())
      .then(data => {
        if (data && data.rates) {
          setRates(data.rates);
        }
      })
      .catch(err => console.error('Failed to fetch exchange rates:', err));
  }, []);

  return (
    <div className="bg-brand-black min-h-screen text-white">
      <Navbar />
      <Hero />
      <FlyerSection />
      <Offerings />
      <WhoYouBecomeSection />
      
      <section id="packages" className="py-24 max-w-7xl mx-auto px-6">
        <div className="text-left mb-16">
          <SectionHeading subtitle="Investment">CHOOSE YOUR JOURNEY</SectionHeading>
          {currency !== 'USD' && Object.keys(rates).length > 0 && (
            <p className="text-white/40 text-sm mt-2 font-medium uppercase tracking-widest italic">
              Prices automatically converted to {currency} based on live market rates.
            </p>
          )}
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {packages.map((pkg, i) => (
            <PackageCard 
              key={i} 
              pkg={pkg} 
              currency={currency} 
              rates={rates} 
              onSelect={(selected) => setSelectedPackage(selected)}
            />
          ))}
        </div>
      </section>

      <PackageInquiryModal
        pkg={selectedPackage}
        isOpen={!!selectedPackage}
        onClose={() => setSelectedPackage(null)}
        currency={currency}
        rates={rates}
      />

      <WhoIAm />
      <TestimonialSlider />
      <PartnerSection />
      <BlogSection />
      <ContactFooter />
    </div>
  );
}
