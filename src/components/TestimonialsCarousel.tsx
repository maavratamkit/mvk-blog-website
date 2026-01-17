import React, { useState, useEffect } from 'react';
import { Quote, ChevronLeft, ChevronRight, Loader2, AlertCircle, RefreshCw, MapPin, User } from 'lucide-react';
import { useTestimonials } from '../hooks/useTestimonials';

const TestimonialsCarousel: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  // Use React Query hook for fetching testimonials
  const { 
    data: testimonials = [], 
    isLoading: loading, 
    error, 
    refetch: handleRetry 
  } = useTestimonials();

  useEffect(() => {
    if (isAutoPlaying && testimonials.length > 0) {
      const timer = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % testimonials.length);
      }, 4000);
      return () => clearInterval(timer);
    }
  }, [isAutoPlaying, testimonials]);

  const goToPrevious = () => {
    if (testimonials.length === 0) return;
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  const goToNext = () => {
    if (testimonials.length === 0) return;
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  const goToSlide = (index: number) => {
    if (testimonials.length === 0) return;
    setCurrentIndex(index);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  // Show loading state
  if (loading) {
    return (
      <section className="py-20 bg-gradient-to-br from-amber-50 via-orange-50 to-red-50 relative overflow-hidden">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent mb-4">
              Sacred Stories from Devotees
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Discover how our vratam kits have enriched the spiritual journeys of thousands of families across India
            </p>
          </div>
          <div className="flex items-center justify-center py-20">
            <div className="text-center">
              <Loader2 className="w-12 h-12 text-orange-500 animate-spin mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-700 mb-2">Loading Testimonials...</h3>
              <p className="text-gray-500">Please wait while we fetch devotee stories</p>
            </div>
          </div>
        </div>
      </section>
    );
  }

  // Show error state
  if (error) {
    return (
      <section className="py-20 bg-gradient-to-br from-amber-50 via-orange-50 to-red-50 relative overflow-hidden">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent mb-4">
              Sacred Stories from Devotees
            </h2>
          </div>
          <div className="flex items-center justify-center py-20">
            <div className="text-center max-w-md mx-auto">
              <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-6" />
              <h3 className="text-2xl font-bold text-gray-800 mb-4">Unable to Load Testimonials</h3>
              <p className="text-gray-600 mb-6 leading-relaxed">{error.message}</p>
              <button
                onClick={() => handleRetry()}
                className="bg-gradient-to-r from-orange-500 to-red-600 text-white px-6 py-3 rounded-lg font-semibold hover:from-orange-600 hover:to-red-700 transition-all duration-300 transform hover:scale-105 shadow-md flex items-center space-x-2 mx-auto"
              >
                <RefreshCw className="w-5 h-5" />
                <span>Try Again</span>
              </button>
            </div>
          </div>
        </div>
      </section>
    );
  }

  // Show empty state or main content
  if (testimonials.length === 0) {
    return (
      <section className="py-20 bg-gradient-to-br from-amber-50 via-orange-50 to-red-50 relative overflow-hidden">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center">
            <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent mb-4">
              Sacred Stories from Devotees
            </h2>
            <p className="text-xl text-gray-600">No testimonials available at the moment.</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 bg-gradient-to-br from-amber-50 via-orange-50 to-red-50 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-10 w-32 h-32 bg-orange-500 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-40 h-40 bg-red-500 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/3 w-24 h-24 bg-yellow-500 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent mb-4">
            Sacred Stories from Devotees
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Discover how our vratam kits have enriched the spiritual journeys of thousands of families across India
          </p>
        </div>

        <div className="relative">
          {/* Main Testimonial Card */}
          <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-12 mx-auto max-w-4xl relative overflow-hidden">
            {/* Decorative Quote */}
            <div className="absolute top-6 left-6 opacity-10">
              <Quote className="w-20 h-20 text-orange-600" />
            </div>
            <div className="absolute bottom-6 right-6 opacity-10 rotate-180">
              <Quote className="w-20 h-20 text-red-600" />
            </div>

            <div className="relative z-10">
              <div className="flex flex-col items-center space-y-8">
                {/* User Image with Decorative Frame */}
                <div className="relative group">
                  <div className="absolute inset-0 bg-gradient-to-r from-orange-500 via-red-500 to-orange-600 rounded-full blur-lg opacity-50 group-hover:opacity-75 transition-opacity duration-300"></div>
                  <div className="relative w-28 h-28 md:w-36 md:h-36 rounded-full overflow-hidden ring-4 ring-white shadow-xl">
                    {testimonials[currentIndex].customer_img_url ? (
                      <img
                        src={testimonials[currentIndex].customer_img_url}
                        alt={testimonials[currentIndex].customer_name}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.currentTarget.style.display = 'none';
                          e.currentTarget.nextElementSibling?.classList.remove('hidden');
                        }}
                      />
                    ) : null}
                    <div className={`${testimonials[currentIndex].customer_img_url ? 'hidden' : ''} w-full h-full bg-gradient-to-br from-orange-100 to-red-100 flex items-center justify-center`}>
                      <User className="w-16 h-16 text-orange-400" />
                    </div>
                  </div>
                  <div className="absolute -bottom-3 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-orange-500 to-red-500 rounded-full px-4 py-1 shadow-lg">
                    <Quote className="w-4 h-4 text-white" />
                  </div>
                </div>

                {/* Content */}
                <div className="flex-1 text-center max-w-3xl">
                  <blockquote className="text-lg md:text-2xl text-gray-700 leading-relaxed mb-8 font-serif italic relative">
                    <span className="text-orange-500 text-4xl absolute -left-4 -top-2">"</span>
                    {testimonials[currentIndex].testimonial}
                    <span className="text-orange-500 text-4xl absolute -bottom-6">"</span>
                  </blockquote>

                  <div className="pt-6 border-t-2 border-orange-100">
                    <h4 className="text-2xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent mb-3">
                      {testimonials[currentIndex].customer_name}
                    </h4>
                    <div className="flex items-center justify-center space-x-2 text-gray-600">
                      <MapPin className="w-5 h-5 text-orange-500" />
                      <p className="text-lg font-medium">
                        {testimonials[currentIndex].customer_location}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Gradient Border */}
            <div className="absolute inset-0 bg-gradient-to-r from-orange-400 via-red-400 to-orange-400 rounded-3xl opacity-20 blur-xl -z-10"></div>
          </div>

          {/* Navigation Arrows */}
          {testimonials.length > 1 && (
          <>
          <button
            onClick={goToPrevious}
            className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-4 md:-translate-x-6 bg-white shadow-xl p-3 rounded-full hover:bg-gray-50 transition-all duration-300 hover:scale-110 group"
          >
            <ChevronLeft className="w-6 h-6 text-gray-600 group-hover:text-orange-600" />
          </button>

          <button
            onClick={goToNext}
            className="absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-4 md:translate-x-6 bg-white shadow-xl p-3 rounded-full hover:bg-gray-50 transition-all duration-300 hover:scale-110 group"
          >
            <ChevronRight className="w-6 h-6 text-gray-600 group-hover:text-orange-600" />
          </button>
          </>
          )}

          {/* Dots Indicator */}
          {testimonials.length > 1 && (
          <div className="flex justify-center mt-12 space-x-3">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`transition-all duration-300 rounded-full ${
                  index === currentIndex
                    ? 'w-12 h-3 bg-gradient-to-r from-orange-500 to-red-500'
                    : 'w-3 h-3 bg-gray-300 hover:bg-gray-400'
                }`}
              />
            ))}
          </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsCarousel;