import React from 'react';

const Footer = () => {
  return (
    <footer className="w-full bg-global-13 mt-4">
      <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col pt-8">
          {/* Main Footer Content */}
          <div className="flex flex-col lg:flex-row justify-between items-start gap-8 lg:gap-4">
            {/* Left Section - Company Info */}
            <div className="flex flex-col lg:flex-row gap-8 lg:gap-14 w-full lg:w-2/3">
              {/* About GEARVN */}
              <div className="flex flex-col gap-3">
                <h3 className="text-global-3 text-sm font-semibold uppercase">Về GEARVN</h3>
                <div className="flex flex-col gap-3">
                  <a href="#" className="text-global-1 text-sm hover:text-global-2 transition-colors">Giới thiệu</a>
                  <a href="#" className="text-global-1 text-sm hover:text-global-2 transition-colors">Tuyển dụng</a>
                  <a href="#" className="text-global-1 text-sm hover:text-global-2 transition-colors">Liên hệ</a>
                </div>
              </div>

              {/* Policies */}
              <div className="flex flex-col gap-3">
                <h3 className="text-global-3 text-sm font-semibold uppercase">Chính sách</h3>
                <div className="flex flex-col gap-3">
                  <a href="#" className="text-global-1 text-sm hover:text-global-2 transition-colors">Chính sách bảo hành</a>
                  <a href="#" className="text-global-1 text-sm hover:text-global-2 transition-colors">Chính sách giao hàng</a>
                  <a href="#" className="text-global-1 text-sm hover:text-global-2 transition-colors">Chính sách bảo mật</a>
                </div>
              </div>

              {/* Information */}
              <div className="flex flex-col gap-3">
                <h3 className="text-global-3 text-sm font-semibold uppercase">Thông tin</h3>
                <div className="flex flex-col gap-3">
                  <a href="#" className="text-global-1 text-sm hover:text-global-2 transition-colors">Hệ thống cửa hàng</a>
                  <a href="#" className="text-global-1 text-sm hover:text-global-2 transition-colors">Hướng dẫn mua hàng</a>
                  <a href="#" className="text-global-1 text-sm hover:text-global-2 transition-colors">Hướng dẫn thanh toán</a>
                  <a href="#" className="text-global-1 text-sm hover:text-global-2 transition-colors">Hướng dẫn trả góp</a>
                  <a href="#" className="text-global-1 text-sm hover:text-global-2 transition-colors">Tra cứu địa chỉ bảo hành</a>
                  <a href="#" className="text-global-1 text-sm hover:text-global-2 transition-colors">Build PC</a>
                </div>
              </div>

              {/* Support Hotline */}
              <div className="flex flex-col gap-3">
                <h3 className="text-global-3 text-sm font-semibold uppercase">
                  <span className="font-semibold">TỔNG ĐÀI HỖ TRỢ </span>
                  <span className="font-normal">(8:00 - 21:00)</span>
                </h3>
                <div className="flex flex-col gap-2">
                  <div className="flex items-center gap-1">
                    <span className="text-global-1 text-sm">Mua hàng:</span>
                    <span className="text-global-2 text-sm font-semibold">1900.5301</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="text-global-1 text-sm">Bảo hành:</span>
                    <span className="text-global-2 text-sm font-semibold">1900.5325</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-global-1 text-sm">Khiếu nại:</span>
                    <span className="text-global-2 text-sm font-semibold">1800.6173</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-global-1 text-sm">Email:</span>
                    <span className="text-global-2 text-sm font-semibold">cskh@gearvn.com</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Section - Shipping & Payment */}
            <div className="flex flex-col gap-3 w-full lg:w-1/3 px-0 lg:px-1.5">
              {/* Shipping Partners */}
              <div className="flex flex-col gap-3">
                <h3 className="text-global-3 text-sm font-semibold uppercase">Đơn vị vận chuyển</h3>
                <div className="flex gap-1 justify-center lg:justify-start">
                  <img src="/images/img_item_h_nh_th_c.png" alt="Shipping 1" className="w-[52px] h-[22px] lg:w-[68px] lg:h-[30px]" />
                  <img src="/images/img_item_h_nh_th_c_30x68.png" alt="Shipping 2" className="w-[52px] h-[22px] lg:w-[68px] lg:h-[30px]" />
                  <img src="/images/img_item_h_nh_th_c_1.png" alt="Shipping 3" className="w-[52px] h-[22px] lg:w-[68px] lg:h-[30px]" />
                  <img src="/images/img_item_h_nh_th_c_2.png" alt="Shipping 4" className="w-[52px] h-[22px] lg:w-[68px] lg:h-[30px]" />
                </div>
              </div>

              {/* Payment Methods */}
              <div className="flex flex-col gap-3">
                <h3 className="text-global-3 text-sm font-semibold uppercase">Cách thức thanh toán</h3>
                <div className="flex flex-col gap-1">
                  <div className="flex gap-1 justify-center lg:justify-start">
                    <img src="/images/img_item_ph_ng_th_c.png" alt="Payment 1" className="w-[52px] h-[22px] lg:w-[68px] lg:h-[30px]" />
                    <img src="/images/img_item_ph_ng_th_c_30x68.png" alt="Payment 2" className="w-[52px] h-[22px] lg:w-[68px] lg:h-[30px]" />
                    <img src="/images/img_item_ph_ng_th_c_1.png" alt="Payment 3" className="w-[52px] h-[22px] lg:w-[68px] lg:h-[30px]" />
                    <img src="/images/img_item_ph_ng_th_c_2.png" alt="Payment 4" className="w-[52px] h-[22px] lg:w-[68px] lg:h-[30px]" />
                  </div>
                  <div className="flex gap-1 justify-center lg:justify-start">
                    <img src="/images/img_item_ph_ng_th_c_3.png" alt="Payment 5" className="w-[52px] h-[22px] lg:w-[68px] lg:h-[30px]" />
                    <img src="/images/img_item_ph_ng_th_c_4.png" alt="Payment 6" className="w-[52px] h-[22px] lg:w-[68px] lg:h-[30px]" />
                    <img src="/images/img_item_ph_ng_th_c_5.png" alt="Payment 7" className="w-[52px] h-[22px] lg:w-[68px] lg:h-[30px]" />
                    <img src="/images/img_item_ph_ng_th_c_6.png" alt="Payment 8" className="w-[52px] h-[22px] lg:w-[68px] lg:h-[30px]" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Section */}
          <div className="w-full bg-global-13 border-t border-global-8 mt-4 pt-4 pb-4">
            <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
              {/* Social Media */}
              <div className="flex items-center gap-4">
                <span className="text-global-3 text-sm font-semibold uppercase">Kết nối với chúng tôi</span>
                <div className="flex gap-3">
                  <img src="/images/img_gearvn_32x32.png" alt="Social 1" className="w-[24px] h-[24px] lg:w-[32px] lg:h-[32px] hover:opacity-80 transition-opacity cursor-pointer" />
                  <img src="/images/img_gearvn_1.png" alt="Social 2" className="w-[24px] h-[24px] lg:w-[32px] lg:h-[32px] hover:opacity-80 transition-opacity cursor-pointer" />
                  <img src="/images/img_gearvn_2.png" alt="Social 3" className="w-[24px] h-[24px] lg:w-[32px] lg:h-[32px] hover:opacity-80 transition-opacity cursor-pointer" />
                  <img src="/images/img_gearvn_3.png" alt="Social 4" className="w-[24px] h-[24px] lg:w-[32px] lg:h-[32px] hover:opacity-80 transition-opacity cursor-pointer" />
                  <img src="/images/img_gearvn_4.png" alt="Social 5" className="w-[24px] h-[24px] lg:w-[32px] lg:h-[32px] hover:opacity-80 transition-opacity cursor-pointer" />
                </div>
              </div>

              {/* Certification */}
              <div className="flex justify-center lg:justify-end">
                <img src="/images/img_b_c_ng_th_ng.png" alt="Certification" className="w-[100px] h-[40px] lg:w-[132px] lg:h-[52px]" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;