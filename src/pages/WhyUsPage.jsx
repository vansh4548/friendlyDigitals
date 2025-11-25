import React from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  Target,
  Award,
  Shield,
  Zap,
  Users,
  HeartHandshake,
  Lightbulb,
  Rocket,
  Code,
  TrendingUp,
} from "lucide-react";
import Button from "../components/ui/Button";
import Card from "../components/ui/Card";

const WhyUsPage = () => {
  const values = [
    {
      icon: <Target className="text-blue-600" size={40} />,
      title: "Results-Driven Approach",
      description:
        "We focus on delivering measurable outcomes that align with your business objectives.",
    },
    {
      icon: <Award className="text-green-600" size={40} />,
      title: "Proven Excellence",
      description:
        "With 100% project success rate and numerous satisfied clients, our track record speaks for itself.",
    },
    {
      icon: <Shield className="text-purple-600" size={40} />,
      title: "Enterprise Security",
      description:
        "Your data and applications are protected with industry-leading security practices.",
    },
    {
      icon: <Zap className="text-yellow-600" size={40} />,
      title: "Rapid Deployment",
      description:
        "We deliver solutions faster without compromising on quality or performance.",
    },
    {
      icon: <Users className="text-indigo-600" size={40} />,
      title: "Dedicated Teams",
      description:
        "Work with committed experts who become an extension of your team.",
    },
    {
      icon: <HeartHandshake className="text-red-600" size={40} />,
      title: "Client-Centric Focus",
      description:
        "Your success is our priority. We build lasting partnerships based on trust and results.",
    },
  ];

  const processSteps = [
    {
      step: "01",
      title: "Discovery & Strategy",
      description:
        "We deeply understand your business needs and define clear objectives.",
      icon: <Lightbulb className="text-blue-600" size={24} />,
    },
    {
      step: "02",
      title: "Design & Planning",
      description: "Create detailed architecture and user experience designs.",
      icon: <Rocket className="text-green-600" size={24} />,
    },
    {
      step: "03",
      title: "Development & Testing",
      description:
        "Agile development with continuous testing and quality assurance.",
      icon: <Code className="text-purple-600" size={24} />,
    },
    {
      step: "04",
      title: "Deployment & Support",
      description:
        "Smooth deployment followed by ongoing maintenance and support.",
      icon: <TrendingUp className="text-orange-600" size={24} />,
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Hero Section */}
      <section className="pt-32 pb-20 bg-gradient-to-br from-slate-900 to-blue-900 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgba(255,255,255,0.15)_1px,transparent_0)] bg-[size:40px_40px]"></div>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Why Choose <span className="text-blue-400">FriendlyDigitals</span>
            </h1>
            <p className="text-xl text-slate-300 mb-8 leading-relaxed">
              We combine technical expertise with business understanding to
              deliver solutions that drive growth and innovation.
            </p>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              Our Core Values
            </h2>
            <p className="text-slate-600 text-lg max-w-2xl mx-auto">
              These principles guide everything we do and ensure we deliver
              exceptional value to our clients.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {values.map((value, index) => (
              <Card key={index} hover padding="lg" className="group">
                <div className="mb-6">{value.icon}</div>
                <h3 className="text-xl font-bold text-slate-900 mb-4 group-hover:text-blue-600 transition-colors">
                  {value.title}
                </h3>
                <p className="text-slate-600 leading-relaxed">
                  {value.description}
                </p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              Our Process
            </h2>
            <p className="text-slate-600 text-lg max-w-2xl mx-auto">
              A structured approach that ensures quality, transparency, and
              successful outcomes.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {processSteps.map((step, index) => (
              <div key={index} className="text-center group">
                <div className="relative mb-6">
                  <div className="w-20 h-20 bg-blue-600 rounded-full flex items-center justify-center mx-auto group-hover:scale-110 transition-transform duration-300">
                    <span className="text-white text-2xl font-bold">
                      {step.step}
                    </span>
                  </div>
                  <div className="absolute -bottom-2 -right-2 bg-white rounded-full p-2 shadow-lg">
                    {step.icon}
                  </div>
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">
                  {step.title}
                </h3>
                <p className="text-slate-600 text-sm leading-relaxed">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-slate-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-blue-400 mb-2">100%</div>
              <div className="text-slate-400 text-sm uppercase tracking-wide">
                Client Satisfaction
              </div>
            </div>
            <div>
              <div className="text-4xl font-bold text-green-400 mb-2">50+</div>
              <div className="text-slate-400 text-sm uppercase tracking-wide">
                Projects Delivered
              </div>
            </div>
            <div>
              <div className="text-4xl font-bold text-purple-400 mb-2">
                24/7
              </div>
              <div className="text-slate-400 text-sm uppercase tracking-wide">
                Support Available
              </div>
            </div>
            <div>
              <div className="text-4xl font-bold text-orange-400 mb-2">10+</div>
              <div className="text-slate-400 text-sm uppercase tracking-wide">
                Years Experience
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-indigo-700">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Ready to Experience the Difference?
          </h2>
          <p className="text-blue-100 text-lg mb-8">
            Join dozens of satisfied clients who have transformed their business
            with our solutions.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button as={Link} to="/contact" variant="white" size="lg">
              Get Started
            </Button>
            <Button
              as={Link}
              to="/expertise"
              variant="outline"
              size="lg"
              className="border-white text-white hover:bg-white hover:text-blue-700"
            >
              Our Services
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default WhyUsPage;
