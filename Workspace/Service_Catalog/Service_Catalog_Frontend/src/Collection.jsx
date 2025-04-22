import React, { use, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Slider from "react-slick";
import { ShoppingCart, Bell, MessageCircle, User, Search } from "lucide-react";
import vectorIcon from "./assets/Diamond.png";
import logo from "./assets/logo.png";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Collection = () => {
    const [searchKeyword, setSearchKeyword] = useState("");

    const fetchSearchingProducts = () => {
        console.log("Tìm kiếm với từ khóa:", searchKeyword);
    };


    const [searchTerm, setSearchTerm] = useState("");
    const [filteredCollections, setFilteredCollections] = useState([]);
    const [collections, setCollections] = useState([]);


    useEffect(() => {
        const fetchColletions = async () => {
            try {
                const response = await fetch('http://localhost:8080/api/collection/listCollection');
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setCollections(data);
                setFilteredCollections(data);
            } catch (error) {
                console.error('Failed to fetch collections:', error);
            }
        };

        fetchColletions();
    }, []);
    
    const handleSearch = () => {
        const filtered = collections.filter(collections =>
            collections.name.toLowerCase().includes(searchTerm.trim().toLowerCase()) ||
            collections.description.toLowerCase().includes(searchTerm.trim().toLowerCase())
        );
        setFilteredCollections(filtered);
        console.log("setFilteredCollections", filteredCollections);
    };


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
                <Link to="/" className="text-gray-400">Trang chủ </Link> / Bộ sưu tập
            </div>
            {/* Search Bar */}
            <div className="mb-4 flex items-center justify-center px-4 py-4 mb-2">
                <div className="relative w-full max-w-lg">
                    <input
                        type="text"
                        placeholder="Tìm kiếm bộ sưu tập tại đây"
                        className="pl-4 pr-12 py-2 w-full border border-white rounded-md bg-gray-400 text-white placeholder-white focus:outline-none focus:ring-2 focus:ring-blue-400"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                    />
                    <button
                        onClick={handleSearch}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 p-2 rounded-md bg"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="white" className="size-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                        </svg>
                    </button>
                </div>
            </div>
            {/* Collection Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
                {filteredCollections.map((collection, index) => {
                    const pattern = index % 4;
                    const isReversed = pattern >= 2;

                    const thumbnail = collection.collectionImages.find(image => image.isThumbnail);
                    const imageUrl = thumbnail ? thumbnail.imageUrl : ' ';
                    return (
                        <div key={collection.id}
                            className={`flex ${isReversed ? 'flex-row-reverse' : 'flex-row'} gap-8`}
                        >
                            <div className="w-1/2 relative group">
                                <Link to={`/collection/${collection.id}`}>
                                    <div className="absolute inset-0 border-2 border-yellow-500 rounded-lg transform rotate-3 transition-transform group-hover:rotate-6"></div>
                                    <img
                                        src={imageUrl}
                                        alt={collection.title}
                                        className="w-full h-[300px] object-cover bg-gray-800 rounded-lg shadow-xl relative z-10 cursor-pointer"
                                    />
                                </Link>
                            </div>
                            <div className="w-1/2 flex flex-col justify-center">
                                <h2 className="text-white text-3xl font-serif italic mb-4">{collection.name}</h2>
                                <Link
                                    to={`/collection/${collection.id}`}
                                    className="self-start px-6 py-2 bg-transparent border border-white text-white rounded-md 
                                     hover:bg-white hover:text-black transition-colors duration-300
                                     inline-flex items-center justify-center min-w-[120px] text-center"
                                >
                                    Xem Chi Tiết
                                </Link>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default Collection;