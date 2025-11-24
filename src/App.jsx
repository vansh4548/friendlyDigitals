import React, {
  useState,
  useEffect,
  useLayoutEffect,
  useRef,
  useCallback,
} from "react";
import Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  BrowserRouter,
  Routes,
  Route,
  Link,
  useLocation,
  useNavigate,
} from "react-router-dom";
import logo from "./assets/loogo.png";
import "./app.css";
import {
  Code,
  BarChart3,
  Calculator,
  Search,
  Globe,
  Settings,
  Menu,
  X,
  ArrowRight,
  CheckCircle,
  Mail,
  Phone,
  MapPin,
  Facebook,
  Twitter,
  Linkedin,
  ArrowUpRight,
  ExternalLink,
  ChevronLeft,
  Filter,
  LayoutGrid,
  Users,
  Target,
  Award,
  Shield,
  Zap,
  Clock,
  HeartHandshake,
  Lightbulb,
  Rocket,
  TrendingUp,
  Database,
  Cloud,
  Smartphone,
  Server,
  Lock,
  BarChart,
  PieChart,
  LineChart,
  Calendar,
  MessageCircle,
  UserCheck,
  HeadphonesIcon,
} from "lucide-react";

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

// --- Helper: Scroll To Anchor Handler ---
const ScrollToAnchor = () => {
  const location = useLocation();
  const lastHash = useRef("");

  useEffect(() => {
    if (location.hash) {
      lastHash.current = location.hash.slice(1); // remove '#'
    }

    if (lastHash.current && document.getElementById(lastHash.current)) {
      setTimeout(() => {
        const element = document.getElementById(lastHash.current);
        if (element) {
          element.scrollIntoView({ behavior: "smooth", block: "start" });
          lastHash.current = "";
        }
      }, 100);
    } else if (!location.hash) {
      window.scrollTo(0, 0);
    }
  }, [location]);

  return null;
};

// --- SplitText Component ---
const SplitText = ({
  text,
  className = "",
  delay = 0,
  duration = 0.5,
  ease = "back.out(1.2)",
  from = { opacity: 0, y: 30 },
  to = { opacity: 1, y: 0 },
  textAlign = "left",
  splitBy = "chars",
  onLetterAnimationComplete,
}) => {
  const containerRef = useRef(null);

  useLayoutEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      const targets =
        splitBy === "none"
          ? containerRef.current
          : containerRef.current.querySelectorAll(".split-item");

      gsap.set(targets, { ...from });

      gsap.to(targets, {
        ...to,
        duration,
        ease,
        stagger: splitBy === "none" ? 0 : 0.02,
        delay: delay / 1000,
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 100%",
          once: true,
        },
        onComplete: onLetterAnimationComplete,
      });
    }, containerRef);

    return () => ctx.revert();
  }, [
    text,
    delay,
    duration,
    ease,
    splitBy,
    JSON.stringify(from),
    JSON.stringify(to),
    onLetterAnimationComplete,
  ]);

  const renderContent = () => {
    if (splitBy === "none") return text;
    if (splitBy === "words") {
      return text.split(" ").map((word, index) => (
        <span
          key={index}
          className="split-item inline-block mr-2"
          style={{ whiteSpace: "nowrap" }}
        >
          {word}
        </span>
      ));
    }
    return text.split("").map((char, index) => (
      <span
        key={index}
        className="split-item inline-block"
        style={{ whiteSpace: "pre" }}
      >
        {char}
      </span>
    ));
  };

  return (
    <div
      ref={containerRef}
      className={`${className}`}
      style={{ textAlign, display: "block", position: "relative" }}
    >
      {renderContent()}
    </div>
  );
};

// --- CircularText Component ---
const CircularText = ({
  text,
  spinDuration = 20,
  onHover = "speedUp",
  className = "",
}) => {
  const letters = Array.from(text);
  const containerRef = useRef(null);
  const requestRef = useRef();
  const angleRef = useRef(0);
  const speedRef = useRef(0);
  const targetSpeedRef = useRef(0);
  const baseSpeed = 360 / (spinDuration * 60);

  useEffect(() => {
    targetSpeedRef.current = baseSpeed;
    speedRef.current = baseSpeed;
  }, [baseSpeed]);

  const animate = () => {
    speedRef.current += (targetSpeedRef.current - speedRef.current) * 0.05;
    angleRef.current = (angleRef.current + speedRef.current) % 360;
    if (containerRef.current)
      containerRef.current.style.transform = `rotate(${angleRef.current}deg)`;
    requestRef.current = requestAnimationFrame(animate);
  };

  useEffect(() => {
    requestRef.current = requestAnimationFrame(animate);
    return () => {
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
    };
  }, []);

  const handleMouseEnter = () => {
    if (onHover === "slowDown") targetSpeedRef.current = baseSpeed / 4;
    else if (onHover === "speedUp") targetSpeedRef.current = baseSpeed * 5;
    else if (onHover === "pause") targetSpeedRef.current = 0;
    else if (onHover === "goBonkers") targetSpeedRef.current = baseSpeed * 20;
  };

  return (
    <div
      ref={containerRef}
      className={`m-0 mx-auto rounded-full w-[200px] h-[200px] relative text-white font-black text-center cursor-pointer origin-center ${className}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={() => {
        targetSpeedRef.current = baseSpeed;
      }}
    >
      {letters.map((letter, i) => {
        const rotationDeg = (360 / letters.length) * i;
        const transform = `rotateZ(${rotationDeg}deg) translateY(-85px)`;
        return (
          <span
            key={i}
            className="absolute inline-block inset-0 text-xl font-bold h-full flex items-center justify-center pt-2 select-none"
            style={{ transform, WebkitTransform: transform }}
          >
            {letter}
          </span>
        );
      })}
    </div>
  );
};

// --- ScrollStack Components ---
const ScrollStackItem = ({
  children,
  itemClassName = "",
  bgClass = "bg-white",
}) => (
  <div
    className={`scroll-stack-card relative w-full md:w-2/3 mx-auto min-h-[250px] my-2 p-6 md:p-10 rounded-[30px] shadow-xl ${bgClass} box-border origin-top will-change-transform ${itemClassName}`.trim()}
    style={{ backfaceVisibility: "hidden", transformStyle: "preserve-3d" }}
  >
    {children}
  </div>
);

const ScrollStack = ({
  children,
  className = "",
  itemDistance = 40,
  itemScale = 0.04,
  itemStackDistance = 20,
  stackPosition = "15%",
  scaleEndPosition = "5%",
  baseScale = 0.9,
  useWindowScroll = false,
  onStackComplete,
}) => {
  const scrollerRef = useRef(null);
  const stackCompletedRef = useRef(false);
  const animationFrameRef = useRef(null);
  const lenisRef = useRef(null);
  const cardsRef = useRef([]);
  const lastTransformsRef = useRef(new Map());
  const elementTopsRef = useRef(new Map());
  const isUpdatingRef = useRef(false);

  const parsePercentage = useCallback((value, containerHeight) => {
    if (typeof value === "string" && value.includes("%"))
      return (parseFloat(value) / 100) * containerHeight;
    return parseFloat(value);
  }, []);

  const getScrollData = useCallback(() => {
    if (useWindowScroll)
      return { scrollTop: window.scrollY, containerHeight: window.innerHeight };
    const scroller = scrollerRef.current;
    return {
      scrollTop: scroller ? scroller.scrollTop : 0,
      containerHeight: scroller ? scroller.clientHeight : 0,
    };
  }, [useWindowScroll]);

  const measureElements = useCallback(() => {
    if (!cardsRef.current.length) return;
    const { scrollTop } = getScrollData();
    cardsRef.current.forEach((card, i) => {
      if (card) {
        const rect = card.getBoundingClientRect();
        const top = useWindowScroll
          ? rect.top + window.scrollY
          : card.offsetTop;
        elementTopsRef.current.set(`card-${i}`, top);
      }
    });
    const endElement = useWindowScroll
      ? document.querySelector(".scroll-stack-end")
      : scrollerRef.current?.querySelector(".scroll-stack-end");
    if (endElement) {
      const rect = endElement.getBoundingClientRect();
      const top = useWindowScroll
        ? rect.top + window.scrollY
        : endElement.offsetTop;
      elementTopsRef.current.set("end", top);
    }
  }, [useWindowScroll, getScrollData]);

  const calculateProgress = useCallback((scrollTop, start, end) => {
    if (scrollTop < start) return 0;
    if (scrollTop > end) return 1;
    return (scrollTop - start) / (end - start);
  }, []);

  const updateCardTransforms = useCallback(() => {
    if (!cardsRef.current.length || isUpdatingRef.current) return;
    isUpdatingRef.current = true;
    const { scrollTop, containerHeight } = getScrollData();
    const stackPositionPx = parsePercentage(stackPosition, containerHeight);
    const scaleEndPositionPx = parsePercentage(
      scaleEndPosition,
      containerHeight
    );
    const endElementTop = elementTopsRef.current.get("end") || 0;

    cardsRef.current.forEach((card, i) => {
      if (!card) return;
      const cardTop = elementTopsRef.current.get(`card-${i}`) || 0;
      const triggerStart = cardTop - stackPositionPx - itemStackDistance * i;
      const triggerEnd = cardTop - scaleEndPositionPx;
      const pinStart = cardTop - stackPositionPx - itemStackDistance * i;
      const pinEnd = endElementTop - containerHeight / 2;
      const scaleProgress = calculateProgress(
        scrollTop,
        triggerStart,
        triggerEnd
      );
      const targetScale = baseScale + i * itemScale;
      const scale = 1 - scaleProgress * (1 - targetScale);
      let translateY = 0;
      const isPinned = scrollTop >= pinStart && scrollTop <= pinEnd;

      if (isPinned)
        translateY =
          scrollTop - cardTop + stackPositionPx + itemStackDistance * i;
      else if (scrollTop > pinEnd)
        translateY = pinEnd - cardTop + stackPositionPx + itemStackDistance * i;

      const newTransform = {
        translateY: Math.round(translateY * 100) / 100,
        scale: Math.round(scale * 1000) / 1000,
      };
      const lastTransform = lastTransformsRef.current.get(i);
      const hasChanged =
        !lastTransform ||
        Math.abs(lastTransform.translateY - newTransform.translateY) > 0.1 ||
        Math.abs(lastTransform.scale - newTransform.scale) > 0.001;

      if (hasChanged) {
        card.style.transform = `translate3d(0, ${newTransform.translateY}px, 0) scale(${newTransform.scale})`;
        lastTransformsRef.current.set(i, newTransform);
      }
      if (i === cardsRef.current.length - 1) {
        const isInView = scrollTop >= pinStart && scrollTop <= pinEnd;
        if (isInView && !stackCompletedRef.current) {
          stackCompletedRef.current = true;
          onStackComplete?.();
        } else if (!isInView && stackCompletedRef.current)
          stackCompletedRef.current = false;
      }
    });
    isUpdatingRef.current = false;
  }, [
    itemScale,
    itemStackDistance,
    stackPosition,
    scaleEndPosition,
    baseScale,
    onStackComplete,
    calculateProgress,
    parsePercentage,
    getScrollData,
  ]);

  const handleScroll = useCallback(() => {
    updateCardTransforms();
  }, [updateCardTransforms]);

  const setupLenis = useCallback(() => {
    const config = {
      duration: 0.8,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      touchMultiplier: 2,
      infinite: false,
      wheelMultiplier: 1,
      lerp: 0.1,
    };
    if (useWindowScroll) {
      const lenis = new Lenis(config);
      lenis.on("scroll", handleScroll);
      const raf = (time) => {
        lenis.raf(time);
        animationFrameRef.current = requestAnimationFrame(raf);
      };
      animationFrameRef.current = requestAnimationFrame(raf);
      lenisRef.current = lenis;
      return lenis;
    } else {
      const scroller = scrollerRef.current;
      if (!scroller) return;
      const lenis = new Lenis({
        ...config,
        wrapper: scroller,
        content: scroller.querySelector(".scroll-stack-inner"),
      });
      lenis.on("scroll", handleScroll);
      const raf = (time) => {
        lenis.raf(time);
        animationFrameRef.current = requestAnimationFrame(raf);
      };
      animationFrameRef.current = requestAnimationFrame(raf);
      lenisRef.current = lenis;
      return lenis;
    }
  }, [handleScroll, useWindowScroll]);

  useLayoutEffect(() => {
    const scroller = scrollerRef.current;
    if (!useWindowScroll && !scroller) return;
    const cards = Array.from(
      useWindowScroll
        ? document.querySelectorAll(".scroll-stack-card")
        : scroller.querySelectorAll(".scroll-stack-card")
    );
    cardsRef.current = cards;
    cards.forEach((card, i) => {
      if (i < cards.length - 1) card.style.marginBottom = `${itemDistance}px`;
      card.style.willChange = "transform";
      card.style.transformOrigin = "top center";
      card.style.transform = "translate3d(0,0,0)";
    });
    measureElements();
    setupLenis();
    updateCardTransforms();
    const handleResize = () => {
      measureElements();
      updateCardTransforms();
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
      if (animationFrameRef.current)
        cancelAnimationFrame(animationFrameRef.current);
      if (lenisRef.current) lenisRef.current.destroy();
      cardsRef.current = [];
      lastTransformsRef.current.clear();
      elementTopsRef.current.clear();
    };
  }, [
    itemDistance,
    useWindowScroll,
    setupLenis,
    updateCardTransforms,
    measureElements,
  ]);

  const containerClassName = useWindowScroll
    ? `relative w-full ${className}`.trim()
    : `relative w-full h-full overflow-y-auto overflow-x-visible ${className}`.trim();

  return (
    <div className={containerClassName} ref={scrollerRef}>
      <div className="scroll-stack-inner pt-20 px-4 md:px-20 pb-[20rem] min-h-screen">
        {children}
        <div className="scroll-stack-end w-full h-px" />
      </div>
    </div>
  );
};

// --- Page Components ---

const HomePage = () => {
  const services = [
    {
      title: "Custom Software",
      description:
        "Enterprise-grade web and mobile applications engineered for scalability.",
      icon: <Code size={40} className="text-white" />,
      color: "bg-blue-600",
      cardColor: "bg-gradient-to-br from-blue-900 to-blue-800",
      textColor: "text-white",
    },
    {
      title: "BI & Reporting",
      description:
        "Advanced analytics dashboards that transform raw data into strategic tools.",
      icon: <BarChart3 size={40} className="text-white" />,
      color: "bg-indigo-600",
      cardColor: "bg-gradient-to-br from-indigo-900 to-indigo-800",
      textColor: "text-white",
    },
    {
      title: "Digital Accounting",
      description:
        "Automated financial workflows and cloud integration to streamline bookkeeping.",
      icon: <Calculator size={40} className="text-white" />,
      color: "bg-slate-600",
      cardColor: "bg-gradient-to-br from-slate-800 to-slate-900",
      textColor: "text-white",
    },
    {
      title: "SEO Visibility",
      description:
        "Data-driven SEO strategies designed to maximize organic reach.",
      icon: <Search size={40} className="text-white" />,
      color: "bg-sky-600",
      cardColor: "bg-gradient-to-br from-sky-900 to-blue-900",
      textColor: "text-white",
    },
    {
      title: "Web Management",
      description:
        "Proactive maintenance, security monitoring, and performance optimization.",
      icon: <Globe size={40} className="text-white" />,
      color: "bg-teal-600",
      cardColor: "bg-gradient-to-br from-teal-900 to-teal-800",
      textColor: "text-white",
    },
    {
      title: "IT Consulting",
      description:
        "Holistic digital transformation strategies aligned with your long-term objectives.",
      icon: <Settings size={40} className="text-white" />,
      color: "bg-slate-800",
      cardColor: "bg-gradient-to-br from-gray-900 to-black",
      textColor: "text-white",
    },
  ];

  return (
    <>
      {/* Hero Section */}
      <section
        id="home"
        className="relative pt-32 pb-20 md:pt-48 md:pb-32 overflow-hidden min-h-[90vh] flex items-center"
      >
        <div className="absolute inset-0 w-full h-full">
          <div className="absolute inset-0 bg-slate-900/70 z-10"></div>
          <video
            className="w-full h-full object-cover"
            autoPlay
            loop
            muted
            playsInline
            poster="https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2072&auto=format&fit=crop"
          >
            <source
              src="https://assets.mixkit.co/videos/preview/mixkit-digital-animation-of-blue-circuit-board-98-large.mp4"
              type="video/mp4"
            />
          </video>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20 w-full">
          <div className="flex flex-col md:flex-row items-center justify-between gap-12">
            <div className="max-w-3xl">
              {/* Reverted Simple Badge */}
              <div className="inline-block px-4 py-1.5 mb-6 bg-blue-600/30 backdrop-blur-sm text-blue-100 border border-blue-400/30 rounded-full text-xs font-bold tracking-widest uppercase">
                Digital Transformation Partner
              </div>

              <div className="mb-8">
                <SplitText
                  text="Friendly Solutions."
                  className="text-4xl sm:text-5xl md:text-7xl font-extrabold text-white leading-tight tracking-tight drop-shadow-lg"
                  delay={0}
                  duration={0.5}
                  ease="back.out(1.2)"
                  splitBy="chars"
                />
                <SplitText
                  text="Professional Results."
                  className="text-4xl sm:text-5xl md:text-7xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300 leading-tight tracking-tight drop-shadow-lg pb-2"
                  delay={200}
                  duration={0.5}
                  ease="back.out(1.2)"
                  splitBy="none"
                />
              </div>
              <p className="text-xl text-slate-200 mb-10 max-w-2xl leading-relaxed drop-shadow-md">
                We streamline your business operations through expert software
                development, precise financial reporting, and strategic digital
                management.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  to="/contact"
                  className="px-8 py-4 bg-blue-600 text-white font-bold rounded hover:bg-blue-700 transition shadow-lg shadow-blue-600/30 flex items-center justify-center group"
                >
                  Start Your Project{" "}
                  <ArrowRight
                    className="ml-2 group-hover:translate-x-1 transition-transform"
                    size={20}
                  />
                </Link>
                <Link
                  to="/expertise"
                  className="px-8 py-4 bg-white/10 backdrop-blur-md text-white border border-white/30 font-bold rounded hover:bg-white/20 hover:border-white/50 transition flex items-center justify-center"
                >
                  Our Services
                </Link>
              </div>
            </div>
            <div className="hidden md:block">
              <CircularText
                text="FRIENDLY*DIGITALS*SERVICES*"
                spinDuration={25}
                className="text-blue-100 opacity-90 hover:opacity-100 hover:text-white transition-opacity"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 text-center">
          <h2 className="text-blue-600 font-bold tracking-widest uppercase text-sm mb-3">
            Our Expertise
          </h2>
          <h3 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
            Integrated Digital Services
          </h3>
          <p className="text-slate-600 text-lg max-w-2xl mx-auto mb-10">
            Scroll down to explore our full spectrum of technical services
            designed to modernize your infrastructure.
          </p>
        </div>
        <ScrollStack
          useWindowScroll={true}
          itemDistance={40}
          stackPosition="15%"
          itemStackDistance={20}
        >
          {services.map((service, index) => (
            <ScrollStackItem key={index} bgClass={service.cardColor}>
              <div className="flex flex-col md:flex-row h-full items-center gap-6 text-white">
                <div
                  className={`p-5 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20 shadow-xl`}
                >
                  {service.icon}
                </div>
                <div className="flex-1 text-center md:text-left">
                  <h3 className="text-2xl font-bold mb-3">{service.title}</h3>
                  <p className="text-base text-blue-100 leading-relaxed mb-4">
                    {service.description}
                  </p>
                  <Link
                    to="/contact"
                    className="inline-flex items-center text-white font-bold hover:text-blue-200 transition group text-sm"
                  >
                    Get Started{" "}
                    <ArrowRight
                      size={16}
                      className="ml-2 group-hover:translate-x-1 transition-transform"
                    />
                  </Link>
                </div>
                <div className="hidden lg:block text-6xl font-bold opacity-10 select-none">
                  0{index + 1}
                </div>
              </div>
            </ScrollStackItem>
          ))}
        </ScrollStack>
      </section>

      {/* Metrics Section */}
      <section
        id="about"
        className="py-24 bg-slate-900 text-white relative overflow-hidden"
      >
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: "radial-gradient(#4b5563 1px, transparent 1px)",
            backgroundSize: "32px 32px",
          }}
        ></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-blue-400 font-bold tracking-widest uppercase text-sm mb-3">
                Why FriendlyDigitals
              </h2>
              <h3 className="text-3xl md:text-4xl font-bold mb-6 text-white">
                Engineering Trust Through Transparency & Excellence
              </h3>
              <p className="text-slate-300 text-lg mb-8 leading-relaxed">
                We bridge the gap between complex technology and user-friendly
                solutions. Our approach combines technical rigor with a deep
                understanding of business processes.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {[
                  "Enterprise-Grade Security",
                  "Scalable Architecture",
                  "Data-Driven Decisions",
                  "24/7 Dedicated Support",
                ].map((item, idx) => (
                  <div key={idx} className="flex items-start">
                    <CheckCircle
                      className="text-blue-500 mr-3 mt-1 flex-shrink-0"
                      size={20}
                    />
                    <span className="text-slate-200 font-medium">{item}</span>
                  </div>
                ))}
              </div>
              <Link
                to="/why-us"
                className="inline-flex items-center mt-8 px-6 py-3 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 transition shadow-lg"
              >
                Learn More About Us
                <ArrowRight className="ml-2" size={20} />
              </Link>
            </div>
            <div className="bg-slate-800 p-8 md:p-12 rounded border border-slate-700 shadow-2xl">
              <div className="grid grid-cols-2 gap-8 text-center">
                <div className="border-r border-b border-slate-700 p-4">
                  <h4 className="text-4xl font-bold text-white mb-2">100%</h4>
                  <p className="text-slate-400 text-sm uppercase tracking-wider">
                    Project Success
                  </p>
                </div>
                <div className="border-b border-slate-700 p-4">
                  <h4 className="text-4xl font-bold text-white mb-2">50+</h4>
                  <p className="text-slate-400 text-sm uppercase tracking-wider">
                    Active Clients
                  </p>
                </div>
                <div className="border-r border-slate-700 p-4">
                  <h4 className="text-4xl font-bold text-white mb-2">24h</h4>
                  <p className="text-slate-400 text-sm uppercase tracking-wider">
                    Response Time
                  </p>
                </div>
                <div className="p-4">
                  <h4 className="text-4xl font-bold text-white mb-2">10yr</h4>
                  <p className="text-slate-400 text-sm uppercase tracking-wider">
                    Combined Exp.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-indigo-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Ready to Transform Your Business?
          </h2>
          <p className="text-blue-100 text-lg mb-8 max-w-2xl mx-auto">
            Let's discuss how our digital solutions can drive your success
            forward.
          </p>
          <Link
            to="/contact"
            className="inline-flex items-center bg-white text-blue-700 px-8 py-4 rounded-lg font-bold hover:bg-blue-50 transition-colors shadow-lg"
          >
            Get In Touch
            <ArrowRight className="ml-2" size={20} />
          </Link>
        </div>
      </section>
    </>
  );
};

const ProductsPage = () => {
  // Products Data
  const products = [
    {
      title: "Nexus E-Commerce",
      description:
        "A scalable, conversion-optimized online store template with integrated payment gateways.",
      image:
        "https://images.unsplash.com/photo-1523474253046-8cd2748b5fd2?auto=format&fit=crop&q=80&w=800",
      tag: "E-Commerce",
      link: "#",
    },
    {
      title: "Zenith Portfolio",
      description:
        "Minimalist portfolio for creatives to showcase work with stunning typography.",
      image:
        "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&q=80&w=800",
      tag: "Portfolio",
      link: "#",
    },
    {
      title: "Alpha Dashboard",
      description:
        "Comprehensive SaaS dashboard for monitoring analytics and user data in real-time.",
      image:
        "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=800",
      tag: "SaaS",
      link: "#",
    },
    {
      title: "EstatePro Portal",
      description:
        "Real estate listing platform with advanced search, filtering, and map integration.",
      image:
        "https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&q=80&w=800",
      tag: "Real Estate",
      link: "#",
    },
    {
      title: "LearnX LMS",
      description:
        "Learning Management System for online courses, quizzes, and student tracking.",
      image:
        "https://images.unsplash.com/photo-1501504905252-473c47e087f8?auto=format&fit=crop&q=80&w=800",
      tag: "Education",
      link: "#",
    },
    {
      title: "BookIt Now",
      description:
        "Appointment scheduling and booking system for service-based businesses.",
      image:
        "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&q=80&w=800",
      tag: "Booking",
      link: "#",
    },
    {
      title: "SocialConnect",
      description:
        "A social networking app template with feed, chat, and profile customization.",
      image:
        "https://images.unsplash.com/photo-1611162617474-5b21e879e113?auto=format&fit=crop&q=80&w=800",
      tag: "Social Media",
      link: "#",
    },
    {
      title: "FinTrack Dashboard",
      description:
        "Financial technology dashboard for personal finance and investment tracking.",
      image:
        "https://images.unsplash.com/photo-1556742049-0cfed4f7a07d?auto=format&fit=crop&q=80&w=800",
      tag: "FinTech",
      link: "#",
    },
  ];

  const [activeCategory, setActiveCategory] = useState("All");
  const categories = ["All", ...new Set(products.map((p) => p.tag))];
  const filteredProducts =
    activeCategory === "All"
      ? products
      : products.filter((p) => p.tag === activeCategory);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <section className="bg-slate-50 min-h-screen">
      {/* Products Hero */}
      <div className="bg-slate-900 pt-40 pb-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-blue-900 opacity-50"></div>
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: "radial-gradient(#ffffff 1px, transparent 1px)",
            backgroundSize: "32px 32px",
          }}
        ></div>

        <div className="max-w-7xl mx-auto relative z-10 text-center">
          <h2 className="text-blue-400 font-bold tracking-widest uppercase text-sm mb-4">
            The Marketplace
          </h2>
          <h3 className="text-4xl md:text-6xl font-extrabold text-white mb-6 tracking-tight">
            Premium Digital Solutions
          </h3>
          <p className="text-slate-300 text-lg md:text-xl max-w-2xl mx-auto">
            Accelerate your business with our production-ready templates and
            powerful digital products.
          </p>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="sticky top-20 z-30 bg-white/80 backdrop-blur-md border-b border-slate-200 py-4 transition-all duration-300 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 overflow-x-auto no-scrollbar pb-2 md:pb-0 md:justify-center">
            <span className="text-slate-400 mr-2 hidden md:block">
              <Filter size={16} />
            </span>
            {categories.map((category, idx) => (
              <button
                key={idx}
                onClick={() => setActiveCategory(category)}
                className={`px-5 py-2 rounded-full text-sm font-semibold transition-all whitespace-nowrap ${
                  activeCategory === category
                    ? "bg-blue-600 text-white shadow-md shadow-blue-200"
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Product Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProducts.map((product, index) => (
            <div
              key={index}
              className="group bg-white rounded-2xl border border-slate-200 overflow-hidden hover:shadow-xl hover:shadow-slate-200/60 transition-all duration-300 flex flex-col h-full transform hover:-translate-y-1"
            >
              {/* Image Area */}
              <div className="relative h-64 overflow-hidden bg-slate-100">
                <div className="absolute inset-0 bg-slate-900/0 group-hover:bg-slate-900/10 transition-colors z-10 duration-300"></div>
                <img
                  src={product.image}
                  alt={product.title}
                  className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                />
                {/* Floating Badge */}
                <div className="absolute top-4 left-4 z-20">
                  <span className="inline-flex items-center gap-1 px-3 py-1 bg-white/95 backdrop-blur text-blue-700 text-xs font-bold rounded-full shadow-sm border border-blue-100">
                    <LayoutGrid size={12} />
                    {product.tag}
                  </span>
                </div>
              </div>

              {/* Content Area */}
              <div className="p-8 flex flex-col flex-grow">
                <div className="flex justify-between items-start mb-3">
                  <h4 className="text-xl font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                    {product.title}
                  </h4>
                </div>

                <p className="text-slate-600 text-sm leading-relaxed mb-8 line-clamp-3 flex-grow">
                  {product.description}
                </p>

                <a
                  href={product.link}
                  className="mt-auto w-full py-3 rounded-lg border border-slate-200 text-slate-700 font-semibold text-sm hover:bg-blue-600 hover:text-white hover:border-transparent transition-all flex items-center justify-center group/btn"
                >
                  Explore Template
                  <ArrowRight
                    size={16}
                    className="ml-2 group-hover/btn:translate-x-1 transition-transform"
                  />
                </a>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-20 bg-gradient-to-r from-blue-600 to-indigo-700 rounded-3xl p-12 text-center text-white shadow-2xl shadow-blue-900/20">
          <h3 className="text-3xl md:text-4xl font-bold mb-4">
            Need a Custom Solution?
          </h3>
          <p className="text-blue-100 mb-8 max-w-2xl mx-auto text-lg">
            Can't find what you're looking for? We specialize in building custom
            software tailored to your specific needs.
          </p>
          <Link
            to="/contact"
            className="inline-flex items-center bg-white text-blue-700 px-8 py-4 rounded-full font-bold hover:bg-blue-50 transition-colors shadow-lg"
          >
            Contact Sales Team
          </Link>
        </div>
      </div>
    </section>
  );
};

// --- New Professional Pages ---

const ExpertisePage = () => {
  const expertiseAreas = [
    {
      icon: <Code className="text-blue-600" size={48} />,
      title: "Custom Software Development",
      description:
        "Tailored solutions built with cutting-edge technologies to solve your unique business challenges.",
      features: [
        "Web Applications",
        "Mobile Apps",
        "Enterprise Systems",
        "API Integration",
      ],
      color: "blue",
    },
    {
      icon: <BarChart3 className="text-indigo-600" size={48} />,
      title: "Business Intelligence & Analytics",
      description:
        "Transform raw data into actionable insights with powerful dashboards and reporting tools.",
      features: [
        "Data Visualization",
        "KPI Tracking",
        "Predictive Analytics",
        "Real-time Reporting",
      ],
      color: "indigo",
    },
    {
      icon: <Calculator className="text-slate-600" size={48} />,
      title: "Digital Accounting Solutions",
      description:
        "Automate financial processes and streamline accounting workflows with cloud-based systems.",
      features: [
        "Cloud Accounting",
        "Automated Bookkeeping",
        "Financial Reporting",
        "Tax Compliance",
      ],
      color: "slate",
    },
    {
      icon: <Search className="text-sky-600" size={48} />,
      title: "SEO & Digital Marketing",
      description:
        "Boost your online visibility and drive qualified traffic with data-driven SEO strategies.",
      features: [
        "Keyword Research",
        "Technical SEO",
        "Content Strategy",
        "Performance Analytics",
      ],
      color: "sky",
    },
    {
      icon: <Globe className="text-teal-600" size={48} />,
      title: "Web Management & Hosting",
      description:
        "Comprehensive website management including security, performance, and maintenance.",
      features: [
        "Website Maintenance",
        "Security Monitoring",
        "Performance Optimization",
        "24/7 Support",
      ],
      color: "teal",
    },
    {
      icon: <Settings className="text-slate-800" size={48} />,
      title: "IT Consulting & Strategy",
      description:
        "Strategic guidance to align technology with your business objectives for maximum impact.",
      features: [
        "Digital Transformation",
        "Technology Audit",
        "System Architecture",
        "Vendor Management",
      ],
      color: "gray",
    },
  ];

  const technologies = [
    { name: "React & Next.js", category: "Frontend" },
    { name: "Node.js & Python", category: "Backend" },
    { name: "PostgreSQL & MongoDB", category: "Database" },
    { name: "AWS & Azure", category: "Cloud" },
    { name: "Docker & Kubernetes", category: "DevOps" },
    { name: "Tableau & Power BI", category: "Analytics" },
    { name: "QuickBooks & Xero", category: "Accounting" },
    { name: "Google Analytics", category: "Marketing" },
  ];

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Hero Section */}
      <section className="pt-32 pb-20 bg-slate-900 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 to-indigo-900/20"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Our <span className="text-blue-400">Expertise</span>
            </h1>
            <p className="text-xl text-slate-300 mb-8 leading-relaxed">
              Deep technical knowledge meets business acumen. We deliver
              solutions that drive real results.
            </p>
          </div>
        </div>
      </section>

      {/* Expertise Grid */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
            {expertiseAreas.map((area, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-slate-100 group hover:transform hover:-translate-y-2"
              >
                <div className="mb-6">{area.icon}</div>
                <h3 className="text-2xl font-bold text-slate-900 mb-4 group-hover:text-blue-600 transition-colors">
                  {area.title}
                </h3>
                <p className="text-slate-600 mb-6 leading-relaxed">
                  {area.description}
                </p>
                <div className="space-y-2">
                  {area.features.map((feature, idx) => (
                    <div key={idx} className="flex items-center text-slate-700">
                      <CheckCircle
                        className="text-green-500 mr-3 flex-shrink-0"
                        size={16}
                      />
                      <span className="text-sm">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Technology Stack */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              Technology Stack
            </h2>
            <p className="text-slate-600 text-lg max-w-2xl mx-auto">
              We work with modern technologies and proven frameworks to deliver
              robust, scalable solutions.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
            {technologies.map((tech, index) => (
              <div
                key={index}
                className="bg-slate-50 rounded-xl p-6 text-center border border-slate-200 hover:border-blue-300 transition-colors group"
              >
                <div className="text-slate-900 font-semibold mb-2 group-hover:text-blue-600 transition-colors">
                  {tech.name}
                </div>
                <div className="text-xs text-slate-500 uppercase tracking-wide">
                  {tech.category}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-indigo-700">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Ready to Leverage Our Expertise?
          </h2>
          <p className="text-blue-100 text-lg mb-8">
            Let's discuss how our technical expertise can solve your business
            challenges.
          </p>
          <Link
            to="/contact"
            className="inline-flex items-center bg-white text-blue-700 px-8 py-4 rounded-lg font-bold hover:bg-blue-50 transition-colors shadow-lg"
          >
            Start a Project
            <ArrowRight className="ml-2" size={20} />
          </Link>
        </div>
      </section>
    </div>
  );
};

const WhyUsPage = () => {
  const values = [
    {
      icon: <Target className="text-blue-600" size={40} />,
      title: "Results-Driven Approach",
      description:
        "We focus on delivering measurable outcomes that align with your business objectives.",
    },
    {
      icon: <Award className="text-green-600" size={40} />,
      title: "Proven Excellence",
      description:
        "With 100% project success rate and numerous satisfied clients, our track record speaks for itself.",
    },
    {
      icon: <Shield className="text-purple-600" size={40} />,
      title: "Enterprise Security",
      description:
        "Your data and applications are protected with industry-leading security practices.",
    },
    {
      icon: <Zap className="text-yellow-600" size={40} />,
      title: "Rapid Deployment",
      description:
        "We deliver solutions faster without compromising on quality or performance.",
    },
    {
      icon: <Users className="text-indigo-600" size={40} />,
      title: "Dedicated Teams",
      description:
        "Work with committed experts who become an extension of your team.",
    },
    {
      icon: <HeartHandshake className="text-red-600" size={40} />,
      title: "Client-Centric Focus",
      description:
        "Your success is our priority. We build lasting partnerships based on trust and results.",
    },
  ];

  const processSteps = [
    {
      step: "01",
      title: "Discovery & Strategy",
      description:
        "We deeply understand your business needs and define clear objectives.",
      icon: <Lightbulb className="text-blue-600" size={24} />,
    },
    {
      step: "02",
      title: "Design & Planning",
      description: "Create detailed architecture and user experience designs.",
      icon: <Rocket className="text-green-600" size={24} />,
    },
    {
      step: "03",
      title: "Development & Testing",
      description:
        "Agile development with continuous testing and quality assurance.",
      icon: <Code className="text-purple-600" size={24} />,
    },
    {
      step: "04",
      title: "Deployment & Support",
      description:
        "Smooth deployment followed by ongoing maintenance and support.",
      icon: <TrendingUp className="text-orange-600" size={24} />,
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Hero Section */}
      <section className="pt-32 pb-20 bg-gradient-to-br from-slate-900 to-blue-900 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgba(255,255,255,0.15)_1px,transparent_0)] bg-[size:40px_40px]"></div>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Why Choose <span className="text-blue-400">FriendlyDigitals</span>
            </h1>
            <p className="text-xl text-slate-300 mb-8 leading-relaxed">
              We combine technical expertise with business understanding to
              deliver solutions that drive growth and innovation.
            </p>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              Our Core Values
            </h2>
            <p className="text-slate-600 text-lg max-w-2xl mx-auto">
              These principles guide everything we do and ensure we deliver
              exceptional value to our clients.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {values.map((value, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-slate-100 group"
              >
                <div className="mb-6">{value.icon}</div>
                <h3 className="text-xl font-bold text-slate-900 mb-4 group-hover:text-blue-600 transition-colors">
                  {value.title}
                </h3>
                <p className="text-slate-600 leading-relaxed">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              Our Process
            </h2>
            <p className="text-slate-600 text-lg max-w-2xl mx-auto">
              A structured approach that ensures quality, transparency, and
              successful outcomes.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {processSteps.map((step, index) => (
              <div key={index} className="text-center group">
                <div className="relative mb-6">
                  <div className="w-20 h-20 bg-blue-600 rounded-full flex items-center justify-center mx-auto group-hover:scale-110 transition-transform duration-300">
                    <span className="text-white text-2xl font-bold">
                      {step.step}
                    </span>
                  </div>
                  <div className="absolute -bottom-2 -right-2 bg-white rounded-full p-2 shadow-lg">
                    {step.icon}
                  </div>
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">
                  {step.title}
                </h3>
                <p className="text-slate-600 text-sm leading-relaxed">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-slate-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-blue-400 mb-2">100%</div>
              <div className="text-slate-400 text-sm uppercase tracking-wide">
                Client Satisfaction
              </div>
            </div>
            <div>
              <div className="text-4xl font-bold text-green-400 mb-2">50+</div>
              <div className="text-slate-400 text-sm uppercase tracking-wide">
                Projects Delivered
              </div>
            </div>
            <div>
              <div className="text-4xl font-bold text-purple-400 mb-2">
                24/7
              </div>
              <div className="text-slate-400 text-sm uppercase tracking-wide">
                Support Available
              </div>
            </div>
            <div>
              <div className="text-4xl font-bold text-orange-400 mb-2">10+</div>
              <div className="text-slate-400 text-sm uppercase tracking-wide">
                Years Experience
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-indigo-700">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Ready to Experience the Difference?
          </h2>
          <p className="text-blue-100 text-lg mb-8">
            Join dozens of satisfied clients who have transformed their business
            with our solutions.
          </p>
          <Link
            to="/contact"
            className="inline-flex items-center bg-white text-blue-700 px-8 py-4 rounded-lg font-bold hover:bg-blue-50 transition-colors shadow-lg mr-4"
          >
            Get Started
          </Link>
          <Link
            to="/expertise"
            className="inline-flex items-center border border-white text-white px-8 py-4 rounded-lg font-bold hover:bg-white hover:text-blue-700 transition-colors"
          >
            Our Services
          </Link>
        </div>
      </section>
    </div>
  );
};

const ContactPage = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    company: "",
    service: "",
    budget: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission
    console.log("Form submitted:", formData);
  };

  const contactMethods = [
    {
      icon: <Mail className="text-blue-600" size={24} />,
      title: "Email Us",
      description: "contact@friendlydigitals.com",
      link: "mailto:contact@friendlydigitals.com",
    },
    {
      icon: <Phone className="text-green-600" size={24} />,
      title: "Call Us",
      description: "+1 (555) 123-4567",
      link: "tel:+15551234567",
    },
    {
      icon: <MapPin className="text-purple-600" size={24} />,
      title: "Visit Us",
      description: "123 Business Park, Tech District",
      link: "#",
    },
    {
      icon: <MessageCircle className="text-orange-600" size={24} />,
      title: "Live Chat",
      description: "Available 24/7",
      link: "#",
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Hero Section */}
      <section className="pt-32 pb-20 bg-gradient-to-br from-slate-900 to-blue-900 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgba(255,255,255,0.15)_1px,transparent_0)] bg-[size:40px_40px]"></div>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Let's <span className="text-blue-400">Connect</span>
            </h1>
            <p className="text-xl text-slate-300 mb-8 leading-relaxed">
              Ready to start your project? Get in touch with our team and let's
              discuss how we can help your business grow.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Methods */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {contactMethods.map((method, index) => (
              <a
                key={index}
                href={method.link}
                className="bg-slate-50 rounded-xl p-6 text-center hover:bg-blue-50 hover:border-blue-200 border border-slate-200 transition-all duration-300 group"
              >
                <div className="mb-4 flex justify-center">
                  <div className="p-3 bg-white rounded-lg shadow-sm group-hover:scale-110 transition-transform">
                    {method.icon}
                  </div>
                </div>
                <h3 className="font-semibold text-slate-900 mb-2 group-hover:text-blue-600 transition-colors">
                  {method.title}
                </h3>
                <p className="text-slate-600 text-sm">{method.description}</p>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form & Info */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div className="bg-white rounded-2xl p-8 shadow-lg border border-slate-100">
              <h2 className="text-3xl font-bold text-slate-900 mb-6">
                Send us a Message
              </h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      First Name *
                    </label>
                    <input
                      type="text"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Last Name *
                    </label>
                    <input
                      type="text"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Company
                    </label>
                    <input
                      type="text"
                      name="company"
                      value={formData.company}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Service Needed
                    </label>
                    <select
                      name="service"
                      value={formData.service}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
                    >
                      <option value="">Select a service</option>
                      <option value="software">Custom Software</option>
                      <option value="analytics">BI & Analytics</option>
                      <option value="accounting">Digital Accounting</option>
                      <option value="seo">SEO & Marketing</option>
                      <option value="web-management">Web Management</option>
                      <option value="consulting">IT Consulting</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Project Budget
                    </label>
                    <select
                      name="budget"
                      value={formData.budget}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
                    >
                      <option value="">Select budget range</option>
                      <option value="5k-10k">$5,000 - $10,000</option>
                      <option value="10k-25k">$10,000 - $25,000</option>
                      <option value="25k-50k">$25,000 - $50,000</option>
                      <option value="50k+">$50,000+</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Project Details *
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows="5"
                    className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
                    placeholder="Tell us about your project requirements, goals, and timeline..."
                    required
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="w-full bg-blue-600 text-white py-4 rounded-lg font-bold hover:bg-blue-700 transition-colors shadow-lg"
                >
                  Send Message
                </button>
              </form>
            </div>

            {/* Contact Info */}
            <div className="space-y-8">
              <div className="bg-slate-900 rounded-2xl p-8 text-white">
                <h3 className="text-2xl font-bold mb-6">Get in Touch</h3>
                <p className="text-slate-300 mb-8 leading-relaxed">
                  We're here to help you navigate your digital transformation
                  journey. Reach out to discuss your project or learn more about
                  our services.
                </p>

                <div className="space-y-6">
                  <div className="flex items-start">
                    <HeadphonesIcon
                      className="text-blue-400 mr-4 mt-1"
                      size={20}
                    />
                    <div>
                      <h4 className="font-semibold mb-1">Support Hours</h4>
                      <p className="text-slate-400 text-sm">
                        24/7 Emergency Support
                      </p>
                      <p className="text-slate-400 text-sm">
                        Mon-Fri: 9AM-6PM EST
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <Clock className="text-green-400 mr-4 mt-1" size={20} />
                    <div>
                      <h4 className="font-semibold mb-1">Response Time</h4>
                      <p className="text-slate-400 text-sm">
                        Typically within 2 hours
                      </p>
                      <p className="text-slate-400 text-sm">
                        Emergency: 30 minutes
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <UserCheck
                      className="text-purple-400 mr-4 mt-1"
                      size={20}
                    />
                    <div>
                      <h4 className="font-semibold mb-1">Dedicated Support</h4>
                      <p className="text-slate-400 text-sm">
                        Personal account manager
                      </p>
                      <p className="text-slate-400 text-sm">
                        Technical specialist assigned
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-2xl p-8 text-white text-center">
                <h3 className="text-xl font-bold mb-4">Schedule a Call</h3>
                <p className="text-blue-100 mb-6">
                  Prefer to talk? Schedule a free consultation with our experts.
                </p>
                <button className="bg-white text-blue-700 px-6 py-3 rounded-lg font-bold hover:bg-blue-50 transition-colors">
                  Book a Meeting
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

// --- Main App Component ---

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const isHomeTop = location.pathname === "/" && !scrolled;

  // Shared styles
  const navLinkClass = `text-sm font-semibold transition tracking-wide ${
    !isHomeTop
      ? "text-slate-600 hover:text-blue-600"
      : "text-white hover:text-blue-300"
  }`;
  const logoTextClass = `font-bold text-2xl tracking-tight transition-colors duration-300 ${
    !isHomeTop ? "text-slate-900" : "text-white"
  }`;
  const logoSpanClass = !isHomeTop ? "text-blue-600" : "text-blue-400";
  const btnClass = `px-6 py-2.5 rounded transition shadow-lg font-medium text-sm tracking-wide border ${
    !isHomeTop
      ? "bg-blue-600 text-white hover:bg-blue-700 shadow-blue-900/20 border-transparent"
      : "bg-white/10 text-white hover:bg-white/20 border-white/30 backdrop-blur-sm"
  }`;
  const mobileBtnClass = `block px-3 py-3 mt-4 text-center rounded-md text-base font-medium ${
    !isHomeTop
      ? "bg-slate-900 text-white hover:bg-slate-800"
      : "bg-blue-600 text-white hover:bg-blue-700"
  }`;

  return (
    <nav
      className={`fixed w-full z-50 transition-all duration-300 ${
        !isHomeTop
          ? "bg-white/95 backdrop-blur-md shadow-sm py-2"
          : "bg-transparent py-4"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <img
              src={logo}
              alt="FriendlyDigitals Logo"
              className="h-10 w-10 object-contain"
            />
            <span className={logoTextClass}>
              Friendly<span className={logoSpanClass}>Digitals</span>
            </span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-8 items-center">
            <Link to="/" className={navLinkClass}>
              HOME
            </Link>
            <Link to="/expertise" className={navLinkClass}>
              EXPERTISE
            </Link>
            <Link to="/products" className={navLinkClass}>
              PRODUCTS
            </Link>
            <Link to="/why-us" className={navLinkClass}>
              WHY US
            </Link>
            <Link to="/contact" className={btnClass}>
              CONTACT US
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={toggleMenu}
              className={`${
                !isHomeTop ? "text-slate-600" : "text-white"
              } hover:text-blue-600 focus:outline-none transition-colors`}
            >
              {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t border-slate-100 absolute w-full shadow-lg">
          <div className="px-4 pt-4 pb-8 space-y-2">
            <Link
              to="/"
              onClick={toggleMenu}
              className="block px-3 py-3 rounded-md text-base font-medium text-slate-700 hover:text-blue-600 hover:bg-slate-50"
            >
              Home
            </Link>
            <Link
              to="/expertise"
              onClick={toggleMenu}
              className="block px-3 py-3 rounded-md text-base font-medium text-slate-700 hover:text-blue-600 hover:bg-slate-50"
            >
              Expertise
            </Link>
            <Link
              to="/products"
              onClick={toggleMenu}
              className="block px-3 py-3 rounded-md text-base font-medium text-slate-700 hover:text-blue-600 hover:bg-slate-50"
            >
              Products
            </Link>
            <Link
              to="/why-us"
              onClick={toggleMenu}
              className="block px-3 py-3 rounded-md text-base font-medium text-slate-700 hover:text-blue-600 hover:bg-slate-50"
            >
              Why Us
            </Link>
            <Link to="/contact" onClick={toggleMenu} className={mobileBtnClass}>
              Contact Us
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

const App = () => {
  return (
    <BrowserRouter>
      <ScrollToAnchor />
      <div className="font-sans text-slate-800 bg-white overflow-x-hidden flex flex-col min-h-screen">
        <Navbar />
        <div className="flex-grow">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/products" element={<ProductsPage />} />
            <Route path="/expertise" element={<ExpertisePage />} />
            <Route path="/why-us" element={<WhyUsPage />} />
            <Route path="/contact" element={<ContactPage />} />
          </Routes>
        </div>
        {/* Footer */}
        <footer className="bg-slate-900 text-slate-400 py-16 border-t border-slate-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
              <div className="col-span-1 md:col-span-1">
                <span className="font-bold text-2xl text-white block mb-6">
                  Friendly<span className="text-blue-500">Digitals</span>
                </span>
                <p className="text-sm leading-relaxed mb-6">
                  Your trusted partner for comprehensive digital solutions. We
                  combine technical expertise with a friendly, client-first
                  approach.
                </p>
                <div className="flex space-x-4">
                  <a
                    href="#"
                    className="text-slate-400 hover:text-white transition"
                  >
                    <Twitter size={20} />
                  </a>
                  <a
                    href="#"
                    className="text-slate-400 hover:text-white transition"
                  >
                    <Linkedin size={20} />
                  </a>
                </div>
              </div>
              <div>
                <h4 className="text-white font-bold mb-6 text-sm uppercase tracking-wider">
                  Expertise
                </h4>
                <ul className="space-y-3 text-sm">
                  <li>
                    <Link
                      to="/expertise"
                      className="hover:text-blue-400 transition"
                    >
                      Software Engineering
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/expertise"
                      className="hover:text-blue-400 transition"
                    >
                      Data Analytics
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/expertise"
                      className="hover:text-blue-400 transition"
                    >
                      Cloud Accounting
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/expertise"
                      className="hover:text-blue-400 transition"
                    >
                      SEO Strategies
                    </Link>
                  </li>
                </ul>
              </div>
              <div>
                <h4 className="text-white font-bold mb-6 text-sm uppercase tracking-wider">
                  Company
                </h4>
                <ul className="space-y-3 text-sm">
                  <li>
                    <Link to="/" className="hover:text-blue-400 transition">
                      Home
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/products"
                      className="hover:text-blue-400 transition"
                    >
                      Products
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/why-us"
                      className="hover:text-blue-400 transition"
                    >
                      About Us
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/contact"
                      className="hover:text-blue-400 transition"
                    >
                      Contact
                    </Link>
                  </li>
                </ul>
              </div>
              <div>
                <h4 className="text-white font-bold mb-6 text-sm uppercase tracking-wider">
                  Stay Updated
                </h4>
                <p className="text-sm mb-4">
                  Subscribe for the latest tech insights.
                </p>
                <div className="flex flex-col gap-3">
                  <input
                    type="text"
                    placeholder="Email Address"
                    className="bg-slate-800 border border-slate-700 rounded px-4 py-2.5 w-full text-white focus:ring-1 focus:ring-blue-500 outline-none text-sm"
                  />
                  <button className="bg-blue-600 text-white px-4 py-2.5 rounded hover:bg-blue-700 font-bold text-sm uppercase tracking-wide">
                    Subscribe
                  </button>
                </div>
              </div>
            </div>
            <div className="border-t border-slate-800 pt-8 text-sm text-center flex flex-col md:flex-row justify-between items-center">
              <p>&copy; 2024 FriendlyDigitals. All rights reserved.</p>
              <div className="flex space-x-6 mt-4 md:mt-0">
                <a href="#" className="hover:text-white transition">
                  Terms
                </a>
                <a href="#" className="hover:text-white transition">
                  Privacy
                </a>
                <a href="#" className="hover:text-white transition">
                  Cookies
                </a>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </BrowserRouter>
  );
};

export default App;
