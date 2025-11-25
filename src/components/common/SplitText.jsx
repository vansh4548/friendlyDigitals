import React, { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

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

export default SplitText;
