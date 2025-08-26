import React, { useState } from 'react';
import Button from '../ui/Button';

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
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

          {/* Navigation - Hidden on mobile, shown on desktop */}
          <div className={`${menuOpen ? 'flex' : 'hidden'} lg:flex flex-col lg:flex-row items-center gap-4 lg:gap-2 w-full lg:w-auto`}>
            {/* Category Button */}
            <Button
              leftImage={{
                src: "/images/img_svg.svg",
                width: 18,
                height: 42
              }}
              className="bg-header-1 text-global-8 rounded-[4px] px-[8px] lg:px-[38px] py-2 text-[13px] font-semibold ml-0 lg:ml-4"
              onClick={() => {}}
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
              {/* Hotline */}
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

              {/* Showroom */}
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

              {/* Order Tracking */}
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

            {/* Cart and Login */}
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

              {/* Login */}
              <div className="flex items-center gap-3 bg-header-1 rounded-[4px] px-2 py-2">
                <img 
                  src="/images/img_svg_2.svg" 
                  alt="User" 
                  className="w-[14px] h-[28px] lg:w-[18px] lg:h-[42px]"
                />
                <span className="text-global-8 text-[11px] lg:text-[13px] font-semibold whitespace-pre-line">
                  Đăng{'\n'}nhập
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;