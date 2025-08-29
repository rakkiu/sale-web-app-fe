import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getProductById } from '../../services/productService';
import { addToCartAsync, initializeCart, clearMessage, clearError } from '../../redux/features/cartSlice';
import Header from '../../components/common/Header';
import Footer from '../../components/common/Footer';
import Button from '../../components/ui/Button';

const ProductDetail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Cart state from Redux
  const { cartId, loading: cartLoading, error: cartError, message: cartMessage } = useSelector(state => state.cart);
  
  // Fetch product data from API
  useEffect(() => {
    // Scroll to top when component mounts or id changes
    window.scrollTo(0, 0);
    
    const fetchProduct = async () => {
      try {
        setLoading(true);
        setError(null);
        
        console.log('Fetching product with ID:', id);
        const productData = await getProductById(id);
        console.log('Product data from API:', productData);
        
        // Transform API data to match component structure
        const transformedProduct = {
          id: productData.id,
          name: productData.name,
          images: [
            productData.imageUrl || "/images/gearvn03.png",
            productData.imageUrl || "/images/gearvn03.png", 
            productData.imageUrl || "/images/gearvn03.png",
            productData.imageUrl || "/images/gearvn03.png",
            productData.imageUrl || "/images/gearvn03.png"
          ],
          originalPrice: `${(productData.price * 1.2).toLocaleString('vi-VN')}₫`,
          salePrice: `${productData.price.toLocaleString('vi-VN')}₫`,
          discount: "-17%", // Default discount
          rating: "0.0",
          reviews: "(0 đánh giá)",
          stock: productData.stock || 0,
          description: productData.description || "Thông tin chi tiết sản phẩm",
          specs: {
            "Tên sản phẩm": productData.name,
            "Danh mục": productData.categoryName || "N/A",
            "Nhà sản xuất": productData.manufacturer || "N/A",
            "Giá": `${productData.price.toLocaleString('vi-VN')}₫`,
            "Tồn kho": `${productData.stock || 0} sản phẩm`,
            "Mã sản phẩm": `SP${productData.id}`
          },
          features: [
            "Sản phẩm chính hãng",
            "Bảo hành toàn quốc", 
            "Hỗ trợ kỹ thuật"
          ],
          promotions: [
            "Ưu đãi đặc biệt khi mua kèm sản phẩm khác",
            "Hỗ trợ trả góp 0% lãi suất (Thẻ tín dụng), HDSAISON."
          ],
          benefits: [
            "Giảm ngay 5% khi mua kèm phụ kiện",
            "Miễn phí vận chuyển trong nội thành",
            "Hỗ trợ cài đặt và bảo hành tại nhà"
          ]
        };
        
        setProduct(transformedProduct);
        
      } catch (err) {
        console.error('Error fetching product:', err);
        
        // Handle different types of errors
        if (err.response?.status === 404) {
          setError('Không tìm thấy sản phẩm này.');
        } else if (err.response?.status === 500) {
          setError('Lỗi server. Vui lòng thử lại sau.');
        } else if (err.message) {
          setError(`Lỗi kết nối: ${err.message}`);
        } else {
          setError('Không thể tải thông tin sản phẩm. Vui lòng thử lại.');
        }
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchProduct();
    }
  }, [id]);

  // Initialize cart when component mounts
  useEffect(() => {
    dispatch(initializeCart());
  }, [dispatch]);

  // Handle cart messages
  useEffect(() => {
    if (cartMessage) {
      // Show success message
      alert(cartMessage);
      dispatch(clearMessage());
    }
  }, [cartMessage, dispatch]);

  useEffect(() => {
    if (cartError) {
      // Show error message
      alert(`Lỗi: ${cartError}`);
      dispatch(clearError());
    }
  }, [cartError, dispatch]);

  // Handle add to cart
  const handleAddToCart = async () => {
    if (!product || product.stock === 0) {
      alert('Sản phẩm hiện tại không có sẵn');
      return;
    }

    try {
      // Sử dụng cartId từ Redux, nếu không có thì dùng 0 để tạo cart mới
      const currentCartId = cartId ? parseInt(cartId) : 0;
      
      console.log('Adding to cart:', {
        cartId: currentCartId,
        productId: parseInt(product.id),
        quantity: quantity
      });
      
      await dispatch(addToCartAsync({
        cartId: currentCartId,
        productId: parseInt(product.id),
        quantity: quantity
      })).unwrap();
      
      // Success message will be handled by useEffect above
    } catch (error) {
      console.error('Error adding to cart:', error);
      // Error message will be handled by useEffect above
    }
  };

  // Handle buy now
  const handleBuyNow = async () => {
    await handleAddToCart();
    // Navigate to cart page after adding
    // navigate('/cart');
  };

  // Related products (mock data for now, you can fetch this from API later)
  const relatedProducts = [
    {
      id: 1,
      image: "/images/gearvn03.png",
      name: "PC GVN Intel i3-12100F/ VGA RTX 3050",
      specs: [
        { icon: "/images/img_svg_gray_600_01.svg", text: "i3 12100F" },
        { icon: "/images/img_svg_gray_600_01_10x10.svg", text: "RTX 3050" },
        { icon: "/images/img_svg_10x10.svg", text: "H610" },
        { icon: "/images/img_svg_black_900_10x10.svg", text: "8GB" },
        { icon: "/images/img_svg_5.svg", text: "250GB" }
      ],
      originalPrice: "13.730.000₫",
      salePrice: "12.490.000₫",
      discount: "-9%",
      rating: "0.0",
      reviews: "(0 đánh giá)"
    },
    {
      id: 2,
      image: "/images/gearvn03.png",
      name: "PC GVN x MSI PROJECT ZERO WHITE",
      specs: [
        { icon: "/images/img_svg_gray_600_01.svg", text: "i5 14400F" },
        { icon: "/images/img_svg_gray_600_01_10x10.svg", text: "RTX 5060" },
        { icon: "/images/img_svg_10x10.svg", text: "B760" },
        { icon: "/images/img_svg_black_900_10x10.svg", text: "16GB" },
        { icon: "/images/img_svg_5.svg", text: "1TB" }
      ],
      originalPrice: "33.120.000₫",
      salePrice: "29.690.000₫",
      discount: "-10%",
      rating: "4.9",
      reviews: "(50 đánh giá)"
    },
    {
      id: 3,
      image: "/images/gearvn03.png",
      name: "PC GVN Intel i3-12100F/ VGA RX 6500XT",
      specs: [
        { icon: "/images/img_svg_gray_600_01.svg", text: "i3 12100F" },
        { icon: "/images/img_svg_gray_600_01_10x10.svg", text: "RX 6500XT" },
        { icon: "/images/img_svg_10x10.svg", text: "H610" },
        { icon: "/images/img_svg_black_900_10x10.svg", text: "8GB" },
        { icon: "/images/img_svg_5.svg", text: "250GB" }
      ],
      originalPrice: "11.430.000₫",
      salePrice: "10.490.000₫",
      discount: "-8%",
      rating: "5.0",
      reviews: "(2 đánh giá)"
    },
    {
      id: 4,
      image: "/images/gearvn03.png",
      name: "PC GVN Intel i5-12400F/ VGA RTX 3060",
      specs: [
        { icon: "/images/img_svg_gray_600_01.svg", text: "i5 12400F" },
        { icon: "/images/img_svg_gray_600_01_10x10.svg", text: "RTX 3060" },
        { icon: "/images/img_svg_10x10.svg", text: "B760" },
        { icon: "/images/img_svg_black_900_10x10.svg", text: "16GB" },
        { icon: "/images/img_svg_5.svg", text: "500GB" }
      ],
      originalPrice: "19.820.000₫",
      salePrice: "16.990.000₫",
      discount: "-14%",
      rating: "5.0",
      reviews: "(5 đánh giá)"
    }
  ];

  const ProductCard = ({ product, showSpecs = false }) => (
    <div className="bg-global-13 rounded-[3px] shadow-sm hover:shadow-md transition-shadow duration-300">
      <div className="relative">
        <img
          src={product?.image}
          alt={product?.name}
          className="w-full h-[120px] sm:h-[140px] md:h-[166px] object-cover rounded-t-[4px]"
        />
      </div>

      <div className="p-2 sm:p-3">
        <h3 className="text-global-3 text-[12px] sm:text-[14px] font-semibold mb-2 line-clamp-2">
          {product?.name}
        </h3>

        {showSpecs && product?.specs && (
          <div className="bg-global-8 rounded-[4px] p-2 mb-2">
            {product?.specs?.map((spec, index) => (
              <div key={index} className="flex items-center gap-1 mb-1 last:mb-0">
                <img src={spec?.icon} alt="" className="w-[8px] h-[8px]" />
                <span className="text-global-4 text-[10px] sm:text-[12px]">{spec?.text}</span>
              </div>
            ))}
          </div>
        )}

        {product?.originalPrice && (
          <p className="text-global-4 text-[11px] sm:text-[13px] line-through mb-1">
            {product?.originalPrice}
          </p>
        )}

        <div className="flex items-center justify-between mb-2">
          <span className="text-global-5 text-[14px] sm:text-[16px] font-semibold">
            {product?.salePrice || product?.price}
          </span>
          {product?.discount && (
            <span className="bg-global-12 text-global-5 text-[11px] sm:text-[13px] px-1 py-0.5 rounded-[2px] border border-global-5">
              {product?.discount}
            </span>
          )}
        </div>

        <div className="flex items-center gap-2">
          <span className="text-global-6 text-[10px] sm:text-[12px] font-semibold">{product?.rating}</span>
          <img src="/images/img_svg_orange_600.svg" alt="Star" className="w-[10px] h-[10px]" />
          <span className="text-global-4 text-[10px] sm:text-[12px]">{product?.reviews}</span>
        </div>
      </div>
    </div>
  );

  // Loading state
  if (loading) {
    return (
      <div className="w-full bg-global-8 overflow-x-hidden">
        <Header />
        <div className="flex justify-center items-center min-h-screen">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-global-3"></div>
        </div>
        <Footer />
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="w-full bg-global-8 overflow-x-hidden">
        <Header />
        <div className="flex flex-col justify-center items-center min-h-screen">
          <div className="text-red-500 text-lg mb-4">{error}</div>
          <Button 
            onClick={() => window.location.reload()} 
            className="bg-global-5 text-global-13 px-6 py-2 rounded-[4px]"
          >
            Thử lại
          </Button>
        </div>
        <Footer />
      </div>
    );
  }

  // Product not found
  if (!product) {
    return (
      <div className="w-full bg-global-8 overflow-x-hidden">
        <Header />
        <div className="flex flex-col justify-center items-center min-h-screen">
          <div className="text-global-3 text-lg mb-4">Không tìm thấy sản phẩm</div>
          <Link 
            to="/" 
            className="bg-global-5 text-global-13 px-6 py-2 rounded-[4px] hover:bg-red-700"
          >
            Về trang chủ
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="w-full bg-global-8 overflow-x-hidden">
      {/* Top Banner */}
      <div className="w-full bg-global-3">
        <div className="w-full max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
          <img
            src="/images/img_pc_gvn_th_ng_8.png"
            alt="Top Banner"
            className="w-full h-[30px] sm:h-[36px] md:h-[46px] object-cover"
          />
        </div>
      </div>

      {/* Header */}
      <Header />

      {/* Breadcrumb */}
      <div className="w-full bg-global-13">
        <div className="w-full max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 py-3 text-sm">
            <Link to="/" className="text-global-2 hover:underline">Trang chủ</Link>
            <span className="text-global-4">/</span>
            <span className="text-global-2">{product.specs["Danh mục"] || "Sản phẩm"}</span>
            <span className="text-global-4">/</span>
            <span className="text-global-3">{product.name}</span>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="w-full">
        <div className="w-full max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-4 mt-4">
            {/* Left Sidebar */}
            <div className="hidden lg:block w-[150px] flex-shrink-0">
              <img
                src="/images/back-to-school-20250.png"
                alt="Left Banner"
                className="w-full h-[300px] sm:h-[400px] md:h-[452px] object-cover rounded-[4px]"
              />
            </div>

            {/* Product Detail Content */}
            <div className="flex-1">
              <div className="bg-global-13 rounded-[4px] p-4 mb-4">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Product Images */}
                  <div className="space-y-4">
                    {/* Main Image */}
                    <div className="relative">
                      <img
                        src={product.images[selectedImage]}
                        alt={product.name}
                        className="w-full h-[300px] sm:h-[400px] object-cover rounded-[4px] border"
                      />
                      <div className="absolute top-4 left-4 bg-global-5 text-global-13 px-2 py-1 rounded-[2px] text-sm font-semibold">
                        {product.discount}
                      </div>
                      <div className="absolute bottom-4 right-4 bg-global-2 text-global-8 px-3 py-1 rounded-[20px] text-xs">
                        Còn {product.stock} sản phẩm
                      </div>
                    </div>

                    {/* Thumbnail Images */}
                    <div className="flex gap-2">
                      {product.images.map((image, index) => (
                        <img
                          key={index}
                          src={image}
                          alt=""
                          className={`w-[60px] h-[60px] object-cover rounded-[4px] border-2 cursor-pointer ${
                            selectedImage === index ? 'border-global-2' : 'border-global-8'
                          }`}
                          onClick={() => setSelectedImage(index)}
                        />
                      ))}
                    </div>
                  </div>

                  {/* Product Info */}
                  <div className="space-y-4">
                    <h1 className="text-global-3 text-xl sm:text-2xl font-semibold">
                      {product.name}
                    </h1>

                    <div className="flex items-center gap-2">
                      <span className="text-global-6 text-sm">{product.rating}</span>
                      <span className="text-global-6 text-sm">★</span>
                      <span className="text-global-2 text-sm hover:underline cursor-pointer">Xem đánh giá</span>
                    </div>

                    {/* Price */}
                    <div className="space-y-2">
                      <div className="flex items-center gap-4">
                        <span className="text-global-5 text-2xl sm:text-3xl font-bold">
                          {product.salePrice}
                        </span>
                        <span className="text-global-4 text-lg line-through">
                          {product.originalPrice}
                        </span>
                        <span className="bg-global-12 text-global-5 px-2 py-1 rounded-[2px] text-sm font-semibold border border-global-5">
                          {product.discount}
                        </span>
                      </div>
                    </div>

                    {/* Stock status */}
                    <div className="flex items-center gap-2">
                      <span className="text-global-3 text-sm">Tình trạng:</span>
                      <span className={`text-sm font-semibold ${product.stock > 0 ? 'text-green-600' : 'text-red-600'}`}>
                        {product.stock > 0 ? `Còn hàng (${product.stock})` : 'Hết hàng'}
                      </span>
                    </div>

                    {/* Features */}
                    <div className="space-y-2">
                      {product.features.map((feature, index) => (
                        <div key={index} className="flex items-center gap-2">
                          <img src="/images/img_svg_gray_600_01.svg" alt="" className="w-4 h-4" />
                          <span className="text-global-2 text-sm bg-global-6 px-2 py-1 rounded-[4px]">
                            {feature}
                          </span>
                        </div>
                      ))}
                    </div>

                    {/* Buy Actions */}
                    <div className="space-y-3">
                      <Button 
                        className="w-full bg-global-5 text-global-13 py-3 text-lg font-semibold rounded-[4px] hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed"
                        disabled={product.stock === 0 || cartLoading}
                        onClick={handleBuyNow}
                      >
                        {cartLoading ? (
                          <div className="flex items-center justify-center">
                            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                            ĐANG XỬ LÝ...
                          </div>
                        ) : product.stock > 0 ? (
                          <>
                            MUA NGAY
                            <div className="text-sm font-normal">Giao tận nơi hoặc nhận tại cửa hàng</div>
                          </>
                        ) : (
                          'HẾT HÀNG'
                        )}
                      </Button>

                      {/* Quantity and Add to Cart */}
                      {product.stock > 0 && (
                        <div className="flex gap-3">
                          <div className="flex items-center border border-global-8 rounded-[4px]">
                            <button 
                              className="px-3 py-2 hover:bg-global-8 disabled:opacity-50"
                              disabled={cartLoading}
                              onClick={() => setQuantity(Math.max(1, quantity - 1))}
                            >
                              -
                            </button>
                            <span className="px-4 py-2 border-x border-global-8">{quantity}</span>
                            <button 
                              className="px-3 py-2 hover:bg-global-8 disabled:opacity-50"
                              disabled={cartLoading}
                              onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                            >
                              +
                            </button>
                          </div>
                          <Button 
                            className="flex-1 border border-global-3 text-global-3 py-2 rounded-[4px] hover:bg-global-8 disabled:opacity-50 disabled:cursor-not-allowed"
                            disabled={cartLoading}
                            onClick={handleAddToCart}
                          >
                            {cartLoading ? (
                              <div className="flex items-center justify-center">
                                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-global-3 mr-2"></div>
                                ĐANG THÊM...
                              </div>
                            ) : (
                              'THÊM VÀO GIỎ'
                            )}
                          </Button>
                        </div>
                      )}
                    </div>

                    {/* Promotions */}
                    <div className="space-y-2">
                      <h3 className="text-global-3 font-semibold">ưu đãi đặc biệt</h3>
                      {product.promotions.map((promo, index) => (
                        <div key={index} className="flex items-start gap-2">
                          <span className="text-global-6 text-sm">⭐</span>
                          <span className="text-global-3 text-sm">{promo}</span>
                        </div>
                      ))}
                    </div>

                    {/* Benefits */}
                    <div className="space-y-2">
                      <h3 className="text-global-3 font-semibold">Khuyến mãi</h3>
                      {product.benefits.map((benefit, index) => (
                        <div key={index} className="flex items-start gap-2">
                          <span className="text-green-500">✓</span>
                          <span className="text-global-3 text-sm">{benefit}</span>
                        </div>
                      ))}
                    </div>

                    {/* Showroom */}
                    <div className="border-t border-global-8 pt-4">
                      <div className="text-global-3 font-semibold mb-2">Showroom HCM</div>
                      <div className="text-global-3 text-sm space-y-1">
                        <div>📍 273 An D. Vương, Phường 3, Quận 5, TP.HCM</div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Product Specifications */}
                <div className="mt-8 border-t border-global-8 pt-6">
                  <h2 className="text-global-3 text-xl font-semibold mb-4">Thông số kỹ thuật</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {Object.entries(product.specs).map(([key, value]) => (
                      <div key={key} className="flex justify-between py-2 border-b border-global-8">
                        <span className="text-global-4 capitalize">{key}:</span>
                        <span className="text-global-3 font-medium">{value}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Description */}
                <div className="mt-8 border-t border-global-8 pt-6">
                  <h2 className="text-global-3 text-xl font-semibold mb-4">Mô tả sản phẩm</h2>
                  <p className="text-global-3 leading-relaxed">{product.description}</p>
                </div>
              </div>
            </div>

            {/* Right Sidebar */}
            <div className="hidden lg:block w-[150px] flex-shrink-0">
              <img
                src="/images/back-to-school-20250.png"
                alt="Right Banner"
                className="w-full h-[300px] sm:h-[400px] md:h-[452px] object-cover rounded-[4px]"
              />
            </div>
          </div>

          {/* Related Products */}
          <div className="mt-8">
            <div className="bg-global-13 rounded-[4px] p-4">
              <h2 className="text-global-3 text-xl font-semibold mb-4">Sản phẩm tương tự</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {relatedProducts.map((product) => (
                  <ProductCard key={product.id} product={product} showSpecs={true} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default ProductDetail;
