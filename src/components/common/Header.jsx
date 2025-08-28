import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../../redux/features/userSlice';
import api from '../../config/axios';
import Button from '../ui/Button';
import LoginModal from '../modals/LoginModal'; // Import LoginModal

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [userProfile, setUserProfile] = useState(null);
  const [showDropdown, setShowDropdown] = useState(false);
  const [showLoginDropdown, setShowLoginDropdown] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false); // Thêm state cho modal
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { token, isAuthenticated } = useSelector((state) => state.user);

  // Fetch user profile khi đã đăng nhập
  useEffect(() => {
    const fetchProfile = async () => {
      if (isAuthenticated && token) {
        try {
          const response = await api.get('/profile');
          setUserProfile(response.data);
        } catch (error) {
          console.error('Error fetching profile:', error);
          // Nếu token hết hạn, logout
          dispatch(logout());
        }
      }
    };

    fetchProfile();
  }, [isAuthenticated, token, dispatch]);

  const handleLogout = () => {
    dispatch(logout());
    setUserProfile(null);
    setShowDropdown(false);
    navigate('/');
  };

  // Hàm mở modal đăng nhập
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
                className="w-[100px] h-[22px] sm:w-[120px] sm:h-[26px] lg:w-[140px] lg:h-[30px]"
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
              <div className="flex items-center bg-global-13 border border-global-13 rounded-[4px] w-full lg:w-auto lg:flex-1 max-w-md lg:max-w-none ml-0 lg:ml-2">
                <div className="flex-1 px-4 py-2">
                  <span className="text-header-1 text-base lg:text-[16px]">Bạn cần tìm gì?</span>
                </div>
                <button className="p-2">
                  <img
                    src="/images/img_button.svg"
                    alt="Search"
                    className="w-[24px] h-[28px] lg:w-[36px] lg:h-[42px]"
                  />
                </button>
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
                <div className="flex items-center gap-3 px-2 lg:px-2">
                  <div className="relative">
                    <img
                      src="/images/img_svg_1.svg"
                      alt="Cart"
                      className="w-[14px] h-[28px] lg:w-[18px] lg:h-[42px]"
                    />
                    <span className="absolute -top-1 -right-2 bg-header-2 text-global-1 text-[8px] lg:text-[9px] font-semibold rounded-[8px] px-1 py-0.5 border-2 border-global-13">
                      0
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
                            onClick={handleOpenLoginModal} // Sử dụng hàm mở modal
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