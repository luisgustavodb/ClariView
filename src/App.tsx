import { ArrowRight, Check } from 'lucide-react';
import { motion } from 'motion/react';
import React, { useLayoutEffect, useRef, useEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

const testimonials = [
  { name: "Isabella Rodriguez", city: "São Paulo", text: "Sua capacidade de capturar a essência da nossa marca em cada projeto é inigualável.", rating: 5, company: "ABC Company" },
  { name: "Gabrielle Williams", city: "Rio de Janeiro", text: "Gênios criativos que ouvem, entendem e criam visuais cativantes.", rating: 5, company: "XYZ Corp" },
  { name: "Samantha Johnson", city: "Belo Horizonte", text: "Superaram nossas expectativas com designs inovadores que deram vida à nossa visão.", rating: 4.5, company: "Tech Solutions" },
  { name: "Victoria Thompson", city: "Curitiba", text: "Uma agência refrescante e imaginativa que entrega resultados excepcionais.", rating: 5, company: "Design Studio" },
  { name: "John Peter", city: "Porto Alegre", text: "Seu talento artístico e abordagem estratégica resultaram em campanhas notáveis.", rating: 5, company: "Marketing Pro" },
  { name: "Natalie Martinez", city: "Salvador", text: "Do conceito à execução, a criatividade deles não tem limites.", rating: 5, company: "Creative Minds" },
];

const StarRating = ({ rating }: { rating: number }) => {
  const fullStar = <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="m7.69 18.346l1.614-5.33L5.115 10h5.216L12 4.462L13.67 10h5.215l-4.189 3.016l1.614 5.33L12 15.07z"/></svg>;
  const halfStar = <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M12 7.9v5.9l2.4 1.85l-.9-3.05l2.25-1.6h-2.8zM7.69 18.346l1.614-5.33L5.115 10h5.216L12 4.462L13.67 10h5.215l-4.189 3.016l1.614 5.33L12 15.07z"/></svg>;
  const emptyStar = <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M9.6 15.65L12 13.8l2.4 1.85l-.9-3.05l2.25-1.6h-2.8L12 7.9l-.95 3.1h-2.8l2.25 1.6zm-1.91 2.696l1.614-5.33L5.115 10h5.216L12 4.462L13.67 10h5.215l-4.189 3.016l1.614 5.33L12 15.07zM12 11.775"/></svg>;
  
  return (
    <div className="flex text-[#f59e0b]">
      {[...Array(5)].map((_, i) => (
        <span key={i}>
          {i < Math.floor(rating) ? fullStar : i < rating ? halfStar : emptyStar}
        </span>
      ))}
    </div>
  );
};

const TestimonialsSection = ({ isMobile }: { isMobile: boolean }) => {
  const [isPaused1, setIsPaused1] = useState(false);
  const [isPaused2, setIsPaused2] = useState(false);
  
  return (
    <section className="py-16 bg-[#0f172a] text-white overflow-hidden my-[30px]">
      <div className="max-w-7xl mx-auto px-8 mb-8 text-center">
        <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4">Depoimentos</h2>
        <div className="text-3xl font-bold text-[#f59e0b] mb-1">
          <AnimatedCounter end={5000} isMobile={isMobile} />+
        </div>
        <p className="text-slate-400 text-sm">instalações realizadas</p>
      </div>
      
      <div className="relative [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
        <div 
          className={`flex gap-6 mb-6 ${isMobile ? 'flex-wrap justify-center' : 'animate-marquee'} ${isPaused1 ? 'paused' : ''}`}
          onMouseEnter={() => setIsPaused1(true)}
          onMouseLeave={() => setIsPaused1(false)}
        >
          {(isMobile ? testimonials : [...testimonials, ...testimonials]).map((t, i) => (
            <div key={i} className="bg-slate-800 p-6 rounded-2xl w-72 flex-shrink-0">
              <StarRating rating={t.rating} />
              <p className="my-4 text-slate-300 text-sm">"{t.text}"</p>
              <div className="flex items-center gap-3">
                <div>
                  <p className="font-bold text-sm">{t.name}</p>
                  <p className="text-xs text-slate-400">{t.city}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {!isMobile && (
          <div 
            className={`flex gap-6 animate-marquee ${isPaused2 ? 'paused' : ''}`}
            style={{ animationDirection: 'reverse' }}
            onMouseEnter={() => setIsPaused2(true)}
            onMouseLeave={() => setIsPaused2(false)}
          >
            {[...testimonials, ...testimonials].reverse().map((t, i) => (
              <div key={i} className="bg-slate-800 p-6 rounded-2xl w-72 flex-shrink-0">
                <StarRating rating={t.rating} />
                <p className="my-4 text-slate-300 text-sm">"{t.text}"</p>
                <div className="flex items-center gap-3">
                  <div>
                    <p className="font-bold text-sm">{t.name}</p>
                    <p className="text-xs text-slate-400">{t.city}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

const AnimatedCounter = ({ end, isMobile }: { end: number; isMobile?: boolean }) => {
  const [count, setCount] = useState(isMobile ? end : 0);
  useEffect(() => {
    if (isMobile) {
      setCount(end);
      return;
    }
    let start = 0;
    const duration = 2000;
    const stepTime = Math.abs(Math.floor(duration / end));
    const timer = setInterval(() => {
      start += Math.ceil(end / 100);
      if (start >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(start);
      }
    }, stepTime);
    return () => clearInterval(timer);
  }, [end, isMobile]);
  return <span>{count.toLocaleString()}</span>;
};


export default function App() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const servicesRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);

  const diferencialRef = useRef<HTMLDivElement>(null);
  const diferencialTitleRef = useRef<HTMLDivElement>(null);
  const diferencialImgRef = useRef<HTMLImageElement>(null);
  const featuresRef = useRef<HTMLDivElement>(null);

  const planosRef = useRef<HTMLDivElement>(null);
  const planosTitleRef = useRef<HTMLDivElement>(null);
  const planosCardsRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const mm = gsap.matchMedia();

    mm.add("(min-width: 1024px)", () => {
      if (!servicesRef.current || !cardsRef.current || !contentRef.current || !titleRef.current) return;

      const cards = cardsRef.current!.children;
      
      const tl = gsap.timeline({
        scrollTrigger: {
          id: "servicos-st",
          trigger: servicesRef.current,
          start: "top top",
          end: "+=2500px", // Increased scroll distance significantly to ensure enough space
          pin: true,
          scrub: 1,
        }
      });

      const cardsArray = Array.from(cards);
      const row1 = cardsArray.slice(0, 3);
      const row2 = cardsArray.slice(3, 6);

      // Hide row 2 initially
      gsap.set(row2, { opacity: 0, y: 100, scale: 0.8 });

      // 1. Animate Row 1
      row1.forEach((card, index) => {
        tl.fromTo(card as HTMLElement, 
          { opacity: 0, y: 100, scale: 0.8 },
          { opacity: 1, y: 0, scale: 1, duration: 1 },
          index * 0.2 // Stagger
        );
      });

      // Pause to let user see row 1
      tl.to({}, { duration: 0.5 });

      // 2. Move container up and hide title
      tl.to(contentRef.current, {
        y: "-25vh", // Adjusted to center the 6 cards properly
        duration: 2,
        ease: "power2.inOut"
      }, "moveUp");

      tl.to(titleRef.current, {
        opacity: 0,
        y: -100, // Extra push for the title
        duration: 1.5,
        ease: "power2.inOut"
      }, "moveUp");

      // 3. Animate Row 2 while moving up
      row2.forEach((card, index) => {
        tl.to(card as HTMLElement, 
          { opacity: 1, y: 0, scale: 1, duration: 1 },
          "moveUp+=" + (0.2 + index * 0.2) // Stagger relative to the moveUp label
        );
      });

      // Add a dummy tween at the end to hold the final state before unpinning
      tl.to({}, { duration: 1 });
    });

    return () => mm.revert();
  }, []);

  useLayoutEffect(() => {
    const mm = gsap.matchMedia();

    mm.add("(min-width: 1024px)", () => {
      if (!diferencialRef.current || !diferencialTitleRef.current || !diferencialImgRef.current) return;

      const tl = gsap.timeline({
        scrollTrigger: {
          id: "diferencial-st",
          trigger: diferencialRef.current,
          start: "top top",
          end: "+=2500px",
          pin: true,
          scrub: 1,
        }
      });

      // Initial state
      gsap.set(diferencialImgRef.current, { opacity: 0, scale: 0.8, y: 100 });
      if (featuresRef.current) {
        gsap.set(featuresRef.current.children, { opacity: 0, scale: 0.8 });
      }

      // Animate image (scale up and fade in)
      tl.to(diferencialImgRef.current, { opacity: 1, scale: 1.1, y: 0, duration: 2 });

      // Animate features
      if (featuresRef.current) {
        const features = Array.from(featuresRef.current.children);
        features.forEach((feature, index) => {
          const isLeft = index % 2 === 0;
          tl.fromTo(feature as any,
            { opacity: 0, scale: 0.8, x: isLeft ? -50 : 50 },
            { opacity: 1, scale: 1, x: 0, duration: 1 },
            "-=0.5" // Overlap slightly
          );
        });
      }

      // Hold the final state for a bit while pinned
      tl.to({}, { duration: 2 });
    });

    return () => mm.revert();
  }, []);

  useLayoutEffect(() => {
    const mm = gsap.matchMedia();

    mm.add("(min-width: 1024px)", () => {
      if (!planosRef.current || !planosTitleRef.current || !planosCardsRef.current) return;

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: planosRef.current,
          start: "top 75%",
        }
      });

      tl.fromTo(planosTitleRef.current, 
        { opacity: 0, y: 30 }, 
        { opacity: 1, y: 0, duration: 0.8 }
      )
      .fromTo(planosCardsRef.current.children,
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 0.8, stagger: 0.2, ease: "power2.out" },
        "-=0.4"
      );
    });

    return () => mm.revert();
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    e.preventDefault();
    
    let targetScroll: number | string = 0;
    
    if (targetId === 'servicos') {
      const st = ScrollTrigger.getById("servicos-st");
      if (st) {
        targetScroll = st.end;
      } else {
        targetScroll = `#${targetId}`;
      }
    } else if (targetId === 'diferencial') {
      const st = ScrollTrigger.getById("diferencial-st");
      if (st) {
        targetScroll = st.end;
      } else {
        targetScroll = `#${targetId}`;
      }
    } else {
      targetScroll = `#${targetId}`;
    }

    gsap.to(window, {
      scrollTo: targetScroll,
      duration: 0
    });
  };

  return (
    <div className="min-h-screen bg-white font-sans text-[#1a1a1a] selection:bg-orange-100">
      {/* Floating WhatsApp Button */}
      <a
        href="https://wa.me/5514997660914?text=gosti%20do%20site"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-[100] bg-[#25D366] text-white p-4 rounded-full shadow-lg hover:scale-110 transition-transform duration-300"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="currentColor"><path d="M12.031 6.172c-3.187 0-5.766 2.578-5.766 5.766 0 1.016.281 1.969.75 2.812l-1.031 3.75 3.844-1.031c.844.469 1.797.75 2.812.75 3.188 0 5.766-2.578 5.766-5.766 0-3.188-2.578-5.766-5.766-5.766zm0 10.547c-.89 0-1.734-.234-2.484-.656l-.188-.109-1.969.516.516-1.922-.109-.187c-.422-.75-.656-1.594-.656-2.484 0-2.672 2.156-4.828 4.828-4.828s4.828 2.156 4.828 4.828-2.156 4.828-4.828 4.828zm2.625-3.563c-.14-.07-1.031-.516-1.188-.563-.14-.047-.25-.07-.359.07s-.422.516-.516.625-.188.125-.328.063c-.14-.063-.594-.219-1.125-.688-.422-.375-.703-.828-.781-.969-.078-.14-.008-.219.063-.281.063-.063.14-.156.219-.234.07-.078.094-.14.141-.234.047-.094.023-.188-.016-.266s-.359-.859-.492-1.172c-.125-.305-.258-.266-.359-.266-.094 0-.203-.008-.312-.008s-.281.039-.43.203c-.148.164-.563.547-.563 1.336s.383 1.547.438 1.625.75 1.172 1.813 1.641c.25.109.445.176.598.223.25.078.477.066.656.039.203-.031.625-.258.711-.5.086-.242.086-.453.063-.5-.023-.047-.086-.07-.172-.109z"/></svg>
      </a>

      {/* Header */}
      <header className="grid grid-cols-2 xl:grid-cols-3 items-center px-8 py-6 max-w-[90rem] mx-auto w-full relative z-[100]">
        <div className="flex justify-start">
          <img 
            src="https://i.postimg.cc/63vKtq3f/logo-texto.png" 
            alt="ClariView Logo" 
            className="h-8 md:h-10 object-contain"
            referrerPolicy="no-referrer"
          />
        </div>
        
        <nav className="hidden xl:flex justify-center items-center space-x-4 text-[13px] font-semibold text-[#1a1a1a] uppercase tracking-wider relative z-[101]">
          <a href="#inicio" onClick={(e) => handleNavClick(e, 'inicio')} className="hover:text-[#f59e0b] transition-colors whitespace-nowrap cursor-pointer">Início</a>
          <span className="text-gray-300">/</span>
          <a href="#solucoes" onClick={(e) => handleNavClick(e, 'solucoes')} className="hover:text-[#f59e0b] transition-colors whitespace-nowrap cursor-pointer">Soluções</a>
          <span className="text-gray-300">/</span>
          <a href="#servicos" onClick={(e) => handleNavClick(e, 'servicos')} className="hover:text-[#f59e0b] transition-colors whitespace-nowrap cursor-pointer">Serviços</a>
          <span className="text-gray-300">/</span>
          <a href="#diferencial" onClick={(e) => handleNavClick(e, 'diferencial')} className="hover:text-[#f59e0b] transition-colors whitespace-nowrap cursor-pointer">Diferencial</a>
          <span className="text-gray-300">/</span>
          <a href="#planos" onClick={(e) => handleNavClick(e, 'planos')} className="hover:text-[#f59e0b] transition-colors whitespace-nowrap cursor-pointer">Planos</a>
          <span className="text-gray-300">/</span>
          <a href="#processo" onClick={(e) => handleNavClick(e, 'processo')} className="hover:text-[#f59e0b] transition-colors whitespace-nowrap cursor-pointer">Processo</a>
          <span className="text-gray-300">/</span>
          <a href="#contato" onClick={(e) => handleNavClick(e, 'contato')} className="hover:text-[#f59e0b] transition-colors whitespace-nowrap cursor-pointer">Contato</a>
        </nav>

        <div className="flex justify-end">
          <button onClick={(e) => handleNavClick(e, 'contato')} className="bg-[#fcd34d] hover:bg-[#f59e0b] text-[#1a1a1a] px-8 py-3 rounded-full text-sm font-bold transition-all shadow-md whitespace-nowrap cursor-pointer">
            Começar Agora
          </button>
        </div>
      </header>

      {/* Hero Section */}
      <main id="inicio" className="relative flex flex-col items-center justify-center min-h-[calc(100vh-96px)] px-8 max-w-7xl mx-auto w-full">
        
        {/* Main Content Area (Visually Centered) */}
        <div className="relative w-full flex flex-col items-center py-20">
          
          {/* Background Circle (Now follows the text) */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] md:w-[900px] md:h-[900px] bg-gray-50 rounded-full -z-10" />

          {/* Top Label */}
          <motion.p 
            initial={isMobile ? false : { opacity: 0, y: 20 }}
            animate={isMobile ? { opacity: 1, y: 0 } : { opacity: 1, y: 0 }}
            className="text-[10px] md:text-xs font-bold tracking-[0.3em] uppercase mb-4 text-gray-500 text-center"
          >
            Proteja seu espaço com tecnologia avançada
          </motion.p>

          {/* Large Title & Camera Sandwich */}
          <motion.h1 
            initial={isMobile ? false : { opacity: 0, scale: 0.95 }}
            animate={isMobile ? { opacity: 1, scale: 1 } : { opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-[17vw] md:text-[14.5rem] font-serif font-bold leading-none text-[#0f172a] uppercase tracking-tighter select-none text-center relative"
          >
            <span className="relative z-20">Cam</span>
            
            {/* Main Camera Image (Inside h1 to share stacking context) */}
            <motion.div 
              initial={isMobile ? false : { opacity: 0, y: 40 }}
              animate={isMobile ? { opacity: 1, y: 0 } : { opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 translate-y-[95px] md:translate-y-[114px] w-0 h-0 flex items-center justify-center z-10 pointer-events-none"
            >
              <img 
                src="https://i.postimg.cc/ZRdm4nRF/camera-sem-fundo.png" 
                alt="ClariView Advanced Camera" 
                className="max-w-none w-[85vw] md:w-[600px] h-auto drop-shadow-2xl"
                referrerPolicy="no-referrer"
              />
            </motion.div>

            <span className="relative z-0">eras</span>
          </motion.h1>

          {/* CTA Buttons */}
          <motion.div 
            initial={isMobile ? false : { opacity: 0, y: 20 }}
            animate={isMobile ? { opacity: 1, y: 0 } : { opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="flex flex-col sm:flex-row gap-4 mt-[148px] md:mt-[244px] relative z-30"
          >
            <button className="py-4 px-[40px] rounded-full bg-[#fcd34d] border-none text-center cursor-pointer transition-all duration-400 hover:shadow-[7px_5px_56px_-14px_#f59e0b] active:scale-[0.97] active:shadow-[7px_5px_56px_-10px_#f59e0b] text-[#1a1a1a] font-bold uppercase tracking-wider text-xs">
              <strong>Solicitar Orçamento</strong>
            </button>
            <button className="py-4 px-[40px] rounded-full bg-[#fcd34d] border-none text-center cursor-pointer transition-all duration-400 hover:shadow-[7px_5px_56px_-14px_#f59e0b] active:scale-[0.97] active:shadow-[7px_5px_56px_-10px_#f59e0b] text-[#1a1a1a] font-bold uppercase tracking-wider text-xs">
              <strong>Ver Planos</strong>
            </button>
          </motion.div>
        </div>

        {/* Bottom Left Element */}
        <motion.div 
          initial={isMobile ? false : { opacity: 0, x: -50 }}
          animate={isMobile ? { opacity: 1, x: 0 } : { opacity: 1, x: 0 }}
          transition={{ delay: 0.5 }}
          className="absolute bottom-12 left-8 hidden lg:block"
        >
          <img 
            src="https://i.postimg.cc/50CJby0z/imagem-pequena-com-fundo-laranja.png" 
            alt="ClariView Feature" 
            className="w-32 h-auto drop-shadow-xl"
            referrerPolicy="no-referrer"
          />
        </motion.div>

        {/* Right Side Content */}
        <motion.div 
          initial={isMobile ? false : { opacity: 0, x: 50 }}
          animate={isMobile ? { opacity: 1, x: 0 } : { opacity: 1, x: 0 }}
          transition={{ delay: 0.6 }}
          className="absolute right-8 bottom-24 max-w-xs text-right hidden md:block"
        >
          <div className="flex items-center justify-end space-x-2 text-sm font-bold uppercase tracking-wider mb-4 group cursor-pointer">
            <span>Explore nossas linhas</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </div>
          <div className="h-[1px] w-full bg-gray-200 mb-6" />
          <p className="text-[10px] leading-relaxed font-bold uppercase text-gray-500 tracking-widest mb-8">
            Visão noturna avançada, sensores de alta resolução e alertas por IA. 
            Descubra sistemas projetados para segurança total.
          </p>
          <button className="bg-gray-100 hover:bg-gray-200 text-gray-800 px-6 py-2 rounded-full text-[10px] font-bold uppercase tracking-widest transition-colors">
            Consultoria Gratuita
          </button>
        </motion.div>

      </main>

      {/* Solutions Section */}
      <section id="solucoes" className="py-32 px-8 bg-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-24">
            <motion.h2 
              initial={isMobile ? false : { opacity: 0, y: 20 }}
              whileInView={isMobile ? { opacity: 1, y: 0 } : { opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-4xl md:text-5xl font-serif font-bold text-[#0f172a] mb-6 uppercase tracking-tight"
            >
              Soluções Inteligentes para sua Segurança
            </motion.h2>
            <motion.p 
              initial={isMobile ? false : { opacity: 0, y: 20 }}
              whileInView={isMobile ? { opacity: 1, y: 0 } : { opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-gray-500 max-w-2xl mx-auto font-medium uppercase tracking-[0.2em] text-xs"
            >
              Tecnologia de ponta integrada para proteger o que mais importa para você.
            </motion.p>
          </div>

          {/* Staggered Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-4">
            {/* Card 1 */}
            <motion.div 
              initial={isMobile ? false : { opacity: 0, y: 50 }}
              whileInView={isMobile ? { opacity: 1, y: 0 } : { opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="solution-card-parent mx-auto lg:mt-0"
            >
              <div className="solution-card">
                <div className="solution-content-box">
                  <span className="solution-card-title">Segurança e Proteção</span>
                  <p className="solution-card-content">
                    Sinta-se seguro com sistemas que previnem invasões e protegem seu patrimônio 24h por dia.
                  </p>
                  <div className="mt-auto">
                    <span className="solution-see-more">Saiba Mais</span>
                  </div>
                </div>
                <div className="solution-date-box">
                  <span className="month">SOL</span>
                  <span className="date">01</span>
                </div>
              </div>
            </motion.div>

            {/* Card 2 - Staggered Down */}
            <motion.div 
              initial={isMobile ? false : { opacity: 0, y: 50 }}
              whileInView={isMobile ? { opacity: 1, y: 0 } : { opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="solution-card-parent mx-auto lg:mt-24"
            >
              <div className="solution-card">
                <div className="solution-content-box">
                  <span className="solution-card-title">Tranquilidade Absoluta</span>
                  <p className="solution-card-content">
                    Saiba exatamente o que acontece no seu espaço, mesmo quando você está longe.
                  </p>
                  <div className="mt-auto">
                    <span className="solution-see-more">Saiba Mais</span>
                  </div>
                </div>
                <div className="solution-date-box">
                  <span className="month">SOL</span>
                  <span className="date">02</span>
                </div>
              </div>
            </motion.div>

            {/* Card 3 */}
            <motion.div 
              initial={isMobile ? false : { opacity: 0, y: 50 }}
              whileInView={isMobile ? { opacity: 1, y: 0 } : { opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="solution-card-parent mx-auto lg:mt-0"
            >
              <div className="solution-card">
                <div className="solution-content-box">
                  <span className="solution-card-title">Visão Noturna Cristalina</span>
                  <p className="solution-card-content">
                    Tecnologia avançada que garante imagens nítidas e coloridas mesmo na escuridão total.
                  </p>
                  <div className="mt-auto">
                    <span className="solution-see-more">Saiba Mais</span>
                  </div>
                </div>
                <div className="solution-date-box">
                  <span className="month">SOL</span>
                  <span className="date">03</span>
                </div>
              </div>
            </motion.div>

            {/* Card 4 - Staggered Down */}
            <motion.div 
              initial={isMobile ? false : { opacity: 0, y: 50 }}
              whileInView={isMobile ? { opacity: 1, y: 0 } : { opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="solution-card-parent mx-auto lg:mt-24"
            >
              <div className="solution-card">
                <div className="solution-content-box">
                  <span className="solution-card-title">Monitoramento Instantâneo</span>
                  <p className="solution-card-content">
                    Acompanhe tudo em tempo real com alertas imediatos direto no seu smartphone.
                  </p>
                  <div className="mt-auto">
                    <span className="solution-see-more">Saiba Mais</span>
                  </div>
                </div>
                <div className="solution-date-box">
                  <span className="month">SOL</span>
                  <span className="date">04</span>
                </div>
              </div>
            </motion.div>
          </div>
          <div className="text-center mt-16">
            <button onClick={(e) => handleNavClick(e, 'contato')} className="py-4 px-[40px] rounded-full bg-[#fcd34d] border-none text-center cursor-pointer transition-all duration-400 hover:shadow-[7px_5px_56px_-14px_#f59e0b] active:scale-[0.97] active:shadow-[7px_5px_56px_-10px_#f59e0b] text-[#1a1a1a] font-bold uppercase tracking-wider text-xs">
              <strong>Solicitar Orçamento</strong>
            </button>
          </div>
        </div>
      </section>

      {/* New Services Section with GSAP Animation */}
      <section 
        ref={servicesRef}
        id="servicos" 
        className={`${isMobile ? 'h-auto py-24' : 'h-screen'} w-full bg-slate-50 px-8 flex flex-col items-center justify-start overflow-hidden pt-12`}
      >
        <div ref={contentRef} className={`max-w-7xl mx-auto w-full ${isMobile ? 'pt-0' : 'pt-0'}`}>
          <div ref={titleRef} className="text-center mb-8">
            <h2 className="text-orange-500 font-bold tracking-widest uppercase text-sm mb-2">Tecnologia de Ponta</h2>
            <h3 className="text-4xl md:text-5xl font-serif text-[#0f172a] font-bold leading-tight">
              Nossos Serviços
            </h3>
          </div>

          <div 
            ref={cardsRef}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {/* Service Card 1 */}
            <div className="custom-card">
              <div className="img">
                <div className="absolute inset-0 flex items-center justify-center text-white">
                  <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24"><path fill="currentColor" d="M6.025 16h7.95q.325 0 .463-.275t-.063-.525l-2.425-3.175q-.075-.1-.175-.15t-.225-.05t-.225.05t-.175.15l-1.5 1.95q-.075.1-.175.15t-.225.05t-.225-.05t-.175-.15L8.1 13q-.075-.1-.175-.138t-.225-.037t-.225.038T7.3 13l-1.675 2.2q-.2.25-.062.525t.462.275M4 20q-.825 0-1.412-.587T2 18V6q0-.825.588-1.412T4 4h12q.825 0 1.413.588T18 6v4.5l3.15-3.15q.25-.25.55-.125t.3.475v8.6q0 .35-.3.475t-.55-.125L18 13.5V18q0 .825-.587 1.413T16 20z"/></svg>
                </div>
              </div>
              <span>Monitoramento 4K Ultra</span>
              <p className="info">
                Imagens com resolução cinematográfica que permitem identificar detalhes cruciais com clareza absoluta.
              </p>
              <button onClick={(e) => handleNavClick(e, 'planos')}>Ver Planos</button>
            </div>

            {/* Service Card 2 */}
            <div className="custom-card">
              <div className="img">
                <div className="absolute inset-0 flex items-center justify-center text-white">
                  <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 48 48"><path fill="currentColor" d="M34 6c-1.368 4.944-3.13 6.633-8 8c4.87 1.367 6.632 3.056 8 8c1.368-4.944 3.13-6.633 8-8c-4.87-1.367-6.632-3.056-8-8m-14 8c-2.395 8.651-5.476 11.608-14 14c8.524 2.392 11.605 5.349 14 14c2.395-8.651 5.476-11.608 14-14c-8.524-2.392-11.605-5.349-14-14"/></svg>
                </div>
              </div>
              <span>IA de Reconhecimento</span>
              <p className="info">
                Nossa inteligência artificial distingue pessoas, veículos e animais, reduzindo alarmes falsos em 99%.
              </p>
              <button onClick={(e) => handleNavClick(e, 'planos')}>Ver Planos</button>
            </div>

            {/* Service Card 3 */}
            <div className="custom-card">
              <div className="img">
                <div className="absolute inset-0 flex items-center justify-center text-white">
                  <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24"><path fill="currentColor" d="M4 19v-2h2v-7q0-2.075 1.25-3.687T10.5 4.2v-.7q0-.625.438-1.062T12 2t1.063.438T13.5 3.5v.7q2 .5 3.25 2.113T18 10v7h2v2zm8 3q-.825 0-1.412-.587T10 20h4q0 .825-.587 1.413T12 22m-1-9h2V8h-2zm1 3q.425 0 .713-.288T13 15t-.288-.712T12 14t-.712.288T11 15t.288.713T12 16"/></svg>
                </div>
              </div>
              <span>Alertas Instantâneos</span>
              <p className="info">
                Receba notificações críticas no seu celular em menos de 1 segundo após qualquer atividade suspeita.
              </p>
              <button onClick={(e) => handleNavClick(e, 'planos')}>Ver Planos</button>
            </div>

            {/* Service Card 4 */}
            <div className="custom-card">
              <div className="img">
                <div className="absolute inset-0 flex items-center justify-center text-white">
                  <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24"><path fill="currentColor" d="M10.35 17L16 11.35L14.55 9.9l-4.225 4.225l-2.1-2.1L6.8 13.45zM6.5 20q-2.275 0-3.887-1.575T1 14.575q0-1.95 1.175-3.475T5.25 9.15q.625-2.3 2.5-3.725T12 4q2.925 0 4.963 2.038T19 11q1.725.2 2.863 1.488T23 15.5q0 1.875-1.312 3.188T18.5 20z"/></svg>
                </div>
              </div>
              <span>Nuvem Criptografada</span>
              <p className="info">
                Suas gravações são protegidas por criptografia de nível militar e armazenadas de forma redundante.
              </p>
              <button onClick={(e) => handleNavClick(e, 'planos')}>Ver Planos</button>
            </div>

            {/* Service Card 5 */}
            <div className="custom-card">
              <div className="img">
                <div className="absolute inset-0 flex items-center justify-center text-white">
                  <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24"><path fill="currentColor" d="M10.45 15.5q.625.625 1.575.588T13.4 15.4L19 7l-8.4 5.6q-.65.45-.712 1.362t.562 1.538M5.1 20q-.55 0-1.012-.238t-.738-.712q-.65-1.175-1-2.437T2 14q0-2.075.788-3.9t2.137-3.175T8.1 4.788T12 4q2.05 0 3.85.775T19 6.888t2.15 3.125t.825 3.837q.025 1.375-.312 2.688t-1.038 2.512q-.275.475-.737.713T18.874 20z"/></svg>
                </div>
              </div>
              <span>Instalação Express</span>
              <p className="info">
                Nossa equipe técnica configura todo o seu ecossistema de segurança em poucas horas, sem sujeira.
              </p>
              <button onClick={(e) => handleNavClick(e, 'planos')}>Ver Planos</button>
            </div>

            {/* Service Card 6 */}
            <div className="custom-card">
              <div className="img">
                <div className="absolute inset-0 flex items-center justify-center text-white">
                  <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24"><g fill="none"><path d="m12.594 23.258l-.012.002l-.071.035l-.02.004l-.014-.004l-.071-.036q-.016-.004-.024.006l-.004.01l-.017.428l.005.02l.01.013l.104.074l.015.004l.012-.004l.104-.074l.012-.016l.004-.017l-.017-.427q-.004-.016-.016-.018m.264-.113l-.014.002l-.184.093l-.01.01l-.003.011l.018.43l.005.012l.008.008l.201.092q.019.005.029-.008l.004-.014l-.034-.614q-.005-.019-.02-.022m-.715.002a.02.02 0 0 0-.027.006l-.006.014l-.034.614q.001.018.017.024l.015-.002l.201-.093l.01-.008l.003-.011l.018-.43l-.003-.012l-.01-.01z"/><path fill="currentColor" d="M6 7a5 5 0 1 1 10 0A5 5 0 0 1 6 7m-1.178 7.672C6.425 13.694 8.605 13 11 13q.671 0 1.316.07a1 1 0 0 1 .72 1.557A5.97 5.97 0 0 0 12 18c0 .92.207 1.79.575 2.567a1 1 0 0 1-.89 1.428L11 22c-2.229 0-4.335-.14-5.913-.558c-.785-.208-1.524-.506-2.084-.956C2.41 20.01 2 19.345 2 18.5c0-.787.358-1.523.844-2.139c.494-.625 1.177-1.2 1.978-1.69ZM17 21a1 1 0 0 1 .883-.993l.119-.007a1 1 0 0 1 .117 1.993L18 22a1 1 0 0 1-1-1m.567-4.75a.5.5 0 0 1 .933.25c0 .135-.048.255-.321.48l-.145.114l-.11.082c-.074.055-.162.12-.243.186l-.139.116a1.7 1.7 0 0 0-.488.697a1 1 0 0 0 1.835.782l.097-.077l.357-.27l.107-.086l.181-.158c.406-.374.869-.968.869-1.866a2.5 2.5 0 0 0-4.662-1.257a1 1 0 0 0 1.729 1.007"/></g></svg>
                </div>
              </div>
              <span>Suporte Especializado</span>
              <p className="info">
                Central de atendimento dedicada pronta para auxiliar você em qualquer dúvida ou emergência.
              </p>
              <button onClick={(e) => handleNavClick(e, 'planos')}>Ver Planos</button>
            </div>
          </div>
          <div className="text-center mt-10">
            <button onClick={(e) => handleNavClick(e, 'contato')} className="py-4 px-[40px] rounded-full bg-[#fcd34d] border-none text-center cursor-pointer transition-all duration-400 hover:shadow-[7px_5px_56px_-14px_#f59e0b] active:scale-[0.97] active:shadow-[7px_5px_56px_-10px_#f59e0b] text-[#1a1a1a] font-bold uppercase tracking-wider text-xs">
              <strong>Solicitar Orçamento</strong>
            </button>
          </div>
        </div>
      </section>

      {/* Diferencial Section */}
      <section id="diferencial" ref={diferencialRef} className={`relative ${isMobile ? 'h-auto py-24' : 'h-screen'} w-full bg-white overflow-hidden flex flex-col items-center justify-center`}>
        <div className="max-w-7xl mx-auto px-8 w-full relative z-10 flex flex-col items-center">
          <div ref={diferencialTitleRef} className="text-center mb-16">
            <h2 className="text-orange-500 font-bold tracking-widest uppercase text-sm mb-4">Nosso Diferencial</h2>
            <h3 className="text-4xl md:text-6xl font-serif text-[#0f172a] font-bold leading-tight max-w-3xl mx-auto">
              Visão Além do Alcance
            </h3>
          </div>
          
          <div className="relative w-full max-w-5xl mx-auto flex justify-center items-center mt-10">
            {/* Background decorative element */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] md:w-[600px] md:h-[600px] bg-orange-500/10 rounded-full blur-3xl -z-10" />
            
            <div ref={diferencialImgRef} className="w-full flex flex-col justify-center items-center relative">
              <img 
                src="https://i.postimg.cc/ZRdm4nRF/camera-sem-fundo.png" 
                alt="Câmera de Segurança Diferencial" 
                className="hidden md:block w-full max-w-[400px] md:max-w-[800px] max-h-[40vh] md:max-h-[50vh] h-auto object-contain scale-x-[-1] drop-shadow-2xl relative z-10"
                referrerPolicy="no-referrer"
              />
              
              {/* Features */}
              <div className="w-full md:absolute md:inset-0 z-20 pointer-events-none">
                <div className="flex flex-col items-center gap-6 md:hidden">
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 rounded-full bg-orange-500"></div>
                    <span className="text-lg font-bold text-slate-800">Instalação no mesmo dia</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 rounded-full bg-orange-500"></div>
                    <span className="text-lg font-bold text-slate-800">Técnicos certificados</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 rounded-full bg-orange-500"></div>
                    <span className="text-lg font-bold text-slate-800">Equipamentos com garantia</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 rounded-full bg-orange-500"></div>
                    <span className="text-lg font-bold text-slate-800">Suporte via WhatsApp</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 rounded-full bg-orange-500"></div>
                    <span className="text-lg font-bold text-slate-800">Monitoramento 24/7</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 rounded-full bg-orange-500"></div>
                    <span className="text-lg font-bold text-slate-800">Sem mensalidade obrigatória</span>
                  </div>
                </div>
                <div ref={featuresRef} className="hidden md:block">
                  {/* 1. Top Left */}
                  <div className={`feature-item absolute top-[15%] left-[2%] md:left-[10%] flex items-center gap-2 ${isMobile ? 'opacity-100' : 'opacity-0'}`}>
                    <span className="text-xs md:text-sm font-bold text-slate-800 whitespace-nowrap">Instalação no mesmo dia</span>
                    <div className="hidden md:block w-8 lg:w-16 h-[2px] bg-orange-500 relative"><div className="absolute right-0 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-orange-500"></div></div>
                  </div>
                  
                  {/* 2. Top Right */}
                  <div className={`feature-item absolute top-[15%] right-[2%] md:right-[10%] flex items-center flex-row-reverse gap-2 ${isMobile ? 'opacity-100' : 'opacity-0'}`}>
                    <span className="text-xs md:text-sm font-bold text-slate-800 whitespace-nowrap">Técnicos certificados</span>
                    <div className="hidden md:block w-8 lg:w-16 h-[2px] bg-orange-500 relative"><div className="absolute left-0 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-orange-500"></div></div>
                  </div>

                  {/* 3. Middle Left */}
                  <div className={`feature-item absolute top-[45%] left-[-2%] md:left-[2%] flex items-center gap-2 ${isMobile ? 'opacity-100' : 'opacity-0'}`}>
                    <span className="text-xs md:text-sm font-bold text-slate-800 whitespace-nowrap">Equipamentos com garantia</span>
                    <div className="hidden md:block w-12 lg:w-24 h-[2px] bg-orange-500 relative"><div className="absolute right-0 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-orange-500"></div></div>
                  </div>

                  {/* 4. Middle Right */}
                  <div className={`feature-item absolute top-[45%] right-[-2%] md:right-[2%] flex items-center flex-row-reverse gap-2 ${isMobile ? 'opacity-100' : 'opacity-0'}`}>
                    <span className="text-xs md:text-sm font-bold text-slate-800 whitespace-nowrap">Suporte via WhatsApp</span>
                    <div className="hidden md:block w-12 lg:w-24 h-[2px] bg-orange-500 relative"><div className="absolute left-0 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-orange-500"></div></div>
                  </div>

                  {/* 5. Bottom Left */}
                  <div className={`feature-item absolute top-[75%] left-[2%] md:left-[10%] flex items-center gap-2 ${isMobile ? 'opacity-100' : 'opacity-0'}`}>
                    <span className="text-xs md:text-sm font-bold text-slate-800 whitespace-nowrap">Monitoramento 24/7</span>
                    <div className="hidden md:block w-8 lg:w-16 h-[2px] bg-orange-500 relative"><div className="absolute right-0 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-orange-500"></div></div>
                  </div>

                  {/* 6. Bottom Right */}
                  <div className={`feature-item absolute top-[75%] right-[2%] md:right-[10%] flex items-center flex-row-reverse gap-2 ${isMobile ? 'opacity-100' : 'opacity-0'}`}>
                    <span className="text-xs md:text-sm font-bold text-slate-800 whitespace-nowrap">Sem mensalidade obrigatória</span>
                    <div className="hidden md:block w-8 lg:w-16 h-[2px] bg-orange-500 relative"><div className="absolute left-0 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-orange-500"></div></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="text-center mt-16">
            <button onClick={(e) => handleNavClick(e, 'contato')} className="py-4 px-[40px] rounded-full bg-[#fcd34d] border-none text-center cursor-pointer transition-all duration-400 hover:shadow-[7px_5px_56px_-14px_#f59e0b] active:scale-[0.97] active:shadow-[7px_5px_56px_-10px_#f59e0b] text-[#1a1a1a] font-bold uppercase tracking-wider text-xs">
              <strong>Solicitar Orçamento</strong>
            </button>
          </div>
        </div>
      </section>

      {/* Planos Section */}
      <section id="planos" ref={planosRef} className="w-full bg-slate-50 py-32 px-8">
        <div className="max-w-7xl mx-auto">
          <div ref={planosTitleRef} className="text-center mb-20">
            <h2 className="text-4xl md:text-6xl font-serif text-[#0f172a] font-bold mb-6">Planos de Segurança</h2>
            <p className="text-slate-600 text-lg max-w-2xl mx-auto">
              Gerencie, rastreie e otimize a segurança do seu patrimônio com um plano construído para suas necessidades.
            </p>
          </div>

          <div ref={planosCardsRef} className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center max-w-6xl mx-auto">
            {/* Básico */}
            <div className="rounded-2xl shadow-[0_30px_30px_-25px_rgba(0,0,0,0.1)] p-2.5 bg-white text-slate-500 w-full mx-auto flex flex-col h-full">
              <div className="flex flex-col items-start p-6 pt-12 bg-slate-50 rounded-xl relative h-full flex-1">
                <span className="absolute top-0 right-0 bg-slate-200 rounded-l-full flex items-center py-2 px-4 text-lg font-bold text-slate-700">
                  <span>R$ 99 <small className="text-slate-500 text-sm font-medium ml-1">/ m</small></span>
                </span>
                <p className="font-bold text-2xl text-slate-800 mb-2">Básico</p>
                <p className="mb-6 text-sm">Ideal para pequenas residências e monitoramento essencial.</p>
                <ul className="flex flex-col gap-3 flex-1 w-full mb-8">
                  <li className="flex items-center gap-3 text-slate-700 font-medium">
                    <span className="bg-orange-500 inline-flex items-center justify-center text-white rounded-full w-5 h-5 flex-shrink-0">
                      <svg height="14" width="14" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M0 0h24v24H0z" fill="none"></path><path fill="currentColor" d="M10 15.172l9.192-9.193 1.415 1.414L10 18l-6.364-6.364 1.414-1.414z"></path></svg>
                    </span>
                    <span><strong>2</strong> câmeras</span>
                  </li>
                  <li className="flex items-center gap-3 text-slate-700 font-medium">
                    <span className="bg-orange-500 inline-flex items-center justify-center text-white rounded-full w-5 h-5 flex-shrink-0">
                      <svg height="14" width="14" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M0 0h24v24H0z" fill="none"></path><path fill="currentColor" d="M10 15.172l9.192-9.193 1.415 1.414L10 18l-6.364-6.364 1.414-1.414z"></path></svg>
                    </span>
                    <span>HD <strong>720p</strong></span>
                  </li>
                  <li className="flex items-center gap-3 text-slate-700 font-medium">
                    <span className="bg-orange-500 inline-flex items-center justify-center text-white rounded-full w-5 h-5 flex-shrink-0">
                      <svg height="14" width="14" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M0 0h24v24H0z" fill="none"></path><path fill="currentColor" d="M10 15.172l9.192-9.193 1.415 1.414L10 18l-6.364-6.364 1.414-1.414z"></path></svg>
                    </span>
                    <span>Armazenamento local</span>
                  </li>
                  <li className="flex items-center gap-3 text-slate-700 font-medium">
                    <span className="bg-orange-500 inline-flex items-center justify-center text-white rounded-full w-5 h-5 flex-shrink-0">
                      <svg height="14" width="14" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M0 0h24v24H0z" fill="none"></path><path fill="currentColor" d="M10 15.172l9.192-9.193 1.415 1.414L10 18l-6.364-6.364 1.414-1.414z"></path></svg>
                    </span>
                    <span>Suporte por e-mail</span>
                  </li>
                </ul>
                <div className="w-full mt-auto">
                  <button className="w-full py-4 px-[40px] rounded-full bg-[#fcd34d] border-none text-center cursor-pointer transition-all duration-400 hover:shadow-[7px_5px_56px_-14px_#f59e0b] active:scale-[0.97] active:shadow-[7px_5px_56px_-10px_#f59e0b] text-[#1a1a1a] font-bold uppercase tracking-wider text-xs">
                    <strong>Assinar Básico</strong>
                  </button>
                </div>
              </div>
            </div>

            {/* Profissional */}
            <div className="rounded-2xl shadow-[0_30px_30px_-25px_rgba(245,158,11,0.3)] p-2.5 bg-[#0f172a] text-slate-400 w-full mx-auto flex flex-col h-full transform md:-translate-y-4 relative z-10">
              <div className="flex flex-col items-start p-6 pt-12 bg-slate-800/50 rounded-xl relative h-full flex-1">
                <span className="absolute top-0 right-0 bg-orange-500 rounded-l-full flex items-center py-2 px-4 text-lg font-bold text-white">
                  <span>R$ 199 <small className="text-orange-100 text-sm font-medium ml-1">/ m</small></span>
                </span>
                <p className="font-bold text-2xl text-white mb-2">Profissional</p>
                <p className="mb-6 text-sm">Construído para comércios e residências que buscam escalar sua segurança.</p>
                <ul className="flex flex-col gap-3 flex-1 w-full mb-8">
                  <li className="flex items-center gap-3 text-slate-200 font-medium">
                    <span className="bg-orange-500 inline-flex items-center justify-center text-white rounded-full w-5 h-5 flex-shrink-0">
                      <svg height="14" width="14" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M0 0h24v24H0z" fill="none"></path><path fill="currentColor" d="M10 15.172l9.192-9.193 1.415 1.414L10 18l-6.364-6.364 1.414-1.414z"></path></svg>
                    </span>
                    <span><strong>6</strong> câmeras</span>
                  </li>
                  <li className="flex items-center gap-3 text-slate-200 font-medium">
                    <span className="bg-orange-500 inline-flex items-center justify-center text-white rounded-full w-5 h-5 flex-shrink-0">
                      <svg height="14" width="14" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M0 0h24v24H0z" fill="none"></path><path fill="currentColor" d="M10 15.172l9.192-9.193 1.415 1.414L10 18l-6.364-6.364 1.414-1.414z"></path></svg>
                    </span>
                    <span>Full HD <strong>1080p</strong></span>
                  </li>
                  <li className="flex items-center gap-3 text-slate-200 font-medium">
                    <span className="bg-orange-500 inline-flex items-center justify-center text-white rounded-full w-5 h-5 flex-shrink-0">
                      <svg height="14" width="14" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M0 0h24v24H0z" fill="none"></path><path fill="currentColor" d="M10 15.172l9.192-9.193 1.415 1.414L10 18l-6.364-6.364 1.414-1.414z"></path></svg>
                    </span>
                    <span>Nuvem <strong>30 dias</strong></span>
                  </li>
                  <li className="flex items-center gap-3 text-slate-200 font-medium">
                    <span className="bg-orange-500 inline-flex items-center justify-center text-white rounded-full w-5 h-5 flex-shrink-0">
                      <svg height="14" width="14" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M0 0h24v24H0z" fill="none"></path><path fill="currentColor" d="M10 15.172l9.192-9.193 1.415 1.414L10 18l-6.364-6.364 1.414-1.414z"></path></svg>
                    </span>
                    <span>Suporte <strong>24h</strong></span>
                  </li>
                </ul>
                <div className="w-full mt-auto">
                  <button className="w-full py-4 px-[40px] rounded-full bg-[#fcd34d] border-none text-center cursor-pointer transition-all duration-400 hover:shadow-[7px_5px_56px_-14px_#f59e0b] active:scale-[0.97] active:shadow-[7px_5px_56px_-10px_#f59e0b] text-[#1a1a1a] font-bold uppercase tracking-wider text-xs">
                    <strong>Assinar Profissional</strong>
                  </button>
                </div>
              </div>
            </div>

            {/* Empresarial */}
            <div className="rounded-2xl shadow-[0_30px_30px_-25px_rgba(0,0,0,0.1)] p-2.5 bg-white text-slate-500 w-full mx-auto flex flex-col h-full">
              <div className="flex flex-col items-start p-6 pt-12 bg-slate-50 rounded-xl relative h-full flex-1">
                <span className="absolute top-0 right-0 bg-slate-200 rounded-l-full flex items-center py-2 px-4 text-lg font-bold text-slate-700">
                  <span>Personalizado</span>
                </span>
                <p className="font-bold text-2xl text-slate-800 mb-2">Empresarial</p>
                <p className="mb-6 text-sm">Perfeito para construtoras, empresas e equipes de segurança.</p>
                <ul className="flex flex-col gap-3 flex-1 w-full mb-8">
                  <li className="flex items-center gap-3 text-slate-700 font-medium">
                    <span className="bg-orange-500 inline-flex items-center justify-center text-white rounded-full w-5 h-5 flex-shrink-0">
                      <svg height="14" width="14" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M0 0h24v24H0z" fill="none"></path><path fill="currentColor" d="M10 15.172l9.192-9.193 1.415 1.414L10 18l-6.364-6.364 1.414-1.414z"></path></svg>
                    </span>
                    <span><strong>Sob consulta</strong></span>
                  </li>
                  <li className="flex items-center gap-3 text-slate-700 font-medium">
                    <span className="bg-orange-500 inline-flex items-center justify-center text-white rounded-full w-5 h-5 flex-shrink-0">
                      <svg height="14" width="14" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M0 0h24v24H0z" fill="none"></path><path fill="currentColor" d="M10 15.172l9.192-9.193 1.415 1.414L10 18l-6.364-6.364 1.414-1.414z"></path></svg>
                    </span>
                    <span><strong>4K + IA</strong></span>
                  </li>
                  <li className="flex items-center gap-3 text-slate-700 font-medium">
                    <span className="bg-orange-500 inline-flex items-center justify-center text-white rounded-full w-5 h-5 flex-shrink-0">
                      <svg height="14" width="14" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M0 0h24v24H0z" fill="none"></path><path fill="currentColor" d="M10 15.172l9.192-9.193 1.415 1.414L10 18l-6.364-6.364 1.414-1.414z"></path></svg>
                    </span>
                    <span>Nuvem <strong>ilimitada</strong></span>
                  </li>
                  <li className="flex items-center gap-3 text-slate-700 font-medium">
                    <span className="bg-orange-500 inline-flex items-center justify-center text-white rounded-full w-5 h-5 flex-shrink-0">
                      <svg height="14" width="14" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M0 0h24v24H0z" fill="none"></path><path fill="currentColor" d="M10 15.172l9.192-9.193 1.415 1.414L10 18l-6.364-6.364 1.414-1.414z"></path></svg>
                    </span>
                    <span>Gerente <strong>dedicado</strong></span>
                  </li>
                </ul>
                <div className="w-full mt-auto">
                  <button className="w-full py-4 px-[40px] rounded-full bg-[#fcd34d] border-none text-center cursor-pointer transition-all duration-400 hover:shadow-[7px_5px_56px_-14px_#f59e0b] active:scale-[0.97] active:shadow-[7px_5px_56px_-10px_#f59e0b] text-[#1a1a1a] font-bold uppercase tracking-wider text-xs">
                    <strong>Falar com Consultor</strong>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Processo Section */}
      <section id="processo" className="w-full bg-white py-32 px-8 relative overflow-hidden">
        <div className="max-w-5xl mx-auto relative">
          <div className="text-center mb-24">
            <motion.h2 
              initial={isMobile ? false : { opacity: 0, y: 20 }}
              whileInView={isMobile ? { opacity: 1, y: 0 } : { opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-4xl md:text-6xl font-serif text-[#0f172a] font-bold mb-6"
            >
              Como Funciona
            </motion.h2>
            <motion.p 
              initial={isMobile ? false : { opacity: 0, y: 20 }}
              whileInView={isMobile ? { opacity: 1, y: 0 } : { opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-slate-600 text-lg max-w-2xl mx-auto"
            >
              Um processo simples e transparente para garantir a sua segurança.
            </motion.p>
          </div>

          <div className="space-y-24 relative py-12">
            {/* Timeline Line */}
            <div className="absolute left-1/2 top-0 bottom-0 w-0.5 border-l-4 border-dashed border-slate-400 hidden md:block transform -translate-x-1/2"></div>

            {/* Step 1 */}
            <div className="flex flex-col md:flex-row items-center justify-between gap-8 md:gap-0 relative">
              {/* Left Side: Icon */}
              <div className="w-full md:w-1/2 flex justify-center md:justify-end md:pr-16">
                <div className="w-24 h-24 md:w-32 md:h-32 flex items-center justify-center text-[#0f172a]">
                  <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24"><path fill="currentColor" d="M19.95 21q-3.125 0-6.187-1.35T8.2 15.8t-3.85-5.55T3 4.05V3h5.9l.925 5.025l-2.85 2.875q.55.975 1.225 1.85t1.45 1.625q.725.725 1.588 1.388T13.1 17l2.9-2.9l5 1.025V21z"/></svg>
                </div>
              </div>
              
              {/* Center Node */}
              <div className="hidden md:flex w-12 h-12 rounded-full bg-[#0f172a] text-white items-center justify-center font-bold text-xl shadow-lg z-10 border-4 border-white">
                1
              </div>

              {/* Right Side: Text */}
              <div className="w-full md:w-1/2 flex justify-center md:justify-start md:pl-16 text-center md:text-left">
                <div>
                  <h3 className="text-2xl font-bold text-[#0f172a] mb-3">Contato</h3>
                  <p className="text-slate-600 text-lg">Você nos chama ou preenche o formulário</p>
                </div>
              </div>
            </div>

            {/* Step 2 */}
            <div className="flex flex-col md:flex-row-reverse items-center justify-between gap-8 md:gap-0 relative">
              {/* Right Side: Icon */}
              <div className="w-full md:w-1/2 flex justify-center md:justify-start md:pl-16">
                <div className="w-24 h-24 md:w-32 md:h-32 flex items-center justify-center text-[#0f172a]">
                  <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24"><path fill="currentColor" d="M4 19v-9q0-.475.213-.9t.587-.7l6-4.5q.525-.4 1.2-.4t1.2.4l6 4.5q.375.275.588.7T20 10v9q0 .825-.588 1.413T18 21h-3q-.425 0-.712-.288T14 20v-5q0-.425-.288-.712T13 14h-2q-.425 0-.712.288T10 15v5q0 .425-.288.713T9 21H6q-.825 0-1.412-.587T4 19"/></svg>
                </div>
              </div>
              
              {/* Center Node */}
              <div className="hidden md:flex w-12 h-12 rounded-full bg-[#0f172a] text-white items-center justify-center font-bold text-xl shadow-lg z-10 border-4 border-white">
                2
              </div>

              {/* Left Side: Text */}
              <div className="w-full md:w-1/2 flex justify-center md:justify-end md:pr-16 text-center md:text-right">
                <div>
                  <h3 className="text-2xl font-bold text-[#0f172a] mb-3">Visita técnica</h3>
                  <p className="text-slate-600 text-lg">Avaliamos o local gratuitamente</p>
                </div>
              </div>
            </div>

            {/* Step 3 */}
            <div className="flex flex-col md:flex-row items-center justify-between gap-8 md:gap-0 relative">
              {/* Left Side: Icon */}
              <div className="w-full md:w-1/2 flex justify-center md:justify-end md:pr-16">
                <div className="w-24 h-24 md:w-32 md:h-32 flex items-center justify-center text-[#0f172a]">
                  <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 1024 1024"><path fill="currentColor" d="M865.3 244.7c-.3-.3-61.1 59.8-182.1 180.6l-84.9-84.9l180.9-180.9c-95.2-57.3-217.5-42.6-296.8 36.7A244.42 244.42 0 0 0 419 432l1.8 6.7l-283.5 283.4c-6.2 6.2-6.2 16.4 0 22.6l141.4 141.4c6.2 6.2 16.4 6.2 22.6 0l283.3-283.3l6.7 1.8c83.7 22.3 173.6-.9 236-63.3c79.4-79.3 94.1-201.6 38-296.6"/></svg>
                </div>
              </div>
              
              {/* Center Node */}
              <div className="hidden md:flex w-12 h-12 rounded-full bg-[#0f172a] text-white items-center justify-center font-bold text-xl shadow-lg z-10 border-4 border-white">
                3
              </div>

              {/* Right Side: Text */}
              <div className="w-full md:w-1/2 flex justify-center md:justify-start md:pl-16 text-center md:text-left">
                <div>
                  <h3 className="text-2xl font-bold text-[#0f172a] mb-3">Instalação</h3>
                  <p className="text-slate-600 text-lg">Técnicos certificados instalam tudo</p>
                </div>
              </div>
            </div>

            {/* Step 4 */}
            <div 
              className="flex flex-col md:flex-row-reverse items-center justify-between gap-8 md:gap-0 relative"
            >
              {/* Right Side: Icon */}
              <div className="w-full md:w-1/2 flex justify-center md:justify-start md:pl-16">
                <div className="w-32 h-32 flex items-center justify-center text-[#0f172a]">
                  <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24"><path d="M17.25 18H6.75V4h10.5M14 21h-4v-1h4m2-19H8a3 3 0 0 0-3 3v16a3 3 0 0 0 3 3h8a3 3 0 0 0 3-3V4a3 3 0 0 0-3-3z" fill="currentColor"/></svg>
                </div>
              </div>
              
              {/* Center Node */}
              <div className="hidden md:flex absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-[#0f172a] text-white items-center justify-center font-bold text-xl shadow-lg z-10 border-4 border-white">
                4
              </div>

              {/* Left Side: Text */}
              <div className="w-full md:w-1/2 flex justify-center md:justify-end md:pr-16 text-center md:text-right">
                <div>
                  <h3 className="text-2xl font-bold text-[#0f172a] mb-3">Acesso</h3>
                  <p className="text-slate-600 text-lg">Você monitora de onde estiver</p>
                </div>
              </div>
            </div>

          </div>
          <div className="text-center mt-16">
            <button onClick={(e) => handleNavClick(e, 'contato')} className="py-4 px-[40px] rounded-full bg-[#fcd34d] border-none text-center cursor-pointer transition-all duration-400 hover:shadow-[7px_5px_56px_-14px_#f59e0b] active:scale-[0.97] active:shadow-[7px_5px_56px_-10px_#f59e0b] text-[#1a1a1a] font-bold uppercase tracking-wider text-xs">
              <strong>Solicitar Orçamento</strong>
            </button>
          </div>
        </div>
      </section>

      <TestimonialsSection isMobile={isMobile} />
      <FAQSection />
      <FinalCTASection />
      <Footer />

    </div>
  );
}

const FinalCTASection = () => {
  return (
    <section id="contato" className="py-20 bg-[#0f172a] text-white relative">
      <img
        src="https://i.postimg.cc/Sx1b9CYd/imagem-de-fundo-CTA.jpg"
        alt="Background CTA"
        className="absolute inset-0 w-full h-full object-cover opacity-20"
        referrerPolicy="no-referrer"
      />
      <div className="max-w-7xl mx-auto px-8 grid md:grid-cols-2 gap-12 items-center relative z-10">
        <div>
          <h2 className="text-5xl font-serif font-bold mb-6 leading-tight">Não espere acontecer algo para se proteger</h2>
          <a 
            href="https://wa.me/5500000000000" 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-[#fcd34d] font-bold hover:text-white transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M12.031 6.172c-3.187 0-5.766 2.578-5.766 5.766 0 1.016.281 1.969.75 2.812l-1.031 3.75 3.844-1.031c.844.469 1.797.75 2.812.75 3.188 0 5.766-2.578 5.766-5.766 0-3.188-2.578-5.766-5.766-5.766zm0 10.547c-.89 0-1.734-.234-2.484-.656l-.188-.109-1.969.516.516-1.922-.109-.187c-.422-.75-.656-1.594-.656-2.484 0-2.672 2.156-4.828 4.828-4.828s4.828 2.156 4.828 4.828-2.156 4.828-4.828 4.828zm2.625-3.563c-.14-.07-1.031-.516-1.188-.563-.14-.047-.25-.07-.359.07s-.422.516-.516.625-.188.125-.328.063c-.14-.063-.594-.219-1.125-.688-.422-.375-.703-.828-.781-.969-.078-.14-.008-.219.063-.281.063-.063.14-.156.219-.234.07-.078.094-.14.141-.234.047-.094.023-.188-.016-.266s-.359-.859-.492-1.172c-.125-.305-.258-.266-.359-.266-.094 0-.203-.008-.312-.008s-.281.039-.43.203c-.148.164-.563.547-.563 1.336s.383 1.547.438 1.625.75 1.172 1.813 1.641c.25.109.445.176.598.223.25.078.477.066.656.039.203-.031.625-.258.711-.5.086-.242.086-.453.063-.5-.023-.047-.086-.07-.172-.109z"/></svg>
            Falar no WhatsApp
          </a>
        </div>
        
        <form className="bg-white p-8 rounded-2xl shadow-lg space-y-4">
          <input type="text" placeholder="Nome" className="w-full p-3 rounded-lg border border-slate-300 text-slate-900" />
          <input type="tel" placeholder="Telefone" className="w-full p-3 rounded-lg border border-slate-300 text-slate-900" />
          <input type="text" placeholder="Tipo de imóvel" className="w-full p-3 rounded-lg border border-slate-300 text-slate-900" />
          <textarea placeholder="Mensagem" className="w-full p-3 rounded-lg border border-slate-300 text-slate-900 h-24"></textarea>
          <button className="w-full py-4 rounded-full bg-[#fcd34d] text-[#1a1a1a] font-bold uppercase tracking-wider text-sm hover:bg-[#f59e0b] transition-all">
            Quero meu orçamento grátis
          </button>
        </form>
      </div>
    </section>
  );
};

const FAQSection = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const faqs = [
    { q: "As câmeras funcionam sem internet?", a: "Sim, elas gravam localmente no DVR/NVR, mas a visualização remota exige internet." },
    { q: "Quanto tempo leva a instalação?", a: "Depende do projeto, mas geralmente concluímos em um dia útil." },
    { q: "Posso ver as imagens pelo celular?", a: "Com certeza! Oferecemos acesso via aplicativo em tempo real de qualquer lugar." },
    { q: "Tem mensalidade?", a: "Não cobramos mensalidade. O equipamento é seu." },
    { q: "Qual a garantia dos equipamentos?", a: "Oferecemos 1 ano de garantia contra defeitos de fabricação." },
    { q: "Vocês atendem minha cidade?", a: "Atendemos toda a região metropolitana. Entre em contato para confirmar seu endereço." },
  ];

  return (
    <section className="py-16 bg-slate-50">
      <div className="max-w-7xl mx-auto px-8">
        <h2 className="text-4xl font-serif font-bold text-[#0f172a] mb-12 text-center">Perguntas Frequentes</h2>
        
        {/* Horizontal Accordion */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {faqs.map((faq, index) => (
            <div 
              key={index}
              className={`bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden transition-all duration-300 ${activeIndex === index ? 'ring-2 ring-[#f59e0b]' : ''}`}
            >
              <button 
                className="w-full p-6 text-left font-bold text-[#0f172a] flex justify-between items-center"
                onClick={() => setActiveIndex(activeIndex === index ? null : index)}
              >
                {faq.q}
                <span className="text-[#f59e0b] text-2xl">{activeIndex === index ? '−' : '+'}</span>
              </button>
              <div className={`px-6 pb-6 text-slate-600 transition-all duration-300 ${activeIndex === index ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0 overflow-hidden'}`}>
                {faq.a}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Footer = () => {
  return (
    <footer className="bg-[#0f172a] text-white py-16">
      <div className="max-w-7xl mx-auto px-8 grid md:grid-cols-4 gap-12">
        {/* Logo + Slogan */}
        <div className="col-span-1">
          <img src="https://i.postimg.cc/63vKtq3f/logo-texto.png" alt="Logo" className="h-10 mb-4 brightness-0 invert" />
          <p className="text-sm text-slate-400">Sua segurança, nossa prioridade.</p>
        </div>

        {/* Links */}
        <div className="col-span-1">
          <h4 className="font-bold mb-4">Navegação</h4>
          <ul className="space-y-2 text-sm text-slate-400">
            <li><a href="#inicio" className="hover:text-[#fcd34d] cursor-pointer">Início</a></li>
            <li><a href="#solucoes" className="hover:text-[#fcd34d] cursor-pointer">Soluções</a></li>
            <li><a href="#servicos" className="hover:text-[#fcd34d] cursor-pointer">Serviços</a></li>
            <li><a href="#diferencial" className="hover:text-[#fcd34d] cursor-pointer">Diferencial</a></li>
            <li><a href="#planos" className="hover:text-[#fcd34d] cursor-pointer">Planos</a></li>
            <li><a href="#processo" className="hover:text-[#fcd34d] cursor-pointer">Processo</a></li>
            <li><a href="#contato" className="hover:text-[#fcd34d] cursor-pointer">Contato</a></li>
          </ul>
        </div>

        {/* Contato */}
        <div className="col-span-1">
          <h4 className="font-bold mb-4">Contato</h4>
          <ul className="space-y-2 text-sm text-slate-400">
            <li>CNPJ: 00.000.000/0000-00</li>
            <li>Endereço: Endereço da empresa</li>
            <li>Telefone: +55 (14) 99766-0914</li>
            <li>Email: luisgustavogu2008@gmail.com</li>
          </ul>
        </div>

        {/* Redes Sociais + Selos */}
        <div className="col-span-1">
          <h4 className="font-bold mb-4">Redes Sociais</h4>
          <div className="flex gap-4 mb-8">
            <a href="https://www.instagram.com/luis_gustavo_del_bianco/" target="_blank" rel="noopener noreferrer" className="hover:text-[#fcd34d] cursor-pointer">Instagram</a>
            <a href="https://www.facebook.com/profile.php?id=100088704596772" target="_blank" rel="noopener noreferrer" className="hover:text-[#fcd34d] cursor-pointer">Facebook</a>
            <a href="https://www.linkedin.com/in/luis-gustavo-del-bianco-b7ba233a7/" target="_blank" rel="noopener noreferrer" className="hover:text-[#fcd34d] cursor-pointer">LinkedIn</a>
          </div>
          <h4 className="font-bold mb-4">Selos</h4>
          <div className="flex gap-4">
            <div className="w-16 h-16 bg-white rounded-lg flex items-center justify-center text-black text-[10px] text-center">Google</div>
            <div className="w-16 h-16 bg-white rounded-lg flex items-center justify-center text-black text-[10px] text-center">Cert</div>
          </div>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-8 mt-12 pt-8 border-t border-slate-700 text-center text-sm text-slate-400">
        © 2025 ClariView — Todos os direitos reservados
      </div>
    </footer>
  );
};

