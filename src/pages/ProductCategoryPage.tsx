import React from 'react';
import { useParams } from 'react-router-dom';
import { Loader2, AlertCircle, RefreshCw, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ProductCard from '../components/ProductCard';
import { unslugify } from '../utils/slugify';
import { Category } from '../types/Category';
import { useProductsByCategory } from '../hooks/useProducts';

interface ProductCategoryPageProps {
  categories: Category[];
}

const ProductCategoryPage: React.FC<ProductCategoryPageProps> = ({ categories }) => {
  const { categoryName } = useParams<{ categoryName: string }>();
  
  // Use React Query hook for fetching products by category
  const { 
    data: categoryProducts = [], 
    isLoading: loading, 
    error, 
    refetch: handleRetry 
  } = useProductsByCategory(categoryName || '');
  
  const categoryTitle = categoryName ? unslugify(categoryName) : "All Products";

  return (
    <div className="min-h-screen bg-white">
      <Header categories={categories} />
      
      <main className="py-12 bg-gradient-to-b from-orange-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Page Header */}
          <div className="text-center mb-12">
            {/* Back Button */}
            <div className="flex justify-start mb-8">
              <Link 
                to="/"
                className="inline-flex items-center space-x-2 text-gray-600 hover:text-orange-600 transition-colors"
              >
                <ArrowLeft className="w-5 h-5" />
                <span>Back to Home</span>
              </Link>
            </div>
            
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent mb-4">
              {categoryTitle}
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Discover our carefully curated collection of authentic spiritual items for your sacred worship
            </p>
          </div>

          {/* Products Grid */}
          {loading ? (
            <div className="flex items-center justify-center py-20">
              <div className="text-center">
                <Loader2 className="w-12 h-12 text-orange-500 animate-spin mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-700 mb-2">Loading Products...</h3>
                <p className="text-gray-500">Please wait while we fetch the latest spiritual collections</p>
              </div>
            </div>
          ) : error ? (
            <div className="flex items-center justify-center py-20">
              <div className="text-center max-w-md mx-auto">
                <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-6" />
                <h3 className="text-2xl font-bold text-gray-800 mb-4">Unable to Load Products</h3>
                <p className="text-gray-600 mb-6 leading-relaxed">{error?.message || 'An unexpected error occurred'}</p>
                <button
                  onClick={handleRetry}
                  className="bg-gradient-to-r from-orange-500 to-red-600 text-white px-6 py-3 rounded-lg font-semibold hover:from-orange-600 hover:to-red-700 transition-all duration-300 transform hover:scale-105 shadow-md flex items-center space-x-2 mx-auto"
                >
                  <RefreshCw className="w-5 h-5" />
                  <span>Try Again</span>
                </button>
              </div>
            </div>
          ) : categoryProducts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {categoryProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-4xl text-gray-400">📦</span>
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-2">No Products Found</h3>
              <p className="text-gray-600 mb-4">We couldn't find any products in this category.</p>
              <button
                onClick={handleRetry}
                className="bg-gradient-to-r from-orange-500 to-red-600 text-white px-6 py-3 rounded-lg font-semibold hover:from-orange-600 hover:to-red-700 transition-all duration-300 transform hover:scale-105 shadow-md"
              >
                Refresh
              </button>
            </div>
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default ProductCategoryPage;