import React, { useState, useEffect } from 'react';
import api from '../../config/axios'; // Import axios instance
import Header from '../../components/common/Header';
import Footer from '../../components/common/Footer';
import Button from '../../components/ui/Button';
import EditText from '../../components/ui/EditText';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();
  const [selectedFlashSaleDate, setSelectedFlashSaleDate] = useState('23/8');
  const [selectedGearArenaDate, setSelectedGearArenaDate] = useState('1');
  
  // State cho dữ liệu API
  const [pcProducts, setPcProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch dữ liệu PC products với axios
  useEffect(() => {
    const fetchPcProducts = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // Gọi API trực tiếp với axios
        const response = await api.get('catalog/products', {
          params: {
            categoryId: '1',
            size: 12,
            sort: 'createdAt',
            dir: 'desc'
          }
        });

        console.log('PC Products API Response:', response.data);
        
        // Kiểm tra cấu trúc response
        const products = response.data?.content || response.data || [];
        
        // Transform dữ liệu API để phù hợp với component
        const transformedProducts = products.map(product => ({
          id: product.id,
          image: product.imageUrl || "/images/gearvn03.png",
          name: product.name,
          specs: [
            { icon: "/images/img_svg_gray_600_01.svg", text: product.manufacturer || 'N/A' },
            { icon: "/images/img_svg_gray_600_01_10x10.svg", text: product.categoryName || 'N/A' }
          ],
          originalPrice: `${(product.price * 1.2).toLocaleString('vi-VN')}₫`,
          salePrice: `${product.price.toLocaleString('vi-VN')}₫`,
          discount: "-17%",
          rating: "0.0",
          reviews: "(0 đánh giá)",
          stock: product.stock || 0,
          description: product.description || ''
        }));
        
        setPcProducts(transformedProducts);
        console.log('Transformed PC Products:', transformedProducts);
        
      } catch (err) {
        console.error('Lỗi khi tải dữ liệu PC products:', err);
        
        // Xử lý các loại lỗi khác nhau
        if (err.response?.status === 401) {
          setError('Phiên đăng nhập đã hết hạn. Vui lòng đăng nhập lại.');
        } else if (err.response?.status === 403) {
          setError('Không có quyền truy cập dữ liệu sản phẩm.');
        } else if (err.response?.status === 404) {
          setError('Không tìm thấy dữ liệu sản phẩm.');
        } else if (err.response?.data?.message) {
          setError(`Lỗi: ${err.response.data.message}`);
        } else if (err.message) {
          setError(`Lỗi kết nối: ${err.message}`);
        } else {
          setError('Không thể tải dữ liệu sản phẩm. Vui lòng thử lại.');
        }
        
        // Fallback: sử dụng dữ liệu mock nếu API fail
        setPcProducts([]);
        
      } finally {
        setLoading(false);
      }
    };

    fetchPcProducts();
  }, []);

  // Flash Sale Products Data
  const flashSaleProducts = [
    {
      id: 1,
      image: "/images/img_picture_m_n_h_nh_nh.png",
      name: "Màn hình Viewsonic VA2432A-H 24\" IPS… 120Hz viền mỏng",
      originalPrice: "3.590.000₫",
      salePrice: "2.050.000₫",
      discount: "-43%",
      rating: "0.0",
      reviews: "(0 đánh giá)",
      badge: "Vừa mở bán"
    },
    {
      id: 2,
      image: "/images/img_picture_m_n_h_nh_166x166.png",
      name: "Màn hình Acer KG240Y-X1 24\" IPS 200Hz Gsy… chuyên game",
      originalPrice: "3.790.000₫",
      salePrice: "2.690.000₫",
      discount: "-29%",
      rating: "0.0",
      reviews: "(0 đánh giá)",
      badge: "Đã bán: 1"
    },
    {
      id: 3,
      image: "/images/img_picture_gearvn.png",
      name: "Màn hình Asus TUF GAMING VG249QE5A-… 24\" IPS 146Hz chuyên",
      originalPrice: "3.990.000₫",
      salePrice: "2.690.000₫",
      discount: "-33%",
      rating: "0.0",
      reviews: "(0 đánh giá)",
      badge: "Vừa mở bán"
    },
    {
      id: 4,
      image: "/images/img_picture_m_n_h_nh_1.png",
      name: "Màn hình ViewSonic VX2479-HD-PRO 24\"… IPS 180Hz chuyên game",
      originalPrice: "3.390.000₫",
      salePrice: "2.690.000₫",
      discount: "-21%",
      rating: "0.0",
      reviews: "(0 đánh giá)",
      badge: "Đã bán: 22"
    },
    {
      id: 5,
      image: "/images/img_picture_m_n_h_nh_2.png",
      name: "Màn hình Asus TUF GAMING VG259Q5A 2… Fast IPS 200Hz Gsync",
      originalPrice: "3.990.000₫",
      salePrice: "2.990.000₫",
      discount: "-25%",
      rating: "0.0",
      reviews: "(0 đánh giá)",
      badge: "Vừa mở bán"
    },
    {
      id: 6,
      image: "/images/img_picture_m_n_h_nh_3.png",
      name: "Màn hình ViewSonic VX2528J 25\" IPS 180… Gsync chuyên game",
      originalPrice: "4.290.000₫",
      salePrice: "3.090.000₫",
      discount: "-28%",
      rating: "0.0",
      reviews: "(0 đánh giá)",
      badge: "Vừa mở bán"
    }
  ];

  // Gear Arena Products Data
  const gearArenaProducts = [
    {
      id: 1,
      image: "/images/gearvn03.png",
      name: "Chuột AKKO AG ONE 8K Joy of Life",
      originalPrice: "1.590.000₫",
      salePrice: "890.000₫",
      discount: "-44%",
      rating: "0.0",
      reviews: "(0 đánh giá)",
      badge: "Vừa mở bán"
    },
    {
      id: 2,
      image: "/images/gearvn03.png",
      name: "Bàn phím cơ AKKO MOD 007B HE PC Joy of Life",
      originalPrice: "3.690.000₫",
      salePrice: "2.750.000₫",
      discount: "-25%",
      rating: "0.0",
      reviews: "(0 đánh giá)",
      badge: "Đã bán: 3"
    },
    {
      id: 3,
      image: "/images/gearvn03.png",
      name: "Chuột Pulsar có dây X2 Medium White",
      originalPrice: "1.390.000₫",
      salePrice: "1.249.000₫",
      discount: "-10%",
      rating: "0.0",
      reviews: "(0 đánh giá)",
      badge: "Vừa mở bán"
    },
    {
      id: 4,
      image: "/images/gearvn03.png",
      name: "Củ Sạc Ugreen GaN Nexode 30W CD319 G… 90901",
      originalPrice: "350.000₫",
      salePrice: "190.000₫",
      discount: "-46%",
      rating: "0.0",
      reviews: "(0 đánh giá)",
      badge: "Đã bán: 1"
    }
  ];

  // PC Products Data
  const pcProductsData = [
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
      name: "PC GVN x MSI PROJECT ZERO WHITE (Intel i5-…",
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
      name: "PC GVN Intel i3-12100F/ VGA RX 6500XT (Powered by…",
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
    },
    {
      id: 5,
      image: "/images/gearvn03.png",
      name: "PC GVN x Corsair iCUE (Intel i5-14400F/ VGA RTX 5060)",
      specs: [
        { icon: "/images/img_svg_gray_600_01.svg", text: "I5-14400F" },
        { icon: "/images/img_svg_gray_600_01_10x10.svg", text: "RTX5060" },
        { icon: "/images/img_svg_black_900_10x10.svg", text: "16GB" },
        { icon: "/images/img_svg_5.svg", text: "500GB" }
      ],
      originalPrice: "28.220.000₫",
      salePrice: "27.490.000₫",
      discount: "-3%",
      rating: "0.0",
      reviews: "(0 đánh giá)"
    }
  ];

  // Gaming Laptops Data
  const gamingLaptops = [
    {
      id: 1,
      image: "/images/gearvn03.png",
      name: "Laptop gaming Acer Nitro V ANV15 51 500A",
      specs: [
        { icon: "/images/img_svg_gray_600_01.svg", text: "i5-13420H" },
        { icon: "/images/img_svg_gray_600_01_10x10.svg", text: "RTX 2050" },
        { icon: "/images/img_svg_black_900_10x10.svg", text: "32 GB" },
        { icon: "/images/img_svg_5.svg", text: "512 GB" },
        { icon: "/images/img_svg_6.svg", text: "15.6 inch FHD" },
        { icon: "/images/img_clip_path_group.svg", text: "180 Hz" }
      ],
      originalPrice: "23.990.000₫",
      salePrice: "18.390.000₫",
      discount: "-23%",
      rating: "0.0",
      reviews: "(0 đánh giá)"
    },
    {
      id: 2,
      image: "/images/gearvn03.png",
      name: "Laptop gaming Lenovo LOQ 15IAX9E 83LK0079VN",
      specs: [
        { icon: "/images/img_svg_gray_600_01.svg", text: "i5-12450HX" },
        { icon: "/images/img_svg_gray_600_01_10x10.svg", text: "RTX 3050" },
        { icon: "/images/img_svg_black_900_10x10.svg", text: "16 GB" },
        { icon: "/images/img_svg_5.svg", text: "512 GB" },
        { icon: "/images/img_svg_6.svg", text: "15.6 inch FHD" },
        { icon: "/images/img_clip_path_group.svg", text: "144 Hz" }
      ],
      originalPrice: "22.490.000₫",
      salePrice: "18.590.000₫",
      discount: "-17%",
      rating: "0.0",
      reviews: "(0 đánh giá)"
    },
    {
      id: 3,
      image: "/images/gearvn03.png",
      name: "Laptop gaming MSI Thin 15 B13UC 2081VN",
      specs: [
        { icon: "/images/img_svg_gray_600_01.svg", text: "i5-13420H" },
        { icon: "/images/img_svg_gray_600_01_10x10.svg", text: "RTX 3050" },
        { icon: "/images/img_svg_black_900_10x10.svg", text: "16 GB" },
        { icon: "/images/img_svg_5.svg", text: "512 GB" },
        { icon: "/images/img_svg_6.svg", text: "15.6 inch FHD IPS" }
      ],
      originalPrice: "21.990.000₫",
      salePrice: "17.990.000₫",
      discount: "-18%",
      rating: "0.0",
      reviews: "(0 đánh giá)"
    },
    {
      id: 4,
      image: "/images/gearvn03.png",
      name: "Laptop gaming Lenovo LOQ 15IRX9 83DV013PVN",
      specs: [
        { icon: "/images/img_svg_gray_600_01.svg", text: "i5-13450HX" },
        { icon: "/images/img_svg_gray_600_01_10x10.svg", text: "RTX 3050" },
        { icon: "/images/img_svg_black_900_10x10.svg", text: "12 GB" },
        { icon: "/images/img_svg_5.svg", text: "512 GB" },
        { icon: "/images/img_svg_6.svg", text: "15.6 inch" },
        { icon: "/images/img_clip_path_group.svg", text: "144 Hz" }
      ],
      originalPrice: "25.990.000₫",
      salePrice: "22.990.000₫",
      discount: "-12%",
      rating: "0.0",
      reviews: "(0 đánh giá)"
    },
    {
      id: 5,
      image: "/images/gearvn03.png",
      name: "Laptop gaming MSI Sword 16 HX B14VEKG 856VN",
      specs: [
        { icon: "/images/img_svg_gray_600_01.svg", text: "i7-14700HX" },
        { icon: "/images/img_svg_gray_600_01_10x10.svg", text: "RTX 4050" },
        { icon: "/images/img_svg_black_900_10x10.svg", text: "16 GB" },
        { icon: "/images/img_svg_5.svg", text: "1 TB" },
        { icon: "/images/img_svg_6.svg", text: "16 inch FHD+ IPS" },
        { icon: "/images/img_clip_path_group.svg", text: "165 Hz" }
      ],
      originalPrice: "35.990.000₫",
      salePrice: "31.990.000₫",
      discount: "-11%",
      rating: "0.0",
      reviews: "(0 đánh giá)"
    }
  ];

  // Office Laptops Data
  const officeLaptops = [
    {
      id: 1,
      image: "/images/img_picture_laptop_4.png",
      name: "Laptop Acer Aspire Lite 14 AL14 71P 55P9",
      originalPrice: "15.590.000₫",
      salePrice: "14.990.000₫",
      discount: "-4%",
      rating: "0.0",
      reviews: "(0 đánh giá)"
    },
    {
      id: 2,
      image: "/images/img_picture_laptop_140x210.png",
      name: "Laptop ACER Swift Lite 14 SFL14 51M 56HS",
      originalPrice: "19.990.000₫",
      salePrice: "18.190.000₫",
      discount: "-9%",
      rating: "0.0",
      reviews: "(0 đánh giá)"
    },
    {
      id: 3,
      image: "/images/img_picture_laptop_5.png",
      name: "Laptop ASUS Expertbook P1403CVA-i516-50W",
      originalPrice: "15.590.000₫",
      salePrice: "14.290.000₫",
      discount: "-8%",
      rating: "0.0",
      reviews: "(0 đánh giá)"
    },
    {
      id: 4,
      image: "/images/img_picture_laptop_168x210.png",
      name: "Laptop MSI Modern 15 H C13M 216VN",
      originalPrice: "22.490.000₫",
      salePrice: "18.290.000₫",
      discount: "-19%",
      rating: "0.0",
      reviews: "(0 đánh giá)"
    },
    {
      id: 5,
      image: "/images/img_picture_laptop_6.png",
      name: "Laptop Lenovo V14 G4 IRU 83A000BEVN",
      originalPrice: "14.990.000₫",
      salePrice: "12.290.000₫",
      discount: "-18%",
      rating: "0.0",
      reviews: "(0 đánh giá)"
    }
  ];

  // Mouse Products Data
  const mouseProducts = [
    {
      id: 1,
      image: "/images/img_picture_chu_t_210x210.png",
      name: "Chuột Gaming Asus TUF M4 Wireless",
      specs: [
        { icon: "/images/img_svg_7.svg", text: "Pin rời" },
        { icon: "/images/img_svg_8.svg", text: "Không dây" },
        { icon: "/images/img_clip_path_group_black_900.svg", text: "DPI - 12.000" }
      ],
      originalPrice: "1.190.000₫",
      salePrice: "990.000₫",
      discount: "-17%",
      rating: "0.0",
      reviews: "(0 đánh giá)",
      badge: "Bán chạy"
    },
    {
      id: 2,
      image: "/images/img_picture_chu_t_1.png",
      name: "Chuột Pulsar có dây Xlite Medium Black",
      specs: [
        { icon: "/images/img_svg_8.svg", text: "Có dây" },
        { icon: "/images/img_clip_path_group_black_900.svg", text: "DPI 26000" }
      ],
      originalPrice: "1.390.000₫",
      salePrice: "1.249.000₫",
      discount: "-10%",
      rating: "0.0",
      reviews: "(0 đánh giá)"
    },
    {
      id: 3,
      image: "/images/img_picture_chu_t_2.png",
      name: "Chuột Pulsar có dây X2 Medium Black",
      specs: [
        { icon: "/images/img_svg_8.svg", text: "Có dây" },
        { icon: "/images/img_clip_path_group_black_900.svg", text: "DPI 26000" }
      ],
      originalPrice: "1.390.000₫",
      salePrice: "1.249.000₫",
      discount: "-10%",
      rating: "0.0",
      reviews: "(0 đánh giá)"
    },
    {
      id: 4,
      image: "/images/img_picture_chu_t_3.png",
      name: "Chuột Pulsar có dây X2H Medium White",
      specs: [
        { icon: "/images/img_svg_8.svg", text: "Có dây" },
        { icon: "/images/img_clip_path_group_black_900.svg", text: "DPI 26000" }
      ],
      originalPrice: "1.390.000₫",
      salePrice: "890.000₫",
      discount: "-36%",
      rating: "0.0",
      reviews: "(0 đánh giá)"
    },
    {
      id: 5,
      image: "/images/img_picture_chu_t_4.png",
      name: "Chuột Pulsar có dây X2 Medium White",
      specs: [
        { icon: "/images/img_svg_8.svg", text: "Có dây" },
        { icon: "/images/img_clip_path_group_black_900.svg", text: "DPI 26000" }
      ],
      originalPrice: "1.390.000₫",
      salePrice: "1.249.000₫",
      discount: "-10%",
      rating: "0.0",
      reviews: "(0 đánh giá)"
    }
  ];

  // Keyboard Products Data
  const keyboardProducts = [
    {
      id: 1,
      image: "/images/img_picture_b_n_ph_m_210x210.png",
      name: "Bàn phím AKKO 5075B Plus Red World Tour VIET NAM",
      price: "1.790.000₫",
      rating: "0.0",
      reviews: "(0 đánh giá)"
    },
    {
      id: 2,
      image: "/images/img_picture_b_n_ph_m_1.png",
      name: "Bàn phím AKKO 5075B Plus Black World Tour VIET NAM",
      price: "1.790.000₫",
      rating: "0.0",
      reviews: "(0 đánh giá)"
    },
    {
      id: 3,
      image: "/images/img_picture_b_n_ph_m_2.png",
      name: "Bàn phím AKKO 5108B Plus Hatsune Miku Akko Piano…",
      price: "2.490.000₫",
      rating: "0.0",
      reviews: "(0 đánh giá)"
    },
    {
      id: 4,
      image: "/images/img_picture_b_n_ph_m_3.png",
      name: "Bàn phím AKKO TAC87 3 MODE Prunus Lannesiana…",
      originalPrice: "1.390.000₫",
      salePrice: "1.100.000₫",
      discount: "-21%",
      rating: "0.0",
      reviews: "(0 đánh giá)"
    },
    {
      id: 5,
      image: "/images/img_picture_b_n_ph_m_4.png",
      name: "Bàn phím AKKO TAC87 3 MODE Matcha Red Bean…",
      originalPrice: "1.390.000₫",
      salePrice: "1.100.000₫",
      discount: "-21%",
      rating: "0.0",
      reviews: "(0 đánh giá)"
    }
  ];

  // Monitor Products Data
  const monitorProducts = [
    {
      id: 1,
      image: "/images/img_picture_m_n_h_nh_210x210.png",
      name: "Màn hình LG 29U531A-W 29\" IPS 100Hz USBC HDR10…",
      specs: [
        { icon: "/images/img_svg_6.svg", text: "29 inch" },
        { icon: "/images/img_clip_path_group.svg", text: "100 Hz" },
        { icon: "/images/img_svg_9.svg", text: "Full HD (1920 x 1080)" },
        { icon: "/images/img_clip_path_group_black_900_10x10.svg", text: "IPS" }
      ],
      originalPrice: "5.990.000₫",
      salePrice: "4.990.000₫",
      discount: "-17%",
      rating: "0.0",
      reviews: "(0 đánh giá)"
    },
    {
      id: 2,
      image: "/images/img_picture_m_n_h_nh_4.png",
      name: "Màn hình LG 27U411A-B 27\" IPS 120Hz HDR10 siêu mỏng",
      specs: [
        { icon: "/images/img_svg_6.svg", text: "27 inch" },
        { icon: "/images/img_clip_path_group.svg", text: "120 Hz" },
        { icon: "/images/img_svg_9.svg", text: "Full HD (1920 x 1080)" },
        { icon: "/images/img_clip_path_group_black_900_10x10.svg", text: "IPS" }
      ],
      originalPrice: "3.590.000₫",
      salePrice: "2.990.000₫",
      discount: "-17%",
      rating: "0.0",
      reviews: "(0 đánh giá)"
    },
    {
      id: 3,
      image: "/images/img_picture_m_n_h_nh_5.png",
      name: "Màn hình LG 24U411A-B 24\" IPS 120Hz HDR10 siêu mỏng",
      specs: [
        { icon: "/images/img_svg_6.svg", text: "24 inch" },
        { icon: "/images/img_clip_path_group.svg", text: "120 Hz" },
        { icon: "/images/img_svg_9.svg", text: "Full HD (1920 x 1080)" },
        { icon: "/images/img_clip_path_group_black_900_10x10.svg", text: "IPS" }
      ],
      originalPrice: "2.590.000₫",
      salePrice: "2.390.000₫",
      discount: "-8%",
      rating: "0.0",
      reviews: "(0 đánh giá)"
    },
    {
      id: 4,
      image: "/images/img_picture_m_n_h_nh_6.png",
      name: "Màn hình LG 22U401A-B 22\" 100Hz HDR10",
      specs: [
        { icon: "/images/img_svg_6.svg", text: "22 inch" },
        { icon: "/images/img_clip_path_group.svg", text: "100 Hz" },
        { icon: "/images/img_svg_9.svg", text: "Full HD (1920 x 1080)" },
        { icon: "/images/img_clip_path_group_black_900_10x10.svg", text: "VA" }
      ],
      originalPrice: "2.290.000₫",
      salePrice: "2.090.000₫",
      discount: "-9%",
      rating: "0.0",
      reviews: "(0 đánh giá)"
    },
    {
      id: 5,
      image: "/images/img_picture_m_n_h_nh_7.png",
      name: "Màn hình LG 24U631A-B 24\" IPS 2K 100Hz USBC",
      specs: [
        { icon: "/images/img_svg_6.svg", text: "24 inch" },
        { icon: "/images/img_clip_path_group.svg", text: "100 Hz" },
        { icon: "/images/img_svg_9.svg", text: "2K (2560 x 1440)" },
        { icon: "/images/img_clip_path_group_black_900_10x10.svg", text: "IPS" }
      ],
      originalPrice: "4.990.000₫",
      salePrice: "4.290.000₫",
      discount: "-14%",
      rating: "0.0",
      reviews: "(0 đánh giá)"
    }
  ];

  // Product categories data
  const productCategories = [
    { icon: "/images/img_laptop.png", name: "Laptop" },
    { icon: "/images/img_pc.png", name: "PC" },
    { icon: "/images/img_m_n_h_nh.png", name: "Màn hình" },
    { icon: "/images/img_mainboard.png", name: "Mainboard" },
    { icon: "/images/img_cpu.png", name: "CPU" },
    { icon: "/images/img_vga.png", name: "VGA" },
    { icon: "/images/img_ram.png", name: "RAM" },
    { icon: "/images/img_c_ng.png", name: "Ổ cứng" },
    { icon: "/images/img_case.png", name: "Case" },
    { icon: "/images/img_t_n_nhi_t.png", name: "Tản nhiệt" },
    { icon: "/images/img_ngu_n.png", name: "Nguồn" },
    { icon: "/images/img_b_n_ph_m.png", name: "Bàn phím" },
    { icon: "/images/img_chu_t.png", name: "Chuột" },
    { icon: "/images/img_gh.png", name: "Ghế" },
    { icon: "/images/img_tai_nghe_84x84.png", name: "Tai nghe" },
    { icon: "/images/img_loa.png", name: "Loa" },
    { icon: "/images/img_console.png", name: "Console" },
    { icon: "/images/img_ph_ki_n.png", name: "Phụ kiện" },
    { icon: "/images/img_thi_t_b_vp.png", name: "Thiết bị VP" },
    { icon: "/images/img_s_c_dp.png", name: "Sạc DP" }
  ];

  // News articles data
  const newsArticles = [
    {
      id: 1,
      image: "/images/img_picture_c_ng_ngh.png",
      title: "Công nghệ âm thanh SonicMaster là gì? Có trên thiết bị nào?"
    },
    {
      id: 2,
      image: "/images/img_picture_bluetooth.png",
      title: "Bluetooth 5.4 là gì? Tính năng nổi bật, lợi ích cho người dùng"
    },
    {
      id: 3,
      image: "/images/img_picture_ram_lpddr5x.png",
      title: "RAM LPDDR5X là gì? Ưu nhược điểm, top laptop dùng RAM…"
    },
    {
      id: 4,
      image: "/images/img_picture_ram_lpddr4x.png",
      title: "RAM LPDDR4X là gì? Tìm hiểu hiệu năng, tốc độ, ưu nhược điểm"
    }
  ];

  // Handle product click
  const handleProductClick = (productId) => {
    navigate(`/product/${productId}`);
  };

  const ProductCard = ({ product, showSpecs = false }) => (
    <div className="bg-global-13 rounded-[3px] shadow-sm hover:shadow-md transition-shadow duration-300 mb-3 cursor-pointer"
         onClick={() => handleProductClick(product?.id)}>
      <div className="relative">
        <img
          src={product?.image}
          alt={product?.name}
          className="w-full h-[120px] sm:h-[140px] md:h-[166px] object-cover rounded-t-[4px] hover:opacity-90 transition-opacity"
        />
        {product?.badge && (
          <div className="absolute bottom-2 left-2 bg-global-10 rounded-[10px] px-2 py-1">
            <div className="flex items-center gap-1">
              <div className="w-[15px] h-[15px] bg-global-7 rounded-[10px]"></div>
              <span className="text-global-8 text-[10px] sm:text-[12px] font-semibold">{product?.badge}</span>
            </div>
          </div>
        )}
      </div>

      <div className="p-2 sm:p-3">
        <h3 className="text-global-3 text-[12px] sm:text-[14px] font-semibold mb-2 line-clamp-2 hover:text-global-2 transition-colors">
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
      {/* Navigation Links */}
      <div className="w-full bg-global-13">
        <div className="w-full max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 overflow-x-auto">
          <div className="flex items-center gap-4 sm:gap-6 md:gap-8 py-3 whitespace-nowrap">
            <div className="flex items-center gap-2 py-1">
              <img src="/images/img_svg_gray_900.svg" alt="" className="w-[14px] h-[14px] sm:w-[18px] sm:h-[18px]" />
              <span className="text-global-1 text-[11px] sm:text-[13px] font-semibold">Build PC tặng màn 240Hz</span>
            </div>
            <div className="w-[1px] h-[18px] sm:h-[24px] bg-global-5"></div>

            <div className="flex items-center gap-2 py-2">
              <img src="/images/img_svg_gray_900_24x24.svg" alt="" className="w-[18px] h-[18px] sm:w-[24px] sm:h-[24px]" />
              <span className="text-global-1 text-[11px] sm:text-[13px] font-semibold">Tin công nghệ</span>
            </div>
            <div className="w-[1px] h-[20px] sm:h-[26px] bg-global-5"></div>

            <div className="flex items-center gap-2 py-2">
              <img src="/images/img_svg_black_900.svg" alt="" className="w-[20px] h-[20px] sm:w-[26px] sm:h-[26px]" />
              <span className="text-global-1 text-[11px] sm:text-[13px] font-semibold">Dịch vụ sửa chữa</span>
            </div>
            <div className="w-[1px] h-[22px] sm:h-[28px] bg-global-5"></div>

            <div className="flex items-center gap-2 py-1">
              <img src="/images/img_svg_gray_900_14x20.svg" alt="" className="w-[16px] h-[11px] sm:w-[20px] sm:h-[14px]" />
              <span className="text-global-1 text-[11px] sm:text-[13px] font-semibold">Dịch vụ kỹ thuật tại nhà</span>
            </div>
            <div className="w-[1px] h-[18px] sm:h-[24px] bg-global-5"></div>

            <div className="flex items-center gap-2 px-4 sm:px-8 py-2">
              <img src="/images/img_svg_gray_900_18x16.svg" alt="" className="w-[12px] h-[14px] sm:w-[16px] sm:h-[18px]" />
              <span className="text-global-1 text-[11px] sm:text-[13px] font-semibold">Tra cứu bảo hành</span>
            </div>
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

            {/* Center Content */}
            <div className="flex-1">
              <div className="flex flex-col lg:flex-row gap-4 mt-4">
                {/* Category Menu */}
                <div className="w-full lg:w-[200px] bg-global-13 rounded-[4px] p-1">
                  <div className="space-y-1">
                    {[
                      { icon: "/images/img_svg_gray_900_12x20.svg", text: "Laptop" },
                      { icon: "/images/img_svg_gray_900_16x22.svg", text: "Laptop Gaming" },
                      { icon: "/images/img_svg_gray_900_20x20.svg", text: "PC GVN" },
                      { icon: "/images/img_svg_gray_900_20x20.svg", text: "Main, CPU, VGA" },
                      { icon: "/images/img_svg_gray_900_20x20.svg", text: "Case, Nguồn, Tản" },
                      { icon: "/images/img_svg_14x20.svg", text: "Ổ cứng, RAM, Thẻ nhớ" },
                      { icon: "/images/img_svg_24x24.svg", text: "Loa, Micro, Webcam" },
                      { icon: "/images/img_svg_gray_900_16x18.svg", text: "Màn hình" },
                      { icon: "/images/img_svg_3.svg", text: "Bàn phím" },
                      { icon: "/images/img_svg_gray_900_20x18.svg", text: "Chuột + Lót chuột" },
                      { icon: "/images/img_svg_gray_900_18x20.svg", text: "Tai Nghe" },
                      { icon: "/images/img_svg_gray_900_20x16.svg", text: "Ghế - Bàn" },
                      { icon: "/images/img_svg_gray_900_18x18.svg", text: "Phần mềm, mạng" },
                      { icon: "/images/img_svg_4.svg", text: "Handheld, Console" },
                      { icon: "/images/img_svg_4.svg", text: "Phụ kiện (Hub, sạc, cáp..)" },
                      { icon: "/images/img_svg_20x18.svg", text: "Dịch vụ và thông tin khác" }
                    ]?.map((item, index) => (
                      <div key={index} className="flex items-center justify-between p-1 hover:bg-gray-50 cursor-pointer">
                        <div className="flex items-center gap-2">
                          <img src={item?.icon} alt="" className="w-[16px] h-[16px]" />
                          <span className="text-global-1 text-[11px] sm:text-[13px]">{item?.text}</span>
                        </div>
                        <img src="/images/img_arrow_left.svg" alt="" className="w-[6px] h-[6px] sm:w-[8px] sm:h-[8px]" />
                      </div>
                    ))}
                  </div>
                </div>

                {/* Main Banner and Images */}
                <div className="flex-1">
                  <div className="relative mb-4">
                    <img
                      src="/images/img_pc_gvn_th_ng_8_324x650.png"
                      alt="Main Banner"
                      className="w-full h-[200px] sm:h-[250px] md:h-[324px] object-cover rounded-[4px]"
                    />
                    <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
                      {Array.from({ length: 11 })?.map((_, index) => (
                        <div
                          key={index}
                          className={`w-[15px] h-[3px] sm:w-[20px] sm:h-[4px] rounded ${index === 2 ? 'bg-global-7' : 'bg-global-1'}`}
                        ></div>
                      ))}
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <img
                      src="/images/back-to-school-20250.png"
                      alt="Gaming Laptop"
                      className="w-1/2 h-[100px] sm:h-[120px] md:h-[160px] object-cover rounded-[4px]"
                    />
                    <img
                      src="/images/back-to-school-20250.png"
                      alt="Office Laptop"
                      className="w-1/2 h-[100px] sm:h-[120px] md:h-[160px] object-cover rounded-[4px]"
                    />
                  </div>
                </div>

                {/* Right Sidebar */}
                <div className="w-full lg:w-[200px] space-y-2">
                  <img
                    src="/images/build-pc-t-ng-m-n-240-hz0.png"
                    alt="Build PC"
                    className="w-full h-[100px] sm:h-[120px] md:h-[158px] object-cover rounded-[4px]"
                  />
                  <img
                    src="/images/chu-t-ch-i-game-t-80.png"
                    alt="Wireless Accessories"
                    className="w-full h-[100px] sm:h-[120px] md:h-[158px] object-cover rounded-[4px]"
                  />
                  <img
                    src="/images/chu-t-ch-i-game-t-80.png"
                    alt="PC i5 5060"
                    className="w-full h-[100px] sm:h-[120px] md:h-[158px] object-cover rounded-[4px]"
                  />
                </div>
              </div>
            </div>

            {/* Right Banner */}
            <div className="hidden lg:block w-[150px] flex-shrink-0">
              <img
                src="/images/back-to-school-20250.png"
                alt="Back to School"
                className="w-full h-[300px] sm:h-[400px] md:h-[452px] object-cover rounded-[4px]"
              />
            </div>
          </div>

          {/* Promotional Banners */}
          <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 mt-4 py-2">
            <img src="/images/thu-c-i-m-i0.png" alt="Gaming Gear Deal" className="w-full sm:w-1/4 h-[100px] sm:h-[120px] md:h-[146px] object-cover rounded-[4px]" />
            <img src="/images/thu-c-i-m-i0.png" alt="Monitor Deal" className="w-full sm:w-1/4 h-[100px] sm:h-[120px] md:h-[146px] object-cover rounded-[4px]" />
            <img src="/images/thu-c-i-m-i0.png" alt="Gaming Mouse" className="w-full sm:w-1/4 h-[100px] sm:h-[120px] md:h-[146px] object-cover rounded-[4px]" />
            <img src="/images/thu-c-i-m-i0.png" alt="PC Intel i5" className="w-full sm:w-1/4 h-[100px] sm:h-[120px] md:h-[146px] object-cover rounded-[4px]" />
          </div>
        </div>
      </div>
      {/* Flash Sale Section */}
      <div className="w-full mt-4">
        <div className="w-full max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative bg-global-9 rounded-[4px] overflow-hidden">
            {/* Flash Sale Header */}
            <div className="bg-global-2 rounded-t-[4px] p-3">
              <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
                <div className="flex items-center gap-4">
                  {/* Timer */}
                  <div className="flex items-center gap-1">
                    <div className="bg-global-13 text-global-1 text-[14px] sm:text-[16px] font-bold px-1 py-1 rounded-[4px] tracking-wider">00</div>
                    <span className="text-global-8 text-[14px] sm:text-[16px] font-bold">:</span>
                    <div className="bg-global-13 text-global-1 text-[14px] sm:text-[16px] font-bold px-1 py-1 rounded-[4px] tracking-wider">01</div>
                    <span className="text-global-8 text-[14px] sm:text-[16px] font-bold">:</span>
                    <div className="bg-global-13 text-global-1 text-[14px] sm:text-[16px] font-bold px-1 py-1 rounded-[4px] tracking-wider">24</div>
                    <span className="text-global-8 text-[14px] sm:text-[16px] font-bold">:</span>
                    <div className="bg-global-13 text-global-1 text-[14px] sm:text-[16px] font-bold px-1 py-1 rounded-[4px] tracking-wider">01</div>
                  </div>

                  <div className="flex items-center gap-2 px-2">
                    <img src="/images/img_image.png" alt="Flash" className="w-[14px] h-[24px] sm:w-[18px] sm:h-[32px]" />
                    <span className="text-global-7 text-[18px] sm:text-[24px] font-black italic uppercase">Flash sale 10H mỗi ngày</span>
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button
                    className={`px-2 py-2 text-[11px] sm:text-[13px] font-bold rounded-[4px] border border-global-13 ${selectedFlashSaleDate === '23/8' ? 'bg-global-13 text-global-1' : 'text-global-8'}`}
                    onClick={() => setSelectedFlashSaleDate('23/8')}
                  >
                    23/8
                  </Button>
                  <Button
                    className={`px-2 py-2 text-[11px] sm:text-[13px] font-bold rounded-[4px] border border-global-13 ${selectedFlashSaleDate === '24/8' ? 'bg-global-13 text-global-1' : 'text-global-8'}`}
                    onClick={() => setSelectedFlashSaleDate('24/8')}
                  >
                    24/8
                  </Button>
                  <Button
                    className={`px-2 py-2 text-[11px] sm:text-[13px] font-bold rounded-[4px] border border-global-13 ${selectedFlashSaleDate === '25/8' ? 'bg-global-13 text-global-1' : 'text-global-8'}`}
                    onClick={() => setSelectedFlashSaleDate('25/8')}
                  >
                    25/8
                  </Button>
                </div>
              </div>
            </div>

            {/* Flash Sale Products */}
            <div className="p-4">
              <div className="flex items-center justify-between mb-4">
                <Button className="bg-global-13 text-global-1 text-[16px] sm:text-[18px] font-bold px-2 py-1 rounded-[2px]" onClick={() => { }}>
                  Flash sale
                </Button>
              </div>

              <div className="relative">
                <div className="flex gap-1 overflow-x-auto scrollbar-hide">
                  <button className="absolute left-0 top-1/2 transform -translate-y-1/2 z-10 bg-global-8 rounded-[16px] p-2 shadow-md">
                    <img src="/images/img_arrow_left_gray_600_01.svg" alt="Previous" className="w-[24px] h-[24px] sm:w-[32px] sm:h-[32px]" />
                  </button>

                  <div className="flex gap-1 ml-8">
                    {flashSaleProducts?.map((product) => (
                      <div key={product?.id} className="w-[140px] sm:w-[160px] md:w-[190px] flex-shrink-0">
                        <ProductCard product={product} />
                      </div>
                    ))}
                  </div>

                  <button className="absolute right-0 top-1/2 transform -translate-y-1/2 z-10 bg-global-8 rounded-[16px] p-2 shadow-md">
                    <img src="/images/img_arrow_right.svg" alt="Next" className="w-[24px] h-[24px] sm:w-[32px] sm:h-[32px]" />
                  </button>
                </div>
              </div>

              <div className="text-center mt-6">
                <Button className="bg-button-1 text-global-8 text-[14px] sm:text-[16px] font-bold px-8 py-2 rounded-[8px]" onClick={() => { }}>
                  Xem thêm khuyến mãi
                </Button>
              </div>
            </div>

            {/* Chat Support */}
            <div className="absolute bottom-0 right-0 mb-[150px] mr-[200px]">
              <EditText
                placeholder="Chat tư vấn - Giải đáp mọi thắc mắc"
                leftImage={{
                  src: "/images/img_svg_white_a700_16x16.svg",
                  width: 16,
                  height: 16
                }}
                onChange={() => { }}
                className="bg-edittext-1 text-global-8 text-[11px] sm:text-[13px] rounded-t-[8px] px-3 py-1 gap-1.5 w-[200px] sm:w-[240px]"
              />
            </div>
          </div>
        </div>
      </div>
      {/* Gear Arena Week Section */}
<div className="w-full mt-4">
  <div className="w-full max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
    <div className="bg-global-2 rounded-[4px] p-4 overflow-hidden">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-4">
        <div className="flex items-center gap-4">
          {/* Timer */}
          <div className="flex items-center gap-1">
            <div className="bg-global-13 text-global-1 text-[14px] sm:text-[16px] font-bold px-2 py-1 rounded-[4px] tracking-wider">
              {selectedGearArenaDate}
            </div>
            <span className="text-global-8 text-[14px] sm:text-[16px] font-medium">:</span>
            {[
              ['0','8'],
              ['2','4'],
              ['0','0']
            ].map((pair, i) => (
              <React.Fragment key={i}>
                <div className="bg-global-13 text-global-1 text-[14px] sm:text-[16px] font-bold px-1 py-1 rounded-[4px] tracking-wider">
                  <span>{pair[0]}</span>
                  <span>{pair[1]}</span>
                </div>
                {i < 2 && <span className="text-global-8 text-[14px] sm:text-[16px] font-medium">:</span>}
              </React.Fragment>
            ))}
          </div>

          {/* Title */}
          <div className="flex items-center gap-2">
            <img src="/images/img_image_fill.svg" alt="Gear" className="w-[16px] h-[28px] sm:w-[20px] sm:h-[36px]" />
            <span className="text-global-7 text-[24px] sm:text-[32px] font-black italic uppercase">
              GEAR ARENA WEEK
            </span>
          </div>
        </div>

        <button className="flex items-center gap-1.5">
          <span className="text-global-8 text-[12px] sm:text-[14px]">Xem chi tiết</span>
          <img src="/images/img_svg_white_a700_10x10.svg" alt="Arrow" className="w-[8px] h-[8px] sm:w-[10px] sm:h-[10px]" />
        </button>
      </div>

      {/* Body */}
      <div className="flex gap-4">
        {/* Left poster */}
        <img
          src="/images/gearvn01.png"
          alt="Gaming Setup"
          className="w-[250px] sm:w-[300px] md:w-[378px] h-[200px] sm:h-[250px] md:h-[302px] object-cover rounded-[4px] flex-shrink-0"
        />

        {/* Products slider (fixed overflow) */}
        <div className="flex-1 relative overflow-hidden">
          {/* Prev */}
          <button
            className="absolute left-2 top-1/2 -translate-y-1/2 z-10 bg-global-8 rounded-[16px] p-2 shadow-md"
            aria-label="Previous"
          >
            <img src="/images/img_arrow_left_gray_600_01.svg" alt="" className="w-[24px] h-[24px] sm:w-[32px] sm:h-[32px]" />
          </button>

          {/* Scroller */}
          <div className="px-6 sm:px-8">
            <div className="overflow-x-auto max-w-full scrollbar-hide">
              {/* Track: center if few items, start if many */}
              <div
                className="
                  flex flex-nowrap items-stretch
                  justify-center md:justify-start
                  gap-3 sm:gap-4
                  w-max
                "
              >
                {gearArenaProducts?.map((product) => (
                  <div
                    key={product?.id}
                    className="flex-shrink-0 w-[160px] sm:w-[190px] md:w-[210px]"
                  >
                    <div className="h-full">
                      <ProductCard product={product} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Next */}
          <button
            className="absolute right-2 top-1/2 -translate-y-1/2 z-10 bg-global-8 rounded-[16px] p-2 shadow-md"
            aria-label="Next"
          >
            <img src="/images/img_arrow_right.svg" alt="" className="w-[24px] h-[24px] sm:w-[32px] sm:h-[32px]" />
          </button>

          {/* Dots */}
          <div className="flex justify-center gap-2 mt-4">
            <div className="w-[10px] h-[2px] bg-global-6 rounded-[1px]" />
            <div className="w-[10px] h-[2px] bg-global-11 rounded-[1px]" />
            <div className="w-[10px] h-[2px] bg-global-6 rounded-[1px]" />
            <div className="w-[10px] h-[2px] bg-global-6 rounded-[1px]" />
          </div>
        </div>
      </div>
    </div>
  </div>
</div>

      {/* Build PC and Chair Banners */}
      <div className="w-full mt-4">
        <div className="w-full max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row gap-4">
            <img
              src="/images/gearvn04.png"
              alt="Build PC"
              className="w-full sm:w-1/2 h-[120px] sm:h-[150px] md:h-[188px] object-cover rounded-[4px]"
            />
            <img
              src="/images/gearvn05.png"
              alt="Chair Sale"
              className="w-full sm:w-1/2 h-[120px] sm:h-[150px] md:h-[188px] object-cover rounded-[4px]"
            />
          </div>
        </div>
      </div>
      {/* PC Best Sellers Section */}
      <div className="w-full mt-4">
        <div className="w-full max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-global-13 rounded-[4px] p-1.5">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-5 px-4 sm:px-5">
              <div className="flex items-center gap-4">
                <h2 className="text-global-3 text-[18px] sm:text-[22px] font-semibold">PC bán chạy</h2>
                <div className="w-[1px] h-[14px] sm:h-[18px] bg-global-4"></div>
                <div className="flex items-center gap-2">
                  <img src="/images/img_svg_red_a200.svg" alt="Free shipping" className="w-[16px] h-[11px] sm:w-[22px] sm:h-[14px]" />
                  <span className="text-global-3 text-[14px] sm:text-[18px] font-semibold">Trả góp 0%</span>
                </div>
              </div>

              <div className="flex items-center gap-1 text-[12px] sm:text-[14px] font-medium text-global-3">
                <div className="px-3 py-1">PC I3</div>
                <div className="px-1 py-1">PC I5</div>
                <div className="px-1 py-1">PC I7</div>
                <div className="px-1 py-1">PC I9</div>
                <div className="px-1 py-1">PC R3</div>
                <div className="px-1 py-1">PC R5</div>
                <div className="px-1 py-1">PC R7</div>
                <div className="px-1 py-1">PC R9</div>
                <span className="text-global-2 ml-5">Xem tất cả</span>
              </div>
            </div>

            <div className="relative">
              {loading ? (
                <div className="flex justify-center items-center h-64">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-global-3"></div>
                </div>
              ) : error ? (
                <div className="flex justify-center items-center h-64 text-red-500">
                  <p>Lỗi tải dữ liệu: {error}</p>
                </div>
              ) : (
                <div className="flex gap-2 overflow-x-auto scrollbar-hide">
                  <button className="absolute left-0 top-1/2 transform -translate-y-1/2 z-10 bg-global-8 rounded-[16px] p-2 shadow-md">
                    <img src="/images/img_arrow_left_gray_600_01.svg" alt="Previous" className="w-[24px] h-[24px] sm:w-[32px] sm:h-[32px]" />
                  </button>

                  <div className="flex gap-2 ml-8">
                    {pcProducts?.length > 0 ? (
                      pcProducts.map((product) => (
                        <div key={product?.id} className="w-[180px] sm:w-[200px] md:w-[230px] flex-shrink-0">
                          <ProductCard product={product} showSpecs={true} />
                        </div>
                      ))
                    ) : (
                      <div className="flex justify-center items-center w-full h-32">
                        <p className="text-gray-500">Không có sản phẩm nào</p>
                      </div>
                    )}
                  </div>

                  <button className="absolute right-0 top-1/2 transform -translate-y-1/2 z-10 bg-global-8 rounded-[16px] p-2 shadow-md">
                    <img src="/images/img_arrow_right.svg" alt="Next" className="w-[24px] h-[24px] sm:w-[32px] sm:h-[32px]" />
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      {/* Gaming Laptops Section */}
      <div className="w-full mt-4">
        <div className="w-full max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-global-13 rounded-[4px] p-1.5">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-5 px-4 sm:px-5">
              <div className="flex items-center gap-4">
                <h2 className="text-global-3 text-[18px] sm:text-[22px] font-semibold">Laptop gaming bán chạy</h2>
                <div className="w-[1px] h-[14px] sm:h-[18px] bg-global-4"></div>
                <div className="flex items-center gap-2">
                  <img src="/images/img_svg_red_a200.svg" alt="Free shipping" className="w-[16px] h-[11px] sm:w-[22px] sm:h-[14px]" />
                  <span className="text-global-3 text-[14px] sm:text-[18px] font-semibold">Miễn phí giao hàng</span>
                </div>
              </div>

              <div className="flex items-center gap-1 text-[12px] sm:text-[14px] font-medium text-global-3">
                <div className="px-3 py-1">ASUS</div>
                <div className="px-1 py-1">ACER</div>
                <div className="px-1 py-1">MSI</div>
                <div className="px-1 py-1">LENOVO</div>
                <div className="px-1 py-1">GIGABYTE</div>
                <div className="px-4 py-1">DELL</div>
                <span className="text-global-2">Xem tất cả</span>
              </div>
            </div>

            <div className="relative">
              <div className="flex gap-2 overflow-x-auto scrollbar-hide">
                <button className="absolute left-0 top-1/2 transform -translate-y-1/2 z-10 bg-global-8 rounded-[16px] p-2 shadow-md">
                  <img src="/images/img_arrow_left_gray_600_01.svg" alt="Previous" className="w-[24px] h-[24px] sm:w-[32px] sm:h-[32px]" />
                </button>

                <div className="flex gap-2 ml-8">
                  {gamingLaptops?.map((product) => (
                    <div key={product?.id} className="w-[180px] sm:w-[200px] md:w-[230px] flex-shrink-0">
                      <ProductCard product={product} showSpecs={true} />
                    </div>
                  ))}
                </div>

                <button className="absolute right-0 top-1/2 transform -translate-y-1/2 z-10 bg-global-8 rounded-[16px] p-2 shadow-md">
                  <img src="/images/img_arrow_right.svg" alt="Next" className="w-[24px] h-[24px] sm:w-[32px] sm:h-[32px]" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Office Laptops Section */}
      <div className="w-full mt-4">
        <div className="w-full max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-global-13 rounded-[4px] p-1.5">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-5 px-4 sm:px-5">
              <div className="flex items-center gap-4">
                <h2 className="text-global-3 text-[18px] sm:text-[22px] font-semibold">Laptop văn phòng bán chạy</h2>
                <div className="w-[1px] h-[14px] sm:h-[18px] bg-global-4"></div>
                <div className="flex items-center gap-2">
                  <img src="/images/img_svg_red_a200.svg" alt="Free shipping" className="w-[16px] h-[11px] sm:w-[22px] sm:h-[14px]" />
                  <span className="text-global-3 text-[14px] sm:text-[18px] font-semibold">Miễn phí giao hàng</span>
                </div>
              </div>

              <div className="flex items-center gap-1 text-[12px] sm:text-[14px] font-medium text-global-3">
                <div className="px-3 py-1">ASUS</div>
                <div className="px-1 py-1">MSI</div>
                <div className="px-1 py-1">LENOVO</div>
                <div className="px-1 py-1">DELL</div>
                <div className="px-1 py-1">LG</div>
                <div className="px-1 py-1">ACER</div>
                <span className="text-global-2 ml-5">Xem tất cả</span>
              </div>
            </div>

            <div className="relative">
              <div className="flex gap-2 overflow-x-auto scrollbar-hide">
                <button className="absolute left-0 top-1/2 transform -translate-y-1/2 z-10 bg-global-8 rounded-[16px] p-2 shadow-md">
                  <img src="/images/img_arrow_left_gray_600_01.svg" alt="Previous" className="w-[24px] h-[24px] sm:w-[32px] sm:h-[32px]" />
                </button>

                <div className="flex gap-2 ml-8">
                  {officeLaptops?.map((product) => (
                    <div key={product?.id} className="w-[180px] sm:w-[200px] md:w-[230px] flex-shrink-0">
                      <ProductCard product={product} />
                    </div>
                  ))}
                </div>

                <button className="absolute right-0 top-1/2 transform -translate-y-1/2 z-10 bg-global-8 rounded-[16px] p-2 shadow-md">
                  <img src="/images/img_arrow_right.svg" alt="Next" className="w-[24px] h-[24px] sm:w-[32px] sm:h-[32px]" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Mouse Section */}
      <div className="w-full mt-4">
        <div className="w-full max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-global-13 rounded-[4px] p-1.5">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-5 px-4 sm:px-5">
              <div className="flex items-center gap-4">
                <h2 className="text-global-3 text-[18px] sm:text-[22px] font-semibold">Chuột bán chạy</h2>
                <div className="w-[1px] h-[14px] sm:h-[18px] bg-global-4"></div>
                <div className="flex items-center gap-2">
                  <img src="/images/img_svg_red_a200.svg" alt="Free shipping" className="w-[16px] h-[11px] sm:w-[22px] sm:h-[14px]" />
                  <span className="text-global-3 text-[14px] sm:text-[18px] font-semibold">Giao hàng toàn quốc</span>
                </div>
              </div>

              <div className="flex items-center gap-1 text-[12px] sm:text-[14px] font-medium text-global-3">
                <div className="px-3 py-1">Logitech</div>
                <div className="px-1 py-1">Razer</div>
                <div className="px-1 py-1">Asus</div>
                <div className="px-1 py-1">Corsair</div>
                <div className="px-1 py-1">Dare-U</div>
                <div className="px-4 py-1">Rapoo</div>
                <span className="text-global-2">Xem tất cả</span>
                           </div>
            </div>

            <div className="relative">
              <div className="flex gap-2 overflow-x-auto scrollbar-hide">
                <button className="absolute left-0 top-1/2 transform -translate-y-1/2 z-10 bg-global-8 rounded-[16px] p-2 shadow-md">
                  <img src="/images/img_arrow_left_gray_600_01.svg" alt="Previous" className="w-[24px] h-[24px] sm:w-[32px] sm:h-[32px]" />
                </button>

                <div className="flex gap-2 ml-8">
                  {mouseProducts?.map((product) => (
                    <div key={product?.id} className="w-[180px] sm:w-[200px] md:w-[230px] flex-shrink-0">
                      <ProductCard product={product} showSpecs={true} />
                    </div>
                  ))}
                </div>

                <button className="absolute right-0 top-1/2 transform -translate-y-1/2 z-10 bg-global-8 rounded-[16px] p-2 shadow-md">
                  <img src="/images/img_arrow_right.svg" alt="Next" className="w-[24px] h-[24px] sm:w-[32px] sm:h-[32px]" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Keyboard Section */}
      <div className="w-full mt-4">
        <div className="w-full max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-global-13 rounded-[4px] p-1.5">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-5 px-4 sm:px-5">
              <div className="flex items-center gap-4">
                <h2 className="text-global-3 text-[18px] sm:text-[22px] font-semibold">Bàn phím bán chạy</h2>
                <div className="w-[1px] h-[14px] sm:h-[18px] bg-global-4"></div>
                <div className="flex items-center gap-2">
                  <img src="/images/img_svg_red_a200.svg" alt="Free shipping" className="w-[16px] h-[11px] sm:w-[22px] sm:h-[14px]" />
                  <span className="text-global-3 text-[14px] sm:text-[18px] font-semibold">Giao hàng toàn quốc</span>
                </div>
              </div>

              <div className="flex items-center gap-1 text-[12px] sm:text-[14px] font-medium text-global-3">
                <div className="px-3 py-1">Akko</div>
                <div className="px-1 py-1">Asus</div>
                <div className="px-1 py-1">Razer</div>
                <div className="px-1 py-1">Logitech</div>
                <div className="px-1 py-1">Leopold</div>
                <div className="px-1 py-1">DareU</div>
                <span className="text-global-2 ml-5">Xem tất cả</span>
              </div>
            </div>

            <div className="relative">
              <div className="flex gap-2 overflow-x-auto scrollbar-hide">
                <button className="absolute left-0 top-1/2 transform -translate-y-1/2 z-10 bg-global-8 rounded-[16px] p-2 shadow-md">
                  <img src="/images/img_arrow_left_gray_600_01.svg" alt="Previous" className="w-[24px] h-[24px] sm:w-[32px] sm:h-[32px]" />
                </button>

                <div className="flex gap-2 ml-8">
                  {keyboardProducts?.map((product) => (
                    <div key={product?.id} className="w-[180px] sm:w-[200px] md:w-[230px] flex-shrink-0">
                      <ProductCard product={product} />
                    </div>
                  ))}
                </div>

                <button className="absolute right-0 top-1/2 transform -translate-y-1/2 z-10 bg-global-8 rounded-[16px] p-2 shadow-md">
                  <img src="/images/img_arrow_right.svg" alt="Next" className="w-[24px] h-[24px] sm:w-[32px] sm:h-[32px]" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Monitor and Headphone Banners */}
      <div className="w-full mt-3.5">
        <div className="w-full max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-2">
            <img
              src="/images/img_m_n_h_nh_khuy_n.png"
              alt="Monitor Promotion"
              className="w-full lg:w-2/3 h-[160px] sm:h-[200px] md:h-[252px] object-cover rounded-[4px]"
            />
            <div className="w-full lg:w-1/3 flex flex-col gap-4 px-1.5">
              <img
                src="/images/img_tai_nghe.png"
                alt="Headphone"
                className="w-full h-[76px] sm:h-[96px] md:h-[120px] object-cover rounded-[4px]"
              />
              <img
                src="/images/img_banner.png"
                alt="Banner"
                className="w-full h-[76px] sm:h-[96px] md:h-[120px] object-cover rounded-[4px]"
              />
            </div>
          </div>
        </div>
      </div>
      {/* Monitor Section */}
      <div className="w-full mt-4">
        <div className="w-full max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-global-13 rounded-[4px] p-1.5">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-5 px-4 sm:px-5">
              <div className="flex items-center gap-4">
                <h2 className="text-global-3 text-[18px] sm:text-[22px] font-semibold">Màn hình chính hãng</h2>
                <div className="w-[1px] h-[14px] sm:h-[18px] bg-global-4 mt-1"></div>
                <div className="flex items-center gap-2">
                  <img src="/images/img_svg_red_a200.svg" alt="Warranty" className="w-[16px] h-[11px] sm:w-[22px] sm:h-[14px] mt-1.5" />
                  <span className="text-global-3 text-[14px] sm:text-[18px] font-semibold">Bảo hành 1 đổi 1</span>
                </div>
              </div>

              <div className="flex items-center gap-1 text-[12px] sm:text-[14px] font-medium text-global-3">
                <div className="px-3 py-1">LG</div>
                <div className="px-1 py-1">Asus</div>
                <div className="px-1 py-1">ViewSonic</div>
                <div className="px-1 py-1">Dell</div>
                <div className="px-1 py-1">Gigabyte</div>
                <div className="px-1 py-1">AOC</div>
                <div className="px-1 py-1">Acer</div>
                <div className="px-4 py-1">HKC</div>
                <span className="text-global-2">Xem tất cả</span>
              </div>
            </div>

            <div className="relative">
              <div className="flex gap-0.5 overflow-x-auto scrollbar-hide">
                <button className="absolute left-0 top-1/2 transform -translate-y-1/2 z-10 bg-global-8 rounded-[16px] p-2 shadow-md">
                  <img src="/images/img_arrow_left_gray_600_01.svg" alt="Previous" className="w-[24px] h-[24px] sm:w-[32px] sm:h-[32px]" />
                </button>

                <div className="flex gap-0.5 ml-8">
                  {monitorProducts?.map((product) => (
                    <div key={product?.id} className="w-[180px] sm:w-[200px] md:w-[238px] flex-shrink-0">
                      <ProductCard product={product} showSpecs={true} />
                    </div>
                  ))}
                </div>

                <button className="absolute right-0 top-1/2 transform -translate-y-1/2 z-10 bg-global-8 rounded-[16px] p-2 shadow-md">
                  <img src="/images/img_arrow_right.svg" alt="Next" className="w-[24px] h-[24px] sm:w-[32px] sm:h-[32px]" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Product Categories Section */}
      <div className="w-full mt-4">
        <div className="w-full max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-global-13 rounded-[4px] p-3">
            <div className="flex items-center mb-3 px-6">
              <h2 className="text-global-3 text-[18px] sm:text-[22px] font-semibold">Danh mục sản phẩm</h2>
            </div>

            <div className="border-t border-global-8 pt-4 px-4">
              <div className="grid grid-cols-5 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-10 gap-6 sm:gap-9 mb-4">
                {productCategories?.slice(0, 10)?.map((category, index) => (
                  <div key={index} className="flex flex-col items-center">
                    <img
                      src={category?.icon}
                      alt={category?.name}
                      className="w-[60px] h-[60px] sm:w-[70px] sm:h-[70px] md:w-[84px] md:h-[84px] object-contain mb-2"
                    />
                    <span className="text-global-3 text-[12px] sm:text-[14px] md:text-[16px] text-center">{category?.name}</span>
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-5 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-10 gap-6 sm:gap-9 mt-8">
                {productCategories?.slice(10)?.map((category, index) => (
                  <div key={index + 10} className="flex flex-col items-center">
                    <img
                      src={category?.icon}
                      alt={category?.name}
                      className="w-[60px] h-[60px] sm:w-[70px] sm:h-[70px] md:w-[84px] md:h-[84px] object-contain mb-2"
                    />
                    <span className="text-global-3 text-[12px] sm:text-[14px] md:text-[16px] text-center">{category?.name}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Promotional Section */}
      <div className="w-full mt-3.5">
        <div className="w-full max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-global-13 rounded-t-[4px] p-5.5">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-3">
              <h2 className="text-global-3 text-[18px] sm:text-[22px] font-semibold">Chuyên trang khuyến mãi</h2>
              <span className="text-global-2 text-[12px] sm:text-[14px] mt-1">Xem tất cả</span>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <img src="/images/img_thu_c_i_m_i.png" alt="Trade In" className="w-full sm:w-1/4 h-[100px] sm:h-[120px] md:h-[140px] object-cover rounded-[4px]" />
              <img src="/images/img_banner_140x276.png" alt="Banner" className="w-full sm:w-1/4 h-[100px] sm:h-[120px] md:h-[140px] object-cover rounded-[4px]" />
              <img src="/images/img_m_n_h_nh_m_y_t_nh_140x276.png" alt="Monitor Deal" className="w-full sm:w-1/4 h-[100px] sm:h-[120px] md:h-[140px] object-cover rounded-[4px]" />
              <img src="/images/img_laptop_v_n_ph_ng_140x276.png" alt="Office Laptop" className="w-full sm:w-1/4 h-[100px] sm:h-[120px] md:h-[140px] object-cover rounded-[4px]" />
            </div>
          </div>
        </div>
      </div>
      {/* News Section */}
      <div className="w-full">
        <div className="w-full max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-global-13 rounded-b-[4px] p-2.5">
            <div className="w-full h-[1px] bg-global-8 mb-3.5"></div>

            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-3.5 px-2.5">
              <h2 className="text-global-3 text-[18px] sm:text-[22px] font-semibold">Tin tức công nghệ</h2>
              <span className="text-global-2 text-[12px] sm:text-[14px] mt-1">Xem tất cả</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 px-1">
              {newsArticles?.map((article) => (
                <div key={article?.id} className="flex flex-col gap-2 px-2">
                  <img
                    src={article?.image}
                    alt={article?.title}
                    className="w-full h-[120px] sm:h-[140px] md:h-[158px] object-cover rounded-[4px]"
                  />
                  <p className="text-global-3 text-[14px] sm:text-[16px] font-medium leading-5 sm:leading-6 mb-5">
                    {article?.title}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Home;