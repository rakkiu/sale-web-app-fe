import React, { useState, useEffect } from 'react';
import api from '../../../config/axios';

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [filters, setFilters] = useState({
    search: '',
    role: '',
    status: ''
  });

  // Fetch users from API
  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      console.log('Fetching users...');
      
      // Đảm bảo endpoint đúng - chỉ /api/users, không duplicate
      const response = await api.get('users');
      console.log('Users response:', response.data);
      
      setUsers(response.data);
      setError('');
    } catch (err) {
      console.error('Error fetching users:', err);
      console.error('Error response:', err.response);
      
      if (err.response?.status === 401) {
        setError('Phiên đăng nhập đã hết hạn. Vui lòng đăng nhập lại.');
      } else {
        setError('Không thể tải danh sách người dùng. Vui lòng thử lại.');
      }
    } finally {
      setLoading(false);
    }
  };

  const roles = [
    { value: 'ADMIN', label: 'Quản trị viên', color: 'red' },
    { value: 'SELLER', label: 'Người bán', color: 'blue' },
    { value: 'CUSTOMER', label: 'Khách hàng', color: 'green' }
  ];

  const statuses = [
    { value: true, label: 'Hoạt động', color: 'green' },
    { value: false, label: 'Bị khóa', color: 'red' }
  ];

  const permissions = [
    { id: 'user.create', name: 'Tạo người dùng', group: 'Người dùng' },
    { id: 'user.edit', name: 'Sửa người dùng', group: 'Người dùng' },
    { id: 'user.delete', name: 'Xóa người dùng', group: 'Người dùng' },
    { id: 'user.view', name: 'Xem người dùng', group: 'Người dùng' },
    { id: 'product.create', name: 'Tạo sản phẩm', group: 'Sản phẩm' },
    { id: 'product.edit', name: 'Sửa sản phẩm', group: 'Sản phẩm' },
    { id: 'order.view', name: 'Xem đơn hàng', group: 'Đơn hàng' },
    { id: 'order.edit', name: 'Sửa đơn hàng', group: 'Đơn hàng' },
    { id: 'system.config', name: 'Cấu hình hệ thống', group: 'Hệ thống' },
    { id: 'report.view', name: 'Xem báo cáo', group: 'Báo cáo' }
  ];

  const getRoleColor = (role) => {
    const roleObj = roles.find(r => r.value === role);
    return roleObj ? roleObj.color : 'gray';
  };

  const getStatusColor = (enabled) => {
    return enabled ? 'green' : 'red';
  };

  const getStatusLabel = (enabled) => {
    return enabled ? 'Hoạt động' : 'Bị khóa';
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'Chưa có';
    return new Date(dateString).toLocaleDateString('vi-VN', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const filteredUsers = users.filter(user => {
    const matchesSearch = filters.search === '' || 
      (user.name && user.name.toLowerCase().includes(filters.search.toLowerCase())) ||
      user.email.toLowerCase().includes(filters.search.toLowerCase()) ||
      user.username.toLowerCase().includes(filters.search.toLowerCase());
    
    const matchesRole = filters.role === '' || user.role === filters.role;
    const matchesStatus = filters.status === '' || user.enabled.toString() === filters.status;
    
    return matchesSearch && matchesRole && matchesStatus;
  });

  const handleToggleUserStatus = async (userId, currentStatus) => {
    try {
      console.log(`Toggling status for user ${userId}`);
      // Sửa endpoint nếu cần
      await api.put(`/api/users/${userId}/toggle-status`);
      // Refresh users list
      fetchUsers();
    } catch (err) {
      console.error('Error toggling user status:', err);
      if (err.response?.status === 401) {
        alert('Phiên đăng nhập đã hết hạn. Vui lòng đăng nhập lại.');
      } else {
        alert('Không thể thay đổi trạng thái người dùng. Vui lòng thử lại.');
      }
    }
  };

  const handleResetPassword = async (userId) => {
    if (confirm('Bạn có chắc chắn muốn đặt lại mật khẩu cho người dùng này?')) {
      try {
        await api.post(`/api/users/${userId}/reset-password`);
        alert('Mật khẩu mới đã được gửi tới email của người dùng');
      } catch (err) {
        console.error('Error resetting password:', err);
        if (err.response?.status === 401) {
          alert('Phiên đăng nhập đã hết hạn. Vui lòng đăng nhập lại.');
        } else {
          alert('Không thể đặt lại mật khẩu. Vui lòng thử lại.');
        }
      }
    }
  };

  const CreateUserModal = () => {
    const [formData, setFormData] = useState({
      username: '',
      email: '',
      name: '',
      role: 'CUSTOMER',
      password: '',
      permissions: []
    });
    const [submitting, setSubmitting] = useState(false);

    const handleSubmit = async (e) => {
      e.preventDefault();
      setSubmitting(true);
      
      try {
        console.log('Creating user:', formData);
        
        await api.post('/api/users', {
          username: formData.username,
          email: formData.email,
          name: formData.name || null, // Gửi null nếu name rỗng
          role: formData.role,
          password: formData.password
        });
        
        setShowCreateModal(false);
        setFormData({
          username: '',
          email: '',
          name: '',
          role: 'CUSTOMER',
          password: '',
          permissions: []
        });
        fetchUsers(); // Refresh users list
        alert('Người dùng đã được tạo thành công!');
      } catch (err) {
        console.error('Error creating user:', err);
        console.error('Error response:', err.response);
        
        if (err.response?.status === 401) {
          alert('Phiên đăng nhập đã hết hạn. Vui lòng đăng nhập lại.');
        } else if (err.response?.data?.message) {
          alert(`Lỗi: ${err.response.data.message}`);
        } else {
          alert('Không thể tạo người dùng. Vui lòng kiểm tra thông tin và thử lại.');
        }
      } finally {
        setSubmitting(false);
      }
    };

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-xl p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-semibold">Tạo người dùng mới</h3>
            <button 
              onClick={() => setShowCreateModal(false)}
              className="text-gray-400 hover:text-gray-600"
            >
              ✕
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Tên đăng nhập *
                </label>
                <input
                  type="text"
                  required
                  value={formData.username}
                  onChange={(e) => setFormData({...formData, username: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email *
                </label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Họ và tên
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Mật khẩu *
              </label>
              <input
                type="password"
                required
                value={formData.password}
                onChange={(e) => setFormData({...formData, password: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                minLength={6}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Vai trò *
              </label>
              <select
                required
                value={formData.role}
                onChange={(e) => setFormData({...formData, role: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                {roles.map(role => (
                  <option key={role.value} value={role.value}>{role.label}</option>
                ))}
              </select>
            </div>

            <div className="flex justify-end space-x-3 pt-4">
              <button
                type="button"
                onClick={() => setShowCreateModal(false)}
                className="px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50"
                disabled={submitting}
              >
                Hủy
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
                disabled={submitting}
              >
                {submitting ? 'Đang tạo...' : 'Tạo người dùng'}
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Đang tải danh sách người dùng...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-4">
        <div className="flex items-center">
          <div className="text-red-600 mr-3">⚠️</div>
          <div>
            <h3 className="text-red-800 font-medium">Lỗi tải dữ liệu</h3>
            <p className="text-red-600 text-sm">{error}</p>
            <button 
              onClick={fetchUsers}
              className="mt-2 text-sm bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
            >
              Thử lại
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Quản lý người dùng & Phân quyền</h1>
          <p className="text-gray-600 mt-1">UC16 - Tạo, sửa, khóa tài khoản và gán vai trò</p>
        </div>
        <button
          onClick={() => setShowCreateModal(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center space-x-2"
        >
          <span>+</span>
          <span>Tạo người dùng</span>
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border">
          <h3 className="text-lg font-semibold text-gray-800">Tổng người dùng</h3>
          <p className="text-2xl font-bold text-blue-600">{users.length}</p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border">
          <h3 className="text-lg font-semibold text-gray-800">Admin</h3>
          <p className="text-2xl font-bold text-red-600">
            {users.filter(u => u.role === 'ADMIN').length}
          </p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border">
          <h3 className="text-lg font-semibold text-gray-800">Seller</h3>
          <p className="text-2xl font-bold text-blue-600">
            {users.filter(u => u.role === 'SELLER').length}
          </p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border">
          <h3 className="text-lg font-semibold text-gray-800">Customer</h3>
          <p className="text-2xl font-bold text-green-600">
            {users.filter(u => u.role === 'CUSTOMER').length}
          </p>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white p-4 rounded-xl shadow-sm border">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Tìm kiếm</label>
            <input
              type="text"
              placeholder="Tên, email, username..."
              value={filters.search}
              onChange={(e) => setFilters({...filters, search: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Vai trò</label>
            <select
              value={filters.role}
              onChange={(e) => setFilters({...filters, role: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">Tất cả vai trò</option>
              {roles.map(role => (
                <option key={role.value} value={role.value}>{role.label}</option>
              ))}
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Trạng thái</label>
            <select
              value={filters.status}
              onChange={(e) => setFilters({...filters, status: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">Tất cả trạng thái</option>
              <option value="true">Hoạt động</option>
              <option value="false">Bị khóa</option>
            </select>
          </div>
          
          <div className="flex items-end">
            <button
              onClick={() => setFilters({search: '', role: '', status: ''})}
              className="w-full px-3 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50"
            >
              Xóa bộ lọc
            </button>
          </div>
        </div>
      </div>

      {/* Users Table */}
      <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Người dùng
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Vai trò
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Trạng thái
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Ngày tạo
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Thao tác
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredUsers.map((user) => (
                <tr key={user.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-medium">
                        {(user.name || user.username).charAt(0).toUpperCase()
                        }
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">
                          {user.name || user.username}
                        </div>
                        <div className="text-sm text-gray-500">{user.email}</div>
                        <div className="text-xs text-gray-400">@{user.username}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-${getRoleColor(user.role)}-100 text-${getRoleColor(user.role)}-800`}>
                      {roles.find(r => r.value === user.role)?.label}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-${getStatusColor(user.enabled)}-100 text-${getStatusColor(user.enabled)}-800`}>
                      {getStatusLabel(user.enabled)}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500">
                    {formatDate(user.createdAt)}
                  </td>
                  <td className="px-6 py-4 text-sm font-medium space-x-2">
                    <button
                      onClick={() => handleToggleUserStatus(user.id, user.enabled)}
                      className={`${!user.enabled ? 'text-green-600 hover:text-green-700' : 'text-red-600 hover:text-red-700'}`}
                    >
                      {!user.enabled ? 'Mở khóa' : 'Khóa'}
                    </button>
                    <button
                      onClick={() => handleResetPassword(user.id)}
                      className="text-orange-600 hover:text-orange-700"
                    >
                      Đặt lại MK
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          
          {filteredUsers.length === 0 && (
            <div className="text-center py-8">
              <div className="text-gray-400 text-4xl mb-4">👥</div>
              <h3 className="text-lg font-medium text-gray-600 mb-2">Không tìm thấy người dùng</h3>
              <p className="text-gray-400">Thử thay đổi bộ lọc để xem kết quả khác</p>
            </div>
          )}
        </div>
      </div>

      {/* Modals */}
      {showCreateModal && <CreateUserModal />}
    </div>
  );
};

export default UserManagement;
