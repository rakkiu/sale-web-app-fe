import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../../redux/features/userSlice';
import api from '../../config/axios';
import Button from '../ui/Button';
import LoginModal from '../modals/LoginModal';

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [userProfile, setUserProfile] = useState(null);
  const [showDropdown, setShowDropdown] = useState(false);
  const [showLoginDropdown, setShowLoginDropdown] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  
  // Search states
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [showSearchDropdown, setShowSearchDropdown] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { token, isAuthenticated } = useSelector((state) => state.user);
  const { totalItems } = useSelector(state => state.cart);

  // Fetch user profile khi đã đăng nhập
  useEffect(() => {
    const fetchProfile = async () => {
      if (isAuthenticated && token) {
        try {
          const response = await api.get('/profile');
          setUserProfile(response.data);
        } catch (error) {
          console.error('Error fetching profile:', error);
          dispatch(logout());
        }
      }
    };

    fetchProfile();
  }, [isAuthenticated, token, dispatch]);

  // Search functionality
  const handleSearch = async (query) => {
    if (!query.trim()) {
      setSearchResults([]);
      setShowSearchDropdown(false);
      return;
    }

    try {
      setIsSearching(true);
      const response = await api.get('/catalog/products', {
        params: {
          search: query,
          size: 5, // Limit results in dropdown
          sort: 'createdAt',
          dir: 'desc'
        }
      });

      const products = response.data?.content || [];
      setSearchResults(products);
      setShowSearchDropdown(true);
    } catch (error) {
      console.error('Search error:', error);
      setSearchResults([]);
    } finally {
      setIsSearching(false);
    }
  };

  // Debounce search
  useEffect(() => {
    const debounceTimer = setTimeout(() => {
      if (searchQuery) {
        handleSearch(searchQuery);
      }
    }, 300);

    return () => clearTimeout(debounceTimer);
  }, [searchQuery]);

  const handleSearchInputChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      setShowSearchDropdown(false);
    }
  };

  const handleProductSelect = (productId) => {
    navigate(`/product/${productId}`);
    setShowSearchDropdown(false);
    setSearchQuery('');
  };

  const handleLogout = () => {
    dispatch(logout());
    setUserProfile(null);
    setShowDropdown(false);
    navigate('/');
  };

  const handleOpenLoginModal = () => {
    setShowLoginDropdown(false);
    setShowLoginModal(true);
  };

  return (
    <>
      <header className="w-full bg-global-7">
        <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row justify-center items-center py-4 lg:py-4 gap-4 lg:gap-0">
            {/* Mobile Menu Toggle */}
            <button
              className="block lg:hidden p-2 text-global-8"
              aria-label="Open menu"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>

            {/* Logo */}
            <div className="flex justify-center lg:justify-start lg:flex-1">
              <img
                src="/images/img_link.svg"
                alt="FPT Shop Logo"
                className="w-[100px] h-[22px] sm:w-[120px] sm:h-[26px] lg:w-[140px] lg:h-[30px] cursor-pointer"
                onClick={() => navigate('/')}
              />
            </div>

            {/* Navigation */}
            <div className={`${menuOpen ? 'flex' : 'hidden'} lg:flex flex-col lg:flex-row items-center gap-4 lg:gap-2 w-full lg:w-auto`}>
              {/* Category Button */}
              <Button
                leftImage={{
                  src: "/images/img_svg.svg",
                  width: 18,
                  height: 42
                }}
                className="bg-header-1 text-global-8 rounded-[4px] px-[8px] lg:px-[38px] py-2 text-[13px] font-semibold ml-0 lg:ml-4"
                onClick={() => { }}
              >
                Danh mục
              </Button>

              {/* Search Bar */}
              <div className="relative w-full lg:w-auto lg:flex-1 max-w-md lg:max-w-none ml-0 lg:ml-2">
                <form onSubmit={handleSearchSubmit} className="flex items-center bg-global-13 border border-global-13 rounded-[4px]">
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={handleSearchInputChange}
                    placeholder="Bạn cần tìm gì?"
                    className="flex-1 px-4 py-2 text-header-1 text-base lg:text-[16px] bg-transparent border-none outline-none"
                    onFocus={() => {
                      if (searchQuery && searchResults.length > 0) {
                        setShowSearchDropdown(true);
                      }
                    }}
                  />
                  <button type="submit" className="p-2">
                    <img
                      src="/images/img_button.svg"
                      alt="Search"
                      className="w-[24px] h-[28px] lg:w-[36px] lg:h-[42px]"
                    />
                  </button>
                </form>

                {/* Search Dropdown */}
                {showSearchDropdown && (
                  <div className="absolute top-full left-0 right-0 bg-white border border-gray-200 rounded-[4px] shadow-lg z-50 mt-1 max-h-80 overflow-y-auto">
                    {isSearching ? (
                      <div className="p-4 text-center">
                        <div className="inline-block animate-spin rounded-full h-4 w-4 border-b-2 border-global-3"></div>
                        <span className="ml-2 text-sm text-gray-600">Đang tìm kiếm...</span>
                      </div>
                    ) : searchResults.length > 0 ? (
                      <>
                        {searchResults.map((product) => (
                          <div
                            key={product.id}
                            className="flex items-center p-3 hover:bg-gray-50 cursor-pointer border-b border-gray-100 last:border-b-0"
                            onClick={() => handleProductSelect(product.id)}
                          >
                            <img
                              src={product.imageUrl || "/images/gearvn03.png"}
                              alt={product.name}
                              className="w-12 h-12 object-cover rounded mr-3"
                            />
                            <div className="flex-1">
                              <h4 className="text-sm font-medium text-gray-900 line-clamp-1">
                                {product.name}
                              </h4>
                              <p className="text-sm text-red-600 font-semibold">
                                {product.price.toLocaleString('vi-VN')}₫
                              </p>
                              <p className="text-xs text-gray-500">
                                {product.categoryName}
                              </p>
                            </div>
                          </div>
                        ))}
                        <div className="p-3 border-t border-gray-100">
                          <button
                            onClick={handleSearchSubmit}
                            className="w-full text-center text-sm text-global-2 hover:underline"
                          >
                            Xem tất cả kết quả cho "{searchQuery}"
                          </button>
                        </div>
                      </>
                    ) : searchQuery ? (
                      <div className="p-4 text-center text-sm text-gray-500">
                        Không tìm thấy sản phẩm nào cho "{searchQuery}"
                      </div>
                    ) : null}
                  </div>
                )}
              </div>

              {/* Contact Info */}
              <div className="flex flex-col sm:flex-row gap-2 lg:gap-1 ml-0 lg:ml-2">
                <div className="flex items-center gap-3 px-2 lg:px-2">
                  <img
                    src="/images/img_svg_white_a700.svg"
                    alt="Phone"
                    className="w-[14px] h-[28px] lg:w-[18px] lg:h-[42px]"
                  />
                  <div className="flex flex-col">
                    <span className="text-global-8 text-[11px] lg:text-[13px] font-semibold">Hotline</span>
                    <span className="text-global-8 text-[11px] lg:text-[13px] font-semibold">1900.5301</span>
                  </div>
                </div>

                <div className="flex items-center gap-3 px-2 lg:px-2">
                  <img
                    src="/images/img_svg_white_a700_42x18.svg"
                    alt="Location"
                    className="w-[14px] h-[28px] lg:w-[18px] lg:h-[42px]"
                  />
                  <div className="flex flex-col">
                    <span className="text-global-8 text-[11px] lg:text-[13px] font-semibold">Hệ thống</span>
                    <span className="text-global-8 text-[11px] lg:text-[13px] font-semibold">Showroom</span>
                  </div>
                </div>

                <div className="flex items-center gap-3 px-2 lg:px-2">
                  <img
                    src="/images/img_svg_42x18.svg"
                    alt="Order"
                    className="w-[14px] h-[28px] lg:w-[18px] lg:h-[42px]"
                  />
                  <div className="flex flex-col">
                    <span className="text-global-8 text-[11px] lg:text-[13px] font-semibold">Tra cứu</span>
                    <span className="text-global-8 text-[11px] lg:text-[13px] font-semibold">đơn hàng</span>
                  </div>
                </div>
              </div>

              {/* Cart and User */}
              <div className="flex items-center gap-2 lg:gap-1 ml-0 lg:ml-2">
                {/* Cart */}
                <div 
                  className="flex items-center gap-3 px-2 lg:px-2 cursor-pointer"
                  onClick={() => navigate('/cart')}
                >
                  <div className="relative">
                    <img
                      src="/images/img_svg_1.svg"
                      alt="Cart"
                      className="w-[14px] h-[28px] lg:w-[18px] lg:h-[42px]"
                    />
                    <span className="absolute -top-1 -right-2 bg-header-2 text-global-1 text-[8px] lg:text-[9px] font-semibold rounded-[8px] px-1 py-0.5 border-2 border-global-13">
                      {totalItems || 0}
                    </span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-global-8 text-[11px] lg:text-[13px] font-semibold">Giỏ</span>
                    <span className="text-global-8 text-[11px] lg:text-[13px] font-semibold">hàng</span>
                  </div>
                </div>

                {/* User Login/Profile */}
                {isAuthenticated && userProfile ? (
                  <div 
                    className="relative"
                    onMouseEnter={() => setShowDropdown(true)}
                    onMouseLeave={() => setShowDropdown(false)}
                  >
                    <div
                      className="flex items-center gap-3 bg-header-1 rounded-[4px] px-2 py-2 cursor-pointer"
                      onClick={() => setShowDropdown(!showDropdown)}
                    >
                      <img
                        src="/images/img_svg_2.svg"
                        alt="User"
                        className="w-[14px] h-[28px] lg:w-[18px] lg:h-[42px]"
                      />
                      <span className="text-global-8 text-[11px] lg:text-[13px] font-semibold">
                        {userProfile.name || userProfile.username}
                      </span>
                    </div>

                    {showDropdown && (
                      <div 
                        className="absolute right-0 top-full bg-white border rounded shadow-lg py-2 w-48 z-50"
                        onMouseEnter={() => setShowDropdown(true)}
                        onMouseLeave={() => setShowDropdown(false)}
                      >
                        <div className="flex items-center gap-3 px-4 py-3 border-b border-gray-100">
                          <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                          </svg>
                          <span className="text-sm text-gray-700">Xin chào, {userProfile?.name || userProfile?.username || 'Vo Tuan Khoi'}</span>
                        </div>

                        <button
                          className="w-full text-left px-4 py-3 text-sm hover:bg-gray-50 flex items-center gap-3"
                          onClick={() => {
                            navigate('/orders');
                            setShowDropdown(false);
                          }}
                        >
                          <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                          </svg>
                          <span>Đơn hàng của tôi</span>
                        </button>

                        <button
                          className="w-full text-left px-4 py-3 text-sm hover:bg-gray-50 flex items-center gap-3"
                          onClick={() => {
                            navigate('/recently-viewed');
                            setShowDropdown(false);
                          }}
                        >
                          <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                          </svg>
                          <span>Đã xem gần đây</span>
                        </button>

                        <button
                          className="w-full text-left px-4 py-3 text-sm hover:bg-gray-50 flex items-center gap-3"
                          onClick={handleLogout}
                        >
                          <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                          </svg>
                          <span>Đăng xuất</span>
                        </button>
                      </div>
                    )}
                  </div>
                ) : (
                  <div
                    className="relative"
                    onMouseEnter={() => setShowLoginDropdown(true)}
                    onMouseLeave={() => setShowLoginDropdown(false)}
                  >
                    <div
                      className="flex items-center gap-3 bg-header-1 rounded-[4px] px-2 py-2 cursor-pointer"
                    >
                      <img
                        src="/images/img_svg_2.svg"
                        alt="User"
                        className="w-[14px] h-[28px] lg:w-[18px] lg:h-[42px]"
                      />
                      <span className="text-global-8 text-[11px] lg:text-[13px] font-semibold whitespace-pre-line">
                        Đăng{'\n'}nhập
                      </span>
                    </div>

                    {/* Login Dropdown */}
                    {showLoginDropdown && (
                      <div
                        className="absolute right-0 top-full bg-white border rounded shadow-lg py-4 px-4 w-64 z-50"
                        onMouseEnter={() => setShowLoginDropdown(true)}
                        onMouseLeave={() => setShowLoginDropdown(false)}
                      >
                        <div className="flex items-center gap-2 mb-3">
                          <img
                            src="/images/img_svg_2.svg"
                            alt="User"
                            className="w-6 h-6"
                          />
                          <span className="text-sm text-gray-600">Xin chào, vui lòng đăng nhập</span>
                        </div>

                        <div className="flex gap-2 mb-3">
                          <button
                            className="flex-1 bg-gray-800 text-white py-2 px-4 rounded text-sm font-medium hover:bg-gray-700"
                            onClick={handleOpenLoginModal}
                          >
                            ĐĂNG NHẬP
                          </button>
                          <button
                            className="flex-1 border border-gray-300 text-gray-700 py-2 px-4 rounded text-sm font-medium hover:bg-gray-50"
                            onClick={() => navigate('/register')}
                          >
                            ĐĂNG KÝ
                          </button>
                        </div>

                        <div className="flex items-center gap-1 text-xs text-gray-500">
                          <span>❓</span>
                          <span>Trợ giúp</span>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Click outside to close search dropdown */}
        {showSearchDropdown && (
          <div 
            className="fixed inset-0 z-40" 
            onClick={() => setShowSearchDropdown(false)}
          />
        )}
      </header>

      {/* Login Modal */}
      <LoginModal
        isOpen={showLoginModal}
        onClose={() => setShowLoginModal(false)}
      />
    </>
  );
};

export default Header;