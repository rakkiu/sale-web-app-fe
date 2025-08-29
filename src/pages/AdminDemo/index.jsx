import React from 'react';
import { Link } from 'react-router-dom';

const AdminDemo = () => {
  const features = [
    {
      title: 'UC16 - Quản lý người dùng & phân quyền',
      description: 'Tạo, sửa, khóa tài khoản và gán vai trò (admin/seller/support)',
      path: '/admin/users',
      icon: '👥',
      color: 'bg-blue-500',
      features: [
        'Tạo tài khoản người dùng mới',
        'Phân quyền theo vai trò',
        'Khóa/mở khóa tài khoản',
        'Đặt lại mật khẩu',
        'Quản lý permissions'
      ]
    },
    {
      title: 'UC17 - Cấu hình hệ thống',
      description: 'Thiết lập thanh toán, vận chuyển và thuế',
      path: '/admin/config',
      icon: '⚙️',
      color: 'bg-green-500',
      features: [
        'Cấu hình cổng thanh toán (VNPay, MoMo, ZaloPay)',
        'Thiết lập hãng vận chuyển (GHN, GHTK)',
        'Cài đặt thuế VAT và nhập khẩu',
        'Test kết nối API',
        'Sandbox vs Production mode'
      ]
    },
    {
      title: 'UC18 - Báo cáo & giám sát gian lận',
      description: 'Dashboard doanh thu, tỉ lệ chuyển đổi và cảnh báo',
      path: '/admin/reports',
      icon: '📊',
      color: 'bg-purple-500',
      features: [
        'Dashboard doanh thu theo thời gian',
        'Thống kê tỉ lệ chuyển đổi',
        'Báo cáo hủy/hoàn tiền',
        'Cảnh báo gian lận thời gian thực',
        'Xuất báo cáo Excel/PDF'
      ]
    },
    {
      title: 'UC19 - Xử lý khiếu nại & tranh chấp',
      description: 'Tiếp nhận, xác minh và giải quyết ticket',
      path: '/admin/disputes',
      icon: '⚖️',
      color: 'bg-red-500',
      features: [
        'Quản lý ticket khiếu nại',
        'Timeline xử lý chi tiết',
        'Phương án giải quyết (đổi/trả/hoàn)',
        'Theo dõi SLA',
        'Leo thang xử lý'
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-600 text-white rounded-xl text-2xl font-bold mb-6">
            A
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Demo Admin Panel
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Hệ thống quản trị viên cho Sale Web App
          </p>
          
          <Link
            to="/admin"
            className="inline-flex items-center px-8 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
          >
            <span className="mr-2">🚀</span>
            Truy cập Admin Dashboard
          </Link>
        </div>

        {/* Feature Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          {features.map((feature, index) => (
            <div key={index} className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
              <div className={`${feature.color} p-6`}>
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-white bg-opacity-20 rounded-lg flex items-center justify-center text-2xl">
                    {feature.icon}
                  </div>
                  <div className="text-white">
                    <h3 className="text-xl font-bold">{feature.title}</h3>
                    <p className="opacity-90">{feature.description}</p>
                  </div>
                </div>
              </div>
              
              <div className="p-6">
                <h4 className="font-semibold text-gray-800 mb-4">Tính năng chính:</h4>
                <ul className="space-y-2 mb-6">
                  {feature.features.map((item, idx) => (
                    <li key={idx} className="flex items-start space-x-2">
                      <span className="text-green-500 mt-1">✓</span>
                      <span className="text-gray-600 text-sm">{item}</span>
                    </li>
                  ))}
                </ul>
                
                <Link
                  to={feature.path}
                  className="inline-flex items-center text-blue-600 hover:text-blue-700 font-medium"
                >
                  Xem demo →
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Quick Start Guide */}
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Hướng dẫn sử dụng</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center text-blue-600 text-xl font-bold mx-auto mb-4">
                1
              </div>
              <h3 className="font-semibold text-gray-800 mb-2">Truy cập Admin</h3>
              <p className="text-gray-600 text-sm">Nhấp vào nút "Truy cập Admin Dashboard" để vào trang quản trị</p>
            </div>
            
            <div className="text-center">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center text-green-600 text-xl font-bold mx-auto mb-4">
                2
              </div>
              <h3 className="font-semibold text-gray-800 mb-2">Khám phá chức năng</h3>
              <p className="text-gray-600 text-sm">Sử dụng menu bên trái để điều hướng qua các module khác nhau</p>
            </div>
            
            <div className="text-center">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center text-purple-600 text-xl font-bold mx-auto mb-4">
                3
              </div>
              <h3 className="font-semibold text-gray-800 mb-2">Thực hành</h3>
              <p className="text-gray-600 text-sm">Thử nghiệm các tính năng như tạo user, cấu hình hệ thống, xem báo cáo</p>
            </div>
          </div>
          
          <div className="mt-8 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
            <div className="flex items-start space-x-3">
              <span className="text-yellow-600 text-xl">💡</span>
              <div>
                <h4 className="font-medium text-yellow-800 mb-1">Demo Data</h4>
                <p className="text-yellow-700 text-sm">
                  Tất cả dữ liệu trong demo này đều là dữ liệu mẫu. Các thao tác thực hiện chỉ có tác dụng trong phiên làm việc hiện tại.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDemo;
