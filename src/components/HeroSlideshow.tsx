import React, { useState, useEffect, useRef, useCallback } from 'react';
import { ChevronLeft, ChevronRight, Loader2, AlertCircle, RefreshCw, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useSlides } from '../hooks/useSlides';

type Direction = 'left' | 'right' | 'none';

const HeroSlideshow: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [direction, setDirection] = useState<Direction>('none');
  const [isTransitioning, setIsTransitioning] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const {
    data: slides = [],
    isLoading: loading,
    error,
    refetch: handleRetry
  } = useSlides();

  const startTimer = useCallback(() => {
    if (slides.length <= 1) return;

    if (timerRef.current) {
      clearInterval(timerRef.current);
    }

    timerRef.current = setInterval(() => {
      setDirection('right');
      setIsTransitioning(true);
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
  }, [slides.length]);

  useEffect(() => {
    startTimer();
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [startTimer]);

  useEffect(() => {
    if (isTransitioning) {
      const timeout = setTimeout(() => {
        setIsTransitioning(false);
        setDirection('none');
      }, 800);
      return () => clearTimeout(timeout);
    }
  }, [isTransitioning]);

  const goToSlide = (index: number) => {
    if (index === currentSlide) return;
    setDirection(index > currentSlide ? 'right' : 'left');
    setIsTransitioning(true);
    setCurrentSlide(index);
    startTimer();
  };

  const goToPrevious = () => {
    setDirection('left');
    setIsTransitioning(true);
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
    startTimer();
  };

  const goToNext = () => {
    setDirection('right');
    setIsTransitioning(true);
    setCurrentSlide((prev) => (prev + 1) % slides.length);
    startTimer();
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
    <section className="relative h-[500px] md:h-[600px] lg:h-[700px] overflow-hidden bg-gray-900">
      {slides.map((slide, index) => {
        const isActive = index === currentSlide;
        const isPrev = index === (currentSlide - 1 + slides.length) % slides.length;
        const isNext = index === (currentSlide + 1) % slides.length;

        let translateClass = '';
        let opacityClass = 'opacity-0';

        if (isActive) {
          translateClass = 'translate-x-0';
          opacityClass = 'opacity-100';
        } else if (isPrev) {
          translateClass = '-translate-x-full';
        } else if (isNext) {
          translateClass = 'translate-x-full';
        } else {
          translateClass = direction === 'left' ? 'translate-x-full' : '-translate-x-full';
        }

        return (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-all duration-[800ms] ease-in-out ${translateClass} ${opacityClass} ${
              isActive ? 'pointer-events-auto z-10' : 'pointer-events-none z-0'
            }`}
          >
            <div className="relative h-full w-full">
              <div className="absolute inset-0 overflow-hidden">
                <img
                  src={slide.image}
                  alt={slide.title}
                  className={`w-full h-full object-cover transition-transform duration-[8000ms] ${
                    isActive ? 'scale-105' : 'scale-100'
                  }`}
                  style={{
                    transform: isActive ? 'scale(1.05)' : 'scale(1)',
                  }}
                />
              </div>

              <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-transparent">
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              </div>

              <div className="absolute inset-0 flex items-center">
                <div className="max-w-7xl mx-auto px-20 sm:px-24 md:px-28 lg:px-32 w-full">
                  <div className="max-w-2xl">
                    <div
                      className={`transform transition-all duration-1000 delay-200 ${
                        isActive ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
                      }`}
                    >
                      <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-orange-500/20 to-red-500/20 backdrop-blur-sm border border-orange-400/30 rounded-full px-4 py-2 mb-6">
                        <Sparkles className="w-4 h-4 text-orange-400" />
                        <span className="text-orange-200 text-sm font-medium tracking-wide uppercase">Premium Collection</span>
                      </div>
                    </div>

                    <div
                      className={`transform transition-all duration-1000 delay-300 ${
                        isActive ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
                      }`}
                    >
                      <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-white mb-6 leading-tight pr-4">
                        <span className="inline-block bg-gradient-to-r from-white via-orange-100 to-white bg-clip-text text-transparent drop-shadow-2xl">
                          {slide.title}
                        </span>
                      </h2>
                    </div>

                    <div
                      className={`transform transition-all duration-1000 delay-500 ${
                        isActive ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
                      }`}
                    >
                      <Link
                        to={slide.link}
                        className="group inline-flex items-center space-x-3 bg-gradient-to-r from-orange-500 via-red-500 to-orange-600 text-white px-10 py-4 rounded-full font-bold text-lg hover:from-orange-600 hover:via-red-600 hover:to-orange-700 transform hover:scale-105 transition-all duration-300 shadow-2xl hover:shadow-orange-500/50 relative overflow-hidden"
                      >
                        <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-1000" />
                        <span className="relative z-10">{slide.cta}</span>
                        <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      })}

      {/* Navigation Arrows */}
      {slides.length > 1 && (
        <>
          <button
            onClick={goToPrevious}
            className="group absolute left-4 md:left-8 top-1/2 transform -translate-y-1/2 bg-white/10 backdrop-blur-md hover:bg-white/20 border border-white/20 text-white p-4 rounded-full transition-all duration-300 shadow-2xl hover:shadow-orange-500/30 hover:scale-110 hover:border-orange-400/50 z-20"
            aria-label="Previous slide"
          >
            <ChevronLeft className="w-6 h-6 group-hover:text-orange-300 transition-colors duration-300" />
          </button>

          <button
            onClick={goToNext}
            className="group absolute right-4 md:right-8 top-1/2 transform -translate-y-1/2 bg-white/10 backdrop-blur-md hover:bg-white/20 border border-white/20 text-white p-4 rounded-full transition-all duration-300 shadow-2xl hover:shadow-orange-500/30 hover:scale-110 hover:border-orange-400/50 z-20"
            aria-label="Next slide"
          >
            <ChevronRight className="w-6 h-6 group-hover:text-orange-300 transition-colors duration-300" />
          </button>
        </>
      )}

      {/* Dots Indicator */}
      {slides.length > 1 && (
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex items-center space-x-3 z-20">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`transition-all duration-500 rounded-full ${
                index === currentSlide
                  ? 'w-12 h-3 bg-gradient-to-r from-orange-400 to-red-500 shadow-lg shadow-orange-500/50'
                  : 'w-3 h-3 bg-white/40 hover:bg-white/60 hover:scale-125'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      )}
    </section>
  );
};

export default HeroSlideshow;