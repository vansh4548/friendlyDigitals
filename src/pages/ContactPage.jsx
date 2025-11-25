import React, { useState } from "react";
import {
  Mail,
  Phone,
  MapPin,
  MessageCircle,
  HeadphonesIcon,
  Clock,
  UserCheck,
  ArrowRight,
} from "lucide-react";
import Button from "../components/ui/Button";
import Card from "../components/ui/Card";
import { companyInfo } from "../data/constants";

const ContactPage = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    company: "",
    service: "",
    budget: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission
    console.log("Form submitted:", formData);
    // Reset form
    setFormData({
      firstName: "",
      lastName: "",
      email: "",
      company: "",
      service: "",
      budget: "",
      message: "",
    });
  };

  const contactMethods = [
    {
      icon: <Mail className="text-blue-600" size={24} />,
      title: "Email Us",
      description: companyInfo.email,
      link: `mailto:${companyInfo.email}`,
    },
    {
      icon: <Phone className="text-green-600" size={24} />,
      title: "Call Us",
      description: companyInfo.phone,
      link: `tel:${companyInfo.phone}`,
    },
    {
      icon: <MapPin className="text-purple-600" size={24} />,
      title: "Visit Us",
      description: companyInfo.address,
      link: "#",
    },
    {
      icon: <MessageCircle className="text-orange-600" size={24} />,
      title: "Live Chat",
      description: "Available 24/7",
      link: "#",
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
              Let's <span className="text-blue-400">Connect</span>
            </h1>
            <p className="text-xl text-slate-300 mb-8 leading-relaxed">
              Ready to start your project? Get in touch with our team and let's
              discuss how we can help your business grow.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Methods */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {contactMethods.map((method, index) => (
              <a
                key={index}
                href={method.link}
                className="bg-slate-50 rounded-xl p-6 text-center hover:bg-blue-50 hover:border-blue-200 border border-slate-200 transition-all duration-300 group"
              >
                <div className="mb-4 flex justify-center">
                  <div className="p-3 bg-white rounded-lg shadow-sm group-hover:scale-110 transition-transform">
                    {method.icon}
                  </div>
                </div>
                <h3 className="font-semibold text-slate-900 mb-2 group-hover:text-blue-600 transition-colors">
                  {method.title}
                </h3>
                <p className="text-slate-600 text-sm">{method.description}</p>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form & Info */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <Card padding="lg">
              <h2 className="text-3xl font-bold text-slate-900 mb-6">
                Send us a Message
              </h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      First Name *
                    </label>
                    <input
                      type="text"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Last Name *
                    </label>
                    <input
                      type="text"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Company
                    </label>
                    <input
                      type="text"
                      name="company"
                      value={formData.company}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Service Needed
                    </label>
                    <select
                      name="service"
                      value={formData.service}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
                    >
                      <option value="">Select a service</option>
                      <option value="software">Custom Software</option>
                      <option value="analytics">BI & Analytics</option>
                      <option value="accounting">Digital Accounting</option>
                      <option value="seo">SEO & Marketing</option>
                      <option value="web-management">Web Management</option>
                      <option value="consulting">IT Consulting</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Project Budget
                    </label>
                    <select
                      name="budget"
                      value={formData.budget}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
                    >
                      <option value="">Select budget range</option>
                      <option value="5k-10k">$5,000 - $10,000</option>
                      <option value="10k-25k">$10,000 - $25,000</option>
                      <option value="25k-50k">$25,000 - $50,000</option>
                      <option value="50k+">$50,000+</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Project Details *
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows="5"
                    className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
                    placeholder="Tell us about your project requirements, goals, and timeline..."
                    required
                  ></textarea>
                </div>

                <Button type="submit" size="lg" className="w-full">
                  Send Message
                </Button>
              </form>
            </Card>

            {/* Contact Info */}
            <div className="space-y-8">
              <div className="bg-slate-900 rounded-2xl p-8 text-white">
                <h3 className="text-2xl font-bold mb-6">Get in Touch</h3>
                <p className="text-slate-300 mb-8 leading-relaxed">
                  We're here to help you navigate your digital transformation
                  journey. Reach out to discuss your project or learn more about
                  our services.
                </p>

                <div className="space-y-6">
                  <div className="flex items-start">
                    <HeadphonesIcon
                      className="text-blue-400 mr-4 mt-1"
                      size={20}
                    />
                    <div>
                      <h4 className="font-semibold mb-1">Support Hours</h4>
                      <p className="text-slate-400 text-sm">
                        24/7 Emergency Support
                      </p>
                      <p className="text-slate-400 text-sm">
                        Mon-Fri: 9AM-6PM EST
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <Clock className="text-green-400 mr-4 mt-1" size={20} />
                    <div>
                      <h4 className="font-semibold mb-1">Response Time</h4>
                      <p className="text-slate-400 text-sm">
                        Typically within 2 hours
                      </p>
                      <p className="text-slate-400 text-sm">
                        Emergency: 30 minutes
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <UserCheck
                      className="text-purple-400 mr-4 mt-1"
                      size={20}
                    />
                    <div>
                      <h4 className="font-semibold mb-1">Dedicated Support</h4>
                      <p className="text-slate-400 text-sm">
                        Personal account manager
                      </p>
                      <p className="text-slate-400 text-sm">
                        Technical specialist assigned
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-2xl p-8 text-white text-center">
                <h3 className="text-xl font-bold mb-4">Schedule a Call</h3>
                <p className="text-blue-100 mb-6">
                  Prefer to talk? Schedule a free consultation with our experts.
                </p>
                <Button
                  variant="white"
                  size="md"
                  icon={ArrowRight}
                  iconPosition="right"
                >
                  Book a Meeting
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ContactPage;
