import React from 'react';
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';

// Mock list of popular sneaker/streetwear brands
const BRANDS = [
    "NIKE", "JORDAN", "YEEZY", "OFF-WHITE", "NEW BALANCE",
    "A BATHING APE", "STÜSSY", "SUPREME", "FEAR OF GOD", "BALENCIAGA"
];

const TrendingMarquee = () => {
    return (
        <section className="bg-black py-16 md:py-24 overflow-hidden relative border-y border-white/10">
            {/* Very faint background noise texture */}
            <div
                className="absolute inset-0 opacity-[0.1] mix-blend-overlay pointer-events-none"
                style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.85%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E")' }}
            />

            <div className="relative z-10 flex flex-col items-center">
                {/* Small Header */}
                <span className="font-mono text-xs md:text-sm tracking-[0.3em] uppercase text-white/50 mb-10">
                    Partnerët në Trend
                </span>

                {/* Marquee Wrapper */}
                <div className="relative flex w-full overflow-hidden">

                    {/* Gradient Fades on edges for smooth entry/exit */}
                    <div className="absolute left-0 top-0 bottom-0 w-32 md:w-64 bg-gradient-to-r from-black to-transparent z-20 pointer-events-none"></div>
                    <div className="absolute right-0 top-0 bottom-0 w-32 md:w-64 bg-gradient-to-l from-black to-transparent z-20 pointer-events-none"></div>

                    {/* Animated Track */}
                    <motion.div
                        className="flex whitespace-nowrap items-center"
                        animate={{ x: ["0%", "-50%"] }} // Scroll from 0 to -50% (since we duplicate the list)
                        transition={{
                            repeat: Infinity,
                            ease: "linear",
                            duration: 30 // Adjust speed here (lower is faster)
                        }}
                    >
                        {/* 
                            We render the list twice to create an infinite seamless loop.
                            When it reaches halfway (-50%), it instantly jumps back to 0%.
                        */}
                        {[...BRANDS, ...BRANDS].map((brand, index) => (
                            <div
                                key={index}
                                className="flex items-center mx-8 md:mx-16 group cursor-default"
                            >
                                <span className="font-['Anton'] text-5xl md:text-7xl lg:text-8xl tracking-wider text-transparent transition-all duration-300 pointer-events-auto"
                                    style={{
                                        WebkitTextStroke: '1px rgba(255,255,255,0.2)', // Outline text by default
                                    }}
                                    onMouseEnter={(e) => {
                                        // On hover, fill the text solid white and remove the stroke
                                        e.currentTarget.style.color = 'white';
                                        e.currentTarget.style.WebkitTextStroke = '0px';
                                    }}
                                    onMouseLeave={(e) => {
                                        e.currentTarget.style.color = 'transparent';
                                        e.currentTarget.style.WebkitTextStroke = '1px rgba(255,255,255,0.2)';
                                    }}
                                >
                                    {brand}
                                </span>
                                {/* Small separator dot */}
                                <div className="w-2 h-2 md:w-3 md:h-3 rounded-full bg-[#FF5F00] ml-16 md:ml-32 opacity-50" />
                            </div>
                        ))}
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default TrendingMarquee;
