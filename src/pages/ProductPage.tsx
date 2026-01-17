import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, ShoppingCart, Zap, Shield, Loader2, AlertCircle, RefreshCw, Plus, Minus } from 'lucide-react';
import { unslugify } from '../utils/slugify';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Product } from '../types/Product';
import { Category } from '../types/Category';
import { useProduct } from '../hooks/useProducts';
import { useCart } from '../contexts/CartContext';

interface ProductPageProps {
  categories: Category[];
}

const ProductPage: React.FC<ProductPageProps> = ({ categories }) => {
  const { productId } = useParams<{ productId: string }>();
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [addingToCart, setAddingToCart] = useState(false);
  const { addToCart, isInCart, getItemQuantity, updateQuantity } = useCart();
  const navigate = useNavigate();

  const {
    data: product,
    isLoading: loading,
    error,
    refetch: handleRetry
  } = useProduct(parseInt(productId || '0'));

  // Show loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-white">
        <Header categories={categories} />
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-center">
            <Loader2 className="w-12 h-12 text-orange-500 animate-spin mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-700 mb-2">Loading Product...</h3>
            <p className="text-gray-500">Please wait while we fetch the product details</p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  // Show error state
  if (error) {
    return (
      <div className="min-h-screen bg-white">
        <Header categories={categories} />
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-center max-w-md mx-auto">
            <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-6" />
            <h3 className="text-2xl font-bold text-gray-800 mb-4">Unable to Load Product</h3>
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
        <Footer />
      </div>
    );
  }

  // Show not found state
  if (!product) {
    return (
      <div className="min-h-screen bg-white">
        <Header categories={categories} />
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Product Not Found</h2>
            <p className="text-gray-600 mb-6">The product you're looking for doesn't exist.</p>
            <Link to="/" className="bg-gradient-to-r from-orange-500 to-red-600 text-white px-6 py-3 rounded-lg font-semibold hover:from-orange-600 hover:to-red-700 transition-all duration-300">
              Return Home
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  const isOutOfStock = product.availability_status === 'OUT_OF_STOCK';

  const handleAddToCart = () => {
    if (isOutOfStock) return;

    setAddingToCart(true);
    addToCart({
      id: product.id.toString(),
      name: product.name,
      price: product.price,
      image_url: product.images[0],
      stock: product.stock || 100,
      slug: product.category,
    });

    setTimeout(() => {
      setAddingToCart(false);
    }, 500);
  };

  const handleBuyNow = () => {
    if (isOutOfStock) return;

    addToCart({
      id: product.id.toString(),
      name: product.name,
      price: product.price,
      image_url: product.images[0],
      stock: product.stock || 100,
      slug: product.category,
    });

    navigate('/checkout');
  };

  const handleIncrement = () => {
    if (!product) return;
    const productId = product.id.toString();
    const currentQuantity = getItemQuantity(productId);
    const stock = product.stock || 100;

    if (currentQuantity < stock) {
      updateQuantity(productId, currentQuantity + 1);
    }
  };

  const handleDecrement = () => {
    if (!product) return;
    const productId = product.id.toString();
    const currentQuantity = getItemQuantity(productId);

    if (currentQuantity > 1) {
      updateQuantity(productId, currentQuantity - 1);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <Header categories={categories} />
      
      <main className="py-8 bg-gradient-to-b from-orange-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb */}
          <div className="flex items-center space-x-2 text-sm text-gray-600 mb-8">
            <Link to="/" className="hover:text-orange-600 transition-colors">Home</Link>
            <span>/</span>
            <Link to={`/category/${product.category}`} className="hover:text-orange-600 transition-colors">
              {product.category.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
            </Link>
            <span>/</span>
            <span className="text-gray-800 font-medium">{product.name}</span>
          </div>

          {/* Back Button */}
          <Link 
            to={`/category/${product.category}`}
            className="inline-flex items-center space-x-2 text-gray-600 hover:text-orange-600 transition-colors mb-8"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Back to Category</span>
          </Link>

          {/* Main Product Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
            {/* Left Section - Images */}
            <div className="space-y-4">
              {/* Main Image */}
              <div className="aspect-square bg-white rounded-2xl shadow-lg overflow-hidden">
                <img
                  src={product.images[selectedImageIndex]}
                  alt={product.name}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                />
              </div>

              {/* Image Thumbnails */}
              <div className="flex space-x-3 overflow-x-auto pb-2">
                {product.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImageIndex(index)}
                    className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-all duration-300 ${
                      selectedImageIndex === index 
                        ? 'border-orange-500 ring-2 ring-orange-200' 
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <img
                      src={image}
                      alt={`${product.name} view ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Right Section - Product Details */}
            <div className="space-y-6">
              <div>
                <h1 className="text-3xl lg:text-4xl font-bold text-gray-800 mb-4 leading-tight">
                  {product.name}
                </h1>
                
                <div className="text-4xl font-bold text-orange-600 mb-6">
                  ₹{product.price.toLocaleString()}
                  <span className="text-lg text-gray-500 font-normal ml-2">inclusive of all taxes</span>
                </div>
              </div>

              {/* Trust Indicators */}
              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <div className="flex items-center space-x-2 text-green-800">
                  <Shield className="w-5 h-5" />
                  <span className="font-semibold">Authentic Products from Traditional Suppliers</span>
                </div>
                <p className="text-sm text-green-700 mt-1">
                  All items are blessed and sourced from authentic traditional suppliers with spiritual significance
                </p>
              </div>

              {/* Action Buttons */}
              <div className="space-y-4">
                {isOutOfStock ? (
                  <button
                    disabled
                    className="w-full py-4 px-8 rounded-xl font-semibold text-lg bg-gray-400 text-gray-200 cursor-not-allowed shadow-lg"
                  >
                    Out of Stock
                  </button>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {isInCart(product.id.toString()) ? (
                      <div className="flex items-center justify-center space-x-4 py-4 px-6 rounded-xl bg-white border-2 border-orange-600 shadow-lg">
                        <button
                          onClick={handleDecrement}
                          className="w-10 h-10 rounded-full bg-gray-200 hover:bg-gray-300 flex items-center justify-center transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                          disabled={getItemQuantity(product.id.toString()) <= 1}
                        >
                          <Minus className="w-4 h-4 text-gray-700" />
                        </button>

                        <span className="text-xl font-semibold text-gray-800 min-w-[3rem] text-center">
                          {getItemQuantity(product.id.toString())}
                        </span>

                        <button
                          onClick={handleIncrement}
                          className="w-10 h-10 rounded-full bg-orange-500 hover:bg-orange-600 flex items-center justify-center transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                          disabled={getItemQuantity(product.id.toString()) >= (product.stock || 100)}
                        >
                          <Plus className="w-4 h-4 text-white" />
                        </button>
                      </div>
                    ) : (
                      <button
                        onClick={handleAddToCart}
                        disabled={addingToCart}
                        className="py-4 px-6 rounded-xl font-semibold text-lg transition-all duration-300 shadow-lg bg-white text-orange-600 border-2 border-orange-600 hover:bg-orange-50 transform hover:scale-105 hover:shadow-xl flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        <ShoppingCart className="w-5 h-5" />
                        <span>{addingToCart ? 'Added!' : 'Add to Cart'}</span>
                      </button>
                    )}

                    <button
                      onClick={handleBuyNow}
                      className="py-4 px-6 rounded-xl font-semibold text-lg transition-all duration-300 shadow-lg bg-gradient-to-r from-orange-500 to-red-600 text-white hover:from-orange-600 hover:to-red-700 transform hover:scale-105 hover:shadow-xl flex items-center justify-center space-x-2"
                    >
                      <Zap className="w-5 h-5" />
                      <span>Buy Now</span>
                    </button>
                  </div>
                )}
                <p className="text-sm text-gray-600 text-center">
                  {isOutOfStock
                    ? 'This product is currently unavailable. Please check back later.'
                    : isInCart(product.id.toString())
                    ? 'Adjust quantity or proceed to checkout'
                    : 'Add to cart or buy instantly with just one click'
                  }
                </p>
              </div>

            </div>
          </div>

          {/* Bottom Section - Product Description */}
          <div className="bg-white rounded-2xl shadow-lg p-8 lg:p-12">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
              {/* Product Description */}
              <div className="lg:col-span-2 space-y-8">
                <div>
                  <h2 className="text-2xl font-bold text-gray-800 mb-6">Product Description</h2>
                  <p className="text-gray-700 leading-relaxed text-lg">
                    {product.longDescription}
                  </p>
                </div>

                {/* Kit Includes */}
                <div>
                  <h3 className="text-xl font-bold text-gray-800 mb-4">What's Included in This Kit</h3>
                  <div className="max-h-64 overflow-y-auto pr-2 border border-gray-200 rounded-lg p-4 bg-gray-50">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {product.kitIncludes.map((item, index) => (
                      <div key={index} className="flex items-center space-x-3 p-3 bg-orange-50 rounded-lg">
                        <div className="w-2 h-2 bg-orange-500 rounded-full flex-shrink-0"></div>
                        <span className="text-gray-700">{item}</span>
                      </div>
                    ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Significance */}
              <div className="bg-gradient-to-br from-orange-50 to-red-50 rounded-xl p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-4">Spiritual Significance</h3>
                <p className="text-gray-700 leading-relaxed">
                  {product.significance}
                </p>
                
                <div className="mt-6 p-4 bg-white rounded-lg border border-orange-200">
                  <h4 className="font-semibold text-orange-800 mb-2">Perfect For:</h4>
                  <ul className="text-sm text-gray-700 space-y-1">
                    <li>• Daily worship and prayers</li>
                    <li>• Special occasions and festivals</li>
                    <li>• Spiritual beginners and experts</li>
                    <li>• Family worship sessions</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ProductPage;