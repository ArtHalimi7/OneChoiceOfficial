import React, { useState, useEffect } from 'react';
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingCart, User, Search, Menu, X } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const { cartCount } = useCart();

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      // Transition when scrolled past 50px
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    // eslint-disable-next-line
    setIsMobileMenuOpen(false);
  }, [location]);

  // Dynamic Styles
  const navBg = isScrolled ? 'bg-black shadow-lg' : 'bg-transparent';
  const textColor = isScrolled ? 'text-white' : 'text-black';
  const iconColor = isScrolled ? 'text-white hover:text-[#FF5F00]' : 'text-black hover:text-[#FF5F00]';
  const logoColor = isScrolled ? 'text-white' : 'text-black';
  const linkHoverColor = isScrolled ? 'hover:text-[#FF5F00]' : 'hover:text-[#FF5F00]';

  const navLinks = [
    { name: 'TË REJAT', path: '/collection?tag=new' },
    { name: 'ATLETE', path: '/collection?category=Atlete' },
    { name: 'VESHJE', path: '/collection?category=Veshje' },
    { name: 'AKSESORË', path: '/collection?category=Aksesorë' },
    { name: 'Meshkuj', path: '/collection?gender=Meshkuj' },
    { name: 'Femra', path: '/collection?gender=Femra' },
    { name: 'ZBRITJE', path: '/collection?tag=sale' },
  ];

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className={`fixed top-0 left-0 w-full z-50 transition-colors duration-300 ease-in-out ${navBg}`}
      >
        <div className="max-w-[1600px] mx-auto px-6 md:px-12 h-20 flex items-center justify-between">

          {/* Logo (Left) */}
          <Link to="/" className="flex-shrink-0 flex items-center gap-1 z-50 group">
            <span className={`font-['Anton'] text-2xl tracking-wider uppercase transition-colors duration-300 ${logoColor} group-hover:text-[#FF5F00]`}>
              ONE CHOICE <span className='text-red-500 text-2xl'>.</span>
            </span>
          </Link>

          {/* Desktop Nav Links (Center) */}
          <div className="hidden lg:flex items-center justify-center gap-10 xl:gap-14 absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className={`text-[0.8rem] xl:text-[0.85rem] font-medium tracking-[0.1em] transition-colors duration-300 ${textColor} ${linkHoverColor}`}
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* Icons (Right) */}
          <div className="hidden lg:flex items-center gap-6">
            <button aria-label="Kërko" className={`transition-colors duration-300 ${iconColor}`}>
              <Search size={20} strokeWidth={1.5} />
            </button>
            <Link to="/profile" aria-label="Profili" className={`transition-colors duration-300 ${iconColor}`}>
              <User size={22} strokeWidth={1.5} />
            </Link>
            <Link to="/cart" aria-label="Shporta" className={`relative transition-colors duration-300 ${iconColor}`}>
              <ShoppingCart size={22} strokeWidth={1.5} />
              {cartCount > 0 && (
                <span className={`absolute -top-1.5 -right-2 ${isScrolled ? 'bg-[#FF5F00] text-white' : 'bg-black text-white'} text-[0.6rem] font-bold w-4 h-4 rounded-full flex items-center justify-center`}>
                  {cartCount}
                </span>
              )}
            </Link>
          </div>

          {/* Mobile Menu & Cart Toggles */}
          <div className="flex items-center gap-4 lg:hidden z-50">
            <Link to="/cart" aria-label="Shporta (Celular)" className={`relative transition-colors duration-300 ${iconColor}`}>
              <ShoppingCart size={24} strokeWidth={1.5} />
              {cartCount > 0 && (
                <span className={`absolute -top-1.5 -right-2 ${isScrolled ? 'bg-[#FF5F00] text-white' : 'bg-black text-white'} text-[0.6rem] font-bold w-4 h-4 rounded-full flex items-center justify-center`}>
                  {cartCount}
                </span>
              )}
            </Link>
            <button
              className={`transition-colors duration-300 ${iconColor}`}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X size={28} strokeWidth={1.5} /> : <Menu size={28} strokeWidth={1.5} />}
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 bg-black pt-24 px-6 flex flex-col h-screen"
          >
            <div className="flex flex-col gap-8 mt-10">
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.name}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                >
                  <Link
                    to={link.path}
                    className="text-white text-3xl font-['Anton'] tracking-wider uppercase hover:text-[#FF5F00] transition-colors"
                  >
                    {link.name}
                  </Link>
                </motion.div>
              ))}
            </div>

            <div className="mt-auto mb-12 flex items-center gap-8 border-t border-white/20 pt-8">
              <Link to="/profile" className="flex items-center gap-3 text-white hover:text-[#FF5F00] transition-colors">
                <User size={24} strokeWidth={1.5} />
                <span className="text-sm tracking-widest uppercase">Llogaria</span>
              </Link>
              <button className="flex items-center gap-3 text-white hover:text-[#FF5F00] transition-colors">
                <Search size={24} strokeWidth={1.5} />
                <span className="text-sm tracking-widest uppercase">Kërko</span>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;