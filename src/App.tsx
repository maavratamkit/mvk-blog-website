import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Loader2, AlertCircle, RefreshCw } from 'lucide-react';
import Header from './components/Header';
import HeroSlideshow from './components/HeroSlideshow';
import CategoryCarousel from './components/CategoryCarousel';
import TestimonialsCarousel from './components/TestimonialsCarousel';
import Footer from './components/Footer';
import AboutPage from './pages/AboutPage';
import ProductCategoryPage from './pages/ProductCategoryPage';
import ProductPage from './pages/ProductPage';
import { useCategories } from './hooks/useCategories';

function App() {
  const [loading, setLoading] = useState(true);

  // Use React Query hooks for data fetching
  const { data: categories = [], isLoading: categoriesLoading, error: categoriesError, refetch: refetchCategories } = useCategories();

  useEffect(() => {
    // Simple loading state management
    setLoading(false);
  }, []);

  const handleRetryDataFetch = () => {
    refetchCategories();
  };

  // Show loading screen while checking auth or fetching categories
  if (loading || categoriesLoading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-red-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-white font-bold text-2xl">म</span>
          </div>
          <div className="flex items-center justify-center space-x-2 mb-4">
            <Loader2 className="w-5 h-5 text-orange-600 animate-spin" />
            <p className="text-gray-600">
              Loading categories...
            </p>
          </div>
          <p className="text-sm text-gray-500">Fetching categories</p>
        </div>
      </div>
    );
  }

  // Show error screen if category fetching failed
  if (categoriesError) {
    const errorMessage = categoriesError?.message || 'Failed to load categories. Please try again.';
    
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center max-w-md mx-auto px-4">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <AlertCircle className="w-8 h-8 text-red-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Unable to Load Categories</h2>
          <p className="text-gray-600 mb-6">{errorMessage}</p>
          <button
            onClick={handleRetryDataFetch}
            className="bg-gradient-to-r from-orange-500 to-red-600 text-white px-6 py-3 rounded-lg font-semibold hover:from-orange-600 hover:to-red-700 transition-all duration-300 transform hover:scale-105 flex items-center space-x-2 mx-auto"
          >
            <RefreshCw className="w-5 h-5" />
            <span>Retry</span>
          </button>
        </div>
      </div>
    );
  }

  const HomePage = () => (
    <>
      <HeroSlideshow />
      <CategoryCarousel categories={categories} />
      <TestimonialsCarousel />
    </>
  );

  return (
    <Router>
      <div className="min-h-screen bg-white">
        <Routes>
          <Route 
            path="/" 
            element={
              <>
                <Header categories={categories} />
                <HomePage />
                <Footer />
              </>
            } 
          />
          <Route 
            path="/about" 
            element={
              <AboutPage 
                categories={categories}
              />
            } 
          />
          <Route 
            path="/category/:categoryName" 
            element={
              <ProductCategoryPage 
                categories={categories}
              />
            } 
          />
          <Route 
            path="/product/:productId" 
            element={
              <ProductPage 
                categories={categories}
              />
            } 
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;