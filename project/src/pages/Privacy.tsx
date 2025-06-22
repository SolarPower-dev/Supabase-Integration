import React from 'react';

const Privacy: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="bg-white p-8 rounded-lg shadow-md">
          <h1 className="text-4xl font-bold text-gray-900 mb-8">Privacy Policy</h1>
          
          <div className="prose prose-lg max-w-none">
            <p className="text-gray-600 mb-6">
              <strong>Last updated:</strong> January 1, 2024
            </p>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">1. Information We Collect</h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                We collect information you provide directly to us, such as when you:
              </p>
              <ul className="list-disc list-inside text-gray-600 space-y-2 mb-4">
                <li>Create an account or make a purchase</li>
                <li>Subscribe to our newsletter</li>
                <li>Contact us for support</li>
                <li>Participate in surveys or promotions</li>
              </ul>
              <p className="text-gray-600 leading-relaxed">
                This may include your name, email address, phone number, shipping address, payment information, and any other information you choose to provide.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">2. How We Use Your Information</h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                We use the information we collect to:
              </p>
              <ul className="list-disc list-inside text-gray-600 space-y-2">
                <li>Process and fulfill your orders</li>
                <li>Communicate with you about your orders and account</li>
                <li>Provide customer support</li>
                <li>Send you marketing communications (with your consent)</li>
                <li>Improve our products and services</li>
                <li>Comply with legal obligations</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">3. Information Sharing</h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                We do not sell, trade, or otherwise transfer your personal information to third parties except in the following circumstances:
              </p>
              <ul className="list-disc list-inside text-gray-600 space-y-2">
                <li>With service providers who assist us in operating our business</li>
                <li>When required by law or to protect our rights</li>
                <li>In connection with a business transfer or merger</li>
                <li>With your explicit consent</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">4. Data Security</h2>
              <p className="text-gray-600 leading-relaxed">
                We implement appropriate security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. However, no method of transmission over the internet is 100% secure.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">5. Cookies and Tracking</h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                We use cookies and similar tracking technologies to:
              </p>
              <ul className="list-disc list-inside text-gray-600 space-y-2 mb-4">
                <li>Remember your preferences and settings</li>
                <li>Analyze website traffic and usage</li>
                <li>Provide personalized content and advertisements</li>
                <li>Improve our website functionality</li>
              </ul>
              <p className="text-gray-600 leading-relaxed">
                You can control cookies through your browser settings, but disabling cookies may affect website functionality.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">6. Your Rights</h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                Depending on your location, you may have the following rights regarding your personal information:
              </p>
              <ul className="list-disc list-inside text-gray-600 space-y-2">
                <li>Access and receive a copy of your personal information</li>
                <li>Correct inaccurate or incomplete information</li>
                <li>Delete your personal information</li>
                <li>Restrict or object to processing</li>
                <li>Data portability</li>
                <li>Withdraw consent</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">7. Children's Privacy</h2>
              <p className="text-gray-600 leading-relaxed">
                Our services are not intended for children under 13 years of age. We do not knowingly collect personal information from children under 13. If we become aware that we have collected personal information from a child under 13, we will take steps to delete such information.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">8. International Transfers</h2>
              <p className="text-gray-600 leading-relaxed">
                Your information may be transferred to and processed in countries other than your own. We ensure appropriate safeguards are in place to protect your information in accordance with this privacy policy.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">9. Changes to This Policy</h2>
              <p className="text-gray-600 leading-relaxed">
                We may update this privacy policy from time to time. We will notify you of any changes by posting the new policy on this page and updating the "Last updated" date.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">10. Contact Us</h2>
              <p className="text-gray-600 leading-relaxed">
                If you have any questions about this Privacy Policy, please contact us at:
              </p>
              <div className="mt-4 p-4 bg-gray-50 rounded-md">
                <p className="text-gray-600">
                  <strong>Email:</strong> privacy@dunevolt.ae<br />
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

export default Privacy;