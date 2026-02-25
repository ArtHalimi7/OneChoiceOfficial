import React from 'react';
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const ProductCard = ({ id, title, price, imageSrc, isNew = false }) => {
    return (
        <Link to={`/product/${id}`} className="block w-full">
            <motion.div
                className="group relative flex flex-col w-full cursor-pointer"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            >
                {/* Image Container with Tech Cut Corner and Soft Border */}
                <div
                    className="relative w-full aspect-square bg-white overflow-hidden transition-transform duration-700 ease-[0.22,1,0.36,1] group-hover:-translate-y-2"
                    style={{
                        // Creates the top-left sliced corner tech aesthetic shown in the reference
                        clipPath: 'polygon(10% 0, 100% 0, 100% 100%, 0 100%, 0 10%)'
                    }}
                >
                    {/* SVG Border that follows the clip-path exactly */}
                    <svg className="absolute inset-0 w-full h-full pointer-events-none z-20" viewBox="0 0 100 100" preserveAspectRatio="none">
                        <path
                            d="M 10 1 L 99 1 L 99 99 L 1 99 L 1 10 Z"
                            fill="none"
                            stroke="black"
                            strokeWidth="1.5"
                            vectorEffect="non-scaling-stroke"
                        />
                    </svg>

                    <div className="absolute inset-0 flex flex-col justify-center items-center py-6">
                        <motion.img
                            src={imageSrc}
                            alt={title}
                            className="w-[85%] h-auto object-contain origin-center"
                            whileHover={{ scale: 1.08 }}
                            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                        />
                    </div>

                    {/* Subtle Inner Accent Ring on Hover */}
                    <div className="absolute inset-x-3 inset-y-3 border border-black/0 transition-colors duration-500 group-hover:border-black/15 pointer-events-none z-10"
                        style={{ clipPath: 'polygon(10% 0, 100% 0, 100% 100%, 0 100%, 0 10%)' }}
                    />

                    {/* Optional "NEW" Tag */}
                    {isNew && (
                        <div className="absolute top-4 right-4 bg-[#FF5F00] text-white text-[10px] uppercase font-bold tracking-widest px-2 py-1 z-30">
                            E RE
                        </div>
                    )}
                </div>

                {/* Product Info */}
                <div className="mt-4 flex flex-col">
                    <div className="flex justify-between items-start">
                        <h3 className="font-['Anton'] text-xl md:text-2xl tracking-wide uppercase text-black mb-1 line-clamp-1 pr-4">
                            {title}
                        </h3>
                        <span className="font-mono text-sm md:text-base font-medium text-black min-w-max">
                            ${price}
                        </span>
                    </div>

                    {/* Minimal Add to Cart Underline */}
                    <div className="relative inline-flex items-center mt-1 group/btn w-fit">
                        <span className="font-medium text-[11px] md:text-xs tracking-widest uppercase text-black/60 transition-colors group-hover:text-black">
                            Shto Shpejt +
                        </span>
                        <div className="absolute -bottom-1 left-0 w-full h-[1px] bg-black/10 overflow-hidden">
                            <motion.div
                                className="w-full h-full bg-black origin-left"
                                initial={{ scaleX: 0 }}
                                whileHover={{ scaleX: 1 }}
                                transition={{ duration: 0.4, ease: "anticipate" }}
                            />
                        </div>
                    </div>
                </div>
            </motion.div>
        </Link>
    );
};

export default ProductCard;
