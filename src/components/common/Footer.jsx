import React from "react";
import { Link } from "react-router-dom";
import { Twitter, Linkedin } from "lucide-react";
import { companyInfo, socialLinks } from "../../data/constants";

const Footer = () => {
  const footerSections = [
    {
      title: "Expertise",
      links: [
        { label: "Software Engineering", path: "/expertise" },
        { label: "Data Analytics", path: "/expertise" },
        { label: "Cloud Accounting", path: "/expertise" },
        { label: "SEO Strategies", path: "/expertise" },
      ],
    },
    {
      title: "Company",
      links: [
        { label: "Home", path: "/" },
        { label: "Products", path: "/products" },
        { label: "About Us", path: "/why-us" },
        { label: "Contact", path: "/contact" },
      ],
    },
  ];

  return (
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
                href={socialLinks.twitter}
                className="text-slate-400 hover:text-white transition"
              >
                <Twitter size={20} />
              </a>
              <a
                href={socialLinks.linkedin}
                className="text-slate-400 hover:text-white transition"
              >
                <Linkedin size={20} />
              </a>
            </div>
          </div>

          {footerSections.map((section, index) => (
            <div key={index}>
              <h4 className="text-white font-bold mb-6 text-sm uppercase tracking-wider">
                {section.title}
              </h4>
              <ul className="space-y-3 text-sm">
                {section.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <Link
                      to={link.path}
                      className="hover:text-blue-400 transition"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

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
          <p>&copy; 2024 {companyInfo.name}. All rights reserved.</p>
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
  );
};

export default Footer;
