import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { slugify } from '../utils/slugify';
import { Category } from '../types/Category';

interface CategoryCarouselProps {
  categories: Category[];
}

const CategoryCarousel: React.FC<CategoryCarouselProps> = ({ categories }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const goToPrevious = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentIndex((prev) => (prev - 1 + categories.length) % categories.length);
    setTimeout(() => setIsTransitioning(false), 600);
  };

  const goToNext = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentIndex((prev) => (prev + 1) % categories.length);
    setTimeout(() => setIsTransitioning(false), 600);
  };

  const goToSlide = (index: number) => {
    if (isTransitioning || index === currentIndex) return;
    setIsTransitioning(true);
    setCurrentIndex(index);
    setTimeout(() => setIsTransitioning(false), 600);
  };

  return (
    <section className="py-20 bg-gradient-to-b from-orange-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent mb-6">
            Our Sacred Collections
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Discover our carefully curated vratam kits, each designed to enhance your spiritual journey with authentic and blessed items.
          </p>
        </div>

        <div className="relative">
          {/* Desktop View - 3 cards */}
          <div className="hidden lg:block">
            <div className="overflow-hidden rounded-2xl">
              <div 
                className="flex transition-transform duration-600 ease-out"
                style={{ transform: `translateX(-${currentIndex * (100 / 3)}%)` }}
              >
                {categories.map((category) => (
                  <div key={category.id} className="w-1/3 flex-shrink-0 px-4">
                    <CategoryCard category={category} />
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Tablet View - 2 cards */}
          <div className="hidden md:block lg:hidden">
            <div className="overflow-hidden rounded-2xl">
              <div 
                className="flex transition-transform duration-600 ease-out"
                style={{ transform: `translateX(-${currentIndex * 50}%)` }}
              >
                {categories.map((category) => (
                  <div key={category.id} className="w-1/2 flex-shrink-0 px-3">
                    <CategoryCard category={category} />
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Mobile View - 1 card */}
          <div className="md:hidden">
            <div className="overflow-hidden rounded-2xl">
              <div 
                className="flex transition-transform duration-600 ease-out"
                style={{ transform: `translateX(-${currentIndex * 100}%)` }}
              >
                {categories.map((category) => (
                  <div key={category.id} className="w-full flex-shrink-0 px-2">
                    <CategoryCard category={category} />
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Navigation Arrows */}
          <button
            onClick={goToPrevious}
            disabled={isTransitioning}
            className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-6 bg-white shadow-xl p-4 rounded-full hover:bg-gray-50 transition-all duration-300 hover:scale-110 disabled:opacity-50 disabled:cursor-not-allowed z-10 group"
          >
            <ChevronLeft className="w-6 h-6 text-gray-600 group-hover:text-orange-600 transition-colors" />
          </button>

          <button
            onClick={goToNext}
            disabled={isTransitioning}
            className="absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-6 bg-white shadow-xl p-4 rounded-full hover:bg-gray-50 transition-all duration-300 hover:scale-110 disabled:opacity-50 disabled:cursor-not-allowed z-10 group"
          >
            <ChevronRight className="w-6 h-6 text-gray-600 group-hover:text-orange-600 transition-colors" />
          </button>

          {/* Dots Indicator */}
          <div className="flex justify-center mt-12 space-x-3">
            {categories.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                disabled={isTransitioning}
                className={`transition-all duration-300 rounded-full disabled:cursor-not-allowed ${
                  index === currentIndex 
                    ? 'w-12 h-3 bg-gradient-to-r from-orange-500 to-red-500 scale-110 shadow-lg' 
                    : 'w-3 h-3 bg-gray-300 hover:bg-gray-400 hover:scale-110'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

interface CategoryCardProps {
  category: Category;
}

const CategoryCard: React.FC<CategoryCardProps> = ({ category }) => {
  return (
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden transform hover:scale-105 transition-all duration-500 hover:shadow-2xl group flex flex-col">
      <div className="relative aspect-[4/3] overflow-hidden bg-gradient-to-br from-orange-50 via-red-50 to-orange-100">
        <img
          src={category.image}
          alt={category.title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          style={{ objectPosition: 'center 40%' }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-300"></div>
      </div>
      <div className="p-6 flex-1 flex flex-col">
        <h3 className="text-xl font-bold text-gray-800 mb-3 leading-tight">
          {category.title}
        </h3>
        <p className="text-gray-600 mb-6 leading-relaxed flex-1">
          {category.description}
        </p>
        <Link
          to={`/category/${slugify(category.title)}`}
          className="block w-full bg-gradient-to-r from-orange-500 to-red-600 text-white py-3 px-6 rounded-xl font-semibold hover:from-orange-600 hover:to-red-700 transition-all duration-300 transform hover:scale-105 shadow-md hover:shadow-lg active:scale-95 mt-auto text-center"
        >
          Explore Now
        </Link>
      </div>
    </div>
  );
};

export default CategoryCarousel;