import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight, CheckCircle } from "lucide-react";
import SplitText from "../components/common/SplitText";
import CircularText from "../components/common/CircularText";
import ScrollStack from "../components/common/ScrollStack/ScrollStack";
import ScrollStackItem from "../components/common/ScrollStack/ScrollStackItem";
import Button from "../components/ui/Button";
import { services } from "../data/services";

const HomePage = () => {
  return (
    <>
      {/* Hero Section */}
      <section
        id="home"
        className="relative pt-32 pb-20 md:pt-48 md:pb-32 overflow-hidden min-h-[90vh] flex items-center"
      >
        <div className="absolute inset-0 w-full h-full">
          <div className="absolute inset-0 bg-slate-900/70 z-10"></div>
          <video
            className="w-full h-full object-cover"
            autoPlay
            loop
            muted
            playsInline
            poster="https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2072&auto=format&fit=crop"
          >
            <source
              src="https://assets.mixkit.co/videos/preview/mixkit-digital-animation-of-blue-circuit-board-98-large.mp4"
              type="video/mp4"
            />
          </video>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20 w-full">
          <div className="flex flex-col md:flex-row items-center justify-between gap-12">
            <div className="max-w-3xl">
              <div className="inline-block px-4 py-1.5 mb-6 bg-blue-600/30 backdrop-blur-sm text-blue-100 border border-blue-400/30 rounded-full text-xs font-bold tracking-widest uppercase">
                Digital Transformation Partner
              </div>

              <div className="mb-8">
                <SplitText
                  text="Friendly Solutions."
                  className="text-4xl sm:text-5xl md:text-7xl font-extrabold text-white leading-tight tracking-tight drop-shadow-lg"
                  delay={0}
                  duration={0.5}
                  ease="back.out(1.2)"
                  splitBy="chars"
                />
                <SplitText
                  text="Professional Results."
                  className="text-4xl sm:text-5xl md:text-7xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300 leading-tight tracking-tight drop-shadow-lg pb-2"
                  delay={200}
                  duration={0.5}
                  ease="back.out(1.2)"
                  splitBy="none"
                />
              </div>
              <p className="text-xl text-slate-200 mb-10 max-w-2xl leading-relaxed drop-shadow-md">
                We streamline your business operations through expert software
                development, precise financial reporting, and strategic digital
                management.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  to="/contact"
                  size="lg"
                  icon={ArrowRight}
                  iconPosition="right"
                >
                  Start Your Project
                </Button>
                <Button as={Link} to="/expertise" variant="secondary" size="lg">
                  Our Services
                </Button>
              </div>
            </div>
            <div className="hidden md:block">
              <CircularText
                text="FRIENDLY*DIGITALS*SERVICES*"
                spinDuration={25}
                className="text-blue-100 opacity-90 hover:opacity-100 hover:text-white transition-opacity"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 text-center">
          <h2 className="text-blue-600 font-bold tracking-widest uppercase text-sm mb-3">
            Our Expertise
          </h2>
          <h3 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
            Integrated Digital Services
          </h3>
          <p className="text-slate-600 text-lg max-w-2xl mx-auto mb-10">
            Scroll down to explore our full spectrum of technical services
            designed to modernize your infrastructure.
          </p>
        </div>
        <ScrollStack
          useWindowScroll={true}
          itemDistance={40}
          stackPosition="15%"
          itemStackDistance={20}
        >
          {services.map((service, index) => (
            <ScrollStackItem key={index} bgClass={service.cardColor}>
              <div className="flex flex-col md:flex-row h-full items-center gap-6 text-white">
                <div className="p-5 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20 shadow-xl">
                  {/* Icon would be dynamically rendered based on service.icon */}
                </div>
                <div className="flex-1 text-center md:text-left">
                  <h3 className="text-2xl font-bold mb-3">{service.title}</h3>
                  <p className="text-base text-blue-100 leading-relaxed mb-4">
                    {service.description}
                  </p>
                  <Link
                    to="/contact"
                    className="inline-flex items-center text-white font-bold hover:text-blue-200 transition group text-sm"
                  >
                    Get Started{" "}
                    <ArrowRight
                      size={16}
                      className="ml-2 group-hover:translate-x-1 transition-transform"
                    />
                  </Link>
                </div>
                <div className="hidden lg:block text-6xl font-bold opacity-10 select-none">
                  0{index + 1}
                </div>
              </div>
            </ScrollStackItem>
          ))}
        </ScrollStack>
      </section>

      {/* Metrics Section */}
      <section className="py-24 bg-slate-900 text-white relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: "radial-gradient(#4b5563 1px, transparent 1px)",
            backgroundSize: "32px 32px",
          }}
        ></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-blue-400 font-bold tracking-widest uppercase text-sm mb-3">
                Why FriendlyDigitals
              </h2>
              <h3 className="text-3xl md:text-4xl font-bold mb-6 text-white">
                Engineering Trust Through Transparency & Excellence
              </h3>
              <p className="text-slate-300 text-lg mb-8 leading-relaxed">
                We bridge the gap between complex technology and user-friendly
                solutions. Our approach combines technical rigor with a deep
                understanding of business processes.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {[
                  "Enterprise-Grade Security",
                  "Scalable Architecture",
                  "Data-Driven Decisions",
                  "24/7 Dedicated Support",
                ].map((item, idx) => (
                  <div key={idx} className="flex items-start">
                    <CheckCircle
                      className="text-blue-500 mr-3 mt-1 flex-shrink-0"
                      size={20}
                    />
                    <span className="text-slate-200 font-medium">{item}</span>
                  </div>
                ))}
              </div>
              <Button
                as={Link}
                to="/why-us"
                size="md"
                icon={ArrowRight}
                iconPosition="right"
                className="mt-8"
              >
                Learn More About Us
              </Button>
            </div>
            <div className="bg-slate-800 p-8 md:p-12 rounded border border-slate-700 shadow-2xl">
              <div className="grid grid-cols-2 gap-8 text-center">
                <div className="border-r border-b border-slate-700 p-4">
                  <h4 className="text-4xl font-bold text-white mb-2">100%</h4>
                  <p className="text-slate-400 text-sm uppercase tracking-wider">
                    Project Success
                  </p>
                </div>
                <div className="border-b border-slate-700 p-4">
                  <h4 className="text-4xl font-bold text-white mb-2">50+</h4>
                  <p className="text-slate-400 text-sm uppercase tracking-wider">
                    Active Clients
                  </p>
                </div>
                <div className="border-r border-slate-700 p-4">
                  <h4 className="text-4xl font-bold text-white mb-2">24h</h4>
                  <p className="text-slate-400 text-sm uppercase tracking-wider">
                    Response Time
                  </p>
                </div>
                <div className="p-4">
                  <h4 className="text-4xl font-bold text-white mb-2">10yr</h4>
                  <p className="text-slate-400 text-sm uppercase tracking-wider">
                    Combined Exp.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-indigo-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Ready to Transform Your Business?
          </h2>
          <p className="text-blue-100 text-lg mb-8 max-w-2xl mx-auto">
            Let's discuss how our digital solutions can drive your success
            forward.
          </p>
          <Button
            as={Link}
            to="/contact"
            variant="white"
            size="lg"
            icon={ArrowRight}
            iconPosition="right"
          >
            Get In Touch
          </Button>
        </div>
      </section>
    </>
  );
};

export default HomePage;
