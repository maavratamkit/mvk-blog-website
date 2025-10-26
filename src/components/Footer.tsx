import React from 'react';
import { Mail, Phone, MapPin, Instagram, Heart } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gradient-to-br from-gray-900 to-gray-800 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-red-600 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-lg">म</span>
              </div>
              <div>
                <h3 className="text-xl font-bold">Maa Vratam Kit</h3>
                <p className="text-sm text-gray-300">Sacred Pooja Collections</p>
              </div>
            </div>
            <p className="text-gray-300 leading-relaxed">
              Bringing authentic spiritual experiences to your doorstep with carefully curated vratam kits and pooja essentials.
            </p>
            <div className="space-y-2">
              <a 
                href="https://www.instagram.com/maavratamkit/?hl=en" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center space-x-2 text-gray-400 hover:text-orange-400 transition-colors"
              >
                <Instagram className="w-5 h-5" />
                <span className="text-sm">@maavratamkit</span>
              </a>
              <a 
                href="https://www.instagram.com/praggnasdiary/?hl=en" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center space-x-2 text-gray-400 hover:text-orange-400 transition-colors"
              >
                <Instagram className="w-5 h-5" />
                <span className="text-sm">@praggnasdiary</span>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-6 text-orange-400">Quick Links</h4>
            <ul className="space-y-3">
              <li><Link to="/" className="text-gray-300 hover:text-white transition-colors">Home</Link></li>
              <li><Link to="/about" className="text-gray-300 hover:text-white transition-colors">About Us</Link></li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h4 className="text-lg font-semibold mb-6 text-orange-400">Our Collections</h4>
            <ul className="space-y-3">
              <li>
                <Link to="/category/shree-sai-baba-vratam-kits" className="text-gray-300 hover:text-white transition-colors">
                  Sai Baba Vratam Kits
                </Link>
              </li>
              <li>
                <Link to="/category/shree-swami-samarth-kits" className="text-gray-300 hover:text-white transition-colors">
                  Swami Samarth Kits
                </Link>
              </li>
              <li>
                <Link to="/category/shree-dattatreya-vratam" className="text-gray-300 hover:text-white transition-colors">
                  Dattatreya Vratam
                </Link>
              </li>
              <li>
                <Link to="/category/shree-ganesha-kits" className="text-gray-300 hover:text-white transition-colors">
                  Ganesha Collections
                </Link>
              </li>
              <li>
                <Link to="/category/shree-krishna-vratam" className="text-gray-300 hover:text-white transition-colors">
                  Krishna Vratam
                </Link>
              </li>
              <li>
                <Link to="/category/shree-hanuman-kits" className="text-gray-300 hover:text-white transition-colors">
                  Hanuman Kits
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold mb-6 text-orange-400">Contact Us</h4>
            <ul className="space-y-4">
              <li className="flex items-start space-x-3">
                <MapPin className="w-5 h-5 text-orange-400 mt-0.5 flex-shrink-0" />
                <span className="text-gray-300">
                  123 Temple Street,<br />
                  Spiritual District,<br />
                  Mumbai, Maharashtra 400001
                </span>
              </li>
              <li className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-orange-400 flex-shrink-0" />
                <span className="text-gray-300">+91 9876543210</span>
              </li>
              <li className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-orange-400 flex-shrink-0" />
                <span className="text-gray-300">info@maavratamkit.com</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-700 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between text-center md:text-left">
            <p className="text-gray-400 text-sm mb-4 md:mb-0">
              © {currentYear} Maa Vratam Kit. All rights reserved.
            </p>
            <div className="flex items-center space-x-1 text-gray-400 text-sm">
              <span>Made with</span>
              <Heart className="w-4 h-4 text-red-500 fill-current mx-1" />
              <span>for spiritual devotion</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer;