import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Heart, Star, Users } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Category } from '../types/Category';

interface AboutPageProps {
  categories: Category[];
}

const AboutPage: React.FC<AboutPageProps> = ({ categories }) => {
  return (
    <div className="min-h-screen bg-white">
      <Header categories={categories} />
      
      <main className="py-12 bg-gradient-to-b from-orange-50 to-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Back Button */}
          <Link 
            to="/"
            className="inline-flex items-center space-x-2 text-gray-600 hover:text-orange-600 transition-colors mb-8"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Back to Home</span>
          </Link>

          {/* Page Header */}
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent mb-6">
              About Maa Vratam Kit
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Bringing authentic spiritual experiences to your doorstep with love and devotion
            </p>
          </div>

          {/* Main Content */}
          <div className="bg-white rounded-2xl shadow-lg p-8 lg:p-12 mb-12">
            <div className="space-y-8">
              {/* Our Story */}
              <div>
                <div className="flex items-center space-x-3 mb-6">
                  <Heart className="w-8 h-8 text-orange-500" />
                  <h2 className="text-3xl font-bold text-gray-800">Our Story</h2>
                </div>
                <p className="text-lg text-gray-700 leading-relaxed mb-6">
                  Maa Vratam Kit was born from a simple yet profound realization - in our busy modern lives, 
                  finding authentic spiritual items for our sacred rituals had become increasingly challenging. 
                  As devotees ourselves, we often found ourselves running from shop to shop, trying to gather 
                  all the necessary items for our vratams and pujas, only to discover that something was always missing.
                </p>
                <p className="text-lg text-gray-700 leading-relaxed">
                  That's when we decided to create something special - a place where every spiritual seeker 
                  could find everything they need for their sacred practices, all in one beautifully curated kit. 
                  We wanted to remove the stress of preparation and let devotees focus on what truly matters - 
                  their connection with the divine.
                </p>
              </div>

              {/* Our Mission */}
              <div>
                <div className="flex items-center space-x-3 mb-6">
                  <Star className="w-8 h-8 text-orange-500" />
                  <h2 className="text-3xl font-bold text-gray-800">Our Mission</h2>
                </div>
                <p className="text-lg text-gray-700 leading-relaxed mb-6">
                  Our aim is beautifully simple - to make authentic spiritual practices accessible to everyone, 
                  everywhere. We believe that devotion shouldn't be complicated by logistics. Whether you're 
                  a seasoned practitioner or just beginning your spiritual journey, we want to ensure that 
                  you have everything you need to worship with complete peace of mind.
                </p>
                <p className="text-lg text-gray-700 leading-relaxed">
                  Every item in our kits is carefully selected, blessed, and sourced from traditional suppliers 
                  who understand the sacred significance of these materials. We're not just selling products - 
                  we're sharing a piece of our devotion with yours, creating a bridge between ancient traditions 
                  and modern convenience.
                </p>
              </div>

              {/* What Makes Us Special */}
              <div>
                <div className="flex items-center space-x-3 mb-6">
                  <Users className="w-8 h-8 text-orange-500" />
                  <h2 className="text-3xl font-bold text-gray-800">What Makes Us Special</h2>
                </div>
                <p className="text-lg text-gray-700 leading-relaxed">
                  We're not just another online store - we're a family of devotees serving other devotees. 
                  Each kit is prepared with the same care and attention we would give to our own family's 
                  spiritual needs. We understand that these aren't just products; they're sacred tools that 
                  help you connect with the divine, and we treat them with the reverence they deserve.
                </p>
              </div>
            </div>
          </div>

          {/* Call to Action */}
          <div className="text-center bg-gradient-to-r from-orange-500 to-red-600 rounded-2xl p-8 text-white">
            <h3 className="text-2xl font-bold mb-4">Ready to Begin Your Spiritual Journey?</h3>
            <p className="text-lg mb-6 opacity-90">
              Explore our carefully curated collections and find the perfect kit for your devotional practices.
            </p>
            <Link 
              to="/"
              className="inline-block bg-white text-orange-600 px-8 py-3 rounded-full font-semibold hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 shadow-lg"
            >
              Explore Our Collections
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default AboutPage;