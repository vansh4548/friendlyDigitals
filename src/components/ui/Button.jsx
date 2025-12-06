import React from "react";
import { Link } from "react-router-dom";

const Button = ({
  children,
  variant = "primary",
  size = "md",
  icon: Icon,
  iconPosition = "right",
  className = "",
  href,
  to,
  as: Component,
  ...props
}) => {
  const baseStyles =
    "inline-flex items-center justify-center font-bold rounded transition shadow-lg tracking-wide border cursor-pointer";

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

  const buttonClasses = `${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`;

  // If we have a 'to' prop, render as React Router Link
  if (to) {
    return (
      <Link to={to} className={buttonClasses} {...props}>
        {iconPosition === "left" && Icon && <Icon className="mr-2" size={20} />}
        {children}
        {iconPosition === "right" && Icon && (
          <Icon className="ml-2" size={20} />
        )}
      </Link>
    );
  }

  // If we have an 'href' prop, render as anchor tag
  if (href) {
    return (
      <a href={href} className={buttonClasses} {...props}>
        {iconPosition === "left" && Icon && <Icon className="mr-2" size={20} />}
        {children}
        {iconPosition === "right" && Icon && (
          <Icon className="ml-2" size={20} />
        )}
      </a>
    );
  }

  // Otherwise, render as button
  return (
    <button className={buttonClasses} {...props}>
      {iconPosition === "left" && Icon && <Icon className="mr-2" size={20} />}
      {children}
      {iconPosition === "right" && Icon && <Icon className="ml-2" size={20} />}
    </button>
  );
};

export default Button;
