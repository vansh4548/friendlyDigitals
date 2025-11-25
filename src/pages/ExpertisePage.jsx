import React from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  CheckCircle,
  Code,
  BarChart3,
  Calculator,
  Search,
  Globe,
  Settings,
} from "lucide-react";
import Button from "../components/ui/Button";
import Card from "../components/ui/Card";
import { expertiseAreas, technologies } from "../data/expertise";

const ExpertisePage = () => {
  const getIconComponent = (iconName, size = 48) => {
    const icons = {
      Code: <Code className="text-blue-600" size={size} />,
      BarChart3: <BarChart3 className="text-indigo-600" size={size} />,
      Calculator: <Calculator className="text-slate-600" size={size} />,
      Search: <Search className="text-sky-600" size={size} />,
      Globe: <Globe className="text-teal-600" size={size} />,
      Settings: <Settings className="text-slate-800" size={size} />,
    };
    return icons[iconName] || <Code className="text-blue-600" size={size} />;
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Hero Section */}
      <section className="pt-32 pb-20 bg-slate-900 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 to-indigo-900/20"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Our <span className="text-blue-400">Expertise</span>
            </h1>
            <p className="text-xl text-slate-300 mb-8 leading-relaxed">
              Deep technical knowledge meets business acumen. We deliver
              solutions that drive real results.
            </p>
          </div>
        </div>
      </section>

      {/* Expertise Grid */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
            {expertiseAreas.map((area, index) => (
              <Card key={index} hover padding="lg" className="group">
                <div className="mb-6">{getIconComponent(area.icon)}</div>
                <h3 className="text-2xl font-bold text-slate-900 mb-4 group-hover:text-blue-600 transition-colors">
                  {area.title}
                </h3>
                <p className="text-slate-600 mb-6 leading-relaxed">
                  {area.description}
                </p>
                <div className="space-y-2">
                  {area.features.map((feature, idx) => (
                    <div key={idx} className="flex items-center text-slate-700">
                      <CheckCircle
                        className="text-green-500 mr-3 flex-shrink-0"
                        size={16}
                      />
                      <span className="text-sm">{feature}</span>
                    </div>
                  ))}
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Technology Stack */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              Technology Stack
            </h2>
            <p className="text-slate-600 text-lg max-w-2xl mx-auto">
              We work with modern technologies and proven frameworks to deliver
              robust, scalable solutions.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
            {technologies.map((tech, index) => (
              <Card
                key={index}
                padding="md"
                className="text-center group hover:border-blue-300 transition-colors"
              >
                <div className="text-slate-900 font-semibold mb-2 group-hover:text-blue-600 transition-colors">
                  {tech.name}
                </div>
                <div className="text-xs text-slate-500 uppercase tracking-wide">
                  {tech.category}
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-indigo-700">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Ready to Leverage Our Expertise?
          </h2>
          <p className="text-blue-100 text-lg mb-8">
            Let's discuss how our technical expertise can solve your business
            challenges.
          </p>
          <Button
            as={Link}
            to="/contact"
            variant="white"
            size="lg"
            icon={ArrowRight}
            iconPosition="right"
          >
            Start a Project
          </Button>
        </div>
      </section>
    </div>
  );
};

export default ExpertisePage;
