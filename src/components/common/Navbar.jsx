import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import logo from "../../assets/loogo.png";

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

  const navLinks = [
    { path: "/", label: "HOME" },
    { path: "/expertise", label: "EXPERTISE" },
    { path: "/products", label: "PRODUCTS" },
    { path: "/why-us", label: "WHY US" },
    { path: "/contact", label: "CONTACT US", button: true },
  ];

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
            {navLinks.map((link) =>
              link.button ? (
                <Link key={link.path} to={link.path} className={btnClass}>
                  {link.label}
                </Link>
              ) : (
                <Link key={link.path} to={link.path} className={navLinkClass}>
                  {link.label}
                </Link>
              )
            )}
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
            {navLinks.map((link) =>
              link.button ? (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={toggleMenu}
                  className={mobileBtnClass}
                >
                  {link.label}
                </Link>
              ) : (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={toggleMenu}
                  className="block px-3 py-3 rounded-md text-base font-medium text-slate-700 hover:text-blue-600 hover:bg-slate-50"
                >
                  {link.label}
                </Link>
              )
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
