import React, { useState, useRef, useEffect } from 'react';
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingCart, Heart, ChevronLeft, ChevronRight, X, Truck, RotateCcw, ShieldCheck } from 'lucide-react';
import { Link, useParams } from 'react-router-dom';
import ProductCard from '../components/ProductCard';

// Mock product data
const PRODUCT = {
    id: 1,
    title: "Jordan 1 Retro High OG",
    brand: "Jordan",
    price: 240,
    description: "Këpuca ikonike që ndryshoi botën e atleteve përgjithmonë. E ridizajnuar me lëkurë premium, ngjyra të larta, dhe komoditet i përmirësuar. Perfekte për rrugën dhe koleksionin tënd.",
    details: [
        "Lëkurë e vërtetë premium",
        "Mbështjellëse e mesme Air Jordan",
        "Shollë e jashtme me goditje",
        "Ngjyra: E Bardhë / E Kuqe / E Zezë",
        "Kodi i Produktit: 555088-161"
    ],
    sizes: [38, 39, 40, 41, 42, 43, 44, 45, 46],
    images: [
        "https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?auto=format&fit=crop&q=80&w=1200",
        "https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&q=80&w=1200",
        "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?auto=format&fit=crop&q=80&w=1200",
        "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?auto=format&fit=crop&q=80&w=1200"
    ],
    isNew: true,
    category: "Atlete"
};

const RELATED_PRODUCTS = [
    {
        id: 2,
        title: "Yeezy Boost 700",
        price: 300,
        imageSrc: "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?auto=format&fit=crop&q=80&w=800"
    },
    {
        id: 3,
        title: "Air Max 95 OG",
        price: 185,
        imageSrc: "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?auto=format&fit=crop&q=80&w=800"
    },
    {
        id: 4,
        title: "Dunk Low Panda",
        price: 160,
        isNew: true,
        imageSrc: "https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&q=80&w=800"
    }
];

const ProductDetail = () => {
    const { id } = useParams();
    const [selectedImage, setSelectedImage] = useState(0);
    const [selectedSize, setSelectedSize] = useState(null);
    const [isZoomed, setIsZoomed] = useState(false);
    const [zoomPosition, setZoomPosition] = useState({ x: 50, y: 50 });
    const [showFullscreen, setShowFullscreen] = useState(false);
    const [isWishlisted, setIsWishlisted] = useState(false);
    const imageRef = useRef(null);

    // Scroll to top when product ID changes
    useEffect(() => {
        window.scrollTo(0, 0);
        setSelectedSize(null);
        setSelectedImage(0);
    }, [id]);

    // Handle mouse move for zoom lens effect
    const handleMouseMove = (e) => {
        if (!imageRef.current) return;
        const rect = imageRef.current.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width) * 100;
        const y = ((e.clientY - rect.top) / rect.height) * 100;
        setZoomPosition({ x, y });
    };

    const nextImage = () => setSelectedImage((prev) => (prev + 1) % PRODUCT.images.length);
    const prevImage = () => setSelectedImage((prev) => (prev - 1 + PRODUCT.images.length) % PRODUCT.images.length);

    return (
        <div className="pt-28 pb-24 md:pt-36 md:pb-32 w-full min-h-screen bg-white">
            <div className="max-w-[1500px] mx-auto px-6 md:px-12">

                {/* Breadcrumb */}
                <nav className="mb-8 md:mb-12 font-mono text-[10px] md:text-xs tracking-widest uppercase text-black/50">
                    <Link to="/" className="hover:text-black transition-colors">Ballina</Link>
                    <span className="mx-2">/</span>
                    <Link to="/collection" className="hover:text-black transition-colors">Koleksioni</Link>
                    <span className="mx-2">/</span>
                    <span className="text-black">{PRODUCT.title}</span>
                </nav>

                <div className="flex flex-col lg:flex-row gap-12 lg:gap-20 mb-24 md:mb-32">

                    {/* ===== LEFT: Image Gallery ===== */}
                    <div className="flex-1 flex flex-col gap-4">
                        {/* Main Image with Zoom */}
                        <div
                            ref={imageRef}
                            className="relative w-full aspect-square bg-[#f5f5f5] overflow-hidden cursor-zoom-in border border-black/5"
                            style={{
                                clipPath: 'polygon(5% 0, 100% 0, 100% 95%, 95% 100%, 0 100%, 0 5%)'
                            }}
                            onMouseEnter={() => setIsZoomed(true)}
                            onMouseLeave={() => setIsZoomed(false)}
                            onMouseMove={handleMouseMove}
                            onClick={() => setShowFullscreen(true)}
                        >
                            <motion.img
                                key={selectedImage}
                                src={PRODUCT.images[selectedImage]}
                                alt={`${PRODUCT.title} - ${selectedImage + 1}`}
                                className="w-full h-full object-cover"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ duration: 0.3 }}
                                style={isZoomed ? {
                                    transform: 'scale(2)',
                                    transformOrigin: `${zoomPosition.x}% ${zoomPosition.y}%`,
                                    transition: 'transform-origin 0.1s ease-out'
                                } : {
                                    transform: 'scale(1)',
                                    transition: 'transform 0.3s ease-out'
                                }}
                            />

                            {/* NEW Tag */}
                            {PRODUCT.isNew && (
                                <div className="absolute top-6 right-6 bg-[#FF5F00] text-white text-[10px] uppercase font-bold tracking-widest px-3 py-1.5 z-10">
                                    E RE
                                </div>
                            )}

                            {/* Navigation Arrows */}
                            <button
                                onClick={(e) => { e.stopPropagation(); prevImage(); }}
                                className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/90 hover:bg-white flex items-center justify-center transition-all z-10 opacity-0 group-hover:opacity-100 hover:opacity-100"
                                style={{ opacity: 1 }}
                            >
                                <ChevronLeft size={20} />
                            </button>
                            <button
                                onClick={(e) => { e.stopPropagation(); nextImage(); }}
                                className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/90 hover:bg-white flex items-center justify-center transition-all z-10 opacity-0 group-hover:opacity-100 hover:opacity-100"
                                style={{ opacity: 1 }}
                            >
                                <ChevronRight size={20} />
                            </button>

                            {/* Zoom hint */}
                            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 font-mono text-[10px] tracking-widest uppercase text-black/40 bg-white/80 px-3 py-1 z-10 pointer-events-none">
                                Kliko për ta zmadhuar
                            </div>
                        </div>

                        {/* Thumbnail Strip */}
                        <div className="flex gap-3 overflow-x-auto pb-2">
                            {PRODUCT.images.map((img, idx) => (
                                <button
                                    key={idx}
                                    onClick={() => setSelectedImage(idx)}
                                    className={`flex-shrink-0 w-20 h-20 md:w-24 md:h-24 bg-[#f5f5f5] overflow-hidden border-2 transition-all duration-200 ${selectedImage === idx ? 'border-[#FF5F00]' : 'border-transparent hover:border-black/20'
                                        }`}
                                >
                                    <img src={img} alt={`Thumbnail ${idx + 1}`} className="w-full h-full object-cover" />
                                </button>
                            ))}
                        </div>
                    </div>


                    {/* ===== RIGHT: Product Info ===== */}
                    <div className="w-full lg:w-[480px] xl:w-[520px] flex-shrink-0 flex flex-col">

                        {/* Brand */}
                        <span className="font-mono text-xs tracking-[0.3em] uppercase text-[#FF5F00] mb-3">
                            {PRODUCT.brand}
                        </span>

                        {/* Title */}
                        <h1 className="font-['Anton'] text-4xl md:text-5xl lg:text-6xl tracking-wide uppercase leading-none text-black mb-4">
                            {PRODUCT.title}
                        </h1>

                        {/* Price */}
                        <div className="flex items-baseline gap-4 mb-8">
                            <span className="font-['Anton'] text-3xl md:text-4xl text-black tracking-wider">
                                ${PRODUCT.price}
                            </span>
                            <span className="font-mono text-xs tracking-widest uppercase text-black/40">
                                TVSH e përfshirë
                            </span>
                        </div>

                        {/* Divider */}
                        <div className="w-full h-[1px] bg-black/10 mb-8"></div>

                        {/* Description */}
                        <p className="text-sm md:text-base text-black/70 leading-relaxed mb-8">
                            {PRODUCT.description}
                        </p>

                        {/* Size Selector */}
                        <div className="mb-8">
                            <div className="flex justify-between items-center mb-4">
                                <h3 className="font-mono text-xs font-bold tracking-widest uppercase">Masa</h3>
                                <button className="font-mono text-[10px] tracking-widest uppercase text-[#FF5F00] hover:underline">
                                    Guida e Masave
                                </button>
                            </div>
                            <div className="grid grid-cols-5 gap-2">
                                {PRODUCT.sizes.map(size => (
                                    <button
                                        key={size}
                                        onClick={() => setSelectedSize(size)}
                                        className={`py-3 font-mono text-sm tracking-wider border transition-all duration-200 ${selectedSize === size
                                            ? 'bg-black text-white border-black'
                                            : 'bg-white text-black border-black/15 hover:border-black'
                                            }`}
                                    >
                                        {size}
                                    </button>
                                ))}
                            </div>
                            {!selectedSize && (
                                <p className="mt-2 font-mono text-[10px] tracking-widest uppercase text-red-500">
                                    Ju lutem zgjidhni një masë
                                </p>
                            )}
                        </div>

                        {/* Action Buttons */}
                        <div className="flex gap-3 mb-8">
                            <motion.button
                                whileHover={{ scale: 1.01 }}
                                whileTap={{ scale: 0.98 }}
                                className={`flex-1 flex items-center justify-center gap-3 py-4 font-['Anton'] text-lg md:text-xl tracking-widest uppercase transition-colors duration-300 ${selectedSize
                                    ? 'bg-black text-white hover:bg-[#FF5F00]'
                                    : 'bg-black/20 text-black/40 cursor-not-allowed'
                                    }`}
                                disabled={!selectedSize}
                            >
                                <ShoppingCart size={20} strokeWidth={1.5} />
                                Shto në Shportë
                            </motion.button>

                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => setIsWishlisted(!isWishlisted)}
                                className={`w-14 h-14 flex items-center justify-center border transition-all duration-300 ${isWishlisted ? 'bg-[#FF5F00] border-[#FF5F00] text-white' : 'border-black/15 text-black hover:border-black'
                                    }`}
                            >
                                <Heart size={20} strokeWidth={1.5} fill={isWishlisted ? 'currentColor' : 'none'} />
                            </motion.button>
                        </div>

                        {/* Divider */}
                        <div className="w-full h-[1px] bg-black/10 mb-8"></div>

                        {/* Product Details Accordion */}
                        <div className="flex flex-col gap-4 mb-8">
                            <h3 className="font-mono text-xs font-bold tracking-widest uppercase mb-2">Detajet e Produktit</h3>
                            <ul className="flex flex-col gap-2">
                                {PRODUCT.details.map((detail, idx) => (
                                    <li key={idx} className="flex items-start gap-3 text-sm text-black/70">
                                        <div className="w-1 h-1 bg-[#FF5F00] rounded-full mt-2 flex-shrink-0"></div>
                                        {detail}
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Divider */}
                        <div className="w-full h-[1px] bg-black/10 mb-8"></div>

                        {/* Trust Badges */}
                        <div className="grid grid-cols-3 gap-4">
                            <div className="flex flex-col items-center text-center gap-2 py-4">
                                <Truck size={22} strokeWidth={1.5} className="text-black/60" />
                                <span className="font-mono text-[9px] md:text-[10px] tracking-widest uppercase text-black/50">Dërgesë Falas</span>
                            </div>
                            <div className="flex flex-col items-center text-center gap-2 py-4">
                                <RotateCcw size={22} strokeWidth={1.5} className="text-black/60" />
                                <span className="font-mono text-[9px] md:text-[10px] tracking-widest uppercase text-black/50">Kthim 30 Ditë</span>
                            </div>
                            <div className="flex flex-col items-center text-center gap-2 py-4">
                                <ShieldCheck size={22} strokeWidth={1.5} className="text-black/60" />
                                <span className="font-mono text-[9px] md:text-[10px] tracking-widest uppercase text-black/50">100% Autentike</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* ===== TRUST / EDITORIAL SECTION ===== */}
                <div className="my-24 md:my-32 relative overflow-hidden bg-[#0a0a0a] text-white p-12 md:p-20 shadow-2xl"
                    style={{ clipPath: 'polygon(0 0, 100% 5%, 100% 100%, 0 95%)' }}
                >
                    <div className="absolute top-0 right-0 w-1/2 h-full opacity-20 pointer-events-none">
                        <svg viewBox="0 0 100 100" className="w-full h-full fill-none stroke-white/20 stroke-[0.5]">
                            <circle cx="100" cy="0" r="80" />
                            <circle cx="100" cy="0" r="60" />
                            <circle cx="100" cy="0" r="40" />
                        </svg>
                    </div>

                    <div className="relative z-10 max-w-2xl">
                        <h2 className="font-['Anton'] text-4xl md:text-6xl tracking-wider uppercase mb-8">
                            Pse Të Besoni <br /> <span className="text-[#FF5F00]">ONE CHOICE</span>
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div>
                                <h4 className="font-mono text-xs font-bold tracking-widest uppercase mb-3 text-[#FF5F00]">Autenticitet i Garantuar</h4>
                                <p className="text-sm text-white/60 leading-relaxed font-mono">
                                    Çdo artikull në platformën tonë kalon përmes një procesi rigoroz verifikimi nga ekspertët tanë. Ne nuk bëjmë kompromis me cilësinë.
                                </p>
                            </div>
                            <div>
                                <h4 className="font-mono text-xs font-bold tracking-widest uppercase mb-3 text-[#FF5F00]">Koleksione Ekskluzive</h4>
                                <p className="text-sm text-white/60 leading-relaxed font-mono">
                                    Ne bashkëpunojmë me koleksionistët më të mirë për t'ju sjellë edicionet më të rralla që nuk mund t'i gjeni diku tjetër.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Background Oversized Logo */}
                    <div className="absolute bottom-[-10%] right-[-5%] font-['Anton'] text-[15vw] text-white/[0.03] select-none pointer-events-none uppercase">
                        CHOICE
                    </div>
                </div>

                {/* ===== RELATED PRODUCTS ===== */}
                <div className="border-t border-black/10 pt-24 md:pt-32">
                    <div className="flex flex-col md:flex-row justify-between items-end mb-12 md:mb-16 gap-8">
                        <div>
                            <div className="w-12 h-[2px] bg-[#FF5F00] mb-6"></div>
                            <h2 className="font-['Anton'] text-4xl md:text-5xl lg:text-6xl tracking-wide uppercase leading-none">
                                Produkte të <br /> Ngjashme
                            </h2>
                        </div>
                        <Link
                            to="/collection"
                            className="font-mono text-xs md:text-sm tracking-widest uppercase border border-black/20 hover:border-black px-6 py-3 transition-colors duration-300"
                        >
                            Shiko Koleksionin
                        </Link>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
                        {RELATED_PRODUCTS.map((prod) => (
                            <ProductCard
                                key={prod.id}
                                id={prod.id}
                                title={prod.title}
                                price={prod.price}
                                imageSrc={prod.imageSrc}
                                isNew={prod.isNew}
                            />
                        ))}
                    </div>
                </div>
            </div>


            {/* ===== FULLSCREEN LIGHTBOX ===== */}
            <AnimatePresence>
                {showFullscreen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center"
                        onClick={() => setShowFullscreen(false)}
                    >
                        {/* Close Button */}
                        <button
                            onClick={() => setShowFullscreen(false)}
                            className="absolute top-6 right-6 text-white/70 hover:text-white transition-colors z-50"
                        >
                            <X size={32} strokeWidth={1.5} />
                        </button>

                        {/* Navigation */}
                        <button
                            onClick={(e) => { e.stopPropagation(); prevImage(); }}
                            className="absolute left-6 md:left-12 top-1/2 -translate-y-1/2 text-white/50 hover:text-white transition-colors z-50"
                        >
                            <ChevronLeft size={40} strokeWidth={1} />
                        </button>
                        <button
                            onClick={(e) => { e.stopPropagation(); nextImage(); }}
                            className="absolute right-6 md:right-12 top-1/2 -translate-y-1/2 text-white/50 hover:text-white transition-colors z-50"
                        >
                            <ChevronRight size={40} strokeWidth={1} />
                        </button>

                        {/* Fullscreen Image */}
                        <motion.img
                            key={selectedImage}
                            src={PRODUCT.images[selectedImage]}
                            alt={`${PRODUCT.title} - Fullscreen`}
                            className="max-w-[90vw] max-h-[85vh] object-contain"
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                            transition={{ duration: 0.3 }}
                            onClick={(e) => e.stopPropagation()}
                        />

                        {/* Image Counter */}
                        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 font-mono text-xs tracking-widest text-white/50">
                            {selectedImage + 1} / {PRODUCT.images.length}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default ProductDetail;
