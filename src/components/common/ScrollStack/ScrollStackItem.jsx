import React from "react";

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

export default ScrollStackItem;
