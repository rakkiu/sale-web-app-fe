import React, { useState } from 'react';
import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../../../redux/features/userSlice'; // Đúng path đến userSlice

const AdminLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector(state => state.user); // Đảm bảo state đúng

  const menuItems = [
    {
      title: 'Dashboard',
      path: '/admin',

    },
    {
      title: 'Quản lý người dùng',
      path: '/admin/users',

      description: 'Tạo/sửa tài khoản, phân quyền'
    },
    {
      title: 'Cấu hình hệ thống',
      path: '/admin/config',

      description: 'Thanh toán, vận chuyển, thuế'
    },
    {
      title: 'Báo cáo & Giám sát',
      path: '/admin/reports',

      description: 'Dashboard, phát hiện gian lận'
    },
    {
      title: 'Khiếu nại & Tranh chấp',
      path: '/admin/disputes',

      description: 'Xử lý ticket, tranh chấp'
    },
  ];

  const isActive = (path) => {
    return location.pathname === path || (path !== '/admin' && location.pathname.startsWith(path));
  };

  const handleLogout = () => {
    dispatch(logout());
    navigate('/');
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <div className={`bg-white shadow-lg transition-all duration-300 ${sidebarOpen ? 'w-72' : 'w-20'}`}>
        <div className="p-6 border-b">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold">
              A
            </div>
            {sidebarOpen && (
              <div>
                <h1 className="text-xl font-bold text-gray-800">Admin Panel</h1>
                <p className="text-sm text-gray-500">Sale Web App</p>
              </div>
            )}
          </div>
        </div>

        <nav className="p-4">
          {menuItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center space-x-3 p-3 rounded-lg mb-2 transition-colors ${
                isActive(item.path)
                  ? 'bg-blue-50 text-blue-600 border-l-4 border-blue-600'
                  : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              <span className="text-2xl">{item.icon}</span>
              {sidebarOpen && (
                <div className="flex-1">
                  <div className="font-medium">{item.title}</div>
                  {item.description && (
                    <div className="text-xs text-gray-400 mt-1">{item.description}</div>
                  )}
                </div>
              )}
            </Link>
          ))}
        </nav>

        {/* User info at bottom when sidebar is open */}
        {sidebarOpen && (
          <div className="absolute bottom-0 left-0 right-0 p-4 border-t bg-white">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white text-sm font-medium">
                {user?.username?.charAt(0).toUpperCase() || 'A'}
              </div>
              <div className="flex-1">
                <div className="text-sm font-medium text-gray-800">{user?.username || 'Admin'}</div>
                <div className="text-xs text-gray-500">Quản trị viên</div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="bg-white shadow-sm border-b px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="p-2 rounded-lg hover:bg-gray-100"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
              <h2 className="text-xl font-semibold text-gray-800">
                {menuItems.find(item => isActive(item.path))?.title || 'Admin Dashboard'}
              </h2>
            </div>

            <div className="flex items-center space-x-4">
              {/* User Menu */}
              <div className="relative">
                <button 
                  onClick={() => setShowUserMenu(!showUserMenu)}
                  className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-100"
                >
                  <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white text-sm font-medium">
                    {user?.username?.charAt(0).toUpperCase() || 'A'}
                  </div>
                  <div className="hidden md:block text-left">
                    <div className="text-sm font-medium">{user?.username || 'Admin'}</div>
                    <div className="text-xs text-gray-500">Super Admin</div>
                  </div>
                </button>

                {/* User Menu Dropdown */}
                {showUserMenu && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border py-1 z-50">
                    <div className="px-4 py-2 border-b">
                      <div className="text-sm font-medium text-gray-800">{user?.username || 'Admin'}</div>
                      <div className="text-xs text-gray-500">{user?.role || 'ROLE_ADMIN'}</div>
                    </div>
                    <button className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">
                      Thông tin cá nhân
                    </button>
                    <button className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">
                      Cài đặt
                    </button>
                    <hr className="my-1" />
                    <button 
                      onClick={handleLogout}
                      className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                    >
                      Đăng xuất
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-6 overflow-auto">
          <Outlet />
        </main>
      </div>

      {/* Click outside to close user menu */}
      {showUserMenu && (
        <div 
          className="fixed inset-0 z-40" 
          onClick={() => setShowUserMenu(false)}
        ></div>
      )}
    </div>
  );
};

export default AdminLayout;
