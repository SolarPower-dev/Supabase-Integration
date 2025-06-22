import React from 'react';
import { Sun, Zap, Target, Award, Users, Globe } from 'lucide-react';

const About: React.FC = () => {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-desert-100 via-sunset-50 to-teal-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-5xl font-bold text-gray-900 mb-6">
              About DuneVolt
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              We're passionate about empowering adventurers with reliable, sustainable power solutions. 
              Born from the desert, built for the world.
            </p>
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:grid lg:grid-cols-2 lg:gap-16 items-center">
            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-6">Our Story</h2>
              <div className="space-y-4 text-gray-600 leading-relaxed">
                <p>
                  DuneVolt was founded in 2024 by a team of engineers and outdoor enthusiasts who 
                  understood the challenges of staying powered during desert expeditions and off-grid adventures.
                </p>
                <p>
                  Based in the UAE, we've experienced firsthand the extreme conditions that solar equipment 
                  must endure - scorching heat, sand storms, and the relentless desert sun. This drove us 
                  to create products that don't just survive these conditions, but thrive in them.
                </p>
                <p>
                  Every DuneVolt product is desert-tested and built to military specifications, ensuring 
                  you have reliable power no matter where your adventures take you.
                </p>
              </div>
            </div>
            <div className="mt-12 lg:mt-0">
              <img
                src="https://images.pexels.com/photos/2387793/pexels-photo-2387793.jpeg?auto=compress&cs=tinysrgb&w=800"
                alt="Desert landscape with solar equipment"
                className="w-full h-96 object-cover rounded-lg shadow-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12">
            <div className="text-center">
              <div className="bg-sunset-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <Target className="w-8 h-8 text-sunset-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Our Mission</h3>
              <p className="text-gray-600 leading-relaxed">
                To provide adventurers and professionals with the most reliable, efficient, and durable 
                solar power solutions, enabling them to explore further and achieve more while staying 
                connected to what matters most.
              </p>
            </div>
            <div className="text-center">
              <div className="bg-teal-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <Zap className="w-8 h-8 text-teal-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Our Vision</h3>
              <p className="text-gray-600 leading-relaxed">
                To be the world's leading provider of desert-tested solar equipment, inspiring a new 
                generation of sustainable adventurers who can explore the planet without compromising 
                their environmental values.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Values</h2>
            <p className="text-xl text-gray-600">The principles that guide everything we do</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-6">
              <div className="bg-desert-200 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="w-8 h-8 text-desert-700" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Quality First</h3>
              <p className="text-gray-600">
                We never compromise on quality. Every product is rigorously tested to ensure 
                it meets our exacting standards for performance and durability.
              </p>
            </div>
            
            <div className="text-center p-6">
              <div className="bg-sunset-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Sun className="w-8 h-8 text-sunset-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Sustainability</h3>
              <p className="text-gray-600">
                We're committed to creating products that harness clean, renewable energy, 
                helping reduce our collective environmental footprint.
              </p>
            </div>
            
            <div className="text-center p-6">
              <div className="bg-teal-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-teal-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Customer Focus</h3>
              <p className="text-gray-600">
                Our customers are at the heart of everything we do. We listen to their needs 
                and continuously innovate to exceed their expectations.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Global Reach */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
              <Globe className="w-8 h-8 text-blue-600" />
            </div>
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Global Reach</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              While we're proudly based in the UAE, we serve adventurers worldwide with fast, 
              reliable shipping and dedicated customer support in multiple time zones.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-sunset-500 mb-2">50+</div>
              <div className="text-gray-600">Countries Served</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-sunset-500 mb-2">10,000+</div>
              <div className="text-gray-600">Happy Customers</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-sunset-500 mb-2">24/7</div>
              <div className="text-gray-600">Customer Support</div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-gradient-to-r from-sunset-500 to-teal-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            Ready to Power Your Next Adventure?
          </h2>
          <p className="text-xl text-white mb-8 max-w-2xl mx-auto">
            Join thousands of adventurers who trust DuneVolt for their off-grid power needs. 
            Explore our range of desert-tested solar equipment today.
          </p>
          <a
            href="/shop"
            className="bg-white text-sunset-600 px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-colors inline-block"
          >
            Shop Now
          </a>
        </div>
      </section>
    </div>
  );
};

export default About;