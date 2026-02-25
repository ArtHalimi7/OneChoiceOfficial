import React from 'react';
import { motion as Motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import heroBg from '../assets/herobg2.png';


const lineVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: 0.2 + i * 0.15,
      duration: 0.7,
      ease: [0.22, 1, 0.36, 1],
    },
  }),
};

const ctaVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: 0.8 + i * 0.12,
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1],
    },
  }),
};


const Hero = () => {
  return (
    <section className="relative h-screen w-full overflow-hidden flex items-center justify-center bg-[#f5f5f0]">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img
          src={heroBg}
          alt="Hero Background"
          className="w-full h-full object-cover opacity-100 scale-105 object-[center_35%]"
        />

        {/* Transparent Vintage / Grunge Accents */}
        <div className="absolute inset-0 pointer-events-none z-0">
          {/* Subtle Global Noise Texture (transparent background) */}
          <div
            className="absolute inset-0 opacity-[0.25] mix-blend-overlay"
            style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.85%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E")' }}
          ></div>

          {/* Centered Square Grid of 4 Upside Down Nike Symbols */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="grid grid-cols-2 gap-16 md:gap-32 lg:gap-40 transform rotate-180">
              {[...Array(4)].map((_, i) => (
                <svg key={i} viewBox="0 0 24 24" className="w-24 h-24 sm:w-32 sm:h-32 md:w-48 md:h-48 text-black fill-current" preserveAspectRatio="xMidYMid meet">
                  <path d="M24 7.8L6.442 15.276c-1.456.616-2.679.925-3.668.925-1.12 0-1.933-.392-2.437-1.177-.317-.504-.41-1.143-.28-1.918.13-.775.476-1.6 1.036-2.478.467-.71 1.232-1.643 2.297-2.8a6.122 6.122 0 00-.784 1.848c-.28 1.195-.028 2.072.756 2.632.373.261.886.392 1.54.392.522 0 1.11-.084 1.764-.252L24 7.8z" />
                </svg>
              ))}
            </div>
          </div>

          {/* Organic sketchy brush lines (Top Right) */}
          <div className="absolute top-12 right-12 w-32 h-32 opacity-30 mix-blend-overlay flex flex-col justify-center gap-3 transform rotate-12">
            <svg viewBox="0 0 100 10" className="w-full h-auto text-black fill-current" preserveAspectRatio="none">
              <path d="M5,5 Q25,2 50,7 T95,5 L95,6 Q50,9 25,4 T5,6 Z" />
            </svg>
            <svg viewBox="0 0 100 10" className="w-[85%] ml-auto h-auto text-black fill-current" preserveAspectRatio="none">
              <path d="M5,4 Q30,7 60,3 T95,6 L95,7 Q60,5 30,9 T5,5 Z" />
            </svg>
            <svg viewBox="0 0 100 10" className="w-[60%] mx-auto h-auto text-black fill-current" preserveAspectRatio="none">
              <path d="M5,6 Q20,3 45,7 T95,4 L95,5 Q45,9 20,4 T5,7 Z" />
            </svg>
          </div>

          {/* Typography Accents */}
          <div className="absolute bottom-16 left-10 md:left-20 flex flex-col items-start gap-3 opacity-40 font-mono text-black">
            <span className="text-sm font-bold tracking-[0.2em] uppercase border-b border-black/30 pb-1">One Choice</span>
            <span className="text-xs tracking-widest">EST. 2026 // V-01</span>
            {/* Small tech grid accent */}
            <div className="w-16 h-4 border-l border-r border-black/40 flex justify-between px-1 mt-1">
              <div className="w-1 h-full bg-black/40"></div>
              <div className="w-1 h-full bg-black/20"></div>
              <div className="w-1 h-full bg-black/40"></div>
            </div>
          </div>

          {/* Subtle framing / tape accent */}
          <div className="absolute top-10 left-10 w-16 h-1 bg-black/20 -rotate-2"></div>
          <div className="absolute top-12 left-8 w-1 h-16 bg-black/20 rotate-1"></div>
        </div>
      </div>

      {/* ONE CHOICE OFFICIAL — Staircase Diagonal Text */}
      <div className="absolute inset-0 z-10 flex flex-col justify-center items-center pointer-events-none px-4">
        <div className="flex flex-col items-start w-fit gap-6 md:gap-0">
          {[
            { word: 'ONE', align: 'ml-0' },
            { word: 'CHOICE', align: 'ml-[12vw] md:ml-[12vw]' },
            { word: 'OFFICIAL', align: 'ml-[24vw] md:ml-[24vw]' },
          ].map(({ word, align }, i) => (
            <Motion.span
              key={word}
              custom={i}
              initial="hidden"
              animate="visible"
              variants={lineVariants}
              className={`block font-['Anton'] text-[#FF5F00] uppercase select-none
                         text-[4.5rem] leading-[0.9]
                         sm:text-[5.5rem]
                         md:text-[6rem] md:leading-[0.85]
                         lg:text-[6.5rem]
                         xl:text-[7.5rem]
                         2xl:text-[8.2rem]
                         tracking-[0.04em] ${align} transition-all duration-300`}
            >
              {word}
            </Motion.span>
          ))}
        </div>
      </div>

      {/* CTAs — Bottom Right for All Screens, Smaller on Mobile */}
      <div className="absolute bottom-8 right-6 md:right-16 md:bottom-16 z-20 flex flex-col sm:flex-row items-end sm:items-center gap-3 md:gap-6">
        {/* Primary CTA */}
        <Motion.div custom={0} initial="hidden" animate="visible" variants={ctaVariants} className="w-auto">
          <Link to="/collection">
            <Motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-black text-white px-6 py-3 md:px-10 md:py-4 font-['Anton'] text-sm md:text-lg tracking-[0.15em] uppercase hover:bg-[#FF5F00] transition-colors duration-300 shadow-xl"
            >
              Blej Tani
            </Motion.button>
          </Link>
        </Motion.div>

        {/* Secondary CTA */}
        <Motion.div custom={1} initial="hidden" animate="visible" variants={ctaVariants} className="w-auto">
          <Link to="/collection?tag=new">
            <Motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="border-2 border-black/15 bg-white/10 backdrop-blur-sm text-black px-6 py-3 md:px-10 md:py-4 font-['Anton'] text-sm md:text-lg tracking-[0.15em] uppercase hover:bg-black hover:text-white transition-all duration-300 shadow-lg"
            >
              Të Rejat
            </Motion.button>
          </Link>
        </Motion.div>
      </div>
    </section>
  );
};

export default Hero;