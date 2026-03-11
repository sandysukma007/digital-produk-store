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
    if (product?.file_url) {
      window.open(product.file_url, '_blank');
    } else {
      // Demo download link
      alert('Unduhan akan tersedia setelah Anda mengonfigurasi Firebase Storage dengan file produk Anda.');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-emerald-50 flex items-center justify-center py-12 px-4">
      <div className="max-w-2xl w-full">
        {/* Success Icon */}
        <div className="text-center mb-8">
          <div className="relative inline-block">
            <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center animate-bounce">
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
            <div className="absolute -top-2 -right-2 w-8 h-8 bg-green-500 rounded-full flex items-center justify-center animate-pulse">
              <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
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
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden mb-8">
            <div className="bg-gradient-to-r from-green-600 to-emerald-600 px-6 py-4">
              <h2 className="text-white font-semibold text-lg">Detail Pesanan</h2>
            </div>
            <div className="p-6">
              <div className="flex items-start space-x-4 mb-6">
                <img
                  src={product.image || 'https://via.placeholder.com/100x100?text=Product'}
                  alt={product.name}
                  className="w-24 h-24 object-cover rounded-lg"
                />
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-gray-900 mb-1">
                    {product.name}
                  </h3>
                  <p className="text-sm text-gray-500 mb-2">
                    {product.category}
                  </p>
                  <span className="text-2xl font-bold text-green-600">
                    {new Intl.NumberFormat('id-ID', {
                      style: 'currency',
                      currency: 'IDR',
                      minimumFractionDigits: 0,
                    }).format(product.price)}
                  </span>
                </div>
              </div>

              {paymentResult && (
                <div className="border-t border-gray-200 pt-4 mt-4">
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-gray-500">ID Transaksi</p>
                      <p className="font-medium text-gray-900">
                        {paymentResult.transaction_id || 'N/A'}
                      </p>
                    </div>
                    <div>
                      <p className="text-gray-500">Metode Pembayaran</p>
                      <p className="font-medium text-gray-900">
                        {paymentResult.payment_type || 'Kartu Kredit'}
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Download Button */}
        <div className="text-center space-y-4">
          <button
            onClick={handleDownload}
            className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-green-600 to-emerald-600 text-white font-bold rounded-xl hover:from-green-700 hover:to-emerald-700 transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-1 flex items-center justify-center space-x-3"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
            <span>Unduh Produk Anda</span>
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

