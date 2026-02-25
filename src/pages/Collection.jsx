import React, { useState } from 'react';
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import ProductCard from '../components/ProductCard';

// Comprehensive mock data
const ALL_PRODUCTS = [
    { id: 1, title: "Jordan 1 Retro High", price: 240, brand: "Jordan", category: "Atlete", gender: "Burra", isNew: true, imageSrc: "https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?auto=format&fit=crop&q=80&w=800" },
    { id: 2, title: "Yeezy Boost 700", price: 300, brand: "Yeezy", category: "Atlete", gender: "Të Dyja", isNew: false, imageSrc: "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?auto=format&fit=crop&q=80&w=800" },
    { id: 3, title: "Air Max 95 OG", price: 185, brand: "Nike", category: "Atlete", gender: "Burra", isNew: false, imageSrc: "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?auto=format&fit=crop&q=80&w=800" },
    { id: 4, title: "Dunk Low Panda", price: 160, brand: "Nike", category: "Atlete", gender: "Gra", isNew: true, imageSrc: "https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&q=80&w=800" },
    { id: 5, title: "Fear of God Hoodie", price: 120, brand: "Fear of God", category: "Veshje", gender: "Burra", isNew: true, imageSrc: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&q=80&w=800" },
    { id: 6, title: "Supreme Box Logo", price: 250, brand: "Supreme", category: "Veshje", gender: "Të Dyja", isNew: false, imageSrc: "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?auto=format&fit=crop&q=80&w=800" },
    { id: 7, title: "Alyx Hero Chain", price: 220, brand: "Alyx", category: "Aksesorë", gender: "Të Dyja", isNew: false, imageSrc: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&q=80&w=800" },
    { id: 8, title: "Off-White ODSY", price: 850, brand: "Off-White", category: "Atlete", gender: "Gra", isNew: true, imageSrc: "https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?auto=format&fit=crop&q=80&w=800" },
];

const CustomDropdown = ({ options, value, onChange }) => {
    const [isOpen, setIsOpen] = useState(false);
    return (
        <div className="relative">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center gap-2 font-mono text-xs tracking-widest uppercase hover:text-[#FF5F00] transition-colors"
                onBlur={() => setTimeout(() => setIsOpen(false), 200)}
            >
                {value} <ChevronDown size={14} className={`transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
            </button>
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        transition={{ duration: 0.2 }}
                        className="absolute right-0 top-full mt-4 w-48 bg-white border border-black/10 shadow-2xl z-50 flex flex-col py-2"
                    >
                        {options.map(opt => (
                            <button
                                key={opt}
                                onClick={() => { onChange(opt); setIsOpen(false); }}
                                className={`text-left px-4 py-3 font-mono text-xs tracking-widest uppercase transition-colors hover:bg-black/5 ${value === opt ? 'text-[#FF5F00] font-bold' : 'text-black/70'}`}
                            >
                                {opt}
                            </button>
                        ))}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

const Collection = () => {
    // Filter States
    const [selectedCategory, setSelectedCategory] = useState("Të Gjitha");
    const [selectedBrand, setSelectedBrand] = useState("Të Gjitha");
    const [selectedGender, setSelectedGender] = useState("Të Gjitha");
    const [sortOption, setSortOption] = useState("Të Preferuara");

    // Derived Filter Categories
    const categories = ["Të Gjitha", "Atlete", "Veshje", "Aksesorë"];
    const brands = ["Të Gjitha", ...Array.from(new Set(ALL_PRODUCTS.map(p => p.brand)))];
    const genders = ["Të Gjitha", "Burra", "Gra", "Të Dyja"];
    const sortOptionsList = ["Të Preferuara", "Më të Rejat", "Çmimi: Ulët - Lart", "Çmimi: Lart - Ulët"];

    // Filter Logic
    let filteredProducts = ALL_PRODUCTS.filter(product => {
        const matchCategory = selectedCategory === "Të Gjitha" || product.category === selectedCategory;
        const matchBrand = selectedBrand === "Të Gjitha" || product.brand === selectedBrand;
        const matchGender = selectedGender === "Të Gjitha" || product.gender === selectedGender || product.gender === "Të Dyja";
        return matchCategory && matchBrand && matchGender;
    });

    // Sort Logic
    if (sortOption === "Çmimi: Ulët - Lart") {
        filteredProducts.sort((a, b) => a.price - b.price);
    } else if (sortOption === "Çmimi: Lart - Ulët") {
        filteredProducts.sort((a, b) => b.price - a.price);
    } else if (sortOption === "Më të Rejat") {
        filteredProducts.sort((a, b) => (a.isNew === b.isNew) ? 0 : a.isNew ? -1 : 1);
    }

    return (
        <div className="pt-32 pb-24 md:pt-40 md:pb-32 px-6 md:px-12 w-full min-h-screen bg-white">
            <div className="max-w-[1600px] mx-auto flex flex-col lg:flex-row gap-12 lg:gap-16">

                {/* 
                    Sidebar Filters (Sticky on Desktop) 
                */}
                <aside className="w-full lg:w-64 flex-shrink-0">
                    <div className="sticky top-32 flex flex-col gap-10">

                        <div className="flex flex-col gap-4">
                            <h2 className="font-['Anton'] text-3xl uppercase tracking-wide">Koleksioni</h2>
                            <p className="font-mono text-xs text-black/50 tracking-widest uppercase mb-4">
                                {filteredProducts.length} Rezultate
                            </p>
                        </div>

                        {/* Category Filter */}
                        <div className="flex flex-col gap-3">
                            <h3 className="font-mono text-xs font-bold tracking-widest uppercase border-b border-black/10 pb-2 mb-2">Kategoritë</h3>
                            {categories.map(cat => (
                                <button
                                    key={cat}
                                    onClick={() => setSelectedCategory(cat)}
                                    className={`text-left font-mono text-sm tracking-wide transition-colors duration-200 ${selectedCategory === cat ? 'text-[#FF5F00] font-bold' : 'text-black/60 hover:text-black'}`}
                                >
                                    {cat}
                                </button>
                            ))}
                        </div>

                        {/* Gender Filter */}
                        <div className="flex flex-col gap-3">
                            <h3 className="font-mono text-xs font-bold tracking-widest uppercase border-b border-black/10 pb-2 mb-2">Gjinia</h3>
                            {genders.map(gender => (
                                <button
                                    key={gender}
                                    onClick={() => setSelectedGender(gender)}
                                    className={`text-left font-mono text-sm tracking-wide transition-colors duration-200 ${selectedGender === gender ? 'text-[#FF5F00] font-bold' : 'text-black/60 hover:text-black'}`}
                                >
                                    {gender}
                                </button>
                            ))}
                        </div>

                        {/* Brand Filter */}
                        <div className="flex flex-col gap-3">
                            <h3 className="font-mono text-xs font-bold tracking-widest uppercase border-b border-black/10 pb-2 mb-2">Markat</h3>
                            {brands.map(brand => (
                                <button
                                    key={brand}
                                    onClick={() => setSelectedBrand(brand)}
                                    className={`text-left font-mono text-sm tracking-wide transition-colors duration-200 ${selectedBrand === brand ? 'text-[#FF5F00] font-bold' : 'text-black/60 hover:text-black'}`}
                                >
                                    {brand}
                                </button>
                            ))}
                        </div>

                    </div>
                </aside>


                {/* 
                    Main Product Grid Area
                */}
                <main className="flex-1 flex flex-col">

                    {/* Top Bar Sorting & Active Filters */}
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4 border-b border-black/10 pb-4">

                        {/* Active Filters Display */}
                        <div className="flex flex-wrap gap-2">
                            {selectedCategory !== "Të Gjitha" && (
                                <span className="inline-flex items-center gap-2 bg-black text-white px-3 py-1 font-mono text-[10px] tracking-widest uppercase">
                                    {selectedCategory}
                                    <button onClick={() => setSelectedCategory("Të Gjitha")} className="hover:text-[#FF5F00]">✕</button>
                                </span>
                            )}
                            {selectedGender !== "Të Gjitha" && (
                                <span className="inline-flex items-center gap-2 bg-black text-white px-3 py-1 font-mono text-[10px] tracking-widest uppercase">
                                    {selectedGender}
                                    <button onClick={() => setSelectedGender("Të Gjitha")} className="hover:text-[#FF5F00]">✕</button>
                                </span>
                            )}
                            {selectedBrand !== "Të Gjitha" && (
                                <span className="inline-flex items-center gap-2 bg-black text-white px-3 py-1 font-mono text-[10px] tracking-widest uppercase">
                                    {selectedBrand}
                                    <button onClick={() => setSelectedBrand("Të Gjitha")} className="hover:text-[#FF5F00]">✕</button>
                                </span>
                            )}
                        </div>

                        {/* Custom Sorting Dropdown */}
                        <div className="flex items-center gap-3">
                            <span className="font-mono text-[10px] tracking-widest uppercase text-black/50">Rendit Sipas:</span>
                            <CustomDropdown options={sortOptionsList} value={sortOption} onChange={setSortOption} />
                        </div>
                    </div>

                    {/* Products Grid */}
                    {filteredProducts.length > 0 ? (
                        <motion.div
                            layout
                            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 md:gap-x-6 md:gap-y-12"
                        >
                            <AnimatePresence>
                                {filteredProducts.map(product => (
                                    <motion.div
                                        key={product.id}
                                        layout
                                        initial={{ opacity: 0, scale: 0.9 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        exit={{ opacity: 0, scale: 0.9 }}
                                        transition={{ duration: 0.3 }}
                                        className="w-full flex justify-center"
                                    >
                                        <ProductCard
                                            id={product.id}
                                            title={product.title}
                                            price={product.price}
                                            imageSrc={product.imageSrc}
                                            isNew={product.isNew}
                                        />
                                    </motion.div>
                                ))}
                            </AnimatePresence>
                        </motion.div>
                    ) : (
                        <div className="w-full flex flex-col items-center justify-center py-32 text-center">
                            <h3 className="font-['Anton'] text-3xl md:text-4xl uppercase text-black/20 mb-4">Asgjë nuk u Gjet</h3>
                            <p className="font-mono text-sm tracking-widest uppercase text-black/50">Provo të ndryshosh filtrat.</p>
                            <button
                                onClick={() => { setSelectedCategory("Të Gjitha"); setSelectedBrand("Të Gjitha"); setSelectedGender("Të Gjitha"); }}
                                className="mt-6 border border-black px-6 py-2 font-mono text-xs tracking-widest uppercase hover:bg-black hover:text-white transition-colors"
                            >
                                Pastro të gjithë filtrat
                            </button>
                        </div>
                    )}

                </main>
            </div>
        </div>
    );
};

export default Collection;
