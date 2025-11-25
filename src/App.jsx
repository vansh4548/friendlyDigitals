import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Components
import Navbar from "./components/common/Navbar";
import Footer from "./components/common/Footer";
import ScrollToAnchor from "./components/common/ScrollToAnchor";

// Pages
import HomePage from "./pages/HomePage";
import ProductsPage from "./pages/ProductsPage";
import ExpertisePage from "./pages/ExpertisePage";
import WhyUsPage from "./pages/WhyUsPage";
import ContactPage from "./pages/ContactPage";

// Styles
import "./App.css";

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

function App() {
  return (
    <BrowserRouter>
      <ScrollToAnchor />
      <div className="font-sans text-slate-800 bg-white overflow-x-hidden flex flex-col min-h-screen">
        <Navbar />
        <div className="flex-grow">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/products" element={<ProductsPage />} />
            <Route path="/expertise" element={<ExpertisePage />} />
            <Route path="/why-us" element={<WhyUsPage />} />
            <Route path="/contact" element={<ContactPage />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
