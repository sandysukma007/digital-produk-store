import { Link } from 'react-router-dom';

const ProductCard = ({ product }) => {
  const { id, name, price, image, category, description } = product;

  // Format price to Indonesian Rupiah
  const formatPrice = (price) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(price);
  };

  // Truncate description if too long
  const shortDescription = description
    ? description.length > 70
      ? description.substring(0, 70) + '...'
      : description
    : 'Produk digital berkualitas tinggi untuk proyek Anda';

  return (
    <div className="group relative bg-white rounded-2xl overflow-hidden transition-all duration-500 ease-out hover:shadow-2xl hover:shadow-slate-500/20 hover:-translate-y-2 border border-gray-100 hover:border-slate-200">
      {/* Product Image Container */}
      <div className="relative overflow-hidden aspect-[4/3] bg-gradient-to-br from-gray-50 to-gray-100">
        <img
          src={image || 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=500&h=400&fit=crop'}
          alt={name}
          className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
        />

        {/* Category Badge - Positioned on top of image */}
        {category && (
          <div className="absolute top-3 left-3 z-10">
            <span className="px-3 py-1.5 text-xs font-semibold bg-white/95 backdrop-blur-sm text-gray-700 rounded-full shadow-lg shadow-black/10 border border-gray-100 group-hover:bg-slate-600 group-hover:text-white group-hover:border-slate-500 transition-all duration-300">
              {category}
            </span>
          </div>
        )}

        {/* Quick View Overlay on Hover */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center">
          <Link
            to={`/product/${id}`}
            className="px-6 py-3 bg-white text-gray-900 font-semibold rounded-full transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 hover:bg-slate-600 hover:text-white shadow-xl"
          >
            Lihat Detail
          </Link>
        </div>

        {/* Decorative Elements */}
        <div className="absolute top-3 right-3 w-10 h-10 bg-white/20 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        <div className="absolute -bottom-10 -right-10 w-24 h-24 bg-slate-500/20 rounded-full blur-2xl group-hover:bg-slate-500/30 transition-all duration-500"></div>
      </div>

      {/* Product Info */}
      <div className="p-5">
        <h3 className="text-base font-bold text-gray-900 mb-2 line-clamp-2 group-hover:text-slate-700 transition-colors duration-200 min-h-[3rem] leading-tight">
          {name}
        </h3>
        <p className="text-sm text-gray-500 mb-4 line-clamp-2 leading-relaxed">
          {shortDescription}
        </p>

        {/* Price and Buy Button */}
        <div className="flex items-center justify-between mt-auto pt-4 border-t border-gray-100">
          <div className="flex flex-col">
            <span className="text-xs text-gray-400 font-medium uppercase tracking-wide">Harga</span>
            <span className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-slate-600 to-slate-700">
              {formatPrice(price)}
            </span>
          </div>
          <Link
            to={`/product/${id}`}
            className="group/btn px-5 py-2.5 bg-gradient-to-r from-slate-600 to-slate-700 text-white font-semibold rounded-xl hover:from-slate-700 hover:to-slate-800 transition-all duration-300 flex items-center space-x-2 text-sm shadow-lg shadow-slate-600/25 hover:shadow-slate-600/40 hover:-translate-y-1"
          >
            <svg
              className="w-4 h-4 transition-transform duration-300 group-hover/btn:scale-125"
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
            <span>Beli Sekarang</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;

