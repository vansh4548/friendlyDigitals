import React, { useEffect, useRef } from "react";

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

export default CircularText;
