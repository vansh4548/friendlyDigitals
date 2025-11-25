import React from "react";

const Card = ({
  children,
  className = "",
  hover = false,
  padding = "md",
  ...props
}) => {
  const paddingStyles = {
    sm: "p-4",
    md: "p-6 md:p-8",
    lg: "p-8 md:p-12",
  };

  const hoverStyles = hover
    ? "hover:shadow-xl hover:shadow-slate-200/60 transition-all duration-300 transform hover:-translate-y-1"
    : "";

  return (
    <div
      className={`bg-white rounded-2xl border border-slate-200 shadow-lg ${paddingStyles[padding]} ${hoverStyles} ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};

export default Card;
