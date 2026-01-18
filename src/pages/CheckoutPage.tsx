import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, MapPin, Phone, Navigation, MessageSquare, ShoppingCart } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Category } from '../types/Category';
import { useCart } from '../contexts/CartContext';
import { formatWhatsAppMessage, DeliveryAddress } from '../utils/whatsappFormatter';

interface CheckoutPageProps {
  categories: Category[];
}

const CheckoutPage: React.FC<CheckoutPageProps> = ({ categories }) => {
  const { cart, clearCart } = useCart();
  const navigate = useNavigate();

  const [formData, setFormData] = useState<DeliveryAddress>({
    flatFloorStreet: '',
    mandalTownCity: '',
    district: '',
    state: '',
    pincode: '',
    phone: '',
    landmark: '',
  });

  const [errors, setErrors] = useState<Partial<Record<keyof DeliveryAddress, string>>>({});

  useEffect(() => {
    if (cart.items.length === 0) {
      navigate('/cart');
    }
  }, [cart.items.length, navigate]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (errors[name as keyof DeliveryAddress]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Partial<Record<keyof DeliveryAddress, string>> = {};

    if (!formData.flatFloorStreet.trim()) {
      newErrors.flatFloorStreet = 'Flat/Street address is required';
    }

    if (!formData.mandalTownCity.trim()) {
      newErrors.mandalTownCity = 'Town/City is required';
    }

    if (!formData.district.trim()) {
      newErrors.district = 'District is required';
    }

    if (!formData.state.trim()) {
      newErrors.state = 'State is required';
    }

    if (!formData.pincode.trim()) {
      newErrors.pincode = 'Pincode is required';
    } else if (!/^\d{6}$/.test(formData.pincode)) {
      newErrors.pincode = 'Pincode must be 6 digits';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handlePlaceOrder = () => {
    if (!validateForm()) {
      return;
    }

    const message = formatWhatsAppMessage(cart, formData);
    const whatsappUrl = `https://wa.me/919876543210?text=${encodeURIComponent(message)}`;

    window.open(whatsappUrl, '_blank');

    clearCart();

    navigate('/');
  };

  const isFormValid = () => {
    return (
      formData.flatFloorStreet.trim() !== '' &&
      formData.mandalTownCity.trim() !== '' &&
      formData.district.trim() !== '' &&
      formData.state.trim() !== '' &&
      formData.pincode.trim() !== '' &&
      /^\d{6}$/.test(formData.pincode)
    );
  };

  if (cart.items.length === 0) {
    return null;
  }

  return (
    <div className="min-h-screen bg-white">
      <Header categories={categories} />

      <main className="py-8 bg-gradient-to-b from-orange-50 to-white min-h-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            to="/cart"
            className="inline-flex items-center space-x-2 text-gray-600 hover:text-orange-600 transition-colors mb-6"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Back to Cart</span>
          </Link>

          <div className="mb-8">
            <h1 className="text-3xl lg:text-4xl font-bold text-gray-800 mb-2">Checkout</h1>
            <p className="text-gray-600">Complete your order with delivery details</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-6">
              <div className="bg-white rounded-xl shadow-md p-8">
                <div className="flex items-center space-x-3 mb-6">
                  <MapPin className="w-6 h-6 text-orange-600" />
                  <h2 className="text-2xl font-bold text-gray-800">Delivery Address</h2>
                </div>

                <div className="space-y-5">
                  <div>
                    <label
                      htmlFor="flatFloorStreet"
                      className="block text-sm font-semibold text-gray-700 mb-2"
                    >
                      Flat no., Floor and Street <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      id="flatFloorStreet"
                      name="flatFloorStreet"
                      value={formData.flatFloorStreet}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-3 rounded-lg border-2 transition-colors ${
                        errors.flatFloorStreet
                          ? 'border-red-300 focus:border-red-500'
                          : 'border-gray-300 focus:border-orange-500'
                      } focus:outline-none`}
                      placeholder="Enter your flat/floor and street"
                    />
                    {errors.flatFloorStreet && (
                      <p className="text-red-500 text-sm mt-1">{errors.flatFloorStreet}</p>
                    )}
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label
                        htmlFor="mandalTownCity"
                        className="block text-sm font-semibold text-gray-700 mb-2"
                      >
                        Mandal/Town/City <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        id="mandalTownCity"
                        name="mandalTownCity"
                        value={formData.mandalTownCity}
                        onChange={handleInputChange}
                        className={`w-full px-4 py-3 rounded-lg border-2 transition-colors ${
                          errors.mandalTownCity
                            ? 'border-red-300 focus:border-red-500'
                            : 'border-gray-300 focus:border-orange-500'
                        } focus:outline-none`}
                        placeholder="Enter town/city"
                      />
                      {errors.mandalTownCity && (
                        <p className="text-red-500 text-sm mt-1">{errors.mandalTownCity}</p>
                      )}
                    </div>

                    <div>
                      <label
                        htmlFor="district"
                        className="block text-sm font-semibold text-gray-700 mb-2"
                      >
                        District <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        id="district"
                        name="district"
                        value={formData.district}
                        onChange={handleInputChange}
                        className={`w-full px-4 py-3 rounded-lg border-2 transition-colors ${
                          errors.district
                            ? 'border-red-300 focus:border-red-500'
                            : 'border-gray-300 focus:border-orange-500'
                        } focus:outline-none`}
                        placeholder="Enter district"
                      />
                      {errors.district && (
                        <p className="text-red-500 text-sm mt-1">{errors.district}</p>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label
                        htmlFor="state"
                        className="block text-sm font-semibold text-gray-700 mb-2"
                      >
                        State <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        id="state"
                        name="state"
                        value={formData.state}
                        onChange={handleInputChange}
                        className={`w-full px-4 py-3 rounded-lg border-2 transition-colors ${
                          errors.state
                            ? 'border-red-300 focus:border-red-500'
                            : 'border-gray-300 focus:border-orange-500'
                        } focus:outline-none`}
                        placeholder="Enter state"
                      />
                      {errors.state && (
                        <p className="text-red-500 text-sm mt-1">{errors.state}</p>
                      )}
                    </div>

                    <div>
                      <label
                        htmlFor="pincode"
                        className="block text-sm font-semibold text-gray-700 mb-2"
                      >
                        Pincode <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        id="pincode"
                        name="pincode"
                        value={formData.pincode}
                        onChange={handleInputChange}
                        maxLength={6}
                        className={`w-full px-4 py-3 rounded-lg border-2 transition-colors ${
                          errors.pincode
                            ? 'border-red-300 focus:border-red-500'
                            : 'border-gray-300 focus:border-orange-500'
                        } focus:outline-none`}
                        placeholder="6-digit pincode"
                      />
                      {errors.pincode && (
                        <p className="text-red-500 text-sm mt-1">{errors.pincode}</p>
                      )}
                    </div>
                  </div>

                  <div>
                    <label htmlFor="phone" className="block text-sm font-semibold text-gray-700 mb-2">
                      Phone Number <span className="text-gray-500">(Optional)</span>
                    </label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        className="w-full pl-12 pr-4 py-3 rounded-lg border-2 border-gray-300 focus:border-orange-500 focus:outline-none transition-colors"
                        placeholder="Enter phone number"
                      />
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="landmark"
                      className="block text-sm font-semibold text-gray-700 mb-2"
                    >
                      Landmark <span className="text-gray-500">(Optional)</span>
                    </label>
                    <div className="relative">
                      <Navigation className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        type="text"
                        id="landmark"
                        name="landmark"
                        value={formData.landmark}
                        onChange={handleInputChange}
                        className="w-full pl-12 pr-4 py-3 rounded-lg border-2 border-gray-300 focus:border-orange-500 focus:outline-none transition-colors"
                        placeholder="Nearby landmark"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-1">
              <div className="bg-white rounded-xl shadow-md p-6 sticky top-24">
                <h2 className="text-2xl font-bold text-gray-800 mb-6">Order Summary</h2>

                <div className="space-y-3 mb-6 max-h-64 overflow-y-auto">
                  {cart.items.map((item) => (
                    <div
                      key={item.id}
                      className="flex justify-between items-start text-sm border-b border-gray-100 pb-3"
                    >
                      <div className="flex-grow pr-2">
                        <p className="font-medium text-gray-800">{item.name}</p>
                        <p className="text-gray-500">Qty: {item.quantity}</p>
                      </div>
                      <p className="font-semibold text-gray-800">
                        ₹{(item.price * item.quantity).toLocaleString()}
                      </p>
                    </div>
                  ))}
                </div>

                <div className="border-t border-gray-200 pt-4 mb-6">
                  <div className="flex justify-between text-xl font-bold text-gray-800">
                    <span>Total</span>
                    <span className="text-orange-600">₹{cart.total.toLocaleString()}</span>
                  </div>
                  <p className="text-sm text-gray-500 mt-1">
                    {cart.itemCount} {cart.itemCount === 1 ? 'item' : 'items'}
                  </p>
                </div>

                <button
                  onClick={handlePlaceOrder}
                  disabled={!isFormValid()}
                  className={`w-full py-4 px-6 rounded-xl font-semibold text-lg transition-all duration-300 shadow-lg flex items-center justify-center space-x-2 ${
                    isFormValid()
                      ? 'bg-green-600 text-white hover:bg-green-700 transform hover:scale-105 cursor-pointer'
                      : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  }`}
                >
                  <MessageSquare className="w-5 h-5" />
                  <span>Place Order on WhatsApp</span>
                </button>

                {!isFormValid() && (
                  <p className="text-sm text-gray-500 mt-3 text-center">
                    Please fill all required fields to continue
                  </p>
                )}

                <div className="mt-6 p-4 bg-green-50 rounded-lg border border-green-200">
                  <p className="text-sm text-green-800 text-center">
                    Your order will be sent via WhatsApp for confirmation
                  </p>
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

export default CheckoutPage;
