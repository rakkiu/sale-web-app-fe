import api from '../config/axios';

// Lấy danh sách sản phẩm
export const getProducts = async (params = {}) => {
  try {
    const {
      categoryId,
      search,
      minPrice,
      maxPrice,
      sort = 'createdAt',
      dir = 'desc',
      page = 0,
      size = 12
    } = params;

    const queryParams = new URLSearchParams();
    
    if (categoryId) queryParams.append('categoryId', categoryId);
    if (search) queryParams.append('search', search);
    if (minPrice) queryParams.append('minPrice', minPrice);
    if (maxPrice) queryParams.append('maxPrice', maxPrice);
    queryParams.append('sort', sort);
    queryParams.append('dir', dir);
    queryParams.append('page', page);
    queryParams.append('size', size);

    const response = await api.get(`/catalog/products?${queryParams}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching products:', error);
    throw error;
  }
};

// Lấy sản phẩm theo ID
export const getProductById = async (id) => {
  try {
    const response = await api.get(`/catalog/products/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching product by ID:', error);
    throw error;
  }
};

// Lấy danh sách danh mục
export const getCategories = async () => {
  try {
    const response = await api.get('/catalog/categories');
    return response.data;
  } catch (error) {
    console.error('Error fetching categories:', error);
    throw error;
  }
};

// Tìm kiếm sản phẩm
export const searchProducts = async (searchTerm, filters = {}) => {
  try {
    const response = await getProducts({
      search: searchTerm,
      ...filters
    });
    return response;
  } catch (error) {
    console.error('Error searching products:', error);
    throw error;
  }
};
