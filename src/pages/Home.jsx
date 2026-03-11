import ProductList from '../components/ProductList';

const Home = () => {
  return (
    <div className="min-h-screen bg-[#f9fafb]">
      {/* Hero Section - Modern Marketplace Style */}
      <section className="hero relative overflow-hidden bg-gradient-to-br from-slate-50 via-white to-slate-100">
        {/* Animated Background Shapes */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {/* Floating Shape 1 */}
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-slate-200 rounded-full blur-3xl opacity-40 animate-float"></div>
          {/* Floating Shape 2 */}
          <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-slate-300 rounded-full blur-3xl opacity-40 animate-float" style={{ animationDelay: '1s' }}></div>
          {/* Floating Shape 3 */}
          <div className="absolute top-1/2 left-1/2 w-[300px] h-[300px] bg-slate-200 rounded-full blur-3xl opacity-30 animate-float" style={{ animationDelay: '2s' }}></div>
          {/* Grid Pattern */}
          <div className="absolute inset-0 bg-grid opacity-50"></div>
        </div>

        {/* Centered Container */}
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            {/* Badge */}
            <div className="inline-flex items-center px-4 py-2 bg-white/80 backdrop-blur-sm text-slate-700 rounded-full text-sm font-medium mb-8 shadow-lg shadow-slate-500/10 border border-slate-100 animate-fade-in">
              <span className="w-2 h-2 bg-slate-600 rounded-full mr-2 animate-pulse"></span>
              Produk Digital Premium
            </div>

            {/* Main Heading */}
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight text-gray-900 mb-6 animate-fade-in stagger-1">
              Temukan{' '}
              <span className="text-gradient-animated">
                Produk
              </span>{' '}
              Digital Premium
            </h1>

            {/* Subtitle */}
            <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto mb-10 animate-fade-in stagger-2">
              Template berkualitas tinggi, UI kit, dan aset digital untuk mempercepat proyek Anda.
              Unduhan instan setelah pembelian.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row justify-center gap-4 animate-fade-in stagger-3">
              <a
                href="#products"
                className="btn-glow inline-flex items-center justify-center px-8 py-4 text-white font-semibold rounded-xl shadow-glow"
              >
                <span>Jelajahi Produk</span>
                <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </a>
              <a
                href="#features"
                className="px-8 py-4 bg-white text-gray-700 font-semibold rounded-xl border-2 border-gray-200 hover:border-slate-300 hover:text-slate-600 transition-all duration-300 hover:-translate-y-1 shadow-soft hover:shadow-medium"
              >
                Pelajari Lebih Lanjut
              </a>
            </div>
          </div>

          {/* Stats */}
          <div className="mt-16 md:mt-20 grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 animate-fade-in stagger-4">
            {[
              { label: 'Produk', value: '500+', icon: '📦' },
              { label: 'Pelanggan Puas', value: '10K+', icon: '😊' },
              { label: 'Unduhan', value: '50K+', icon: '⬇️' },
              { label: 'Ulasan Bintang 5', value: '4.9', icon: '⭐' },
            ].map((stat, index) => (
              <div
                key={index}
                className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-soft border border-gray-100 hover:shadow-medium hover:border-slate-200 transition-all duration-300 hover:-translate-y-1"
              >
                <div className="text-3xl md:text-4xl font-bold text-gray-900 mb-1">
                  {stat.value}
                </div>
                <div className="text-sm text-gray-500 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section id="products" className="featured py-20 bg-white relative">
        {/* Background Decoration */}
        <div className="absolute top-0 left-0 w-64 h-64 bg-slate-100 rounded-full blur-3xl opacity-50 -translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 right-0 w-64 h-64 bg-slate-100 rounded-full blur-3xl opacity-50 translate-x-1/2 translate-y-1/2"></div>

        {/* Centered Container */}
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Produk Unggulan
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto text-lg">
              Jelajahi koleksi produk digital premium kami yang dibuat oleh desainer dan pengembang berbakat.
            </p>
          </div>

          <ProductList />
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="bg-gradient-to-br from-gray-50 via-white to-gray-50 py-20 relative overflow-hidden">
        {/* Background Shapes */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-20 left-10 w-72 h-72 bg-slate-100 rounded-full blur-3xl opacity-50"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-slate-100 rounded-full blur-3xl opacity-50"></div>
        </div>

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Mengapa Memilih DigiStore?
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto text-lg">
              Kami menyediakan produk digital terbaik dengan dukungan pelanggan yang luar biasa.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: (
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                  </svg>
                ),
                title: 'Unduhan Instan',
                description: 'Dapatkan akses langsung ke produk yang Anda beli. Unduh kapan saja, di mana saja.'
              },
              {
                icon: (
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                ),
                title: 'Pembayaran Aman',
                description: 'Semua transaksi diamankan oleh Midtrans. Informasi pembayaran Anda aman bersama kami.'
              },
              {
                icon: (
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                ),
                title: 'Dukungan 24/7',
                description: 'Tim dukungan kami tersedia 24 jam untuk membantu Anda dengan pertanyaan apa pun.'
              }
            ].map((feature, index) => (
              <div
                key={index}
                className="bg-white p-8 rounded-2xl hover:shadow-medium transition-all duration-300 border border-gray-100 hover:border-slate-200 hover:-translate-y-2 group"
              >
                <div className="w-16 h-16 bg-gradient-to-br from-slate-100 to-slate-200 text-slate-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-slate-700 via-slate-800 to-slate-700 relative overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0 bg-[length:200%_auto] animate-gradient"></div>

        <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Siap untuk Memulai?
          </h2>
          <p className="text-slate-300 text-lg mb-8 max-w-xl mx-auto">
            Bergabunglah dengan ribuan pelanggan yang puas dan temukan produk digital yang tepat untuk proyek Anda selanjutnya.
          </p>
          <a
            href="#products"
            className="inline-flex items-center px-8 py-4 bg-white text-slate-700 font-semibold rounded-xl hover:bg-slate-50 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
          >
            Jelajahi Produk Sekarang
            <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
        </div>
      </section>
    </div>
  );
};

export default Home;

