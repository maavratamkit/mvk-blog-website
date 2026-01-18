import React from 'react';
import { Link } from 'react-router-dom';
import { Eye } from 'lucide-react';
import { Product } from '../types/Product';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  return (
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden transform hover:scale-105 transition-all duration-300 hover:shadow-2xl group flex flex-col min-h-[520px]">
      <div className="relative h-64 overflow-hidden flex-shrink-0">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          style={{ objectPosition: 'center 40%' }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      </div>

      <div className="p-6 flex flex-col flex-1">
        <h3 className="text-xl font-bold text-gray-800 mb-2 leading-tight">
          {product.name}
        </h3>

        <p className="text-gray-600 mb-4 leading-relaxed text-sm line-clamp-3 flex-1">
          {product.description}
        </p>

        <div className="flex items-center justify-between mb-6">
          <span className="text-2xl font-bold text-orange-600">
            ₹{product.price.toLocaleString()}
          </span>
        </div>

        <Link
          to={`/product/${product.id}`}
          className="w-full bg-gradient-to-r from-orange-500 to-red-600 text-white py-3 px-4 rounded-xl font-semibold hover:from-orange-600 hover:to-red-700 transition-all duration-300 transform hover:scale-105 flex items-center justify-center space-x-2 shadow-md hover:shadow-lg mt-auto"
        >
          <Eye className="w-4 h-4" />
          <span>View Details</span>
        </Link>
      </div>
    </div>
  );
};

export default ProductCard;