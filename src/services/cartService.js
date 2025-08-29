import api from '../config/axios';

// Thêm sản phẩm vào giỏ hàng
export const addToCart = async (cartId, productId, quantity) => {
  try {
    const response = await api.post('/cart/add', {
      cartId,
      productId,
      quantity
    });
    return response.data;
  } catch (error) {
    console.error('Error adding to cart:', error);
    throw error;
  }
};

// Lấy chi tiết giỏ hàng - Function này đã thiếu
export const getCartDetails = async (cartId, voucher = null) => {
  try {
    const params = voucher ? { voucher } : {};
    const response = await api.get(`/cart/${cartId}`, { params });
    return response.data;
  } catch (error) {
    console.error('Error fetching cart details:', error);
    throw error;
  }
};

// Lấy thông tin giỏ hàng (alias cho getCartDetails)
export const getCart = async (cartId) => {
  return getCartDetails(cartId);
};

// Cập nhật số lượng sản phẩm trong giỏ
export const updateCartItem = async (cartId, productId, quantity) => {
  try {
    const response = await api.put('/cart/update', {
      cartId,
      productId,
      quantity
    });
    return response.data;
  } catch (error) {
    console.error('Error updating cart:', error);
    throw error;
  }
};

// Xóa sản phẩm khỏi giỏ hàng
export const removeFromCart = async (cartId, productId) => {
  try {
    const response = await api.delete('/cart/remove', {
      data: { cartId, productId }
    });
    return response.data;
  } catch (error) {
    console.error('Error removing from cart:', error);
    throw error;
  }
};

// Áp dụng voucher
export const applyVoucher = async (cartId, voucher) => {
  try {
    const response = await api.post('/cart/apply-voucher', {
      cartId,
      voucher
    });
    return response.data;
  } catch (error) {
    console.error('Error applying voucher:', error);
    throw error;
  }
};