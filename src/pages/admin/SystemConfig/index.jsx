import React, { useState, useEffect } from 'react';

const SystemConfig = () => {
  const [activeTab, setActiveTab] = useState('payment');
  const [configs, setConfigs] = useState({
    payment: {
      vnpay: {
        enabled: true,
        sandbox: true,
        merchantId: 'TEST_MERCHANT_001',
        secretKey: '*********************',
        apiUrl: 'https://sandbox.vnpayment.vn/merchant_webapi/',
        returnUrl: 'https://yourdomain.com/vnpay/return',
        webhookUrl: 'https://yourdomain.com/vnpay/webhook'
      },
      momo: {
        enabled: false,
        sandbox: true,
        partnerCode: '',
        accessKey: '',
        secretKey: '',
        endpoint: 'https://test-payment.momo.vn',
        webhookUrl: ''
      },
      zalopay: {
        enabled: false,
        sandbox: true,
        appId: '',
        key1: '',
        key2: '',
        endpoint: 'https://sb-openapi.zalopay.vn',
        webhookUrl: ''
      },
      cod: {
        enabled: true,
        minAmount: 0,
        maxAmount: 5000000,
        supportedRegions: ['Hà Nội', 'TP.HCM', 'Đà Nẵng']
      }
    },
    shipping: {
      ghn: {
        enabled: true,
        apiKey: 'GHN_API_KEY_*****',
        shopId: 'SHOP_001',
        endpoint: 'https://dev-online-gateway.ghn.vn',
        webhookUrl: 'https://yourdomain.com/ghn/webhook',
        freeShipThreshold: 500000
      },
      ghtk: {
        enabled: false,
        apiKey: '',
        endpoint: 'https://services.giaohangtietkiem.vn',
        webhookUrl: ''
      },
      viettelpost: {
        enabled: false,
        username: '',
        password: '',
        endpoint: 'https://partner.viettelpost.vn',
        webhookUrl: ''
      }
    },
    tax: {
      vat: {
        enabled: true,
        defaultRate: 10,
        exemptCategories: ['Sách', 'Báo chí', 'Thuốc'],
        includeInPrice: true
      },
      import: {
        enabled: true,
        defaultRate: 5,
        applyToCategories: ['Điện tử', 'Thời trang nhập khẩu']
      }
    },
    general: {
      siteName: 'Sale Web App',
      siteUrl: 'https://salewebapp.com',
      supportEmail: 'support@salewebapp.com',
      currency: 'VND',
      timezone: 'Asia/Ho_Chi_Minh',
      language: 'vi',
      maintenanceMode: false,
      orderPrefix: 'ORD',
      autoApproveOrders: false,
      stockNotificationThreshold: 10
    }
  });

  const [testResults, setTestResults] = useState({});
  const [saving, setSaving] = useState(false);

  const tabs = [
    { id: 'payment', name: 'Thanh toán', icon: '💳' },
    { id: 'shipping', name: 'Vận chuyển', icon: '🚚' },
    { id: 'tax', name: 'Thuế', icon: '📊' },
    { id: 'general', name: 'Chung', icon: '⚙️' }
  ];

  const testPaymentConnection = async (provider) => {
    setTestResults({ ...testResults, [provider]: 'testing' });
    
    // Simulate API test
    setTimeout(() => {
      const success = Math.random() > 0.3; // 70% success rate for demo
      setTestResults({ 
        ...testResults, 
        [provider]: success ? 'success' : 'error' 
      });
    }, 2000);
  };

  const testShippingConnection = async (provider) => {
    setTestResults({ ...testResults, [provider]: 'testing' });
    
    setTimeout(() => {
      const success = Math.random() > 0.2; // 80% success rate for demo
      setTestResults({ 
        ...testResults, 
        [provider]: success ? 'success' : 'error' 
      });
    }, 1500);
  };

  const saveConfig = async () => {
    setSaving(true);
    // Simulate API call
    setTimeout(() => {
      setSaving(false);
      alert('Cấu hình đã được lưu thành công!');
    }, 1000);
  };

  const updateConfig = (section, subsection, field, value) => {
    setConfigs({
      ...configs,
      [section]: {
        ...configs[section],
        [subsection]: {
          ...configs[section][subsection],
          [field]: value
        }
      }
    });
  };

  const updateGeneralConfig = (field, value) => {
    setConfigs({
      ...configs,
      general: {
        ...configs.general,
        [field]: value
      }
    });
  };

  const PaymentTab = () => (
    <div className="space-y-8">
      <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
        <h4 className="font-medium text-blue-800 mb-2">📋 UC17 - Cấu hình thanh toán</h4>
        <p className="text-blue-600 text-sm">
          Nhập khóa API, thiết lập phương thức thanh toán, cấu hình sandbox vs production
        </p>
      </div>

      {/* VNPay */}
      <div className="bg-white p-6 rounded-xl border">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <span className="text-2xl">💳</span>
            </div>
            <div>
              <h3 className="text-lg font-semibold">VNPay</h3>
              <p className="text-sm text-gray-500">Cổng thanh toán điện tử VNPay</p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <button
              onClick={() => testPaymentConnection('vnpay')}
              className="px-3 py-1 text-sm bg-green-100 text-green-700 rounded-lg hover:bg-green-200"
            >
              {testResults.vnpay === 'testing' ? '⏳ Đang test...' : 
               testResults.vnpay === 'success' ? '✅ Kết nối OK' :
               testResults.vnpay === 'error' ? '❌ Lỗi kết nối' : 'Test kết nối'}
            </button>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={configs.payment.vnpay.enabled}
                onChange={(e) => updateConfig('payment', 'vnpay', 'enabled', e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
            </label>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Merchant ID</label>
            <input
              type="text"
              value={configs.payment.vnpay.merchantId}
              onChange={(e) => updateConfig('payment', 'vnpay', 'merchantId', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Secret Key</label>
            <input
              type="password"
              value={configs.payment.vnpay.secretKey}
              onChange={(e) => updateConfig('payment', 'vnpay', 'secretKey', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Return URL</label>
            <input
              type="url"
              value={configs.payment.vnpay.returnUrl}
              onChange={(e) => updateConfig('payment', 'vnpay', 'returnUrl', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Webhook URL</label>
            <input
              type="url"
              value={configs.payment.vnpay.webhookUrl}
              onChange={(e) => updateConfig('payment', 'vnpay', 'webhookUrl', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>

        <div className="mt-4 flex items-center space-x-4">
          <label className="flex items-center space-x-2 text-sm">
            <input
              type="checkbox"
              checked={configs.payment.vnpay.sandbox}
              onChange={(e) => updateConfig('payment', 'vnpay', 'sandbox', e.target.checked)}
            />
            <span>Chế độ Sandbox (Test)</span>
          </label>
        </div>
      </div>

      {/* COD */}
      <div className="bg-white p-6 rounded-xl border">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <span className="text-2xl">💰</span>
            </div>
            <div>
              <h3 className="text-lg font-semibold">Thanh toán khi giao hàng (COD)</h3>
              <p className="text-sm text-gray-500">Thu tiền mặt khi giao hàng</p>
            </div>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={configs.payment.cod.enabled}
              onChange={(e) => updateConfig('payment', 'cod', 'enabled', e.target.checked)}
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
          </label>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Số tiền tối thiểu (VND)</label>
            <input
              type="number"
              value={configs.payment.cod.minAmount}
              onChange={(e) => updateConfig('payment', 'cod', 'minAmount', parseInt(e.target.value))}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Số tiền tối đa (VND)</label>
            <input
              type="number"
              value={configs.payment.cod.maxAmount}
              onChange={(e) => updateConfig('payment', 'cod', 'maxAmount', parseInt(e.target.value))}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>
      </div>
    </div>
  );

  const ShippingTab = () => (
    <div className="space-y-8">
      <div className="bg-green-50 p-4 rounded-lg border border-green-200">
        <h4 className="font-medium text-green-800 mb-2">🚚 UC17 - Cấu hình vận chuyển</h4>
        <p className="text-green-600 text-sm">
          Kết nối các hãng vận chuyển, thiết lập bảng phí ship và webhook
        </p>
      </div>

      {/* GHN */}
      <div className="bg-white p-6 rounded-xl border">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
              <span className="text-2xl">📦</span>
            </div>
            <div>
              <h3 className="text-lg font-semibold">Giao hàng nhanh (GHN)</h3>
              <p className="text-sm text-gray-500">Đối tác vận chuyển chính</p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <button
              onClick={() => testShippingConnection('ghn')}
              className="px-3 py-1 text-sm bg-green-100 text-green-700 rounded-lg hover:bg-green-200"
            >
              {testResults.ghn === 'testing' ? '⏳ Đang test...' : 
               testResults.ghn === 'success' ? '✅ Kết nối OK' :
               testResults.ghn === 'error' ? '❌ Lỗi kết nối' : 'Test kết nối'}
            </button>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={configs.shipping.ghn.enabled}
                onChange={(e) => updateConfig('shipping', 'ghn', 'enabled', e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
            </label>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">API Key</label>
            <input
              type="password"
              value={configs.shipping.ghn.apiKey}
              onChange={(e) => updateConfig('shipping', 'ghn', 'apiKey', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Shop ID</label>
            <input
              type="text"
              value={configs.shipping.ghn.shopId}
              onChange={(e) => updateConfig('shipping', 'ghn', 'shopId', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Miễn phí ship từ (VND)</label>
            <input
              type="number"
              value={configs.shipping.ghn.freeShipThreshold}
              onChange={(e) => updateConfig('shipping', 'ghn', 'freeShipThreshold', parseInt(e.target.value))}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Webhook URL</label>
            <input
              type="url"
              value={configs.shipping.ghn.webhookUrl}
              onChange={(e) => updateConfig('shipping', 'ghn', 'webhookUrl', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>
      </div>
    </div>
  );

  const TaxTab = () => (
    <div className="space-y-8">
      <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
        <h4 className="font-medium text-purple-800 mb-2">📊 UC17 - Cấu hình thuế</h4>
        <p className="text-purple-600 text-sm">
          Thiết lập thuế VAT và thuế nhập khẩu cho các danh mục sản phẩm
        </p>
      </div>

      {/* VAT */}
      <div className="bg-white p-6 rounded-xl border">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
              <span className="text-2xl">📈</span>
            </div>
            <div>
              <h3 className="text-lg font-semibold">Thuế VAT</h3>
              <p className="text-sm text-gray-500">Thuế giá trị gia tăng</p>
            </div>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={configs.tax.vat.enabled}
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
          </label>
        </div>

        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Thuế suất mặc định (%)</label>
              <input
                type="number"
                value={configs.tax.vat.defaultRate}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div className="flex items-center space-x-2 mt-6">
              <input
                type="checkbox"
                checked={configs.tax.vat.includeInPrice}
                id="includeInPrice"
              />
              <label htmlFor="includeInPrice" className="text-sm">Bao gồm trong giá bán</label>
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Danh mục miễn thuế</label>
            <div className="flex flex-wrap gap-2">
              {configs.tax.vat.exemptCategories.map((category, index) => (
                <span key={index} className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full">
                  {category}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const GeneralTab = () => (
    <div className="space-y-8">
      <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
        <h4 className="font-medium text-gray-800 mb-2">⚙️ UC17 - Cấu hình chung</h4>
        <p className="text-gray-600 text-sm">
          Thiết lập thông tin cơ bản của hệ thống
        </p>
      </div>

      <div className="bg-white p-6 rounded-xl border">
        <h3 className="text-lg font-semibold mb-4">Thông tin cơ bản</h3>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Tên trang web</label>
            <input
              type="text"
              value={configs.general.siteName}
              onChange={(e) => updateGeneralConfig('siteName', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">URL trang web</label>
            <input
              type="url"
              value={configs.general.siteUrl}
              onChange={(e) => updateGeneralConfig('siteUrl', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email hỗ trợ</label>
            <input
              type="email"
              value={configs.general.supportEmail}
              onChange={(e) => updateGeneralConfig('supportEmail', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Đơn vị tiền tệ</label>
            <select
              value={configs.general.currency}
              onChange={(e) => updateGeneralConfig('currency', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="VND">VND - Việt Nam Đồng</option>
              <option value="USD">USD - Đô la Mỹ</option>
            </select>
          </div>
        </div>

        <div className="mt-6 space-y-4">
          <div className="flex items-center justify-between p-4 bg-red-50 rounded-lg">
            <div>
              <h4 className="font-medium text-red-800">Chế độ bảo trì</h4>
              <p className="text-red-600 text-sm">Tạm khóa truy cập website cho khách hàng</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={configs.general.maintenanceMode}
                onChange={(e) => updateGeneralConfig('maintenanceMode', e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-red-600"></div>
            </label>
          </div>

          <div className="flex items-center justify-between p-4 bg-blue-50 rounded-lg">
            <div>
              <h4 className="font-medium text-blue-800">Tự động duyệt đơn hàng</h4>
              <p className="text-blue-600 text-sm">Đơn hàng sẽ được duyệt tự động sau khi thanh toán</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={configs.general.autoApproveOrders}
                onChange={(e) => updateGeneralConfig('autoApproveOrders', e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
            </label>
          </div>
        </div>
      </div>
    </div>
  );

  const renderTabContent = () => {
    switch (activeTab) {
      case 'payment': return <PaymentTab />;
      case 'shipping': return <ShippingTab />;
      case 'tax': return <TaxTab />;
      case 'general': return <GeneralTab />;
      default: return <PaymentTab />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Cấu hình hệ thống</h1>
          <p className="text-gray-600 mt-1">UC17 - Thanh toán, vận chuyển, thuế và cấu hình chung</p>
        </div>
        <button
          onClick={saveConfig}
          disabled={saving}
          className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50 flex items-center space-x-2"
        >
          {saving ? <span>⏳</span> : <span>💾</span>}
          <span>{saving ? 'Đang lưu...' : 'Lưu cấu hình'}</span>
        </button>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200">
        <nav className="flex space-x-8">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center space-x-2 py-2 px-1 border-b-2 font-medium text-sm ${
                activeTab === tab.id
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <span>{tab.icon}</span>
              <span>{tab.name}</span>
            </button>
          ))}
        </nav>
      </div>

      {/* Tab Content */}
      <div>
        {renderTabContent()}
      </div>
    </div>
  );
};

export default SystemConfig;
