import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import Slider from "react-slick";
import { ShoppingCart, Bell, MessageCircle, User, Search } from "lucide-react";
import vectorIcon from "./assets/Diamond.png";
import logo from "./assets/logo.png";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const CollectionDetail = () => {
    const [searchKeyword, setSearchKeyword] = useState("");

    const fetchSearchingProducts = () => {
        console.log("Tìm kiếm với từ khóa:", searchKeyword);
    };

    const { collectionId } = useParams();
    const [collection, setCollection] = useState(null);
    const [products, setProducts] = useState([]);
    const [bannerImages, setBannerImages] = useState([]);

    const bannerSettings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
        arrows: true,
        fade: true
    };

    useEffect(() => {
        const fetchCollectionDetail = async () => {
            try {
                const response = await fetch(`http://localhost:8080/api/collection/detailCollection/${collectionId}`);
                if (!response.ok) throw new Error('Network response was not ok');
                const data = await response.json();
                setCollection(data);
            } catch (error) {
                console.error('Failed to fetch collection details:', error);
            }
        };

        const fetchCollectionProducts = async () => {
            try {
                const response = await fetch(`http://localhost:8080/api/product/listProductByCollection/${collectionId}`);
                if (!response.ok) throw new Error('Network response was not ok');
                const data = await response.json();
                setProducts(data);
            } catch (error) {
                console.error('Failed to fetch products:', error);
            }
        };

        const fetchBannerImages = async () => {
            try {
                const response = await fetch(`http://localhost:8080/api/collection/listImageByCollection/${collectionId}`);
                if (!response.ok) throw new Error('Network response was not ok');
                const data = await response.json();
                const images = data.map(item => item.imageUrl);
                setBannerImages(images);
            } catch (error) {
                console.error('Failed to fetch collection details:', error);
            }
        }

        fetchCollectionDetail();
        fetchCollectionProducts();
        fetchBannerImages();
    }, [collectionId]);

    if (!collection) return <div>Loading...</div>;

    return (
        <div className="min-h-screen bg-bgOuter mx-auto px-6 lg:px-20 py-6">
            <header className="header">
                <div className="flex justify-between items-center p-4">
                    <div className="flex gap-4">
                        <a href="#" className="flex items-center gap-1 text-white">
                            <ShoppingCart size={18} />
                            <span>Giỏ Hàng</span>
                        </a>
                        <a href="#" className="flex items-center gap-1 text-white">
                            <Bell size={18} />
                            <span>Liên Hệ</span>
                        </a>
                    </div>

                    <div className="w-24 md:w-32">
                        <img src={logo} alt="TINH TÚ" className="w-full" />
                    </div>

                    <div className="flex gap-4">
                        <a href="#" className="flex items-center gap-1 text-white">
                            <MessageCircle size={18} />
                            <span>Chat Bot</span>
                        </a>
                        <a href="#" className="flex items-center gap-1 text-white">
                            <User size={18} />
                            <span>Tài Khoản</span>
                        </a>
                    </div>
                </div>

                <div className="flex items-center justify-center my-4">
                    <div className="w-1/4 h-px bg-gray-500"></div>
                    <img src={vectorIcon} alt="Diamond Icon" className="w-8 mx-2" />
                    <div className="w-1/4 h-px bg-gray-500"></div>
                </div>

                <nav className="flex flex-col md:flex-row md:justify-between items-center gap-4 p-4">
                    <div className="flex flex-wrap gap-3">
                        <Link to="/" className="text-sm md:text-base hover:underline text-white">Trang Chủ</Link>
                        <Link to="/product/1" className="text-sm md:text-base hover:underline text-white">Trang Sức</Link>
                        <Link to="/product/2" className="text-sm md:text-base hover:underline text-white">Trang Sức Cưới</Link>
                        <Link to="/product/3" className="text-sm md:text-base hover:underline text-white">Đồng Hồ</Link>
                        <Link to="/product/4" className="text-sm md:text-base hover:underline text-white">Quà Tặng</Link>
                        <Link to="/collection" className="text-sm md:text-base hover:underline text-white">Bộ Sưu Tập</Link>
                    </div>

                    <div className="flex border rounded-lg overflow-hidden">
                        <input
                            type="text"
                            placeholder="Tìm kiếm"
                            className="px-3 py-2 w-40 md:w-60 text-black"
                            value={searchKeyword}
                            onChange={(e) => setSearchKeyword(e.target.value)}
                        />
                        <button className="bg-blue-500 px-3 flex items-center text-white">
                            <Search size={18} />
                        </button>
                    </div>
                </nav>
            </header>
            <div className="text-white mb-4 flex justify-center">
                <Link to="/" className="text-gray-400">Trang chủ</Link> /
                <Link to="/collection" className="text-gray-400 mx-1">Bộ sưu tập</Link>/ {collection.name}
            </div>

            {/* Banner Slider */}
            <div className="mb-8">
                <Slider {...bannerSettings}>
                    {bannerImages.map((image, index) => (
                        <div key={index} className="relative">
                            <div className="h-[350px] flex items-center justify-center bg-gray-800">
                                <img
                                    src={image}
                                    alt={`${collection.name} banner ${index + 1}`}
                                    className="h-full w-[80%] object-cover rounded-lg"
                                />
                            </div>
                        </div>
                    ))}
                </Slider>
            </div>

            {/* Collection Description */}
            <div className="text-center mb-12 px-4 max-w-4xl mx-auto">
                <h1 className="text-4xl font-serif italic text-white mb-6">{collection.name}</h1>
                <p className="text-gray-300 text-lg">{collection.description}</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {products.map((product) => {
                    const thumbnail = product.productImages.find(image => image.isThumbnail);
                    const imageUrl = thumbnail ? thumbnail.imageUrl : '';
                    return (
                        <Link to={`/product/productDetail/${product.id}`} key={product.productId}
                            className="bg-white bg-opacity-10 rounded-lg p-4 hover:bg-opacity-20 transition-all duration-300">
                            <div className="relative group">
                                <img
                                    src={imageUrl}
                                    alt={product.name}
                                    className="w-full aspect-square object-cover rounded-lg mb-4"
                                />
                                {product.oldPrice && (
                                    <div className="absolute top-2 left-2 bg-red-500 text-white px-2 py-1 rounded-md text-sm">
                                        Sale
                                    </div>
                                )}
                            </div>
                            <h3 className="text-white font-medium mb-2">{product.name}</h3>
                            <div className="flex justify-between items-center">
                                <span className="text-white font-bold">{new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(product.price)}</span>
                                {product.oldPrice && (
                                    <span className="text-gray-400 line-through text-sm">{product.oldPrice}</span>
                                )}
                            </div>
                        </Link>
                    );
                })}
            </div>
        </div>
    );
};

export default CollectionDetail;