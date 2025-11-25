import React, { useRef, useCallback, useLayoutEffect } from "react";
import Lenis from "lenis";

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

export default ScrollStack;
