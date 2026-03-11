import { useState, useEffect, useMemo } from 'react';
import { fetchProducts, addProduct, updateProduct, deleteProduct } from '../services/firebase';

const Admin = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState(null);
  
  // Table Filters & Pagination
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  
  // Form State
  const [formData, setFormData] = useState({
    name: '',
    category: '',
    price: '',
    type: 'digital',
    file_url: '',
    image: ''
  });

  const [formLoading, setFormLoading] = useState(false);
  const [message, setMessage] = useState({ text: '', type: '' });

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    setLoading(true);
    try {
      const data = await fetchProducts();
      setProducts(data);
    } catch (error) {
      showMessage('Gagal memuat produk', 'error');
    } finally {
      setLoading(false);
    }
  };

  const showMessage = (text, type) => {
    setMessage({ text, type });
    setTimeout(() => setMessage({ text: '', type: '' }), 3000);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormLoading(true);

    try {
      // Data preparation
      const productData = {
        name: formData.name,
        category: formData.category,
        price: Number(formData.price),
        type: formData.type || 'digital',
        file_url: formData.file_url,
        image: formData.image || 'https://picsum.photos/400'
      };

      if (editingId) {
        // Update
        await updateProduct(editingId, productData);
        showMessage('Produk berhasil diperbarui', 'success');
        setEditingId(null);
      } else {
        // Create - using name as the document ID to match Firestore screenshot structure, or auto id.
        await addProduct(productData, formData.name); 
        showMessage('Produk berhasil ditambahkan', 'success');
      }

      // Reset form and reload
      setFormData({ name: '', category: '', price: '', type: 'digital', file_url: '', image: '' });
      await loadProducts();
    } catch (error) {
      console.error(error);
      showMessage('Terjadi kesalahan saat menyimpan produk', 'error');
    } finally {
      setFormLoading(false);
    }
  };

  const handleEdit = (product) => {
    setEditingId(product.id);
    setFormData({
      name: product.name || '',
      category: product.category || '',
      price: product.price || '',
      type: product.type || 'digital',
      file_url: product.file_url || '',
      image: product.image || ''
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDelete = async (id) => {
    if (window.confirm('Apakah Anda yakin ingin menghapus produk ini?')) {
      try {
        await deleteProduct(id);
        showMessage('Produk dihapus', 'success');
        await loadProducts();
      } catch (error) {
        showMessage('Gagal menghapus produk', 'error');
      }
    }
  };

  const cancelEdit = () => {
    setEditingId(null);
    setFormData({ name: '', category: '', price: '', type: 'digital', file_url: '', image: '' });
  };

  // Derived Categories for Filter
  const categories = useMemo(() => {
    const unique = new Set(products.map(p => p.category).filter(Boolean));
    return ['All', ...Array.from(unique)];
  }, [products]);

  // Handle Filtration and Search
  const filteredProducts = useMemo(() => {
    return products.filter(product => {
      const matchCategory = selectedCategory === 'All' || product.category === selectedCategory;
      const searchLower = searchQuery.toLowerCase();
      const matchSearch = product.name?.toLowerCase().includes(searchLower) || 
                          product.category?.toLowerCase().includes(searchLower);
      return matchCategory && matchSearch;
    });
  }, [products, searchQuery, selectedCategory]);

  // Handle Pagination
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Dasbor Admin</h1>
          <span className="px-4 py-2 bg-slate-100 text-slate-700 rounded-lg font-medium shadow-sm">
            Total Produk: {products.length}
          </span>
        </div>

        {message.text && (
          <div className={`p-4 mb-6 rounded-lg font-medium shadow-sm transition-all ${
            message.type === 'error' ? 'bg-red-100 text-red-700 border border-red-200' : 'bg-green-100 text-green-700 border border-green-200'
          }`}>
            {message.text}
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Form Section */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-soft p-6 border border-gray-100 sticky top-24">
              <h2 className="text-xl font-semibold text-gray-800 mb-6 border-b pb-4">
                {editingId ? 'Edit Produk' : 'Tambah Produk Baru'}
              </h2>
              
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Nama Produk *</label>
                  <input
                    type="text"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-slate-500 focus:border-slate-500 outline-none transition-all"
                    placeholder="Contoh: 52 Skin Retouching Preset"
                    disabled={editingId !== null} // Prevent changing ID since we use name as ID for new creations
                  />
                  {editingId && <p className="text-xs text-gray-500 mt-1">Nama tidak bisa diubah saat diedit karena berfungsi sebagai ID Dokumen.</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Kategori *</label>
                  <input
                    type="text"
                    name="category"
                    required
                    value={formData.category}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-slate-500 focus:border-slate-500 outline-none transition-all"
                    placeholder="Contoh: Template Lightroom"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Harga *</label>
                    <input
                      type="number"
                      name="price"
                      required
                      min="0"
                      step="0.01"
                      value={formData.price}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-slate-500 focus:border-slate-500 outline-none transition-all"
                      placeholder="Contoh: 1"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Tipe</label>
                    <input
                      type="text"
                      name="type"
                      value={formData.type}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-slate-500 focus:border-slate-500 outline-none transition-all"
                      placeholder="Contoh: digital"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">URL Unduhan File *</label>
                  <input
                    type="url"
                    name="file_url"
                    required
                    value={formData.file_url}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-slate-500 focus:border-slate-500 outline-none transition-all"
                    placeholder="https://drive.google.com/..."
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">URL Gambar</label>
                  <input
                    type="url"
                    name="image"
                    value={formData.image}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-slate-500 focus:border-slate-500 outline-none transition-all"
                    placeholder="Biarkan kosong untuk gambar default"
                  />
                  <p className="text-xs text-slate-500 mt-1">Jika kosong, defaultnya https://picsum.photos/400</p>
                </div>

                <div className="pt-4 flex gap-3">
                  <button
                    type="submit"
                    disabled={formLoading}
                    className="flex-1 bg-slate-800 text-white py-2.5 px-4 rounded-lg font-medium hover:bg-slate-700 transition-colors shadow-sm disabled:opacity-70 disabled:cursor-not-allowed"
                  >
                    {formLoading ? 'Menyimpan...' : (editingId ? 'Perbarui Produk' : 'Tambah Produk')}
                  </button>
                  
                  {editingId && (
                    <button
                      type="button"
                      onClick={cancelEdit}
                      className="px-4 py-2.5 bg-gray-100 text-gray-700 rounded-lg font-medium hover:bg-gray-200 transition-colors"
                    >
                      Batal
                    </button>
                  )}
                </div>
              </form>
            </div>
          </div>

          {/* List Section */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-soft border border-gray-100 overflow-hidden">
              <div className="p-6 border-b border-gray-100 bg-gray-50/50 flex flex-col sm:flex-row justify-between items-center gap-4">
                <h2 className="text-xl font-semibold text-gray-800">Inventaris Produk</h2>
                
                {/* Search & Filter Controls */}
                <div className="flex flex-col sm:flex-row w-full sm:w-auto gap-3">
                  <div className="relative">
                    <svg className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                    <input
                      type="text"
                      placeholder="Cari produk..."
                      value={searchQuery}
                      onChange={(e) => {
                        setSearchQuery(e.target.value);
                        setCurrentPage(1);
                      }}
                      className="pl-9 pr-4 py-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-slate-500 outline-none w-full"
                    />
                  </div>
                  
                  <select
                    value={selectedCategory}
                    onChange={(e) => {
                      setSelectedCategory(e.target.value);
                      setCurrentPage(1);
                    }}
                    className="px-4 py-2 border border-gray-200 rounded-lg text-sm bg-white focus:ring-2 focus:ring-slate-500 outline-none w-full sm:w-40"
                  >
                    {categories.map(cat => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>
              </div>
              
              {loading ? (
                <div className="p-12 flex justify-center">
                  <div className="w-10 h-10 border-4 border-slate-200 border-t-slate-600 rounded-full animate-spin"></div>
                </div>
              ) : products.length === 0 ? (
                <div className="p-12 text-center text-gray-500">
                  Belum ada produk di Firebase. Mulai tambahkan!
                </div>
              ) : filteredProducts.length === 0 ? (
                <div className="p-12 text-center text-gray-500">
                  Produk tidak ditemukan. Coba sesuaikan pencarian atau filter Anda.
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="bg-gray-50 text-gray-600 text-sm">
                        <th className="p-4 font-semibold border-b">Gambar & Nama</th>
                        <th className="p-4 font-semibold border-b">Kategori</th>
                        <th className="p-4 font-semibold border-b">Harga</th>
                        <th className="p-4 font-semibold border-b text-right">Aksi</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      {currentProducts.map((product) => (
                        <tr key={product.id} className="hover:bg-slate-50 transition-colors group">
                          <td className="p-4">
                            <div className="flex items-center gap-4">
                              <img 
                                src={product.image || 'https://picsum.photos/400'} 
                                alt={product.name}
                                className="w-12 h-12 rounded-lg object-cover bg-gray-200"
                                onError={(e) => { e.target.src = 'https://picsum.photos/400'; }}
                              />
                              <div>
                                <div className="font-medium text-gray-900 line-clamp-1">{product.name}</div>
                                <div className="text-xs text-gray-400 mt-0.5">ID: {product.id}</div>
                              </div>
                            </div>
                          </td>
                          <td className="p-4 text-gray-600">
                            <span className="px-2.5 py-1 bg-slate-100 text-slate-700 rounded-full text-xs font-medium">
                              {product.category}
                            </span>
                          </td>
                          <td className="p-4 text-gray-900 font-medium">
                            Rp {Number(product.price).toLocaleString('id-ID')}
                          </td>
                          <td className="p-4 text-right">
                            <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                              <button
                                onClick={() => handleEdit(product)}
                                className="p-2 text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
                                title="Edit"
                              >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                                </svg>
                              </button>
                              <button
                                onClick={() => handleDelete(product.id)}
                                className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                                title="Delete"
                              >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                </svg>
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  
                  {/* Pagination Controls */}
                  {totalPages > 1 && (
                    <div className="p-4 border-t border-gray-100 bg-gray-50/50 flex items-center justify-between">
                      <span className="text-sm text-gray-500">
                        Menampilkan {indexOfFirstItem + 1} hingga {Math.min(indexOfLastItem, filteredProducts.length)} dari {filteredProducts.length} entri
                      </span>
                      <div className="flex gap-1">
                        <button
                          onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                          disabled={currentPage === 1}
                          className="px-3 py-1 rounded text-sm font-medium border border-gray-200 bg-white text-gray-600 hover:bg-gray-50 disabled:opacity-50"
                        >
                          Sebel
                        </button>
                        {Array.from({ length: totalPages }).map((_, i) => (
                          <button
                            key={i}
                            onClick={() => setCurrentPage(i + 1)}
                            className={`px-3 py-1 rounded text-sm font-medium border ${
                              currentPage === i + 1 
                                ? 'bg-slate-700 text-white border-slate-700' 
                                : 'bg-white text-gray-600 border-gray-200 hover:bg-gray-50'
                            }`}
                          >
                            {i + 1}
                          </button>
                        ))}
                        <button
                          onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                          disabled={currentPage === totalPages}
                          className="px-3 py-1 rounded text-sm font-medium border border-gray-200 bg-white text-gray-600 hover:bg-gray-50 disabled:opacity-50"
                        >
                          Lanjut
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
          
        </div>
      </div>
    </div>
  );
};

export default Admin;
