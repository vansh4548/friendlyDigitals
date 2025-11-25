import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Filter, LayoutGrid } from "lucide-react";
import Button from "../components/ui/Button";
import Card from "../components/ui/Card";
import { products } from "../data/products";

const ProductsPage = () => {
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
    <div className="bg-slate-50 min-h-screen">
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
            <Card
              key={index}
              hover
              padding="lg"
              className="flex flex-col h-full overflow-hidden"
            >
              {/* Image Area */}
              <div className="relative h-64 overflow-hidden bg-slate-100 -mx-8 -mt-8 mb-6">
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
              <div className="flex flex-col flex-grow">
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
            </Card>
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
          <Button as={Link} to="/contact" variant="white" size="lg">
            Contact Sales Team
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProductsPage;
