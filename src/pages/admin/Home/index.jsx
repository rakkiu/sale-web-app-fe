import React, { useState, useEffect } from 'react';

const AdminHome = () => {
  const [stats, setStats] = useState({
    totalUsers: 1250,
    totalOrders: 3420,
    totalRevenue: 125400000,
    pendingDisputes: 12,
    activeUsers: 892,
    conversionRate: 3.2,
    fraudAlerts: 5,
    systemHealth: 98.5
  });

  // Thêm useEffect để debug
  useEffect(() => {
    console.log('AdminHome component mounted');
  }, []);

  const recentActivities = [
    { id: 1, action: 'Tạo tài khoản mới', user: 'Nguyễn Văn A', time: '5 phút trước', type: 'user' },
    { id: 2, action: 'Cấu hình cổng thanh toán', user: 'Admin', time: '15 phút trước', type: 'config' },
    { id: 3, action: 'Xử lý khiếu nại #KN001', user: 'CS Team', time: '30 phút trước', type: 'dispute' },
    { id: 4, action: 'Cảnh báo giao dịch bất thường', user: 'System', time: '1 giờ trước', type: 'alert' },
  ];

  const getActivityIcon = (type) => {
    switch (type) {
      case 'user': return '';
      case 'config': return '';
      case 'dispute': return '';
      case 'alert': return '';
      default: return '';
    }
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(amount);
  };

  // Thêm fallback để debug
  console.log('AdminHome rendering...');

  return (
    <div className="space-y-6">
      {/* Test div để đảm bảo component render */}
      <div className="bg-red-100 p-4 rounded">
        <h1>ADMIN HOME COMPONENT LOADED</h1>
      </div>

      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl p-6 text-white">
        <h1 className="text-2xl font-bold mb-2">Chào mừng đến với Admin Panel</h1>
        <p className="opacity-90">Quản lý hệ thống bán hàng và theo dõi hoạt động kinh doanh</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Tổng người dùng</p>
              <p className="text-3xl font-bold text-gray-900">{stats.totalUsers.toLocaleString()}</p>
              <p className="text-sm text-green-600 mt-1">↗ +12% so với tháng trước</p>
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <span className="text-2xl">👥</span>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Tổng đơn hàng</p>
              <p className="text-3xl font-bold text-gray-900">{stats.totalOrders.toLocaleString()}</p>
              <p className="text-sm text-green-600 mt-1">↗ +8% so với tháng trước</p>
            </div>
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <span className="text-2xl">📦</span>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Doanh thu</p>
              <p className="text-3xl font-bold text-gray-900">{formatCurrency(stats.totalRevenue)}</p>
              <p className="text-sm text-green-600 mt-1">↗ +15% so với tháng trước</p>
            </div>
            <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
              <span className="text-2xl">💰</span>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Khiếu nại chờ xử lý</p>
              <p className="text-3xl font-bold text-gray-900">{stats.pendingDisputes}</p>
              <p className="text-sm text-red-600 mt-1">↗ +3 từ hôm qua</p>
            </div>
            <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
              <span className="text-2xl">⚖️</span>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions & Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Quick Actions */}
        <div className="bg-white p-6 rounded-xl shadow-sm border">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Thao tác nhanh</h3>
          <div className="grid grid-cols-2 gap-4">
            <button className="p-4 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors text-left">
              <div className="text-2xl mb-2">👤</div>
              <div className="font-medium text-gray-800">Tạo tài khoản</div>
              <div className="text-sm text-gray-500">Thêm người dùng mới</div>
            </button>
            
            <button className="p-4 bg-green-50 rounded-lg hover:bg-green-100 transition-colors text-left">
              <div className="text-2xl mb-2">⚙️</div>
              <div className="font-medium text-gray-800">Cấu hình hệ thống</div>
              <div className="text-sm text-gray-500">Thiết lập thanh toán</div>
            </button>
            
            <button className="p-4 bg-purple-50 rounded-lg hover:bg-purple-100 transition-colors text-left">
              <div className="text-2xl mb-2">📊</div>
              <div className="font-medium text-gray-800">Xem báo cáo</div>
              <div className="text-sm text-gray-500">Phân tích dữ liệu</div>
            </button>
            
            <button className="p-4 bg-orange-50 rounded-lg hover:bg-orange-100 transition-colors text-left">
              <div className="text-2xl mb-2">⚖️</div>
              <div className="font-medium text-gray-800">Xử lý khiếu nại</div>
              <div className="text-sm text-gray-500">Giải quyết tranh chấp</div>
            </button>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white p-6 rounded-xl shadow-sm border">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Hoạt động gần đây</h3>
          <div className="space-y-4">
            {recentActivities.map((activity) => (
              <div key={activity.id} className="flex items-start space-x-3">
                <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center text-sm">
                  {getActivityIcon(activity.type)}
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-800">{activity.action}</p>
                  <p className="text-xs text-gray-500">{activity.user} • {activity.time}</p>
                </div>
              </div>
            ))}
          </div>
          
          <button className="w-full mt-4 text-sm text-blue-600 hover:text-blue-700 font-medium">
            Xem tất cả hoạt động →
          </button>
        </div>
      </div>

      {/* System Status */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border">
          <h4 className="font-semibold text-gray-800 mb-3">Người dùng đang hoạt động</h4>
          <div className="text-2xl font-bold text-green-600">{stats.activeUsers}</div>
          <p className="text-sm text-gray-500 mt-1">Trong 24 giờ qua</p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border">
          <h4 className="font-semibold text-gray-800 mb-3">Tỉ lệ chuyển đổi</h4>
          <div className="text-2xl font-bold text-blue-600">{stats.conversionRate}%</div>
          <p className="text-sm text-gray-500 mt-1">↗ +0.3% so với tuần trước</p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border">
          <h4 className="font-semibold text-gray-800 mb-3">Trạng thái hệ thống</h4>
          <div className="flex items-center space-x-2">
            <div className="text-2xl font-bold text-green-600">{stats.systemHealth}%</div>
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
          </div>
          <p className="text-sm text-gray-500 mt-1">Tất cả dịch vụ hoạt động tốt</p>
        </div>
      </div>

      {/* Fraud Alerts */}
      {stats.fraudAlerts > 0 && (
        <div className="bg-red-50 border border-red-200 rounded-xl p-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
              <span className="text-red-600 font-bold">⚠️</span>
            </div>
            <div>
              <h4 className="font-semibold text-red-800">Cảnh báo gian lận</h4>
              <p className="text-red-600">
                Có {stats.fraudAlerts} giao dịch đáng ngờ cần được xem xét. 
                <button className="ml-1 underline font-medium">Xem chi tiết →</button>
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminHome;
