import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Loader2, AlertCircle, RefreshCw } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useSlides } from '../hooks/useSlides';

const HeroSlideshow: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  
  // Use React Query hook for fetching slides
  const { 
    data: slides = [], 
    isLoading: loading, 
    error, 
    refetch: handleRetry 
  } = useSlides();

  useEffect(() => {
    if (slides.length === 0) return;
    
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [slides.length]);

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  const goToPrevious = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const goToNext = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  // Show loading state
  if (loading) {
    return (
      <section className="relative h-96 md:h-[500px] lg:h-[600px] overflow-hidden bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-12 h-12 text-orange-500 animate-spin mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-700 mb-2">Loading Slideshow...</h3>
          <p className="text-gray-500">Please wait while we fetch the latest updates</p>
        </div>
      </section>
    );
  }

  // Show error state
  if (error) {
    return (
      <section className="relative h-96 md:h-[500px] lg:h-[600px] overflow-hidden bg-gray-100 flex items-center justify-center">
        <div className="text-center max-w-md mx-auto px-4">
          <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-6" />
          <h3 className="text-2xl font-bold text-gray-800 mb-4">Unable to Load Slideshow</h3>
          <p className="text-gray-600 mb-6 leading-relaxed">{error.message}</p>
          <button
            onClick={() => handleRetry()}
            className="bg-gradient-to-r from-orange-500 to-red-600 text-white px-6 py-3 rounded-lg font-semibold hover:from-orange-600 hover:to-red-700 transition-all duration-300 transform hover:scale-105 shadow-md flex items-center space-x-2 mx-auto"
          >
            <RefreshCw className="w-5 h-5" />
            <span>Try Again</span>
          </button>
        </div>
      </section>
    );
  }

  // Show empty state if no slides
  if (slides.length === 0) {
    return (
      <section className="relative h-96 md:h-[500px] lg:h-[600px] overflow-hidden bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <h3 className="text-xl font-semibold text-gray-700 mb-2">No slides available</h3>
          <p className="text-gray-500">Please check back later</p>
        </div>
      </section>
    );
  }

  return (
    <section className="relative h-96 md:h-[500px] lg:h-[600px] overflow-hidden">
      {slides.map((slide, index) => (
        <div
          key={slide.id}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            index === currentSlide ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <div className="relative h-full">
            <img
              src={slide.image}
              alt={slide.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="max-w-lg text-white">
                  <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-8 leading-tight">
                    {slide.title}
                  </h2>
                  <Link
                    to={slide.link}
                    className="inline-block bg-gradient-to-r from-orange-500 to-red-600 text-white px-8 py-3 rounded-full font-semibold text-lg hover:from-orange-600 hover:to-red-700 transform hover:scale-105 transition-all duration-300 shadow-lg"
                  >
                    {slide.cta}
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}

      {/* Navigation Arrows */}
      {slides.length > 1 && (
        <>
          <button
            onClick={goToPrevious}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-80 hover:bg-opacity-100 text-gray-800 p-2 rounded-full transition-all duration-300 shadow-lg hover:scale-110"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          <button
            onClick={goToNext}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-80 hover:bg-opacity-100 text-gray-800 p-2 rounded-full transition-all duration-300 shadow-lg hover:scale-110"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </>
      )}

      {/* Dots Indicator */}
      {slides.length > 1 && (
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentSlide 
                  ? 'bg-white scale-125' 
                  : 'bg-white bg-opacity-50 hover:bg-opacity-75'
              }`}
            />
          ))}
        </div>
      )}
    </section>
  );
};

export default HeroSlideshow;