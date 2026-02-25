import React from 'react';
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import womenImg from '../assets/WomenCard.png';
import menImg from '../assets/MenCard.png';

const CategoryCard = ({ title, imageSrc, align = "left", decorScale = 1 }) => {
    return (
        <motion.div
            className="group relative flex flex-col w-full max-w-[420px] mx-auto cursor-pointer"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
            {/* Decorative Sketch Elements */}
            <div className="absolute -top-4 -left-6 z-10 w-12 h-12 text-black/30 pointer-events-none transform -rotate-12" style={{ transform: `scale(${decorScale}) rotate(-12deg)` }}>
                <svg viewBox="0 0 100 100" className="w-full h-full fill-none stroke-current stroke-2" strokeLinecap="round">
                    <path d="M10,90 Q50,10 90,90 M20,50 L80,50 M30,60 L70,40" />
                </svg>
            </div>
            <div className="absolute bottom-16 -right-4 z-10 w-8 h-8 text-black/20 pointer-events-none transform rotate-45" style={{ transform: `scale(${decorScale}) rotate(45deg)` }}>
                <svg viewBox="0 0 100 100" className="w-full h-full fill-none stroke-current stroke-[3]" strokeLinecap="round">
                    <circle cx="50" cy="50" r="40" strokeDasharray="10 15" />
                    <path d="M30,30 L70,70 M70,30 L30,70" />
                </svg>
            </div>

            {/* Image Container with Tech Cut Corner and Soft Border */}
            <div
                className="relative w-full aspect-[4/5] bg-white overflow-hidden transition-transform duration-700 ease-[0.22,1,0.36,1] group-hover:-translate-y-2"
                style={{
                    // Creates the top-left sliced corner tech aesthetic shown in the reference
                    clipPath: 'polygon(15% 0, 100% 0, 100% 100%, 0 100%, 0 15%)'
                }}
            >
                {/* SVG Border that follows the clip-path exactly */}
                <svg className="absolute inset-0 w-full h-full pointer-events-none z-20" viewBox="0 0 100 100" preserveAspectRatio="none">
                    <path
                        d="M 15 1 L 99 1 L 99 99 L 1 99 L 1 15 Z"
                        fill="none"
                        stroke="black"
                        strokeWidth="1.5"
                        vectorEffect="non-scaling-stroke"
                    />
                </svg>

                <motion.img
                    src={imageSrc}
                    alt={title}
                    className="w-full h-full object-cover origin-center"
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                />

                {/* Subtle Inner Accent Ring on Hover */}
                <div className="absolute inset-x-4 inset-y-4 border border-black/0 transition-colors duration-500 group-hover:border-black/15 pointer-events-none z-10"
                    style={{ clipPath: 'polygon(15% 0, 100% 0, 100% 100%, 0 100%, 0 15%)' }}
                />
            </div>

            {/* Text Content Below */}
            <div className={`mt-6 flex flex-col ${align === 'right' ? 'items-end text-right' : 'items-start text-left'}`}>
                <h3 className="font-['Anton'] text-3xl md:text-4xl tracking-wide uppercase text-black mb-1">
                    {title}
                </h3>

                {/* Animated Underline Link */}
                <div className="relative inline-flex items-center gap-2 mt-2 group/link">
                    <span className="font-medium text-sm tracking-wider uppercase">
                        Bli per {title}
                    </span>
                    <ArrowRight size={18} className="transform transition-transform duration-300 group-hover/link:translate-x-1" strokeWidth={1.5} />

                    {/* Expanding Line */}
                    <div className="absolute -bottom-1 left-0 w-full h-[1px] bg-black/20 overflow-hidden">
                        <motion.div
                            className="w-full h-full bg-black origin-left"
                            initial={{ scaleX: 0 }}
                            whileInView={{ scaleX: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.4, duration: 0.8, ease: "anticipate" }}
                        />
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

const Categories = () => {
    return (
        <section className="pt-24 md:pt-32 pb-12 md:pb-16 px-6 md:px-12 bg-white w-full overflow-hidden relative">
            <div className="max-w-[1400px] mx-auto relative z-10">

                {/* Background Decorative Sketch */}
                <svg className="absolute top-0 right-[10%] w-64 h-64 text-black/5 pointer-events-none -z-10 transform rotate-12" viewBox="0 0 100 100">
                    <path d="M10,50 Q30,10 50,50 T90,50" fill="none" stroke="currentColor" strokeWidth="1" strokeDasharray="4 8" />
                    <circle cx="50" cy="50" r="30" fill="none" stroke="currentColor" strokeWidth="0.5" />
                </svg>


                <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 md:mb-24 gap-12">
                    <motion.h2
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="font-['Anton'] text-5xl sm:text-6xl md:text-7xl lg:text-8xl tracking-wide uppercase leading-[0.9] text-black"
                    >
                        Eksploro <br /> Kategoritë
                    </motion.h2>

                    {/* Decorative Top-Right Content Block */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        className="flex flex-col items-start md:items-end text-left md:text-right md:max-w-xs ml-auto pt-4 md:pt-0"
                    >
                        {/* Orange Accent Bar */}
                        <div className="w-16 h-[2px] bg-[#FF5F00] mb-6"></div>

                        <p className="font-mono text-[10px] md:text-xs tracking-[0.2em] text-black/60 uppercase mb-4">
                            Duke Përcaktuar Kulturën Moderne /// 2026
                        </p>

                        <p className="text-sm text-black/80 font-medium leading-relaxed mb-6 md:mb-8">
                            Seleksione të kuruar të atleteve premium, veshjeve rrugore esenciale, dhe aksesorëve ekskluzivë të dizajnuara për të ngritur rotacionin tuaj të përditshëm.
                        </p>

                        {/* Stats Row */}
                        <div className="flex items-center gap-6 md:gap-8 pt-6 border-t border-black/10 w-full justify-start md:justify-end">
                            <div className="flex flex-col">
                                <span className="font-['Anton'] text-2xl lg:text-3xl tracking-widest text-[#FF5F00]">10K+</span>
                                <span className="font-mono text-[9px] md:text-[10px] text-black/50 uppercase tracking-wider">Produkte Hype</span>
                            </div>
                            <div className="h-8 w-[1px] bg-black/10"></div>
                            <div className="flex flex-col">
                                <span className="font-['Anton'] text-2xl lg:text-3xl tracking-widest text-black">100%</span>
                                <span className="font-mono text-[9px] md:text-[10px] text-black/50 uppercase tracking-wider">Autentike</span>
                            </div>
                        </div>
                    </motion.div>
                </div>

                {/* 2-Column Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 lg:gap-24 relative z-10">
                    {/* GHOST TEXT behind cards */}
                    <div className="hidden md:flex absolute top-[35%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-full justify-center items-center pointer-events-none z-0 select-none overflow-hidden">
                        <span className="font-['Anton'] text-[14vw] leading-none tracking-tight text-black/10 whitespace-nowrap">
                            ONE CHOICE OFFICIAL
                        </span>
                    </div>

                    {/* Swapped: Women on Left, Men on Right */}
                    <Link to="/collection?gender=Femra" className="relative z-10 w-full">
                        <CategoryCard title="Femra" imageSrc={womenImg} align="left" decorScale={0.8} />
                    </Link>
                    <div className="md:mt-24 relative z-10 w-full"> {/* Stagger the second card down */}
                        <Link to="/collection?gender=Meshkuj">
                            <CategoryCard title="Meshkuj" imageSrc={menImg} align="left" decorScale={1.1} />
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Categories;
