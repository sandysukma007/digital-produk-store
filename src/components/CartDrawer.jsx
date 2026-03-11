import React from 'react';
import { useCart } from '../context/CartContext';
import { Link } from 'react-router-dom';
import CheckoutButton from './CheckoutButton';

const CartDrawer = () => {
  const { cartItems, isCartOpen, setIsCartOpen, removeFromCart, updateQuantity, getCartTotal } = useCart();

  // Format price to Indonesian Rupiah
  const formatPrice = (price) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(price);
  };

  if (!isCartOpen) return null;

  return (
    <>
      <div 
        className="fixed inset-0 bg-black/50 z-40 transition-opacity"
        onClick={() => setIsCartOpen(false)}
      ></div>
      
      <div className="fixed top-0 right-0 h-full w-full sm:w-[400px] bg-white z-50 shadow-2xl flex flex-col transform transition-transform duration-300 ease-in-out">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-100">
          <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            Keranjang Belanja
          </h2>
          <button 
            onClick={() => setIsCartOpen(false)}
            className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Cart Items */}
        <div className="flex-1 overflow-y-auto p-6">
          {cartItems.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-gray-500">
              <svg className="w-16 h-16 mb-4 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
              <p className="text-lg font-medium text-gray-900">Keranjang Anda kosong</p>
              <p className="text-sm mt-1 mb-6">Mulai tambahkan produk ke keranjang!</p>
              <button 
                onClick={() => setIsCartOpen(false)}
                className="px-6 py-2.5 bg-slate-100 text-slate-700 font-medium rounded-xl hover:bg-slate-200 transition-colors"
              >
                Mulai Belanja
              </button>
            </div>
          ) : (
            <div className="flex flex-col gap-6">
              {cartItems.map((item) => (
                <div key={item.id} className="flex gap-4">
                  <div className="w-20 h-20 rounded-xl overflow-hidden shrink-0 border border-gray-100 shadow-sm">
                    <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                  </div>
                  
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <h3 className="font-semibold text-gray-900 line-clamp-2 text-sm leading-tight mb-1">{item.name}</h3>
                      <p className="text-slate-600 font-bold text-sm tracking-tight">{formatPrice(item.price)}</p>
                    </div>
                    
                    <div className="flex items-center justify-between mt-2">
                      <div className="flex items-center gap-3 bg-gray-50 rounded-lg p-1 border border-gray-200">
                        <button 
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          disabled={item.quantity <= 1}
                          className="w-6 h-6 flex items-center justify-center rounded-md text-gray-500 hover:bg-white hover:text-gray-900 hover:shadow-sm disabled:opacity-50 transition-all font-medium"
                        >
                          -
                        </button>
                        <span className="text-sm font-semibold w-4 text-center text-gray-800">{item.quantity}</span>
                        <button 
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="w-6 h-6 flex items-center justify-center rounded-md text-gray-500 hover:bg-white hover:text-gray-900 hover:shadow-sm transition-all font-medium"
                        >
                          +
                        </button>
                      </div>
                      
                      <button 
                        onClick={() => removeFromCart(item.id)}
                        className="text-red-500 hover:text-red-600 p-1.5 rounded-lg hover:bg-red-50 transition-colors"
                      >
                        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <polyline points="3 6 5 6 21 6"></polyline>
                          <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer / Checkout Options */}
        {cartItems.length > 0 && (
          <div className="p-6 border-t border-gray-100 bg-gray-50 mt-auto">
            <div className="flex items-center justify-between mb-6">
              <span className="text-gray-600 font-medium">Total Harga</span>
              <span className="text-xl font-bold text-slate-800 tracking-tight">
                {formatPrice(getCartTotal())}
              </span>
            </div>
            
            {/* Provide a dummy product to CheckoutButton for multi checkout, though to properly do it we might need to modify CheckoutButton. Let's create a custom flow or refactor CheckoutButton to handle cart */}
            {/* To keep it simple, we pass cart details to CheckoutButton as a "bundle" product */}
            <CheckoutButton 
              product={{
                id: 'CART-' + Date.now(), // Generate a unique ID for the bundle
                name: `Keranjang Belanja (${cartItems.length} produk)`,
                price: getCartTotal(),
                isCartCheckout: true,
                cartItems: cartItems
              }} 
              onSuccessCallback={() => setIsCartOpen(false)}
            />
          </div>
        )}
      </div>
    </>
  );
};

export default CartDrawer;
