import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Success = () => {
  const [product, setProduct] = useState(null);
  const [paymentResult, setPaymentResult] = useState(null);

  useEffect(() => {
    // Get product and payment result from localStorage
    const storedProduct = localStorage.getItem('purchasedProduct');
    const storedResult = localStorage.getItem('paymentResult');

    if (storedProduct) {
      setProduct(JSON.parse(storedProduct));
    }
    if (storedResult) {
      setPaymentResult(JSON.parse(storedResult));
    }

    // Clear localStorage after retrieving data
    localStorage.removeItem('purchasedProduct');
    localStorage.removeItem('paymentResult');
  }, []);

  const handleDownload = () => {
    if (product?.isCartCheckout && product?.cartItems) {
      const itemsWithFiles = product.cartItems.filter(item => item.file_url);
      if (itemsWithFiles.length > 0) {
        itemsWithFiles.forEach((item, index) => {
          setTimeout(() => {
            window.open(item.file_url, '_blank');
          }, index * 200);
        });
      } else {
        alert('Unduhan akan tersedia setelah Anda mengonfigurasi Firebase Storage dengan file produk Anda.');
      }
    } else if (product?.file_url) {
      window.open(product.file_url, '_blank');
    } else {
      alert('Unduhan akan tersedia setelah Anda mengonfigurasi Firebase Storage dengan file produk Anda.');
    }
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(price);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-emerald-50 flex items-center justify-center py-12 px-4 text-center">
      <div className="max-w-2xl w-full">
        {/* Success Icon */}
        <div className="text-center mb-8">
          <div className="relative inline-block">
            <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center animate-bounce mx-auto">
              <svg
                className="w-12 h-12 text-green-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
          </div>
        </div>

        {/* Success Message */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Pembayaran Berhasil!
          </h1>
          <p className="text-xl text-gray-600">
            Terima kasih atas pembelian Anda. Pesanan Anda telah dikonfirmasi.
          </p>
        </div>

        {/* Order Details Card */}
        {product && (
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden mb-8 text-left">
            <div className="bg-gradient-to-r from-green-600 to-emerald-600 px-6 py-4">
              <h2 className="text-white font-semibold text-lg">Detail Pesanan</h2>
            </div>
            <div className="p-6">
              {product.isCartCheckout && product.cartItems ? (
                <div className="space-y-6">
                  <div className="flex items-center justify-between pb-4 border-b border-gray-100">
                    <h3 className="font-bold text-gray-900">{product.name}</h3>
                    <span className="text-xl font-bold text-green-600">{formatPrice(product.price)}</span>
                  </div>
                  <div className="space-y-4">
                    {product.cartItems.map((item) => (
                      <div key={item.id} className="flex items-center space-x-4 bg-gray-50 p-4 rounded-xl border border-gray-100">
                        <img
                          src={item.image || 'https://via.placeholder.com/100x100?text=Product'}
                          alt={item.name}
                          className="w-16 h-16 object-cover rounded-lg shadow-sm"
                        />
                        <div className="flex-1">
                          <h4 className="font-bold text-gray-900 text-sm">{item.name}</h4>
                          <p className="text-xs text-gray-500">{item.quantity} x {formatPrice(item.price)}</p>
                        </div>
                        {item.file_url && (
                          <button
                            onClick={() => window.open(item.file_url, '_blank')}
                            className="p-2 bg-green-100 text-green-600 rounded-lg hover:bg-green-200 transition-colors"
                            title="Unduh Item Ini"
                          >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                            </svg>
                          </button>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="flex items-start space-x-4">
                  <img
                    src={product.image || 'https://via.placeholder.com/100x100?text=Product'}
                    alt={product.name}
                    className="w-24 h-24 object-cover rounded-lg shadow-md"
                  />
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-gray-900 mb-1">
                      {product.name}
                    </h3>
                    <p className="text-sm text-gray-500 mb-2">
                      {product.category}
                    </p>
                    <span className="text-2xl font-bold text-green-600">
                      {formatPrice(product.price)}
                    </span>
                  </div>
                </div>
              )}

              {paymentResult && (
                <div className="border-t border-gray-200 pt-4 mt-6">
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-gray-500">ID Transaksi</p>
                      <p className="font-medium text-gray-700 break-all">
                        {paymentResult.transaction_id || paymentResult.order_id || 'N/A'}
                      </p>
                    </div>
                    <div>
                      <p className="text-gray-500">Metode Pembayaran</p>
                      <p className="font-medium text-gray-700 uppercase">
                        {paymentResult.payment_type?.replace(/_/g, ' ') || 'qrish'}
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Download Button */}
        <div className="space-y-4">
          <button
            onClick={handleDownload}
            className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-green-600 to-emerald-600 text-white font-bold rounded-xl hover:from-green-700 hover:to-emerald-700 transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-1 flex items-center justify-center space-x-3 mx-auto"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
            <span>{product?.isCartCheckout ? 'Unduh Semua Produk' : 'Unduh Produk Anda'}</span>
          </button>

          <p className="text-sm text-gray-500">
            Tautan unduhan juga telah dikirimkan ke alamat email Anda.
          </p>
        </div>

        {/* Continue Shopping */}
        <div className="mt-8 text-center">
          <Link
            to="/"
            className="inline-flex items-center space-x-2 text-slate-600 hover:text-slate-700 font-medium transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            <span>Lanjutkan Belanja</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Success;

