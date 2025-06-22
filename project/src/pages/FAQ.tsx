import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

interface FAQItem {
  question: string;
  answer: string;
  category: string;
}

const FAQ: React.FC = () => {
  const [openItems, setOpenItems] = useState<number[]>([]);
  const [selectedCategory, setSelectedCategory] = useState('All');

  const faqData: FAQItem[] = [
    {
      question: "How long do DuneVolt solar panels last?",
      answer: "Our solar panels are built to last 25+ years with proper care. They come with a 2-year manufacturer warranty and are designed to withstand extreme desert conditions including sand storms, high temperatures, and UV exposure.",
      category: "Products"
    },
    {
      question: "Can I use DuneVolt products in extreme weather conditions?",
      answer: "Absolutely! All DuneVolt products are desert-tested and built to military specifications. They can operate in temperatures from -20°C to 70°C and are rated IP65 or higher for dust and water resistance.",
      category: "Products"
    },
    {
      question: "What's included with my solar panel purchase?",
      answer: "Each solar panel comes with the panel itself, charging cables (USB-A, USB-C, and DC outputs), kickstand for positioning, user manual, and carrying case. Power banks and stations include additional accessories specific to each model.",
      category: "Products"
    },
    {
      question: "How do I track my order?",
      answer: "Once your order ships, you'll receive a tracking number via email. You can track your package through our website or directly with the shipping carrier. Orders typically take 3-7 business days for UAE delivery and 7-14 days internationally.",
      category: "Shipping"
    },
    {
      question: "Do you offer international shipping?",
      answer: "Yes! We ship to over 50 countries worldwide. Shipping costs and delivery times vary by location. Free shipping is available for orders over $200 within the UAE, and over $500 internationally.",
      category: "Shipping"
    },
    {
      question: "What if my product arrives damaged?",
      answer: "If your product arrives damaged, please contact us within 48 hours with photos of the damage. We'll arrange for immediate replacement or repair at no cost to you. All products are insured during shipping.",
      category: "Shipping"
    },
    {
      question: "How long is the warranty on DuneVolt products?",
      answer: "All DuneVolt products come with a 2-year manufacturer warranty covering defects in materials and workmanship. Solar panels have an additional 20-year performance guarantee. Extended warranty options are available.",
      category: "Warranty"
    },
    {
      question: "What does the warranty cover?",
      answer: "Our warranty covers manufacturing defects, component failures, and performance issues. It does not cover damage from misuse, accidents, or normal wear and tear. Water damage from submersion is not covered (products are splash-resistant, not waterproof).",
      category: "Warranty"
    },
    {
      question: "How do I make a warranty claim?",
      answer: "Contact our support team with your order number, photos of the issue, and a description of the problem. We'll guide you through the warranty process, which typically involves either repair, replacement, or refund depending on the situation.",
      category: "Warranty"
    },
    {
      question: "Can I return a product if I'm not satisfied?",
      answer: "Yes! We offer a 30-day return policy for all products in original condition. Products must be returned in original packaging with all accessories. Return shipping is free for defective products; customer pays return shipping for change of mind returns.",
      category: "Returns"
    },
    {
      question: "How do I initiate a return?",
      answer: "Contact our customer service team to request a return authorization. We'll provide you with a return shipping label and instructions. Once we receive and inspect the returned item, we'll process your refund within 5-7 business days.",
      category: "Returns"
    },
    {
      question: "Are there any items that cannot be returned?",
      answer: "Custom or personalized products cannot be returned unless defective. Products damaged by misuse or normal wear cannot be returned. All other products are eligible for return within 30 days of purchase.",
      category: "Returns"
    },
    {
      question: "How do I choose the right solar panel for my needs?",
      answer: "Consider your power requirements, portability needs, and usage environment. Our 50W panel is great for day trips and light devices. The 100W panel is perfect for extended camping and multiple devices. For base camps or RVs, consider our power stations.",
      category: "Technical"
    },
    {
      question: "Can I connect multiple solar panels together?",
      answer: "Yes, many of our panels can be daisy-chained for increased power output. Check your specific model's manual for connection instructions. Always ensure voltage compatibility when connecting multiple panels.",
      category: "Technical"
    },
    {
      question: "How do I maintain my solar equipment?",
      answer: "Keep panels clean with a soft cloth and mild soap. Avoid abrasive cleaners. Store in a cool, dry place when not in use. Check connections regularly for corrosion. Battery-powered devices should be charged every 3 months if stored long-term.",
      category: "Technical"
    }
  ];

  const categories = ['All', ...new Set(faqData.map(item => item.category))];

  const filteredFAQ = selectedCategory === 'All' 
    ? faqData 
    : faqData.filter(item => item.category === selectedCategory);

  const toggleItem = (index: number) => {
    setOpenItems(prev => 
      prev.includes(index) 
        ? prev.filter(i => i !== index)
        : [...prev, index]
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <section className="bg-gradient-to-br from-desert-100 via-sunset-50 to-teal-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            Frequently Asked Questions
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Find answers to common questions about our solar products, shipping, warranty, and more.
          </p>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Category Filter */}
        <div className="mb-8">
          <div className="flex flex-wrap gap-2 justify-center">
            {categories.map(category => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  selectedCategory === category
                    ? 'bg-sunset-500 text-white'
                    : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-300'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* FAQ Items */}
        <div className="space-y-4">
          {filteredFAQ.map((item, index) => (
            <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden">
              <button
                onClick={() => toggleItem(index)}
                className="w-full px-6 py-4 text-left flex justify-between items-center hover:bg-gray-50 transition-colors"
              >
                <h3 className="text-lg font-semibold text-gray-900 pr-4">
                  {item.question}
                </h3>
                {openItems.includes(index) ? (
                  <ChevronUp className="w-5 h-5 text-gray-500 flex-shrink-0" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-gray-500 flex-shrink-0" />
                )}
              </button>
              
              {openItems.includes(index) && (
                <div className="px-6 pb-4">
                  <div className="border-t pt-4">
                    <p className="text-gray-600 leading-relaxed">
                      {item.answer}
                    </p>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Contact Section */}
        <div className="mt-16 bg-white p-8 rounded-lg shadow-md text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Still have questions?
          </h2>
          <p className="text-gray-600 mb-6">
            Our support team is here to help you find the perfect solar solution for your needs.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/contact"
              className="bg-sunset-500 hover:bg-sunset-600 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
            >
              Contact Support
            </a>
            <a
              href="https://wa.me/971501234567"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
            >
              WhatsApp Chat
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FAQ;