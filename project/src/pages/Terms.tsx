import React from 'react';

const Terms: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="bg-white p-8 rounded-lg shadow-md">
          <h1 className="text-4xl font-bold text-gray-900 mb-8">Terms & Conditions</h1>
          
          <div className="prose prose-lg max-w-none">
            <p className="text-gray-600 mb-6">
              <strong>Last updated:</strong> January 1, 2024
            </p>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">1. Agreement to Terms</h2>
              <p className="text-gray-600 leading-relaxed">
                By accessing and using DuneVolt's website and services, you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to abide by the above, please do not use this service.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">2. Products and Services</h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                DuneVolt provides premium off-grid solar equipment including but not limited to:
              </p>
              <ul className="list-disc list-inside text-gray-600 space-y-2 mb-4">
                <li>Portable solar panels</li>
                <li>Solar power banks and power stations</li>
                <li>Solar-powered lighting equipment</li>
                <li>Related accessories and components</li>
              </ul>
              <p className="text-gray-600 leading-relaxed">
                All products are subject to availability and we reserve the right to discontinue any product at any time.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">3. Pricing and Payment</h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                All prices are listed in USD and are subject to change without notice. We accept major credit cards and other payment methods as displayed during checkout.
              </p>
              <p className="text-gray-600 leading-relaxed">
                Payment must be received in full before products are shipped. We reserve the right to refuse or cancel orders at our discretion.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">4. Shipping and Delivery</h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                We ship worldwide with varying delivery times based on location:
              </p>
              <ul className="list-disc list-inside text-gray-600 space-y-2 mb-4">
                <li>UAE: 3-7 business days</li>
                <li>GCC Countries: 5-10 business days</li>
                <li>International: 7-21 business days</li>
              </ul>
              <p className="text-gray-600 leading-relaxed">
                Shipping costs are calculated at checkout. Free shipping is available for orders over specified amounts as indicated on our website.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">5. Returns and Refunds</h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                We offer a 30-day return policy for unused products in original packaging. To initiate a return:
              </p>
              <ul className="list-disc list-inside text-gray-600 space-y-2 mb-4">
                <li>Contact our customer service within 30 days of delivery</li>
                <li>Obtain a return authorization number</li>
                <li>Ship the product back in original packaging</li>
                <li>Include all accessories and documentation</li>
              </ul>
              <p className="text-gray-600 leading-relaxed">
                Refunds will be processed within 5-7 business days after we receive and inspect the returned item.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">6. Warranty</h2>
              <p className="text-gray-600 leading-relaxed">
                All DuneVolt products come with a manufacturer warranty as specified for each product. Warranty covers defects in materials and workmanship under normal use. Warranty does not cover damage from misuse, accidents, or normal wear and tear.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">7. Limitation of Liability</h2>
              <p className="text-gray-600 leading-relaxed">
                DuneVolt shall not be liable for any indirect, incidental, special, consequential, or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from your use of our products or services.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">8. Privacy Policy</h2>
              <p className="text-gray-600 leading-relaxed">
                Your privacy is important to us. Please review our Privacy Policy, which also governs your use of our services, to understand our practices.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">9. Governing Law</h2>
              <p className="text-gray-600 leading-relaxed">
                These terms shall be interpreted and governed in accordance with the laws of the United Arab Emirates, without regard to its conflict of law provisions.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">10. Contact Information</h2>
              <p className="text-gray-600 leading-relaxed">
                If you have any questions about these Terms & Conditions, please contact us at:
              </p>
              <div className="mt-4 p-4 bg-gray-50 rounded-md">
                <p className="text-gray-600">
                  <strong>Email:</strong> legal@dunevolt.ae<br />
                  <strong>Phone:</strong> +971 50 123 4567<br />
                  <strong>Address:</strong> Dubai, United Arab Emirates
                </p>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Terms;