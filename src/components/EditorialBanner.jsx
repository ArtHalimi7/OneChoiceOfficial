import React from 'react';
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import bannerImg from '../assets/banner.png';

const EditorialBanner = () => {
    // Reverted back to the original, cleaner double-shard tech cut requested by user
    const complexClipPath = 'polygon(5% 0, 100% 0, 100% 95%, 95% 100%, 0 100%, 0 5%)';

    return (
        <section className="py-24 md:py-32 px-6 md:px-12 w-full bg-white relative">
            <div className="max-w-[1500px] mx-auto relative group">

                {/* 
                    The custom clipping path for the banner.
                    It has a massive angled cut on the top-left and bottom-right 
                    making it look like a futuristic, sleek shard.
                */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
                    className="relative w-full h-[60vh] min-h-[600px] md:h-[80vh] bg-black overflow-hidden transition-transform duration-700 hover:-translate-y-2"
                    style={{
                        clipPath: complexClipPath
                    }}
                >
                    {/* Background Image with slight scale animation on hover */}
                    <motion.img
                        src={bannerImg}
                        alt="Editorial Campaign"
                        className="absolute inset-0 w-full h-full object-cover origin-center opacity-[0.85]"
                        whileHover={{ scale: 1.05 }}
                        transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
                    />

                    {/* Dark gradient overlay so text is readable */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent pointer-events-none" />

                    {/* SVG Border tracing the complex tech-cut perfectly */}
                    <svg className="absolute inset-0 w-full h-full pointer-events-none z-20" viewBox="0 0 100 100" preserveAspectRatio="none">
                        <path
                            d="M 5 1 L 99 1 L 99 95 L 95 99 L 1 99 L 1 5 Z"
                            fill="none"
                            stroke="white"
                            strokeWidth="1.5"
                            vectorEffect="non-scaling-stroke"
                            className="opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                        />
                    </svg>

                    {/* Content Container (Bottom Left) */}
                    <div className="absolute inset-0 p-8 md:p-16 lg:p-24 flex flex-col justify-end z-10 pointer-events-none">

                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.3, duration: 0.8, ease: "easeOut" }}
                            className="max-w-3xl"
                        >
                            <div className="w-16 h-[2px] bg-[#FF5F00] mb-6 md:mb-8 pointer-events-auto shadow-[0_0_10px_rgba(255,95,0,0.5)]"></div>

                            {/* Adjusted Text Sizes for a cleaner look */}
                            <h2 className="font-['Anton'] text-4xl sm:text-5xl md:text-6xl lg:text-7xl tracking-wide uppercase leading-none text-white mb-6">
                                Koleksioni <br /> 2026
                            </h2>

                            <p className="font-mono text-white/80 text-xs md:text-sm tracking-widest uppercase mb-10 max-w-lg leading-relaxed mix-blend-screen">
                                Ridefinimi i kryqëzimit të minimalizmit arkitekturor dhe kulturës së lartë rrugore. I disponueshëm në sasi të limituara.
                            </p>

                            <Link to="/collection" className="pointer-events-auto">
                                <motion.button
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    className="bg-white text-black hover:bg-[#FF5F00] hover:text-white px-8 py-4 text-xl md:text-2xl font-['Anton'] uppercase tracking-widest transition-colors duration-300 flex items-center gap-4 group/btn"
                                >
                                    Bli Koleksionin
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="transition-transform duration-300 group-hover/btn:translate-x-1">
                                        <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                </motion.button>
                            </Link>
                        </motion.div>

                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default EditorialBanner;
