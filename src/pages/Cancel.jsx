import { Link } from 'react-router-dom';

const Cancel = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-orange-50 flex items-center justify-center py-12 px-4">
      <div className="max-w-2xl w-full text-center">
        {/* Cancel Icon */}
        <div className="mb-8">
          <div className="relative inline-block">
            <div className="w-24 h-24 bg-red-100 rounded-full flex items-center justify-center">
              <svg 
                className="w-12 h-12 text-red-600" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M6 18L18 6M6 6l12 12" 
                />
              </svg>
            </div>
          </div>
        </div>

        {/* Cancel Message */}
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Payment Cancelled
        </h1>
        <p className="text-xl text-gray-600 mb-8">
          Your payment was cancelled and no charge has been made to your account.
        </p>

        {/* What to do next */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            What would you like to do next?
          </h2>
          <div className="space-y-4">
            <Link 
              to="/" 
              className="block w-full px-6 py-4 bg-gradient-to-r from-violet-600 to-indigo-600 text-white font-semibold rounded-xl hover:from-violet-700 hover:to-indigo-700 transition-all duration-300"
            >
              Browse Products
            </Link>
            <button 
              onClick={() => window.history.back()}
              className="block w-full px-6 py-4 bg-gray-100 text-gray-700 font-semibold rounded-xl hover:bg-gray-200 transition-colors"
            >
              Try Again
            </button>
          </div>
        </div>

        {/* Help Section */}
        <div className="text-gray-500">
          <p className="mb-2">
            Need help? Contact our support team.
          </p>
          <a 
            href="mailto:support@digistore.com" 
            className="text-violet-600 hover:text-violet-700 font-medium"
          >
            support@digistore.com
          </a>
        </div>
      </div>
    </div>
  );
};

export default Cancel;

