import React, { useState } from 'react';
import { Mail, Phone, MapPin, Clock, Send } from 'lucide-react';

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission here
    console.log('Form submitted:', formData);
    alert('Thank you for your message! We\'ll get back to you within 24 hours.');
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <section className="bg-gradient-to-br from-desert-100 via-sunset-50 to-teal-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">Contact Us</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Have questions about our solar products? Need technical support? 
            We're here to help power your adventures.
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid lg:grid-cols-3 gap-12">
          {/* Contact Information */}
          <div className="lg:col-span-1">
            <h2 className="text-2xl font-bold text-gray-900 mb-8">Get in Touch</h2>
            
            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <div className="bg-sunset-100 p-3 rounded-lg">
                  <Mail className="w-6 h-6 text-sunset-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Email</h3>
                  <p className="text-gray-600">info@dunevolt.ae</p>
                  <p className="text-gray-600">support@dunevolt.ae</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="bg-teal-100 p-3 rounded-lg">
                  <Phone className="w-6 h-6 text-teal-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Phone</h3>
                  <p className="text-gray-600">+971 50 123 4567</p>
                  <p className="text-gray-600">+971 4 567 8900</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="bg-desert-200 p-3 rounded-lg">
                  <MapPin className="w-6 h-6 text-desert-700" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Address</h3>
                  <p className="text-gray-600">
                    Dubai, United Arab Emirates<br />
                    Available worldwide via shipping
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="bg-blue-100 p-3 rounded-lg">
                  <Clock className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Business Hours</h3>
                  <p className="text-gray-600">
                    Sunday - Thursday: 9:00 AM - 6:00 PM GST<br />
                    Friday - Saturday: 10:00 AM - 4:00 PM GST
                  </p>
                  <p className="text-sm text-gray-500 mt-1">
                    24/7 Support available via WhatsApp
                  </p>
                </div>
              </div>
            </div>

            {/* Quick Contact Options */}
            <div className="mt-8 p-6 bg-white rounded-lg shadow-md">
              <h3 className="font-semibold text-gray-900 mb-4">Quick Contact</h3>
              <div className="space-y-3">
                <a
                  href="tel:+971501234567"
                  className="block w-full bg-sunset-500 hover:bg-sunset-600 text-white py-2 px-4 rounded-md transition-colors text-center"
                >
                  Call Now
                </a>
                <a
                  href="https://wa.me/971501234567"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded-md transition-colors text-center"
                >
                  WhatsApp
                </a>
                <a
                  href="mailto:info@dunevolt.ae"
                  className="block w-full bg-gray-600 hover:bg-gray-700 text-white py-2 px-4 rounded-md transition-colors text-center"
                >
                  Send Email
                </a>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2">
            <div className="bg-white p-8 rounded-lg shadow-md">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Send us a Message</h2>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-sunset-500 focus:border-transparent"
                      placeholder="Your full name"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-sunset-500 focus:border-transparent"
                      placeholder="your.email@example.com"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                    Subject *
                  </label>
                  <select
                    id="subject"
                    name="subject"
                    required
                    value={formData.subject}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-sunset-500 focus:border-transparent"
                  >
                    <option value="">Select a subject</option>
                    <option value="product-inquiry">Product Inquiry</option>
                    <option value="technical-support">Technical Support</option>
                    <option value="order-status">Order Status</option>
                    <option value="warranty-claim">Warranty Claim</option>
                    <option value="partnership">Partnership Opportunity</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                    Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={6}
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-sunset-500 focus:border-transparent resize-vertical"
                    placeholder="Please describe your inquiry in detail..."
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-sunset-500 hover:bg-sunset-600 text-white py-3 px-6 rounded-md font-semibold transition-colors flex items-center justify-center space-x-2"
                >
                  <Send className="w-5 h-5" />
                  <span>Send Message</span>
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;