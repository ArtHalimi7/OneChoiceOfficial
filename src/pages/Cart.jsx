import React, { useState } from 'react';
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from 'framer-motion';
import { Minus, Plus, X, Truck, RotateCcw, ShieldCheck, ArrowRight, ShoppingBag } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import ProductCard from '../components/ProductCard';

import { useCart } from '../context/CartContext';

const clipStyle = {
    clipPath: 'polygon(10% 0, 100% 0, 100% 100%, 0 100%, 0 10%)'
};

const SUGGESTED_PRODUCTS = [
    { id: 4, title: "Dunk Low Panda", price: "160", isNew: true, imageSrc: "https://imagedelivery.net/2DfovxNet9Syc-4xYpcsGg/b462a49c-f423-49bf-c6d6-7c48778ab000/products" },
    { id: 5, title: "New Balance 550", price: "130", imageSrc: "https://static.ftshp.digital/img/tl/ddc3d690-e297-4984-9638-a9685db1dc9e-1369768.jpg" },
    { id: 6, title: "Forum Low", price: "110", imageSrc: "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?auto=format&fit=crop&q=80&w=800" },
    { id: 7, title: "Blazer Mid '77", price: "145", isNew: true, imageSrc: "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?auto=format&fit=crop&q=80&w=800" }
];

const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: (i) => ({
        opacity: 1, y: 0,
        transition: { delay: 0.1 + i * 0.1, duration: 0.6, ease: [0.22, 1, 0.36, 1] },
    }),
    exit: {
        opacity: 0, x: -40,
        transition: { duration: 0.3, ease: [0.22, 1, 0.36, 1] }
    }
};

const Cart = () => {
    const { cartItems, updateQuantity, removeFromCart, subtotal, shipping, total, cartCount } = useCart();
    const [promoCode, setPromoCode] = useState('');
    const [promoApplied, setPromoApplied] = useState(false);
    const navigate = useNavigate();

    const itemCount = cartCount;

    const handlePromo = (e) => {
        e.preventDefault();
        if (promoCode.trim()) setPromoApplied(true);
    };

    const handleCheckout = () => {
        navigate('/checkout');
    };

    // ===== EMPTY CART STATE =====
    if (cartItems.length === 0) {
        return (
            <div className="w-full min-h-screen bg-[#e8e4df]">
                {/* Minimal Header */}
                <div className="pt-28 md:pt-36 px-6 md:px-12 max-w-[1500px] mx-auto">
                    <nav className="mb-6 font-mono text-[10px] md:text-xs tracking-widest uppercase text-black/40">
                        <Link to="/" className="hover:text-black transition-colors">Ballina</Link>
                        <span className="mx-2">/</span>
                        <span className="text-black/80">Shporta</span>
                    </nav>
                    <div className="w-16 h-[2px] bg-[#FF5F00] mb-6"></div>
                    <h1 className="font-['Anton'] text-5xl md:text-6xl lg:text-7xl tracking-wide uppercase leading-none text-black">
                        Shporta
                    </h1>
                </div>

                <div className="max-w-[1500px] mx-auto px-6 md:px-12 pt-16 pb-24 md:pb-32">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                        className="flex flex-col items-center justify-center py-16 md:py-24 text-center bg-white/60 backdrop-blur-sm border border-black/8 rounded-sm"
                    >
                        <div className="w-20 h-20 md:w-24 md:h-24 bg-[#e8e4df] flex items-center justify-center mb-8" style={clipStyle}>
                            <ShoppingBag size={36} strokeWidth={1} className="text-black/30" />
                        </div>

                        <h2 className="font-['Anton'] text-4xl md:text-6xl lg:text-7xl tracking-wide uppercase leading-none text-black mb-4">
                            Shporta Është Bosh
                        </h2>
                        <div className="w-12 h-[2px] bg-[#FF5F00] mb-6"></div>
                        <p className="font-mono text-xs md:text-sm tracking-widest uppercase text-black/50 mb-10 max-w-md">
                            Nuk keni asnjë produkt në shportën tuaj. Zbuloni koleksionin tonë të veçantë.
                        </p>
                        <Link to="/collection">
                            <motion.button
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.97 }}
                                className="bg-black text-white px-10 py-4 font-['Anton'] text-base tracking-[0.15em] uppercase hover:bg-[#FF5F00] transition-colors duration-300 flex items-center gap-3 shadow-lg"
                            >
                                Eksploro Koleksionin <ArrowRight size={18} strokeWidth={1.5} />
                            </motion.button>
                        </Link>
                    </motion.div>

                    {/* Suggested Products */}
                    <div className="border-t border-black/10 pt-24 md:pt-32">
                        <div className="flex flex-col md:flex-row justify-between items-end mb-12 md:mb-16 gap-8">
                            <div>
                                <div className="w-12 h-[2px] bg-[#FF5F00] mb-6"></div>
                                <h2 className="font-['Anton'] text-4xl md:text-5xl lg:text-6xl tracking-wide uppercase leading-none">
                                    Të Sugjeruara
                                </h2>
                            </div>
                            <Link to="/collection" className="font-mono text-xs md:text-sm tracking-widest uppercase border border-black/20 hover:border-black px-6 py-3 transition-colors duration-300">
                                Shiko Koleksionin
                            </Link>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-6 lg:gap-8">
                            {SUGGESTED_PRODUCTS.map((prod) => (
                                <ProductCard key={prod.id} id={prod.id} title={prod.title} price={prod.price} imageSrc={prod.imageSrc} isNew={prod.isNew} />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    // ===== FULL CART =====
    return (
        <div className="w-full min-h-screen bg-[#e8e4df]">

            {/* ===== CLEAN HEADER ===== */}
            <div className="pt-28 md:pt-36 pb-10 md:pb-14 px-6 md:px-12 max-w-[1500px] mx-auto">
                <nav className="mb-6 font-mono text-[10px] md:text-xs tracking-widest uppercase text-black/40">
                    <Link to="/" className="hover:text-black transition-colors">Ballina</Link>
                    <span className="mx-2">/</span>
                    <span className="text-black/80">Shporta</span>
                </nav>
                <div className="w-16 h-[2px] bg-[#FF5F00] mb-6"></div>
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4">
                    <h1 className="font-['Anton'] text-5xl md:text-6xl lg:text-7xl tracking-wide uppercase leading-none text-black">
                        Shporta
                    </h1>
                    <span className="font-mono text-xs tracking-widest uppercase text-black/50 pb-1">
                        {itemCount} {itemCount === 1 ? 'produkt' : 'produkte'}
                    </span>
                </div>
            </div>

            {/* ===== PAGE CONTENT ===== */}
            <div className="max-w-[1500px] mx-auto px-6 md:px-12 pb-24 md:pb-32">

                <div className="flex flex-col lg:flex-row gap-10 lg:gap-14 xl:gap-20">

                    {/* ===== LEFT: Cart Items ===== */}
                    <div className="flex-1">
                        {/* Column Headers — Desktop Only */}
                        <div className="hidden md:grid grid-cols-[2fr_1fr_1fr_auto] gap-6 items-center pb-4 border-b-2 border-black/15 mb-6">
                            <span className="font-mono text-[10px] tracking-widest uppercase text-black/50 font-semibold">Produkti</span>
                            <span className="font-mono text-[10px] tracking-widest uppercase text-black/50 font-semibold text-center">Sasia</span>
                            <span className="font-mono text-[10px] tracking-widest uppercase text-black/50 font-semibold text-right">Çmimi</span>
                            <span className="w-8"></span>
                        </div>

                        {/* Cart Items */}
                        <AnimatePresence mode="popLayout">
                            {cartItems.map((item, i) => (
                                <motion.div
                                    key={`${item.id}-${item.size}`}
                                    custom={i}
                                    variants={itemVariants}
                                    initial="hidden"
                                    animate="visible"
                                    exit="exit"
                                    layout
                                    className="grid grid-cols-1 md:grid-cols-[2fr_1fr_1fr_auto] gap-4 md:gap-6 items-center py-6 md:py-8 border-b border-black/10 bg-white/40 md:bg-transparent px-4 md:px-0 mb-3 md:mb-0 rounded-sm md:rounded-none"
                                >
                                    {/* Product (Image + Info) */}
                                    <div className="flex gap-5">
                                        <Link to={`/product/${item.id}`} className="flex-shrink-0">
                                            <div
                                                className="w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 bg-white overflow-hidden border border-black/8 shadow-sm"
                                                style={clipStyle}
                                            >
                                                <img src={item.image} alt={item.title} className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
                                            </div>
                                        </Link>
                                        <div className="flex flex-col justify-center gap-1.5">
                                            <span className="font-mono text-[10px] tracking-[0.3em] uppercase text-[#FF5F00] font-semibold">
                                                {item.brand}
                                            </span>
                                            <Link to={`/product/${item.id}`}>
                                                <h3 className="font-['Anton'] text-lg sm:text-xl md:text-2xl tracking-wide uppercase text-black leading-tight hover:text-[#FF5F00] transition-colors">
                                                    {item.title}
                                                </h3>
                                            </Link>
                                            <div className="flex items-center gap-3 mt-1">
                                                <span className="font-mono text-[10px] tracking-widest uppercase text-black/50 bg-black/5 px-2 py-0.5">
                                                    Masa: {item.size}
                                                </span>
                                                {item.color && (
                                                    <>
                                                        <div className="w-[1px] h-3 bg-black/20"></div>
                                                        <span className="font-mono text-[10px] tracking-widest uppercase text-black/50">
                                                            {item.color}
                                                        </span>
                                                    </>
                                                )}
                                            </div>
                                            {/* Mobile price */}
                                            <div className="flex items-center gap-4 mt-2 md:hidden">
                                                <span className="font-['Anton'] text-lg tracking-wider text-black">
                                                    ${item.price * item.quantity}
                                                </span>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Quantity Stepper */}
                                    <div className="flex items-center justify-start md:justify-center">
                                        <div className="flex items-center border border-black/15 bg-white shadow-sm">
                                            <button
                                                onClick={() => updateQuantity(item.id, item.size, -1)}
                                                className="w-9 h-9 md:w-10 md:h-10 flex items-center justify-center text-black/60 hover:text-black hover:bg-black/5 transition-colors"
                                                aria-label="Zbrit sasinë"
                                            >
                                                <Minus size={14} strokeWidth={1.5} />
                                            </button>
                                            <span className="w-10 md:w-12 text-center font-mono text-sm tracking-widest text-black font-semibold">
                                                {item.quantity}
                                            </span>
                                            <button
                                                onClick={() => updateQuantity(item.id, item.size, 1)}
                                                className="w-9 h-9 md:w-10 md:h-10 flex items-center justify-center text-black/60 hover:text-black hover:bg-black/5 transition-colors"
                                                aria-label="Shto sasinë"
                                            >
                                                <Plus size={14} strokeWidth={1.5} />
                                            </button>
                                        </div>
                                    </div>

                                    {/* Price — Desktop */}
                                    <div className="hidden md:flex justify-end">
                                        <span className="font-['Anton'] text-xl tracking-wider text-black">
                                            ${item.price * item.quantity}
                                        </span>
                                    </div>

                                    {/* Remove Button */}
                                    <div className="hidden md:flex justify-end">
                                        <button
                                            onClick={() => removeFromCart(item.id, item.size)}
                                            className="w-8 h-8 flex items-center justify-center text-black/30 hover:text-[#FF5F00] transition-colors"
                                            aria-label="Hiq nga shporta"
                                        >
                                            <X size={18} strokeWidth={1.5} />
                                        </button>
                                    </div>

                                    {/* Mobile Remove */}
                                    <button
                                        onClick={() => removeFromCart(item.id, item.size)}
                                        className="md:hidden font-mono text-[10px] tracking-widest uppercase text-black/40 hover:text-[#FF5F00] transition-colors self-start underline underline-offset-4"
                                    >
                                        Hiq
                                    </button>
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </div>

                    {/* ===== RIGHT: Order Summary ===== */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                        className="w-full lg:w-[420px] xl:w-[440px] flex-shrink-0 lg:sticky lg:top-28 self-start"
                    >
                        <div className="bg-white border border-black/10 p-8 md:p-10 shadow-md">
                            <h2 className="font-['Anton'] text-2xl md:text-3xl tracking-wide uppercase text-black mb-8">
                                Përmbledhja
                            </h2>

                            {/* Promo Code */}
                            <form onSubmit={handlePromo} className="mb-8 group">
                                <label className="font-mono text-[10px] tracking-widest uppercase text-black/50 font-semibold block mb-3">
                                    Kodi i Zbritjes
                                </label>
                                <div className="flex">
                                    <input
                                        type="text"
                                        value={promoCode}
                                        onChange={(e) => setPromoCode(e.target.value)}
                                        placeholder="VENDOS KODIN"
                                        className="flex-1 bg-[#f5f3f0] border border-black/10 text-black font-mono text-xs tracking-widest px-4 py-3 focus:outline-none focus:border-[#FF5F00] transition-colors duration-300 placeholder:text-black/25"
                                    />
                                    <button type="submit" className="ml-3 bg-black text-white font-mono text-[10px] tracking-widest uppercase px-5 py-3 hover:bg-[#FF5F00] transition-colors font-semibold">
                                        Apliko
                                    </button>
                                </div>
                                {promoApplied && (
                                    <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="font-mono text-[10px] tracking-widest uppercase text-[#FF5F00] mt-2">
                                        Kodi u aplikua me sukses
                                    </motion.p>
                                )}
                            </form>

                            {/* Line Items */}
                            <div className="flex flex-col gap-4 mb-6">
                                <div className="flex justify-between items-center">
                                    <span className="font-mono text-xs tracking-widest uppercase text-black/50">Nëntotali</span>
                                    <span className="font-mono text-sm tracking-wider text-black font-semibold">${subtotal}</span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="font-mono text-xs tracking-widest uppercase text-black/50">Dërgesa</span>
                                    <span className="font-mono text-sm tracking-wider text-black font-semibold">
                                        {shipping === 0 ? 'FALAS' : `$${shipping}`}
                                    </span>
                                </div>
                            </div>

                            <div className="w-full h-[2px] bg-black/10 mb-6"></div>

                            {/* Total */}
                            <div className="flex justify-between items-baseline mb-10">
                                <span className="font-['Anton'] text-xl tracking-wider uppercase text-black">Totali</span>
                                <span className="font-['Anton'] text-3xl md:text-4xl tracking-wider text-black">${total}</span>
                            </div>

                            {/* Checkout CTA */}
                            <motion.button
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.97 }}
                                onClick={handleCheckout}
                                className="w-full bg-black text-white py-4 md:py-5 font-['Anton'] text-lg md:text-xl tracking-[0.15em] uppercase hover:bg-[#FF5F00] transition-colors duration-300 flex items-center justify-center gap-3 shadow-lg mb-4"
                            >
                                Ble Tani <ArrowRight size={20} strokeWidth={1.5} />
                            </motion.button>

                            {/* Continue Shopping */}
                            <Link to="/collection" className="block">
                                <motion.button
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.97 }}
                                    className="w-full border-2 border-black/15 text-black py-3.5 md:py-4 font-['Anton'] text-base tracking-[0.15em] uppercase hover:border-black hover:bg-black hover:text-white transition-all duration-300 flex items-center justify-center"
                                >
                                    Vazhdo Blerjet
                                </motion.button>
                            </Link>

                            {/* Free Shipping Note */}
                            {shipping > 0 && (
                                <p className="mt-6 font-mono text-[10px] tracking-widest uppercase text-black/40 text-center">
                                    Shto ${200 - subtotal} më shumë për dërgesë falas
                                </p>
                            )}

                            {/* Trust Badges */}
                            <div className="grid grid-cols-3 gap-3 mt-8 pt-8 border-t border-black/10">
                                <div className="flex flex-col items-center text-center gap-2 py-3">
                                    <Truck size={20} strokeWidth={1.5} className="text-black/50" />
                                    <span className="font-mono text-[8px] md:text-[9px] tracking-widest uppercase text-black/40">Dërgesë Falas</span>
                                </div>
                                <div className="flex flex-col items-center text-center gap-2 py-3">
                                    <RotateCcw size={20} strokeWidth={1.5} className="text-black/50" />
                                    <span className="font-mono text-[8px] md:text-[9px] tracking-widest uppercase text-black/40">Kthim 30 Ditë</span>
                                </div>
                                <div className="flex flex-col items-center text-center gap-2 py-3">
                                    <ShieldCheck size={20} strokeWidth={1.5} className="text-black/50" />
                                    <span className="font-mono text-[8px] md:text-[9px] tracking-widest uppercase text-black/40">100% Autentike</span>
                                </div>
                            </div>
                        </div>
                    </motion.div>

                </div>

                {/* ===== SUGGESTED PRODUCTS ===== */}
                <div className="border-t border-black/10 pt-24 md:pt-32 mt-24 md:mt-32">
                    <div className="flex flex-col md:flex-row justify-between items-end mb-12 md:mb-16 gap-8">
                        <div>
                            <div className="w-12 h-[2px] bg-[#FF5F00] mb-6"></div>
                            <h2 className="font-['Anton'] text-4xl md:text-5xl lg:text-6xl tracking-wide uppercase leading-none">
                                Të Sugjeruara <br /> Për Ty
                            </h2>
                        </div>
                        <Link to="/collection" className="font-mono text-xs md:text-sm tracking-widest uppercase border border-black/20 hover:border-black px-6 py-3 transition-colors duration-300">
                            Shiko Koleksionin
                        </Link>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-6 lg:gap-8">
                        {SUGGESTED_PRODUCTS.map((prod) => (
                            <ProductCard key={prod.id} id={prod.id} title={prod.title} price={prod.price} imageSrc={prod.imageSrc} isNew={prod.isNew} />
                        ))}
                    </div>
                </div>

            </div>
        </div>
    );
};

export default Cart;
