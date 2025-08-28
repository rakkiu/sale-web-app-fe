import React, { useState } from 'react';
import api from '../../config/axios';
import { login, setToken } from '../../redux/features/userSlice';
import { useDispatch } from 'react-redux';

function parseJwt(token) {
  try {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split('')
        .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
        .join('')
    );
    return JSON.parse(jsonPayload);
  } catch {
    return {};
  }
}

function LoginModal({ isOpen, onClose }) {
  const dispatch = useDispatch();
  const [form, setForm] = useState({ username: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const res = await api.post('/auth/login', form);
      const token = res.data;
      dispatch(setToken(token));
      const payload = parseJwt(token);
      dispatch(login({ username: form.username, role: payload.role }));

      onClose(); // Đóng modal
      
      // Điều hướng theo role
      if (payload.role === 'ROLE_ADMIN') {
        window.location.href = '/adminhome';
      } else if (payload.role === 'ROLE_CUSTOMER') {
        window.location.reload(); // Reload để cập nhật header
      }
    } catch (err) {
      setError('Đăng nhập thất bại. Vui lòng kiểm tra lại thông tin.');
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setForm({ username: '', password: '' });
    setError('');
    onClose();
  };

  const handleGoogleLogin = () => {
    // Implement Google login
    console.log('Google login');
  };

  const handleFacebookLogin = () => {
    // Implement Facebook login
    console.log('Facebook login');
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Overlay */}
      <div 
        className="absolute inset-0 bg-black bg-opacity-50" 
        onClick={handleClose}
      />
      
      {/* Modal */}
      <div className="relative bg-white rounded-lg shadow-xl w-full max-w-md mx-4 p-6">
        {/* Close button */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Header */}
        <div className="text-center mb-6">
          <h2 className="text-lg font-semibold text-gray-800 uppercase tracking-wider">
            ĐĂNG NHẬP HOẶC TẠO TÀI KHOẢN
          </h2>
        </div>

    

        {error && (
          <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Email Input */}
          <div>
            <input
              type="text"
              name="username"
              value={form.username}
              onChange={handleChange}
              placeholder="Email"
              className="w-full px-4 py-3 border border-gray-300 rounded-md text-sm focus:outline-none focus:border-gray-400 placeholder-gray-500"
              required
              autoFocus
            />
          </div>

          {/* Password Input */}
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              value={form.password}
              onChange={handleChange}
              placeholder="Mật khẩu"
              className="w-full px-4 py-3 border border-gray-300 rounded-md text-sm focus:outline-none focus:border-gray-400 placeholder-gray-500 pr-12"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              {showPassword ? (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L8.464 8.464M9.878 9.878c-.886-.886-.886-2.324 0-3.21m4.242 4.242L16.536 16.536M14.12 14.12c.886.886.886 2.324 0 3.21m0-3.21L8.464 8.464" />
                </svg>
              ) : (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
              )}
            </button>
          </div>

          {/* Forgot Password */}
          <div className="text-right">
            <button 
              type="button"
              className="text-sm text-gray-600 underline hover:text-gray-800"
            >
              Quên mật khẩu email?
            </button>
          </div>

          {/* Login Button */}
          <button
            type="submit"
            className="w-full bg-red-600 text-white py-3 px-4 rounded-md text-sm font-semibold hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 transition duration-200 uppercase tracking-wider"
            disabled={loading}
          >
            {loading ? 'ĐANG ĐĂNG NHẬP...' : 'ĐĂNG NHẬP'}
          </button>
        </form>

        {/* Divider */}
        <div className="my-6 text-center">
          <span className="text-sm text-gray-500">hoặc đăng nhập bằng</span>
        </div>

        {/* Social Login Buttons */}
        <div className="space-y-3">
          {/* Google Button */}
          <button
            onClick={handleGoogleLogin}
            className="w-full bg-red-500 text-white py-3 px-4 rounded-md text-sm font-semibold hover:bg-red-600 transition duration-200 flex items-center justify-center gap-2"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
              <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
            </svg>
            Google
          </button>

          {/* Facebook Button */}
          <button
            onClick={handleFacebookLogin}
            className="w-full bg-blue-600 text-white py-3 px-4 rounded-md text-sm font-semibold hover:bg-blue-700 transition duration-200 flex items-center justify-center gap-2"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
            </svg>
            Facebook
          </button>
        </div>

        {/* Register Link */}
        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600">
            Bạn chưa có tài khoản?{' '}
            <button className="text-blue-600 hover:text-blue-700 font-medium">
              Đăng ký ngay!
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}

export default LoginModal;