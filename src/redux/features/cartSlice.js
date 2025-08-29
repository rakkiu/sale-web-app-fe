import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { addToCart, getCart, updateCartItem, removeFromCart } from '../../services/cartService';

// Async thunks
export const addToCartAsync = createAsyncThunk(
  'cart/addToCart',
  async ({ cartId, productId, quantity }, { rejectWithValue }) => {
    try {
      const response = await addToCart(cartId, productId, quantity);
      return response;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Không thể thêm vào giỏ hàng');
    }
  }
);

export const getCartAsync = createAsyncThunk(
  'cart/getCart',
  async (cartId, { rejectWithValue }) => {
    try {
      const response = await getCart(cartId);
      return response;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Không thể lấy thông tin giỏ hàng');
    }
  }
);

export const updateCartItemAsync = createAsyncThunk(
  'cart/updateCartItem',
  async ({ cartId, productId, quantity }, { rejectWithValue }) => {
    try {
      const response = await updateCartItem(cartId, productId, quantity);
      return response;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Không thể cập nhật giỏ hàng');
    }
  }
);

export const removeFromCartAsync = createAsyncThunk(
  'cart/removeFromCart',
  async ({ cartId, productId }, { rejectWithValue }) => {
    try {
      const response = await removeFromCart(cartId, productId);
      return response;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Không thể xóa khỏi giỏ hàng');
    }
  }
);

const initialState = {
  cartId: localStorage.getItem('cartId') || null,
  items: [],
  totalItems: 0,
  totalAmount: 0,
  loading: false,
  error: null,
  message: null
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    clearMessage: (state) => {
      state.message = null;
    },
    initializeCart: (state) => {
      // Không tự tạo cartId nữa, để API tạo khi thêm sản phẩm đầu tiên
      const savedCartId = localStorage.getItem('cartId');
      if (savedCartId && savedCartId !== 'null') {
        state.cartId = savedCartId;
      } else {
        state.cartId = null;
      }
    },
    setCartId: (state, action) => {
      state.cartId = action.payload;
      localStorage.setItem('cartId', action.payload);
    },
    clearCart: (state) => {
      state.items = [];
      state.totalItems = 0;
      state.totalAmount = 0;
      localStorage.removeItem('cartId');
      state.cartId = null;
    }
  },
  extraReducers: (builder) => {
    builder
      // Add to cart
      .addCase(addToCartAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addToCartAsync.fulfilled, (state, action) => {
        state.loading = false;
        
        // Cập nhật cartId từ API response
        if (action.payload.cartId && action.payload.cartId !== state.cartId) {
          state.cartId = action.payload.cartId.toString();
          localStorage.setItem('cartId', action.payload.cartId.toString());
        }
        
        state.items = action.payload.items || [];
        state.message = action.payload.message || 'Đã thêm vào giỏ hàng';
        state.totalItems = state.items.reduce((total, item) => total + item.quantity, 0);
        state.totalAmount = state.items.reduce((total, item) => total + item.lineTotal, 0);
      })
      .addCase(addToCartAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Get cart
      .addCase(getCartAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getCartAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload.items || [];
        state.totalItems = state.items.reduce((total, item) => total + item.quantity, 0);
        state.totalAmount = state.items.reduce((total, item) => total + item.lineTotal, 0);
      })
      .addCase(getCartAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Update cart item
      .addCase(updateCartItemAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload.items || [];
        state.message = action.payload.message || 'Đã cập nhật giỏ hàng';
        state.totalItems = state.items.reduce((total, item) => total + item.quantity, 0);
        state.totalAmount = state.items.reduce((total, item) => total + item.lineTotal, 0);
      })
      // Remove from cart
      .addCase(removeFromCartAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload.items || [];
        state.message = action.payload.message || 'Đã xóa khỏi giỏ hàng';
        state.totalItems = state.items.reduce((total, item) => total + item.quantity, 0);
        state.totalAmount = state.items.reduce((total, item) => total + item.lineTotal, 0);
      });
  }
});

export const { clearError, clearMessage, initializeCart, setCartId, clearCart } = cartSlice.actions;
export default cartSlice.reducer;