import { useState } from 'react';
import { initializePayment, createTransaction } from '../services/midtrans';

const CheckoutButton = ({ product }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleCheckout = async () => {
    if (!product) {
      setError('Product information is missing');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      // Create transaction and get snap token from backend
      const { snapToken } = await createTransaction(
        product.id,
        product.name,
        product.price
      );

      // Initialize Midtrans payment
      await initializePayment(
        snapToken,
        // onSuccess
        (result) => {
          console.log('Payment successful:', result);
          // Store payment result for success page
          localStorage.setItem('paymentResult', JSON.stringify(result));
          localStorage.setItem('purchasedProduct', JSON.stringify(product));
          window.location.href = '/success';
        },
        // onError
        (result) => {
          console.log('Payment error:', result);
          setError('Payment failed. Please try again.');
          setLoading(false);
        },
        // onPending
        (result) => {
          console.log('Payment pending:', result);
          localStorage.setItem('paymentResult', JSON.stringify(result));
          window.location.href = '/success';
        }
      );
    } catch (err) {
      console.error('Checkout error:', err);
      setError('Failed to initialize checkout. Please try again.');
      setLoading(false);
    }
  };

  // Format price to Indonesian Rupiah
  const formatPrice = (price) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(price);
  };

  return (
    <div className="w-full">
      <button
        onClick={handleCheckout}
        disabled={loading}
        className={`w-full py-4 px-8 rounded-xl font-bold text-lg flex items-center justify-center space-x-3 transition-all duration-300 ${
          loading
            ? 'bg-gray-400 cursor-not-allowed'
            : 'bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-700 hover:to-indigo-700 shadow-lg hover:shadow-xl hover:-translate-y-1'
        } text-white`}
      >
        {loading ? (
          <>
            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
            <span>Processing...</span>
          </>
        ) : (
          <>
            <svg 
              className="w-5 h-5" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" 
              />
            </svg>
            <span>Buy Now - {formatPrice(product?.price || 0)}</span>
          </>
        )}
      </button>

      {error && (
        <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg flex items-center space-x-3">
          <svg className="w-5 h-5 text-red-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <p className="text-red-600 text-sm">{error}</p>
        </div>
      )}

      <div className="mt-4 flex items-center justify-center space-x-4 text-gray-500 text-sm">
        <div className="flex items-center space-x-1">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
          </svg>
          <span>Secure Payment</span>
        </div>
        <div className="flex items-center space-x-1">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
          </svg>
          <span>Protected by Midtrans</span>
        </div>
      </div>
    </div>
  );
};

export default CheckoutButton;

