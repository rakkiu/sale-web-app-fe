import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getCartDetails, updateCartItem, removeFromCart, applyVoucher } from '../../services/cartService';
import { initializeCart } from '../../redux/features/cartSlice';
import Header from '../../components/common/Header';
import Footer from '../../components/common/Footer';
import Button from '../../components/ui/Button';

const Cart = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { cartId } = useSelector(state => state.cart);
  const { isAuthenticated } = useSelector(state => state.user);
  
  const [cartData, setCartData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [updating, setUpdating] = useState({});
  const [voucher, setVoucher] = useState('');
  const [voucherLoading, setVoucherLoading] = useState(false);

  // Fetch cart details
  const fetchCartDetails = async () => {
    // Sử dụng cartId từ Redux state
    if (!cartId) {
      console.log('No cartId found, cart is empty');
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError(null);
      console.log('Fetching cart with ID:', cartId);
      const data = await getCartDetails(parseInt(cartId));
      console.log('Cart data received:', data);
      setCartData(data);
    } catch (err) {
      console.error('Error fetching cart:', err);
      if (err.response?.status === 401) {
        setError('Bạn cần đăng nhập để xem giỏ hàng.');
      } else if (err.response?.status === 404) {
        setError('Không tìm thấy giỏ hàng.');
      } else {
        setError('Không thể tải thông tin giỏ hàng. Vui lòng thử lại.');
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    dispatch(initializeCart());
  }, [dispatch]);

  useEffect(() => {
    // Fetch cart details when cartId changes
    if (cartId) {
      fetchCartDetails();
    } else {
      setLoading(false);
    }
  }, [cartId]);

  // Update quantity
  const handleUpdateQuantity = async (productId, newQuantity) => {
    if (newQuantity < 1 || !cartId) return;
    
    try {
      setUpdating(prev => ({ ...prev, [productId]: true }));
      console.log('Updating cart item:', { cartId: parseInt(cartId), productId, newQuantity });
      await updateCartItem(parseInt(cartId), productId, newQuantity);
      await fetchCartDetails(); // Refresh cart data
    } catch (error) {
      console.error('Error updating quantity:', error);
      alert('Không thể cập nhật số lượng sản phẩm');
    } finally {
      setUpdating(prev => ({ ...prev, [productId]: false }));
    }
  };

  // Remove item
  const handleRemoveItem = async (productId) => {
    if (!window.confirm('Bạn có chắc muốn xóa sản phẩm này khỏi giỏ hàng?') || !cartId) {
      return;
    }

    try {
      setUpdating(prev => ({ ...prev, [productId]: true }));
      console.log('Removing cart item:', { cartId: parseInt(cartId), productId });
      await removeFromCart(parseInt(cartId), productId);
      await fetchCartDetails(); // Refresh cart data
    } catch (error) {
      console.error('Error removing item:', error);
      alert('Không thể xóa sản phẩm khỏi giỏ hàng');
    } finally {
      setUpdating(prev => ({ ...prev, [productId]: false }));
    }
  };

  // Apply voucher
  const handleApplyVoucher = async (e) => {
    e.preventDefault();
    if (!voucher.trim() || !cartId) return;

    try {
      setVoucherLoading(true);
      console.log('Applying voucher:', { cartId: parseInt(cartId), voucher: voucher.trim() });
      await applyVoucher(parseInt(cartId), voucher.trim());
      await fetchCartDetails(); // Refresh cart with voucher applied
      alert('Áp dụng voucher thành công!');
    } catch (error) {
      console.error('Error applying voucher:', error);
      alert('Voucher không hợp lệ hoặc đã hết hạn');
    } finally {
      setVoucherLoading(false);
    }
  };

  // Cart Item Component
  const CartItem = ({ item }) => (
    <div className="flex items-center gap-4 p-4 bg-white rounded-lg shadow-sm border border-gray-200">
      <div className="flex-shrink-0">
        <img
          src="/images/gearvn03.png" // Default image since API doesn't provide imageUrl
          alt={item.productName}
          className="w-20 h-20 object-cover rounded"
        />
      </div>

      <div className="flex-1">
        <h3 className="text-gray-800 font-medium mb-1 line-clamp-2">
          {item.productName}
        </h3>
        <p className="text-red-600 font-semibold">
          {item.price.toLocaleString('vi-VN')}₫
        </p>
      </div>

      <div className="flex items-center gap-3">
        {/* Quantity Controls */}
        <div className="flex items-center border border-gray-300 rounded">
          <button
            onClick={() => handleUpdateQuantity(item.productId, item.quantity - 1)}
            disabled={item.quantity <= 1 || updating[item.productId]}
            className="px-3 py-1 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            -
          </button>
          <span className="px-3 py-1 border-x border-gray-300 min-w-[50px] text-center">
            {updating[item.productId] ? '...' : item.quantity}
          </span>
          <button
            onClick={() => handleUpdateQuantity(item.productId, item.quantity + 1)}
            disabled={updating[item.productId]}
            className="px-3 py-1 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            +
          </button>
        </div>

        {/* Line Total */}
        <div className="text-right min-w-[120px]">
          <p className="text-red-600 font-bold">
            {item.lineTotal.toLocaleString('vi-VN')}₫
          </p>
        </div>

        {/* Remove Button */}
        <button
          onClick={() => handleRemoveItem(item.productId)}
          disabled={updating[item.productId]}
          className="text-red-500 hover:text-red-700 p-2 disabled:opacity-50"
          title="Xóa sản phẩm"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
          </svg>
        </button>
      </div>
    </div>
  );

  // Loading state
  if (loading) {
    return (
      <div className="w-full bg-gray-50 min-h-screen">
        <Header />
        <div className="flex justify-center items-center py-20">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          <span className="ml-4 text-gray-600">Đang tải giỏ hàng...</span>
        </div>
        <Footer />
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="w-full bg-gray-50 min-h-screen">
        <Header />
        <div className="flex flex-col justify-center items-center py-20">
          <p className="text-red-500 text-lg mb-4">{error}</p>
          <div className="flex gap-4">
            <Button 
              onClick={fetchCartDetails}
              className="bg-blue-600 text-white px-6 py-2 rounded-lg"
            >
              Thử lại
            </Button>
            {error.includes('đăng nhập') && (
              <Button 
                onClick={() => navigate('/login')}
                className="bg-green-600 text-white px-6 py-2 rounded-lg"
              >
                Đăng nhập
              </Button>
            )}
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  // Empty cart
  if (!cartData || !cartData.items || cartData.items.length === 0) {
    return (
      <div className="w-full bg-gray-50 min-h-screen">
        <Header />
        
        {/* Breadcrumb */}
        <div className="w-full bg-white shadow-sm">
          <div className="w-full max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center gap-2 py-3 text-sm">
              <button onClick={() => navigate('/')} className="text-blue-600 hover:underline">
                Trang chủ
              </button>
              <span className="text-gray-400">›</span>
              <span className="text-gray-700">Giỏ hàng</span>
            </div>
          </div>
        </div>

        <div className="w-full max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <div className="text-6xl mb-4">🛒</div>
            <h2 className="text-2xl font-semibold text-gray-800 mb-2">
              Giỏ hàng của bạn đang trống
            </h2>
            <p className="text-gray-600 mb-6">
              Hãy thêm sản phẩm vào giỏ hàng để tiến hành thanh toán
            </p>
            <Button
              onClick={() => navigate('/')}
              className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700"
            >
              Tiếp tục mua sắm
            </Button>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="w-full bg-gray-50 min-h-screen">
      <Header />
      
      {/* Breadcrumb */}
      <div className="w-full bg-white shadow-sm">
        <div className="w-full max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 py-3 text-sm">
            <button onClick={() => navigate('/')} className="text-blue-600 hover:underline">
              Trang chủ
            </button>
            <span className="text-gray-400">›</span>
            <span className="text-gray-700">Giỏ hàng ({cartData.items.length} sản phẩm)</span>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="w-full max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Cart Items */}
          <div className="flex-1">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-6">
                Giỏ hàng của bạn ({cartData.items.length} sản phẩm)
              </h2>

              <div className="space-y-4">
                {cartData.items.map((item) => (
                  <CartItem key={`${item.itemId}-${item.productId}`} item={item} />
                ))}
              </div>

              {/* Continue Shopping */}
              <div className="mt-6 pt-6 border-t border-gray-200">
                <Button
                  onClick={() => navigate('/')}
                  className="text-blue-600 hover:text-blue-800 flex items-center gap-2"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                  </svg>
                  Tiếp tục mua sắm
                </Button>
              </div>
            </div>
          </div>

          {/* Order Summary */}
          <div className="w-full lg:w-96">
            <div className="bg-white rounded-lg shadow-sm p-6 sticky top-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">
                Tóm tắt đơn hàng
              </h3>

              {/* Voucher */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Mã giảm giá
                </label>
                <form onSubmit={handleApplyVoucher} className="flex gap-2">
                  <input
                    type="text"
                    value={voucher}
                    onChange={(e) => setVoucher(e.target.value)}
                    placeholder="Nhập mã voucher"
                    className="flex-1 px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <Button
                    type="submit"
                    disabled={voucherLoading || !voucher.trim()}
                    className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700 disabled:opacity-50"
                  >
                    {voucherLoading ? '...' : 'Áp dụng'}
                  </Button>
                </form>
                {cartData.appliedVoucher && (
                  <p className="text-green-600 text-sm mt-2">
                    ✓ Đã áp dụng voucher: {cartData.appliedVoucher}
                  </p>
                )}
              </div>

              {/* Order Details */}
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Tạm tính:</span>
                  <span className="font-medium">
                    {cartData.subtotal.toLocaleString('vi-VN')}₫
                  </span>
                </div>

                <div className="flex justify-between">
                  <span className="text-gray-600">Phí vận chuyển:</span>
                  <span className="font-medium">
                    {cartData.shippingFee > 0 ? `${cartData.shippingFee.toLocaleString('vi-VN')}₫` : 'Miễn phí'}
                  </span>
                </div>

                {cartData.discountAmount > 0 && (
                  <div className="flex justify-between text-green-600">
                    <span>Giảm giá:</span>
                    <span className="font-medium">
                      -{cartData.discountAmount.toLocaleString('vi-VN')}₫
                    </span>
                  </div>
                )}

                <div className="border-t border-gray-200 pt-3">
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-semibold">Tổng cộng:</span>
                    <span className="text-xl font-bold text-red-600">
                      {cartData.grandTotal.toLocaleString('vi-VN')}₫
                    </span>
                  </div>
                </div>
              </div>

              {/* Checkout Button */}
              <Button
                onClick={() => navigate('/checkout')}
                className="w-full bg-red-600 text-white py-3 mt-6 rounded-lg font-semibold hover:bg-red-700 transition-colors"
              >
                THANH TOÁN
              </Button>

              {/* Payment Methods */}
              <div className="mt-6 pt-6 border-t border-gray-200">
                <p className="text-sm text-gray-600 mb-3">Phương thức thanh toán:</p>
                <div className="flex gap-2">
                  <div className="w-8 h-6 bg-blue-600 rounded flex items-center justify-center">
                    <span className="text-white text-xs font-bold">V</span>
                  </div>
                  <div className="w-8 h-6 bg-red-600 rounded flex items-center justify-center">
                    <span className="text-white text-xs font-bold">M</span>
                  </div>
                  <div className="w-8 h-6 bg-pink-500 rounded flex items-center justify-center">
                    <span className="text-white text-xs font-bold">M</span>
                  </div>
                  <div className="w-8 h-6 bg-blue-500 rounded flex items-center justify-center">
                    <span className="text-white text-xs font-bold">V</span>
                  </div>
                </div>
              </div>

              {/* Security Info */}
              <div className="mt-4 p-3 bg-green-50 rounded-lg">
                <div className="flex items-center gap-2">
                  <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                  <span className="text-sm text-green-800 font-medium">
                    Thanh toán được mã hóa SSL
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Cart;