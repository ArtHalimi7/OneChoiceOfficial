import React from 'react';
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';
import { ArrowRight, Instagram, Twitter, Facebook } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <footer className="bg-[#0a0a0a] text-white pt-24 md:pt-32 pb-10 px-6 md:px-12 w-full overflow-hidden border-t border-white/5 relative z-10">
            <div className="max-w-[1500px] mx-auto flex flex-col items-center">

                {/* Newsletter Section - Center Aligned */}
                <div className="w-full max-w-4xl flex flex-col items-center text-center mb-24 md:mb-32">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                    >
                        <h2 className="font-['Anton'] text-5xl md:text-7xl lg:text-8xl tracking-wider uppercase leading-none mb-6">
                            Bëhu Pjesë <br className="md:hidden" /> E Lëvizjes
                        </h2>
                        <p className="font-mono text-white/50 text-xs md:text-sm tracking-widest uppercase mb-10 max-w-lg mx-auto leading-relaxed">
                            Regjistrohu për akses të hershëm në produkte të limituara, përmbajtje ekskluzive, dhe evente komunitare.
                        </p>
                    </motion.div>

                    {/* Email Input */}
                    <motion.form
                        className="w-full max-w-lg relative group"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        onSubmit={(e) => e.preventDefault()}
                    >
                        <input
                            type="email"
                            placeholder="VENDOS ADRESËN E EMAILIT"
                            className="w-full bg-transparent border-b-2 border-white/20 text-white font-mono text-sm tracking-widest px-0 py-4 focus:outline-none focus:border-[#FF5F00] transition-colors duration-300 placeholder:text-white/30"
                            required
                        />
                        <button
                            type="submit"
                            className="absolute right-0 top-1/2 -translate-y-1/2 text-white/50 group-hover:text-[#FF5F00] transition-colors duration-300 p-2"
                            aria-label="Abonohu"
                        >
                            <ArrowRight size={24} strokeWidth={1.5} />
                        </button>
                    </motion.form>
                </div>

                {/* Footer Links Grid */}
                <div className="w-full grid grid-cols-2 md:grid-cols-4 gap-12 md:gap-8 mb-24 md:mb-32">
                    {/* Column 1 */}
                    <div className="flex flex-col gap-6">
                        <h4 className="font-['Anton'] text-xl tracking-wider text-[#FF5F00] uppercase">Dyqani</h4>
                        <div className="flex flex-col gap-3 font-mono text-sm text-white/60 tracking-wider">
                            <Link to="/new-arrivals" className="hover:text-white transition-colors duration-200">Të Rejat</Link>
                            <Link to="/sneakers" className="hover:text-white transition-colors duration-200">Atlete</Link>
                            <Link to="/streetwear" className="hover:text-white transition-colors duration-200">Veshje</Link>
                            <Link to="/accessories" className="hover:text-white transition-colors duration-200">Aksesorë</Link>
                        </div>
                    </div>

                    {/* Column 2 */}
                    <div className="flex flex-col gap-6">
                        <h4 className="font-['Anton'] text-xl tracking-wider text-[#FF5F00] uppercase">Rreth Nesh</h4>
                        <div className="flex flex-col gap-3 font-mono text-sm text-white/60 tracking-wider">
                            <Link to="/our-story" className="hover:text-white transition-colors duration-200">Historia Jonë</Link>
                            <Link to="/journal" className="hover:text-white transition-colors duration-200">Zhurnali</Link>
                            <Link to="/locations" className="hover:text-white transition-colors duration-200">Dyqanet</Link>
                            <Link to="/careers" className="hover:text-white transition-colors duration-200">Karriera</Link>
                        </div>
                    </div>

                    {/* Column 3 */}
                    <div className="flex flex-col gap-6">
                        <h4 className="font-['Anton'] text-xl tracking-wider text-[#FF5F00] uppercase">Ndihma</h4>
                        <div className="flex flex-col gap-3 font-mono text-sm text-white/60 tracking-wider">
                            <Link to="/faq" className="hover:text-white transition-colors duration-200">Pyetje të Shpeshta</Link>
                            <Link to="/shipping" className="hover:text-white transition-colors duration-200">Dërgesa & Kthimet</Link>
                            <Link to="/size-guide" className="hover:text-white transition-colors duration-200">Guida e Masave</Link>
                            <Link to="/contact" className="hover:text-white transition-colors duration-200">Na Kontakto</Link>
                        </div>
                    </div>

                    {/* Column 4: Socials */}
                    <div className="flex flex-col gap-6 md:items-end">
                        <h4 className="font-['Anton'] text-xl tracking-wider text-[#FF5F00] uppercase">Na Ndiq</h4>
                        <div className="flex gap-4 text-white/60">
                            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-white hover:-translate-y-1 transition-all duration-300">
                                <Instagram size={20} strokeWidth={1.5} />
                                <span className="sr-only">Instagram</span>
                            </a>
                            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-white hover:-translate-y-1 transition-all duration-300">
                                <Twitter size={20} strokeWidth={1.5} />
                                <span className="sr-only">Twitter</span>
                            </a>
                            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-white hover:-translate-y-1 transition-all duration-300">
                                <Facebook size={20} strokeWidth={1.5} />
                                <span className="sr-only">Facebook</span>
                            </a>
                        </div>
                    </div>
                </div>

                {/* Massive Typographic Branding */}
                <div className="w-full flex justify-center items-center overflow-hidden border-t border-white/10 pt-8 pb-4">
                    <span className="font-['Anton'] text-[15vw] leading-none tracking-tight text-white/[0.03] select-none text-center whitespace-nowrap">
                        ONE CHOICE
                    </span>
                </div>

                {/* Copyright Line */}
                <div className="w-full flex flex-col md:flex-row justify-between items-center gap-4 mt-8 font-mono text-[10px] md:text-xs text-white/30 tracking-widest uppercase">
                    <p>© 2026 ONE CHOICE OFFICIAL. TË GJITHA TË DREJTAT E REZERVUARA.</p>
                    <div className="flex gap-6">
                        <Link to="/privacy" className="hover:text-white transition-colors">Politika e Privatësisë</Link>
                        <Link to="/terms" className="hover:text-white transition-colors">Kushtet e Shërbimit</Link>
                    </div>
                </div>

            </div>
        </footer>
    );
};

export default Footer;
