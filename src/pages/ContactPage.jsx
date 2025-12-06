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
  CheckCircle,
  Smartphone,
} from "lucide-react";
import Button from "../components/ui/Button";
import Card from "../components/ui/Card";
import { companyInfo } from "../data/constants";

const ContactPage = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    mobile: "",
    company: "",
    service: "",
    budget: "",
    message: "",
    sendCopy: false,
  });

  const [formStatus, setFormStatus] = useState({
    submitting: false,
    submitted: false,
    error: false,
    message: "",
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  // Formspree Submission Handler
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setFormStatus({
      submitting: true,
      submitted: false,
      error: false,
      message: "",
    });

    try {
      const response = await fetch("https://formspree.io/f/mkgdzyzr", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          _subject: `🚀 New Contact Form: ${formData.firstName} ${
            formData.lastName
          } - ${formData.service || "General Inquiry"}`,
          _replyto: formData.email,
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          mobile: formData.mobile || "Not provided",
          company: formData.company || "Not provided",
          service: formData.service || "Not specified",
          budget: formData.budget || "Not specified",
          message: formData.message,
          _format: "html",
          _cc: formData.sendCopy ? formData.email : undefined,
          _template: "table",
        }),
      });

      const result = await response.json();

      if (response.ok) {
        setFormStatus({
          submitting: false,
          submitted: true,
          error: false,
          message: "🎉 Thank you! Your message has been sent successfully.",
        });

        // Reset form
        setFormData({
          firstName: "",
          lastName: "",
          email: "",
          mobile: "",
          company: "",
          service: "",
          budget: "",
          message: "",
          sendCopy: false,
        });

        // Auto-clear success message after 8 seconds
        setTimeout(() => {
          setFormStatus((prev) => ({ ...prev, submitted: false }));
        }, 8000);
      } else {
        throw new Error(result.error || "Form submission failed");
      }
    } catch (error) {
      console.error("Form submission error:", error);
      setFormStatus({
        submitting: false,
        submitted: false,
        error: true,
        message:
          "❌ Sorry, there was an error. Please try again or contact us directly.",
      });
    }
  };

  // Updated contact methods with WhatsApp
  const contactMethods = [
    {
      icon: <Mail className="text-blue-600" size={24} />,
      title: "Email Us",
      description: companyInfo.email,
      link: `mailto:${companyInfo.email}?subject=Contact%20from%20FriendlyDigitals%20Website&body=Hello%20FriendlyDigitals%20Team,%0D%0A%0D%0AI%20am%20interested%20in%20your%20services.%0D%0A%0D%0ABest%20regards,`,
    },
    {
      icon: <Phone className="text-green-600" size={24} />,
      title: "Call Us",
      description: companyInfo.phone,
      link: `tel:${companyInfo.phone}`,
    },
    {
      icon: <Smartphone className="text-purple-600" size={24} />,
      title: "WhatsApp",
      description: "Chat with us",
      link: `https://wa.me/9199684801?text=Hello%20FriendlyDigitals%20Team!%20I%20visited%20your%20website%20and%20would%20like%20to%20discuss%20a%20project.`,
    },
    {
      icon: <MapPin className="text-orange-600" size={24} />,
      title: "Our Location",
      description: companyInfo.address,
      link: "https://www.google.com/maps/search/?api=1&query=Business+Park+Tech+District",
    },
  ];

  // Services options for dropdown
  const serviceOptions = [
    { value: "software", label: "Custom Software Development" },
    { value: "analytics", label: "BI & Analytics Solutions" },
    { value: "accounting", label: "Digital Accounting Solutions" },
    { value: "seo", label: "SEO & Digital Marketing" },
    { value: "web-management", label: "Web Management & Hosting" },
    { value: "consulting", label: "IT Consulting & Strategy" },
    { value: "other", label: "Other / Multiple Services" },
  ];

  // Budget options for dropdown
  const budgetOptions = [
    { value: "less-than-5k", label: "Less than ₹5,000" },
    { value: "5k-10k", label: "₹5,000 - ₹10,000" },
    { value: "10k-25k", label: "₹10,000 - ₹25,000" },
    { value: "25k-50k", label: "₹25,000 - ₹50,000" },
    { value: "50k-100k", label: "₹50,000 - ₹100,000" },
    { value: "100k-plus", label: "₹100,000+" },
    { value: "not-sure", label: "Not sure / Need consultation" },
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
                target={method.link.includes("http") ? "_blank" : "_self"}
                rel={method.link.includes("http") ? "noopener noreferrer" : ""}
                className="bg-slate-50 rounded-xl p-6 text-center hover:bg-blue-50 hover:border-blue-200 border border-slate-200 transition-all duration-300 group hover:shadow-lg hover:-translate-y-1"
              >
                <div className="mb-4 flex justify-center">
                  <div className="p-3 bg-white rounded-lg shadow-sm group-hover:scale-110 transition-transform duration-300">
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
            <Card padding="lg" className="relative">
              <h2 className="text-3xl font-bold text-slate-900 mb-2">
                Send us a Message
              </h2>
              <p className="text-slate-600 mb-6">
                Fill out the form below and we'll get back to you promptly.
              </p>

              {/* Form Status Messages */}
              {formStatus.submitted && (
                <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg border-l-4 border-l-green-500 shadow-sm animate-fadeIn">
                  <div className="flex items-start">
                    <CheckCircle
                      className="text-green-500 mr-3 mt-0.5 flex-shrink-0"
                      size={24}
                    />
                    <div className="flex-1">
                      <p className="text-green-800 font-semibold text-lg">
                        Success! 🎉
                      </p>
                      <p className="text-green-700 mt-1">
                        {formStatus.message}
                      </p>
                      <div className="mt-3 text-sm text-green-600 space-y-1">
                        <p>✓ We've received your inquiry</p>
                        <p>✓ You'll receive a confirmation email shortly</p>
                        <p>✓ Our team will contact you within 24 hours</p>
                      </div>
                      <div className="mt-4 pt-4 border-t border-green-200">
                        <p className="text-green-600 text-sm">
                          <span className="font-semibold">Next:</span> Check
                          your inbox for our confirmation email. For immediate
                          assistance, call us at {companyInfo.phone}
                        </p>
                      </div>
                    </div>
                    <button
                      onClick={() =>
                        setFormStatus((prev) => ({ ...prev, submitted: false }))
                      }
                      className="text-green-400 hover:text-green-600 ml-2"
                    >
                      ✕
                    </button>
                  </div>
                </div>
              )}

              {formStatus.error && (
                <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg border-l-4 border-l-red-500 shadow-sm animate-fadeIn">
                  <div className="flex items-start">
                    <div className="flex-1">
                      <p className="text-red-800 font-semibold">
                        Submission Failed
                      </p>
                      <p className="text-red-600 text-sm mt-1">
                        {formStatus.message}
                      </p>
                      <p className="text-red-500 text-xs mt-2">
                        Please try again or contact us directly via email/phone.
                      </p>
                    </div>
                    <button
                      onClick={() =>
                        setFormStatus((prev) => ({ ...prev, error: false }))
                      }
                      className="text-red-400 hover:text-red-600 ml-2"
                    >
                      ✕
                    </button>
                  </div>
                </div>
              )}

              {/* Formspree Form */}
              <form onSubmit={handleFormSubmit} className="space-y-6">
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
                      className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition disabled:opacity-50 disabled:cursor-not-allowed"
                      required
                      disabled={formStatus.submitting}
                      placeholder="John"
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
                      className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition disabled:opacity-50 disabled:cursor-not-allowed"
                      required
                      disabled={formStatus.submitting}
                      placeholder="Doe"
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
                      className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition disabled:opacity-50 disabled:cursor-not-allowed"
                      required
                      disabled={formStatus.submitting}
                      placeholder="john@company.com"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Mobile Number
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <span className="text-slate-500">+91</span>
                      </div>
                      <input
                        type="tel"
                        name="mobile"
                        value={formData.mobile}
                        onChange={handleChange}
                        className="w-full pl-12 px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition disabled:opacity-50 disabled:cursor-not-allowed"
                        disabled={formStatus.submitting}
                        placeholder="98765 43210"
                        pattern="[0-9]{10}"
                        maxLength="10"
                      />
                    </div>
                    <p className="text-slate-500 text-xs mt-1">
                      Optional - For faster communication
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Company Name
                    </label>
                    <input
                      type="text"
                      name="company"
                      value={formData.company}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition disabled:opacity-50 disabled:cursor-not-allowed"
                      disabled={formStatus.submitting}
                      placeholder="Your Company"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Service Needed *
                    </label>
                    <select
                      name="service"
                      value={formData.service}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition disabled:opacity-50 disabled:cursor-not-allowed bg-white"
                      disabled={formStatus.submitting}
                      required
                    >
                      <option value="">Select a service</option>
                      {serviceOptions.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Project Budget *
                    </label>
                    <select
                      name="budget"
                      value={formData.budget}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition disabled:opacity-50 disabled:cursor-not-allowed bg-white"
                      disabled={formStatus.submitting}
                      required
                    >
                      <option value="">Select budget range</option>
                      {budgetOptions.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="flex items-end">
                    <div className="w-full">
                      <div className="flex items-center">
                        <input
                          type="checkbox"
                          name="sendCopy"
                          id="sendCopy"
                          checked={formData.sendCopy}
                          onChange={handleChange}
                          className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-slate-300 rounded"
                          disabled={formStatus.submitting}
                        />
                        <label
                          htmlFor="sendCopy"
                          className="ml-2 block text-sm text-slate-700"
                        >
                          Send me a copy of this message
                        </label>
                      </div>
                    </div>
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
                    className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition disabled:opacity-50 disabled:cursor-not-allowed"
                    placeholder="Tell us about your project: goals, requirements, timeline, and any specific challenges..."
                    required
                    disabled={formStatus.submitting}
                  ></textarea>
                  <p className="text-slate-500 text-xs mt-2">
                    Please provide as much detail as possible so we can better
                    understand your needs.
                  </p>
                </div>

                <div className="flex items-start">
                  <input
                    type="checkbox"
                    id="privacy"
                    required
                    className="mt-1 mr-3"
                    disabled={formStatus.submitting}
                  />
                  <label htmlFor="privacy" className="text-slate-600 text-sm">
                    I agree to the{" "}
                    <a
                      href="/privacy"
                      className="text-blue-600 hover:underline"
                    >
                      Privacy Policy
                    </a>{" "}
                    and consent to FriendlyDigitals contacting me about my
                    inquiry.
                  </label>
                </div>

                <div className="relative">
                  <Button
                    type="submit"
                    size="lg"
                    className="w-full"
                    disabled={formStatus.submitting}
                  >
                    {formStatus.submitting ? (
                      <>
                        <svg
                          className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          ></circle>
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          ></path>
                        </svg>
                        Sending Message...
                      </>
                    ) : (
                      "Send Message"
                    )}
                  </Button>

                  {/* Success message near button */}
                  {formStatus.submitted && (
                    <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-lg text-center animate-fadeIn">
                      <div className="flex items-center justify-center text-green-700">
                        <CheckCircle className="w-5 h-5 mr-2" />
                        <span className="font-medium">
                          Message Sent Successfully!
                        </span>
                      </div>
                      <p className="text-green-600 text-sm mt-1">
                        We'll contact you within 24 hours
                      </p>
                    </div>
                  )}
                </div>
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
                        Mon-Fri: 9AM-6PM IST
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

              <div className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-2xl p-8 text-white">
                <div className="flex items-start mb-4">
                  <div className="bg-white/20 p-2 rounded-lg mr-4">
                    <ArrowRight className="text-white" size={24} />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2">
                      What happens next?
                    </h3>
                    <p className="text-blue-100 text-sm">
                      1. We'll review your request within 2 hours
                      <br />
                      2. A specialist will contact you for details
                      <br />
                      3. We'll prepare a customized proposal
                      <br />
                      4. Schedule a kickoff meeting
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-r from-emerald-600 to-green-700 rounded-2xl p-8 text-white text-center">
                <h3 className="text-xl font-bold mb-4">Schedule a Call</h3>
                <p className="text-green-100 mb-6">
                  Prefer to talk directly? Book a free 30-minute consultation
                  with our experts.
                </p>
                <Button
                  href="https://calendly.com/vanshgarg4548/30min"
                  variant="white"
                  size="md"
                  icon={ArrowRight}
                  iconPosition="right"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:shadow-lg transition-all hover:-translate-y-0.5"
                >
                  Book Free Consultation
                </Button>
                <p className="text-green-200 text-xs mt-4">
                  No credit card required • Cancel anytime
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-slate-900 mb-12">
            Frequently Asked Questions
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              {
                q: "How quickly will you respond?",
                a: "We typically respond within 2 hours during business hours, and within 30 minutes for emergency support requests.",
              },
              {
                q: "What information should I provide?",
                a: "Please share your project goals, timeline, budget range, and any specific challenges you're facing for the most accurate response.",
              },
              {
                q: "Do you offer free consultations?",
                a: "Yes! We offer a free 30-minute initial consultation to discuss your project and see how we can help.",
              },
              {
                q: "What industries do you work with?",
                a: "We work with businesses across all industries including SaaS, e-commerce, healthcare, finance, education, and more.",
              },
            ].map((faq, index) => (
              <div
                key={index}
                className="bg-slate-50 rounded-xl p-6 hover:shadow-md transition-shadow"
              >
                <h4 className="font-semibold text-slate-900 mb-2">{faq.q}</h4>
                <p className="text-slate-600 text-sm">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default ContactPage;
