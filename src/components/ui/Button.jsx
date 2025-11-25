import React from "react";
import { ArrowRight } from "lucide-react";

const Button = ({
  children,
  variant = "primary",
  size = "md",
  icon: Icon,
  iconPosition = "right",
  className = "",
  ...props
}) => {
  const baseStyles =
    "inline-flex items-center justify-center font-bold rounded transition shadow-lg tracking-wide border";

  const variants = {
    primary:
      "bg-blue-600 text-white hover:bg-blue-700 shadow-blue-900/20 border-transparent",
    secondary:
      "bg-white/10 text-white border-white/30 backdrop-blur-sm hover:bg-white/20 hover:border-white/50",
    outline:
      "border-slate-200 text-slate-700 hover:bg-blue-600 hover:text-white hover:border-transparent",
    white: "bg-white text-blue-700 hover:bg-blue-50",
  };

  const sizes = {
    sm: "px-4 py-2 text-sm",
    md: "px-6 py-2.5 text-sm",
    lg: "px-8 py-4 text-base",
  };

  return (
    <button
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {iconPosition === "left" && Icon && <Icon className="mr-2" size={20} />}
      {children}
      {iconPosition === "right" && Icon && <Icon className="ml-2" size={20} />}
    </button>
  );
};

export default Button;
