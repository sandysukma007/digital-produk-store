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
    : 'High-quality digital product for your projects';

  return (
    <div className="product-card group bg-white rounded-2xl shadow-soft hover:shadow-medium overflow-hidden border border-gray-100 hover:border-violet-200">
      {/* Product Image */}
      <div className="relative overflow-hidden aspect-[4/3] bg-gray-100">
        <img
          src={image || 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=500&h=400&fit=crop'}
          alt={name}
          className="product-card-image w-full h-full object-cover rounded-t-2xl"
        />
        
        {/* Category Badge - On top of image */}
        {category && (
          <div className="absolute top-3 left-3">
            <span className="px-3 py-1.5 text-xs font-semibold bg-white/90 backdrop-blur-sm text-gray-800 rounded-full shadow-md">
              {category}
            </span>
          </div>
        )}
        
        {/* Quick View Overlay on Hover */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-end justify-center pb-6">
          <Link
            to={`/product/${id}`}
            className="px-6 py-2.5 bg-white text-gray-900 font-semibold rounded-full transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 hover:bg-violet-600 hover:text-white shadow-lg"
          >
            View Details
          </Link>
        </div>

        {/* Decorative corner */}
        <div className="absolute top-3 right-3 w-8 h-8 bg-white/20 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      </div>

      {/* Product Info */}
      <div className="p-5">
        <h3 className="text-base font-bold text-gray-900 mb-2 line-clamp-2 group-hover:text-violet-600 transition-colors duration-200 min-h-[3rem]">
          {name}
        </h3>
        <p className="text-sm text-gray-500 mb-4 line-clamp-2 leading-relaxed">
          {shortDescription}
        </p>
        
        {/* Price and Buy Button */}
        <div className="flex items-center justify-between mt-auto pt-4 border-t border-gray-100">
          <div className="flex flex-col">
            <span className="text-xs text-gray-400 font-medium">Price</span>
            <span className="text-xl font-bold text-gradient">
              {formatPrice(price)}
            </span>
          </div>
          <Link
            to={`/product/${id}`}
            className="px-5 py-2.5 bg-gradient-to-r from-violet-600 to-indigo-600 text-white font-semibold rounded-xl hover:from-violet-700 hover:to-indigo-700 transition-all duration-200 flex items-center space-x-2 text-sm shadow-lg shadow-violet-600/25 hover:shadow-violet-600/40 hover:-translate-y-0.5 group"
          >
            <svg 
              className="w-4 h-4" 
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
            <span>Buy Now</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;

