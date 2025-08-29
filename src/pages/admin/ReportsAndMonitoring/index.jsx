import React, { useState, useEffect } from 'react';

const ReportsAndMonitoring = () => {
  const [dateRange, setDateRange] = useState({
    from: '2025-08-01',
    to: '2025-08-28'
  });
  const [selectedSeller, setSelectedSeller] = useState('');
  const [reportType, setReportType] = useState('overview');

  // Mock data
  const [dashboardData, setDashboardData] = useState({
    revenue: {
      total: 125400000,
      growth: 15.2,
      daily: [
        { date: '2025-08-24', amount: 4200000 },
        { date: '2025-08-25', amount: 3800000 },
        { date: '2025-08-26', amount: 5100000 },
        { date: '2025-08-27', amount: 4600000 },
        { date: '2025-08-28', amount: 3900000 }
      ]
    },
    conversionRate: {
      current: 3.2,
      previous: 2.9,
      byChannel: [
        { channel: 'Organic', rate: 4.1 },
        { channel: 'Paid Ads', rate: 2.8 },
        { channel: 'Social Media', rate: 3.5 },
        { channel: 'Email', rate: 5.2 }
      ]
    },
    orders: {
      total: 3420,
      cancelled: 156,
      refunded: 89,
      cancelRate: 4.6,
      refundRate: 2.6
    },
    fraudAlerts: [
      {
        id: 1,
        type: 'high_failure_rate',
        description: 'Tỷ lệ giao dịch thất bại cao từ IP 192.168.1.100',
        severity: 'high',
        timestamp: '2025-08-28 14:30',
        status: 'pending'
      },
      {
        id: 2,
        type: 'multiple_cards',
        description: 'Một user sử dụng nhiều thẻ khác nhau trong 1 giờ',
        severity: 'medium',
        timestamp: '2025-08-28 13:15',
        status: 'investigating'
      },
      {
        id: 3,
        type: 'chargeback',
        description: 'Có 3 chargeback từ cùng 1 ngân hàng trong ngày',
        severity: 'high',
        timestamp: '2025-08-28 10:45',
        status: 'resolved'
      }
    ],
    sellers: [
      { id: 'all', name: 'Tất cả seller' },
      { id: 'seller1', name: 'TechStore VN' },
      { id: 'seller2', name: 'Fashion Plus' },
      { id: 'seller3', name: 'Home & Living' }
    ]
  });

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(amount);
  };

  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'high': return 'text-red-700 bg-red-100';
      case 'medium': return 'text-yellow-700 bg-yellow-100';
      case 'low': return 'text-green-700 bg-green-100';
      default: return 'text-gray-700 bg-gray-100';
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'resolved': return 'text-green-700 bg-green-100';
      case 'investigating': return 'text-blue-700 bg-blue-100';
      case 'pending': return 'text-orange-700 bg-orange-100';
      default: return 'text-gray-700 bg-gray-100';
    }
  };

  const exportReport = (format) => {
    // Simulate export
    alert(`Đang xuất báo cáo dạng ${format.toUpperCase()}...`);
  };

  const handleAlertAction = (alertId, action) => {
    setDashboardData(prev => ({
      ...prev,
      fraudAlerts: prev.fraudAlerts.map(alert =>
        alert.id === alertId
          ? { ...alert, status: action === 'resolve' ? 'resolved' : 'investigating' }
          : alert
      )
    }));
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Báo cáo & Giám sát gian lận</h1>
          <p className="text-gray-600 mt-1">UC18 - Dashboard doanh thu, tỉ lệ chuyển đổi và cảnh báo gian lận</p>
        </div>
        <div className="flex items-center space-x-3">
          <button
            onClick={() => exportReport('excel')}
            className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 flex items-center space-x-2"
          >
            <span>📊</span>
            <span>Xuất Excel</span>
          </button>
          <button
            onClick={() => exportReport('pdf')}
            className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 flex items-center space-x-2"
          >
            <span>📄</span>
            <span>Xuất PDF</span>
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white p-4 rounded-xl shadow-sm border">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Từ ngày</label>
            <input
              type="date"
              value={dateRange.from}
              onChange={(e) => setDateRange({...dateRange, from: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Đến ngày</label>
            <input
              type="date"
              value={dateRange.to}
              onChange={(e) => setDateRange({...dateRange, to: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Seller</label>
            <select
              value={selectedSeller}
              onChange={(e) => setSelectedSeller(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              {dashboardData.sellers.map(seller => (
                <option key={seller.id} value={seller.id}>{seller.name}</option>
              ))}
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Loại báo cáo</label>
            <select
              value={reportType}
              onChange={(e) => setReportType(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="overview">Tổng quan</option>
              <option value="revenue">Doanh thu</option>
              <option value="fraud">Gian lận</option>
              <option value="conversion">Chuyển đổi</option>
            </select>
          </div>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Tổng doanh thu</p>
              <p className="text-3xl font-bold text-gray-900">{formatCurrency(dashboardData.revenue.total)}</p>
              <p className="text-sm text-green-600 mt-1">↗ +{dashboardData.revenue.growth}% so với tháng trước</p>
            </div>
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <span className="text-2xl">💰</span>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Tỉ lệ chuyển đổi</p>
              <p className="text-3xl font-bold text-gray-900">{dashboardData.conversionRate.current}%</p>
              <p className="text-sm text-green-600 mt-1">
                ↗ +{(dashboardData.conversionRate.current - dashboardData.conversionRate.previous).toFixed(1)}% so với trước
              </p>
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <span className="text-2xl">📈</span>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Tỉ lệ hủy đơn</p>
              <p className="text-3xl font-bold text-gray-900">{dashboardData.orders.cancelRate}%</p>
              <p className="text-sm text-gray-500 mt-1">{dashboardData.orders.cancelled} đơn bị hủy</p>
            </div>
            <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
              <span className="text-2xl">❌</span>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Tỉ lệ hoàn tiền</p>
              <p className="text-3xl font-bold text-gray-900">{dashboardData.orders.refundRate}%</p>
              <p className="text-sm text-gray-500 mt-1">{dashboardData.orders.refunded} đơn hoàn tiền</p>
            </div>
            <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
              <span className="text-2xl">🔄</span>
            </div>
          </div>
        </div>
      </div>

      {/* Charts & Analytics */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Revenue Chart */}
        <div className="bg-white p-6 rounded-xl shadow-sm border">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Doanh thu 7 ngày qua</h3>
          <div className="h-64 flex items-end justify-between space-x-2">
            {dashboardData.revenue.daily.map((day, index) => {
              const maxAmount = Math.max(...dashboardData.revenue.daily.map(d => d.amount));
              const height = (day.amount / maxAmount) * 100;
              
              return (
                <div key={index} className="flex-1 flex flex-col items-center">
                  <div className="text-xs text-gray-500 mb-2">
                    {formatCurrency(day.amount)}
                  </div>
                  <div
                    className="w-full bg-blue-500 rounded-t"
                    style={{ height: `${height}%` }}
                  ></div>
                  <div className="text-xs text-gray-500 mt-2 transform rotate-45">
                    {new Date(day.date).toLocaleDateString('vi-VN', { day: '2-digit', month: '2-digit' })}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Conversion Rate by Channel */}
        <div className="bg-white p-6 rounded-xl shadow-sm border">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Tỉ lệ chuyển đổi theo kênh</h3>
          <div className="space-y-4">
            {dashboardData.conversionRate.byChannel.map((channel, index) => (
              <div key={index} className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-700">{channel.channel}</span>
                <div className="flex items-center space-x-3">
                  <div className="w-32 bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-blue-600 h-2 rounded-full"
                      style={{ width: `${(channel.rate / 6) * 100}%` }}
                    ></div>
                  </div>
                  <span className="text-sm font-semibold text-blue-600 w-12">{channel.rate}%</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Fraud Alerts */}
      <div className="bg-white rounded-xl shadow-sm border">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-gray-800">Cảnh báo gian lận</h3>
            <span className="px-3 py-1 bg-red-100 text-red-800 text-sm font-medium rounded-full">
              {dashboardData.fraudAlerts.filter(alert => alert.status === 'pending').length} cảnh báo mới
            </span>
          </div>
        </div>

        <div className="p-6">
          <div className="space-y-4">
            {dashboardData.fraudAlerts.map((alert) => (
              <div key={alert.id} className="border border-gray-200 rounded-lg p-4">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getSeverityColor(alert.severity)}`}>
                        {alert.severity === 'high' ? 'Cao' : alert.severity === 'medium' ? 'Trung bình' : 'Thấp'}
                      </span>
                      <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(alert.status)}`}>
                        {alert.status === 'resolved' ? 'Đã xử lý' :
                         alert.status === 'investigating' ? 'Đang điều tra' : 'Chờ xử lý'}
                      </span>
                      <span className="text-xs text-gray-500">{alert.timestamp}</span>
                    </div>
                    <p className="text-sm text-gray-800">{alert.description}</p>
                  </div>
                  
                  {alert.status === 'pending' && (
                    <div className="flex items-center space-x-2 ml-4">
                      <button
                        onClick={() => handleAlertAction(alert.id, 'investigate')}
                        className="px-3 py-1 bg-blue-100 text-blue-700 text-xs rounded-lg hover:bg-blue-200"
                      >
                        Điều tra
                      </button>
                      <button
                        onClick={() => handleAlertAction(alert.id, 'resolve')}
                        className="px-3 py-1 bg-green-100 text-green-700 text-xs rounded-lg hover:bg-green-200"
                      >
                        Đã xử lý
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          {dashboardData.fraudAlerts.length === 0 && (
            <div className="text-center py-8">
              <div className="text-4xl mb-2">✅</div>
              <p className="text-gray-500">Không có cảnh báo gian lận nào</p>
            </div>
          )}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-gradient-to-r from-blue-500 to-blue-600 p-6 rounded-xl text-white">
          <div className="text-2xl mb-2">📊</div>
          <h4 className="font-semibold mb-2">Báo cáo tùy chỉnh</h4>
          <p className="text-blue-100 text-sm mb-4">Tạo báo cáo theo tiêu chí riêng</p>
          <button className="bg-white text-blue-600 px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-50">
            Tạo báo cáo
          </button>
        </div>

        <div className="bg-gradient-to-r from-green-500 to-green-600 p-6 rounded-xl text-white">
          <div className="text-2xl mb-2">🔍</div>
          <h4 className="font-semibold mb-2">Phân tích sâu</h4>
          <p className="text-green-100 text-sm mb-4">Khám phá xu hướng và pattern</p>
          <button className="bg-white text-green-600 px-4 py-2 rounded-lg text-sm font-medium hover:bg-green-50">
            Xem chi tiết
          </button>
        </div>

        <div className="bg-gradient-to-r from-purple-500 to-purple-600 p-6 rounded-xl text-white">
          <div className="text-2xl mb-2">⚡</div>
          <h4 className="font-semibold mb-2">Cảnh báo thời gian thực</h4>
          <p className="text-purple-100 text-sm mb-4">Thiết lập thông báo tự động</p>
          <button className="bg-white text-purple-600 px-4 py-2 rounded-lg text-sm font-medium hover:bg-purple-50">
            Cấu hình
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReportsAndMonitoring;
