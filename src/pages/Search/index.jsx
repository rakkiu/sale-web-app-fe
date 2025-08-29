import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { searchProducts, getCategories } from '../../services/productService';
import Header from '../../components/common/Header';
import Footer from '../../components/common/Footer';
import Button from '../../components/ui/Button';

const Search = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [totalElements, setTotalElements] = useState(0);
  
  // Filter states
  const [sortBy, setSortBy] = useState('createdAt');
  const [sortDir, setSortDir] = useState('desc');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [priceRange, setPriceRange] = useState({ min: '', max: '' });
  const [showFilters, setShowFilters] = useState(false);

  // Get search query from URL
  const searchParams = new URLSearchParams(location.search);
  const query = searchParams.get('q') || '';

  useEffect(() => {
    fetchCategories();
  }, []);

  useEffect(() => {
    if (query) {
      performSearch(query, currentPage, sortBy, sortDir, selectedCategory, priceRange);
    }
  }, [query, currentPage, sortBy, sortDir, selectedCategory, priceRange]);

  const fetchCategories = async () => {
    try {
      const categoriesData = await getCategories();
      setCategories(categoriesData || []);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  const performSearch = async (searchQuery, page = 0, sort = 'createdAt', dir = 'desc', categoryId = '', priceFilter = {}) => {
    try {
      setLoading(true);
      setError(null);

      const searchParams = {
        page,
        size: 12,
        sort,
        dir
      };

      if (categoryId) {
        searchParams.categoryId = categoryId;
      }

      if (priceFilter.min) {
        searchParams.minPrice = parseFloat(priceFilter.min);
      }

      if (priceFilter.max) {
        searchParams.maxPrice = parseFloat(priceFilter.max);
      }

      const response = await searchProducts(searchQuery, searchParams);

      const transformedProducts = response.content?.map(product => ({
        id: product.id,
        image: product.imageUrl || "/images/gearvn03.png",
        name: product.name,
        originalPrice: `${(product.price * 1.3).toLocaleString('vi-VN')}₫`,
        salePrice: `${product.price.toLocaleString('vi-VN')}₫`,
        discount: "-23%",
        rating: "4.5",
        reviews: `(${Math.floor(Math.random() * 50)} đánh giá)`,
        stock: product.stock || 0,
        categoryName: product.categoryName,
        manufacturer: product.manufacturer,
        badge: Math.random() > 0.5 ? "Bán chạy" : "Mới"
      })) || [];

      setProducts(transformedProducts);
      setTotalPages(response.totalPages || 0);
      setTotalElements(response.totalElements || 0);
    } catch (err) {
      console.error('Search error:', err);
      setError('Không thể thực hiện tìm kiếm. Vui lòng thử lại.');
    } finally {
      setLoading(false);
    }
  };

  const handleSortChange = (sort, dir) => {
    setSortBy(sort);
    setSortDir(dir);
    setCurrentPage(0);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo(0, 0);
  };

  const handleProductClick = (productId) => {
    navigate(`/product/${productId}`);
  };

  const handleCategoryFilter = (categoryId) => {
    setSelectedCategory(categoryId);
    setCurrentPage(0);
  };

  const handlePriceFilter = () => {
    setCurrentPage(0);
  };

  const clearFilters = () => {
    setSelectedCategory('');
    setPriceRange({ min: '', max: '' });
    setCurrentPage(0);
  };

  const ProductCard = ({ product }) => (
    <div 
      className="bg-white rounded-[8px] shadow-sm hover:shadow-md transition-all duration-300 cursor-pointer border border-gray-100 group overflow-hidden"
      onClick={() => handleProductClick(product.id)}
    >
      <div className="relative">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-[180px] object-cover group-hover:scale-105 transition-transform duration-300"
        />
        {product.discount && (
          <div className="absolute top-2 left-2 bg-red-500 text-white px-2 py-1 rounded text-xs font-bold">
            {product.discount}
          </div>
        )}
        {product.badge && (
          <div className="absolute top-2 right-2 bg-blue-500 text-white px-2 py-1 rounded text-xs">
            {product.badge}
          </div>
        )}
        <div className="absolute bottom-2 right-2 bg-black/70 text-white px-2 py-1 rounded text-xs">
          Còn {product.stock}
        </div>
      </div>

      <div className="p-3">
        <h3 className="text-gray-800 text-sm font-medium mb-2 line-clamp-2 h-10 leading-5">
          {product.name}
        </h3>

        <div className="flex items-center gap-1 mb-2 text-xs text-gray-500">
          <span>{product.categoryName}</span>
          {product.manufacturer && (
            <>
              <span>•</span>
              <span>{product.manufacturer}</span>
            </>
          )}
        </div>

        <div className="space-y-1 mb-3">
          {product.originalPrice && (
            <p className="text-gray-400 text-xs line-through">
              {product.originalPrice}
            </p>
          )}
          <div className="flex items-center justify-between">
            <span className="text-red-600 text-lg font-bold">
              {product.salePrice}
            </span>
            {product.discount && (
              <span className="bg-red-50 text-red-600 text-xs px-2 py-1 rounded border border-red-200">
                {product.discount}
              </span>
            )}
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1">
            <div className="flex text-yellow-400 text-xs">
              {"★".repeat(Math.floor(parseFloat(product.rating)))}
              {"☆".repeat(5 - Math.floor(parseFloat(product.rating)))}
            </div>
            <span className="text-gray-500 text-xs">{product.reviews}</span>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="w-full bg-gray-50 min-h-screen">
      {/* Top Banner */}
      <div className="w-full bg-global-3">
        <div className="w-full max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
          <img
            src="/images/img_pc_gvn_th_ng_8.png"
            alt="Top Banner"
            className="w-full h-[30px] sm:h-[36px] md:h-[46px] object-cover"
          />
        </div>
      </div>

      <Header />

      {/* Breadcrumb */}
      <div className="w-full bg-white shadow-sm">
        <div className="w-full max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 py-3 text-sm">
            <button onClick={() => navigate('/')} className="text-blue-600 hover:underline">
              Trang chủ
            </button>
            <span className="text-gray-400">›</span>
            <span className="text-gray-700">Kết quả tìm kiếm cho "{query}"</span>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="w-full">
        <div className="w-full max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex gap-6 py-6">
            {/* Left Sidebar - Filters */}
            <div className="hidden lg:block w-[200px] flex-shrink-0">
              <div className="bg-white rounded-lg shadow-sm p-4 sticky top-4">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-800">Bộ lọc</h3>
                  <button
                    onClick={clearFilters}
                    className="text-sm text-blue-600 hover:underline"
                  >
                    Xóa tất cả
                  </button>
                </div>

                {/* Category Filter */}
                <div className="mb-6">
                  <h4 className="font-medium text-gray-700 mb-3">Danh mục</h4>
                  <div className="space-y-2 max-h-48 overflow-y-auto">
                    <button
                      onClick={() => handleCategoryFilter('')}
                      className={`w-full text-left px-3 py-2 rounded text-sm transition-colors ${
                        selectedCategory === '' 
                          ? 'bg-blue-50 text-blue-600 font-medium' 
                          : 'text-gray-600 hover:bg-gray-50'
                      }`}
                    >
                      Tất cả danh mục
                    </button>
                    {categories.map((category) => (
                      <button
                        key={category.id}
                        onClick={() => handleCategoryFilter(category.id)}
                        className={`w-full text-left px-3 py-2 rounded text-sm transition-colors ${
                          selectedCategory === category.id 
                            ? 'bg-blue-50 text-blue-600 font-medium' 
                            : 'text-gray-600 hover:bg-gray-50'
                        }`}
                      >
                        {category.name}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Price Filter */}
                <div className="mb-6">
                  <h4 className="font-medium text-gray-700 mb-3">Khoảng giá</h4>
                  <div className="space-y-3">
                    <input
                      type="number"
                      placeholder="Giá từ"
                      value={priceRange.min}
                      onChange={(e) => setPriceRange({...priceRange, min: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded text-sm"
                    />
                    <input
                      type="number"
                      placeholder="Giá đến"
                      value={priceRange.max}
                      onChange={(e) => setPriceRange({...priceRange, max: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded text-sm"
                    />
                    <button
                      onClick={handlePriceFilter}
                      className="w-full bg-blue-600 text-white py-2 rounded text-sm hover:bg-blue-700"
                    >
                      Áp dụng
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Content */}
            <div className="flex-1">
              {/* Search Header */}
              <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                  <div>
                    <h1 className="text-xl font-bold text-gray-800 mb-2">
                      TÌM KIẾM
                    </h1>
                    <p className="text-gray-600">
                      Tìm kiếm theo i5. 
                      {!loading && totalElements > 0 && (
                        <span className="ml-2 font-medium">
                          Tìm thấy {totalElements} sản phẩm
                        </span>
                      )}
                    </p>
                  </div>

                  {/* Mobile Filter Toggle */}
                  <div className="flex items-center gap-4">
                    <button
                      onClick={() => setShowFilters(!showFilters)}
                      className="lg:hidden bg-gray-100 px-4 py-2 rounded-lg text-sm font-medium"
                    >
                      🔍 Bộ lọc
                    </button>

                    {/* Sort Options */}
                    <div className="flex items-center gap-2">
                      <select
                        className="border border-gray-300 rounded-lg px-3 py-2 text-sm bg-white"
                        value={`${sortBy}-${sortDir}`}
                        onChange={(e) => {
                          const [sort, dir] = e.target.value.split('-');
                          handleSortChange(sort, dir);
                        }}
                      >
                        <option value="createdAt-desc">Mới nhất</option>
                        <option value="price-asc">Giá tăng dần</option>
                        <option value="price-desc">Giá giảm dần</option>
                        <option value="name-asc">Tên A-Z</option>
                        <option value="name-desc">Tên Z-A</option>
                      </select>
                    </div>
                  </div>
                </div>

                {/* Active Filters */}
                {(selectedCategory || priceRange.min || priceRange.max) && (
                  <div className="flex flex-wrap items-center gap-2 mt-4 pt-4 border-t border-gray-200">
                    <span className="text-sm text-gray-600">Lọc theo:</span>
                    {selectedCategory && (
                      <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm">
                        {categories.find(c => c.id === selectedCategory)?.name}
                        <button
                          onClick={() => setSelectedCategory('')}
                          className="ml-2 text-blue-500 hover:text-blue-700"
                        >
                          ×
                        </button>
                      </span>
                    )}
                    {(priceRange.min || priceRange.max) && (
                      <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm">
                        {priceRange.min && `Từ ${parseInt(priceRange.min).toLocaleString('vi-VN')}₫`}
                        {priceRange.min && priceRange.max && ' - '}
                        {priceRange.max && `Đến ${parseInt(priceRange.max).toLocaleString('vi-VN')}₫`}
                        <button
                          onClick={() => setPriceRange({ min: '', max: '' })}
                          className="ml-2 text-green-500 hover:text-green-700"
                        >
                          ×
                        </button>
                      </span>
                    )}
                  </div>
                )}
              </div>

              {/* Loading State */}
              {loading && (
                <div className="bg-white rounded-lg shadow-sm p-12">
                  <div className="flex justify-center items-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
                    <span className="ml-4 text-gray-600">Đang tìm kiếm...</span>
                  </div>
                </div>
              )}

              {/* Error State */}
              {error && !loading && (
                <div className="bg-white rounded-lg shadow-sm p-12">
                  <div className="text-red-500 text-center">
                    <p className="mb-4">{error}</p>
                    <Button 
                      onClick={() => performSearch(query, 0, sortBy, sortDir)}
                      className="bg-red-500 text-white px-6 py-2 rounded-lg hover:bg-red-600"
                    >
                      Thử lại
                    </Button>
                  </div>
                </div>
              )}

              {/* No Results */}
              {!loading && !error && products.length === 0 && query && (
                <div className="bg-white rounded-lg shadow-sm p-12">
                  <div className="text-gray-500 text-center">
                    <div className="text-6xl mb-4">🔍</div>
                    <p className="text-lg mb-2">Không tìm thấy sản phẩm nào</p>
                    <p className="mb-6">Thử tìm kiếm với từ khóa khác hoặc điều chỉnh bộ lọc</p>
                    <div className="flex gap-4 justify-center">
                      <Button 
                        onClick={clearFilters}
                        className="bg-gray-500 text-white px-6 py-2 rounded-lg hover:bg-gray-600"
                      >
                        Xóa bộ lọc
                      </Button>
                      <Button 
                        onClick={() => navigate('/')}
                        className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
                      >
                        Về trang chủ
                      </Button>
                    </div>
                  </div>
                </div>
              )}

              {/* Products Grid */}
              {!loading && products.length > 0 && (
                <div className="bg-white rounded-lg shadow-sm p-4">
                  <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                    {products.map((product) => (
                      <ProductCard key={product.id} product={product} />
                    ))}
                  </div>

                  {/* Pagination */}
                  {totalPages > 1 && (
                    <div className="flex justify-center items-center gap-2 mt-8 pt-6 border-t border-gray-200">
                      <Button
                        disabled={currentPage === 0}
                        onClick={() => handlePageChange(currentPage - 1)}
                        className="px-4 py-2 border border-gray-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
                      >
                        « Trước
                      </Button>

                      {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                        let pageNum;
                        if (totalPages <= 5) {
                          pageNum = i;
                        } else if (currentPage < 3) {
                          pageNum = i;
                        } else if (currentPage > totalPages - 4) {
                          pageNum = totalPages - 5 + i;
                        } else {
                          pageNum = currentPage - 2 + i;
                        }

                        return (
                          <Button
                            key={pageNum}
                            onClick={() => handlePageChange(pageNum)}
                            className={`px-4 py-2 border rounded-lg transition-colors ${
                              currentPage === pageNum 
                                ? 'bg-blue-600 text-white border-blue-600' 
                                : 'border-gray-300 text-gray-700 hover:bg-gray-50'
                            }`}
                          >
                            {pageNum + 1}
                          </Button>
                        );
                      })}

                      <Button
                        disabled={currentPage >= totalPages - 1}
                        onClick={() => handlePageChange(currentPage + 1)}
                        className="px-4 py-2 border border-gray-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
                      >
                        Sau »
                      </Button>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Search;